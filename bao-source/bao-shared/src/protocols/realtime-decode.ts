import { SIZE_PREFIX_LENGTH } from "@baohaus/flatbuf-bao/constants";

/**
 * FlatBuffers decode functions for realtime transport.
 *
 * @shared/protocols/realtime-decode
 */

import { withPooledByteBuffer } from "@baohaus/bao-wrapture/builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "@baohaus/bao-wrapture/defaults";
import {
  recordDecode,
  recordDecodeError,
  sampledRecordDecode,
  startSampledTiming,
  startTiming,
} from "@baohaus/bao-wrapture/metrics";
import { HardwareEventKindV1 } from "../generated/flatbuffers/baohaus/realtime/v1/hardware-event-kind-v1.js";
import { HardwareStateEventV1 } from "../generated/flatbuffers/baohaus/realtime/v1/hardware-state-event-v1.js";
import { RealtimePayloadKindV1 } from "../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { ScannerProgressV1 } from "../generated/flatbuffers/baohaus/realtime/v1/scanner-progress-v1.js";
import { TelemetryPayloadV1 } from "../generated/flatbuffers/baohaus/realtime/v1/telemetry-payload-v1.js";
import { WsEnvelopeV1 } from "../generated/flatbuffers/baohaus/realtime/v1/ws-envelope-v1.js";
import {
  type DecodedRealtimeWsEnvelopeBinary,
  type DroneRealtimeWsEnvelopeBinary,
  FB_MIN_HEADER_SIZE,
  type HardwareStateEventRealtimeDecoded,
  normalizeOptionalString,
  type ScannerProgressBinaryPayload,
  type TelemetryPayloadDecoded,
  telemetryToPlainObject,
  toUint8Array,
} from "./realtime-shared.ts";

/** Re-export enum for convenience. */
export { HardwareEventKindV1 };

export function decodeScannerProgressPayloadBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): ScannerProgressBinaryPayload | null {
  const t = startTiming();
  const uint8 = toUint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("realtime.scanner");
    return null;
  }
  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!ScannerProgressV1.bufferHasIdentifier(bb)) {
      return null;
    }
    const root = ScannerProgressV1.getRootAsScannerProgressV1(bb);
    return {
      scanId: root.scanId() ?? "",
      phase: root.phase() ?? "",
      currentStep: root.currentStep(),
      totalSteps: root.totalSteps(),
      percentage: root.percentage(),
      message: root.message() ?? "",
      timestamp: root.timestamp() ?? "",
    } satisfies ScannerProgressBinaryPayload;
  });
  if (!result) {
    recordDecodeError("realtime.scanner");
    return null;
  }
  recordDecode("realtime.scanner", uint8.byteLength, t);
  return result;
}

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

export function decodeRealtimeWsEnvelopeBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): DecodedRealtimeWsEnvelopeBinary | null {
  const t = startSampledTiming("realtime.envelope");
  const uint8 = toUint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("realtime.envelope");
    return null;
  }
  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!WsEnvelopeV1.bufferHasIdentifier(bb)) {
      return null;
    }
    const root = WsEnvelopeV1.getRootAsWsEnvelopeV1(bb);
    const payloadArray = root.payloadArray();
    if (!payloadArray) {
      return null;
    }
    return {
      version: root.version(),
      kind: root.kind(),
      payload: new Uint8Array(payloadArray.buffer, payloadArray.byteOffset, payloadArray.length),
      timestamp: normalizeOptionalString(root.timestamp()),
    } satisfies DecodedRealtimeWsEnvelopeBinary;
  });
  if (!result) {
    recordDecodeError("realtime.envelope");
    return null;
  }
  sampledRecordDecode("realtime.envelope", uint8.byteLength, t);
  return result;
}

export function decodeRealtimeWsEnvelopeBinarySizePrefixed(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): DecodedRealtimeWsEnvelopeBinary | null {
  const t = startSampledTiming("realtime.envelope");
  const uint8 = toUint8Array(bytes);
  if (uint8.byteLength > maxBytes || uint8.byteLength < SIZE_PREFIX_LENGTH + FB_MIN_HEADER_SIZE) {
    recordDecodeError("realtime.envelope");
    return null;
  }
  const result = withPooledByteBuffer(uint8, (bb) => {
    const root = WsEnvelopeV1.getSizePrefixedRootAsWsEnvelopeV1(bb);
    const payloadArray = root.payloadArray();
    if (!payloadArray) {
      return null;
    }
    return {
      version: root.version(),
      kind: root.kind(),
      payload: new Uint8Array(payloadArray.buffer, payloadArray.byteOffset, payloadArray.length),
      timestamp: normalizeOptionalString(root.timestamp()),
    } satisfies DecodedRealtimeWsEnvelopeBinary;
  });
  if (!result) {
    recordDecodeError("realtime.envelope");
    return null;
  }
  sampledRecordDecode("realtime.envelope", uint8.byteLength, t);
  return result;
}

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

export function decodeScannerProgressWsEnvelopeBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): ScannerProgressBinaryPayload | null {
  const envelope = decodeRealtimeWsEnvelopeBinary(bytes, maxBytes);
  if (!envelope || envelope.kind !== RealtimePayloadKindV1.SCANNER_PROGRESS) {
    return null;
  }
  return decodeScannerProgressPayloadBinary(envelope.payload, maxBytes);
}

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

export function decodeHardwareStateEventBinary(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): HardwareStateEventRealtimeDecoded | null {
  const t = startTiming();
  const uint8 = toUint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("hardware-state");
    return null;
  }
  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!HardwareStateEventV1.bufferHasIdentifier(bb)) {
      return null;
    }
    const root = HardwareStateEventV1.getRootAsHardwareStateEventV1(bb);
    return {
      deviceId: root.deviceId() ?? null,
      eventKind: root.eventKind(),
      status: root.status() ?? null,
      metric: root.metric() ?? null,
      valueFloat: root.valueFloat(),
      valueString: root.valueString() ?? null,
      unit: root.unit() ?? null,
      quality: root.quality(),
      command: root.command() ?? null,
      acknowledged: root.acknowledged(),
      healthScore: root.healthScore(),
      reason: root.reason() ?? null,
      correlationId: root.correlationId() ?? null,
      latencyMs: root.latencyMs(),
      timestamp: root.timestamp() ?? null,
      metadataJson: root.metadataJson() ?? null,
    } satisfies HardwareStateEventRealtimeDecoded;
  });
  if (!result) {
    recordDecodeError("hardware-state");
    return null;
  }
  recordDecode("hardware-state", uint8.byteLength, t);
  return result;
}
