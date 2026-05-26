/**
 * Toast/notification container for OOB swaps.
 *
 * Place the container once per layout. HTMX OOB elements swap into it.
 * `role="status"` + `aria-live="polite"` ensures notifications reach
 * screen-reader users without interrupting active focus.
 *
 * @packageDocumentation
 */

import { escapeAttr } from "../html.js";
import type { TranslateFn } from "./types.js";

/** Stable DOM id for the toast container. */
export const TOAST_CONTAINER_ID = "toast-container";

/** Optional configuration for the toast container. */
export interface ToastContainerProps {
  /** Translator callback for the live-region label. */
  readonly translate: TranslateFn;
  /** i18n key for `aria-label`. Defaults to `common.a11y.notifications`. */
  readonly ariaLabelKey?: string;
  /**
   * Optional comma-separated `hx-ext` value applied to the container itself —
   * for example to opt into a per-container auto-dismiss extension.
   */
  readonly hxExt?: string;
}

/**
 * Render the toast container element.
 *
 * @param props - Container props.
 * @returns HTML string.
 */
export function renderToastContainer(props: ToastContainerProps): string {
  const ariaLabel = escapeAttr(props.translate(props.ariaLabelKey ?? "common.a11y.notifications"));
  const hxExt = props.hxExt ? ` hx-ext="${escapeAttr(props.hxExt)}"` : "";
  return `<div id="${TOAST_CONTAINER_ID}" class="toast toast-end toast-top z-50" role="status" aria-live="polite" aria-label="${ariaLabel}"${hxExt}></div>`;
}
