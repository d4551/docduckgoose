/**
 * Canonical boolean parsing for config boundaries.
 *
 * Only `parseStrictBoolean` is exported. Per AGENTS.md forward-only rules:
 * no lenient coercion (e.g. "1", "yes", "on"); only "true"/"false" accepted.
 *
 * @packageDocumentation
 */
/**
 * Parse a config value to boolean with strict coercion.
 *
 * Only accepts "true" and "false" (case-insensitive). Per AGENTS.md forward-only
 * rules: no lenient coercion (e.g. "1", "yes", "on"). Use for config boundaries.
 *
 * @param value - Raw value (boolean, string, undefined, null, or unknown).
 * @param fallback - Default when unset or not "true"/"false".
 * @returns Parsed boolean.
 */
export function parseStrictBoolean(value, fallback) {
  if (typeof value === "boolean") {
    return value;
  }
  if (value == null || typeof value !== "string") {
    return fallback;
  }
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "true") {
    return true;
  }
  if (trimmed === "false") {
    return false;
  }
  return fallback;
}
