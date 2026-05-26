/**
 * Shared API error-code groups.
 *
 * Centralizes common Elysia/API error-code groupings so the server, htmx/HTML client,
 * and tests can classify errors consistently without duplicating lists.
 *
 * @shared/errors/api-error-codes
 */

import { ErrorCode } from "./error-codes";

/**
 * Normalize an API error code for group membership checks.
 *
 * API/server error codes are canonical uppercase tokens. Normalizing to uppercase
 * keeps group checks stable for mixed upstream payloads.
 *
 * @param code - Candidate error code.
 * @returns Normalized error code (trimmed and upper-cased).
 */
export function normalizeApiErrorCode(code: string): string {
  return code.trim().toUpperCase();
}

/**
 * Error codes that indicate validation or input issues.
 *
 * Note: callers should use {@link isValidationErrorCode} instead of directly
 * reading this set to avoid duplicating normalization logic.
 */
export const VALIDATION_ERROR_CODES: Set<string> = new Set<string>([
  ErrorCode.ValidationError,
  ErrorCode.BadRequest,
  ErrorCode.Conflict,
  ErrorCode.DuplicateEntry,
  ErrorCode.DuplicateAccession,
]);

/**
 * Error codes that indicate a resource was not found and should not be retried.
 *
 * Note: callers should use {@link isNotFoundErrorCode} instead of directly
 * reading this set to avoid duplicating normalization logic.
 */
export const NOT_FOUND_ERROR_CODES: Set<string> = new Set<string>([
  "NOT_FOUND",
  ErrorCode.ResourceNotFound,
  ErrorCode.CaseNotFound,
  ErrorCode.ImageNotFound,
  ErrorCode.RunNotFound,
]);

/**
 * Error codes that indicate rate limiting or quota exhaustion.
 *
 * Note: callers should use {@link isRateLimitErrorCode} instead of directly
 * reading this set to avoid duplicating normalization logic.
 */
export const RATE_LIMIT_ERROR_CODES: Set<string> = new Set<string>([
  ErrorCode.QuotaExceeded,
  ErrorCode.AiRateLimited,
]);

/**
 * Check whether a code is in the validation error group.
 *
 * @param code - Candidate error code.
 * @returns True when code belongs to the validation group.
 */
export function isValidationErrorCode(code: string | null | undefined): boolean {
  if (!code) {
    return false;
  }
  return VALIDATION_ERROR_CODES.has(normalizeApiErrorCode(code));
}

/**
 * Check whether a code is in the not-found error group.
 *
 * @param code - Candidate error code.
 * @returns True when code belongs to the not-found group.
 */
export function isNotFoundErrorCode(code: string | null | undefined): boolean {
  if (!code) {
    return false;
  }
  return NOT_FOUND_ERROR_CODES.has(normalizeApiErrorCode(code));
}

/**
 * Check whether a code is in the rate-limit error group.
 *
 * @param code - Candidate error code.
 * @returns True when code belongs to the rate-limit group.
 */
export function isRateLimitErrorCode(code: string | null | undefined): boolean {
  if (!code) {
    return false;
  }
  return RATE_LIMIT_ERROR_CODES.has(normalizeApiErrorCode(code));
}
