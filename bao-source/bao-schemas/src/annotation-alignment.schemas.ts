/**
 * Annotation alignment schemas.
 *
 * Defines contract-first schemas for AI/annotation alignment across
 * XR/USD, MCP, and device/driver surfaces.
 *
 * @shared/schemas/annotation-alignment.ts
 */

import { ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH } from "@baohaus/bao-constants/alignment";
import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { stringEnum } from "./baobox-enum.ts";
import {
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
} from "./capability-ownership.schemas.ts";

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
export const AnnotationAlignmentContextTypeSchema: TUnion<
  [TLiteral<"CONTEXT_2D" | "CONTEXT_3D" | "XR">, ...TLiteral<"CONTEXT_2D" | "CONTEXT_3D" | "XR">[]]
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
export const AnnotationAlignmentCoordinateSpaceSchema: TUnion<
  [
    TLiteral<
      | "WORLD"
      | "NORMALIZED_IMAGE"
      | "PIXEL_IMAGE"
      | "VIEWPORT"
      | "CANVAS"
      | "MODEL_LOCAL"
      | "USD_PRIM_PATH"
    >,
    ...TLiteral<
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
export const AnnotationAlignmentIntentSchema: TUnion<
  [
    TLiteral<"chat" | "embeddings" | "images" | "models" | "training" | "download">,
    ...TLiteral<"chat" | "embeddings" | "images" | "models" | "training" | "download">[],
  ]
> = stringEnum(ANNOTATION_ALIGNMENT_INTENTS, {
  description: "AI policy intent",
});

// Annotation Alignment Requests

/**
 * Schema for annotation alignment map requests.
 */
export const AnnotationAlignmentMapRequestSchema: TObject<
  {
    readonly refresh: TOptional<TBoolean>;
    readonly bypassCache: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly refresh: TOptional<TBoolean>;
    readonly bypassCache: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
    bypassCache: TypeExports.Optional(TypeExports.Boolean()),
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
export const AnnotationAlignmentRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
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
export const AnnotationAlignmentProviderSchema = TypeExports.Object(
  {
    key: AiProviderHealthKeySchema,
    features: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    libraries: TypeExports.Array(TypeExports.String({ minLength: 1 })),
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
export const AnnotationAlignmentSourceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    sourceKey: TypeExports.String({ minLength: 1 }),
    intent: TypeExports.Optional(AnnotationAlignmentIntentSchema),
    contextType: AnnotationAlignmentContextTypeSchema,
    coordinateSpace: AnnotationAlignmentCoordinateSpaceSchema,
    ownershipGroupId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Capability ownership group identifier associated with this source",
      }),
    ),
    ownershipDomainId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Capability ownership domain identifier associated with this source",
      }),
    ),
    ownershipSegmentIds: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Capability ownership segment identifiers associated with this source",
      }),
    ),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    providers: TypeExports.Array(AiProviderHealthKeySchema),
    metadataKeys: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
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
export const AnnotationAlignmentSummarySchema: TObject<
  {
    readonly sources: TInteger;
    readonly providers: TInteger;
    readonly byIntent: TObject<
      {
        readonly chat: TInteger;
        readonly embeddings: TInteger;
        readonly images: TInteger;
        readonly models: TInteger;
        readonly training: TInteger;
        readonly download: TInteger;
      },
      "chat" | "embeddings" | "images" | "models" | "training" | "download",
      never
    >;
    readonly bySegment: TOptional<TRecord<TString, TInteger>>;
  },
  "providers" | "byIntent" | "sources",
  "bySegment"
> = TypeExports.Object(
  {
    sources: TypeExports.Integer({ minimum: 0 }),
    providers: TypeExports.Integer({ minimum: 0 }),
    // NOTE: Use explicit objects instead of `TypeExports.Record(union, ...)` to preserve
    // strong Static<> typing across UI indexing.
    byIntent: TypeExports.Object(
      {
        chat: TypeExports.Integer({ minimum: 0 }),
        embeddings: TypeExports.Integer({ minimum: 0 }),
        images: TypeExports.Integer({ minimum: 0 }),
        models: TypeExports.Integer({ minimum: 0 }),
        training: TypeExports.Integer({ minimum: 0 }),
        download: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    bySegment: TypeExports.Optional(
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.Integer({ minimum: 0 })),
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
export const AnnotationAlignmentErrorSchema: TObject<
  {
    readonly scope: TString;
    readonly message: TString;
    readonly code: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  },
  "scope" | "message",
  InferOptionalKeys<{
    readonly scope: TString;
    readonly message: TString;
    readonly code: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    scope: TypeExports.String({ minLength: 1 }),
    message: TypeExports.String({ minLength: 1 }),
    code: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    details: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
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
export const AnnotationAlignmentMapResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    sources: TypeExports.Array(AnnotationAlignmentSourceSchema),
    providers: TypeExports.Array(AnnotationAlignmentProviderSchema),
    summary: AnnotationAlignmentSummarySchema,
    ownership: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(AnnotationAlignmentErrorSchema)),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
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
export const AnnotationAlignmentRefreshResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly refreshed: TBoolean;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    refreshed: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for annotation alignment refresh responses.
 */
export type AnnotationAlignmentRefreshResponse = Static<
  typeof AnnotationAlignmentRefreshResponseSchema
>;
