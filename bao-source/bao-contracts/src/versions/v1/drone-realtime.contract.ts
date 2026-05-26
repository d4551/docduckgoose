/**
 * Drone Realtime Status Contract v1
 *
 * Defines the versioned contract for the drone realtime status endpoint.
 *
 * @shared/contracts/versions/v1/drone-realtime
 */

import { DroneRealtimeStatusResponseSchema } from "@baohaus/bao-schemas/drone-realtime.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "drone-realtime-status";

/**
 * Request schema for realtime status endpoint.
 */
export const DroneRealtimeStatusRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * Response schema for realtime status endpoint.
 */
export const DroneRealtimeStatusResponseV1: typeof DroneRealtimeStatusResponseSchema =
  DroneRealtimeStatusResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for realtime status endpoint.
 */
export const DroneRealtimeStatusErrorV1 = Type.Object(
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
 * Complete drone realtime status contract definition.
 */
export const DroneRealtimeStatusContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: DroneRealtimeStatusRequestV1,
  response: DroneRealtimeStatusResponseV1,
  errors: DroneRealtimeStatusErrorV1,
} as const satisfies VersionedContractV1;
