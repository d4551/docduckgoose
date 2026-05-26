/**
 * Shared authentication error messages.
 *
 * Centralizes auth error labels/messages for UI, BFF, and services to avoid drift.
 *
 * @packageDocumentation
 */

import type { AuthErrorCode } from "./error-codes";
import { AUTH_ERROR_CODES } from "./error-codes";

/**
 * Standard error label and message pair for auth failures.
 */
export interface AuthErrorMessage {
  /** Short error label for the response envelope. */
  error: string;
  /** Human-readable message with more detail. */
  message: string;
  /** i18n key for client-side localization of the message. */
  messageKey: string;
}

/**
 * Canonical auth error messages keyed by auth error code.
 */
export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, AuthErrorMessage> = {
  [AUTH_ERROR_CODES.authRequired]: {
    error: "Unauthorized",
    message: "Authentication required. Please sign in to continue.",
    messageKey: "ui.errors.authRequired",
  },
  [AUTH_ERROR_CODES.forbidden]: {
    error: "Forbidden",
    message: "Access denied.",
    messageKey: "ui.errors.forbidden",
  },
  [AUTH_ERROR_CODES.insufficientRole]: {
    error: "Forbidden",
    message: "Insufficient role to perform this action.",
    messageKey: "ui.errors.insufficientRole",
  },
  [AUTH_ERROR_CODES.insufficientPermissions]: {
    error: "Forbidden",
    message: "Insufficient permissions to perform this action.",
    messageKey: "ui.errors.insufficientPermissions",
  },
  [AUTH_ERROR_CODES.invalidPermissionRequirement]: {
    error: "Forbidden",
    message: "Invalid permission requirement.",
    messageKey: "ui.errors.invalidPermissionRequirement",
  },
};

const DEFAULT_AUTH_ERROR_MESSAGE: AuthErrorMessage = {
  error: "Unauthorized",
  message: "Authentication required. Please sign in to continue.",
  messageKey: "ui.errors.authRequired",
};

/**
 * Resolve an auth error message for the supplied code.
 *
 * @param code - Auth error code to resolve.
 * @returns Error label + message pair.
 */
export function resolveAuthErrorMessage(
  code: string,
  fallback: AuthErrorMessage = DEFAULT_AUTH_ERROR_MESSAGE,
): AuthErrorMessage {
  return AUTH_ERROR_MESSAGES[code as AuthErrorCode] ?? fallback;
}
