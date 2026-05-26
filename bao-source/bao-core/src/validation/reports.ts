/**
 * Report Validation Utilities
 *
 * Provides safe JSON parsing utilities for report data handling. This module
 * provides safe parsing of JSON-encoded report payloads.
 *
 * @shared/validation/reports
 *
 * @remarks
 * Schema validation should be performed server-side at the API boundary using
 * Elysia route schemas. These utilities provide safe parsing without runtime
 * validation for client-side report handling.
 *
 * @example
 * ```typescript
 * const reportData = safeParseJson<Report>(
 *   jsonString,
 *   { id: '', status: 'pending' }
 * );
 * ```
 */

/**
 * Safely parse JSON string with fallback value
 *
 * T - The expected type of the parsed data
 * @param raw - JSON string to parse
 * @param fallback - Value to return if parsing fails
 * @returns Parsed data or fallback value
 *
 * @description
 * Attempts to parse a JSON string and returns the result. If parsing fails
 * (invalid JSON, syntax error, etc.), returns the provided fallback value
 * instead of throwing an error.
 *
 * @example
 * ```typescript
 * // Successful parse
 * const data = safeParseJson<{ name: string }>(
 *   '{"name":"Report 1"}',
 *   { name: 'Default' }
 * );
 * // data === { name: 'Report 1' }
 *
 * // Failed parse (returns fallback)
 * const invalid = safeParseJson<{ name: string }>(
 *   '{invalid json}',
 *   { name: 'Default' }
 * );
 * // invalid === { name: 'Default' }
 * ```
 */
export async function safeParseJson<T>(raw: string, fallback: T): Promise<T> {
  const parsed = await Promise.resolve()
    .then((): unknown => JSON.parse(raw))
    .then(
      (value) => ({ ok: true as const, value }),
      () => ({ ok: false as const }),
    );

  if (!parsed.ok) {
    return fallback;
  }
  return parsed.value === undefined ? fallback : (parsed.value as T);
}
