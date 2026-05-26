/**
 * Hardware state event encode/decode for realtime protocol.
 *
 * @shared/protocols/realtime-flatbuffers/hardware-state
 */

import { HardwareEventKindV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/hardware-event-kind-v1.js";
import { HardwareStateEventV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/hardware-state-event-v1.js";

export { HardwareEventKindV1 };

import { withPooledBuilder, withPooledByteBuffer } from "@baohaus/bao-wrapture/builder-pool";
import {
  WRAPTURE_BUILDER_CAPACITIES,
  WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
} from "@baohaus/bao-wrapture/defaults";
import {
  recordDecode,
  recordDecodeError,
  recordEncode,
  startTiming,
} from "@baohaus/bao-wrapture/metrics";
import { BATTERY_FULL_PERCENT, toUint8Array } from "./internals";

/** Input for encoding a hardware state event via realtime protocol. */
export interface HardwareStateEventRealtimeInput {
  /** Device identifier. */
  deviceId: string;
  /** Event kind (HardwareEventKindV1 enum value). */
  eventKind: number;
  /** Current device status. */
  status?: string;
  /** Sensor metric name. */
  metric?: string;
  /** Numeric value. */
  valueFloat?: number;
  /** String value. */
  valueString?: string;
  /** Measurement unit. */
  unit?: string;
  /** Data quality 0-100. */
  quality?: number;
  /** Command name. */
  command?: string;
  /** Whether command was acknowledged. */
  acknowledged?: boolean;
  /** Health score 0.0-1.0. */
  healthScore?: number;
  /** Reason for state transition. */
  reason?: string;
  /** Correlation ID. */
  correlationId?: string;
  /** Latency in milliseconds. */
  latencyMs?: number;
  /** ISO 8601 timestamp. */
  timestamp: string;
  /** Arbitrary metadata as JSON string. */
  metadataJson?: string;
}

/** Decoded hardware state event from realtime protocol. */
export interface HardwareStateEventRealtimeDecoded {
  /** Device identifier. */
  deviceId: string | null;
  /** Event kind enum value. */
  eventKind: number;
  /** Current device status. */
  status: string | null;
  /** Sensor metric name. */
  metric: string | null;
  /** Numeric value. */
  valueFloat: number;
  /** String value. */
  valueString: string | null;
  /** Measurement unit. */
  unit: string | null;
  /** Data quality 0-100. */
  quality: number;
  /** Command name. */
  command: string | null;
  /** Whether command was acknowledged. */
  acknowledged: boolean;
  /** Health score 0.0-1.0. */
  healthScore: number;
  /** Reason for state transition. */
  reason: string | null;
  /** Correlation ID. */
  correlationId: string | null;
  /** Latency in milliseconds. */
  latencyMs: number;
  /** ISO 8601 timestamp. */
  timestamp: string | null;
  /** Arbitrary metadata as JSON string. */
  metadataJson: string | null;
}

/** Pre-serialized string offsets for hardware state event encoding. */
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

/** Create FlatBuffer string offsets for hardware state event fields. */
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

/** Write optional fields to the hardware state event FlatBuffer table. */
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

/**
 * Encode a hardware state event to FlatBuffers bytes (realtime protocol).
 *
 * @param input - Hardware state event fields.
 * @returns Encoded bytes.
 */
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

/**
 * Decode a hardware state event from FlatBuffers bytes (realtime protocol).
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded event or null when invalid.
 */
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
