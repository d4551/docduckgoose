/**
 * Unified Status Configuration and Helpers
 *
 * Re-exports from split modules: status-config, status-accessors, and status-visual.
 * Original monolithic file split to stay under 400 lines per module.
 *
 * @baohaus/bao-utils/status
 */

import { STATUS } from "@baohaus/bao-constants/status-unified";
import { getBadgeVariantClass } from "./daisyui-badge";
import { normalizeStatus } from "./status-accessors";

export {
  canTransition,
  getAvailableTransitions,
  getCaseStatusBadgeClass,
  getCaseStatusColor,
  getCaseStatusConfig,
  getCaseStatusIcon,
  getCaseStatusLabel,
  getPriorityBadgeClass,
  getPriorityColor,
  getPriorityConfig,
  getPriorityIcon,
  getPriorityLabel,
  getPriorityLabelKeyFromLevel,
  getPriorityLevelFromLabel,
  getStatusFromWorkflowState,
  getWorkflowBadgeClass,
  getWorkflowColor,
  getWorkflowConfig,
  getWorkflowIcon,
  getWorkflowLabel,
  normalizeCaseStatus,
  normalizeCaseStatusCounts,
  normalizeStatus,
} from "./status-accessors";
export type {
  CaseStatus,
  CaseStatusConfigEntry,
  PriorityConfigEntry,
  PriorityLevel,
  WorkflowConfigEntry,
  WorkflowState,
} from "./status-config";
// Re-export all config and accessor symbols
export {
  CASE_STATUS_CONFIG,
  CASE_STATUSES,
  PRIORITY_CONFIG,
  PRIORITY_LABEL_ALIASES,
  PRIORITY_LEVELS,
  WORKFLOW_CONFIG,
  WORKFLOW_STATES,
} from "./status-config";

type StatusVariant = "success" | "warning" | "error" | "info" | "ghost";
type StatusVariantMap = Record<StatusVariant, string[]>;

let _defaultStatusMap: StatusVariantMap | null = null;

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

function cloneStatusMap(map: StatusVariantMap): StatusVariantMap {
  return {
    success: [...map.success],
    warning: [...map.warning],
    error: [...map.error],
    info: [...map.info],
    ghost: [...map.ghost],
  };
}

function freezeStatusMap(map: StatusVariantMap): Readonly<StatusVariantMap> {
  for (const key of Object.keys(map) as Array<keyof StatusVariantMap>) {
    Object.freeze(map[key]);
  }
  return Object.freeze(map);
}

export const DEFAULT_STATUS_MAP: Readonly<StatusVariantMap> = freezeStatusMap(
  cloneStatusMap(getDefaultStatusMap()),
);

export type IndicatorStatus =
  | typeof STATUS.READY
  | typeof STATUS.SUCCESS
  | "warning"
  | typeof STATUS.ERROR
  | typeof STATUS.OFFLINE
  | typeof STATUS.LOADING
  | typeof STATUS.CONNECTING;

export function variantForStatus(
  status: unknown,
  customMap: Partial<StatusVariantMap> = {},
): StatusVariant {
  const normalized = normalizeStatus(status);
  if (!normalized) {
    return "ghost";
  }
  const map = { ...getDefaultStatusMap(), ...customMap } as StatusVariantMap;
  for (const [variant, list] of Object.entries(map) as [StatusVariant, string[]][]) {
    if (list.includes(normalized)) {
      return variant;
    }
  }
  return "ghost";
}

export function badgeClassForStatus(
  status: unknown,
  customMap?: Partial<StatusVariantMap>,
): string {
  return getBadgeVariantClass(variantForStatus(status, customMap));
}

export function badgeOutlineForStatus(
  status: unknown,
  customMap?: Partial<StatusVariantMap>,
): string {
  return `${badgeClassForStatus(status, customMap)} badge-outline`;
}

export function alertVariantForStatus(
  status: unknown,
  customMap?: Partial<StatusVariantMap>,
): string {
  return `alert-${variantForStatus(status, customMap)}`;
}

export function dotClassForStatus(status: unknown): string {
  const normalized = normalizeStatus(status);
  if (
    [
      "ok",
      STATUS.CONNECTED,
      STATUS.HEALTHY,
      STATUS.RUNNING,
      "available",
      STATUS.ONLINE,
      STATUS.READY,
      "stable",
      STATUS.SUCCESS,
    ].includes(normalized)
  ) {
    return "bg-success";
  }
  if (
    [
      "warn",
      "warning",
      STATUS.UNKNOWN,
      STATUS.STARTING,
      STATUS.STOPPING,
      STATUS.DEGRADED,
      "limited",
      "pending",
      STATUS.RECONNECTING,
      "weak",
    ].includes(normalized)
  ) {
    return "bg-warning";
  }
  if (
    [
      STATUS.ERROR,
      "unreachable",
      STATUS.DISCONNECTED,
      STATUS.OFFLINE,
      STATUS.FAILED,
      "critical",
      STATUS.STOPPED,
    ].includes(normalized)
  ) {
    return "bg-error";
  }
  return "bg-base-300";
}

export function formatStatusLabel(status: unknown, fallback = "Unknown"): string {
  const normalized = normalizeStatus(status);
  if (!normalized) {
    return fallback;
  }
  return normalized
    .split(/[-_\s]+/u)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

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

export function normalizeHealthStatus(
  raw: string | undefined,
): typeof STATUS.HEALTHY | "unhealthy" | typeof STATUS.DEGRADED | typeof STATUS.UNKNOWN {
  const health = healthStatusFor(raw);
  if (health === "critical") {
    return "unhealthy";
  }
  return health;
}

export function indicatorStatusFor(
  value: unknown,
  fallback: IndicatorStatus = STATUS.READY,
  customMap: Partial<StatusVariantMap> = {},
): IndicatorStatus {
  const normalized = normalizeStatus(value);
  if (!normalized) {
    return fallback;
  }
  const map = { ...getDefaultStatusMap(), ...customMap } as StatusVariantMap;
  if (map.success.includes(normalized)) {
    return STATUS.READY;
  }
  if (map.warning.includes(normalized)) {
    return "warning";
  }
  if (map.error.includes(normalized)) {
    if ([STATUS.OFFLINE, STATUS.DISCONNECTED, "unreachable"].includes(normalized)) {
      return STATUS.OFFLINE;
    }
    return STATUS.ERROR;
  }
  if ([STATUS.RUNNING, "syncing", STATUS.STARTING].includes(normalized)) {
    return STATUS.LOADING;
  }
  if (["waiting", STATUS.IDLE, "paused", STATUS.STANDBY].includes(normalized)) {
    return STATUS.CONNECTING;
  }
  return fallback;
}

export function labelForStatus(value: unknown): string {
  const status = normalizeStatus(value);
  const map: Record<string, string> = {
    disabled: "Disabled",
    healthy: "Healthy",
    ready: "Ready",
    online: "Online",
    connected: "Connected",
    available: "Available",
    running: "Running",
    starting: "Starting",
    started: "Started",
    stopped: "Stopped",
    stopping: "Stopping",
    stable: "Stable",
    idle: "Idle",
    warning: "Attention",
    degraded: "Degraded",
    calibrating: "Calibrating",
    limited: "Limited",
    critical: "Critical",
    error: "Error",
    offline: "Offline",
    unreachable: "Unreachable",
    disconnected: "Disconnected",
    unconfigured: "Unconfigured",
    unknown: "Unknown",
    synced: "Synced",
    ok: "OK",
    pending: "Pending",
    processing: "Processing",
    queued: "Queued",
    busy: "Busy",
    scheduled: "Scheduled",
    weak: "Weak",
    reconnecting: "Reconnecting",
    failed: "Failed",
    crashed: "Crashed",
    timeout: "Timeout",
    rejected: "Rejected",
    success: "Success",
    active: "Active",
    optimal: "Optimal",
    good: "Good",
    completed: "Completed",
    passed: "Passed",
    info: "Info",
    waiting: "Waiting",
    paused: "Paused",
    standby: "Standby",
    syncing: "Syncing",
    not_set: "Not Set",
    none: "None",
  };
  if (map[status]) {
    return map[status];
  }
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
}

export function iconToneFor(status: unknown): string {
  const raw =
    typeof status === "string"
      ? status
      : typeof status === "number" || typeof status === "boolean"
        ? String(status)
        : "";
  const s = raw.toLowerCase();
  if (!s) {
    return "text-base-content/60";
  }
  if (
    [
      STATUS.SUCCESS,
      STATUS.READY,
      STATUS.ONLINE,
      "ok",
      STATUS.HEALTHY,
      "available",
      STATUS.RUNNING,
      STATUS.CONNECTED,
      "active",
      "synced",
    ].some((k) => s.includes(k))
  ) {
    return "text-success";
  }
  if (
    [
      "warning",
      STATUS.DEGRADED,
      STATUS.RECONNECTING,
      "limited",
      STATUS.CALIBRATING,
      "busy",
      "pending",
    ].some((k) => s.includes(k))
  ) {
    return "text-warning";
  }
  if (
    [STATUS.ERROR, STATUS.OFFLINE, "critical", STATUS.FAILED, STATUS.DISCONNECTED].some((k) =>
      s.includes(k),
    )
  ) {
    return "text-error";
  }
  if (
    [
      "info",
      STATUS.IDLE,
      "waiting",
      "paused",
      STATUS.STANDBY,
      "syncing",
      "processing",
      "queued",
    ].some((k) => s.includes(k))
  ) {
    return "text-info";
  }
  return "text-base-content/60";
}
