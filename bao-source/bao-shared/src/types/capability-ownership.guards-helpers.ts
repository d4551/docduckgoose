/**
 * Shared runtime guard helpers for capability ownership validation.
 *
 * @shared/types/capability-ownership.guards-helpers
 */

import { isRecord } from "../utils/type-guards.ts";

/**
 * Runtime guard for non-negative numeric values.
 */
export function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/**
 * Runtime guard for non-empty string values.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Runtime guard for optional string values.
 */
export function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

/**
 * Runtime guard for optional boolean values.
 */
export function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || typeof value === "boolean";
}

/**
 * Runtime guard for string array values.
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

/**
 * Runtime guard for optional string array values.
 */
export function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || isStringArray(value);
}

/**
 * Runtime guard for optional values validated by a provided guard.
 */
export function isOptionalValue<T>(
  value: unknown,
  guard: (candidate: unknown) => candidate is T,
): value is T | undefined {
  return value === undefined || guard(value);
}

/**
 * Runtime guard for optional arrays validated by a provided guard.
 */
export function isOptionalArrayOf<T>(
  value: unknown,
  guard: (candidate: unknown) => candidate is T,
): value is T[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every((entry) => guard(entry)));
}

/**
 * @returns True when `record[field]` is a non-empty string.
 */
export function isNonEmptyStringField(record: Record<string, unknown>, field: string): boolean {
  const value = record[field];
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * @returns True when `record[field]` is undefined or a string.
 */
export function isOptionalStringField(record: Record<string, unknown>, field: string): boolean {
  return record[field] === undefined || typeof record[field] === "string";
}

/**
 * @returns True when `record[field]` is an array of non-empty strings.
 */
export function isNonEmptyStringArrayField(
  record: Record<string, unknown>,
  field: string,
): boolean {
  const value = record[field];
  return (
    Array.isArray(value) &&
    value.every((item: unknown) => typeof item === "string" && item.trim().length > 0)
  );
}

/**
 * @returns True when `record[field]` is undefined or an array of strings.
 */
export function isStringArrayField(record: Record<string, unknown>, field: string): boolean {
  const value = record[field];
  return (
    value === undefined ||
    (Array.isArray(value) && value.every((item: unknown) => typeof item === "string"))
  );
}

export { isRecord };
