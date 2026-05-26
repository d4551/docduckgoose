/**
 * Capability Registry schemas for unified capability tracking.
 *
 * Defines TypeBox schemas for the capability registry system which provides
 * a single source of truth for all capabilities (plugins and bunbuddies) with
 * ownership, versioning, contracts, and health status.
 *
 * @shared/schemas/capability-registry.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const CapabilityKindSchema: Type.TUnion<
  (Type.TLiteral<"plugin"> | Type.TLiteral<"bunbuddy"> | Type.TLiteral<"bao">)[]
> = Type.Union([Type.Literal("plugin"), Type.Literal("bunbuddy"), Type.Literal("bao")], {
  description: "Type of capability (plugin, bunbuddy, or bao)",
});

// Capability Status

/**
 * Possible capability statuses.
 */
export const CAPABILITY_STATUSES: readonly ["registered", "healthy", "degraded", "unavailable"] = [
  "registered",
  "healthy",
  "degraded",
  "unavailable",
] as const;

/**
 * Type-safe capability status enumeration.
 */
export type CapabilityStatus = (typeof CAPABILITY_STATUSES)[number];

/**
 * Capability status schema.
 */
export const CapabilityStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"registered">
    | Type.TLiteral<"healthy">
    | Type.TLiteral<"degraded">
    | Type.TLiteral<"unavailable">
  )[]
> = Type.Union(
  [
    Type.Literal("registered"),
    Type.Literal("healthy"),
    Type.Literal("degraded"),
    Type.Literal("unavailable"),
  ],
  { description: "Current health status of the capability" },
);

// Capability Dependency

/**
 * Schema for a capability dependency.
 */
export const CapabilityDependencySchema: Type.TObject<
  {
    readonly capabilityId: Type.TString;
    readonly required: Type.TBoolean;
    readonly minVersion: Type.TOptional<Type.TString>;
  },
  "capabilityId" | "required",
  "minVersion"
> = Type.Object(
  {
    capabilityId: Type.String({
      minLength: 1,
      description: "ID of the capability this depends on",
    }),
    required: Type.Boolean({
      description: "Whether this dependency is required for the capability to function",
    }),
    minVersion: Type.Optional(
      Type.String({
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
export const CapabilityErrorSchema: Type.TObject<
  {
    readonly code: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<Type.TInteger>;
    readonly description: Type.TOptional<Type.TString>;
    readonly schema: Type.TOptional<Type.TUnknown>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly code: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<Type.TInteger>;
    readonly description: Type.TOptional<Type.TString>;
    readonly schema: Type.TOptional<Type.TUnknown>;
  }>
> = Type.Object(
  {
    code: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Machine-readable error code identifier",
      }),
    ),
    status: Type.Optional(
      Type.Integer({
        minimum: 100,
        maximum: 599,
        description: "HTTP status code associated with the error",
      }),
    ),
    description: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Human-readable error description",
      }),
    ),
    schema: Type.Optional(
      Type.Unknown({
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
export const CapabilityAuthSchema: Type.TObject<
  {
    readonly required: Type.TBoolean;
    readonly schemes: Type.TOptional<Type.TArray<Type.TString>>;
    readonly scopes: Type.TOptional<Type.TRecord<Type.TString, Type.TArray<Type.TString>>>;
    readonly audiences: Type.TOptional<Type.TArray<Type.TString>>;
  },
  "required",
  Type.InferOptionalKeys<{
    readonly required: Type.TBoolean;
    readonly schemes: Type.TOptional<Type.TArray<Type.TString>>;
    readonly scopes: Type.TOptional<Type.TRecord<Type.TString, Type.TArray<Type.TString>>>;
    readonly audiences: Type.TOptional<Type.TArray<Type.TString>>;
  }>
> = Type.Object(
  {
    required: Type.Boolean({
      description: "Whether authentication is required to access this capability",
    }),
    schemes: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Supported authentication schemes (cookie, bearer, mTLS, etc.)",
      }),
    ),
    scopes: Type.Optional(
      Type.Record(Type.String(), Type.Array(Type.String()), {
        description: "Map of auth scopes keyed by scheme or audience",
      }),
    ),
    audiences: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
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
export const CapabilityLimitsSchema: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly maxPayloadBytes: Type.TOptional<Type.TInteger>;
    readonly maxConcurrency: Type.TOptional<Type.TInteger>;
    readonly requestsPerMinute: Type.TOptional<Type.TInteger>;
    readonly burst: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly maxPayloadBytes: Type.TOptional<Type.TInteger>;
    readonly maxConcurrency: Type.TOptional<Type.TInteger>;
    readonly requestsPerMinute: Type.TOptional<Type.TInteger>;
    readonly burst: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    timeoutMs: Type.Optional(
      Type.Integer({
        minimum: 0,
        description: "Request timeout in milliseconds",
      }),
    ),
    maxPayloadBytes: Type.Optional(
      Type.Integer({
        minimum: 0,
        description: "Maximum payload size in bytes",
      }),
    ),
    maxConcurrency: Type.Optional(
      Type.Integer({
        minimum: 1,
        description: "Maximum concurrent requests",
      }),
    ),
    requestsPerMinute: Type.Optional(
      Type.Integer({
        minimum: 1,
        description: "Sustained requests per minute limit",
      }),
    ),
    burst: Type.Optional(
      Type.Integer({
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
export const CapabilityObservabilitySchema: Type.TObject<
  {
    readonly traces: Type.TBoolean;
    readonly metrics: Type.TBoolean;
    readonly logs: Type.TBoolean;
    readonly correlation: Type.TOptional<Type.TBoolean>;
    readonly attributes: Type.TOptional<Type.TRecord<Type.TString, Type.TString>>;
  },
  "traces" | "metrics" | "logs",
  Type.InferOptionalKeys<{
    readonly traces: Type.TBoolean;
    readonly metrics: Type.TBoolean;
    readonly logs: Type.TBoolean;
    readonly correlation: Type.TOptional<Type.TBoolean>;
    readonly attributes: Type.TOptional<Type.TRecord<Type.TString, Type.TString>>;
  }>
> = Type.Object(
  {
    traces: Type.Boolean({
      description: "Whether distributed tracing is enabled",
    }),
    metrics: Type.Boolean({
      description: "Whether metrics are emitted",
    }),
    logs: Type.Boolean({
      description: "Whether structured logs are emitted",
    }),
    correlation: Type.Optional(
      Type.Boolean({
        description: "Whether correlation headers are required",
      }),
    ),
    attributes: Type.Optional(
      Type.Record(Type.String(), Type.String(), {
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
export const CapabilityContractsSchema = Type.Object(
  {
    inputSchemas: Type.Optional(
      Type.Record(Type.String(), Type.Unknown(), {
        description: "Named input schemas (TypeBox schema objects)",
      }),
    ),
    outputSchemas: Type.Optional(
      Type.Record(Type.String(), Type.Unknown(), {
        description: "Named output schemas (TypeBox schema objects)",
      }),
    ),
    endpoints: Type.Array(Type.String({ minLength: 1 }), {
      description: "List of exposed endpoint paths",
    }),
    events: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "List of events this capability emits",
      }),
    ),
    errors: Type.Optional(
      Type.Array(CapabilityErrorSchema, {
        description: "Error envelopes and codes emitted by this capability",
      }),
    ),
    auth: Type.Optional(CapabilityAuthSchema),
    limits: Type.Optional(CapabilityLimitsSchema),
    observability: Type.Optional(CapabilityObservabilitySchema),
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
export const CapabilityHealthcheckSchema: Type.TObject<
  {
    readonly endpoint: Type.TOptional<Type.TString>;
    readonly interval: Type.TOptional<Type.TInteger>;
    readonly timeout: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly endpoint: Type.TOptional<Type.TString>;
    readonly interval: Type.TOptional<Type.TInteger>;
    readonly timeout: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    endpoint: Type.Optional(
      Type.String({
        minLength: 1,
        description: 'Health endpoint path (e.g., "/health")',
      }),
    ),
    interval: Type.Optional(
      Type.Integer({
        minimum: 1000,
        description: "Health check interval in milliseconds",
      }),
    ),
    timeout: Type.Optional(
      Type.Integer({
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

// Capability Entry

/**
 * Schema for a registered capability entry.
 *
 * @remarks
 * This is the core data structure for the capability registry.
 * Each capability has a unique ID, ownership info, version, contracts,
 * dependencies, and runtime health status.
 */
export const CapabilityEntrySchema = Type.Object(
  {
    id: Type.String({
      minLength: 1,
      description: 'Unique capability identifier (e.g., "bunbuddy:usb", "plugin:auth")',
    }),
    name: Type.String({
      minLength: 1,
      description: "Human-readable capability name",
    }),
    kind: CapabilityKindSchema,
    owner: Type.String({
      minLength: 1,
      description: 'Owning team or module (e.g., "hardware", "core")',
    }),
    responsibility: Type.String({
      minLength: 1,
      description: "Primary responsibility (should be unique across capabilities)",
    }),
    version: Type.String({
      minLength: 1,
      description: 'Semantic version (e.g., "1.0.0")',
    }),
    contracts: CapabilityContractsSchema,
    dependencies: Type.Array(CapabilityDependencySchema, {
      description: "List of capability dependencies",
    }),
    healthcheck: Type.Optional(CapabilityHealthcheckSchema),
    status: CapabilityStatusSchema,
    bunbuddyKind: Type.Optional(BunBuddyKindSchema),
    baseUrl: Type.Optional(
      Type.String({
        description: "Base URL for bunbuddy capabilities",
      }),
    ),
    registeredAt: Type.String({
      format: "date-time",
      description: "ISO timestamp when capability was registered",
    }),
    lastHealthCheck: Type.Optional(
      Type.String({
        format: "date-time",
        description: "ISO timestamp of last health check",
      }),
    ),
    metadata: Type.Optional(
      Type.Record(Type.String(), Type.Unknown(), {
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
export const CapabilityRegistrationRequestSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    kind: CapabilityKindSchema,
    owner: Type.String({ minLength: 1 }),
    responsibility: Type.String({ minLength: 1 }),
    version: Type.String({ minLength: 1 }),
    contracts: CapabilityContractsSchema,
    dependencies: Type.Optional(Type.Array(CapabilityDependencySchema)),
    healthcheck: Type.Optional(CapabilityHealthcheckSchema),
    bunbuddyKind: Type.Optional(BunBuddyKindSchema),
    baseUrl: Type.Optional(Type.String()),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
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
export const CapabilityListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    capabilities: Type.Array(CapabilityEntrySchema),
    total: Type.Integer({ minimum: 0 }),
    byKind: Type.Object({
      plugin: Type.Integer({ minimum: 0 }),
      bunbuddy: Type.Integer({ minimum: 0 }),
      bao: Type.Integer({ minimum: 0 }),
    }),
    byStatus: Type.Object({
      registered: Type.Integer({ minimum: 0 }),
      healthy: Type.Integer({ minimum: 0 }),
      degraded: Type.Integer({ minimum: 0 }),
      unavailable: Type.Integer({ minimum: 0 }),
    }),
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityRegistryStatsSchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly plugins: Type.TInteger;
    readonly bunbuddies: Type.TInteger;
    readonly baos: Type.TInteger;
    readonly healthy: Type.TInteger;
    readonly degraded: Type.TInteger;
    readonly unavailable: Type.TInteger;
    readonly version: Type.TInteger;
    readonly lastDiscoveryAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
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
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    plugins: Type.Integer({ minimum: 0 }),
    bunbuddies: Type.Integer({ minimum: 0 }),
    baos: Type.Integer({ minimum: 0 }),
    healthy: Type.Integer({ minimum: 0 }),
    degraded: Type.Integer({ minimum: 0 }),
    unavailable: Type.Integer({ minimum: 0 }),
    version: Type.Integer({ minimum: 0 }),
    lastDiscoveryAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
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
export const CapabilityRegistryStatsResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly stats: Type.TObject<
      {
        readonly total: Type.TInteger;
        readonly plugins: Type.TInteger;
        readonly bunbuddies: Type.TInteger;
        readonly baos: Type.TInteger;
        readonly healthy: Type.TInteger;
        readonly degraded: Type.TInteger;
        readonly unavailable: Type.TInteger;
        readonly version: Type.TInteger;
        readonly lastDiscoveryAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
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
    readonly timestamp: Type.TString;
  },
  "ok" | "stats" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    stats: CapabilityRegistryStatsSchema,
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityDetailResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    capability: CapabilityEntrySchema,
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityHealthResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    status: Type.Union([
      Type.Literal("healthy"),
      Type.Literal("degraded"),
      Type.Literal("unhealthy"),
    ]),
    summary: Type.Object({
      total: Type.Integer({ minimum: 0 }),
      healthy: Type.Integer({ minimum: 0 }),
      degraded: Type.Integer({ minimum: 0 }),
      unavailable: Type.Integer({ minimum: 0 }),
    }),
    capabilities: Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.String(),
        kind: CapabilityKindSchema,
        status: CapabilityStatusSchema,
        lastHealthCheck: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
      }),
    ),
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityDiscoveryRequestSchema = Type.Object(
  {
    bunbuddyKinds: Type.Optional(
      Type.Array(BunBuddyKindSchema, {
        description: "Specific bunbuddy kinds to discover",
      }),
    ),
    timeout: Type.Optional(
      Type.Integer({
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
export const CapabilityDiscoveryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    discovered: Type.Integer({ minimum: 0, description: "Number of capabilities discovered" }),
    updated: Type.Integer({ minimum: 0, description: "Number of capabilities updated" }),
    removed: Type.Integer({ minimum: 0, description: "Number of stale capabilities removed" }),
    errors: Type.Array(
      Type.Object({
        bunbuddy: Type.Optional(BunBuddyKindSchema),
        plugin: Type.Optional(Type.String()),
        error: Type.String(),
      }),
    ),
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityEventTypeSchema: Type.TUnion<
  [
    Type.TLiteral<
      | "capability:registered"
      | "capability:updated"
      | "capability:unregistered"
      | "capability:health_changed"
    >,
    ...Type.TLiteral<
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
export const CapabilityEventSchema = Type.Object(
  {
    type: CapabilityEventTypeSchema,
    capabilityId: Type.String({ minLength: 1 }),
    capability: Type.Optional(CapabilityEntrySchema),
    previousStatus: Type.Optional(CapabilityStatusSchema),
    newStatus: Type.Optional(CapabilityStatusSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
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
export const CapabilityByResponsibilityResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    responsibility: Type.String(),
    capabilities: Type.Array(CapabilityEntrySchema),
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityRegistrationResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    capability: CapabilityEntrySchema,
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityUnregistrationResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly removed: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "timestamp" | "ok" | "removed",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    removed: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
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
export const CapabilityHealthSyncResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly updated: Type.TInteger;
    readonly timestamp: Type.TString;
  },
  "ok" | "updated" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    updated: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability health sync responses.
 */
export type CapabilityHealthSyncResponse = Static<typeof CapabilityHealthSyncResponseSchema>;
