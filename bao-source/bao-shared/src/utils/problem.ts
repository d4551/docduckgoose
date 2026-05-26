/**
 * RFC 9457 Problem Details helpers.
 *
 * Helpers for building and emitting RFC 9457 Problem Details JSON objects consistently across
 * the server and bunbuddies.
 *
 * @shared/utils/problem
 */

import type { ProblemDetails } from "../schemas/problem.schemas";
import { isRecord } from "./type-guards";

const HTTP_CLIENT_ERROR_MIN = 400;
const HTTP_CLIENT_ERROR_MAX = 500;
const HTTP_SERVER_ERROR_MIN = 500;
const HTTP_SERVER_ERROR_MAX = 600;
const HTTP_REQUEST_TIMEOUT = 408;
const HTTP_TOO_MANY = 429;

/**
 * Minimal response setter shape for applying status and headers.
 */
export type ProblemSetLike = {
  status?: number | string;
  headers?: unknown;
};

/**
 * Derive a stable problem type URI from a machine code.
 *
 * @param code - Machine-readable code.
 * @returns RFC 9457 `type` URI reference.
 */
export function problemTypeFromCode(code: string): string {
  const normalized = code.trim().toUpperCase() || "INTERNAL_ERROR";
  return `urn:baohaus:problem:${normalized}`;
}

/**
 * Derive a stable, human-readable title from an error code.
 *
 * @param code - Machine-readable error code.
 * @returns Stable title string.
 */
export function problemTitleFromCode(code: string): string {
  const normalized = code.trim().toUpperCase();
  if (normalized === "VALIDATION_ERROR" || normalized === "VALIDATION") {
    return "Validation failed";
  }
  if (normalized === "AUTH_REQUIRED") {
    return "Authentication required";
  }
  if (normalized === "FORBIDDEN") {
    return "Forbidden";
  }
  if (normalized === "RESOURCE_NOT_FOUND" || normalized === "NOT_FOUND") {
    return "Not found";
  }
  if (normalized === "FETCH_UNAVAILABLE" || normalized === "SERVICE_UNAVAILABLE") {
    return "Service unavailable";
  }
  if (normalized === "CONFLICT") {
    return "Conflict";
  }
  return "Request failed";
}

/**
 * Build a Problem Details JSON object.
 *
 * @param input - Problem fields and extensions.
 * @returns Problem Details payload.
 */
export function createProblemDetails(input: {
  status: number;
  code: string;
  detail: string;
  title?: string;
  type?: string;
  instance?: string;
  details?: unknown;
  service?: string;
  correlationId?: string;
  requestId?: string;
  extensions?: Record<string, unknown>;
}): ProblemDetails {
  const type = input.type ?? problemTypeFromCode(input.code);
  const title = input.title ?? problemTitleFromCode(input.code);

  const problem: ProblemDetails = {
    type,
    title,
    status: input.status,
    detail: input.detail,
    ...(input.instance ? { instance: input.instance } : {}),
    code: input.code,
    ...(input.details === undefined ? {} : { details: input.details }),
    ...(input.service ? { service: input.service } : {}),
    ...(input.correlationId ? { correlationId: input.correlationId } : {}),
    ...(input.requestId ? { requestId: input.requestId } : {}),
    ...(input.extensions ?? {}),
  };

  return problem;
}

/**
 * Apply Problem Details headers to an Elysia-like response setter.
 *
 * @param set - Response setter.
 */
export function applyProblemHeaders(set: ProblemSetLike): void {
  const headerValue: string = "application/problem+json";
  if (!set.headers) {
    set.headers = { "Content-Type": headerValue };
    return;
  }
  if (set.headers instanceof Headers) {
    set.headers.set("Content-Type", headerValue);
    return;
  }
  if (isRecord(set.headers)) {
    set.headers["Content-Type"] = headerValue;
    set.headers["content-type"] = headerValue;
  }
}

/**
 * Type guard for RFC 9457 Problem Details.
 *
 * Validates that the given value conforms to the minimal Problem Details
 * structure required by RFC 9457 (type URI and status code).
 *
 * @param value - Value to check.
 * @returns True if value is a valid Problem Details object.
 *
 * @example
 * ```typescript
 * import { fetchWithRetry } from '@baohaus/bao-shared/utils/http-client';
 *
 * const response = await fetchWithRetry('/api/resource', undefined, {
 *   retryOnStatus: false,
 * });
 * const data = await response.json();
 *
 * const log = createLogger('problem');
 * if (isProblemDetails(data)) {
 *   log.error(`Error ${data.status}: ${data.detail}`);
 * }
 * ```
 */
export function isProblemDetails(value: unknown): value is ProblemDetails {
  if (!isRecord(value)) {
    return false;
  }

  // RFC 9457 requires 'type' (string URI) and 'status' (number)
  if (typeof value.type !== "string") {
    return false;
  }

  if (typeof value.status !== "number") {
    return false;
  }

  // Optional but expected fields should be correct types if present
  if (value.title !== undefined && typeof value.title !== "string") {
    return false;
  }

  if (value.detail !== undefined && typeof value.detail !== "string") {
    return false;
  }

  if (value.instance !== undefined && typeof value.instance !== "string") {
    return false;
  }

  return true;
}

/**
 * Extract a user-friendly error message from various error types.
 *
 * Prioritizes Problem Details `detail` field, falls back to `title`,
 * then standard Error message, string values, and finally a generic message.
 *
 * @param error - Error value of any type.
 * @returns Human-readable error message.
 *
 * @example
 * ```typescript
 * const result = await toResultAsync(api.createResource(data));
 * if (!result.ok) {
 *   toast.error(extractErrorMessage(result.error));
 * }
 * ```
 */
export function extractErrorMessage(error: unknown): string {
  // RFC 9457 Problem Details
  if (isProblemDetails(error)) {
    const problem: { detail?: string; title?: string } = error;
    return problem.detail ?? problem.title ?? "An error occurred";
  }

  // Standard Error object — re-check after narrowing since ProblemDetails is opaque
  const candidate: unknown = error;
  if (candidate instanceof Error) {
    return candidate.message;
  }

  // Plain string
  if (typeof error === "string") {
    return error;
  }

  // Object with message property (common pattern)
  if (isRecord(error) && typeof error.message === "string") {
    return error.message;
  }

  return "An unexpected error occurred";
}

/**
 * Check if an HTTP status code indicates a client error (4xx).
 *
 * @param status - HTTP status code.
 * @returns True if status is in 400-499 range.
 */
export function isClientError(status: number): boolean {
  return status >= HTTP_CLIENT_ERROR_MIN && status < HTTP_CLIENT_ERROR_MAX;
}

/**
 * Check if an HTTP status code indicates a server error (5xx).
 *
 * @param status - HTTP status code.
 * @returns True if status is in 500-599 range.
 */
export function isServerError(status: number): boolean {
  return status >= HTTP_SERVER_ERROR_MIN && status < HTTP_SERVER_ERROR_MAX;
}

/**
 * Check if a Problem Details error is retryable.
 *
 * Server errors (5xx) and certain client errors (408 Request Timeout,
 * 429 Too Many Requests) are considered retryable.
 *
 * @param error - Problem Details object or status code.
 * @returns True if the error is potentially retryable.
 */
export function isRetryableError(error: ProblemDetails | number): boolean {
  const status = typeof error === "number" ? error : error.status;

  // If status is undefined, we can't determine retryability
  if (status === undefined) {
    return false;
  }

  // Server errors are retryable
  if (isServerError(status)) {
    return true;
  }

  // Specific client errors that are retryable
  const retryableClientErrors: readonly number[] = [HTTP_REQUEST_TIMEOUT, HTTP_TOO_MANY];

  return retryableClientErrors.includes(status);
}
