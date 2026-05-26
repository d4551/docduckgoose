/**
 * Health status resolution from raw status inputs.
 */

import { STATUS } from "../../constants/status-unified";
import { normalizeStatus } from "./normalize";
import { getDefaultStatusMap, type StatusVariantMap } from "./variants";

/**
 * Resolve a health status string from a status input.
 *
 * @param value - Status input.
 * @param [customMap] - Optional variant map overrides.
 * @returns Health status identifier.
 */
export function healthStatusFor(
  value: unknown,
  customMap: Partial<StatusVariantMap> = {},
): typeof STATUS.HEALTHY | typeof STATUS.DEGRADED | "critical" | typeof STATUS.UNKNOWN {
  const normalized = normalizeStatus(value);
  if (!normalized) {
    return STATUS.UNKNOWN;
  }
  const map = { ...getDefaultStatusMap(), ...customMap } as StatusVariantMap;
  if (map.success.includes(normalized)) {
    return STATUS.HEALTHY;
  }
  if (map.warning.includes(normalized)) {
    return STATUS.DEGRADED;
  }
  if (map.error.includes(normalized)) {
    return "critical";
  }
  return STATUS.UNKNOWN;
}

/**
 * Normalize a raw status to a standard health status string.
 * Consolidated from health.ts to provide DRY health status normalization.
 *
 * The health store canonical vocabulary is:
 * - healthy
 * - unhealthy
 * - degraded
 * - unknown
 *
 * @param raw - Raw status string
 * @returns 'healthy' | 'unhealthy' | 'degraded' | 'unknown'
 */
export function normalizeHealthStatus(
  raw: string | undefined,
): typeof STATUS.HEALTHY | "unhealthy" | typeof STATUS.DEGRADED | typeof STATUS.UNKNOWN {
  const health = healthStatusFor(raw);
  // Translate critical health signals into the canonical store value.
  if (health === "critical") {
    return "unhealthy";
  }
  return health;
}
