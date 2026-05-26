/**
 * @baohaus/prisma-libsql/transaction
 *
 * Transaction support: interactive and callback-based transactions.
 * Domain: database
 */

import type { ExecuteResult, LibSQLConnection, QueryRawParams, QueryRawResult } from "./connection";
import { throwMappedError } from "./errors";

export interface Transaction {
  readonly id: string;
  readonly options?: TransactionOptions;
  queryRaw(params: QueryRawParams): QueryRawResult;
  executeRaw(params: QueryRawParams): ExecuteResult;
  commit(): void;
  rollback(): void;
}

export interface TransactionOptions {
  readonly isolationLevel?: "Deferred" | "Immediate" | "Exclusive";
  readonly maxWait?: number;
  readonly timeout?: number;
  readonly readOnly?: boolean;
}

export class InteractiveTransaction implements Transaction {
  readonly id: string;
  readonly options?: TransactionOptions;
  private readonly connection: LibSQLConnection;
  private completed = false;

  constructor(connection: LibSQLConnection, options?: TransactionOptions) {
    this.id = crypto.randomUUID();
    this.connection = connection;
    this.options = options;
  }

  queryRaw(params: QueryRawParams): QueryRawResult {
    this.assertActive();
    return this.connection.queryRaw(params);
  }

  executeRaw(params: QueryRawParams): ExecuteResult {
    this.assertActive();
    return this.connection.executeRaw(params);
  }

  commit(): void {
    this.assertActive();
    this.completed = true;
    this.connection.commit();
  }

  rollback(): void {
    if (this.completed) {
      return;
    }
    this.completed = true;
    this.connection.rollback();
  }

  private assertActive(): void {
    if (this.completed) {
      throwMappedError(new Error("Transaction has already been committed or rolled back"));
    }
  }
}

export type TransactionCallback<T = unknown> = (tx: Transaction) => T;

interface ThenableCandidate {
  readonly then?: unknown;
}

function hasThen(value: object): value is ThenableCandidate {
  return "then" in value;
}

export function withTransaction<T>(
  connection: LibSQLConnection,
  fn: TransactionCallback<T>,
  options?: TransactionOptions,
): T {
  connection.beginTransaction();
  const tx = new InteractiveTransaction(connection, options);

  const result = fn(tx);

  const isPromise =
    result !== null &&
    typeof result === "object" &&
    hasThen(result) &&
    typeof result.then === "function";

  if (isPromise) {
    throwMappedError(
      new Error("Async transaction callbacks are not supported. Use interactive transactions."),
    );
  }

  tx.commit();
  return result;
}
