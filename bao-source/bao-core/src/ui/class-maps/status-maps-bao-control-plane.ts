/**
 * BaoControlPlane GitOps class maps (sync, cluster mode, secrets, package, status surfaces).
 *
 * Helpers and constant maps that resolve BaoControlPlane GitOps state to DaisyUI badge,
 * status dot, or text classes — and the matching i18n label keys. Sibling of:
 *   - status-maps-thresholds.ts (numeric thresholds)
 *   - status-maps-presence.ts (boolean/string indicators)
 *   - status-maps-aggregate.ts (pricing / overall health / catalog / notifications)
 */

// Sync State

/**
 * Status dot class map for GitOps sync states.
 * Maps sync state strings to DaisyUI `status-*` classes.
 */
export const BAO_CONTROL_PLANE_SYNC_STATUS_CLASS_MAP: Record<string, string> = {
  synced: "status-success",
  out_of_sync: "status-warning",
  retrying: "status-info",
  permanently_failed: "status-error",
  not_available: "status-neutral",
} as const;

/**
 * Get DaisyUI status dot class for a GitOps sync state.
 *
 * @param sync - GitOps sync state string (null = unknown).
 * @returns DaisyUI status class name.
 */
export function getBaoControlPlaneSyncStatusClass(sync: string | null): string {
  if (!sync) {
    return "status-neutral";
  }
  return BAO_CONTROL_PLANE_SYNC_STATUS_CLASS_MAP[sync] ?? "status-neutral";
}

/**
 * Label key map for GitOps sync states.
 *
 * Values are i18n keys. UI layers should translate them.
 */
export const BAO_CONTROL_PLANE_SYNC_LABEL_MAP: Record<string, string> = {
  synced: "setupWizard.status.synced",
  out_of_sync: "setupWizard.status.outOfSync",
  retrying: "setupWizard.status.retrying",
  permanently_failed: "setupWizard.status.permanentlyFailed",
  not_available: "setupWizard.status.notAvailable",
} as const;

/**
 * Get a human-readable label for a GitOps sync state.
 *
 * @param sync - GitOps sync state string (null = unknown).
 * @returns Label key (translate in the UI).
 */
export function getBaoControlPlaneSyncLabel(sync: string | null): string {
  if (!sync) {
    return "setupWizard.status.unknown";
  }
  return BAO_CONTROL_PLANE_SYNC_LABEL_MAP[sync] ?? sync;
}

/**
 * Text color class map for GitOps sync states.
 */
export const BAO_CONTROL_PLANE_SYNC_TEXT_CLASS_MAP: Record<string, string> = {
  synced: "text-success",
  permanently_failed: "text-error",
} as const;

/**
 * Get text color class for a GitOps sync state.
 *
 * @param sync - GitOps sync state string (null = fallback).
 * @returns Tailwind text color class.
 */
export function getBaoControlPlaneSyncTextClass(sync: string | null): string {
  if (!sync) {
    return "text-warning";
  }
  return BAO_CONTROL_PLANE_SYNC_TEXT_CLASS_MAP[sync] ?? "text-warning";
}

// Cluster Mode

/**
 * Badge class map for BaoControlPlane cluster modes.
 */
export const BAO_CONTROL_PLANE_CLUSTER_MODE_BADGE_MAP: Record<string, string> = {
  control_plane: "badge-primary",
  workload_autonomous: "badge-accent",
  workload_managed: "badge-secondary",
} as const;

/**
 * Get badge class for an BaoControlPlane cluster mode.
 *
 * @param mode - Cluster mode string.
 * @returns DaisyUI badge class name.
 */
export function getBaoControlPlaneClusterModeBadgeClass(mode: string): string {
  return BAO_CONTROL_PLANE_CLUSTER_MODE_BADGE_MAP[mode] ?? "badge-ghost";
}

/**
 * Label key map for BaoControlPlane cluster modes.
 *
 * Values are i18n keys. UI layers should translate them.
 */
export const BAO_CONTROL_PLANE_CLUSTER_MODE_LABEL_MAP: Record<string, string> = {
  control_plane: "setupWizard.status.controlPlane",
  workload_autonomous: "setupWizard.status.workloadAutonomous",
  workload_managed: "setupWizard.status.workloadManaged",
} as const;

/**
 * Get a human-readable label for an BaoControlPlane cluster mode.
 *
 * @param mode - Cluster mode string.
 * @returns Label key (translate in the UI).
 */
export function getBaoControlPlaneClusterModeLabel(mode: string): string {
  return BAO_CONTROL_PLANE_CLUSTER_MODE_LABEL_MAP[mode] ?? mode;
}

// Secrets Strategy

/**
 * Badge class map for BaoControlPlane secrets strategy.
 */
export const BAO_CONTROL_PLANE_SECRETS_STRATEGY_BADGE_MAP: Record<string, string> = {
  sops: "badge-success",
  eso: "badge-success",
  none: "badge-warning",
} as const;

/**
 * Get badge class for a secrets strategy state.
 *
 * @param strategy - Secrets strategy string.
 * @param configured - Whether the strategy is configured.
 * @returns DaisyUI badge class name.
 */
export function getBaoControlPlaneSecretsStrategyBadgeClass(
  strategy: string | null,
  configured: boolean,
): string {
  if (!strategy) {
    return "badge-ghost";
  }
  if (configured) {
    return "badge-success";
  }
  return BAO_CONTROL_PLANE_SECRETS_STRATEGY_BADGE_MAP[strategy] ?? "badge-error";
}

/**
 * Label key map for BaoControlPlane secrets strategies.
 *
 * Values are i18n keys. UI layers should translate them.
 */
export const BAO_CONTROL_PLANE_SECRETS_STRATEGY_LABEL_MAP: Record<string, string> = {
  sops: "setupWizard.status.sopsAge",
  eso: "setupWizard.status.externalSecretsOperator",
  none: "setupWizard.status.none",
} as const;

/**
 * Get a human-readable label for a secrets strategy.
 *
 * @param strategy - Secrets strategy string (null = not available).
 * @returns Label key (translate in the UI).
 */
export function getBaoControlPlaneSecretsStrategyLabel(strategy: string | null): string {
  if (!strategy) {
    return "setupWizard.status.notAvailable";
  }
  return BAO_CONTROL_PLANE_SECRETS_STRATEGY_LABEL_MAP[strategy] ?? "setupWizard.status.unknown";
}

// Tri-state Helpers

/**
 * Get status dot class for a SOPS key or ESO installed state.
 *
 * @param state - Boolean state (true=ok, false=bad, null=n/a).
 * @param falseClass - Class for false state (default: 'status-error').
 * @returns DaisyUI status class name.
 */
export function getBaoControlPlaneTriStateDotClass(
  state: boolean | null,
  falseClass = "status-error",
): string {
  if (state === true) {
    return "status-success";
  }
  if (state === false) {
    return falseClass;
  }
  return "status-warning";
}

/**
 * Get label for a SOPS key configured state.
 *
 * @param state - Boolean state (true=configured, false=placeholder, null=n/a).
 * @returns Label token (i18n key recommended; translate in the UI).
 */
export function getBaoControlPlaneBooleanLabel(
  state: boolean | null,
  trueLabel: string,
  falseLabel: string,
  nullLabel = "setupWizard.status.notAvailable",
): string {
  if (state === true) {
    return trueLabel;
  }
  if (state === false) {
    return falseLabel;
  }
  return nullLabel;
}

// Status Surface (GitOps, Promotion, etc.)

/**
 * Badge class map for BaoControlPlane status surfaces (GitOps, promotion, etc).
 */
export const BAO_CONTROL_PLANE_STATUS_BADGE_CLASS_MAP: Record<string, string> = {
  healthy: "badge-success",
  degraded: "badge-warning",
  error: "badge-error",
  unreachable: "badge-error",
  not_configured: "badge-warning",
  disabled: "badge-ghost",
  unknown: "badge-ghost",
} as const;

/**
 * Get a badge class for an BaoControlPlane status token.
 *
 * @param status - BaoControlPlane status token (null = fallback).
 * @returns DaisyUI badge class string.
 */
export function getBaoControlPlaneStatusBadgeClass(status: string | null): string {
  if (!status) {
    return "badge-ghost";
  }
  return BAO_CONTROL_PLANE_STATUS_BADGE_CLASS_MAP[status] ?? "badge-ghost";
}

/**
 * Label key map for BaoControlPlane status surfaces (GitOps, promotion, etc).
 *
 * Values are i18n keys. UI layers should translate them.
 */
export const BAO_CONTROL_PLANE_STATUS_LABEL_MAP: Record<string, string> = {
  disabled: "setupWizard.status.disabled",
  not_configured: "setupWizard.status.notConfigured",
  unreachable: "setupWizard.status.unreachable",
  healthy: "setupWizard.status.healthy",
  degraded: "setupWizard.status.degraded",
  unknown: "setupWizard.status.unknown",
  error: "setupWizard.status.error",
} as const;

/**
 * Get a human-readable label key for an BaoControlPlane status token.
 *
 * @param status - BaoControlPlane status token (null = unknown).
 * @returns i18n key (translate in the UI).
 */
export function getBaoControlPlaneStatusLabel(status: string | null): string {
  if (!status) {
    return "setupWizard.status.unknown";
  }
  return BAO_CONTROL_PLANE_STATUS_LABEL_MAP[status] ?? status;
}

// Package CRD Release

/**
 * Badge class map for BaoControlPlane Package CRD release statuses.
 */
export const BAO_CONTROL_PLANE_PACKAGE_STATUS_BADGE_CLASS_MAP: Record<string, string> = {
  installed: "badge-success",
  failed: "badge-error",
  not_installed: "badge-warning",
  not_available: "badge-ghost",
  unknown: "badge-ghost",
} as const;

/**
 * Get a badge class for an BaoControlPlane Package CRD status token.
 *
 * @param status - Package CRD status token (null = fallback).
 * @returns DaisyUI badge class string.
 */
export function getBaoControlPlanePackageStatusBadgeClass(status: string | null): string {
  if (!status) {
    return "badge-ghost";
  }
  return BAO_CONTROL_PLANE_PACKAGE_STATUS_BADGE_CLASS_MAP[status] ?? "badge-ghost";
}

/**
 * Label key map for BaoControlPlane Package CRD release statuses.
 *
 * Values are i18n keys. UI layers should translate them.
 */
export const BAO_CONTROL_PLANE_PACKAGE_STATUS_LABEL_MAP: Record<string, string> = {
  installed: "setupWizard.status.installed",
  failed: "setupWizard.status.failed",
  not_installed: "setupWizard.status.notInstalled",
  not_available: "setupWizard.status.notAvailable",
  unknown: "setupWizard.status.unknown",
} as const;

/**
 * Get a human-readable label key for an BaoControlPlane Package CRD status token.
 *
 * @param status - Package CRD status token (null = unknown).
 * @returns i18n key (translate in the UI).
 */
export function getBaoControlPlanePackageStatusLabel(status: string | null): string {
  if (!status) {
    return "setupWizard.status.unknown";
  }
  return BAO_CONTROL_PLANE_PACKAGE_STATUS_LABEL_MAP[status] ?? status;
}
