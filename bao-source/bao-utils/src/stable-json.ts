/**
 * Stable JSON serialization helpers.
 *
 * Provides deterministic JSON stringify and canonicalization implementations
 * for use across the entire codebase (server, scripts, shared). This is the
 * single source of truth for stable JSON serialization — all consumers should
 * import from here rather than maintaining local implementations.
 *
 * Guarantees:
 * - Object keys are sorted lexicographically (locale-independent)
 * - `undefined` values are omitted from objects and arrays
 * - `Date` instances are serialized as ISO-8601 strings
 * - `BigInt` values are serialized as their string representation
 * - Primitives and `null` are serialized via `JSON.stringify`
 * - Arrays preserve element order; elements are canonicalized recursively
 *
 * @baohaus/bao-utils/stable-json
 */

/**
 * Determine whether a value is a plain object (non-null, non-array).
 *
 * @param value - Candidate value.
 * @returns True when the value is a plain object.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Canonicalize an unknown value into a JSON-safe structure with stable key ordering.
 *
 * - Objects: keys are sorted lexicographically; `undefined` values are omitted
 * - Arrays: order is preserved; elements are canonicalized recursively; `undefined` elements are omitted
 * - `Date` instances are converted to ISO-8601 strings
 * - `BigInt` values are converted to their string representation
 * - Primitives and `null` are returned as-is
 *
 * @param value - Arbitrary input value.
 * @returns Canonicalized JSON-compatible value, or `undefined` for unsupported leaf types.
 */
export function canonicalizeJsonValue(value: unknown): unknown {
  if (value === undefined) {
    return;
  }
  if (value === null) {
    return null;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => canonicalizeJsonValue(entry))
      .filter((entry) => entry !== undefined);
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
      .filter(([, entry]) => entry !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    const output: Record<string, unknown> = {};
    for (const [key, entry] of entries) {
      const normalized = canonicalizeJsonValue(entry);
      if (normalized !== undefined) {
        output[key] = normalized;
      }
    }
    return output;
  }

  // Non-JSON types (Map, Set, etc.) are stringified deterministically.
  return String(value);
}

/**
 * Produce a canonical JSON string suitable for hashing, cache keys, and
 * deterministic comparison.
 *
 * Object keys are sorted lexicographically and `undefined` values are stripped.
 * The output is compact (no whitespace) and deterministic.
 *
 * @param value - Arbitrary input value.
 * @returns Canonical JSON string.
 */
export function stableJsonStringify(value: unknown): string {
  const normalized = canonicalizeJsonValue(value);
  return JSON.stringify(normalized);
}
