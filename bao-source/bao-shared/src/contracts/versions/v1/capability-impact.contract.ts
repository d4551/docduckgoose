/**
 * Capability Impact Contract v1
 *
 * Defines the versioned contract for the capability impact summary endpoint.
 *
 * @shared/contracts/versions/v1/capability-impact
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  CapabilityImpactRefreshRequestSchema,
  CapabilityImpactRefreshResponseSchema,
  CapabilityImpactRequestSchema,
  CapabilityImpactResponseSchema,
} from "../../../schemas/capability-impact.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for impact summary endpoint.
 */
export const CONTRACT_NAME = "capability-impact";

/**
 * Contract name for impact refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "capability-impact-refresh";

/**
 * Request schema for capability impact endpoint.
 */
export const CapabilityImpactRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = CapabilityImpactRequestSchema;

/**
 * Response schema for capability impact endpoint.
 */
export const CapabilityImpactResponseV1: typeof CapabilityImpactResponseSchema =
  CapabilityImpactResponseSchema;

/**
 * Request schema for capability impact refresh endpoint.
 */
export const CapabilityImpactRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = CapabilityImpactRefreshRequestSchema;

/**
 * Response schema for capability impact refresh endpoint.
 */
export const CapabilityImpactRefreshResponseV1: typeof CapabilityImpactRefreshResponseSchema =
  CapabilityImpactRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for capability impact failures.
 */
export const CapabilityImpactErrorV1 = Type.Object(
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
 * Error schema for capability impact refresh failures.
 */
export const CapabilityImpactRefreshErrorV1 = Type.Object(
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
 * Capability impact contract definition (v1).
 */
export const CapabilityImpactContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityImpactRequestV1,
  response: CapabilityImpactResponseV1,
  errors: CapabilityImpactErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Capability impact refresh contract definition (v1).
 */
export const CapabilityImpactRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityImpactRefreshRequestV1,
  response: CapabilityImpactRefreshResponseV1,
  errors: CapabilityImpactRefreshErrorV1,
} as const satisfies VersionedContractV1;
