/**
 * Sidebar primitive — daisyUI drawer-side with HTMX-driven nav items.
 *
 * Decoupled from any concrete app: the consumer supplies items, current path,
 * brand label, navigation aria label, and the optional footer text. Hierarchical
 * groups render as collapsible `<details>` blocks with `menu-active` on the
 * matching ancestor.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { MAIN_NAVIGATION_ID, SURFACE_GLASS, TEXT_CAPTION_CLASS } from "./design-tokens.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";
import { renderIcon } from "./icons.js";
import type { TranslateFn } from "./types.js";

/** Default leaf icon used when no per-item icon is supplied. */
const DEFAULT_ITEM_ICON_SVG = renderIcon("sidebar-default", {
  size: "menu",
  className: "my-1.5 inline-block size-4 shrink-0",
});

const DRAWER_CLOSE_AFTER_NAV_ATTRIBUTE = 'data-ui-drawer-close-after-nav="true"';

/** Sidebar navigation item descriptor. */
export interface SidebarItem {
  /** Display label. */
  readonly label: string;
  /** URL path for HTMX navigation. */
  readonly href: string;
  /** Optional tooltip when the drawer is collapsed. */
  readonly tooltip?: string;
  /** Optional icon SVG. */
  readonly iconSvg?: string;
  /** Optional section group label rendered above the first item. */
  readonly group?: string;
  /** Child items for collapsible submenu groups. */
  readonly children?: readonly SidebarItem[];
  /** Whether the group should be open by default. */
  readonly defaultOpen?: boolean;
}

/** Props for the sidebar primitive. */
export interface SidebarProps {
  /** Drawer toggle input id (must match the drawer-toggle id). */
  readonly drawerId: string;
  /** Sidebar items (typically driven by capability/permission checks). */
  readonly items: readonly SidebarItem[];
  /** Translator callback. */
  readonly translate: TranslateFn;
  /** Current request path for `aria-current="page"` matching. */
  readonly currentPath?: string;
  /** Brand label displayed in the sidebar header. Defaults to `brand.name`. */
  readonly brandLabel?: string;
  /** Sidebar footer text. Often a version string or brand line. */
  readonly footerText?: string;
  /** i18n key for the drawer-close `aria-label`. Defaults to `common.a11y.closeSidebar`. */
  readonly closeSidebarAriaLabelKey?: string;
  /** i18n key for the navigation landmark `aria-label`. Defaults to `common.a11y.mainNavigation`. */
  readonly mainNavigationAriaLabelKey?: string;
}

function ensureDecorativeSvg(iconSvg: string): string {
  if (!iconSvg.includes("<svg")) {
    return iconSvg;
  }
  let next = iconSvg;
  if (!next.includes("aria-hidden=")) {
    next = next.replace("<svg", '<svg aria-hidden="true"');
  }
  if (!next.includes("focusable=")) {
    next = next.replace("<svg", '<svg focusable="false"');
  }
  return next;
}

function isLeafActive(href: string, currentPath: string | undefined): boolean {
  if (currentPath === undefined) {
    return false;
  }
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function isGroupActive(item: SidebarItem, currentPath: string | undefined): boolean {
  if (isLeafActive(item.href, currentPath)) {
    return true;
  }
  return (item.children ?? []).some((child) => isLeafActive(child.href, currentPath));
}

function renderLeafItem(item: SidebarItem, currentPath: string | undefined): string {
  const active = isLeafActive(item.href, currentPath);
  const ariaCurrent = active ? ' aria-current="page"' : "";
  const itemClass = active
    ? "menu-active bg-base-100 font-medium text-base-content"
    : "hover:bg-base-100";
  const iconMarkup = ensureDecorativeSvg(item.iconSvg ?? DEFAULT_ITEM_ICON_SVG);

  return `
    <li>
      <a href="${escapeAttr(item.href)}"
         class="min-w-0 gap-3 rounded-box ${itemClass}"
         ${ariaCurrent}
         aria-label="${escapeAttr(item.label)}"
         ${DRAWER_CLOSE_AFTER_NAV_ATTRIBUTE}
         ${buildShellHtmxNavigationAttributes(item.href)}
         hx-preload="mouseover">
        ${iconMarkup}
        <span class="min-w-0 flex-1 truncate">${escapeHtml(item.label)}</span>
      </a>
    </li>`;
}

function renderGroupItem(item: SidebarItem, currentPath: string | undefined): string {
  const active = isGroupActive(item, currentPath);
  const openAttr = active || item.defaultOpen ? " open" : "";
  const summaryClass = active
    ? "menu-active bg-base-100 font-medium text-base-content"
    : "font-medium hover:bg-base-100";
  const iconMarkup = ensureDecorativeSvg(item.iconSvg ?? DEFAULT_ITEM_ICON_SVG);
  const childrenHtml = (item.children ?? [])
    .map((child) => renderLeafItem(child, currentPath))
    .join("");

  return `
    <li>
      <details${openAttr}>
        <summary class="min-w-0 gap-3 rounded-box ${summaryClass}">
          ${iconMarkup}
          <span class="min-w-0 flex-1 truncate">${escapeHtml(item.label)}</span>
        </summary>
        <ul>${childrenHtml}</ul>
      </details>
    </li>`;
}

/**
 * Render the responsive collapsible sidebar.
 *
 * @param props - Sidebar props.
 * @returns HTML string.
 */
export function renderSidebar(props: SidebarProps): string {
  const closeAriaLabel = props.translate(
    props.closeSidebarAriaLabelKey ?? "common.a11y.closeSidebar",
  );
  const mainNavAriaLabel = props.translate(
    props.mainNavigationAriaLabelKey ?? "common.a11y.mainNavigation",
  );
  const brandLabel = props.brandLabel ?? props.translate("brand.name");
  const footerText = props.footerText ?? brandLabel;

  const itemsHtml = props.items
    .map((item) =>
      item.children && item.children.length > 0
        ? renderGroupItem(item, props.currentPath)
        : renderLeafItem(item, props.currentPath),
    )
    .join("");

  return `
  <div class="drawer-side z-20">
    <label for="${escapeAttr(props.drawerId)}" aria-controls="${escapeAttr(props.drawerId)}" aria-label="${escapeAttr(closeAriaLabel)}" class="drawer-overlay bg-base-content/20 lg:hidden"></label>
    <aside class="bao-shell-sidebar ${SURFACE_GLASS} flex h-dvh w-64 flex-col overflow-x-hidden sticky top-0 xl:w-72" aria-label="${escapeAttr(mainNavAriaLabel)}">
      <div class="border-b border-base-300 p-4">
        <div class="min-w-0">
          <p class="${TEXT_CAPTION_CLASS} font-semibold uppercase tracking-wide">${escapeHtml(brandLabel)}</p>
          <p class="truncate text-sm font-medium text-base-content">${escapeHtml(mainNavAriaLabel)}</p>
        </div>
      </div>
      <nav id="${MAIN_NAVIGATION_ID}" class="flex-1 overflow-x-hidden overflow-y-auto" aria-label="${escapeAttr(mainNavAriaLabel)}">
        <ul class="menu menu-sm flex-1 gap-1 p-4" role="list">${itemsHtml}</ul>
      </nav>
      <div class="border-t border-base-300 p-4 ${TEXT_CAPTION_CLASS}">${escapeHtml(footerText)}</div>
    </aside>
  </div>`;
}
