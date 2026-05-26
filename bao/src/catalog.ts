import {
  CATALOG_CHANNELS,
  CATALOG_FILE_PATH,
  CATALOG_LAYOUT_VARIANTS,
  CATALOG_PACKAGE_KINDS,
  CATALOG_RUNTIME_AFFINITIES,
  CATALOG_SCHEMA_VERSION,
  CATALOG_VISIBILITIES,
  type CatalogChannel,
  type CatalogLayoutVariant,
  type CatalogPackageKind,
  type CatalogRuntimeAffinity,
  type CatalogVisibility,
  REGISTRY_NAMESPACE,
  RELEASE_AUTHORITY,
  type ReleaseAuthority,
} from "./constants.ts";
import {
  isJsonObject,
  type JsonObject,
  type JsonValue,
  readJsonFile,
  writeJsonFile,
} from "./fs.ts";

function isStringArray(value: JsonValue | undefined): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function isChannel(value: JsonValue | undefined): value is CatalogChannel {
  return typeof value === "string" && CATALOG_CHANNELS.some((entry) => entry === value);
}

function isVisibility(value: JsonValue | undefined): value is CatalogVisibility {
  return typeof value === "string" && CATALOG_VISIBILITIES.some((entry) => entry === value);
}

function isPackageKind(value: JsonValue | undefined): value is CatalogPackageKind {
  return typeof value === "string" && CATALOG_PACKAGE_KINDS.some((entry) => entry === value);
}

function isLayoutVariant(value: JsonValue | undefined): value is CatalogLayoutVariant {
  return typeof value === "string" && CATALOG_LAYOUT_VARIANTS.some((entry) => entry === value);
}

function isRuntimeAffinity(value: JsonValue | undefined): value is CatalogRuntimeAffinity {
  return typeof value === "string" && CATALOG_RUNTIME_AFFINITIES.some((entry) => entry === value);
}

function isRuntimeAffinityArray(value: JsonValue | undefined): value is CatalogRuntimeAffinity[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((entry) => isRuntimeAffinity(entry)) &&
    new Set(value).size === value.length
  );
}

function resolveLayoutVariant(value: JsonValue | undefined): CatalogLayoutVariant {
  if (isLayoutVariant(value)) {
    return value;
  }
  return "monorepo-root";
}

function isStandaloneLayout(value: JsonValue | undefined): value is CatalogStandaloneLayout {
  return value === "standalone-repositories";
}

function isPackageEntry(value: JsonValue): value is JsonObject & CatalogPackageEntry {
  return (
    isJsonObject(value) &&
    typeof value.id === "string" &&
    typeof value.repoRoot === "string" &&
    typeof value.packageRoot === "string" &&
    typeof value.manifestPath === "string" &&
    typeof value.packageName === "string" &&
    typeof value.packageVersion === "string" &&
    value.releaseAuthority === RELEASE_AUTHORITY &&
    isStringArray(value.exportSubpaths) &&
    typeof value.ociRepository === "string" &&
    typeof value.buildCommand === "string" &&
    typeof value.typecheckCommand === "string" &&
    typeof value.testCommand === "string" &&
    typeof value.baoCommand === "string" &&
    typeof value.canonicalBaoOutputPath === "string" &&
    typeof value.publishSmokeTarget === "string" &&
    typeof value.installSmokeTarget === "string" &&
    isChannel(value.channel) &&
    isVisibility(value.visibility) &&
    isPackageKind(value.packageKind) &&
    typeof value.sourceProjectPath === "string" &&
    typeof value.targetSourceProjectPath === "string" &&
    typeof value.runtimeInstallable === "boolean" &&
    typeof value.publishGateProfile === "string" &&
    isStringArray(value.composeDependencies) &&
    isStringArray(value.publicEntrypoints) &&
    typeof value.sourceRepo === "string" &&
    isRuntimeAffinityArray(value.runtimeAffinity) &&
    (value.layoutVariant === undefined || isLayoutVariant(value.layoutVariant))
  );
}

function isCatalogFile(value: JsonValue): value is JsonObject & CatalogFile {
  return (
    isJsonObject(value) &&
    value.schemaVersion === CATALOG_SCHEMA_VERSION &&
    isStandaloneLayout(value.layout) &&
    value.registryNamespace === REGISTRY_NAMESPACE &&
    typeof value.generatedAt === "string" &&
    Array.isArray(value.packages) &&
    value.packages.every((entry) => isPackageEntry(entry))
  );
}

function normalizePackageEntry(entry: CatalogPackageEntry): CatalogPackageEntry {
  return {
    ...entry,
    layoutVariant: resolveLayoutVariant(entry.layoutVariant),
  };
}

export function sortCatalogEntries(entries: readonly CatalogPackageEntry[]): CatalogPackageEntry[] {
  return [...entries].sort((left, right) => left.id.localeCompare(right.id));
}

export async function loadCatalog(): Promise<CatalogFile> {
  const value = await readJsonFile(CATALOG_FILE_PATH);
  if (!isCatalogFile(value)) {
    throw new Error(`${CATALOG_FILE_PATH} has an invalid shape`);
  }
  return {
    ...value,
    packages: sortCatalogEntries(value.packages.map((entry) => normalizePackageEntry(entry))),
  };
}

export async function writeCatalog(catalog: CatalogFile): Promise<void> {
  const payload: CatalogFile = {
    schemaVersion: CATALOG_SCHEMA_VERSION,
    layout: "standalone-repositories",
    registryNamespace: REGISTRY_NAMESPACE,
    generatedAt: catalog.generatedAt,
    packages: sortCatalogEntries(catalog.packages.map((entry) => normalizePackageEntry(entry))),
  };
  await writeJsonFile(CATALOG_FILE_PATH, payload);
}

export type CatalogStandaloneLayout = "standalone-repositories";

export interface CatalogPackageEntry {
  id: string;
  repoRoot: string;
  packageRoot: string;
  manifestPath: string;
  packageName: string;
  packageVersion: string;
  releaseAuthority: ReleaseAuthority;
  exportSubpaths: string[];
  ociRepository: string;
  buildCommand: string;
  typecheckCommand: string;
  testCommand: string;
  baoCommand: string;
  canonicalBaoOutputPath: string;
  publishSmokeTarget: string;
  installSmokeTarget: string;
  channel: CatalogChannel;
  visibility: CatalogVisibility;
  packageKind: CatalogPackageKind;
  sourceProjectPath: string;
  targetSourceProjectPath: string;
  runtimeInstallable: boolean;
  publishGateProfile: string;
  composeDependencies: string[];
  publicEntrypoints: string[];
  sourceRepo: string;
  runtimeAffinity: CatalogRuntimeAffinity[];
  layoutVariant?: CatalogLayoutVariant;
}

export interface CatalogFile {
  schemaVersion: typeof CATALOG_SCHEMA_VERSION;
  layout: CatalogStandaloneLayout;
  registryNamespace: typeof REGISTRY_NAMESPACE;
  generatedAt: string;
  packages: CatalogPackageEntry[];
}
