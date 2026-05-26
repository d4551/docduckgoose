/**
 * Robotics telemetry schemas.
 *
 * Defines TypeBox schemas for telemetry capture, listing, and replay.
 *
 * @shared/schemas/robotics-telemetry.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Gripper telemetry payload schema.
 */
export const RoboticsGripperTelemetrySchema: TObject<
  {
    readonly width: TNumber;
    readonly force: TOptional<TNumber>;
    readonly state: TOptional<
      TUnion<(TLiteral<"open"> | TLiteral<"closed"> | TLiteral<"holding">)[]>
    >;
  },
  "width",
  InferOptionalKeys<{
    readonly width: TNumber;
    readonly force: TOptional<TNumber>;
    readonly state: TOptional<
      TUnion<(TLiteral<"open"> | TLiteral<"closed"> | TLiteral<"holding">)[]>
    >;
  }>
> = TypeExports.Object(
  {
    width: TypeExports.Number(),
    force: TypeExports.Optional(TypeExports.Number()),
    state: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("open"),
        TypeExports.Literal("closed"),
        TypeExports.Literal("holding"),
      ]),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsGripperTelemetry schema. */
export type RoboticsGripperTelemetry = Static<typeof RoboticsGripperTelemetrySchema>;

/**
 * Pose telemetry payload schema.
 */
export const RoboticsPoseTelemetrySchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
    readonly roll: TOptional<TNumber>;
    readonly pitch: TOptional<TNumber>;
    readonly yaw: TOptional<TNumber>;
  },
  "x" | "y" | "z",
  InferOptionalKeys<{
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
    readonly roll: TOptional<TNumber>;
    readonly pitch: TOptional<TNumber>;
    readonly yaw: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Number(),
    roll: TypeExports.Optional(TypeExports.Number()),
    pitch: TypeExports.Optional(TypeExports.Number()),
    yaw: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsPoseTelemetry schema. */
export type RoboticsPoseTelemetry = Static<typeof RoboticsPoseTelemetrySchema>;

/**
 * Robotics telemetry payload schema.
 */
export const RoboticsTelemetryPayloadSchema = TypeExports.Object(
  {
    jointTargets: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    jointPositions: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    pose: TypeExports.Optional(RoboticsPoseTelemetrySchema),
    gripper: TypeExports.Optional(RoboticsGripperTelemetrySchema),
    lastCommand: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryPayload schema. */
export type RoboticsTelemetryPayload = Static<typeof RoboticsTelemetryPayloadSchema>;

/**
 * Telemetry sample schema.
 */
export const RoboticsTelemetrySampleSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    robotId: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ format: "date-time" }),
    receivedAt: TypeExports.String({ format: "date-time" }),
    source: TypeExports.String({ minLength: 1 }),
    payload: RoboticsTelemetryPayloadSchema,
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetrySample schema. */
export type RoboticsTelemetrySample = Static<typeof RoboticsTelemetrySampleSchema>;

/**
 * Telemetry capture request schema.
 */
export const RoboticsTelemetryCaptureRequestSchema: TObject<
  {
    readonly robotIds: TOptional<TArray<TString>>;
    readonly since: TOptional<TString>;
    readonly until: TOptional<TString>;
    readonly maxSamples: TOptional<TInteger>;
    readonly idempotencyKey: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly robotIds: TOptional<TArray<TString>>;
    readonly since: TOptional<TString>;
    readonly until: TOptional<TString>;
    readonly maxSamples: TOptional<TInteger>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    robotIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    since: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    until: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    maxSamples: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryCaptureRequest schema. */
export type RoboticsTelemetryCaptureRequest = Static<typeof RoboticsTelemetryCaptureRequestSchema>;

/**
 * Telemetry capture response schema.
 */
export const RoboticsTelemetryCaptureResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly captured: TBoolean;
    readonly timestamp: TString;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "captured",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    captured: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryCaptureResponse schema. */
export type RoboticsTelemetryCaptureResponse = Static<
  typeof RoboticsTelemetryCaptureResponseSchema
>;

/**
 * Telemetry list request schema.
 */
export const RoboticsTelemetryListRequestSchema: TObject<
  {
    readonly robotId: TOptional<TString>;
    readonly since: TOptional<TString>;
    readonly until: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly robotId: TOptional<TString>;
    readonly since: TOptional<TString>;
    readonly until: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    robotId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    since: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    until: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryListRequest schema. */
export type RoboticsTelemetryListRequest = Static<typeof RoboticsTelemetryListRequestSchema>;

/**
 * Telemetry list response schema.
 */
export const RoboticsTelemetryListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    samples: TypeExports.Array(RoboticsTelemetrySampleSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryListResponse schema. */
export type RoboticsTelemetryListResponse = Static<typeof RoboticsTelemetryListResponseSchema>;

/**
 * Telemetry replay request schema.
 */
export const RoboticsTelemetryReplayRequestSchema = TypeExports.Object(
  {
    robotId: TypeExports.String({ minLength: 1 }),
    sampleIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    samples: TypeExports.Optional(TypeExports.Array(RoboticsTelemetryPayloadSchema)),
    replayRate: TypeExports.Optional(TypeExports.Number({ minimum: 0.1 })),
    loop: TypeExports.Optional(TypeExports.Boolean()),
    startAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryReplayRequest schema. */
export type RoboticsTelemetryReplayRequest = Static<typeof RoboticsTelemetryReplayRequestSchema>;

/**
 * Telemetry replay response schema.
 */
export const RoboticsTelemetryReplayResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly scheduled: TBoolean;
    readonly replayId: TOptional<TString>;
    readonly timestamp: TString;
  },
  "ok" | "timestamp" | "scheduled",
  "replayId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    scheduled: TypeExports.Boolean(),
    replayId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryReplayResponse schema. */
export type RoboticsTelemetryReplayResponse = Static<typeof RoboticsTelemetryReplayResponseSchema>;
