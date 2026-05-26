import {
  ARCHIVE_ENTRIES,
  BAO_ARCHIVE_MEDIA_TYPE,
  isValidArchiveEntry,
  normalizePath,
  PLATFORM_IDS,
} from "@baohaus/bao-contracts/bao/bao-archive.contract";
import { type BaoManifest, isBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { PlatformId } from "@baohaus/bao-schemas/bao-install-primitives.schemas";
import type { JsonValue } from "@baohaus/bao-schemas/json.schemas";
import { mkdir } from "../bun-fs.ts";
import { dirname, join } from "../bun-path.ts";
import type {
  BaoArchiveAttestations,
  BaoArchiveAuxFiles,
  BaoArchiveFileContent,
  BaoArchiveInput,
  BaoArchivePayloadInputs,
  BaoArchiveProvenance,
  BaoArchiveSchemaFiles,
} from "./bao-archive.types.ts";
import { resolvePayloadInput } from "./bao-archive-payload.ts";
import { createTarArchive, readTarEntries } from "./bao-archive-tar.ts";
import { encodeBaoManifestJson } from "./bao-manifest-bin.ts";

interface BaoArchiveMaterializationResult {
  readonly packageRoot: string;
  readonly writtenFiles: readonly string[];
}

function toBytes(content: BaoArchiveFileContent): Uint8Array {
  if (typeof content === "string") {
    return new TextEncoder().encode(content);
  }
  return content;
}

function toJsonBytes(value: JsonValue): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(value));
}

function toArchivePath(prefix: string, filePath: string): string {
  const archivePath = `${prefix}/${normalizePath(filePath)}`;
  if (!isValidArchiveEntry(archivePath)) {
    throw new Error(`Invalid archive file path: ${archivePath}`);
  }
  return archivePath;
}

function addEntry(entries: Map<string, Uint8Array>, path: string, content: Uint8Array): void {
  if (!isValidArchiveEntry(path)) {
    throw new Error(`Invalid archive entry path: ${path}`);
  }
  if (entries.has(path)) {
    throw new Error(`Duplicate archive entry: ${path}`);
  }
  entries.set(path, content);
}

function addFileMap(
  entries: Map<string, Uint8Array>,
  prefix: string,
  files: Record<string, BaoArchiveFileContent> | undefined,
): void {
  if (!files) {
    return;
  }
  for (const [relativePath, content] of Object.entries(files)) {
    addEntry(entries, toArchivePath(prefix, relativePath), toBytes(content));
  }
}

function appendManifestEntries(entries: Map<string, Uint8Array>, input: BaoArchiveInput): void {
  addEntry(entries, ARCHIVE_ENTRIES.MANIFEST_BIN, input.manifestBin);
  addEntry(entries, ARCHIVE_ENTRIES.MANIFEST_JSON, encodeBaoManifestJson(input.manifest));

  if (input.manifestSignature && input.manifestSignature.length > 0) {
    addEntry(entries, ARCHIVE_ENTRIES.MANIFEST_SIGNATURE, input.manifestSignature);
  }
}

function appendJsonEntry(
  entries: Map<string, Uint8Array>,
  path: string,
  value: JsonValue | undefined,
): void {
  if (value !== undefined) {
    addEntry(entries, path, toJsonBytes(value));
  }
}

function appendAttestationEntries(
  entries: Map<string, Uint8Array>,
  attestations: BaoArchiveAttestations | undefined,
): void {
  appendJsonEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_SLSA, attestations?.slsa);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_SBOM_CYCLONEDX, attestations?.sbomCycloneDx);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_SBOM_SPDX, attestations?.sbomSpdx);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_VEX, attestations?.vex);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_LICENSE_SCAN, attestations?.licenseScan);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_VULN_SCAN, attestations?.vulnScan);

  if (attestations?.sigstoreBundle) {
    addEntry(entries, ARCHIVE_ENTRIES.ATTESTATION_SIGSTORE_BUNDLE, attestations.sigstoreBundle);
  }
}

function appendProvenanceEntries(
  entries: Map<string, Uint8Array>,
  provenance: BaoArchiveProvenance | undefined,
): void {
  appendJsonEntry(
    entries,
    ARCHIVE_ENTRIES.PROVENANCE_BUILD_ENVIRONMENT,
    provenance?.buildEnvironment,
  );
  appendJsonEntry(entries, ARCHIVE_ENTRIES.PROVENANCE_DEP_GRAPH, provenance?.dependencyGraph);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.PROVENANCE_DEP_LOCK, provenance?.dependencyLock);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.PROVENANCE_LICENSES, provenance?.licenses);
  appendJsonEntry(entries, ARCHIVE_ENTRIES.PROVENANCE_PACKUMENT, provenance?.packument);
}

function appendPayloadEntries(
  entries: Map<string, Uint8Array>,
  payload: BaoArchivePayloadInputs | undefined,
): void {
  addEntry(entries, ARCHIVE_ENTRIES.PAYLOAD_SHARED_KEEP, new Uint8Array());
  addFileMap(entries, ARCHIVE_ENTRIES.PAYLOAD_SHARED_PREFIX, payload?.shared);

  for (const platformId of PLATFORM_IDS) {
    const files = payload?.platforms?.[platformId];
    if (files === undefined) {
      continue;
    }
    addEntry(entries, ARCHIVE_ENTRIES.PLATFORM_KEEP(platformId), new Uint8Array());
    addFileMap(entries, ARCHIVE_ENTRIES.PAYLOAD_PLATFORM_PREFIX(platformId), files);
  }

  addFileMap(entries, ARCHIVE_ENTRIES.PAYLOAD_BYTECODE_PREFIX, payload?.bytecode);
  addFileMap(entries, ARCHIVE_ENTRIES.PAYLOAD_WASM_PREFIX, payload?.wasm);
}

function appendSchemaEntries(
  entries: Map<string, Uint8Array>,
  schema: BaoArchiveSchemaFiles | undefined,
): void {
  if (schema?.config !== undefined) {
    addEntry(entries, ARCHIVE_ENTRIES.SCHEMA_CONFIG, toBytes(schema.config));
  }
  if (schema?.target !== undefined) {
    addEntry(entries, ARCHIVE_ENTRIES.SCHEMA_TARGET, toBytes(schema.target));
  }
  if (schema?.openApi !== undefined) {
    addEntry(entries, ARCHIVE_ENTRIES.SCHEMA_OPENAPI, toBytes(schema.openApi));
  }
  if (schema?.asyncApi !== undefined) {
    addEntry(entries, ARCHIVE_ENTRIES.SCHEMA_ASYNCAPI, toBytes(schema.asyncApi));
  }
  if (schema?.prisma !== undefined) {
    addEntry(entries, ARCHIVE_ENTRIES.SCHEMA_PRISMA, toBytes(schema.prisma));
  }
  if (schema?.flatbuffer !== undefined) {
    addEntry(entries, ARCHIVE_ENTRIES.SCHEMA_FLATBUFFER, toBytes(schema.flatbuffer));
  }
}

function appendAuxiliaryEntries(
  entries: Map<string, Uint8Array>,
  auxiliary: BaoArchiveAuxFiles | undefined,
): void {
  addFileMap(entries, ARCHIVE_ENTRIES.LIFECYCLE_PREFIX, auxiliary?.lifecycle);
  addFileMap(entries, ARCHIVE_ENTRIES.DOCS_PREFIX, auxiliary?.docs);
  addFileMap(entries, ARCHIVE_ENTRIES.OBSERVABILITY_PREFIX, auxiliary?.observability);
  addFileMap(entries, ARCHIVE_ENTRIES.I18N_PREFIX, auxiliary?.i18n);
  addFileMap(entries, ARCHIVE_ENTRIES.TESTS_PREFIX, auxiliary?.tests);
  addFileMap(entries, ARCHIVE_ENTRIES.SECURITY_PREFIX, auxiliary?.security);
  addFileMap(entries, ARCHIVE_ENTRIES.GOVERNANCE_PREFIX, auxiliary?.governance);
  addFileMap(entries, ARCHIVE_ENTRIES.RELEASE_PREFIX, auxiliary?.release);
}

function appendExtraEntries(
  entries: Map<string, Uint8Array>,
  extras: Record<string, BaoArchiveFileContent> | undefined,
): void {
  if (!extras) {
    return;
  }

  for (const [relativePath, content] of Object.entries(extras)) {
    const normalized = normalizePath(relativePath);
    if (!isValidArchiveEntry(normalized)) {
      throw new Error(`Invalid extras path: ${relativePath}`);
    }
    addEntry(entries, normalized, toBytes(content));
  }
}

function resolveMaterializedPayloadPath(prefix: string, archivePath: string): string | null {
  if (!archivePath.startsWith(prefix)) {
    return null;
  }
  const relativePath = normalizePath(archivePath.slice(prefix.length));
  if (relativePath.length === 0 || relativePath === ".bao.keep") {
    return null;
  }
  if (relativePath.split("/").some((segment) => segment === "..")) {
    throw new Error(`Unsafe .bao payload entry path: ${archivePath}`);
  }
  return relativePath;
}

export function buildBaoArchiveEntries(input: BaoArchiveInput): Map<string, Uint8Array> {
  const entries = new Map<string, Uint8Array>();
  const payload = resolvePayloadInput(input);

  appendManifestEntries(entries, input);
  appendAttestationEntries(entries, input.attestations);
  appendProvenanceEntries(entries, input.provenance);
  appendPayloadEntries(entries, payload);
  appendSchemaEntries(entries, input.schema);
  appendAuxiliaryEntries(entries, input.aux);
  appendExtraEntries(entries, input.extras);

  return sortEntriesDeterministically(entries);
}

function sortEntriesDeterministically(entries: Map<string, Uint8Array>): Map<string, Uint8Array> {
  return new Map([...entries.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

export function createBaoArchiveBytes(input: BaoArchiveInput): Uint8Array {
  return createTarArchive(buildBaoArchiveEntries(input));
}

export async function writeBaoArchiveFile(filePath: string, input: BaoArchiveInput): Promise<void> {
  const archiveBytes = createBaoArchiveBytes(input);
  await Bun.write(filePath, archiveBytes);
}

export function listBaoArchiveEntries(archiveData: Uint8Array): string[] {
  return [...readTarEntries(archiveData).keys()].sort((left, right) => left.localeCompare(right));
}

export async function listBaoArchiveEntriesFromFile(filePath: string): Promise<string[]> {
  const archiveData = await Bun.file(filePath).bytes();
  return listBaoArchiveEntries(archiveData);
}

export function extractBaoArchiveEntry(
  archiveData: Uint8Array,
  archiveEntryPath: string,
): Uint8Array | null {
  const entries = readTarEntries(archiveData);
  return entries.get(archiveEntryPath) ?? null;
}

export async function extractBaoArchiveEntryFromFile(
  filePath: string,
  archiveEntryPath: string,
): Promise<Uint8Array | null> {
  const archiveData = await Bun.file(filePath).bytes();
  return extractBaoArchiveEntry(archiveData, archiveEntryPath);
}

export function extractBaoArchiveManifest(archiveData: Uint8Array): BaoManifest | null {
  const entries = readTarEntries(archiveData);
  const manifestEntry = entries.get(ARCHIVE_ENTRIES.MANIFEST_JSON);

  if (!manifestEntry) {
    return null;
  }

  const parsedManifest: JsonValue = JSON.parse(new TextDecoder().decode(manifestEntry));
  if (!isBaoManifest(parsedManifest)) {
    return null;
  }

  return parsedManifest;
}

export async function extractBaoArchiveManifestFromFile(
  filePath: string,
): Promise<BaoManifest | null> {
  const archiveData = await Bun.file(filePath).bytes();
  return extractBaoArchiveManifest(archiveData);
}

export function readBaoArchiveEntries(archiveData: Uint8Array): Map<string, Uint8Array> {
  return readTarEntries(archiveData);
}

export async function materializeBaoArchivePackageRoot(params: {
  readonly archiveBytes: Uint8Array;
  readonly packageRoot: string;
  readonly platformId: PlatformId;
}): Promise<BaoArchiveMaterializationResult> {
  const entries = readBaoArchiveEntries(params.archiveBytes);
  const sharedPrefix = `${ARCHIVE_ENTRIES.PAYLOAD_SHARED_PREFIX}/`;
  const platformPrefix = `${ARCHIVE_ENTRIES.PAYLOAD_PLATFORM_PREFIX(params.platformId)}/`;
  const writtenFiles: string[] = [];

  await mkdir(params.packageRoot, { recursive: true });

  for (const [archivePath, bytes] of [...entries.entries()].sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const relativePath =
      resolveMaterializedPayloadPath(sharedPrefix, archivePath) ??
      resolveMaterializedPayloadPath(platformPrefix, archivePath);
    if (relativePath === null) {
      continue;
    }

    const outputPath = join(params.packageRoot, relativePath);
    await mkdir(dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, bytes);
    writtenFiles.push(relativePath);
  }

  return {
    packageRoot: params.packageRoot,
    writtenFiles,
  };
}

export type { BaoArchiveInput } from "./bao-archive.types.ts";
export type { BaoArchiveMaterializationResult };
export { BAO_ARCHIVE_MEDIA_TYPE };
