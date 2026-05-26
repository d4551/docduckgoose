/**
 * Validation error extraction helpers.
 *
 * @shared/types/api/validation.ts
 */

import { HTTP_UNPROCESSABLE } from "./http-status.ts";
import { isRecord } from "./internal.ts";
import type { ApiError } from "./types.ts";

const LEADING_SLASH_RE: RegExp = /^\//;
const ALL_SLASHES_RE: RegExp = /\//g;

/**
 * Normalize TypeBox-style validation errors from a details record.
 *
 * @param details - Validation details payload.
 * @returns Normalized field map or null.
 */
function extractTypeboxValidationErrors(
  details: Record<string, unknown>,
): Record<string, string[]> | null {
  if (!Array.isArray(details.errors)) {
    return null;
  }
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of details.errors) {
    if (!isRecord(issue)) {
      continue;
    }
    if (!("path" in issue && "message" in issue)) {
      continue;
    }
    const path = String(issue.path).replace(LEADING_SLASH_RE, "").replace(ALL_SLASHES_RE, ".");
    const fieldKey = path || "root";
    const message = String(issue.message);
    const current = fieldErrors[fieldKey] ?? [];
    current.push(message);
    fieldErrors[fieldKey] = current;
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
}

/**
 * Normalize direct field-to-message validation records.
 *
 * @param details - Validation details payload.
 * @returns Normalized field map or null.
 */
function extractDirectValidationErrors(
  details: Record<string, unknown>,
): Record<string, string[]> | null {
  const fieldErrors: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(details)) {
    if (typeof value === "string") {
      fieldErrors[key] = [value];
      continue;
    }
    if (Array.isArray(value) && value.every((entry) => typeof entry === "string")) {
      fieldErrors[key] = value;
    }
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
}

/**
 * Extract validation errors from an API error.
 *
 * Elysia validation errors typically include `details` with field-level errors.
 * Server can return either string or string[] for each field, so this function
 * normalizes all values to arrays for consistent handling.
 *
 * @param error - The API error to check
 * @returns Validation details as field-to-messages map (arrays), null if not a validation error
 *
 * @example
 * ```typescript
 * const validationErrors = getValidationErrors(error);
 * if (validationErrors) {
 *   // Handle field-level validation errors (each field has array of messages)
 *   for (const [field, messages] of Object.entries(validationErrors)) {
 *     setFieldError(field, messages[0]); // Use first message or join all
 *   }
 * }
 * ```
 */
export function getValidationErrors(error: ApiError): Record<string, string[]> | null {
  if (error.status !== HTTP_UNPROCESSABLE || !isRecord(error.details)) {
    return null;
  }
  const typeboxErrors = extractTypeboxValidationErrors(error.details);
  if (typeboxErrors) {
    return typeboxErrors;
  }
  return extractDirectValidationErrors(error.details);
}
