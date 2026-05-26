/**
 * Public API result and error types.
 *
 * @shared/types/api/types.ts
 */

import type { ApiEnvelopeResponse } from "../../schemas/api-response.schemas.ts";
import type { RateLimitInfo } from "../../utils/rate-limit.ts";

/**
 * Standardized API result type for all Eden Treaty calls.
 *
 * Provides a discriminated union that makes error handling consistent
 * and type-safe across all composables.
 *
 * T - The expected data type on success
 *
 * @example
 * ```typescript
 * const log = createLogger('api');
 * const result: ApiResult<User> = await fetchUser(id);
 * if (result.ok) {
 *   log.info(result.data.name); // Type-safe access
 * } else {
 *   log.error(result.error);
 * }
 * ```
 */
export type ApiError = {
  ok: false;
  error: string;
  status?: number;
  code?: string;
  message?: string;
  messageKey?: string;
  details?: unknown;
  /** Rate limit retry delay in seconds (when provided by headers or payload). */
  retryAfter?: number;
  /** ISO 8601 timestamp of when the error occurred */
  timestamp?: string;
  /** Request correlation ID for distributed tracing */
  correlationId?: string;
  /** Request ID for tracing when emitted separately. */
  requestId?: string;
  /** Request path that caused the error */
  path?: string;
  /** Parsed rate limit headers when available. */
  rateLimit?: RateLimitInfo;
  raw?: unknown;
};

/** Inferred type from the ApiResult schema. */
export type ApiResult<T> = { ok: true; data: T } | ApiError;

/**
 * Normalized API error metadata for UI hydration.
 */
export interface NormalizedApiError {
  /** Machine-readable error code when available. */
  code?: string;
  /** Human-readable error message when available. */
  message?: string;
  /** HTTP status code when available. */
  status?: number;
  /** Retry delay in milliseconds (derived from rate limit metadata). */
  retryAfterMs?: number;
  /** Structured details payload (validation, context). */
  details?: unknown;
  /** Field-level validation errors when present. */
  fields?: Record<string, string[]>;
  /** Correlation ID for tracing. */
  correlationId?: string;
  /** Request ID for tracing. */
  requestId?: string;
  /** Request path that caused the error. */
  path?: string;
  /** Raw payload used for normalization. */
  raw?: unknown;
}

/**
 * Standard API response envelope from Elysia endpoints.
 *
 * Most Elysia endpoints return this structure with `ok: true/false`
 * and either `data` or `error` fields.
 */
export type ApiEnvelope<T = unknown> = Omit<ApiEnvelopeResponse, "data"> & {
  /** Result data if successful. */
  data?: T;
};

/**
 * Eden Treaty result shape (simplified for type extraction).
 *
 * Eden returns `{ data, error }` where error contains status and value.
 * This interface is compatible with Eden's TreatyResponse type.
 */
export interface EdenResult<T> {
  data: T | null;
  /**
   * Eden treaty error.
   *
   * Some Eden versions type this as `unknown` even though the runtime shape is commonly
   * `{ status, value }`. We accept `unknown` here and normalize it in helpers.
   */
  error:
    | {
        status: number | unknown;
        value: unknown;
      }
    | unknown
    | null;
  /** Optional response headers from Eden. */
  headers?: HeadersInit;
  /** Optional Response object from Eden. */
  response?: Response;
}

/**
 * Error handler callbacks by HTTP status code.
 */
export type StatusHandlers = {
  /** Handler for 400 Bad Request errors */
  onBadRequest?: (error: ApiError) => void;
  /** Handler for 401 Unauthorized errors */
  onUnauthorized?: (error: ApiError) => void;
  /** Handler for 403 Forbidden errors */
  onForbidden?: (error: ApiError) => void;
  /** Handler for 404 Not Found errors */
  onNotFound?: (error: ApiError) => void;
  /** Handler for 409 Conflict errors */
  onConflict?: (error: ApiError) => void;
  /** Handler for 422 Unprocessable Entity errors */
  onValidationError?: (error: ApiError) => void;
  /** Handler for 429 Too Many Requests errors */
  onRateLimited?: (error: ApiError) => void;
  /** Handler for 5xx server errors */
  onServerError?: (error: ApiError) => void;
  /** Handler for network/connection errors (no status) */
  onNetworkError?: (error: ApiError) => void;
  /** Fallback handler for unhandled status codes */
  onUnknown?: (error: ApiError) => void;
};
