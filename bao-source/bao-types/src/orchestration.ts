/**
 * AI Orchestration Types
 *
 * Shared types for unified AI orchestration across providers (HuggingFace, ONNX,
 * Ollama, NVIDIA NIM, local). Covers model downloads, dataset synchronization,
 * and training workflow coordination.
 *
 * @shared/types/orchestration.ts
 */

import type {
  DatasetFeatureSchema,
  DatasetInfoSchema,
  DatasetSyncInputSchema,
  DatasetSyncJobSchema,
  DatasetSyncSourceSchema,
  DatasetSyncStatusSchema,
  ModelDownloadFileSchema,
  ModelDownloadInputSchema,
  ModelDownloadJobSchema,
  ModelDownloadSourceSchema,
  ModelDownloadStatusSchema,
} from "@baohaus/bao-schemas/orchestration.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import type { ModelRuntimeSystem } from "./models.ts";

// Model Download Types

/**
 * Model download job status values (contract-derived).
 */
export type ModelDownloadStatus = Static<typeof ModelDownloadStatusSchema>;

/**
 * Model download source types (contract-derived).
 */
export type ModelDownloadSource = Static<typeof ModelDownloadSourceSchema>;

/**
 * Model download file metadata (contract-derived).
 */
export type ModelDownloadFile = Static<typeof ModelDownloadFileSchema>;

/**
 * Model download job payloads (contract-derived).
 */
export type ModelDownloadJob = Static<typeof ModelDownloadJobSchema>;

/**
 * Input for creating a model download job (contract-derived).
 */
export type ModelDownloadInput = Static<typeof ModelDownloadInputSchema>;

// Dataset Sync Types

/**
 * Dataset sync job status values (contract-derived).
 */
export type DatasetSyncStatus = Static<typeof DatasetSyncStatusSchema>;

/**
 * Dataset source platforms (contract-derived).
 */
export type DatasetSyncSource = Static<typeof DatasetSyncSourceSchema>;

/**
 * Dataset sync job payloads (contract-derived).
 */
export type DatasetSyncJob = Static<typeof DatasetSyncJobSchema>;

/**
 * Input for creating a dataset sync job (contract-derived).
 */
export type DatasetSyncInput = Static<typeof DatasetSyncInputSchema>;

/**
 * Dataset info/metadata returned from cache or hub (contract-derived).
 */
export type DatasetInfo = Static<typeof DatasetInfoSchema>;

/**
 * Dataset feature/column metadata (contract-derived).
 */
export type DatasetFeature = Static<typeof DatasetFeatureSchema>;

// Training Workflow Types

/**
 * Training workflow status values.
 */
export type TrainingWorkflowStatus =
  | "draft"
  | "pending"
  | "running"
  | "paused"
  | "completed"
  | "failed"
  | "cancelled";

/**
 * Training stage within a workflow.
 */
export type TrainingStageType =
  | "data_preparation"
  | "preprocessing"
  | "training"
  | "evaluation"
  | "export"
  | "onnx_export"
  | "optimization"
  | "validation"
  | "model_download";

/**
 * Target provider for training execution.
 */
export type TrainingProvider = "local" | "huggingface" | "nim" | "azure";

/**
 * Training stage definition.
 */
export interface TrainingStage {
  /** Stage type identifier. */
  type: TrainingStageType;
  /** Human-readable stage name. */
  name: string;
  /** Stage status. */
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  /** Stage progress (0.0 - 1.0). */
  progress: number;
  /** Stage-specific configuration. */
  config?: Record<string, unknown>;
  /** Error message if failed. */
  error?: string;
  /** ISO timestamp when stage started. */
  startedAt?: string;
  /** ISO timestamp when stage completed. */
  completedAt?: string;
  /** Description of the stage. */
  description?: string;
}

/**
 * Training configuration parameters.
 */
export interface TrainingConfig {
  /** Number of training epochs. */
  epochs: number;
  /** Batch size for training. */
  batchSize: number;
  /** Learning rate. */
  learningRate: number;
  /** Optimizer type. */
  optimizer?: "adam" | "adamw" | "sgd";
  /** Weight decay for regularization. */
  weightDecay?: number;
  /** Warmup steps for learning rate scheduling. */
  warmupSteps?: number;
  /** Evaluation steps interval. */
  evalSteps?: number;
  /** Save checkpoint steps interval. */
  saveSteps?: number;
  /** Maximum sequence length (for text models). */
  maxSeqLength?: number;
  /** Whether to use gradient accumulation. */
  gradientAccumulation?: number;
  /** Whether to use mixed precision. */
  mixedPrecision?: "no" | "fp16" | "bf16";
  /** Additional trainer arguments. */
  trainerArgs?: Record<string, unknown>;
}

/**
 * Training workflow orchestrating a complete training pipeline.
 */
export interface TrainingWorkflow {
  /** Unique workflow identifier. */
  id: string;
  /** User who created the workflow. */
  userId: string;
  /** Display name for the workflow. */
  name: string;
  /** Source model identifier. */
  modelId: string;
  /** Dataset identifier for training. */
  datasetId: string;
  /** Target provider for execution. */
  targetProvider: TrainingProvider;
  /** Target runtime system. */
  targetRuntime?: ModelRuntimeSystem;
  /** Training configuration. */
  config: TrainingConfig;
  /** Workflow stages. */
  stages: TrainingStage[];
  /** Current stage index. */
  currentStage: number;
  /** Overall workflow status. */
  status: TrainingWorkflowStatus;
  /** Overall progress (0.0 - 1.0). */
  progress: number;
  /** Output model identifier after training. */
  outputModelId?: string;
  /** Error message if workflow failed. */
  error?: string;
  /** ISO timestamp when workflow was created. */
  createdAt: string;
  /** ISO timestamp of last update. */
  updatedAt: string;
  /** ISO timestamp when workflow started. */
  startedAt?: string;
  /** ISO timestamp when workflow completed. */
  completedAt?: string;
}

/**
 * Input for creating a training workflow.
 */
export interface TrainingWorkflowInput {
  /** Display name for the workflow. */
  name: string;
  /** Source model identifier. */
  modelId: string;
  /** Dataset identifier for training. */
  datasetId: string;
  /** Target provider for execution. */
  targetProvider?: TrainingProvider;
  /** Target runtime for export. */
  targetRuntime?: ModelRuntimeSystem;
  /** Training configuration. */
  config: Partial<TrainingConfig>;
}

// Orchestration Status Types

/**
 * Overall orchestration status summary.
 */
export interface OrchestrationStatus {
  /** Active model download jobs. */
  activeDownloads: number;
  /** Active dataset sync jobs. */
  activeDatasets: number;
  /** Active training workflows. */
  activeWorkflows: number;
  /** Total cached models count. */
  cachedModels: number;
  /** Total cached datasets count. */
  cachedDatasets: number;
  /** Disk usage for model cache (bytes). */
  modelCacheBytes: number;
  /** Disk usage for dataset cache (bytes). */
  datasetCacheBytes: number;
  /** Whether local GPU is available. */
  gpuAvailable: boolean;
  /** ISO timestamp of status check. */
  timestamp: string;
}

// API Response Types

/**
 * Model download job response envelope.
 */
export type ModelDownloadJobResponse =
  | { ok: true; data: ModelDownloadJob }
  | { ok: false; error: string; code: string };

/**
 * Dataset sync job response envelope.
 */
export type DatasetSyncJobResponse =
  | { ok: true; data: DatasetSyncJob }
  | { ok: false; error: string; code: string };

/**
 * Dataset list response envelope.
 */
export type DatasetListResponse =
  | { ok: true; items: DatasetInfo[]; count: number }
  | { ok: false; error: string; code: string };

/**
 * Training workflow response envelope.
 */
export type TrainingWorkflowResponse =
  | { ok: true; data: TrainingWorkflow }
  | { ok: false; error: string; code: string };

/**
 * Orchestration status response envelope.
 */
export type OrchestrationStatusResponse =
  | { ok: true; data: OrchestrationStatus }
  | { ok: false; error: string; code: string };
