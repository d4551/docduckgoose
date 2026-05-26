/**
 * Chat Tools Contract v1
 *
 * Defines the versioned contract for chat tool discovery.
 *
 * @shared/contracts/versions/v1/chat-tools
 */

import {
  ChatToolsListRequestSchema,
  ChatToolsListResponseSchema,
} from "@baohaus/bao-schemas/chat.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "chat-tools";

/**
 * Request schema for chat tools list endpoint.
 */
export const ChatToolsListRequestV1: Type.TObject<
  { readonly limit: Type.TOptional<Type.TInteger>; readonly cursor: Type.TOptional<Type.TString> },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly cursor: Type.TOptional<Type.TString>;
  }>
> = ChatToolsListRequestSchema;

/**
 * Response schema for chat tools list endpoint.
 */
export const ChatToolsListResponseV1: typeof ChatToolsListResponseSchema =
  ChatToolsListResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for chat tools list failures.
 */
export const ChatToolsListErrorV1 = Type.Object(
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
 * Chat tools list contract definition (v1).
 */
export const ChatToolsListContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ChatToolsListRequestV1,
  response: ChatToolsListResponseV1,
  errors: ChatToolsListErrorV1,
} as const satisfies VersionedContractV1;
