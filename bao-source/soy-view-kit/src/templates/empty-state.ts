/**
 * Empty-state primitive — icon + heading + description + optional CTA.
 *
 * Use as the canonical "no data" surface for list, detail, and dashboard
 * regions. Always renders with `role="status"` so the empty announcement
 * reaches screen-reader users.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveTemplateButtonClasses } from "./buttons.js";
import {
  resolveStaggerClass,
  TEXT_ICON_MUTED_CLASS,
  TEXT_TERTIARY_CLASS,
} from "./design-tokens.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";

/** Empty-state icon glyph map keyed by semantic name. */
const EMPTY_STATE_ICON_MAP: Record<string, string> = {
  default:
    '<path d="M38 30h12l10 10v26a2 2 0 0 1-2 2H38a2 2 0 0 1-2-2V32a2 2 0 0 1 2-2Z" /><path d="M50 30v10h10" /><path d="M42 50h12M42 56h8" />',
  automation:
    '<path d="M40 34h16M40 48h16M40 62h10" /><path d="M30 40l4 4 8-8" /><path d="M30 54l4 4 8-8" />',
  baoArchive:
    '<path d="M30 38c4-6 10-9 18-9 8 0 14 3 18 9" /><path d="M28 44h40" /><path d="M34 44v18a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6V44" /><path d="M42 52h12" />',
  analysis:
    '<path d="M34 62V46" /><path d="M48 62V34" /><path d="M62 62V50" /><path d="M30 62h36" />',
  mapping:
    '<path d="M28 62l12-28 16 18 12-20" /><path d="M28 62h40" /><circle cx="40" cy="34" r="3" fill="currentColor" stroke="none" opacity="0.5" /><circle cx="56" cy="52" r="3" fill="currentColor" stroke="none" opacity="0.5" /><circle cx="68" cy="32" r="3" fill="currentColor" stroke="none" opacity="0.5" />',
  verification: '<path d="M34 50l10 10 18-22" /><path d="M28 28h40v40H28z" />',
};

/** Props for the empty-state primitive. */
export interface EmptyStateProps {
  /** Primary message rendered as h3. */
  readonly message: string;
  /** Icon name; falls back to `default` when unknown. */
  readonly icon?: string;
  /** Optional CTA label. Required to render the CTA together with `actionHref`. */
  readonly actionLabel?: string;
  /** Optional CTA href (HTMX-aware navigation). */
  readonly actionHref?: string;
  /** Optional secondary description rendered below the message. */
  readonly description?: string;
  /** Stagger index (0–5) for sequential entry animation. */
  readonly staggerIndex?: number;
}

function renderEmptyStateIcon(icon?: string): string {
  const glyph = EMPTY_STATE_ICON_MAP[icon ?? "default"] ?? EMPTY_STATE_ICON_MAP.default;
  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 96 96" fill="none" class="h-16 w-16">
    <rect x="16" y="16" width="64" height="64" rx="16" fill="currentColor" opacity="0.08" />
    <rect x="24" y="24" width="48" height="48" rx="12" stroke="currentColor" stroke-width="1.5" opacity="0.2" />
    <g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.35">
      ${glyph}
    </g>
  </svg>`;
}

/**
 * Render an empty-state region with an optional CTA.
 *
 * @param props - Empty-state props.
 * @returns HTML string.
 */
export function renderEmptyState(props: EmptyStateProps): string {
  const staggerClass = resolveStaggerClass(props.staggerIndex);
  const safeMessage = escapeHtml(props.message);
  const iconBlock = `<div class="${TEXT_ICON_MUTED_CLASS}">${renderEmptyStateIcon(props.icon)}</div>`;
  const actionBlock =
    props.actionLabel && props.actionHref
      ? `
    <a href="${escapeAttr(props.actionHref)}" ${buildShellHtmxNavigationAttributes(props.actionHref)} class="${escapeAttr(resolveTemplateButtonClasses({ variant: "primary", className: "mt-6" }))}" aria-label="${escapeAttr(props.actionLabel)}">${escapeHtml(props.actionLabel)}</a>
    `
      : "";

  const descriptionBlock = props.description
    ? `<p class="mt-2 max-w-sm ${TEXT_TERTIARY_CLASS}">${escapeHtml(props.description)}</p>`
    : "";

  return `
    <div class="flex flex-col items-center justify-center py-12 text-center sm:py-16 xl:py-20${staggerClass ? ` ${staggerClass}` : ""}" role="status">
      ${iconBlock}
      <h3 class="mt-4 text-lg font-semibold md:text-xl">${safeMessage}</h3>
      ${descriptionBlock}
      ${actionBlock}
    </div>`;
}
