/**
 * `.bao` install target schemas.
 *
 * Adapter-specific target declarations plus the open base target used across
 * `.bao` archive manifests.
 *
 * @shared/schemas/bao-install/targets
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TObject,
  TOptional,
  TOptions,
  TSchema,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value/check";
import { BaoRuntimeWorkloadTargetSchema } from "../bao-runtime-workload.schemas.ts";

export {
  type BaoRuntimeWorkloadTarget,
  BaoRuntimeWorkloadTargetSchema,
} from "../bao-runtime-workload.schemas.ts";

import { type McpProviderMetadata, McpProviderMetadataSchema } from "../mcp.schemas.ts";
import {
  type BaoArchivePlatformPayload,
  BaoArchivePlatformPayloadSchema,
  type BaoArchiveSharedPayload,
  BaoArchiveSharedPayloadSchema,
  type BaoInstallChecksum,
  BaoInstallChecksumSchema,
  type BaoInstallDependency,
  BaoInstallDependencySchema,
  type BaoInstallSignature,
  BaoInstallSignatureSchema,
  BaoInstallTargetOrderingSchema,
  type BaoPackageDependencyLock,
  BaoPackageDependencyLockSchema,
  type BaoPackageSurface,
  BaoPackageSurfaceSchema,
} from "./artifact.schemas.ts";
import {
  BaoExtensionCapabilityMetadataSchema,
  BaoExtensionExportKindSchema,
  BaoExtensionLifecyclePolicySchema,
  type BaoInstallTargetKind,
  BaoInstallTargetKindSchema,
} from "./core.schemas.ts";

const BaoPackageExportConditionSchema = TypeExports.Record(
  TypeExports.String({ minLength: 1 }),
  TypeExports.String({ minLength: 1 }),
  {
    description: "Bao package conditional export targets keyed by condition name.",
  },
);

const BaoPackageExportValueSchema = TypeExports.Union(
  [TypeExports.String({ minLength: 1 }), BaoPackageExportConditionSchema],
  {
    description: "Bao package export target path or conditional export map.",
  },
);

export type BaoPackageExportValue = string | Record<string, string>;
type BaoTargetScalarValue = string | number | boolean | null;
type BaoTargetStructuredValue =
  | BaoTargetScalarValue
  | readonly BaoTargetStructuredValue[]
  | { readonly [key: string]: BaoTargetStructuredValue };

interface BaoMcpResourceDefinition {
  readonly uri: string;
  readonly name: string;
  readonly mimeType?: string;
}

interface BaoBaoControlPlaneResourceProfile {
  readonly cpu: string;
  readonly memory: string;
  readonly ephemeralStorage?: string | undefined;
}

interface BaoBaoControlPlaneResourceRequirements {
  readonly requests: BaoBaoControlPlaneResourceProfile;
  readonly limits: BaoBaoControlPlaneResourceProfile;
}

/** Schema for Bao package targets embedded in `.bao` archive manifests. */
export const BaoPackageTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("bao-package"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      packageName: TypeExports.String({
        minLength: 1,
        description: "Resolved package name materialized into the Bao package unpack store.",
      }),
      packageVersion: TypeExports.String({
        minLength: 1,
        description: "Resolved exact package version materialized from the archive.",
      }),
      requestedVersion: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Original requested version or semver range before resolution.",
        }),
      ),
      exports: TypeExports.Optional(
        TypeExports.Record(TypeExports.String({ minLength: 1 }), BaoPackageExportValueSchema, {
          description: "Resolved package exports metadata.",
        }),
      ),
      bin: TypeExports.Optional(
        TypeExports.Record(
          TypeExports.String({ minLength: 1 }),
          TypeExports.String({ minLength: 1 }),
          {
            description: "Resolved package bin metadata.",
          },
        ),
      ),
      archivePath: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Internal staged archive path used by the Bao package target handler.",
        }),
      ),
      dependencyLock: TypeExports.Array(BaoPackageDependencyLockSchema, {
        description: "Exact resolved dependency graph for the runtime package closure.",
      }),
      sharedPayload: BaoArchiveSharedPayloadSchema,
      platformPayloads: TypeExports.Array(BaoArchivePlatformPayloadSchema, {
        description: "Per-platform slice inventory included in the archive.",
      }),
      surfaces: BaoPackageSurfaceSchema,
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Bao package target type. */
export interface BaoPackageTarget extends BaoInstallTargetBase {
  kind: "bao-package";
  target: string;
  packageName: string;
  packageVersion: string;
  requestedVersion?: string;
  exports?: Record<string, BaoPackageExportValue>;
  bin?: Record<string, string>;
  archivePath?: string;
  dependencyLock: BaoPackageDependencyLock[];
  sharedPayload: BaoArchiveSharedPayload;
  platformPayloads: BaoArchivePlatformPayload[];
  surfaces: BaoPackageSurface;
}

/**
 * Determine whether a runtime value satisfies the canonical Bao package target shape.
 *
 * @param value - Runtime candidate to validate.
 * @returns True when the value conforms to {@link BaoPackageTargetSchema}.
 */
export function isBaoPackageTarget(value: unknown): value is BaoPackageTarget {
  return Check(BaoPackageTargetSchema, value);
}

/**
 * HTMX extension target.
 */
export const BaoHtmxExtensionTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("htmx-extension"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      extension: TypeExports.String({
        minLength: 1,
        description:
          "Importable HTML route extension module identifier consumed by the HTMX/html-route runtime loader.",
      }),
      route: TypeExports.Optional(
        TypeExports.Union(
          [
            TypeExports.Literal("public"),
            TypeExports.Literal("authenticated"),
            TypeExports.Literal("admin"),
          ],
          {
            description: "Route injection zone.",
          },
        ),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
      priority: TypeExports.Optional(
        TypeExports.Integer({
          minimum: 0,
          description: "Ordering override for deterministic execution.",
        }),
      ),
    }),
  ]),
  { additionalProperties: false },
);

/** HTMX extension target. */
export type BaoHtmxExtensionTarget = Static<typeof BaoHtmxExtensionTargetSchema>;

/**
 * Prisma extension target.
 */
export const BaoPrismaExtensionTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("prisma-extension"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      extension: TypeExports.String({
        minLength: 1,
        description: "Prisma extension or plugin identifier.",
      }),
      requiresApply: TypeExports.Optional(
        TypeExports.Boolean({ description: "Whether migration/apply is required after install." }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Prisma extension target. */
export type BaoPrismaExtensionTarget = Static<typeof BaoPrismaExtensionTargetSchema>;

/**
 * Better Auth extension target.
 */
export const BaoBetterAuthExtensionTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("better-auth-extension"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      provider: TypeExports.String({
        minLength: 1,
        description: "Module specifier for the Better Auth extension entrypoint.",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
      configPath: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Optional provider-specific config path.",
        }),
      ),
    }),
  ]),
  { additionalProperties: false },
);

/** Better Auth extension target. */
export type BaoBetterAuthExtensionTarget = Static<typeof BaoBetterAuthExtensionTargetSchema>;

/**
 * Elysia plugin target.
 */
export const BaoElysiaPluginTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("elysia-plugin"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      plugin: TypeExports.String({
        minLength: 1,
        description: "Elysia plugin package or entrypoint identifier.",
      }),
      pluginEntrypoint: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Runtime module entrypoint used by first-party `.bao` descriptors.",
        }),
      ),
      manifestName: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Archive group name that owns this runtime target.",
        }),
      ),
      runtimeName: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Runtime plugin group name consumed by extension loaders.",
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
      route: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Optional route mount base path prefix override.",
        }),
      ),
      lifecyclePolicy: TypeExports.Optional(BaoExtensionLifecyclePolicySchema),
      priority: TypeExports.Optional(
        TypeExports.Integer({
          minimum: 0,
          description: "Ordering override for deterministic execution.",
        }),
      ),
      enabled: TypeExports.Optional(
        TypeExports.Boolean({
          description: "Whether this plugin should be enabled after install.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Elysia plugin target. */
export type BaoElysiaPluginTarget = Static<typeof BaoElysiaPluginTargetSchema>;

/**
 * BaoDown node target — registers a custom node type in the BaoDown automation engine.
 */
export const BaoBaoDownNodeTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("baodown-node"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      nodeModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting a BaoDownNodeDefinition.",
      }),
      typeId: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Override typeId (defaults to the module export typeId).",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for BaoDown node target. */
export type BaoBaoDownNodeTarget = Static<typeof BaoBaoDownNodeTargetSchema>;

/**
 * Bun plugin target.
 */
export const BaoBunPluginTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("bun-plugin"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      plugin: TypeExports.String({
        minLength: 1,
        description: "Bun plugin package or module entrypoint identifier.",
      }),
      runtimeRegistration: TypeExports.Optional(
        TypeExports.Boolean({
          description: "Whether the plugin should be registered at runtime boot.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Bun plugin target. */
export type BaoBunPluginTarget = Static<typeof BaoBunPluginTargetSchema>;

/**
 * FlatBuffer schema target.
 */
export const BaoFlatbufferSchemaTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("flatbuffer-schema"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      schemaPath: TypeExports.String({
        minLength: 1,
        description: "Archive-relative FlatBuffer schema path.",
      }),
      outputDir: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Archive-relative generated output directory.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** FlatBuffer schema target. */
export type BaoFlatbufferSchemaTarget = Static<typeof BaoFlatbufferSchemaTargetSchema>;

/**
 * Hardware driver target.
 */
export const BaoHardwareDriverTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("hardware-driver"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      driverPackage: TypeExports.String({
        minLength: 1,
        description: "Package or module that owns the hardware driver implementation.",
      }),
      deviceTypes: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        minItems: 1,
        description: "Hardware device type identifiers served by the driver.",
      }),
      transport: TypeExports.String({
        minLength: 1,
        description: "Transport protocol used by the driver.",
      }),
      version: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Driver contract version.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Hardware driver target. */
export type BaoHardwareDriverTarget = Static<typeof BaoHardwareDriverTargetSchema>;

/**
 * AI model artifact target.
 */
export const BaoAiModelTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("ai-model"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      model: TypeExports.String({
        minLength: 1,
        description: "Model artifact identifier or archive-relative model path.",
      }),
      provider: TypeExports.Optional(
        TypeExports.Union([
          TypeExports.Literal("huggingface"),
          TypeExports.Literal("onnx"),
          TypeExports.Literal("ramalama"),
        ]),
      ),
      runtime: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Runtime expected to load the model artifact.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** AI model artifact target. */
export type BaoAiModelTarget = Static<typeof BaoAiModelTargetSchema>;

/**
 * BaoDown flow target.
 */
export const BaoBaoDownFlowTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("baodown-flow"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      definition: TypeExports.String({
        minLength: 1,
        description: "Archive-relative BaoDown flow definition path.",
      }),
      version: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Flow definition version.",
        }),
      ),
      schedule: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Optional schedule expression for the flow.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** BaoDown flow target. */
export type BaoBaoDownFlowTarget = Static<typeof BaoBaoDownFlowTargetSchema>;

/**
 * Bunbuddy contract target.
 */
export const BaoBunbuddyContractTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("bunbuddy-contract"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      contract: TypeExports.String({
        minLength: 1,
        description: "Archive-relative Bunbuddy contract path or contract identifier.",
      }),
      bunbuddyKind: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Bunbuddy runtime kind that consumes the contract.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Bunbuddy contract target. */
export type BaoBunbuddyContractTarget = Static<typeof BaoBunbuddyContractTargetSchema>;

const BaoConfigOverlayValueSchema = TypeExports.Union(
  [TypeExports.String(), TypeExports.Number(), TypeExports.Boolean()],
  {
    description: "Scalar value accepted in a configuration overlay.",
  },
);

/**
 * Config overlay target.
 */
export const BaoConfigOverlayTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("config-overlay"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      section: TypeExports.String({
        minLength: 1,
        description: "Configuration section to patch.",
      }),
      overlay: TypeExports.Record(
        TypeExports.String({ minLength: 1 }),
        BaoConfigOverlayValueSchema,
        {
          description: "Scalar overlay values keyed by config field.",
        },
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Config overlay target. */
export type BaoConfigOverlayTarget = Static<typeof BaoConfigOverlayTargetSchema>;

/**
 * USD scene target.
 */
export const BaoUsdSceneTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("usd-scene"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      scene: TypeExports.String({
        minLength: 1,
        description: "Archive-relative USD scene path.",
      }),
      format: TypeExports.Union([
        TypeExports.Literal("usda"),
        TypeExports.Literal("usdc"),
        TypeExports.Literal("usdz"),
      ]),
      compositionMode: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      experienceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      targetPrimPath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      variantSelections: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      resolverSearchPaths: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      validationProfile: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      storageBucket: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** USD scene target. */
export type BaoUsdSceneTarget = Static<typeof BaoUsdSceneTargetSchema>;

const BaoUiComponentCategorySchema = TypeExports.Union([
  TypeExports.Literal("action"),
  TypeExports.Literal("data-display"),
  TypeExports.Literal("data-entry"),
  TypeExports.Literal("feedback"),
  TypeExports.Literal("layout"),
  TypeExports.Literal("navigation"),
  TypeExports.Literal("overlay"),
  TypeExports.Literal("typography"),
]);

const BaoUiComponentDefinitionSchema = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable component identifier.",
    }),
    entrypoint: TypeExports.String({
      minLength: 1,
      description: "Package subpath or module entrypoint for the component.",
    }),
    displayName: TypeExports.String({
      minLength: 1,
      description: "Human-readable component name.",
    }),
    category: BaoUiComponentCategorySchema,
  },
  { additionalProperties: false },
);

/**
 * UI component kit target.
 */
export const BaoUiComponentKitTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("ui-component-kit"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      kitId: TypeExports.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable component kit identifier.",
      }),
      daisyUiVersionRange: TypeExports.String({
        minLength: 1,
        description: "Supported DaisyUI version range.",
      }),
      tailwindVersionRange: TypeExports.String({
        minLength: 1,
        description: "Supported Tailwind version range.",
      }),
      components: TypeExports.Array(BaoUiComponentDefinitionSchema, {
        minItems: 1,
        description: "Components exposed by the kit.",
      }),
      themes: TypeExports.Optional(
        TypeExports.Array(TypeExports.String({ minLength: 1, pattern: "^[a-z0-9][a-z0-9-]*$" })),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** UI component kit target. */
export type BaoUiComponentKitTarget = Static<typeof BaoUiComponentKitTargetSchema>;

/**
 * Theme pack target — contributes a daisyUI 5 theme variant (light or
 * dark) keyed by stable theme id. The host app's theme controller picks
 * the variant up at the next render and offers it in the Settings
 * Workbench's Appearance card. Themes that fail validation
 * (banned palette utilities, raw hex colors, missing required token
 * categories) are rejected by the install validator before reaching
 * the runtime.
 */
export const BaoThemePackTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("theme-pack"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      themeId: TypeExports.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable theme identifier surfaced to the theme controller.",
      }),
      colorScheme: TypeExports.Union([TypeExports.Literal("light"), TypeExports.Literal("dark")], {
        description: "Color-scheme variant the theme targets.",
      }),
      daisyUiVersionRange: TypeExports.String({
        minLength: 1,
        description: "Supported DaisyUI version range.",
      }),
      stylesheet: TypeExports.String({
        minLength: 1,
        pattern: "^[^\\0]+\\.css$",
        description: "POSIX-relative path to the theme's CSS bundle inside the .bao archive.",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Theme pack target. */
export type BaoThemePackTarget = Static<typeof BaoThemePackTargetSchema>;

/**
 * Design tokens target — contributes a token bundle that overrides one
 * or more category in the platform's central design-token system
 * (spacing, radius, shadow, motion-curve). Tokens are merged onto the
 * shell's `<body data-bao-ui-*>` projection at the next render.
 */
export const BaoDesignTokensTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("design-tokens"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      tokenSetId: TypeExports.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable token-set identifier.",
      }),
      categories: TypeExports.Array(
        TypeExports.Union([
          TypeExports.Literal("spacing"),
          TypeExports.Literal("radius"),
          TypeExports.Literal("shadow"),
          TypeExports.Literal("motion-curve"),
          TypeExports.Literal("typography"),
        ]),
        {
          minItems: 1,
          description: "Token categories the bundle contributes to.",
        },
      ),
      stylesheet: TypeExports.String({
        minLength: 1,
        pattern: "^[^\\0]+\\.css$",
        description: "POSIX-relative path to the token CSS bundle inside the .bao archive.",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Design tokens target. */
export type BaoDesignTokensTarget = Static<typeof BaoDesignTokensTargetSchema>;

/**
 * Motion preset target — contributes a named animation primitive set
 * (duration scale + easing curves) consumed by the canonical motion
 * controller. Apple HIG / Warp / iOS-aligned defaults; presets respect
 * the user's `prefers-reduced-motion` preference automatically.
 */
export const BaoMotionPresetTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("motion-preset"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      presetId: TypeExports.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable motion-preset identifier.",
      }),
      profile: TypeExports.Union(
        [
          TypeExports.Literal("calm"),
          TypeExports.Literal("standard"),
          TypeExports.Literal("expressive"),
        ],
        {
          description: "Motion-energy profile.",
        },
      ),
      respectsReducedMotion: TypeExports.Boolean({
        description: "Honors the user's prefers-reduced-motion preference. Required to be true.",
      }),
      stylesheet: TypeExports.String({
        minLength: 1,
        pattern: "^[^\\0]+\\.css$",
        description: "POSIX-relative path to the motion CSS bundle.",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Motion preset target. */
export type BaoMotionPresetTarget = Static<typeof BaoMotionPresetTargetSchema>;

/**
 * Density preset target — contributes a layout-density variant
 * (compact / comfortable / spacious) consumed by the central spacing
 * scale. Matches the iOS HIG density principles + DaisyUI 5 size
 * tokens (xs/sm/md/lg/xl). Stored in `RegistrySessionUiPreferences`
 * and projected onto `<body data-bao-ui-density>`.
 */
export const BaoDensityPresetTargetSchema = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("density-preset"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      presetId: TypeExports.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable density-preset identifier.",
      }),
      density: TypeExports.Union(
        [
          TypeExports.Literal("compact"),
          TypeExports.Literal("comfortable"),
          TypeExports.Literal("spacious"),
        ],
        {
          description: "Layout-density variant.",
        },
      ),
      stylesheet: TypeExports.String({
        minLength: 1,
        pattern: "^[^\\0]+\\.css$",
        description: "POSIX-relative path to the density CSS bundle.",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Density preset target. */
export type BaoDensityPresetTarget = Static<typeof BaoDensityPresetTargetSchema>;

/**
 * Sidebar registration target — contributes drawer navigation entries.
 */
export const BaoSidebarTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("sidebar"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      sidebarModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createSidebarRegistrations().",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for sidebar registration target. */
export type BaoSidebarTarget = Static<typeof BaoSidebarTargetSchema>;

/**
 * Nav registration target — contributes top-nav and breadcrumb mappings.
 */
export const BaoNavTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("nav"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      navModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createNavRegistrations().",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for nav registration target. */
export type BaoNavTarget = Static<typeof BaoNavTargetSchema>;

/**
 * Settings-tab registration target — contributes Settings Workbench tabs.
 */
export const BaoSettingsTabTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("settings-tab"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      settingsTabModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createSettingsTabRegistrations().",
      }),
      settingsPanelModule: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Module specifier exporting renderContributedSettingsPanel().",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for settings-tab registration target. */
export type BaoSettingsTabTarget = Static<typeof BaoSettingsTabTargetSchema>;

/**
 * Palette-entry-group registration target — contributes Command Palette
 * entry groups.
 */
export const BaoPaletteEntryGroupTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("palette-entry-group"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      paletteEntryGroupModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createPaletteEntryGroupRegistrations().",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for palette-entry-group registration target. */
export type BaoPaletteEntryGroupTarget = Static<typeof BaoPaletteEntryGroupTargetSchema>;

/**
 * API-group registration target — contributes API Explorer tabs.
 */
export const BaoApiGroupTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("api-group"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      apiGroupModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createApiGroupRegistrations().",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for api-group registration target. */
export type BaoApiGroupTarget = Static<typeof BaoApiGroupTargetSchema>;

/**
 * Tile-group registration target — contributes Dashboard tiles.
 */
export const BaoTileGroupTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("tile-group"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      tileGroupModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createTileGroupRegistrations().",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for tile-group registration target. */
export type BaoTileGroupTarget = Static<typeof BaoTileGroupTargetSchema>;

/**
 * Topbar registration target — contributes shell topbar entries.
 */
export const BaoTopbarTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("topbar"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      topbarModule: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting createTopbarRegistrations().",
      }),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for topbar registration target. */
export type BaoTopbarTarget = Static<typeof BaoTopbarTargetSchema>;

/**
 * OCI image target.
 */
export const BaoOciImageTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("oci-image"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      image: TypeExports.String({
        minLength: 1,
        description: "OCI image reference.",
      }),
      tag: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Image tag. Defaults to latest when omitted by callers.",
        }),
      ),
      registry: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "OCI registry override.",
        }),
      ),
      context: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Repository-relative OCI build context.",
        }),
      ),
      containerfile: TypeExports.Optional(
        TypeExports.String({
          minLength: 1,
          description: "Repository-relative OCI Containerfile path.",
        }),
      ),
      platforms: TypeExports.Optional(
        TypeExports.Array(TypeExports.String({ minLength: 1 }), {
          minItems: 1,
          description: "Declared OCI image platforms or Bao platform identifiers.",
        }),
      ),
      architectures: TypeExports.Optional(
        TypeExports.Array(TypeExports.String({ minLength: 1 }), {
          minItems: 1,
          description: "Declared CPU architectures for the image build.",
        }),
      ),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for OCI image targets. */
export type BaoOciImageTarget = Static<typeof BaoOciImageTargetSchema>;

const BaoMcpProviderToolSchema = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      pattern: "^[a-zA-Z0-9][a-zA-Z0-9.-]*$",
      description: "Stable MCP tool identifier exposed by the provider.",
    }),
    description: TypeExports.String({
      minLength: 1,
      description: "Human-readable MCP tool description.",
    }),
    inputSchema: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional relative path to a JSON schema for tool input.",
      }),
    ),
  },
  { additionalProperties: false },
);

const BaoMcpProviderResourceSchema = TypeExports.Object(
  {
    uri: TypeExports.String({
      minLength: 1,
      description: "Stable MCP resource URI.",
    }),
    name: TypeExports.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable MCP resource identifier.",
    }),
    mimeType: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional MIME type for the resource.",
      }),
    ),
  },
  { additionalProperties: false },
);

const BaoMcpProviderPromptArgumentSchema = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable prompt argument identifier.",
    }),
    description: TypeExports.String({
      minLength: 1,
      description: "Human-readable prompt argument description.",
    }),
    required: TypeExports.Boolean({
      description: "Whether the prompt argument is required.",
    }),
  },
  { additionalProperties: false },
);

const BaoMcpProviderPromptSchema = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable MCP prompt identifier.",
    }),
    description: TypeExports.String({
      minLength: 1,
      description: "Human-readable MCP prompt description.",
    }),
    arguments: TypeExports.Optional(
      TypeExports.Array(BaoMcpProviderPromptArgumentSchema, {
        description: "Optional prompt argument inventory.",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * MCP provider target.
 */
export const BaoMcpProviderTargetSchema: TOptions<
  TObject<Record<string, TSchema>, string, string>,
  { additionalProperties: false }
> = TypeExports.Options(
  TypeExports.Composite([
    BaoInstallTargetOrderingSchema,
    TypeExports.Object({
      kind: TypeExports.Literal("mcp-provider"),
      target: TypeExports.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      providerId: TypeExports.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable MCP provider identifier.",
      }),
      mcpProtocolVersion: TypeExports.String({
        minLength: 1,
        description: "Declared MCP protocol version supported by the provider.",
      }),
      entrypoint: TypeExports.String({
        minLength: 1,
        description: "Module specifier exporting `providers: readonly McpProviderDefinition[]`.",
      }),
      tools: TypeExports.Array(BaoMcpProviderToolSchema, {
        minItems: 1,
        description: "Canonical MCP tool inventory exposed by the provider.",
      }),
      resources: TypeExports.Optional(
        TypeExports.Array(BaoMcpProviderResourceSchema, {
          description: "Optional MCP resource inventory exposed by the provider.",
        }),
      ),
      prompts: TypeExports.Optional(
        TypeExports.Array(BaoMcpProviderPromptSchema, {
          description: "Optional MCP prompt inventory exposed by the provider.",
        }),
      ),
      mcpMetadata: TypeExports.Optional(McpProviderMetadataSchema),
      checksum: TypeExports.Optional(BaoInstallChecksumSchema),
      signature: TypeExports.Optional(BaoInstallSignatureSchema),
      dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for MCP provider target. */
export type BaoMcpProviderTarget = Static<typeof BaoMcpProviderTargetSchema>;

/**
 * Health probe configuration for runtime services.
 *
 * Single source of truth consumed by baoControlPlane workload templates and monitoring.
 */
export const BaoTargetHealthcheckSchema: TObject<
  {
    readonly readinessPath: TOptional<TString>;
    readonly livenessPath: TOptional<TString>;
    readonly port: TOptional<TInteger>;
    readonly initialDelaySeconds: TOptional<TInteger>;
    readonly periodSeconds: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly readinessPath: TOptional<TString>;
    readonly livenessPath: TOptional<TString>;
    readonly port: TOptional<TInteger>;
    readonly initialDelaySeconds: TOptional<TInteger>;
    readonly periodSeconds: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    readinessPath: TypeExports.Optional(
      TypeExports.String({
        default: "/health/ready",
        description: "HTTP path for readiness probes.",
      }),
    ),
    livenessPath: TypeExports.Optional(
      TypeExports.String({
        default: "/health/live",
        description: "HTTP path for liveness probes.",
      }),
    ),
    port: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1,
        maximum: 65535,
        description: "Port on which health endpoints are served (defaults to the service port).",
      }),
    ),
    initialDelaySeconds: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        default: 5,
        description: "Seconds to wait before first probe.",
      }),
    ),
    periodSeconds: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1,
        default: 10,
        description: "Seconds between consecutive probes.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description:
      "Health probe configuration for runtime services. Single source of truth — consumed by baoControlPlane workload templates and monitoring.",
  },
);

/** TypeScript type for target healthcheck configuration. */
export type BaoTargetHealthcheck = Static<typeof BaoTargetHealthcheckSchema>;

/**
 * Declarative environment variable requirement for a `.bao` target.
 *
 * Enables automated validation during baoControlPlane deployment.
 */
export const BaoTargetEnvVarSchema: TObject<
  {
    readonly name: TString;
    readonly description: TOptional<TString>;
    readonly required: TOptional<TBoolean>;
    readonly default: TOptional<TString>;
    readonly sensitive: TOptional<TBoolean>;
  },
  "name",
  InferOptionalKeys<{
    readonly name: TString;
    readonly description: TOptional<TString>;
    readonly required: TOptional<TBoolean>;
    readonly default: TOptional<TString>;
    readonly sensitive: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      pattern: "^[A-Z_][A-Z0-9_]*$",
      description: "Environment variable name.",
    }),
    description: TypeExports.Optional(
      TypeExports.String({
        description: "Human-readable description of the variable's purpose.",
      }),
    ),
    required: TypeExports.Optional(
      TypeExports.Boolean({
        default: false,
        description: "Whether the variable must be set for the target to function.",
      }),
    ),
    default: TypeExports.Optional(
      TypeExports.String({
        description: "Default value when the variable is not set.",
      }),
    ),
    sensitive: TypeExports.Optional(
      TypeExports.Boolean({
        default: false,
        description: "Whether the variable contains sensitive data (secrets, tokens).",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Declarative environment variable requirement for a `.bao` target.",
  },
);

/** TypeScript type for target environment variable declarations. */
export type BaoTargetEnvVar = Static<typeof BaoTargetEnvVarSchema>;

export const BAO_INSTALL_ACCESS_VISIBILITIES = {
  public: "public",
  organization: "organization",
  industry: "industry",
  private: "private",
} as const;

export type BaoInstallAccessVisibility =
  (typeof BAO_INSTALL_ACCESS_VISIBILITIES)[keyof typeof BAO_INSTALL_ACCESS_VISIBILITIES];

export const BaoTargetAccessPolicySchema = TypeExports.Object(
  {
    visibility: TypeExports.Union([
      TypeExports.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.public),
      TypeExports.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.organization),
      TypeExports.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.industry),
      TypeExports.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.private),
    ]),
    organizationScopes: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
    industryScopes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    allowedGroupIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    requiredPermissions: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
    maintainerGroupIds: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
  },
  {
    additionalProperties: false,
    description:
      "Install access policy evaluated before a `.bao` target can be applied or removed.",
  },
);

export type BaoTargetAccessPolicy = Static<typeof BaoTargetAccessPolicySchema>;

/**
 * Open base target schema for canonical `.bao` archive manifests.
 *
 * Accepts any `kind` string and allows additional properties so that
 * per-adapter fields pass structural validation. Per-adapter TypeBox schemas
 * handle kind-specific field validation at runtime.
 */
export const BaoInstallTargetBaseSchema = TypeExports.Object(
  {
    kind: BaoInstallTargetKindSchema,
    target: TypeExports.String({
      minLength: 1,
      description: "Stable target identifier (unique in manifest).",
    }),
    mcpMetadata: TypeExports.Optional(McpProviderMetadataSchema),
    before: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Targets that should run before this target.",
      }),
    ),
    after: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Targets that should run after this target.",
      }),
    ),
    healthcheck: TypeExports.Optional(BaoTargetHealthcheckSchema),
    environment: TypeExports.Optional(
      TypeExports.Array(BaoTargetEnvVarSchema, {
        description:
          "Declarative environment variable requirements for the target. Enables automated validation during baoControlPlane deployment.",
      }),
    ),
    accessPolicy: TypeExports.Optional(BaoTargetAccessPolicySchema),
    checksum: TypeExports.Optional(BaoInstallChecksumSchema),
    signature: TypeExports.Optional(BaoInstallSignatureSchema),
    dependencies: TypeExports.Optional(TypeExports.Array(BaoInstallDependencySchema)),
  },
  {
    additionalProperties: true,
    description: "Open base target envelope for canonical `.bao` archive manifests.",
  },
);

/**
 * TypeScript type for the open base target.
 */
export interface BaoInstallTargetBase {
  [key: string]: unknown;
  id?: string | undefined;
  kind: BaoInstallTargetKind;
  target: string;
  packageName?: string | undefined;
  packageVersion?: string | undefined;
  requestedVersion?: string | undefined;
  exports?: Record<string, BaoPackageExportValue> | undefined;
  bin?: Record<string, string> | undefined;
  archivePath?: string | undefined;
  dependencyLock?: BaoPackageDependencyLock[] | undefined;
  sharedPayload?: BaoArchiveSharedPayload | undefined;
  platformPayloads?: BaoArchivePlatformPayload[] | undefined;
  bytecodePayload?: BaoArchiveSharedPayload | undefined;
  wasmPayload?: BaoArchiveSharedPayload | undefined;
  surfaces?: BaoPackageSurface | undefined;
  pluginName?: string | undefined;
  pluginEntrypoint?: string | undefined;
  bunVersionRange?: string | undefined;
  hooks?: string[] | undefined;
  extension?: string | undefined;
  route?: string | undefined;
  scope?: string | undefined;
  sidebarModule?: string | undefined;
  navModule?: string | undefined;
  values?: { readonly [key: string]: BaoTargetStructuredValue } | undefined;
  requiresApply?: boolean | undefined;
  definition?: string | undefined;
  contract?: string | undefined;
  bunbuddyKind?: string | undefined;
  component?: string | undefined;
  image?: string | undefined;
  context?: string | undefined;
  containerfile?: string | undefined;
  platforms?: string[] | undefined;
  architectures?: string[] | undefined;
  provider?: string | undefined;
  configPath?: string | undefined;
  plugin?: string | undefined;
  enabled?: boolean | undefined;
  priority?: number | undefined;
  schemaPath?: string | undefined;
  outputDir?: string | undefined;
  nodeModule?: string | undefined;
  typeId?: string | undefined;
  driverPackage?: string | undefined;
  scene?: string | undefined;
  components?:
    | Array<{
        name: string;
        entrypoint: string;
        displayName: string;
        category: string;
      }>
    | undefined;
  providerId?: string | undefined;
  mcpProtocolVersion?: string | undefined;
  entrypoint?: string | undefined;
  tools?:
    | Array<{
        name: string;
        description: string;
        inputSchema?: string | undefined;
      }>
    | undefined;
  resources?: BaoMcpResourceDefinition[] | BaoBaoControlPlaneResourceRequirements | undefined;
  prompts?:
    | Array<{
        name: string;
        description: string;
        arguments?:
          | Array<{
              name: string;
              description: string;
              required: boolean;
            }>
          | undefined;
      }>
    | undefined;
  mcpMetadata?: McpProviderMetadata | undefined;
  before?: string[] | undefined;
  after?: string[] | undefined;
  lifecycle?:
    | {
        preInstall?: string | undefined;
        postInstall?: string | undefined;
        preActivate?: string | undefined;
        postActivate?: string | undefined;
        preRemove?: string | undefined;
        postRemove?: string | undefined;
      }
    | undefined;
  healthcheck?: BaoTargetHealthcheck | undefined;
  environment?: BaoTargetEnvVar[] | undefined;
  accessPolicy?: BaoTargetAccessPolicy | undefined;
  checksum?: BaoInstallChecksum | undefined;
  signature?: BaoInstallSignature | undefined;
  dependencies?: BaoInstallDependency[] | undefined;
}

/**
 * Union schema for all `.bao` target declaration forms.
 *
 * Callers narrow from the open base target with runtime guards for adapter-
 * specific fields.
 */
export const BaoInstallTargetSchema = TypeExports.Union(
  [
    BaoPackageTargetSchema,
    BaoHtmxExtensionTargetSchema,
    BaoPrismaExtensionTargetSchema,
    BaoBetterAuthExtensionTargetSchema,
    BaoElysiaPluginTargetSchema,
    BaoBaoDownNodeTargetSchema,
    BaoBunPluginTargetSchema,
    BaoFlatbufferSchemaTargetSchema,
    BaoHardwareDriverTargetSchema,
    BaoAiModelTargetSchema,
    BaoBaoDownFlowTargetSchema,
    BaoBunbuddyContractTargetSchema,
    BaoConfigOverlayTargetSchema,
    BaoSidebarTargetSchema,
    BaoNavTargetSchema,
    BaoSettingsTabTargetSchema,
    BaoPaletteEntryGroupTargetSchema,
    BaoApiGroupTargetSchema,
    BaoTileGroupTargetSchema,
    BaoTopbarTargetSchema,
    BaoRuntimeWorkloadTargetSchema,
    BaoOciImageTargetSchema,
    BaoMcpProviderTargetSchema,
    BaoUsdSceneTargetSchema,
    BaoUiComponentKitTargetSchema,
    BaoThemePackTargetSchema,
    BaoDesignTokensTargetSchema,
    BaoMotionPresetTargetSchema,
    BaoDensityPresetTargetSchema,
    BaoInstallTargetBaseSchema,
  ],
  {
    description: "Unified target declaration for `.bao` installs.",
  },
);

/**
 * TypeScript type for `.bao` targets exposed on manifests.
 */
export type BaoInstallTarget = BaoInstallTargetBase;
