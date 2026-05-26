/**
 * Orchestration request schemas.
 *
 * Defines shared schemas for AI orchestration operations (model downloads,
 * dataset synchronization) to keep server and client contracts aligned.
 *
 * @shared/schemas/orchestration.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS } from "../constants/pipeline-constraints.ts";
import { stringEnum } from "./baobox-enum.ts";

// Model Download Types

/**
 * Supported model download status values.
 */
export const MODEL_DOWNLOAD_STATUSES: readonly [
  "pending",
  "downloading",
  "extracting",
  "completed",
  "failed",
  "cancelled",
] = ["pending", "downloading", "extracting", "completed", "failed", "cancelled"] as const;

/**
 * Type-safe model download status.
 */
export type ModelDownloadStatus = (typeof MODEL_DOWNLOAD_STATUSES)[number];

/**
 * Model download status schema.
 */
export const ModelDownloadStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"pending" | "downloading" | "extracting" | "completed" | "failed" | "cancelled">,
    ...Type.TLiteral<
      "pending" | "downloading" | "extracting" | "completed" | "failed" | "cancelled"
    >[],
  ]
> = stringEnum(MODEL_DOWNLOAD_STATUSES, {
  description: "Model download status",
});

/**
 * Model download source options.
 */
export const ModelDownloadSourceSchema: Type.TUnion<
  (
    | Type.TLiteral<"huggingface">
    | Type.TLiteral<"nim">
    | Type.TLiteral<"local">
    | Type.TLiteral<"registry">
  )[]
> = Type.Union([
  Type.Literal("huggingface"),
  Type.Literal("nim"),
  Type.Literal("local"),
  Type.Literal("registry"),
]);

/**
 * Type-safe model download source.
 */
export type ModelDownloadSource = Static<typeof ModelDownloadSourceSchema>;

/**
 * Model download file schema.
 */
export const ModelDownloadFileSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly size: Type.TNumber;
    readonly progress: Type.TNumber;
    readonly completed: Type.TBoolean;
  },
  "name" | "size" | "progress" | "completed",
  never
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    size: Type.Number({ minimum: 0 }),
    progress: Type.Number({ minimum: 0, maximum: 1 }),
    completed: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for download file metadata.
 */
export type ModelDownloadFile = Static<typeof ModelDownloadFileSchema>;

/**
 * Model download job schema.
 */
export const ModelDownloadJobSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
      }),
    ),
    modelId: Type.String({ minLength: 1 }),
    source: ModelDownloadSourceSchema,
    targetPath: Type.String({ minLength: 1 }),
    status: ModelDownloadStatusSchema,
    progress: Type.Number({ minimum: 0, maximum: 1 }),
    totalBytes: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    downloadedBytes: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    error: Type.Optional(Type.String({ minLength: 1 })),
    files: Type.Optional(Type.Array(ModelDownloadFileSchema)),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for download job payloads.
 */
export type ModelDownloadJob = Static<typeof ModelDownloadJobSchema>;

/**
 * Schema for model download requests.
 */
export const ModelDownloadInputSchema = Type.Object(
  {
    modelId: Type.String({
      minLength: 1,
      description: "HuggingFace model ID (e.g., meta-llama/Meta-Llama-3-8B)",
    }),
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
        description: "Optional idempotency key to deduplicate downloads.",
      }),
    ),
    source: Type.Optional(ModelDownloadSourceSchema),
    revision: Type.Optional(Type.String({ description: "Branch, tag, or commit hash" })),
    targetPath: Type.Optional(Type.String({ description: "Custom target directory" })),
    files: Type.Optional(Type.Array(Type.String(), { description: "Specific files to download" })),
  },
  {},
);

/**
 * TypeScript type for model download requests.
 */
export type ModelDownloadInput = Static<typeof ModelDownloadInputSchema>;

// Dataset Sync Types

/**
 * Supported dataset sync status values.
 */
export const DATASET_SYNC_STATUSES: readonly [
  "pending",
  "syncing",
  "processing",
  "completed",
  "failed",
  "cancelled",
] = ["pending", "syncing", "processing", "completed", "failed", "cancelled"] as const;

/**
 * Type-safe dataset sync status.
 */
export type DatasetSyncStatus = (typeof DATASET_SYNC_STATUSES)[number];

/**
 * Dataset sync status schema.
 */
export const DatasetSyncStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"pending" | "syncing" | "processing" | "completed" | "failed" | "cancelled">,
    ...Type.TLiteral<"pending" | "syncing" | "processing" | "completed" | "failed" | "cancelled">[],
  ]
> = stringEnum(DATASET_SYNC_STATUSES, {
  description: "Dataset sync status",
});

/**
 * Dataset sync source options.
 */
export const DatasetSyncSourceSchema: Type.TUnion<
  (
    | Type.TLiteral<"huggingface">
    | Type.TLiteral<"local">
    | Type.TLiteral<"upload">
    | Type.TLiteral<"s3">
  )[]
> = Type.Union([
  Type.Literal("huggingface"),
  Type.Literal("local"),
  Type.Literal("upload"),
  Type.Literal("s3"),
]);

/**
 * Type-safe dataset sync source.
 */
export type DatasetSyncSource = Static<typeof DatasetSyncSourceSchema>;

/**
 * Dataset feature schema.
 */
export const DatasetFeatureSchema: Type.TObject<
  { readonly name: Type.TString; readonly dtype: Type.TString },
  "name" | "dtype",
  never
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    dtype: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset feature metadata.
 */
export type DatasetFeature = Static<typeof DatasetFeatureSchema>;

/**
 * Dataset info schema.
 */
export const DatasetInfoSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String()),
    author: Type.Optional(Type.String()),
    splits: Type.Array(Type.String({ minLength: 1 })),
    numRows: Type.Optional(Type.Record(Type.String({ minLength: 1 }), Type.Number({ minimum: 0 }))),
    features: Type.Optional(Type.Record(Type.String({ minLength: 1 }), DatasetFeatureSchema)),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    cached: Type.Boolean(),
    cachePath: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset info payloads.
 */
export type DatasetInfo = Static<typeof DatasetInfoSchema>;

/**
 * Dataset sync job schema.
 */
export const DatasetSyncJobSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
      }),
    ),
    datasetId: Type.String({ minLength: 1 }),
    source: DatasetSyncSourceSchema,
    status: DatasetSyncStatusSchema,
    progress: Type.Number({ minimum: 0, maximum: 1 }),
    splits: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    cachePath: Type.Optional(Type.String()),
    numExamples: Type.Optional(Type.Number({ minimum: 0 })),
    error: Type.Optional(Type.String({ minLength: 1 })),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset sync job payloads.
 */
export type DatasetSyncJob = Static<typeof DatasetSyncJobSchema>;

/**
 * Schema for dataset sync requests.
 */
export const DatasetSyncInputSchema = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
        description: "Optional idempotency key to deduplicate dataset syncs.",
      }),
    ),
    datasetId: Type.String({
      minLength: 1,
      description: "HuggingFace dataset ID (e.g., squad, wikitext)",
    }),
    source: Type.Optional(DatasetSyncSourceSchema),
    config: Type.Optional(Type.String({ description: "Dataset config/subset name" })),
    splits: Type.Optional(
      Type.Array(Type.String(), { description: "Splits to sync (e.g., train)" }),
    ),
    streaming: Type.Optional(Type.Boolean({ description: "Use streaming mode" })),
  },
  {},
);

/**
 * TypeScript type for dataset sync requests.
 */
export type DatasetSyncInput = Static<typeof DatasetSyncInputSchema>;

// Orchestration Responses

/**
 * Schema for model download job responses.
 */
export const ModelDownloadJobResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ModelDownloadJobSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for model download job responses.
 */
export type ModelDownloadJobResponse = Static<typeof ModelDownloadJobResponseSchema>;

/**
 * Schema for model download job list responses.
 */
export const ModelDownloadJobListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(ModelDownloadJobSchema),
    count: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for model download list responses.
 */
export type ModelDownloadJobListResponse = Static<typeof ModelDownloadJobListResponseSchema>;

/**
 * Schema for model download cancel responses.
 */
export const ModelDownloadCancelResponseSchema: Type.TObject<
  { readonly ok: Type.TLiteral<true>; readonly cancelled: Type.TBoolean },
  "cancelled" | "ok",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    cancelled: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for model download cancel responses.
 */
export type ModelDownloadCancelResponse = Static<typeof ModelDownloadCancelResponseSchema>;

/**
 * Schema for model cache list responses.
 */
export const ModelCacheListResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly items: Type.TArray<Type.TString>;
    readonly count: Type.TInteger;
  },
  "ok" | "items" | "count",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(Type.String()),
    count: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for model cache list responses.
 */
export type ModelCacheListResponse = Static<typeof ModelCacheListResponseSchema>;

/**
 * Schema for model cache status responses.
 */
export const ModelCacheStatusResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly cached: Type.TBoolean;
    readonly path: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly files: Type.TArray<Type.TString>;
  },
  "ok" | "path" | "files" | "cached",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    cached: Type.Boolean(),
    path: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    files: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for model cache status responses.
 */
export type ModelCacheStatusResponse = Static<typeof ModelCacheStatusResponseSchema>;

/**
 * Schema for dataset sync job responses.
 */
export const DatasetSyncJobResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: DatasetSyncJobSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset sync job responses.
 */
export type DatasetSyncJobResponse = Static<typeof DatasetSyncJobResponseSchema>;

/**
 * Schema for dataset sync list responses.
 */
export const DatasetSyncJobListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(DatasetSyncJobSchema),
    count: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset sync list responses.
 */
export type DatasetSyncJobListResponse = Static<typeof DatasetSyncJobListResponseSchema>;

/**
 * Schema for dataset sync cancel responses.
 */
export const DatasetSyncCancelResponseSchema: Type.TObject<
  { readonly ok: Type.TLiteral<true>; readonly cancelled: Type.TBoolean },
  "ok" | "cancelled",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    cancelled: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset sync cancel responses.
 */
export type DatasetSyncCancelResponse = Static<typeof DatasetSyncCancelResponseSchema>;

/**
 * Schema for dataset cache list responses.
 */
export const DatasetCacheListResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly items: Type.TArray<Type.TString>;
    readonly count: Type.TInteger;
  },
  "ok" | "items" | "count",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(Type.String()),
    count: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset cache list responses.
 */
export type DatasetCacheListResponse = Static<typeof DatasetCacheListResponseSchema>;

/**
 * Schema for dataset info responses.
 */
export const DatasetInfoResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: DatasetInfoSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for dataset info responses.
 */
export type DatasetInfoResponse = Static<typeof DatasetInfoResponseSchema>;

/**
 * Schema for orchestration status payloads.
 */
export const OrchestrationStatusDataSchema: Type.TObject<
  {
    readonly activeDownloads: Type.TInteger;
    readonly activeDatasets: Type.TInteger;
    readonly activeWorkflows: Type.TInteger;
    readonly cachedModels: Type.TInteger;
    readonly cachedDatasets: Type.TInteger;
    readonly modelCacheBytes: Type.TNumber;
    readonly datasetCacheBytes: Type.TNumber;
    readonly gpuAvailable: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  | "timestamp"
  | "activeDownloads"
  | "activeDatasets"
  | "activeWorkflows"
  | "cachedModels"
  | "cachedDatasets"
  | "modelCacheBytes"
  | "datasetCacheBytes"
  | "gpuAvailable",
  never
> = Type.Object(
  {
    activeDownloads: Type.Integer({ minimum: 0 }),
    activeDatasets: Type.Integer({ minimum: 0 }),
    activeWorkflows: Type.Integer({ minimum: 0 }),
    cachedModels: Type.Integer({ minimum: 0 }),
    cachedDatasets: Type.Integer({ minimum: 0 }),
    modelCacheBytes: Type.Number({ minimum: 0 }),
    datasetCacheBytes: Type.Number({ minimum: 0 }),
    gpuAvailable: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for orchestration status payloads.
 */
export type OrchestrationStatusData = Static<typeof OrchestrationStatusDataSchema>;

/**
 * Schema for orchestration status responses.
 */
export const OrchestrationStatusResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly activeDownloads: Type.TInteger;
        readonly activeDatasets: Type.TInteger;
        readonly activeWorkflows: Type.TInteger;
        readonly cachedModels: Type.TInteger;
        readonly cachedDatasets: Type.TInteger;
        readonly modelCacheBytes: Type.TNumber;
        readonly datasetCacheBytes: Type.TNumber;
        readonly gpuAvailable: Type.TBoolean;
        readonly timestamp: Type.TString;
      },
      | "timestamp"
      | "activeDownloads"
      | "activeDatasets"
      | "activeWorkflows"
      | "cachedModels"
      | "cachedDatasets"
      | "modelCacheBytes"
      | "datasetCacheBytes"
      | "gpuAvailable",
      never
    >;
  },
  "ok" | "data",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: OrchestrationStatusDataSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for orchestration status responses.
 */
export type OrchestrationStatusResponse = Static<typeof OrchestrationStatusResponseSchema>;
