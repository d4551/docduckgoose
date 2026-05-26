/**
 * Unified API Response Types
 *
 * Provides standardized response wrapper types for consistent API responses
 * across all Elysia endpoints. These types ensure type safety and predictable
 * response structures for both success and error cases.
 *
 * @shared/types/responses.ts
 */

import type { Static } from "@baohaus/baobox/elysia";

type ApiResponseSchemas = typeof import("@baohaus/bao-schemas/api-response.schemas");
type RouteResponseSchemas = typeof import("@baohaus/bao-schemas/route-response.schemas");

/**
 * Base success response structure.
 *
 * T - The data payload type
 */
export type SuccessResponse<T = unknown> = Omit<
  Static<ApiResponseSchemas["SuccessResponseSchema"]>,
  "data"
> & {
  /** The response data payload */
  data?: T | undefined;
};

/**
 * Base error response structure.
 *
 * Enhanced with required `code` and `timestamp` fields for consistent error handling,
 * plus optional `correlationId` and `path` for distributed tracing support.
 */
export type ErrorResponse = Static<ApiResponseSchemas["ErrorResponseSchema"]>;

/**
 * Union type for any API response.
 *
 * T - The success data payload type
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * Permissive API envelope response for endpoints that may return `ok: false` with 2xx.
 *
 * T - The expected data type.
 */
export type ApiEnvelopeResponse<T = unknown> = Omit<
  Static<ApiResponseSchemas["ApiEnvelopeResponseSchema"]>,
  "data"
> & {
  /** Optional data payload. */
  data?: T;
};

/**
 * Paginated response structure for list endpoints.
 *
 * T - The item type in the list
 *
 * @example
 * ```typescript
 * const response: PaginatedResponse<CaseListItem> = {
 *   ok: true,
 *   items: [...],
 *   total: 150,
 *   page: 1,
 *   pageSize: 20,
 *   totalPages: 8,
 * };
 * ```
 */
export type PaginatedResponse<T> = Omit<
  Static<ApiResponseSchemas["PaginatedResponseSchema"]>,
  "items"
> & {
  /** Array of items for the current page */
  items: T[];
};

/**
 * Simple list response without pagination.
 *
 * T - The item type in the list
 *
 * @example
 * ```typescript
 * const response: ListResponse<Device> = {
 *   ok: true,
 *   items: [...],
 *   count: 5,
 * };
 * ```
 */
export interface ListResponse<T> {
  /** Indicates successful operation */
  ok: true;
  /** Array of items */
  items: T[];
  /** Number of items in the list */
  count: number;
}

/**
 * Status response with timestamp for health/status endpoints.
 *
 * T - The status data type
 *
 * @example
 * ```typescript
 * const response: StatusResponse<InfraStatus> = {
 *   ok: true,
 *   data: { ... },
 *   timestamp: '2024-01-15T10:30:00Z',
 * };
 * ```
 */
export interface StatusResponse<T> {
  /** Indicates successful operation */
  ok: true;
  /** The status data payload */
  data: T;
  /** ISO 8601 timestamp of when the status was captured */
  timestamp: string;
}

/**
 * Count response for aggregate queries.
 */
export interface CountResponse {
  /** Indicates successful operation */
  ok: true;
  /** The count value */
  count: number;
}

/**
 * Created response for POST operations.
 *
 * T - The created entity type
 */
export type CreatedResponse<T = unknown> = Omit<
  Static<RouteResponseSchemas["CreatedResponseSchema"]>,
  "data"
> & {
  /** Optional created entity payload. */
  data?: T;
};

/**
 * Updated response for PATCH/PUT operations.
 *
 * T - The updated entity type
 */
export type UpdatedResponse<T = unknown> = Omit<
  Static<RouteResponseSchemas["UpdatedResponseSchema"]>,
  "data"
> & {
  /** Optional updated entity payload. */
  data?: T;
};

/**
 * Deleted response for DELETE operations.
 */
export type DeletedResponse = Static<RouteResponseSchemas["DeletedResponseSchema"]>;

/**
 * Batch operation response.
 *
 * T - The result item type
 */
export interface BatchResponse<T = unknown> {
  /** Indicates overall operation status */
  ok: true;
  /** Number of successful operations */
  succeeded: number;
  /** Number of failed operations */
  failed: number;
  /** Results for each item */
  results: Array<{
    /** Item identifier */
    id: string;
    /** Whether this item operation succeeded */
    success: boolean;
    /** Error message if failed */
    error?: string;
    /** Result data if successful */
    data?: T;
  }>;
}

/**
 * Progress response for long-running operations.
 */
export interface ProgressResponse {
  /** Indicates successful operation */
  ok: true;
  /** Current progress percentage (0-100) */
  progress: number;
  /** Current status message */
  status: string;
  /** Whether the operation is complete */
  complete: boolean;
  /** Optional result data when complete */
  result?: unknown;
  /** Optional estimated time remaining in seconds */
  eta?: number;
}

/**
 * Validation error response with field-level errors.
 */
export type ValidationErrorResponse = ErrorResponse & {
  /**
   * Validation error code.
   */
  code: "VALIDATION_ERROR";
  /** Field-level validation errors */
  fields: Record<string, string[]>;
};

/**
 * Rate limit error response.
 *
 * Uses canonical server-side rate-limit codes.
 */
export type RateLimitErrorResponse = Omit<ErrorResponse, "code"> & {
  /** Rate limit error code */
  code: "QUOTA_EXCEEDED" | "AI_RATE_LIMITED";
  /** Seconds until the rate limit resets */
  retryAfter: number;
  /** ISO 8601 timestamp of when the limit will reset */
  retryAt?: string;
};

/**
 * Counted list response (offset/limit style) with pagination hints.
 *
 * Many `/api/v1/*` list endpoints return `{ ok: true, data: T[], count, hasMore, timestamp }`.
 *
 * T - Item type.
 */
export type CountedListResponse<T> = SuccessResponse<T[]> & {
  /** Total number of items matching the query. */
  count: number;
  /** True when additional results exist after the current page. */
  hasMore: boolean;
  /** ISO 8601 timestamp of when the response was generated. */
  timestamp: string;
};

/**
 * Pagination query parameters.
 */
export interface PaginationParams {
  /** Page number (1-indexed) */
  page?: number;
  /** Items per page */
  pageSize?: number;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: "asc" | "desc";
}

/**
 * Filter parameters for list queries.
 */
export interface FilterParams {
  /** Search query string */
  search?: string;
  /** Status filter */
  status?: string | string[];
  /** Date range start (ISO 8601) */
  from?: string;
  /** Date range end (ISO 8601) */
  to?: string;
}

/**
 * Combined query parameters for paginated, filtered lists.
 */
export interface ListQueryParams extends PaginationParams, FilterParams {}

/**
 * Type guard to check if response is successful.
 *
 * @param response - The API response to check
 * @returns True if response has ok: true
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): response is SuccessResponse<T> {
  return response.ok === true;
}

/**
 * Type guard to check if response is an error.
 *
 * @param response - The API response to check
 * @returns True if response has ok: false
 */
export function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  return response.ok === false;
}

/**
 * Type guard to check if response is paginated.
 *
 * @param response - The API response to check
 * @returns True if response has pagination fields
 */
export function isPaginatedResponse<T>(response: unknown): response is PaginatedResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "ok" in response &&
    response.ok === true &&
    "items" in response &&
    "total" in response &&
    "page" in response &&
    "pageSize" in response
  );
}

/**
 * Type guard to check if response is a list response.
 *
 * @param response - The API response to check
 * @returns True if response is a list response
 */
export function isListResponse<T>(response: unknown): response is ListResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "ok" in response &&
    response.ok === true &&
    "items" in response &&
    "count" in response &&
    !("total" in response)
  );
}

/**
 * Type guard to check if response is a validation error.
 *
 * @param response - The API response to check
 * @returns True if response is a validation error
 */
export function isValidationError(response: unknown): response is ValidationErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "ok" in response &&
    response.ok === false &&
    "code" in response &&
    response.code === "VALIDATION_ERROR"
  );
}
