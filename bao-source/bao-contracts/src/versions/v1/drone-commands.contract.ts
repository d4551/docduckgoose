/**
 * Drone command operation contracts v1.
 *
 * Defines the versioned contracts for drone device command operations
 * (connect, disconnect, arm, disarm, takeoff, land, move, emergency-stop, set-mode).
 *
 * @shared/contracts/versions/v1/drone-commands
 */

import { DroneMovementCommandSchema } from "@baohaus/bao-schemas/drone-ops.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version identifier. */
export const CONTRACT_VERSION = "1.0.0";

// Shared schemas

/** Device ID path parameter schema. */
const DeviceIdParamSchema = Type.Object(
  { deviceId: Type.String({ minLength: 1, description: "Vehicle/device identifier" }) },
  {},
);

/** Takeoff request body schema. */
const TakeoffRequestSchema = Type.Object(
  {
    altitude: Type.Number({ minimum: 0.5, maximum: 500, description: "Target altitude in meters" }),
  },
  {},
);

/** Empty request body schema for command endpoints that only use path params. */
const EmptyCommandRequestSchema = Type.Object({}, { additionalProperties: false });

/** Set-mode request body schema. */
const SetModeRequestSchema = Type.Object(
  { mode: Type.String({ minLength: 1, description: "Target flight mode name" }) },
  {},
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

/** Move command success response schema. */
const MoveCommandSuccessResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Unknown({ description: "BunBuddy response payload" }),
    timestamp: Type.String({ format: "date-time" }),
  },
  {},
);

/** Inferred device ID path parameter type for drone command endpoints. */
export type DroneCommandDeviceIdParam = Static<typeof DeviceIdParamSchema>;
/** Inferred takeoff request body type (altitude in meters). */
export type DroneCommandTakeoffRequest = Static<typeof TakeoffRequestSchema>;
/** Inferred set-mode request body type (target flight mode name). */
export type DroneCommandSetModeRequest = Static<typeof SetModeRequestSchema>;
/** Inferred generic success response type for drone command endpoints. */
export type DroneCommandSuccessResponse = Static<typeof CommandSuccessResponseSchema>;

// Error envelopes

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Standard error response map for all drone command endpoints. */
export const DroneCommandErrorsV1 = Type.Object(
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
export const DroneConnectContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-connect",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Disconnect device contract. */
export const DroneDisconnectContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-disconnect",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Arm device contract. */
export const DroneArmContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-arm",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Disarm device contract. */
export const DroneDisarmContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-disarm",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Takeoff contract. */
export const DroneTakeoffContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-takeoff",
  params: DeviceIdParamSchema,
  request: TakeoffRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Land contract. */
export const DroneLandContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-land",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Move command contract. */
export const DroneMoveContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-move",
  params: DeviceIdParamSchema,
  request: DroneMovementCommandSchema,
  response: MoveCommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Emergency stop contract. */
export const DroneEmergencyStopContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-emergency-stop",
  params: DeviceIdParamSchema,
  request: EmptyCommandRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;

/** Set flight mode contract. */
export const DroneSetModeContractV1 = {
  version: CONTRACT_VERSION,
  name: "drone-set-mode",
  params: DeviceIdParamSchema,
  request: SetModeRequestSchema,
  response: CommandSuccessResponseSchema,
  errors: DroneCommandErrorsV1,
} as const satisfies VersionedContractV1;
