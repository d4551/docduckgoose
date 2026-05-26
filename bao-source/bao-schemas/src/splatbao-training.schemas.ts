/**
 * SplatBao spatial perception training schemas.
 *
 * Defines contract-first TypeBox schemas for spatial perception model
 * training, ONNX export, deployment, and data source configuration.
 *
 * @shared/schemas/splatbao-training
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

// Training data source

/**
 * Data type for spatial perception training.
 */
export const SplatbaoTrainingDataTypeSchema: TUnion<
  (
    | TLiteral<"point-cloud">
    | TLiteral<"camera-rgbd">
    | TLiteral<"detection-2d">
    | TLiteral<"detection-3d">
    | TLiteral<"segmentation-mask">
    | TLiteral<"depth-map">
    | TLiteral<"lidar-scan">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("point-cloud"),
  TypeExports.Literal("camera-rgbd"),
  TypeExports.Literal("detection-2d"),
  TypeExports.Literal("detection-3d"),
  TypeExports.Literal("segmentation-mask"),
  TypeExports.Literal("depth-map"),
  TypeExports.Literal("lidar-scan"),
]);

/** Type SplatbaoTrainingDataType. */
export type SplatbaoTrainingDataType = Static<typeof SplatbaoTrainingDataTypeSchema>;

/**
 * Capture mode for training data collection.
 */
export const SplatbaoTrainingCaptureModeSchema: TUnion<
  (TLiteral<"continuous"> | TLiteral<"on-demand"> | TLiteral<"scheduled">)[]
> = TypeExports.Union([
  TypeExports.Literal("continuous"),
  TypeExports.Literal("on-demand"),
  TypeExports.Literal("scheduled"),
]);

/** Type SplatbaoTrainingCaptureMode. */
export type SplatbaoTrainingCaptureMode = Static<typeof SplatbaoTrainingCaptureModeSchema>;

/**
 * Training data source definition.
 */
export const SplatbaoTrainingDataSourceSchema = TypeExports.Object(
  {
    sourceId: TypeExports.String({ minLength: 1 }),
    dataType: SplatbaoTrainingDataTypeSchema,
    captureMode: SplatbaoTrainingCaptureModeSchema,
    frameId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    anchorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    bunbuddyId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTrainingDataSource. */
export type SplatbaoTrainingDataSource = Static<typeof SplatbaoTrainingDataSourceSchema>;

// Training configuration

/**
 * Base model for spatial perception training.
 */
export const SplatbaoTrainingBaseModelSchema: TUnion<
  (
    | TLiteral<"yolov8n">
    | TLiteral<"yolov8s">
    | TLiteral<"detr-resnet-50">
    | TLiteral<"dpt-large">
    | TLiteral<"owl-vit-base-patch32">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("yolov8n"),
  TypeExports.Literal("yolov8s"),
  TypeExports.Literal("detr-resnet-50"),
  TypeExports.Literal("dpt-large"),
  TypeExports.Literal("owl-vit-base-patch32"),
]);

/** Type SplatbaoTrainingBaseModel. */
export type SplatbaoTrainingBaseModel = Static<typeof SplatbaoTrainingBaseModelSchema>;

/**
 * Export format for trained models.
 */
export const SplatbaoTrainingExportFormatSchema: TUnion<
  (TLiteral<"onnx"> | TLiteral<"pytorch"> | TLiteral<"tflite">)[]
> = TypeExports.Union([
  TypeExports.Literal("onnx"),
  TypeExports.Literal("pytorch"),
  TypeExports.Literal("tflite"),
]);

/** Type SplatbaoTrainingExportFormat. */
export type SplatbaoTrainingExportFormat = Static<typeof SplatbaoTrainingExportFormatSchema>;

/**
 * Target runtime for model deployment.
 */
export const SplatbaoTargetRuntimeSchema: TUnion<
  (
    | TLiteral<"bun-wasm">
    | TLiteral<"bun-onnx-node-bao">
    | TLiteral<"python-bunbuddy">
    | TLiteral<"client-webgpu">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("bun-wasm"),
  TypeExports.Literal("bun-onnx-node-bao"),
  TypeExports.Literal("python-bunbuddy"),
  TypeExports.Literal("client-webgpu"),
]);

/** Type SplatbaoTargetRuntime. */
export type SplatbaoTargetRuntime = Static<typeof SplatbaoTargetRuntimeSchema>;

/**
 * Spatial perception training configuration (input to startTraining).
 */
export const SplatbaoTrainingConfigSchema = TypeExports.Object(
  {
    baseModel: SplatbaoTrainingBaseModelSchema,
    datasetPath: TypeExports.String({ minLength: 1 }),
    numClasses: TypeExports.Integer({ minimum: 2 }),
    epochs: TypeExports.Integer({ minimum: 1, maximum: 1000 }),
    batchSize: TypeExports.Integer({ minimum: 1, maximum: 256 }),
    learningRate: TypeExports.Number({ minimum: 0.000001, maximum: 1 }),
    imageSize: TypeExports.Integer({ minimum: 32, maximum: 1024 }),
    exportFormats: TypeExports.Array(SplatbaoTrainingExportFormatSchema, { minItems: 1 }),
    freezeBackbone: TypeExports.Optional(TypeExports.Boolean()),
    augmentation: TypeExports.Optional(TypeExports.Boolean()),
    targetRuntime: TypeExports.Optional(SplatbaoTargetRuntimeSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoTrainingConfig. */
export type SplatbaoTrainingConfig = Static<typeof SplatbaoTrainingConfigSchema>;

// Model deployment

/**
 * Pipeline stage for spatial perception.
 */
export const SplatbaoPipelineStageSchema: TUnion<
  (
    | TLiteral<"object-detection">
    | TLiteral<"depth-estimation">
    | TLiteral<"instance-segmentation">
    | TLiteral<"point-cloud-classification">
    | TLiteral<"pose-estimation">
    | TLiteral<"icp-refinement">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("object-detection"),
  TypeExports.Literal("depth-estimation"),
  TypeExports.Literal("instance-segmentation"),
  TypeExports.Literal("point-cloud-classification"),
  TypeExports.Literal("pose-estimation"),
  TypeExports.Literal("icp-refinement"),
]);

/** Type SplatbaoPipelineStage. */
export type SplatbaoPipelineStage = Static<typeof SplatbaoPipelineStageSchema>;

/**
 * Model format for deployment.
 */
export const SplatbaoModelFormatSchema: TUnion<
  (TLiteral<"onnx"> | TLiteral<"pytorch"> | TLiteral<"ultralytics"> | TLiteral<"transformers-js">)[]
> = TypeExports.Union([
  TypeExports.Literal("onnx"),
  TypeExports.Literal("pytorch"),
  TypeExports.Literal("ultralytics"),
  TypeExports.Literal("transformers-js"),
]);

/** Type SplatbaoModelFormat. */
export type SplatbaoModelFormat = Static<typeof SplatbaoModelFormatSchema>;

/**
 * Deployment status.
 */
export const SplatbaoDeploymentStatusSchema: TUnion<
  (
    | TLiteral<"pending">
    | TLiteral<"deploying">
    | TLiteral<"active">
    | TLiteral<"failed">
    | TLiteral<"retired">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("pending"),
  TypeExports.Literal("deploying"),
  TypeExports.Literal("active"),
  TypeExports.Literal("failed"),
  TypeExports.Literal("retired"),
]);

/** Type SplatbaoDeploymentStatus. */
export type SplatbaoDeploymentStatus = Static<typeof SplatbaoDeploymentStatusSchema>;

/**
 * Model deployment record.
 */
export const SplatbaoModelDeploymentSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    trainingJobId: TypeExports.String({ minLength: 1 }),
    pipelineStage: SplatbaoPipelineStageSchema,
    modelFormat: SplatbaoModelFormatSchema,
    targetRuntime: SplatbaoTargetRuntimeSchema,
    status: SplatbaoDeploymentStatusSchema,
    onnxArtifactId: TypeExports.Optional(TypeExports.String()),
    modelRegistryId: TypeExports.Optional(TypeExports.String()),
    storagePath: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelDeployment. */
export type SplatbaoModelDeployment = Static<typeof SplatbaoModelDeploymentSchema>;

// ONNX export request

/**
 * ONNX export request.
 */
export const SplatbaoOnnxExportRequestSchema: TObject<
  {
    readonly jobId: TString;
    readonly modelType: TUnion<(TLiteral<"classification"> | TLiteral<"segmentation">)[]>;
    readonly inputShape: TOptional<TArray<TInteger>>;
    readonly opsetVersion: TOptional<TInteger>;
    readonly dynamicAxes: TOptional<TBoolean>;
  },
  "modelType" | "jobId",
  InferOptionalKeys<{
    readonly jobId: TString;
    readonly modelType: TUnion<(TLiteral<"classification"> | TLiteral<"segmentation">)[]>;
    readonly inputShape: TOptional<TArray<TInteger>>;
    readonly opsetVersion: TOptional<TInteger>;
    readonly dynamicAxes: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    jobId: TypeExports.String({ minLength: 1 }),
    modelType: TypeExports.Union([
      TypeExports.Literal("classification"),
      TypeExports.Literal("segmentation"),
    ]),
    inputShape: TypeExports.Optional(TypeExports.Array(TypeExports.Integer({ minimum: 1 }))),
    opsetVersion: TypeExports.Optional(TypeExports.Integer({ minimum: 11, maximum: 21 })),
    dynamicAxes: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxExportRequest. */
export type SplatbaoOnnxExportRequest = Static<typeof SplatbaoOnnxExportRequestSchema>;

/**
 * ONNX export response.
 */
export const SplatbaoOnnxExportResponseSchema: TObject<
  { readonly artifactId: TString; readonly storagePath: TString },
  "storagePath" | "artifactId",
  never
> = TypeExports.Object(
  {
    artifactId: TypeExports.String({ minLength: 1 }),
    storagePath: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxExportResponse. */
export type SplatbaoOnnxExportResponse = Static<typeof SplatbaoOnnxExportResponseSchema>;

// ONNX inference

/**
 * ONNX inference request (Bun-native @baohaus/onnx-node-bao).
 */
export const SplatbaoOnnxInferenceRequestSchema: TObject<
  {
    readonly modelPath: TString;
    readonly imageBase64: TString;
    readonly inputShape: TOptional<TArray<TInteger>>;
  },
  "modelPath" | "imageBase64",
  "inputShape"
> = TypeExports.Object(
  {
    modelPath: TypeExports.String({ minLength: 1 }),
    imageBase64: TypeExports.String({ minLength: 1 }),
    inputShape: TypeExports.Optional(TypeExports.Array(TypeExports.Integer({ minimum: 1 }))),
  },
  { additionalProperties: false },
);

/** Type SplatbaoOnnxInferenceRequest. */
export type SplatbaoOnnxInferenceRequest = Static<typeof SplatbaoOnnxInferenceRequestSchema>;

/**
 * ONNX inference response.
 */
export const SplatbaoOnnxInferenceResponseSchema: TObject<
  {
    readonly outputShape: TArray<TInteger>;
    readonly inferenceMs: TNumber;
    readonly detections: TOptional<
      TArray<
        TObject<
          {
            readonly classId: TString;
            readonly score: TNumber;
            readonly bbox: TArray<TNumber>;
          },
          "bbox" | "classId" | "score",
          never
        >
      >
    >;
  },
  "outputShape" | "inferenceMs",
  "detections"
> = TypeExports.Object(
  {
    outputShape: TypeExports.Array(TypeExports.Integer({ minimum: 0 })),
    inferenceMs: TypeExports.Number({ minimum: 0 }),
    detections: TypeExports.Optional(
      TypeExports.Array(
        TypeExports.Object({
          classId: TypeExports.String(),
          score: TypeExports.Number({ minimum: 0, maximum: 1 }),
          bbox: TypeExports.Array(TypeExports.Number(), { minItems: 4, maxItems: 4 }),
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
export const SplatbaoDeployRequestSchema: TObject<
  {
    readonly jobId: TString;
    readonly targetRuntime: TUnion<
      (
        | TLiteral<"bun-wasm">
        | TLiteral<"bun-onnx-node-bao">
        | TLiteral<"python-bunbuddy">
        | TLiteral<"client-webgpu">
      )[]
    >;
  },
  "jobId" | "targetRuntime",
  never
> = TypeExports.Object(
  {
    jobId: TypeExports.String({ minLength: 1 }),
    targetRuntime: SplatbaoTargetRuntimeSchema,
  },
  { additionalProperties: false },
);

/** Type SplatbaoDeployRequest. */
export type SplatbaoDeployRequest = Static<typeof SplatbaoDeployRequestSchema>;
