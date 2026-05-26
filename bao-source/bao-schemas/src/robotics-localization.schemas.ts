/**
 * Robotics localization schemas.
 *
 * Defines TypeBox schemas for localization status and control.
 *
 * @shared/schemas/robotics-localization.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Localization source schema.
 */
export const RoboticsLocalizationSourceSchema: TObject<
  {
    readonly type: TUnion<
      (TLiteral<"ros2ws"> | TLiteral<"native"> | TLiteral<"simulation"> | TLiteral<"external">)[]
    >;
    readonly topic: TOptional<TString>;
    readonly frameId: TOptional<TString>;
  },
  "type",
  InferOptionalKeys<{
    readonly type: TUnion<
      (TLiteral<"ros2ws"> | TLiteral<"native"> | TLiteral<"simulation"> | TLiteral<"external">)[]
    >;
    readonly topic: TOptional<TString>;
    readonly frameId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Union([
      TypeExports.Literal("ros2ws"),
      TypeExports.Literal("native"),
      TypeExports.Literal("simulation"),
      TypeExports.Literal("external"),
    ]),
    topic: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    frameId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationSource schema. */
export type RoboticsLocalizationSource = Static<typeof RoboticsLocalizationSourceSchema>;

/**
 * Pose schema for localization.
 */
export const RoboticsLocalizationPoseSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
    readonly roll: TNumber;
    readonly pitch: TNumber;
    readonly yaw: TNumber;
    readonly frameId: TOptional<TString>;
  },
  "x" | "y" | "z" | "roll" | "pitch" | "yaw",
  "frameId"
> = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Number(),
    roll: TypeExports.Number(),
    pitch: TypeExports.Number(),
    yaw: TypeExports.Number(),
    frameId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationPose schema. */
export type RoboticsLocalizationPose = Static<typeof RoboticsLocalizationPoseSchema>;

/**
 * Localization status schema.
 */
export const RoboticsLocalizationStatusSchema = TypeExports.Object(
  {
    status: TypeExports.Union([
      TypeExports.Literal("inactive"),
      TypeExports.Literal("active"),
      TypeExports.Literal("stale"),
      TypeExports.Literal("error"),
    ]),
    source: RoboticsLocalizationSourceSchema,
    lastPose: TypeExports.Optional(RoboticsLocalizationPoseSchema),
    lastUpdatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    ageMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    message: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationStatus schema. */
export type RoboticsLocalizationStatus = Static<typeof RoboticsLocalizationStatusSchema>;

/**
 * Localization status response schema.
 */
export const RoboticsLocalizationStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    status: RoboticsLocalizationStatusSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const RoboticsLocalizationControlRequestSchema: TObject<
  {
    readonly deviceId: TString;
    readonly action: TUnion<(TLiteral<"start"> | TLiteral<"stop">)[]>;
    readonly source: TOptional<
      TObject<
        {
          readonly type: TUnion<
            (
              | TLiteral<"ros2ws">
              | TLiteral<"native">
              | TLiteral<"simulation">
              | TLiteral<"external">
            )[]
          >;
          readonly topic: TOptional<TString>;
          readonly frameId: TOptional<TString>;
        },
        "type",
        InferOptionalKeys<{
          readonly type: TUnion<
            (
              | TLiteral<"ros2ws">
              | TLiteral<"native">
              | TLiteral<"simulation">
              | TLiteral<"external">
            )[]
          >;
          readonly topic: TOptional<TString>;
          readonly frameId: TOptional<TString>;
        }>
      >
    >;
  },
  "action" | "deviceId",
  "source"
> = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    action: TypeExports.Union([TypeExports.Literal("start"), TypeExports.Literal("stop")]),
    source: TypeExports.Optional(RoboticsLocalizationSourceSchema),
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
export const RoboticsLocalizationControlResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    status: RoboticsLocalizationStatusSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the RoboticsLocalizationControlResponse schema. */
export type RoboticsLocalizationControlResponse = Static<
  typeof RoboticsLocalizationControlResponseSchema
>;
