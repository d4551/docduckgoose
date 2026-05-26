/**
 * @baohaus/prisma-libsql/connection
 *
 * Connection management with reusable Database instances.
 * Domain: database
 */

import type { SQLQueryBindings } from "bun:sqlite";
import { Database } from "bun:sqlite";
import { isLibSQLError, throwMappedError } from "./errors";
import { coerceParams } from "./query";

export interface LibSQLConnectionConfig {
  readonly url: string;
  readonly authToken?: string;
  readonly createIfNotExists?: boolean;
}

export interface QueryRawParams {
  readonly sql: string;
  readonly args?: readonly unknown[];
}

export interface QueryRawResult {
  readonly columns: string[];
  readonly rows: unknown[][];
}

export interface ExecuteResult {
  readonly rowCount: number;
}

function readColumnValue(row: object, column: string): unknown {
  return Reflect.get(row, column);
}

function readColumns(row: unknown): string[] {
  return typeof row === "object" && row !== null ? Object.keys(row) : [];
}

function toRowObject(row: unknown): object {
  return typeof row === "object" && row !== null ? row : {};
}

export enum ConnectionState {
  Disconnected = "disconnected",
  Connected = "connected",
  InTransaction = "in_transaction",
  Closed = "closed",
}

export class LibSQLConnection {
  private db: Database | null = null;
  private state: ConnectionState = ConnectionState.Disconnected;
  private readonly config: LibSQLConnectionConfig;
  private readonly id: string;

  constructor(config: LibSQLConnectionConfig) {
    this.config = config;
    this.id = crypto.randomUUID();
  }

  open(): void {
    if (this.state === ConnectionState.Closed) {
      throwMappedError(new Error("Cannot reopen a closed connection"));
    }
    if (this.db !== null) {
      return;
    }

    const filename = this.config.url.replace(/^file:/, "");
    const create = this.config.createIfNotExists ?? true;

    this.db = new Database(filename, { create, readonly: false });
    this.db.exec("PRAGMA journal_mode=WAL");
    this.db.exec("PRAGMA foreign_keys=ON");
    this.state = ConnectionState.Connected;
  }

  getId(): string {
    return this.id;
  }

  getState(): ConnectionState {
    return this.state;
  }

  private ensureOpen(): Database {
    this.open();
    const db = this.db;
    if (db === null) {
      throwMappedError(new Error("Database connection failed to open"));
    }
    return db;
  }

  queryRaw(params: QueryRawParams): QueryRawResult {
    const db = this.ensureOpen();
    const sql = params.sql;
    const bindings = coerceParams(params.args ?? []);

    const stmt = db.prepare(sql);
    const rows: unknown[][] = [];

    if (bindings.length > 0) {
      const typedBindings = bindings as SQLQueryBindings[];
      const all = stmt.all(...typedBindings);
      const columns = all.length > 0 ? readColumns(all[0]) : [];
      for (const row of all) {
        rows.push(columns.map((col) => readColumnValue(toRowObject(row), col)));
      }
      return { columns, rows };
    }

    const all = stmt.all();
    const columns = all.length > 0 ? readColumns(all[0]) : [];
    for (const row of all) {
      rows.push(columns.map((col) => readColumnValue(toRowObject(row), col)));
    }
    return { columns, rows };
  }

  executeRaw(params: QueryRawParams): ExecuteResult {
    const db = this.ensureOpen();
    const sql = params.sql;
    const bindings = coerceParams(params.args ?? []);

    const stmt = db.prepare(sql);
    if (bindings.length > 0) {
      const typedBindings = bindings as SQLQueryBindings[];
      const result = stmt.run(...typedBindings);
      return { rowCount: result.changes };
    }

    const result = stmt.run();
    return { rowCount: result.changes };
  }

  beginTransaction(): void {
    this.ensureOpen();
    if (this.state === ConnectionState.InTransaction) {
      throwMappedError(new Error("Transaction already active"));
    }
    this.db!.exec("BEGIN DEFERRED");
    this.state = ConnectionState.InTransaction;
  }

  commit(): void {
    if (this.state !== ConnectionState.InTransaction || this.db === null) {
      return;
    }
    this.db.exec("COMMIT");
    this.state = ConnectionState.Connected;
  }

  rollback(): void {
    if (this.state !== ConnectionState.InTransaction || this.db === null) {
      return;
    }
    this.db.exec("ROLLBACK");
    this.state = ConnectionState.Connected;
  }

  close(): void {
    if (this.state === ConnectionState.InTransaction) {
      this.rollback();
    }
    if (this.db !== null) {
      this.db.close();
      this.db = null;
    }
    this.state = ConnectionState.Closed;
  }

  isOpen(): boolean {
    return this.db !== null && this.state !== ConnectionState.Closed;
  }
}

export function createConnection(config: LibSQLConnectionConfig): LibSQLConnection {
  return new LibSQLConnection(config);
}
