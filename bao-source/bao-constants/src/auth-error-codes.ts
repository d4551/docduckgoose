/**
 * Canonical authentication and authorization error codes.
 */

export const AUTH_ERROR_CODES = {
  authRequired: "AUTH_REQUIRED",
  forbidden: "FORBIDDEN",
  insufficientRole: "INSUFFICIENT_ROLE",
  insufficientPermissions: "INSUFFICIENT_PERMISSIONS",
  invalidPermissionRequirement: "INVALID_PERMISSION_REQUIREMENT",
} as const;

export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export interface AuthErrorMessage {
  error: string;
  message: string;
  messageKey: string;
}

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

const AUTH_UNAUTHORIZED_CODES: ReadonlySet<string> = new Set<string>([
  AUTH_ERROR_CODES.authRequired,
  "UNAUTHORIZED",
  "unauthorized",
]);

const AUTH_FORBIDDEN_CODES: ReadonlySet<string> = new Set<string>([
  AUTH_ERROR_CODES.forbidden,
  AUTH_ERROR_CODES.insufficientRole,
  AUTH_ERROR_CODES.insufficientPermissions,
  AUTH_ERROR_CODES.invalidPermissionRequirement,
  "forbidden",
]);

export function isAuthErrorCode(code: string): code is AuthErrorCode {
  return AUTH_UNAUTHORIZED_CODES.has(code) || AUTH_FORBIDDEN_CODES.has(code);
}

export function resolveAuthErrorMessage(
  code: string,
  fallback: AuthErrorMessage = DEFAULT_AUTH_ERROR_MESSAGE,
): AuthErrorMessage {
  return isAuthErrorCode(code) ? AUTH_ERROR_MESSAGES[code] : fallback;
}
