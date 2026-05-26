/**
 * Canonical HTMX attribute helpers.
 *
 * Standardises the navigation contract for shell-owned links and the required
 * extension list so every package registers the same baseline behaviour
 * (idiomorph swap, response-targets error routing, head merge, link preload,
 * loading-state class toggling, auto-removal, class-tools).
 *
 * @packageDocumentation
 */

import { escapeAttr } from "../html.js";
import { MAIN_CONTENT_SELECTOR, SHELL_LOADING_INDICATOR_SELECTOR } from "./design-tokens.js";

/** Required HTMX extensions registered on the body element of every page. */
export const REQUIRED_HTMX_EXTENSIONS: readonly string[] = [
  "morph",
  "response-targets",
  "head-support",
  "preload",
  "class-tools",
  "remove-me",
  "loading-states",
];

/** HTMX navigation contract for shell-owned links and buttons. */
export interface ShellHtmxNavigationOptions {
  /** Target selector for the swap region. Defaults to `#main-content`. */
  target?: string;
  /** Swap strategy for the response fragment. Defaults to `innerHTML`. */
  swap?: string;
  /** Whether the request should push browser history. Defaults to `true`. */
  pushUrl?: boolean;
  /** Indicator selector toggled during the request. Defaults to the shell loading indicator. */
  indicatorSelector?: string;
  /** Preload strategy. Defaults to `mouseover`. Pass `false` to disable. */
  preload?: string | false;
}

/**
 * Build canonical HTMX navigation attributes for shell-owned links.
 *
 * @param href - Destination URL for both `href` and `hx-get`.
 * @param options - Optional HTMX overrides.
 * @returns Attribute string for inclusion in trusted template markup.
 */
export function buildShellHtmxNavigationAttributes(
  href: string,
  options: ShellHtmxNavigationOptions = {},
): string {
  const target = options.target ?? MAIN_CONTENT_SELECTOR;
  const swap = options.swap ?? "innerHTML";
  const indicatorSelector = options.indicatorSelector ?? SHELL_LOADING_INDICATOR_SELECTOR;
  const pushUrl = options.pushUrl ?? true;
  const preload = options.preload === false ? false : (options.preload ?? "mouseover");

  const attrs = [
    `hx-get="${escapeAttr(href)}"`,
    `hx-target="${escapeAttr(target)}"`,
    `hx-push-url="${pushUrl ? "true" : "false"}"`,
    `hx-swap="${escapeAttr(swap)}"`,
    `hx-indicator="${escapeAttr(indicatorSelector)}"`,
  ];

  if (preload !== false) {
    attrs.push(`hx-preload="${escapeAttr(preload)}"`);
  }

  return attrs.join(" ");
}

/**
 * Render the `hx-ext` attribute string for the body element of every page.
 *
 * @param extras - Optional additional extensions appended after the required set.
 * @returns Attribute fragment such as ` hx-ext="morph,response-targets,..."`.
 */
export function htmxExtensionsAttr(extras: readonly string[] = []): string {
  const list = [...REQUIRED_HTMX_EXTENSIONS, ...extras].join(",");
  return ` hx-ext="${escapeAttr(list)}"`;
}
