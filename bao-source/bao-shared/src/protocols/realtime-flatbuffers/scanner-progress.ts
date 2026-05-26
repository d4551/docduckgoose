/**
 * Scanner progress payload encode/decode and ws envelope helpers.
 *
 * @shared/protocols/realtime-flatbuffers/scanner-progress
 */

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
import { RealtimePayloadKindV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { ScannerProgressV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/scanner-progress-v1.js";
import { decodeRealtimeWsEnvelopeBinary, encodeRealtimeWsEnvelopeBinary } from "./envelope";
import { toUint8Array } from "./internals";
import type { ScannerProgressBinaryPayload } from "./types";

/**
 * Encode a scanner progress payload table.
 *
 * @param payload - Scanner payload fields.
 * @returns Encoded bytes.
 */
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

/**
 * Decode a scanner progress payload table.
 *
 * Applies max size guard to prevent DoS from untrusted input.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size (default from config).
 * @returns Decoded payload or null when invalid.
 */
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

/**
 * Encode a scanner progress websocket envelope for internal binary transport.
 *
 * @param payload - Scanner progress payload.
 * @returns Encoded envelope bytes.
 */
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

/**
 * Decode a scanner progress websocket envelope from internal binary transport.
 *
 * @param bytes - Envelope bytes.
 * @returns Decoded scanner payload or null when invalid.
 */
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
