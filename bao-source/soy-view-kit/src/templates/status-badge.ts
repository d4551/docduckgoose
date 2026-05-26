/**
 * Status badge primitive — daisyUI badge with ARIA attributes.
 *
 * Renders a status indicator suitable for table cells, cards, and inline
 * status displays. Combines colour + size + style modifiers behind a
 * single typed surface.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";

/** daisyUI badge variants. */
export type BadgeVariant =
  | "neutral"
  | "ghost"
  | "outline"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

/** daisyUI badge size modifiers. */
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

/** daisyUI badge style modifiers excluding the default solid style. */
export type BadgeStyle = "soft" | "outline" | "dash";

/** HTML attribute value types supported by the badge primitive. */
export type StatusBadgeAttributeValue = string | number | boolean;

/** Optional accessibility and behavioural controls for status badges. */
export interface StatusBadgeOptions {
  /** Announce badge updates via live-region semantics when true. */
  announce?: boolean;
  /** Keep the entire badge text atomic for screen-reader announcements. */
  atomic?: boolean;
  /** Explicit accessible name when the visible text is not the spoken label. */
  ariaLabel?: string;
  /** Extra utility classes appended to the badge element. */
  className?: string;
  /** Optional DOM id for HTMX targets and live regions. */
  id?: string;
  /** Optional out-of-band swap marker. */
  swapOob?: boolean;
  /** Semantic element tag. Defaults to `span`. */
  tagName?: "div" | "span";
  /** Optional badge size. */
  size?: BadgeSize;
  /** Optional badge style modifier. */
  style?: BadgeStyle;
  /** Extra HTML attributes for HTMX/data hooks. */
  attributes?: Readonly<Record<string, StatusBadgeAttributeValue>>;
}

function renderBadgeAttributes(attributes: StatusBadgeOptions["attributes"]): string {
  if (!attributes) {
    return "";
  }
  return Object.entries(attributes)
    .flatMap(([name, value]) => {
      if (value === false) {
        return [];
      }
      if (value === true) {
        return [` ${escapeAttr(name)}`];
      }
      return [` ${escapeAttr(name)}="${escapeAttr(String(value))}"`];
    })
    .join("");
}

/**
 * Render a status badge with ARIA wiring.
 *
 * @param status - Display text (escaped).
 * @param variant - Badge variant. Defaults to `ghost`. Pass `null` for style-only badges.
 * @param options - Optional controls.
 * @returns HTML string.
 */
export function renderStatusBadge(
  status: string,
  variant: BadgeVariant | null = "ghost",
  options: StatusBadgeOptions = {},
): string {
  const safeStatus = escapeHtml(status);
  const safeAriaLabel = escapeAttr(options.ariaLabel ?? status);
  const classes = ["badge"];
  const tagName = options.tagName ?? "span";

  if (variant) {
    classes.push(`badge-${variant}`);
  }
  if (options.size !== undefined) {
    classes.push(`badge-${options.size}`);
  }
  if (options.style) {
    classes.push(`badge-${options.style}`);
  }
  if (options.className) {
    classes.push(options.className);
  }

  const attributes = [
    options.id ? ` id="${escapeAttr(options.id)}"` : "",
    ` class="${classes.join(" ")}"`,
    options.swapOob ? ' hx-swap-oob="true"' : "",
    options.announce ? ' role="status" aria-live="polite"' : "",
    options.atomic ? ' aria-atomic="true"' : "",
    options.ariaLabel || options.announce ? ` aria-label="${safeAriaLabel}"` : "",
    renderBadgeAttributes(options.attributes),
  ].join("");

  return `<${tagName}${attributes}>${safeStatus}</${tagName}>`;
}
