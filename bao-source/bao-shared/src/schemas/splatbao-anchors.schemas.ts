/**
 * SplatBao spatial anchors schemas.
 *
 * Defines contract-first TypeBox schemas for spatial anchors,
 * coordinate frame transforms, and tf2 integration payloads.
 *
 * @shared/schemas/splatbao-anchors
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { SplatbaoPose3DSchema } from "./splatbao-perception.schemas.ts";

// Anchor types

/**
 * Spatial anchor type.
 */
export const SplatbaoAnchorTypeSchema: Type.TUnion<
  (
    | Type.TLiteral<"manual">
    | Type.TLiteral<"detection">
    | Type.TLiteral<"waypoint">
    | Type.TLiteral<"measurement">
    | Type.TLiteral<"reference">
  )[]
> = Type.Union([
  Type.Literal("detection"),
  Type.Literal("manual"),
  Type.Literal("waypoint"),
  Type.Literal("measurement"),
  Type.Literal("reference"),
]);

/** Type SplatbaoAnchorType. */
export type SplatbaoAnchorType = Static<typeof SplatbaoAnchorTypeSchema>;

// Spatial anchor

/**
 * Spatial anchor record.
 */
export const SplatbaoSpatialAnchorSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    anchorType: SplatbaoAnchorTypeSchema,
    frameId: Type.String({ minLength: 1 }),
    transform: SplatbaoPose3DSchema,
    detectionId: Type.Optional(Type.String()),
    modelAlignmentId: Type.Optional(Type.String()),
    xrSessionId: Type.Optional(Type.String()),
    gaussianModelId: Type.Optional(Type.String()),
    parentAnchorId: Type.Optional(Type.String()),
    childAnchorIds: Type.Optional(Type.Array(Type.String())),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoSpatialAnchor. */
export type SplatbaoSpatialAnchor = Static<typeof SplatbaoSpatialAnchorSchema>;

/**
 * Create spatial anchor request.
 */
export const SplatbaoAnchorCreateSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    anchorType: SplatbaoAnchorTypeSchema,
    frameId: Type.String({ minLength: 1 }),
    transform: SplatbaoPose3DSchema,
    detectionId: Type.Optional(Type.String()),
    modelAlignmentId: Type.Optional(Type.String()),
    xrSessionId: Type.Optional(Type.String()),
    gaussianModelId: Type.Optional(Type.String()),
    parentAnchorId: Type.Optional(Type.String()),
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCreate. */
export type SplatbaoAnchorCreate = Static<typeof SplatbaoAnchorCreateSchema>;

/**
 * Batch create spatial anchors request.
 */
export const SplatbaoAnchorBatchCreateSchema = Type.Object(
  {
    anchors: Type.Array(SplatbaoAnchorCreateSchema, { minItems: 1, maxItems: 50 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorBatchCreate. */
export type SplatbaoAnchorBatchCreate = Static<typeof SplatbaoAnchorBatchCreateSchema>;

/**
 * Batch link anchors to Gaussian model request.
 */
export const SplatbaoAnchorBatchLinkGaussianRequestSchema: Type.TObject<
  { readonly anchorIds: Type.TArray<Type.TString>; readonly gaussianModelId: Type.TString },
  "gaussianModelId" | "anchorIds",
  never
> = Type.Object(
  {
    anchorIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1, maxItems: 50 }),
    gaussianModelId: Type.String({ minLength: 1 }),
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
export const SplatbaoAnchorLinkDetectionRequestSchema: Type.TObject<
  { readonly detectionId: Type.TString },
  "detectionId",
  never
> = Type.Object(
  {
    detectionId: Type.String({ minLength: 1 }),
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
export const SplatbaoAnchorLinkAlignmentRequestSchema: Type.TObject<
  { readonly alignmentId: Type.TString },
  "alignmentId",
  never
> = Type.Object(
  {
    alignmentId: Type.String({ minLength: 1 }),
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
export const SplatbaoAnchorLinkParentRequestSchema: Type.TObject<
  { readonly parentAnchorId: Type.TString },
  "parentAnchorId",
  never
> = Type.Object(
  {
    parentAnchorId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorLinkParentRequest. */
export type SplatbaoAnchorLinkParentRequest = Static<typeof SplatbaoAnchorLinkParentRequestSchema>;

/**
 * Update spatial anchor request (all fields optional).
 */
export const SplatbaoAnchorUpdateSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly anchorType: Type.TUnion<
      (
        | Type.TLiteral<"manual">
        | Type.TLiteral<"detection">
        | Type.TLiteral<"waypoint">
        | Type.TLiteral<"measurement">
        | Type.TLiteral<"reference">
      )[]
    >;
    readonly frameId: Type.TString;
    readonly transform: Type.TObject<
      {
        readonly position: Type.TObject<
          { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly orientation: Type.TObject<
          {
            readonly x: Type.TNumber;
            readonly y: Type.TNumber;
            readonly z: Type.TNumber;
            readonly w: Type.TNumber;
          },
          "x" | "y" | "z" | "w",
          never
        >;
      },
      "position" | "orientation",
      never
    >;
    readonly metadata: Type.TObject<Record<string, never>, never, never>;
  },
  never,
  "name" | "metadata" | "anchorType" | "frameId" | "transform"
> = Type.Partial(
  Type.Object({
    name: Type.String({ minLength: 1 }),
    anchorType: SplatbaoAnchorTypeSchema,
    frameId: Type.String({ minLength: 1 }),
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
export const SplatbaoAnchorTransformRequestSchema: Type.TObject<
  { readonly targetFrame: Type.TString },
  "targetFrame",
  never
> = Type.Object(
  {
    targetFrame: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorTransformRequest. */
export type SplatbaoAnchorTransformRequest = Static<typeof SplatbaoAnchorTransformRequestSchema>;

/**
 * Gaussian capture parameter overrides for an anchor capture request.
 */
export const SplatbaoAnchorCaptureParamsSchema: Type.TObject<
  {
    readonly resolution: Type.TOptional<Type.TInteger>;
    readonly iterations: Type.TOptional<Type.TInteger>;
    readonly shDegree: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly resolution: Type.TOptional<Type.TInteger>;
    readonly iterations: Type.TOptional<Type.TInteger>;
    readonly shDegree: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    resolution: Type.Optional(Type.Integer({ minimum: 64, maximum: 4096 })),
    iterations: Type.Optional(Type.Integer({ minimum: 1, maximum: 500_000 })),
    shDegree: Type.Optional(Type.Integer({ minimum: 0, maximum: 8 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCaptureParams. */
export type SplatbaoAnchorCaptureParams = Static<typeof SplatbaoAnchorCaptureParamsSchema>;

/**
 * Request payload for anchored Gaussian capture.
 */
export const SplatbaoAnchorCaptureRequestSchema: Type.TObject<
  {
    readonly captureParams: Type.TOptional<
      Type.TObject<
        {
          readonly resolution: Type.TOptional<Type.TInteger>;
          readonly iterations: Type.TOptional<Type.TInteger>;
          readonly shDegree: Type.TOptional<Type.TInteger>;
        },
        never,
        Type.InferOptionalKeys<{
          readonly resolution: Type.TOptional<Type.TInteger>;
          readonly iterations: Type.TOptional<Type.TInteger>;
          readonly shDegree: Type.TOptional<Type.TInteger>;
        }>
      >
    >;
  },
  never,
  "captureParams"
> = Type.Object(
  {
    captureParams: Type.Optional(SplatbaoAnchorCaptureParamsSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCaptureRequest. */
export type SplatbaoAnchorCaptureRequest = Static<typeof SplatbaoAnchorCaptureRequestSchema>;

/**
 * Response payload for anchored Gaussian capture enqueue.
 */
export const SplatbaoAnchorCaptureResponseSchema: Type.TObject<
  { readonly jobId: Type.TString; readonly queued: Type.TBoolean },
  "jobId" | "queued",
  never
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
    queued: Type.Boolean(),
  },
  { additionalProperties: false },
);

/** Type SplatbaoAnchorCaptureResponse. */
export type SplatbaoAnchorCaptureResponse = Static<typeof SplatbaoAnchorCaptureResponseSchema>;

// tf2 integration

/**
 * Available coordinate frames response.
 */
export const SplatbaoTf2FrameListResponseSchema: Type.TObject<
  { readonly frames: Type.TArray<Type.TString> },
  "frames",
  never
> = Type.Object(
  {
    frames: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTf2FrameListResponse. */
export type SplatbaoTf2FrameListResponse = Static<typeof SplatbaoTf2FrameListResponseSchema>;

/**
 * tf2 transform query request.
 */
export const SplatbaoTf2TransformRequestSchema: Type.TObject<
  {
    readonly sourceFrame: Type.TString;
    readonly targetFrame: Type.TString;
    readonly timestamp: Type.TOptional<Type.TString>;
  },
  "sourceFrame" | "targetFrame",
  "timestamp"
> = Type.Object(
  {
    sourceFrame: Type.String({ minLength: 1 }),
    targetFrame: Type.String({ minLength: 1 }),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTf2TransformRequest. */
export type SplatbaoTf2TransformRequest = Static<typeof SplatbaoTf2TransformRequestSchema>;

/**
 * tf2 transform query response.
 */
export const SplatbaoTf2TransformResponseSchema: Type.TObject<
  {
    readonly transform: Type.TArray<Type.TNumber>;
    readonly sourceFrame: Type.TString;
    readonly targetFrame: Type.TString;
    readonly timestamp: Type.TString;
  },
  "transform" | "sourceFrame" | "targetFrame" | "timestamp",
  never
> = Type.Object(
  {
    transform: Type.Array(Type.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform matrix (gl-matrix compatible)",
    }),
    sourceFrame: Type.String({ minLength: 1 }),
    targetFrame: Type.String({ minLength: 1 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTf2TransformResponse. */
export type SplatbaoTf2TransformResponse = Static<typeof SplatbaoTf2TransformResponseSchema>;
