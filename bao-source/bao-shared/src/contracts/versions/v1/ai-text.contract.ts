/**
 * AI text generation contract v1.
 *
 * Defines the versioned contract for:
 * - `POST /api/v1/ai/text`
 * - `POST /api/v1/ai/text/stream`
 *
 * @shared/contracts/versions/v1/ai-text
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  AiTextGenerateRequestSchema,
  AiTextGenerateSuccessResponseSchema,
  AiTextStreamEventSchema,
} from "../../../schemas/ai-text.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "ai-text";

/**
 * Request schema for AI text generation.
 */
export const AiTextGenerateRequestV1: typeof AiTextGenerateRequestSchema =
  AiTextGenerateRequestSchema;

/**
 * Response schema for AI text generation (success envelope only).
 */
export const AiTextGenerateResponseV1: typeof AiTextGenerateSuccessResponseSchema =
  AiTextGenerateSuccessResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for AI text generation failures.
 */
export const AiTextGenerateErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
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
 * AI text generation contract definition (v1).
 */
export const AiTextGenerateContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AiTextGenerateRequestV1,
  response: AiTextGenerateResponseV1,
  errors: AiTextGenerateErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract name for AI text streaming endpoint.
 */
export const AI_TEXT_STREAM_CONTRACT_NAME = "ai-text-stream";

/**
 * Request schema for AI text streaming.
 */
export const AiTextStreamRequestV1: typeof AiTextGenerateRequestSchema =
  AiTextGenerateRequestSchema;

/**
 * Streaming response schema.
 *
 * Supports SSE event payloads and plain text chunks for non-SSE mode.
 */
export const AiTextStreamResponseV1 = Type.Union(
  [
    AiTextStreamEventSchema,
    Type.String({ description: "Plain text stream chunk (non-SSE mode)." }),
  ],
  {},
);

/**
 * Error schema for AI text streaming failures.
 */
export const AiTextStreamErrorV1: typeof AiTextGenerateErrorV1 = AiTextGenerateErrorV1;

/**
 * AI text streaming contract definition (v1).
 */
export const AiTextStreamContractV1 = {
  name: AI_TEXT_STREAM_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AiTextStreamRequestV1,
  response: AiTextStreamResponseV1,
  errors: AiTextStreamErrorV1,
} as const satisfies VersionedContractV1;
