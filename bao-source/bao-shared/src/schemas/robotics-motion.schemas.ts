/**
 * Robotics motion planning schemas.
 *
 * Defines TypeBox schemas for deterministic trajectory planning.
 *
 * @shared/schemas/robotics-motion.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { RoboticsCommandTypeSchema } from "./robotics-policy.schemas.ts";

/**
 * Joint command payload schema.
 */
export const RoboticsJointCommandSchema: Type.TObject<
  {
    readonly jointTargets: Type.TArray<Type.TNumber>;
    readonly jointPositions: Type.TOptional<Type.TArray<Type.TNumber>>;
  },
  "jointTargets",
  "jointPositions"
> = Type.Object(
  {
    jointTargets: Type.Array(Type.Number(), { minItems: 1 }),
    jointPositions: Type.Optional(Type.Array(Type.Number())),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsJointCommand schema. */
export type RoboticsJointCommand = Static<typeof RoboticsJointCommandSchema>;

/**
 * Pose command payload schema.
 */
export const RoboticsPoseCommandSchema: Type.TObject<
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

/** Inferred type from the RoboticsPoseCommand schema. */
export type RoboticsPoseCommand = Static<typeof RoboticsPoseCommandSchema>;

/**
 * Velocity command payload schema.
 */
export const RoboticsVelocityCommandSchema: Type.TObject<
  {
    readonly linear: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly angular: Type.TObject<
      {
        readonly x: Type.TOptional<Type.TNumber>;
        readonly y: Type.TOptional<Type.TNumber>;
        readonly z: Type.TNumber;
      },
      "z",
      Type.InferOptionalKeys<{
        readonly x: Type.TOptional<Type.TNumber>;
        readonly y: Type.TOptional<Type.TNumber>;
        readonly z: Type.TNumber;
      }>
    >;
  },
  "linear" | "angular",
  never
> = Type.Object(
  {
    linear: Type.Object(
      {
        x: Type.Number(),
        y: Type.Number(),
        z: Type.Number(),
      },
      { additionalProperties: false },
    ),
    angular: Type.Object(
      {
        x: Type.Optional(Type.Number()),
        y: Type.Optional(Type.Number()),
        z: Type.Number(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsVelocityCommand schema. */
export type RoboticsVelocityCommand = Static<typeof RoboticsVelocityCommandSchema>;

/**
 * Trajectory point schema.
 */
export const RoboticsTrajectoryPointSchema = Type.Object(
  {
    t: Type.Number({ description: "Seconds from trajectory start" }),
    jointTargets: Type.Optional(Type.Array(Type.Number())),
    pose: Type.Optional(RoboticsPoseCommandSchema),
    velocity: Type.Optional(RoboticsVelocityCommandSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPoint schema. */
export type RoboticsTrajectoryPoint = Static<typeof RoboticsTrajectoryPointSchema>;

/**
 * Trajectory plan schema.
 */
export const RoboticsTrajectoryPlanSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    commandType: RoboticsCommandTypeSchema,
    points: Type.Array(RoboticsTrajectoryPointSchema),
    durationMs: Type.Number({ minimum: 0 }),
    sampleIntervalMs: Type.Number({ minimum: 1 }),
    warnings: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPlan schema. */
export type RoboticsTrajectoryPlan = Static<typeof RoboticsTrajectoryPlanSchema>;

/**
 * Trajectory plan request schema.
 */
export const RoboticsTrajectoryPlanRequestSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    commandType: RoboticsCommandTypeSchema,
    target: Type.Union([
      RoboticsJointCommandSchema,
      RoboticsPoseCommandSchema,
      RoboticsVelocityCommandSchema,
    ]),
    current: Type.Optional(
      Type.Union([
        RoboticsJointCommandSchema,
        RoboticsPoseCommandSchema,
        RoboticsVelocityCommandSchema,
      ]),
    ),
    options: Type.Optional(
      Type.Object(
        {
          sampleIntervalMs: Type.Optional(Type.Number({ minimum: 10 })),
          maxDurationMs: Type.Optional(Type.Number({ minimum: 10 })),
          maxPoints: Type.Optional(Type.Integer({ minimum: 2 })),
          maxVelocity: Type.Optional(Type.Number({ minimum: 0 })),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPlanRequest schema. */
export type RoboticsTrajectoryPlanRequest = Static<typeof RoboticsTrajectoryPlanRequestSchema>;

/**
 * Trajectory plan response schema.
 */
export const RoboticsTrajectoryPlanResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    plan: RoboticsTrajectoryPlanSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPlanResponse schema. */
export type RoboticsTrajectoryPlanResponse = Static<typeof RoboticsTrajectoryPlanResponseSchema>;
