/**
 * Robotics command operation contracts v1.
 *
 * Defines the versioned contracts for robotics device command operations
 * (connect, disconnect, home, emergency-stop, joint, pose, gripper).
 *
 * @shared/contracts/versions/v1/robotics-commands
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version identifier. */
export const CONTRACT_VERSION = "1.0.0";

// Shared schemas

/** Device ID path parameter schema. */
const DeviceIdParamSchema = Type.Object(
  { deviceId: Type.String({ minLength: 1, description: "Robotics device identifier" }) },
  {},
);

/** Empty request body schema for command endpoints that only use path params. */
const EmptyCommandRequestSchema = Type.Object({}, { additionalProperties: false });

/** Joint command request body schema. */
const JointCommandRequestSchema = Type.Object(
  {
    jointTargets: Type.Array(Type.Number(), { description: "Target joint positions" }),
    jointPositions: Type.Optional(
      Type.Array(Type.Number(), { description: "Current joint positions for validation" }),
    ),
  },
  { additionalProperties: true },
);

/** Pose command request body schema. */
const PoseCommandRequestSchema = Type.Object(
  {
    x: Type.Number({ description: "Target X position" }),
    y: Type.Number({ description: "Target Y position" }),
    z: Type.Number({ description: "Target Z position" }),
    roll: Type.Optional(Type.Number({ description: "Roll angle (radians)" })),
    pitch: Type.Optional(Type.Number({ description: "Pitch angle (radians)" })),
    yaw: Type.Optional(Type.Number({ description: "Yaw angle (radians)" })),
  },
  { additionalProperties: true },
);

/** Gripper command request body schema. */
const GripperCommandRequestSchema = Type.Object(
  {
    width: Type.Number({ description: "Gripper width (meters)" }),
    force: Type.Optional(Type.Number({ description: "Grip force (newtons)" })),
    state: Type.Optional(
      Type.Union([Type.Literal("open"), Type.Literal("closed"), Type.Literal("holding")], {
        description: "Target gripper state",
      }),
    ),
  },
  { additionalProperties: true },
);

/** Generic command success response schema. */
const CommandSuccessResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Unknown({ description: "BunBuddy response payload" }),
    timestamp: Type.String({ format: "date-time" }),
  },
  {},
);

/** Inferred device ID path parameter type for robotics command endpoints. */
export type RoboticsCommandDeviceIdParam = Static<typeof DeviceIdParamSchema>;
/** Inferred joint command request body type (target joint positions). */
export type RoboticsCommandJointRequest = Static<typeof JointCommandRequestSchema>;
/** Inferred pose command request body type (x, y, z, roll, pitch, yaw). */
export type RoboticsCommandPoseRequest = Static<typeof PoseCommandRequestSchema>;
/** Inferred gripper command request body type (width, force, state). */
export type RoboticsCommandGripperRequest = Static<typeof GripperCommandRequestSchema>;
/** Inferred generic success response type for robotics command endpoints. */
export type RoboticsCommandSuccessResponse = Static<typeof CommandSuccessResponseSchema>;

// Error envelopes

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Standard error response map for all robotics command endpoints. */
export const RoboticsCommandErrorsV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

// Contract definitions

/** Connect device contract. */
export const RoboticsConnectContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-connect",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Disconnect device contract. */
export const RoboticsDisconnectContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-disconnect",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Home command contract. */
export const RoboticsHomeContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-home",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Emergency stop contract. */
export const RoboticsEmergencyStopContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-emergency-stop",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Joint command contract. */
export const RoboticsJointContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-joint",
  params: DeviceIdParamSchema,
  request: JointCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Pose command contract. */
export const RoboticsPoseContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-pose",
  params: DeviceIdParamSchema,
  request: PoseCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Gripper command contract. */
export const RoboticsGripperContractV1 = {
  version: CONTRACT_VERSION,
  name: "robotics-gripper",
  params: DeviceIdParamSchema,
  request: GripperCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: RoboticsCommandErrorsV1,
} as const satisfies VersionedContractV1;
