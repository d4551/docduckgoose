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
type SnapshotObject = { [key: string]: unknown };

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const keys = Object.keys(value)
    .filter((key) => !RUNTIME_ONLY_KEYS.has(key))
    .sort();
  const out: SnapshotObject = {};
  for (const key of keys) {
    out[key] = sanitizeValue(Reflect.get(value, key));
  }
  return out;
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
  const plain: unknown = JSON.parse(JSON.stringify(schema));
  const sanitized = sanitizeValue(plain);
  return `${JSON.stringify(sanitized, null, 2)}`;
}
