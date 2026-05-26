/**
 * JSON schema helpers for shared contract validation.
 *
 * Canonical definitions for JSON value/object schemas used across shared
 * contracts and runtime validators.
 *
 * @shared/schemas/json
 */

import type { TObject, TUnknown } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | object;
export type JsonObject = { [key: string]: JsonValue };

/**
 * JSON value schema.
 *
 * Intentionally permissive to avoid recursive schema pitfalls while keeping
 * compatibility with baobox runtime validators.
 */
export const JsonValueSchema: TUnknown = TypeExports.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

/**
 * JSON object schema (string keys with JSON values).
 *
 * Uses `additionalProperties` rather than `patternProperties` for broader
 * compatibility with JSON-schema consumers.
 */
export const JsonObjectSchema: TObject<Record<string, never>, never, never> = TypeExports.Object(
  {},
  {
    additionalProperties: JsonValueSchema,
    description: "JSON object with string keys",
  },
);
