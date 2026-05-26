/**
 * Scanner websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

/**
 * Scan progress phase
 */
export type ScanProgressPhase =
  | "capturing"
  | "rotating"
  | "processing"
  | "aligning"
  | "meshing"
  | "exporting"
  | "idle";

/**
 * Scan progress event payload (browser-facing JSON contract).
 *
 * Internal scanner relay may ingest binary FlatBuffers and normalize them into this
 * JSON shape before publishing to browser clients.
 */
export interface ScanProgressEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Scan session ID */
  scanId: string;
  /** Current phase */
  phase: ScanProgressPhase;
  /** Current step number */
  currentStep: number;
  /** Total steps */
  totalSteps: number;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Human-readable message */
  message: string;
  /** ISO timestamp */
  timestamp: string;
}

/**
 * Scan frame captured event payload
 */
export interface ScanFrameCapturedEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Scan session ID */
  scanId: string;
  /** Frame number (1-indexed) */
  frameNumber: number;
  /** Point count in this frame */
  pointCount: number;
  /** Rotation angle at capture */
  rotationAngle: number;
  /** Tilt angle at capture */
  tiltAngle: number;
  /** ISO timestamp */
  timestamp: string;
}

/**
 * Scan complete event payload
 */
export interface ScanCompleteEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Scan session ID */
  scanId: string;
  /** Total frames captured */
  totalFrames: number;
  /** Total point count */
  totalPoints: number;
  /** Export format used */
  exportFormat: string;
  /** Download URL for result */
  downloadUrl: string | null;
  /** ISO timestamp */
  timestamp: string;
}

/**
 * Scan error event payload
 */
export interface ScanErrorEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Scan session ID */
  scanId: string;
  /** Error message */
  error: string;
  /** Error phase (where the error occurred) */
  phase: ScanProgressPhase | "unknown";
  /** ISO timestamp */
  timestamp: string;
}

/**
 * Scanner progress event message
 */
export interface ScannerProgressMessage extends WsOutgoingMessage {
  event: "scanner:progress";
  data: ScanProgressEventPayload;
}

/**
 * Scanner frame captured event message
 */
export interface ScannerFrameCapturedMessage extends WsOutgoingMessage {
  event: "scanner:frame-captured";
  data: ScanFrameCapturedEventPayload;
}

/**
 * Scanner complete event message
 */
export interface ScannerCompleteMessage extends WsOutgoingMessage {
  event: "scanner:complete";
  data: ScanCompleteEventPayload;
}

/**
 * Scanner error event message
 */
export interface ScannerErrorMessage extends WsOutgoingMessage {
  event: "scanner:error";
  data: ScanErrorEventPayload;
}
