/**
 * SplatBao spatial perception schemas.
 *
 * Defines contract-first TypeBox schemas for spatial detection, fusion,
 * depth-to-cloud, and local inference payloads used by the perception pipeline.
 *
 * @shared/schemas/splatbao-perception
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { Position3DSchema as SplatbaoPosition3DSchema } from "./navigation.schemas.ts";

export type { Position3D as SplatbaoPosition3D } from "./navigation.schemas.ts";

// Shared spatial primitives

/**
 * 2D width/height dimensions.
 */
export const SplatbaoWidthHeightSchema: Type.TObject<
  { readonly width: Type.TNumber; readonly height: Type.TNumber },
  "width" | "height",
  never
> = Type.Object(
  {
    width: Type.Number({ minimum: 0 }),
    height: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWidthHeight. */
export type SplatbaoWidthHeight = Static<typeof SplatbaoWidthHeightSchema>;

/**
 * Quaternion orientation (x, y, z, w).
 */
export const SplatbaoQuaternionSchema: Type.TObject<
  {
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TNumber;
    readonly w: Type.TNumber;
  },
  "x" | "y" | "z" | "w",
  never
> = Type.Object(
  {
    x: Type.Number(),
    y: Type.Number(),
    z: Type.Number(),
    w: Type.Number(),
  },
  { additionalProperties: false },
);

/** Type SplatbaoQuaternion. */
export type SplatbaoQuaternion = Static<typeof SplatbaoQuaternionSchema>;

/**
 * 3D bounding box size (width, height, depth).
 */
export const SplatbaoBBox3DSizeSchema: Type.TObject<
  { readonly width: Type.TNumber; readonly height: Type.TNumber; readonly depth: Type.TNumber },
  "width" | "height" | "depth",
  never
> = Type.Object(
  {
    width: Type.Number({ minimum: 0 }),
    height: Type.Number({ minimum: 0 }),
    depth: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoBBox3DSize. */
export type SplatbaoBBox3DSize = Static<typeof SplatbaoBBox3DSizeSchema>;

/**
 * 6-DOF pose (position + quaternion orientation).
 */
export const SplatbaoPose3DSchema: Type.TObject<
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
> = Type.Object(
  {
    position: SplatbaoPosition3DSchema,
    orientation: SplatbaoQuaternionSchema,
  },
  { additionalProperties: false },
);

/** Type SplatbaoPose3D. */
export type SplatbaoPose3D = Static<typeof SplatbaoPose3DSchema>;

/**
 * 2D bounding box rectangle (normalized 0-1 coordinates).
 */
export const SplatbaoBBox2DSchema: Type.TObject<
  {
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly width: Type.TNumber;
    readonly height: Type.TNumber;
  },
  "x" | "y" | "width" | "height",
  never
> = Type.Object(
  {
    x: Type.Number({ minimum: 0, maximum: 1 }),
    y: Type.Number({ minimum: 0, maximum: 1 }),
    width: Type.Number({ minimum: 0, maximum: 1 }),
    height: Type.Number({ minimum: 0, maximum: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoBBox2D. */
export type SplatbaoBBox2D = Static<typeof SplatbaoBBox2DSchema>;

// Camera info

/**
 * Camera intrinsics for projection/unprojection.
 */
export const SplatbaoCameraInfoSchema: Type.TObject<
  {
    readonly fx: Type.TNumber;
    readonly fy: Type.TNumber;
    readonly cx: Type.TNumber;
    readonly cy: Type.TNumber;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly frameId: Type.TOptional<Type.TString>;
  },
  "fx" | "fy" | "cx" | "cy" | "width" | "height",
  "frameId"
> = Type.Object(
  {
    fx: Type.Number({ exclusiveMinimum: 0 }),
    fy: Type.Number({ exclusiveMinimum: 0 }),
    cx: Type.Number(),
    cy: Type.Number(),
    width: Type.Integer({ minimum: 1 }),
    height: Type.Integer({ minimum: 1 }),
    frameId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoCameraInfo. */
export type SplatbaoCameraInfo = Static<typeof SplatbaoCameraInfoSchema>;

// Filling — mask/region content for segmentation output

/**
 * RLE-encoded mask (run-length encoding).
 */
export const SplatbaoFillingRleSchema: Type.TObject<
  {
    readonly format: Type.TLiteral<"rle">;
    readonly counts: Type.TArray<Type.TInteger>;
    readonly size: Type.TObject<
      { readonly width: Type.TNumber; readonly height: Type.TNumber },
      "width" | "height",
      never
    >;
    readonly value: Type.TOptional<Type.TNumber>;
  },
  "format" | "counts" | "size",
  "value"
> = Type.Object(
  {
    format: Type.Literal("rle"),
    counts: Type.Array(Type.Integer({ minimum: 0 })),
    size: SplatbaoWidthHeightSchema,
    value: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFillingRle. */
export type SplatbaoFillingRle = Static<typeof SplatbaoFillingRleSchema>;

/**
 * Base64-encoded binary mask.
 */
export const SplatbaoFillingMaskSchema: Type.TObject<
  {
    readonly format: Type.TLiteral<"mask">;
    readonly data: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly channels: Type.TOptional<Type.TInteger>;
  },
  "format" | "width" | "height" | "data",
  "channels"
> = Type.Object(
  {
    format: Type.Literal("mask"),
    data: Type.String({ minLength: 1, description: "Base64-encoded binary mask" }),
    width: Type.Integer({ minimum: 1 }),
    height: Type.Integer({ minimum: 1 }),
    channels: Type.Optional(Type.Integer({ minimum: 1, maximum: 4 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFillingMask. */
export type SplatbaoFillingMask = Static<typeof SplatbaoFillingMaskSchema>;

/**
 * Union of filling formats (RLE or mask).
 */
export const SplatbaoFillingSchema: Type.TUnion<
  (
    | Type.TObject<
        {
          readonly format: Type.TLiteral<"rle">;
          readonly counts: Type.TArray<Type.TInteger>;
          readonly size: Type.TObject<
            { readonly width: Type.TNumber; readonly height: Type.TNumber },
            "width" | "height",
            never
          >;
          readonly value: Type.TOptional<Type.TNumber>;
        },
        "format" | "counts" | "size",
        "value"
      >
    | Type.TObject<
        {
          readonly format: Type.TLiteral<"mask">;
          readonly data: Type.TString;
          readonly width: Type.TInteger;
          readonly height: Type.TInteger;
          readonly channels: Type.TOptional<Type.TInteger>;
        },
        "format" | "width" | "height" | "data",
        "channels"
      >
  )[]
> = Type.Union([SplatbaoFillingRleSchema, SplatbaoFillingMaskSchema], {});

/** Type SplatbaoFilling. */
export type SplatbaoFilling = Static<typeof SplatbaoFillingSchema>;

// 3D detection

/**
 * Enhanced 3D detection result.
 */
export const SplatbaoDetection3DSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    classId: Type.String({ minLength: 1 }),
    score: Type.Number({ minimum: 0, maximum: 1 }),
    pose: SplatbaoPose3DSchema,
    size: SplatbaoBBox3DSizeSchema,
    frameId: Type.String({ minLength: 1 }),
    croppedPointCloud: Type.Optional(Type.String({ description: "Base64-encoded PLY" })),
    projection2D: Type.Optional(SplatbaoBBox2DSchema),
    timestamp: Type.String({ format: "date-time" }),
    filling: Type.Optional(SplatbaoFillingSchema),
    instanceId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDetection3D. */
export type SplatbaoDetection3D = Static<typeof SplatbaoDetection3DSchema>;

// Fusion

/**
 * 2D detection for fusion input.
 */
export const SplatbaoDetection2DSchema = Type.Object(
  {
    classId: Type.String({ minLength: 1 }),
    score: Type.Number({ minimum: 0, maximum: 1 }),
    bbox: SplatbaoBBox2DSchema,
    filling: Type.Optional(SplatbaoFillingSchema),
    instanceId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDetection2D. */
export type SplatbaoDetection2D = Static<typeof SplatbaoDetection2DSchema>;

/**
 * Multimodal detection fusion request.
 */
export const SplatbaoFusionRequestSchema = Type.Object(
  {
    detections2D: Type.Array(SplatbaoDetection2DSchema),
    detections3D: Type.Array(SplatbaoDetection3DSchema),
    cameraInfo: SplatbaoCameraInfoSchema,
    sourceFrame: Type.String({ minLength: 1 }),
    targetFrame: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFusionRequest. */
export type SplatbaoFusionRequest = Static<typeof SplatbaoFusionRequestSchema>;

/**
 * Multimodal detection fusion response.
 */
export const SplatbaoFusionResponseSchema = Type.Object(
  {
    detections: Type.Array(SplatbaoDetection3DSchema),
    fusionMethod: Type.String({ minLength: 1 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFusionResponse. */
export type SplatbaoFusionResponse = Static<typeof SplatbaoFusionResponseSchema>;

// Depth-to-cloud

/**
 * Depth image to point cloud conversion request.
 */
export const SplatbaoDepthToCloudRequestSchema: Type.TObject<
  {
    readonly depthImage: Type.TString;
    readonly cameraInfo: Type.TObject<
      {
        readonly fx: Type.TNumber;
        readonly fy: Type.TNumber;
        readonly cx: Type.TNumber;
        readonly cy: Type.TNumber;
        readonly width: Type.TInteger;
        readonly height: Type.TInteger;
        readonly frameId: Type.TOptional<Type.TString>;
      },
      "width" | "height" | "fx" | "fy" | "cx" | "cy",
      "frameId"
    >;
    readonly targetFrame: Type.TString;
  },
  "cameraInfo" | "targetFrame" | "depthImage",
  never
> = Type.Object(
  {
    depthImage: Type.String({ minLength: 1, description: "Base64-encoded depth image" }),
    cameraInfo: SplatbaoCameraInfoSchema,
    targetFrame: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDepthToCloudRequest. */
export type SplatbaoDepthToCloudRequest = Static<typeof SplatbaoDepthToCloudRequestSchema>;

/**
 * Depth to point cloud conversion response.
 */
export const SplatbaoDepthToCloudResponseSchema: Type.TObject<
  {
    readonly pointCloud: Type.TString;
    readonly pointCount: Type.TInteger;
    readonly bounds: Type.TObject<
      {
        readonly min: Type.TObject<
          { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly max: Type.TObject<
          { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
          "x" | "y" | "z",
          never
        >;
      },
      "min" | "max",
      never
    >;
  },
  "bounds" | "pointCloud" | "pointCount",
  never
> = Type.Object(
  {
    pointCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY" }),
    pointCount: Type.Integer({ minimum: 0 }),
    bounds: Type.Object({
      min: SplatbaoPosition3DSchema,
      max: SplatbaoPosition3DSchema,
    }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDepthToCloudResponse. */
export type SplatbaoDepthToCloudResponse = Static<typeof SplatbaoDepthToCloudResponseSchema>;

// Local detection (Transformers.js / Bun-side)

/**
 * Local detection request (Transformers.js DETR/OWL-ViT in Bun).
 */
export const SplatbaoLocalDetectionRequestSchema: Type.TObject<
  {
    readonly image: Type.TString;
    readonly threshold: Type.TOptional<Type.TNumber>;
    readonly candidateLabels: Type.TOptional<Type.TArray<Type.TString>>;
  },
  "image",
  Type.InferOptionalKeys<{
    readonly image: Type.TString;
    readonly threshold: Type.TOptional<Type.TNumber>;
    readonly candidateLabels: Type.TOptional<Type.TArray<Type.TString>>;
  }>
> = Type.Object(
  {
    image: Type.String({ minLength: 1, description: "Base64-encoded image" }),
    threshold: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
    candidateLabels: Type.Optional(Type.Array(Type.String({ minLength: 1 }), { minItems: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoLocalDetectionRequest. */
export type SplatbaoLocalDetectionRequest = Static<typeof SplatbaoLocalDetectionRequestSchema>;

/**
 * Local detection response.
 */
export const SplatbaoLocalDetectionResponseSchema = Type.Object(
  {
    detections: Type.Array(SplatbaoDetection2DSchema),
    modelUsed: Type.String({ minLength: 1 }),
    inferenceMs: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoLocalDetectionResponse. */
export type SplatbaoLocalDetectionResponse = Static<typeof SplatbaoLocalDetectionResponseSchema>;

// ICP alignment request/response

/**
 * ICP alignment request between two point clouds.
 */
export const SplatbaoIcpAlignRequestSchema: Type.TObject<
  {
    readonly sourceCloud: Type.TString;
    readonly targetCloud: Type.TString;
    readonly initialTransform: Type.TOptional<Type.TArray<Type.TNumber>>;
    readonly maxIterations: Type.TOptional<Type.TInteger>;
    readonly threshold: Type.TOptional<Type.TNumber>;
  },
  "sourceCloud" | "targetCloud",
  Type.InferOptionalKeys<{
    readonly sourceCloud: Type.TString;
    readonly targetCloud: Type.TString;
    readonly initialTransform: Type.TOptional<Type.TArray<Type.TNumber>>;
    readonly maxIterations: Type.TOptional<Type.TInteger>;
    readonly threshold: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    sourceCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY (source)" }),
    targetCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY (target/template)" }),
    initialTransform: Type.Optional(
      Type.Array(Type.Number(), { minItems: 16, maxItems: 16, description: "4x4 column-major" }),
    ),
    maxIterations: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000 })),
    threshold: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoIcpAlignRequest. */
export type SplatbaoIcpAlignRequest = Static<typeof SplatbaoIcpAlignRequestSchema>;

/**
 * ICP alignment response.
 */
export const SplatbaoIcpAlignResponseSchema: Type.TObject<
  {
    readonly transformMatrix: Type.TArray<Type.TNumber>;
    readonly fitness: Type.TNumber;
    readonly rmse: Type.TNumber;
    readonly converged: Type.TBoolean;
  },
  "transformMatrix" | "fitness" | "rmse" | "converged",
  never
> = Type.Object(
  {
    transformMatrix: Type.Array(Type.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform",
    }),
    fitness: Type.Number({ minimum: 0, maximum: 1 }),
    rmse: Type.Number({ minimum: 0 }),
    converged: Type.Boolean(),
  },
  { additionalProperties: false },
);

/** Type SplatbaoIcpAlignResponse. */
export type SplatbaoIcpAlignResponse = Static<typeof SplatbaoIcpAlignResponseSchema>;

// Chamfer distance (PyTorch3D)

/**
 * Chamfer distance request between two point clouds.
 */
export const SplatbaoChamferDistanceRequestSchema: Type.TObject<
  { readonly sourceCloud: Type.TString; readonly targetCloud: Type.TString },
  "sourceCloud" | "targetCloud",
  never
> = Type.Object(
  {
    sourceCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY (predicted)" }),
    targetCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY (ground truth)" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoChamferDistanceRequest. */
export type SplatbaoChamferDistanceRequest = Static<typeof SplatbaoChamferDistanceRequestSchema>;

/**
 * Chamfer distance response.
 */
export const SplatbaoChamferDistanceResponseSchema: Type.TObject<
  {
    readonly distance: Type.TNumber;
    readonly sourceToTarget: Type.TNumber;
    readonly targetToSource: Type.TNumber;
  },
  "distance" | "sourceToTarget" | "targetToSource",
  never
> = Type.Object(
  {
    distance: Type.Number({ minimum: 0 }),
    sourceToTarget: Type.Number({ minimum: 0 }),
    targetToSource: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoChamferDistanceResponse. */
export type SplatbaoChamferDistanceResponse = Static<typeof SplatbaoChamferDistanceResponseSchema>;

// Mesh-to-pointcloud (PyTorch3D)

/**
 * Mesh to point cloud sampling request.
 */
export const SplatbaoMeshToPointcloudRequestSchema: Type.TObject<
  { readonly meshData: Type.TString; readonly numSamples: Type.TOptional<Type.TInteger> },
  "meshData",
  "numSamples"
> = Type.Object(
  {
    meshData: Type.String({ minLength: 1, description: "Base64-encoded PLY/OBJ mesh" }),
    numSamples: Type.Optional(Type.Integer({ minimum: 100, maximum: 100000 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeshToPointcloudRequest. */
export type SplatbaoMeshToPointcloudRequest = Static<typeof SplatbaoMeshToPointcloudRequestSchema>;

/**
 * Mesh to point cloud response.
 */
export const SplatbaoMeshToPointcloudResponseSchema: Type.TObject<
  { readonly pointCloud: Type.TString; readonly pointCount: Type.TInteger },
  "pointCloud" | "pointCount",
  never
> = Type.Object(
  {
    pointCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY" }),
    pointCount: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeshToPointcloudResponse. */
export type SplatbaoMeshToPointcloudResponse = Static<
  typeof SplatbaoMeshToPointcloudResponseSchema
>;

// Differentiable alignment (PyTorch3D)

/**
 * PyTorch3D differentiable alignment request.
 */
export const SplatbaoDifferentiableAlignRequestSchema: Type.TObject<
  {
    readonly sourceCloud: Type.TString;
    readonly targetCloud: Type.TString;
    readonly maxIterations: Type.TOptional<Type.TInteger>;
    readonly learningRate: Type.TOptional<Type.TNumber>;
  },
  "sourceCloud" | "targetCloud",
  Type.InferOptionalKeys<{
    readonly sourceCloud: Type.TString;
    readonly targetCloud: Type.TString;
    readonly maxIterations: Type.TOptional<Type.TInteger>;
    readonly learningRate: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    sourceCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY (source)" }),
    targetCloud: Type.String({ minLength: 1, description: "Base64-encoded PLY (target)" }),
    maxIterations: Type.Optional(Type.Integer({ minimum: 1, maximum: 5000 })),
    learningRate: Type.Optional(Type.Number({ exclusiveMinimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDifferentiableAlignRequest. */
export type SplatbaoDifferentiableAlignRequest = Static<
  typeof SplatbaoDifferentiableAlignRequestSchema
>;

/**
 * Differentiable alignment response.
 */
export const SplatbaoDifferentiableAlignResponseSchema: Type.TObject<
  {
    readonly transformMatrix: Type.TArray<Type.TNumber>;
    readonly chamferDistance: Type.TNumber;
    readonly converged: Type.TBoolean;
    readonly iterations: Type.TInteger;
  },
  "transformMatrix" | "chamferDistance" | "converged" | "iterations",
  never
> = Type.Object(
  {
    transformMatrix: Type.Array(Type.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform",
    }),
    chamferDistance: Type.Number({ minimum: 0 }),
    converged: Type.Boolean(),
    iterations: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDifferentiableAlignResponse. */
export type SplatbaoDifferentiableAlignResponse = Static<
  typeof SplatbaoDifferentiableAlignResponseSchema
>;

// Render depth from mesh (PyTorch3D)

/**
 * Differentiable depth render request.
 */
export const SplatbaoRenderDepthRequestSchema = Type.Object(
  {
    meshData: Type.String({ minLength: 1, description: "Base64-encoded PLY/OBJ mesh" }),
    cameraPose: SplatbaoPose3DSchema,
    cameraInfo: SplatbaoCameraInfoSchema,
  },
  { additionalProperties: false },
);

/** Type SplatbaoRenderDepthRequest. */
export type SplatbaoRenderDepthRequest = Static<typeof SplatbaoRenderDepthRequestSchema>;

/**
 * Depth render response.
 */
export const SplatbaoRenderDepthResponseSchema: Type.TObject<
  {
    readonly depthImage: Type.TString;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
  },
  "width" | "height" | "depthImage",
  never
> = Type.Object(
  {
    depthImage: Type.String({ minLength: 1, description: "Base64-encoded depth image" }),
    width: Type.Integer({ minimum: 1 }),
    height: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoRenderDepthResponse. */
export type SplatbaoRenderDepthResponse = Static<typeof SplatbaoRenderDepthResponseSchema>;
