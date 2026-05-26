/**
 * @baohaus/libsql-bao/sqlite
 *
 * Low-level SQLite persistence surface backed by Bun's native SQLite engine.
 */

import { Database } from "bun:sqlite";

export interface SqliteOpenOptions {
  readonly create?: boolean;
  readonly readwrite?: boolean;
  readonly readonly?: boolean;
  readonly strict?: boolean;
}

export type SqliteDatabase = Database;

export function openSqliteDatabase(
  filename: string,
  options: SqliteOpenOptions = {},
): SqliteDatabase {
  return new Database(filename, options);
}
