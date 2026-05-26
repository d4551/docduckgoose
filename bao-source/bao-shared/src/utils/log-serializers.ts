/**
 * Log Serializers - Industry-standard error serialization and sensitive field redaction.
 *
 * Provides Pino-compatible error cause chain extraction and path-based
 * field redaction for structured logging across all logger implementations.
 *
 * @packageDocumentation
 */

// Types

/**
 * Serialized error with recursive cause chain support.
 *
 * Follows Pino's `stdSerializers.err` output format for maximum
 * compatibility with log aggregation tooling (ELK, Datadog, structured log aggregators).
 */
export interface SerializedError {
  /** Error constructor name (e.g. `TypeError`, `PrismaClientKnownRequestError`). */
  type: string;
  /** Error message. */
  message: string;
  /** Stack trace (when available). */
  stack?: string;
  /** Error code (e.g. `ECONNREFUSED`, `P2002`). */
  code?: string;
  /** Nested cause error (recursive). */
  cause?: SerializedError;
}

/**
 * Pino-compatible log level numeric values.
 *
 * Higher values indicate greater severity. Level filtering uses
 * `messageLevel >= configuredLevel` — identical to Pino/Bunyan/Winston.
 */
export const LOG_LEVEL_VALUES: {
  readonly trace: 10;
  readonly debug: 20;
  readonly info: 30;
  readonly warn: 40;
  readonly error: 50;
  readonly fatal: 60;
} = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
} as const;

/** Union of all supported log level strings. */
export type StandardLogLevel = keyof typeof LOG_LEVEL_VALUES;

// Sensitive Field Redaction

/**
 * Default paths to redact from log metadata.
 *
 * Supports both flat keys (`password`) and dot-delimited nested paths
 * (`headers.authorization`). Follows Pino's `redact` option convention.
 */
export const DEFAULT_REDACT_PATHS: readonly string[] = [
  "password",
  "passwd",
  "token",
  "accessToken",
  "access_token",
  "refreshToken",
  "refresh_token",
  "apiKey",
  "api_key",
  "apikey",
  "secret",
  "secretKey",
  "secret_key",
  "authorization",
  "cookie",
  "creditCard",
  "credit_card",
  "cardNumber",
  "card_number",
  "ssn",
  "connectionString",
  "connection_string",
  "privateKey",
  "private_key",
  "headers.authorization",
  "headers.cookie",
  "headers.x-api-key",
  "body.password",
  "body.token",
  "body.secret",
  "config.accessKey",
  "config.secretKey",
  "config.connectionString",
] as const;

/** Default censor string used to replace redacted values. */
const DEFAULT_CENSOR: string = "[Redacted]";

/**
 * Deep-redact sensitive fields from a metadata object.
 *
 * Uses path-based matching following Pino's `redact` convention:
 * - Flat keys: `password` matches `obj.password` at any depth
 * - Dot paths: `headers.authorization` matches `obj.headers.authorization`
 *
 * @param obj - Object to redact (not mutated; returns a shallow copy).
 * @param paths - Paths to redact (defaults to {@link DEFAULT_REDACT_PATHS}).
 * @param censor - Replacement value for redacted fields.
 * @returns New object with sensitive fields replaced.
 *
 * @example
 * ```typescript
 * const safe = redactSensitiveFields({ password: 'secret123', user: 'admin' });
 * // { password: '[Redacted]', user: 'admin' }
 * ```
 */
export function redactSensitiveFields(
  obj: Record<string, unknown>,
  paths: readonly string[] = DEFAULT_REDACT_PATHS,
  censor: string = DEFAULT_CENSOR,
): Record<string, unknown> {
  // Build lookup structures once per call
  const leafKeys = new Set<string>();
  const nestedPaths = new Map<string, Set<string>>();

  for (const path of paths) {
    const dotIndex = path.indexOf(".");
    if (dotIndex === -1) {
      leafKeys.add(path.toLowerCase());
    } else {
      const parent = path.slice(0, dotIndex).toLowerCase();
      const child = path.slice(dotIndex + 1);
      let children = nestedPaths.get(parent);
      if (!children) {
        children = new Set();
        nestedPaths.set(parent, children);
      }
      children.add(child);
    }
  }

  return redactObject(obj, leafKeys, nestedPaths, censor);
}

/**
 * Internal recursive redaction engine.
 *
 * @param obj - Object to process.
 * @param leafKeys - Set of lowercase leaf key names to redact.
 * @param nestedPaths - Map of parent key to child path sets.
 * @param censor - Replacement value.
 * @returns Redacted copy.
 */
function redactObject(
  obj: Record<string, unknown>,
  leafKeys: Set<string>,
  nestedPaths: Map<string, Set<string>>,
  censor: string,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();

    if (leafKeys.has(lowerKey)) {
      result[key] = censor;
      continue;
    }

    const childPaths = nestedPaths.get(lowerKey);
    if (childPaths && isPlainObject(value)) {
      result[key] = redactSensitiveFields(value, [...childPaths], censor);
      continue;
    }

    // Recurse into nested objects to catch deep leaf keys
    if (isPlainObject(value)) {
      result[key] = redactObject(value, leafKeys, nestedPaths, censor);
      continue;
    }

    result[key] = value;
  }

  return result;
}

// Error Serialization

/**
 * Serialize an error with recursive `Error.cause` chain support.
 *
 * Follows Pino's `stdSerializers.err` behavior:
 * - Extracts `type` (constructor name), `message`, `stack`, `code`
 * - Recursively walks `Error.cause` up to `maxDepth`
 * - Handles non-Error values (strings, objects) gracefully
 *
 * @param error - Error or unknown value to serialize.
 * @param maxDepth - Maximum cause chain depth to prevent infinite recursion.
 * @returns Serialized error structure, or `undefined` for falsy input.
 *
 * @example
 * ```typescript
 * const result = await toResultAsync(db.query(sql));
 * if (!result.ok) {
 *   logger.error('Query failed', { err: serializeError(result.error) });
 *   // error.cause chain is fully captured
 * }
 * ```
 */
export function serializeError(error: unknown, maxDepth = 5): SerializedError | undefined {
  if (error == null) {
    return;
  }
  if (maxDepth <= 0) {
    return { type: "Error", message: "[cause chain truncated]" };
  }

  if (error instanceof Error) {
    const serialized: SerializedError = {
      type: error.constructor.name,
      message: error.message,
      stack: error.stack,
    };

    // Extract error code (common in Node.js/Bun/Prisma errors)
    const code = Reflect.get(error, "code");
    if (typeof code === "string") {
      serialized.code = code;
    }

    // Recursively serialize cause chain
    if (error.cause) {
      serialized.cause = serializeError(error.cause, maxDepth - 1);
    }

    return serialized;
  }

  // Handle non-Error objects with name/message properties
  if (isPlainObject(error)) {
    return {
      type: typeof error.name === "string" ? error.name : "UnknownError",
      message: typeof error.message === "string" ? error.message : String(error),
    };
  }

  // Primitive values (string, number, etc.)
  return { type: "UnknownError", message: String(error) };
}

// Circular Reference Safe JSON Serialization

/**
 * JSON.stringify with circular reference protection and error serialization.
 *
 * Replaces circular references with `[Circular]` and serializes Error
 * instances encountered during traversal.
 *
 * @param value - Value to serialize.
 * @returns JSON string.
 */
export function safeJsonStringify(value: unknown): string {
  const seen = new WeakSet<object>();

  return JSON.stringify(value, (_key, current) => {
    if (typeof current === "object" && current !== null) {
      if (seen.has(current)) {
        return "[Circular]";
      }
      seen.add(current);
    }
    if (current instanceof Error) {
      return serializeError(current);
    }
    return current;
  });
}

// Helpers

/**
 * Check whether a value is a plain object (not an array, Date, etc.).
 *
 * @param value - Value to check.
 * @returns True when the value is a plain object.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
