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

import { toResultSync } from "@baohaus/bao-utils/async-result";

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
export function safeParseJson<T>(raw: string, fallback: T): T {
  // JSON.parse returns `any`; wrap in a typed function to route through unknown.
  // No schema validation -- callers rely on the fallback shape to anchor T.
  const parseJson = (): unknown => JSON.parse(raw);
  const parsed = toResultSync(parseJson);
  if (!parsed.ok) {
    return fallback;
  }
  return (parsed.value ?? fallback) as T;
}
