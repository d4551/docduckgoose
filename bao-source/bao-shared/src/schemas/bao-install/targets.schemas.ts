/**
 * `.bao` install target schemas.
 *
 * Adapter-specific target declarations plus the open base target used across
 * `.bao` archive manifests.
 *
 * @shared/schemas/bao-install/targets
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
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
import { type BaoInstallTargetKind, BaoInstallTargetKindSchema } from "./core.schemas.ts";

const BaoPackageExportConditionSchema = Type.Record(
  Type.String({ minLength: 1 }),
  Type.String({ minLength: 1 }),
  {
    description: "Bao package conditional export targets keyed by condition name.",
  },
);

const BaoPackageExportValueSchema = Type.Union(
  [Type.String({ minLength: 1 }), BaoPackageExportConditionSchema],
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

interface BaoBaoControlPlaneResourceProfile {
  readonly cpu: string;
  readonly memory: string;
  readonly ephemeralStorage?: string;
}

interface BaoBaoControlPlaneResourceRequirements {
  readonly requests: BaoBaoControlPlaneResourceProfile;
  readonly limits: BaoBaoControlPlaneResourceProfile;
}

interface BaoMcpResourceDefinition {
  readonly uri: string;
  readonly name: string;
  readonly mimeType?: string;
}

export const BAO_INSTALL_ACCESS_VISIBILITIES = {
  public: "public",
  organization: "organization",
  industry: "industry",
  private: "private",
} as const;

export type BaoInstallAccessVisibility =
  (typeof BAO_INSTALL_ACCESS_VISIBILITIES)[keyof typeof BAO_INSTALL_ACCESS_VISIBILITIES];

export const BaoInstallAccessVisibilitySchema = Type.Union(
  [
    Type.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.public),
    Type.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.organization),
    Type.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.industry),
    Type.Literal(BAO_INSTALL_ACCESS_VISIBILITIES.private),
  ],
  {
    description: "Visibility boundary for applying or removing a `.bao` target.",
  },
);

const BaoInstallAccessScopeListSchema = Type.Array(Type.String({ minLength: 1 }), {
  description: "Canonical scope identifiers for `.bao` target access policy checks.",
});

export const BaoInstallAccessPolicySchema = Type.Object(
  {
    visibility: BaoInstallAccessVisibilitySchema,
    organizationScopes: Type.Optional(BaoInstallAccessScopeListSchema),
    industryScopes: Type.Optional(BaoInstallAccessScopeListSchema),
    allowedGroupIds: Type.Optional(BaoInstallAccessScopeListSchema),
    requiredPermissions: Type.Optional(BaoInstallAccessScopeListSchema),
    maintainerGroupIds: Type.Optional(BaoInstallAccessScopeListSchema),
  },
  {
    additionalProperties: false,
    description:
      "Target-level install access policy. Evaluated before target apply/remove for organization, industry, group, and permission boundaries.",
  },
);

export type BaoInstallAccessPolicy = Static<typeof BaoInstallAccessPolicySchema>;

const BaoInstallTargetAccessPolicyMemberSchema = Type.Object({
  accessPolicy: BaoInstallAccessPolicySchema,
});

/** Schema for Bao package targets embedded in `.bao` archive manifests. */
export const BaoPackageTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("bao-package"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      packageName: Type.String({
        minLength: 1,
        description: "Resolved package name materialized into the Bao package unpack store.",
      }),
      packageVersion: Type.String({
        minLength: 1,
        description: "Resolved exact package version materialized from the archive.",
      }),
      requestedVersion: Type.Optional(
        Type.String({
          minLength: 1,
          description: "Original requested version or semver range before resolution.",
        }),
      ),
      exports: Type.Optional(
        Type.Record(Type.String({ minLength: 1 }), BaoPackageExportValueSchema, {
          description: "Resolved package exports metadata.",
        }),
      ),
      bin: Type.Optional(
        Type.Record(Type.String({ minLength: 1 }), Type.String({ minLength: 1 }), {
          description: "Resolved package bin metadata.",
        }),
      ),
      archivePath: Type.Optional(
        Type.String({
          minLength: 1,
          description: "Internal staged archive path used by the Bao package target handler.",
        }),
      ),
      dependencyLock: Type.Array(BaoPackageDependencyLockSchema, {
        description: "Exact resolved dependency graph for the runtime package closure.",
      }),
      sharedPayload: BaoArchiveSharedPayloadSchema,
      platformPayloads: Type.Array(BaoArchivePlatformPayloadSchema, {
        description: "Per-platform slice inventory included in the archive.",
      }),
      surfaces: BaoPackageSurfaceSchema,
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
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
export const BaoHtmxExtensionTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("htmx-extension"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      extension: Type.String({
        minLength: 1,
        description:
          "Importable HTML route extension module identifier consumed by the HTMX/html-route runtime loader.",
      }),
      route: Type.Optional(
        Type.Union([Type.Literal("public"), Type.Literal("authenticated"), Type.Literal("admin")], {
          description: "Route injection zone.",
        }),
      ),
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
      priority: Type.Optional(
        Type.Integer({ minimum: 0, description: "Ordering override for deterministic execution." }),
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
export const BaoPrismaExtensionTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("prisma-extension"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      extension: Type.String({
        minLength: 1,
        description: "Prisma extension or plugin identifier.",
      }),
      requiresApply: Type.Optional(
        Type.Boolean({ description: "Whether migration/apply is required after install." }),
      ),
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Prisma extension target. */
export type BaoPrismaExtensionTarget = Static<typeof BaoPrismaExtensionTargetSchema>;

/**
 * Better Auth extension target.
 */
export const BaoBetterAuthExtensionTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("better-auth-extension"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      provider: Type.String({
        minLength: 1,
        description: "Module specifier for the Better Auth extension entrypoint.",
      }),
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
      configPath: Type.Optional(
        Type.String({ minLength: 1, description: "Optional provider-specific config path." }),
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
export const BaoElysiaPluginTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("elysia-plugin"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      plugin: Type.String({
        minLength: 1,
        description: "Elysia plugin package or entrypoint identifier.",
      }),
      route: Type.Optional(
        Type.String({
          minLength: 1,
          description: "Optional route mount base path prefix override.",
        }),
      ),
      enabled: Type.Optional(
        Type.Boolean({ description: "Whether this plugin should be enabled after install." }),
      ),
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** Elysia plugin target. */
export type BaoElysiaPluginTarget = Static<typeof BaoElysiaPluginTargetSchema>;

/**
 * BaoDown node target — registers a custom node type in the BaoDown automation engine.
 */
export const BaoBaoDownNodeTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("baodown-node"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      nodeModule: Type.String({
        minLength: 1,
        description: "Module specifier exporting a BaoDownNodeDefinition.",
      }),
      typeId: Type.Optional(
        Type.String({
          minLength: 1,
          description: "Override typeId (defaults to the module export typeId).",
        }),
      ),
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
    }),
  ]),
  { additionalProperties: false },
);

/** TypeScript type for BaoDown node target. */
export type BaoBaoDownNodeTarget = Static<typeof BaoBaoDownNodeTargetSchema>;

const BaoMcpProviderToolSchema = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable MCP tool identifier exposed by the provider.",
    }),
    description: Type.String({
      minLength: 1,
      description: "Human-readable MCP tool description.",
    }),
    inputSchema: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Optional relative path to a JSON schema for tool input.",
      }),
    ),
  },
  { additionalProperties: false },
);

const BaoMcpProviderResourceSchema = Type.Object(
  {
    uri: Type.String({
      minLength: 1,
      description: "Stable MCP resource URI.",
    }),
    name: Type.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable MCP resource identifier.",
    }),
    mimeType: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Optional MIME type for the resource.",
      }),
    ),
  },
  { additionalProperties: false },
);

const BaoMcpProviderPromptArgumentSchema = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable prompt argument identifier.",
    }),
    description: Type.String({
      minLength: 1,
      description: "Human-readable prompt argument description.",
    }),
    required: Type.Boolean({
      description: "Whether the prompt argument is required.",
    }),
  },
  { additionalProperties: false },
);

const BaoMcpProviderPromptSchema = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      pattern: "^[a-z0-9][a-z0-9-]*$",
      description: "Stable MCP prompt identifier.",
    }),
    description: Type.String({
      minLength: 1,
      description: "Human-readable MCP prompt description.",
    }),
    arguments: Type.Optional(
      Type.Array(BaoMcpProviderPromptArgumentSchema, {
        description: "Optional prompt argument inventory.",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * MCP provider target.
 */
export const BaoMcpProviderTargetSchema: Type.TOptions<
  Type.TObject<Record<string, Type.TSchema>, string, string>,
  { additionalProperties: boolean }
> = Type.Options(
  Type.Composite([
    BaoInstallTargetOrderingSchema,
    BaoInstallTargetAccessPolicyMemberSchema,
    Type.Object({
      kind: Type.Literal("mcp-provider"),
      target: Type.String({
        minLength: 1,
        description: "Stable target identifier (unique in manifest).",
      }),
      providerId: Type.String({
        minLength: 1,
        pattern: "^[a-z0-9][a-z0-9-]*$",
        description: "Stable MCP provider identifier.",
      }),
      mcpProtocolVersion: Type.String({
        minLength: 1,
        description: "Declared MCP protocol version supported by the provider.",
      }),
      entrypoint: Type.String({
        minLength: 1,
        description: "Module specifier exporting `providers: readonly McpProviderDefinition[]`.",
      }),
      tools: Type.Array(BaoMcpProviderToolSchema, {
        minItems: 1,
        description: "Canonical MCP tool inventory exposed by the provider.",
      }),
      resources: Type.Optional(
        Type.Array(BaoMcpProviderResourceSchema, {
          description: "Optional MCP resource inventory exposed by the provider.",
        }),
      ),
      prompts: Type.Optional(
        Type.Array(BaoMcpProviderPromptSchema, {
          description: "Optional MCP prompt inventory exposed by the provider.",
        }),
      ),
      mcpMetadata: Type.Optional(McpProviderMetadataSchema),
      checksum: Type.Optional(BaoInstallChecksumSchema),
      signature: Type.Optional(BaoInstallSignatureSchema),
      dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
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
export const BaoTargetHealthcheckSchema: Type.TObject<
  {
    readonly readinessPath: Type.TOptional<Type.TString>;
    readonly livenessPath: Type.TOptional<Type.TString>;
    readonly port: Type.TOptional<Type.TInteger>;
    readonly initialDelaySeconds: Type.TOptional<Type.TInteger>;
    readonly periodSeconds: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly readinessPath: Type.TOptional<Type.TString>;
    readonly livenessPath: Type.TOptional<Type.TString>;
    readonly port: Type.TOptional<Type.TInteger>;
    readonly initialDelaySeconds: Type.TOptional<Type.TInteger>;
    readonly periodSeconds: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    readinessPath: Type.Optional(
      Type.String({
        default: "/health/ready",
        description: "HTTP path for readiness probes.",
      }),
    ),
    livenessPath: Type.Optional(
      Type.String({
        default: "/health/live",
        description: "HTTP path for liveness probes.",
      }),
    ),
    port: Type.Optional(
      Type.Integer({
        minimum: 1,
        maximum: 65535,
        description: "Port on which health endpoints are served (defaults to the service port).",
      }),
    ),
    initialDelaySeconds: Type.Optional(
      Type.Integer({
        minimum: 0,
        default: 5,
        description: "Seconds to wait before first probe.",
      }),
    ),
    periodSeconds: Type.Optional(
      Type.Integer({
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
export const BaoTargetEnvVarSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly required: Type.TOptional<Type.TBoolean>;
    readonly default: Type.TOptional<Type.TString>;
    readonly sensitive: Type.TOptional<Type.TBoolean>;
  },
  "name",
  Type.InferOptionalKeys<{
    readonly name: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly required: Type.TOptional<Type.TBoolean>;
    readonly default: Type.TOptional<Type.TString>;
    readonly sensitive: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      pattern: "^[A-Z_][A-Z0-9_]*$",
      description: "Environment variable name.",
    }),
    description: Type.Optional(
      Type.String({
        description: "Human-readable description of the variable's purpose.",
      }),
    ),
    required: Type.Optional(
      Type.Boolean({
        default: false,
        description: "Whether the variable must be set for the target to function.",
      }),
    ),
    default: Type.Optional(
      Type.String({
        description: "Default value when the variable is not set.",
      }),
    ),
    sensitive: Type.Optional(
      Type.Boolean({
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

/**
 * Open base target schema for canonical `.bao` archive manifests.
 *
 * Accepts any `kind` string and allows additional properties so that
 * per-adapter fields pass structural validation. Per-adapter TypeBox schemas
 * handle kind-specific field validation at runtime.
 */
export const BaoInstallTargetBaseSchema = Type.Object(
  {
    kind: BaoInstallTargetKindSchema,
    target: Type.String({
      minLength: 1,
      description: "Stable target identifier (unique in manifest).",
    }),
    accessPolicy: BaoInstallAccessPolicySchema,
    mcpMetadata: Type.Optional(McpProviderMetadataSchema),
    before: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Targets that should run before this target.",
      }),
    ),
    after: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Targets that should run after this target.",
      }),
    ),
    healthcheck: Type.Optional(BaoTargetHealthcheckSchema),
    environment: Type.Optional(
      Type.Array(BaoTargetEnvVarSchema, {
        description:
          "Declarative environment variable requirements for the target. Enables automated validation during baoControlPlane deployment.",
      }),
    ),
    checksum: Type.Optional(BaoInstallChecksumSchema),
    signature: Type.Optional(BaoInstallSignatureSchema),
    dependencies: Type.Optional(Type.Array(BaoInstallDependencySchema)),
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
  id?: string;
  kind: BaoInstallTargetKind;
  target: string;
  accessPolicy: BaoInstallAccessPolicy;
  packageName?: string;
  packageVersion?: string;
  requestedVersion?: string;
  exports?: Record<string, BaoPackageExportValue>;
  bin?: Record<string, string>;
  archivePath?: string;
  dependencyLock?: BaoPackageDependencyLock[];
  sharedPayload?: BaoArchiveSharedPayload;
  platformPayloads?: BaoArchivePlatformPayload[];
  bytecodePayload?: BaoArchiveSharedPayload;
  wasmPayload?: BaoArchiveSharedPayload;
  surfaces?: BaoPackageSurface;
  pluginName?: string;
  pluginEntrypoint?: string;
  bunVersionRange?: string;
  hooks?: string[];
  extension?: string;
  route?: string;
  scope?: string;
  values?: { readonly [key: string]: BaoTargetStructuredValue };
  requiresApply?: boolean;
  definition?: string;
  contract?: string;
  bunbuddyKind?: string;
  image?: string;
  context?: string;
  containerfile?: string;
  platforms?: string[];
  architectures?: string[];
  provider?: string;
  configPath?: string;
  plugin?: string;
  enabled?: boolean;
  nodeModule?: string;
  typeId?: string;
  providerId?: string;
  mcpProtocolVersion?: string;
  entrypoint?: string;
  tools?: Array<{
    name: string;
    description: string;
    inputSchema?: string;
  }>;
  resources?: BaoMcpResourceDefinition[] | BaoBaoControlPlaneResourceRequirements;
  prompts?: Array<{
    name: string;
    description: string;
    arguments?: Array<{
      name: string;
      description: string;
      required: boolean;
    }>;
  }>;
  mcpMetadata?: McpProviderMetadata;
  before?: string[];
  after?: string[];
  lifecycle?: {
    preInstall?: string;
    postInstall?: string;
    preActivate?: string;
    postActivate?: string;
    preRemove?: string;
    postRemove?: string;
  };
  healthcheck?: BaoTargetHealthcheck;
  environment?: BaoTargetEnvVar[];
  checksum?: BaoInstallChecksum;
  signature?: BaoInstallSignature;
  dependencies?: BaoInstallDependency[];
}

/**
 * Union schema for all `.bao` target declaration forms.
 *
 * Callers narrow from the open base target with runtime guards for adapter-
 * specific fields.
 */
export const BaoInstallTargetSchema = Type.Union(
  [
    BaoPackageTargetSchema,
    BaoHtmxExtensionTargetSchema,
    BaoPrismaExtensionTargetSchema,
    BaoBetterAuthExtensionTargetSchema,
    BaoElysiaPluginTargetSchema,
    BaoBaoDownNodeTargetSchema,
    BaoMcpProviderTargetSchema,
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
