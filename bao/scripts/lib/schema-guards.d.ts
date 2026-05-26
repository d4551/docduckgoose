type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}
declare const BAO_CHANNEL: readonly ["public", "internal", "test", "labs"];
declare const BAO_VISIBILITY: readonly ["public", "hidden"];
declare const BAO_PACKAGE_KIND: readonly [
  "library",
  "runtime-package",
  "extension",
  "internal",
  "test",
];
declare const BAO_RESOLVED_FROM: readonly ["oci-registry", "pending-publish"];
declare const BAO_TARGET_KIND: readonly [
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
];
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
    toolchain: {
      bun: string;
    };
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
export declare const assertBaoManifest: (value: JsonField) => BaoManifest;
export declare const assertBaoLock: (value: JsonField) => BaoLock;
export declare const assertPackageIdentity: (value: JsonField) => PackageIdentity;
//# sourceMappingURL=schema-guards.d.ts.map
