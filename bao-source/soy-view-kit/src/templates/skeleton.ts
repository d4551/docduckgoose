/**
 * Skeleton loading primitives for HTMX-driven content areas.
 *
 * Uses the `.skeleton-shimmer` CSS class (defined in the consumer's base
 * stylesheet) for shimmer animation. Visual footprint matches real components
 * to keep CLS at zero.
 *
 * @packageDocumentation
 */

import { escapeAttr } from "../html.js";
import type { TranslateFn } from "./types.js";

const SKELETON_CELL_WIDTH_CLASSES = ["w-3/5", "w-3/4", "w-11/12"] as const;
const SKELETON_CELL_WIDTH_CLASS_COUNT = SKELETON_CELL_WIDTH_CLASSES.length;

/**
 * Render a single table row skeleton with N cells.
 *
 * @param columns - Number of columns.
 * @returns Skeleton `<tr>` HTML.
 */
export function renderTableRowSkeleton(columns: number): string {
  const cells = Array.from(
    { length: columns },
    (_, i) =>
      `<td><div class="skeleton-shimmer h-4 rounded ${SKELETON_CELL_WIDTH_CLASSES[i % SKELETON_CELL_WIDTH_CLASS_COUNT]}"></div></td>`,
  ).join("");
  return `<tr class="border-base-300/30">${cells}</tr>`;
}

/**
 * Render a full table body skeleton.
 *
 * @param columns - Number of columns.
 * @param rows - Number of skeleton rows. Defaults to 5.
 * @returns Skeleton `<tbody>` HTML.
 */
export function renderTableSkeleton(columns: number, rows = 5): string {
  return Array.from({ length: rows }, () => renderTableRowSkeleton(columns)).join("");
}

/**
 * Render a list-item skeleton for notification/activity feeds.
 *
 * @param translate - Translator callback used for the live-region label.
 * @param ariaLabelKey - i18n key for `aria-label`. Defaults to `common.skeleton.loadingList`.
 * @returns Skeleton `<li>` HTML.
 */
export function renderListItemSkeleton(
  translate: TranslateFn,
  ariaLabelKey = "common.skeleton.loadingList",
): string {
  const ariaLabel = escapeAttr(translate(ariaLabelKey));
  return `
<li class="flex items-start gap-3 py-2" role="status" aria-busy="true" aria-label="${ariaLabel}">
  <div class="skeleton-shimmer mt-1.5 size-1.5 rounded-full shrink-0"></div>
  <div class="flex flex-col gap-1.5 flex-1">
    <div class="skeleton-shimmer h-3 w-3/4 rounded"></div>
    <div class="skeleton-shimmer h-2.5 w-1/2 rounded"></div>
  </div>
</li>`;
}

/**
 * Render a generic section card body skeleton.
 *
 * @param translate - Translator callback used for the live-region label.
 * @param ariaLabelKey - i18n key for `aria-label`. Defaults to `common.skeleton.loadingContent`.
 * @returns Skeleton card body HTML.
 */
export function renderCardSkeleton(
  translate: TranslateFn,
  ariaLabelKey = "common.skeleton.loadingContent",
): string {
  const ariaLabel = escapeAttr(translate(ariaLabelKey));
  return `
<div class="space-y-3" role="status" aria-busy="true" aria-label="${ariaLabel}">
  <div class="skeleton-shimmer h-4 w-1/3 rounded"></div>
  <div class="skeleton-shimmer h-3 w-full rounded"></div>
  <div class="skeleton-shimmer h-3 w-5/6 rounded"></div>
  <div class="skeleton-shimmer h-3 w-2/3 rounded"></div>
</div>`;
}
