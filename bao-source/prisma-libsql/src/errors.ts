/**
 * @baohaus/prisma-libsql/errors
 *
 * Error classes and error mapping: LibSQL / SQLite errors → Prisma-style error shapes.
 * Domain: database
 */

/**
 * Core LibSQL error classes with Prisma-style error codes.
 * These are the canonical error types for the entire package.
 */
export class LibSQLConnectionError extends Error {
  readonly code: string;
  override readonly cause?: Error;

  constructor(code: string, message: string, cause?: Error) {
    super(message);
    this.name = "LibSQLConnectionError";
    this.code = code;
    this.cause = cause;
  }
}

export class LibSQLQueryError extends Error {
  readonly code: string;
  readonly sql?: string;
  override readonly cause?: Error;

  constructor(code: string, message: string, sql?: string, cause?: Error) {
    super(message);
    this.name = "LibSQLQueryError";
    this.code = code;
    this.sql = sql;
    this.cause = cause;
  }
}

export class LibSQLTransactionError extends Error {
  readonly code: string;
  override readonly cause?: Error;

  constructor(code: string, message: string, cause?: Error) {
    super(message);
    this.name = "LibSQLTransactionError";
    this.code = code;
    this.cause = cause;
  }
}

export type LibSQLError = LibSQLConnectionError | LibSQLQueryError | LibSQLTransactionError;

/**
 * Prisma-style error mapping types
 */
export const PRISMA_LIBSQL_ERROR_KINDS = [
  "PrismaClientKnownRequestError",
  "PrismaClientUnknownRequestError",
  "PrismaClientRustPanicError",
  "PrismaClientInitializationError",
  "PrismaClientValidationError",
] as const;

export type PrismaLibSQLErrorKind = (typeof PRISMA_LIBSQL_ERROR_KINDS)[number];

export interface PrismaLibSQLErrorFields {
  readonly code: string;
  readonly clientVersion: string;
  readonly meta?: Record<string, unknown>;
  readonly batchRequestIdx?: number;
}

export interface PrismaLibSQLErrorShape {
  readonly kind: PrismaLibSQLErrorKind;
  readonly message: string;
  readonly fields: PrismaLibSQLErrorFields;
}

const CLIENT_VERSION = "7.7.0";

const SQLITE_ERROR_MAP: Record<string, string> = {
  SQLITE_CONSTRAINT_UNIQUE: "P2002",
  SQLITE_CONSTRAINT_PRIMARYKEY: "P2002",
  SQLITE_CONSTRAINT_FOREIGNKEY: "P2003",
  SQLITE_CONSTRAINT_NOTNULL: "P2011",
  SQLITE_CONSTRAINT_CHECK: "P2035",
  SQLITE_BUSY: "P1017",
  SQLITE_READONLY: "P1036",
  SQLITE_IOERR: "P1000",
  SQLITE_CORRUPT: "P1000",
  SQLITE_FULL: "P1000",
  SQLITE_CANTOPEN: "P1001",
  SQLITE_PERM: "P1001",
  SQLITE_MISUSE: "P1015",
  SQLITE_RANGE: "P2006",
  SQLITE_NOMEM: "P1000",
};

function extractErrorCode(message: string): string {
  for (const [sqliteCode, prismaCode] of Object.entries(SQLITE_ERROR_MAP)) {
    if (message.includes(sqliteCode)) {
      return prismaCode;
    }
  }
  return "P1000";
}

function extractErrorMessage(error: Error): string {
  const message = error.message;
  const idx = message.lastIndexOf(":");
  if (idx === -1) {
    return message;
  }
  return message.slice(idx + 1).trim();
}

function createFields(
  code: string,
  error: Error,
  meta?: Record<string, unknown>,
): PrismaLibSQLErrorFields {
  return {
    code,
    clientVersion: CLIENT_VERSION,
    meta: meta ?? { message: extractErrorMessage(error) },
  };
}

export function mapLibSQLError(
  error: Error,
  meta?: Record<string, unknown>,
): PrismaLibSQLErrorShape {
  const code = extractErrorCode(error.message);

  if (code === "P2011") {
    return {
      kind: "PrismaClientKnownRequestError",
      message: error.message,
      fields: createFields(code, error, meta),
    };
  }

  if (code === "P2002") {
    return {
      kind: "PrismaClientKnownRequestError",
      message: error.message,
      fields: createFields(code, error, meta),
    };
  }

  if (code === "P2003") {
    return {
      kind: "PrismaClientKnownRequestError",
      message: error.message,
      fields: createFields(code, error, meta),
    };
  }

  return {
    kind: "PrismaClientKnownRequestError",
    message: error.message,
    fields: createFields(code, error, meta),
  };
}

export function isLibSQLError(error: Error): boolean {
  return (
    error.message.includes("SQLITE_") ||
    error.message.includes("libsql") ||
    error.message.includes("code:")
  );
}

export function throwMappedError(error: Error, meta?: Record<string, unknown>): never {
  const shape = mapLibSQLError(error, meta);
  const mapped = new Error(shape.message);
  Object.defineProperty(mapped, "name", { value: shape.kind });
  Object.defineProperty(mapped, "code", { value: shape.fields.code });
  Object.defineProperty(mapped, "clientVersion", {
    value: shape.fields.clientVersion,
  });
  Object.defineProperty(mapped, "meta", {
    value: shape.fields.meta,
  });
  throw mapped;
}
