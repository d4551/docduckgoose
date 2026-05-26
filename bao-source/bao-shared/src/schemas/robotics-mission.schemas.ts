/**
 * Robotics mission schemas.
 *
 * Defines TypeBox schemas for fleet mission scheduling and execution.
 *
 * @shared/schemas/robotics-mission.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { NavigationGoalSchema } from "./navigation.schemas.ts";
import {
  RoboticsJointCommandSchema,
  RoboticsPoseCommandSchema,
} from "./robotics-motion.schemas.ts";
import {
  RoboticsGripperTelemetrySchema,
  RoboticsPoseTelemetrySchema,
} from "./robotics-telemetry.schemas.ts";

/**
 * Mission status schema.
 */
export const RoboticsMissionStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"queued">
    | Type.TLiteral<"running">
    | Type.TLiteral<"completed">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"cancelled">
  )[]
> = Type.Union(
  [
    Type.Literal("queued"),
    Type.Literal("running"),
    Type.Literal("completed"),
    Type.Literal("failed"),
    Type.Literal("cancelled"),
  ],
  {},
);

/** Inferred type from the RoboticsMissionStatus schema. */
export type RoboticsMissionStatus = Static<typeof RoboticsMissionStatusSchema>;

/**
 * Mission step schemas.
 */
export const RoboticsMissionNavigateStepSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"navigate">;
    readonly robotId: Type.TString;
    readonly goal: Type.TObject<
      {
        readonly x: Type.TNumber;
        readonly y: Type.TNumber;
        readonly yaw: Type.TNumber;
        readonly frameId: Type.TOptional<Type.TString>;
        readonly behaviorTree: Type.TOptional<Type.TString>;
      },
      "x" | "y" | "yaw",
      Type.InferOptionalKeys<{
        readonly x: Type.TNumber;
        readonly y: Type.TNumber;
        readonly yaw: Type.TNumber;
        readonly frameId: Type.TOptional<Type.TString>;
        readonly behaviorTree: Type.TOptional<Type.TString>;
      }>
    >;
    readonly timeoutMs: Type.TOptional<Type.TNumber>;
  },
  "type" | "robotId" | "goal",
  "timeoutMs"
> = Type.Object(
  {
    type: Type.Literal("navigate"),
    robotId: Type.String({ minLength: 1 }),
    goal: NavigationGoalSchema,
    timeoutMs: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionJointStepSchema. */
export const RoboticsMissionJointStepSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"joint">;
    readonly robotId: Type.TString;
    readonly target: Type.TObject<
      {
        readonly jointTargets: Type.TArray<Type.TNumber>;
        readonly jointPositions: Type.TOptional<Type.TArray<Type.TNumber>>;
      },
      "jointTargets",
      "jointPositions"
    >;
    readonly timeoutMs: Type.TOptional<Type.TNumber>;
  },
  "type" | "robotId" | "target",
  "timeoutMs"
> = Type.Object(
  {
    type: Type.Literal("joint"),
    robotId: Type.String({ minLength: 1 }),
    target: RoboticsJointCommandSchema,
    timeoutMs: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionPoseStepSchema. */
export const RoboticsMissionPoseStepSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"pose">;
    readonly robotId: Type.TString;
    readonly target: Type.TObject<
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
    >;
    readonly timeoutMs: Type.TOptional<Type.TNumber>;
  },
  "type" | "robotId" | "target",
  "timeoutMs"
> = Type.Object(
  {
    type: Type.Literal("pose"),
    robotId: Type.String({ minLength: 1 }),
    target: RoboticsPoseCommandSchema,
    timeoutMs: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionGripperStepSchema. */
export const RoboticsMissionGripperStepSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"gripper">;
    readonly robotId: Type.TString;
    readonly target: Type.TObject<
      {
        readonly width: Type.TNumber;
        readonly force: Type.TOptional<Type.TNumber>;
        readonly state: Type.TOptional<
          Type.TUnion<
            (Type.TLiteral<"open"> | Type.TLiteral<"closed"> | Type.TLiteral<"holding">)[]
          >
        >;
      },
      "width",
      Type.InferOptionalKeys<{
        readonly width: Type.TNumber;
        readonly force: Type.TOptional<Type.TNumber>;
        readonly state: Type.TOptional<
          Type.TUnion<
            (Type.TLiteral<"open"> | Type.TLiteral<"closed"> | Type.TLiteral<"holding">)[]
          >
        >;
      }>
    >;
    readonly timeoutMs: Type.TOptional<Type.TNumber>;
  },
  "type" | "robotId" | "target",
  "timeoutMs"
> = Type.Object(
  {
    type: Type.Literal("gripper"),
    robotId: Type.String({ minLength: 1 }),
    target: RoboticsGripperTelemetrySchema,
    timeoutMs: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionWaitStepSchema. */
export const RoboticsMissionWaitStepSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"wait">;
    readonly robotId: Type.TString;
    readonly durationMs: Type.TNumber;
  },
  "type" | "robotId" | "durationMs",
  never
> = Type.Object(
  {
    type: Type.Literal("wait"),
    robotId: Type.String({ minLength: 1 }),
    durationMs: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionCustomStepSchema. */
export const RoboticsMissionCustomStepSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"custom">;
    readonly robotId: Type.TString;
    readonly command: Type.TString;
    readonly payload: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "type" | "robotId" | "command",
  "payload"
> = Type.Object(
  {
    type: Type.Literal("custom"),
    robotId: Type.String({ minLength: 1 }),
    command: Type.String({ minLength: 1 }),
    payload: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionStepSchema. */
export const RoboticsMissionStepSchema = Type.Union([
  RoboticsMissionNavigateStepSchema,
  RoboticsMissionJointStepSchema,
  RoboticsMissionPoseStepSchema,
  RoboticsMissionGripperStepSchema,
  RoboticsMissionWaitStepSchema,
  RoboticsMissionCustomStepSchema,
]);

/** Inferred type from the RoboticsMissionStep schema. */
export type RoboticsMissionStep = Static<typeof RoboticsMissionStepSchema>;

/**
 * Mission spec schema.
 */
export const RoboticsMissionSpecSchema = Type.Object(
  {
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
    name: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String({ minLength: 1 })),
    steps: Type.Array(RoboticsMissionStepSchema, { minItems: 1 }),
    options: Type.Optional(
      Type.Object(
        {
          continueOnError: Type.Optional(Type.Boolean()),
          maxConcurrent: Type.Optional(Type.Integer({ minimum: 1 })),
        },
        { additionalProperties: false },
      ),
    ),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionSpec schema. */
export type RoboticsMissionSpec = Static<typeof RoboticsMissionSpecSchema>;

/**
 * Mission record schema.
 */
export const RoboticsMissionSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    status: RoboticsMissionStatusSchema,
    priority: Type.Integer({ minimum: 0 }),
    requestedBy: Type.Optional(Type.String({ minLength: 1 })),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    spec: RoboticsMissionSpecSchema,
    result: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    errorMessage: Type.Optional(Type.String({ minLength: 1 })),
    requestedAt: Type.String({ format: "date-time" }),
    startedAt: Type.Optional(Type.String({ format: "date-time" })),
    completedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMission schema. */
export type RoboticsMission = Static<typeof RoboticsMissionSchema>;

/**
 * Mission create request schema.
 */
export const RoboticsMissionCreateRequestSchema = Type.Object(
  {
    spec: RoboticsMissionSpecSchema,
    priority: Type.Optional(Type.Integer({ minimum: 0 })),
    requestedBy: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionCreateRequest schema. */
export type RoboticsMissionCreateRequest = Static<typeof RoboticsMissionCreateRequestSchema>;

/**
 * Mission create response schema.
 */
export const RoboticsMissionCreateResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    mission: RoboticsMissionSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionCreateResponse schema. */
export type RoboticsMissionCreateResponse = Static<typeof RoboticsMissionCreateResponseSchema>;

/**
 * Mission list request schema.
 */
export const RoboticsMissionListRequestSchema: Type.TObject<
  {
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"cancelled">
        )[]
      >
    >;
    readonly robotId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"cancelled">
        )[]
      >
    >;
    readonly robotId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    status: Type.Optional(RoboticsMissionStatusSchema),
    robotId: Type.Optional(Type.String({ minLength: 1 })),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionListRequest schema. */
export type RoboticsMissionListRequest = Static<typeof RoboticsMissionListRequestSchema>;

/**
 * Mission status response schema.
 */
export const RoboticsMissionStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    mission: RoboticsMissionSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionStatusResponse schema. */
export type RoboticsMissionStatusResponse = Static<typeof RoboticsMissionStatusResponseSchema>;

/**
 * Mission list response schema.
 */
export const RoboticsMissionListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    missions: Type.Array(RoboticsMissionSchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionListResponse schema. */
export type RoboticsMissionListResponse = Static<typeof RoboticsMissionListResponseSchema>;

/**
 * Mission cancel response schema.
 */
export const RoboticsMissionCancelResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly missionId: Type.TString;
    readonly cancelled: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "cancelled" | "ok" | "timestamp" | "missionId",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    missionId: Type.String({ minLength: 1 }),
    cancelled: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionCancelResponse schema. */
export type RoboticsMissionCancelResponse = Static<typeof RoboticsMissionCancelResponseSchema>;

/**
 * Mission progress schema for telemetry overlays.
 */
export const RoboticsMissionProgressSchema = Type.Object(
  {
    missionId: Type.String({ minLength: 1 }),
    stepIndex: Type.Integer({ minimum: 0 }),
    totalSteps: Type.Integer({ minimum: 1 }),
    robotId: Type.String({ minLength: 1 }),
    status: RoboticsMissionStatusSchema,
    currentPose: Type.Optional(RoboticsPoseTelemetrySchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionProgress schema. */
export type RoboticsMissionProgress = Static<typeof RoboticsMissionProgressSchema>;
