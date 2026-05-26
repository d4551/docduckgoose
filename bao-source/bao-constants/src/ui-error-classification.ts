/**
 * Shared UI-oriented classification for canonical error codes.
 */

import { ErrorCode, type ErrorCode as SharedErrorCode } from "./error-codes";

export const UI_ERROR_CATEGORIES = {
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

export type UiErrorCategory = (typeof UI_ERROR_CATEGORIES)[keyof typeof UI_ERROR_CATEGORIES];

export type UiErrorClassification = {
  category: UiErrorCategory;
  recoverable: boolean;
};

export const DEFAULT_UI_ERROR_CLASSIFICATION: UiErrorClassification = {
  category: UI_ERROR_CATEGORIES.Unknown,
  recoverable: false,
};

const ERROR_CODE_UI_CLASSIFICATION_MAP: Partial<Record<SharedErrorCode, UiErrorClassification>> = {
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
  [ErrorCode.AiOutputIncomplete]: {
    category: UI_ERROR_CATEGORIES.ServerError,
    recoverable: true,
  },
  [ErrorCode.StorageNotReady]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: true },
  [ErrorCode.ServiceUnavailable]: {
    category: UI_ERROR_CATEGORIES.ServerError,
    recoverable: true,
  },
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
  [ErrorCode.PipelineStageFailed]: {
    category: UI_ERROR_CATEGORIES.ServerError,
    recoverable: true,
  },
  [ErrorCode.PipelineTimeout]: { category: UI_ERROR_CATEGORIES.Timeout, recoverable: true },
  [ErrorCode.ContractMissing]: { category: UI_ERROR_CATEGORIES.ServerError, recoverable: false },
};

function deriveUiClassification(code: SharedErrorCode): UiErrorClassification {
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

export function classifyErrorCodeForUi(code: SharedErrorCode): UiErrorClassification {
  return ERROR_CODE_UI_CLASSIFICATION_MAP[code] ?? deriveUiClassification(code);
}
