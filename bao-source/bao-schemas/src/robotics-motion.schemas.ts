/**
 * Robotics motion planning schemas.
 *
 * Defines TypeBox schemas for deterministic trajectory planning.
 *
 * @shared/schemas/robotics-motion.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TNumber,
  TObject,
  TOptional,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { RoboticsCommandTypeSchema } from "./robotics-policy.schemas.ts";

/**
 * Joint command payload schema.
 */
export const RoboticsJointCommandSchema: TObject<
  {
    readonly jointTargets: TArray<TNumber>;
    readonly jointPositions: TOptional<TArray<TNumber>>;
  },
  "jointTargets",
  "jointPositions"
> = TypeExports.Object(
  {
    jointTargets: TypeExports.Array(TypeExports.Number(), { minItems: 1 }),
    jointPositions: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsJointCommand schema. */
export type RoboticsJointCommand = Static<typeof RoboticsJointCommandSchema>;

/**
 * Pose command payload schema.
 */
export const RoboticsPoseCommandSchema: TObject<
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

/** Inferred type from the RoboticsPoseCommand schema. */
export type RoboticsPoseCommand = Static<typeof RoboticsPoseCommandSchema>;

/**
 * Velocity command payload schema.
 */
export const RoboticsVelocityCommandSchema: TObject<
  {
    readonly linear: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly angular: TObject<
      {
        readonly x: TOptional<TNumber>;
        readonly y: TOptional<TNumber>;
        readonly z: TNumber;
      },
      "z",
      InferOptionalKeys<{
        readonly x: TOptional<TNumber>;
        readonly y: TOptional<TNumber>;
        readonly z: TNumber;
      }>
    >;
  },
  "linear" | "angular",
  never
> = TypeExports.Object(
  {
    linear: TypeExports.Object(
      {
        x: TypeExports.Number(),
        y: TypeExports.Number(),
        z: TypeExports.Number(),
      },
      { additionalProperties: false },
    ),
    angular: TypeExports.Object(
      {
        x: TypeExports.Optional(TypeExports.Number()),
        y: TypeExports.Optional(TypeExports.Number()),
        z: TypeExports.Number(),
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
export const RoboticsTrajectoryPointSchema = TypeExports.Object(
  {
    t: TypeExports.Number({ description: "Seconds from trajectory start" }),
    jointTargets: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    pose: TypeExports.Optional(RoboticsPoseCommandSchema),
    velocity: TypeExports.Optional(RoboticsVelocityCommandSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPoint schema. */
export type RoboticsTrajectoryPoint = Static<typeof RoboticsTrajectoryPointSchema>;

/**
 * Trajectory plan schema.
 */
export const RoboticsTrajectoryPlanSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    commandType: RoboticsCommandTypeSchema,
    points: TypeExports.Array(RoboticsTrajectoryPointSchema),
    durationMs: TypeExports.Number({ minimum: 0 }),
    sampleIntervalMs: TypeExports.Number({ minimum: 1 }),
    warnings: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPlan schema. */
export type RoboticsTrajectoryPlan = Static<typeof RoboticsTrajectoryPlanSchema>;

/**
 * Trajectory plan request schema.
 */
export const RoboticsTrajectoryPlanRequestSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    commandType: RoboticsCommandTypeSchema,
    target: TypeExports.Union([
      RoboticsJointCommandSchema,
      RoboticsPoseCommandSchema,
      RoboticsVelocityCommandSchema,
    ]),
    current: TypeExports.Optional(
      TypeExports.Union([
        RoboticsJointCommandSchema,
        RoboticsPoseCommandSchema,
        RoboticsVelocityCommandSchema,
      ]),
    ),
    options: TypeExports.Optional(
      TypeExports.Object(
        {
          sampleIntervalMs: TypeExports.Optional(TypeExports.Number({ minimum: 10 })),
          maxDurationMs: TypeExports.Optional(TypeExports.Number({ minimum: 10 })),
          maxPoints: TypeExports.Optional(TypeExports.Integer({ minimum: 2 })),
          maxVelocity: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
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
export const RoboticsTrajectoryPlanResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    plan: RoboticsTrajectoryPlanSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsTrajectoryPlanResponse schema. */
export type RoboticsTrajectoryPlanResponse = Static<typeof RoboticsTrajectoryPlanResponseSchema>;
