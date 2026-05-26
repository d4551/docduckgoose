/**
 * Stable loopback browser-smoke identity constants.
 *
 * User ids must remain UUID-shaped so Prisma-backed tenancy and ecosystem graph
 * queries do not fail during HTML smoke on loopback hosts.
 *
 * @shared/constants/browser-smoke
 */

const BROWSER_SMOKE_USER_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

/** Canonical admin user id for loopback browser-smoke sessions. */
export const BROWSER_SMOKE_ADMIN_USER_ID = "00000000-0000-4000-8000-000000000001" as const;

/** Canonical admin email label paired with {@link BROWSER_SMOKE_ADMIN_USER_ID}. */
export const BROWSER_SMOKE_ADMIN_EMAIL = "browser-smoke-admin@example.test" as const;

/** Default Better Auth password for loopback browser-smoke fixture registration. */
export const BROWSER_SMOKE_DEFAULT_PASSWORD = "browser-smoke-password-16chars" as const;

/** Default first name for loopback browser-smoke fixture registration. */
export const BROWSER_SMOKE_DEFAULT_FIRST_NAME = "Browser" as const;

/** Default last name for loopback browser-smoke fixture registration. */
export const BROWSER_SMOKE_DEFAULT_LAST_NAME = "Smoke" as const;

/** Validate browser-smoke user ids before they become tenant scope. */
export function isBrowserSmokeUserId(value: string): boolean {
  return BROWSER_SMOKE_USER_ID_PATTERN.test(value);
}
