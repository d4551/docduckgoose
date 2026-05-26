/**
 * Robotics telemetry schemas.
 *
 * Defines TypeBox schemas for telemetry capture, listing, and replay.
 *
 * @shared/schemas/robotics-telemetry.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Gripper telemetry payload schema.
 */
export const RoboticsGripperTelemetrySchema: Type.TObject<
  {
    readonly width: Type.TNumber;
    readonly force: Type.TOptional<Type.TNumber>;
    readonly state: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"open"> | Type.TLiteral<"closed"> | Type.TLiteral<"holding">)[]>
    >;
  },
  "width",
  Type.InferOptionalKeys<{
    readonly width: Type.TNumber;
    readonly force: Type.TOptional<Type.TNumber>;
    readonly state: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"open"> | Type.TLiteral<"closed"> | Type.TLiteral<"holding">)[]>
    >;
  }>
> = Type.Object(
  {
    width: Type.Number(),
    force: Type.Optional(Type.Number()),
    state: Type.Optional(
      Type.Union([Type.Literal("open"), Type.Literal("closed"), Type.Literal("holding")]),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsGripperTelemetry schema. */
export type RoboticsGripperTelemetry = Static<typeof RoboticsGripperTelemetrySchema>;

/**
 * Pose telemetry payload schema.
 */
export const RoboticsPoseTelemetrySchema: Type.TObject<
  {
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TNumber;
    readonly roll: Type.TOptional<Type.TNumber>;
    readonly pitch: Type.TOptional<Type.TNumber>;
    readonly yaw: Type.TOptional<Type.TNumber>;
  },
  "x" | "y" | "z",
  Type.InferOptionalKeys<{
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TNumber;
    readonly roll: Type.TOptional<Type.TNumber>;
    readonly pitch: Type.TOptional<Type.TNumber>;
    readonly yaw: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    x: Type.Number(),
    y: Type.Number(),
    z: Type.Number(),
    roll: Type.Optional(Type.Number()),
    pitch: Type.Optional(Type.Number()),
    yaw: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsPoseTelemetry schema. */
export type RoboticsPoseTelemetry = Static<typeof RoboticsPoseTelemetrySchema>;

/**
 * Robotics telemetry payload schema.
 */
export const RoboticsTelemetryPayloadSchema = Type.Object(
  {
    jointTargets: Type.Optional(Type.Array(Type.Number())),
    jointPositions: Type.Optional(Type.Array(Type.Number())),
    pose: Type.Optional(RoboticsPoseTelemetrySchema),
    gripper: Type.Optional(RoboticsGripperTelemetrySchema),
    lastCommand: Type.Optional(Type.String({ minLength: 1 })),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryPayload schema. */
export type RoboticsTelemetryPayload = Static<typeof RoboticsTelemetryPayloadSchema>;

/**
 * Telemetry sample schema.
 */
export const RoboticsTelemetrySampleSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    robotId: Type.String({ minLength: 1 }),
    timestamp: Type.String({ format: "date-time" }),
    receivedAt: Type.String({ format: "date-time" }),
    source: Type.String({ minLength: 1 }),
    payload: RoboticsTelemetryPayloadSchema,
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetrySample schema. */
export type RoboticsTelemetrySample = Static<typeof RoboticsTelemetrySampleSchema>;

/**
 * Telemetry capture request schema.
 */
export const RoboticsTelemetryCaptureRequestSchema: Type.TObject<
  {
    readonly robotIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly maxSamples: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly robotIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly maxSamples: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    robotIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    since: Type.Optional(Type.String({ format: "date-time" })),
    until: Type.Optional(Type.String({ format: "date-time" })),
    maxSamples: Type.Optional(Type.Integer({ minimum: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryCaptureRequest schema. */
export type RoboticsTelemetryCaptureRequest = Static<typeof RoboticsTelemetryCaptureRequestSchema>;

/**
 * Telemetry capture response schema.
 */
export const RoboticsTelemetryCaptureResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly captured: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "captured",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    captured: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
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
export const RoboticsTelemetryListRequestSchema: Type.TObject<
  {
    readonly robotId: Type.TOptional<Type.TString>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly robotId: Type.TOptional<Type.TString>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    robotId: Type.Optional(Type.String({ minLength: 1 })),
    since: Type.Optional(Type.String({ format: "date-time" })),
    until: Type.Optional(Type.String({ format: "date-time" })),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryListRequest schema. */
export type RoboticsTelemetryListRequest = Static<typeof RoboticsTelemetryListRequestSchema>;

/**
 * Telemetry list response schema.
 */
export const RoboticsTelemetryListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    samples: Type.Array(RoboticsTelemetrySampleSchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryListResponse schema. */
export type RoboticsTelemetryListResponse = Static<typeof RoboticsTelemetryListResponseSchema>;

/**
 * Telemetry replay request schema.
 */
export const RoboticsTelemetryReplayRequestSchema = Type.Object(
  {
    robotId: Type.String({ minLength: 1 }),
    sampleIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    samples: Type.Optional(Type.Array(RoboticsTelemetryPayloadSchema)),
    replayRate: Type.Optional(Type.Number({ minimum: 0.1 })),
    loop: Type.Optional(Type.Boolean()),
    startAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryReplayRequest schema. */
export type RoboticsTelemetryReplayRequest = Static<typeof RoboticsTelemetryReplayRequestSchema>;

/**
 * Telemetry replay response schema.
 */
export const RoboticsTelemetryReplayResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly scheduled: Type.TBoolean;
    readonly replayId: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "scheduled",
  "replayId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    scheduled: Type.Boolean(),
    replayId: Type.Optional(Type.String({ minLength: 1 })),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTelemetryReplayResponse schema. */
export type RoboticsTelemetryReplayResponse = Static<typeof RoboticsTelemetryReplayResponseSchema>;
