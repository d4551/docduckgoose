/**
 * Driver Registry Contract v1
 *
 * Defines the versioned contract for the driver registry endpoint.
 *
 * @shared/contracts/versions/v1/driver-registry
 */

import { DriverRegistryResponseSchema } from "@baohaus/bao-schemas/driver-registry.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "driver-registry";

/**
 * Request schema for driver registry list endpoint.
 */
export const DriverRegistryRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Response schema for driver registry list endpoint.
 */
export const DriverRegistryResponseV1: typeof DriverRegistryResponseSchema =
  DriverRegistryResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for driver registry list failures.
 */
export const DriverRegistryErrorV1 = Type.Object(
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
 * Driver registry contract definition (v1).
 */
export const DriverRegistryContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: DriverRegistryRequestV1,
  response: DriverRegistryResponseV1,
  errors: DriverRegistryErrorV1,
} as const satisfies VersionedContractV1;
