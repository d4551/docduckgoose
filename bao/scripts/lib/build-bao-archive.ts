/// <reference types="bun" />
/**
 * Canonical .bao archive builder (v2 — unified Layout A).
 *
 * Every per-repo `bao-build.ts` script imports {@link buildBaoArchive}
 * and invokes it from the package working directory.
 *
 * Produces a canonical Layout A `.bao` archive that passes the 18-gate
 * validator and is ingestible by the .bao Registry publisher.
 *
 * Archive layout (Layout A):
 *   manifest.bin            — canonical FlatBuffers BMv1 envelope
 *   manifest.json           — canonical JSON manifest
 *   manifest.signature      — Ed25519 signature (optional, when key available)
 *   attestations/slsa-provenance.json
 *   attestations/sbom-cyclonedx.json
 *   attestations/sbom-spdx.json
 *   attestations/vex.json
 *   attestations/license-scan.json
 *   attestations/vuln-scan.json
 *   provenance/build-environment.json
 *   provenance/dependency-graph.json
 *   provenance/dependency-lock.json
 *   provenance/licenses.json
 *   provenance/packument.json
 *   payload/shared/.bao.keep
 *   payload/shared/**        — shared payload files
 *   lifecycle/**             — lifecycle hook scripts (if any)
 *   governance/**            — governance files
 *   docs/**                  — documentation
 *   i18n/**                  — locale files
 *   schema/config-schema.json
 *   schema/target-schema.json
 *   schema/prisma-schema.prisma (if applicable)
 */

import { type Dirent, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { BaoManifest as CanonicalBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import {
  BAO_ARCHIVE_MEDIA_TYPE,
  type BaoArchiveInput,
  createBaoArchiveBytes,
} from "@baohaus/bao-utils/canonical/bao-archive";
import { loadCanonicalArchiveSigningKey } from "@baohaus/bao-utils/canonical/bao-canonical-signing";
import { encodeBaoManifestBin } from "@baohaus/bao-utils/canonical/bao-manifest-bin";
import { signCanonicalBaoManifest } from "@baohaus/bao-utils/canonical/bao-manifest-signer";
import { BAO_GOVERNANCE_ENTRY, BAO_LOCK_ENTRY } from "./archive-layout.ts";
import { BAO_ARCHIVE_OUTPUT_DIR } from "./archive-output.ts";
import {
  readArchiveSignatureTransparencyLog,
  readArchiveSigningPrivateJwk,
} from "./archive-signing-key-config.ts";
import { buildAttestationsFromGovernance } from "./build-attestations.ts";
import { canonicalJson, sha256Hex } from "./fs-io.ts";
import {
  assertBaoLock,
  assertBaoManifest,
  assertPackageIdentity,
  type BaoLock,
  type BaoManifest,
  type PackageIdentity,
} from "./schema-guards.ts";

const BAOHAUS_NAME_PREFIX = /^@baohaus\//;

type JsonValue = string | number | boolean | null | JsonRecord | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonRecord {
  readonly [key: string]: JsonField;
}
type BaoPackageExportValue = string | Record<string, string>;

interface BuildBaoArchiveOptions {
  /** When true, copy `src/` into the archive payload (used by kit/spec packages that ship sources). */
  readonly includeSourceTree?: boolean;
  readonly targets?: CanonicalBaoManifest["targets"];
  /** Optional override for the archive output directory; defaults to `dist/bao`. */
  readonly outputDir?: string;
}

interface BuildBaoArchiveResult {
  readonly archive: string;
  readonly packageId: string;
  readonly packageName: string;
  readonly packageVersion: string;
  readonly manifestSha: string;
}

interface PackageJsonMetadata extends PackageIdentity {
  readonly main?: string;
  readonly exports?: Record<string, BaoPackageExportValue>;
}

const isJsonRecord = (value: JsonField): value is JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const optionalStringField = (value: JsonRecord, key: string): string | undefined => {
  const field = value[key];
  return typeof field === "string" ? field : undefined;
};

const optionalRecordField = (value: JsonRecord, key: string): JsonRecord | undefined => {
  const field = value[key];
  if (field === undefined) {
    return undefined;
  }
  return isJsonRecord(field) ? field : undefined;
};

const isStringRecord = (value: JsonField): value is Record<string, string> => {
  if (!isJsonRecord(value)) {
    return false;
  }
  for (const entry of Object.values(value)) {
    if (typeof entry !== "string") {
      return false;
    }
  }
  return true;
};

const isBaoPackageExportValue = (value: JsonField): value is BaoPackageExportValue =>
  typeof value === "string" || isStringRecord(value);

const optionalExportsField = (
  value: JsonRecord,
  key: string,
): Record<string, BaoPackageExportValue> | undefined => {
  const record = optionalRecordField(value, key);
  if (record === undefined) {
    return undefined;
  }
  const exports: Record<string, BaoPackageExportValue> = {};
  for (const [entryKey, entryValue] of Object.entries(record)) {
    if (!isBaoPackageExportValue(entryValue)) {
      return undefined;
    }
    exports[entryKey] = entryValue;
  }
  return exports;
};

interface SignedBaoManifest {
  readonly manifest: CanonicalBaoManifest;
  readonly manifestSignature: Uint8Array;
}

const assertLockMatchesIdentity = (lock: BaoLock, identity: PackageIdentity, packageId: string) => {
  if (
    lock.id !== packageId ||
    lock.packageName !== identity.name ||
    lock.packageVersion !== identity.version
  ) {
    throw new Error("bao.lock identity does not match package.json");
  }
};

const assertGovernanceMatchesIdentity = (
  governance: BaoManifest,
  identity: PackageIdentity,
  packageId: string,
) => {
  if (governance.mediaType !== BAO_ARCHIVE_MEDIA_TYPE) {
    throw new Error(`bao-governance.json mediaType must be ${BAO_ARCHIVE_MEDIA_TYPE}`);
  }
  const govIdentity = governance.identity;
  if (govIdentity.id !== packageId) {
    throw new Error(
      `bao-governance.json identity.id (${String(govIdentity.id)}) does not match package.json name (${identity.name})`,
    );
  }
  if (govIdentity.packageName !== identity.name) {
    throw new Error("bao-governance.json identity.packageName does not match package.json");
  }
  if (govIdentity.packageVersion !== identity.version) {
    throw new Error("bao-governance.json identity.packageVersion does not match package.json");
  }
};

const assertRegistryDependencyResolved = (entry: BaoLock["resolved"][number]) => {
  if (entry.ociDigest === null || entry.integrity === null || entry.signature === null) {
    throw new Error(
      `${entry.name}: bao.lock oci-registry entry missing ociDigest/integrity/signature`,
    );
  }
};

const assertPendingDependencyUnresolved = (entry: BaoLock["resolved"][number]) => {
  if (entry.ociDigest !== null || entry.integrity !== null || entry.signature !== null) {
    throw new Error(
      `${entry.name}: bao.lock pending-publish entry must have null ociDigest/integrity/signature`,
    );
  }
};

const assertBaohausDependencyMetadata = (entry: BaoLock["resolved"][number]) => {
  if (entry.resolvedFrom === "oci-registry") {
    assertRegistryDependencyResolved(entry);
    return;
  }
  if (entry.resolvedFrom === "pending-publish") {
    assertPendingDependencyUnresolved(entry);
    return;
  }
  throw new Error(
    `${entry.name}: bao.lock resolvedFrom "${entry.resolvedFrom}" is not a recognized resolution origin`,
  );
};

const assertResolvedDependencyMetadata = (lock: BaoLock) => {
  for (const entry of lock.resolved.filter((dependency) =>
    dependency.name.startsWith("@baohaus/"),
  )) {
    assertBaohausDependencyMetadata(entry);
  }
};

function governanceToBaoManifest(
  identity: PackageJsonMetadata,
  packageId: string,
  lock: BaoLock,
  additionalTargets: CanonicalBaoManifest["targets"] = [],
): CanonicalBaoManifest {
  const packageTarget: CanonicalBaoManifest["targets"][number] = {
    kind: "bao-package",
    packageName: identity.name,
    packageVersion: identity.version,
    target: `${packageId}-default`,
    ...(identity.exports === undefined ? {} : { exports: identity.exports }),
    dependencyLock: lock.resolved.map((dep) => ({
      name: dep.name,
      version: dep.version,
    })),
  };
  return {
    $schema: "https://bao.haus/schemas/bao-manifest-v1.schema.json",
    schemaVersion: 1,
    metadata: {
      name: packageId,
      version: identity.version,
      description: `${identity.name} — Baohaus package`,
      source: `pkg:baohaus/${encodeURIComponent(identity.name)}@${identity.version}`,
    },
    dependencies: lock.resolved.map((dep) => ({
      name: dep.name,
      required: true,
    })),
    targets: [packageTarget, ...additionalTargets],
  };
}

function copyStringTargetField(
  targetRecord: CanonicalBaoManifest["targets"][number],
  key: string,
  value: string | undefined,
): void {
  if (value !== undefined) {
    targetRecord[key] = value;
  }
}

function copyBooleanTargetField(
  targetRecord: CanonicalBaoManifest["targets"][number],
  key: string,
  value: boolean | undefined,
): void {
  if (value !== undefined) {
    targetRecord[key] = value;
  }
}

function copyStringArrayTargetField(
  targetRecord: CanonicalBaoManifest["targets"][number],
  key: string,
  value: string[] | undefined,
): void {
  if (value !== undefined) {
    targetRecord[key] = value;
  }
}

function governanceTargetToCanonicalTarget(
  target: NonNullable<BaoManifest["targets"]>[number],
): CanonicalBaoManifest["targets"][number] {
  const targetRecord: CanonicalBaoManifest["targets"][number] = {
    kind: target.kind,
    target: target.target,
  };
  copyStringTargetField(targetRecord, "module", target.module);
  copyStringTargetField(targetRecord, "nodeModule", target.nodeModule);
  copyStringTargetField(targetRecord, "sidebarModule", target.sidebarModule);
  copyStringTargetField(targetRecord, "navModule", target.navModule);
  copyStringTargetField(targetRecord, "routeModule", target.routeModule);
  copyStringTargetField(targetRecord, "pluginModule", target.pluginModule);
  copyStringTargetField(targetRecord, "settingsTabModule", target.settingsTabModule);
  copyStringTargetField(targetRecord, "paletteEntryGroupModule", target.paletteEntryGroupModule);
  copyStringTargetField(targetRecord, "apiGroupModule", target.apiGroupModule);
  copyStringTargetField(targetRecord, "tileGroupModule", target.tileGroupModule);
  copyStringTargetField(targetRecord, "themeId", target.themeId);
  copyStringTargetField(targetRecord, "colorScheme", target.colorScheme);
  copyStringTargetField(targetRecord, "daisyUiVersionRange", target.daisyUiVersionRange);
  copyStringTargetField(targetRecord, "stylesheet", target.stylesheet);
  copyStringTargetField(targetRecord, "tokenSetId", target.tokenSetId);
  copyStringArrayTargetField(targetRecord, "categories", target.categories);
  copyStringTargetField(targetRecord, "presetId", target.presetId);
  copyStringTargetField(targetRecord, "profile", target.profile);
  copyBooleanTargetField(targetRecord, "respectsReducedMotion", target.respectsReducedMotion);
  copyStringTargetField(targetRecord, "density", target.density);
  return targetRecord;
}

const signBaoManifest = async (manifest: CanonicalBaoManifest): Promise<SignedBaoManifest> => {
  const signingKey = await loadCanonicalArchiveSigningKey(await readArchiveSigningPrivateJwk());
  return await signCanonicalBaoManifest({
    manifest,
    signingKey,
    transparencyLog: readArchiveSignatureTransparencyLog(),
  });
};

function shouldSkipPayloadEntry(
  dir: string,
  root: string,
  excluded: ReadonlySet<string>,
  entryName: string,
): boolean {
  return dir === root && excluded.has(entryName);
}

function readPayloadEntry(
  entry: Dirent,
  entryPath: string,
  archivePath: string,
  files: Record<string, string>,
): string | null {
  if (entry.isDirectory()) {
    return archivePath;
  }
  if (entry.isFile()) {
    files[archivePath] = readFileSync(entryPath, "utf8");
  }
  return null;
}

const readDirectoryPayload = (
  root: string,
  archivePrefix: string,
  excludedRootEntries: readonly string[] = [],
): Record<string, string> => {
  if (!(existsSync(root) && statSync(root).isDirectory())) {
    throw new Error(`buildBaoArchive: payload root ./${root} is not a directory`);
  }
  const files: Record<string, string> = {};
  const excluded = new Set(excludedRootEntries);
  const walkDir = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (shouldSkipPayloadEntry(dir, root, excluded, entry.name)) {
        continue;
      }
      const entryPath = join(dir, entry.name);
      const archivePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const childPrefix = readPayloadEntry(entry, entryPath, archivePath, files);
      if (childPrefix !== null) {
        walkDir(entryPath, childPrefix);
      }
    }
  };
  walkDir(root, archivePrefix);
  return files;
};

const readSourcePayload = (): Record<string, string> => readDirectoryPayload("src", "src");

const readDistPayload = (): Record<string, string> => {
  if (!(existsSync("dist") && statSync("dist").isDirectory())) {
    return {};
  }
  return readDirectoryPayload("dist", "dist", ["bao"]);
};

const readPackagePayload = (): Record<string, string> => ({
  "package.json": readFileSync("package.json", "utf8"),
  ...(existsSync("dist/index.js") ? { "index.js": 'export * from "./dist/index.js";\n' } : {}),
});

const resolvePackageExports = (
  declaredExports: Record<string, BaoPackageExportValue> | undefined,
  packageMain: string | undefined,
): Record<string, BaoPackageExportValue> | undefined => {
  if (declaredExports !== undefined) {
    return declaredExports;
  }
  if (packageMain !== undefined) {
    return { ".": packageMain };
  }
  if (existsSync("dist/index.js")) {
    return { ".": "./index.js" };
  }
  return undefined;
};

const buildBaoArchive = async (
  options: BuildBaoArchiveOptions = {},
): Promise<BuildBaoArchiveResult> => {
  const outputDir = options.outputDir ?? BAO_ARCHIVE_OUTPUT_DIR;
  const buildMetadataDir = ".bao-build";

  const packageJson: JsonRecord = await Bun.file("package.json").json();
  const packageIdentity = assertPackageIdentity(packageJson);
  const packageMain = optionalStringField(packageJson, "main");
  const packageExports = resolvePackageExports(
    optionalExportsField(packageJson, "exports"),
    packageMain,
  );
  const identity: PackageJsonMetadata = {
    ...packageIdentity,
    ...(packageMain === undefined ? {} : { main: packageMain }),
    ...(packageExports === undefined ? {} : { exports: packageExports }),
  };
  const governance = assertBaoManifest(await Bun.file(BAO_GOVERNANCE_ENTRY).json());
  const lock = assertBaoLock(await Bun.file(BAO_LOCK_ENTRY).json());

  const packageId = identity.name.replace(BAOHAUS_NAME_PREFIX, "");

  assertGovernanceMatchesIdentity(governance, identity, packageId);
  assertLockMatchesIdentity(lock, identity, packageId);
  assertResolvedDependencyMetadata(lock);

  mkdirSync(outputDir, { recursive: true });
  mkdirSync(buildMetadataDir, { recursive: true });
  await Bun.write(`${buildMetadataDir}/${BAO_GOVERNANCE_ENTRY}`, canonicalJson(governance));
  await Bun.write(`${buildMetadataDir}/${BAO_LOCK_ENTRY}`, canonicalJson(lock));

  const signedManifest = await signBaoManifest(
    governanceToBaoManifest(identity, packageId, lock, [
      ...(governance.targets ?? []).map(governanceTargetToCanonicalTarget),
      ...(options.targets ?? []),
    ]),
  );
  const manifest = signedManifest.manifest;
  const manifestBin = encodeBaoManifestBin(signedManifest.manifest);
  const manifestJson = canonicalJson(manifest);
  const manifestSha = sha256Hex(manifestJson);

  const attestations = buildAttestationsFromGovernance(
    governance,
    identity,
    manifestSha,
    packageId,
    lock,
  );
  await Bun.write(
    `${buildMetadataDir}/${governance.sbom}`,
    `${JSON.stringify(attestations.sbomCycloneDx, null, 2)}\n`,
  );
  await Bun.write(
    `${buildMetadataDir}/${governance.provenance}`,
    `${JSON.stringify(attestations.slsa)}\n`,
  );
  const distPayload = readDistPayload();
  const payload =
    options.includeSourceTree === true || Object.keys(distPayload).length > 0
      ? {
          shared: {
            ...readPackagePayload(),
            ...distPayload,
            ...(options.includeSourceTree === true ? readSourcePayload() : {}),
          },
        }
      : undefined;

  const archiveInput: BaoArchiveInput = {
    manifest,
    manifestBin,
    manifestSignature: signedManifest.manifestSignature,
    attestations,
    provenance: {
      buildEnvironment: {
        bun: governance.reproducibleBuild.toolchain,
        os: process.platform,
        arch: process.arch,
      },
      dependencyLock: lock,
      dependencyGraph: {
        root: identity.name,
        dependencies: lock.resolved.map((dep) => dep.name),
      },
      licenses: {},
      packument: governance,
    },
    aux: {
      governance: { [BAO_GOVERNANCE_ENTRY]: await Bun.file(BAO_GOVERNANCE_ENTRY).text() },
    },
    ...(payload === undefined ? {} : { payload }),
  };

  const archiveBytes = createBaoArchiveBytes(archiveInput);
  const archive = `${outputDir}/${packageId}.bao`;
  await Bun.write(archive, archiveBytes);

  return {
    archive,
    packageId,
    packageName: identity.name,
    packageVersion: identity.version,
    manifestSha,
  };
};

export { type BuildBaoArchiveOptions, type BuildBaoArchiveResult, buildBaoArchive };
