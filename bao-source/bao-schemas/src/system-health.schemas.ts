/**
 * System health and infrastructure status schemas.
 *
 * Defines shared TypeBox schemas for system health aggregation and infra status
 * so server routes and contract tests stay aligned.
 *
 * @shared/schemas/system-health.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyHealthStatusSchema, BunBuddyHealthSummarySchema } from "./bunbuddy.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Health status for aggregated system checks.
 */
export const HealthStatusSchema: TUnion<
  (TLiteral<"healthy"> | TLiteral<"degraded"> | TLiteral<"unhealthy">)[]
> = TypeExports.Union([
  TypeExports.Literal("healthy"),
  TypeExports.Literal("degraded"),
  TypeExports.Literal("unhealthy"),
]);

/**
 * Core service health payload.
 */
export const CoreServiceHealthSchema: TObject<
  { readonly healthy: TBoolean; readonly error: TUnion<(TString | TNull)[]> },
  "error" | "healthy",
  never
> = TypeExports.Object({
  healthy: TypeExports.Boolean(),
  error: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
});

/**
 * Queue service status payload.
 */
export const QueueServiceStatusSchema: TObject<{ readonly active: TBoolean }, "active", never> =
  TypeExports.Object({
    active: TypeExports.Boolean(),
  });

/**
 * Capability registry health summary schema.
 */
export const CapabilityRegistryHealthSchema: TObject<
  {
    readonly total: TInteger;
    readonly plugins: TInteger;
    readonly bunbuddies: TInteger;
    readonly healthy: TInteger;
    readonly degraded: TInteger;
    readonly unavailable: TInteger;
  },
  "total" | "plugins" | "bunbuddies" | "healthy" | "degraded" | "unavailable",
  never
> = TypeExports.Object({
  total: TypeExports.Integer({ minimum: 0 }),
  plugins: TypeExports.Integer({ minimum: 0 }),
  bunbuddies: TypeExports.Integer({ minimum: 0 }),
  healthy: TypeExports.Integer({ minimum: 0 }),
  degraded: TypeExports.Integer({ minimum: 0 }),
  unavailable: TypeExports.Integer({ minimum: 0 }),
});

/**
 * Contract catalog health schema.
 */
export const ContractHealthSchema: TObject<
  {
    readonly total: TInteger;
    readonly active: TInteger;
    readonly stale: TInteger;
    readonly lastIndexedAt: TString;
  },
  "total" | "active" | "stale" | "lastIndexedAt",
  never
> = TypeExports.Object({
  total: TypeExports.Integer({ minimum: 0 }),
  active: TypeExports.Integer({ minimum: 0 }),
  stale: TypeExports.Integer({ minimum: 0 }),
  lastIndexedAt: TypeExports.String(),
});

/**
 * Pipeline registry health schema.
 */
export const PipelineRegistryHealthSchema: TObject<
  {
    readonly definitionCount: TInteger;
    readonly runCount: TInteger;
    readonly activeRunCount: TInteger;
    readonly completedRunCount: TInteger;
    readonly runsByStatus: TObject<
      {
        readonly pending: TInteger;
        readonly running: TInteger;
        readonly completed: TInteger;
        readonly failed: TInteger;
        readonly cancelled: TInteger;
        readonly timeout: TInteger;
      },
      "pending" | "running" | "completed" | "failed" | "cancelled" | "timeout",
      never
    >;
    readonly pipelineIds: TArray<TString>;
    readonly status: TUnion<
      (TLiteral<"healthy"> | TLiteral<"degraded"> | TLiteral<"unavailable">)[]
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
> = TypeExports.Object({
  definitionCount: TypeExports.Integer({ minimum: 0 }),
  runCount: TypeExports.Integer({ minimum: 0 }),
  activeRunCount: TypeExports.Integer({ minimum: 0 }),
  completedRunCount: TypeExports.Integer({ minimum: 0 }),
  runsByStatus: TypeExports.Object({
    pending: TypeExports.Integer({ minimum: 0 }),
    running: TypeExports.Integer({ minimum: 0 }),
    completed: TypeExports.Integer({ minimum: 0 }),
    failed: TypeExports.Integer({ minimum: 0 }),
    cancelled: TypeExports.Integer({ minimum: 0 }),
    timeout: TypeExports.Integer({ minimum: 0 }),
  }),
  pipelineIds: TypeExports.Array(TypeExports.String()),
  status: TypeExports.Union([
    TypeExports.Literal("healthy"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("unavailable"),
  ]),
});

/**
 * Infrastructure service status schema.
 */
export const InfraServiceStatusSchema = TypeExports.Object({
  key: TypeExports.String({ minLength: 1 }),
  label: TypeExports.String({ minLength: 1 }),
  url: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  publicUrl: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  status: TypeExports.Union([
    TypeExports.Literal("online"),
    TypeExports.Literal("auth_required"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("not_configured"),
  ]),
  statusCode: TypeExports.Optional(TypeExports.Integer({ minimum: 100, maximum: 599 })),
  latencyMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  checkedAt: TypeExports.String(),
});

/**
 * Infrastructure services status payload.
 */
export const InfraServicesStatusSchema = TypeExports.Object({
  services: TypeExports.Array(InfraServiceStatusSchema),
  checkedAt: TypeExports.String(),
});

/**
 * Infrastructure services API response schema.
 */
export const InfraServicesStatusResponseSchema = TypeExports.Object({
  ok: TypeExports.Literal(true),
  services: TypeExports.Array(InfraServiceStatusSchema),
  checkedAt: TypeExports.String(),
});

/**
 * Health aggregate endpoint response schema.
 */
export const HealthAggregateResponseSchema = TypeExports.Object({
  ok: TypeExports.Literal(true),
  status: HealthStatusSchema,
  timestamp: TypeExports.String(),
  core: TypeExports.Object({
    database: CoreServiceHealthSchema,
    redis: CoreServiceHealthSchema,
    queue: QueueServiceStatusSchema,
  }),
  bunbuddies: TypeExports.Object({
    summary: BunBuddyHealthSummarySchema,
    detail: TypeExports.Array(BunBuddyHealthStatusSchema),
  }),
  capabilities: TypeExports.Union([CapabilityRegistryHealthSchema, TypeExports.Null()]),
  pipelines: TypeExports.Union([PipelineRegistryHealthSchema, TypeExports.Null()]),
  contracts: ContractHealthSchema,
  aiProviders: JsonValueSchema,
  infrastructure: TypeExports.Union([InfraServicesStatusSchema, TypeExports.Null()]),
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
