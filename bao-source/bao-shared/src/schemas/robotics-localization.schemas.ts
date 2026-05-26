/**
 * Robotics localization schemas.
 *
 * Defines TypeBox schemas for localization status and control.
 *
 * @shared/schemas/robotics-localization.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Localization source schema.
 */
export const RoboticsLocalizationSourceSchema: Type.TObject<
  {
    readonly type: Type.TUnion<
      (
        | Type.TLiteral<"ros2ws">
        | Type.TLiteral<"native">
        | Type.TLiteral<"simulation">
        | Type.TLiteral<"external">
      )[]
    >;
    readonly topic: Type.TOptional<Type.TString>;
    readonly frameId: Type.TOptional<Type.TString>;
  },
  "type",
  Type.InferOptionalKeys<{
    readonly type: Type.TUnion<
      (
        | Type.TLiteral<"ros2ws">
        | Type.TLiteral<"native">
        | Type.TLiteral<"simulation">
        | Type.TLiteral<"external">
      )[]
    >;
    readonly topic: Type.TOptional<Type.TString>;
    readonly frameId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    type: Type.Union([
      Type.Literal("ros2ws"),
      Type.Literal("native"),
      Type.Literal("simulation"),
      Type.Literal("external"),
    ]),
    topic: Type.Optional(Type.String({ minLength: 1 })),
    frameId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationSource schema. */
export type RoboticsLocalizationSource = Static<typeof RoboticsLocalizationSourceSchema>;

/**
 * Pose schema for localization.
 */
export const RoboticsLocalizationPoseSchema: Type.TObject<
  {
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TNumber;
    readonly roll: Type.TNumber;
    readonly pitch: Type.TNumber;
    readonly yaw: Type.TNumber;
    readonly frameId: Type.TOptional<Type.TString>;
  },
  "x" | "y" | "z" | "roll" | "pitch" | "yaw",
  "frameId"
> = Type.Object(
  {
    x: Type.Number(),
    y: Type.Number(),
    z: Type.Number(),
    roll: Type.Number(),
    pitch: Type.Number(),
    yaw: Type.Number(),
    frameId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationPose schema. */
export type RoboticsLocalizationPose = Static<typeof RoboticsLocalizationPoseSchema>;

/**
 * Localization status schema.
 */
export const RoboticsLocalizationStatusSchema = Type.Object(
  {
    status: Type.Union([
      Type.Literal("inactive"),
      Type.Literal("active"),
      Type.Literal("stale"),
      Type.Literal("error"),
    ]),
    source: RoboticsLocalizationSourceSchema,
    lastPose: Type.Optional(RoboticsLocalizationPoseSchema),
    lastUpdatedAt: Type.Optional(Type.String({ format: "date-time" })),
    ageMs: Type.Optional(Type.Number({ minimum: 0 })),
    message: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationStatus schema. */
export type RoboticsLocalizationStatus = Static<typeof RoboticsLocalizationStatusSchema>;

/**
 * Localization status response schema.
 */
export const RoboticsLocalizationStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    status: RoboticsLocalizationStatusSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationStatusResponse schema. */
export type RoboticsLocalizationStatusResponse = Static<
  typeof RoboticsLocalizationStatusResponseSchema
>;

/**
 * Localization control request schema.
 */
export const RoboticsLocalizationControlRequestSchema: Type.TObject<
  {
    readonly deviceId: Type.TString;
    readonly action: Type.TUnion<(Type.TLiteral<"start"> | Type.TLiteral<"stop">)[]>;
    readonly source: Type.TOptional<
      Type.TObject<
        {
          readonly type: Type.TUnion<
            (
              | Type.TLiteral<"ros2ws">
              | Type.TLiteral<"native">
              | Type.TLiteral<"simulation">
              | Type.TLiteral<"external">
            )[]
          >;
          readonly topic: Type.TOptional<Type.TString>;
          readonly frameId: Type.TOptional<Type.TString>;
        },
        "type",
        Type.InferOptionalKeys<{
          readonly type: Type.TUnion<
            (
              | Type.TLiteral<"ros2ws">
              | Type.TLiteral<"native">
              | Type.TLiteral<"simulation">
              | Type.TLiteral<"external">
            )[]
          >;
          readonly topic: Type.TOptional<Type.TString>;
          readonly frameId: Type.TOptional<Type.TString>;
        }>
      >
    >;
  },
  "action" | "deviceId",
  "source"
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    action: Type.Union([Type.Literal("start"), Type.Literal("stop")]),
    source: Type.Optional(RoboticsLocalizationSourceSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationControlRequest schema. */
export type RoboticsLocalizationControlRequest = Static<
  typeof RoboticsLocalizationControlRequestSchema
>;

/**
 * Localization control response schema.
 */
export const RoboticsLocalizationControlResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    status: RoboticsLocalizationStatusSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationControlResponse schema. */
export type RoboticsLocalizationControlResponse = Static<
  typeof RoboticsLocalizationControlResponseSchema
>;
