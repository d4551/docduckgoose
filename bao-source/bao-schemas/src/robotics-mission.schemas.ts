/**
 * Robotics mission schemas.
 *
 * Defines TypeBox schemas for fleet mission scheduling and execution.
 *
 * @shared/schemas/robotics-mission.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const RoboticsMissionStatusSchema: TUnion<
  (
    | TLiteral<"queued">
    | TLiteral<"running">
    | TLiteral<"completed">
    | TLiteral<"failed">
    | TLiteral<"cancelled">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("queued"),
    TypeExports.Literal("running"),
    TypeExports.Literal("completed"),
    TypeExports.Literal("failed"),
    TypeExports.Literal("cancelled"),
  ],
  {},
);

/** Inferred type from the RoboticsMissionStatus schema. */
export type RoboticsMissionStatus = Static<typeof RoboticsMissionStatusSchema>;

/**
 * Mission step schemas.
 */
export const RoboticsMissionNavigateStepSchema: TObject<
  {
    readonly type: TLiteral<"navigate">;
    readonly robotId: TString;
    readonly goal: TObject<
      {
        readonly x: TNumber;
        readonly y: TNumber;
        readonly yaw: TNumber;
        readonly frameId: TOptional<TString>;
        readonly behaviorTree: TOptional<TString>;
      },
      "x" | "y" | "yaw",
      InferOptionalKeys<{
        readonly x: TNumber;
        readonly y: TNumber;
        readonly yaw: TNumber;
        readonly frameId: TOptional<TString>;
        readonly behaviorTree: TOptional<TString>;
      }>
    >;
    readonly timeoutMs: TOptional<TNumber>;
  },
  "type" | "robotId" | "goal",
  "timeoutMs"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("navigate"),
    robotId: TypeExports.String({ minLength: 1 }),
    goal: NavigationGoalSchema,
    timeoutMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionJointStepSchema. */
export const RoboticsMissionJointStepSchema: TObject<
  {
    readonly type: TLiteral<"joint">;
    readonly robotId: TString;
    readonly target: TObject<
      {
        readonly jointTargets: TArray<TNumber>;
        readonly jointPositions: TOptional<TArray<TNumber>>;
      },
      "jointTargets",
      "jointPositions"
    >;
    readonly timeoutMs: TOptional<TNumber>;
  },
  "type" | "robotId" | "target",
  "timeoutMs"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("joint"),
    robotId: TypeExports.String({ minLength: 1 }),
    target: RoboticsJointCommandSchema,
    timeoutMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionPoseStepSchema. */
export const RoboticsMissionPoseStepSchema: TObject<
  {
    readonly type: TLiteral<"pose">;
    readonly robotId: TString;
    readonly target: TObject<
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
    >;
    readonly timeoutMs: TOptional<TNumber>;
  },
  "type" | "robotId" | "target",
  "timeoutMs"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("pose"),
    robotId: TypeExports.String({ minLength: 1 }),
    target: RoboticsPoseCommandSchema,
    timeoutMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionGripperStepSchema. */
export const RoboticsMissionGripperStepSchema: TObject<
  {
    readonly type: TLiteral<"gripper">;
    readonly robotId: TString;
    readonly target: TObject<
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
    >;
    readonly timeoutMs: TOptional<TNumber>;
  },
  "type" | "robotId" | "target",
  "timeoutMs"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("gripper"),
    robotId: TypeExports.String({ minLength: 1 }),
    target: RoboticsGripperTelemetrySchema,
    timeoutMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionWaitStepSchema. */
export const RoboticsMissionWaitStepSchema: TObject<
  {
    readonly type: TLiteral<"wait">;
    readonly robotId: TString;
    readonly durationMs: TNumber;
  },
  "type" | "robotId" | "durationMs",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("wait"),
    robotId: TypeExports.String({ minLength: 1 }),
    durationMs: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionCustomStepSchema. */
export const RoboticsMissionCustomStepSchema: TObject<
  {
    readonly type: TLiteral<"custom">;
    readonly robotId: TString;
    readonly command: TString;
    readonly payload: TOptional<TRecord<TString, TUnknown>>;
  },
  "type" | "robotId" | "command",
  "payload"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("custom"),
    robotId: TypeExports.String({ minLength: 1 }),
    command: TypeExports.String({ minLength: 1 }),
    payload: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** TypeBox schema for RoboticsMissionStepSchema. */
export const RoboticsMissionStepSchema = TypeExports.Union([
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
export const RoboticsMissionSpecSchema = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    steps: TypeExports.Array(RoboticsMissionStepSchema, { minItems: 1 }),
    options: TypeExports.Optional(
      TypeExports.Object(
        {
          continueOnError: TypeExports.Optional(TypeExports.Boolean()),
          maxConcurrent: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
        },
        { additionalProperties: false },
      ),
    ),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionSpec schema. */
export type RoboticsMissionSpec = Static<typeof RoboticsMissionSpecSchema>;

/**
 * Mission record schema.
 */
export const RoboticsMissionSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    status: RoboticsMissionStatusSchema,
    priority: TypeExports.Integer({ minimum: 0 }),
    requestedBy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    spec: RoboticsMissionSpecSchema,
    result: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    errorMessage: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    requestedAt: TypeExports.String({ format: "date-time" }),
    startedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    completedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMission schema. */
export type RoboticsMission = Static<typeof RoboticsMissionSchema>;

/**
 * Mission create request schema.
 */
export const RoboticsMissionCreateRequestSchema = TypeExports.Object(
  {
    spec: RoboticsMissionSpecSchema,
    priority: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    requestedBy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionCreateRequest schema. */
export type RoboticsMissionCreateRequest = Static<typeof RoboticsMissionCreateRequestSchema>;

/**
 * Mission create response schema.
 */
export const RoboticsMissionCreateResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    mission: RoboticsMissionSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionCreateResponse schema. */
export type RoboticsMissionCreateResponse = Static<typeof RoboticsMissionCreateResponseSchema>;

/**
 * Mission list request schema.
 */
export const RoboticsMissionListRequestSchema: TObject<
  {
    readonly status: TOptional<
      TUnion<
        (
          | TLiteral<"queued">
          | TLiteral<"running">
          | TLiteral<"completed">
          | TLiteral<"failed">
          | TLiteral<"cancelled">
        )[]
      >
    >;
    readonly robotId: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly status: TOptional<
      TUnion<
        (
          | TLiteral<"queued">
          | TLiteral<"running">
          | TLiteral<"completed">
          | TLiteral<"failed">
          | TLiteral<"cancelled">
        )[]
      >
    >;
    readonly robotId: TOptional<TString>;
    readonly limit: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    status: TypeExports.Optional(RoboticsMissionStatusSchema),
    robotId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionListRequest schema. */
export type RoboticsMissionListRequest = Static<typeof RoboticsMissionListRequestSchema>;

/**
 * Mission status response schema.
 */
export const RoboticsMissionStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    mission: RoboticsMissionSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionStatusResponse schema. */
export type RoboticsMissionStatusResponse = Static<typeof RoboticsMissionStatusResponseSchema>;

/**
 * Mission list response schema.
 */
export const RoboticsMissionListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    missions: TypeExports.Array(RoboticsMissionSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionListResponse schema. */
export type RoboticsMissionListResponse = Static<typeof RoboticsMissionListResponseSchema>;

/**
 * Mission cancel response schema.
 */
export const RoboticsMissionCancelResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly missionId: TString;
    readonly cancelled: TBoolean;
    readonly timestamp: TString;
  },
  "cancelled" | "ok" | "timestamp" | "missionId",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    missionId: TypeExports.String({ minLength: 1 }),
    cancelled: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionCancelResponse schema. */
export type RoboticsMissionCancelResponse = Static<typeof RoboticsMissionCancelResponseSchema>;

/**
 * Mission progress schema for telemetry overlays.
 */
export const RoboticsMissionProgressSchema = TypeExports.Object(
  {
    missionId: TypeExports.String({ minLength: 1 }),
    stepIndex: TypeExports.Integer({ minimum: 0 }),
    totalSteps: TypeExports.Integer({ minimum: 1 }),
    robotId: TypeExports.String({ minLength: 1 }),
    status: RoboticsMissionStatusSchema,
    currentPose: TypeExports.Optional(RoboticsPoseTelemetrySchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsMissionProgress schema. */
export type RoboticsMissionProgress = Static<typeof RoboticsMissionProgressSchema>;
