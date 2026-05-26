import { createConfigError } from "@baohaus/bao-utils/canonical/bao-error-helpers";

export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | { readonly [key: string]: JsonValue };

export function parseJsonValue(source: string): JsonValue {
  const parsed = JSON.parse(source);
  if (!isJsonValue(parsed)) {
    throw createConfigError(
      "JSON_VALUE_INVALID",
      "Parsed JSON value does not match the JSON value contract",
    );
  }
  return parsed;
}

export function renderJsonValue(value: JsonValue): string {
  return JSON.stringify(value);
}

export function asJsonObject(value: JsonValue): Readonly<Record<string, JsonValue>> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}

export function asJsonArray(value: JsonValue): readonly JsonValue[] | null {
  return Array.isArray(value) ? value : null;
}

export function asJsonString(value: JsonValue): string | null {
  return typeof value === "string" ? value : null;
}

export function asJsonBoolean(value: JsonValue): boolean | null {
  return typeof value === "boolean" ? value : null;
}

export function asJsonNumber(value: JsonValue): number | null {
  return typeof value === "number" ? value : null;
}

function isJsonRecord(value: unknown): value is { readonly [key: string]: JsonValue } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => isJsonValue(entry));
}

export function isJsonValue(value: unknown): value is JsonValue {
  if (
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every((entry) => isJsonValue(entry));
  }

  return isJsonRecord(value);
}
