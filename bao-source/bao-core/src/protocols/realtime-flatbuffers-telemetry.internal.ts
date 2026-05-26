import type { Builder } from "@baohaus/flatbuf-bao/builder";
/**
 * Telemetry table + typed drone websocket envelope helpers.
 *
 * @internal
 */

import { FLIGHT_MODES } from "@baohaus/bao-schemas/autopilot.schemas";
import { GPS_FIX_TYPES } from "@baohaus/bao-schemas/sensor.schemas";
import {
  withPooledBuilderForceDefaults,
  withPooledByteBuffer,
} from "@baohaus/bao-wrapture/builder-pool";
import {
  WRAPTURE_BUILDER_CAPACITIES,
  WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
} from "@baohaus/bao-wrapture/defaults";
import {
  recordDecodeError,
  sampledRecordDecode,
  sampledRecordEncode,
  startSampledTiming,
} from "@baohaus/bao-wrapture/metrics";

import { Attitude } from "../generated/flatbuffers/baohaus/realtime/v1/attitude.js";
import { BatteryStatus } from "../generated/flatbuffers/baohaus/realtime/v1/battery-status.js";
import { Position3D } from "../generated/flatbuffers/baohaus/realtime/v1/position3-d.js";
import { RealtimePayloadKindV1 } from "../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { TelemetryPayloadV1 } from "../generated/flatbuffers/baohaus/realtime/v1/telemetry-payload-v1.js";
import { Velocity3D } from "../generated/flatbuffers/baohaus/realtime/v1/velocity3-d.js";
import {
  decodeRealtimeWsEnvelopeBinary,
  encodeRealtimeWsEnvelopeBinary,
} from "./realtime-flatbuffers-envelope-core.internal";
import type { RealtimeBinaryChannel } from "./realtime-flatbuffers-protocol-surface.internal";
import { toUint8Array } from "./realtime-flatbuffers-util.internal";

const BATTERY_FULL_PERCENT = 100;

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
function isVehicleTelemetryShape(value: unknown): value is {
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
function telemetryToPlainObject(decoded: TelemetryPayloadDecoded): Record<string, unknown> {
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
function vehicleTelemetryToEncodeInput(data: VehicleTelemetryInput): TelemetryPayloadEncodeInput {
  const vel = data.velocity;
  return {
    vehicleId: data.vehicleId,
    timestamp: data.timestamp,
    connectionState: resolveConnectionState(data.connectionState),
    armed: data.armed,
    flightMode: resolveFlightMode(data.flightMode),
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
      remainingPercent: resolveBatteryRemainingPercent(
        data.battery.remaining,
        data.battery.voltage,
      ),
      ...(data.battery.current === undefined ? {} : { current: data.battery.current }),
      ...(data.battery.temperature === undefined ? {} : { temperature: data.battery.temperature }),
    },
    ...(data.position === undefined ? {} : { position: data.position }),
    ...(data.signalStrength === undefined ? {} : { signalStrength: data.signalStrength }),
    ...(data.flightTime === undefined ? {} : { flightTime: data.flightTime }),
  };
}

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

function decodeTelemetryPosition(position: Position3D | null): TelemetryPayloadDecoded["position"] {
  if (position === null) {
    return null;
  }

  const relativeAltitude = position.relativeAltitude();
  return {
    latitude: position.latitude(),
    longitude: position.longitude(),
    altitude: position.altitude(),
    ...(relativeAltitude === undefined ? {} : { relativeAltitude }),
  };
}

function decodeTelemetryAttitude(attitude: Attitude | null): TelemetryPayloadDecoded["attitude"] {
  if (attitude === null) {
    return { roll: 0, pitch: 0, yaw: 0 };
  }

  return {
    roll: attitude.roll(),
    pitch: attitude.pitch(),
    yaw: attitude.yaw(),
  };
}

function decodeTelemetryVelocity(velocity: Velocity3D | null): TelemetryPayloadDecoded["velocity"] {
  if (velocity === null) {
    return null;
  }

  const x = velocity.x();
  const y = velocity.y();
  const z = velocity.z();
  const groundSpeed = velocity.groundSpeed();
  const airSpeed = velocity.airSpeed();

  return {
    ...(x === undefined ? {} : { x }),
    ...(y === undefined ? {} : { y }),
    ...(z === undefined ? {} : { z }),
    ...(groundSpeed === undefined ? {} : { groundSpeed }),
    ...(airSpeed === undefined ? {} : { airSpeed }),
  };
}

function decodeTelemetryBattery(battery: BatteryStatus | null): TelemetryPayloadDecoded["battery"] {
  if (battery === null) {
    return { voltage: 0 };
  }

  const level = battery.level();
  const current = battery.current();
  const temperature = battery.temperature();
  const remainingPercent = battery.remainingPercent();

  return {
    voltage: battery.voltage(),
    ...(level === undefined ? {} : { level }),
    ...(current === undefined ? {} : { current }),
    ...(temperature === undefined ? {} : { temperature }),
    ...(remainingPercent === undefined ? {} : { remainingPercent }),
  };
}

function decodeTelemetryPayload(root: TelemetryPayloadV1): TelemetryPayloadDecoded {
  return {
    vehicleId: root.vehicleId() ?? "",
    timestamp: root.timestamp() ?? "",
    connectionState: root.connectionState(),
    armed: root.armed(),
    flightMode: root.flightMode(),
    position: decodeTelemetryPosition(root.position()),
    attitude: decodeTelemetryAttitude(root.attitude()),
    velocity: decodeTelemetryVelocity(root.velocity()),
    gpsFixType: root.gpsFixType(),
    satelliteCount: root.satelliteCount(),
    battery: decodeTelemetryBattery(root.battery()),
    signalStrength: root.signalStrength(),
    flightTime: root.flightTime(),
  };
}

/** Write position, attitude, and velocity structs onto a telemetry builder. */
function addTelemetryMotionFields(builder: Builder, payload: TelemetryPayloadEncodeInput): void {
  const pos = payload.position;
  TelemetryPayloadV1.addPosition(
    builder,
    Position3D.createPosition3D(
      builder,
      pos?.latitude ?? 0,
      pos?.longitude ?? 0,
      pos?.altitude ?? 0,
      pos?.relativeAltitude ?? 0,
    ),
  );

  const att = payload.attitude;
  TelemetryPayloadV1.addAttitude(
    builder,
    Attitude.createAttitude(builder, att.roll, att.pitch, att.yaw),
  );

  const vel = payload.velocity;
  TelemetryPayloadV1.addVelocity(
    builder,
    Velocity3D.createVelocity3D(
      builder,
      vel?.x ?? 0,
      vel?.y ?? 0,
      vel?.z ?? 0,
      vel?.groundSpeed ?? 0,
      vel?.airSpeed ?? 0,
    ),
  );
}

/** Write battery status struct onto a telemetry builder. */
function addTelemetryBatteryField(
  builder: Builder,
  bat: TelemetryPayloadEncodeInput["battery"],
): void {
  TelemetryPayloadV1.addBattery(
    builder,
    BatteryStatus.createBatteryStatus(
      builder,
      bat.level ?? bat.voltage,
      bat.voltage,
      bat.current ?? 0,
      bat.temperature ?? 0,
      bat.remainingPercent ?? (bat.voltage > 0 ? BATTERY_FULL_PERCENT : 0),
    ),
  );
}

/**
 * Encode a realtime telemetry payload into its flatbuffer binary representation
 * using a pooled builder sized for telemetry messages.
 *
 * @param payload - Telemetry sample to serialize.
 * @returns The encoded flatbuffer bytes ready for transport.
 */
export function encodeTelemetryPayloadBinary(payload: TelemetryPayloadEncodeInput): Uint8Array {
  const t = startSampledTiming("realtime.telemetry");
  const capacity = WRAPTURE_BUILDER_CAPACITIES.telemetry;
  const result = withPooledBuilderForceDefaults(capacity, (builder) => {
    const vehicleIdOffset = builder.createSharedString(payload.vehicleId);
    const timestampOffset = builder.createString(payload.timestamp);

    TelemetryPayloadV1.startTelemetryPayloadV1(builder);
    TelemetryPayloadV1.addVehicleId(builder, vehicleIdOffset);
    TelemetryPayloadV1.addTimestamp(builder, timestampOffset);
    TelemetryPayloadV1.addConnectionState(builder, payload.connectionState);
    TelemetryPayloadV1.addArmed(builder, payload.armed);
    TelemetryPayloadV1.addFlightMode(builder, payload.flightMode);

    addTelemetryMotionFields(builder, payload);

    TelemetryPayloadV1.addGpsFixType(builder, payload.gpsFixType ?? 0);
    TelemetryPayloadV1.addSatelliteCount(builder, payload.satelliteCount ?? 0);

    addTelemetryBatteryField(builder, payload.battery);

    TelemetryPayloadV1.addSignalStrength(builder, payload.signalStrength ?? 0);
    TelemetryPayloadV1.addFlightTime(builder, payload.flightTime ?? 0);

    const root = TelemetryPayloadV1.endTelemetryPayloadV1(builder);
    TelemetryPayloadV1.finishTelemetryPayloadV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  sampledRecordEncode("realtime.telemetry", result.byteLength, t);
  return result;
}

/**
 * Decode a typed telemetry payload table.
 *
 * Hot decode path: uses scoped ByteBuffer lifecycle and sampled timing.
 * Applies max size guard to prevent DoS from untrusted input.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size (default from config).
 * @returns Decoded payload or null when invalid.
 */
export function decodeTelemetryPayloadBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): TelemetryPayloadDecoded | null {
  const t = startSampledTiming("realtime.telemetry");
  const uint8 = toUint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("realtime.telemetry");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!TelemetryPayloadV1.bufferHasIdentifier(bb)) {
      return null;
    }
    return decodeTelemetryPayload(TelemetryPayloadV1.getRootAsTelemetryPayloadV1(bb));
  });

  if (!result) {
    recordDecodeError("realtime.telemetry");
    return null;
  }
  sampledRecordDecode("realtime.telemetry", uint8.byteLength, t);
  return result;
}

/**
 * Encode a typed telemetry websocket envelope.
 *
 * @param payload - Telemetry payload fields.
 * @returns Encoded envelope bytes.
 */
export function encodeTelemetryWsEnvelopeBinary(payload: TelemetryPayloadEncodeInput): Uint8Array {
  const telemetryPayload = encodeTelemetryPayloadBinary(payload);
  return encodeRealtimeWsEnvelopeBinary({
    kind: RealtimePayloadKindV1.TELEMETRY_TYPED,
    payload: telemetryPayload,
    timestamp: payload.timestamp,
  });
}

/**
 * Decode a typed telemetry websocket envelope.
 *
 * @param bytes - Envelope bytes.
 * @returns Decoded telemetry payload or null when invalid.
 */
export function decodeTelemetryWsEnvelopeBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): TelemetryPayloadDecoded | null {
  const envelope = decodeRealtimeWsEnvelopeBinary(bytes, maxBytes);
  if (!envelope || envelope.kind !== RealtimePayloadKindV1.TELEMETRY_TYPED) {
    return null;
  }
  return decodeTelemetryPayloadBinary(envelope.payload, maxBytes);
}

/**
 * Encode a full drone websocket envelope for internal binary transport.
 *
 * The binary realtime channel is telemetry-only. Device/event fanout stays on
 * the JSON websocket topic until a closed typed event schema exists for those
 * payloads.
 *
 * @param payload - Drone envelope payload.
 * @returns Encoded bytes or null when serialization fails.
 */
export function encodeDroneRealtimeWsEnvelopeBinary(
  payload: Omit<DroneRealtimeWsEnvelopeBinary, "data"> & { data: unknown },
): Uint8Array | null {
  if (payload.channel !== "telemetry" || payload.event !== "telemetry") {
    return null;
  }
  if (!isVehicleTelemetryShape(payload.data)) {
    return null;
  }
  const telemetryInput = vehicleTelemetryToEncodeInput(payload.data);
  return encodeTelemetryWsEnvelopeBinary(telemetryInput);
}

/**
 * Decode a full drone websocket envelope from internal binary transport.
 *
 * Only TELEMETRY_TYPED envelopes are supported.
 *
 * @param bytes - Envelope bytes.
 * @returns Decoded payload or null when invalid.
 */
export function decodeDroneRealtimeWsEnvelopeBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): DroneRealtimeWsEnvelopeBinary | null {
  const envelope = decodeRealtimeWsEnvelopeBinary(bytes, maxBytes);
  if (!envelope) {
    return null;
  }

  if (envelope.kind === RealtimePayloadKindV1.TELEMETRY_TYPED) {
    const telemetry = decodeTelemetryPayloadBinary(envelope.payload, maxBytes);
    if (!telemetry) {
      return null;
    }
    return {
      channel: "telemetry",
      event: "telemetry",
      data: telemetryToPlainObject(telemetry),
      timestamp: telemetry.timestamp,
      baseUrl: null,
    };
  }

  return null;
}
