/**
 * Wrapture bao-install event protocol.
 *
 * Encode/decode BaoInstallEventV1 for Redis stream transport.
 * Tracks install run phase transitions across the `.bao` install lifecycle.
 *
 * Uses native FlatBuffers BaoInstallEventV1 via generated bindings from
 * `cache_envelope_v1.fbs`. Pooled builder for encode; scoped ByteBuffer for decode.
 *
 * @shared/wrapture
 */

import { BaoInstallEventV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/cache/v1/bao-install-event-v1";
import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const BUILDER_CAPACITY = 512;

/** Redis stream key for bao-install lifecycle events. */
export const BAO_INSTALL_EVENT_STREAM = "platform:bao:install:events";

/** Input for encoding a bao-install event. */
export interface BaoInstallEventEncodeInput {
  /** Install run identifier. */
  runId: string;
  /** Install phase: "queued", "validating", "applying", "active", "failed", "uninstalling", "uninstalled". */
  phase: string;
  /** Manifest name from metadata. */
  manifestName: string;
  /** Manifest version from metadata. */
  manifestVersion: string;
  /** Number of install targets in the manifest. */
  targetCount: number;
  /** Phase transition duration in milliseconds. */
  durationMs: number;
  /** Human-readable status message. */
  message: string;
  /** Adapter kind for the current step (optional; populated during per-target phases). */
  adapterKind?: string;
}

/** Decoded bao-install event. */
export interface BaoInstallEventDecoded {
  /** Install run identifier. */
  runId: string | null;
  /** Install phase. */
  phase: string | null;
  /** Manifest name. */
  manifestName: string | null;
  /** Manifest version. */
  manifestVersion: string | null;
  /** Target count. */
  targetCount: number;
  /** Phase transition duration in milliseconds. */
  durationMs: number;
  /** Human-readable status message. */
  message: string | null;
  /** Adapter kind for the current step (null when not applicable). */
  adapterKind: string | null;
}

/**
 * Encode a bao-install event to FlatBuffers bytes.
 *
 * Uses pooled builder with shared-string dedup for recurring run IDs.
 * The `adapterKind` field is appended to the message when present, since
 * the FlatBuffers schema has 7 fields and adapterKind is application-level.
 *
 * @param input - Event fields.
 * @returns Encoded bytes.
 */
export function encodeBaoInstallEvent(input: BaoInstallEventEncodeInput): Uint8Array {
  const t = startTiming();
  const messageText = input.adapterKind ? `[${input.adapterKind}] ${input.message}` : input.message;

  const result = withPooledBuilder(BUILDER_CAPACITY, (builder) => {
    const runIdOffset = builder.createSharedString(input.runId);
    const phaseOffset = builder.createSharedString(input.phase);
    const manifestNameOffset = builder.createString(input.manifestName);
    const manifestVersionOffset = builder.createString(input.manifestVersion);
    const messageOffset = builder.createString(messageText);

    const root = BaoInstallEventV1.createBaoInstallEventV1(
      builder,
      runIdOffset,
      phaseOffset,
      manifestNameOffset,
      manifestVersionOffset,
      Math.max(0, Math.trunc(input.targetCount)),
      Math.max(0, Math.trunc(input.durationMs)),
      messageOffset,
    );

    builder.finish(root);
    return builder.asUint8Array().slice();
  });

  recordEncode("bao-install", result.byteLength, t);
  return result;
}

/**
 * Decode a bao-install event from FlatBuffers bytes.
 *
 * Applies max size guard to prevent DoS from untrusted input.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded event or null when invalid.
 */
export function decodeBaoInstallEvent(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): BaoInstallEventDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("bao-install");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    const root = BaoInstallEventV1.getRootAsBaoInstallEventV1(bb);
    const runId = root.runId();
    if (runId === null) {
      return null;
    }

    return {
      runId,
      phase: root.phase() ?? null,
      manifestName: root.manifestName() ?? null,
      manifestVersion: root.manifestVersion() ?? null,
      targetCount: root.targetCount(),
      durationMs: root.durationMs(),
      message: root.message() ?? null,
      adapterKind: null,
    } satisfies BaoInstallEventDecoded;
  });

  if (!result) {
    recordDecodeError("bao-install");
    return null;
  }
  recordDecode("bao-install", uint8.byteLength, t);
  return result;
}
