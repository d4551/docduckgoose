/**
 * Status variant taxonomy and the canonical default status -> variant map.
 */

import { STATUS } from "../../constants/status-unified";

/**
 * Supported variants for UI status indicators (badges, alerts, text).
 */
export type StatusVariant =
  | typeof STATUS.SUCCESS
  | "warning"
  | typeof STATUS.ERROR
  | "info"
  | "ghost";

/**
 * Mapping of status variants to their corresponding raw status strings.
 */
export type StatusVariantMap = Record<StatusVariant, string[]>;

// Lazy getter to avoid TDZ issues during module initialization
let _defaultStatusMap: StatusVariantMap | null = null;
/**
 * Returns the default mapping of status variants to status strings.
 * Uses a singleton pattern to ensure the map is created only once.
 */
export function getDefaultStatusMap(): StatusVariantMap {
  if (!_defaultStatusMap) {
    _defaultStatusMap = {
      success: [
        STATUS.SUCCESS,
        STATUS.READY,
        STATUS.ONLINE,
        STATUS.CONNECTED,
        "synced",
        "available",
        "ok",
        "stable",
        STATUS.RUNNING,
        "started",
        "active",
        STATUS.HEALTHY,
        "optimal",
        "good",
        "completed",
        "passed",
      ],
      warning: [
        "warning",
        STATUS.DEGRADED,
        STATUS.CALIBRATING,
        "limited",
        STATUS.STARTING,
        STATUS.STOPPING,
        "pending",
        "busy",
        "processing",
        "queued",
        "scheduled",
        "weak",
        STATUS.RECONNECTING,
      ],
      error: [
        "critical",
        STATUS.ERROR,
        STATUS.OFFLINE,
        STATUS.FAILED,
        STATUS.DISCONNECTED,
        "unreachable",
        STATUS.STOPPED,
        "crashed",
        "timeout",
        "rejected",
      ],
      info: ["info", STATUS.IDLE, "waiting", "paused", STATUS.STANDBY, "syncing", STATUS.RUNNING],
      ghost: ["unconfigured", STATUS.UNKNOWN, "not_set", "undefined", "null", "none"],
    };
  }
  return _defaultStatusMap;
}

/**
 * Clone a status map to avoid shared mutation.
 *
 * @param map - Status variant map to clone.
 * @returns Shallow-cloned status variant map.
 */
function cloneStatusMap(map: StatusVariantMap): StatusVariantMap {
  return {
    success: [...map.success],
    warning: [...map.warning],
    error: [...map.error],
    info: [...map.info],
    ghost: [...map.ghost],
  };
}

/**
 * Deep-freeze status map arrays and object.
 *
 * @param map - Status variant map to freeze.
 * @returns Frozen status variant map.
 */
function freezeStatusMap(map: StatusVariantMap): Readonly<StatusVariantMap> {
  for (const key of Object.keys(map) as Array<keyof StatusVariantMap>) {
    Object.freeze(map[key]);
  }
  return Object.freeze(map);
}

// Lazily instantiate and freeze the shared map once so consumers receive a stable snapshot
/** DEFAULT_STATUS_MAP constant. */
export const DEFAULT_STATUS_MAP: Readonly<StatusVariantMap> = freezeStatusMap(
  cloneStatusMap(getDefaultStatusMap()),
);
