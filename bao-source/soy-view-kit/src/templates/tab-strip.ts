/**
 * Tab strip primitive — daisyUI tabs-box with HTMX-driven content loading.
 *
 * Each tab issues an `hx-get` against its content endpoint into a shared
 * tabpanel. Tabs do not push browser history by default — pagination/filter
 * state inside the tabpanel handles that.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";
import type { TranslateFn } from "./types.js";

/** A single tab definition. */
export interface TabItem {
  /** Unique tab identifier. */
  readonly id: string;
  /** Display label. */
  readonly label: string;
  /** HTMX endpoint that returns the tab content fragment. */
  readonly href: string;
  /** Whether this tab is currently active. */
  readonly active?: boolean;
}

/** Props for the tab strip primitive. */
export interface TabStripProps {
  /** Tab definitions. */
  readonly tabs: readonly TabItem[];
  /** DOM id of the tabpanel that receives the swapped fragment. */
  readonly contentTargetId: string;
  /** Translator callback used for the default tab list aria label. */
  readonly translate: TranslateFn;
  /** Optional `aria-label` override for the tab list. */
  readonly ariaLabel?: string;
  /** i18n key for the default `aria-label`. Defaults to `common.a11y.pageSection`. */
  readonly ariaLabelKey?: string;
}

/**
 * Render a daisyUI tabs-box strip with HTMX navigation.
 *
 * @param props - Tab strip props.
 * @returns HTML string.
 */
export function renderTabStrip(props: TabStripProps): string {
  const label = props.ariaLabel ?? props.translate(props.ariaLabelKey ?? "common.a11y.pageSection");
  const panelId = `${props.contentTargetId}-panel`;
  const tabsHtml = props.tabs
    .map((tab) => {
      const tabId = `tab-${tab.id}`;
      const activeClass = tab.active ? " tab-active" : "";
      const ariaSelected = tab.active ? ' aria-selected="true"' : ' aria-selected="false"';
      const navAttrs = buildShellHtmxNavigationAttributes(tab.href, {
        target: `#${props.contentTargetId}`,
        pushUrl: false,
      });
      return `<a id="${escapeAttr(tabId)}" role="tab"
        href="${escapeAttr(tab.href)}"
        class="tab${activeClass}"
        ${ariaSelected}
        aria-controls="${escapeAttr(panelId)}"
        ${navAttrs}>${escapeHtml(tab.label)}</a>`;
    })
    .join("");

  const activeTab = props.tabs.find((tab) => tab.active);
  const activeLabelledBy = activeTab ? ` aria-labelledby="tab-${escapeAttr(activeTab.id)}"` : "";

  return `
    <div class="mb-6 overflow-x-auto">
      <div role="tablist" class="tabs tabs-box w-max min-w-full" aria-label="${escapeAttr(label)}">
        ${tabsHtml}
      </div>
    </div>
    <div id="${escapeAttr(props.contentTargetId)}" role="tabpanel" tabindex="0"${activeLabelledBy}></div>`;
}
