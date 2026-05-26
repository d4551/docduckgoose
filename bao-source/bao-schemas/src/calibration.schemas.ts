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

import type {
  InferOptionalKeys,
  Static,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { JsonObjectSchema, JsonValueSchema } from "./json.schemas.ts";

// Queries

/**
 * Query parameters for calibration snapshot endpoint.
 */
export const CalibrationSnapshotQuerySchema: TObject<
  {
    readonly deviceId: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly deviceId: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    deviceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshotQuery schema. */
export type CalibrationSnapshotQuery = Static<typeof CalibrationSnapshotQuerySchema>;

/**
 * Query parameters for calibration status endpoint.
 */
export const CalibrationStatusQuerySchema: TObject<
  {
    readonly deviceId: TOptional<TString>;
    readonly deviceType: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly deviceId: TOptional<TString>;
    readonly deviceType: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    deviceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    deviceType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationStatusQuery schema. */
export type CalibrationStatusQuery = Static<typeof CalibrationStatusQuerySchema>;

// Records

/** TypeBox schema for CalibrationRecordSchema. */
export const CalibrationRecordSchema: TObject<
  {
    readonly id: TString;
    readonly deviceId: TString;
    readonly deviceType: TString;
    readonly status: TUnion<(TString | TNull)[]>;
    readonly data: TUnion<(TNull | TUnknown)[]>;
    readonly errorMessage: TUnion<(TString | TNull)[]>;
    readonly performedBy: TUnion<(TString | TNull)[]>;
    readonly expiresAt: TUnion<(TString | TNull)[]>;
    readonly createdAt: TString;
    readonly updatedAt: TString;
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
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    deviceType: TypeExports.String({ minLength: 1 }),
    status: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    data: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
    errorMessage: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    performedBy: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    expiresAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRecord schema. */
export type CalibrationRecord = Static<typeof CalibrationRecordSchema>;

/** TypeBox schema for LightingCalibrationRecordSchema. */
export const LightingCalibrationRecordSchema: TObject<
  {
    readonly id: TString;
    readonly deviceId: TString;
    readonly targetProfile: TUnion<(TString | TNull)[]>;
    readonly accuracy: TUnion<(TNull | TNumber)[]>;
    readonly timestamp: TUnion<(TString | TNull)[]>;
    readonly measurements: TUnion<(TNull | TObject<Record<string, never>, never, never>)[]>;
  },
  "targetProfile" | "accuracy" | "timestamp" | "measurements" | "id" | "deviceId",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    targetProfile: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    accuracy: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    timestamp: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    measurements: TypeExports.Union([JsonObjectSchema, TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the LightingCalibrationRecord schema. */
export type LightingCalibrationRecord = Static<typeof LightingCalibrationRecordSchema>;

// Snapshot

/** TypeBox schema for CalibrationSnapshotSchema. */
export const CalibrationSnapshotSchema = TypeExports.Object(
  {
    calibration: TypeExports.Array(CalibrationRecordSchema),
    lighting: TypeExports.Array(LightingCalibrationRecordSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshot schema. */
export type CalibrationSnapshot = Static<typeof CalibrationSnapshotSchema>;

/** TypeBox schema for CalibrationSnapshotCountsSchema. */
export const CalibrationSnapshotCountsSchema: TObject<
  { readonly calibration: TInteger; readonly lighting: TInteger },
  "calibration" | "lighting",
  never
> = TypeExports.Object(
  {
    calibration: TypeExports.Integer({ minimum: 0 }),
    lighting: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshotCounts schema. */
export type CalibrationSnapshotCounts = Static<typeof CalibrationSnapshotCountsSchema>;

/** TypeBox schema for CalibrationSnapshotResponseSchema. */
export const CalibrationSnapshotResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    snapshot: CalibrationSnapshotSchema,
    counts: CalibrationSnapshotCountsSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationSnapshotResponse schema. */
export type CalibrationSnapshotResponse = Static<typeof CalibrationSnapshotResponseSchema>;

// Detail

/** TypeBox schema for CalibrationDetailRequestSchema. */
export const CalibrationDetailRequestSchema: TObject<{ readonly id: TString }, "id", never> =
  TypeExports.Object(
    {
      id: TypeExports.String({ minLength: 1 }),
    },
    { additionalProperties: false },
  );

/** Inferred type from the CalibrationDetailRequest schema. */
export type CalibrationDetailRequest = Static<typeof CalibrationDetailRequestSchema>;

/** TypeBox schema for CalibrationDetailResponseSchema. */
export const CalibrationDetailResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly calibration: TObject<
      {
        readonly id: TString;
        readonly deviceId: TString;
        readonly deviceType: TString;
        readonly status: TUnion<(TString | TNull)[]>;
        readonly data: TUnion<(TNull | TUnknown)[]>;
        readonly errorMessage: TUnion<(TString | TNull)[]>;
        readonly performedBy: TUnion<(TString | TNull)[]>;
        readonly expiresAt: TUnion<(TString | TNull)[]>;
        readonly createdAt: TString;
        readonly updatedAt: TString;
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
    readonly timestamp: TString;
  },
  "calibration" | "timestamp" | "ok",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    calibration: CalibrationRecordSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationDetailResponse schema. */
export type CalibrationDetailResponse = Static<typeof CalibrationDetailResponseSchema>;

// Status

/** TypeBox schema for CalibrationStatusResponseSchema. */
export const CalibrationStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    status: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    deviceType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    latest: TypeExports.Union([CalibrationRecordSchema, TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationStatusResponse schema. */
export type CalibrationStatusResponse = Static<typeof CalibrationStatusResponseSchema>;

// Run

const CalibrationPatternSizeSchema = TypeExports.Object(
  {
    width: TypeExports.Integer({ minimum: 1 }),
    height: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for CalibrationRunRequestSchema. */
export const CalibrationRunRequestSchema = TypeExports.Object(
  {
    deviceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    deviceType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    calibrationType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    targetProfile: TypeExports.Optional(TypeExports.String({ minLength: 1 })),

    // Imager calibration options (optional; ignored for lighting)
    samples: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    pattern: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    patternSize: TypeExports.Optional(CalibrationPatternSizeSchema),
    squareSizeMm: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    images: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),

    // Lighting calibration knobs
    options: TypeExports.Optional(JsonObjectSchema),

    // Optional expiry controls
    expiresAt: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Number()]),
    ),
    validForDays: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    validForHours: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    // Optional idempotency hint for job-backed execution.
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    description: "Calibration run payload.",
    additionalProperties: false,
  },
);

/** Inferred type from the CalibrationRunRequest schema. */
export type CalibrationRunRequest = Static<typeof CalibrationRunRequestSchema>;

/** TypeBox schema for CalibrationRunResponseSchema. */
export const CalibrationRunResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    calibrationId: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    deviceType: TypeExports.String({ minLength: 1 }),
    calibrationType: TypeExports.String({ minLength: 1 }),
    accuracy: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    result: TypeExports.Optional(JsonValueSchema),
    calibration: TypeExports.Union([CalibrationRecordSchema, TypeExports.Null()]),
    lighting: TypeExports.Union([LightingCalibrationRecordSchema, TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const CalibrationJobStateSchema: TUnion<
  [
    TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">,
    ...TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">[],
  ]
> = stringEnum(CALIBRATION_JOB_STATES, {
  description: "Calibration job state token",
});

/**
 * Calibration run outcome payload (used for job outputs).
 */
export const CalibrationRunOutcomeOkSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly calibrationId: TString;
    readonly deviceId: TString;
    readonly deviceType: TString;
    readonly calibrationType: TString;
    readonly accuracy: TUnion<(TNull | TNumber)[]>;
    readonly result: TUnknown;
  },
  "ok" | "deviceId" | "deviceType" | "calibrationType" | "accuracy" | "result" | "calibrationId",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    calibrationId: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    deviceType: TypeExports.String({ minLength: 1 }),
    calibrationType: TypeExports.String({ minLength: 1 }),
    accuracy: TypeExports.Union([TypeExports.Number(), TypeExports.Null()]),
    result: JsonValueSchema,
  },
  { additionalProperties: false },
);

/** TypeBox schema for CalibrationRunOutcomeErrorSchema. */
export const CalibrationRunOutcomeErrorSchema: TObject<
  {
    readonly ok: TLiteral<false>;
    readonly calibrationId: TString;
    readonly deviceId: TString;
    readonly deviceType: TString;
    readonly error: TString;
    readonly status: TInteger;
    readonly code: TString;
  },
  "ok" | "calibrationId" | "deviceId" | "deviceType" | "error" | "status" | "code",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(false),
    calibrationId: TypeExports.String(),
    deviceId: TypeExports.String(),
    deviceType: TypeExports.String(),
    error: TypeExports.String(),
    status: TypeExports.Integer({ minimum: 0 }),
    code: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for CalibrationRunOutcomeSchema. */
export const CalibrationRunOutcomeSchema: TUnion<
  (
    | TObject<
        {
          readonly ok: TLiteral<true>;
          readonly calibrationId: TString;
          readonly deviceId: TString;
          readonly deviceType: TString;
          readonly calibrationType: TString;
          readonly accuracy: TUnion<(TNull | TNumber)[]>;
          readonly result: TUnknown;
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
    | TObject<
        {
          readonly ok: TLiteral<false>;
          readonly calibrationId: TString;
          readonly deviceId: TString;
          readonly deviceType: TString;
          readonly error: TString;
          readonly status: TInteger;
          readonly code: TString;
        },
        "ok" | "deviceId" | "deviceType" | "calibrationId" | "error" | "status" | "code",
        never
      >
  )[]
> = TypeExports.Union([CalibrationRunOutcomeOkSchema, CalibrationRunOutcomeErrorSchema], {});

/** Inferred type from the CalibrationRunOutcome schema. */
export type CalibrationRunOutcome = Static<typeof CalibrationRunOutcomeSchema>;

/**
 * Calibration job enqueue response schema.
 */
export const CalibrationRunJobEnqueueResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    deduped: TypeExports.Boolean(),
    ranInline: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    output: TypeExports.Union([CalibrationRunOutcomeSchema, TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
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
export const CalibrationRunJobInfoSchema: TObject<
  {
    readonly id: TString;
    readonly state: TUnion<
      [
        TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">,
        ...TLiteral<"created" | "retry" | "active" | "completed" | "cancelled" | "failed">[],
      ]
    >;
    readonly createdOn: TString;
    readonly startedOn: TUnion<(TString | TNull)[]>;
    readonly completedOn: TUnion<(TString | TNull)[]>;
    readonly retryCount: TInteger;
    readonly retryLimit: TInteger;
  },
  "startedOn" | "completedOn" | "id" | "state" | "createdOn" | "retryCount" | "retryLimit",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    state: CalibrationJobStateSchema,
    createdOn: TypeExports.String({ format: "date-time" }),
    startedOn: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    completedOn: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    retryCount: TypeExports.Integer({ minimum: 0 }),
    retryLimit: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRunJobInfo schema. */
export type CalibrationRunJobInfo = Static<typeof CalibrationRunJobInfoSchema>;

/** TypeBox schema for CalibrationRunJobStatusResponseSchema. */
export const CalibrationRunJobStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    job: CalibrationRunJobInfoSchema,
    output: TypeExports.Union([CalibrationRunOutcomeSchema, TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the CalibrationRunJobStatusResponse schema. */
export type CalibrationRunJobStatusResponse = Static<typeof CalibrationRunJobStatusResponseSchema>;
