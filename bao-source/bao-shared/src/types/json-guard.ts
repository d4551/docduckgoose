/**
 * Canonical recursive JSON-value shape used by runtime type guards.
 *
 * Replaces the legacy `Record<string, unknown>` predicate target across
 * bao-shared. Every guard that confirms "value is a non-array object" now
 * targets {@link JsonGuardRecord} so consumers indexing into the value see
 * typed `JsonGuardValue` properties without widening to `unknown`. This is
 * the only place in the workspace that names a generic JSON shape; downstream
 * files import these types rather than redeclaring per-file equivalents.
 *
 * @packageDocumentation
 */

/** JSON primitive — string / number / boolean / null. */
export type JsonGuardPrimitive = string | number | boolean | null;

/** Recursive JSON value union: primitives, records, arrays. */
export type JsonGuardValue = JsonGuardPrimitive | JsonGuardRecord | readonly JsonGuardValue[];

/** Plain string-keyed object whose values are themselves JSON values. */
export type JsonGuardRecord = { readonly [key: string]: JsonGuardValue };

/**
 * Predicate that narrows `unknown` to {@link JsonGuardRecord} — the "value
 * is a non-array object" check. Use this in type-guard chains so subsequent
 * property reads see structured {@link JsonGuardValue} rather than `unknown`.
 *
 * @param value - Candidate value (usually parsed JSON or untyped input).
 * @returns True when `value` is a non-null, non-array object.
 */
export function isJsonGuardRecord(value: unknown): value is JsonGuardRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Predicate that narrows `unknown` to {@link JsonGuardValue} — accepts any
 * JSON-shaped tree (primitives, arrays, records). Recursively validates the
 * structure so consumers can pass parsed JSON straight into a typed
 * walker without intermediate widening casts.
 *
 * @param value - Candidate value (usually `JSON.parse` output or external
 *   payload).
 * @returns True when `value` is a JSON tree.
 */
export function isJsonGuardValue(value: unknown): value is JsonGuardValue {
  if (value === null) {
    return true;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((entry) => isJsonGuardValue(entry));
  }
  if (typeof value === "object") {
    return Object.values(value).every((entry) => isJsonGuardValue(entry));
  }
  return false;
}
