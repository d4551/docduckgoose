/**
 * Core status, loading, alert component class maps.
 *
 * Domain-specific status mappings (BaoDown, RPA, integration capabilities)
 * and cross-cutting status indicator helpers. Generic form component maps
 * (badge, input, table, card, modal, checkbox, toggle, etc.) live in their
 * own domain files and are re-exported via the barrel.
 *
 * libs/shared/src/ui/class-maps/status-maps-core.ts
 */

import type { BaoDownRunStatus } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";
import type { BaoDownTriggerType } from "@baohaus/bao-types/baodown";

// Re-import from domain files for internal use — NOT re-exported from here.
import {
  BADGE_VARIANT_STYLE_MAP,
  type BadgeSize,
  type BadgeStyle,
  type BadgeVariant,
  getBadgeSizeClass,
  getBadgeVariantStyleClass,
} from "./badge-maps";
import type { AlertVariant } from "./layout-maps";

// BaoDown

/**
 * BaoDown run status -> DaisyUI badge class mapping.
 *
 * UI mapping is centralized here to avoid DRY violations across:
 * - HTML templates/components
 * - Dashboard widgets
 * - Any future BaoDown console surfaces
 */
export const BAODOWN_RUN_STATUS_BADGE_CLASS_MAP: Readonly<Record<BaoDownRunStatus, string>> = {
  PENDING: "badge-soft badge-primary",
  QUEUED: "badge-soft badge-primary",
  RUNNING: "badge-soft badge-info",
  COMPLETED: "badge-soft badge-success",
  FAILED: "badge-soft badge-error",
  CANCELLED: "badge-soft badge-warning",
  TIMEOUT: "badge-soft badge-error",
} as const;

/**
 * Resolve a BaoDown run status badge class.
 *
 * @param status - Run status string.
 * @returns DaisyUI badge classes.
 */
export function resolveBaoDownRunStatusBadgeClass(status: string): string {
  return (
    BAODOWN_RUN_STATUS_BADGE_CLASS_MAP[status as BaoDownRunStatus] ??
    `${BADGE_VARIANT_STYLE_MAP.ghost}`
  );
}

/**
 * BaoDown trigger type -> DaisyUI badge class mapping.
 *
 * Centralized so runs table, run detail, and dashboard widgets share
 * a single trigger-type visual language.
 */
export const BAODOWN_TRIGGER_TYPE_BADGE_CLASS_MAP: Readonly<Record<BaoDownTriggerType, string>> = {
  MANUAL: "badge-soft badge-neutral",
  SCHEDULE: "badge-soft badge-accent",
  API: "badge-soft badge-secondary",
  WEBHOOK: "badge-soft badge-primary",
} as const;

/**
 * Resolve a BaoDown trigger type badge class.
 *
 * @param triggerType - Trigger type string.
 * @returns DaisyUI badge classes.
 */
export function resolveBaoDownTriggerTypeBadgeClass(triggerType: string): string {
  return (
    BAODOWN_TRIGGER_TYPE_BADGE_CLASS_MAP[triggerType as BaoDownTriggerType] ??
    `${BADGE_VARIANT_STYLE_MAP.ghost}`
  );
}

/** RPA execution trigger type. */
export type RpaTriggerType = "MANUAL" | "SCHEDULE" | "API" | "WEBHOOK" | "BAODOWN";

/**
 * RPA execution trigger type -> DaisyUI badge class mapping.
 */
export const RPA_TRIGGER_TYPE_BADGE_CLASS_MAP: Readonly<Record<RpaTriggerType, string>> = {
  MANUAL: "badge-soft badge-neutral",
  SCHEDULE: "badge-soft badge-accent",
  API: "badge-soft badge-secondary",
  WEBHOOK: "badge-soft badge-primary",
  BAODOWN: "badge-soft badge-info",
};

/**
 * Resolve a DaisyUI badge class for an RPA execution trigger type.
 *
 * @param triggerType - RPA trigger type string.
 * @returns DaisyUI badge classes.
 */
export function resolveRpaTriggerTypeBadgeClass(triggerType: string): string {
  return (
    RPA_TRIGGER_TYPE_BADGE_CLASS_MAP[triggerType as RpaTriggerType] ??
    `${BADGE_VARIANT_STYLE_MAP.ghost}`
  );
}

/** Known integration capability states. */
export type IntegrationCapabilityState =
  | "enabled"
  | "disabled"
  | "connected"
  | "disconnected"
  | "partial"
  | "error";

/**
 * Integration capability state -> DaisyUI status dot class mapping.
 *
 * Single source of truth for integration status indicators across:
 * - BaoDown integrations tab
 * - Automation hub cards
 * - Dashboard integration widgets
 */
export const INTEGRATION_CAPABILITY_STATUS_MAP: Readonly<
  Record<IntegrationCapabilityState, string>
> = {
  enabled: "status-success",
  disabled: "status-neutral",
  connected: "status-success",
  disconnected: "status-error",
  partial: "status-warning",
  error: "status-error",
} as const;

/**
 * Resolve a DaisyUI status dot class for an integration capability state.
 *
 * @param state - Capability state string.
 * @returns DaisyUI status class.
 */
export function resolveIntegrationCapabilityStatusClass(state: string): string {
  return INTEGRATION_CAPABILITY_STATUS_MAP[state as IntegrationCapabilityState] ?? "status-neutral";
}

/**
 * Integration capability state -> DaisyUI badge class mapping (soft variant).
 *
 * Used for badge-style integration state indicators on cards and tables.
 */
export const INTEGRATION_CAPABILITY_BADGE_MAP: Readonly<
  Record<IntegrationCapabilityState, string>
> = {
  enabled: "badge-soft badge-success",
  disabled: "badge-soft badge-neutral",
  connected: "badge-soft badge-success",
  disconnected: "badge-soft badge-error",
  partial: "badge-soft badge-warning",
  error: "badge-soft badge-error",
} as const;

/**
 * Resolve a DaisyUI badge class for an integration capability state.
 *
 * @param state - Capability state string.
 * @returns DaisyUI badge classes.
 */
export function resolveIntegrationCapabilityBadgeClass(state: string): string {
  return (
    INTEGRATION_CAPABILITY_BADGE_MAP[state as IntegrationCapabilityState] ??
    "badge-soft badge-ghost"
  );
}

// Status Component (DaisyUI 5)
// Simple dot indicator for status display
// @see https://daisyui.com/components/status/

/**
 * Maps semantic statuses to DaisyUI status dot color classes.
 * Includes both base DaisyUI colors and semantic status mappings.
 * Used for status indicators, connection dots, health badges.
 */
export const STATUS_COLOR_MAP: {
  readonly neutral: "status-neutral";
  readonly primary: "status-primary";
  readonly secondary: "status-secondary";
  readonly accent: "status-accent";
  readonly info: "status-info";
  readonly success: "status-success";
  readonly warning: "status-warning";
  readonly error: "status-error";
  readonly ready: "status-success";
  readonly online: "status-success";
  readonly connected: "status-success";
  readonly healthy: "status-success";
  readonly offline: "status-error";
  readonly disconnected: "status-error";
  readonly failed: "status-error";
  readonly loading: "status-warning";
  readonly pending: "status-warning";
  readonly connecting: "status-info";
  readonly unknown: "status-neutral";
  readonly idle: "status-neutral";
} = {
  // Base DaisyUI colors
  neutral: "status-neutral",
  primary: "status-primary",
  secondary: "status-secondary",
  accent: "status-accent",
  info: "status-info",
  success: "status-success",
  warning: "status-warning",
  error: "status-error",
  // Semantic status mappings
  ready: "status-success",
  online: "status-success",
  connected: "status-success",
  healthy: "status-success",
  offline: "status-error",
  disconnected: "status-error",
  failed: "status-error",
  loading: "status-warning",
  pending: "status-warning",
  connecting: "status-info",
  unknown: "status-neutral",
  idle: "status-neutral",
} as const;

/** Type alias for StatusColor keys. */
export type StatusColor = keyof typeof STATUS_COLOR_MAP;

/** DaisyUI class mapping for STATUS_SIZE_MAP. */
export const STATUS_SIZE_MAP: {
  readonly xs: "status-xs";
  readonly sm: "status-sm";
  readonly md: "status-md";
  readonly lg: "status-lg";
  readonly xl: "status-xl";
} = {
  xs: "status-xs",
  sm: "status-sm",
  md: "status-md",
  lg: "status-lg",
  xl: "status-xl",
} as const;

/** Type alias for StatusSize keys. */
export type StatusSize = keyof typeof STATUS_SIZE_MAP;

/**
 * Get status color class from any status value.
 * Maps semantic status values to DaisyUI status colors.
 */
export function getStatusColorClass(status: StatusColor | string): string {
  const normalized = String(status || "").toLowerCase();
  return STATUS_COLOR_MAP[normalized as StatusColor] || STATUS_COLOR_MAP.neutral;
}

/** Get status size class. */
export function getStatusSizeClass(size: StatusSize | string): string {
  return STATUS_SIZE_MAP[size as StatusSize] || STATUS_SIZE_MAP.md;
}

/**
 * Get complete status classes for inline usage.
 * Returns combined status class string.
 */
export function getStatusClasses(status: string, size: StatusSize = "md"): string {
  return `status ${getStatusColorClass(status)} ${getStatusSizeClass(size)}`;
}

/**
 * Maps a semantic status to DaisyUI badge color.
 * Use for badge variants based on status.
 */
export function statusToBadgeColor(status: string): BadgeVariant {
  const normalized = String(status || "").toLowerCase();
  const mapping: Record<string, BadgeVariant> = {
    // Success states
    success: "success",
    ready: "success",
    online: "success",
    connected: "success",
    healthy: "success",
    active: "success",
    running: "success",
    completed: "success",
    approved: "success",
    enabled: "success",
    pass: "success",
    // Error states
    error: "error",
    failed: "error",
    fail: "error",
    offline: "error",
    disconnected: "error",
    attention: "error",
    critical: "error",
    rejected: "error",
    // Warning states
    warning: "warning",
    pending: "warning",
    loading: "warning",
    standby: "warning",
    queued: "warning",
    paused: "warning",
    degraded: "warning",
    maintenance: "warning",
    skip: "warning",
    skipped: "warning",
    // Info states
    info: "info",
    connecting: "info",
    processing: "info",
    draft: "info",
    template: "info",
  };
  return mapping[normalized] || "neutral";
}

/**
 * Get full badge class string for a status with optional size and style.
 * Combines badge base, color, size, and style classes.
 *
 * @param status - Semantic status string (e.g., 'active', 'pending', 'error').
 * @param options - Optional size and style modifiers.
 * @returns Full DaisyUI badge class string.
 */
export function getStatusBadgeClass(
  status: string,
  options?: { size?: BadgeSize; style?: BadgeStyle },
): string {
  const color = statusToBadgeColor(status);
  const classes = ["badge", `badge-${color}`];
  if (options?.size) {
    classes.push(getBadgeSizeClass(options.size));
  }
  if (options?.style) {
    classes.push(getBadgeVariantStyleClass(options.style));
  }
  return classes.join(" ");
}

/**
 * Maps a semantic status to DaisyUI alert variant.
 * Use for alert variants based on status.
 */
export function statusToAlertVariant(status: string): AlertVariant {
  const normalized = String(status || "").toLowerCase();
  const mapping: Record<string, AlertVariant> = {
    success: "success",
    ready: "success",
    error: "error",
    failed: "error",
    warning: "warning",
    pending: "warning",
    info: "info",
  };
  return mapping[normalized] || "info";
}
