/**
 * Canonical BaoError shape, kind discriminator, and HTTP status mapping.
 *
 * This module is the single source of truth for the cross-app `BaoError`
 * type. Every Baohaus package and app MUST import `BaoError`, `BaoErrorKind`,
 * `kindToStatus`, `resolveBaoErrorStatus`, `buildBaoError`, and
 * `wrapBaoError` from this submodule. Helper constructors and the API
 * envelope live in the sibling submodules `./bao-error-helpers` and
 * `./bao-error-api`.
 *
 * @baohaus/bao-utils/canonical/bao-error
 */

/**
 * BaoError discriminator. Stable across HTTP, RPC, queue, and CLI layers.
 *
 * Values:
 * - `api`           — Generic API error surfaced to a caller.
 * - `auth`          — Authentication / authorization failure.
 * - `capability-denied` — Sandbox capability or grant denied at policy gate.
 * - `config`        — Misconfiguration of an app, package, or runtime.
 * - `conflict`      — Resource conflict (e.g. unique constraint, version).
 * - `internal`      — Unexpected internal error (the catch-all).
 * - `io`            — Filesystem, network, database, or IPC failure.
 * - `not-found`     — Requested resource does not exist.
 * - `provider`      — Upstream model / SaaS / third-party provider failure.
 * - `sandbox-quota-exceeded` — Sandbox runtime exceeded a budget cap.
 * - `tool`          — Agent tool invocation failure.
 * - `upstream`      — Generic upstream service failure (non-provider).
 * - `validation`    — Input failed schema or business validation.
 */
export type BaoErrorKind =
  | "api"
  | "auth"
  | "capability-denied"
  | "config"
  | "conflict"
  | "internal"
  | "io"
  | "not-found"
  | "provider"
  | "sandbox-quota-exceeded"
  | "tool"
  | "upstream"
  | "validation";

/**
 * Canonical BaoError shape.
 *
 * Design notes:
 * - `code` is a machine-readable error identifier (SCREAMING_SNAKE_CASE).
 * - `message` is a developer-facing description; user-facing copy MUST be
 *   sourced from the owning i18n module via `messageKey` in `details`.
 * - `status` mirrors the HTTP status the server should return when this
 *   error escapes a request boundary; `kindToStatus` provides a default
 *   when callers do not specify.
 * - `kind` is the canonical discriminator (optional only for back-compat;
 *   new code MUST set it).
 * - `cause` chains a wrapping error to its underlying cause, preserving
 *   context across layer boundaries.
 * - `details` carries structured context for logging (sanitized — no PII,
 *   no secrets, no auth material).
 */
export type BaoError = {
  readonly code: string;
  readonly message: string;
  readonly status: number;
  readonly kind?: BaoErrorKind;
  readonly retryable?: boolean;
  readonly cause?: BaoError;
  readonly details?: Record<string, unknown>;
};

const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_CONFLICT = 409;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_BAD_GATEWAY = 502;
const HTTP_SERVICE_UNAVAILABLE = 503;

/**
 * Canonical mapping from `BaoErrorKind` to default HTTP status.
 *
 * HTTP plugins consume this table at the framework error boundary so every
 * route surfaces the same status for the same kind.
 */
export const kindToStatus: Readonly<Record<BaoErrorKind, number>> = {
  api: HTTP_INTERNAL_SERVER_ERROR,
  auth: HTTP_UNAUTHORIZED,
  "capability-denied": HTTP_FORBIDDEN,
  config: HTTP_INTERNAL_SERVER_ERROR,
  conflict: HTTP_CONFLICT,
  internal: HTTP_INTERNAL_SERVER_ERROR,
  io: HTTP_BAD_GATEWAY,
  "not-found": HTTP_NOT_FOUND,
  provider: HTTP_SERVICE_UNAVAILABLE,
  "sandbox-quota-exceeded": HTTP_TOO_MANY_REQUESTS,
  tool: HTTP_INTERNAL_SERVER_ERROR,
  upstream: HTTP_BAD_GATEWAY,
  validation: HTTP_BAD_REQUEST,
} as const;

/**
 * Resolve the HTTP status for a `BaoError`, preferring the explicit
 * `status` field and falling back to `kindToStatus[kind]`.
 */
export function resolveBaoErrorStatus(error: BaoError): number {
  if (typeof error.status === "number") {
    return error.status;
  }
  if (error.kind !== undefined) {
    return kindToStatus[error.kind];
  }
  return HTTP_INTERNAL_SERVER_ERROR;
}

/**
 * Construct a `BaoError` with strict required fields. Optional fields are
 * elided from the returned object when not provided so that equality checks
 * and JSON serialization remain stable.
 */
export function buildBaoError(input: {
  readonly code: string;
  readonly message: string;
  readonly kind: BaoErrorKind;
  readonly status?: number;
  readonly retryable?: boolean;
  readonly cause?: BaoError;
  readonly details?: Record<string, unknown>;
}): BaoError {
  const status = input.status ?? kindToStatus[input.kind];
  return {
    code: input.code,
    kind: input.kind,
    message: input.message,
    status,
    ...(input.retryable === undefined ? {} : { retryable: input.retryable }),
    ...(input.cause === undefined ? {} : { cause: input.cause }),
    ...(input.details === undefined ? {} : { details: input.details }),
  };
}

/**
 * Wrap an existing `BaoError` with additional context, preserving the
 * original via the `cause` chain.
 */
export function wrapBaoError(
  cause: BaoError,
  overrides: {
    readonly code?: string;
    readonly message?: string;
    readonly kind?: BaoErrorKind;
    readonly status?: number;
    readonly details?: Record<string, unknown>;
  },
): BaoError {
  const kind = overrides.kind ?? cause.kind ?? "internal";
  const status = overrides.status ?? cause.status ?? kindToStatus[kind];
  return {
    cause,
    code: overrides.code ?? cause.code,
    kind,
    message: overrides.message ?? cause.message,
    status,
    ...(overrides.details === undefined ? {} : { details: overrides.details }),
  };
}
