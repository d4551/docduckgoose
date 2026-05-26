/**
 * Numeric normalization helpers.
 *
 * Centralizes safe numeric coercion for API hydration and UI aggregation.
 *
 * @baohaus/bao-utils/number
 */

/**
 * Normalize an unknown numeric input into a finite number.
 *
 * Accepts numeric values directly and coerces non-empty strings via `Number()`.
 * Returns the fallback for all other inputs (null, undefined, NaN, Infinity, empty strings, etc.).
 *
 * @param value - Candidate numeric value.
 * @param fallback - Fallback value when input is not a finite number.
 * @returns Normalized number.
 */
export function normalizeNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      const parsed = Number(trimmed);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return fallback;
}

/**
 * Normalize an unknown numeric input into a finite number or null.
 *
 * Accepts numeric values directly and coerces non-empty strings via `Number()`.
 * Returns null for all other inputs (null, undefined, NaN, Infinity, empty strings, etc.).
 *
 * @param value - Candidate numeric value.
 * @returns Parsed number or null when invalid.
 */
export function normalizeNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      const parsed = Number(trimmed);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return null;
}

/**
 * Normalize a record of unknown values into a numeric record.
 *
 * @param value - Candidate record.
 * @param fallback - Fallback value when an entry is not numeric.
 * @returns Record with numeric values.
 */
export function normalizeNumberRecord(
  value: Record<string, unknown> | null | undefined,
  fallback = 0,
): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const normalized: Record<string, number> = {};
  for (const [key, raw] of Object.entries(value)) {
    normalized[key] = normalizeNumber(raw, fallback);
  }
  return normalized;
}

/**
 * Integer normalization options.
 */
export interface IntegerNormalizationOptions {
  /**
   * Inclusive lower bound. When provided, parsed integers below this value are rejected.
   */
  minimum?: number;
  /**
   * Inclusive upper bound. When provided, parsed integers above this value are rejected.
   */
  maximum?: number;
}

/**
 * Normalize unknown input into a base-10 integer with optional bounds.
 *
 * @param value - Unknown input value.
 * @param options - Optional lower/upper bounds.
 * @returns Normalized integer or `null` when invalid/out-of-range.
 */
export function normalizeInteger(
  value: unknown,
  options: IntegerNormalizationOptions = {},
): number | null {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  const normalized = Math.trunc(parsed);
  if (typeof options.minimum === "number" && normalized < options.minimum) {
    return null;
  }
  if (typeof options.maximum === "number" && normalized > options.maximum) {
    return null;
  }
  return normalized;
}

/**
 * Normalize unknown input into a positive integer (`>= 1`).
 *
 * @param value - Unknown input value.
 * @returns Positive integer or `null` when invalid.
 */
export function normalizePositiveInteger(value: unknown): number | null {
  return normalizeInteger(value, { minimum: 1 });
}
