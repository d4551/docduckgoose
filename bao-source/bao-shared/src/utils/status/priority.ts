/**
 * Priority level taxonomy, configuration, and helpers.
 */

import { normalizeStatus } from "./normalize";

/** PRIORITY_LEVELS constant. */
export const PRIORITY_LEVELS: {
  readonly ROUTINE: 0;
  readonly PRIORITY: 1;
  readonly URGENT: 2;
  readonly STAT: 3;
} = {
  ROUTINE: 0,
  PRIORITY: 1,
  URGENT: 2,
  STAT: 3,
} as const;

/** Inferred type from the PriorityLevel schema. */
export type PriorityLevel = (typeof PRIORITY_LEVELS)[keyof typeof PRIORITY_LEVELS];

/**
 * Interface PriorityConfigEntry.
 */
export interface PriorityConfigEntry {
  label: string;
  labelKey: "routine" | "priority" | "urgent" | "stat";
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
  urgency: "low" | "medium" | "high";
}

/** PRIORITY_CONFIG constant. */
export const PRIORITY_CONFIG: Record<PriorityLevel, PriorityConfigEntry> = {
  [PRIORITY_LEVELS.ROUTINE]: {
    label: "Routine",
    labelKey: "routine",
    description: "Routine processing (24-72 hours)",
    color: "gray",
    icon: "clock",
    badge: "badge-neutral",
    order: 1,
    urgency: "low",
  },

  [PRIORITY_LEVELS.PRIORITY]: {
    label: "Priority",
    labelKey: "priority",
    description: "Priority processing (12-24 hours)",
    color: "blue",
    icon: "flag",
    badge: "badge-info",
    order: 2,
    urgency: "medium",
  },

  [PRIORITY_LEVELS.URGENT]: {
    label: "Urgent",
    labelKey: "urgent",
    description: "Expedited processing (4-12 hours)",
    color: "orange",
    icon: "exclamation-triangle",
    badge: "badge-warning",
    order: 3,
    urgency: "medium",
  },

  [PRIORITY_LEVELS.STAT]: {
    label: "STAT",
    labelKey: "stat",
    description: "Immediate processing (same day)",
    color: "red",
    icon: "bolt",
    badge: "badge-error",
    order: 4,
    urgency: "high",
  },
};

const PRIORITY_LABEL_ALIASES: Record<string, PriorityConfigEntry["labelKey"]> = {
  normal: "routine",
  low: "routine",
  medium: "priority",
  high: "urgent",
  critical: "stat",
};

/**
 * Retrieves the configuration entry for a specific priority level.
 *
 * @param level - Priority level (numeric, string key, or PriorityLevel)
 * @returns Config object for the priority
 */
export function getPriorityConfig(level: string | number | PriorityLevel): PriorityConfigEntry {
  if (typeof level === "string") {
    const normalized = normalizeStatus(level);
    const alias = PRIORITY_LABEL_ALIASES[normalized] ?? normalized;
    const match = Object.values(PRIORITY_CONFIG).find((config) => config.labelKey === alias);
    return match || PRIORITY_CONFIG[PRIORITY_LEVELS.ROUTINE];
  }
  const numericLevel = Number(level);
  return PRIORITY_CONFIG[numericLevel as PriorityLevel] || PRIORITY_CONFIG[PRIORITY_LEVELS.ROUTINE];
}

/**
 * Get the display label for a priority level.
 *
 * @param level - Priority level input.
 * @returns Priority label.
 */
export function getPriorityLabel(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).label;
}

/**
 * Get the badge class for a priority level.
 *
 * @param level - Priority level input.
 * @returns DaisyUI badge class.
 */
export function getPriorityBadgeClass(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).badge || "badge-outline";
}

/**
 * Get the color token for a priority level.
 *
 * @param level - Priority level input.
 * @returns Priority color.
 */
export function getPriorityColor(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).color;
}

/**
 * Get the icon name for a priority level.
 *
 * @param level - Priority level input.
 * @returns Icon name.
 */
export function getPriorityIcon(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).icon;
}

/**
 * Resolve a priority level from a label key.
 *
 * @param labelKey - Priority label key.
 * @returns Priority level.
 */
export function getPriorityLevelFromLabel(labelKey: string): PriorityLevel {
  const config = getPriorityConfig(labelKey);
  return ((config.order ?? 1) - 1) as PriorityLevel;
}

/**
 * Resolve a label key from a priority level.
 *
 * @param level - Priority level input.
 * @returns Priority label key.
 */
export function getPriorityLabelKeyFromLevel(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).labelKey;
}
