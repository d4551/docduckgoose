/**
 * Asset websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

/**
 * Asset upload event payload
 */
export interface AssetEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Asset ID */
  id: string;
  /** Asset name */
  name: string;
  /** Media type (image, video, model) */
  mediaType: string;
  /** Processing status */
  status: "uploading" | "processing" | "ready" | "failed";
  /** Progress percentage for uploads/processing */
  progress: number;
  /** ISO timestamp */
  timestamp: string;
}

/**
 * Asset event message
 */
export interface AssetEventMessage extends WsOutgoingMessage {
  event: "asset:uploaded" | "asset:deleted" | "asset:processing";
  data: AssetEventPayload;
}
