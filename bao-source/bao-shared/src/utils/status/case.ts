/**
 * Case status taxonomy, configuration, and helpers.
 */

import { normalizeStatus } from "./normalize";

/**
 * Configuration for overall case status states.
 */
export const CASE_STATUSES: {
  readonly PENDING: "pending";
  readonly IN_PROGRESS: "in-progress";
  readonly COMPLETED: "completed";
  readonly CANCELLED: "cancelled";
  readonly ARCHIVED: "archived";
} = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  ARCHIVED: "archived",
} as const;

/** Inferred type from the CaseStatus schema. */
export type CaseStatus = (typeof CASE_STATUSES)[keyof typeof CASE_STATUSES];

/**
 * Configuration entry for a case status.
 */
export interface CaseStatusConfigEntry {
  label: string;
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
}

/** CASE_STATUS_CONFIG constant. */
export const CASE_STATUS_CONFIG: Record<CaseStatus, CaseStatusConfigEntry> = {
  [CASE_STATUSES.PENDING]: {
    label: "Pending",
    description: "Case is pending initial processing",
    color: "gray",
    icon: "clock",
    badge: "badge-outline",
    order: 1,
  },

  [CASE_STATUSES.IN_PROGRESS]: {
    label: "In Progress",
    description: "Case is actively being processed",
    color: "blue",
    icon: "arrow-path",
    badge: "badge-info",
    order: 2,
  },

  [CASE_STATUSES.COMPLETED]: {
    label: "Completed",
    description: "Case has been completed",
    color: "green",
    icon: "check-circle",
    badge: "badge-success",
    order: 3,
  },

  [CASE_STATUSES.CANCELLED]: {
    label: "Cancelled",
    description: "Case has been cancelled",
    color: "red",
    icon: "x-circle",
    badge: "badge-error",
    order: 4,
  },

  [CASE_STATUSES.ARCHIVED]: {
    label: "Archived",
    description: "Case has been archived",
    color: "gray",
    icon: "archive-box",
    badge: "badge-outline",
    order: 5,
  },
};

const CASE_STATUS_VALUES = Object.values(CASE_STATUSES) as CaseStatus[];

/**
 * Normalize case status input to a known case status.
 *
 * @param status - Case status input.
 * @returns Normalized case status.
 */
export function normalizeCaseStatus(status: string | CaseStatus): CaseStatus {
  const normalized = normalizeStatus(status).replace(/\s+/g, "-");
  return CASE_STATUS_VALUES.includes(normalized as CaseStatus)
    ? (normalized as CaseStatus)
    : CASE_STATUSES.PENDING;
}

/**
 * Normalize a case status counts map into canonical status keys.
 *
 * @param counts - Raw case status counts keyed by status values.
 * @returns Normalized counts keyed by canonical case status.
 */
export function normalizeCaseStatusCounts(
  counts: Record<string, number> | null | undefined,
): Record<CaseStatus, number> {
  const normalized: Record<CaseStatus, number> = {
    [CASE_STATUSES.PENDING]: 0,
    [CASE_STATUSES.IN_PROGRESS]: 0,
    [CASE_STATUSES.COMPLETED]: 0,
    [CASE_STATUSES.CANCELLED]: 0,
    [CASE_STATUSES.ARCHIVED]: 0,
  };

  if (!counts) {
    return normalized;
  }

  for (const [key, value] of Object.entries(counts)) {
    const normalizedKey = normalizeCaseStatus(key);
    const safeValue = Number.isFinite(value) ? value : 0;
    normalized[normalizedKey] += safeValue;
  }

  return normalized;
}

/**
 * Retrieves the configuration entry for a specific case status.
 *
 * @param status - The case status
 * @returns Config object for the status
 */
export function getCaseStatusConfig(status: string | CaseStatus): CaseStatusConfigEntry {
  const key = normalizeCaseStatus(status);
  return CASE_STATUS_CONFIG[key];
}

/**
 * Get the display label for a case status.
 *
 * @param status - Case status input.
 * @returns Case status label.
 */
export function getCaseStatusLabel(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).label;
}

/**
 * Get the badge class for a case status.
 *
 * @param status - Case status input.
 * @returns DaisyUI badge class.
 */
export function getCaseStatusBadgeClass(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).badge;
}

/**
 * Get the color token for a case status.
 *
 * @param status - Case status input.
 * @returns Case status color.
 */
export function getCaseStatusColor(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).color;
}

/**
 * Get the icon name for a case status.
 *
 * @param status - Case status input.
 * @returns Icon name.
 */
export function getCaseStatusIcon(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).icon;
}
