/**
 * Shared error message key mapping.
 *
 * Maps server-side error codes to UI translation keys so clients can localize
 * error responses deterministically without relying on raw message strings.
 *
 * @baohaus/bao-utils/error-keys
 */

import type { AuthErrorCode } from "@baohaus/bao-constants/auth-error-codes";
import { AUTH_ERROR_CODES } from "@baohaus/bao-constants/auth-error-codes";
import { allErrorCodes } from "@baohaus/bao-constants/error-codes";
import { getErrorTaxonomy } from "@baohaus/bao-constants/error-taxonomy";

/**
 * Default i18n key when no specific mapping is available.
 */
export const DEFAULT_ERROR_MESSAGE_KEY = "ui.errors.unknown";

/**
 * Build the canonical message-key registry from the shared error taxonomy.
 *
 * @returns Canonical registry keyed by error code.
 */
function buildCanonicalErrorMessageKeys(): Record<string, string> {
  const registry: Record<string, string> = {};
  for (const code of allErrorCodes()) {
    registry[code] = getErrorTaxonomy(code).userMessage;
  }
  return registry;
}

const CANONICAL_ERROR_MESSAGE_KEYS: Readonly<Record<string, string>> = Object.freeze(
  buildCanonicalErrorMessageKeys(),
);

function resolveAuthErrorMessageKey(code: AuthErrorCode): string {
  return CANONICAL_ERROR_MESSAGE_KEYS[code] ?? DEFAULT_ERROR_MESSAGE_KEY;
}

/**
 * Map of error codes to UI i18n keys.
 *
 * Canonical keys are sourced from the shared taxonomy to prevent drift.
 */
export const ERROR_MESSAGE_KEYS: Readonly<Record<string, string>> = Object.freeze({
  ...CANONICAL_ERROR_MESSAGE_KEYS,
  [AUTH_ERROR_CODES.authRequired]: resolveAuthErrorMessageKey(AUTH_ERROR_CODES.authRequired),
  [AUTH_ERROR_CODES.forbidden]: resolveAuthErrorMessageKey(AUTH_ERROR_CODES.forbidden),
  [AUTH_ERROR_CODES.insufficientRole]: resolveAuthErrorMessageKey(
    AUTH_ERROR_CODES.insufficientRole,
  ),
  [AUTH_ERROR_CODES.insufficientPermissions]: resolveAuthErrorMessageKey(
    AUTH_ERROR_CODES.insufficientPermissions,
  ),
  [AUTH_ERROR_CODES.invalidPermissionRequirement]: resolveAuthErrorMessageKey(
    AUTH_ERROR_CODES.invalidPermissionRequirement,
  ),
});

/**
 * Resolve an i18n message key for a server error code.
 *
 * @param code - Error code to resolve.
 * @returns Matching message key when available, otherwise the default key.
 */
export function resolveErrorMessageKey(code?: string | null): string | undefined {
  if (!code) {
    return;
  }
  const trimmed = code.trim();
  if (!trimmed) {
    return;
  }
  const normalized = trimmed.toUpperCase();
  return ERROR_MESSAGE_KEYS[trimmed] ?? ERROR_MESSAGE_KEYS[normalized] ?? DEFAULT_ERROR_MESSAGE_KEY;
}
