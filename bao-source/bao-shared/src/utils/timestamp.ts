/**
 * Shared ISO timestamp helpers.
 *
 * Keeps timestamp generation deterministic across server and client modules.
 *
 * @shared/utils/timestamp
 */

/**
 * Resolve an ISO 8601 timestamp string for the provided Date.
 *
 * @param value - Date instance to serialize.
 * @returns ISO 8601 timestamp.
 */
export function toIsoTimestamp(value: Date): string {
  return value.toISOString();
}

/**
 * Resolve the current UTC time as an ISO 8601 timestamp string.
 *
 * @returns ISO 8601 timestamp for now.
 */
export function resolveCurrentIsoTimestamp(): string {
  return toIsoTimestamp(new Date());
}

/**
 * Resolve the current UTC timestamp in milliseconds since Unix epoch.
 *
 * @returns Current timestamp in milliseconds.
 */
export function resolveCurrentTimestampMs(): number {
  return Date.now();
}
