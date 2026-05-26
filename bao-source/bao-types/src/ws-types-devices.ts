/**
 * WebSocket device-related types — device events, hardware, calibration, scanner, annotations.
 *
 * @bao-types/ws-types-devices
 */

import type { AnnotationRecord } from "./annotations.ts";
import type { WsJsonValue, WsOutgoingMessage } from "./ws-types-system.ts";

/**
 * Device state change event
 */
export interface DeviceStateChangeEvent {
  deviceId: string;
  state: Record<string, WsJsonValue>;
  timestamp: string;
}

/**
 * Calibration update event
 */
export interface CalibrationUpdateEvent {
  deviceId: string;
  calibration: Record<string, WsJsonValue>;
  success: boolean;
  timestamp: string;
}

/**
 * Image captured event
 */
export interface ImageCapturedEvent {
  imageId: string;
  deviceId: string;
  caseId?: string | null;
  timestamp: number;
  timestampISO: string;
  metadata: Record<string, WsJsonValue>;
  dataUrl?: string | null;
  autoAnnotations?: WsJsonValue[];
}

/**
 * Hardware event wrapper
 */
export interface HardwareEvent {
  topic: string;
  payload: WsJsonValue;
  timestamp: string;
}

/**
 * Device event types
 */
export interface DeviceEvent extends WsOutgoingMessage {
  event: "device:detected" | "device:connected" | "device:disconnected" | "device:error";
  data: Record<string, WsJsonValue> & {
    deviceId: string;
  };
}

/**
 * Lighting command message
 */
export interface LightingCommandMessage extends WsOutgoingMessage {
  event: "lighting:command" | "lighting:response";
  data: Record<string, WsJsonValue> & {
    deviceId?: string;
    command?: WsJsonValue;
    acknowledged?: boolean;
  };
}

/**
 * Imager command message
 */
export interface ImagerCommandMessage extends WsOutgoingMessage {
  event: "imager:capture" | "imager:preview";
  data: Record<string, WsJsonValue> & {
    deviceId?: string;
  };
}

/**
 * Footpedal press event
 */
export interface FootpedalPressMessage extends WsOutgoingMessage {
  event: "footpedal:press";
  data: Record<string, WsJsonValue> & {
    deviceId?: string;
  };
}

// Real-time Event Payloads

/**
 * Notification event payload
 */
export interface NotificationEventPayload {
  [key: string]: WsJsonValue;
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

/**
 * Notification new event message
 */
export interface NotificationNewMessage extends WsOutgoingMessage {
  event: "notification:new";
  data: NotificationEventPayload;
}

/**
 * Calibration progress event payload
 */
export interface CalibrationProgressEventPayload {
  [key: string]: WsJsonValue;
  id: string;
  deviceId: string;
  deviceType: string;
  status: "started" | "in_progress" | "completed" | "failed";
  progress: number;
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

/**
 * Asset upload event payload
 */
export interface AssetEventPayload {
  [key: string]: WsJsonValue;
  id: string;
  name: string;
  mediaType: string;
  status: "uploading" | "processing" | "ready" | "failed";
  progress: number;
  timestamp: string;
}

/**
 * Asset event message
 */
export interface AssetEventMessage extends WsOutgoingMessage {
  event: "asset:uploaded" | "asset:deleted" | "asset:processing";
  data: AssetEventPayload;
}

// Annotation Event Payloads

/**
 * Realtime payload for annotation CRUD events.
 */
export interface AnnotationChangedEventPayload {
  action: "created" | "updated" | "deleted";
  annotationId: string;
  annotation?: AnnotationRecord;
  contextType?: AnnotationRecord["contextType"];
  caseId?: string | null;
  assetId?: string | null;
  xrExperienceId?: string | null;
  subjectType?: string | null;
  subjectId?: string | null;
  source?: "api" | "sync" | "batch";
}

// Scanner Event Payloads

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
 */
export interface ScanProgressEventPayload {
  [key: string]: WsJsonValue;
  scanId: string;
  phase: ScanProgressPhase;
  currentStep: number;
  totalSteps: number;
  percentage: number;
  message: string;
  timestamp: string;
}

/**
 * Scan frame captured event payload
 */
export interface ScanFrameCapturedEventPayload {
  [key: string]: WsJsonValue;
  scanId: string;
  frameNumber: number;
  pointCount: number;
  rotationAngle: number;
  tiltAngle: number;
  timestamp: string;
}

/**
 * Scan complete event payload
 */
export interface ScanCompleteEventPayload {
  [key: string]: WsJsonValue;
  scanId: string;
  totalFrames: number;
  totalPoints: number;
  exportFormat: string;
  downloadUrl: string | null;
  timestamp: string;
}

/**
 * Scan error event payload
 */
export interface ScanErrorEventPayload {
  [key: string]: WsJsonValue;
  scanId: string;
  error: string;
  phase: ScanProgressPhase | "unknown";
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
