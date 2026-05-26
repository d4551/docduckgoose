/**
 * RPA schema definitions.
 *
 * Provides contract-first schemas for RPA trigger types shared across
 * MCP, API validation, and policy adapters.
 *
 * @shared/schemas/rpa.ts
 */

import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusMapSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";
import { JsonObjectSchema } from "./json.schemas";
import { McpResourceDefinitionSchema } from "./mcp.schemas";
import { TrainingJobDtoSchema } from "./training.schemas";
import { TrainingIntegrationSummarySchema } from "./training-integration.schemas";

const RpaTrainingEndpointsSchema = Type.Object(
  {
    preview: Type.String(),
    start: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * RPA trigger type values.
 *
 * BAODOWN is BaoDown flow orchestration.
 */
export const RPA_TRIGGER_TYPES: readonly ["MANUAL", "SCHEDULE", "API", "WEBHOOK", "BAODOWN"] = [
  "MANUAL",
  "SCHEDULE",
  "API",
  "WEBHOOK",
  "BAODOWN",
] as const;

/**
 * TypeBox schema for RPA trigger type enum.
 */
export const RpaTriggerTypeSchema: Type.TUnion<
  [
    Type.TLiteral<"MANUAL" | "SCHEDULE" | "API" | "WEBHOOK" | "BAODOWN">,
    ...Type.TLiteral<"MANUAL" | "SCHEDULE" | "API" | "WEBHOOK" | "BAODOWN">[],
  ]
> = stringEnum(RPA_TRIGGER_TYPES, {});

/**
 * TypeScript type for RPA trigger types.
 */
export type RpaTriggerType = Static<typeof RpaTriggerTypeSchema>;

/**
 * RPA integration endpoint schema.
 */
export const RpaIntegrationEndpointsSchema = Type.Object(
  {
    base: Type.String(),
    health: Type.String(),
    workflows: Type.Object({
      list: Type.String(),
      create: Type.String(),
      byId: Type.String(),
      update: Type.String(),
      delete: Type.String(),
      execute: Type.String(),
      webhook: Type.String(),
      schedules: Type.String(),
    }),
    executions: Type.Object({
      list: Type.String(),
      byId: Type.String(),
      cancel: Type.String(),
      stream: Type.String(),
    }),
    libraries: Type.Object({
      list: Type.String(),
      byName: Type.String(),
    }),
    schedules: Type.Object({
      list: Type.String(),
      byId: Type.String(),
    }),
    training: RpaTrainingEndpointsSchema,
    ownership: Type.Object({
      focus: Type.String(),
      refresh: Type.String(),
    }),
    mcp: Type.Object({
      tools: Type.String(),
      toolCall: Type.String(),
      resources: Type.String(),
      resourceRead: Type.String(),
      context: Type.String(),
    }),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff defaults schema.
 */
export const RpaTrainingDefaultsSchema: Type.TObject<
  {
    readonly jobType: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly priority: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly targetProvider: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly targetRuntime: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "jobType" | "priority" | "targetProvider" | "targetRuntime",
  never
> = Type.Object(
  {
    jobType: Type.Union([Type.String(), Type.Null()]),
    priority: Type.Union([Type.String(), Type.Null()]),
    targetProvider: Type.Union([Type.String(), Type.Null()]),
    targetRuntime: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * RPA training integration stats schema.
 */
export const RpaTrainingIntegrationStatsSchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly autoStarted: Type.TInteger;
    readonly manualStarted: Type.TInteger;
    readonly lastHandoffAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "lastHandoffAt" | "total" | "autoStarted" | "manualStarted",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    autoStarted: Type.Integer({ minimum: 0 }),
    manualStarted: Type.Integer({ minimum: 0 }),
    lastHandoffAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * RPA training integration schema.
 */
export const RpaTrainingIntegrationSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    autoStart: Type.Boolean(),
    allowedStatuses: Type.Array(Type.String()),
    requiredTags: Type.Array(Type.String()),
    defaults: RpaTrainingDefaultsSchema,
    endpoints: RpaTrainingEndpointsSchema,
    stats: Type.Optional(RpaTrainingIntegrationStatsSchema),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff request schema.
 */
export const RpaTrainingHandoffRequestSchema = Type.Object(
  {
    datasetId: Type.Optional(Type.String()),
    modelId: Type.Optional(Type.String()),
    modelName: Type.Optional(Type.String()),
    modelVersion: Type.Optional(Type.String()),
    jobType: Type.Optional(Type.String()),
    priority: Type.Optional(Type.String()),
    targetProvider: Type.Optional(Type.String()),
    targetRuntime: Type.Optional(Type.String()),
    config: Type.Optional(JsonObjectSchema),
    metadata: Type.Optional(JsonObjectSchema),
    idempotencyKey: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff resolved payload schema.
 */
export const RpaTrainingHandoffResolvedSchema = Type.Object(
  {
    datasetId: Type.String(),
    modelId: Type.String(),
    modelName: Type.String(),
    modelVersion: Type.Union([Type.String(), Type.Null()]),
    jobType: Type.Union([Type.String(), Type.Null()]),
    priority: Type.Union([Type.String(), Type.Null()]),
    targetProvider: Type.Union([Type.String(), Type.Null()]),
    targetRuntime: Type.Union([Type.String(), Type.Null()]),
    config: Type.Optional(JsonObjectSchema),
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Training readiness cooldown posture schema.
 */
export const TrainingReadinessCooldownPostureSchema: Type.TObject<
  { readonly retryable: Type.TBoolean },
  "retryable",
  never
> = Type.Object(
  {
    retryable: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Training readiness snapshot schema for handoff context.
 */
export const TrainingReadinessSnapshotSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    blockedReason: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    ownershipLimits: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    autonomyLimits: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    cooldownRetryPosture: Type.Optional(
      Type.Union([TrainingReadinessCooldownPostureSchema, Type.Null()]),
    ),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff preview schema.
 */
export const RpaTrainingHandoffPreviewSchema = Type.Object(
  {
    eligible: Type.Boolean(),
    reason: Type.Optional(Type.String()),
    resolved: Type.Optional(RpaTrainingHandoffResolvedSchema),
    defaults: RpaTrainingDefaultsSchema,
    allowedStatuses: Type.Array(Type.String()),
    requiredTags: Type.Array(Type.String()),
    readiness: Type.Optional(TrainingReadinessSnapshotSchema),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff status schema.
 */
export const RpaTrainingHandoffStatusSchema: Type.TUnion<
  (Type.TLiteral<"started"> | Type.TLiteral<"existing"> | Type.TLiteral<"skipped">)[]
> = Type.Union([Type.Literal("started"), Type.Literal("existing"), Type.Literal("skipped")], {});

/**
 * RPA training handoff response schema.
 */
export const RpaTrainingHandoffResponseSchema = Type.Object(
  {
    status: RpaTrainingHandoffStatusSchema,
    eligible: Type.Boolean(),
    reason: Type.Optional(Type.String()),
    trainingJobId: Type.Optional(Type.String()),
    trainingJob: Type.Optional(TrainingJobDtoSchema),
    preview: Type.Optional(RpaTrainingHandoffPreviewSchema),
    timestamp: Type.String({ format: "date-time" }),
    readiness: Type.Optional(TrainingReadinessSnapshotSchema),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff preview response envelope schema.
 */
export const RpaTrainingHandoffPreviewResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: RpaTrainingHandoffPreviewSchema,
    message: Type.Optional(Type.String()),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff response envelope schema.
 */
export const RpaTrainingHandoffResponseEnvelopeSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: RpaTrainingHandoffResponseSchema,
    message: Type.Optional(Type.String()),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * RPA integration summary schema.
 */
export const RpaIntegrationSummarySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    endpoints: RpaIntegrationEndpointsSchema,
    tools: Type.Array(Type.String()),
    resources: Type.Array(McpResourceDefinitionSchema),
    summary: Type.Union([JsonObjectSchema, Type.Null()]),
    training: Type.Optional(RpaTrainingIntegrationSchema),
    ownership: Type.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/**
 * RPA training cohesion status schema.
 */
export const RpaTrainingCohesionStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"ready">
    | Type.TLiteral<"degraded">
    | Type.TLiteral<"blocked">
    | Type.TLiteral<"disabled">
  )[]
> = Type.Union(
  [
    Type.Literal("ready"),
    Type.Literal("degraded"),
    Type.Literal("blocked"),
    Type.Literal("disabled"),
  ],
  {},
);

/**
 * RPA training cohesion summary schema.
 */
export const RpaTrainingCohesionSummarySchema: TSchema = Type.Object(
  {
    status: RpaTrainingCohesionStatusSchema,
    enabled: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    reasons: Type.Array(Type.String()),
    rpaTraining: Type.Optional(RpaTrainingIntegrationSchema),
    training: Type.Optional(TrainingIntegrationSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for RPA integration summary.
 */
export type RpaIntegrationSummary = Static<typeof RpaIntegrationSummarySchema>;
