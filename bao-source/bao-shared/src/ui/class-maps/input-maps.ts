/**
 * DaisyUI 5 Input / Form Control Class Maps
 *
 * Single source of truth for all form-input-related DaisyUI component class mappings.
 * Covers input, select, textarea, checkbox, toggle, radio, range, fieldset, validator,
 * and filter components.
 *
 * @module class-maps/input-maps
 */

// Input

/** Base class for DaisyUI input controls. */
export const INPUT_CLASS = "input";

/** DaisyUI class mapping for INPUT_SIZE_MAP. */
export const INPUT_SIZE_MAP: {
  readonly xs: "input-xs";
  readonly sm: "input-sm";
  readonly md: "input-md";
  readonly lg: "input-lg";
  readonly xl: "input-xl";
} = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const;

/** Type alias for InputSize keys. */
export type InputSize = keyof typeof INPUT_SIZE_MAP;

/** DaisyUI class mapping for INPUT_STYLE_MAP. */
export const INPUT_STYLE_MAP: { readonly ghost: "input-ghost" } = {
  ghost: "input-ghost",
} as const;

/** Type alias for InputStyle keys. */
export type InputStyle = keyof typeof INPUT_STYLE_MAP;

/**
 * Resolve a DaisyUI input size class from a size token.
 *
 * @param size - Input size token.
 * @returns DaisyUI class for the requested size.
 */
export function getInputSizeClass(size: InputSize | string): string {
  return INPUT_SIZE_MAP[size as InputSize] || INPUT_SIZE_MAP.md;
}

/**
 * Resolve a DaisyUI input style class from a style token.
 *
 * @param style - Input style token.
 * @returns DaisyUI class for the requested style.
 */
export function getInputStyleClass(style: InputStyle | string): string {
  return INPUT_STYLE_MAP[style as InputStyle] || "";
}

// Select

/** Base class for DaisyUI select controls. */
export const SELECT_CLASS = "select";

/** DaisyUI class mapping for SELECT_SIZE_MAP. */
export const SELECT_SIZE_MAP: {
  readonly xs: "select-xs";
  readonly sm: "select-sm";
  readonly md: "select-md";
  readonly lg: "select-lg";
  readonly xl: "select-xl";
} = {
  xs: "select-xs",
  sm: "select-sm",
  md: "select-md",
  lg: "select-lg",
  xl: "select-xl",
} as const;

/** Type alias for SelectSize keys. */
export type SelectSize = keyof typeof SELECT_SIZE_MAP;

/** DaisyUI class mapping for SELECT_STYLE_MAP. */
export const SELECT_STYLE_MAP: { readonly ghost: "select-ghost" } = {
  ghost: "select-ghost",
} as const;

/** Type alias for SelectStyle keys. */
export type SelectStyle = keyof typeof SELECT_STYLE_MAP;

/**
 * Resolve a DaisyUI select size class from a size token.
 *
 * @param size - Select size token.
 * @returns DaisyUI class for the requested size.
 */
export function getSelectSizeClass(size?: SelectSize | string): string {
  if (!size) {
    return SELECT_SIZE_MAP.md;
  }
  return SELECT_SIZE_MAP[size as SelectSize] || SELECT_SIZE_MAP.md;
}

/**
 * Resolve a DaisyUI select style class from a style token.
 *
 * @param style - Select style token.
 * @returns DaisyUI class for the requested style.
 */
export function getSelectStyleClass(style?: SelectStyle | string): string {
  if (!style) {
    return "";
  }
  return SELECT_STYLE_MAP[style as SelectStyle] || "";
}

// Textarea

/** DaisyUI class mapping for TEXTAREA_SIZE_MAP. */
export const TEXTAREA_SIZE_MAP: {
  readonly xs: "textarea-xs";
  readonly sm: "textarea-sm";
  readonly md: "textarea-md";
  readonly lg: "textarea-lg";
  readonly xl: "textarea-xl";
} = {
  xs: "textarea-xs",
  sm: "textarea-sm",
  md: "textarea-md",
  lg: "textarea-lg",
  xl: "textarea-xl",
} as const;

/** Type alias for TextareaSize keys. */
export type TextareaSize = keyof typeof TEXTAREA_SIZE_MAP;

/** DaisyUI class mapping for TEXTAREA_STYLE_MAP. */
export const TEXTAREA_STYLE_MAP: { readonly ghost: "textarea-ghost" } = {
  ghost: "textarea-ghost",
} as const;

/** Type alias for TextareaStyle keys. */
export type TextareaStyle = keyof typeof TEXTAREA_STYLE_MAP;

/**
 * Resolve a DaisyUI textarea size class from a size token.
 *
 * @param size - Textarea size token.
 * @returns DaisyUI class for the requested size.
 */
export function getTextareaSizeClass(size?: TextareaSize | string): string {
  if (!size) {
    return TEXTAREA_SIZE_MAP.md;
  }
  return TEXTAREA_SIZE_MAP[size as TextareaSize] || TEXTAREA_SIZE_MAP.md;
}

/**
 * Resolve a DaisyUI textarea style class from a style token.
 *
 * @param style - Textarea style token.
 * @returns DaisyUI class for the requested style.
 */
export function getTextareaStyleClass(style?: TextareaStyle | string): string {
  if (!style) {
    return "";
  }
  return TEXTAREA_STYLE_MAP[style as TextareaStyle] || "";
}

// Checkbox

/** Base class for DaisyUI checkboxes. */
export const CHECKBOX_CLASS = "checkbox";
