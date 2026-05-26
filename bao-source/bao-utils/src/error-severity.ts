/**
 * Canonical severity tokens for runtime + telemetry classification.
 *
 * Severity is orthogonal to the {@link import("@baohaus/bao-shared/errors/ui-error-classification").UiErrorCategory}
 * taxonomy: category answers "what kind of failure" (network, timeout, validation,
 * …), severity answers "how loudly should this surface" (informational → critical).
 *
 * Adopted from the navi error-boundary design (low / medium / high / critical) —
 * each token maps to a logger level + alert threshold in downstream consumers.
 *
 * @baohaus/bao-utils/error-severity
 */

export const ERROR_SEVERITY = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
} as const;

export type ErrorSeverity = (typeof ERROR_SEVERITY)[keyof typeof ERROR_SEVERITY];
