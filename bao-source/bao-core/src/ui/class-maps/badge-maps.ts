/**
 * DaisyUI 5 Badge Class Maps
 *
 * Single source of truth for all badge-related DaisyUI component class mappings.
 * Covers badge variants, sizes, styles, icon/text/dot size helpers, and
 * badge utility functions.
 *
 * @module class-maps/badge-maps
 */

/** DaisyUI class mapping for BADGE_VARIANT_MAP. */
export const BADGE_VARIANT_MAP: {
  readonly neutral: "badge-neutral";
  readonly primary: "badge-primary";
  readonly secondary: "badge-secondary";
  readonly accent: "badge-accent";
  readonly info: "badge-info";
  readonly success: "badge-success";
  readonly warning: "badge-warning";
  readonly error: "badge-error";
  readonly ghost: "badge-ghost";
} = {
  neutral: "badge-neutral",
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  ghost: "badge-ghost",
} as const;

/** Type alias for BadgeVariant keys. */
export type BadgeVariant = keyof typeof BADGE_VARIANT_MAP;

/** DaisyUI class mapping for BADGE_SIZE_MAP. */
const BADGE_SIZE_MAP = {
  xs: "badge-xs",
  sm: "badge-sm",
  md: "badge-md",
  lg: "badge-lg",
  xl: "badge-xl",
} as const;

/** Type alias for BadgeSize keys. */
export type BadgeSize = keyof typeof BADGE_SIZE_MAP;

/** DaisyUI class mapping for BADGE_VARIANT_STYLE_MAP. */
export const BADGE_VARIANT_STYLE_MAP: {
  readonly outline: "badge-outline";
  readonly dash: "badge-dash";
  readonly soft: "badge-soft";
  readonly ghost: "badge-ghost";
} = {
  outline: "badge-outline",
  dash: "badge-dash",
  soft: "badge-soft",
  ghost: "badge-ghost",
} as const;

/** Type alias for BadgeVariantStyle keys. */
export type BadgeVariantStyle = keyof typeof BADGE_VARIANT_STYLE_MAP;

/** Alias for badge style options in helper functions. */
export type BadgeStyle = BadgeVariantStyle;

/**
 * Resolve a DaisyUI badge variant class from a variant token.
 *
 * @param variant - Badge variant token.
 * @returns DaisyUI class for the requested variant.
 */
export function getBadgeVariantClass(variant: BadgeVariant | string): string {
  return BADGE_VARIANT_MAP[variant as BadgeVariant] || "badge-neutral";
}

/**
 * Resolve a DaisyUI badge size class from a size token.
 *
 * @param size - Badge size token.
 * @returns DaisyUI class for the requested size.
 */
export function getBadgeSizeClass(size: BadgeSize | string): string {
  return BADGE_SIZE_MAP[size as BadgeSize] || BADGE_SIZE_MAP.md;
}

/**
 * Resolve a DaisyUI badge style class from a style token.
 *
 * @param variant - Badge style token.
 * @returns DaisyUI class for the requested style.
 */
export function getBadgeVariantStyleClass(variant: BadgeVariantStyle | string): string {
  return BADGE_VARIANT_STYLE_MAP[variant as BadgeVariantStyle] || "";
}
