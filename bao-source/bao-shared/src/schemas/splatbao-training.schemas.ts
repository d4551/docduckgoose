/**
 * SplatBao spatial perception training schemas.
 *
 * Defines contract-first TypeBox schemas for spatial perception model
 * training, ONNX export, deployment, and data source configuration.
 *
 * @shared/schemas/splatbao-training
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";

// Training data source

/**
 * Data type for spatial perception training.
 */
export const SplatbaoTrainingDataTypeSchema: Type.TUnion<
  (
    | Type.TLiteral<"point-cloud">
    | Type.TLiteral<"camera-rgbd">
    | Type.TLiteral<"detection-2d">
    | Type.TLiteral<"detection-3d">
    | Type.TLiteral<"segmentation-mask">
    | Type.TLiteral<"depth-map">
    | Type.TLiteral<"lidar-scan">
  )[]
> = Type.Union([
  Type.Literal("point-cloud"),
  Type.Literal("camera-rgbd"),
  Type.Literal("detection-2d"),
  Type.Literal("detection-3d"),
  Type.Literal("segmentation-mask"),
  Type.Literal("depth-map"),
  Type.Literal("lidar-scan"),
]);

/** Type SplatbaoTrainingDataType. */
export type SplatbaoTrainingDataType = Static<typeof SplatbaoTrainingDataTypeSchema>;

/**
 * Capture mode for training data collection.
 */
export const SplatbaoTrainingCaptureModeSchema: Type.TUnion<
  (Type.TLiteral<"continuous"> | Type.TLiteral<"on-demand"> | Type.TLiteral<"scheduled">)[]
> = Type.Union([Type.Literal("continuous"), Type.Literal("on-demand"), Type.Literal("scheduled")]);

/** Type SplatbaoTrainingCaptureMode. */
export type SplatbaoTrainingCaptureMode = Static<typeof SplatbaoTrainingCaptureModeSchema>;

/**
 * Training data source definition.
 */
export const SplatbaoTrainingDataSourceSchema = Type.Object(
  {
    sourceId: Type.String({ minLength: 1 }),
    dataType: SplatbaoTrainingDataTypeSchema,
    captureMode: SplatbaoTrainingCaptureModeSchema,
    frameId: Type.Optional(Type.String({ minLength: 1 })),
    anchorId: Type.Optional(Type.String({ minLength: 1 })),
    bunbuddyId: Type.Optional(Type.String({ minLength: 1 })),
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTrainingDataSource. */
export type SplatbaoTrainingDataSource = Static<typeof SplatbaoTrainingDataSourceSchema>;

// Training configuration

/**
 * Base model for spatial perception training.
 */
export const SplatbaoTrainingBaseModelSchema: Type.TUnion<
  (
    | Type.TLiteral<"yolov8n">
    | Type.TLiteral<"yolov8s">
    | Type.TLiteral<"detr-resnet-50">
    | Type.TLiteral<"dpt-large">
    | Type.TLiteral<"owl-vit-base-patch32">
  )[]
> = Type.Union([
  Type.Literal("yolov8n"),
  Type.Literal("yolov8s"),
  Type.Literal("detr-resnet-50"),
  Type.Literal("dpt-large"),
  Type.Literal("owl-vit-base-patch32"),
]);

/** Type SplatbaoTrainingBaseModel. */
export type SplatbaoTrainingBaseModel = Static<typeof SplatbaoTrainingBaseModelSchema>;

/**
 * Export format for trained models.
 */
export const SplatbaoTrainingExportFormatSchema: Type.TUnion<
  (Type.TLiteral<"onnx"> | Type.TLiteral<"pytorch"> | Type.TLiteral<"tflite">)[]
> = Type.Union([Type.Literal("onnx"), Type.Literal("pytorch"), Type.Literal("tflite")]);

/** Type SplatbaoTrainingExportFormat. */
export type SplatbaoTrainingExportFormat = Static<typeof SplatbaoTrainingExportFormatSchema>;

/**
 * Target runtime for model deployment.
 */
export const SplatbaoTargetRuntimeSchema: Type.TUnion<
  (
    | Type.TLiteral<"bun-wasm">
    | Type.TLiteral<"bun-onnx-node-bao">
    | Type.TLiteral<"python-bunbuddy">
    | Type.TLiteral<"client-webgpu">
  )[]
> = Type.Union([
  Type.Literal("bun-wasm"),
  Type.Literal("bun-onnx-node-bao"),
  Type.Literal("python-bunbuddy"),
  Type.Literal("client-webgpu"),
]);

/** Type SplatbaoTargetRuntime. */
export type SplatbaoTargetRuntime = Static<typeof SplatbaoTargetRuntimeSchema>;

/**
 * Spatial perception training configuration (input to startTraining).
 */
export const SplatbaoTrainingConfigSchema = Type.Object(
  {
    baseModel: SplatbaoTrainingBaseModelSchema,
    datasetPath: Type.String({ minLength: 1 }),
    numClasses: Type.Integer({ minimum: 2 }),
    epochs: Type.Integer({ minimum: 1, maximum: 1000 }),
    batchSize: Type.Integer({ minimum: 1, maximum: 256 }),
    learningRate: Type.Number({ minimum: 0.000001, maximum: 1 }),
    imageSize: Type.Integer({ minimum: 32, maximum: 1024 }),
    exportFormats: Type.Array(SplatbaoTrainingExportFormatSchema, { minItems: 1 }),
    freezeBackbone: Type.Optional(Type.Boolean()),
    augmentation: Type.Optional(Type.Boolean()),
    targetRuntime: Type.Optional(SplatbaoTargetRuntimeSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTrainingConfig. */
export type SplatbaoTrainingConfig = Static<typeof SplatbaoTrainingConfigSchema>;

// Model deployment

/**
 * Pipeline stage for spatial perception.
 */
export const SplatbaoPipelineStageSchema: Type.TUnion<
  (
    | Type.TLiteral<"object-detection">
    | Type.TLiteral<"depth-estimation">
    | Type.TLiteral<"instance-segmentation">
    | Type.TLiteral<"point-cloud-classification">
    | Type.TLiteral<"pose-estimation">
    | Type.TLiteral<"icp-refinement">
  )[]
> = Type.Union([
  Type.Literal("object-detection"),
  Type.Literal("depth-estimation"),
  Type.Literal("instance-segmentation"),
  Type.Literal("point-cloud-classification"),
  Type.Literal("pose-estimation"),
  Type.Literal("icp-refinement"),
]);

/** Type SplatbaoPipelineStage. */
export type SplatbaoPipelineStage = Static<typeof SplatbaoPipelineStageSchema>;

/**
 * Model format for deployment.
 */
export const SplatbaoModelFormatSchema: Type.TUnion<
  (
    | Type.TLiteral<"onnx">
    | Type.TLiteral<"pytorch">
    | Type.TLiteral<"ultralytics">
    | Type.TLiteral<"transformers-js">
  )[]
> = Type.Union([
  Type.Literal("onnx"),
  Type.Literal("pytorch"),
  Type.Literal("ultralytics"),
  Type.Literal("transformers-js"),
]);

/** Type SplatbaoModelFormat. */
export type SplatbaoModelFormat = Static<typeof SplatbaoModelFormatSchema>;

/**
 * Deployment status.
 */
export const SplatbaoDeploymentStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"pending">
    | Type.TLiteral<"deploying">
    | Type.TLiteral<"active">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"retired">
  )[]
> = Type.Union([
  Type.Literal("pending"),
  Type.Literal("deploying"),
  Type.Literal("active"),
  Type.Literal("failed"),
  Type.Literal("retired"),
]);

/** Type SplatbaoDeploymentStatus. */
export type SplatbaoDeploymentStatus = Static<typeof SplatbaoDeploymentStatusSchema>;

/**
 * Model deployment record.
 */
export const SplatbaoModelDeploymentSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    trainingJobId: Type.String({ minLength: 1 }),
    pipelineStage: SplatbaoPipelineStageSchema,
    modelFormat: SplatbaoModelFormatSchema,
    targetRuntime: SplatbaoTargetRuntimeSchema,
    status: SplatbaoDeploymentStatusSchema,
    onnxArtifactId: Type.Optional(Type.String()),
    modelRegistryId: Type.Optional(Type.String()),
    storagePath: Type.Optional(Type.String()),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelDeployment. */
export type SplatbaoModelDeployment = Static<typeof SplatbaoModelDeploymentSchema>;

// ONNX export request

/**
 * ONNX export request.
 */
export const SplatbaoOnnxExportRequestSchema: Type.TObject<
  {
    readonly jobId: Type.TString;
    readonly modelType: Type.TUnion<
      (Type.TLiteral<"classification"> | Type.TLiteral<"segmentation">)[]
    >;
    readonly inputShape: Type.TOptional<Type.TArray<Type.TInteger>>;
    readonly opsetVersion: Type.TOptional<Type.TInteger>;
    readonly dynamicAxes: Type.TOptional<Type.TBoolean>;
  },
  "modelType" | "jobId",
  Type.InferOptionalKeys<{
    readonly jobId: Type.TString;
    readonly modelType: Type.TUnion<
      (Type.TLiteral<"classification"> | Type.TLiteral<"segmentation">)[]
    >;
    readonly inputShape: Type.TOptional<Type.TArray<Type.TInteger>>;
    readonly opsetVersion: Type.TOptional<Type.TInteger>;
    readonly dynamicAxes: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
    modelType: Type.Union([Type.Literal("classification"), Type.Literal("segmentation")]),
    inputShape: Type.Optional(Type.Array(Type.Integer({ minimum: 1 }))),
    opsetVersion: Type.Optional(Type.Integer({ minimum: 11, maximum: 21 })),
    dynamicAxes: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxExportRequest. */
export type SplatbaoOnnxExportRequest = Static<typeof SplatbaoOnnxExportRequestSchema>;

/**
 * ONNX export response.
 */
export const SplatbaoOnnxExportResponseSchema: Type.TObject<
  { readonly artifactId: Type.TString; readonly storagePath: Type.TString },
  "storagePath" | "artifactId",
  never
> = Type.Object(
  {
    artifactId: Type.String({ minLength: 1 }),
    storagePath: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxExportResponse. */
export type SplatbaoOnnxExportResponse = Static<typeof SplatbaoOnnxExportResponseSchema>;

// ONNX inference

/**
 * ONNX inference request (Bun-native @baohaus/onnx-node-bao).
 */
export const SplatbaoOnnxInferenceRequestSchema: Type.TObject<
  {
    readonly modelPath: Type.TString;
    readonly imageBase64: Type.TString;
    readonly inputShape: Type.TOptional<Type.TArray<Type.TInteger>>;
  },
  "modelPath" | "imageBase64",
  "inputShape"
> = Type.Object(
  {
    modelPath: Type.String({ minLength: 1 }),
    imageBase64: Type.String({ minLength: 1 }),
    inputShape: Type.Optional(Type.Array(Type.Integer({ minimum: 1 }))),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxInferenceRequest. */
export type SplatbaoOnnxInferenceRequest = Static<typeof SplatbaoOnnxInferenceRequestSchema>;

/**
 * ONNX inference response.
 */
export const SplatbaoOnnxInferenceResponseSchema: Type.TObject<
  {
    readonly outputShape: Type.TArray<Type.TInteger>;
    readonly inferenceMs: Type.TNumber;
    readonly detections: Type.TOptional<
      Type.TArray<
        Type.TObject<
          {
            readonly classId: Type.TString;
            readonly score: Type.TNumber;
            readonly bbox: Type.TArray<Type.TNumber>;
          },
          "bbox" | "classId" | "score",
          never
        >
      >
    >;
  },
  "outputShape" | "inferenceMs",
  "detections"
> = Type.Object(
  {
    outputShape: Type.Array(Type.Integer({ minimum: 0 })),
    inferenceMs: Type.Number({ minimum: 0 }),
    detections: Type.Optional(
      Type.Array(
        Type.Object({
          classId: Type.String(),
          score: Type.Number({ minimum: 0, maximum: 1 }),
          bbox: Type.Array(Type.Number(), { minItems: 4, maxItems: 4 }),
        }),
      ),
    ),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxInferenceResponse. */
export type SplatbaoOnnxInferenceResponse = Static<typeof SplatbaoOnnxInferenceResponseSchema>;

// Deploy request

/**
 * Deploy model to runtime request.
 */
export const SplatbaoDeployRequestSchema: Type.TObject<
  {
    readonly jobId: Type.TString;
    readonly targetRuntime: Type.TUnion<
      (
        | Type.TLiteral<"bun-wasm">
        | Type.TLiteral<"bun-onnx-node-bao">
        | Type.TLiteral<"python-bunbuddy">
        | Type.TLiteral<"client-webgpu">
      )[]
    >;
  },
  "jobId" | "targetRuntime",
  never
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
    targetRuntime: SplatbaoTargetRuntimeSchema,
  },
  { additionalProperties: false },
);

/** Type SplatbaoDeployRequest. */
export type SplatbaoDeployRequest = Static<typeof SplatbaoDeployRequestSchema>;
