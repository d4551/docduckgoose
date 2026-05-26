/**
 * Data table primitive — accessible HTMX-aware sortable table.
 *
 * - `<th scope="col">` on every header
 * - `aria-sort` on sortable columns
 * - `tabular-nums` and right-alignment shipped through column align tokens
 * - skeleton rows for loading state
 * - bulk-select checkbox column
 * - row-click navigation with keyboard parity
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import {
  INTERACTIVE_HOVER_ROW_CLASS,
  INTERACTIVE_SORT_HEADER_LINK_CLASS,
  MAIN_CONTENT_ID,
  SHELL_LOADING_INDICATOR_ID,
  SURFACE_GLASS,
  TEXT_QUATERNARY_CLASS,
} from "./design-tokens.js";
import { renderSortIcon } from "./icons.js";
import { renderTableSkeleton } from "./skeleton.js";
import type { TranslateFn } from "./types.js";

/** Cell value primitive accepted by the table renderer. */
export type DataTableCellValue = string | number | null | undefined;

/** A single data row. */
export type DataTableRow = Readonly<Record<string, DataTableCellValue>>;

/** Sort direction. */
export type DataTableSortDirection = "asc" | "desc";

type AriaSortValue = "ascending" | "descending" | "none";

/** A single column definition. */
export interface DataTableColumn {
  /** Column key (used for header cell and sort parameter). */
  readonly key: string;
  /** Header label. */
  readonly label: string;
  /** Optional alignment. */
  readonly align?: "left" | "center" | "right";
  /** Optional custom cell renderer. */
  readonly render?: (row: DataTableRow) => string;
  /** Whether this column supports sort interactions. */
  readonly sortable?: boolean;
}

/** Props for the data table primitive. */
export interface DataTableProps {
  /** Column definitions. */
  readonly columns: readonly DataTableColumn[];
  /** Row data. */
  readonly rows: readonly DataTableRow[];
  /** Translator callback. */
  readonly translate: TranslateFn;
  /** Message rendered when `rows` is empty. Defaults to `common.status.noResults`. */
  readonly emptyMessage?: string;
  /** Optional table id used as HTMX target for sort interactions. */
  readonly tableId?: string;
  /** Optional `aria-label` for the table. */
  readonly ariaLabel?: string;
  /** Optional visible caption (rendered in `sr-only` span). */
  readonly caption?: string;
  /** Use daisyUI zebra striping for alternating rows. */
  readonly zebra?: boolean;
  /** Optional HTMX endpoint for sort interactions. Required to render sort links. */
  readonly sortHref?: string;
  /** Currently active sort column key. */
  readonly sortKey?: string;
  /** Currently active sort direction. */
  readonly sortDir?: DataTableSortDirection;
  /** Whether the body is in a loading state (renders skeleton rows). */
  readonly loading?: boolean;
  /** Enable bulk selection (prepends a checkbox column). */
  readonly bulkSelect?: boolean;
  /** Row key used for checkbox values. Defaults to `id`. */
  readonly bulkSelectKey?: string;
  /** Optional row navigation builder. Returning a non-empty string makes the row clickable. */
  readonly rowHref?: (row: DataTableRow) => string;
}

function resolveAlignmentClass(align: DataTableColumn["align"]): string {
  if (align === "center") {
    return "text-center";
  }
  if (align === "right") {
    return "text-right";
  }
  return "";
}

function resolveAriaSort(
  isActive: boolean,
  direction: DataTableSortDirection | undefined,
): AriaSortValue {
  if (!isActive) {
    return "none";
  }
  return direction === "desc" ? "descending" : "ascending";
}

function resolveNextSortDirection(
  columnKey: string,
  sortKey: string | undefined,
  direction: DataTableSortDirection | undefined,
): DataTableSortDirection {
  return sortKey === columnKey && direction === "asc" ? "desc" : "asc";
}

function resolveSortIcon(ariaSort: AriaSortValue): string {
  if (ariaSort === "ascending") {
    return renderSortIcon("asc", true);
  }
  if (ariaSort === "descending") {
    return renderSortIcon("desc", true);
  }
  return renderSortIcon("idle", false);
}

function resolveSortAriaLabel(
  translate: TranslateFn,
  label: string,
  direction: DataTableSortDirection,
): string {
  return translate(
    direction === "asc" ? "common.a11y.sortAscending" : "common.a11y.sortDescending",
    { column: label },
  );
}

function resolveSortHref(
  baseHref: string,
  columnKey: string,
  direction: DataTableSortDirection,
): string {
  const params = new URLSearchParams({ sort: columnKey, dir: direction });
  return `${baseHref}?${params.toString()}`;
}

function renderStaticHeaderCell(column: DataTableColumn): string {
  const alignmentClass = resolveAlignmentClass(column.align);
  return `<th scope="col"${alignmentClass ? ` class="${alignmentClass}"` : ""}>${escapeHtml(column.label)}</th>`;
}

interface SortableHeaderCellInput {
  readonly column: DataTableColumn;
  readonly sortHref: string;
  readonly tableId: string;
  readonly sortKey: string | undefined;
  readonly sortDir: DataTableSortDirection | undefined;
  readonly translate: TranslateFn;
}

function renderSortableHeaderCell(input: SortableHeaderCellInput): string {
  const alignmentClass = resolveAlignmentClass(input.column.align);
  const nextDirection = resolveNextSortDirection(input.column.key, input.sortKey, input.sortDir);
  const isActive = input.sortKey === input.column.key;
  const ariaSort = resolveAriaSort(isActive, input.sortDir);
  const ariaLabel = resolveSortAriaLabel(input.translate, input.column.label, nextDirection);
  const href = resolveSortHref(input.sortHref, input.column.key, nextDirection);
  const icon = resolveSortIcon(ariaSort);
  return `<th scope="col" aria-sort="${ariaSort}" class="cursor-pointer select-none p-0${alignmentClass ? ` ${alignmentClass}` : ""}"><a href="${escapeAttr(href)}" hx-get="${escapeAttr(href)}" hx-target="#${escapeAttr(input.tableId)}" hx-push-url="true" hx-swap="outerHTML" hx-indicator="#${SHELL_LOADING_INDICATOR_ID}" class="${INTERACTIVE_SORT_HEADER_LINK_CLASS}" aria-label="${escapeAttr(ariaLabel)}"><span>${escapeHtml(input.column.label)}</span>${icon}</a></th>`;
}

interface HeaderCellInput {
  readonly column: DataTableColumn;
  readonly tableId: string | undefined;
  readonly sortHref: string | undefined;
  readonly sortKey: string | undefined;
  readonly sortDir: DataTableSortDirection | undefined;
  readonly translate: TranslateFn;
}

function renderHeaderCell(input: HeaderCellInput): string {
  if (input.column.sortable && input.sortHref && input.tableId) {
    return renderSortableHeaderCell({
      column: input.column,
      sortHref: input.sortHref,
      tableId: input.tableId,
      sortKey: input.sortKey,
      sortDir: input.sortDir,
      translate: input.translate,
    });
  }
  return renderStaticHeaderCell(input.column);
}

function resolveCellMarkup(
  column: DataTableColumn,
  row: DataTableRow,
  translate: TranslateFn,
): string {
  if (column.render) {
    return column.render(row);
  }
  const value = row[column.key];
  if (value !== null && value !== undefined) {
    return escapeHtml(String(value));
  }
  return escapeHtml(translate("common.placeholders.emptyValue"));
}

function renderEmptyRow(colSpan: number, message: string): string {
  return `<tr><td colspan="${colSpan}" class="py-12 text-center" role="status"><div class="flex flex-col items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8 text-base-content/20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg><span class="text-sm ${TEXT_QUATERNARY_CLASS}">${escapeHtml(message)}</span></div></td></tr>`;
}

interface DataRowInput {
  readonly row: DataTableRow;
  readonly columns: readonly DataTableColumn[];
  readonly bulkSelect: boolean;
  readonly bulkSelectKey: string;
  readonly translate: TranslateFn;
  readonly rowNavigationHref: string;
}

function renderDataRow(input: DataRowInput): string {
  const checkboxCell = input.bulkSelect
    ? `<td><input type="checkbox" class="checkbox checkbox-xs" name="selected" value="${escapeAttr(String(input.row[input.bulkSelectKey] ?? ""))}" aria-label="${escapeAttr(input.translate("common.a11y.selectRow"))}" /></td>`
    : "";
  const cells = input.columns
    .map((column) => {
      const alignmentClass = resolveAlignmentClass(column.align);
      return `<td${alignmentClass ? ` class="${alignmentClass}"` : ""}>${resolveCellMarkup(column, input.row, input.translate)}</td>`;
    })
    .join("");
  const rowClasses = input.rowNavigationHref
    ? `${INTERACTIVE_HOVER_ROW_CLASS} cursor-pointer`
    : INTERACTIVE_HOVER_ROW_CLASS;
  const navigationAttrs = input.rowNavigationHref
    ? ` tabindex="0" role="link" aria-label="${escapeAttr(input.translate("common.aria.openRow"))}" hx-get="${escapeAttr(input.rowNavigationHref)}" hx-target="#${MAIN_CONTENT_ID}" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#${SHELL_LOADING_INDICATOR_ID}" hx-trigger="click, keydown[key==='Enter'||code==='Space']"`
    : "";
  return `<tr class="${rowClasses}"${navigationAttrs}>${checkboxCell}${cells}</tr>`;
}

/**
 * Render an accessible HTMX-aware data table.
 *
 * @param props - Data table props.
 * @returns HTML string.
 */
export function renderDataTable(props: DataTableProps): string {
  const translate = props.translate;
  const zebra = props.zebra ?? false;
  const bulkSelect = props.bulkSelect ?? false;
  const bulkSelectKey = props.bulkSelectKey ?? "id";
  const loading = props.loading ?? false;
  const emptyMessage = props.emptyMessage ?? translate("common.status.noResults");
  const ariaLabel = props.ariaLabel ?? translate("common.a11y.tableScrollable");

  const tableAttrs = [
    props.tableId ? `id="${escapeAttr(props.tableId)}"` : "",
    props.ariaLabel ? `aria-label="${escapeAttr(props.ariaLabel)}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const tableClasses = ["table", zebra ? "table-zebra" : "", "table-pin-rows"]
    .filter(Boolean)
    .join(" ");

  const selectAllHeader = bulkSelect
    ? `<th scope="col" class="w-10"><input type="checkbox" class="checkbox checkbox-xs" aria-label="${escapeAttr(translate("common.a11y.selectAllRows"))}" data-bulk-select-all /></th>`
    : "";

  const headerCells = props.columns
    .map((column) =>
      renderHeaderCell({
        column,
        tableId: props.tableId,
        sortHref: props.sortHref,
        sortKey: props.sortKey,
        sortDir: props.sortDir,
        translate,
      }),
    )
    .join("");

  const colSpan = props.columns.length + (bulkSelect ? 1 : 0);
  const bodyRows = loading
    ? renderTableSkeleton(colSpan)
    : props.rows.length === 0
      ? renderEmptyRow(colSpan, emptyMessage)
      : props.rows
          .map((row) =>
            renderDataRow({
              row,
              columns: props.columns,
              bulkSelect,
              bulkSelectKey,
              translate,
              rowNavigationHref: props.rowHref?.(row) ?? "",
            }),
          )
          .join("");

  const captionHtml = props.caption
    ? `<caption class="sr-only">${escapeHtml(props.caption)}</caption>`
    : "";

  return `
  <div class="overflow-x-auto overscroll-x-contain scroll-smooth rounded-box border border-base-300/50 bg-base-100 shadow-sm motion-safe:transition-shadow motion-safe:duration-200 hover:shadow-md touch-pan-x" role="region" tabindex="0" aria-label="${escapeAttr(ariaLabel)}">
    <table class="${tableClasses}"${tableAttrs ? ` ${tableAttrs}` : ""}>
      ${captionHtml}
      <thead class="${SURFACE_GLASS}">
        <tr>${selectAllHeader}${headerCells}</tr>
      </thead>
      <tbody>${bodyRows}</tbody>
    </table>
  </div>`;
}
