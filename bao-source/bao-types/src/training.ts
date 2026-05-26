/**
 * Training job DTOs shared between API and client.
 *
 * Defines stable response shapes for AI training endpoints so the frontend
 * does not depend on Prisma types directly.
 *
 * @shared/types/training.ts
 */

import type {
  TrainingActiveStatusSchema,
  TrainingArtifactDtoSchema,
  TrainingJobCompleteRequestSchema,
  TrainingJobCreateRequestSchema,
  TrainingJobDtoSchema,
  TrainingJobEventDtoSchema,
  TrainingJobEventsQuerySchema,
  TrainingJobProgressUpdateSchema,
  TrainingJobStatsSchema,
  TrainingJobsQuerySchema,
  TrainingStatusSchema,
  TrainingTerminalStatusSchema,
} from "@baohaus/bao-schemas/training.schemas";
import {
  TrainingArtifactResponseSchema,
  TrainingArtifactsResponseSchema,
  TrainingJobEventsResponseSchema,
  TrainingJobResponseSchema,
  TrainingJobStatsResponseSchema,
  TrainingJobsResponseSchema,
} from "@baohaus/bao-schemas/training.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import type { ErrorResponse } from "./responses.ts";

/**
 * Supported training job status labels.
 */
export type TrainingStatus = Static<typeof TrainingStatusSchema>;

/**
 * Training statuses considered "active".
 */
export type TrainingActiveStatus = Static<typeof TrainingActiveStatusSchema>;

/**
 * Training statuses considered "terminal".
 */
export type TrainingTerminalStatus = Static<typeof TrainingTerminalStatusSchema>;

/**
 * Training job list query payload.
 */
export type TrainingJobsQuery = Static<typeof TrainingJobsQuerySchema>;

/**
 * Training job creation request payload.
 */
export type TrainingJobCreateRequest = Static<typeof TrainingJobCreateRequestSchema>;

/**
 * Training job progress update request payload.
 */
export type TrainingJobProgressUpdate = Static<typeof TrainingJobProgressUpdateSchema>;

/**
 * Training job completion request payload.
 */
export type TrainingJobCompleteRequest = Static<typeof TrainingJobCompleteRequestSchema>;

/**
 * Aggregated training job statistics.
 */
export type TrainingJobStats = Static<typeof TrainingJobStatsSchema>;

/**
 * Training job payload returned by the API.
 */
export type TrainingJobDto = Static<typeof TrainingJobDtoSchema>;

/**
 * Training job event timeline entry DTO.
 */
export type TrainingJobEventDto = Static<typeof TrainingJobEventDtoSchema>;

/**
 * Training job events list query payload.
 */
export type TrainingJobEventsQuery = Static<typeof TrainingJobEventsQuerySchema>;

/**
 * Training artifact payload returned by the API.
 */
export type TrainingArtifactDto = Static<typeof TrainingArtifactDtoSchema>;

/**
 * Training job list success response payload.
 */
export type TrainingJobsOkResponse = Static<typeof TrainingJobsResponseSchema>;

/**
 * Training job detail success response payload.
 */
export type TrainingJobOkResponse = Static<typeof TrainingJobResponseSchema>;

/**
 * Training job events list success response payload.
 */
export type TrainingJobEventsOkResponse = Static<typeof TrainingJobEventsResponseSchema>;

/**
 * Training artifact list success response payload.
 */
export type TrainingArtifactsOkResponse = Static<typeof TrainingArtifactsResponseSchema>;

/**
 * Training artifact detail success response payload.
 */
export type TrainingArtifactOkResponse = Static<typeof TrainingArtifactResponseSchema>;

/**
 * Training job stats success response payload.
 */
export type TrainingJobStatsOkResponse = Static<typeof TrainingJobStatsResponseSchema>;

/**
 * Training job list response payload.
 */
export type TrainingJobsResponse = TrainingJobsOkResponse | ErrorResponse;

/**
 * Training job detail response payload.
 */
export type TrainingJobResponse = TrainingJobOkResponse | ErrorResponse;

/**
 * Training job events list response payload.
 */
export type TrainingJobEventsResponse = TrainingJobEventsOkResponse | ErrorResponse;

/**
 * Training artifact list response payload.
 */
export type TrainingArtifactsResponse = TrainingArtifactsOkResponse | ErrorResponse;

/**
 * Training artifact detail response payload.
 */
export type TrainingArtifactResponse = TrainingArtifactOkResponse | ErrorResponse;

/**
 * Training job stats response payload.
 */
export type TrainingJobStatsResponse = TrainingJobStatsOkResponse | ErrorResponse;

/**
 * Runtime guard for {@link TrainingJobsOkResponse}.
 */
export function isTrainingJobsOkResponse(value: unknown): value is TrainingJobsOkResponse {
  return Check(TrainingJobsResponseSchema, value);
}

/**
 * Runtime guard for {@link TrainingJobOkResponse}.
 */
export function isTrainingJobOkResponse(value: unknown): value is TrainingJobOkResponse {
  return Check(TrainingJobResponseSchema, value);
}

/**
 * Runtime guard for {@link TrainingJobEventsOkResponse}.
 */
export function isTrainingJobEventsOkResponse(
  value: unknown,
): value is TrainingJobEventsOkResponse {
  return Check(TrainingJobEventsResponseSchema, value);
}

/**
 * Runtime guard for {@link TrainingArtifactsOkResponse}.
 */
export function isTrainingArtifactsOkResponse(
  value: unknown,
): value is TrainingArtifactsOkResponse {
  return Check(TrainingArtifactsResponseSchema, value);
}

/**
 * Runtime guard for {@link TrainingArtifactOkResponse}.
 */
export function isTrainingArtifactOkResponse(value: unknown): value is TrainingArtifactOkResponse {
  return Check(TrainingArtifactResponseSchema, value);
}

/**
 * Runtime guard for {@link TrainingJobStatsOkResponse}.
 */
export function isTrainingJobStatsOkResponse(value: unknown): value is TrainingJobStatsOkResponse {
  return Check(TrainingJobStatsResponseSchema, value);
}

/**
 * Canonical training job type values.
 */
export const TRAINING_JOB_TYPES: readonly [
  "classification",
  "detection",
  "segmentation",
  "chatbot",
] = ["classification", "detection", "segmentation", "chatbot"] as const;

/**
 * Type of training job.
 */
export type TrainingJobType = (typeof TRAINING_JOB_TYPES)[number];

/**
 * Canonical training target provider values.
 */
export const TRAINING_TARGET_PROVIDERS: readonly ["local", "huggingface", "nim", "azure"] = [
  "local",
  "huggingface",
  "nim",
  "azure",
] as const;

/**
 * Type of training target providers.
 */
export type TrainingTargetProvider = (typeof TRAINING_TARGET_PROVIDERS)[number];

/**
 * Canonical training runtime values.
 */
export const TRAINING_TARGET_RUNTIMES: readonly [
  "transformers",
  "onnxruntime",
  "tensorrt",
  "gguf",
] = ["transformers", "onnxruntime", "tensorrt", "gguf"] as const;

/**
 * Type of training runtimes.
 */
export type TrainingTargetRuntime = (typeof TRAINING_TARGET_RUNTIMES)[number];

/**
 * Step in a training workflow.
 */
export interface TrainingStep {
  id: string;
  name: string;
  description?: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  message?: string;
  error?: string;
  startedAt?: string;
  completedAt?: string;
}

/**
 * Training metrics payload for realtime progress updates.
 */
export interface TrainingMetrics {
  /** Training loss */
  loss?: number;
  /** Validation loss */
  valLoss?: number;
  /** Training accuracy */
  accuracy?: number;
  /** Validation accuracy */
  valAccuracy?: number;
  /** Learning rate */
  learningRate?: number;
  /** Throughput (samples/second) */
  throughput?: number;
  /** Memory usage (bytes) */
  memoryUsage?: number;
  /** GPU utilization percentage */
  gpuUtilization?: number;
  /** Additional custom metrics */
  [key: string]: number | undefined;
}

/**
 * Training progress payload emitted by SSE streaming endpoints.
 */
export interface TrainingProgressStreamPayload {
  /** Training job ID */
  jobId: string;
  /** Current status */
  status: TrainingStatus;
  /** Overall progress percentage (0-100) */
  progress: number;
  /** Current epoch number */
  currentEpoch: number;
  /** Total epochs */
  totalEpochs: number;
  /** Current step within epoch or workflow */
  currentStep?: number;
  /** Total steps per epoch or workflow */
  totalSteps?: number;
  /** Training metrics */
  metrics?: TrainingMetrics;
  /** Status message */
  message?: string;
  /** Estimated time remaining (seconds) */
  eta?: number;
  /** Elapsed time (seconds) */
  elapsedTime?: number;
  /** ISO timestamp of payload */
  timestamp: string;
}

/**
 * Input payload to start a unified training job.
 */
export interface StartTrainingJobInput {
  userId: string;
  idempotencyKey?: string | null | undefined;
  name?: string;
  modelName?: string;
  modelVersion?: string | null;
  modelId: string;
  datasetId: string;
  jobType?: TrainingJobType | undefined;
  priority?: string | undefined;
  targetProvider?: TrainingTargetProvider | undefined;
  targetRuntime?: TrainingTargetRuntime | undefined;
  config?: Record<string, unknown> | undefined;
  metadata?: Record<string, unknown> | undefined;
  /** ONNX export configuration. When present, the training pipeline will export to ONNX after completion. */
  onnxExport?: {
    /** ONNX opset version (default: 17). */
    opsetVersion?: number;
    /** Target quantisation precision for the exported model. */
    targetPrecision?: "fp32" | "fp16" | "int8";
    /** Dynamic axes mapping for variable-length dimensions. */
    dynamicAxes?: Record<string, Record<number, string>>;
  };
}
