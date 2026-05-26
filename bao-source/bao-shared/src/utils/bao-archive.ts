/**
 * `.bao` archive utilities.
 *
 * Provides deterministic archive creation, manifest extraction, and managed
 * package-root materialization for bao-package installs.
 *
 * @shared/utils/bao-archive
 */

import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import {
  type BaoManifest,
  BaoManifestDependencySchema,
  isBaoManifest,
} from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import {
  type BaoInstallTargetBase,
  isBaoPackageTarget,
} from "@baohaus/bao-schemas/bao-install/targets.schemas";
import {
  type BaoManifestDecoded,
  type BaoManifestEncodeInput,
  decodeBaoManifest,
  encodeBaoManifest,
  type ManifestTargetEncodeInput,
} from "@baohaus/bao-wrapture/protocols/bao-manifest";
import { Check } from "@baohaus/baobox/value";
import {
  BAO_ARCHIVE_DEPENDENCY_GRAPH_ENTRY_PATH,
  BAO_ARCHIVE_KEEP_FILE_NAME,
  BAO_ARCHIVE_LICENSES_ENTRY_PATH,
  BAO_ARCHIVE_MANIFEST_ENTRY_PATH,
  BAO_ARCHIVE_PACKUMENT_ENTRY_PATH,
  BAO_ARCHIVE_PLATFORM_ID_VALUES,
  type BaoArchivePlatformId,
  resolveBaoArchivePlatformKeepFilePath,
  resolveBaoArchivePlatformPayloadRoot,
  resolveBaoArchiveSharedKeepFilePath,
} from "../bao/bao-archive.contract.ts";
import { mkdir, readBinaryFileSync, rm } from "./bun-fs.ts";
import { dirname, join, resolve } from "./bun-path.ts";
import { canonicalizeJsonValue } from "./stable-json.ts";

const LEADING_SLASHES_RE: RegExp = /^\/+/;
const MULTIPLE_SLASHES_RE: RegExp = /\/+/g;
const NULL_TAIL_RE: RegExp = /\0.*$/;

/**
 * Archive entry content supported by the deterministic writer.
 */
type BaoArchiveEntryContent = string | Uint8Array;

/**
 * Immutable map of archive entry path to content.
 */
export type BaoArchiveEntryMap = Readonly<Record<string, BaoArchiveEntryContent>>;

/**
 * Shared file-map keyed by relative path under a payload directory.
 */
export type BaoArchiveRelativeFileMap = Readonly<Record<string, BaoArchiveEntryContent>>;

/**
 * Provenance payloads bundled into the canonical `.bao` archive layout.
 */
export interface BaoArchiveProvenancePayload {
  packument?: unknown;
  dependencyGraph?: unknown;
  licenses?: unknown;
}

/**
 * Deterministic archive creation parameters.
 */
export interface CreateBaoArchiveOptions {
  manifest: BaoManifest;
  sharedFiles?: BaoArchiveRelativeFileMap;
  platformFiles?: Partial<Record<BaoArchivePlatformId, BaoArchiveRelativeFileMap>>;
  provenance?: BaoArchiveProvenancePayload;
  tempDirectory?: string;
}

/**
 * Managed package-root materialization outcome.
 */
export interface BaoArchiveMaterializationResult {
  packageRoot: string;
  writtenFiles: string[];
}

const DEFAULT_TEMP_DIRECTORY: string = resolve(process.cwd(), "run", "bao", "tmp");
const TAR_BLOCK_SIZE = 512;
const TAR_NAME_FIELD_END = 100;
const TAR_SIZE_FIELD_START = 124;
const TAR_SIZE_FIELD_END = 136;

/**
 * Create a deterministic JSON text payload with stable key ordering.
 *
 * @param value - JSON-like value.
 * @returns Pretty JSON text with trailing newline.
 */
function toStableJsonText(value: unknown): string {
  return `${JSON.stringify(canonicalizeJsonValue(value), null, 2)}\n`;
}

function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Normalize a relative path for use inside archive payload roots.
 *
 * @param relativePath - Candidate relative payload path.
 * @returns Normalized POSIX-like relative path.
 */
function normalizeRelativePayloadPath(relativePath: string): string {
  const normalized = String(relativePath).trim().replace(NULL_TAIL_RE, "").replaceAll("\\", "/");
  const segments = normalized.replace(LEADING_SLASHES_RE, "").split("/");
  const collapsedSegments: string[] = [];

  for (const segment of segments) {
    if (segment === ".") {
      continue;
    }
    collapsedSegments.push(segment);
  }

  return collapsedSegments.join("/").replace(MULTIPLE_SLASHES_RE, "/");
}

/**
 * Reject archive paths that escape their intended payload root.
 *
 * @param relativePath - Normalized relative payload path.
 * @returns True when the path is safe to materialize.
 */
function isSafeRelativePayloadPath(relativePath: string): boolean {
  if (!relativePath || relativePath === BAO_ARCHIVE_KEEP_FILE_NAME) {
    return false;
  }
  if (relativePath.startsWith("../") || relativePath === "..") {
    return false;
  }
  return !relativePath.split("/").some((segment) => segment === ".." || segment.length === 0);
}

/**
 * Enforce archive payload path safety instead of silently dropping invalid entries.
 *
 * @param relativePath - Raw relative payload path provided by the caller.
 * @returns Normalized safe relative path.
 */
function assertSafeRelativePayloadPath(relativePath: string): string {
  const normalizedPath = normalizeRelativePayloadPath(relativePath);
  if (!isSafeRelativePayloadPath(normalizedPath)) {
    throw new Error(`Unsafe .bao payload path "${relativePath}"`);
  }
  return normalizedPath;
}

/**
 * Prefix a relative file map with its archive root path.
 *
 * @param root - Archive root prefix.
 * @param files - Relative file map.
 * @returns Rooted archive entry map.
 */
function prefixArchiveEntries(root: string, files: BaoArchiveRelativeFileMap): BaoArchiveEntryMap {
  const entries: Record<string, BaoArchiveEntryContent> = {};
  for (const [relativePath, content] of Object.entries(files).sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const normalizedPath = assertSafeRelativePayloadPath(relativePath);
    entries[`${root}${normalizedPath}`] = content;
  }
  return entries;
}

/**
 * Parse a JSON string as a plain object with runtime guard.
 *
 * @param json - JSON string to parse.
 * @returns Parsed object or empty object when input is null/invalid.
 */
function parseJsonRecord(json: string | null): Record<string, unknown> {
  if (!json) {
    return {};
  }
  const parsed: unknown = JSON.parse(json);
  if (isJsonRecord(parsed)) {
    return parsed;
  }
  return {};
}

/**
 * Extract target-specific fields from a base target, excluding the shared base fields.
 *
 * The FlatBuffers target schema stores kind/id/moduleId directly; all other
 * adapter-specific fields (packageName, exports, bin, etc.) are serialized as JSON
 * in the configJson field.
 *
 * @param target - Base target from the BaoManifest.
 * @returns JSON-encoded config string or undefined when no extra fields exist.
 */
export function extractTargetConfigJson(target: BaoInstallTargetBase): string | undefined {
  const BaseFields = new Set<string>([
    "kind",
    "target",
    "moduleId",
    "mcpMetadata",
    "before",
    "after",
    "healthcheck",
    "environment",
    "checksum",
    "signature",
    "dependencies",
  ]);

  const config: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(target)) {
    if (!BaseFields.has(key)) {
      config[key] = value;
    }
  }
  // Also preserve shared base fields that have semantic meaning for round-trips.
  if (target.mcpMetadata !== undefined) {
    config.mcpMetadata = target.mcpMetadata;
  }
  if (target.before !== undefined) {
    config.before = target.before;
  }
  if (target.after !== undefined) {
    config.after = target.after;
  }
  if (target.healthcheck !== undefined) {
    config.healthcheck = target.healthcheck;
  }
  if (target.environment !== undefined) {
    config.environment = target.environment;
  }
  if (target.checksum !== undefined) {
    config.checksum = target.checksum;
  }
  if (target.signature !== undefined) {
    config.signature = target.signature;
  }
  if (target.dependencies !== undefined) {
    config.dependencies = target.dependencies;
  }

  return Object.keys(config).length > 0 ? JSON.stringify(config) : undefined;
}

/**
 * Map a {@link BaoManifest} to a {@link BaoManifestEncodeInput} for FlatBuffers encoding.
 *
 * The FlatBuffers schema stores `name` and `version` at the root level; all
 * remaining metadata fields and the `schemaVersion` + `dependencies` are
 * serialized into `metadataJson` for lossless round-trip fidelity.
 *
 * @param manifest - Canonical BaoManifest value.
 * @returns FlatBuffers encode input.
 */
export function toManifestEncodeInput(manifest: BaoManifest): BaoManifestEncodeInput {
  const { name, version, ...remainingMetadata } = manifest.metadata;

  const metadataPayload: Record<string, unknown> = {
    schemaVersion: manifest.schemaVersion,
    ...remainingMetadata,
  };
  if (manifest.$schema !== undefined) {
    metadataPayload.$schema = manifest.$schema;
  }
  if (manifest.dependencies !== undefined) {
    metadataPayload.dependencies = manifest.dependencies;
  }

  const targets: ManifestTargetEncodeInput[] = manifest.targets.map((target) => {
    const moduleId =
      "moduleId" in target && typeof target.moduleId === "string" ? target.moduleId : undefined;
    return {
      kind: target.kind,
      id: target.target,
      ...(moduleId === undefined ? {} : { moduleId }),
      configJson: extractTargetConfigJson(target),
    };
  });

  return {
    name,
    version,
    description: manifest.description,
    targets,
    metadataJson: JSON.stringify(metadataPayload),
  };
}

/**
 * Map a {@link BaoManifestDecoded} back to the canonical {@link BaoManifest} shape.
 *
 * Reconstructs the `metadata` nesting and restores all fields serialized into
 * `metadataJson` and per-target `configJson` during encoding.
 *
 * @param decoded - FlatBuffers decoded manifest.
 * @returns Reconstructed BaoManifest when the decoded transport payload projects
 * to a canonical manifest; otherwise null.
 */
export function toManifestFromDecoded(decoded: BaoManifestDecoded): BaoManifest | null {
  const metadataExtra = parseJsonRecord(decoded.metadataJson);

  const { schemaVersion, $schema, dependencies, ...remainingMetadataExtra } = metadataExtra;

  const metadata = {
    name: decoded.name ?? "",
    version: decoded.version ?? "",
    ...remainingMetadataExtra,
  };

  const targets = decoded.targets.map((t) => {
    const configExtra = parseJsonRecord(t.configJson);

    return {
      kind: t.kind ?? "bao-package",
      target: t.id ?? "",
      ...(t.moduleId ? { moduleId: t.moduleId } : {}),
      ...configExtra,
    };
  });

  const manifest: Record<string, unknown> = {
    schemaVersion: typeof schemaVersion === "number" ? schemaVersion : BAO_MANIFEST_SCHEMA_VERSION,
    metadata,
    targets,
  };

  if (typeof $schema === "string") {
    manifest.$schema = $schema;
  }
  if (decoded.description) {
    manifest.description = decoded.description;
  }
  if (
    Array.isArray(dependencies) &&
    dependencies.every((dependency) => Check(BaoManifestDependencySchema, dependency))
  ) {
    manifest.dependencies = dependencies;
  }

  return isBaoManifest(manifest) ? manifest : null;
}

/**
 * Build minimal loadable shared payload files for bao-package `.bao` targets when
 * explicit bundle files are not provided.
 *
 * @param manifest - Canonical archive manifest.
 * @returns Minimal shared file map.
 */
function buildFallbackSharedFiles(manifest: BaoManifest): BaoArchiveRelativeFileMap {
  const baoPackageTarget = manifest.targets.find(isBaoPackageTarget);
  if (!baoPackageTarget) {
    return {};
  }

  const packageName = baoPackageTarget.packageName;
  const packageVersion =
    typeof baoPackageTarget.packageVersion === "string"
      ? baoPackageTarget.packageVersion
      : manifest.metadata.version;
  const packageExports = baoPackageTarget.exports ?? { ".": "./index.js" };
  const packageBin =
    baoPackageTarget.bin && typeof baoPackageTarget.bin === "object"
      ? baoPackageTarget.bin
      : undefined;

  return {
    "package.json": toStableJsonText({
      name: packageName,
      version: packageVersion,
      type: "module",
      main: "./index.js",
      exports: packageExports,
      ...(packageBin ? { bin: packageBin } : {}),
    }),
    "index.js": "export default {};\n",
  };
}

/**
 * Build the complete, deterministic archive entry set.
 *
 * @param options - Archive creation options.
 * @returns Canonical entry map.
 */
export function buildBaoArchiveEntries(options: CreateBaoArchiveOptions): BaoArchiveEntryMap {
  const sharedFiles =
    options.sharedFiles && Object.keys(options.sharedFiles).length > 0
      ? options.sharedFiles
      : buildFallbackSharedFiles(options.manifest);
  const platformFiles = options.platformFiles ?? {};
  const entries: Record<string, BaoArchiveEntryContent> = {
    [BAO_ARCHIVE_MANIFEST_ENTRY_PATH]: encodeBaoManifest(toManifestEncodeInput(options.manifest)),
    [BAO_ARCHIVE_PACKUMENT_ENTRY_PATH]: toStableJsonText(options.provenance?.packument ?? {}),
    [BAO_ARCHIVE_DEPENDENCY_GRAPH_ENTRY_PATH]: toStableJsonText(
      options.provenance?.dependencyGraph ?? {},
    ),
    [BAO_ARCHIVE_LICENSES_ENTRY_PATH]: toStableJsonText(options.provenance?.licenses ?? []),
    [resolveBaoArchiveSharedKeepFilePath()]: "",
  };

  for (const platformId of BAO_ARCHIVE_PLATFORM_ID_VALUES) {
    entries[resolveBaoArchivePlatformKeepFilePath(platformId)] = "";
  }

  Object.assign(entries, prefixArchiveEntries("payload/shared/", sharedFiles));
  for (const platformId of BAO_ARCHIVE_PLATFORM_ID_VALUES) {
    const files = platformFiles[platformId];
    if (!files) {
      continue;
    }
    Object.assign(
      entries,
      prefixArchiveEntries(resolveBaoArchivePlatformPayloadRoot(platformId), files),
    );
  }

  return Object.fromEntries(
    Object.entries(entries).sort(([left], [right]) => left.localeCompare(right)),
  );
}

/**
 * Create deterministic `.bao` archive bytes.
 *
 * Uses Bun's native archive writer and a temp file so the returned bytes are
 * portable across call sites.
 *
 * @param options - Archive creation options.
 * @returns Canonical archive bytes.
 */
export async function createBaoArchiveBytes(options: CreateBaoArchiveOptions): Promise<Uint8Array> {
  const tempDirectory = options.tempDirectory ?? DEFAULT_TEMP_DIRECTORY;
  await mkdir(tempDirectory, { recursive: true });

  const tempPath = join(tempDirectory, `${crypto.randomUUID()}.bao`);
  const archive = new Bun.Archive(buildBaoArchiveEntries(options));
  const archiveBytes = await archive.bytes();

  await Bun.write(tempPath, archiveBytes);
  const bytes = await Bun.file(tempPath).bytes();
  await rm(tempPath, { force: true });
  return bytes;
}

/**
 * Write a deterministic `.bao` archive file to disk.
 *
 * @param outputPath - Absolute or relative archive output path.
 * @param options - Archive creation options.
 * @returns Written output path.
 */
export async function writeBaoArchiveFile(
  outputPath: string,
  options: CreateBaoArchiveOptions,
): Promise<string> {
  const absolutePath = resolve(outputPath);
  await mkdir(dirname(absolutePath), { recursive: true });
  const bytes = await createBaoArchiveBytes(options);
  await Bun.write(absolutePath, bytes);
  return absolutePath;
}

/**
 * Read the archive file map from bytes.
 *
 * @param bytes - Raw archive bytes.
 * @returns Archive file map.
 */
export function readBaoArchiveFiles(bytes: Uint8Array): Promise<Map<string, File>> {
  return new Bun.Archive(bytes).files();
}

/**
 * Read one archive entry as UTF-8 text.
 *
 * @param bytes - Raw archive bytes.
 * @param entryPath - Canonical archive entry path.
 * @returns Entry text or null.
 */
export async function readBaoArchiveEntryText(
  bytes: Uint8Array,
  entryPath: string,
): Promise<string | null> {
  const files = await readBaoArchiveFiles(bytes);
  const entry = files.get(entryPath);
  if (!entry) {
    return null;
  }
  return entry.text();
}

/**
 * Extract and validate the canonical `manifest.bin` payload from archive bytes.
 *
 * @param bytes - Raw archive bytes.
 * @returns Canonical `.bao` manifest.
 */
export async function extractBaoArchiveManifestFromBytes(bytes: Uint8Array): Promise<BaoManifest> {
  const files = await readBaoArchiveFiles(bytes);
  const entry = files.get(BAO_ARCHIVE_MANIFEST_ENTRY_PATH);
  if (!entry) {
    throw new Error("Bao archive is missing manifest.bin");
  }

  const entryBytes = new Uint8Array(await entry.arrayBuffer());
  const decoded = decodeBaoManifest(entryBytes);
  if (!decoded) {
    throw new Error(
      "Bao archive manifest.bin could not be decoded as a valid FlatBuffers manifest",
    );
  }

  const manifest = toManifestFromDecoded(decoded);
  if (!manifest) {
    throw new Error("Bao archive manifest.bin does not satisfy the canonical schema");
  }
  return manifest;
}

/**
 * Read archive bytes and extract the canonical `manifest.bin` payload.
 *
 * @param archivePath - Local `.bao` archive path.
 * @returns Canonical `.bao` manifest.
 */
export async function extractBaoArchiveManifestFromFile(archivePath: string): Promise<BaoManifest> {
  const bytes = await Bun.file(archivePath).bytes();
  return extractBaoArchiveManifestFromBytes(bytes);
}

/**
 * Parse an octal-encoded tar header size field.
 *
 * @param bytes - Archive bytes.
 * @param start - Inclusive field start offset.
 * @param end - Exclusive field end offset.
 * @returns Parsed integer size.
 */
function parseTarOctal(bytes: Uint8Array, start: number, end: number): number {
  const raw = new TextDecoder().decode(bytes.subarray(start, end));
  const normalized = raw.replace(/\0/g, "").trim();
  return normalized ? Number.parseInt(normalized, 8) : 0;
}

/**
 * Read a tar header pathname field.
 *
 * @param bytes - Archive bytes.
 * @param start - Inclusive field start offset.
 * @param end - Exclusive field end offset.
 * @returns Parsed path string.
 */
function parseTarPath(bytes: Uint8Array, start: number, end: number): string {
  return new TextDecoder().decode(bytes.subarray(start, end)).replace(NULL_TAIL_RE, "").trim();
}

/**
 * Extract one raw entry payload from an uncompressed tar archive synchronously.
 *
 * Canonical `.bao` archives are uncompressed tar files, so sync readers can
 * extract `manifest.bin` without relying on async `Bun.Archive` APIs.
 *
 * @param archiveBytes - Raw archive bytes.
 * @param entryPath - Canonical entry path to extract.
 * @returns Entry payload bytes or null when missing.
 */
function extractTarEntryBytesSync(archiveBytes: Uint8Array, entryPath: string): Uint8Array | null {
  let offset = 0;

  while (offset + TAR_BLOCK_SIZE <= archiveBytes.length) {
    const header = archiveBytes.subarray(offset, offset + TAR_BLOCK_SIZE);
    const entryName = parseTarPath(header, 0, TAR_NAME_FIELD_END);
    if (!entryName) {
      const isEndOfArchive = header.every((value) => value === 0);
      if (isEndOfArchive) {
        return null;
      }
      offset += TAR_BLOCK_SIZE;
      continue;
    }

    const entrySize = parseTarOctal(header, TAR_SIZE_FIELD_START, TAR_SIZE_FIELD_END);
    const dataStart = offset + TAR_BLOCK_SIZE;
    const dataEnd = dataStart + entrySize;

    if (entryName === entryPath) {
      return archiveBytes.slice(dataStart, dataEnd);
    }

    const paddedSize = Math.ceil(entrySize / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
    offset = dataStart + paddedSize;
  }

  return null;
}

/**
 * Extract and validate the canonical `manifest.bin` payload synchronously.
 *
 * @param bytes - Raw `.bao` archive bytes.
 * @returns Canonical `.bao` manifest.
 */
export function extractBaoArchiveManifestFromBytesSync(bytes: Uint8Array): BaoManifest {
  const manifestBytes = extractTarEntryBytesSync(bytes, BAO_ARCHIVE_MANIFEST_ENTRY_PATH);
  if (!manifestBytes) {
    throw new Error("Bao archive is missing manifest.bin");
  }

  const decoded = decodeBaoManifest(manifestBytes);
  if (!decoded) {
    throw new Error(
      "Bao archive manifest.bin could not be decoded as a valid FlatBuffers manifest",
    );
  }

  const manifest = toManifestFromDecoded(decoded);
  if (!manifest) {
    throw new Error("Bao archive manifest.bin does not satisfy the canonical schema");
  }

  return manifest;
}

/**
 * Read archive bytes synchronously and extract the canonical `manifest.bin`.
 *
 * @param archivePath - Local `.bao` archive path.
 * @returns Canonical `.bao` manifest.
 */
export function extractBaoArchiveManifestFromFileSync(archivePath: string): BaoManifest {
  return extractBaoArchiveManifestFromBytesSync(readBinaryFileSync(archivePath));
}

/**
 * Materialize the shared payload plus the selected platform slice into a package
 * root selected by the Bao install runtime.
 *
 * @param archiveBytes - Raw archive bytes.
 * @param packageRoot - Destination package root in the Bao package unpack store.
 * @param platformId - Active platform slice id.
 * @returns Materialization summary.
 */
export async function materializeBaoArchivePackageRoot(params: {
  archiveBytes: Uint8Array;
  packageRoot: string;
  platformId: BaoArchivePlatformId;
}): Promise<BaoArchiveMaterializationResult> {
  const files = await readBaoArchiveFiles(params.archiveBytes);
  const writtenFiles: string[] = [];
  const prefixes = ["payload/shared/", resolveBaoArchivePlatformPayloadRoot(params.platformId)];

  await mkdir(params.packageRoot, { recursive: true });

  for (const [archivePath, file] of [...files.entries()].sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const prefix = prefixes.find((candidate) => archivePath.startsWith(candidate));
    if (!prefix) {
      continue;
    }

    const relativePath = normalizeRelativePayloadPath(archivePath.slice(prefix.length));
    if (!isSafeRelativePayloadPath(relativePath)) {
      continue;
    }

    const outputPath = join(params.packageRoot, relativePath);
    await mkdir(dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, new Uint8Array(await file.arrayBuffer()));
    writtenFiles.push(relativePath);
  }

  return {
    packageRoot: params.packageRoot,
    writtenFiles,
  };
}
