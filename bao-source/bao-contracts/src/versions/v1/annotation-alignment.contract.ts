/**
 * Annotation Alignment Contracts v1
 *
 * Defines the versioned contracts for annotation alignment map and refresh endpoints.
 *
 * @shared/contracts/versions/v1/annotation-alignment
 */

import {
  AnnotationAlignmentMapRequestSchema,
  AnnotationAlignmentMapResponseSchema,
  AnnotationAlignmentRefreshRequestSchema,
  AnnotationAlignmentRefreshResponseSchema,
} from "@baohaus/bao-schemas/annotation-alignment.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract version alias for shared exports.
 */
export const ANNOTATION_ALIGNMENT_CONTRACT_VERSION: "1.0.0" = CONTRACT_VERSION;

/**
 * Contract name for the alignment map endpoint.
 */
export const MAP_CONTRACT_NAME = "annotation-alignment-map";

/**
 * Contract name alias for shared exports (map).
 */
export const ANNOTATION_ALIGNMENT_MAP_CONTRACT_NAME: "annotation-alignment-map" = MAP_CONTRACT_NAME;

/**
 * Contract name for the alignment refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "annotation-alignment-refresh";

/**
 * Contract name alias for shared exports (refresh).
 */
export const ANNOTATION_ALIGNMENT_REFRESH_CONTRACT_NAME: "annotation-alignment-refresh" =
  REFRESH_CONTRACT_NAME;

/**
 * Request schema for annotation alignment map endpoint.
 */
export const AnnotationAlignmentMapRequestV1: Type.TObject<
  {
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  }>
> = AnnotationAlignmentMapRequestSchema;

/**
 * Response schema for annotation alignment map endpoint.
 */
export const AnnotationAlignmentMapResponseV1: typeof AnnotationAlignmentMapResponseSchema =
  AnnotationAlignmentMapResponseSchema;

/**
 * Request schema for annotation alignment refresh endpoint.
 */
export const AnnotationAlignmentRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = AnnotationAlignmentRefreshRequestSchema;

/**
 * Response schema for annotation alignment refresh endpoint.
 */
export const AnnotationAlignmentRefreshResponseV1: Type.TObject<
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
> = AnnotationAlignmentRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for annotation alignment map failures.
 */
export const AnnotationAlignmentMapErrorV1 = Type.Object(
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
 * Error schema for annotation alignment refresh failures.
 */
export const AnnotationAlignmentRefreshErrorV1 = Type.Object(
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
 * Annotation alignment map contract definition (v1).
 */
export const AnnotationAlignmentMapContractV1 = {
  name: MAP_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AnnotationAlignmentMapRequestV1,
  response: AnnotationAlignmentMapResponseV1,
  errors: AnnotationAlignmentMapErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Annotation alignment refresh contract definition (v1).
 */
export const AnnotationAlignmentRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AnnotationAlignmentRefreshRequestV1,
  response: AnnotationAlignmentRefreshResponseV1,
  errors: AnnotationAlignmentRefreshErrorV1,
} as const satisfies VersionedContractV1;
