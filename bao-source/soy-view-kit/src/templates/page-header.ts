/**
 * Page header primitive — h1 + description + breadcrumbs slot + actions slot.
 *
 * One h1 per page. Description is text-sm tertiary. Actions render right-aligned
 * on `sm` and above. Breadcrumbs render above the title.
 *
 * @packageDocumentation
 */

import { escapeHtml } from "../html.js";
import { TEXT_SM_TERTIARY_CLASS } from "./design-tokens.js";

/** Props for the standardised page header. */
export interface PageHeaderProps {
  /** Page title rendered as h1. */
  readonly title: string;
  /** Optional description rendered below the title. */
  readonly description?: string;
  /** Pre-rendered HTML for primary action buttons (top-right). */
  readonly actions?: string;
  /** Pre-rendered breadcrumbs HTML rendered above the title. */
  readonly breadcrumbs?: string;
}

/**
 * Render a standardised page header with title, description, and slots.
 *
 * @param props - Page header props.
 * @returns HTML string.
 */
export function renderPageHeader(props: PageHeaderProps): string {
  const breadcrumbsHtml = props.breadcrumbs ?? "";
  const descriptionHtml = props.description
    ? `<p class="mt-1 ${TEXT_SM_TERTIARY_CLASS}">${escapeHtml(props.description)}</p>`
    : "";
  const actionsHtml = props.actions
    ? `<div class="flex shrink-0 flex-wrap gap-2 sm:justify-end">${props.actions}</div>`
    : "";

  return `
    <div class="space-y-2">
      ${breadcrumbsHtml}
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:gap-6">
        <div class="min-w-0">
          <h1 class="text-2xl font-bold text-base-content md:text-3xl xl:text-3xl">${escapeHtml(props.title)}</h1>
          ${descriptionHtml}
        </div>
        ${actionsHtml}
      </div>
    </div>`;
}
