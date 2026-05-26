/**
 * UI class resolution helpers for status values.
 *
 * Maps raw status inputs to DaisyUI badge, alert, dot, icon-tone, and
 * indicator-state classes/identifiers.
 */

import { STATUS } from "../../constants/status-unified";
import { getBadgeVariantClass } from "../../ui/class-maps/badge-maps";
import { normalizeStatus } from "./normalize";
import { getDefaultStatusMap, type StatusVariant, type StatusVariantMap } from "./variants";

/**
 * Standard statuses used for UI indicators (dots, connectivity, etc.)
 */
export type IndicatorStatus =
  | typeof STATUS.READY
  | typeof STATUS.SUCCESS
  | "warning"
  | typeof STATUS.ERROR
  | typeof STATUS.OFFLINE
  | typeof STATUS.LOADING
  | typeof STATUS.CONNECTING;

/**
 * Determines the UI variant (success, warning, error, etc.) for a given status.
 *
 * @param status - The status to check
 * @param [customMap] - Optional overrides for the status map
 * @returns The determined variant type
 */
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

/**
 * Resolve a DaisyUI badge class for a status variant.
 *
 * @param status - Status input.
 * @param [customMap] - Optional variant map overrides.
 * @returns DaisyUI badge class name.
 */
export function badgeClassForStatus(
  status: unknown,
  customMap?: Partial<StatusVariantMap>,
): string {
  return getBadgeVariantClass(variantForStatus(status, customMap));
}

/**
 * Resolve a DaisyUI badge outline class for a status variant.
 *
 * @param status - Status input.
 * @param [customMap] - Optional variant map overrides.
 * @returns DaisyUI badge outline class name.
 */
export function badgeOutlineForStatus(
  status: unknown,
  customMap?: Partial<StatusVariantMap>,
): string {
  return `${badgeClassForStatus(status, customMap)} badge-outline`;
}

/**
 * Resolve a DaisyUI alert variant class for a status.
 *
 * @param status - Status input.
 * @param [customMap] - Optional variant map overrides.
 * @returns DaisyUI alert variant class name.
 */
export function alertVariantForStatus(
  status: unknown,
  customMap?: Partial<StatusVariantMap>,
): string {
  return `alert-${variantForStatus(status, customMap)}`;
}

/**
 * Resolve the status indicator dot class.
 *
 * @param status - Status input.
 * @returns Background color class for the dot.
 */
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

/**
 * Maps a status value to a standardized `IndicatorStatus` for UI components.
 * Accounts for loading/connecting states and specific error conditions.
 *
 * @param value - Raw status value
 * @param [fallback=STATUS.READY] - Default status if no match found
 * @param [customMap] - Optional map overrides
 * @returns Resolved indicator status
 */
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

/**
 * Returns a human-readable label for a status string.
 * Uses a predefined map for common statuses and falls back to capitalizing words.
 *
 * @param value - Status string
 * @returns Human-readable label
 */
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

/**
 * Returns the text color class (DaisyUI) suitable for a given status.
 *
 * @param status - The status to check
 * @returns One of 'text-success', 'text-warning', 'text-error', 'text-info', or default
 */
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
