/**
 * Orchestration request schemas.
 *
 * Defines shared schemas for AI orchestration operations (model downloads,
 * dataset synchronization) to keep server and client contracts aligned.
 *
 * @shared/schemas/orchestration.ts
 */

import { PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS } from "@baohaus/bao-constants/pipeline-constraints";
import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const ModelDownloadStatusSchema: TUnion<
  [
    TLiteral<"pending" | "downloading" | "extracting" | "completed" | "failed" | "cancelled">,
    ...TLiteral<"pending" | "downloading" | "extracting" | "completed" | "failed" | "cancelled">[],
  ]
> = stringEnum(MODEL_DOWNLOAD_STATUSES, {
  description: "Model download status",
});

/**
 * Model download source options.
 */
export const ModelDownloadSourceSchema: TUnion<
  (TLiteral<"huggingface"> | TLiteral<"nim"> | TLiteral<"local"> | TLiteral<"registry">)[]
> = TypeExports.Union([
  TypeExports.Literal("huggingface"),
  TypeExports.Literal("nim"),
  TypeExports.Literal("local"),
  TypeExports.Literal("registry"),
]);

/**
 * Type-safe model download source.
 */
export type ModelDownloadSource = Static<typeof ModelDownloadSourceSchema>;

/**
 * Model download file schema.
 */
export const ModelDownloadFileSchema: TObject<
  {
    readonly name: TString;
    readonly size: TNumber;
    readonly progress: TNumber;
    readonly completed: TBoolean;
  },
  "name" | "size" | "progress" | "completed",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    size: TypeExports.Number({ minimum: 0 }),
    progress: TypeExports.Number({ minimum: 0, maximum: 1 }),
    completed: TypeExports.Boolean(),
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
export const ModelDownloadJobSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
      }),
    ),
    modelId: TypeExports.String({ minLength: 1 }),
    source: ModelDownloadSourceSchema,
    targetPath: TypeExports.String({ minLength: 1 }),
    status: ModelDownloadStatusSchema,
    progress: TypeExports.Number({ minimum: 0, maximum: 1 }),
    totalBytes: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    downloadedBytes: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    error: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    files: TypeExports.Optional(TypeExports.Array(ModelDownloadFileSchema)),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
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
export const ModelDownloadInputSchema = TypeExports.Object(
  {
    modelId: TypeExports.String({
      minLength: 1,
      description: "HuggingFace model ID (e.g., meta-llama/Meta-Llama-3-8B)",
    }),
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
        description: "Optional idempotency key to deduplicate downloads.",
      }),
    ),
    source: TypeExports.Optional(ModelDownloadSourceSchema),
    revision: TypeExports.Optional(
      TypeExports.String({ description: "Branch, tag, or commit hash" }),
    ),
    targetPath: TypeExports.Optional(
      TypeExports.String({ description: "Custom target directory" }),
    ),
    files: TypeExports.Optional(
      TypeExports.Array(TypeExports.String(), { description: "Specific files to download" }),
    ),
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
export const DatasetSyncStatusSchema: TUnion<
  [
    TLiteral<"pending" | "syncing" | "processing" | "completed" | "failed" | "cancelled">,
    ...TLiteral<"pending" | "syncing" | "processing" | "completed" | "failed" | "cancelled">[],
  ]
> = stringEnum(DATASET_SYNC_STATUSES, {
  description: "Dataset sync status",
});

/**
 * Dataset sync source options.
 */
export const DatasetSyncSourceSchema: TUnion<
  (TLiteral<"huggingface"> | TLiteral<"local"> | TLiteral<"upload"> | TLiteral<"s3">)[]
> = TypeExports.Union([
  TypeExports.Literal("huggingface"),
  TypeExports.Literal("local"),
  TypeExports.Literal("upload"),
  TypeExports.Literal("s3"),
]);

/**
 * Type-safe dataset sync source.
 */
export type DatasetSyncSource = Static<typeof DatasetSyncSourceSchema>;

/**
 * Dataset feature schema.
 */
export const DatasetFeatureSchema: TObject<
  { readonly name: TString; readonly dtype: TString },
  "name" | "dtype",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    dtype: TypeExports.String({ minLength: 1 }),
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
export const DatasetInfoSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    description: TypeExports.Optional(TypeExports.String()),
    author: TypeExports.Optional(TypeExports.String()),
    splits: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    numRows: TypeExports.Optional(
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.Number({ minimum: 0 })),
    ),
    features: TypeExports.Optional(
      TypeExports.Record(TypeExports.String({ minLength: 1 }), DatasetFeatureSchema),
    ),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    cached: TypeExports.Boolean(),
    cachePath: TypeExports.Optional(TypeExports.String()),
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
export const DatasetSyncJobSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
      }),
    ),
    datasetId: TypeExports.String({ minLength: 1 }),
    source: DatasetSyncSourceSchema,
    status: DatasetSyncStatusSchema,
    progress: TypeExports.Number({ minimum: 0, maximum: 1 }),
    splits: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    cachePath: TypeExports.Optional(TypeExports.String()),
    numExamples: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    error: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
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
export const DatasetSyncInputSchema = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.minLength,
        maxLength: PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS.maxLength,
        description: "Optional idempotency key to deduplicate dataset syncs.",
      }),
    ),
    datasetId: TypeExports.String({
      minLength: 1,
      description: "HuggingFace dataset ID (e.g., squad, wikitext)",
    }),
    source: TypeExports.Optional(DatasetSyncSourceSchema),
    config: TypeExports.Optional(TypeExports.String({ description: "Dataset config/subset name" })),
    splits: TypeExports.Optional(
      TypeExports.Array(TypeExports.String(), { description: "Splits to sync (e.g., train)" }),
    ),
    streaming: TypeExports.Optional(TypeExports.Boolean({ description: "Use streaming mode" })),
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
export const ModelDownloadJobResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
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
export const ModelDownloadJobListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(ModelDownloadJobSchema),
    count: TypeExports.Integer({ minimum: 0 }),
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
export const ModelDownloadCancelResponseSchema: TObject<
  { readonly ok: TLiteral<true>; readonly cancelled: TBoolean },
  "cancelled" | "ok",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    cancelled: TypeExports.Boolean(),
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
export const ModelCacheListResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly items: TArray<TString>;
    readonly count: TInteger;
  },
  "ok" | "items" | "count",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(TypeExports.String()),
    count: TypeExports.Integer({ minimum: 0 }),
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
export const ModelCacheStatusResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly cached: TBoolean;
    readonly path: TUnion<(TString | TNull)[]>;
    readonly files: TArray<TString>;
  },
  "ok" | "path" | "files" | "cached",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    cached: TypeExports.Boolean(),
    path: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    files: TypeExports.Array(TypeExports.String()),
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
export const DatasetSyncJobResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
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
export const DatasetSyncJobListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(DatasetSyncJobSchema),
    count: TypeExports.Integer({ minimum: 0 }),
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
export const DatasetSyncCancelResponseSchema: TObject<
  { readonly ok: TLiteral<true>; readonly cancelled: TBoolean },
  "ok" | "cancelled",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    cancelled: TypeExports.Boolean(),
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
export const DatasetCacheListResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly items: TArray<TString>;
    readonly count: TInteger;
  },
  "ok" | "items" | "count",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(TypeExports.String()),
    count: TypeExports.Integer({ minimum: 0 }),
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
export const DatasetInfoResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
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
export const OrchestrationStatusDataSchema: TObject<
  {
    readonly activeDownloads: TInteger;
    readonly activeDatasets: TInteger;
    readonly activeWorkflows: TInteger;
    readonly cachedModels: TInteger;
    readonly cachedDatasets: TInteger;
    readonly modelCacheBytes: TNumber;
    readonly datasetCacheBytes: TNumber;
    readonly gpuAvailable: TBoolean;
    readonly timestamp: TString;
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
> = TypeExports.Object(
  {
    activeDownloads: TypeExports.Integer({ minimum: 0 }),
    activeDatasets: TypeExports.Integer({ minimum: 0 }),
    activeWorkflows: TypeExports.Integer({ minimum: 0 }),
    cachedModels: TypeExports.Integer({ minimum: 0 }),
    cachedDatasets: TypeExports.Integer({ minimum: 0 }),
    modelCacheBytes: TypeExports.Number({ minimum: 0 }),
    datasetCacheBytes: TypeExports.Number({ minimum: 0 }),
    gpuAvailable: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const OrchestrationStatusResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TObject<
      {
        readonly activeDownloads: TInteger;
        readonly activeDatasets: TInteger;
        readonly activeWorkflows: TInteger;
        readonly cachedModels: TInteger;
        readonly cachedDatasets: TInteger;
        readonly modelCacheBytes: TNumber;
        readonly datasetCacheBytes: TNumber;
        readonly gpuAvailable: TBoolean;
        readonly timestamp: TString;
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
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: OrchestrationStatusDataSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for orchestration status responses.
 */
export type OrchestrationStatusResponse = Static<typeof OrchestrationStatusResponseSchema>;
