/**
 * System health and infrastructure status schemas.
 *
 * Defines shared TypeBox schemas for system health aggregation and infra status
 * so server routes and contract tests stay aligned.
 *
 * @shared/schemas/system-health.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BunBuddyHealthStatusSchema, BunBuddyHealthSummarySchema } from "./bunbuddy.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Health status for aggregated system checks.
 */
export const HealthStatusSchema: Type.TUnion<
  (Type.TLiteral<"healthy"> | Type.TLiteral<"degraded"> | Type.TLiteral<"unhealthy">)[]
> = Type.Union([Type.Literal("healthy"), Type.Literal("degraded"), Type.Literal("unhealthy")]);

/**
 * Core service health payload.
 */
export const CoreServiceHealthSchema: Type.TObject<
  { readonly healthy: Type.TBoolean; readonly error: Type.TUnion<(Type.TString | Type.TNull)[]> },
  "error" | "healthy",
  never
> = Type.Object({
  healthy: Type.Boolean(),
  error: Type.Union([Type.String(), Type.Null()]),
});

/**
 * Queue service status payload.
 */
export const QueueServiceStatusSchema: Type.TObject<
  { readonly active: Type.TBoolean },
  "active",
  never
> = Type.Object({
  active: Type.Boolean(),
});

/**
 * Capability registry health summary schema.
 */
export const CapabilityRegistryHealthSchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly plugins: Type.TInteger;
    readonly bunbuddies: Type.TInteger;
    readonly healthy: Type.TInteger;
    readonly degraded: Type.TInteger;
    readonly unavailable: Type.TInteger;
  },
  "total" | "plugins" | "bunbuddies" | "healthy" | "degraded" | "unavailable",
  never
> = Type.Object({
  total: Type.Integer({ minimum: 0 }),
  plugins: Type.Integer({ minimum: 0 }),
  bunbuddies: Type.Integer({ minimum: 0 }),
  healthy: Type.Integer({ minimum: 0 }),
  degraded: Type.Integer({ minimum: 0 }),
  unavailable: Type.Integer({ minimum: 0 }),
});

/**
 * Contract catalog health schema.
 */
export const ContractHealthSchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly active: Type.TInteger;
    readonly stale: Type.TInteger;
    readonly lastIndexedAt: Type.TString;
  },
  "total" | "active" | "stale" | "lastIndexedAt",
  never
> = Type.Object({
  total: Type.Integer({ minimum: 0 }),
  active: Type.Integer({ minimum: 0 }),
  stale: Type.Integer({ minimum: 0 }),
  lastIndexedAt: Type.String(),
});

/**
 * Pipeline registry health schema.
 */
export const PipelineRegistryHealthSchema: Type.TObject<
  {
    readonly definitionCount: Type.TInteger;
    readonly runCount: Type.TInteger;
    readonly activeRunCount: Type.TInteger;
    readonly completedRunCount: Type.TInteger;
    readonly runsByStatus: Type.TObject<
      {
        readonly pending: Type.TInteger;
        readonly running: Type.TInteger;
        readonly completed: Type.TInteger;
        readonly failed: Type.TInteger;
        readonly cancelled: Type.TInteger;
        readonly timeout: Type.TInteger;
      },
      "pending" | "running" | "completed" | "failed" | "cancelled" | "timeout",
      never
    >;
    readonly pipelineIds: Type.TArray<Type.TString>;
    readonly status: Type.TUnion<
      (Type.TLiteral<"healthy"> | Type.TLiteral<"degraded"> | Type.TLiteral<"unavailable">)[]
    >;
  },
  | "runsByStatus"
  | "pipelineIds"
  | "status"
  | "definitionCount"
  | "runCount"
  | "activeRunCount"
  | "completedRunCount",
  never
> = Type.Object({
  definitionCount: Type.Integer({ minimum: 0 }),
  runCount: Type.Integer({ minimum: 0 }),
  activeRunCount: Type.Integer({ minimum: 0 }),
  completedRunCount: Type.Integer({ minimum: 0 }),
  runsByStatus: Type.Object({
    pending: Type.Integer({ minimum: 0 }),
    running: Type.Integer({ minimum: 0 }),
    completed: Type.Integer({ minimum: 0 }),
    failed: Type.Integer({ minimum: 0 }),
    cancelled: Type.Integer({ minimum: 0 }),
    timeout: Type.Integer({ minimum: 0 }),
  }),
  pipelineIds: Type.Array(Type.String()),
  status: Type.Union([
    Type.Literal("healthy"),
    Type.Literal("degraded"),
    Type.Literal("unavailable"),
  ]),
});

/**
 * Infrastructure service status schema.
 */
export const InfraServiceStatusSchema = Type.Object({
  key: Type.String({ minLength: 1 }),
  label: Type.String({ minLength: 1 }),
  url: Type.Union([Type.String(), Type.Null()]),
  publicUrl: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  status: Type.Union([
    Type.Literal("online"),
    Type.Literal("auth_required"),
    Type.Literal("unreachable"),
    Type.Literal("not_configured"),
  ]),
  statusCode: Type.Optional(Type.Integer({ minimum: 100, maximum: 599 })),
  latencyMs: Type.Optional(Type.Number({ minimum: 0 })),
  checkedAt: Type.String(),
});

/**
 * Infrastructure services status payload.
 */
export const InfraServicesStatusSchema = Type.Object({
  services: Type.Array(InfraServiceStatusSchema),
  checkedAt: Type.String(),
});

/**
 * Infrastructure services API response schema.
 */
export const InfraServicesStatusResponseSchema = Type.Object({
  ok: Type.Literal(true),
  services: Type.Array(InfraServiceStatusSchema),
  checkedAt: Type.String(),
});

/**
 * Health aggregate endpoint response schema.
 */
export const HealthAggregateResponseSchema = Type.Object({
  ok: Type.Literal(true),
  status: HealthStatusSchema,
  timestamp: Type.String(),
  core: Type.Object({
    database: CoreServiceHealthSchema,
    redis: CoreServiceHealthSchema,
    queue: QueueServiceStatusSchema,
  }),
  bunbuddies: Type.Object({
    summary: BunBuddyHealthSummarySchema,
    detail: Type.Array(BunBuddyHealthStatusSchema),
  }),
  capabilities: Type.Union([CapabilityRegistryHealthSchema, Type.Null()]),
  pipelines: Type.Union([PipelineRegistryHealthSchema, Type.Null()]),
  contracts: ContractHealthSchema,
  aiProviders: JsonValueSchema,
  infrastructure: Type.Union([InfraServicesStatusSchema, Type.Null()]),
});

/**
 * TypeScript type for infrastructure service status entries.
 */
export type InfraServiceStatus = Static<typeof InfraServiceStatusSchema>;

/**
 * TypeScript type for infrastructure services status payloads.
 */
export type InfraServicesStatus = Static<typeof InfraServicesStatusSchema>;

/**
 * TypeScript type for the infrastructure services status API response.
 */
export type InfraServicesStatusResponse = Static<typeof InfraServicesStatusResponseSchema>;

/**
 * TypeScript type for the system health aggregate API response.
 */
export type HealthAggregateResponse = Static<typeof HealthAggregateResponseSchema>;
