/**
 * Threshold-based status class maps (quota, storage, load, live progress).
 *
 * Numeric-input helpers that map a percentage or load value to a DaisyUI
 * progress / Tailwind text color class. Sibling of:
 *   - status-maps-presence.ts (boolean/string indicators)
 *   - status-maps-bao-control-plane.ts (GitOps surfaces)
 *   - status-maps-aggregate.ts (pricing / overall health / catalog / notifications)
 */

const QUOTA_ERROR_THRESHOLD = 90;
const QUOTA_WARNING_THRESHOLD = 75;
const STORAGE_ERROR_THRESHOLD = 95;
const STORAGE_WARNING_THRESHOLD = 80;
const LOAD_ERROR_THRESHOLD = 80;

/**
 * Get progress class for storage quota indicators (stricter thresholds).
 *
 * Uses more aggressive thresholds (90/75) for quota-based displays where
 * users need earlier warning about approaching limits.
 * - Error: >90% (critical - quota nearly exhausted)
 * - Warning: >75% (high - should consider cleanup)
 * - Primary: ≤75% (healthy)
 *
 * For general disk usage indicators with higher tolerance, use
 * `getStoragePercentageProgressClass` (95/80 thresholds) instead.
 *
 * @param percentage - Usage percentage (0-100).
 * @returns DaisyUI progress class.
 */
export function getStorageQuotaProgressClass(percentage: number): string {
  if (percentage > QUOTA_ERROR_THRESHOLD) {
    return "progress-error";
  }
  if (percentage > QUOTA_WARNING_THRESHOLD) {
    return "progress-warning";
  }
  return "progress-primary";
}

/**
 * Get progress class for storage percentage indicators (relaxed thresholds).
 *
 * Uses higher thresholds (95/80) for general disk usage displays where
 * some overhead is expected and immediate action isn't critical.
 * - Error: >95% (critical - disk nearly full)
 * - Warning: >80% (elevated - monitor closely)
 * - Primary: ≤80% (healthy)
 *
 * For quota-based displays needing earlier warnings, use
 * `getStorageQuotaProgressClass` (90/75 thresholds) instead.
 *
 * @param percentage - Usage percentage (0-100).
 * @returns DaisyUI progress class.
 */
export function getStoragePercentageProgressClass(percentage: number): string {
  if (percentage > STORAGE_ERROR_THRESHOLD) {
    return "progress-error";
  }
  if (percentage > STORAGE_WARNING_THRESHOLD) {
    return "progress-warning";
  }
  return "progress-primary";
}

/**
 * Get text color class for load indicator.
 * Uses error for high load (>80%), info otherwise.
 * Common pattern: CPU load, server load indicators.
 *
 * @param loadPercentage - Load percentage (0-100).
 * @returns Tailwind text color class.
 */
export function getLoadTextClass(loadPercentage: number): string {
  return loadPercentage > LOAD_ERROR_THRESHOLD ? "text-error" : "text-info";
}

/**
 * Get progress color class for live vs static updates.
 * Uses accent for live streaming updates, info/primary for static.
 * Common pattern: training jobs, calibration progress, real-time data.
 *
 * @param isLive - Whether receiving live/streaming updates.
 * @param staticColor - Color when not live (default: 'progress-primary').
 * @returns DaisyUI progress class.
 */
export function getLiveProgressColorClass(
  isLive: boolean,
  staticColor = "progress-primary",
): string {
  return isLive ? "progress-accent" : staticColor;
}

/**
 * Get text class for positive count indicator.
 * Uses info/warning/success for positive counts, muted for zero.
 * Common pattern: stats display, count indicators.
 *
 * @param count - The count value.
 * @param activeColor - Color class when count > 0 (default: 'text-info').
 * @returns Tailwind text color class.
 */
export function getPositiveCountTextClass(count: number, activeColor = "text-info"): string {
  return count > 0 ? activeColor : "text-base-content/40";
}

/**
 * Get badge class for queue/count indicators.
 * Uses specified color when count > 0, ghost otherwise.
 * Common pattern: pending items, queue counts.
 *
 * @param count - The count value.
 * @param activeColor - Badge color when count > 0 (e.g., 'badge-warning', 'badge-info').
 * @returns DaisyUI badge class.
 */
export function getQueueCountBadgeClass(count: number, activeColor: string): string {
  return count > 0 ? activeColor : "badge-ghost";
}
