/**
 * SplatBao spatial perception schemas.
 *
 * Defines contract-first TypeBox schemas for spatial detection, fusion,
 * depth-to-cloud, and local inference payloads used by the perception pipeline.
 *
 * @shared/schemas/splatbao-perception
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
import { Position3DSchema as SplatbaoPosition3DSchema } from "./navigation.schemas.ts";

export type { Position3D as SplatbaoPosition3D } from "./navigation.schemas.ts";

// Shared spatial primitives

/**
 * 2D width/height dimensions.
 */
export const SplatbaoWidthHeightSchema: TObject<
  { readonly width: TNumber; readonly height: TNumber },
  "width" | "height",
  never
> = TypeExports.Object(
  {
    width: TypeExports.Number({ minimum: 0 }),
    height: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWidthHeight. */
export type SplatbaoWidthHeight = Static<typeof SplatbaoWidthHeightSchema>;

/**
 * Quaternion orientation (x, y, z, w).
 */
export const SplatbaoQuaternionSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
    readonly w: TNumber;
  },
  "x" | "y" | "z" | "w",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Number(),
    w: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Type SplatbaoQuaternion. */
export type SplatbaoQuaternion = Static<typeof SplatbaoQuaternionSchema>;

/**
 * 3D bounding box size (width, height, depth).
 */
export const SplatbaoBBox3DSizeSchema: TObject<
  { readonly width: TNumber; readonly height: TNumber; readonly depth: TNumber },
  "width" | "height" | "depth",
  never
> = TypeExports.Object(
  {
    width: TypeExports.Number({ minimum: 0 }),
    height: TypeExports.Number({ minimum: 0 }),
    depth: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoBBox3DSize. */
export type SplatbaoBBox3DSize = Static<typeof SplatbaoBBox3DSizeSchema>;

/**
 * 6-DOF pose (position + quaternion orientation).
 */
export const SplatbaoPose3DSchema: TObject<
  {
    readonly position: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly orientation: TObject<
      {
        readonly x: TNumber;
        readonly y: TNumber;
        readonly z: TNumber;
        readonly w: TNumber;
      },
      "x" | "y" | "z" | "w",
      never
    >;
  },
  "position" | "orientation",
  never
> = TypeExports.Object(
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
export const SplatbaoBBox2DSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly width: TNumber;
    readonly height: TNumber;
  },
  "x" | "y" | "width" | "height",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number({ minimum: 0, maximum: 1 }),
    y: TypeExports.Number({ minimum: 0, maximum: 1 }),
    width: TypeExports.Number({ minimum: 0, maximum: 1 }),
    height: TypeExports.Number({ minimum: 0, maximum: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoBBox2D. */
export type SplatbaoBBox2D = Static<typeof SplatbaoBBox2DSchema>;

// Camera info

/**
 * Camera intrinsics for projection/unprojection.
 */
export const SplatbaoCameraInfoSchema: TObject<
  {
    readonly fx: TNumber;
    readonly fy: TNumber;
    readonly cx: TNumber;
    readonly cy: TNumber;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly frameId: TOptional<TString>;
  },
  "fx" | "fy" | "cx" | "cy" | "width" | "height",
  "frameId"
> = TypeExports.Object(
  {
    fx: TypeExports.Number({ exclusiveMinimum: 0 }),
    fy: TypeExports.Number({ exclusiveMinimum: 0 }),
    cx: TypeExports.Number(),
    cy: TypeExports.Number(),
    width: TypeExports.Integer({ minimum: 1 }),
    height: TypeExports.Integer({ minimum: 1 }),
    frameId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoCameraInfo. */
export type SplatbaoCameraInfo = Static<typeof SplatbaoCameraInfoSchema>;

// Filling — mask/region content for segmentation output

/**
 * RLE-encoded mask (run-length encoding).
 */
export const SplatbaoFillingRleSchema: TObject<
  {
    readonly format: TLiteral<"rle">;
    readonly counts: TArray<TInteger>;
    readonly size: TObject<
      { readonly width: TNumber; readonly height: TNumber },
      "width" | "height",
      never
    >;
    readonly value: TOptional<TNumber>;
  },
  "format" | "counts" | "size",
  "value"
> = TypeExports.Object(
  {
    format: TypeExports.Literal("rle"),
    counts: TypeExports.Array(TypeExports.Integer({ minimum: 0 })),
    size: SplatbaoWidthHeightSchema,
    value: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFillingRle. */
export type SplatbaoFillingRle = Static<typeof SplatbaoFillingRleSchema>;

/**
 * Base64-encoded binary mask.
 */
export const SplatbaoFillingMaskSchema: TObject<
  {
    readonly format: TLiteral<"mask">;
    readonly data: TString;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly channels: TOptional<TInteger>;
  },
  "format" | "width" | "height" | "data",
  "channels"
> = TypeExports.Object(
  {
    format: TypeExports.Literal("mask"),
    data: TypeExports.String({ minLength: 1, description: "Base64-encoded binary mask" }),
    width: TypeExports.Integer({ minimum: 1 }),
    height: TypeExports.Integer({ minimum: 1 }),
    channels: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 4 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFillingMask. */
export type SplatbaoFillingMask = Static<typeof SplatbaoFillingMaskSchema>;

/**
 * Union of filling formats (RLE or mask).
 */
export const SplatbaoFillingSchema: TUnion<
  (
    | TObject<
        {
          readonly format: TLiteral<"rle">;
          readonly counts: TArray<TInteger>;
          readonly size: TObject<
            { readonly width: TNumber; readonly height: TNumber },
            "width" | "height",
            never
          >;
          readonly value: TOptional<TNumber>;
        },
        "format" | "counts" | "size",
        "value"
      >
    | TObject<
        {
          readonly format: TLiteral<"mask">;
          readonly data: TString;
          readonly width: TInteger;
          readonly height: TInteger;
          readonly channels: TOptional<TInteger>;
        },
        "format" | "width" | "height" | "data",
        "channels"
      >
  )[]
> = TypeExports.Union([SplatbaoFillingRleSchema, SplatbaoFillingMaskSchema], {});

/** Type SplatbaoFilling. */
export type SplatbaoFilling = Static<typeof SplatbaoFillingSchema>;

// 3D detection

/**
 * Enhanced 3D detection result.
 */
export const SplatbaoDetection3DSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    classId: TypeExports.String({ minLength: 1 }),
    score: TypeExports.Number({ minimum: 0, maximum: 1 }),
    pose: SplatbaoPose3DSchema,
    size: SplatbaoBBox3DSizeSchema,
    frameId: TypeExports.String({ minLength: 1 }),
    croppedPointCloud: TypeExports.Optional(
      TypeExports.String({ description: "Base64-encoded PLY" }),
    ),
    projection2D: TypeExports.Optional(SplatbaoBBox2DSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    filling: TypeExports.Optional(SplatbaoFillingSchema),
    instanceId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDetection3D. */
export type SplatbaoDetection3D = Static<typeof SplatbaoDetection3DSchema>;

// Fusion

/**
 * 2D detection for fusion input.
 */
export const SplatbaoDetection2DSchema = TypeExports.Object(
  {
    classId: TypeExports.String({ minLength: 1 }),
    score: TypeExports.Number({ minimum: 0, maximum: 1 }),
    bbox: SplatbaoBBox2DSchema,
    filling: TypeExports.Optional(SplatbaoFillingSchema),
    instanceId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDetection2D. */
export type SplatbaoDetection2D = Static<typeof SplatbaoDetection2DSchema>;

/**
 * Multimodal detection fusion request.
 */
export const SplatbaoFusionRequestSchema = TypeExports.Object(
  {
    detections2D: TypeExports.Array(SplatbaoDetection2DSchema),
    detections3D: TypeExports.Array(SplatbaoDetection3DSchema),
    cameraInfo: SplatbaoCameraInfoSchema,
    sourceFrame: TypeExports.String({ minLength: 1 }),
    targetFrame: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFusionRequest. */
export type SplatbaoFusionRequest = Static<typeof SplatbaoFusionRequestSchema>;

/**
 * Multimodal detection fusion response.
 */
export const SplatbaoFusionResponseSchema = TypeExports.Object(
  {
    detections: TypeExports.Array(SplatbaoDetection3DSchema),
    fusionMethod: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoFusionResponse. */
export type SplatbaoFusionResponse = Static<typeof SplatbaoFusionResponseSchema>;

// Depth-to-cloud

/**
 * Depth image to point cloud conversion request.
 */
export const SplatbaoDepthToCloudRequestSchema: TObject<
  {
    readonly depthImage: TString;
    readonly cameraInfo: TObject<
      {
        readonly fx: TNumber;
        readonly fy: TNumber;
        readonly cx: TNumber;
        readonly cy: TNumber;
        readonly width: TInteger;
        readonly height: TInteger;
        readonly frameId: TOptional<TString>;
      },
      "width" | "height" | "fx" | "fy" | "cx" | "cy",
      "frameId"
    >;
    readonly targetFrame: TString;
  },
  "cameraInfo" | "targetFrame" | "depthImage",
  never
> = TypeExports.Object(
  {
    depthImage: TypeExports.String({ minLength: 1, description: "Base64-encoded depth image" }),
    cameraInfo: SplatbaoCameraInfoSchema,
    targetFrame: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDepthToCloudRequest. */
export type SplatbaoDepthToCloudRequest = Static<typeof SplatbaoDepthToCloudRequestSchema>;

/**
 * Depth to point cloud conversion response.
 */
export const SplatbaoDepthToCloudResponseSchema: TObject<
  {
    readonly pointCloud: TString;
    readonly pointCount: TInteger;
    readonly bounds: TObject<
      {
        readonly min: TObject<
          { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly max: TObject<
          { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
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
> = TypeExports.Object(
  {
    pointCloud: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY" }),
    pointCount: TypeExports.Integer({ minimum: 0 }),
    bounds: TypeExports.Object({
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
export const SplatbaoLocalDetectionRequestSchema: TObject<
  {
    readonly image: TString;
    readonly threshold: TOptional<TNumber>;
    readonly candidateLabels: TOptional<TArray<TString>>;
  },
  "image",
  InferOptionalKeys<{
    readonly image: TString;
    readonly threshold: TOptional<TNumber>;
    readonly candidateLabels: TOptional<TArray<TString>>;
  }>
> = TypeExports.Object(
  {
    image: TypeExports.String({ minLength: 1, description: "Base64-encoded image" }),
    threshold: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
    candidateLabels: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    ),
  },
  { additionalProperties: false },
);

/** Type SplatbaoLocalDetectionRequest. */
export type SplatbaoLocalDetectionRequest = Static<typeof SplatbaoLocalDetectionRequestSchema>;

/**
 * Local detection response.
 */
export const SplatbaoLocalDetectionResponseSchema = TypeExports.Object(
  {
    detections: TypeExports.Array(SplatbaoDetection2DSchema),
    modelUsed: TypeExports.String({ minLength: 1 }),
    inferenceMs: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoLocalDetectionResponse. */
export type SplatbaoLocalDetectionResponse = Static<typeof SplatbaoLocalDetectionResponseSchema>;

// ICP alignment request/response

/**
 * ICP alignment request between two point clouds.
 */
export const SplatbaoIcpAlignRequestSchema: TObject<
  {
    readonly sourceCloud: TString;
    readonly targetCloud: TString;
    readonly initialTransform: TOptional<TArray<TNumber>>;
    readonly maxIterations: TOptional<TInteger>;
    readonly threshold: TOptional<TNumber>;
  },
  "sourceCloud" | "targetCloud",
  InferOptionalKeys<{
    readonly sourceCloud: TString;
    readonly targetCloud: TString;
    readonly initialTransform: TOptional<TArray<TNumber>>;
    readonly maxIterations: TOptional<TInteger>;
    readonly threshold: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    sourceCloud: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY (source)" }),
    targetCloud: TypeExports.String({
      minLength: 1,
      description: "Base64-encoded PLY (target/template)",
    }),
    initialTransform: TypeExports.Optional(
      TypeExports.Array(TypeExports.Number(), {
        minItems: 16,
        maxItems: 16,
        description: "4x4 column-major",
      }),
    ),
    maxIterations: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 1000 })),
    threshold: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoIcpAlignRequest. */
export type SplatbaoIcpAlignRequest = Static<typeof SplatbaoIcpAlignRequestSchema>;

/**
 * ICP alignment response.
 */
export const SplatbaoIcpAlignResponseSchema: TObject<
  {
    readonly transformMatrix: TArray<TNumber>;
    readonly fitness: TNumber;
    readonly rmse: TNumber;
    readonly converged: TBoolean;
  },
  "transformMatrix" | "fitness" | "rmse" | "converged",
  never
> = TypeExports.Object(
  {
    transformMatrix: TypeExports.Array(TypeExports.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform",
    }),
    fitness: TypeExports.Number({ minimum: 0, maximum: 1 }),
    rmse: TypeExports.Number({ minimum: 0 }),
    converged: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Type SplatbaoIcpAlignResponse. */
export type SplatbaoIcpAlignResponse = Static<typeof SplatbaoIcpAlignResponseSchema>;

// Chamfer distance (PyTorch3D)

/**
 * Chamfer distance request between two point clouds.
 */
export const SplatbaoChamferDistanceRequestSchema: TObject<
  { readonly sourceCloud: TString; readonly targetCloud: TString },
  "sourceCloud" | "targetCloud",
  never
> = TypeExports.Object(
  {
    sourceCloud: TypeExports.String({
      minLength: 1,
      description: "Base64-encoded PLY (predicted)",
    }),
    targetCloud: TypeExports.String({
      minLength: 1,
      description: "Base64-encoded PLY (ground truth)",
    }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoChamferDistanceRequest. */
export type SplatbaoChamferDistanceRequest = Static<typeof SplatbaoChamferDistanceRequestSchema>;

/**
 * Chamfer distance response.
 */
export const SplatbaoChamferDistanceResponseSchema: TObject<
  {
    readonly distance: TNumber;
    readonly sourceToTarget: TNumber;
    readonly targetToSource: TNumber;
  },
  "distance" | "sourceToTarget" | "targetToSource",
  never
> = TypeExports.Object(
  {
    distance: TypeExports.Number({ minimum: 0 }),
    sourceToTarget: TypeExports.Number({ minimum: 0 }),
    targetToSource: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoChamferDistanceResponse. */
export type SplatbaoChamferDistanceResponse = Static<typeof SplatbaoChamferDistanceResponseSchema>;

// Mesh-to-pointcloud (PyTorch3D)

/**
 * Mesh to point cloud sampling request.
 */
export const SplatbaoMeshToPointcloudRequestSchema: TObject<
  { readonly meshData: TString; readonly numSamples: TOptional<TInteger> },
  "meshData",
  "numSamples"
> = TypeExports.Object(
  {
    meshData: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY/OBJ mesh" }),
    numSamples: TypeExports.Optional(TypeExports.Integer({ minimum: 100, maximum: 100000 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeshToPointcloudRequest. */
export type SplatbaoMeshToPointcloudRequest = Static<typeof SplatbaoMeshToPointcloudRequestSchema>;

/**
 * Mesh to point cloud response.
 */
export const SplatbaoMeshToPointcloudResponseSchema: TObject<
  { readonly pointCloud: TString; readonly pointCount: TInteger },
  "pointCloud" | "pointCount",
  never
> = TypeExports.Object(
  {
    pointCloud: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY" }),
    pointCount: TypeExports.Integer({ minimum: 0 }),
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
export const SplatbaoDifferentiableAlignRequestSchema: TObject<
  {
    readonly sourceCloud: TString;
    readonly targetCloud: TString;
    readonly maxIterations: TOptional<TInteger>;
    readonly learningRate: TOptional<TNumber>;
  },
  "sourceCloud" | "targetCloud",
  InferOptionalKeys<{
    readonly sourceCloud: TString;
    readonly targetCloud: TString;
    readonly maxIterations: TOptional<TInteger>;
    readonly learningRate: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    sourceCloud: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY (source)" }),
    targetCloud: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY (target)" }),
    maxIterations: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 5000 })),
    learningRate: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0, maximum: 1 })),
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
export const SplatbaoDifferentiableAlignResponseSchema: TObject<
  {
    readonly transformMatrix: TArray<TNumber>;
    readonly chamferDistance: TNumber;
    readonly converged: TBoolean;
    readonly iterations: TInteger;
  },
  "transformMatrix" | "chamferDistance" | "converged" | "iterations",
  never
> = TypeExports.Object(
  {
    transformMatrix: TypeExports.Array(TypeExports.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform",
    }),
    chamferDistance: TypeExports.Number({ minimum: 0 }),
    converged: TypeExports.Boolean(),
    iterations: TypeExports.Integer({ minimum: 0 }),
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
export const SplatbaoRenderDepthRequestSchema = TypeExports.Object(
  {
    meshData: TypeExports.String({ minLength: 1, description: "Base64-encoded PLY/OBJ mesh" }),
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
export const SplatbaoRenderDepthResponseSchema: TObject<
  {
    readonly depthImage: TString;
    readonly width: TInteger;
    readonly height: TInteger;
  },
  "width" | "height" | "depthImage",
  never
> = TypeExports.Object(
  {
    depthImage: TypeExports.String({ minLength: 1, description: "Base64-encoded depth image" }),
    width: TypeExports.Integer({ minimum: 1 }),
    height: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoRenderDepthResponse. */
export type SplatbaoRenderDepthResponse = Static<typeof SplatbaoRenderDepthResponseSchema>;
