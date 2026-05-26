/**
 * Eden Treaty result helpers.
 *
 * @shared/types/api/eden.ts
 */

import {
  hasRateLimitInfo,
  parseRateLimitHeaders,
  type RateLimitInfo,
} from "../../utils/rate-limit.ts";
import { HTTP_BAD_REQUEST } from "./http-status.ts";
import {
  buildApiErrorResult,
  extractEnvelopeMeta,
  extractProblemDetailsMeta,
  extractRetryAfter,
  getRecordErrorMessage,
  isRecord,
  type ProblemDetailsMeta,
} from "./internal.ts";
import type { ApiError, ApiResult, EdenResult } from "./types.ts";

/**
 * Narrow an unknown Eden error value to the `{ status, value }` shape.
 *
 * @param value - Candidate error value.
 * @returns True when the value matches Eden's `{ status, value }` structure.
 */
export function isEdenErrorShape(
  value: unknown,
): value is { status: number | unknown; value: unknown } {
  if (!isRecord(value)) {
    return false;
  }
  return "status" in value && "value" in value;
}

/**
 * Resolve rate limit metadata from an Eden result.
 *
 * @param result - Eden response result.
 * @returns Parsed rate limit info or undefined when missing.
 */
function resolveRateLimitInfo(result: {
  headers?: HeadersInit;
  response?: Response;
}): RateLimitInfo | undefined {
  const headers = result.headers ?? result.response?.headers;
  let rateLimit: RateLimitInfo | undefined;
  if (!headers) {
    return rateLimit;
  }
  const parsed = parseRateLimitHeaders(headers);
  if (hasRateLimitInfo(parsed)) {
    rateLimit = parsed;
  }
  return rateLimit;
}

/**
 * Resolve a generic fallback message for non-Eden error shapes.
 *
 * @param error - Candidate error value.
 * @returns Human-readable fallback.
 */
function extractNonEdenErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error || "Request failed";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Request failed";
}

/**
 * Resolve a best-effort message from Eden error value payloads.
 *
 * @param value - Eden error payload.
 * @param status - HTTP status.
 * @returns Human-readable message.
 */
function extractEdenErrorValueMessage(value: unknown, status: number | unknown): string {
  if (typeof value === "string") {
    return value || `Request failed (HTTP ${status})`;
  }
  if (value instanceof Error) {
    return value.message;
  }
  if (!isRecord(value)) {
    return `Request failed (HTTP ${status})`;
  }

  const envelope = extractEnvelopeMeta(value);
  if (envelope?.error) {
    return envelope.error;
  }
  if (envelope?.message) {
    return envelope.message;
  }

  const problem = extractProblemDetailsMeta(value);
  if (problem?.detail) {
    return problem.detail;
  }
  if (problem?.title) {
    return problem.title;
  }

  return getRecordErrorMessage(value) ?? `Request failed (HTTP ${status})`;
}

/**
 * Extracts a user-friendly error message from an Eden error response.
 *
 * Handles various error shapes returned by Eden/Elysia:
 * - String errors
 * - Error objects with message property
 * - API envelope errors with error/message fields
 * - Fallback to HTTP status description
 *
 * @param error - Eden error object
 * @returns Human-readable error message
 */
export function extractEdenError(error: EdenResult<unknown>["error"]): string {
  if (!error) {
    return "Unknown error";
  }

  if (!isEdenErrorShape(error)) {
    return extractNonEdenErrorMessage(error);
  }
  return extractEdenErrorValueMessage(error.value, error.status);
}

/**
 * Build an API error when Eden error metadata is unavailable.
 *
 * @param error - Raw error.
 * @param rateLimit - Optional parsed rate-limit headers.
 * @returns API error payload.
 */
function buildUnknownEdenApiError(error: unknown, rateLimit?: RateLimitInfo): ApiError {
  return buildApiErrorResult({
    error: extractEdenError(error),
    retryAfter: rateLimit?.retryAfter,
    rateLimit,
    raw: error,
  });
}

/**
 * Build an API error from a normalized Eden `{ status, value }` shape.
 *
 * @param edenError - Eden error payload.
 * @param rateLimit - Optional parsed rate-limit headers.
 * @returns API error payload.
 */
function buildNormalizedEdenApiError(
  edenError: { status: number | unknown; value: unknown },
  rateLimit?: RateLimitInfo,
): ApiError {
  const envelope = extractEnvelopeMeta(edenError.value);
  const problem = envelope ? null : extractProblemDetailsMeta(edenError.value);
  const details = envelope?.details ?? problem?.details;
  const retryAfter = extractRetryAfter(details) ?? rateLimit?.retryAfter;
  const status = typeof edenError.status === "number" ? edenError.status : problem?.status;
  const message =
    envelope?.message ??
    (problem?.detail && problem?.title && problem.detail !== problem.title
      ? problem.detail
      : undefined);

  return buildApiErrorResult({
    error:
      envelope?.error ??
      envelope?.message ??
      problem?.detail ??
      problem?.title ??
      extractEdenError(edenError),
    status,
    code: problem?.code ?? envelope?.code,
    message,
    messageKey: envelope?.messageKey,
    details,
    retryAfter,
    timestamp: envelope?.timestamp,
    correlationId: problem?.correlationId ?? envelope?.correlationId,
    requestId: problem?.requestId ?? envelope?.requestId,
    path: problem?.instance ?? envelope?.path,
    rateLimit,
    raw: edenError.value,
  });
}

/**
 * Build an API error from Problem Details payloads returned in `data`.
 *
 * @param problem - Problem details metadata.
 * @param raw - Raw data payload.
 * @param rateLimit - Optional parsed rate-limit headers.
 * @returns API error payload.
 */
function buildProblemDataApiError(
  problem: ProblemDetailsMeta,
  raw: unknown,
  rateLimit?: RateLimitInfo,
): ApiError {
  const retryAfter = extractRetryAfter(problem.details) ?? rateLimit?.retryAfter;
  const message =
    problem.detail && problem.title && problem.detail !== problem.title
      ? problem.detail
      : undefined;

  return buildApiErrorResult({
    error: problem.detail ?? problem.title ?? "Request failed",
    status: problem.status,
    code: problem.code,
    message,
    details: problem.details,
    retryAfter,
    correlationId: problem.correlationId,
    requestId: problem.requestId,
    path: problem.instance,
    rateLimit,
    raw,
  });
}

/**
 * Build an API error from envelope payloads returned in `data`.
 *
 * @param envelope - Extracted envelope metadata.
 * @param raw - Raw data payload.
 * @param rateLimit - Optional parsed rate-limit headers.
 * @returns API error payload.
 */
function buildEnvelopeDataApiError(
  envelope: ReturnType<typeof extractEnvelopeMeta>,
  raw: unknown,
  rateLimit?: RateLimitInfo,
): ApiError {
  const retryAfter = extractRetryAfter(envelope?.details) ?? rateLimit?.retryAfter;
  return buildApiErrorResult({
    error: envelope?.error || envelope?.message || "Request failed",
    code: envelope?.code,
    message: envelope?.message,
    messageKey: envelope?.messageKey,
    details: envelope?.details,
    retryAfter,
    timestamp: envelope?.timestamp,
    correlationId: envelope?.correlationId,
    requestId: envelope?.requestId,
    path: envelope?.path,
    rateLimit,
    raw,
  });
}

/**
 * Unwraps an Eden Treaty result into a standardized ApiResult.
 *
 * Handles the common patterns:
 * 1. Eden error (network/HTTP errors)
 * 2. Empty response
 * 3. API envelope with ok: false
 * 4. Successful response with data
 *
 * T - Expected data type
 * @param result - Eden Treaty result object
 * @returns Standardized ApiResult with discriminated ok field
 *
 * @example
 * ```typescript
 * const log = createLogger('api');
 * const result = await api.api.v1.cases.get();
 * const unwrapped = unwrapEden(result);
 *
 * if (unwrapped.ok) {
 *   // TypeScript knows unwrapped.data exists
 *   log.info(unwrapped.data);
 * } else {
 *   // TypeScript knows unwrapped.error exists
 *   showError(unwrapped.error);
 * }
 * ```
 */
export function unwrapEden<T>(result: {
  data: T | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<NonNullable<T>>;
/**
 * Function unwrapEden.
 */
export function unwrapEden<T>(result: {
  data: unknown | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<NonNullable<T>>;
/**
 * Function unwrapEden.
 */
export function unwrapEden<T>(result: {
  data: unknown | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<NonNullable<T>> {
  const normalizedError = isEdenErrorShape(result.error) ? result.error : null;
  const rateLimit = resolveRateLimitInfo(result);

  if (result.error) {
    return normalizedError
      ? buildNormalizedEdenApiError(normalizedError, rateLimit)
      : buildUnknownEdenApiError(result.error, rateLimit);
  }

  if (!result.data) {
    return buildApiErrorResult({ error: "Empty response from server" });
  }

  const problemFromData = extractProblemDetailsMeta(result.data);
  if (problemFromData?.status && problemFromData.status >= HTTP_BAD_REQUEST) {
    return buildProblemDataApiError(problemFromData, result.data, rateLimit);
  }

  const maybeEnvelope = extractEnvelopeMeta(result.data);
  if (maybeEnvelope?.ok === false) {
    return buildEnvelopeDataApiError(maybeEnvelope, result.data, rateLimit);
  }

  return {
    ok: true,
    data: result.data as NonNullable<T>,
  };
}

/**
 * Unwraps an Eden result and extracts nested data field if present.
 *
 * Many Elysia endpoints return `{ ok: true, data: { ... } }` where
 * the actual payload is nested inside `data`. This helper extracts it.
 *
 * T - Expected nested data type
 * @param result - Eden Treaty result object
 * @returns ApiResult with extracted nested data
 *
 * @example
 * ```typescript
 * // Server returns: { ok: true, data: { id: '123', name: 'Test' } }
 * const log = createLogger('api');
 * const result = await api.api.v1.cases({ id }).get();
 * const unwrapped = unwrapEdenData<CaseDetail>(result);
 *
 * if (unwrapped.ok) {
 *   log.info(unwrapped.data.id); // '123'
 * }
 * ```
 */
export function unwrapEdenData<T>(result: {
  data: unknown | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<T> {
  const base = unwrapEden(result);

  if (!base.ok) {
    // Propagate error result
    return base;
  }

  /**
   * Extract nested `data` payload when the server uses the `{ ok: true, data: ... }` envelope.
   *
   * Eden route typings can vary per endpoint/status-code, so we accept `unknown` here and
   * perform a safe structural extraction.
   */
  const value: unknown = base.data;
  if (isRecord(value)) {
    if (value.ok === true && "data" in value) {
      return { ok: true, data: value.data as T };
    }
  }

  // Fallback: treat the payload as the direct response body.
  return { ok: true, data: value as T };
}
