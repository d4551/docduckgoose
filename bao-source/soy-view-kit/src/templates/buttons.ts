/**
 * Canonical button class resolver for daisyUI 5 surfaces.
 *
 * Combines color and style axes into a flat variant union so consumers do not
 * concatenate `btn-*` strings inline. Centralising the focus-ring + transition
 * baseline guarantees consistent interactive feedback across packages.
 *
 * @packageDocumentation
 */

import type { TemplateActionLabelInput } from "./types.js";

/** Supported semantic button variants for shared template controls. */
export type TemplateButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "soft"
  | "warning"
  | "error";

/** Supported semantic button sizes. */
export type TemplateButtonSize = "default" | "compact" | "icon-compact";

/** Input options for canonical button class resolution. */
export interface TemplateButtonClassOptions {
  /** Semantic variant. Defaults to `ghost`. */
  variant?: TemplateButtonVariant;
  /** Size tier. Defaults to `default`. */
  size?: TemplateButtonSize;
  /** Whether the button participates in a daisyUI join group. */
  joinItem?: boolean;
  /** Additional trusted utility classes appended to the resolved class string. */
  className?: string;
}

const TEMPLATE_BUTTON_BASE_CLASS =
  "btn transition-colors motion-safe:[transition-duration:var(--v-duration-fast)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const TEMPLATE_BUTTON_VARIANT_CLASS_MAP: Record<TemplateButtonVariant, string> = {
  primary: "btn-primary focus-visible:outline-primary",
  secondary: "btn-secondary focus-visible:outline-secondary",
  outline: "btn-outline focus-visible:outline-primary",
  ghost: "btn-ghost focus-visible:outline-primary",
  soft: "btn-soft focus-visible:outline-primary",
  warning: "btn-warning focus-visible:outline-warning",
  error: "btn-error focus-visible:outline-error",
};

const TEMPLATE_BUTTON_SIZE_CLASS_MAP: Record<TemplateButtonSize, string> = {
  default: "",
  compact: "btn-sm",
  "icon-compact":
    "btn-sm btn-square bao-touch-target min-h-11 min-w-11 grid place-items-center gap-0 overflow-hidden leading-none",
};

/**
 * Resolve canonical daisyUI button classes for shared template controls.
 *
 * @param options - Button variant and size options.
 * @returns Stable class string for shared buttons.
 */
export function resolveTemplateButtonClasses(options: TemplateButtonClassOptions = {}): string {
  const variant = options.variant ?? "ghost";
  const size = options.size ?? "default";
  return [
    TEMPLATE_BUTTON_BASE_CLASS,
    TEMPLATE_BUTTON_VARIANT_CLASS_MAP[variant],
    TEMPLATE_BUTTON_SIZE_CLASS_MAP[size],
    options.joinItem ? "join-item" : "",
    options.className ?? "",
  ]
    .filter((token) => token.length > 0)
    .join(" ");
}

/**
 * Resolve a template label from explicit text or a typed i18n key fallback.
 *
 * @param input - Label contract.
 * @returns Localised label text.
 */
export function resolveTemplateActionLabel(input: TemplateActionLabelInput): string {
  if (input.label) {
    return input.label;
  }
  return input.translate(input.labelKey ?? input.fallbackLabelKey);
}
