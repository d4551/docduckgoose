/**
 * `.bao` install core schemas.
 *
 * Defines canonical archive versions, target kinds, and runtime extension
 * descriptor schemas consumed across the install pipeline.
 *
 * @shared/schemas/bao-install/core
 */

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  BAO_ARCHIVE_PLATFORM_ID_VALUES,
  BAO_ARCHIVE_SCHEMA_VERSION,
  type BaoArchivePlatformId,
} from "../bao/bao-archive.contract.ts";

/**
 * Supported `.bao` archive schema version.
 */
export const BAO_MANIFEST_SCHEMA_VERSION: 1 = BAO_ARCHIVE_SCHEMA_VERSION;
/** Filesystem path pattern accepted for local `.bao` archives. */
export const BAO_MANIFEST_PATH_PATTERN = "^.+\\.bao$";
/** HTTPS URL pattern accepted for remote `.bao` archive references. */
export const BAO_MANIFEST_URL_PATTERN = "^https://[^\\s?#]+\\.bao(?:\\?[^\\s#]*)?(?:#\\S*)?$";
/** Canonical sha256 digest pattern for `.bao` archives in blobao CAS. */
export const BAO_ARCHIVE_DIGEST_PATTERN = "^sha256:[a-f0-9]{64}$";

/**
 * Supported `.bao` manifest schema versions schema.
 */
function buildBaoManifestSchemaVersionSchema() {
  return TypeExports.Literal(BAO_MANIFEST_SCHEMA_VERSION, {
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
  readonly topbar: "topbar";
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
  topbar: "topbar",
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
  readonly topbar: "topbar";
  readonly nativeMobileShell: "native-mobile-shell";
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
  topbar: "topbar",
  nativeMobileShell: "native-mobile-shell",
} as const;

/**
 * Canonical `.bao` target kind type.
 */
export type BaoInstallTargetKind =
  (typeof BAO_INSTALL_TARGET_KINDS)[keyof typeof BAO_INSTALL_TARGET_KINDS];

/**
 * Canonical `.bao` target kind values.
 */
export const BAO_INSTALL_TARGET_KIND_VALUES = Object.values(BAO_INSTALL_TARGET_KINDS);

/**
 * Canonical `.bao` target kind schema (strict, non-lenient).
 */
export const BaoInstallTargetKindSchema: TUnion<
  (
    | TLiteral<"bao-package">
    | TLiteral<"htmx-extension">
    | TLiteral<"prisma-extension">
    | TLiteral<"better-auth-extension">
    | TLiteral<"elysia-plugin">
    | TLiteral<"baodown-node">
    | TLiteral<"bun-plugin">
    | TLiteral<"flatbuffer-schema">
    | TLiteral<"hardware-driver">
    | TLiteral<"ai-model">
    | TLiteral<"baodown-flow">
    | TLiteral<"bunbuddy-contract">
    | TLiteral<"bao-runtime-workload">
    | TLiteral<"config-overlay">
    | TLiteral<"mcp-provider">
    | TLiteral<"oci-image">
    | TLiteral<"usd-scene">
    | TLiteral<"ui-component-kit">
    | TLiteral<"theme-pack">
    | TLiteral<"design-tokens">
    | TLiteral<"motion-preset">
    | TLiteral<"density-preset">
    | TLiteral<"sidebar">
    | TLiteral<"nav">
    | TLiteral<"settings-tab">
    | TLiteral<"palette-entry-group">
    | TLiteral<"api-group">
    | TLiteral<"tile-group">
    | TLiteral<"topbar">
    | TLiteral<"native-mobile-shell">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.baoPackage),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.htmxExtension),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.prismaExtension),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.betterAuthExtension),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.elysiaPlugin),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.baodownNode),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.bunPlugin),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.flatbufferSchema),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.hardwareDriver),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.aiModel),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.baodownFlow),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.bunbuddyContract),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.baoRuntimeWorkload),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.configOverlay),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.mcpProvider),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.ociImage),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.usdScene),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.uiComponentKit),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.themePack),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.designTokens),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.motionPreset),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.densityPreset),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.sidebar),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.nav),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.settingsTab),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.paletteEntryGroup),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.apiGroup),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.tileGroup),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.topbar),
    TypeExports.Literal(BAO_INSTALL_TARGET_KINDS.nativeMobileShell),
  ],
  {
    description: "Canonical `.bao` target kinds used across target handlers.",
  },
);

/**
 * Canonical `.bao` platform slice schema.
 */
export const BaoArchivePlatformIdSchema: TUnion<
  TLiteral<
    | "darwin-arm64"
    | "darwin-x64"
    | "linux-arm64"
    | "linux-x64"
    | "linux-musl-arm64"
    | "linux-musl-x64"
    | "windows-arm64"
    | "windows-x64"
    | "freebsd-x64"
  >[]
> = TypeExports.Union(
  BAO_ARCHIVE_PLATFORM_ID_VALUES.map((platformId: BaoArchivePlatformId) =>
    TypeExports.Literal(platformId),
  ),
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
  readonly topbar: "topbar";
  readonly themePack: "theme-pack";
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
  topbar: "topbar",
  themePack: "theme-pack",
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

/** Explicit runtime export handling for extension modules. */
export const BAO_EXTENSION_EXPORT_KINDS: {
  readonly value: "value";
  readonly factory: "factory";
} = {
  value: "value",
  factory: "factory",
} as const;

/** Union of extension export kind values. */
export type BaoExtensionExportKind =
  (typeof BAO_EXTENSION_EXPORT_KINDS)[keyof typeof BAO_EXTENSION_EXPORT_KINDS];

/** TypeBox schema for extension export kind values. */
export const BaoExtensionExportKindSchema: TUnion<(TLiteral<"value"> | TLiteral<"factory">)[]> =
  TypeExports.Union(
    [
      TypeExports.Literal(BAO_EXTENSION_EXPORT_KINDS.value),
      TypeExports.Literal(BAO_EXTENSION_EXPORT_KINDS.factory),
    ],
    {
      description: "Runtime export contract for a `.bao` extension module.",
    },
  );

/** TypeBox schema for validating extension lifecycle policy values at runtime. */
export const BaoExtensionLifecyclePolicySchema: TUnion<
  (TLiteral<"eager"> | TLiteral<"lazy"> | TLiteral<"singleton">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal(BAO_EXTENSION_LIFECYCLE_POLICIES.eager),
    TypeExports.Literal(BAO_EXTENSION_LIFECYCLE_POLICIES.lazy),
    TypeExports.Literal(BAO_EXTENSION_LIFECYCLE_POLICIES.singleton),
  ],
  {
    description: "Lifecycle policy for extension load/unload behavior.",
  },
);

/**
 * Extension position values used by runtime extension loaders.
 */
export const BaoRuntimeExtensionPositionSchema: TUnion<(TLiteral<"before"> | TLiteral<"after">)[]> =
  TypeExports.Union([TypeExports.Literal("before"), TypeExports.Literal("after")], {
    description: "Runtime extension insertion position.",
  });

/**
 * Runtime extension position type.
 */
export type BaoRuntimeExtensionPosition = Static<typeof BaoRuntimeExtensionPositionSchema>;

/**
 * Runtime extension source schema.
 */
export const BaoExtensionModuleSourceSchema: TUnion<TLiteral<"bao">[]> = TypeExports.Union(
  [TypeExports.Literal(BAO_EXTENSION_MODULE_SOURCES.bao)],
  {
    description: "Source of a runtime extension module descriptor.",
  },
);

/**
 * Runtime extension scope schema.
 */
export const BaoRuntimeExtensionScopeSchema: TUnion<
  (
    | TLiteral<"server-plugin">
    | TLiteral<"html-route">
    | TLiteral<"easy-auth">
    | TLiteral<"prisma">
    | TLiteral<"baodown-node">
    | TLiteral<"mcp">
    | TLiteral<"sidebar">
    | TLiteral<"nav">
    | TLiteral<"settings-tab">
    | TLiteral<"palette-entry-group">
    | TLiteral<"api-group">
    | TLiteral<"tile-group">
    | TLiteral<"topbar">
    | TLiteral<"theme-pack">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.serverPlugin),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.htmlRoute),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.easyAuth),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.prisma),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.baodownNode),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.mcp),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.sidebar),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.nav),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.settingsTab),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.paletteEntryGroup),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.apiGroup),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.tileGroup),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.topbar),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_SCOPES.themePack),
  ],
  {
    description: "Runtime scope for extension module descriptors.",
  },
);

/**
 * Runtime extension route scope schema.
 */
export const BaoRuntimeExtensionRouteScopeSchema: TUnion<
  (TLiteral<"public"> | TLiteral<"authenticated"> | TLiteral<"admin"> | TLiteral<"db-backed">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.public),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.authenticated),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.admin),
    TypeExports.Literal(BAO_RUNTIME_EXTENSION_ROUTE_SCOPES.dbBacked),
  ],
  {
    description: "Route/plugin scope for runtime extension placement.",
  },
);

/** Capability contracts declared by a `.bao` runtime target. */
export const BaoExtensionCapabilityContractsSchema = TypeExports.Object(
  {
    endpoints: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Endpoint contracts exposed by this capability.",
      }),
    ),
    events: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Event contracts emitted or consumed by this capability.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Capability contract inventory declared by a `.bao` target.",
  },
);

/** Capability metadata declared by a `.bao` runtime target. */
export const BaoExtensionCapabilityMetadataSchema = TypeExports.Object(
  {
    capabilityId: TypeExports.String({
      minLength: 1,
      description: "Canonical capability identifier owned by this `.bao` target.",
    }),
    owner: TypeExports.String({
      minLength: 1,
      description: "Team or domain accountable for the capability.",
    }),
    responsibility: TypeExports.String({
      minLength: 1,
      description: "Operational responsibility statement for this capability.",
    }),
    contracts: TypeExports.Optional(BaoExtensionCapabilityContractsSchema),
    dependencies: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Capability identifiers required by this capability.",
      }),
    ),
    trustBoundary: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Security trust boundary crossed by this capability.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Archive-derived capability metadata for runtime governance.",
  },
);

/** Capability contract inventory declared by a `.bao` target. */
export type BaoExtensionCapabilityContracts = Static<typeof BaoExtensionCapabilityContractsSchema>;

/** Capability metadata declared by a `.bao` target. */
export type BaoExtensionCapabilityMetadata = Static<typeof BaoExtensionCapabilityMetadataSchema>;

/**
 * Canonical runtime extension module descriptor.
 *
 * Shared by:
 * - `.bao` install runtime registry
 * - HTMX route extension loader
 * - Elysia plugin extension loader
 */
export const BaoExtensionModuleDescriptorSchema = TypeExports.Object(
  {
    extensionId: TypeExports.String({
      minLength: 1,
      description: "Canonical runtime extension descriptor id.",
    }),
    source: BaoExtensionModuleSourceSchema,
    runtimeScope: BaoRuntimeExtensionScopeSchema,
    targetKind: TypeExports.String({
      minLength: 1,
      description: "Original target kind from the `.bao` install target.",
    }),
    targetId: TypeExports.String({
      minLength: 1,
      description: "Original stable target identifier from the `.bao` install plan.",
    }),
    moduleId: TypeExports.String({
      minLength: 1,
      description: "Runtime module id/specifier consumed by extension loaders.",
    }),
    manifestName: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Checked-in `.bao` manifest metadata.name for grouping runtime descriptors.",
      }),
    ),
    archiveVersion: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Checked-in `.bao` manifest metadata.version for governance projections.",
      }),
    ),
    manifestDigest: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Digest of the source `.bao` manifest used for impact analysis.",
      }),
    ),
    runtimeSessionId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Runtime session id that produced this descriptor.",
      }),
    ),
    runtimeName: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Runtime group name consumed by extension loaders.",
      }),
    ),
    exportSymbol: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Explicit named export consumed from the runtime module.",
      }),
    ),
    exportKind: TypeExports.Optional(BaoExtensionExportKindSchema),
    factoryOptionsRef: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Config reference used when invoking a factory export.",
      }),
    ),
    capability: TypeExports.Optional(BaoExtensionCapabilityMetadataSchema),
    before: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description:
          "Ordering hints declaring which sibling targets should execute after this target.",
      }),
    ),
    after: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description:
          "Ordering hints declaring which sibling targets should execute before this target.",
      }),
    ),
    manifestTargetIndex: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        description: "Stable target index from the authored `.bao` manifest.",
      }),
    ),
    routeScope: TypeExports.Optional(BaoRuntimeExtensionRouteScopeSchema),
    lifecyclePolicy: TypeExports.Optional(BaoExtensionLifecyclePolicySchema),
    position: TypeExports.Optional(BaoRuntimeExtensionPositionSchema),
    priority: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        description: "Deterministic ordering hint; lower values execute first.",
      }),
    ),
    installedAt: TypeExports.Optional(
      TypeExports.String({
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
