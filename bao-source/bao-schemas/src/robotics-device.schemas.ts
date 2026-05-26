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

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Robotics device detail schema (normalized).
 */
export const RoboticsDeviceDetailSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    type: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    protocol: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    connected: TypeExports.Boolean(),
    mode: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    vendor: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    model: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    capabilities: TypeExports.Union([
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.Unknown()),
      TypeExports.Null(),
    ]),
    discovery: TypeExports.Union([
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.Unknown()),
      TypeExports.Null(),
    ]),
    simulated: TypeExports.Boolean(),
  },
  { additionalProperties: true },
);

/** Inferred type from the RoboticsDeviceDetail schema. */
export type RoboticsDeviceDetail = Static<typeof RoboticsDeviceDetailSchema>;

/**
 * Pose telemetry schema (minimal stable shape).
 */
export const RoboticsDevicePoseTelemetrySchema = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Number(),
    roll: TypeExports.Optional(TypeExports.Number()),
    pitch: TypeExports.Optional(TypeExports.Number()),
    yaw: TypeExports.Optional(TypeExports.Number()),
    quaternion: TypeExports.Optional(
      TypeExports.Object(
        {
          x: TypeExports.Number(),
          y: TypeExports.Number(),
          z: TypeExports.Number(),
          w: TypeExports.Number(),
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
export const RoboticsDeviceGripperTelemetrySchema: TObject<
  {
    readonly width: TNumber;
    readonly force: TOptional<TNumber>;
    readonly state: TOptional<
      TUnion<(TLiteral<"open"> | TLiteral<"closed"> | TLiteral<"holding"> | TLiteral<"moving">)[]>
    >;
  },
  "width",
  InferOptionalKeys<{
    readonly width: TNumber;
    readonly force: TOptional<TNumber>;
    readonly state: TOptional<
      TUnion<(TLiteral<"open"> | TLiteral<"closed"> | TLiteral<"holding"> | TLiteral<"moving">)[]>
    >;
  }>
> = TypeExports.Object(
  {
    width: TypeExports.Number(),
    force: TypeExports.Optional(TypeExports.Number()),
    state: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("open"),
        TypeExports.Literal("closed"),
        TypeExports.Literal("holding"),
        TypeExports.Literal("moving"),
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
export const RoboticsDeviceTelemetryPayloadSchema = TypeExports.Object(
  {
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    status: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    connected: TypeExports.Optional(TypeExports.Boolean()),
    joints: TypeExports.Optional(
      TypeExports.Array(
        TypeExports.Object(
          {
            index: TypeExports.Integer({ minimum: 0 }),
            name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
            position: TypeExports.Number(),
            velocity: TypeExports.Optional(TypeExports.Number()),
            effort: TypeExports.Optional(TypeExports.Number()),
          },
          { additionalProperties: true },
        ),
      ),
    ),
    jointTargets: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    jointPositions: TypeExports.Optional(TypeExports.Array(TypeExports.Number())),
    pose: TypeExports.Optional(RoboticsDevicePoseTelemetrySchema),
    endEffectorPose: TypeExports.Optional(RoboticsDevicePoseTelemetrySchema),
    tcp: TypeExports.Optional(RoboticsDevicePoseTelemetrySchema),
    gripper: TypeExports.Optional(RoboticsDeviceGripperTelemetrySchema),
    endEffector: TypeExports.Optional(RoboticsDeviceGripperTelemetrySchema),
    lastCommand: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
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
export const RoboticsDeviceTelemetryDataSchema = TypeExports.Intersect(
  [
    RoboticsDeviceTelemetryPayloadSchema,
    TypeExports.Object(
      {
        timestamp: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: true },
    ),
  ],
  {},
);

/** Inferred type from the RoboticsDeviceTelemetryData schema. */
export type RoboticsDeviceTelemetryData = Static<typeof RoboticsDeviceTelemetryDataSchema>;
