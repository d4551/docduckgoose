/**
 * Canonical API-error wire payload and lifecycle-error mapping for HTTP
 * boundaries. Pairs with `./bao-error` for the in-process error type.
 *
 * `ApiErrorPayload` is the JSON envelope every Baohaus HTTP route returns
 * for error responses; `toApiErrorPayload` converts a `BaoError` into the
 * envelope; `lifecycleErrorToResponse` maps framework lifecycle codes
 * (e.g. Elysia `PARSE`, `VALIDATION`, `NOT_FOUND`) into a typed response
 * shape with status.
 *
 * @baohaus/bao-utils/canonical/bao-error-api
 */

import type { BaoError } from "./bao-error";

const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

/** JSON envelope returned by every Baohaus HTTP route for error responses. */
export type ApiErrorPayload = {
  error: string;
  message: string;
};

/** Convert a `BaoError` into the canonical wire envelope. */
export function toApiErrorPayload(error: BaoError): ApiErrorPayload {
  return {
    error: error.code,
    message: error.message,
  };
}

/**
 * Map a framework lifecycle error code (e.g. Elysia's `PARSE`,
 * `VALIDATION`, `NOT_FOUND`) into a typed response shape with status.
 */
export function lifecycleErrorToResponse(code: unknown): ApiErrorPayload & { status: number } {
  if (code === "PARSE") {
    return { error: "VALIDATION", message: "Invalid JSON body", status: HTTP_BAD_REQUEST };
  }
  if (code === "VALIDATION") {
    return {
      error: "VALIDATION",
      message: "Request validation failed",
      status: HTTP_BAD_REQUEST,
    };
  }
  if (code === "NOT_FOUND") {
    return { error: "NOT_FOUND", message: "Resource not found", status: HTTP_NOT_FOUND };
  }

  return {
    error: "INTERNAL",
    message: "Internal server error",
    status: HTTP_INTERNAL_SERVER_ERROR,
  };
}
