/**
 * Calibration websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

/**
 * Calibration progress event payload
 */
export interface CalibrationProgressEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Calibration entry ID */
  id: string;
  /** Device ID being calibrated */
  deviceId: string;
  /** Device type */
  deviceType: string;
  /** Calibration status */
  status: "started" | "in_progress" | "completed" | "failed";
  /** Progress percentage (0-100) */
  progress: number;
  /** ISO timestamp */
  timestamp: string;
}

/**
 * Calibration progress event message
 */
export interface CalibrationProgressMessage extends WsOutgoingMessage {
  event:
    | "calibration:started"
    | "calibration:progress"
    | "calibration:completed"
    | "calibration:failed";
  data: CalibrationProgressEventPayload;
}
