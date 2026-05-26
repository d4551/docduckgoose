/**
 * Cross-domain capability owner map schemas.
 *
 * Maps capability owners across local AI libs/plugins/bunbuddies, XR/USD,
 * MCP surfaces, Bao Composer/BaoDown/RPA automation, and device/driver stacks
 * (drones/robotics/training).
 *
 * @shared/schemas/capability-domain-map
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BaoRuntimeStatusSchema } from "./bao-runtime.schemas.ts";
import {
  type CapabilityOwnershipError,
  CapabilityOwnershipErrorSchema,
  type CapabilityOwnershipSummary,
  CapabilityOwnershipSummarySchema,
} from "./capability-ownership.schemas.ts";

/**
 * Domain identifier for capability grouping.
 */
export const CapabilityDomainSchema: TUnion<
  (
    | TLiteral<"drone">
    | TLiteral<"robotics">
    | TLiteral<"training">
    | TLiteral<"ai">
    | TLiteral<"xr">
    | TLiteral<"usd">
    | TLiteral<"mcp">
    | TLiteral<"hardware">
    | TLiteral<"scanner">
    | TLiteral<"pipeline">
    | TLiteral<"bao-composer">
    | TLiteral<"baodown">
    | TLiteral<"rpa">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("drone"),
    TypeExports.Literal("robotics"),
    TypeExports.Literal("training"),
    TypeExports.Literal("ai"),
    TypeExports.Literal("xr"),
    TypeExports.Literal("usd"),
    TypeExports.Literal("mcp"),
    TypeExports.Literal("hardware"),
    TypeExports.Literal("scanner"),
    TypeExports.Literal("pipeline"),
    TypeExports.Literal("bao-composer"),
    TypeExports.Literal("baodown"),
    TypeExports.Literal("rpa"),
  ],
  { description: "Domain identifier for capability grouping" },
);

/** TypeScript type for {@link CapabilityDomainSchema}. */
export type CapabilityDomain = Static<typeof CapabilityDomainSchema>;

/**
 * BunBuddy integration status within a capability domain.
 */
export const DomainBunBuddyStatusSchema: TObject<
  {
    readonly kind: TString;
    readonly available: TBoolean;
    readonly circuitState: TOptional<
      TUnion<(TLiteral<"closed"> | TLiteral<"open"> | TLiteral<"half_open">)[]>
    >;
    readonly lastCheckedAt: TOptional<TString>;
    readonly capabilities: TOptional<TArray<TString>>;
  },
  "kind" | "available",
  InferOptionalKeys<{
    readonly kind: TString;
    readonly available: TBoolean;
    readonly circuitState: TOptional<
      TUnion<(TLiteral<"closed"> | TLiteral<"open"> | TLiteral<"half_open">)[]>
    >;
    readonly lastCheckedAt: TOptional<TString>;
    readonly capabilities: TOptional<TArray<TString>>;
  }>
> = TypeExports.Object(
  {
    kind: TypeExports.String({ description: "BunBuddy kind identifier" }),
    available: TypeExports.Boolean({ description: "Whether the bunbuddy is reachable" }),
    circuitState: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("closed"),
        TypeExports.Literal("open"),
        TypeExports.Literal("half_open"),
      ]),
    ),
    lastCheckedAt: TypeExports.Optional(
      TypeExports.String({ description: "ISO 8601 timestamp of last check" }),
    ),
    capabilities: TypeExports.Optional(
      TypeExports.Array(TypeExports.String(), { description: "Available capability identifiers" }),
    ),
  },
  { description: "BunBuddy integration status within a domain" },
);

/** TypeScript type for {@link DomainBunBuddyStatusSchema}. */
export type DomainBunBuddyStatus = Static<typeof DomainBunBuddyStatusSchema>;

/**
 * MCP surface exposure for a domain.
 */
export const DomainMcpSurfaceSchema: TObject<
  {
    readonly toolCount: TNumber;
    readonly resourceCount: TNumber;
    readonly resourceUriPrefix: TOptional<TString>;
  },
  "toolCount" | "resourceCount",
  "resourceUriPrefix"
> = TypeExports.Object(
  {
    toolCount: TypeExports.Number({ description: "Number of MCP tools exposed" }),
    resourceCount: TypeExports.Number({ description: "Number of MCP resources exposed" }),
    resourceUriPrefix: TypeExports.Optional(
      TypeExports.String({ description: "Vault URI prefix for resources" }),
    ),
  },
  { description: "MCP surface exposure for a domain" },
);

/** TypeScript type for {@link DomainMcpSurfaceSchema}. */
export type DomainMcpSurface = Static<typeof DomainMcpSurfaceSchema>;

/**
 * Training integration status within a capability domain.
 */
export const DomainTrainingLinkSchema: TObject<
  {
    readonly supportsDataCapture: TBoolean;
    readonly supportsModelInference: TBoolean;
    readonly activeJobCount: TOptional<TNumber>;
    readonly lastTrainingJobId: TOptional<TString>;
  },
  "supportsDataCapture" | "supportsModelInference",
  InferOptionalKeys<{
    readonly supportsDataCapture: TBoolean;
    readonly supportsModelInference: TBoolean;
    readonly activeJobCount: TOptional<TNumber>;
    readonly lastTrainingJobId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    supportsDataCapture: TypeExports.Boolean({
      description: "Whether this domain can supply training data (images, telemetry)",
    }),
    supportsModelInference: TypeExports.Boolean({
      description: "Whether this domain can consume trained model outputs",
    }),
    activeJobCount: TypeExports.Optional(
      TypeExports.Number({ description: "Active training jobs referencing this domain" }),
    ),
    lastTrainingJobId: TypeExports.Optional(
      TypeExports.String({ description: "Most recent training job ID involving this domain" }),
    ),
  },
  { description: "Training integration link for a domain" },
);

/** TypeScript type for {@link DomainTrainingLinkSchema}. */
export type DomainTrainingLink = Static<typeof DomainTrainingLinkSchema>;

/**
 * Capability ownership domain reference attached to a capability domain entry.
 */
export const DomainOwnershipReferenceSchema: TObject<
  {
    readonly id: TString;
    readonly label: TString;
    readonly owner: TOptional<TString>;
    readonly responsibility: TOptional<TString>;
  },
  "id" | "label",
  InferOptionalKeys<{
    readonly id: TString;
    readonly label: TString;
    readonly owner: TOptional<TString>;
    readonly responsibility: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1, description: "Capability ownership domain identifier" }),
    label: TypeExports.String({
      minLength: 1,
      description: "Human-readable ownership domain label",
    }),
    owner: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Owner id or team" }),
    ),
    responsibility: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Responsibility statement" }),
    ),
  },
  {
    description: "Ownership domain reference for a capability domain",
  },
);

/** TypeScript type for {@link DomainOwnershipReferenceSchema}. */
export type DomainOwnershipReference = Static<typeof DomainOwnershipReferenceSchema>;

/**
 * Aggregated ownership coverage summary for a capability domain.
 */
export const DomainOwnershipCoverageSchema: TObject<
  {
    readonly total: TInteger;
    readonly byKind: TObject<
      {
        readonly plugin: TInteger;
        readonly bunbuddy: TInteger;
        readonly library: TInteger;
        readonly driver: TInteger;
        readonly device: TInteger;
        readonly bao: TInteger;
      },
      "plugin" | "bunbuddy" | "library" | "driver" | "device" | "bao",
      never
    >;
    readonly byStatus: TObject<
      {
        readonly registered: TInteger;
        readonly healthy: TInteger;
        readonly degraded: TInteger;
        readonly unavailable: TInteger;
        readonly available: TInteger;
        readonly unreachable: TInteger;
        readonly "not-configured": TInteger;
      },
      | "registered"
      | "healthy"
      | "degraded"
      | "unavailable"
      | "available"
      | "unreachable"
      | "not-configured",
      never
    >;
  },
  "byKind" | "byStatus" | "total",
  never
> = CapabilityOwnershipSummarySchema;

/** TypeScript type for {@link DomainOwnershipCoverageSchema}. */
export type DomainOwnershipCoverage = CapabilityOwnershipSummary;

/**
 * Ownership stack reference attached to a capability domain entry.
 */
export const DomainOwnershipStackReferenceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1, description: "Ownership stack identifier" }),
    label: TypeExports.String({ minLength: 1, description: "Ownership stack label" }),
    owner: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Stack owner id or team" }),
    ),
    responsibility: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Stack responsibility statement" }),
    ),
    summary: TypeExports.Optional(DomainOwnershipCoverageSchema),
  },
  {
    description: "Ownership stack reference for a capability domain",
  },
);

/** TypeScript type for {@link DomainOwnershipStackReferenceSchema}. */
export type DomainOwnershipStackReference = Static<typeof DomainOwnershipStackReferenceSchema>;

/**
 * Capability owner-stack coverage status for domain-map owner matrices.
 */
export const CapabilityDomainMapOwnerStackStatusSchema: TUnion<
  (TLiteral<"unmapped"> | TLiteral<"partial"> | TLiteral<"covered">)[]
> = TypeExports.Union(
  [TypeExports.Literal("unmapped"), TypeExports.Literal("partial"), TypeExports.Literal("covered")],
  {
    description: "Coverage status for an owner stack row",
  },
);

/** TypeScript type for {@link CapabilityDomainMapOwnerStackStatusSchema}. */
export type CapabilityDomainMapOwnerStackStatus = Static<
  typeof CapabilityDomainMapOwnerStackStatusSchema
>;

/**
 * Owner-stack row in the capability domain-map owner matrix.
 */
export const CapabilityDomainMapOwnerStackSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1, description: "Ownership stack identifier" }),
    label: TypeExports.String({ minLength: 1, description: "Ownership stack label" }),
    owner: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Stack owner id or team" }),
    ),
    responsibility: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Stack responsibility statement" }),
    ),
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Ownership segment ids mapped to this stack",
    }),
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Ownership domain ids mapped to this stack",
    }),
    summary: DomainOwnershipCoverageSchema,
    status: CapabilityDomainMapOwnerStackStatusSchema,
    tags: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Stack tags from config",
      }),
    ),
  },
  { description: "Owner matrix stack row" },
);

/** TypeScript type for {@link CapabilityDomainMapOwnerStackSchema}. */
export type CapabilityDomainMapOwnerStack = Static<typeof CapabilityDomainMapOwnerStackSchema>;

/**
 * Owner matrix payload attached to capability domain-map responses.
 */
export const CapabilityDomainMapOwnerMatrixSchema = TypeExports.Object(
  {
    stackIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Ordered ownership stack ids included in the matrix",
    }),
    rows: TypeExports.Array(CapabilityDomainMapOwnerStackSchema, {
      description: "Owner matrix rows aligned to configured stacks",
    }),
    summary: DomainOwnershipCoverageSchema,
  },
  {
    description: "Ownership owner matrix for cross-domain capability map",
  },
);

/** TypeScript type for {@link CapabilityDomainMapOwnerMatrixSchema}. */
export type CapabilityDomainMapOwnerMatrix = Static<typeof CapabilityDomainMapOwnerMatrixSchema>;

/**
 * Host runtime compatibility for an ownership stack.
 */
export const CapabilityDomainMapHostStackCompatibilitySchema: TObject<
  {
    readonly stackId: TString;
    readonly compatible: TBoolean;
    readonly platforms: TOptional<TArray<TString>>;
    readonly architectures: TOptional<TArray<TString>>;
    readonly reason: TOptional<TString>;
  },
  "stackId" | "compatible",
  InferOptionalKeys<{
    readonly stackId: TString;
    readonly compatible: TBoolean;
    readonly platforms: TOptional<TArray<TString>>;
    readonly architectures: TOptional<TArray<TString>>;
    readonly reason: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    stackId: TypeExports.String({ minLength: 1, description: "Ownership stack identifier" }),
    compatible: TypeExports.Boolean({
      description: "Whether the current host platform/architecture satisfies this stack policy",
    }),
    platforms: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Allowed host platform identifiers",
      }),
    ),
    architectures: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Allowed host architecture identifiers",
      }),
    ),
    reason: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Compatibility policy rationale" }),
    ),
  },
  {
    description: "Host compatibility details for an ownership stack",
  },
);

/** TypeScript type for {@link CapabilityDomainMapHostStackCompatibilitySchema}. */
export type CapabilityDomainMapHostStackCompatibility = Static<
  typeof CapabilityDomainMapHostStackCompatibilitySchema
>;

/**
 * Host environment summary attached to capability-domain map responses.
 */
export const CapabilityDomainMapHostEnvironmentSchema = TypeExports.Object(
  {
    runtime: TypeExports.Literal("bun", { description: "Runtime used by the server process" }),
    platform: TypeExports.String({
      minLength: 1,
      description: "Resolved host platform identifier",
    }),
    architecture: TypeExports.String({
      minLength: 1,
      description: "Resolved host architecture identifier",
    }),
    containerized: TypeExports.Boolean({
      description: "Whether runtime container signals are detected",
    }),
    kubernetes: TypeExports.Boolean({
      description: "Whether Kubernetes runtime signals are detected",
    }),
    infraMode: TypeExports.String({
      minLength: 1,
      description: "Resolved infrastructure mode selector",
    }),
    hostGatewayCandidates: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Ordered host gateway aliases for container-to-host routing",
      }),
    ),
    stackCompatibility: TypeExports.Array(CapabilityDomainMapHostStackCompatibilitySchema, {
      description: "Ownership stack compatibility with the current host environment",
    }),
    compatibleStacks: TypeExports.Number({ minimum: 0, description: "Count of compatible stacks" }),
    incompatibleStacks: TypeExports.Number({
      minimum: 0,
      description: "Count of incompatible stacks",
    }),
  },
  {
    description: "Resolved host environment summary for capability-domain map responses",
  },
);

/** TypeScript type for {@link CapabilityDomainMapHostEnvironmentSchema}. */
export type CapabilityDomainMapHostEnvironment = Static<
  typeof CapabilityDomainMapHostEnvironmentSchema
>;

/**
 * Cross-domain integration edge between two domains.
 */
export const DomainIntegrationEdgeSchema = TypeExports.Object(
  {
    source: CapabilityDomainSchema,
    target: CapabilityDomainSchema,
    relation: TypeExports.Union(
      [
        TypeExports.Literal("data-provider"),
        TypeExports.Literal("model-consumer"),
        TypeExports.Literal("control-plane"),
        TypeExports.Literal("pipeline-stage"),
        TypeExports.Literal("mcp-exposure"),
        TypeExports.Literal("telemetry-sink"),
      ],
      { description: "Type of integration relationship" },
    ),
    active: TypeExports.Boolean({ description: "Whether the integration is currently active" }),
    description: TypeExports.Optional(
      TypeExports.String({ description: "Human-readable description" }),
    ),
  },
  { description: "Integration edge between two domains" },
);

/** TypeScript type for {@link DomainIntegrationEdgeSchema}. */
export type DomainIntegrationEdge = Static<typeof DomainIntegrationEdgeSchema>;

/**
 * Capability domain entry in the cross-domain map.
 */
export const CapabilityDomainEntrySchema = TypeExports.Object(
  {
    domain: CapabilityDomainSchema,
    label: TypeExports.String({ description: "Human-readable domain label" }),
    enabled: TypeExports.Boolean({ description: "Whether the domain is enabled in config" }),
    contractCount: TypeExports.Number({ description: "Number of API contracts defined" }),
    endpointCount: TypeExports.Number({ description: "Number of API endpoints" }),
    owner: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Resolved owner for this domain when unambiguous",
      }),
    ),
    responsibility: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Resolved responsibility for this domain when unambiguous",
      }),
    ),
    ownershipDomains: TypeExports.Optional(
      TypeExports.Array(DomainOwnershipReferenceSchema, {
        description:
          "Mapped ownership domains (AI/XR/MCP/device/autonomy) for this capability domain",
      }),
    ),
    ownershipCoverage: TypeExports.Optional(DomainOwnershipCoverageSchema),
    ownershipStacks: TypeExports.Optional(
      TypeExports.Array(DomainOwnershipStackReferenceSchema, {
        description:
          "Mapped ownership stacks (AI, XR/USD, MCP, automation, device/driver, drone/robotics) for this capability domain",
      }),
    ),
    bunbuddy: TypeExports.Optional(DomainBunBuddyStatusSchema),
    mcpSurface: TypeExports.Optional(DomainMcpSurfaceSchema),
    trainingLink: TypeExports.Optional(DomainTrainingLinkSchema),
    queueNames: TypeExports.Optional(
      TypeExports.Array(TypeExports.String(), {
        description: "bao-boss queue names used by this domain",
      }),
    ),
    configSection: TypeExports.Optional(
      TypeExports.String({ description: "Unified config section key for this domain" }),
    ),
  },
  { description: "Single domain entry in the capability map" },
);

/** TypeScript type for {@link CapabilityDomainEntrySchema}. */
export type CapabilityDomainEntry = Static<typeof CapabilityDomainEntrySchema>;

/**
 * Metadata for refresh-oriented capability domain map responses.
 */
export const CapabilityDomainMapMetadataSchema: TObject<
  {
    readonly queued: TOptional<TBoolean>;
    readonly refreshed: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
  },
  never,
  InferOptionalKeys<{
    readonly queued: TOptional<TBoolean>;
    readonly refreshed: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
  }>
> = TypeExports.Object(
  {
    queued: TypeExports.Optional(
      TypeExports.Boolean({ description: "True when a refresh job was queued" }),
    ),
    refreshed: TypeExports.Optional(
      TypeExports.Boolean({
        description: "True when the response includes a freshly resolved map",
      }),
    ),
    jobId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
        description: "Background refresh job id when queueing is enabled",
      }),
    ),
  },
  {
    description: "Optional refresh metadata for capability domain map responses",
  },
);

/** TypeScript type for {@link CapabilityDomainMapMetadataSchema}. */
export type CapabilityDomainMapMetadata = Static<typeof CapabilityDomainMapMetadataSchema>;

/**
 * BaoControlPlane runtime summary attached to capability-domain map responses.
 */
export const CapabilityDomainMapBaoRuntimeSchema = TypeExports.Object(
  {
    status: BaoRuntimeStatusSchema,
    kubeReachable: TypeExports.Boolean({ description: "Whether the Kubernetes API is reachable" }),
    namespace: TypeExports.String({
      minLength: 1,
      description: "BaoControlPlane release namespace",
    }),
    releaseName: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "BaoControlPlane package release name",
    }),
    failureHint: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
        description: "Primary BaoControlPlane failure hint when status is degraded/unreachable",
      }),
    ),
    timestamp: TypeExports.String({
      format: "date-time",
      description: "BaoControlPlane runtime snapshot timestamp",
    }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    description: "BaoControlPlane runtime summary for capability-domain map responses",
  },
);

/** TypeScript type for {@link CapabilityDomainMapBaoRuntimeSchema}. */
export type CapabilityDomainMapBaoRuntime = Static<typeof CapabilityDomainMapBaoRuntimeSchema>;

/**
 * TypeScript type for domain map resolution errors.
 */
export type CapabilityDomainMapError = CapabilityOwnershipError;

/**
 * Full cross-domain capability owner map response.
 */
export const CapabilityDomainMapResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    domains: TypeExports.Array(CapabilityDomainEntrySchema, {
      description: "All capability domains with their integration status",
    }),
    edges: TypeExports.Array(DomainIntegrationEdgeSchema, {
      description: "Cross-domain integration relationships",
    }),
    ownershipSummary: TypeExports.Optional(DomainOwnershipCoverageSchema),
    ownerMatrix: TypeExports.Optional(CapabilityDomainMapOwnerMatrixSchema),
    baoRuntime: TypeExports.Optional(CapabilityDomainMapBaoRuntimeSchema),
    hostEnvironment: TypeExports.Optional(CapabilityDomainMapHostEnvironmentSchema),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    timestamp: TypeExports.String({ description: "ISO 8601 snapshot timestamp" }),
    correlationId: TypeExports.Optional(
      TypeExports.String({ description: "Request correlation ID" }),
    ),
    metadata: TypeExports.Optional(CapabilityDomainMapMetadataSchema),
  },
  { description: "Cross-domain capability owner map" },
);

/** TypeScript type for {@link CapabilityDomainMapResponseSchema}. */
export type CapabilityDomainMapResponse = Static<typeof CapabilityDomainMapResponseSchema>;
