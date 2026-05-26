/**
 * Annotation Auto-Ingest Contracts v1
 *
 * Defines the versioned contracts for annotation auto-ingest endpoints:
 * - status snapshot
 * - enqueue/hydrate request
 *
 * @shared/contracts/versions/v1/annotation-auto-ingest
 */

import type { TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  AnnotationAutoIngestEnqueueRequestSchema,
  AnnotationAutoIngestEnqueueResponseSchema,
  AnnotationAutoIngestStatusResponseSchema,
} from "../../../schemas/annotation-auto-ingest.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract version alias for shared exports.
 */
export const ANNOTATION_AUTO_INGEST_CONTRACT_VERSION: "1.0.0" = CONTRACT_VERSION;

/** Identity passthrough — $id assignment removed per JSON Schema naming convention compliance. */
function resolveSchema<T extends TSchema>(schema: T): T {
  return schema;
}

/**
 * Contract names.
 */
export const STATUS_CONTRACT_NAME = "annotation-auto-ingest-status";
/** Contract name for enqueuing an annotation auto-ingest job. */
export const ENQUEUE_CONTRACT_NAME = "annotation-auto-ingest-enqueue";

/** Canonical alias for the annotation auto-ingest status contract name. */
export const ANNOTATION_AUTO_INGEST_STATUS_CONTRACT_NAME: "annotation-auto-ingest-status" =
  STATUS_CONTRACT_NAME;
/** Canonical alias for the annotation auto-ingest enqueue contract name. */
export const ANNOTATION_AUTO_INGEST_ENQUEUE_CONTRACT_NAME: "annotation-auto-ingest-enqueue" =
  ENQUEUE_CONTRACT_NAME;

/**
 * Request schema for status endpoint (query params).
 */
export const AnnotationAutoIngestStatusRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Response schema for status endpoint.
 */
export const AnnotationAutoIngestStatusResponseV1: ReturnType<typeof resolveSchema> = resolveSchema(
  AnnotationAutoIngestStatusResponseSchema,
);

/**
 * Request schema for enqueue endpoint (body).
 */
export const AnnotationAutoIngestEnqueueRequestV1: Type.TObject<
  {
    readonly kind: Type.TUnion<
      (Type.TLiteral<"hardware"> | Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]
    >;
    readonly payload: Type.TRecord<Type.TString, Type.TUnknown>;
    readonly eventTimestamp: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  },
  "kind" | "payload",
  Type.InferOptionalKeys<{
    readonly kind: Type.TUnion<
      (Type.TLiteral<"hardware"> | Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]
    >;
    readonly payload: Type.TRecord<Type.TString, Type.TUnknown>;
    readonly eventTimestamp: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  }>
> = resolveSchema(AnnotationAutoIngestEnqueueRequestSchema);

/**
 * Response schema for enqueue endpoint.
 */
export const AnnotationAutoIngestEnqueueResponseV1: ReturnType<typeof resolveSchema> =
  resolveSchema(AnnotationAutoIngestEnqueueResponseSchema);

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for status failures.
 */
export const AnnotationAutoIngestStatusErrorV1 = Type.Object(
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
 * Error schema for enqueue failures.
 */
export const AnnotationAutoIngestEnqueueErrorV1 = Type.Object(
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
 * Status contract definition (v1).
 */
export const AnnotationAutoIngestStatusContractV1 = {
  name: STATUS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AnnotationAutoIngestStatusRequestV1,
  response: AnnotationAutoIngestStatusResponseV1,
  errors: AnnotationAutoIngestStatusErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Enqueue contract definition (v1).
 */
export const AnnotationAutoIngestEnqueueContractV1 = {
  name: ENQUEUE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: AnnotationAutoIngestEnqueueRequestV1,
  response: AnnotationAutoIngestEnqueueResponseV1,
  errors: AnnotationAutoIngestEnqueueErrorV1,
} as const satisfies VersionedContractV1;
