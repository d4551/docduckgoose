/**
 * Shared UI-oriented error classification for server error codes.
 *
 * The server emits canonical {@link ErrorCode} values in its error envelopes.
 * The htmx/HTML client needs a deterministic mapping from those codes to UI buckets
 * (network/parse/unauthorized/forbidden/validation/not-found/rate-limited/timeout/server-error)
 * plus a `recoverable` flag (retryable vs non-retryable).
 *
 * This module is the single owner of that mapping so client code and tests can
 * assert full coverage whenever new error codes are introduced.
 *
 * @shared/errors/ui-error-classification
 */

import { ErrorCode } from "./error-codes";

/**
 * UI error category tokens used by the htmx/HTML client.
 *
 * These values intentionally match client-side `useApiError` classifications
 * `ERROR_CODES` values to avoid translation layers.
 */
export const UI_ERROR_CATEGORIES: {
  readonly Unknown: "unknown_error";
  readonly Network: "network_error";
  readonly Timeout: "timeout_error";
  readonly Validation: "VALIDATION";
  readonly Unauthorized: "unauthorized";
  readonly Forbidden: "forbidden";
  readonly NotFound: "NOT_FOUND";
  readonly RateLimited: "RATE_LIMITED";
  readonly ServerError: "server_error";
  readonly ParseError: "parse_error";
} = {
  Unknown: "unknown_error",
  Network: "network_error",
  Timeout: "timeout_error",
  Validation: "VALIDATION",
  Unauthorized: "unauthorized",
  Forbidden: "forbidden",
  NotFound: "NOT_FOUND",
  RateLimited: "RATE_LIMITED",
  ServerError: "server_error",
  ParseError: "parse_error",
} as const;

/**
 * Union of all UI error category tokens.
 */
export type UiErrorCategory = (typeof UI_ERROR_CATEGORIES)[keyof typeof UI_ERROR_CATEGORIES];

/**
 * UI error classification result.
 */
export type UiErrorClassification = {
  /** UI bucket/category token. */
  category: UiErrorCategory;
  /** Whether the error is recoverable (retryable). */
  recoverable: boolean;
};

/**
 * Fallback classification for unknown or newly introduced server error codes.
 */
export const DEFAULT_UI_ERROR_CLASSIFICATION: UiErrorClassification = {
  category: UI_ERROR_CATEGORIES.Unknown,
  recoverable: false,
};

/**
 * Canonical mapping from server {@link ErrorCode} to UI buckets + retry semantics.
 *
 * This map is intentionally exhaustive and enforced by `Record<ErrorCode, ...>`.
 */
export const ERROR_CODE_UI_CLASSIFICATION_MAP: Partial<Record<ErrorCode, UiErrorClassification>> = {
  [ErrorCode.AuthRequired]: { category: UI_ERROR_CATEGORIES.Unauthorized, recoverable: true },
  [ErrorCode.InsufficientRole]: { category: UI_ERROR_CATEGORIES.Forbidden, recoverable: false },
  [ErrorCode.InvalidPermissionRequirement]: {
    category: UI_ERROR_CATEGORIES.Forbidden,
    recoverable: false,
  },
  [ErrorCode.InsufficientPermissions]: {
    category: UI_ERROR_CATEGORIES.Forbidden,
    recoverable: false,
  },
  [ErrorCode.Forbidden]: { category: UI_ERROR_CATEGORIES.Forbidden, recoverable: false },
  [ErrorCode.ValidationError]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.Conflict]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.DbConnectionError]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.ResourceNotFound]: { category: UI_ERROR_CATEGORIES.NotFound, recoverable: false },
  [ErrorCode.DuplicateEntry]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.CaseNotFound]: { category: UI_ERROR_CATEGORIES.NotFound, recoverable: false },
  [ErrorCode.DuplicateAccession]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.ImageNotFound]: { category: UI_ERROR_CATEGORIES.NotFound, recoverable: false },
  [ErrorCode.RunNotFound]: { category: UI_ERROR_CATEGORIES.NotFound, recoverable: false },
  [ErrorCode.QuotaExceeded]: { category: UI_ERROR_CATEGORIES.RateLimited, recoverable: true },
  [ErrorCode.FetchUnavailable]: { category: UI_ERROR_CATEGORIES.Network, recoverable: true },
  [ErrorCode.FetchInvalidResponse]: {
    category: UI_ERROR_CATEGORIES.ParseError,
    recoverable: true,
  },
  [ErrorCode.HttpError]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.AiGenerationFailed]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.AiProviderError]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.AiRateLimited]: { category: UI_ERROR_CATEGORIES.RateLimited, recoverable: true },
  [ErrorCode.AiInvalidOutput]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.AiContentFilter]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.AiOutputIncomplete]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.StorageNotReady]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.ServiceUnavailable]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.HealthSnapshotUnavailable]: {
    category: UI_ERROR_CATEGORIES.ServerError,
    recoverable: true,
  },
  [ErrorCode.InternalError]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: false },
  [ErrorCode.BadRequest]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: true },
  [ErrorCode.PayloadTooLarge]: { category: UI_ERROR_CATEGORIES.Validation, recoverable: false },
  [ErrorCode.Timeout]: { category: UI_ERROR_CATEGORIES.Timeout, recoverable: true },
  [ErrorCode.PipelineNotFound]: { category: UI_ERROR_CATEGORIES.NotFound, recoverable: false },
  [ErrorCode.PipelineExecutionFailed]: {
    category: UI_ERROR_CATEGORIES.ServerError,
    recoverable: true,
  },
  [ErrorCode.PipelineStageFailed]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.PipelineTimeout]: { category: UI_ERROR_CATEGORIES.Timeout, recoverable: true },
  [ErrorCode.ContractMissing]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: false },
} as const satisfies Partial<Record<ErrorCode, UiErrorClassification>>;

/**
 * Derive UI classification for canonical error codes that follow shared naming conventions.
 *
 * @param code - Canonical error code.
 * @returns Derived UI classification when patterns match.
 */
function deriveUiClassification(code: ErrorCode): UiErrorClassification {
  if (code.endsWith("_NOT_FOUND")) {
    return {
      category: UI_ERROR_CATEGORIES.NotFound,
      recoverable: false,
    };
  }

  if (code.endsWith("_TIMEOUT")) {
    return {
      category: UI_ERROR_CATEGORIES.Timeout,
      recoverable: true,
    };
  }

  if (code.endsWith("_RATE_LIMITED")) {
    return {
      category: UI_ERROR_CATEGORIES.RateLimited,
      recoverable: true,
    };
  }

  if (code.endsWith("_FAILED")) {
    return {
      category: UI_ERROR_CATEGORIES.ServerError,
      recoverable: true,
    };
  }

  return DEFAULT_UI_ERROR_CLASSIFICATION;
}

/**
 * Classify a canonical server error code into a UI bucket.
 *
 * @param code - Canonical error code.
 * @returns UI classification (category + recoverable).
 */
export function classifyErrorCodeForUi(code: ErrorCode): UiErrorClassification {
  const mapped = ERROR_CODE_UI_CLASSIFICATION_MAP[code];
  return mapped ?? deriveUiClassification(code);
}
