/**
 * Strict boolean parsing for config and env boundaries.
 *
 * Only accepts "true" and "false" (case-insensitive). No lenient coercion
 * (e.g. "1", "yes", "on") per AGENTS.md forward-only rules.
 *
 * @packageDocumentation
 */

import { parseStrictBoolean as parseStrictBooleanImpl } from "../config/env-boolean";

/**
 * Parse a config value to boolean with strict coercion.
 *
 * Only accepts "true" and "false" (case-insensitive). Rejects lenient
 * aliases (1, yes, on, etc.) per AGENTS.md strict coercion rules.
 *
 * @param value - Raw value (boolean, string, or undefined).
 * @param fallback - Default when unset or not "true"/"false".
 * @returns Parsed boolean.
 */
export function parseStrictBoolean(
  value: boolean | string | undefined | null,
  fallback: boolean,
): boolean {
  return parseStrictBooleanImpl(value, fallback);
}
