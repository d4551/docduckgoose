/**
 * Shared byte/string helpers for realtime FlatBuffers path.
 *
 * @internal
 */

/**
 * Normalize optional string values from generated FlatBuffers accessors.
 *
 * @param value - Candidate string value.
 * @returns Trimmed value or null.
 */
export function normalizeOptionalString(value: string | Uint8Array | null): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Convert binary payload input into a Uint8Array view.
 *
 * @param bytes - Input bytes.
 * @returns Uint8Array view.
 */
export function toUint8Array(bytes: ArrayBuffer | Uint8Array): Uint8Array {
  if (bytes instanceof Uint8Array) {
    return bytes;
  }
  return new Uint8Array(bytes);
}
