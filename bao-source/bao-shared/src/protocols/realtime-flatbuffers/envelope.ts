import { SIZE_PREFIX_LENGTH } from "@baohaus/flatbuf-bao/constants";

/**
 * Realtime websocket envelope encode/decode.
 *
 * @shared/protocols/realtime-flatbuffers/envelope
 */

import { withPooledBuilder, withPooledByteBuffer } from "@baohaus/bao-wrapture/builder-pool";
import {
  WRAPTURE_BUILDER_CAPACITIES,
  WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
} from "@baohaus/bao-wrapture/defaults";
import {
  recordDecodeError,
  recordEncode,
  sampledRecordDecode,
  startSampledTiming,
  startTiming,
} from "@baohaus/bao-wrapture/metrics";
import type { RealtimePayloadKindV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/realtime-payload-kind-v1.js";
import { WsEnvelopeV1 } from "../../generated/flatbuffers/baohaus/realtime/v1/ws-envelope-v1.js";
import { REALTIME_FLATBUFFERS_PROTOCOL_VERSION } from "./constants";
import {
  FB_BUILDER_SMALL,
  FB_MIN_HEADER_SIZE,
  normalizeOptionalString,
  toUint8Array,
} from "./internals";
import type { DecodedRealtimeWsEnvelopeBinary } from "./types";

/**
 * Encode a wrapped realtime websocket envelope.
 *
 * @param params - Envelope fields.
 * @returns Encoded bytes.
 */
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

/**
 * Decode a wrapped realtime websocket envelope.
 *
 * Uses scoped ByteBuffer decode lifecycle. Payload is returned
 * as a zero-copy view into the input buffer.
 *
 * @param bytes - Envelope bytes.
 * @param maxBytes - Maximum allowed buffer size (default from config).
 * @returns Decoded envelope or null when invalid.
 */
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

/**
 * Decode a realtime websocket envelope from size-prefixed FlatBuffers bytes.
 *
 * For length-delimited streaming (TCP, gRPC-like). Applies max size guard.
 *
 * @param bytes - Size-prefixed encoded bytes (4-byte LE size + flatbuffer).
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded envelope or null when invalid.
 */
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
