/**
 * Internal helpers for realtime FlatBuffers protocol modules.
 *
 * @shared/protocols/realtime-flatbuffers/internals
 */

import { FLIGHT_MODES } from "../../schemas/autopilot.schemas";
import { GPS_FIX_TYPES } from "../../schemas/sensor.schemas";
import type { TelemetryPayloadDecoded, TelemetryPayloadEncodeInput } from "./types";

export const BATTERY_FULL_PERCENT = 100;
export const FB_BUILDER_SMALL = 256;
export const FB_MIN_HEADER_SIZE = 8;

/** ConnectionState string → ubyte mapping for telemetry. */
const CONNECTION_STATE_TO_UBYTE: Record<string, number> = {
  disconnected: 0,
  connecting: 1,
  connected: 2,
  armed: 3,
  flying: 4,
  error: 5,
};

/** Check if value has VehicleTelemetry shape for typed encoding. */
export function isVehicleTelemetryShape(value: unknown): value is {
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
} {
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

/** Convert decoded telemetry to plain object for DroneRealtimeWsEnvelopeBinary.data. */
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

/** Resolve connection state string or number to a ubyte index. */
function resolveConnectionState(value: string | number): number {
  if (typeof value === "number") {
    return value >= 0 ? value : 0;
  }
  const mapped = CONNECTION_STATE_TO_UBYTE[value] ?? 0;
  return mapped >= 0 ? mapped : 0;
}

/** Resolve flight mode string or number to an index. */
function resolveFlightMode(value: string | number): number {
  if (typeof value === "number") {
    return value >= 0 ? value : 0;
  }
  const idx = (FLIGHT_MODES as readonly string[]).indexOf(value);
  return idx >= 0 ? idx : 0;
}

/** Resolve GPS fix type string to an index, defaulting to 0. */
function resolveGpsFixType(fixType: string | undefined | null): number {
  if (fixType == null) {
    return 0;
  }
  const idx = (GPS_FIX_TYPES as readonly string[]).indexOf(fixType);
  return idx >= 0 ? idx : 0;
}

/** Resolve battery remaining to a percent value. */
function resolveBatteryRemainingPercent(remaining: number | undefined, voltage: number): number {
  if (typeof remaining === "number") {
    return remaining <= 1 ? remaining * BATTERY_FULL_PERCENT : remaining;
  }
  return voltage > 0 ? BATTERY_FULL_PERCENT : 0;
}

/** Input type for vehicleTelemetryToEncodeInput. */
interface VehicleTelemetryInput {
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

/** Map VehicleTelemetry-shaped data to TelemetryPayloadEncodeInput. */
export function vehicleTelemetryToEncodeInput(
  data: VehicleTelemetryInput,
): TelemetryPayloadEncodeInput {
  const vel = data.velocity;
  return {
    vehicleId: data.vehicleId,
    timestamp: data.timestamp,
    connectionState: resolveConnectionState(data.connectionState),
    armed: data.armed,
    flightMode: resolveFlightMode(data.flightMode),
    position: data.position,
    attitude: data.attitude,
    velocity: vel
      ? {
          x: vel.x ?? vel.vx ?? 0,
          y: vel.y ?? vel.vy ?? 0,
          z: vel.z ?? vel.vz ?? 0,
          groundSpeed: vel.groundSpeed ?? 0,
          airSpeed: vel.airSpeed ?? 0,
        }
      : null,
    gpsFixType: resolveGpsFixType(data.gps?.fixType),
    satelliteCount: data.gps?.satelliteCount ?? 0,
    battery: {
      voltage: data.battery.voltage,
      current: data.battery.current,
      temperature: data.battery.temperature,
      remainingPercent: resolveBatteryRemainingPercent(
        data.battery.remaining,
        data.battery.voltage,
      ),
    },
    signalStrength: data.signalStrength,
    flightTime: data.flightTime,
  };
}

/**
 * Normalize optional string values from generated FlatBuffers accessors.
 *
 * @param value - Candidate string value.
 * @returns Trimmed value or null.
 */
export function normalizeOptionalString(value: string | Uint8Array | null): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Convert binary payload input into a Uint8Array view.
 *
 * @param bytes - Input bytes.
 * @returns Uint8Array view.
 */
export function toUint8Array(bytes: ArrayBuffer | Uint8Array): Uint8Array {
  if (bytes instanceof Uint8Array) {
    return bytes;
  }
  return new Uint8Array(bytes);
}
