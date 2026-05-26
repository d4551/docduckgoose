/**
 * Internal FlatBuffers protocol helpers for realtime transport — shared types and constants.
 *
 * @shared/protocols/realtime-flatbuffers-shared
 */

import type { RealtimePayloadKindV1 } from "../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";

/**
 * Current protocol version for realtime FlatBuffers envelopes.
 */
export const REALTIME_FLATBUFFERS_PROTOCOL_VERSION = 1;

/**
 * Internal websocket subprotocol for binary realtime transport.
 */
export const REALTIME_FLATBUFFERS_WS_SUBPROTOCOL = "vv.realtime.fbs.v1";

/**
 * Topic suffix used for binary realtime websocket pub/sub topics.
 */
export const REALTIME_FLATBUFFERS_TOPIC_SUFFIX = ".flatbuffers";

export const BATTERY_FULL_PERCENT = 100;
export const FB_BUILDER_SMALL = 256;
export const FB_MIN_HEADER_SIZE = 8;

/** ConnectionState string → ubyte mapping for telemetry. */
const _CONNECTION_STATE_TO_UBYTE: Record<string, number> = {
  disconnected: 0,
  connecting: 1,
  connected: 2,
  armed: 3,
  flying: 4,
  error: 5,
};

export type RealtimeBinaryChannel = "devices" | "telemetry";

export interface TelemetryPosition3D {
  latitude: number;
  longitude: number;
  altitude: number;
  relativeAltitude?: number;
}

export interface TelemetryAttitude {
  roll: number;
  pitch: number;
  yaw: number;
}

export interface TelemetryVelocity3D {
  x?: number;
  y?: number;
  z?: number;
  groundSpeed?: number;
  airSpeed?: number;
}

export interface TelemetryBatteryStatus {
  level?: number;
  voltage: number;
  current?: number;
  temperature?: number;
  remainingPercent?: number;
}

export interface TelemetryPayloadEncodeInput {
  vehicleId: string;
  timestamp: string;
  connectionState: number;
  armed: boolean;
  flightMode: number;
  position?: TelemetryPosition3D | null;
  attitude: TelemetryAttitude;
  velocity?: TelemetryVelocity3D | null;
  gpsFixType?: number;
  satelliteCount?: number;
  battery: TelemetryBatteryStatus;
  signalStrength?: number;
  flightTime?: number;
}

export interface TelemetryPayloadDecoded {
  vehicleId: string;
  timestamp: string;
  connectionState: number;
  armed: boolean;
  flightMode: number;
  position: TelemetryPosition3D | null;
  attitude: TelemetryAttitude;
  velocity: TelemetryVelocity3D | null;
  gpsFixType: number;
  satelliteCount: number;
  battery: TelemetryBatteryStatus;
  signalStrength: number;
  flightTime: number;
}

export interface ScannerProgressBinaryPayload {
  scanId: string;
  phase: string;
  currentStep: number;
  totalSteps: number;
  percentage: number;
  message: string;
  timestamp: string;
}

export interface DroneRealtimeWsEnvelopeBinary {
  channel: RealtimeBinaryChannel;
  event: string;
  data: unknown;
  timestamp: string;
  baseUrl?: string | null;
}

export interface DecodedRealtimeWsEnvelopeBinary {
  version: number;
  kind: RealtimePayloadKindV1;
  payload: Uint8Array;
  timestamp: string | null;
}

export interface DeviceEventEncodeInput {
  deviceId: string;
  type: string;
  status: number;
  value: number;
  timestamp: string;
}

export interface GimbalEventEncodeInput {
  pitch: number;
  yaw: number;
  roll: number;
  mode: number;
  timestamp: string;
}

export interface HardwareStateEventRealtimeInput {
  deviceId: string;
  eventKind: number;
  status?: string;
  metric?: string;
  valueFloat?: number;
  valueString?: string;
  unit?: string;
  quality?: number;
  command?: string;
  acknowledged?: boolean;
  healthScore?: number;
  reason?: string;
  correlationId?: string;
  latencyMs?: number;
  timestamp: string;
  metadataJson?: string;
}

export interface HardwareStateEventRealtimeDecoded {
  deviceId: string | null;
  eventKind: number;
  status: string | null;
  metric: string | null;
  valueFloat: number;
  valueString: string | null;
  unit: string | null;
  quality: number;
  command: string | null;
  acknowledged: boolean;
  healthScore: number;
  reason: string | null;
  correlationId: string | null;
  latencyMs: number;
  timestamp: string | null;
  metadataJson: string | null;
}

export interface VehicleTelemetryInput {
  vehicleId: string;
  timestamp: string;
  connectionState: string | number;
  armed: boolean;
  flightMode: string | number;
  position?: { latitude: number; longitude: number; altitude: number; relativeAltitude?: number };
  attitude: { roll: number; pitch: number; yaw: number };
  velocity?: {
    vx?: number;
    vy?: number;
    vz?: number;
    groundSpeed?: number;
    airSpeed?: number;
    x?: number;
    y?: number;
    z?: number;
  };
  gps?: { fixType?: string; satelliteCount?: number };
  battery: { voltage: number; current?: number; remaining?: number; temperature?: number };
  signalStrength?: number;
  flightTime?: number;
}

export function resolveFlatBuffersTopic(topic: string): string {
  return `${topic}${REALTIME_FLATBUFFERS_TOPIC_SUFFIX}`;
}

export function parseWebSocketSubprotocolHeader(headerValue: string | null): string[] {
  if (!headerValue) {
    return [];
  }
  return headerValue
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

export function wantsRealtimeFlatBuffersSubprotocol(
  headerValue: string | null,
  subprotocol: string = REALTIME_FLATBUFFERS_WS_SUBPROTOCOL,
): boolean {
  return parseWebSocketSubprotocolHeader(headerValue).includes(subprotocol);
}

export function isBinaryMessagePayload(payload: unknown): payload is ArrayBuffer | Uint8Array {
  return payload instanceof ArrayBuffer || payload instanceof Uint8Array;
}

export function normalizeOptionalString(value: string | Uint8Array | null): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function toUint8Array(bytes: ArrayBuffer | Uint8Array): Uint8Array {
  if (bytes instanceof Uint8Array) {
    return bytes;
  }
  return new Uint8Array(bytes);
}

/** Check if value has VehicleTelemetry shape for typed encoding. */
export function isVehicleTelemetryShape(value: unknown): value is VehicleTelemetryInput {
  if (!value || typeof value !== "object") {
    return false;
  }
  const vehicleId = Reflect.get(value, "vehicleId");
  const timestamp = Reflect.get(value, "timestamp");
  const connectionState = Reflect.get(value, "connectionState");
  const armed = Reflect.get(value, "armed");
  const flightMode = Reflect.get(value, "flightMode");
  const attitude = Reflect.get(value, "attitude");
  const battery = Reflect.get(value, "battery");
  if (
    typeof vehicleId !== "string" ||
    typeof timestamp !== "string" ||
    (typeof connectionState !== "string" && typeof connectionState !== "number") ||
    typeof armed !== "boolean" ||
    (typeof flightMode !== "string" && typeof flightMode !== "number")
  ) {
    return false;
  }
  if (attitude == null || typeof attitude !== "object") {
    return false;
  }
  const roll = Reflect.get(attitude, "roll");
  const pitch = Reflect.get(attitude, "pitch");
  const yaw = Reflect.get(attitude, "yaw");
  if (typeof roll !== "number" || typeof pitch !== "number" || typeof yaw !== "number") {
    return false;
  }
  if (battery == null || typeof battery !== "object") {
    return false;
  }
  const voltage = Reflect.get(battery, "voltage");
  return typeof voltage === "number";
}

export function telemetryToPlainObject(decoded: TelemetryPayloadDecoded): Record<string, unknown> {
  return {
    vehicleId: decoded.vehicleId,
    timestamp: decoded.timestamp,
    connectionState: decoded.connectionState,
    armed: decoded.armed,
    flightMode: decoded.flightMode,
    position: decoded.position,
    attitude: decoded.attitude,
    velocity: decoded.velocity,
    gpsFixType: decoded.gpsFixType,
    satelliteCount: decoded.satelliteCount,
    battery: decoded.battery,
    signalStrength: decoded.signalStrength,
    flightTime: decoded.flightTime,
  };
}

// Encode-only helpers (vehicleTelemetryToEncodeInput, addTelemetryMotionFields,
// addTelemetryBatteryField) moved to realtime-encode.ts
