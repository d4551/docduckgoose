/**
 * Hardware Summary Contract v1
 *
 * Defines the versioned contract for the aggregated hardware summary endpoint.
 * This is a BFF surface used by the Hardware Control Panel UI.
 *
 * @shared/contracts/versions/v1/hardware-summary
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  HardwareSummaryRequestSchema,
  HardwareSummaryResponseSchema,
} from "../../../schemas/hardware-summary.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/** Identity passthrough — $id removed per naming convention compliance. */

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "hardware-summary";

/**
 * Request schema for the hardware summary endpoint (query parameters).
 */
export const HardwareSummaryRequestV1: Type.TObject<
  { readonly timeoutMs: Type.TOptional<Type.TInteger> },
  never,
  "timeoutMs"
> = HardwareSummaryRequestSchema;

/**
 * Response schema for the hardware summary endpoint.
 */
export const HardwareSummaryResponseV1: typeof HardwareSummaryResponseSchema =
  HardwareSummaryResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for hardware summary failures.
 */
export const HardwareSummaryErrorV1 = Type.Object(
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
  {},
);

/**
 * Complete hardware summary contract definition.
 */
export const HardwareSummaryContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: HardwareSummaryRequestV1,
  response: HardwareSummaryResponseV1,
  errors: HardwareSummaryErrorV1,
} as const satisfies VersionedContractV1;
