/**
 * Canonical design-token class strings shared across all UI surfaces.
 *
 * Centralises the daisyUI 5 + Tailwind v4 utility combinations enforced by the
 * Baohaus enterprise UI standard so package renderers cannot drift into
 * per-surface palette choices.
 *
 * @packageDocumentation
 */

/** Skip-link and HTMX swap target id for the main content region. */
export const MAIN_CONTENT_ID = "main-content";

/** Skip-link target id for the primary navigation region. */
export const MAIN_NAVIGATION_ID = "main-navigation";

/** HTMX swap target for auth/public layout body content. */
export const AUTH_CONTENT_ID = "auth-content";

/** Shell-managed command palette event target id. */
export const COMMAND_PALETTE_ID = "command-palette";

/** Shared HTMX loading indicator target for shell-owned navigation requests. */
export const SHELL_LOADING_INDICATOR_ID = "shell-loading-indicator";

/** Out-of-band swap target for navbar breadcrumb slot updates. */
export const SHELL_BREADCRUMBS_ID = "shell-breadcrumbs";

/** Default selector for the main content region. */
export const MAIN_CONTENT_SELECTOR: string = `#${MAIN_CONTENT_ID}`;

/** Default selector for the shell loading indicator. */
export const SHELL_LOADING_INDICATOR_SELECTOR: string = `#${SHELL_LOADING_INDICATOR_ID}`;

/** Secondary text color (labels, descriptions, metadata). */
export const TEXT_SECONDARY_CLASS = "text-base-content/70";

/** Tertiary/muted text color (auxiliary captions, hints). */
export const TEXT_TERTIARY_CLASS = "text-base-content/60";

/** Quaternary/faintest text color (timestamps, neutral indicators). */
export const TEXT_QUATERNARY_CLASS = "text-base-content/40";

/** Subtle muted text (placeholder-weight elements, inactive content). */
export const TEXT_MUTED_CLASS = "text-base-content/50";

/** Subdued subtitle text (slightly more visible than tertiary). */
export const TEXT_SUBTITLE_CLASS = "text-base-content/55";

/** Detail text within alerts and supplementary callout content. */
export const TEXT_DETAIL_CLASS = "text-base-content/80";

/** Decorative icon color for empty-state imagery and ornamentation. */
export const TEXT_ICON_MUTED_CLASS = "text-base-content/20";

/** Small secondary text (definition list labels, metadata rows). */
export const TEXT_SM_SECONDARY_CLASS = "text-sm text-base-content/70";

/** Small tertiary text (auxiliary captions, timestamps). */
export const TEXT_SM_TERTIARY_CLASS = "text-sm text-base-content/60";

/** Small quaternary text (timestamps, metadata footnotes). */
export const TEXT_SM_QUATERNARY_CLASS = "text-sm text-base-content/40";

/** Extra-small quaternary text (compact timestamps, neutral metadata). */
export const TEXT_XS_QUATERNARY_CLASS = "text-xs text-base-content/40";

/** Extra-small muted text (save-status indicators, subtle hints). */
export const TEXT_XS_MUTED_CLASS = "text-xs text-base-content/50";

/** Extra-small subtitle text (compact descriptions). */
export const TEXT_XS_SUBTITLE_CLASS = "text-xs text-base-content/55";

/** Extra-small detail text (alert details, compact supplementary info). */
export const TEXT_XS_DETAIL_CLASS = "text-xs text-base-content/80";

/** Extra-small uppercase label (section headings, category labels). */
export const TEXT_LABEL_XS_CLASS =
  "text-xs text-base-content/60 font-semibold uppercase tracking-wide";

/** Extra-small uppercase quaternary label (stat titles, decorative section labels). */
export const TEXT_LABEL_XS_QUATERNARY_CLASS =
  "text-xs font-semibold uppercase tracking-widest text-base-content/40";

/** Extra-small uppercase term label for definition lists (widest tracking). */
export const DEFINITION_TERM_XS_CLASS =
  "text-xs font-semibold uppercase tracking-widest text-base-content/60";

/** Compact 2-column definition grid for detail panels. */
export const DEFINITION_GRID_COMPACT_CLASS = "grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm";

/** Standard 2-column definition grid with more spacing. */
export const DEFINITION_GRID_STANDARD_CLASS = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm";

/** Wide 3-column definition grid for dense detail views. */
export const DEFINITION_GRID_WIDE_CLASS =
  "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 text-sm";

/** Canonical container width contract for navbar and authenticated body. */
export const APP_SHELL_CONTAINER_CLASS = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/** Canonical standard page-body container for authenticated shell content. */
export const APP_SHELL_STANDARD_CONTENT_CLASS =
  "mx-auto min-h-full w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 xl:py-8";

/** Hint text colour for form helper copy below inputs. */
export const TEXT_HINT_CLASS = "text-xs text-base-content/60";

/** Caption text colour for sidebar footers and decorative labels. */
export const TEXT_CAPTION_CLASS = "text-xs text-base-content/40";

/** Inline icon-and-label flex container shared by inputs, badges, and stat figures. */
export const FLEX_CENTER_GAP_2_CLASS = "flex items-center gap-2";

/** daisyUI 5 inline icon sizing for compact icon controls. */
export const ICON_INLINE_BUTTON_CLASS = "size-4";

/** daisyUI 5 badge-with-icon sizing. */
export const ICON_INLINE_BADGE_CLASS = "size-3.5";

/** daisyUI 5 menu-with-icons sizing (`h-5 w-5`). */
export const ICON_MENU_CLASS = "h-5 w-5 shrink-0";

/** daisyUI 5 search-input-with-icon sizing. */
export const ICON_INPUT_CLASS = "size-4 opacity-50";

/** daisyUI 5 stat-figure icon sizing. */
export const ICON_STAT_CLASS = "inline-block h-8 w-8 stroke-current";

/** Compact toolbar / table-action icon sizing. */
export const ICON_COMPACT_CLASS = "size-4";

/** Template picker card icon sizing. */
export const ICON_TEMPLATE_CLASS = "size-6";

/** Device-status chip icon sizing. */
export const ICON_DEVICE_CLASS = "size-4";

/** Semantic icon size presets mapped to daisyUI-aligned utility classes. */
export type IconSizePreset =
  | "button"
  | "badge"
  | "menu"
  | "dock"
  | "stat"
  | "input"
  | "compact"
  | "template"
  | "device";

/** Resolve a semantic icon size preset to its Tailwind utility class. */
export const ICON_SIZE_CLASS: Readonly<Record<IconSizePreset, string>> = {
  button: ICON_INLINE_BUTTON_CLASS,
  badge: ICON_INLINE_BADGE_CLASS,
  menu: ICON_MENU_CLASS,
  dock: "size-5",
  stat: ICON_STAT_CLASS,
  input: ICON_INPUT_CLASS,
  compact: ICON_COMPACT_CLASS,
  template: ICON_TEMPLATE_CLASS,
  device: ICON_DEVICE_CLASS,
};

/** Hover/focus row interaction classes shared by data tables and grouped lists. */
export const INTERACTIVE_HOVER_ROW_CLASS =
  "hover:bg-base-200/40 motion-safe:transition-colors motion-safe:[transition-duration:var(--v-duration-fast)] focus-within:bg-base-200/30";

/** Sortable table header link hover — aligned with Happydumpling data-table partial. */
export const INTERACTIVE_SORT_HEADER_LINK_CLASS =
  "flex w-full items-center gap-1.5 px-4 py-3 motion-safe:transition-colors motion-safe:[transition-duration:var(--v-duration-fast)] hover:bg-base-200";

/**
 * Pre-declared stagger-delay classes for sequential entry animations.
 *
 * The `animation-delay-N` utilities are defined in
 * `@baohaus/soy-view-kit/templates/styles/templates.css`. Consumers MUST
 * import that stylesheet for the delays to take effect.
 */
export const STAGGER_DELAY_CLASSES: readonly string[] = [
  "",
  "animation-delay-60",
  "animation-delay-120",
  "animation-delay-180",
  "animation-delay-240",
  "animation-delay-300",
];

/**
 * Resolve the stagger animation delay class for a zero-based index.
 *
 * @param staggerIndex - Zero-based index in a staggered list.
 * @returns CSS class string or empty string when no delay applies.
 */
export function resolveStaggerClass(staggerIndex: number | undefined): string {
  if (staggerIndex === undefined || staggerIndex === 0) {
    return "";
  }
  return STAGGER_DELAY_CLASSES[staggerIndex] ?? "";
}

/**
 * Glass surface token — canonical `.bao` glass class from layout tokens.
 */
export const SURFACE_GLASS = "bao-surface-glass";

/**
 * Glass surface for package-level SSR when hosted inside Happydumpling shell.
 * Pair with Aurora theme `.bao` assets (`baohaus-theme-aurora-*-bao`) and `brand-theme.css` `--bao-glass-*`.
 */
export const GLASS_SURFACE_CARD_CLASS = "card card-border glass bao-surface-glass";

/** Glass stats row container for KPI bands in report previews. */
export const GLASS_STATS_ROW_CLASS =
  "stats stats-vertical w-full glass bao-surface-glass lg:stats-horizontal";
