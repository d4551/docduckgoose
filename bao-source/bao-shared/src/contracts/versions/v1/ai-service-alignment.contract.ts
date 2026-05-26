/**
 * AI Service Alignment Contracts v1
 *
 * Defines the versioned contracts for AI service alignment map and refresh endpoints.
 *
 * @shared/contracts/versions/v1/ai-service-alignment
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  AiServiceAlignmentMapRequestSchema,
  AiServiceAlignmentMapResponseSchema,
  AiServiceAlignmentRefreshRequestSchema,
  AiServiceAlignmentRefreshResponseSchema,
} from "../../../schemas/ai-service-alignment.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract version alias for shared exports.
 */
export const AI_SERVICE_ALIGNMENT_CONTRACT_VERSION: "1.0.0" = CONTRACT_VERSION;

/**
 * Contract name for the alignment map endpoint.
 */
export const MAP_CONTRACT_NAME = "ai-service-alignment-map";

/**
 * Contract name alias for shared exports (map).
 */
export const AI_SERVICE_ALIGNMENT_MAP_CONTRACT_NAME: "ai-service-alignment-map" = MAP_CONTRACT_NAME;

/**
 * Contract name for the alignment refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "ai-service-alignment-refresh";

/**
 * Contract name alias for shared exports (refresh).
 */
export const AI_SERVICE_ALIGNMENT_REFRESH_CONTRACT_NAME: "ai-service-alignment-refresh" =
  REFRESH_CONTRACT_NAME;

/**
 * Request schema for AI service alignment map endpoint.
 */
export const AiServiceAlignmentMapRequestV1: Type.TObject<
  {
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  }>
> = AiServiceAlignmentMapRequestSchema;

/**
 * Response schema for AI service alignment map endpoint.
 */
export const AiServiceAlignmentMapResponseV1: typeof AiServiceAlignmentMapResponseSchema =
  AiServiceAlignmentMapResponseSchema;

/**
 * Request schema for AI service alignment refresh endpoint.
 */
export const AiServiceAlignmentRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = AiServiceAlignmentRefreshRequestSchema;

/**
 * Response schema for AI service alignment refresh endpoint.
 */
export const AiServiceAlignmentRefreshResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "queued" | "jobId" | "refreshed",
  "correlationId"
> = AiServiceAlignmentRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for AI service alignment map failures.
 */
export const AiServiceAlignmentMapErrorV1 = Type.Object(
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
 * Error schema for AI service alignment refresh failures.
 */
export const AiServiceAlignmentRefreshErrorV1 = Type.Object(
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
 * AI service alignment map contract definition (v1).
 */
export const AiServiceAlignmentMapContractV1: VersionedContractV1 = {
  name: MAP_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AiServiceAlignmentMapRequestV1,
  response: AiServiceAlignmentMapResponseV1,
  errors: AiServiceAlignmentMapErrorV1,
};

/**
 * AI service alignment refresh contract definition (v1).
 */
export const AiServiceAlignmentRefreshContractV1: VersionedContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AiServiceAlignmentRefreshRequestV1,
  response: AiServiceAlignmentRefreshResponseV1,
  errors: AiServiceAlignmentRefreshErrorV1,
};
