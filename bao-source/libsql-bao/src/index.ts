/**
 * @baohaus/libsql-bao
 *
 * BAO parity clean-room implementation for upstream: @libsql/client@0.17.2
 * Domain: database
 */

import { Database, type SQLQueryBindings } from "bun:sqlite";

const PACKAGE_NAME = "@baohaus/libsql-bao" as const;
const UPSTREAM_PACKAGE = "@libsql/client@0.17.2" as const;
const FILE_SCHEME_PREFIX = /^file:/;

interface LibSQLConfig {
  readonly url: string;
  readonly authToken?: string;
}

interface LibSQLResult {
  readonly columns: readonly string[];
  readonly rows: readonly (readonly unknown[])[];
}

class LibSQLClient {
  private readonly db: Database;

  constructor(config: LibSQLConfig) {
    const path = config.url.replace(FILE_SCHEME_PREFIX, "");
    this.db = new Database(path, { create: true });
  }

  execute(sql: string, args?: readonly SQLQueryBindings[]): LibSQLResult {
    const stmt = this.db.prepare(sql);
    const columnNames = stmt.columnNames;
    const rows = args && args.length > 0 ? stmt.values(...args) : stmt.values();

    return { columns: columnNames, rows };
  }

  batch(stmts: readonly { sql: string; args?: readonly SQLQueryBindings[] }[]): LibSQLResult[] {
    return stmts.map((s) => this.execute(s.sql, s.args));
  }

  transaction<T>(fn: (tx: LibSQLClient) => T): T {
    this.execute("BEGIN");
    const result = fn(this);
    this.execute("COMMIT");
    return result;
  }
}

function createClient(config: LibSQLConfig): LibSQLClient {
  return new LibSQLClient(config);
}

export type { LibSQLConfig, LibSQLResult };
export { createClient, LibSQLClient, PACKAGE_NAME, UPSTREAM_PACKAGE };
