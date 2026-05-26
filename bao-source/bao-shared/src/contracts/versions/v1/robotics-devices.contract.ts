/**
 * Robotics Device Contracts v1
 *
 * Defines the versioned contracts for robotics device inspection endpoints:
 * - Device detail
 * - Device telemetry
 *
 * These are BFF surfaces consumed by Eden/client consumers and realtime request handlers.
 *
 * @shared/contracts/versions/v1/robotics-devices
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  RoboticsDeviceDetailSchema,
  RoboticsDeviceTelemetryDataSchema,
} from "../../../schemas/robotics-device.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const DETAIL_CONTRACT_NAME = "robotics-device-detail";
/** Contract name for robotics device telemetry retrieval. */
export const TELEMETRY_CONTRACT_NAME = "robotics-device-telemetry";

/**
 * Request schema for device detail.
 */
export const RoboticsDeviceDetailRequestV1: Type.TObject<
  { readonly deviceId: Type.TString },
  "deviceId",
  never
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for device detail.
 */
export const RoboticsDeviceDetailResponseV1 = Type.Object(
  {
    ok: Type.Literal(true),
    data: RoboticsDeviceDetailSchema,
    baseUrl: Type.Optional(Type.String({ minLength: 1 })),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Request schema for device telemetry.
 */
export const RoboticsDeviceTelemetryRequestV1: Type.TObject<
  { readonly deviceId: Type.TString },
  "deviceId",
  never
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for device telemetry.
 */
export const RoboticsDeviceTelemetryResponseV1 = Type.Object(
  {
    ok: Type.Literal(true),
    data: RoboticsDeviceTelemetryDataSchema,
    baseUrl: Type.Optional(Type.String({ minLength: 1 })),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for device detail endpoint.
 */
export const RoboticsDeviceDetailErrorV1 = Type.Object(
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

/**
 * Error schema for device telemetry endpoint.
 */
export const RoboticsDeviceTelemetryErrorV1 = Type.Object(
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

/**
 * Device detail contract definition.
 */
export const RoboticsDeviceDetailContractV1 = {
  version: CONTRACT_VERSION,
  name: DETAIL_CONTRACT_NAME,
  request: RoboticsDeviceDetailRequestV1,
  response: RoboticsDeviceDetailResponseV1,
  errors: RoboticsDeviceDetailErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Device telemetry contract definition.
 */
export const RoboticsDeviceTelemetryContractV1 = {
  version: CONTRACT_VERSION,
  name: TELEMETRY_CONTRACT_NAME,
  request: RoboticsDeviceTelemetryRequestV1,
  response: RoboticsDeviceTelemetryResponseV1,
  errors: RoboticsDeviceTelemetryErrorV1,
} as const satisfies VersionedContractV1;
