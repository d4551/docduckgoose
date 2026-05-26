/**
 * Training job websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { TrainingStatus } from "../training.ts";
import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

/**
 * Training job progress event payload
 */
export interface TrainingProgressEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Training job ID */
  jobId: string;
  /** User ID who owns the job */
  userId: string;
  /** Model identifier */
  modelId: string;
  /** Model name */
  modelName: string;
  /** Dataset identifier */
  datasetId: string;
  /** Job status */
  status: TrainingStatus;
  /** Progress percentage (0-100) */
  progress: number;
  /** Current epoch number */
  currentEpoch: number;
  /** Total epochs */
  totalEpochs: number;
  /** ISO timestamp of last update */
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
