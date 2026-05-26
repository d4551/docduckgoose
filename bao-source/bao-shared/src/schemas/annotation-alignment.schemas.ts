/**
 * Annotation alignment schemas.
 *
 * Defines contract-first schemas for AI/annotation alignment across
 * XR/USD, MCP, and device/driver surfaces.
 *
 * @shared/schemas/annotation-alignment.ts
 */

import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusMapSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH } from "../constants/alignment";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas";
import { stringEnum } from "./baobox-enum";

// Annotation Alignment Context Types

/**
 * Supported annotation context types.
 */
export const ANNOTATION_ALIGNMENT_CONTEXT_TYPES: readonly ["CONTEXT_2D", "CONTEXT_3D", "XR"] = [
  "CONTEXT_2D",
  "CONTEXT_3D",
  "XR",
] as const;

/**
 * Type-safe annotation alignment context types.
 */
export type AnnotationAlignmentContextType = (typeof ANNOTATION_ALIGNMENT_CONTEXT_TYPES)[number];

/**
 * Annotation alignment context type schema.
 */
export const AnnotationAlignmentContextTypeSchema: Type.TUnion<
  [
    Type.TLiteral<"CONTEXT_2D" | "CONTEXT_3D" | "XR">,
    ...Type.TLiteral<"CONTEXT_2D" | "CONTEXT_3D" | "XR">[],
  ]
> = stringEnum(ANNOTATION_ALIGNMENT_CONTEXT_TYPES, {
  description: "Annotation context type",
});

// Annotation Alignment Coordinate Spaces

/**
 * Supported annotation coordinate spaces.
 */
export const ANNOTATION_ALIGNMENT_COORDINATE_SPACES: readonly [
  "WORLD",
  "NORMALIZED_IMAGE",
  "PIXEL_IMAGE",
  "VIEWPORT",
  "CANVAS",
  "MODEL_LOCAL",
  "USD_PRIM_PATH",
] = [
  "WORLD",
  "NORMALIZED_IMAGE",
  "PIXEL_IMAGE",
  "VIEWPORT",
  "CANVAS",
  "MODEL_LOCAL",
  "USD_PRIM_PATH",
] as const;

/**
 * Type-safe annotation alignment coordinate spaces.
 */
export type AnnotationAlignmentCoordinateSpace =
  (typeof ANNOTATION_ALIGNMENT_COORDINATE_SPACES)[number];

/**
 * Annotation alignment coordinate space schema.
 */
export const AnnotationAlignmentCoordinateSpaceSchema: Type.TUnion<
  [
    Type.TLiteral<
      | "WORLD"
      | "NORMALIZED_IMAGE"
      | "PIXEL_IMAGE"
      | "VIEWPORT"
      | "CANVAS"
      | "MODEL_LOCAL"
      | "USD_PRIM_PATH"
    >,
    ...Type.TLiteral<
      | "WORLD"
      | "NORMALIZED_IMAGE"
      | "PIXEL_IMAGE"
      | "VIEWPORT"
      | "CANVAS"
      | "MODEL_LOCAL"
      | "USD_PRIM_PATH"
    >[],
  ]
> = stringEnum(ANNOTATION_ALIGNMENT_COORDINATE_SPACES, {
  description: "Annotation coordinate space",
});

// Annotation Alignment Intents

/**
 * Supported alignment intents (AI policy intent).
 */
export const ANNOTATION_ALIGNMENT_INTENTS: readonly [
  "chat",
  "embeddings",
  "images",
  "models",
  "training",
  "download",
] = ["chat", "embeddings", "images", "models", "training", "download"] as const;

/**
 * Type-safe alignment intent.
 */
export type AnnotationAlignmentIntent = (typeof ANNOTATION_ALIGNMENT_INTENTS)[number];

/**
 * Annotation alignment intent schema.
 */
export const AnnotationAlignmentIntentSchema: Type.TUnion<
  [
    Type.TLiteral<"chat" | "embeddings" | "images" | "models" | "training" | "download">,
    ...Type.TLiteral<"chat" | "embeddings" | "images" | "models" | "training" | "download">[],
  ]
> = stringEnum(ANNOTATION_ALIGNMENT_INTENTS, {
  description: "AI policy intent",
});

// Annotation Alignment Requests

/**
 * Schema for annotation alignment map requests.
 */
export const AnnotationAlignmentMapRequestSchema: Type.TObject<
  {
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly bypassCache: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
    bypassCache: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for annotation alignment map requests.
 */
export type AnnotationAlignmentMapRequest = Static<typeof AnnotationAlignmentMapRequestSchema>;

/**
 * Schema for annotation alignment refresh requests.
 */
export const AnnotationAlignmentRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: 1,
        maxLength: ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH,
        description: "Idempotency key for refresh requests",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for annotation alignment refresh requests.
 */
export type AnnotationAlignmentRefreshRequest = Static<
  typeof AnnotationAlignmentRefreshRequestSchema
>;

// Annotation Alignment Provider

/**
 * Schema for AI provider capability metadata.
 */
export const AnnotationAlignmentProviderSchema = Type.Object(
  {
    key: AiProviderHealthKeySchema,
    features: Type.Array(Type.String({ minLength: 1 })),
    libraries: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment provider metadata.
 */
export type AnnotationAlignmentProvider = Static<typeof AnnotationAlignmentProviderSchema>;

// Annotation Alignment Source

/**
 * Schema for annotation alignment sources.
 */
export const AnnotationAlignmentSourceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    sourceKey: Type.String({ minLength: 1 }),
    intent: Type.Optional(AnnotationAlignmentIntentSchema),
    contextType: AnnotationAlignmentContextTypeSchema,
    coordinateSpace: AnnotationAlignmentCoordinateSpaceSchema,
    ownershipGroupId: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Capability ownership group identifier associated with this source",
      }),
    ),
    ownershipDomainId: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Capability ownership domain identifier associated with this source",
      }),
    ),
    ownershipSegmentIds: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Capability ownership segment identifiers associated with this source",
      }),
    ),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    providers: Type.Array(AiProviderHealthKeySchema),
    metadataKeys: Type.Array(Type.String({ minLength: 1 })),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment sources.
 */
export type AnnotationAlignmentSource = Static<typeof AnnotationAlignmentSourceSchema>;

// Annotation Alignment Summary

/**
 * Schema for alignment summary counts.
 */
export const AnnotationAlignmentSummarySchema: Type.TObject<
  {
    readonly sources: Type.TInteger;
    readonly providers: Type.TInteger;
    readonly byIntent: Type.TObject<
      {
        readonly chat: Type.TInteger;
        readonly embeddings: Type.TInteger;
        readonly images: Type.TInteger;
        readonly models: Type.TInteger;
        readonly training: Type.TInteger;
        readonly download: Type.TInteger;
      },
      "chat" | "embeddings" | "images" | "models" | "training" | "download",
      never
    >;
    readonly bySegment: Type.TOptional<Type.TRecord<Type.TString, Type.TInteger>>;
  },
  "providers" | "byIntent" | "sources",
  "bySegment"
> = Type.Object(
  {
    sources: Type.Integer({ minimum: 0 }),
    providers: Type.Integer({ minimum: 0 }),
    // NOTE: Use explicit objects instead of `Type.Record(union, ...)` to preserve
    // strong Static<> typing across UI indexing.
    byIntent: Type.Object(
      {
        chat: Type.Integer({ minimum: 0 }),
        embeddings: Type.Integer({ minimum: 0 }),
        images: Type.Integer({ minimum: 0 }),
        models: Type.Integer({ minimum: 0 }),
        training: Type.Integer({ minimum: 0 }),
        download: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    bySegment: Type.Optional(
      Type.Record(Type.String({ minLength: 1 }), Type.Integer({ minimum: 0 })),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment summary counts.
 */
export type AnnotationAlignmentSummary = Static<typeof AnnotationAlignmentSummarySchema>;

// Annotation Alignment Errors

/**
 * Schema for alignment error entries.
 */
export const AnnotationAlignmentErrorSchema: Type.TObject<
  {
    readonly scope: Type.TString;
    readonly message: Type.TString;
    readonly code: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "scope" | "message",
  Type.InferOptionalKeys<{
    readonly scope: Type.TString;
    readonly message: Type.TString;
    readonly code: Type.TOptional<Type.TString>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    scope: Type.String({ minLength: 1 }),
    message: Type.String({ minLength: 1 }),
    code: Type.Optional(Type.String({ minLength: 1 })),
    details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment error entries.
 */
export type AnnotationAlignmentError = Static<typeof AnnotationAlignmentErrorSchema>;

// Annotation Alignment Responses

/**
 * Schema for annotation alignment map responses.
 */
export const AnnotationAlignmentMapResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    sources: Type.Array(AnnotationAlignmentSourceSchema),
    providers: Type.Array(AnnotationAlignmentProviderSchema),
    summary: AnnotationAlignmentSummarySchema,
    ownership: Type.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(AnnotationAlignmentErrorSchema)),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for annotation alignment map responses.
 */
export type AnnotationAlignmentMapResponse = Static<typeof AnnotationAlignmentMapResponseSchema>;

/**
 * Schema for annotation alignment refresh responses.
 */
export const AnnotationAlignmentRefreshResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    refreshed: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for annotation alignment refresh responses.
 */
export type AnnotationAlignmentRefreshResponse = Static<
  typeof AnnotationAlignmentRefreshResponseSchema
>;
