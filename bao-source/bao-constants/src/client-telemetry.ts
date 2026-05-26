/**
 * Client telemetry constants.
 *
 * Shared literal values for client error telemetry contracts and behavior.
 *
 * @shared/constants/client-telemetry
 */

/**
 * Allowed telemetry severities for client-side error reporting.
 */
export const CLIENT_ERROR_SEVERITY_VALUES: readonly ["error", "warning", "info"] = [
  "error",
  "warning",
  "info",
] as const;

/**
 * Default severity used when clients omit `severity`.
 */
export const DEFAULT_CLIENT_ERROR_SEVERITY: "error" = CLIENT_ERROR_SEVERITY_VALUES[0];

/**
 * Default source used when clients omit `source`.
 */
export const DEFAULT_CLIENT_ERROR_SOURCE = "client";
