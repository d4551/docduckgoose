/**
 * @baohaus/prisma-libsql/query
 *
 * Query parameterization with type coercion.
 * Domain: database
 */

import type { SQLQueryBindings } from "bun:sqlite";

export type SqliteCell = string | number | bigint | boolean | null | Uint8Array;
export type SqliteRow = readonly SqliteCell[];
export type QueryResult = {
  readonly columns: string[];
  readonly rows: SqliteRow[];
  readonly rowsAffected: number;
};

function isTypedArrayBinding(value: unknown): value is NodeJS.TypedArray {
  return ArrayBuffer.isView(value) && !(value instanceof DataView);
}

type SqliteObjectBinding = Record<string, SQLQueryBindings>;

function isSqliteObjectBinding(value: unknown): value is SqliteObjectBinding {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  return Object.values(value).every(isSqlQueryBinding);
}

function isSqlQueryBinding(value: unknown): value is SQLQueryBindings {
  return (
    typeof value === "string" ||
    typeof value === "bigint" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    isTypedArrayBinding(value) ||
    isSqliteObjectBinding(value)
  );
}

export function coercePrimitiveParam(value: unknown): SQLQueryBindings {
  if (value === undefined) {
    return null;
  }
  if (value === null) {
    return null;
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      return null;
    }
    return value;
  }
  if (typeof value === "bigint") {
    return value;
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  // Must check TypedArray before general object check
  if (isTypedArrayBinding(value)) {
    return value;
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

export function coerceParams(params: readonly unknown[]): SQLQueryBindings[] {
  return params.map(coercePrimitiveParam);
}

export function sqliteCellToJS(value: SqliteCell): unknown {
  return value;
}

export function sqliteRowToRecord(columns: string[], row: SqliteRow): Record<string, unknown> {
  const record: Record<string, unknown> = {};
  for (let i = 0; i < columns.length; i++) {
    record[columns[i]] = sqliteCellToJS(row[i]);
  }
  return record;
}
