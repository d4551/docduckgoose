/**
 * Robotics safety policy schemas.
 *
 * Defines TypeBox schemas for policy-driven safety envelopes used to
 * validate motion commands across robotics and drone stacks.
 *
 * @shared/schemas/robotics-policy.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { Position3DSchema } from "./navigation.schemas.ts";
import { Vector3DSchema } from "./sensor.schemas.ts";

// Common Bounds

/**
 * Axis bounds schema.
 */
export const RoboticsAxisBoundsSchema: Type.TObject<
  { readonly min: Type.TNumber; readonly max: Type.TNumber },
  "min" | "max",
  never
> = Type.Object(
  {
    min: Type.Number({ description: "Minimum allowed value" }),
    max: Type.Number({ description: "Maximum allowed value" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsAxisBounds schema. */
export type RoboticsAxisBounds = Static<typeof RoboticsAxisBoundsSchema>;

/**
 * Orientation bounds schema (roll, pitch, yaw).
 */
export const RoboticsOrientationBoundsSchema: Type.TObject<
  {
    readonly roll: Type.TObject<
      { readonly min: Type.TNumber; readonly max: Type.TNumber },
      "min" | "max",
      never
    >;
    readonly pitch: Type.TObject<
      { readonly min: Type.TNumber; readonly max: Type.TNumber },
      "min" | "max",
      never
    >;
    readonly yaw: Type.TObject<
      { readonly min: Type.TNumber; readonly max: Type.TNumber },
      "min" | "max",
      never
    >;
  },
  "roll" | "pitch" | "yaw",
  never
> = Type.Object(
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
export const RoboticsJointLimitSchema: Type.TObject<
  {
    readonly index: Type.TInteger;
    readonly min: Type.TNumber;
    readonly max: Type.TNumber;
    readonly maxVelocity: Type.TOptional<Type.TNumber>;
    readonly maxAcceleration: Type.TOptional<Type.TNumber>;
  },
  "index" | "min" | "max",
  Type.InferOptionalKeys<{
    readonly index: Type.TInteger;
    readonly min: Type.TNumber;
    readonly max: Type.TNumber;
    readonly maxVelocity: Type.TOptional<Type.TNumber>;
    readonly maxAcceleration: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    index: Type.Integer({ minimum: 0, description: "Joint index" }),
    min: Type.Number({ description: "Minimum joint position (radians)" }),
    max: Type.Number({ description: "Maximum joint position (radians)" }),
    maxVelocity: Type.Optional(Type.Number({ description: "Max joint velocity (rad/s)" })),
    maxAcceleration: Type.Optional(
      Type.Number({ description: "Max joint acceleration (rad/s^2)" }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsJointLimit schema. */
export type RoboticsJointLimit = Static<typeof RoboticsJointLimitSchema>;

/**
 * Workspace bounds schema.
 */
export const RoboticsWorkspaceBoundsSchema: Type.TObject<
  {
    readonly min: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly max: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly frameId: Type.TOptional<Type.TString>;
  },
  "min" | "max",
  "frameId"
> = Type.Object(
  {
    min: Position3DSchema,
    max: Position3DSchema,
    frameId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsWorkspaceBounds schema. */
export type RoboticsWorkspaceBounds = Static<typeof RoboticsWorkspaceBoundsSchema>;

/**
 * Velocity limit schema.
 */
export const RoboticsVelocityLimitsSchema: Type.TObject<
  {
    readonly linear: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly angular: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
  },
  "linear" | "angular",
  never
> = Type.Object(
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
export const RoboticsKeepoutZoneSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.Optional(Type.String({ minLength: 1 })),
    severity: Type.Union([Type.Literal("block"), Type.Literal("warn")]),
    min: Position3DSchema,
    max: Position3DSchema,
    frameId: Type.Optional(Type.String({ minLength: 1 })),
    note: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsKeepoutZone schema. */
export type RoboticsKeepoutZone = Static<typeof RoboticsKeepoutZoneSchema>;

// Safety Policy

/**
 * Safety policy configuration schema.
 */
export const RoboticsSafetyPolicySchema = Type.Object(
  {
    enabled: Type.Boolean({ description: "Enable policy enforcement" }),
    jointLimits: Type.Array(RoboticsJointLimitSchema, { minItems: 0 }),
    workspaceBounds: Type.Optional(RoboticsWorkspaceBoundsSchema),
    orientationBounds: Type.Optional(RoboticsOrientationBoundsSchema),
    velocityLimits: Type.Optional(RoboticsVelocityLimitsSchema),
    keepoutZones: Type.Optional(Type.Array(RoboticsKeepoutZoneSchema)),
    allowedFrames: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyPolicy schema. */
export type RoboticsSafetyPolicy = Static<typeof RoboticsSafetyPolicySchema>;

// Safety Evaluation

/**
 * Supported robotics command types for safety evaluation.
 */
export const RoboticsCommandTypeSchema: Type.TUnion<
  (Type.TLiteral<"joint"> | Type.TLiteral<"pose"> | Type.TLiteral<"velocity">)[]
> = Type.Union([Type.Literal("joint"), Type.Literal("pose"), Type.Literal("velocity")], {});

/** Inferred type from the RoboticsCommandType schema. */
export type RoboticsCommandType = Static<typeof RoboticsCommandTypeSchema>;

/**
 * Safety violation schema.
 */
export const RoboticsSafetyViolationSchema: Type.TObject<
  {
    readonly code: Type.TString;
    readonly message: Type.TString;
    readonly severity: Type.TUnion<(Type.TLiteral<"error"> | Type.TLiteral<"warning">)[]>;
    readonly field: Type.TOptional<Type.TString>;
  },
  "severity" | "code" | "message",
  "field"
> = Type.Object(
  {
    code: Type.String({ minLength: 1 }),
    message: Type.String({ minLength: 1 }),
    severity: Type.Union([Type.Literal("error"), Type.Literal("warning")]),
    field: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyViolation schema. */
export type RoboticsSafetyViolation = Static<typeof RoboticsSafetyViolationSchema>;

/**
 * Safety check request schema.
 */
export const RoboticsSafetyCheckRequestSchema: Type.TObject<
  {
    readonly commandType: Type.TUnion<
      (Type.TLiteral<"joint"> | Type.TLiteral<"pose"> | Type.TLiteral<"velocity">)[]
    >;
    readonly payload: Type.TObject<Record<string, never>, never, never>;
    readonly deviceId: Type.TOptional<Type.TString>;
  },
  "commandType" | "payload",
  "deviceId"
> = Type.Object(
  {
    commandType: RoboticsCommandTypeSchema,
    payload: JsonObjectSchema,
    deviceId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyCheckRequest schema. */
export type RoboticsSafetyCheckRequest = Static<typeof RoboticsSafetyCheckRequestSchema>;

/**
 * Safety check response schema.
 */
export const RoboticsSafetyCheckResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly allowed: Type.TBoolean;
    readonly violations: Type.TArray<
      Type.TObject<
        {
          readonly code: Type.TString;
          readonly message: Type.TString;
          readonly severity: Type.TUnion<(Type.TLiteral<"error"> | Type.TLiteral<"warning">)[]>;
          readonly field: Type.TOptional<Type.TString>;
        },
        "severity" | "code" | "message",
        "field"
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "violations" | "allowed" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    allowed: Type.Boolean(),
    violations: Type.Array(RoboticsSafetyViolationSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsSafetyCheckResponse schema. */
export type RoboticsSafetyCheckResponse = Static<typeof RoboticsSafetyCheckResponseSchema>;
