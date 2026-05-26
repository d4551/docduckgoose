import { SIZE_PREFIX_LENGTH } from "@baohaus/flatbuf-bao/constants";
/**
 * Wrapture cache protocol.
 *
 * Encode/decode cache envelope for Redis FlatBuffers payloads.
 * All Redis cache values use base64-encoded CacheEnvelope transport.
 *
 * Performance: uses pooled builders and zero-copy slice output.
 *
 * @shared/wrapture
 */

import { CacheEnvelopeV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/cache/v1/cache-envelope-v1";
import { CacheValueFormatV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/cache/v1/cache-value-format-v1";

import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const FB_HEADER_OVERHEAD = 256;
const FB_MIN_HEADER_SIZE = 8;

/** Input for encoding a cache envelope. */
export interface CacheEnvelopeEncodeInput {
  /** Unix timestamp in milliseconds when cached. */
  cachedAtMs: number | bigint;
  /** Optional cache key fingerprint. */
  fingerprint?: string | null | undefined;
  /** Format of value payload (JSON or FlatBuffer). */
  valueFormat?: CacheValueFormatV1;
  /** Raw value bytes (JSON UTF-8 or FlatBuffer binary). */
  valueBytes: Uint8Array | number[];
}

/** Decoded cache envelope. */
export interface CacheEnvelopeDecoded {
  /** Unix timestamp in milliseconds when cached. */
  cachedAtMs: bigint;
  /** Cache key fingerprint when present. */
  fingerprint: string | null;
  /** Format of value payload. */
  valueFormat: CacheValueFormatV1;
  /** Raw value bytes. */
  valueBytes: Uint8Array;
}

/**
 * Encode a cache envelope to FlatBuffers bytes.
 *
 * Uses pooled builder and `.slice()` for zero-copy output extraction.
 *
 * @param input - Envelope fields.
 * @returns Encoded bytes.
 */
export function encodeCacheEnvelope(input: CacheEnvelopeEncodeInput): Uint8Array {
  const t = startTiming();
  const valueBytesArr =
    input.valueBytes instanceof Uint8Array ? input.valueBytes : input.valueBytes;
  const capacity = FB_HEADER_OVERHEAD + (valueBytesArr.length ?? 0);

  const result = withPooledBuilder(capacity, (builder) => {
    const fingerprintOffset = builder.createString(input.fingerprint ?? "");
    const valueBytes =
      input.valueBytes instanceof Uint8Array ? Array.from(input.valueBytes) : input.valueBytes;
    const valueBytesOffset = CacheEnvelopeV1.createValueBytesVector(builder, valueBytes);

    const root = CacheEnvelopeV1.createCacheEnvelopeV1(
      builder,
      BigInt(input.cachedAtMs),
      fingerprintOffset,
      input.valueFormat ?? CacheValueFormatV1.JSON,
      valueBytesOffset,
      1,
      0,
    );

    CacheEnvelopeV1.finishCacheEnvelopeV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });

  recordEncode("cache", result.byteLength, t);
  return result;
}

/**
 * Decode a cache envelope from FlatBuffers bytes.
 *
 * Applies max size guard to prevent DoS from untrusted input.
 * Returns zero-copy Uint8Array view of valueBytes backed by the input buffer.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size (default from config).
 * @returns Decoded envelope or null when invalid.
 */
export function decodeCacheEnvelope(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): CacheEnvelopeDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("cache");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!CacheEnvelopeV1.bufferHasIdentifier(bb)) {
      return null;
    }

    const root = CacheEnvelopeV1.getRootAsCacheEnvelopeV1(bb);
    const valueArr = root.valueBytesArray();
    return {
      cachedAtMs: root.cachedAtMs(),
      fingerprint: root.fingerprint() ?? null,
      valueFormat: root.valueFormat(),
      valueBytes: valueArr ? new Uint8Array(valueArr) : new Uint8Array(0),
    } satisfies CacheEnvelopeDecoded;
  });

  if (!result) {
    recordDecodeError("cache");
    return null;
  }
  recordDecode("cache", uint8.byteLength, t);
  return result;
}

/**
 * Decode a cache envelope from size-prefixed FlatBuffers bytes.
 *
 * For length-delimited streaming. Applies max size guard.
 *
 * @param bytes - Size-prefixed encoded bytes (4-byte LE size + flatbuffer).
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded envelope or null when invalid.
 */
export function decodeCacheEnvelopeSizePrefixed(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): CacheEnvelopeDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes || uint8.byteLength < SIZE_PREFIX_LENGTH + FB_MIN_HEADER_SIZE) {
    recordDecodeError("cache");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    const root = CacheEnvelopeV1.getSizePrefixedRootAsCacheEnvelopeV1(bb);
    const valueArr = root.valueBytesArray();
    return {
      cachedAtMs: root.cachedAtMs(),
      fingerprint: root.fingerprint() ?? null,
      valueFormat: root.valueFormat(),
      valueBytes: valueArr ? new Uint8Array(valueArr) : new Uint8Array(0),
    } satisfies CacheEnvelopeDecoded;
  });

  if (!result) {
    recordDecodeError("cache");
    return null;
  }
  recordDecode("cache", uint8.byteLength, t);
  return result;
}
