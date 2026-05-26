/**
 * Training job schema definitions.
 *
 * Provides contract-first schemas for training job payloads shared across
 * API responses and UI hydration.
 *
 * @shared/schemas/training
 */

import type {
  InferOptionalKeys,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const TrainingJsonValueSchema = TypeExports.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

const TrainingJsonObjectSchema = TypeExports.Object(
  {},
  {
    additionalProperties: TrainingJsonValueSchema,
    description: "JSON object with string keys",
  },
);

/**
 * Training job status schema.
 */
export const TrainingStatusSchema: TUnion<
  (
    | TLiteral<"pending">
    | TLiteral<"queued">
    | TLiteral<"running">
    | TLiteral<"completed">
    | TLiteral<"failed">
    | TLiteral<"canceled">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("pending"),
    TypeExports.Literal("queued"),
    TypeExports.Literal("running"),
    TypeExports.Literal("completed"),
    TypeExports.Literal("failed"),
    TypeExports.Literal("canceled"),
  ],
  {},
);

/**
 * Training statuses considered "active" for in-flight updates.
 */
export const TrainingActiveStatusSchema: TUnion<
  (TLiteral<"pending"> | TLiteral<"queued"> | TLiteral<"running">)[]
> = TypeExports.Union(
  [TypeExports.Literal("pending"), TypeExports.Literal("queued"), TypeExports.Literal("running")],
  {},
);

/**
 * Training statuses considered "terminal".
 */
export const TrainingTerminalStatusSchema: TUnion<
  (TLiteral<"completed"> | TLiteral<"failed"> | TLiteral<"canceled">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("completed"),
    TypeExports.Literal("failed"),
    TypeExports.Literal("canceled"),
  ],
  {},
);

/**
 * Training job list query schema.
 */
export const TrainingJobsQueryPageSchema: TUnion<(TInteger | TString)[]> = TypeExports.Union(
  [TypeExports.Integer({ minimum: 1 }), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * Training job list page size schema.
 */
export const TrainingJobsQueryPageSizeSchema: TUnion<(TInteger | TString)[]> = TypeExports.Union(
  [TypeExports.Integer({ minimum: 1, maximum: 100 }), TypeExports.String({ minLength: 1 })],
  {},
);

/** TypeBox schema for TrainingJobsQuerySchema. */
export const TrainingJobsQuerySchema: TObject<
  {
    readonly status: TOptional<
      TUnion<
        (
          | TLiteral<"pending">
          | TLiteral<"queued">
          | TLiteral<"running">
          | TLiteral<"completed">
          | TLiteral<"failed">
          | TLiteral<"canceled">
        )[]
      >
    >;
    readonly page: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly pageSize: TOptional<TUnion<(TString | TInteger)[]>>;
  },
  never,
  InferOptionalKeys<{
    readonly status: TOptional<
      TUnion<
        (
          | TLiteral<"pending">
          | TLiteral<"queued">
          | TLiteral<"running">
          | TLiteral<"completed">
          | TLiteral<"failed">
          | TLiteral<"canceled">
        )[]
      >
    >;
    readonly page: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly pageSize: TOptional<TUnion<(TString | TInteger)[]>>;
  }>
> = TypeExports.Object(
  {
    status: TypeExports.Optional(TrainingStatusSchema),
    page: TypeExports.Optional(TrainingJobsQueryPageSchema),
    pageSize: TypeExports.Optional(TrainingJobsQueryPageSizeSchema),
  },
  { additionalProperties: false },
);

/**
 * Training job creation request schema.
 */
export const TrainingJobCreateRequestSchema = TypeExports.Object(
  {
    modelId: TypeExports.String({ minLength: 1 }),
    modelName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    modelVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    datasetId: TypeExports.String({ minLength: 1 }),
    priority: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    config: TrainingJsonObjectSchema,
    metadata: TypeExports.Optional(TrainingJsonObjectSchema),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Training job progress update request schema.
 */
export const TrainingJobProgressUpdateSchema = TypeExports.Object(
  {
    status: TypeExports.Optional(TrainingActiveStatusSchema),
    progress: TypeExports.Optional(TypeExports.Integer({ minimum: 0, maximum: 100 })),
    currentEpoch: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    totalEpochs: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    currentLoss: TypeExports.Optional(TypeExports.Number()),
    currentAccuracy: TypeExports.Optional(TypeExports.Number()),
    metadata: TypeExports.Optional(TrainingJsonObjectSchema),
    logs: TypeExports.Optional(TrainingJsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Training job completion request schema.
 */
export const TrainingJobCompleteRequestSchema = TypeExports.Object(
  {
    status: TrainingTerminalStatusSchema,
    progress: TypeExports.Optional(TypeExports.Integer({ minimum: 0, maximum: 100 })),
    currentEpoch: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    totalEpochs: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    currentLoss: TypeExports.Optional(TypeExports.Number()),
    currentAccuracy: TypeExports.Optional(TypeExports.Number()),
    finalAccuracy: TypeExports.Optional(TypeExports.Number()),
    datasetSize: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    errorMessage: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(TrainingJsonObjectSchema),
    logs: TypeExports.Optional(TrainingJsonObjectSchema),
    artifactId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    deploymentEndpoint: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    modelVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    modelType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    runtime: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    source: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    requirements: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    files: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * Training job DTO schema.
 */
export const TrainingJobDtoSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    userId: TypeExports.String(),
    modelId: TypeExports.String(),
    modelName: TypeExports.String(),
    modelVersion: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    datasetId: TypeExports.String(),
    status: TrainingStatusSchema,
    priority: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    progress: TypeExports.Number(),
    currentEpoch: TypeExports.Number(),
    totalEpochs: TypeExports.Number(),
    currentLoss: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    currentAccuracy: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    finalAccuracy: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    datasetSize: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    config: TrainingJsonValueSchema,
    metadata: TrainingJsonValueSchema,
    logs: TrainingJsonValueSchema,
    errorMessage: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    startTime: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    endTime: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training artifact DTO schema.
 */
export const TrainingArtifactDtoSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    trainingJobId: TypeExports.String(),
    modelId: TypeExports.String(),
    kind: TypeExports.String(),
    format: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    fileName: TypeExports.String(),
    mimeType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storagePath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storageProvider: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storageBucket: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    storageKey: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    fileSize: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    checksum: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    metadata: TrainingJsonValueSchema,
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job timeline event kind schema.
 */
export const TrainingJobEventKindSchema: TUnion<
  (
    | TLiteral<"job_created">
    | TLiteral<"job_status">
    | TLiteral<"stage_status">
    | TLiteral<"job_control">
    | TLiteral<"enqueue_failed">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("job_created"),
    TypeExports.Literal("job_status"),
    TypeExports.Literal("stage_status"),
    TypeExports.Literal("job_control"),
    TypeExports.Literal("enqueue_failed"),
  ],
  {},
);

/**
 * Training job event DTO schema (append-only timeline entry).
 */
export const TrainingJobEventDtoSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    trainingJobId: TypeExports.String(),
    userId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    kind: TrainingJobEventKindSchema,
    stageType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    status: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    message: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    payload: TypeExports.Union([TrainingJsonValueSchema, TypeExports.Null()]),
    correlationId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job events list query schema.
 */
export const TrainingJobEventsQuerySchema: TObject<
  {
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly cursor: TOptional<TUnion<(TString | TNull)[]>>;
  },
  never,
  InferOptionalKeys<{
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly cursor: TOptional<TUnion<(TString | TNull)[]>>;
  }>
> = TypeExports.Object(
  {
    limit: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Integer({ minimum: 1 }),
        TypeExports.String({ minLength: 1 }),
      ]),
    ),
    cursor: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
  },
  { additionalProperties: false },
);

/**
 * Training job events list response schema.
 */
export const TrainingJobEventsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(TrainingJobEventDtoSchema),
    nextCursor: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job stats schema.
 */
export const TrainingJobStatsSchema: TObject<
  {
    readonly total: TInteger;
    readonly pending: TInteger;
    readonly queued: TInteger;
    readonly running: TInteger;
    readonly completed: TInteger;
    readonly failed: TInteger;
    readonly canceled: TInteger;
    readonly active: TInteger;
    readonly timestamp: TString;
  },
  | "timestamp"
  | "total"
  | "pending"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "canceled"
  | "active",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    pending: TypeExports.Integer({ minimum: 0 }),
    queued: TypeExports.Integer({ minimum: 0 }),
    running: TypeExports.Integer({ minimum: 0 }),
    completed: TypeExports.Integer({ minimum: 0 }),
    failed: TypeExports.Integer({ minimum: 0 }),
    canceled: TypeExports.Integer({ minimum: 0 }),
    active: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job list response schema.
 */
export const TrainingJobsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String({ description: "Optional success message" })),
    items: TypeExports.Array(TrainingJobDtoSchema),
    total: TypeExports.Integer({ minimum: 0 }),
    page: TypeExports.Integer({ minimum: 1 }),
    pageSize: TypeExports.Integer({ minimum: 1 }),
    hasMore: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training job detail response schema.
 */
export const TrainingJobResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String({ description: "Optional success message" })),
    data: TrainingJobDtoSchema,
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training artifact list response schema.
 */
export const TrainingArtifactsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String({ description: "Optional success message" })),
    items: TypeExports.Array(TrainingArtifactDtoSchema),
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training artifact detail response schema.
 */
export const TrainingArtifactResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String({ description: "Optional success message" })),
    data: TrainingArtifactDtoSchema,
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training job stats response schema.
 */
export const TrainingJobStatsResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly message: TOptional<TString>;
    readonly data: TObject<
      {
        readonly total: TInteger;
        readonly pending: TInteger;
        readonly queued: TInteger;
        readonly running: TInteger;
        readonly completed: TInteger;
        readonly failed: TInteger;
        readonly canceled: TInteger;
        readonly active: TInteger;
        readonly timestamp: TString;
      },
      | "pending"
      | "queued"
      | "running"
      | "completed"
      | "failed"
      | "canceled"
      | "total"
      | "timestamp"
      | "active",
      never
    >;
    readonly timestamp: TString;
  },
  "ok" | "timestamp" | "data",
  "message"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String({ description: "Optional success message" })),
    data: TrainingJobStatsSchema,
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);
