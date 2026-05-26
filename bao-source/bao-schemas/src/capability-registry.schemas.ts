/**
 * Capability Registry schemas for unified capability tracking.
 *
 * Defines TypeBox schemas for the capability registry system which provides
 * a single source of truth for all capabilities (plugins and bunbuddies) with
 * ownership, versioning, contracts, and health status.
 *
 * @shared/schemas/capability-registry.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";

// Capability Kind

/**
 * Supported capability kinds in the registry.
 */
export const CAPABILITY_KINDS: readonly ["plugin", "bunbuddy", "bao"] = [
  "plugin",
  "bunbuddy",
  "bao",
] as const;

/**
 * Type-safe capability kind enumeration.
 */
export type CapabilityKind = (typeof CAPABILITY_KINDS)[number];

/**
 * Capability kind schema.
 */
export const CapabilityKindSchema: TUnion<
  (TLiteral<"plugin"> | TLiteral<"bunbuddy"> | TLiteral<"bao">)[]
> = TypeExports.Union(
  [TypeExports.Literal("plugin"), TypeExports.Literal("bunbuddy"), TypeExports.Literal("bao")],
  {
    description: "Type of capability (plugin, bunbuddy, or bao)",
  },
);

// Capability Status

/**
 * Possible capability statuses.
 */
export const CAPABILITY_STATUSES: readonly [
  "registered",
  "healthy",
  "degraded",
  "unavailable",
  "unreachable",
  "not-configured",
] = ["registered", "healthy", "degraded", "unavailable", "unreachable", "not-configured"] as const;

/**
 * Type-safe capability status enumeration.
 */
export type CapabilityStatus = (typeof CAPABILITY_STATUSES)[number];

/**
 * Capability status schema.
 */
export const CapabilityStatusSchema: TUnion<
  (
    | TLiteral<"registered">
    | TLiteral<"healthy">
    | TLiteral<"degraded">
    | TLiteral<"unavailable">
    | TLiteral<"unreachable">
    | TLiteral<"not-configured">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("registered"),
    TypeExports.Literal("healthy"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("unavailable"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("not-configured"),
  ],
  { description: "Current health status of the capability" },
);

// Capability Dependency

/**
 * Schema for a capability dependency.
 */
export const CapabilityDependencySchema: TObject<
  {
    readonly capabilityId: TString;
    readonly required: TBoolean;
    readonly minVersion: TOptional<TString>;
  },
  "capabilityId" | "required",
  "minVersion"
> = TypeExports.Object(
  {
    capabilityId: TypeExports.String({
      minLength: 1,
      description: "ID of the capability this depends on",
    }),
    required: TypeExports.Boolean({
      description: "Whether this dependency is required for the capability to function",
    }),
    minVersion: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: 'Minimum semantic version required (e.g., "1.0.0")',
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability dependency.
 */
export type CapabilityDependency = Static<typeof CapabilityDependencySchema>;

// Capability Contracts

/**
 * Schema describing a capability error shape.
 */
export const CapabilityErrorSchema: TObject<
  {
    readonly code: TOptional<TString>;
    readonly status: TOptional<TInteger>;
    readonly description: TOptional<TString>;
    readonly schema: TOptional<TUnknown>;
  },
  never,
  InferOptionalKeys<{
    readonly code: TOptional<TString>;
    readonly status: TOptional<TInteger>;
    readonly description: TOptional<TString>;
    readonly schema: TOptional<TUnknown>;
  }>
> = TypeExports.Object(
  {
    code: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Machine-readable error code identifier",
      }),
    ),
    status: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 100,
        maximum: 599,
        description: "HTTP status code associated with the error",
      }),
    ),
    description: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Human-readable error description",
      }),
    ),
    schema: TypeExports.Optional(
      TypeExports.Unknown({
        description: "Schema payload for the error envelope",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability error definitions.
 */
export type CapabilityError = Static<typeof CapabilityErrorSchema>;

/**
 * Schema describing authentication requirements for a capability.
 */
export const CapabilityAuthSchema: TObject<
  {
    readonly required: TBoolean;
    readonly schemes: TOptional<TArray<TString>>;
    readonly scopes: TOptional<TRecord<TString, TArray<TString>>>;
    readonly audiences: TOptional<TArray<TString>>;
  },
  "required",
  InferOptionalKeys<{
    readonly required: TBoolean;
    readonly schemes: TOptional<TArray<TString>>;
    readonly scopes: TOptional<TRecord<TString, TArray<TString>>>;
    readonly audiences: TOptional<TArray<TString>>;
  }>
> = TypeExports.Object(
  {
    required: TypeExports.Boolean({
      description: "Whether authentication is required to access this capability",
    }),
    schemes: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Supported authentication schemes (cookie, bearer, mTLS, etc.)",
      }),
    ),
    scopes: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Array(TypeExports.String()), {
        description: "Map of auth scopes keyed by scheme or audience",
      }),
    ),
    audiences: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Allowed audiences for auth validation",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability auth definitions.
 */
export type CapabilityAuth = Static<typeof CapabilityAuthSchema>;

/**
 * Schema describing operational limits for a capability.
 */
export const CapabilityLimitsSchema: TObject<
  {
    readonly timeoutMs: TOptional<TInteger>;
    readonly maxPayloadBytes: TOptional<TInteger>;
    readonly maxConcurrency: TOptional<TInteger>;
    readonly requestsPerMinute: TOptional<TInteger>;
    readonly burst: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly timeoutMs: TOptional<TInteger>;
    readonly maxPayloadBytes: TOptional<TInteger>;
    readonly maxConcurrency: TOptional<TInteger>;
    readonly requestsPerMinute: TOptional<TInteger>;
    readonly burst: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    timeoutMs: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        description: "Request timeout in milliseconds",
      }),
    ),
    maxPayloadBytes: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        description: "Maximum payload size in bytes",
      }),
    ),
    maxConcurrency: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1,
        description: "Maximum concurrent requests",
      }),
    ),
    requestsPerMinute: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1,
        description: "Sustained requests per minute limit",
      }),
    ),
    burst: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1,
        description: "Burst capacity for short spikes",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability limits.
 */
export type CapabilityLimits = Static<typeof CapabilityLimitsSchema>;

/**
 * Schema describing observability expectations for a capability.
 */
export const CapabilityObservabilitySchema: TObject<
  {
    readonly traces: TBoolean;
    readonly metrics: TBoolean;
    readonly logs: TBoolean;
    readonly correlation: TOptional<TBoolean>;
    readonly attributes: TOptional<TRecord<TString, TString>>;
  },
  "traces" | "metrics" | "logs",
  InferOptionalKeys<{
    readonly traces: TBoolean;
    readonly metrics: TBoolean;
    readonly logs: TBoolean;
    readonly correlation: TOptional<TBoolean>;
    readonly attributes: TOptional<TRecord<TString, TString>>;
  }>
> = TypeExports.Object(
  {
    traces: TypeExports.Boolean({
      description: "Whether distributed tracing is enabled",
    }),
    metrics: TypeExports.Boolean({
      description: "Whether metrics are emitted",
    }),
    logs: TypeExports.Boolean({
      description: "Whether structured logs are emitted",
    }),
    correlation: TypeExports.Optional(
      TypeExports.Boolean({
        description: "Whether correlation headers are required",
      }),
    ),
    attributes: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.String(), {
        description: "Static observability attributes to emit",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability observability.
 */
export type CapabilityObservability = Static<typeof CapabilityObservabilitySchema>;

/**
 * Schema for capability contract definitions.
 *
 * @remarks
 * Contracts define the input/output schemas, endpoints, and events
 * that a capability exposes. This enables contract testing and
 * compatibility verification.
 */
export const CapabilityContractsSchema = TypeExports.Object(
  {
    inputSchemas: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown(), {
        description: "Named input schemas (TypeBox schema objects)",
      }),
    ),
    outputSchemas: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown(), {
        description: "Named output schemas (TypeBox schema objects)",
      }),
    ),
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "List of exposed endpoint paths",
    }),
    events: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "List of events this capability emits",
      }),
    ),
    errors: TypeExports.Optional(
      TypeExports.Array(CapabilityErrorSchema, {
        description: "Error envelopes and codes emitted by this capability",
      }),
    ),
    auth: TypeExports.Optional(CapabilityAuthSchema),
    limits: TypeExports.Optional(CapabilityLimitsSchema),
    observability: TypeExports.Optional(CapabilityObservabilitySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability contracts.
 */
export type CapabilityContracts = Static<typeof CapabilityContractsSchema>;

// Capability Healthcheck Config

/**
 * Schema for healthcheck configuration.
 */
export const CapabilityHealthcheckSchema: TObject<
  {
    readonly endpoint: TOptional<TString>;
    readonly interval: TOptional<TInteger>;
    readonly timeout: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly endpoint: TOptional<TString>;
    readonly interval: TOptional<TInteger>;
    readonly timeout: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    endpoint: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: 'Health endpoint path (e.g., "/health")',
      }),
    ),
    interval: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1000,
        description: "Health check interval in milliseconds",
      }),
    ),
    timeout: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 100,
        description: "Health check timeout in milliseconds",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for healthcheck configuration.
 */
export type CapabilityHealthcheck = Static<typeof CapabilityHealthcheckSchema>;

export const CapabilityBaoSourceMetadataSchema = TypeExports.Object(
  {
    archiveName: TypeExports.String({ minLength: 1 }),
    archiveVersion: TypeExports.String({ minLength: 1 }),
    manifestDigest: TypeExports.String({ minLength: 1 }),
    targetId: TypeExports.String({ minLength: 1 }),
    targetKind: TypeExports.String({ minLength: 1 }),
    runtimeSessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "Archive-derived source metadata for `.bao` capabilities.",
  },
);

export type CapabilityBaoSourceMetadata = Static<typeof CapabilityBaoSourceMetadataSchema>;

// Capability Entry

/**
 * Schema for a registered capability entry.
 *
 * @remarks
 * This is the core data structure for the capability registry.
 * Each capability has a unique ID, ownership info, version, contracts,
 * dependencies, and runtime health status.
 */
export const CapabilityEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({
      minLength: 1,
      description: 'Unique capability identifier (e.g., "bunbuddy:usb", "plugin:auth")',
    }),
    name: TypeExports.String({
      minLength: 1,
      description: "Human-readable capability name",
    }),
    kind: CapabilityKindSchema,
    owner: TypeExports.String({
      minLength: 1,
      description: 'Owning team or module (e.g., "hardware", "core")',
    }),
    responsibility: TypeExports.String({
      minLength: 1,
      description: "Primary responsibility (should be unique across capabilities)",
    }),
    version: TypeExports.String({
      minLength: 1,
      description: 'Semantic version (e.g., "1.0.0")',
    }),
    contracts: CapabilityContractsSchema,
    dependencies: TypeExports.Array(CapabilityDependencySchema, {
      description: "List of capability dependencies",
    }),
    healthcheck: TypeExports.Optional(CapabilityHealthcheckSchema),
    status: CapabilityStatusSchema,
    bunbuddyKind: TypeExports.Optional(BunBuddyKindSchema),
    baseUrl: TypeExports.Optional(
      TypeExports.String({
        description: "Base URL for bunbuddy capabilities",
      }),
    ),
    registeredAt: TypeExports.String({
      format: "date-time",
      description: "ISO timestamp when capability was registered",
    }),
    lastHealthCheck: TypeExports.Optional(
      TypeExports.String({
        format: "date-time",
        description: "ISO timestamp of last health check",
      }),
    ),
    baoSource: TypeExports.Optional(CapabilityBaoSourceMetadataSchema),
    metadata: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown(), {
        description: "Additional metadata for the capability",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability entry.
 */
export type CapabilityEntry = Static<typeof CapabilityEntrySchema>;

// Capability Registration Request

/**
 * Schema for capability registration request.
 */
export const CapabilityRegistrationRequestSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    kind: CapabilityKindSchema,
    owner: TypeExports.String({ minLength: 1 }),
    responsibility: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String({ minLength: 1 }),
    contracts: CapabilityContractsSchema,
    dependencies: TypeExports.Optional(TypeExports.Array(CapabilityDependencySchema)),
    healthcheck: TypeExports.Optional(CapabilityHealthcheckSchema),
    bunbuddyKind: TypeExports.Optional(BunBuddyKindSchema),
    baseUrl: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability registration request.
 */
export type CapabilityRegistrationRequest = Static<typeof CapabilityRegistrationRequestSchema>;

// Capability List Response

/**
 * Schema for capability list response.
 */
export const CapabilityListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    capabilities: TypeExports.Array(CapabilityEntrySchema),
    total: TypeExports.Integer({ minimum: 0 }),
    byKind: TypeExports.Object({
      plugin: TypeExports.Integer({ minimum: 0 }),
      bunbuddy: TypeExports.Integer({ minimum: 0 }),
      bao: TypeExports.Integer({ minimum: 0 }),
    }),
    byStatus: TypeExports.Object({
      registered: TypeExports.Integer({ minimum: 0 }),
      healthy: TypeExports.Integer({ minimum: 0 }),
      degraded: TypeExports.Integer({ minimum: 0 }),
      unavailable: TypeExports.Integer({ minimum: 0 }),
    }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability list response.
 */
export type CapabilityListResponse = Static<typeof CapabilityListResponseSchema>;

// Capability Registry Stats Response

/**
 * Schema for capability registry stats payload.
 */
export const CapabilityRegistryStatsSchema: TObject<
  {
    readonly total: TInteger;
    readonly plugins: TInteger;
    readonly bunbuddies: TInteger;
    readonly baos: TInteger;
    readonly healthy: TInteger;
    readonly degraded: TInteger;
    readonly unavailable: TInteger;
    readonly version: TInteger;
    readonly lastDiscoveryAt: TUnion<(TString | TNull)[]>;
  },
  | "healthy"
  | "degraded"
  | "unavailable"
  | "version"
  | "total"
  | "lastDiscoveryAt"
  | "plugins"
  | "bunbuddies"
  | "baos",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    plugins: TypeExports.Integer({ minimum: 0 }),
    bunbuddies: TypeExports.Integer({ minimum: 0 }),
    baos: TypeExports.Integer({ minimum: 0 }),
    healthy: TypeExports.Integer({ minimum: 0 }),
    degraded: TypeExports.Integer({ minimum: 0 }),
    unavailable: TypeExports.Integer({ minimum: 0 }),
    version: TypeExports.Integer({ minimum: 0 }),
    lastDiscoveryAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability registry stats payload.
 */
export type CapabilityRegistryStats = Static<typeof CapabilityRegistryStatsSchema>;

/**
 * Schema for capability registry stats response.
 */
export const CapabilityRegistryStatsResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly stats: TObject<
      {
        readonly total: TInteger;
        readonly plugins: TInteger;
        readonly bunbuddies: TInteger;
        readonly baos: TInteger;
        readonly healthy: TInteger;
        readonly degraded: TInteger;
        readonly unavailable: TInteger;
        readonly version: TInteger;
        readonly lastDiscoveryAt: TUnion<(TString | TNull)[]>;
      },
      | "healthy"
      | "degraded"
      | "unavailable"
      | "version"
      | "total"
      | "lastDiscoveryAt"
      | "plugins"
      | "bunbuddies"
      | "baos",
      never
    >;
    readonly timestamp: TString;
  },
  "ok" | "stats" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    stats: CapabilityRegistryStatsSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability registry stats response.
 */
export type CapabilityRegistryStatsResponse = Static<typeof CapabilityRegistryStatsResponseSchema>;

// Capability Detail Response

/**
 * Schema for capability detail responses (single capability).
 */
export const CapabilityDetailResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    capability: CapabilityEntrySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability detail response.
 */
export type CapabilityDetailResponse = Static<typeof CapabilityDetailResponseSchema>;

// Capability Health Response

/**
 * Schema for capability health summary response.
 */
export const CapabilityHealthResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    status: TypeExports.Union([
      TypeExports.Literal("healthy"),
      TypeExports.Literal("degraded"),
      TypeExports.Literal("unhealthy"),
    ]),
    summary: TypeExports.Object({
      total: TypeExports.Integer({ minimum: 0 }),
      healthy: TypeExports.Integer({ minimum: 0 }),
      degraded: TypeExports.Integer({ minimum: 0 }),
      unavailable: TypeExports.Integer({ minimum: 0 }),
    }),
    capabilities: TypeExports.Array(
      TypeExports.Object({
        id: TypeExports.String(),
        name: TypeExports.String(),
        kind: CapabilityKindSchema,
        status: CapabilityStatusSchema,
        lastHealthCheck: TypeExports.Union([
          TypeExports.String({ format: "date-time" }),
          TypeExports.Null(),
        ]),
      }),
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability health response.
 */
export type CapabilityHealthResponse = Static<typeof CapabilityHealthResponseSchema>;

// Capability Discovery Response

/**
 * Schema for capability discovery request (force refresh).
 */
export const CapabilityDiscoveryRequestSchema = TypeExports.Object(
  {
    bunbuddyKinds: TypeExports.Optional(
      TypeExports.Array(BunBuddyKindSchema, {
        description: "Specific bunbuddy kinds to discover",
      }),
    ),
    timeout: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        description: "Discovery timeout override in milliseconds",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability discovery request.
 */
export type CapabilityDiscoveryRequest = Static<typeof CapabilityDiscoveryRequestSchema>;

// Capability Discovery Response

/**
 * Schema for capability discovery response (force refresh).
 */
export const CapabilityDiscoveryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    discovered: TypeExports.Integer({
      minimum: 0,
      description: "Number of capabilities discovered",
    }),
    updated: TypeExports.Integer({ minimum: 0, description: "Number of capabilities updated" }),
    removed: TypeExports.Integer({
      minimum: 0,
      description: "Number of stale capabilities removed",
    }),
    errors: TypeExports.Array(
      TypeExports.Object({
        bunbuddy: TypeExports.Optional(BunBuddyKindSchema),
        plugin: TypeExports.Optional(TypeExports.String()),
        error: TypeExports.String(),
      }),
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability discovery response.
 */
export type CapabilityDiscoveryResponse = Static<typeof CapabilityDiscoveryResponseSchema>;

// Capability Event (for state change notifications)

/**
 * Event types emitted by the capability registry.
 */
export const CAPABILITY_EVENT_TYPES: readonly [
  "capability:registered",
  "capability:updated",
  "capability:unregistered",
  "capability:health_changed",
] = [
  "capability:registered",
  "capability:updated",
  "capability:unregistered",
  "capability:health_changed",
] as const;

/**
 * Type-safe capability event type enumeration.
 */
export type CapabilityEventType = (typeof CAPABILITY_EVENT_TYPES)[number];

/**
 * Capability event type schema.
 */
export const CapabilityEventTypeSchema: TUnion<
  [
    TLiteral<
      | "capability:registered"
      | "capability:updated"
      | "capability:unregistered"
      | "capability:health_changed"
    >,
    ...TLiteral<
      | "capability:registered"
      | "capability:updated"
      | "capability:unregistered"
      | "capability:health_changed"
    >[],
  ]
> = stringEnum(CAPABILITY_EVENT_TYPES, {});

/**
 * Schema for capability state change events.
 */
export const CapabilityEventSchema = TypeExports.Object(
  {
    type: CapabilityEventTypeSchema,
    capabilityId: TypeExports.String({ minLength: 1 }),
    capability: TypeExports.Optional(CapabilityEntrySchema),
    previousStatus: TypeExports.Optional(CapabilityStatusSchema),
    newStatus: TypeExports.Optional(CapabilityStatusSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability events.
 */
export type CapabilityEvent = Static<typeof CapabilityEventSchema>;

// Responsibility Query Response

/**
 * Schema for querying capabilities by responsibility.
 */
export const CapabilityByResponsibilityResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    responsibility: TypeExports.String(),
    capabilities: TypeExports.Array(CapabilityEntrySchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for responsibility query response.
 */
export type CapabilityByResponsibilityResponse = Static<
  typeof CapabilityByResponsibilityResponseSchema
>;

// Capability Registration Responses

/**
 * Schema for capability registration responses.
 */
export const CapabilityRegistrationResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    capability: CapabilityEntrySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability registration responses.
 */
export type CapabilityRegistrationResponse = Static<typeof CapabilityRegistrationResponseSchema>;

/**
 * Schema for capability unregistration responses.
 */
export const CapabilityUnregistrationResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly removed: TBoolean;
    readonly timestamp: TString;
  },
  "timestamp" | "ok" | "removed",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    removed: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability unregistration responses.
 */
export type CapabilityUnregistrationResponse = Static<
  typeof CapabilityUnregistrationResponseSchema
>;

/**
 * Schema for capability health sync responses.
 */
export const CapabilityHealthSyncResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly updated: TInteger;
    readonly timestamp: TString;
  },
  "ok" | "updated" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    updated: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability health sync responses.
 */
export type CapabilityHealthSyncResponse = Static<typeof CapabilityHealthSyncResponseSchema>;
