/**
 * Shared string normalization helpers.
 *
 * @baohaus/bao-utils/string
 */

/**
 * Convert Redis response values into a string.
 *
 * Bun Redis commands may return `string`, `Uint8Array`, or other primitive
 * values depending on command and client mode.
 *
 * @param value - Redis response value.
 * @returns Normalized string representation.
 */
export function toRedisString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value instanceof Uint8Array) {
    return new TextDecoder().decode(value);
  }
  return String(value);
}
