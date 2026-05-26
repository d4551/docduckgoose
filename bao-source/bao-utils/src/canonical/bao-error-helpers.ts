/**
 * Canonical helper constructors and normalizers for `BaoError`.
 *
 * Companion to `./bao-error` which holds the type, kind discriminator,
 * status table, `buildBaoError`, and `wrapBaoError`. This module
 * concentrates the ergonomic factory surface (`createBaoError`,
 * `createTypedBaoError`, kind-specific constructors) and the
 * `normalizeBaoError` adapter for unknown-shaped values surfacing at
 * runtime boundaries.
 *
 * @baohaus/bao-utils/canonical/bao-error-helpers
 */

import type { BaoError, BaoErrorKind } from "./bao-error";

const HTTP_INTERNAL_SERVER_ERROR = 500;

/** Construct a minimal `BaoError` from explicit code, message, and status. */
export function createBaoError(
  code: string,
  message: string,
  status: number,
  details?: Record<string, unknown>,
): BaoError {
  if (details === undefined) {
    return { code, message, status };
  }

  return { code, details, message, status };
}

/** Construct a fully typed `BaoError` with explicit kind and optional retryable/details. */
export function createTypedBaoError(input: {
  readonly code: string;
  readonly message: string;
  readonly status: number;
  readonly kind: BaoErrorKind;
  readonly retryable?: boolean;
  readonly details?: Record<string, unknown>;
}): BaoError {
  return {
    ...(input.details === undefined ? {} : { details: input.details }),
    ...(input.retryable === undefined ? {} : { retryable: input.retryable }),
    code: input.code,
    kind: input.kind,
    message: input.message,
    status: input.status,
  };
}

/** Construct a `BaoError` with `kind: "provider"`. */
export function createProviderError(
  code: string,
  message: string,
  status: number,
  options: {
    readonly retryable?: boolean;
    readonly details?: Record<string, unknown>;
  } = {},
): BaoError {
  return createTypedBaoError({
    code,
    kind: "provider",
    message,
    status,
    ...(options.details === undefined ? {} : { details: options.details }),
    ...(options.retryable === undefined ? {} : { retryable: options.retryable }),
  });
}

/** Construct a `BaoError` with `kind: "tool"`. */
export function createToolError(
  code: string,
  message: string,
  status: number,
  options: {
    readonly retryable?: boolean;
    readonly details?: Record<string, unknown>;
  } = {},
): BaoError {
  return createTypedBaoError({
    code,
    kind: "tool",
    message,
    status,
    ...(options.details === undefined ? {} : { details: options.details }),
    ...(options.retryable === undefined ? {} : { retryable: options.retryable }),
  });
}

/** Construct a `BaoError` with `kind: "config"` and HTTP 500 default. */
export function createConfigError(
  code: string,
  message: string,
  details?: Record<string, unknown>,
): BaoError {
  return createTypedBaoError({
    code,
    kind: "config",
    message,
    status: HTTP_INTERNAL_SERVER_ERROR,
    ...(details === undefined ? {} : { details }),
  });
}

/** Extract a string message from any value; preserves `Error.message`. */
export function messageFromUnknown(value: unknown): string {
  if (value instanceof Error) {
    return value.message;
  }

  return String(value);
}

/** Extract structured logging details from an unknown value. */
export function errorDetailsFromUnknown(value: unknown): Record<string, unknown> | undefined {
  if (value instanceof Error) {
    return {
      name: value.name,
      stack: value.stack,
    };
  }

  if (isRecord(value)) {
    return value;
  }

  return value === undefined ? undefined : { value };
}

type NormalizeFallback = {
  readonly code?: string;
  readonly kind?: BaoErrorKind;
  readonly message?: string;
  readonly retryable?: boolean;
  readonly status?: number;
};

function normalizeFromRecord(value: Record<string, unknown>): BaoError {
  const details = isRecord(value.details) ? value.details : undefined;
  const retryable = typeof value.retryable === "boolean" ? value.retryable : undefined;
  return {
    code: typeof value.code === "string" ? value.code : "INTERNAL",
    kind: isBaoErrorKind(value.kind) ? value.kind : "internal",
    message: typeof value.message === "string" ? value.message : "Unknown error",
    status: typeof value.status === "number" ? value.status : HTTP_INTERNAL_SERVER_ERROR,
    ...(details === undefined ? {} : { details }),
    ...(retryable === undefined ? {} : { retryable }),
  };
}

function normalizeFromFallback(value: unknown, fallback: NormalizeFallback): BaoError {
  const details = errorDetailsFromUnknown(value);
  return createTypedBaoError({
    code: fallback.code ?? "INTERNAL",
    kind: fallback.kind ?? "internal",
    message: fallback.message ?? messageFromUnknown(value),
    status: fallback.status ?? HTTP_INTERNAL_SERVER_ERROR,
    ...(details === undefined ? {} : { details }),
    ...(fallback.retryable === undefined ? {} : { retryable: fallback.retryable }),
  });
}

/**
 * Normalize an unknown value into a `BaoError`. Records that already carry
 * `code`/`message`/`status` are coerced; other values fall back to the
 * supplied defaults plus structured `details`.
 */
export function normalizeBaoError(value: unknown, fallback: NormalizeFallback = {}): BaoError {
  if (isRecord(value) && "code" in value && "message" in value && "status" in value) {
    return normalizeFromRecord(value);
  }

  return normalizeFromFallback(value, fallback);
}

/** True when the error is explicitly retryable, or carries a 5xx status. */
export function isRetryableBaoError(error: BaoError): boolean {
  return error.retryable ?? error.status >= HTTP_INTERNAL_SERVER_ERROR;
}

const KNOWN_BAO_ERROR_KINDS: ReadonlySet<string> = new Set<string>([
  "api",
  "auth",
  "capability-denied",
  "config",
  "conflict",
  "internal",
  "io",
  "not-found",
  "provider",
  "sandbox-quota-exceeded",
  "tool",
  "upstream",
  "validation",
]);

function isBaoErrorKind(value: unknown): value is BaoErrorKind {
  return typeof value === "string" && KNOWN_BAO_ERROR_KINDS.has(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
