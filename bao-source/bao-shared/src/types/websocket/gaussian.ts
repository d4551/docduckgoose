/**
 * Gaussian Splatting training and render websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

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
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Training job ID */
  jobId: string;
  /** User ID who initiated the training */
  userId: string;
  /** Current status */
  status: GaussianTrainingStatus;
  /** Current training step */
  currentStep: number;
  /** Total training steps */
  totalSteps: number;
  /** Progress percentage (0-100) */
  progress: number;
  /** Current loss value */
  loss: number | null;
  /** Current PSNR value */
  psnr: number | null;
  /** Number of Gaussians */
  numGaussians: number | null;
  /** Output model path (on completion) */
  modelPath: string | null;
  /** Error message (on failure) */
  error: string | null;
  /** ISO timestamp */
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
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Render request ID */
  requestId: string;
  /** User ID who initiated the render */
  userId: string;
  /** Model path being rendered */
  modelPath: string;
  /** Current status */
  status: GaussianRenderStatus;
  /** Render width */
  width: number;
  /** Render height */
  height: number;
  /** Latency in milliseconds */
  latencyMs: number | null;
  /** Result image (base64, on completion) */
  imageData: string | null;
  /** Error message (on failure) */
  error: string | null;
  /** ISO timestamp */
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
