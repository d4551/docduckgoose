/**
 * Loading indicator primitives — daisyUI spinner/dots/ring with `htmx-indicator`.
 *
 * Pair with `hx-indicator="#id"` on a request-issuing element. The shell-level
 * variant lives outside the swap target so it survives swaps; the inline
 * variant lives inside a button so it disappears with the request.
 *
 * @packageDocumentation
 */

import { escapeAttr } from "../html.js";
import type { TranslateFn } from "./types.js";

/** Loading indicator size. */
export type LoadingIndicatorSize = "xs" | "sm" | "md" | "lg";

/** Loading indicator variant. */
export type LoadingIndicatorVariant = "spinner" | "dots" | "ring";

/** Optional configuration for `renderLoadingIndicator`. */
export interface LoadingIndicatorOptions {
  readonly size?: LoadingIndicatorSize;
  readonly variant?: LoadingIndicatorVariant;
}

/** Optional configuration for `renderButtonLoadingIndicator`. */
export interface ButtonLoadingIndicatorOptions {
  readonly size?: LoadingIndicatorSize;
  readonly variant?: LoadingIndicatorVariant;
  /**
   * When true the spinner is always visible instead of toggled by the
   * `htmx-indicator` CSS class. Use for static loading-state cards.
   */
  readonly alwaysVisible?: boolean;
  /** i18n key for the screen-reader label. Defaults to `common.a11y.loadingIndicator`. */
  readonly ariaLabelKey?: string;
}

/**
 * Render a shell-level loading indicator targeted by `hx-indicator="#id"`.
 *
 * @param id - DOM id used as the HTMX indicator selector.
 * @param translate - Translator callback used for the screen-reader label.
 * @param options - Optional size and variant.
 * @returns HTML string.
 */
export function renderLoadingIndicator(
  id: string,
  translate: TranslateFn,
  options?: LoadingIndicatorOptions,
): string {
  const sizeClass = `loading-${options?.size ?? "sm"}`;
  const variantClass = `loading-${options?.variant ?? "spinner"}`;
  const ariaLabel = escapeAttr(translate("common.a11y.loadingIndicator"));
  return `<span id="${escapeAttr(id)}" class="htmx-indicator loading ${variantClass} ${sizeClass}" role="status" aria-live="polite" aria-atomic="true"><span class="sr-only">${ariaLabel}</span></span>`;
}

/**
 * Render an inline button loading indicator for HTMX requests.
 *
 * @param translate - Translator callback used for the screen-reader label.
 * @param options - Optional size, variant, visibility, and label-key overrides.
 * @returns HTML string.
 */
export function renderButtonLoadingIndicator(
  translate: TranslateFn,
  options?: ButtonLoadingIndicatorOptions,
): string {
  const sizeClass = `loading-${options?.size ?? "xs"}`;
  const variantClass = `loading-${options?.variant ?? "spinner"}`;
  const htmxClass = options?.alwaysVisible ? "" : "htmx-indicator ";
  const ariaLabel = escapeAttr(translate(options?.ariaLabelKey ?? "common.a11y.loadingIndicator"));
  return `<span class="${htmxClass}loading ${variantClass} ${sizeClass}" aria-hidden="true"><span class="sr-only">${ariaLabel}</span></span>`;
}
