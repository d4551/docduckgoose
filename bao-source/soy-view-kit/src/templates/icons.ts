/**
 * Canonical inline SVG icon renderer — daisyUI 5 aligned sizing and a11y.
 *
 * Single registry + renderer; consumers pass semantic icon names instead of
 * embedding path data or duplicating SVG wrappers.
 *
 * @packageDocumentation
 */

import { ICON_SIZE_CLASS, type IconSizePreset } from "./design-tokens.js";

/** Supported semantic icon names. */
export type IconName =
  | "alert-error"
  | "alert-info"
  | "alert-success"
  | "alert-warning"
  | "bold"
  | "building"
  | "crown"
  | "delete"
  | "docs"
  | "heading"
  | "keyboard"
  | "link"
  | "list"
  | "mermaid"
  | "mic"
  | "new"
  | "open"
  | "pdf"
  | "plugins"
  | "pointer"
  | "power"
  | "preview"
  | "print"
  | "reload"
  | "save"
  | "settings"
  | "sidebar-default"
  | "speak"
  | "template-letter"
  | "template-manuscript"
  | "template-notes"
  | "undo";

type IconGlyph = string | readonly string[];

/** Heroicons-compatible stroke path registry keyed by semantic name. */
const ICON_GLYPHS: Readonly<Record<IconName, IconGlyph>> = {
  "alert-error": "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  "alert-info": "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "alert-success": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  "alert-warning":
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  bold: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
  building:
    "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  crown:
    "M2.25 18L9 11.25l4.5 4.5L21.75 9M12 21.75c-4.97 0-9.75-2.835-9.75-6.75 0-1.5 1.5-3.75 3.75-3.75.75 0 1.5.375 2.25.75.75-.375 1.5-.75 2.25-.75 2.25 0 3.75 2.25 3.75 3.75 0 3.915-4.78 6.75-9.75 6.75Z",
  delete:
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
  docs: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
  heading: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12",
  keyboard:
    "M6.75 7.5h10.5M6.75 12h10.5m-10.5 4.5h10.5M4.5 6.75h15a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5Z",
  link: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244",
  list: [
    "M8.25 6.75h12M8.25 12h12m-12 5.25h12",
    "M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  ],
  mermaid:
    "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a2.25 2.25 0 0 0 1.423-2.082l.956-5.396a.75.75 0 0 0-.729-.83H5.25",
  mic: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z",
  new: "M12 4.5v15m7.5-7.5h-15",
  open: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
  pdf: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
  plugins:
    "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z",
  pointer:
    "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59",
  power: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  preview:
    "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  print:
    "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.22H7.231c-.662 0-1.18-.568-1.12-1.22L6.34 18m11.318 0h1.091a2.25 2.25 0 0 0 2.25-2.25V6.657c0-1.224-1.022-2.22-2.278-2.318A48.394 48.394 0 0 0 12 3.75c-2.676 0-5.216.584-7.499 1.632A2.25 2.25 0 0 0 2.25 6.657v9.143A2.25 2.25 0 0 0 4.5 18h1.09m11.318 0H12",
  reload:
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  save: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z",
  settings: [
    "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z",
    "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  ],
  "sidebar-default": [
    "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",
    "M9 4v16",
    "M14 10l2 2l-2 2",
  ],
  speak:
    "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
  "template-letter":
    "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  "template-manuscript": [
    "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
  ],
  "template-notes":
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  undo: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3",
};

/** Alert semantic types mapped to registry icon names. */
export type AlertIconName = "alert-error" | "alert-info" | "alert-success" | "alert-warning";

/** Options for {@link renderIcon}. */
export interface IconRenderOptions {
  /** Explicit utility classes; overrides {@link IconRenderOptions.size}. */
  readonly className?: string;
  /** Semantic size preset aligned to daisyUI component examples. */
  readonly size?: IconSizePreset;
  /** When true (default), marks the SVG decorative for assistive tech. */
  readonly ariaHidden?: boolean;
  /** Accessible name when the icon is meaningful (sets aria-label). */
  readonly ariaLabel?: string;
  /** Stroke width — daisyUI buttons use 2.5, menus use 2. */
  readonly strokeWidth?: "2" | "2.5";
  /** Optional viewBox override for compact sort glyphs. */
  readonly viewBox?: string;
}

const DEFAULT_STROKE_WIDTH_BY_SIZE: Readonly<Record<IconSizePreset, "2" | "2.5">> = {
  button: "2.5",
  badge: "2",
  menu: "2",
  dock: "2.5",
  stat: "2",
  input: "2.5",
  compact: "2.5",
  template: "2",
  device: "2",
};

const ICON_BASE_CLASS = "inline-block shrink-0 align-middle pointer-events-none";

function glyphPaths(glyph: IconGlyph): string {
  const paths = typeof glyph === "string" ? [glyph] : glyph;
  return paths
    .map((pathData) => `<path stroke-linecap="round" stroke-linejoin="round" d="${pathData}"/>`)
    .join("");
}

function resolveIconClassName(options: IconRenderOptions): string {
  const preset = options.size ?? "button";
  return [ICON_BASE_CLASS, options.className ?? ICON_SIZE_CLASS[preset]].join(" ");
}

function resolveStrokeWidth(options: IconRenderOptions): "2" | "2.5" {
  if (options.strokeWidth) {
    return options.strokeWidth;
  }
  const preset = options.size ?? "button";
  return DEFAULT_STROKE_WIDTH_BY_SIZE[preset];
}

/**
 * Render a decorative or labelled inline SVG icon from the canonical registry.
 *
 * @param name - Semantic icon name.
 * @param options - Size, a11y, and styling options.
 * @returns HTML string containing one inline SVG element.
 */
export function renderIcon(name: IconName, options: IconRenderOptions = {}): string {
  const glyph = ICON_GLYPHS[name];
  const className = resolveIconClassName(options);
  const strokeWidth = resolveStrokeWidth(options);
  const viewBox = options.viewBox ?? "0 0 24 24";
  const ariaHidden = options.ariaHidden ?? options.ariaLabel === undefined;
  const ariaHiddenAttr = ariaHidden ? ' aria-hidden="true" focusable="false"' : "";
  const ariaLabelAttr =
    options.ariaLabel !== undefined ? ` aria-label="${options.ariaLabel}" role="img"` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="${viewBox}" stroke-width="${strokeWidth}" stroke="currentColor" class="${className}"${ariaHiddenAttr}${ariaLabelAttr}>${glyphPaths(glyph)}</svg>`;
}

/**
 * Render an alert-type icon using menu sizing (daisyUI alert examples).
 *
 * @param type - Alert semantic type.
 * @returns HTML string.
 */
export function renderAlertIcon(type: AlertIconName): string {
  return renderIcon(type, { size: "menu" });
}

/**
 * Resolve a document-template id to its registry icon markup.
 *
 * @param templateId - Template identifier from contribution registry.
 * @returns HTML string for the template card icon.
 */
export function renderTemplateIconForId(templateId: string): string {
  if (templateId.includes("letter")) {
    return renderIcon("template-letter", { size: "template" });
  }
  if (templateId.includes("manuscript")) {
    return renderIcon("template-manuscript", { size: "template" });
  }
  return renderIcon("template-notes", { size: "template" });
}

/**
 * Resolve enterprise tier type to its registry icon markup.
 *
 * @param type - Enterprise context tier type.
 * @param options - Optional size override.
 * @returns HTML string.
 */
export function renderTierIconForType(
  type: string,
  options: Pick<IconRenderOptions, "className" | "size"> = {},
): string {
  if (type === "enterprise") {
    return renderIcon("crown", { size: "compact", ...options });
  }
  if (type === "admin" || type === "workplace") {
    return renderIcon("building", { size: "compact", ...options });
  }
  return renderIcon("plugins", { size: "compact", ...options });
}

/**
 * Render a data-table sort-direction icon (16×16 viewBox).
 *
 * @param direction - Active sort direction or idle state.
 * @param active - Whether this column owns the active sort.
 * @returns HTML string.
 */
export function renderSortIcon(direction: "asc" | "desc" | "idle", active: boolean): string {
  const tone = active ? "text-primary" : "text-base-content/25";
  const inner =
    direction === "asc"
      ? '<path d="M4 10l4-4 4 4"/><path d="M8 6v8" class="opacity-30"/>'
      : direction === "desc"
        ? '<path d="M4 6l4 4 4-4" class="opacity-30"/><path d="M8 6v8"/>'
        : '<path d="M4 8l4-3 4 3"/><path d="M4 12l4 3 4-3"/>';
  return `<svg class="size-3 shrink-0 ${tone}" aria-hidden="true" focusable="false" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
