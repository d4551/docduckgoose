/**
 * Status-based API error routing and predicates.
 *
 * @shared/types/api/status.ts
 */

import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR_MAX,
  HTTP_SERVER_ERROR_MIN,
  HTTP_STATUS_MESSAGE_KEYS,
  HTTP_STATUS_UNKNOWN_KEY,
  HTTP_TOO_MANY,
  HTTP_UNAUTHORIZED,
  HTTP_UNPROCESSABLE,
} from "./http-status.ts";
import type { ApiError, StatusHandlers } from "./types.ts";

type StatusHandler = (error: ApiError) => void;

function callStatusHandler(
  error: ApiError,
  primary: StatusHandler | undefined,
  fallback: StatusHandler | undefined,
): void {
  if (primary) {
    primary(error);
    return;
  }
  fallback?.(error);
}

/**
 * Route an API error to the appropriate status-based handler.
 *
 * Provides a type-safe switch/case pattern for handling Eden API errors
 * based on HTTP status codes. This is the recommended pattern from
 * Elysia/Eden Treaty documentation.
 *
 * @param error - The API error to handle
 * @param handlers - Object mapping status categories to handler functions
 *
 * @example
 * ```typescript
 * const result = await api.api.v1.cases.get();
 * const unwrapped = unwrapEden(result);
 *
 * if (!unwrapped.ok) {
 *   handleApiError(unwrapped, {
 *     onUnauthorized: () => router.push('/login'),
 *     onForbidden: (e) => toast.error('Access denied'),
 *     onNotFound: () => toast.warning('Case not found'),
 *     onValidationError: (e) => showValidationErrors(e.details),
 *     onServerError: () => toast.error('Server error, please retry'),
 *     onUnknown: (e) => toast.error(e.error),
 *   });
 * }
 * ```
 */
/** Route an API error to the matching status handler callback. */
export function handleApiError(error: ApiError, handlers: StatusHandlers): void {
  const { status } = error;

  // Network/connection errors (no status)
  if (!status) {
    callStatusHandler(error, handlers.onNetworkError, handlers.onUnknown);
    return;
  }

  // Route by status code category
  switch (status) {
    case HTTP_BAD_REQUEST:
      callStatusHandler(error, handlers.onBadRequest, handlers.onUnknown);
      break;
    case HTTP_UNAUTHORIZED:
      callStatusHandler(error, handlers.onUnauthorized, handlers.onUnknown);
      break;
    case HTTP_FORBIDDEN:
      callStatusHandler(error, handlers.onForbidden, handlers.onUnknown);
      break;
    case HTTP_NOT_FOUND:
      callStatusHandler(error, handlers.onNotFound, handlers.onUnknown);
      break;
    case HTTP_CONFLICT:
      callStatusHandler(error, handlers.onConflict, handlers.onUnknown);
      break;
    case HTTP_UNPROCESSABLE:
      callStatusHandler(error, handlers.onValidationError, handlers.onUnknown);
      break;
    case HTTP_TOO_MANY:
      callStatusHandler(error, handlers.onRateLimited, handlers.onUnknown);
      break;
    default:
      if (status >= HTTP_SERVER_ERROR_MIN && status < HTTP_SERVER_ERROR_MAX) {
        callStatusHandler(error, handlers.onServerError, handlers.onUnknown);
      } else {
        handlers.onUnknown?.(error);
      }
  }
}

/**
 * Get a user-facing message or i18n key for an API error.
 *
 * Prioritizes:
 * 1. Server-provided error message (may already be translated)
 * 2. Error `messageKey` (i18n key from server)
 * 3. HTTP status code i18n key from {@link HTTP_STATUS_MESSAGE_KEYS}
 * 4. Generic fallback i18n key
 *
 * Consumers should pass the result through `translate()` when the
 * returned value looks like an i18n key (starts with `httpStatus.`).
 *
 * @param error - The API error.
 * @returns Server message or i18n key.
 */
export function getErrorMessage(error: ApiError): string {
  if (error.error && error.error !== "Unknown error") {
    return error.error;
  }

  if (error.messageKey) {
    return error.messageKey;
  }

  if (error.status) {
    const statusKey = HTTP_STATUS_MESSAGE_KEYS[error.status];
    if (statusKey) {
      return statusKey;
    }
  }

  return HTTP_STATUS_UNKNOWN_KEY;
}

/**
 * Check if an error is a client error (4xx).
 *
 * @param error - The API error to check
 * @returns True if the error is a client error (4xx)
 */
export function isClientError(error: ApiError): boolean {
  return (
    error.status !== undefined &&
    error.status >= HTTP_BAD_REQUEST &&
    error.status < HTTP_SERVER_ERROR_MIN
  );
}

/**
 * Check if an error is a server error (5xx).
 *
 * @param error - The API error to check
 * @returns True if the error is a server error (5xx)
 */
export function isServerError(error: ApiError): boolean {
  return (
    error.status !== undefined &&
    error.status >= HTTP_SERVER_ERROR_MIN &&
    error.status < HTTP_SERVER_ERROR_MAX
  );
}

/**
 * Check if an error is a network/connection error.
 *
 * @param error - The API error to check
 * @returns True if the error is a network error (no status)
 */
export function isNetworkError(error: ApiError): boolean {
  return error.status === undefined;
}

/**
 * Check if an error indicates authentication is required.
 *
 * @param error - The API error to check
 * @returns True if authentication is required (401)
 */
export function isAuthError(error: ApiError): boolean {
  return error.status === HTTP_UNAUTHORIZED;
}

/**
 * Check if an error indicates the user lacks permission.
 *
 * @param error - The API error to check
 * @returns True if permission is denied (403)
 */
export function isPermissionError(error: ApiError): boolean {
  return error.status === HTTP_FORBIDDEN;
}

/**
 * Check if an error indicates rate limiting.
 *
 * @param error - The API error to check
 * @returns True if rate limited (429)
 */
export function isRateLimitError(error: ApiError): boolean {
  return error.status === HTTP_TOO_MANY;
}
