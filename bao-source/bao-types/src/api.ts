/**
 * API Response Types and Helpers
 *
 * Re-exports from domain-specific split modules.
 * @baohaus/bao-types/api
 */

export {
  extractEdenError,
  normalizeApiError,
  unwrapEden,
  unwrapEdenData,
} from "./api-normalize";
export type {
  ApiEnvelope,
  ApiError,
  ApiResult,
  EdenResult,
  EnvelopeMeta,
  NormalizedApiError,
  ProblemDetailsMeta,
} from "./api-parsing";
export {
  extractEnvelopeMeta,
  extractProblemDetailsMeta,
  isEdenErrorShape,
  isRecord,
  isStringArray,
} from "./api-parsing";

export type { StatusHandlers } from "./api-status";

export {
  getErrorMessage,
  getValidationErrors,
  HTTP_STATUS_MESSAGE_KEYS,
  HTTP_STATUS_UNKNOWN_KEY,
  handleApiError,
  isAuthError,
  isClientError,
  isNetworkError,
  isPermissionError,
  isRateLimitError,
  isServerError,
} from "./api-status";
