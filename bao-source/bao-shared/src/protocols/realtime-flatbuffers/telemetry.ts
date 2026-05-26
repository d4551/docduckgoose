import type { Builder } from "@baohaus/flatbuf-bao/builder";

/**
 * Telemetry payload encode/decode and ws envelope helpers.
 *
 * @shared/protocols/realtime-flatbuffers/telemetry
 */

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
import { Attitude } from "../../generated/flatbuffers/baohaus/realtime/v1/attitude.js";
import { BatteryStatus } from "../../generated/flatbuffers/baohaus/realtime/v1/battery-status.js";
import { Position3D } from "../../generated/flatbuffers/baohaus/realtime/v1/position3-d.js";
import { RealtimePayloadKindV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { TelemetryPayloadV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/telemetry-payload-v1.js";
import { Velocity3D } from "../../generated/flatbuffers/baohaus/realtime/v1/velocity3-d.js";
import { decodeRealtimeWsEnvelopeBinary, encodeRealtimeWsEnvelopeBinary } from "./envelope";
import { BATTERY_FULL_PERCENT, toUint8Array } from "./internals";
import type { TelemetryPayloadDecoded, TelemetryPayloadEncodeInput } from "./types";

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
    const root = TelemetryPayloadV1.getRootAsTelemetryPayloadV1(bb);

    const pos = root.position();
    const att = root.attitude();
    const vel = root.velocity();
    const bat = root.battery();

    return {
      vehicleId: root.vehicleId() ?? "",
      timestamp: root.timestamp() ?? "",
      connectionState: root.connectionState(),
      armed: root.armed(),
      flightMode: root.flightMode(),
      position:
        pos == null
          ? null
          : {
              latitude: pos.latitude(),
              longitude: pos.longitude(),
              altitude: pos.altitude(),
              relativeAltitude: pos.relativeAltitude(),
            },
      attitude:
        att == null
          ? { roll: 0, pitch: 0, yaw: 0 }
          : { roll: att.roll(), pitch: att.pitch(), yaw: att.yaw() },
      velocity:
        vel == null
          ? null
          : {
              x: vel.x(),
              y: vel.y(),
              z: vel.z(),
              groundSpeed: vel.groundSpeed(),
              airSpeed: vel.airSpeed(),
            },
      gpsFixType: root.gpsFixType(),
      satelliteCount: root.satelliteCount(),
      battery:
        bat == null
          ? { voltage: 0 }
          : {
              voltage: bat.voltage(),
              level: bat.level(),
              current: bat.current(),
              temperature: bat.temperature(),
              remainingPercent: bat.remainingPercent(),
            },
      signalStrength: root.signalStrength(),
      flightTime: root.flightTime(),
    } satisfies TelemetryPayloadDecoded;
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
