/**
 * Typed JSON guard helpers.
 *
 * Centralizes safe object/field reads from unknown payloads so callers avoid
 * repeated `Record<string, unknown>` assertions.
 *
 * @shared/utils/typed-json-guards
 */

import type { UnknownRecord } from "@baohaus/bao-types/common";
import { isRecord } from "./type-guards.js";

/**
 * Options for string property reads.
 */
export interface ReadStringPropertyOptions {
  /**
   * Trim the string before returning.
   */
  trim?: boolean;
  /**
   * Required minimum length after optional trim.
   */
  minLength?: number;
}

/**
 * Narrow unknown values to object records.
 *
 * @param value - Candidate value.
 * @returns True when the value is a non-array object.
 */
export function isObjectRecord(value: unknown): value is UnknownRecord {
  return isRecord(value);
}

/**
 * Return a record view of an unknown value.
 *
 * @param value - Candidate value.
 * @returns Record value when object-like; otherwise undefined.
 */
export function asObjectRecord(value: unknown): UnknownRecord | undefined {
  return isObjectRecord(value) ? value : undefined;
}

/**
 * Read a property from an unknown object value.
 *
 * @param value - Candidate object.
 * @param key - Property key.
 * @returns Property value when available.
 */
export function getProperty(value: unknown, key: string): unknown | undefined {
  const record = asObjectRecord(value);
  if (!record) {
    return;
  }
  return Reflect.get(record, key);
}

/**
 * Read a boolean property from an unknown object value.
 *
 * @param value - Candidate object.
 * @param key - Property key.
 * @returns Boolean value when the property is a boolean.
 */
export function getBooleanProperty(value: unknown, key: string): boolean | undefined {
  const candidate = getProperty(value, key);
  return typeof candidate === "boolean" ? candidate : undefined;
}

/**
 * Read a number property from an unknown object value.
 *
 * @param value - Candidate object.
 * @param key - Property key.
 * @returns Finite number when the property is numeric.
 */
export function getNumberProperty(value: unknown, key: string): number | undefined {
  const candidate = getProperty(value, key);
  if (typeof candidate !== "number") {
    return;
  }
  return Number.isFinite(candidate) ? candidate : undefined;
}

/**
 * Read a string property from an unknown object value.
 *
 * @param value - Candidate object.
 * @param key - Property key.
 * @param options - Optional normalization rules.
 * @returns String value when the property is a string and matches constraints.
 */
export function getStringProperty(
  value: unknown,
  key: string,
  options: ReadStringPropertyOptions = {},
): string | undefined {
  const candidate = getProperty(value, key);
  if (typeof candidate !== "string") {
    return;
  }
  const normalized = options.trim ? candidate.trim() : candidate;
  if (typeof options.minLength === "number" && normalized.length < options.minLength) {
    return;
  }
  return normalized;
}

/**
 * Read an array property from an unknown object value.
 *
 * @param value - Candidate object.
 * @param key - Property key.
 * @returns Array value when the property is an array.
 */
export function getArrayProperty(value: unknown, key: string): unknown[] | undefined {
  const candidate = getProperty(value, key);
  return Array.isArray(candidate) ? candidate : undefined;
}

/**
 * Read an object property from an unknown object value.
 *
 * @param value - Candidate object.
 * @param key - Property key.
 * @returns Record value when the property is an object record.
 */
export function getObjectProperty(value: unknown, key: string): UnknownRecord | undefined {
  const candidate = getProperty(value, key);
  return asObjectRecord(candidate);
}

/**
 * Check whether an unknown value matches one of the allowed string literal values.
 *
 * TValue - String literal union represented by `allowed`.
 * @param value - Candidate value.
 * @param allowed - Allowed string values.
 * @returns True when value is one of the allowed literals.
 */
export function isStringEnumValue<TValue extends string>(
  value: unknown,
  allowed: Iterable<TValue>,
): value is TValue {
  if (typeof value !== "string") {
    return false;
  }
  for (const entry of allowed) {
    if (entry === value) {
      return true;
    }
  }
  return false;
}

/**
 * Read a string enum property from an unknown object value.
 *
 * TValue - Allowed string literal union.
 * @param value - Candidate object.
 * @param key - Property key.
 * @param allowed - Allowed string values.
 * @param options - Optional string normalization rules.
 * @returns Enum value when property is a matching string literal.
 */
export function getEnumProperty<TValue extends string>(
  value: unknown,
  key: string,
  allowed: Iterable<TValue>,
  options: ReadStringPropertyOptions = {},
): TValue | undefined {
  const candidate = getStringProperty(value, key, options);
  if (candidate === undefined) {
    return;
  }
  return isStringEnumValue(candidate, allowed) ? candidate : undefined;
}

/**
 * Check whether an unknown object has all required keys.
 *
 * @param value - Candidate object.
 * @param keys - Required key list.
 * @returns True when all keys are present.
 */
export function hasObjectKeys(value: unknown, keys: readonly string[]): boolean {
  const record = asObjectRecord(value);
  if (!record) {
    return false;
  }
  return keys.every((key) => Reflect.has(record, key));
}

/**
 * Return an object record when available, otherwise an empty object.
 *
 * Use for Prisma JsonValue, parsed JSON, or other unknown boundary values
 * where a plain record is expected. Returns empty object when value is
 * null, a primitive, or an array.
 *
 * @param value - Candidate value.
 * @returns Record value or empty object.
 */
export function toObjectRecord(value: unknown): UnknownRecord {
  return asObjectRecord(value) ?? {};
}

/**
 * Coerce a boundary value to a known generic type after runtime validation.
 *
 * @remarks
 * Use this only after structural checks have proven compatibility with the
 * target type at the call site.
 *
 * TData - Target typed payload.
 * @param value - Runtime value that has already been validated.
 * @returns Value narrowed to the target type.
 */
export function coerceTypedValue<TData>(value: unknown): TData {
  return value as TData;
}
