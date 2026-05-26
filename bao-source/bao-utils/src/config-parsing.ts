/**
 * Shared config/CLI parsing utilities.
 *
 * Single source of truth for parseBoolean, normalizeOptionalBoolean,
 * requireString, and normalizeStringArray across server configs and scripts.
 *
 * @packageDocumentation
 */

const TRUTHY_TOKENS: Set<unknown> = new Set(["true", "1", "yes", "y", "on", "enabled"]);
const FALSY_TOKENS: Set<unknown> = new Set(["false", "0", "no", "n", "off", "disabled"]);

/**
 * Normalize loose input into a trimmed non-empty string or null.
 *
 * @param value - Raw value.
 * @returns Trimmed string or null when empty.
 */
export function normalizeOptionalString(value: unknown): string | null {
  const normalized = String(value ?? "").trim();
  return normalized ? normalized : null;
}

/**
 * Parse booleans from common env/CLI/config representations.
 *
 * @param value - Raw value (boolean, string, number, etc.).
 * @returns true, false, or null when unset/invalid.
 */
export function normalizeOptionalBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value > 0 ? true : value === 0 ? false : null;
  }
  const normalized = normalizeOptionalString(value)?.toLowerCase();
  if (!normalized) {
    return null;
  }
  if (TRUTHY_TOKENS.has(normalized)) {
    return true;
  }
  if (FALSY_TOKENS.has(normalized)) {
    return false;
  }
  return null;
}

/**
 * Parse booleans with fallback value when unset/invalid.
 *
 * @param value - Raw value.
 * @param fallback - Value when input is empty or invalid.
 * @returns Parsed boolean or fallback.
 */
export function parseBoolean(value: unknown, fallback: boolean): boolean {
  const parsed = normalizeOptionalBoolean(value);
  return parsed ?? fallback;
}

/**
 * Parse booleans strictly; throws when value is set but invalid.
 *
 * @param value - Raw value.
 * @param label - Label for error message.
 * @returns Parsed boolean.
 * @throws When value is non-empty but not a valid boolean representation.
 */
export function parseBooleanStrict(value: unknown, label: string): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value > 0;
  }
  if (value === undefined || value === null || value === "") {
    throw new Error(`Missing ${label} config value`);
  }
  const normalized = String(value).trim().toLowerCase();
  if (TRUTHY_TOKENS.has(normalized)) {
    return true;
  }
  if (FALSY_TOKENS.has(normalized)) {
    return false;
  }
  throw new Error(`Invalid ${label} config value`);
}

/**
 * Parse booleans with fallback when empty; throws when value is set but invalid.
 *
 * @param value - Raw value.
 * @param fallback - Value when input is empty.
 * @param label - Label for error message.
 * @returns Parsed boolean or fallback.
 * @throws When value is non-empty but not a valid boolean representation.
 */
export function parseBooleanWithFallback(
  value: unknown,
  fallback: boolean,
  label: string,
): boolean {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  const parsed = normalizeOptionalBoolean(value);
  if (parsed !== null) {
    return parsed;
  }
  throw new Error(`Invalid ${label} config value`);
}

/**
 * Require a non-empty string; throws when missing.
 *
 * @param value - Raw value.
 * @param label - Label for error message.
 * @returns Trimmed string.
 * @throws When value is empty or not a string.
 */
export function requireString(value: unknown, label: string): string {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    throw new Error(`Missing ${label} config value`);
  }
  return normalized;
}

/**
 * Normalize comma-separated string or array into string array.
 *
 * @param value - Raw value (string or string[]).
 * @param fallback - Fallback when value is empty.
 * @returns Normalized string array.
 */
export function normalizeStringArray(
  value: string[] | string | undefined,
  fallback: string[] = [],
): string[] {
  if (Array.isArray(value)) {
    const result = value
      .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
      .filter(Boolean);
    return result.length > 0 ? result : fallback;
  }
  if (typeof value === "string") {
    const result = value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
    return result.length > 0 ? result : fallback;
  }
  return fallback;
}
