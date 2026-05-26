/**
 * DaisyUI 5 Layout & Miscellaneous Component Class Maps
 *
 * Single source of truth for layout-oriented DaisyUI component class mappings.
 * Covers dock, list, dropdown, FAB, skeleton, stack, join, divider, indicator,
 * drawer, progress, radial progress, steps, stats, chat, tab, loading, alert,
 * and notification display maps.
 *
 * @module class-maps/layout-maps
 */

/** DaisyUI class mapping for ALERT_VARIANT_MAP. */
const ALERT_VARIANT_MAP = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
} as const;

/** Type alias for AlertVariant keys. */
export type AlertVariant = keyof typeof ALERT_VARIANT_MAP;

/** DaisyUI class mapping for ALERT_STYLE_MAP. */
const ALERT_STYLE_MAP = {
  outline: "alert-outline",
  dash: "alert-dash",
  soft: "alert-soft",
} as const;

/** Type alias for AlertStyle keys. */
export type AlertStyle = keyof typeof ALERT_STYLE_MAP;

/** DaisyUI class mapping for ALERT_ICON_MAP. */
export const ALERT_ICON_MAP: {
  readonly info: "lucide--info";
  readonly success: "lucide--check-circle";
  readonly warning: "lucide--alert-triangle";
  readonly error: "lucide--alert-circle";
} = {
  info: "lucide--info",
  success: "lucide--check-circle",
  warning: "lucide--alert-triangle",
  error: "lucide--alert-circle",
} as const;

/** DaisyUI class mapping for PROGRESS_COLOR_MAP. */
const PROGRESS_COLOR_MAP = {
  neutral: "progress-neutral",
  primary: "progress-primary",
  secondary: "progress-secondary",
  accent: "progress-accent",
  info: "progress-info",
  success: "progress-success",
  warning: "progress-warning",
  error: "progress-error",
} as const;

/** Type alias for ProgressColor keys. */
export type ProgressColor = keyof typeof PROGRESS_COLOR_MAP;

/** DaisyUI base class for STATS_CLASS. */
export const STATS_CLASS = "stats";
