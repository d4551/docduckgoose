/**
 * SplatBao spatial anchors schemas.
 *
 * Defines contract-first TypeBox schemas for spatial anchors,
 * coordinate frame transforms, and tf2 integration payloads.
 *
 * @shared/schemas/splatbao-anchors
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { SplatbaoPose3DSchema } from "./splatbao-perception.schemas.ts";

// Anchor types

/**
 * Spatial anchor type.
 */
export const SplatbaoAnchorTypeSchema: TUnion<
  (
    | TLiteral<"manual">
    | TLiteral<"detection">
    | TLiteral<"waypoint">
    | TLiteral<"measurement">
    | TLiteral<"reference">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("detection"),
  TypeExports.Literal("manual"),
  TypeExports.Literal("waypoint"),
  TypeExports.Literal("measurement"),
  TypeExports.Literal("reference"),
]);

/** Type SplatbaoAnchorType. */
export type SplatbaoAnchorType = Static<typeof SplatbaoAnchorTypeSchema>;

// Spatial anchor

/**
 * Spatial anchor record.
 */
export const SplatbaoSpatialAnchorSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    anchorType: SplatbaoAnchorTypeSchema,
    frameId: TypeExports.String({ minLength: 1 }),
    transform: SplatbaoPose3DSchema,
    detectionId: TypeExports.Optional(TypeExports.String()),
    modelAlignmentId: TypeExports.Optional(TypeExports.String()),
    xrSessionId: TypeExports.Optional(TypeExports.String()),
    gaussianModelId: TypeExports.Optional(TypeExports.String()),
    parentAnchorId: TypeExports.Optional(TypeExports.String()),
    childAnchorIds: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSpatialAnchor. */
export type SplatbaoSpatialAnchor = Static<typeof SplatbaoSpatialAnchorSchema>;

/**
 * Create spatial anchor request.
 */
export const SplatbaoAnchorCreateSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    anchorType: SplatbaoAnchorTypeSchema,
    frameId: TypeExports.String({ minLength: 1 }),
    transform: SplatbaoPose3DSchema,
    detectionId: TypeExports.Optional(TypeExports.String()),
    modelAlignmentId: TypeExports.Optional(TypeExports.String()),
    xrSessionId: TypeExports.Optional(TypeExports.String()),
    gaussianModelId: TypeExports.Optional(TypeExports.String()),
    parentAnchorId: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCreate. */
export type SplatbaoAnchorCreate = Static<typeof SplatbaoAnchorCreateSchema>;

/**
 * Batch create spatial anchors request.
 */
export const SplatbaoAnchorBatchCreateSchema = TypeExports.Object(
  {
    anchors: TypeExports.Array(SplatbaoAnchorCreateSchema, { minItems: 1, maxItems: 50 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorBatchCreate. */
export type SplatbaoAnchorBatchCreate = Static<typeof SplatbaoAnchorBatchCreateSchema>;

/**
 * Batch link anchors to Gaussian model request.
 */
export const SplatbaoAnchorBatchLinkGaussianRequestSchema: TObject<
  { readonly anchorIds: TArray<TString>; readonly gaussianModelId: TString },
  "gaussianModelId" | "anchorIds",
  never
> = TypeExports.Object(
  {
    anchorIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      minItems: 1,
      maxItems: 50,
    }),
    gaussianModelId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorBatchLinkGaussianRequest. */
export type SplatbaoAnchorBatchLinkGaussianRequest = Static<
  typeof SplatbaoAnchorBatchLinkGaussianRequestSchema
>;

/**
 * Link-anchor-to-detection request.
 */
export const SplatbaoAnchorLinkDetectionRequestSchema: TObject<
  { readonly detectionId: TString },
  "detectionId",
  never
> = TypeExports.Object(
  {
    detectionId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorLinkDetectionRequest. */
export type SplatbaoAnchorLinkDetectionRequest = Static<
  typeof SplatbaoAnchorLinkDetectionRequestSchema
>;

/**
 * Link-anchor-to-model-alignment request.
 */
export const SplatbaoAnchorLinkAlignmentRequestSchema: TObject<
  { readonly alignmentId: TString },
  "alignmentId",
  never
> = TypeExports.Object(
  {
    alignmentId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorLinkAlignmentRequest. */
export type SplatbaoAnchorLinkAlignmentRequest = Static<
  typeof SplatbaoAnchorLinkAlignmentRequestSchema
>;

/**
 * Link-anchor-to-parent request.
 */
export const SplatbaoAnchorLinkParentRequestSchema: TObject<
  { readonly parentAnchorId: TString },
  "parentAnchorId",
  never
> = TypeExports.Object(
  {
    parentAnchorId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorLinkParentRequest. */
export type SplatbaoAnchorLinkParentRequest = Static<typeof SplatbaoAnchorLinkParentRequestSchema>;

/**
 * Update spatial anchor request (all fields optional).
 */
export const SplatbaoAnchorUpdateSchema = TypeExports.Partial(
  TypeExports.Object({
    name: TypeExports.String({ minLength: 1 }),
    anchorType: SplatbaoAnchorTypeSchema,
    frameId: TypeExports.String({ minLength: 1 }),
    transform: SplatbaoPose3DSchema,
    metadata: JsonObjectSchema,
  }),
  {},
);

/** Type SplatbaoAnchorUpdate. */
export type SplatbaoAnchorUpdate = Static<typeof SplatbaoAnchorUpdateSchema>;

/**
 * Transform anchor to a target coordinate frame.
 */
export const SplatbaoAnchorTransformRequestSchema: TObject<
  { readonly targetFrame: TString },
  "targetFrame",
  never
> = TypeExports.Object(
  {
    targetFrame: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorTransformRequest. */
export type SplatbaoAnchorTransformRequest = Static<typeof SplatbaoAnchorTransformRequestSchema>;

/**
 * Gaussian capture parameter overrides for an anchor capture request.
 */
export const SplatbaoAnchorCaptureParamsSchema: TObject<
  {
    readonly resolution: TOptional<TInteger>;
    readonly iterations: TOptional<TInteger>;
    readonly shDegree: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly resolution: TOptional<TInteger>;
    readonly iterations: TOptional<TInteger>;
    readonly shDegree: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    resolution: TypeExports.Optional(TypeExports.Integer({ minimum: 64, maximum: 4096 })),
    iterations: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 500_000 })),
    shDegree: TypeExports.Optional(TypeExports.Integer({ minimum: 0, maximum: 8 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCaptureParams. */
export type SplatbaoAnchorCaptureParams = Static<typeof SplatbaoAnchorCaptureParamsSchema>;

/**
 * Request payload for anchored Gaussian capture.
 */
export const SplatbaoAnchorCaptureRequestSchema: TObject<
  {
    readonly captureParams: TOptional<
      TObject<
        {
          readonly resolution: TOptional<TInteger>;
          readonly iterations: TOptional<TInteger>;
          readonly shDegree: TOptional<TInteger>;
        },
        never,
        InferOptionalKeys<{
          readonly resolution: TOptional<TInteger>;
          readonly iterations: TOptional<TInteger>;
          readonly shDegree: TOptional<TInteger>;
        }>
      >
    >;
  },
  never,
  "captureParams"
> = TypeExports.Object(
  {
    captureParams: TypeExports.Optional(SplatbaoAnchorCaptureParamsSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCaptureRequest. */
export type SplatbaoAnchorCaptureRequest = Static<typeof SplatbaoAnchorCaptureRequestSchema>;

/**
 * Response payload for anchored Gaussian capture enqueue.
 */
export const SplatbaoAnchorCaptureResponseSchema: TObject<
  { readonly jobId: TString; readonly queued: TBoolean },
  "jobId" | "queued",
  never
> = TypeExports.Object(
  {
    jobId: TypeExports.String({ minLength: 1 }),
    queued: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCaptureResponse. */
export type SplatbaoAnchorCaptureResponse = Static<typeof SplatbaoAnchorCaptureResponseSchema>;

// tf2 integration

/**
 * Available coordinate frames response.
 */
export const SplatbaoTf2FrameListResponseSchema: TObject<
  { readonly frames: TArray<TString> },
  "frames",
  never
> = TypeExports.Object(
  {
    frames: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTf2FrameListResponse. */
export type SplatbaoTf2FrameListResponse = Static<typeof SplatbaoTf2FrameListResponseSchema>;

/**
 * tf2 transform query request.
 */
export const SplatbaoTf2TransformRequestSchema: TObject<
  {
    readonly sourceFrame: TString;
    readonly targetFrame: TString;
    readonly timestamp: TOptional<TString>;
  },
  "sourceFrame" | "targetFrame",
  "timestamp"
> = TypeExports.Object(
  {
    sourceFrame: TypeExports.String({ minLength: 1 }),
    targetFrame: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTf2TransformRequest. */
export type SplatbaoTf2TransformRequest = Static<typeof SplatbaoTf2TransformRequestSchema>;

/**
 * tf2 transform query response.
 */
export const SplatbaoTf2TransformResponseSchema: TObject<
  {
    readonly transform: TArray<TNumber>;
    readonly sourceFrame: TString;
    readonly targetFrame: TString;
    readonly timestamp: TString;
  },
  "transform" | "sourceFrame" | "targetFrame" | "timestamp",
  never
> = TypeExports.Object(
  {
    transform: TypeExports.Array(TypeExports.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform matrix (gl-matrix compatible)",
    }),
    sourceFrame: TypeExports.String({ minLength: 1 }),
    targetFrame: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTf2TransformResponse. */
export type SplatbaoTf2TransformResponse = Static<typeof SplatbaoTf2TransformResponseSchema>;
