/**
 * Device, hardware, lighting, imager, and footpedal websocket message types.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

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
