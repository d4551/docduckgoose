import type { Builder } from "@baohaus/flatbuf-bao/builder";

/**
 * FlatBuffers encode functions for realtime transport.
 *
 * @shared/protocols/realtime-encode
 */

import {
  withPooledBuilder,
  withPooledBuilderForceDefaults,
} from "@baohaus/bao-wrapture/builder-pool";
import { WRAPTURE_BUILDER_CAPACITIES } from "@baohaus/bao-wrapture/defaults";
import {
  recordEncode,
  sampledRecordEncode,
  startSampledTiming,
  startTiming,
} from "@baohaus/bao-wrapture/metrics";
import { Attitude } from "../generated/flatbuffers/baohaus/realtime/v1/attitude.js";
import { BatteryStatus } from "../generated/flatbuffers/baohaus/realtime/v1/battery-status.js";
import { DeviceEventV1 } from "../generated/flatbuffers/baohaus/realtime/v1/device-event-v1.js";
import { GimbalEventV1 } from "../generated/flatbuffers/baohaus/realtime/v1/gimbal-event-v1.js";
import { HardwareStateEventV1 } from "../generated/flatbuffers/baohaus/realtime/v1/hardware-state-event-v1.js";
import { Position3D } from "../generated/flatbuffers/baohaus/realtime/v1/position3-d.js";
import { RealtimePayloadKindV1 } from "../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { ScannerProgressV1 } from "../generated/flatbuffers/baohaus/realtime/v1/scanner-progress-v1.js";
import { TelemetryPayloadV1 } from "../generated/flatbuffers/baohaus/realtime/v1/telemetry-payload-v1.js";
import { Velocity3D } from "../generated/flatbuffers/baohaus/realtime/v1/velocity3-d.js";
import { WsEnvelopeV1 } from "../generated/flatbuffers/baohaus/realtime/v1/ws-envelope-v1.js";
import { FLIGHT_MODES } from "../schemas/autopilot.schemas";
import { GPS_FIX_TYPES } from "../schemas/sensor.schemas";
import {
  BATTERY_FULL_PERCENT,
  type DeviceEventEncodeInput,
  FB_BUILDER_SMALL,
  type GimbalEventEncodeInput,
  type HardwareStateEventRealtimeInput,
  REALTIME_FLATBUFFERS_PROTOCOL_VERSION,
  type ScannerProgressBinaryPayload,
  type TelemetryPayloadEncodeInput,
  type VehicleTelemetryInput,
} from "./realtime-shared.ts";

/** ConnectionState string → ubyte mapping for telemetry. */
const CONNECTION_STATE_TO_UBYTE: Record<string, number> = {
  disconnected: 0,
  connecting: 1,
  connected: 2,
  armed: 3,
  flying: 4,
  error: 5,
};

function resolveConnectionState(value: string | number): number {
  if (typeof value === "number") {
    return value >= 0 ? value : 0;
  }
  const mapped = CONNECTION_STATE_TO_UBYTE[value] ?? 0;
  return mapped >= 0 ? mapped : 0;
}

function resolveFlightMode(value: string | number): number {
  if (typeof value === "number") {
    return value >= 0 ? value : 0;
  }
  const idx = (FLIGHT_MODES as readonly string[]).indexOf(value);
  return idx >= 0 ? idx : 0;
}

function resolveGpsFixType(fixType: string | undefined | null): number {
  if (fixType == null) {
    return 0;
  }
  const idx = (GPS_FIX_TYPES as readonly string[]).indexOf(fixType);
  return idx >= 0 ? idx : 0;
}

function resolveBatteryRemainingPercent(remaining: number | undefined, voltage: number): number {
  if (typeof remaining === "number") {
    return remaining <= 1 ? remaining * BATTERY_FULL_PERCENT : remaining;
  }
  return voltage > 0 ? BATTERY_FULL_PERCENT : 0;
}

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

interface HwStateRealtimeStringOffsets {
  deviceId: number;
  status: number;
  metric: number;
  valueString: number;
  unit: number;
  command: number;
  reason: number;
  correlationId: number;
  timestamp: number;
  metadataJson: number;
}

function prepareHwStateStrings(
  builder: { createSharedString(s: string): number; createString(s: string): number },
  input: HardwareStateEventRealtimeInput,
): HwStateRealtimeStringOffsets {
  return {
    deviceId: builder.createSharedString(input.deviceId),
    status: input.status ? builder.createString(input.status) : 0,
    metric: input.metric ? builder.createSharedString(input.metric) : 0,
    valueString: input.valueString ? builder.createString(input.valueString) : 0,
    unit: input.unit ? builder.createSharedString(input.unit) : 0,
    command: input.command ? builder.createSharedString(input.command) : 0,
    reason: input.reason ? builder.createString(input.reason) : 0,
    correlationId: input.correlationId ? builder.createString(input.correlationId) : 0,
    timestamp: builder.createString(input.timestamp),
    metadataJson: input.metadataJson ? builder.createString(input.metadataJson) : 0,
  };
}

function writeHwStateOptionalFields(
  builder: Parameters<typeof HardwareStateEventV1.addValueFloat>[0],
  input: HardwareStateEventRealtimeInput,
  offsets: HwStateRealtimeStringOffsets,
): void {
  if (offsets.status) {
    HardwareStateEventV1.addStatus(builder, offsets.status);
  }
  if (offsets.metric) {
    HardwareStateEventV1.addMetric(builder, offsets.metric);
  }
  if (input.valueFloat !== undefined) {
    HardwareStateEventV1.addValueFloat(builder, input.valueFloat);
  }
  if (offsets.valueString) {
    HardwareStateEventV1.addValueString(builder, offsets.valueString);
  }
  if (offsets.unit) {
    HardwareStateEventV1.addUnit(builder, offsets.unit);
  }
  if (input.quality !== undefined) {
    HardwareStateEventV1.addQuality(
      builder,
      Math.max(0, Math.min(BATTERY_FULL_PERCENT, Math.trunc(input.quality))),
    );
  }
  if (offsets.command) {
    HardwareStateEventV1.addCommand(builder, offsets.command);
  }
  if (input.acknowledged !== undefined) {
    HardwareStateEventV1.addAcknowledged(builder, input.acknowledged);
  }
  if (input.healthScore !== undefined) {
    HardwareStateEventV1.addHealthScore(builder, input.healthScore);
  }
  if (offsets.reason) {
    HardwareStateEventV1.addReason(builder, offsets.reason);
  }
  if (offsets.correlationId) {
    HardwareStateEventV1.addCorrelationId(builder, offsets.correlationId);
  }
  if (input.latencyMs !== undefined) {
    HardwareStateEventV1.addLatencyMs(builder, Math.max(0, Math.trunc(input.latencyMs)));
  }
  if (offsets.metadataJson) {
    HardwareStateEventV1.addMetadataJson(builder, offsets.metadataJson);
  }
}

export function encodeDeviceEventBinary(input: DeviceEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(FB_BUILDER_SMALL, (builder) => {
    const deviceIdOffset = builder.createSharedString(input.deviceId);
    const typeOffset = builder.createSharedString(input.type);
    const timestampOffset = builder.createString(input.timestamp);
    DeviceEventV1.startDeviceEventV1(builder);
    DeviceEventV1.addDeviceId(builder, deviceIdOffset);
    DeviceEventV1.addType(builder, typeOffset);
    DeviceEventV1.addStatus(builder, input.status);
    DeviceEventV1.addValue(builder, input.value);
    DeviceEventV1.addTimestamp(builder, timestampOffset);
    const root = DeviceEventV1.endDeviceEventV1(builder);
    DeviceEventV1.finishDeviceEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("realtime.device", result.byteLength, t);
  return result;
}

export function encodeGimbalEventBinary(input: GimbalEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(FB_BUILDER_SMALL, (builder) => {
    const timestampOffset = builder.createString(input.timestamp);
    GimbalEventV1.startGimbalEventV1(builder);
    GimbalEventV1.addPitch(builder, input.pitch);
    GimbalEventV1.addYaw(builder, input.yaw);
    GimbalEventV1.addRoll(builder, input.roll);
    GimbalEventV1.addMode(builder, input.mode);
    GimbalEventV1.addTimestamp(builder, timestampOffset);
    const root = GimbalEventV1.endGimbalEventV1(builder);
    GimbalEventV1.finishGimbalEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("realtime.gimbal", result.byteLength, t);
  return result;
}

export function encodeScannerProgressPayloadBinary(
  payload: ScannerProgressBinaryPayload,
): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(WRAPTURE_BUILDER_CAPACITIES.scannerProgress, (builder) => {
    const scanIdOffset = builder.createSharedString(payload.scanId);
    const phaseOffset = builder.createSharedString(payload.phase);
    const messageOffset = builder.createString(payload.message);
    const timestampOffset = builder.createString(payload.timestamp);
    const root = ScannerProgressV1.createScannerProgressV1(
      builder,
      scanIdOffset,
      phaseOffset,
      Math.max(0, Math.trunc(payload.currentStep)),
      Math.max(0, Math.trunc(payload.totalSteps)),
      payload.percentage,
      messageOffset,
      timestampOffset,
    );
    ScannerProgressV1.finishScannerProgressV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("realtime.scanner", result.byteLength, t);
  return result;
}

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

export function encodeTelemetryWsEnvelopeBinary(payload: TelemetryPayloadEncodeInput): Uint8Array {
  const telemetryPayload = encodeTelemetryPayloadBinary(payload);
  return encodeRealtimeWsEnvelopeBinary({
    kind: RealtimePayloadKindV1.TELEMETRY_TYPED,
    payload: telemetryPayload,
    timestamp: payload.timestamp,
  });
}

export function encodeRealtimeWsEnvelopeBinary(params: {
  kind: RealtimePayloadKindV1;
  payload: Uint8Array;
  timestamp: string;
  version?: number;
}): Uint8Array {
  const t = startTiming();
  const capacity = Math.max(
    WRAPTURE_BUILDER_CAPACITIES.droneRealtime,
    FB_BUILDER_SMALL + params.payload.byteLength,
  );
  const result = withPooledBuilder(capacity, (builder) => {
    const payloadOffset = WsEnvelopeV1.createPayloadVector(builder, params.payload);
    const timestampOffset = builder.createString(params.timestamp);
    const root = WsEnvelopeV1.createWsEnvelopeV1(
      builder,
      params.version ?? REALTIME_FLATBUFFERS_PROTOCOL_VERSION,
      params.kind,
      payloadOffset,
      timestampOffset,
      1,
      0,
    );
    WsEnvelopeV1.finishWsEnvelopeV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("realtime.envelope", result.byteLength, t);
  return result;
}

export function encodeScannerProgressWsEnvelopeBinary(
  payload: ScannerProgressBinaryPayload,
): Uint8Array {
  const scannerPayload = encodeScannerProgressPayloadBinary(payload);
  return encodeRealtimeWsEnvelopeBinary({
    kind: RealtimePayloadKindV1.SCANNER_PROGRESS,
    payload: scannerPayload,
    timestamp: payload.timestamp,
  });
}

export function encodeHardwareStateEventBinary(input: HardwareStateEventRealtimeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(WRAPTURE_BUILDER_CAPACITIES.hardwareStateEvent, (builder) => {
    const offsets = prepareHwStateStrings(builder, input);
    HardwareStateEventV1.startHardwareStateEventV1(builder);
    HardwareStateEventV1.addDeviceId(builder, offsets.deviceId);
    HardwareStateEventV1.addEventKind(builder, input.eventKind);
    writeHwStateOptionalFields(builder, input, offsets);
    HardwareStateEventV1.addTimestamp(builder, offsets.timestamp);
    const root = HardwareStateEventV1.endHardwareStateEventV1(builder);
    HardwareStateEventV1.finishHardwareStateEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("hardware-state", result.byteLength, t);
  return result;
}
