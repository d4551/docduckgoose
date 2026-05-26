/**
 * Shared types for realtime FlatBuffers protocol.
 *
 * @shared/protocols/realtime-flatbuffers/types
 */

import type { RealtimePayloadKindV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";

/**
 * Supported realtime channels for drone payloads.
 */
export type RealtimeBinaryChannel = "devices" | "telemetry";

/** Typed telemetry struct for Position3D. */
export interface TelemetryPosition3D {
  latitude: number;
  longitude: number;
  altitude: number;
  relativeAltitude?: number;
}

/** Typed telemetry struct for Attitude. */
export interface TelemetryAttitude {
  roll: number;
  pitch: number;
  yaw: number;
}

/** Typed telemetry struct for Velocity3D. */
export interface TelemetryVelocity3D {
  x?: number;
  y?: number;
  z?: number;
  groundSpeed?: number;
  airSpeed?: number;
}

/** Typed telemetry struct for BatteryStatus. */
export interface TelemetryBatteryStatus {
  level?: number;
  voltage: number;
  current?: number;
  temperature?: number;
  remainingPercent?: number;
}

/** Input for encoding typed telemetry payload. */
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

/** Decoded typed telemetry payload. */
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

/**
 * Scanner progress payload encoded for binary realtime transport.
 */
export interface ScannerProgressBinaryPayload {
  /** Scan session identifier. */
  scanId: string;
  /** Scanner processing phase. */
  phase: string;
  /** Current step position. */
  currentStep: number;
  /** Total configured steps. */
  totalSteps: number;
  /** Percentage progress from 0 to 100. */
  percentage: number;
  /** Human-readable status message. */
  message: string;
  /** ISO timestamp for the event. */
  timestamp: string;
}

/**
 * Convenience binary drone envelope shape with parsed JSON payload.
 */
export interface DroneRealtimeWsEnvelopeBinary {
  /** Drone channel source. */
  channel: RealtimeBinaryChannel;
  /** Realtime event name. */
  event: string;
  /** Parsed JSON payload. */
  data: unknown;
  /** ISO timestamp. */
  timestamp: string;
  /** Optional source base URL. */
  baseUrl?: string | null;
}

/**
 * Decoded internal realtime websocket envelope.
 */
export interface DecodedRealtimeWsEnvelopeBinary {
  /** Protocol version. */
  version: number;
  /** Binary payload kind. */
  kind: RealtimePayloadKindV1;
  /** Nested payload bytes. */
  payload: Uint8Array;
  /** Envelope timestamp when present. */
  timestamp: string | null;
}
