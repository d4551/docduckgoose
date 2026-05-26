/**
 * `.bao` install core schemas.
 *
 * Defines canonical archive versions, target kinds, and runtime extension
 * descriptor schemas consumed across the install pipeline.
 *
 * @shared/schemas/bao-install/core
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BAO_ARCHIVE_PLATFORM_ID_VALUES,
  BAO_ARCHIVE_SCHEMA_VERSION,
} from "../../bao/bao-archive.contract.ts";

/**
 * Supported `.bao` archive schema version.
 */
export const BAO_MANIFEST_SCHEMA_VERSION: 1 = BAO_ARCHIVE_SCHEMA_VERSION;
/** Filesystem path pattern accepted for local `.bao` archives. */
export const BAO_MANIFEST_PATH_PATTERN = "^.+\\.bao$";
/** HTTPS URL pattern accepted for remote `.bao` archive references. */
export const BAO_MANIFEST_URL_PATTERN = "^https://[^\\s?#]+\\.bao(?:\\?[^\\s#]*)?(?:#\\S*)?$";

/**
 * Supported `.bao` manifest schema versions schema.
 */
function buildBaoManifestSchemaVersionSchema() {
  return Type.Literal(BAO_MANIFEST_SCHEMA_VERSION, {
    description: "Supported .bao manifest schema version.",
  });
}
/** TypeBox schema for supported `.bao` manifest schema versions. */
export const BaoManifestSchemaVersionSchema = buildBaoManifestSchemaVersionSchema();

/**
 * `.bao` manifest version type.
 */
export type BaoManifestSchemaVersion = Static<typeof BaoManifestSchemaVersionSchema>;

/**
 * Canonical `.bao` extension target kinds.
 */
export const BAO_EXTENSION_TARGET_KINDS: {
  readonly htmx: "htmx-extension";
  readonly prisma: "prisma-extension";
  readonly betterAuth: "better-auth-extension";
  readonly elysia: "elysia-plugin";
  readonly baodownNode: "baodown-node";
  readonly mcpProvider: "mcp-provider";
  readonly sidebar: "sidebar";
  readonly nav: "nav";
  readonly settingsTab: "settings-tab";
  readonly paletteEntryGroup: "palette-entry-group";
  readonly apiGroup: "api-group";
  readonly tileGroup: "tile-group";
} = {
  htmx: "htmx-extension",
  prisma: "prisma-extension",
  betterAuth: "better-auth-extension",
  elysia: "elysia-plugin",
  baodownNode: "baodown-node",
  mcpProvider: "mcp-provider",
  sidebar: "sidebar",
  nav: "nav",
  settingsTab: "settings-tab",
  paletteEntryGroup: "palette-entry-group",
  apiGroup: "api-group",
  tileGroup: "tile-group",
} as const;

/**
 * Canonical `.bao` target kinds across all target handlers.
 */
export const BAO_INSTALL_TARGET_KINDS: {
  readonly baoPackage: "bao-package";
  readonly htmxExtension: "htmx-extension";
  readonly prismaExtension: "prisma-extension";
  readonly betterAuthExtension: "better-auth-extension";
  readonly elysiaPlugin: "elysia-plugin";
  readonly baodownNode: "baodown-node";
  readonly bunPlugin: "bun-plugin";
  readonly flatbufferSchema: "flatbuffer-schema";
  readonly hardwareDriver: "hardware-driver";
  readonly aiModel: "ai-model";
  readonly baodownFlow: "baodown-flow";
  readonly bunbuddyContract: "bunbuddy-contract";
  readonly baoRuntimeWorkload: "bao-runtime-workload";
  readonly configOverlay: "config-overlay";
  readonly mcpProvider: "mcp-provider";
  readonly ociImage: "oci-image";
  readonly usdScene: "usd-scene";
  readonly uiComponentKit: "ui-component-kit";
  readonly themePack: "theme-pack";
  readonly designTokens: "design-tokens";
  readonly motionPreset: "motion-preset";
  readonly densityPreset: "density-preset";
  readonly sidebar: "sidebar";
  readonly nav: "nav";
  readonly settingsTab: "settings-tab";
  readonly paletteEntryGroup: "palette-entry-group";
  readonly apiGroup: "api-group";
  readonly tileGroup: "tile-group";
} = {
  baoPackage: "bao-package",
  htmxExtension: "htmx-extension",
  prismaExtension: "prisma-extension",
  betterAuthExtension: "better-auth-extension",
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
} as const;

/**
 * Canonical `.bao` target kind type.
 */
export type BaoInstallTargetKind =
  (typeof BAO_INSTALL_TARGET_KINDS)[keyof typeof BAO_INSTALL_TARGET_KINDS];

/**
 * Canonical `.bao` target kind schema (strict, non-lenient).
 */
export const BaoInstallTargetKindSchema: Type.TUnion<
  (
    | Type.TLiteral<"bao-package">
    | Type.TLiteral<"htmx-extension">
    | Type.TLiteral<"prisma-extension">
    | Type.TLiteral<"better-auth-extension">
    | Type.TLiteral<"elysia-plugin">
    | Type.TLiteral<"baodown-node">
    | Type.TLiteral<"bun-plugin">
    | Type.TLiteral<"flatbuffer-schema">
    | Type.TLiteral<"hardware-driver">
    | Type.TLiteral<"ai-model">
    | Type.TLiteral<"baodown-flow">
    | Type.TLiteral<"bunbuddy-contract">
    | Type.TLiteral<"bao-runtime-workload">
    | Type.TLiteral<"config-overlay">
    | Type.TLiteral<"mcp-provider">
    | Type.TLiteral<"oci-image">
    | Type.TLiteral<"usd-scene">
    | Type.TLiteral<"ui-component-kit">
    | Type.TLiteral<"theme-pack">
    | Type.TLiteral<"design-tokens">
    | Type.TLiteral<"motion-preset">
    | Type.TLiteral<"density-preset">
    | Type.TLiteral<"sidebar">
    | Type.TLiteral<"nav">
    | Type.TLiteral<"settings-tab">
    | Type.TLiteral<"palette-entry-group">
    | Type.TLiteral<"api-group">
    | Type.TLiteral<"tile-group">
  )[]
> = Type.Union(
  [
    Type.Literal(BAO_INSTALL_TARGET_KINDS.baoPackage),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.htmxExtension),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.prismaExtension),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.betterAuthExtension),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.elysiaPlugin),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.baodownNode),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.bunPlugin),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.flatbufferSchema),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.hardwareDriver),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.aiModel),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.baodownFlow),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.bunbuddyContract),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.baoRuntimeWorkload),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.configOverlay),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.mcpProvider),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.ociImage),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.usdScene),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.uiComponentKit),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.themePack),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.designTokens),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.motionPreset),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.densityPreset),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.sidebar),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.nav),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.settingsTab),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.paletteEntryGroup),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.apiGroup),
    Type.Literal(BAO_INSTALL_TARGET_KINDS.tileGroup),
  ],
  {
    description: "Canonical `.bao` target kinds used across target handlers.",
  },
);

/**
 * Canonical `.bao` platform slice schema.
 */
export const BaoArchivePlatformIdSchema: Type.TUnion<
  Type.TLiteral<"darwin-arm64" | "darwin-x64" | "linux-arm64" | "linux-x64" | "windows-x64">[]
> = Type.Union(
  BAO_ARCHIVE_PLATFORM_ID_VALUES.map((platformId) => Type.Literal(platformId)),
  {
    description: "Canonical `.bao` platform slice identifier.",
  },
);

/**
 * Canonical `.bao` platform slice type.
 */
export type BaoArchivePlatformIdValue = Static<typeof BaoArchivePlatformIdSchema>;

/**
 * `.bao` extension target kind type.
 */
export type BaoExtensionTargetKind =
  (typeof BAO_EXTENSION_TARGET_KINDS)[keyof typeof BAO_EXTENSION_TARGET_KINDS];

/** Canonical source marker for runtime extension descriptors. */
export const BAO_EXTENSION_MODULE_SOURCES: { readonly bao: "bao" } = {
  bao: "bao",
} as const;

/**
 * Runtime extension descriptor source type.
 */
export type BaoExtensionModuleSource =
  (typeof BAO_EXTENSION_MODULE_SOURCES)[keyof typeof BAO_EXTENSION_MODULE_SOURCES];

/**
 * Runtime extension scope categories consumed by extension engines.
 */
export const BAO_RUNTIME_EXTENSION_SCOPES: {
  readonly serverPlugin: "server-plugin";
  readonly htmlRoute: "html-route";
  readonly easyAuth: "easy-auth";
  readonly prisma: "prisma";
  readonly baodownNode: "baodown-node";
  readonly mcp: "mcp";
  readonly sidebar: "sidebar";
  readonly nav: "nav";
  readonly settingsTab: "settings-tab";
  readonly paletteEntryGroup: "palette-entry-group";
  readonly apiGroup: "api-group";
  readonly tileGroup: "tile-group";
} = {
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
} as const;

/**
 * Runtime extension scope type.
 */
export type BaoRuntimeExtensionScope =
  (typeof BAO_RUNTIME_EXTENSION_SCOPES)[keyof typeof BAO_RUNTIME_EXTENSION_SCOPES];

/**
 * Extension route scope values used by HTML/Elysia extension loaders.
 */
export const BAO_RUNTIME_EXTENSION_ROUTE_SCOPES: {
  readonly public: "public";
  readonly authenticated: "authenticated";
  readonly admin: "admin";
  readonly dbBacked: "db-backed";
} = {
  public: "public",
  authenticated: "authenticated",
  admin: "admin",
  dbBacked: "db-backed",
} as const;

/**
 * Runtime extension route scope type.
 */
export type BaoRuntimeExtensionRouteScope =
  (typeof BAO_RUNTIME_EXTENSION_ROUTE_SCOPES)[keyof typeof BAO_RUNTIME_EXTENSION_ROUTE_SCOPES];

/**
 * Allowed lifecycle policy values for extension descriptors.
 */
export const BAO_EXTENSION_LIFECYCLE_POLICIES: {
  readonly eager: "eager";
  readonly lazy: "lazy";
  readonly singleton: "singleton";
} = {
  eager: "eager",
  lazy: "lazy",
  singleton: "singleton",
} as const;

/** Union of extension lifecycle policy values: 'eager', 'lazy', or 'singleton'. */
export type BaoExtensionLifecyclePolicy =
  (typeof BAO_EXTENSION_LIFECYCLE_POLICIES)[keyof typeof BAO_EXTENSION_LIFECYCLE_POLICIES];

/** TypeBox schema for validating extension lifecycle policy values at runtime. */
export const BaoExtensionLifecyclePolicySchema: Type.TUnion<
  (Type.TLiteral<"eager"> | Type.TLiteral<"lazy"> | Type.TLiteral<"singleton">)[]
> = Type.Union(
  [
    Type.Literal(BAO_EXTENSION_LIFECYCLE_POLICIES.eager),
    Type.Literal(BAO_EXTENSION_LIFECYCLE_POLICIES.lazy),
    Type.Literal(BAO_EXTENSION_LIFECYCLE_POLICIES.singleton),
  ],
  {
    description: "Lifecycle policy for extension load/unload behavior.",
  },
);

/**
 * Extension position values used by runtime extension loaders.
 */
export const BaoRuntimeExtensionPositionSchema: Type.TUnion<
  (Type.TLiteral<"before"> | Type.TLiteral<"after">)[]
> = Type.Union([Type.Literal("before"), Type.Literal("after")], {
  description: "Runtime extension insertion position.",
});

/**
 * Runtime extension position type.
 */
export type BaoRuntimeExtensionPosition = Static<typeof BaoRuntimeExtensionPositionSchema>;

/**
 * Runtime extension source schema.
 */
export const BaoExtensionModuleSourceSchema: Type.TUnion<Type.TLiteral<"bao">[]> = Type.Union(
  [Type.Literal(BAO_EXTENSION_MODULE_SOURCES.bao)],
  {
    description: "Source of a runtime extension module descriptor.",
  },
);

/**
 * Runtime extension scope schema.
 */
export const BaoRuntimeExtensionScopeSchema: Type.TUnion<
  (
    | Type.TLiteral<"server-plugin">
    | Type.TLiteral<"html-route">
    | Type.TLiteral<"easy-auth">
    | Type.TLiteral<"prisma">
    | Type.TLiteral<"baodown-node">
    | Type.TLiteral<"mcp">
    | Type.TLiteral<"sidebar">
    | Type.TLiteral<"nav">
    | Type.TLiteral<"settings-tab">
    | Type.TLiteral<"palette-entry-group">
    | Type.TLiteral<"api-group">
    | Type.TLiteral<"tile-group">
  )[]
> = Type.Union(
  [
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.serverPlugin),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.htmlRoute),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.easyAuth),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.prisma),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.baodownNode),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.mcp),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.sidebar),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.nav),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.settingsTab),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.paletteEntryGroup),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.apiGroup),
    Type.Literal(BAO_RUNTIME_EXTENSION_SCOPES.tileGroup),
  ],
  {
    description: "Runtime scope for extension module descriptors.",
  },
);

/**
 * Runtime extension route scope schema.
 */
export const BaoRuntimeExtensionRouteScopeSchema: Type.TUnion<
  (
    | Type.TLiteral<"public">
    | Type.TLiteral<"authenticated">
    | Type.TLiteral<"admin">
    | Type.TLiteral<"db-backed">
  )[]
> = Type.Union(
  [
    Type.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.public),
    Type.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.authenticated),
    Type.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.admin),
    Type.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.dbBacked),
  ],
  {
    description: "Route/plugin scope for runtime extension placement.",
  },
);

/**
 * Canonical runtime extension module descriptor.
 *
 * Shared by:
 * - `.bao` install runtime registry
 * - HTMX route extension loader
 * - Elysia plugin extension loader
 */
export const BaoExtensionModuleDescriptorSchema = Type.Object(
  {
    extensionId: Type.String({
      minLength: 1,
      description: "Canonical runtime extension descriptor id.",
    }),
    source: BaoExtensionModuleSourceSchema,
    runtimeScope: BaoRuntimeExtensionScopeSchema,
    targetKind: Type.String({
      minLength: 1,
      description: "Original target kind from the `.bao` install target.",
    }),
    targetId: Type.String({
      minLength: 1,
      description: "Original stable target identifier from the `.bao` install plan.",
    }),
    moduleId: Type.String({
      minLength: 1,
      description: "Runtime module id/specifier consumed by extension loaders.",
    }),
    manifestName: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Checked-in `.bao` manifest metadata.name for grouping runtime descriptors.",
      }),
    ),
    before: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description:
          "Ordering hints declaring which sibling targets should execute after this target.",
      }),
    ),
    after: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description:
          "Ordering hints declaring which sibling targets should execute before this target.",
      }),
    ),
    manifestTargetIndex: Type.Optional(
      Type.Integer({
        minimum: 0,
        description: "Stable target index from the authored `.bao` manifest.",
      }),
    ),
    routeScope: Type.Optional(BaoRuntimeExtensionRouteScopeSchema),
    lifecyclePolicy: Type.Optional(BaoExtensionLifecyclePolicySchema),
    position: Type.Optional(BaoRuntimeExtensionPositionSchema),
    priority: Type.Optional(
      Type.Integer({
        minimum: 0,
        description: "Deterministic ordering hint; lower values execute first.",
      }),
    ),
    installedAt: Type.Optional(
      Type.String({
        format: "date-time",
        description: "Install timestamp for `.bao` sourced descriptors.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Canonical runtime extension descriptor shared by extension engines.",
  },
);

/**
 * Runtime extension module descriptor type.
 */
export type BaoExtensionModuleDescriptor = Static<typeof BaoExtensionModuleDescriptorSchema>;
