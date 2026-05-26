/**
 * AI Device Assist Contract v1
 *
 * Defines the contract for the AI device assistant endpoint.
 *
 * @shared/contracts/versions/v1/ai-device-assist
 */

import {
  AiDeviceAssistRequestSchema,
  AiDeviceAssistResponseSchema,
} from "@baohaus/bao-schemas/ai-device-assist.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "ai-device-assist";

/**
 * Request schema for device assistant prompts.
 */
export const AiDeviceAssistRequestV1: typeof AiDeviceAssistRequestSchema =
  AiDeviceAssistRequestSchema;

/**
 * Response schema for device assistant prompts.
 */
export const AiDeviceAssistResponseV1: typeof AiDeviceAssistResponseSchema =
  AiDeviceAssistResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for device assistant failures.
 */
export const AiDeviceAssistErrorV1 = Type.Object(
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
 * AI device assist contract definition (v1).
 */
export const AiDeviceAssistContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AiDeviceAssistRequestV1,
  response: AiDeviceAssistResponseV1,
  errors: AiDeviceAssistErrorV1,
} as const satisfies VersionedContractV1;
