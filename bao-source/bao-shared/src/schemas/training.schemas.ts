/**
 * Training job schema definitions.
 *
 * Provides contract-first schemas for training job payloads shared across
 * API responses and UI hydration.
 *
 * @shared/schemas/training
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";

const TrainingJsonValueSchema = Type.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

const TrainingJsonObjectSchema = Type.Object(
  {},
  {
    additionalProperties: TrainingJsonValueSchema,
    description: "JSON object with string keys",
  },
);

/**
 * Training job status schema.
 */
export const TrainingStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"pending">
    | Type.TLiteral<"queued">
    | Type.TLiteral<"running">
    | Type.TLiteral<"completed">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"canceled">
  )[]
> = Type.Union(
  [
    Type.Literal("pending"),
    Type.Literal("queued"),
    Type.Literal("running"),
    Type.Literal("completed"),
    Type.Literal("failed"),
    Type.Literal("canceled"),
  ],
  {},
);

/**
 * Training statuses considered "active" for in-flight updates.
 */
export const TrainingActiveStatusSchema: Type.TUnion<
  (Type.TLiteral<"pending"> | Type.TLiteral<"queued"> | Type.TLiteral<"running">)[]
> = Type.Union([Type.Literal("pending"), Type.Literal("queued"), Type.Literal("running")], {});

/**
 * Training statuses considered "terminal".
 */
export const TrainingTerminalStatusSchema: Type.TUnion<
  (Type.TLiteral<"completed"> | Type.TLiteral<"failed"> | Type.TLiteral<"canceled">)[]
> = Type.Union([Type.Literal("completed"), Type.Literal("failed"), Type.Literal("canceled")], {});

/**
 * Training job list query schema.
 */
export const TrainingJobsQueryPageSchema: Type.TUnion<(Type.TInteger | Type.TString)[]> =
  Type.Union([Type.Integer({ minimum: 1 }), Type.String({ minLength: 1 })], {});

/**
 * Training job list page size schema.
 */
export const TrainingJobsQueryPageSizeSchema: Type.TUnion<(Type.TInteger | Type.TString)[]> =
  Type.Union([Type.Integer({ minimum: 1, maximum: 100 }), Type.String({ minLength: 1 })], {});

/** TypeBox schema for TrainingJobsQuerySchema. */
export const TrainingJobsQuerySchema: Type.TObject<
  {
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"pending">
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"canceled">
        )[]
      >
    >;
    readonly page: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly pageSize: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"pending">
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"canceled">
        )[]
      >
    >;
    readonly page: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly pageSize: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
  }>
> = Type.Object(
  {
    status: Type.Optional(TrainingStatusSchema),
    page: Type.Optional(TrainingJobsQueryPageSchema),
    pageSize: Type.Optional(TrainingJobsQueryPageSizeSchema),
  },
  { additionalProperties: false },
);

/**
 * Training job creation request schema.
 */
export const TrainingJobCreateRequestSchema = Type.Object(
  {
    modelId: Type.String({ minLength: 1 }),
    modelName: Type.Optional(Type.String({ minLength: 1 })),
    modelVersion: Type.Optional(Type.String({ minLength: 1 })),
    datasetId: Type.String({ minLength: 1 }),
    priority: Type.Optional(Type.String({ minLength: 1 })),
    config: TrainingJsonObjectSchema,
    metadata: Type.Optional(TrainingJsonObjectSchema),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Training job progress update request schema.
 */
export const TrainingJobProgressUpdateSchema = Type.Object(
  {
    status: Type.Optional(TrainingActiveStatusSchema),
    progress: Type.Optional(Type.Integer({ minimum: 0, maximum: 100 })),
    currentEpoch: Type.Optional(Type.Integer({ minimum: 0 })),
    totalEpochs: Type.Optional(Type.Integer({ minimum: 1 })),
    currentLoss: Type.Optional(Type.Number()),
    currentAccuracy: Type.Optional(Type.Number()),
    metadata: Type.Optional(TrainingJsonObjectSchema),
    logs: Type.Optional(TrainingJsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Training job completion request schema.
 */
export const TrainingJobCompleteRequestSchema = Type.Object(
  {
    status: TrainingTerminalStatusSchema,
    progress: Type.Optional(Type.Integer({ minimum: 0, maximum: 100 })),
    currentEpoch: Type.Optional(Type.Integer({ minimum: 0 })),
    totalEpochs: Type.Optional(Type.Integer({ minimum: 1 })),
    currentLoss: Type.Optional(Type.Number()),
    currentAccuracy: Type.Optional(Type.Number()),
    finalAccuracy: Type.Optional(Type.Number()),
    datasetSize: Type.Optional(Type.Integer({ minimum: 0 })),
    errorMessage: Type.Optional(Type.String()),
    metadata: Type.Optional(TrainingJsonObjectSchema),
    logs: Type.Optional(TrainingJsonObjectSchema),
    artifactId: Type.Optional(Type.String({ minLength: 1 })),
    deploymentEndpoint: Type.Optional(Type.String({ minLength: 1 })),
    modelVersion: Type.Optional(Type.String({ minLength: 1 })),
    modelType: Type.Optional(Type.String({ minLength: 1 })),
    runtime: Type.Optional(Type.String({ minLength: 1 })),
    source: Type.Optional(Type.String({ minLength: 1 })),
    requirements: Type.Optional(Type.String({ minLength: 1 })),
    files: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * Training job DTO schema.
 */
export const TrainingJobDtoSchema = Type.Object(
  {
    id: Type.String(),
    userId: Type.String(),
    modelId: Type.String(),
    modelName: Type.String(),
    modelVersion: Type.Union([Type.String(), Type.Null()]),
    datasetId: Type.String(),
    status: TrainingStatusSchema,
    priority: Type.Union([Type.String(), Type.Null()]),
    progress: Type.Number(),
    currentEpoch: Type.Number(),
    totalEpochs: Type.Number(),
    currentLoss: Type.Union([Type.Number(), Type.Null()]),
    currentAccuracy: Type.Union([Type.Number(), Type.Null()]),
    finalAccuracy: Type.Union([Type.Number(), Type.Null()]),
    datasetSize: Type.Union([Type.Number(), Type.Null()]),
    config: TrainingJsonValueSchema,
    metadata: TrainingJsonValueSchema,
    logs: TrainingJsonValueSchema,
    errorMessage: Type.Union([Type.String(), Type.Null()]),
    startTime: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    endTime: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training artifact DTO schema.
 */
export const TrainingArtifactDtoSchema = Type.Object(
  {
    id: Type.String(),
    trainingJobId: Type.String(),
    modelId: Type.String(),
    kind: Type.String(),
    format: Type.Union([Type.String(), Type.Null()]),
    fileName: Type.String(),
    mimeType: Type.Union([Type.String(), Type.Null()]),
    storagePath: Type.Union([Type.String(), Type.Null()]),
    storageProvider: Type.Union([Type.String(), Type.Null()]),
    storageBucket: Type.Union([Type.String(), Type.Null()]),
    storageKey: Type.Union([Type.String(), Type.Null()]),
    fileSize: Type.Union([Type.String(), Type.Null()]),
    checksum: Type.Union([Type.String(), Type.Null()]),
    metadata: TrainingJsonValueSchema,
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job timeline event kind schema.
 */
export const TrainingJobEventKindSchema: Type.TUnion<
  (
    | Type.TLiteral<"job_created">
    | Type.TLiteral<"job_status">
    | Type.TLiteral<"stage_status">
    | Type.TLiteral<"job_control">
    | Type.TLiteral<"enqueue_failed">
  )[]
> = Type.Union(
  [
    Type.Literal("job_created"),
    Type.Literal("job_status"),
    Type.Literal("stage_status"),
    Type.Literal("job_control"),
    Type.Literal("enqueue_failed"),
  ],
  {},
);

/**
 * Training job event DTO schema (append-only timeline entry).
 */
export const TrainingJobEventDtoSchema = Type.Object(
  {
    id: Type.String(),
    trainingJobId: Type.String(),
    userId: Type.Union([Type.String(), Type.Null()]),
    kind: TrainingJobEventKindSchema,
    stageType: Type.Union([Type.String(), Type.Null()]),
    status: Type.Union([Type.String(), Type.Null()]),
    message: Type.Union([Type.String(), Type.Null()]),
    payload: Type.Union([TrainingJsonValueSchema, Type.Null()]),
    correlationId: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job events list query schema.
 */
export const TrainingJobEventsQuerySchema: Type.TObject<
  {
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly cursor: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly cursor: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  }>
> = Type.Object(
  {
    limit: Type.Optional(Type.Union([Type.Integer({ minimum: 1 }), Type.String({ minLength: 1 })])),
    cursor: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
  },
  { additionalProperties: false },
);

/**
 * Training job events list response schema.
 */
export const TrainingJobEventsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(TrainingJobEventDtoSchema),
    nextCursor: Type.Union([Type.String(), Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job stats schema.
 */
export const TrainingJobStatsSchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly pending: Type.TInteger;
    readonly queued: Type.TInteger;
    readonly running: Type.TInteger;
    readonly completed: Type.TInteger;
    readonly failed: Type.TInteger;
    readonly canceled: Type.TInteger;
    readonly active: Type.TInteger;
    readonly timestamp: Type.TString;
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
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    pending: Type.Integer({ minimum: 0 }),
    queued: Type.Integer({ minimum: 0 }),
    running: Type.Integer({ minimum: 0 }),
    completed: Type.Integer({ minimum: 0 }),
    failed: Type.Integer({ minimum: 0 }),
    canceled: Type.Integer({ minimum: 0 }),
    active: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Training job list response schema.
 */
export const TrainingJobsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    message: Type.Optional(Type.String({ description: "Optional success message" })),
    items: Type.Array(TrainingJobDtoSchema),
    total: Type.Integer({ minimum: 0 }),
    page: Type.Integer({ minimum: 1 }),
    pageSize: Type.Integer({ minimum: 1 }),
    hasMore: Type.Boolean(),
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training job detail response schema.
 */
export const TrainingJobResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    message: Type.Optional(Type.String({ description: "Optional success message" })),
    data: TrainingJobDtoSchema,
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training artifact list response schema.
 */
export const TrainingArtifactsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    message: Type.Optional(Type.String({ description: "Optional success message" })),
    items: Type.Array(TrainingArtifactDtoSchema),
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training artifact detail response schema.
 */
export const TrainingArtifactResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    message: Type.Optional(Type.String({ description: "Optional success message" })),
    data: TrainingArtifactDtoSchema,
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);

/**
 * Training job stats response schema.
 */
export const TrainingJobStatsResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly message: Type.TOptional<Type.TString>;
    readonly data: Type.TObject<
      {
        readonly total: Type.TInteger;
        readonly pending: Type.TInteger;
        readonly queued: Type.TInteger;
        readonly running: Type.TInteger;
        readonly completed: Type.TInteger;
        readonly failed: Type.TInteger;
        readonly canceled: Type.TInteger;
        readonly active: Type.TInteger;
        readonly timestamp: Type.TString;
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
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "data",
  "message"
> = Type.Object(
  {
    ok: Type.Literal(true),
    message: Type.Optional(Type.String({ description: "Optional success message" })),
    data: TrainingJobStatsSchema,
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: TrainingJsonValueSchema },
);
