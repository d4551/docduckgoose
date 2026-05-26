import { dirname, join, relative, resolve } from "node:path";
import type { CatalogPackageEntry } from "./catalog.ts";
import {
  CATALOG_FILE_PATH,
  PACKAGE_SOURCE_ROOT,
  REGISTRY_NAMESPACE,
  REPO_ROOT,
} from "./constants.ts";
import {
  isJsonObject,
  type JsonObject,
  type JsonValue,
  readJsonFile,
  writeJsonFile,
} from "./fs.ts";

const BAO_ARCHIVE_MEDIA_TYPE = "application/vnd.baohaus.bao.archive.v1+tar" as const;
const BAO_FORMAT_KINDS = ["canonical"] as const;
const BAO_MANIFEST_ENCODINGS = ["json"] as const;
const BAO_MANIFEST_SCHEMA_VERSION = 1 as const;
const BAO_SPEC_REVISION = "1.0.0" as const;

const BAO_MANIFEST_SCHEMA_PATH = join(REPO_ROOT, "bao", "schemas", "bao-manifest-v1.schema.json");

function isStringArray(value: JsonValue | undefined): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function isStringOrNull(value: JsonValue | undefined): value is string | null {
  return value === null || typeof value === "string";
}

function isPackageBaoGovernanceSignature(
  value: JsonValue | undefined,
): value is PackageBaoGovernanceSignature | null {
  if (value === null) {
    return true;
  }
  return (
    isJsonObject(value) &&
    typeof value.provider === "string" &&
    typeof value.bundle === "string" &&
    (value.keyId === undefined || typeof value.keyId === "string") &&
    (value.transparencyLog === undefined || typeof value.transparencyLog === "string")
  );
}

function isPackageBaoGovernanceDependency(
  value: JsonValue,
): value is PackageBaoGovernanceDependency {
  return (
    isJsonObject(value) &&
    typeof value.name === "string" &&
    typeof value.version === "string" &&
    typeof value.ociRepository === "string" &&
    isStringOrNull(value.ociDigest) &&
    isStringOrNull(value.integrity) &&
    isPackageBaoGovernanceSignature(value.signature)
  );
}

function isPackageBaoGovernanceManifest(
  value: JsonValue,
): value is JsonObject & PackageBaoGovernanceManifest {
  if (!isJsonObject(value)) {
    return false;
  }
  const identity = value.identity;
  const classification = value.classification;
  const runtime = value.runtime;
  const publish = value.publish;
  const reproducibleBuild = value.reproducibleBuild;
  const sandbox = value.sandbox;

  return (
    typeof value.$schema === "string" &&
    value.schemaVersion === BAO_MANIFEST_SCHEMA_VERSION &&
    value.specRevision === BAO_SPEC_REVISION &&
    value.mediaType === BAO_ARCHIVE_MEDIA_TYPE &&
    value.formatKind === BAO_FORMAT_KINDS[0] &&
    value.manifestEncoding === BAO_MANIFEST_ENCODINGS[0] &&
    isJsonObject(identity) &&
    typeof identity.id === "string" &&
    typeof identity.packageName === "string" &&
    typeof identity.packageVersion === "string" &&
    typeof identity.ociRepository === "string" &&
    identity.registryNamespace === REGISTRY_NAMESPACE &&
    isJsonObject(classification) &&
    typeof classification.channel === "string" &&
    typeof classification.visibility === "string" &&
    typeof classification.packageKind === "string" &&
    isJsonObject(runtime) &&
    typeof runtime.installable === "boolean" &&
    isStringArray(runtime.composeDependencies) &&
    isJsonObject(publish) &&
    typeof publish.gateProfile === "string" &&
    Array.isArray(value.dependencies) &&
    value.dependencies.every((dependency) => isPackageBaoGovernanceDependency(dependency)) &&
    typeof value.sbom === "string" &&
    typeof value.provenance === "string" &&
    isJsonObject(reproducibleBuild) &&
    typeof reproducibleBuild.sourceDateEpoch === "number" &&
    isJsonObject(reproducibleBuild.toolchain) &&
    typeof reproducibleBuild.toolchain.bun === "string" &&
    (sandbox === undefined || isJsonObject(sandbox))
  );
}

function toRelativeSchemaRef(packageSourceDirectory: string): string {
  const path = relative(packageSourceDirectory, BAO_MANIFEST_SCHEMA_PATH).replaceAll("\\", "/");
  return path.startsWith(".") ? path : `./${path}`;
}

function catalogParityShape(
  manifest: PackageBaoGovernanceManifest,
): PackageBaoGovernanceCatalogShape {
  return {
    schemaVersion: manifest.schemaVersion,
    specRevision: manifest.specRevision,
    mediaType: manifest.mediaType,
    formatKind: manifest.formatKind,
    manifestEncoding: manifest.manifestEncoding,
    identity: manifest.identity,
    classification: manifest.classification,
    runtime: manifest.runtime,
    publish: manifest.publish,
    sbom: manifest.sbom,
    provenance: manifest.provenance,
    reproducibleBuild: manifest.reproducibleBuild,
  };
}

function canonicalizeManifestCatalogFields(manifest: PackageBaoGovernanceManifest): string {
  return JSON.stringify(catalogParityShape(manifest));
}

function hasManifestParity(
  left: PackageBaoGovernanceManifest,
  right: PackageBaoGovernanceManifest,
): boolean {
  return canonicalizeManifestCatalogFields(left) === canonicalizeManifestCatalogFields(right);
}

type PackageBaoGovernanceCatalogShape = Pick<
  PackageBaoGovernanceManifest,
  | "schemaVersion"
  | "specRevision"
  | "mediaType"
  | "formatKind"
  | "manifestEncoding"
  | "identity"
  | "classification"
  | "runtime"
  | "publish"
  | "sbom"
  | "provenance"
  | "reproducibleBuild"
>;

export function renderPackageBaoGovernanceManifest(
  entry: CatalogPackageEntry,
): PackageBaoGovernanceManifest {
  const packageSourceDirectory = resolvePackageSourceDirectory(entry);
  return {
    $schema: toRelativeSchemaRef(packageSourceDirectory),
    schemaVersion: BAO_MANIFEST_SCHEMA_VERSION,
    specRevision: BAO_SPEC_REVISION,
    mediaType: BAO_ARCHIVE_MEDIA_TYPE,
    formatKind: BAO_FORMAT_KINDS[0],
    manifestEncoding: BAO_MANIFEST_ENCODINGS[0],
    identity: {
      id: entry.id,
      packageName: entry.packageName,
      packageVersion: entry.packageVersion,
      ociRepository: entry.ociRepository,
      registryNamespace: REGISTRY_NAMESPACE,
    },
    classification: {
      channel: entry.channel,
      visibility: entry.visibility,
      packageKind: entry.packageKind,
    },
    runtime: {
      installable: entry.runtimeInstallable,
      composeDependencies: [...entry.composeDependencies],
    },
    publish: {
      gateProfile: entry.publishGateProfile,
    },
    dependencies: [],
    sbom: "SBOM.cdx.json",
    provenance: "SLSA.provenance.intoto.jsonl",
    reproducibleBuild: {
      sourceDateEpoch: 1_745_366_400,
      toolchain: {
        bun: "1.3.13",
      },
    },
  };
}

export function resolvePackageSourceDirectory(entry: CatalogPackageEntry): string {
  return resolve(dirname(CATALOG_FILE_PATH), entry.targetSourceProjectPath);
}

export function resolvePackageBaoGovernanceManifestPath(entry: CatalogPackageEntry): string {
  return join(resolvePackageSourceDirectory(entry), "bao-governance.json");
}

export async function loadPackageBaoGovernanceManifest(
  entry: CatalogPackageEntry,
): Promise<PackageBaoGovernanceManifest | null> {
  const path = resolvePackageBaoGovernanceManifestPath(entry);
  const file = Bun.file(path);
  if (!(await file.exists())) {
    return null;
  }
  const value = await readJsonFile(path);
  if (!isPackageBaoGovernanceManifest(value)) {
    throw new Error(`Invalid bao-governance.json: ${path}`);
  }
  return value;
}

export async function writePackageBaoGovernanceManifest(entry: CatalogPackageEntry): Promise<void> {
  if (entry.layoutVariant !== "nested-workspace") {
    const expectedPrefix = `${PACKAGE_SOURCE_ROOT}/`;
    if (!entry.targetSourceProjectPath.startsWith(expectedPrefix)) {
      throw new Error(
        `Catalog entry "${entry.id}" targetSourceProjectPath must start with "${expectedPrefix}"`,
      );
    }
  }
  const manifest = renderPackageBaoGovernanceManifest(entry);
  const path = resolvePackageBaoGovernanceManifestPath(entry);
  await writeJsonFile(path, manifest);
}

export function isManifestParityEqual(
  left: PackageBaoGovernanceManifest,
  right: PackageBaoGovernanceManifest,
): boolean {
  return hasManifestParity(left, right);
}

export interface PackageBaoGovernanceManifest {
  $schema: string;
  schemaVersion: typeof BAO_MANIFEST_SCHEMA_VERSION;
  specRevision: typeof BAO_SPEC_REVISION;
  mediaType: typeof BAO_ARCHIVE_MEDIA_TYPE;
  formatKind: (typeof BAO_FORMAT_KINDS)[0];
  manifestEncoding: (typeof BAO_MANIFEST_ENCODINGS)[0];
  identity: {
    id: string;
    packageName: string;
    packageVersion: string;
    ociRepository: string;
    registryNamespace: typeof REGISTRY_NAMESPACE;
  };
  classification: {
    channel: CatalogPackageEntry["channel"];
    visibility: CatalogPackageEntry["visibility"];
    packageKind: CatalogPackageEntry["packageKind"];
  };
  runtime: {
    installable: boolean;
    composeDependencies: string[];
  };
  publish: {
    gateProfile: string;
  };
  dependencies: PackageBaoGovernanceDependency[];
  sbom: string;
  provenance: string;
  reproducibleBuild: {
    sourceDateEpoch: number;
    toolchain: {
      bun: string;
    };
  };
  sandbox?: JsonObject;
}

export interface PackageBaoGovernanceSignature extends JsonObject {
  provider: string;
  bundle: string;
  keyId?: string;
  transparencyLog?: string;
}

export interface PackageBaoGovernanceDependency extends JsonObject {
  name: string;
  version: string;
  ociRepository: string;
  ociDigest: string | null;
  integrity: string | null;
  signature: PackageBaoGovernanceSignature | null;
}
