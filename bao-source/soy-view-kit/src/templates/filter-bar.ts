/**
 * Filter bar primitive — search input + dropdown filters + reset button.
 *
 * Wires HTMX `input changed delay:300ms` debouncing on search and submit-on-change
 * on filters so list views stay responsive without flooding the server.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { FLEX_CENTER_GAP_2_CLASS, SHELL_LOADING_INDICATOR_ID } from "./design-tokens.js";
import type { TranslateFn } from "./types.js";

/** A filter dropdown option. */
export interface FilterOption {
  /** Display label. */
  readonly label: string;
  /** Form value submitted when selected. */
  readonly value: string;
  /** Whether this option is currently selected. */
  readonly selected?: boolean;
}

/** A single filter definition. */
export interface FilterDefinition {
  /** Query parameter name for this filter. */
  readonly key: string;
  /** Display label for this filter. */
  readonly label: string;
  /** Available options. */
  readonly options: readonly FilterOption[];
}

/** Props for the filter bar primitive. */
export interface FilterBarProps {
  /** HTMX endpoint to submit filters against. */
  readonly actionHref: string;
  /** DOM id of the element to swap results into. */
  readonly targetId: string;
  /** Translator callback used for default placeholder/aria copy. */
  readonly translate: TranslateFn;
  /** Placeholder text for the search input. Defaults to `common.actions.search`. */
  readonly searchPlaceholder?: string;
  /** Current search value. */
  readonly searchValue?: string;
  /** Optional select-based filters. */
  readonly filters?: readonly FilterDefinition[];
  /** Query parameter name for search text. Defaults to `q`. */
  readonly searchParam?: string;
  /** Whether interactions push browser history. Defaults to true. */
  readonly pushUrl?: boolean;
  /** i18n key for the reset-filters aria label. Defaults to `common.actions.resetFilters`. */
  readonly resetAriaLabelKey?: string;
}

/**
 * Render a filter bar with search input and optional dropdown filters.
 *
 * @param props - Filter bar props.
 * @returns HTML string.
 */
export function renderFilterBar(props: FilterBarProps): string {
  const param = props.searchParam ?? "q";
  const placeholder = props.searchPlaceholder ?? props.translate("common.actions.search");
  const value = props.searchValue ?? "";
  const pushUrlAttr = (props.pushUrl ?? true) ? 'hx-push-url="true"' : 'hx-push-url="false"';
  const resetAriaLabel = props.translate(props.resetAriaLabelKey ?? "common.actions.resetFilters");

  const filtersHtml = (props.filters ?? [])
    .map((filter) => {
      const optionsHtml = filter.options
        .map((opt) => {
          const sel = opt.selected ? " selected" : "";
          return `<option value="${escapeAttr(opt.value)}"${sel}>${escapeHtml(opt.label)}</option>`;
        })
        .join("");
      return `
        <select name="${escapeAttr(filter.key)}"
                class="select select-sm"
                aria-label="${escapeAttr(filter.label)}"
                hx-get="${escapeAttr(props.actionHref)}"
                hx-target="#${escapeAttr(props.targetId)}"
                hx-swap="innerHTML"
                hx-indicator="#${SHELL_LOADING_INDICATOR_ID}"
                ${pushUrlAttr}
                hx-include="closest form">
          <option value="">${escapeHtml(filter.label)}</option>
          ${optionsHtml}
        </select>`;
    })
    .join("");

  return `
    <form role="search" aria-label="${escapeAttr(placeholder)}" class="flex flex-wrap items-center gap-3 md:gap-4 xl:gap-5"
          hx-get="${escapeAttr(props.actionHref)}"
          hx-target="#${escapeAttr(props.targetId)}"
          hx-swap="innerHTML"
          hx-indicator="#${SHELL_LOADING_INDICATOR_ID}"
          ${pushUrlAttr}
          hx-trigger="submit">
      <label class="input input-sm ${FLEX_CENTER_GAP_2_CLASS}">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="search"
               name="${escapeAttr(param)}"
               value="${escapeAttr(value)}"
               class="grow"
               placeholder="${escapeAttr(placeholder)}"
               aria-label="${escapeAttr(placeholder)}"
               hx-get="${escapeAttr(props.actionHref)}"
               hx-target="#${escapeAttr(props.targetId)}"
               hx-swap="innerHTML"
               hx-indicator="#${SHELL_LOADING_INDICATOR_ID}"
               ${pushUrlAttr}
               hx-trigger="input changed delay:300ms, search" />
      </label>
      ${filtersHtml}
      <button type="reset" class="btn btn-sm btn-ghost" aria-label="${escapeAttr(resetAriaLabel)}">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </form>`;
}
