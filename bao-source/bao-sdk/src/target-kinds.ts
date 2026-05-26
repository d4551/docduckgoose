/**
 * Canonical `.bao` target kind constants and types.
 *
 * @module @baohaus/bao-sdk/target-kinds
 */

/** Canonical `.bao` extension target kinds (subset used by extension loaders). */
export const BAO_EXTENSION_TARGET_KINDS = {
  betterAuth: "better-auth-extension",
  htmx: "htmx-extension",
  prisma: "prisma-extension",
  elysia: "elysia-plugin",
  baodownNode: "baodown-node",
  mcpProvider: "mcp-provider",
  sidebar: "sidebar",
  nav: "nav",
  settingsTab: "settings-tab",
  paletteEntryGroup: "palette-entry-group",
  apiGroup: "api-group",
  tileGroup: "tile-group",
  topbar: "topbar",
} as const;

/**
 * Canonical `.bao` target kinds across all supported target handlers.
 *
 * Includes the traditional installable target kinds plus the seven
 * descriptor-projection kinds (`sidebar`, `nav`, `settings-tab`,
 * `palette-entry-group`, `api-group`, `tile-group`, `topbar`) added to mirror the
 * canonical TypeBox surface declared in
 * `@baohaus/bao-schemas/bao-install/core.schemas` `BAO_INSTALL_TARGET_KINDS`.
 *
 * Both consts MUST remain in sync per the parity test in
 * `bao-packages/tests/target-kinds-parity.test.ts`. The descriptor-
 * projection kinds are tagged `hotInstallable: true, restartRequired:
 * false` in `BAO_TARGET_KIND_LIFECYCLE_POLICIES` since registering a
 * contribution mutates only in-memory tables consumed by SSR partials
 * (sidebar, nav, Settings Workbench, Command Palette, API Explorer,
 * Dashboard tiles, topbar actions).
 */
export const BAO_INSTALL_TARGET_KINDS = {
  baoPackage: "bao-package",
  betterAuthExtension: "better-auth-extension",
  htmxExtension: "htmx-extension",
  prismaExtension: "prisma-extension",
  elysiaPlugin: "elysia-plugin",
  baodownNode: "baodown-node",
  bunPlugin: "bun-plugin",
  flatbufferSchema: "flatbuffer-schema",
  hardwareDriver: "hardware-driver",
  aiModel: "ai-model",
  baodownFlow: "baodown-flow",
  bunbuddyContract: "bunbuddy-contract",
  baoRuntimeWorkload: "bao-runtime-workload",
  configOverlay: "config-overlay",
  mcpProvider: "mcp-provider",
  ociImage: "oci-image",
  usdScene: "usd-scene",
  uiComponentKit: "ui-component-kit",
  themePack: "theme-pack",
  designTokens: "design-tokens",
  motionPreset: "motion-preset",
  densityPreset: "density-preset",
  sidebar: "sidebar",
  nav: "nav",
  settingsTab: "settings-tab",
  paletteEntryGroup: "palette-entry-group",
  apiGroup: "api-group",
  tileGroup: "tile-group",
  topbar: "topbar",
} as const;

/** Target kind union type. */
export type BaoInstallTargetKind =
  (typeof BAO_INSTALL_TARGET_KINDS)[keyof typeof BAO_INSTALL_TARGET_KINDS];

/** Extension target kind union type. */
export type BaoExtensionTargetKind =
  (typeof BAO_EXTENSION_TARGET_KINDS)[keyof typeof BAO_EXTENSION_TARGET_KINDS];

/** Extension module source marker. */
export const BAO_EXTENSION_MODULE_SOURCES = { bao: "bao" } as const;
export type BaoExtensionModuleSource =
  (typeof BAO_EXTENSION_MODULE_SOURCES)[keyof typeof BAO_EXTENSION_MODULE_SOURCES];

/** .bao Runtime extension scopes. */
export const BAO_RUNTIME_EXTENSION_SCOPES = {
  serverPlugin: "server-plugin",
  htmlRoute: "html-route",
  easyAuth: "easy-auth",
  prisma: "prisma",
  baodownNode: "baodown-node",
  mcp: "mcp",
  sidebar: "sidebar",
  nav: "nav",
  settingsTab: "settings-tab",
  paletteEntryGroup: "palette-entry-group",
  apiGroup: "api-group",
  tileGroup: "tile-group",
  topbar: "topbar",
  themePack: "theme-pack",
} as const;
export type BaoRuntimeExtensionScope =
  (typeof BAO_RUNTIME_EXTENSION_SCOPES)[keyof typeof BAO_RUNTIME_EXTENSION_SCOPES];

/** .bao Runtime extension route scopes. */
export const BAO_RUNTIME_EXTENSION_ROUTE_SCOPES = {
  public: "public",
  authenticated: "authenticated",
  admin: "admin",
  dbBacked: "db-backed",
} as const;
export type BaoRuntimeExtensionRouteScope =
  (typeof BAO_RUNTIME_EXTENSION_ROUTE_SCOPES)[keyof typeof BAO_RUNTIME_EXTENSION_ROUTE_SCOPES];

/** Extension lifecycle policies. */
export const BAO_EXTENSION_LIFECYCLE_POLICIES = {
  eager: "eager",
  lazy: "lazy",
  singleton: "singleton",
} as const;
export type BaoExtensionLifecyclePolicy =
  (typeof BAO_EXTENSION_LIFECYCLE_POLICIES)[keyof typeof BAO_EXTENSION_LIFECYCLE_POLICIES];

/** Extension position values. */
export type BaoRuntimeExtensionPosition = "before" | "after";

/** Manifest schema version constant. */
export const BAO_MANIFEST_SCHEMA_VERSION: 1 = 1 as const;

/** Canonical archive media type. */
export const BAO_ARCHIVE_MEDIA_TYPE: "application/vnd.baohaus.bao.archive.v1+tar" =
  "application/vnd.baohaus.bao.archive.v1+tar" as const;

/** Canonical manifest spec revision. */
export const BAO_MANIFEST_SPEC_REVISION: "2026-04-19" = "2026-04-19" as const;

/** Filesystem path pattern for local `.bao` archives. */
export const BAO_MANIFEST_PATH_PATTERN = "^.+\\.bao$";

/** HTTPS URL pattern for remote `.bao` archive references. */
export const BAO_MANIFEST_URL_PATTERN = "^https://[^\\s?#]+\\.bao(?:\\?[^\\s#]*)?(?:#\\S*)?$";
