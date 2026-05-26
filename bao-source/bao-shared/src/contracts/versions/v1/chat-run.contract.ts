/**
 * Chat Run Contract v1
 *
 * Defines the versioned contract for chat run orchestration.
 *
 * @shared/contracts/versions/v1/chat-run
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { ChatRunRequestSchema, ChatRunResponseSchema } from "../../../schemas/chat.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "chat-run";

/**
 * Request schema for chat run endpoint.
 */
export const ChatRunRequestV1: typeof ChatRunRequestSchema = ChatRunRequestSchema;

/**
 * Response schema for chat run endpoint.
 */
export const ChatRunResponseV1: typeof ChatRunResponseSchema = ChatRunResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for chat run failures.
 */
export const ChatRunErrorV1 = Type.Object(
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
 * Chat run contract definition (v1).
 */
export const ChatRunContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ChatRunRequestV1,
  response: ChatRunResponseV1,
  errors: ChatRunErrorV1,
} as const satisfies VersionedContractV1;
