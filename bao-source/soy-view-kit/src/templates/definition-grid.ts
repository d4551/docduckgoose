/**
 * Definition grid primitive — semantic `<dl>` for label/value detail content.
 *
 * Centralises the term typography contract so route renderers stop
 * hand-authoring tracking/spacing variations.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { DEFINITION_TERM_XS_CLASS } from "./design-tokens.js";

/** Supported responsive grid widths. */
export type DefinitionGridColumns = 2 | 3 | 4 | 5;

/** A single label/value entry in the grid. */
export interface DefinitionGridItem {
  /** Visible term label. */
  readonly label: string;
  /** Trusted HTML markup for the rendered value block. */
  readonly valueHtml: string;
  /** Optional caller-owned classes for the item container. */
  readonly itemClassName?: string;
}

/** Props for the definition grid. */
export interface DefinitionGridProps {
  /** Ordered label/value items. */
  readonly items: readonly DefinitionGridItem[];
  /** Responsive column preset. Defaults to 2. */
  readonly columns?: DefinitionGridColumns;
  /** Optional caller-owned classes for the root `<dl>`. */
  readonly className?: string;
}

const DEFINITION_GRID_CLASS_MAP: Record<DefinitionGridColumns, string> = {
  2: "grid gap-3 md:grid-cols-2",
  3: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
  4: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
  5: "grid gap-3 md:grid-cols-2 xl:grid-cols-5",
};

/**
 * Render a semantic definition grid for repeated label/value content.
 *
 * @param props - Definition grid props.
 * @returns HTML string.
 */
export function renderDefinitionGrid(props: DefinitionGridProps): string {
  const columns = props.columns ?? 2;
  const rootClassName = [DEFINITION_GRID_CLASS_MAP[columns], props.className ?? ""]
    .filter(Boolean)
    .join(" ");

  const itemsHtml = props.items
    .map((item) => {
      const itemClassName = item.itemClassName ? ` class="${escapeAttr(item.itemClassName)}"` : "";
      return `<div${itemClassName}>
  <dt class="${DEFINITION_TERM_XS_CLASS}">${escapeHtml(item.label)}</dt>
  ${item.valueHtml}
</div>`;
    })
    .join("");

  return `<dl class="${escapeAttr(rootClassName)}">${itemsHtml}</dl>`;
}
