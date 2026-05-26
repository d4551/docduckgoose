/**
 * Drone Summary Contract v1
 *
 * Defines the versioned contract for the aggregated drone summary endpoint.
 * This is a BFF surface used by drone operations dashboards.
 *
 * @shared/contracts/versions/v1/drone-summary
 */

import {
  DroneSummaryRequestSchema,
  DroneSummaryResponseSchema,
} from "@baohaus/bao-schemas/drone-summary.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "drone-summary";

/**
 * Request schema for drone summary endpoint.
 */
export const DroneSummaryRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly includeRealtime: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddySnapshot: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly includeRealtime: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddySnapshot: Type.TOptional<Type.TBoolean>;
  }>
> = DroneSummaryRequestSchema;

/**
 * Response schema for drone summary endpoint.
 */
export const DroneSummaryResponseV1: typeof DroneSummaryResponseSchema = DroneSummaryResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for drone summary endpoint.
 */
export const DroneSummaryErrorV1 = Type.Object(
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
 * Complete drone summary contract definition.
 */
export const DroneSummaryContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: DroneSummaryRequestV1,
  response: DroneSummaryResponseV1,
  errors: DroneSummaryErrorV1,
} as const satisfies VersionedContractV1;
