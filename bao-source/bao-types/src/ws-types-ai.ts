/**
 * WebSocket AI-related types — training, AI annotation jobs, vision inference, Gaussian splatting.
 *
 * @bao-types/ws-types-ai
 */

import type { TrainingStatus } from "./training.ts";
import type { WsJsonValue, WsOutgoingMessage } from "./ws-types-system.ts";

/**
 * AI annotation job status values emitted over realtime events.
 */
export type AiAnnotationJobStatus = "queued" | "processing" | "completed" | "failed";

/**
 * Realtime payload for AI annotation job status events.
 */
export interface AiAnnotationJobEventPayload {
  jobId: string;
  status: AiAnnotationJobStatus;
  assetId: string | null;
  annotationSetId: string | null;
  subjectType: string | null;
  subjectId: string | null;
  provider: string | null;
  model: string | null;
  createdBy: string | null;
  queuedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
}

/**
 * Training job progress event payload
 */
export interface TrainingProgressEventPayload {
  [key: string]: WsJsonValue;
  jobId: string;
  userId: string;
  modelId: string;
  modelName: string;
  datasetId: string;
  status: TrainingStatus;
  progress: number;
  currentEpoch: number;
  totalEpochs: number;
  updatedAt: string;
}

/**
 * Training progress event message
 */
export interface TrainingProgressMessage extends WsOutgoingMessage {
  event:
    | "training:progress"
    | "training:created"
    | "training:started"
    | "training:completed"
    | "training:failed"
    | "training:canceled";
  data: TrainingProgressEventPayload;
}

// Vision AI Event Payloads

/**
 * Vision inference status values
 */
export type VisionInferenceStatus = "started" | "processing" | "completed" | "failed";

/**
 * Vision inference event payload
 */
export interface VisionInferenceEventPayload {
  [key: string]: WsJsonValue;
  requestId: string;
  userId: string;
  operation:
    | "classify"
    | "segment"
    | "explain"
    | "vit_pytorch"
    | "pix2pix"
    | "cyclegan"
    | "memvid_index"
    | "memvid_search";
  model: string;
  status: VisionInferenceStatus;
  progress: number;
  latencyMs: number | null;
  result: WsJsonValue | null;
  error: string | null;
  timestamp: string;
}

/**
 * Vision inference event message
 */
export interface VisionInferenceMessage extends WsOutgoingMessage {
  event:
    | "vision:inference:started"
    | "vision:inference:progress"
    | "vision:inference:completed"
    | "vision:inference:failed";
  data: VisionInferenceEventPayload;
}

// Gaussian Splatting Event Payloads

/**
 * Gaussian training status values
 */
export type GaussianTrainingStatus =
  | "queued"
  | "started"
  | "running"
  | "completed"
  | "failed"
  | "canceled";

/**
 * Gaussian training progress event payload
 */
export interface GaussianTrainingEventPayload {
  [key: string]: WsJsonValue;
  jobId: string;
  userId: string;
  status: GaussianTrainingStatus;
  currentStep: number;
  totalSteps: number;
  progress: number;
  loss: number | null;
  psnr: number | null;
  numGaussians: number | null;
  modelPath: string | null;
  error: string | null;
  timestamp: string;
}

/**
 * Gaussian render status values
 */
export type GaussianRenderStatus = "started" | "completed" | "failed";

/**
 * Gaussian render event payload
 */
export interface GaussianRenderEventPayload {
  [key: string]: WsJsonValue;
  requestId: string;
  userId: string;
  modelPath: string;
  status: GaussianRenderStatus;
  width: number;
  height: number;
  latencyMs: number | null;
  imageData: string | null;
  error: string | null;
  timestamp: string;
}

/**
 * Gaussian training event message
 */
export interface GaussianTrainingMessage extends WsOutgoingMessage {
  event:
    | "gaussian:training:queued"
    | "gaussian:training:started"
    | "gaussian:training:progress"
    | "gaussian:training:completed"
    | "gaussian:training:failed"
    | "gaussian:training:canceled";
  data: GaussianTrainingEventPayload;
}

/**
 * Gaussian render event message
 */
export interface GaussianRenderMessage extends WsOutgoingMessage {
  event: "gaussian:render:started" | "gaussian:render:completed" | "gaussian:render:failed";
  data: GaussianRenderEventPayload;
}
