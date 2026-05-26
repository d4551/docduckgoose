/**
 * DaisyUI badge helpers shared by utility modules.
 */

export const BADGE_VARIANT_MAP = {
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

export type BadgeVariant = keyof typeof BADGE_VARIANT_MAP;

function isBadgeVariant(value: string): value is BadgeVariant {
  return Object.hasOwn(BADGE_VARIANT_MAP, value);
}

export function getBadgeVariantClass(variant: BadgeVariant | string): string {
  return isBadgeVariant(variant) ? BADGE_VARIANT_MAP[variant] : BADGE_VARIANT_MAP.neutral;
}
