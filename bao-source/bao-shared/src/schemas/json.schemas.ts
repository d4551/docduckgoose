/**
 * JSON schema helpers for shared contract validation.
 *
 * Canonical definitions for JSON value/object schemas used across shared
 * contracts and runtime validators.
 *
 * @shared/schemas/json
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * JSON value schema.
 *
 * Intentionally permissive to avoid recursive schema pitfalls while keeping
 * compatibility with baobox runtime validators.
 */
export const JsonValueSchema: Type.TUnknown = Type.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

/**
 * JSON object schema (string keys with JSON values).
 *
 * Uses `additionalProperties` rather than `patternProperties` for broader
 * compatibility with JSON-schema consumers.
 */
export const JsonObjectSchema: Type.TObject<Record<string, never>, never, never> = Type.Object(
  {},
  {
    additionalProperties: JsonValueSchema,
    description: "JSON object with string keys",
  },
);

/**
 * TypeScript type for a JSON value.
 */
export type JsonValue = Static<typeof JsonValueSchema>;

/**
 * TypeScript type for a JSON object with string keys.
 */
export type JsonObject = Static<typeof JsonObjectSchema>;
