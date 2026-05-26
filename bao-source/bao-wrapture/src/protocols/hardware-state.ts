/**
 * Wrapture hardware state event protocol.
 *
 * Encode/decode HardwareStateEventV1 for Redis stream transport.
 * Tracks device state changes, sensor readings, commands, calibration,
 * and health transitions across the distributed hardware fleet.
 *
 * @shared/wrapture
 */

import { HardwareEventKindV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/realtime/v1/hardware-event-kind-v1";
import {
  HardwareStateEventV1,
  HardwareStateEventV1T,
} from "@baohaus/bao-core/generated/flatbuffers/baohaus/realtime/v1/hardware-state-event-v1";
import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const BUILDER_CAPACITY = 512;
const MAX_QUALITY_PERCENT = 100;

/** Protocol version for hardware state events. */
export const HARDWARE_STATE_PROTOCOL_VERSION = "1.0.0";

/** Redis stream key for hardware state events. */
export const HARDWARE_STATE_REDIS_STREAM = "platform:hardware:state:events";

/** Input for encoding a hardware state event. */
export interface HardwareStateEventEncodeInput {
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
  /** Correlation ID for request tracing. */
  correlationId?: string;
  /** Operation latency in milliseconds. */
  latencyMs?: number;
  /** ISO 8601 event timestamp. */
  timestamp: string;
  /** Arbitrary metadata as JSON string. */
  metadataJson?: string;
}

/** Decoded hardware state event. */
export interface HardwareStateEventDecoded {
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
  /** Operation latency in milliseconds. */
  latencyMs: number;
  /** ISO 8601 event timestamp. */
  timestamp: string | null;
  /** Arbitrary metadata as JSON string. */
  metadataJson: string | null;
}

/** Pre-serialized string offsets for a hardware state event. */
interface HwStateStringOffsets {
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

/**
 * Create FlatBuffer string offsets for all string fields.
 *
 * @param builder - FlatBuffer builder instance.
 * @param input - Event fields.
 * @returns Pre-serialized offsets.
 */
function prepareStringOffsets(
  builder: { createSharedString(s: string): number; createString(s: string): number },
  input: HardwareStateEventEncodeInput,
): HwStateStringOffsets {
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

/**
 * Write optional numeric/boolean fields to the FlatBuffer table.
 *
 * @param builder - FlatBuffer builder (passed as first arg to static methods).
 * @param input - Event fields.
 * @param offsets - Pre-serialized string offsets.
 */
function writeOptionalFields(
  builder: Parameters<typeof HardwareStateEventV1.addValueFloat>[0],
  input: HardwareStateEventEncodeInput,
  offsets: HwStateStringOffsets,
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
      Math.max(0, Math.min(MAX_QUALITY_PERCENT, Math.trunc(input.quality))),
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
 * Encode a hardware state event to FlatBuffers bytes.
 *
 * Uses the manual start/add/end API with `finishHardwareStateEventV1Buffer`
 * to write the file identifier ("HWS1"). Shared strings for recurring
 * deviceId values; regular strings for unique timestamps and metadata.
 *
 * @param input - Event fields.
 * @returns Encoded bytes.
 */
export function encodeHardwareStateEvent(input: HardwareStateEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(BUILDER_CAPACITY, (builder) => {
    const offsets = prepareStringOffsets(builder, input);

    HardwareStateEventV1.startHardwareStateEventV1(builder);
    HardwareStateEventV1.addDeviceId(builder, offsets.deviceId);
    HardwareStateEventV1.addEventKind(builder, input.eventKind);
    writeOptionalFields(builder, input, offsets);
    HardwareStateEventV1.addTimestamp(builder, offsets.timestamp);

    const root = HardwareStateEventV1.endHardwareStateEventV1(builder);
    HardwareStateEventV1.finishHardwareStateEventV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("hardware-state", result.byteLength, t);
  return result;
}

/**
 * Decode a hardware state event from FlatBuffers bytes.
 *
 * Applies max size guard to prevent DoS from untrusted input.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded event or null when invalid.
 */
export function decodeHardwareStateEvent(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): HardwareStateEventDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
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
    } satisfies HardwareStateEventDecoded;
  });

  if (!result) {
    recordDecodeError("hardware-state");
    return null;
  }
  recordDecode("hardware-state", uint8.byteLength, t);
  return result;
}

/** FlatBuffers enum for hardware event kinds (state-change, sensor-reading, command, calibration, health). */
/** FlatBuffers table class for hardware state events (binary-level accessors). */
/** FlatBuffers object-API class for hardware state events (pack/unpack convenience). */
export { HardwareEventKindV1, HardwareStateEventV1, HardwareStateEventV1T };
