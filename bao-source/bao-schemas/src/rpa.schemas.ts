/**
 * RPA schema definitions.
 *
 * Provides contract-first schemas for RPA trigger types shared across
 * MCP, API validation, and policy adapters.
 *
 * @shared/schemas/rpa.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import {
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
} from "./capability-ownership.schemas.ts";
import { JsonObjectSchema } from "./json.schemas.ts";
import { McpResourceDefinitionSchema } from "./mcp.schemas.ts";
import { TrainingJobDtoSchema } from "./training.schemas.ts";
import { TrainingIntegrationSummarySchema } from "./training-integration.schemas.ts";

const RpaTrainingEndpointsSchema = TypeExports.Object(
  {
    preview: TypeExports.String(),
    start: TypeExports.String(),
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
export const RpaTriggerTypeSchema: TUnion<
  [
    TLiteral<"MANUAL" | "SCHEDULE" | "API" | "WEBHOOK" | "BAODOWN">,
    ...TLiteral<"MANUAL" | "SCHEDULE" | "API" | "WEBHOOK" | "BAODOWN">[],
  ]
> = stringEnum(RPA_TRIGGER_TYPES, {});

/**
 * TypeScript type for RPA trigger types.
 */
export type RpaTriggerType = Static<typeof RpaTriggerTypeSchema>;

/**
 * RPA integration endpoint schema.
 */
export const RpaIntegrationEndpointsSchema = TypeExports.Object(
  {
    base: TypeExports.String(),
    health: TypeExports.String(),
    workflows: TypeExports.Object({
      list: TypeExports.String(),
      create: TypeExports.String(),
      byId: TypeExports.String(),
      update: TypeExports.String(),
      delete: TypeExports.String(),
      execute: TypeExports.String(),
      webhook: TypeExports.String(),
      schedules: TypeExports.String(),
    }),
    executions: TypeExports.Object({
      list: TypeExports.String(),
      byId: TypeExports.String(),
      cancel: TypeExports.String(),
      stream: TypeExports.String(),
    }),
    libraries: TypeExports.Object({
      list: TypeExports.String(),
      byName: TypeExports.String(),
    }),
    schedules: TypeExports.Object({
      list: TypeExports.String(),
      byId: TypeExports.String(),
    }),
    training: RpaTrainingEndpointsSchema,
    ownership: TypeExports.Object({
      focus: TypeExports.String(),
      refresh: TypeExports.String(),
    }),
    mcp: TypeExports.Object({
      tools: TypeExports.String(),
      toolCall: TypeExports.String(),
      resources: TypeExports.String(),
      resourceRead: TypeExports.String(),
      context: TypeExports.String(),
    }),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff defaults schema.
 */
export const RpaTrainingDefaultsSchema: TObject<
  {
    readonly jobType: TUnion<(TString | TNull)[]>;
    readonly priority: TUnion<(TString | TNull)[]>;
    readonly targetProvider: TUnion<(TString | TNull)[]>;
    readonly targetRuntime: TUnion<(TString | TNull)[]>;
  },
  "jobType" | "priority" | "targetProvider" | "targetRuntime",
  never
> = TypeExports.Object(
  {
    jobType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    priority: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    targetProvider: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    targetRuntime: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * RPA training integration stats schema.
 */
export const RpaTrainingIntegrationStatsSchema: TObject<
  {
    readonly total: TInteger;
    readonly autoStarted: TInteger;
    readonly manualStarted: TInteger;
    readonly lastHandoffAt: TUnion<(TString | TNull)[]>;
  },
  "lastHandoffAt" | "total" | "autoStarted" | "manualStarted",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    autoStarted: TypeExports.Integer({ minimum: 0 }),
    manualStarted: TypeExports.Integer({ minimum: 0 }),
    lastHandoffAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
  },
  { additionalProperties: false },
);

/**
 * RPA training integration schema.
 */
export const RpaTrainingIntegrationSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    autoStart: TypeExports.Boolean(),
    allowedStatuses: TypeExports.Array(TypeExports.String()),
    requiredTags: TypeExports.Array(TypeExports.String()),
    defaults: RpaTrainingDefaultsSchema,
    endpoints: RpaTrainingEndpointsSchema,
    stats: TypeExports.Optional(RpaTrainingIntegrationStatsSchema),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff request schema.
 */
export const RpaTrainingHandoffRequestSchema = TypeExports.Object(
  {
    datasetId: TypeExports.Optional(TypeExports.String()),
    modelId: TypeExports.Optional(TypeExports.String()),
    modelName: TypeExports.Optional(TypeExports.String()),
    modelVersion: TypeExports.Optional(TypeExports.String()),
    jobType: TypeExports.Optional(TypeExports.String()),
    priority: TypeExports.Optional(TypeExports.String()),
    targetProvider: TypeExports.Optional(TypeExports.String()),
    targetRuntime: TypeExports.Optional(TypeExports.String()),
    config: TypeExports.Optional(JsonObjectSchema),
    metadata: TypeExports.Optional(JsonObjectSchema),
    idempotencyKey: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff resolved payload schema.
 */
export const RpaTrainingHandoffResolvedSchema = TypeExports.Object(
  {
    datasetId: TypeExports.String(),
    modelId: TypeExports.String(),
    modelName: TypeExports.String(),
    modelVersion: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    jobType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    priority: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    targetProvider: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    targetRuntime: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    config: TypeExports.Optional(JsonObjectSchema),
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Training readiness cooldown posture schema.
 */
export const TrainingReadinessCooldownPostureSchema: TObject<
  { readonly retryable: TBoolean },
  "retryable",
  never
> = TypeExports.Object(
  {
    retryable: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Training readiness snapshot schema for handoff context.
 */
export const TrainingReadinessSnapshotSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    blockedReason: TypeExports.Optional(
      TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    ),
    ownershipLimits: TypeExports.Optional(
      TypeExports.Union([TypeExports.Array(TypeExports.String()), TypeExports.Null()]),
    ),
    autonomyLimits: TypeExports.Optional(
      TypeExports.Union([TypeExports.Array(TypeExports.String()), TypeExports.Null()]),
    ),
    cooldownRetryPosture: TypeExports.Optional(
      TypeExports.Union([TrainingReadinessCooldownPostureSchema, TypeExports.Null()]),
    ),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff preview schema.
 */
export const RpaTrainingHandoffPreviewSchema = TypeExports.Object(
  {
    eligible: TypeExports.Boolean(),
    reason: TypeExports.Optional(TypeExports.String()),
    resolved: TypeExports.Optional(RpaTrainingHandoffResolvedSchema),
    defaults: RpaTrainingDefaultsSchema,
    allowedStatuses: TypeExports.Array(TypeExports.String()),
    requiredTags: TypeExports.Array(TypeExports.String()),
    readiness: TypeExports.Optional(TrainingReadinessSnapshotSchema),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff status schema.
 */
export const RpaTrainingHandoffStatusSchema: TUnion<
  (TLiteral<"started"> | TLiteral<"existing"> | TLiteral<"skipped">)[]
> = TypeExports.Union(
  [TypeExports.Literal("started"), TypeExports.Literal("existing"), TypeExports.Literal("skipped")],
  {},
);

/**
 * RPA training handoff response schema.
 */
export const RpaTrainingHandoffResponseSchema = TypeExports.Object(
  {
    status: RpaTrainingHandoffStatusSchema,
    eligible: TypeExports.Boolean(),
    reason: TypeExports.Optional(TypeExports.String()),
    trainingJobId: TypeExports.Optional(TypeExports.String()),
    trainingJob: TypeExports.Optional(TrainingJobDtoSchema),
    preview: TypeExports.Optional(RpaTrainingHandoffPreviewSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    readiness: TypeExports.Optional(TrainingReadinessSnapshotSchema),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff preview response envelope schema.
 */
export const RpaTrainingHandoffPreviewResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: RpaTrainingHandoffPreviewSchema,
    message: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * RPA training handoff response envelope schema.
 */
export const RpaTrainingHandoffResponseEnvelopeSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: RpaTrainingHandoffResponseSchema,
    message: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * RPA integration summary schema.
 */
export const RpaIntegrationSummarySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    endpoints: RpaIntegrationEndpointsSchema,
    tools: TypeExports.Array(TypeExports.String()),
    resources: TypeExports.Array(McpResourceDefinitionSchema),
    summary: TypeExports.Union([JsonObjectSchema, TypeExports.Null()]),
    training: TypeExports.Optional(RpaTrainingIntegrationSchema),
    ownership: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/**
 * RPA training cohesion status schema.
 */
export const RpaTrainingCohesionStatusSchema: TUnion<
  (TLiteral<"ready"> | TLiteral<"degraded"> | TLiteral<"blocked"> | TLiteral<"disabled">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("ready"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("blocked"),
    TypeExports.Literal("disabled"),
  ],
  {},
);

/**
 * RPA training cohesion summary schema.
 */
export const RpaTrainingCohesionSummarySchema: TObject<
  {
    readonly status: typeof RpaTrainingCohesionStatusSchema;
    readonly enabled: TBoolean;
    readonly timestamp: TString;
    readonly reasons: TArray<TString>;
    readonly rpaTraining: TOptional<typeof RpaTrainingIntegrationSchema>;
    readonly training: TOptional<typeof TrainingIntegrationSummarySchema>;
  },
  "status" | "enabled" | "timestamp" | "reasons",
  "rpaTraining" | "training"
> = TypeExports.Object(
  {
    status: RpaTrainingCohesionStatusSchema,
    enabled: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    reasons: TypeExports.Array(TypeExports.String()),
    rpaTraining: TypeExports.Optional(RpaTrainingIntegrationSchema),
    training: TypeExports.Optional(TrainingIntegrationSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for RPA integration summary.
 */
export type RpaIntegrationSummary = Static<typeof RpaIntegrationSummarySchema>;

/**
 * RPA bunbuddy health response schema.
 */
export const RpaBunBuddyHealthSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    status: TypeExports.String(),
    service: TypeExports.Optional(TypeExports.String()),
    version: TypeExports.Optional(TypeExports.String()),
    pythonVersion: TypeExports.Optional(TypeExports.String()),
    robotFrameworkVersion: TypeExports.Optional(TypeExports.String()),
    installedLibraries: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    activeExecutions: TypeExports.Optional(TypeExports.Integer()),
    maxConcurrent: TypeExports.Optional(TypeExports.Integer()),
    uptimeSeconds: TypeExports.Optional(TypeExports.Number()),
    baseUrl: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for RPA bunbuddy health responses.
 */
export type RpaBunBuddyHealth = Static<typeof RpaBunBuddyHealthSchema>;
