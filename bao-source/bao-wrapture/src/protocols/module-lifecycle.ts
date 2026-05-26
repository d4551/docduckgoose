/**
 * Wrapture module lifecycle event protocol.
 *
 * Encode/decode ModuleLifecycleEventV1 for Redis stream transport.
 * Tracks module registration, startup, shutdown, and health transitions
 * across the distributed control plane.
 *
 * @shared/wrapture
 */

import {
  ModuleLifecycleEventV1,
  ModuleLifecycleEventV1T,
} from "@baohaus/bao-core/generated/flatbuffers/baohaus/cache/v1/module-lifecycle-event-v1";
import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const BUILDER_CAPACITY = 256;

/** Input for encoding a module lifecycle event. */
export interface ModuleLifecycleEventEncodeInput {
  /** Correlation ID for the lifecycle operation. */
  runId: string;
  /** Module identifier from DomainModuleDescriptor. */
  moduleId: string;
  /** Lifecycle phase: "registered", "startup", "shutdown", "health-check". */
  lifecycle: string;
  /** Current state: "pending", "in-progress", "success", "failed", "degraded". */
  state: string;
  /** Health state from HealthState: "healthy", "degraded", "unhealthy", "unknown", "unavailable". */
  healthState: string;
  /** Operation duration in milliseconds. */
  durationMs: number;
  /** Human-readable status message. */
  message: string;
}

/** Decoded module lifecycle event. */
export interface ModuleLifecycleEventDecoded {
  /** Correlation ID. */
  runId: string | null;
  /** Module identifier. */
  moduleId: string | null;
  /** Lifecycle phase. */
  lifecycle: string | null;
  /** Current state. */
  state: string | null;
  /** Health state. */
  healthState: string | null;
  /** Operation duration in milliseconds. */
  durationMs: number;
  /** Human-readable status message. */
  message: string | null;
}

/**
 * Encode a module lifecycle event to FlatBuffers bytes.
 *
 * Uses pooled builder and `.slice()` for zero-copy output.
 *
 * @param input - Event fields.
 * @returns Encoded bytes.
 */
export function encodeModuleLifecycleEvent(input: ModuleLifecycleEventEncodeInput): Uint8Array {
  const t = startTiming();
  const result = withPooledBuilder(BUILDER_CAPACITY, (builder) => {
    const payload = new ModuleLifecycleEventV1T(
      input.runId,
      input.moduleId,
      input.lifecycle,
      input.state,
      input.healthState,
      Math.max(0, Math.trunc(input.durationMs)),
      input.message,
    );
    const root = payload.pack(builder);
    builder.finish(root);
    return builder.asUint8Array().slice();
  });
  recordEncode("module-lifecycle", result.byteLength, t);
  return result;
}

/**
 * Decode a module lifecycle event from FlatBuffers bytes.
 *
 * Applies max size guard to prevent DoS from untrusted input.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded event or null when invalid.
 */
export function decodeModuleLifecycleEvent(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): ModuleLifecycleEventDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("module-lifecycle");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    const root = ModuleLifecycleEventV1.getRootAsModuleLifecycleEventV1(bb);
    return {
      runId: root.runId() ?? null,
      moduleId: root.moduleId() ?? null,
      lifecycle: root.lifecycle() ?? null,
      state: root.state() ?? null,
      healthState: root.healthState() ?? null,
      durationMs: root.durationMs(),
      message: root.message() ?? null,
    } satisfies ModuleLifecycleEventDecoded;
  });

  if (!result) {
    recordDecodeError("module-lifecycle");
    return null;
  }
  recordDecode("module-lifecycle", uint8.byteLength, t);
  return result;
}

/** FlatBuffers table class for module lifecycle events (binary-level accessors). */
/** FlatBuffers object-API class for module lifecycle events (pack/unpack convenience). */
export { ModuleLifecycleEventV1, ModuleLifecycleEventV1T };
