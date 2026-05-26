/**
 * Local record guards for the types package.
 *
 * Kept inside `bao-types` so declaration emit does not depend on `bao-utils`,
 * which depends back on `bao-types`.
 */

export type UnknownRecord = Record<string, unknown>;

export function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
