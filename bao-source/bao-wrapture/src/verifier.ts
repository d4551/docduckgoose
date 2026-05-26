/**
 * FlatBuffer decode-side verification utilities.
 *
 * Guards against malformed or oversized buffers before deserialization.
 * All protocol decode paths should call {@link verifyFlatBuffer} before
 * constructing a `ByteBuffer` to prevent out-of-bounds reads or DoS
 * via inflated payloads.
 *
 * @shared/wrapture
 */

import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "./defaults";

/**
 * Minimum valid FlatBuffer size in bytes.
 *
 * A valid FlatBuffer requires at least a 4-byte root table offset.
 */
const MIN_FLATBUFFER_SIZE = 4;

/**
 * File identifier length in bytes (per FlatBuffers specification).
 */
const FILE_IDENTIFIER_LENGTH = 4;

/**
 * File identifier byte offset within a FlatBuffer.
 *
 * The identifier sits at bytes 4–7 (after the 4-byte root offset).
 */
const FILE_IDENTIFIER_OFFSET = 4;
const SIZE_PREFIX_LENGTH = 4;
const FLATBUFFER_IDENTIFIER_RE = /^[A-Z0-9]{4}$/u;

/**
 * Verification result when the buffer passes all checks.
 */
export interface VerifySuccess {
  readonly ok: true;
}

/**
 * Verification result when the buffer fails a check.
 */
export interface VerifyFailure {
  readonly ok: false;
  /** Machine-readable failure reason. */
  readonly reason:
    | "empty"
    | "too_small"
    | "too_large"
    | "invalid_root_offset"
    | "identifier_mismatch";
  /** Human-readable failure message. */
  readonly message: string;
}

/**
 * Buffer verification result.
 */
export type VerifyResult = VerifySuccess | VerifyFailure;

/**
 * Options for FlatBuffer verification.
 */
export interface VerifyOptions {
  /** Maximum allowed buffer size in bytes. Defaults to {@link WRAPTURE_DEFAULT_MAX_DECODE_BYTES}. */
  maxBytes?: number;
  /** Expected 4-byte file identifier (e.g. `"TEL1"`). Skipped when omitted. */
  expectedIdentifier?: string;
}

/**
 * Options for reading a FlatBuffer file identifier.
 */
export interface ReadFlatBufferIdentifierOptions {
  /** Whether the buffer is size-prefixed. */
  sizePrefixed?: boolean;
}

/**
 * Verify a FlatBuffer byte array before deserialization.
 *
 * Performs structural checks in order:
 * 1. Non-empty buffer
 * 2. Minimum size (4 bytes for root offset)
 * 3. Maximum size (DoS prevention)
 * 4. Root table offset within bounds
 * 5. File identifier match (optional)
 *
 * @param data - Raw buffer to verify.
 * @param options - Verification constraints.
 * @returns Verification result indicating pass or failure with reason.
 */
export function verifyFlatBuffer(
  data: ArrayBuffer | Uint8Array | null | undefined,
  options: VerifyOptions = {},
): VerifyResult {
  if (!data) {
    return { ok: false, reason: "empty", message: "Buffer is null or undefined" };
  }

  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  const { maxBytes = WRAPTURE_DEFAULT_MAX_DECODE_BYTES, expectedIdentifier } = options;

  if (bytes.byteLength === 0) {
    return { ok: false, reason: "empty", message: "Buffer is empty (0 bytes)" };
  }

  if (bytes.byteLength < MIN_FLATBUFFER_SIZE) {
    return {
      ok: false,
      reason: "too_small",
      message: `Buffer too small: ${bytes.byteLength} bytes (minimum ${MIN_FLATBUFFER_SIZE})`,
    };
  }

  if (bytes.byteLength > maxBytes) {
    return {
      ok: false,
      reason: "too_large",
      message: `Buffer exceeds limit: ${bytes.byteLength} bytes (maximum ${maxBytes})`,
    };
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const rootOffset = view.getInt32(0, true);

  if (rootOffset < 0 || rootOffset >= bytes.byteLength) {
    return {
      ok: false,
      reason: "invalid_root_offset",
      message: `Invalid root offset: ${rootOffset} (buffer length ${bytes.byteLength})`,
    };
  }

  if (expectedIdentifier) {
    if (bytes.byteLength < FILE_IDENTIFIER_OFFSET + FILE_IDENTIFIER_LENGTH) {
      return {
        ok: false,
        reason: "identifier_mismatch",
        message: `Buffer too small for file identifier check (${bytes.byteLength} bytes)`,
      };
    }

    const identBytes = bytes.slice(
      FILE_IDENTIFIER_OFFSET,
      FILE_IDENTIFIER_OFFSET + FILE_IDENTIFIER_LENGTH,
    );
    const ident = String.fromCharCode(...identBytes);
    if (ident !== expectedIdentifier) {
      return {
        ok: false,
        reason: "identifier_mismatch",
        message: `File identifier mismatch: expected "${expectedIdentifier}", got "${ident}"`,
      };
    }
  }

  return { ok: true };
}

/**
 * Read a FlatBuffer file identifier when present.
 *
 * Returns `null` when the buffer is invalid, too small, or the identifier slot
 * does not contain a canonical 4-byte ASCII token.
 *
 * @param data - Raw buffer to inspect.
 * @param options - Identifier read options.
 * @returns File identifier or null when unavailable.
 */
export function readFlatBufferIdentifier(
  data: ArrayBuffer | Uint8Array | null | undefined,
  options: ReadFlatBufferIdentifierOptions = {},
): string | null {
  if (!data) {
    return null;
  }

  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  const normalizedBytes = options.sizePrefixed ? bytes.subarray(SIZE_PREFIX_LENGTH) : bytes;
  const verification = verifyFlatBuffer(normalizedBytes);
  if (!verification.ok) {
    return null;
  }

  const identifierOffset = FILE_IDENTIFIER_OFFSET + (options.sizePrefixed ? SIZE_PREFIX_LENGTH : 0);
  if (bytes.byteLength < identifierOffset + FILE_IDENTIFIER_LENGTH) {
    return null;
  }

  const identifier = String.fromCharCode(
    ...bytes.slice(identifierOffset, identifierOffset + FILE_IDENTIFIER_LENGTH),
  );
  return FLATBUFFER_IDENTIFIER_RE.test(identifier) ? identifier : null;
}

/**
 * Assert a FlatBuffer passes verification, throwing on failure.
 *
 * Convenience wrapper for decode paths that want exception-based flow control.
 *
 * @param data - Raw buffer to verify.
 * @param options - Verification constraints.
 * @throws Error with verification failure message.
 */
export function assertFlatBuffer(
  data: ArrayBuffer | Uint8Array | null | undefined,
  options: VerifyOptions = {},
): void {
  const result = verifyFlatBuffer(data, options);
  if (!result.ok) {
    throw new Error(`FlatBuffer verification failed: ${result.message}`);
  }
}
