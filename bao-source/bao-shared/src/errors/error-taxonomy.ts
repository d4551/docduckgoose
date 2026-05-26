/**
 * Shared error taxonomy registry.
 *
 * Captures the canonical metadata every layer cares about: error code, HTTP status,
 * retryability, UI bucket, and the shared user-facing message key. Tests, server handlers,
 * and htmx/HTML clients consume the same registry to keep error-state mapping aligned.
 *
 * @shared/errors/error-taxonomy
 */

import { HTTP_STATUS } from "../constants/http-status";
import { allErrorCodes, ErrorCode, isErrorCode } from "./error-codes";
import type { UiErrorCategory, UiErrorClassification } from "./ui-error-classification";
import { classifyErrorCodeForUi, UI_ERROR_CATEGORIES } from "./ui-error-classification";

/**
 * Canonical UI message keys keyed by {@link ErrorCode}.
 */
export const CANONICAL_ERROR_MESSAGE_KEYS: Partial<Record<ErrorCode, string>> = {
  [ErrorCode.AuthRequired]: "ui.errors.authRequired",
  [ErrorCode.Forbidden]: "ui.errors.forbidden",
  [ErrorCode.InsufficientRole]: "ui.errors.insufficientRole",
  [ErrorCode.InsufficientPermissions]: "ui.errors.insufficientPermissions",
  [ErrorCode.InvalidPermissionRequirement]: "ui.errors.invalidPermissionRequirement",
  [ErrorCode.ValidationError]: "ui.errors.validation",
  [ErrorCode.BadRequest]: "ui.errors.badRequest",
  [ErrorCode.Conflict]: "ui.errors.conflict",
  [ErrorCode.DuplicateEntry]: "ui.errors.duplicateEntry",
  [ErrorCode.DuplicateAccession]: "ui.errors.duplicateAccession",
  [ErrorCode.ResourceNotFound]: "ui.errors.resourceNotFound",
  [ErrorCode.CaseNotFound]: "ui.errors.caseNotFound",
  [ErrorCode.ImageNotFound]: "ui.errors.imageNotFound",
  [ErrorCode.RunNotFound]: "ui.errors.runNotFound",
  [ErrorCode.QuotaExceeded]: "ui.errors.quotaExceeded",
  [ErrorCode.AiRateLimited]: "ui.errors.aiRateLimited",
  [ErrorCode.AiGenerationFailed]: "ui.errors.aiGenerationFailed",
  [ErrorCode.AiProviderError]: "ui.errors.aiProviderError",
  [ErrorCode.AiInvalidOutput]: "ui.errors.aiGenerationFailed",
  [ErrorCode.StorageNotReady]: "ui.errors.storageNotReady",
  [ErrorCode.DbConnectionError]: "ui.errors.dbConnectionError",
  [ErrorCode.FetchUnavailable]: "ui.errors.fetchUnavailable",
  [ErrorCode.FetchInvalidResponse]: "ui.errors.fetchInvalidResponse",
  [ErrorCode.ServiceUnavailable]: "ui.errors.serviceUnavailable",
  [ErrorCode.HealthSnapshotUnavailable]: "ui.errors.serviceUnavailable",
  [ErrorCode.PipelineNotFound]: "ui.errors.notFound",
  [ErrorCode.PipelineExecutionFailed]: "ui.errors.serverError",
  [ErrorCode.PipelineStageFailed]: "ui.errors.serverError",
  [ErrorCode.PipelineTimeout]: "ui.errors.timeout",
  [ErrorCode.Timeout]: "ui.errors.timeout",
  [ErrorCode.ContractMissing]: "ui.errors.unknown",
  [ErrorCode.HttpError]: "ui.errors.httpError",
  [ErrorCode.InternalError]: "ui.errors.internalError",
};

/**
 * Fallback user-facing message key for codes without a specific mapping.
 */
const DEFAULT_ERROR_USER_MESSAGE_KEY: string = "ui.errors.unknown";

const ERROR_CODE_HTTP_STATUS_OVERRIDES: Partial<Record<ErrorCode, number>> = {
  [ErrorCode.AuthRequired]: HTTP_STATUS.unauthorized,
  [ErrorCode.Forbidden]: HTTP_STATUS.forbidden,
  [ErrorCode.InsufficientRole]: HTTP_STATUS.forbidden,
  [ErrorCode.InsufficientPermissions]: HTTP_STATUS.forbidden,
  [ErrorCode.InvalidPermissionRequirement]: HTTP_STATUS.forbidden,
  [ErrorCode.ValidationError]: HTTP_STATUS.unprocessableEntity,
  [ErrorCode.BadRequest]: HTTP_STATUS.badRequest,
  [ErrorCode.Conflict]: HTTP_STATUS.conflict,
  [ErrorCode.DuplicateEntry]: HTTP_STATUS.conflict,
  [ErrorCode.DuplicateAccession]: HTTP_STATUS.conflict,
  [ErrorCode.ResourceNotFound]: HTTP_STATUS.notFound,
  [ErrorCode.CaseNotFound]: HTTP_STATUS.notFound,
  [ErrorCode.ImageNotFound]: HTTP_STATUS.notFound,
  [ErrorCode.RunNotFound]: HTTP_STATUS.notFound,
  [ErrorCode.PipelineNotFound]: HTTP_STATUS.notFound,
  [ErrorCode.QuotaExceeded]: HTTP_STATUS.tooManyRequests,
  [ErrorCode.AiRateLimited]: HTTP_STATUS.tooManyRequests,
  [ErrorCode.Timeout]: HTTP_STATUS.gatewayTimeout,
  [ErrorCode.PipelineTimeout]: HTTP_STATUS.gatewayTimeout,
  [ErrorCode.PipelineExecutionFailed]: HTTP_STATUS.internalServerError,
  [ErrorCode.PipelineStageFailed]: HTTP_STATUS.internalServerError,
  [ErrorCode.ServiceUnavailable]: HTTP_STATUS.serviceUnavailable,
  [ErrorCode.HealthSnapshotUnavailable]: HTTP_STATUS.serviceUnavailable,
  [ErrorCode.StorageNotReady]: HTTP_STATUS.serviceUnavailable,
  [ErrorCode.FetchUnavailable]: HTTP_STATUS.serviceUnavailable,
  [ErrorCode.DbConnectionError]: HTTP_STATUS.serviceUnavailable,
  [ErrorCode.FetchInvalidResponse]: HTTP_STATUS.badGateway,
  [ErrorCode.HttpError]: HTTP_STATUS.badGateway,
  [ErrorCode.AiGenerationFailed]: HTTP_STATUS.internalServerError,
  [ErrorCode.AiProviderError]: HTTP_STATUS.badGateway,
  [ErrorCode.AiInvalidOutput]: HTTP_STATUS.unprocessableEntity,
  [ErrorCode.AiContentFilter]: HTTP_STATUS.badRequest,
  [ErrorCode.AiOutputIncomplete]: HTTP_STATUS.internalServerError,
  [ErrorCode.InternalError]: HTTP_STATUS.internalServerError,
  [ErrorCode.PayloadTooLarge]: HTTP_STATUS.payloadTooLarge,
  [ErrorCode.ContractMissing]: HTTP_STATUS.internalServerError,
};

/**
 * HTTP status defaults derived from UI error categories.
 */
const DEFAULT_HTTP_STATUS_FOR_CATEGORY: Record<UiErrorCategory, number> = {
  [UI_ERROR_CATEGORIES.Unknown]: HTTP_STATUS.internalServerError,
  [UI_ERROR_CATEGORIES.Network]: HTTP_STATUS.badGateway,
  [UI_ERROR_CATEGORIES.Timeout]: HTTP_STATUS.gatewayTimeout,
  [UI_ERROR_CATEGORIES.Validation]: HTTP_STATUS.unprocessableEntity,
  [UI_ERROR_CATEGORIES.Unauthorized]: HTTP_STATUS.unauthorized,
  [UI_ERROR_CATEGORIES.Forbidden]: HTTP_STATUS.forbidden,
  [UI_ERROR_CATEGORIES.NotFound]: HTTP_STATUS.notFound,
  [UI_ERROR_CATEGORIES.RateLimited]: HTTP_STATUS.tooManyRequests,
  [UI_ERROR_CATEGORIES.ServerError]: HTTP_STATUS.internalServerError,
  [UI_ERROR_CATEGORIES.ParseError]: HTTP_STATUS.badRequest,
};

/**
 * Registry entry describing the metadata that every layer should agree on.
 */
export type ErrorTaxonomyEntry = {
  /** Canonical machine-readable error code token. */
  errorCode: ErrorCode;
  /** UI error category bucket. */
  category: UiErrorCategory;
  /** Canonical retryability field used by route/composable state contracts. */
  retryable: boolean;
  /** Canonical HTTP status derived from code + category mapping. */
  httpStatus: number;
  /** Canonical user-facing message key token. */
  userMessage: string;
};

function resolveHttpStatus(code: ErrorCode, classification: UiErrorClassification): number {
  return (
    ERROR_CODE_HTTP_STATUS_OVERRIDES[code] ??
    DEFAULT_HTTP_STATUS_FOR_CATEGORY[classification.category] ??
    HTTP_STATUS.internalServerError
  );
}

function buildErrorTaxonomyEntry(code: ErrorCode): ErrorTaxonomyEntry {
  const classification = classifyErrorCodeForUi(code);
  const userMessage = CANONICAL_ERROR_MESSAGE_KEYS[code] ?? DEFAULT_ERROR_USER_MESSAGE_KEY;
  return {
    errorCode: code,
    category: classification.category,
    retryable: classification.recoverable,
    httpStatus: resolveHttpStatus(code, classification),
    userMessage,
  };
}

/**
 * Exhaustive taxonomy keyed by {@link ErrorCode}.
 */
export const ERROR_TAXONOMY: Record<ErrorCode, ErrorTaxonomyEntry> = Object.fromEntries(
  allErrorCodes().map((code) => [code, buildErrorTaxonomyEntry(code)]),
) as Record<ErrorCode, ErrorTaxonomyEntry>;

/**
 * Helper to grab the entry for a known error code.
 */
export function getErrorTaxonomy(code: ErrorCode): ErrorTaxonomyEntry {
  return ERROR_TAXONOMY[code];
}

/**
 * Resolve taxonomy metadata for a possibly-unknown error code string.
 *
 * @param code - Candidate error code.
 * @returns Taxonomy entry when the code is canonical, otherwise `null`.
 */
export function resolveErrorTaxonomy(code: string | null | undefined): ErrorTaxonomyEntry | null {
  if (!isErrorCode(code)) {
    return null;
  }
  return getErrorTaxonomy(code);
}
