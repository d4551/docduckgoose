/**
 * Wrapture transport utilities for Redis and string-based backends.
 *
 * FlatBuffers produce binary; Redis SET/GET typically use strings. Base64 encoding
 * ensures wire compatibility across all Redis clients.
 *
 * Performance: uses Bun-native Buffer for base64, singleton TextEncoder/TextDecoder,
 * and fast-path size estimation without regex normalization.
 *
 * @shared/wrapture
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";

/** ASCII code for `=` (base64 padding). */
const ASCII_EQUALS = 61;
/** Base64 decoding ratio components. */
const BASE64_DECODE_NUM = 3;
/** Number of padding bytes when double-padded. */
const BASE64_DOUBLE_PAD = 2;

/** Singleton TextEncoder — avoids per-call allocation. */
export const sharedTextEncoder: TextEncoder = new TextEncoder();

/** Singleton TextDecoder — avoids per-call allocation. */
export const sharedTextDecoder: TextDecoder = new TextDecoder();

/** Whether Bun's native Buffer is available (true in Bun runtime). */
const HAS_BUFFER: boolean = typeof Buffer !== "undefined";

/**
 * Encode Uint8Array to base64 string for Redis storage.
 *
 * Uses Bun's native Buffer.toString('base64') for optimal performance.
 *
 * @param bytes - Raw FlatBuffers bytes.
 * @returns Base64 string or null on failure.
 */
export function encodeBase64(bytes: Uint8Array): string | null {
  const r = toResultSync(() => {
    if (HAS_BUFFER) {
      return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("base64");
    }
    let binary = "";
    for (const byte of bytes) {
      if (byte === undefined) {
        continue;
      }
      binary += String.fromCharCode(byte);
    }
    return btoa(binary);
  });
  return r.ok ? r.value : null;
}

/**
 * Decode base64 string to Uint8Array for FlatBuffers parsing.
 *
 * Fast path: skips regex normalization for clean base64 strings (common case
 * from Redis GET). Size estimation uses fast character inspection.
 *
 * @param base64 - Base64-encoded string from Redis.
 * @param maxBytes - Maximum decoded bytes allowed before decoding.
 * @returns Uint8Array or null on failure.
 */
export function decodeBase64(base64: string, maxBytes?: number): Uint8Array | null {
  if (!base64 || typeof base64 !== "string") {
    return null;
  }
  const len = base64.length;
  if (len === 0) {
    return null;
  }

  if (typeof maxBytes === "number" && maxBytes > 0) {
    const lastTwo = len >= 2 ? base64.charCodeAt(len - 2) : 0;
    const lastOne = base64.charCodeAt(len - 1);
    const padding =
      lastOne === ASCII_EQUALS ? (lastTwo === ASCII_EQUALS ? BASE64_DOUBLE_PAD : 1) : 0;
    const estimatedBytes = ((len * BASE64_DECODE_NUM) >> BASE64_DOUBLE_PAD) - padding;
    if (estimatedBytes > maxBytes) {
      return null;
    }
  }

  const r = toResultSync(() => {
    if (HAS_BUFFER) {
      const buf = Buffer.from(base64, "base64");
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    const binary = atob(base64);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      out[i] = binary.charCodeAt(i);
    }
    return out;
  });
  return r.ok ? r.value : null;
}
