/**
 * Aggregate / catalog status class maps (pricing, overall health, API catalog,
 * notifications).
 *
 * Higher-level surfaces that aggregate or categorize state across many
 * subsystems. Sibling of:
 *   - status-maps-thresholds.ts (numeric thresholds)
 *   - status-maps-presence.ts (boolean/string indicators)
 *   - status-maps-bao-control-plane.ts (GitOps surfaces)
 */

// Pricing State Class Maps

/** All possible pricing UI states. */
export type PricingUiState =
  | "success"
  | "partial"
  | "degraded"
  | "unauthorized"
  | "forbidden"
  | "error-retryable"
  | "error-non-retryable"
  | "loading"
  | "refreshing"
  | "idle"
  | "empty";

/** Badge class map for pricing UI states. */
export const PRICING_STATE_BADGE_MAP: Record<PricingUiState, string> = {
  success: "badge-success",
  partial: "badge-info",
  degraded: "badge-warning",
  unauthorized: "badge-error",
  forbidden: "badge-error",
  "error-retryable": "badge-error",
  "error-non-retryable": "badge-error",
  loading: "badge-ghost",
  refreshing: "badge-ghost",
  idle: "badge-ghost",
  empty: "badge-ghost",
} as const;

/**
 * Get badge class for a pricing UI state.
 *
 * @param state - Pricing UI state.
 * @returns DaisyUI badge class name.
 */
export function getPricingStateBadgeClass(state: PricingUiState | string): string {
  return PRICING_STATE_BADGE_MAP[state as PricingUiState] ?? "badge-ghost";
}

// Overall Health Badge Maps

/** Overall health level for system aggregation. */
export type OverallHealthLevel = "healthy" | "warning" | "error";

/** Badge class map for overall health status. */
export const OVERALL_HEALTH_BADGE_MAP: Record<OverallHealthLevel, string> = {
  healthy: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
} as const;

/**
 * Get badge class for an overall system health level.
 *
 * @param level - Health level (healthy, warning, error).
 * @returns DaisyUI badge class name.
 */
export function getOverallHealthBadgeClass(level: OverallHealthLevel | string): string {
  return OVERALL_HEALTH_BADGE_MAP[level as OverallHealthLevel] ?? "badge-neutral";
}

// API Catalog Status Tone Maps

/** Known API catalog status states. */
export type ApiCatalogState =
  | "online"
  | "degraded"
  | "attention"
  | "offline"
  | "not_configured"
  | "unknown";

/** Text color class map for API catalog status metrics. */
export const API_CATALOG_STATUS_TONE_MAP: Record<ApiCatalogState, string> = {
  online: "text-success",
  degraded: "text-warning",
  attention: "text-warning",
  offline: "text-error",
  not_configured: "text-base-content/60",
  unknown: "text-base-content/40",
} as const;

/**
 * Get text tone class for an API catalog status.
 *
 * @param state - API catalog status state.
 * @returns Tailwind text color class.
 */
export function getApiCatalogStatusToneClass(state: ApiCatalogState | string): string {
  return API_CATALOG_STATUS_TONE_MAP[state as ApiCatalogState] ?? "text-base-content/40";
}

// Notification Badge Maps

/** Notification severity to badge class mapping. */
export const NOTIFICATION_BADGE_MAP: Record<string, string> = {
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
} as const;

/**
 * Get badge class for a notification severity.
 *
 * @param severity - Notification severity (info, success, warning, error).
 * @returns DaisyUI badge class name.
 */
export function getNotificationBadgeClass(severity: string): string {
  return NOTIFICATION_BADGE_MAP[severity] ?? "badge-neutral";
}
