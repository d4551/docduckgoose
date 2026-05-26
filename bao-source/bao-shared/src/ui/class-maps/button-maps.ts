/**
 * DaisyUI 5 Button Class Maps
 *
 * Single source of truth for all button-related DaisyUI component class mappings.
 * Covers button base class, sizes, colors, and variants.
 *
 * @module class-maps/button-maps
 */

/** Base class for DaisyUI buttons. */
export const BUTTON_CLASS = "btn";

/** DaisyUI button size class mapping (xs through xl). */
export const BUTTON_SIZE_MAP: {
  readonly xs: "btn-xs";
  readonly sm: "btn-sm";
  readonly md: "btn-md";
  readonly lg: "btn-lg";
  readonly xl: "btn-xl";
} = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
} as const;

/** Available DaisyUI button size values. */
export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

/** DaisyUI button color variant class mapping. */
export const BUTTON_COLOR_MAP: {
  readonly neutral: "btn-neutral";
  readonly primary: "btn-primary";
  readonly secondary: "btn-secondary";
  readonly accent: "btn-accent";
  readonly info: "btn-info";
  readonly success: "btn-success";
  readonly warning: "btn-warning";
  readonly error: "btn-error";
} = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
} as const;

/** Available DaisyUI button color values. */
export type ButtonColor = keyof typeof BUTTON_COLOR_MAP;

/** DaisyUI button variant (outline, ghost, etc.) class mapping. */
export const BUTTON_VARIANT_MAP: {
  readonly outline: "btn-outline";
  readonly ghost: "btn-ghost";
  readonly link: "btn-link";
  readonly soft: "btn-soft";
  readonly dash: "btn-dash";
} = {
  outline: "btn-outline",
  ghost: "btn-ghost",
  link: "btn-link",
  soft: "btn-soft",
  dash: "btn-dash",
} as const;

/** Available DaisyUI button variant values. */
export type ButtonVariant = keyof typeof BUTTON_VARIANT_MAP;

/**
 * Resolve a DaisyUI button size class from a size token.
 *
 * @param size - Button size token.
 * @returns DaisyUI class for the requested size.
 */
export function getButtonSizeClass(size: ButtonSize | string): string {
  return BUTTON_SIZE_MAP[size as ButtonSize] || BUTTON_SIZE_MAP.md;
}

/**
 * Resolve a DaisyUI button color class from a color token.
 *
 * @param color - Button color token.
 * @returns DaisyUI class for the requested color.
 */
export function getButtonColorClass(color: ButtonColor | string): string {
  return BUTTON_COLOR_MAP[color as ButtonColor] || "";
}

/**
 * Resolve a DaisyUI button variant class from a variant token.
 *
 * @param variant - Button variant token.
 * @returns DaisyUI class for the requested variant.
 */
export function getButtonVariantClass(variant: ButtonVariant | string): string {
  return BUTTON_VARIANT_MAP[variant as ButtonVariant] || "";
}
