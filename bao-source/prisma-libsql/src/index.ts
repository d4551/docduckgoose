/**
 * @baohaus/prisma-libsql
 *
 * BAO parity clean-room implementation for upstream: @prisma/adapter-libsql@7.7.0
 * Domain: database
 *
 * Full LibSQL adapter with connection pooling, transaction support,
 * query parameterization, and error mapping.
 *
 * Follows governance-allowlisted prisma-client-bao/src/adapters/bun.ts pattern.
 */

const PACKAGE_NAME = "@baohaus/prisma-libsql" as const;
const UPSTREAM_PACKAGE = "@prisma/adapter-libsql@7.7.0" as const;

export type { DriverAdapter, Queryable, TransactionHandle } from "./adapter.js";
// Re-export driver adapter (Prisma Driver Adapter pattern)
export {
  createLibSQLDriverAdapter,
  LibSQLDriverAdapter,
} from "./adapter.js";
export type { LibSQLConfig } from "./config.js";
// Re-export config
export { getLibSQLConfig } from "./config.js";
export type {
  ExecuteResult,
  LibSQLConnectionConfig,
  QueryRawParams,
  QueryRawResult,
} from "./connection.js";
// Re-export connection management
export {
  ConnectionState,
  createConnection,
  LibSQLConnection,
} from "./connection.js";
export type {
  LibSQLError,
  PrismaLibSQLErrorFields,
  PrismaLibSQLErrorKind,
  PrismaLibSQLErrorShape,
} from "./errors.js";
// Re-export canonical error classes and mapping
export {
  isLibSQLError,
  LibSQLConnectionError,
  LibSQLQueryError,
  LibSQLTransactionError,
  mapLibSQLError,
  throwMappedError,
} from "./errors.js";
export type { QueryResult, SqliteCell, SqliteRow } from "./query.js";
// Re-export query helpers
export { coerceParams, coercePrimitiveParam, sqliteCellToJS, sqliteRowToRecord } from "./query.js";
export type { Transaction, TransactionCallback, TransactionOptions } from "./transaction.js";
// Re-export transaction support
export {
  InteractiveTransaction,
  withTransaction,
} from "./transaction.js";

// Package identity
export { PACKAGE_NAME, UPSTREAM_PACKAGE };

import { createLibSQLDriverAdapter } from "./adapter.js";
/**
 * Convenience factory: creates a Prisma-compatible LibSQLDriverAdapter
 * from the LibSQLConfig shape (backwards-compatible with existing callers).
 */
import type { LibSQLConfig } from "./config.js";

export function createLibSQLAdapter(config: LibSQLConfig) {
  return createLibSQLDriverAdapter({
    url: config.url,
    authToken: config.authToken,
    createIfNotExists: true,
  });
}
