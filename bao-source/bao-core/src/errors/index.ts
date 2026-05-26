/**
 * Application Error Handling Module
 *
 * Provides standardized error classes and utilities for consistent error handling
 * across the application. Includes HTTP-specific error factories and error response
 * formatting for API endpoints.
 *
 * Features:
 * - Custom AppError class with status codes and error codes
 * - HTTP error factories for common status codes (400, 401, 403, 404, etc.)
 * - Error response formatting for API responses
 * - Type-safe error details
 * - Operational vs programming error distinction
 * - Error cause chain support
 *
 * @example Basic AppError usage
 * ```typescript
 * throw new AppError('User not found', {
 *   statusCode: 404,
 *   code: 'USER_NOT_FOUND',
 *   details: { userId: '12345' }
 * });
 * ```
 *
 * @example HTTP error factories
 * ```typescript
 * // Validation error (400)
 * throw httpErrorFactory.validation('Invalid email', { field: 'email' });
 *
 * // Authentication error (401)
 * throw httpErrorFactory.authentication();
 *
 * // Not found error (404)
 * throw httpErrorFactory.notFound('User');
 * ```
 */

import { ErrorCode } from "./error-codes";

/**
 * Configuration options for creating an AppError.
 *
 * AppErrorOptions
 * TDetails - Type of additional error details
 * {number} [statusCode] - HTTP status code (default: 500)
 * {string} [code] - Machine-readable error code
 * {TDetails} [details] - Additional error context and details
 * {unknown} [cause] - Original error that caused this error
 * {boolean} [isOperational=true] - Whether error is operational (expected) vs programming error
 */
export interface AppErrorOptions<TDetails = unknown> {
  statusCode?: number;
  code?: string;
  details?: TDetails;
  cause?: unknown;
  isOperational?: boolean;
}

/** Default HTTP status code for unspecified application errors. */
const DEFAULT_HTTP_ERROR_STATUS = 500;

/**
 * Application error class with status code, error code, and structured details.
 *
 * AppError
 * Error
 * TDetails - Type of additional error details
 *
 * @description
 * Standardized error class for application errors with:
 * - HTTP status codes for API responses
 * - Machine-readable error codes for client handling
 * - Type-safe error details
 * - Timestamp for logging and debugging
 * - Operational flag to distinguish expected vs unexpected errors
 *
 * @example Creating a custom error
 * ```typescript
 * const error = new AppError('Database connection failed', {
 *   statusCode: 503,
 *   code: 'DB_CONNECTION_ERROR',
 *   details: {
 *     database: 'postgres',
 *     host: 'localhost',
 *     retryable: true
 *   },
 *   isOperational: true
 * });
 * ```
 */
export class AppError<TDetails = unknown> extends Error {
  statusCode: number;
  code: string;
  details?: TDetails;
  isOperational: boolean;
  timestamp: string;

  constructor(message: string, options: AppErrorOptions<TDetails> = {}) {
    super(message);
    this.name = options.code ?? "AppError";
    this.statusCode = options.statusCode ?? DEFAULT_HTTP_ERROR_STATUS;
    this.code = options.code ?? this.name;
    if (options.details !== undefined) {
      this.details = options.details;
    }
    this.isOperational = options.isOperational ?? true;
    this.timestamp = new Date().toISOString();

    if (options.cause !== undefined) {
      this.cause = options.cause;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Function isAppError.
 */
export function isAppError(error: unknown): error is AppError {
  return (
    error instanceof AppError ||
    (typeof error === "object" && error !== null && "statusCode" in error && "code" in error)
  );
}

/** httpErrorFactory constant. */
export const httpErrorFactory: {
  validation<T = unknown>(message: string, details?: T): AppError<T>;
  authentication(message?: string): AppError<unknown>;
  authorization(message?: string): AppError<unknown>;
  notFound(resource?: string): AppError<unknown>;
  conflict(message?: string, details?: unknown): AppError<unknown>;
  rateLimit(retryAfter?: number): AppError<{ retryAfter: number }>;
  serviceUnavailable(service?: string): AppError<unknown>;
} = {
  validation<T = unknown>(message: string, details?: T): AppError<T> {
    return new AppError(message, {
      statusCode: 400,
      code: ErrorCode.ValidationError,
      ...(details === undefined ? {} : { details }),
    });
  },
  authentication(message = "Authentication required"): AppError<unknown> {
    return new AppError(message, {
      statusCode: 401,
      code: ErrorCode.AuthRequired,
    });
  },
  authorization(message = "Insufficient permissions"): AppError<unknown> {
    return new AppError(message, {
      statusCode: 403,
      code: ErrorCode.Forbidden,
    });
  },
  notFound(resource = "Resource"): AppError<unknown> {
    return new AppError(`${resource} not found`, {
      statusCode: 404,
      code: ErrorCode.ResourceNotFound,
    });
  },
  conflict(message = "Resource conflict", details?: unknown): AppError<unknown> {
    return new AppError(message, {
      statusCode: 409,
      code: ErrorCode.Conflict,
      ...(details === undefined ? {} : { details }),
    });
  },
  rateLimit(retryAfter = 60): AppError<{ retryAfter: number }> {
    return new AppError("Too many requests", {
      statusCode: 429,
      code: ErrorCode.QuotaExceeded,
      details: { retryAfter },
    });
  },
  serviceUnavailable(service = "Service"): AppError<unknown> {
    return new AppError(`${service} temporarily unavailable`, {
      statusCode: 503,
      code: ErrorCode.ServiceUnavailable,
    });
  },
};

/** Inferred type from the ErrorResponsePayload schema. */
export type ErrorResponsePayload = {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  details?: unknown;
  stack?: string;
};

/**
 * Function formatErrorResponse.
 */
export function formatErrorResponse(error: unknown, includeStack = false): ErrorResponsePayload {
  if (isAppError(error)) {
    const response: ErrorResponsePayload = {
      error: error.code,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
    };
    if (error.details !== undefined) {
      response.details = error.details;
    }
    if (includeStack && error.stack !== undefined) {
      response.stack = error.stack;
    }
    return response;
  }

  const fallback = error instanceof Error ? error : new Error("Unknown error");
  const response: ErrorResponsePayload = {
    error: fallback.name || "Error",
    message: fallback.message || "An error occurred",
    statusCode: 500,
    timestamp: new Date().toISOString(),
  };
  if (includeStack && fallback.stack !== undefined) {
    response.stack = fallback.stack;
  }
  return response;
}
