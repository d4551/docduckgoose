/**
 * Robotics device detail + telemetry schemas.
 *
 * Defines TypeBox schemas for robotics device inspection endpoints:
 * - Device detail (stable normalized shape)
 * - Device telemetry (normalized payload for UI polling + realtime requests)
 *
 * These schemas intentionally allow additional properties to avoid brittle coupling
 * to bunbuddy-specific fields while keeping a stable contract for clients.
 *
 * @shared/schemas/robotics-device
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Robotics device detail schema (normalized).
 */
export const RoboticsDeviceDetailSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    type: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    protocol: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    connected: Type.Boolean(),
    mode: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    vendor: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    model: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    capabilities: Type.Union([
      Type.Record(Type.String({ minLength: 1 }), Type.Unknown()),
      Type.Null(),
    ]),
    discovery: Type.Union([
      Type.Record(Type.String({ minLength: 1 }), Type.Unknown()),
      Type.Null(),
    ]),
    simulated: Type.Boolean(),
  },
  { additionalProperties: true },
);

/** Inferred type from the RoboticsDeviceDetail schema. */
export type RoboticsDeviceDetail = Static<typeof RoboticsDeviceDetailSchema>;

/**
 * Pose telemetry schema (minimal stable shape).
 */
export const RoboticsDevicePoseTelemetrySchema = Type.Object(
  {
    x: Type.Number(),
    y: Type.Number(),
    z: Type.Number(),
    roll: Type.Optional(Type.Number()),
    pitch: Type.Optional(Type.Number()),
    yaw: Type.Optional(Type.Number()),
    quaternion: Type.Optional(
      Type.Object(
        {
          x: Type.Number(),
          y: Type.Number(),
          z: Type.Number(),
          w: Type.Number(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: true },
);

/** Inferred type from the RoboticsDevicePoseTelemetry schema. */
export type RoboticsDevicePoseTelemetry = Static<typeof RoboticsDevicePoseTelemetrySchema>;

/**
 * Gripper telemetry schema (minimal stable shape).
 */
export const RoboticsDeviceGripperTelemetrySchema: Type.TObject<
  {
    readonly width: Type.TNumber;
    readonly force: Type.TOptional<Type.TNumber>;
    readonly state: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"open">
          | Type.TLiteral<"closed">
          | Type.TLiteral<"holding">
          | Type.TLiteral<"moving">
        )[]
      >
    >;
  },
  "width",
  Type.InferOptionalKeys<{
    readonly width: Type.TNumber;
    readonly force: Type.TOptional<Type.TNumber>;
    readonly state: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"open">
          | Type.TLiteral<"closed">
          | Type.TLiteral<"holding">
          | Type.TLiteral<"moving">
        )[]
      >
    >;
  }>
> = Type.Object(
  {
    width: Type.Number(),
    force: Type.Optional(Type.Number()),
    state: Type.Optional(
      Type.Union([
        Type.Literal("open"),
        Type.Literal("closed"),
        Type.Literal("holding"),
        Type.Literal("moving"),
      ]),
    ),
  },
  { additionalProperties: true },
);

/** Inferred type from the RoboticsDeviceGripperTelemetry schema. */
export type RoboticsDeviceGripperTelemetry = Static<typeof RoboticsDeviceGripperTelemetrySchema>;

/**
 * Device telemetry payload schema (bunbuddy-aligned).
 *
 * This is a "best-effort" normalized view that supports:
 * - bunbuddy payloads (jointTargets/jointPositions/pose/gripper)
 * - UI-friendly payloads (joints arrays, status, connected, etc.)
 */
export const RoboticsDeviceTelemetryPayloadSchema = Type.Object(
  {
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(Type.String({ minLength: 1 })),
    connected: Type.Optional(Type.Boolean()),
    joints: Type.Optional(
      Type.Array(
        Type.Object(
          {
            index: Type.Integer({ minimum: 0 }),
            name: Type.Optional(Type.String({ minLength: 1 })),
            position: Type.Number(),
            velocity: Type.Optional(Type.Number()),
            effort: Type.Optional(Type.Number()),
          },
          { additionalProperties: true },
        ),
      ),
    ),
    jointTargets: Type.Optional(Type.Array(Type.Number())),
    jointPositions: Type.Optional(Type.Array(Type.Number())),
    pose: Type.Optional(RoboticsDevicePoseTelemetrySchema),
    endEffectorPose: Type.Optional(RoboticsDevicePoseTelemetrySchema),
    tcp: Type.Optional(RoboticsDevicePoseTelemetrySchema),
    gripper: Type.Optional(RoboticsDeviceGripperTelemetrySchema),
    endEffector: Type.Optional(RoboticsDeviceGripperTelemetrySchema),
    lastCommand: Type.Optional(Type.String({ minLength: 1 })),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: true },
);

/** Inferred type from the RoboticsDeviceTelemetryPayload schema. */
export type RoboticsDeviceTelemetryPayload = Static<typeof RoboticsDeviceTelemetryPayloadSchema>;

/**
 * Normalized telemetry data returned by server APIs.
 *
 * Requires a stable `timestamp` field while allowing additional payload keys.
 */
export const RoboticsDeviceTelemetryDataSchema = Type.Intersect(
  [
    RoboticsDeviceTelemetryPayloadSchema,
    Type.Object(
      {
        timestamp: Type.String({ minLength: 1 }),
      },
      { additionalProperties: true },
    ),
  ],
  {},
);

/** Inferred type from the RoboticsDeviceTelemetryData schema. */
export type RoboticsDeviceTelemetryData = Static<typeof RoboticsDeviceTelemetryDataSchema>;
