/**
 * AI Device Assist Config Contract v1
 *
 * Defines the contract for the AI device assistant config snapshot endpoint.
 *
 * @shared/contracts/versions/v1/ai-device-assist-config
 */

import { AiDeviceAssistConfigResponseSchema } from "@baohaus/bao-schemas/ai-device-assist-config.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "ai-device-assist-config";

/**
 * Request schema for the device assistant config endpoint.
 */
export const AiDeviceAssistConfigRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * Response schema for the device assistant config endpoint.
 */
export const AiDeviceAssistConfigResponseV1: typeof AiDeviceAssistConfigResponseSchema =
  AiDeviceAssistConfigResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for device assistant config failures.
 */
export const AiDeviceAssistConfigErrorV1 = Type.Object(
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
 * AI device assist config contract definition (v1).
 */
export const AiDeviceAssistConfigContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AiDeviceAssistConfigRequestV1,
  response: AiDeviceAssistConfigResponseV1,
  errors: AiDeviceAssistConfigErrorV1,
} as const satisfies VersionedContractV1;
