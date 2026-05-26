/**
 * API status-based error handling, message resolution, and validation extraction.
 * Extracted from api.ts to keep module size under 400 lines.
 */

import type { ApiError } from "./api-parsing";
import { isRecord } from "./api-parsing";

const LEADING_SLASH_RE: RegExp = /^\//;
const ALL_SLASHES_RE: RegExp = /\//g;
const HTTP_UNPROCESSABLE = 422;

export const HTTP_STATUS_MESSAGE_KEYS: Readonly<Record<number, string>> = {
  400: "httpStatus.400",
  401: "httpStatus.401",
  403: "httpStatus.403",
  404: "httpStatus.404",
  408: "httpStatus.408",
  409: "httpStatus.409",
  410: "httpStatus.410",
  422: "httpStatus.422",
  429: "httpStatus.429",
  500: "httpStatus.500",
  502: "httpStatus.502",
  503: "httpStatus.503",
  504: "httpStatus.504",
};

export const HTTP_STATUS_UNKNOWN_KEY: "httpStatus.unknown" = "httpStatus.unknown" as const;

export type StatusHandlers = {
  onBadRequest?: (error: ApiError) => void;
  onUnauthorized?: (error: ApiError) => void;
  onForbidden?: (error: ApiError) => void;
  onNotFound?: (error: ApiError) => void;
  onConflict?: (error: ApiError) => void;
  onValidationError?: (error: ApiError) => void;
  onRateLimited?: (error: ApiError) => void;
  onServerError?: (error: ApiError) => void;
  onNetworkError?: (error: ApiError) => void;
  onUnknown?: (error: ApiError) => void;
};

type StatusHandler = (error: ApiError) => void;

const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_CONFLICT = 409;
const HTTP_TOO_MANY = 429;
const HTTP_SERVER_ERROR_MIN = 500;
const HTTP_SERVER_ERROR_MAX = 600;

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

export function handleApiError(error: ApiError, handlers: StatusHandlers): void {
  const { status } = error;
  if (!status) {
    callStatusHandler(error, handlers.onNetworkError, handlers.onUnknown);
    return;
  }
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

export function getErrorMessage(error: ApiError): string {
  if (error.error && error.error !== "Unknown error") return error.error;
  if (error.messageKey) return error.messageKey;
  if (error.status) {
    const statusKey = HTTP_STATUS_MESSAGE_KEYS[error.status];
    if (statusKey) return statusKey;
  }
  return HTTP_STATUS_UNKNOWN_KEY;
}

export function isClientError(error: ApiError): boolean {
  return (
    error.status !== undefined &&
    error.status >= HTTP_BAD_REQUEST &&
    error.status < HTTP_SERVER_ERROR_MIN
  );
}

export function isServerError(error: ApiError): boolean {
  return (
    error.status !== undefined &&
    error.status >= HTTP_SERVER_ERROR_MIN &&
    error.status < HTTP_SERVER_ERROR_MAX
  );
}

export function isNetworkError(error: ApiError): boolean {
  return error.status === undefined;
}

export function isAuthError(error: ApiError): boolean {
  return error.status === HTTP_UNAUTHORIZED;
}

export function isPermissionError(error: ApiError): boolean {
  return error.status === HTTP_FORBIDDEN;
}

export function isRateLimitError(error: ApiError): boolean {
  return error.status === HTTP_TOO_MANY;
}

function extractTypeboxValidationErrors(
  details: Record<string, unknown>,
): Record<string, string[]> | null {
  if (!Array.isArray(details.errors)) return null;
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of details.errors) {
    if (!isRecord(issue)) continue;
    if (!("path" in issue && "message" in issue)) continue;
    const path = String(issue.path).replace(LEADING_SLASH_RE, "").replace(ALL_SLASHES_RE, ".");
    const fieldKey = path || "root";
    const message = String(issue.message);
    const current = fieldErrors[fieldKey] ?? [];
    current.push(message);
    fieldErrors[fieldKey] = current;
  }
  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
}

function extractDirectValidationErrors(
  details: Record<string, unknown>,
): Record<string, string[]> | null {
  const fieldErrors: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(details)) {
    if (typeof value === "string") {
      fieldErrors[key] = [value];
      continue;
    }
    if (Array.isArray(value) && value.every((entry) => typeof entry === "string")) {
      fieldErrors[key] = value;
    }
  }
  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
}

export function getValidationErrors(error: ApiError): Record<string, string[]> | null {
  if (error.status !== HTTP_UNPROCESSABLE || !isRecord(error.details)) return null;
  const typeboxErrors = extractTypeboxValidationErrors(error.details);
  if (typeboxErrors) return typeboxErrors;
  return extractDirectValidationErrors(error.details);
}
