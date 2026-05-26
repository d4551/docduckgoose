/**
 * Robotics safety policy schemas.
 *
 * Defines TypeBox schemas for policy-driven safety envelopes used to
 * validate motion commands across robotics and drone stacks.
 *
 * @shared/schemas/robotics-policy.ts
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
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { Position3DSchema } from "./navigation.schemas.ts";
import { Vector3DSchema } from "./sensor.schemas.ts";

// Common Bounds

/**
 * Axis bounds schema.
 */
export const RoboticsAxisBoundsSchema: TObject<
  { readonly min: TNumber; readonly max: TNumber },
  "min" | "max",
  never
> = TypeExports.Object(
  {
    min: TypeExports.Number({ description: "Minimum allowed value" }),
    max: TypeExports.Number({ description: "Maximum allowed value" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsAxisBounds schema. */
export type RoboticsAxisBounds = Static<typeof RoboticsAxisBoundsSchema>;

/**
 * Orientation bounds schema (roll, pitch, yaw).
 */
export const RoboticsOrientationBoundsSchema: TObject<
  {
    readonly roll: TObject<{ readonly min: TNumber; readonly max: TNumber }, "min" | "max", never>;
    readonly pitch: TObject<{ readonly min: TNumber; readonly max: TNumber }, "min" | "max", never>;
    readonly yaw: TObject<{ readonly min: TNumber; readonly max: TNumber }, "min" | "max", never>;
  },
  "roll" | "pitch" | "yaw",
  never
> = TypeExports.Object(
  {
    roll: RoboticsAxisBoundsSchema,
    pitch: RoboticsAxisBoundsSchema,
    yaw: RoboticsAxisBoundsSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsOrientationBounds schema. */
export type RoboticsOrientationBounds = Static<typeof RoboticsOrientationBoundsSchema>;

/**
 * Joint limit schema.
 */
export const RoboticsJointLimitSchema: TObject<
  {
    readonly index: TInteger;
    readonly min: TNumber;
    readonly max: TNumber;
    readonly maxVelocity: TOptional<TNumber>;
    readonly maxAcceleration: TOptional<TNumber>;
  },
  "index" | "min" | "max",
  InferOptionalKeys<{
    readonly index: TInteger;
    readonly min: TNumber;
    readonly max: TNumber;
    readonly maxVelocity: TOptional<TNumber>;
    readonly maxAcceleration: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    index: TypeExports.Integer({ minimum: 0, description: "Joint index" }),
    min: TypeExports.Number({ description: "Minimum joint position (radians)" }),
    max: TypeExports.Number({ description: "Maximum joint position (radians)" }),
    maxVelocity: TypeExports.Optional(
      TypeExports.Number({ description: "Max joint velocity (rad/s)" }),
    ),
    maxAcceleration: TypeExports.Optional(
      TypeExports.Number({ description: "Max joint acceleration (rad/s^2)" }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsJointLimit schema. */
export type RoboticsJointLimit = Static<typeof RoboticsJointLimitSchema>;

/**
 * Workspace bounds schema.
 */
export const RoboticsWorkspaceBoundsSchema: TObject<
  {
    readonly min: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly max: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly frameId: TOptional<TString>;
  },
  "min" | "max",
  "frameId"
> = TypeExports.Object(
  {
    min: Position3DSchema,
    max: Position3DSchema,
    frameId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsWorkspaceBounds schema. */
export type RoboticsWorkspaceBounds = Static<typeof RoboticsWorkspaceBoundsSchema>;

/**
 * Velocity limit schema.
 */
export const RoboticsVelocityLimitsSchema: TObject<
  {
    readonly linear: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly angular: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
  },
  "linear" | "angular",
  never
> = TypeExports.Object(
  {
    linear: Vector3DSchema,
    angular: Vector3DSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsVelocityLimits schema. */
export type RoboticsVelocityLimits = Static<typeof RoboticsVelocityLimitsSchema>;

/**
 * Keep-out zone schema.
 */
export const RoboticsKeepoutZoneSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    severity: TypeExports.Union([TypeExports.Literal("block"), TypeExports.Literal("warn")]),
    min: Position3DSchema,
    max: Position3DSchema,
    frameId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    note: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsKeepoutZone schema. */
export type RoboticsKeepoutZone = Static<typeof RoboticsKeepoutZoneSchema>;

// Safety Policy

/**
 * Safety policy configuration schema.
 */
export const RoboticsSafetyPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean({ description: "Enable policy enforcement" }),
    jointLimits: TypeExports.Array(RoboticsJointLimitSchema, { minItems: 0 }),
    workspaceBounds: TypeExports.Optional(RoboticsWorkspaceBoundsSchema),
    orientationBounds: TypeExports.Optional(RoboticsOrientationBoundsSchema),
    velocityLimits: TypeExports.Optional(RoboticsVelocityLimitsSchema),
    keepoutZones: TypeExports.Optional(TypeExports.Array(RoboticsKeepoutZoneSchema)),
    allowedFrames: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyPolicy schema. */
export type RoboticsSafetyPolicy = Static<typeof RoboticsSafetyPolicySchema>;

// Safety Evaluation

/**
 * Supported robotics command types for safety evaluation.
 */
export const RoboticsCommandTypeSchema: TUnion<
  (TLiteral<"joint"> | TLiteral<"pose"> | TLiteral<"velocity">)[]
> = TypeExports.Union(
  [TypeExports.Literal("joint"), TypeExports.Literal("pose"), TypeExports.Literal("velocity")],
  {},
);

/** Inferred type from the RoboticsCommandType schema. */
export type RoboticsCommandType = Static<typeof RoboticsCommandTypeSchema>;

/**
 * Safety violation schema.
 */
export const RoboticsSafetyViolationSchema: TObject<
  {
    readonly code: TString;
    readonly message: TString;
    readonly severity: TUnion<(TLiteral<"error"> | TLiteral<"warning">)[]>;
    readonly field: TOptional<TString>;
  },
  "severity" | "code" | "message",
  "field"
> = TypeExports.Object(
  {
    code: TypeExports.String({ minLength: 1 }),
    message: TypeExports.String({ minLength: 1 }),
    severity: TypeExports.Union([TypeExports.Literal("error"), TypeExports.Literal("warning")]),
    field: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyViolation schema. */
export type RoboticsSafetyViolation = Static<typeof RoboticsSafetyViolationSchema>;

/**
 * Safety check request schema.
 */
export const RoboticsSafetyCheckRequestSchema: TObject<
  {
    readonly commandType: TUnion<(TLiteral<"joint"> | TLiteral<"pose"> | TLiteral<"velocity">)[]>;
    readonly payload: TObject<Record<string, never>, never, never>;
    readonly deviceId: TOptional<TString>;
  },
  "commandType" | "payload",
  "deviceId"
> = TypeExports.Object(
  {
    commandType: RoboticsCommandTypeSchema,
    payload: JsonObjectSchema,
    deviceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyCheckRequest schema. */
export type RoboticsSafetyCheckRequest = Static<typeof RoboticsSafetyCheckRequestSchema>;

/**
 * Safety check response schema.
 */
export const RoboticsSafetyCheckResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly allowed: TBoolean;
    readonly violations: TArray<
      TObject<
        {
          readonly code: TString;
          readonly message: TString;
          readonly severity: TUnion<(TLiteral<"error"> | TLiteral<"warning">)[]>;
          readonly field: TOptional<TString>;
        },
        "severity" | "code" | "message",
        "field"
      >
    >;
    readonly timestamp: TString;
  },
  "ok" | "violations" | "allowed" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    allowed: TypeExports.Boolean(),
    violations: TypeExports.Array(RoboticsSafetyViolationSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyCheckResponse schema. */
export type RoboticsSafetyCheckResponse = Static<typeof RoboticsSafetyCheckResponseSchema>;
