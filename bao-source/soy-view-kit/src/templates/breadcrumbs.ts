/**
 * Breadcrumbs primitive — daisyUI breadcrumbs trail with HTMX navigation.
 *
 * Generates the trail from caller-supplied items. The shell breadcrumb slot
 * helpers render the navbar slot itself (initial paint) and the OOB swap that
 * keeps it in sync after partial navigation.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { SHELL_BREADCRUMBS_ID } from "./design-tokens.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";
import type { BreadcrumbItem, TranslateFn } from "./types.js";

/** Props for the breadcrumbs primitive. */
export interface BreadcrumbsProps {
  /** Trail items (root → current). Empty arrays render nothing. */
  readonly items: readonly BreadcrumbItem[];
  /** Translator callback — required for the nav landmark `aria-label`. */
  readonly translate: TranslateFn;
  /** Extra classes appended to the `<nav>` element. */
  readonly navClassName?: string;
  /** i18n key for the nav landmark `aria-label`. Defaults to `common.aria.breadcrumb`. */
  readonly ariaLabelKey?: string;
}

/**
 * Render a daisyUI breadcrumbs trail with HTMX-aware links.
 *
 * @param props - Breadcrumbs props.
 * @returns HTML string. Empty when `items` is empty.
 */
export function renderBreadcrumbs(props: BreadcrumbsProps): string {
  if (props.items.length === 0) {
    return "";
  }
  const navClass = props.navClassName ?? "text-sm breadcrumbs";
  const ariaLabel = props.translate(props.ariaLabelKey ?? "common.aria.breadcrumb");
  const itemsHtml = props.items
    .map((item) => {
      if (item.active) {
        return `\n    <li aria-current="page">${escapeHtml(item.label)}</li>`;
      }
      const attrs = item.href
        ? ` href="${escapeAttr(item.href)}" ${buildShellHtmxNavigationAttributes(item.href)}`
        : "";
      return `\n    <li><a${attrs}>${escapeHtml(item.label)}</a></li>`;
    })
    .join("");
  return `
  <nav class="${escapeAttr(navClass)}" aria-label="${escapeAttr(ariaLabel)}">
    <ul>${itemsHtml}
    </ul>
  </nav>`;
}

const SHELL_BREADCRUMB_SLOT_CLASS = "min-w-0 max-w-full flex-1 overflow-x-auto";

/**
 * Render the inner shell breadcrumb markup (no container id) for initial paint.
 *
 * @param items - Trail items. Empty arrays render an empty string.
 * @param translate - Translator callback.
 * @returns Trimmed breadcrumb nav HTML or empty string.
 */
export function renderShellBreadcrumbInner(
  items: readonly BreadcrumbItem[],
  translate: TranslateFn,
): string {
  if (items.length === 0) {
    return "";
  }
  return renderBreadcrumbs({
    items,
    translate,
    navClassName: "text-xs breadcrumbs max-w-full min-w-0",
  }).trim();
}

/**
 * Render the OOB breadcrumb fragment that updates the shell slot after
 * partial navigation.
 *
 * @param items - Trail items. Empty clears the slot but preserves the container.
 * @param translate - Translator callback.
 * @returns OOB div appended to partial responses.
 */
export function renderShellBreadcrumbOob(
  items: readonly BreadcrumbItem[],
  translate: TranslateFn,
): string {
  const inner = renderShellBreadcrumbInner(items, translate);
  return `<div id="${SHELL_BREADCRUMBS_ID}" class="${SHELL_BREADCRUMB_SLOT_CLASS}" hx-swap-oob="true">${inner}</div>`;
}

/**
 * Stable class string for the shell breadcrumb container element.
 *
 * @returns Class list shared by base layout navbar and OOB swaps.
 */
export function shellBreadcrumbSlotClassName(): string {
  return SHELL_BREADCRUMB_SLOT_CLASS;
}
