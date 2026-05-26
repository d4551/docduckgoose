/**
 * Shared authentication error codes and helpers.
 *
 * Centralizes auth-related error codes to keep UI, BFF, and services aligned.
 *
 * @packageDocumentation
 */

/**
 * Canonical authentication and authorization error codes.
 */
export const AUTH_ERROR_CODES: {
  readonly authRequired: "AUTH_REQUIRED";
  readonly forbidden: "FORBIDDEN";
  readonly insufficientRole: "INSUFFICIENT_ROLE";
  readonly insufficientPermissions: "INSUFFICIENT_PERMISSIONS";
  readonly invalidPermissionRequirement: "INVALID_PERMISSION_REQUIREMENT";
} = {
  authRequired: "AUTH_REQUIRED",
  forbidden: "FORBIDDEN",
  insufficientRole: "INSUFFICIENT_ROLE",
  insufficientPermissions: "INSUFFICIENT_PERMISSIONS",
  invalidPermissionRequirement: "INVALID_PERMISSION_REQUIREMENT",
} as const;

/**
 * Union of known auth error codes.
 */
export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

/**
 * Error codes that indicate authentication is required.
 */
export const AUTH_UNAUTHORIZED_CODES: Set<string> = new Set<string>([
  AUTH_ERROR_CODES.authRequired,
  "UNAUTHORIZED",
  "unauthorized",
]);

/**
 * Error codes that indicate access is forbidden.
 */
export const AUTH_FORBIDDEN_CODES: Set<string> = new Set<string>([
  AUTH_ERROR_CODES.forbidden,
  AUTH_ERROR_CODES.insufficientRole,
  AUTH_ERROR_CODES.insufficientPermissions,
  AUTH_ERROR_CODES.invalidPermissionRequirement,
  "forbidden",
]);

/**
 * Determine whether an error code is authentication-related.
 *
 * @param code - Error code to inspect.
 * @returns True when the code is auth-related.
 */
export function isAuthErrorCode(code: string): code is AuthErrorCode {
  return (
    AUTH_UNAUTHORIZED_CODES.has(code) ||
    AUTH_FORBIDDEN_CODES.has(code) ||
    Object.values(AUTH_ERROR_CODES).includes(code as AuthErrorCode)
  );
}
