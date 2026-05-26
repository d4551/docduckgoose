/**
 * HTTP status code constants and i18n key mappings.
 *
 * @shared/types/api/http-status.ts
 */

/** HTTP 400 Bad Request. */
export const HTTP_BAD_REQUEST = 400;
/** HTTP 401 Unauthorized. */
export const HTTP_UNAUTHORIZED = 401;
/** HTTP 403 Forbidden. */
export const HTTP_FORBIDDEN = 403;
/** HTTP 404 Not Found. */
export const HTTP_NOT_FOUND = 404;
/** HTTP 409 Conflict. */
export const HTTP_CONFLICT = 409;
/** HTTP 422 Unprocessable Entity. */
export const HTTP_UNPROCESSABLE = 422;
/** HTTP 429 Too Many Requests. */
export const HTTP_TOO_MANY = 429;
/** Inclusive lower bound for HTTP 5xx server errors. */
export const HTTP_SERVER_ERROR_MIN = 500;
/** Exclusive upper bound for HTTP 5xx server errors. */
export const HTTP_SERVER_ERROR_MAX = 600;

/**
 * HTTP status code to i18n message key mappings.
 *
 * Returns i18n keys (e.g. `httpStatus.400`) instead of English strings.
 * Consumers must pass the returned key through their `translate()` function.
 *
 * @example
 * ```typescript
 * // English values (for reference only — actual text lives in en.json):
 * // 400 → 'Invalid request. Please check your input and try again.'
 * // 401 → 'Authentication required. Please sign in to continue.'
 * // 403 → 'You do not have permission to perform this action.'
 * // 404 → 'The requested resource was not found.'
 * // 500 → 'An internal server error occurred. Please try again later.'
 * ```
 */
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

/** Fallback i18n key for unrecognized HTTP status codes. */
export const HTTP_STATUS_UNKNOWN_KEY: "httpStatus.unknown" = "httpStatus.unknown" as const;
