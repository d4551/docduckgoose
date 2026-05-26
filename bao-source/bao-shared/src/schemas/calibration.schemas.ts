/**
 * Calibration schemas.
 *
 * Contract-first schemas for calibration snapshot, status, and run endpoints.
 *
 * These endpoints are served from `/api/v1/calibration/*` and use canonical
 * camelCase request/response fields.
 *
 * @shared/schemas/calibration
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { JsonObjectSchema, JsonValueSchema } from "./json.schemas.ts";

// Queries

/**
 * Query parameters for calibration snapshot endpoint.
 */
export const CalibrationSnapshotQuerySchema: Type.TObject<
  {
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    deviceId: Type.Optional(Type.String({ minLength: 1 })),
    limit: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshotQuery schema. */
export type CalibrationSnapshotQuery = Static<typeof CalibrationSnapshotQuerySchema>;

/**
 * Query parameters for calibration status endpoint.
 */
export const CalibrationStatusQuerySchema: Type.TObject<
  {
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly deviceType: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly deviceType: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    deviceId: Type.Optional(Type.String({ minLength: 1 })),
    deviceType: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationStatusQuery schema. */
export type CalibrationStatusQuery = Static<typeof CalibrationStatusQuerySchema>;

// Records

/** TypeBox schema for CalibrationRecordSchema. */
export const CalibrationRecordSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly deviceId: Type.TString;
    readonly deviceType: Type.TString;
    readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly data: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
    readonly errorMessage: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly performedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly expiresAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly createdAt: Type.TString;
    readonly updatedAt: Type.TString;
  },
  | "status"
  | "data"
  | "errorMessage"
  | "performedBy"
  | "expiresAt"
  | "id"
  | "deviceId"
  | "deviceType"
  | "createdAt"
  | "updatedAt",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    deviceType: Type.String({ minLength: 1 }),
    status: Type.Union([Type.String(), Type.Null()]),
    data: Type.Union([JsonValueSchema, Type.Null()]),
    errorMessage: Type.Union([Type.String(), Type.Null()]),
    performedBy: Type.Union([Type.String(), Type.Null()]),
    expiresAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRecord schema. */
export type CalibrationRecord = Static<typeof CalibrationRecordSchema>;

/** TypeBox schema for LightingCalibrationRecordSchema. */
export const LightingCalibrationRecordSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly deviceId: Type.TString;
    readonly targetProfile: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly accuracy: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
    readonly timestamp: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly measurements: Type.TUnion<
      (Type.TNull | Type.TObject<Record<string, never>, never, never>)[]
    >;
  },
  "targetProfile" | "accuracy" | "timestamp" | "measurements" | "id" | "deviceId",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    targetProfile: Type.Union([Type.String(), Type.Null()]),
    accuracy: Type.Union([Type.Number(), Type.Null()]),
    timestamp: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    measurements: Type.Union([JsonObjectSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the LightingCalibrationRecord schema. */
export type LightingCalibrationRecord = Static<typeof LightingCalibrationRecordSchema>;

// Snapshot

/** TypeBox schema for CalibrationSnapshotSchema. */
export const CalibrationSnapshotSchema = Type.Object(
  {
    calibration: Type.Array(CalibrationRecordSchema),
    lighting: Type.Array(LightingCalibrationRecordSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshot schema. */
export type CalibrationSnapshot = Static<typeof CalibrationSnapshotSchema>;

/** TypeBox schema for CalibrationSnapshotCountsSchema. */
export const CalibrationSnapshotCountsSchema: Type.TObject<
  { readonly calibration: Type.TInteger; readonly lighting: Type.TInteger },
  "calibration" | "lighting",
  never
> = Type.Object(
  {
    calibration: Type.Integer({ minimum: 0 }),
    lighting: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshotCounts schema. */
export type CalibrationSnapshotCounts = Static<typeof CalibrationSnapshotCountsSchema>;

/** TypeBox schema for CalibrationSnapshotResponseSchema. */
export const CalibrationSnapshotResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    snapshot: CalibrationSnapshotSchema,
    counts: CalibrationSnapshotCountsSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshotResponse schema. */
export type CalibrationSnapshotResponse = Static<typeof CalibrationSnapshotResponseSchema>;

// Detail

/** TypeBox schema for CalibrationDetailRequestSchema. */
export const CalibrationDetailRequestSchema: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationDetailRequest schema. */
export type CalibrationDetailRequest = Static<typeof CalibrationDetailRequestSchema>;

/** TypeBox schema for CalibrationDetailResponseSchema. */
export const CalibrationDetailResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly calibration: Type.TObject<
      {
        readonly id: Type.TString;
        readonly deviceId: Type.TString;
        readonly deviceType: Type.TString;
        readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly data: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
        readonly errorMessage: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly performedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly expiresAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly createdAt: Type.TString;
        readonly updatedAt: Type.TString;
      },
      | "status"
      | "data"
      | "errorMessage"
      | "performedBy"
      | "expiresAt"
      | "id"
      | "deviceId"
      | "deviceType"
      | "createdAt"
      | "updatedAt",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "calibration" | "timestamp" | "ok",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    calibration: CalibrationRecordSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationDetailResponse schema. */
export type CalibrationDetailResponse = Static<typeof CalibrationDetailResponseSchema>;

// Status

/** TypeBox schema for CalibrationStatusResponseSchema. */
export const CalibrationStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    status: Type.String({ minLength: 1 }),
    deviceId: Type.Union([Type.String(), Type.Null()]),
    deviceType: Type.Union([Type.String(), Type.Null()]),
    latest: Type.Union([CalibrationRecordSchema, Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationStatusResponse schema. */
export type CalibrationStatusResponse = Static<typeof CalibrationStatusResponseSchema>;

// Run

const CalibrationPatternSizeSchema = Type.Object(
  {
    width: Type.Integer({ minimum: 1 }),
    height: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for CalibrationRunRequestSchema. */
export const CalibrationRunRequestSchema = Type.Object(
  {
    deviceId: Type.Optional(Type.String({ minLength: 1 })),
    deviceType: Type.Optional(Type.String({ minLength: 1 })),
    calibrationType: Type.Optional(Type.String({ minLength: 1 })),
    targetProfile: Type.Optional(Type.String({ minLength: 1 })),

    // Imager calibration options (optional; ignored for lighting)
    samples: Type.Optional(Type.Integer({ minimum: 1 })),
    pattern: Type.Optional(Type.String({ minLength: 1 })),
    patternSize: Type.Optional(CalibrationPatternSizeSchema),
    squareSizeMm: Type.Optional(Type.Number({ minimum: 0 })),
    images: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),

    // Lighting calibration knobs
    options: Type.Optional(JsonObjectSchema),

    // Optional expiry controls
    expiresAt: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Number()])),
    validForDays: Type.Optional(Type.Number({ minimum: 0 })),
    validForHours: Type.Optional(Type.Number({ minimum: 0 })),

    // Optional idempotency hint for job-backed execution.
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  {
    description: "Calibration run payload.",
    additionalProperties: false,
  },
);

/** Inferred type from the CalibrationRunRequest schema. */
export type CalibrationRunRequest = Static<typeof CalibrationRunRequestSchema>;

/** TypeBox schema for CalibrationRunResponseSchema. */
export const CalibrationRunResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    calibrationId: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    deviceType: Type.String({ minLength: 1 }),
    calibrationType: Type.String({ minLength: 1 }),
    accuracy: Type.Union([Type.Number(), Type.Null()]),
    result: Type.Optional(JsonValueSchema),
    calibration: Type.Union([CalibrationRecordSchema, Type.Null()]),
    lighting: Type.Union([LightingCalibrationRecordSchema, Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRunResponse schema. */
export type CalibrationRunResponse = Static<typeof CalibrationRunResponseSchema>;

// Run Jobs (Async + Idempotent)

/**
 * Supported calibration run job states (bao-boss).
 */
export const CALIBRATION_JOB_STATES: readonly [
  "created",
  "retry",
  "active",
  "completed",
  "cancelled",
  "failed",
] = ["created", "retry", "active", "completed", "cancelled", "failed"] as const;

/** Inferred type from the CalibrationJobState schema. */
export type CalibrationJobState = (typeof CALIBRATION_JOB_STATES)[number];

/** TypeBox schema for CalibrationJobStateSchema. */
export const CalibrationJobStateSchema: Type.TUnion<
  [
    Type.TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">,
    ...Type.TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">[],
  ]
> = stringEnum(CALIBRATION_JOB_STATES, {
  description: "Calibration job state token",
});

/**
 * Calibration run outcome payload (used for job outputs).
 */
export const CalibrationRunOutcomeOkSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly calibrationId: Type.TString;
    readonly deviceId: Type.TString;
    readonly deviceType: Type.TString;
    readonly calibrationType: Type.TString;
    readonly accuracy: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
    readonly result: Type.TUnknown;
  },
  "ok" | "deviceId" | "deviceType" | "calibrationType" | "accuracy" | "result" | "calibrationId",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    calibrationId: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    deviceType: Type.String({ minLength: 1 }),
    calibrationType: Type.String({ minLength: 1 }),
    accuracy: Type.Union([Type.Number(), Type.Null()]),
    result: JsonValueSchema,
  },
  { additionalProperties: false },
);

/** TypeBox schema for CalibrationRunOutcomeErrorSchema. */
export const CalibrationRunOutcomeErrorSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<false>;
    readonly calibrationId: Type.TString;
    readonly deviceId: Type.TString;
    readonly deviceType: Type.TString;
    readonly error: Type.TString;
    readonly status: Type.TInteger;
    readonly code: Type.TString;
  },
  "ok" | "calibrationId" | "deviceId" | "deviceType" | "error" | "status" | "code",
  never
> = Type.Object(
  {
    ok: Type.Literal(false),
    calibrationId: Type.String(),
    deviceId: Type.String(),
    deviceType: Type.String(),
    error: Type.String(),
    status: Type.Integer({ minimum: 0 }),
    code: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for CalibrationRunOutcomeSchema. */
export const CalibrationRunOutcomeSchema: Type.TUnion<
  (
    | Type.TObject<
        {
          readonly ok: Type.TLiteral<true>;
          readonly calibrationId: Type.TString;
          readonly deviceId: Type.TString;
          readonly deviceType: Type.TString;
          readonly calibrationType: Type.TString;
          readonly accuracy: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
          readonly result: Type.TUnknown;
        },
        | "ok"
        | "deviceId"
        | "deviceType"
        | "calibrationType"
        | "accuracy"
        | "result"
        | "calibrationId",
        never
      >
    | Type.TObject<
        {
          readonly ok: Type.TLiteral<false>;
          readonly calibrationId: Type.TString;
          readonly deviceId: Type.TString;
          readonly deviceType: Type.TString;
          readonly error: Type.TString;
          readonly status: Type.TInteger;
          readonly code: Type.TString;
        },
        "ok" | "deviceId" | "deviceType" | "calibrationId" | "error" | "status" | "code",
        never
      >
  )[]
> = Type.Union([CalibrationRunOutcomeOkSchema, CalibrationRunOutcomeErrorSchema], {});

/** Inferred type from the CalibrationRunOutcome schema. */
export type CalibrationRunOutcome = Static<typeof CalibrationRunOutcomeSchema>;

/**
 * Calibration job enqueue response schema.
 */
export const CalibrationRunJobEnqueueResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    deduped: Type.Boolean(),
    ranInline: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    output: Type.Union([CalibrationRunOutcomeSchema, Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRunJobEnqueueResponse schema. */
export type CalibrationRunJobEnqueueResponse = Static<
  typeof CalibrationRunJobEnqueueResponseSchema
>;

/**
 * Calibration job status response schema.
 */
export const CalibrationRunJobInfoSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly state: Type.TUnion<
      [
        Type.TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">,
        ...Type.TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">[],
      ]
    >;
    readonly createdOn: Type.TString;
    readonly startedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly completedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly retryCount: Type.TInteger;
    readonly retryLimit: Type.TInteger;
  },
  "startedOn" | "completedOn" | "id" | "state" | "createdOn" | "retryCount" | "retryLimit",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    state: CalibrationJobStateSchema,
    createdOn: Type.String({ format: "date-time" }),
    startedOn: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    completedOn: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    retryCount: Type.Integer({ minimum: 0 }),
    retryLimit: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRunJobInfo schema. */
export type CalibrationRunJobInfo = Static<typeof CalibrationRunJobInfoSchema>;

/** TypeBox schema for CalibrationRunJobStatusResponseSchema. */
export const CalibrationRunJobStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    job: CalibrationRunJobInfoSchema,
    output: Type.Union([CalibrationRunOutcomeSchema, Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRunJobStatusResponse schema. */
export type CalibrationRunJobStatusResponse = Static<typeof CalibrationRunJobStatusResponseSchema>;
