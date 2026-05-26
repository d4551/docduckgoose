/** Generated from checked-in `.bao` archives in dist/bao/ */
/** DO NOT EDIT MANUALLY - regenerate with: bun scripts/generate-extension-ts-projections.ts */

/**
 * Canonical API plugin-group metadata derived from checked-in `.bao` archives.
 * @generated - source: dist/bao/*-plugins.bao
 */
export const BAO_API_PLUGIN_GROUP_DEFINITIONS = [
  {
    archiveName: "public-core-plugins",
    runtimeName: "public:core",
    scope: "public",
    kind: "core",
  },
  {
    archiveName: "public-api-plugins",
    runtimeName: "public:api",
    scope: "public",
    kind: "api",
  },
  {
    archiveName: "db-backed-core-plugins",
    runtimeName: "db-backed:core",
    scope: "db-backed",
    kind: "core",
  },
  {
    archiveName: "ai-plugins",
    runtimeName: "db-backed:user-ai",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "commerce-plugins",
    runtimeName: "db-backed:system-storage",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "infrastructure-plugins",
    runtimeName: "db-backed:system-storage",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "device-plugins",
    runtimeName: "db-backed:devices",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "visual-plugins",
    runtimeName: "db-backed:visual",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "workflow-plugins",
    runtimeName: "db-backed:cases-bunbuddies",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "api-explorer-plugins",
    runtimeName: "db-backed:api-explorer",
    scope: "db-backed",
    kind: "api",
  },
  {
    archiveName: "public-system-status-plugins",
    runtimeName: "public:system-status",
    scope: "public",
    kind: "core",
  },
  {
    archiveName: "protocol-registry-plugins",
    runtimeName: "public:registry-protocol",
    scope: "public",
    kind: "extension",
  },
  {
    archiveName: "protocol-realtime-plugins",
    runtimeName: "public:realtime-protocol",
    scope: "public",
    kind: "extension",
  },
] as const;

/**
 * Canonical API plugin-group chain in runtime mount order.
 * @generated - source: dist/bao/*-plugins.bao
 */
export const BAO_API_PLUGIN_GROUP_CHAIN = [
  "public:core",
  "public:api",
  "db-backed:core",
  "db-backed:user-ai",
  "db-backed:system-storage",
  "db-backed:devices",
  "db-backed:visual",
  "db-backed:cases-bunbuddies",
  "db-backed:api-explorer",
  "public:system-status",
  "public:registry-protocol",
  "public:realtime-protocol",
] as const;
