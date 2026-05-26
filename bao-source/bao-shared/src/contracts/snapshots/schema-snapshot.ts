/**
 * Stable TypeBox schema serialization for contract snapshots.
 *
 * Contract snapshots must be deterministic across runtimes and import ordering. Some
 * schema pipelines attach optional metadata like `title`/`description` (useful for
 * OpenAPI/docs) that should not break regression tests.
 *
 * @shared/contracts/snapshots/schema-snapshot
 */

import type { TSchema } from "@baohaus/baobox/elysia";

const RUNTIME_ONLY_KEYS: Set<string> = new Set(["title", "description"]);

import {
  isJsonGuardRecord,
  isJsonGuardValue,
  type JsonGuardRecord,
  type JsonGuardValue,
} from "../../types/json-guard.ts";

function sanitizeValue(value: JsonGuardValue): JsonGuardValue {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (!isJsonGuardRecord(value)) {
    return value;
  }

  const keys = Object.keys(value)
    .filter((key) => !RUNTIME_ONLY_KEYS.has(key))
    .sort();
  const out: { [key: string]: JsonGuardValue } = {};
  for (const key of keys) {
    const propertyValue = value[key];
    if (propertyValue !== undefined) {
      out[key] = sanitizeValue(propertyValue);
    }
  }
  return out satisfies JsonGuardRecord;
}

/**
 * Serialize a TypeBox schema to a stable JSON string for snapshot testing.
 *
 * Removes runtime-only metadata fields (e.g. `title`, `description`) and deeply sorts keys.
 *
 * @param schema - TypeBox schema to serialize.
 * @returns Stable, deterministic JSON string.
 */
export function serializeSchemaForSnapshot(schema: TSchema): string {
  // JSON round-trip strips functions/symbols and re-emits a pure JSON value
  // tree; cast at this single I/O boundary so the rest of the pipeline runs
  // on the structured {@link JsonGuardValue} type.
  const plain = JSON.parse(JSON.stringify(schema)) as JsonGuardValue;
  const sanitized = sanitizeValue(plain);
  return `${JSON.stringify(sanitized, null, 2)}`;
}
