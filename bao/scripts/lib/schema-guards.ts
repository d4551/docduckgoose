type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}
type JsonRecord = JsonObject;
const BAO_CHANNEL = ["public", "internal", "test", "labs"] as const;
const BAO_VISIBILITY = ["public", "hidden"] as const;
const BAO_PACKAGE_KIND = ["library", "runtime-package", "extension", "internal", "test"] as const;
const BAO_RESOLVED_FROM = ["oci-registry", "pending-publish"] as const;
const BAO_TARGET_KIND = [
  "bao-package",
  "better-auth-extension",
  "htmx-extension",
  "prisma-extension",
  "elysia-plugin",
  "baodown-node",
  "bun-plugin",
  "flatbuffer-schema",
  "hardware-driver",
  "ai-model",
  "baodown-flow",
  "bunbuddy-contract",
  "bao-runtime-workload",
  "config-overlay",
  "mcp-provider",
  "oci-image",
  "usd-scene",
  "ui-component-kit",
  "theme-pack",
  "design-tokens",
  "motion-preset",
  "density-preset",
  "sidebar",
  "nav",
  "settings-tab",
  "palette-entry-group",
  "api-group",
  "tile-group",
] as const;
const PACKAGE_NAME_PATTERN = /^@baohaus\/[a-z0-9][a-z0-9-]*$/;
const PACKAGE_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const OCI_REPO_PATTERN = /^baohaus\/[a-z0-9][a-z0-9-]*$/;
const SEMVER_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const OCI_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const SRI_PATTERN = /^sha(?:256|384|512)-[A-Za-z0-9+/]+=*$/;

const fail = (path: string, reason: string): never => {
  throw new Error(`${path}: ${reason}`);
};

const isRecord = (value: JsonField): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const requiredRecord = (value: JsonField, path: string): JsonRecord => {
  if (isRecord(value)) {
    return value;
  }
  return fail(path, "must be object");
};

const requiredString = (value: JsonField, path: string): string => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  return fail(path, "must be non-empty string");
};

const requiredPattern = (
  value: JsonField,
  path: string,
  pattern: RegExp,
  reason: string,
): string => {
  if (typeof value === "string" && pattern.test(value)) {
    return value;
  }
  return fail(path, reason);
};

const requiredLiteral = <T extends string | number>(
  value: JsonField,
  path: string,
  expected: T,
): T => {
  if (value === expected) {
    return expected;
  }
  return fail(path, `must be ${expected}`);
};

const requiredMember = <T extends string>(
  value: JsonField,
  path: string,
  options: readonly T[],
): T => {
  if (typeof value === "string") {
    for (const option of options) {
      if (option === value) {
        return option;
      }
    }
  }
  return fail(path, `must be one of ${options.join(" | ")}`);
};

const requiredBoolean = (value: JsonField, path: string): boolean => {
  if (typeof value === "boolean") {
    return value;
  }
  return fail(path, "must be boolean");
};

const requiredNonNegativeNumber = (value: JsonField, path: string): number => {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
    return value;
  }
  return fail(path, "must be non-negative integer");
};

const requiredStringArray = (value: JsonField, path: string): string[] => {
  if (Array.isArray(value) && value.every((entry) => typeof entry === "string")) {
    return value;
  }
  return fail(path, "must be string[]");
};

const requiredArray = (value: JsonField, path: string): JsonValue[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return fail(path, "must be array");
};

const optionalSchema = (record: JsonRecord): { $schema?: string } => {
  const schema = record.$schema;
  if (typeof schema === "string" && schema.length > 0) {
    return { $schema: schema };
  }
  return {};
};

const guardSignature = (value: JsonField, path: string): BaoSignature | null => {
  if (value === null) {
    return null;
  }
  const record = requiredRecord(value, path);
  const keyId = record.keyId;
  const transparencyLog = record.transparencyLog;
  return {
    provider: requiredString(record.provider, `${path}.provider`),
    bundle: requiredString(record.bundle, `${path}.bundle`),
    ...(typeof keyId === "string" && keyId.length > 0 ? { keyId } : {}),
    ...(typeof transparencyLog === "string" && transparencyLog.length > 0
      ? { transparencyLog }
      : {}),
  };
};

const guardDigest = (value: JsonField, path: string): string | null => {
  if (value === null) {
    return null;
  }
  return requiredPattern(value, path, OCI_DIGEST_PATTERN, "must be sha256:<64-hex>");
};

const guardIntegrity = (value: JsonField, path: string): string | null => {
  if (value === null) {
    return null;
  }
  return requiredPattern(value, path, SRI_PATTERN, "must be valid SRI hash");
};

const guardDependency = (value: JsonField, path: string): BaoDependency => {
  const record = requiredRecord(value, path);
  return {
    name: requiredPattern(
      record.name,
      `${path}.name`,
      PACKAGE_NAME_PATTERN,
      "must match @baohaus/<slug>",
    ),
    version: requiredPattern(record.version, `${path}.version`, SEMVER_PATTERN, "must be semver"),
    ociRepository: requiredPattern(
      record.ociRepository,
      `${path}.ociRepository`,
      OCI_REPO_PATTERN,
      "must match baohaus/<slug>",
    ),
    ociDigest: guardDigest(record.ociDigest, `${path}.ociDigest`),
    integrity: guardIntegrity(record.integrity, `${path}.integrity`),
    signature: guardSignature(record.signature, `${path}.signature`),
  };
};

const guardResolvedDependency = (value: JsonField, path: string): BaoLockResolved => {
  const record = requiredRecord(value, path);
  return {
    ...guardDependency(record, path),
    resolvedFrom: requiredMember(record.resolvedFrom, `${path}.resolvedFrom`, BAO_RESOLVED_FROM),
  };
};

const optionalNonEmptyString = (value: JsonField): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const optionalBoolean = (value: JsonField): boolean | undefined =>
  typeof value === "boolean" ? value : undefined;

const optionalStringArray = (value: JsonField, path: string): string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }
  return requiredStringArray(value, path);
};

const guardGovernanceTarget = (value: JsonField, path: string): BaoGovernanceTarget => {
  const record = requiredRecord(value, path);
  const target: BaoGovernanceTarget = {
    kind: requiredMember(record.kind, `${path}.kind`, BAO_TARGET_KIND),
    target: requiredString(record.target, `${path}.target`),
  };
  const module = optionalNonEmptyString(record.module);
  if (module !== undefined) target.module = module;
  const nodeModule = optionalNonEmptyString(record.nodeModule);
  if (nodeModule !== undefined) target.nodeModule = nodeModule;
  const sidebarModule = optionalNonEmptyString(record.sidebarModule);
  if (sidebarModule !== undefined) target.sidebarModule = sidebarModule;
  const navModule = optionalNonEmptyString(record.navModule);
  if (navModule !== undefined) target.navModule = navModule;
  const routeModule = optionalNonEmptyString(record.routeModule);
  if (routeModule !== undefined) target.routeModule = routeModule;
  const pluginModule = optionalNonEmptyString(record.pluginModule);
  if (pluginModule !== undefined) target.pluginModule = pluginModule;
  const settingsTabModule = optionalNonEmptyString(record.settingsTabModule);
  if (settingsTabModule !== undefined) target.settingsTabModule = settingsTabModule;
  const paletteEntryGroupModule = optionalNonEmptyString(record.paletteEntryGroupModule);
  if (paletteEntryGroupModule !== undefined)
    target.paletteEntryGroupModule = paletteEntryGroupModule;
  const apiGroupModule = optionalNonEmptyString(record.apiGroupModule);
  if (apiGroupModule !== undefined) target.apiGroupModule = apiGroupModule;
  const tileGroupModule = optionalNonEmptyString(record.tileGroupModule);
  if (tileGroupModule !== undefined) target.tileGroupModule = tileGroupModule;
  const themeId = optionalNonEmptyString(record.themeId);
  if (themeId !== undefined) target.themeId = themeId;
  const colorScheme = optionalNonEmptyString(record.colorScheme);
  if (colorScheme !== undefined) target.colorScheme = colorScheme;
  const daisyUiVersionRange = optionalNonEmptyString(record.daisyUiVersionRange);
  if (daisyUiVersionRange !== undefined) target.daisyUiVersionRange = daisyUiVersionRange;
  const stylesheet = optionalNonEmptyString(record.stylesheet);
  if (stylesheet !== undefined) target.stylesheet = stylesheet;
  const tokenSetId = optionalNonEmptyString(record.tokenSetId);
  if (tokenSetId !== undefined) target.tokenSetId = tokenSetId;
  const categories = optionalStringArray(record.categories, `${path}.categories`);
  if (categories !== undefined) target.categories = categories;
  const presetId = optionalNonEmptyString(record.presetId);
  if (presetId !== undefined) target.presetId = presetId;
  const profile = optionalNonEmptyString(record.profile);
  if (profile !== undefined) target.profile = profile;
  const respectsReducedMotion = optionalBoolean(record.respectsReducedMotion);
  if (respectsReducedMotion !== undefined) target.respectsReducedMotion = respectsReducedMotion;
  const density = optionalNonEmptyString(record.density);
  if (density !== undefined) target.density = density;
  return target;
};

const guardSourceRepository = (value: JsonField, path: string): BaoSourceRepository => {
  const record = requiredRecord(value, path);
  return {
    kind: requiredLiteral(record.kind, `${path}.kind`, "forge"),
    namespace: requiredPattern(
      record.namespace,
      `${path}.namespace`,
      PACKAGE_ID_PATTERN,
      "must match slug pattern",
    ),
    slug: requiredPattern(
      record.slug,
      `${path}.slug`,
      PACKAGE_ID_PATTERN,
      "must match slug pattern",
    ),
  };
};

export type BaoChannel = (typeof BAO_CHANNEL)[number];
export type BaoVisibility = (typeof BAO_VISIBILITY)[number];
export type BaoPackageKind = (typeof BAO_PACKAGE_KIND)[number];
export type BaoResolvedFrom = (typeof BAO_RESOLVED_FROM)[number];
export type BaoGovernanceTargetKind = (typeof BAO_TARGET_KIND)[number];

export interface PackageIdentity {
  name: string;
  version: string;
}

export interface BaoSignature {
  provider: string;
  bundle: string;
  keyId?: string;
  transparencyLog?: string;
}

export interface BaoDependency {
  name: string;
  version: string;
  ociRepository: string;
  ociDigest: string | null;
  integrity: string | null;
  signature: BaoSignature | null;
}

export interface BaoSourceRepository {
  kind: "forge";
  namespace: string;
  slug: string;
}

export interface BaoGovernanceTarget {
  kind: BaoGovernanceTargetKind;
  target: string;
  module?: string | undefined;
  nodeModule?: string | undefined;
  sidebarModule?: string | undefined;
  navModule?: string | undefined;
  routeModule?: string | undefined;
  pluginModule?: string | undefined;
  settingsTabModule?: string | undefined;
  paletteEntryGroupModule?: string | undefined;
  apiGroupModule?: string | undefined;
  tileGroupModule?: string | undefined;
  themeId?: string | undefined;
  colorScheme?: string | undefined;
  daisyUiVersionRange?: string | undefined;
  stylesheet?: string | undefined;
  tokenSetId?: string | undefined;
  categories?: string[] | undefined;
  presetId?: string | undefined;
  profile?: string | undefined;
  respectsReducedMotion?: boolean | undefined;
  density?: string | undefined;
}

export interface BaoManifest {
  $schema?: string;
  schemaVersion: 1;
  specRevision: "1.0.0";
  mediaType: "application/vnd.baohaus.bao.archive.v1+tar";
  formatKind: "canonical";
  manifestEncoding: "json";
  identity: {
    id: string;
    packageName: string;
    packageVersion: string;
    ociRepository: string;
    registryNamespace: "baohaus";
  };
  classification: {
    channel: BaoChannel;
    visibility: BaoVisibility;
    packageKind: BaoPackageKind;
  };
  runtime: {
    installable: boolean;
    composeDependencies: string[];
  };
  publish: {
    gateProfile: string;
  };
  dependencies: BaoDependency[];
  targets?: BaoGovernanceTarget[];
  sourceRepository?: BaoSourceRepository;
  sbom: string;
  provenance: string;
  reproducibleBuild: {
    sourceDateEpoch: number;
    toolchain: { bun: string };
  };
  sandbox?: JsonObject;
}

export type BaoLockResolved = BaoDependency & {
  resolvedFrom: BaoResolvedFrom;
};

export interface BaoLock {
  $schema?: string;
  schemaVersion: 1;
  id: string;
  packageName: string;
  packageVersion: string;
  resolved: BaoLockResolved[];
}

export const assertBaoManifest = (value: JsonField): BaoManifest => {
  const record = requiredRecord(value, "bao-governance.json");
  requiredLiteral(record.schemaVersion, "bao-governance.json.schemaVersion", 1);
  requiredLiteral(record.specRevision, "bao-governance.json.specRevision", "1.0.0");
  requiredLiteral(
    record.mediaType,
    "bao-governance.json.mediaType",
    "application/vnd.baohaus.bao.archive.v1+tar",
  );
  requiredLiteral(record.formatKind, "bao-governance.json.formatKind", "canonical");
  requiredLiteral(record.manifestEncoding, "bao-governance.json.manifestEncoding", "json");

  const identity = requiredRecord(record.identity, "bao-governance.json.identity");
  const classification = requiredRecord(
    record.classification,
    "bao-governance.json.classification",
  );
  const runtime = requiredRecord(record.runtime, "bao-governance.json.runtime");
  const publish = requiredRecord(record.publish, "bao-governance.json.publish");
  const reproducibleBuild = requiredRecord(
    record.reproducibleBuild,
    "bao-governance.json.reproducibleBuild",
  );
  const toolchain = requiredRecord(
    reproducibleBuild.toolchain,
    "bao-governance.json.reproducibleBuild.toolchain",
  );

  const dependencies =
    record.dependencies === undefined
      ? []
      : requiredArray(record.dependencies, "bao-governance.json.dependencies").map(
          (entry: JsonValue, index: number) =>
            guardDependency(entry, `bao-governance.json.dependencies[${index}]`),
        );

  const result: BaoManifest = {
    ...optionalSchema(record),
    schemaVersion: 1,
    specRevision: "1.0.0",
    mediaType: "application/vnd.baohaus.bao.archive.v1+tar",
    formatKind: "canonical",
    manifestEncoding: "json",
    identity: {
      id: requiredPattern(
        identity.id,
        "bao-governance.json.identity.id",
        PACKAGE_ID_PATTERN,
        "must match slug pattern",
      ),
      packageName: requiredPattern(
        identity.packageName,
        "bao-governance.json.identity.packageName",
        PACKAGE_NAME_PATTERN,
        "must match @baohaus/<slug>",
      ),
      packageVersion: requiredPattern(
        identity.packageVersion,
        "bao-governance.json.identity.packageVersion",
        SEMVER_PATTERN,
        "must be semver",
      ),
      ociRepository: requiredPattern(
        identity.ociRepository,
        "bao-governance.json.identity.ociRepository",
        OCI_REPO_PATTERN,
        "must match baohaus/<slug>",
      ),
      registryNamespace: requiredLiteral(
        identity.registryNamespace,
        "bao-governance.json.identity.registryNamespace",
        "baohaus",
      ),
    },
    classification: {
      channel: requiredMember(
        classification.channel,
        "bao-governance.json.classification.channel",
        BAO_CHANNEL,
      ),
      visibility: requiredMember(
        classification.visibility,
        "bao-governance.json.classification.visibility",
        BAO_VISIBILITY,
      ),
      packageKind: requiredMember(
        classification.packageKind,
        "bao-governance.json.classification.packageKind",
        BAO_PACKAGE_KIND,
      ),
    },
    runtime: {
      installable: requiredBoolean(runtime.installable, "bao-governance.json.runtime.installable"),
      composeDependencies: [
        ...requiredStringArray(
          runtime.composeDependencies,
          "bao-governance.json.runtime.composeDependencies",
        ),
      ],
    },
    publish: {
      gateProfile: requiredString(publish.gateProfile, "bao-governance.json.publish.gateProfile"),
    },
    dependencies,
    ...(record.targets === undefined
      ? {}
      : {
          targets: requiredArray(record.targets, "bao-governance.json.targets").map(
            (entry: JsonValue, index: number) =>
              guardGovernanceTarget(entry, `bao-governance.json.targets[${index}]`),
          ),
        }),
    ...(record.sourceRepository === undefined
      ? {}
      : {
          sourceRepository: guardSourceRepository(
            record.sourceRepository,
            "bao-governance.json.sourceRepository",
          ),
        }),
    sbom: requiredString(record.sbom, "bao-governance.json.sbom"),
    provenance: requiredString(record.provenance, "bao-governance.json.provenance"),
    reproducibleBuild: {
      sourceDateEpoch: requiredNonNegativeNumber(
        reproducibleBuild.sourceDateEpoch,
        "bao-governance.json.reproducibleBuild.sourceDateEpoch",
      ),
      toolchain: {
        bun: requiredPattern(
          toolchain.bun,
          "bao-governance.json.reproducibleBuild.toolchain.bun",
          SEMVER_PATTERN,
          "must be semver",
        ),
      },
    },
  };

  const sandbox = record.sandbox;
  if (sandbox !== undefined) {
    result.sandbox = requiredRecord(sandbox, "bao-governance.json.sandbox");
  }

  return result;
};

export const assertBaoLock = (value: JsonField): BaoLock => {
  const record = requiredRecord(value, "bao.lock");
  const resolved = requiredArray(record.resolved, "bao.lock.resolved").map(
    (entry: JsonValue, index: number) =>
      guardResolvedDependency(entry, `bao.lock.resolved[${index}]`),
  );

  return {
    ...optionalSchema(record),
    schemaVersion: requiredLiteral(record.schemaVersion, "bao.lock.schemaVersion", 1),
    id: requiredPattern(record.id, "bao.lock.id", PACKAGE_ID_PATTERN, "must match slug pattern"),
    packageName: requiredPattern(
      record.packageName,
      "bao.lock.packageName",
      PACKAGE_NAME_PATTERN,
      "must match @baohaus/<slug>",
    ),
    packageVersion: requiredPattern(
      record.packageVersion,
      "bao.lock.packageVersion",
      SEMVER_PATTERN,
      "must be semver",
    ),
    resolved,
  };
};

export const assertPackageIdentity = (value: JsonField): PackageIdentity => {
  const record = requiredRecord(value, "package.json");
  return {
    name: requiredPattern(
      record.name,
      "package.json.name",
      PACKAGE_NAME_PATTERN,
      "must match @baohaus/<slug>",
    ),
    version: requiredPattern(
      record.version,
      "package.json.version",
      SEMVER_PATTERN,
      "must be semver",
    ),
  };
};
