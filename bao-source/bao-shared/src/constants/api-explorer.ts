/**
 * Shared API Explorer request-method contracts.
 *
 * Centralizes the supported HTTP methods for both the HTML route layer and the
 * API proxy plugin so the try-it workflow stays aligned across server-rendered
 * forms and backend validation.
 *
 * @packageDocumentation
 */

/** Canonical HTTP methods supported by the API Explorer try-it flow. */
export const API_EXPLORER_HTTP_METHODS: readonly ["GET", "POST", "PUT", "PATCH", "DELETE"] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
] as const;

/** Narrow HTTP method union for API Explorer requests. */
export type ApiExplorerHttpMethod = (typeof API_EXPLORER_HTTP_METHODS)[number];

/** Methods that may legally forward a request body in the API Explorer. */
export const API_EXPLORER_BODY_METHODS: readonly ["POST", "PUT", "PATCH"] = [
  "POST",
  "PUT",
  "PATCH",
] as const;

/** Fast runtime lookup for supported API Explorer methods. */
const API_EXPLORER_HTTP_METHOD_SET: Set<unknown> = new Set<string>(API_EXPLORER_HTTP_METHODS);

/** Fast runtime lookup for API Explorer methods that accept a body payload. */
const API_EXPLORER_BODY_METHOD_SET: Set<unknown> = new Set<string>(API_EXPLORER_BODY_METHODS);

/**
 * Whether a runtime string is a supported API Explorer HTTP method.
 *
 * @param value - Runtime method candidate.
 * @returns True when the value matches the supported method contract.
 */
export function isApiExplorerHttpMethod(value: string): value is ApiExplorerHttpMethod {
  return API_EXPLORER_HTTP_METHOD_SET.has(value);
}

/**
 * Whether a method may include a forwarded request body.
 *
 * @param method - Supported API Explorer method.
 * @returns True when the method accepts a request body.
 */
export function apiExplorerMethodAcceptsBody(method: ApiExplorerHttpMethod): boolean {
  return API_EXPLORER_BODY_METHOD_SET.has(method);
}
