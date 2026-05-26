/**
 * Vision AI inference websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

/**
 * Vision inference status values
 */
export type VisionInferenceStatus = "started" | "processing" | "completed" | "failed";

/**
 * Vision inference event payload
 */
export interface VisionInferenceEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Inference request ID */
  requestId: string;
  /** User ID who initiated the request */
  userId: string;
  /** Operation type (classify, segment, explain) */
  operation:
    | "classify"
    | "segment"
    | "explain"
    | "vit_pytorch"
    | "pix2pix"
    | "cyclegan"
    | "memvid_index"
    | "memvid_search";
  /** Model used for inference */
  model: string;
  /** Current status */
  status: VisionInferenceStatus;
  /** Progress percentage (0-100) */
  progress: number;
  /** Latency in milliseconds */
  latencyMs: number | null;
  /** Result data (on completion) */
  result: WsJsonValue | null;
  /** Error message (on failure) */
  error: string | null;
  /** ISO timestamp */
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
