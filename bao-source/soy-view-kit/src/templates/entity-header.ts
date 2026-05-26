/**
 * Entity detail page header primitive.
 *
 * Renders a card with entity title, status badge, metadata key/value pairs,
 * and action buttons. Use as the top of a detail view to centre the
 * "what is this?" answer alongside its primary actions.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveTemplateButtonClasses, type TemplateButtonVariant } from "./buttons.js";
import {
  MAIN_CONTENT_SELECTOR,
  SHELL_LOADING_INDICATOR_SELECTOR,
  TEXT_TERTIARY_CLASS,
} from "./design-tokens.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";
import { renderSectionCard } from "./section-card.js";
import { type BadgeVariant, renderStatusBadge } from "./status-badge.js";

/** Metadata key/value pair shown in the entity header. */
export interface EntityMetadataItem {
  /** Label text. */
  readonly label: string;
  /** Value text. */
  readonly value: string;
}

/** Action button descriptor. */
export interface EntityAction {
  /** Visible label. */
  readonly label: string;
  /** URL or HTMX endpoint. */
  readonly href: string;
  /** Variant token mapped onto the canonical button variant set. */
  readonly variant?: TemplateButtonVariant;
  /** HTTP method. `post` renders a button with `hx-post`. Defaults to `get`. */
  readonly method?: "get" | "post";
  /** Confirmation message displayed by the shell confirm dialog. POST only. */
  readonly confirm?: string;
}

/** Props for the entity header primitive. */
export interface EntityHeaderProps {
  /** Entity display title. */
  readonly title: string;
  /** Optional status text rendered in a badge after the title. */
  readonly status?: string;
  /** Status badge colour variant. */
  readonly statusVariant?: BadgeVariant;
  /** Metadata pairs displayed below the title. */
  readonly metadata?: readonly EntityMetadataItem[];
  /** Action buttons displayed on the right. */
  readonly actions?: readonly EntityAction[];
  /** Optional pre-rendered breadcrumbs HTML. */
  readonly breadcrumbs?: string;
}

function resolveActionVariant(variant: EntityAction["variant"]): TemplateButtonVariant {
  if (variant === "primary" || variant === "outline" || variant === "error") {
    return variant;
  }
  return "ghost";
}

function renderEntityActionMarkup(action: EntityAction): string {
  const variant = resolveActionVariant(action.variant);
  const className = escapeAttr(resolveTemplateButtonClasses({ variant }));
  if (action.method === "post") {
    const confirmAttr = action.confirm ? ` hx-confirm="${escapeAttr(action.confirm)}"` : "";
    return `<button type="button" class="${className}" hx-post="${escapeAttr(action.href)}" hx-target="${escapeAttr(MAIN_CONTENT_SELECTOR)}" hx-swap="innerHTML" hx-indicator="${escapeAttr(SHELL_LOADING_INDICATOR_SELECTOR)}"${confirmAttr} aria-label="${escapeAttr(action.label)}">${escapeHtml(action.label)}</button>`;
  }
  return `<a href="${escapeAttr(action.href)}" class="${className}" ${buildShellHtmxNavigationAttributes(action.href)} aria-label="${escapeAttr(action.label)}">${escapeHtml(action.label)}</a>`;
}

/**
 * Render an entity detail page header card.
 *
 * @param props - Entity header props.
 * @returns HTML string.
 */
export function renderEntityHeader(props: EntityHeaderProps): string {
  const breadcrumbsHtml = props.breadcrumbs ?? "";

  const statusHtml =
    props.status && props.statusVariant
      ? `<span class="ml-3">${renderStatusBadge(props.status, props.statusVariant)}</span>`
      : "";

  const metadataHtml = (props.metadata ?? [])
    .map(
      (item) =>
        `<div class="flex gap-2 text-sm"><span class="font-medium ${TEXT_TERTIARY_CLASS}">${escapeHtml(item.label)}:</span><span class="text-base-content">${escapeHtml(item.value)}</span></div>`,
    )
    .join("");

  const actionsHtml = (props.actions ?? []).map(renderEntityActionMarkup).join("");

  const metadataBlock = metadataHtml
    ? `<div class="mt-2 flex flex-wrap gap-x-6 gap-y-1 xl:gap-x-8">${metadataHtml}</div>`
    : "";
  const actionsBlock = actionsHtml
    ? `<div class="flex shrink-0 flex-wrap gap-2 sm:justify-end">${actionsHtml}</div>`
    : "";

  return `
    <div class="space-y-3">
      ${breadcrumbsHtml}
      ${renderSectionCard({
        body: `
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:gap-6">
            <div class="min-w-0">
              <h1 class="card-title text-2xl">
                ${escapeHtml(props.title)}${statusHtml}
              </h1>
              ${metadataBlock}
            </div>
            ${actionsBlock}
          </div>`,
      })}
    </div>`;
}
