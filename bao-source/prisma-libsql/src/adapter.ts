/**
 * @baohaus/prisma-libsql/adapter
 *
 * Full Prisma Driver Adapter matching @prisma/adapter-libsql interface.
 * Follows governance-allowlisted prisma-client-bao adapters/bun.ts pattern.
 * Domain: database
 */

import {
  createConnection,
  type ExecuteResult,
  type LibSQLConnection,
  type LibSQLConnectionConfig,
  type QueryRawParams,
  type QueryRawResult,
} from "./connection";
import {
  InteractiveTransaction,
  type Transaction,
  type TransactionCallback,
  type TransactionOptions,
  withTransaction,
} from "./transaction";

const PROVIDER = "sqlite" as const;
const ADAPTER_NAME = "@baohaus/prisma-libsql" as const;

export interface DriverAdapter {
  readonly provider: string;
  readonly adapterName: string;
  connect(): Promise<Queryable>;
  startTransaction(): Promise<TransactionHandle>;
  close(): Promise<void>;
}

export interface Queryable {
  readonly provider: string;
  readonly adapterName: string;
  queryRaw(params: QueryRawParams): Promise<QueryRawResult>;
  executeRaw(params: QueryRawParams): Promise<ExecuteResult>;
}

export interface TransactionHandle extends Queryable {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

class LibSQLQueryable implements Queryable {
  readonly provider = PROVIDER;
  readonly adapterName = ADAPTER_NAME;
  private readonly connection: LibSQLConnection;

  constructor(connection: LibSQLConnection) {
    this.connection = connection;
  }

  queryRaw(params: QueryRawParams): Promise<QueryRawResult> {
    return Promise.resolve(this.connection.queryRaw(params));
  }

  executeRaw(params: QueryRawParams): Promise<ExecuteResult> {
    return Promise.resolve(this.connection.executeRaw(params));
  }
}

class LibSQLTransactionHandle implements TransactionHandle {
  readonly provider = PROVIDER;
  readonly adapterName = ADAPTER_NAME;
  private readonly tx: InteractiveTransaction;
  private readonly connection: LibSQLConnection;

  constructor(tx: InteractiveTransaction, connection: LibSQLConnection) {
    this.tx = tx;
    this.connection = connection;
  }

  queryRaw(params: QueryRawParams): Promise<QueryRawResult> {
    return Promise.resolve(this.tx.queryRaw(params));
  }

  executeRaw(params: QueryRawParams): Promise<ExecuteResult> {
    return Promise.resolve(this.tx.executeRaw(params));
  }

  commit(): Promise<void> {
    this.tx.commit();
    return Promise.resolve();
  }

  rollback(): Promise<void> {
    this.tx.rollback();
    return Promise.resolve();
  }
}

export class LibSQLDriverAdapter implements DriverAdapter {
  readonly provider = PROVIDER;
  readonly adapterName = ADAPTER_NAME;
  private readonly config: LibSQLConnectionConfig;
  private connection: LibSQLConnection | null = null;

  constructor(config: LibSQLConnectionConfig) {
    this.config = config;
  }

  connect(): Promise<Queryable> {
    if (this.connection === null) {
      this.connection = createConnection(this.config);
    }
    this.connection.open();
    return Promise.resolve(new LibSQLQueryable(this.connection));
  }

  startTransaction(): Promise<TransactionHandle> {
    const conn = this.ensureConnection();
    conn.beginTransaction();
    const tx = new InteractiveTransaction(conn);
    return Promise.resolve(new LibSQLTransactionHandle(tx, conn));
  }

  transaction<T>(fn: TransactionCallback<T>, options?: TransactionOptions): T {
    const conn = this.ensureConnection();
    return withTransaction(conn, fn, options);
  }

  close(): Promise<void> {
    if (this.connection !== null) {
      this.connection.close();
      this.connection = null;
    }
    return Promise.resolve();
  }

  private ensureConnection(): LibSQLConnection {
    if (this.connection === null) {
      this.connection = createConnection(this.config);
      this.connection.open();
    }
    return this.connection;
  }

  getConnection(): LibSQLConnection | null {
    return this.connection;
  }

  isConnected(): boolean {
    return this.connection !== null && this.connection.isOpen();
  }
}

export function createLibSQLDriverAdapter(config: LibSQLConnectionConfig): LibSQLDriverAdapter {
  return new LibSQLDriverAdapter(config);
}
