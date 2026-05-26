/**
 * Shared daisyUI card shell for SSR sections and panels.
 *
 * Replaces hand-authored card markup so every page reuses the same heading +
 * action + body skeleton. Loading state delegates to the shared card skeleton.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveStaggerClass, SURFACE_GLASS, TEXT_SM_TERTIARY_CLASS } from "./design-tokens.js";
import { renderCardSkeleton } from "./skeleton.js";
import type { TranslateFn } from "./types.js";

const WSPLUS_PATTERN = /\s+/u;

/** Supported visual tones for section cards. */
export type SectionCardTone = "default" | "subtle";

/** Supported semantic root elements for section cards. */
export type SectionCardTag = "article" | "div" | "section";

/** Props for the shared section card. */
export interface SectionCardProps {
  /** Visible section title. */
  readonly title?: string;
  /** Optional supporting copy below the title. */
  readonly description?: string;
  /** Main body HTML content. */
  readonly body: string;
  /** Optional pre-rendered actions HTML rendered in the card header. */
  readonly actions?: string;
  /** Optional root element tag. Defaults to `section`. */
  readonly as?: SectionCardTag;
  /** Optional DOM id for the root element. */
  readonly id?: string;
  /** Optional explicit DOM id for the heading element. */
  readonly headingId?: string;
  /** Optional `aria-label` when no visible heading should own the accessible name. */
  readonly ariaLabel?: string;
  /** Optional semantic role. */
  readonly role?: string;
  /** Optional `aria-live` politeness. */
  readonly live?: "assertive" | "polite";
  /** Visual tone variant. */
  readonly tone?: SectionCardTone;
  /** Extra classes appended to the root card. */
  readonly className?: string;
  /** Extra classes appended to the card body. */
  readonly bodyClassName?: string;
  /** Extra root attributes from trusted call-sites (pre-escaped HTML). */
  readonly extraAttributes?: string;
  /** Whether the card body is in a loading state. Renders a skeleton when true. */
  readonly loading?: boolean;
  /**
   * Translator callback. Required when `loading === true` so the skeleton can
   * announce the live-region label.
   */
  readonly translate?: TranslateFn;
  /** Stagger index (0–5) for sequential entry animation. */
  readonly staggerIndex?: number;
}

function buildCardRootAttributes(props: {
  id?: string;
  headingId?: string;
  ariaLabel?: string;
  role?: string;
  live?: "assertive" | "polite";
  extraAttributes?: string;
}): string {
  const parts: string[] = [];
  if (props.id) {
    parts.push(`id="${escapeAttr(props.id)}"`);
  }
  if (props.headingId) {
    parts.push(`aria-labelledby="${escapeAttr(props.headingId)}"`);
  }
  if (!props.headingId && props.ariaLabel) {
    parts.push(`aria-label="${escapeAttr(props.ariaLabel)}"`);
  }
  if (props.role) {
    parts.push(`role="${escapeAttr(props.role)}"`);
  }
  if (props.live) {
    parts.push(`aria-live="${escapeAttr(props.live)}"`);
  }
  if (props.extraAttributes) {
    const extra = props.extraAttributes.trim();
    if (extra.length > 0) {
      parts.push(extra);
    }
  }
  return parts.join(" ");
}

function buildCardHeaderBlock(
  title: string | undefined,
  description: string | undefined,
  actions: string | undefined,
  headingId: string | undefined,
): string {
  if (!(title || description || actions)) {
    return "";
  }
  const titleBlock = title
    ? `<h2${headingId ? ` id="${escapeAttr(headingId)}"` : ""} class="card-title text-lg tracking-tight">${escapeHtml(title)}</h2>`
    : "";
  const descriptionBlock = description
    ? `<p class="${TEXT_SM_TERTIARY_CLASS}">${escapeHtml(description)}</p>`
    : "";
  const actionsBlock = actions ? `<div class="card-actions justify-end">${actions}</div>` : "";
  return `
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="space-y-1.5">
          ${titleBlock}
          ${descriptionBlock}
        </div>
        ${actionsBlock}
      </div>`;
}

function sanitizeSectionCardClasses(
  className: string | undefined,
  blockedTokens: readonly string[],
): string {
  if (!className) {
    return "";
  }
  const blocked = new Set(blockedTokens);
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const token of className.split(WSPLUS_PATTERN)) {
    if (!token || blocked.has(token) || seen.has(token)) {
      continue;
    }
    seen.add(token);
    normalized.push(token);
  }
  return normalized.join(" ");
}

/**
 * Render a canonical daisyUI section card.
 *
 * @param props - Section card properties.
 * @returns HTML string.
 */
export function renderSectionCard(props: SectionCardProps): string {
  const tone = props.tone ?? "default";
  const tag = props.as ?? "section";
  const headingId = props.title
    ? (props.headingId ?? (props.id ? `${props.id}-title` : undefined))
    : undefined;
  const rootAttributes = buildCardRootAttributes({
    id: props.id,
    headingId,
    ariaLabel: props.ariaLabel,
    role: props.role,
    live: props.live,
    extraAttributes: props.extraAttributes,
  });
  const rootClasses = [
    "card",
    "card-border",
    tone === "subtle" ? SURFACE_GLASS : "bg-base-100",
    "transition-shadow-border hover:shadow-md motion-safe:animate-fade-in focus-within:ring-2 focus-within:ring-primary/20",
    sanitizeSectionCardClasses(props.className, ["card", "card-border"]),
  ]
    .filter((token) => token.length > 0)
    .join(" ");
  const cardBodyClasses = [
    "card-body",
    sanitizeSectionCardClasses(props.bodyClassName, ["card-body"]),
  ]
    .filter(Boolean)
    .join(" ");
  const headerBlock = buildCardHeaderBlock(
    props.title,
    props.description,
    props.actions,
    headingId,
  );
  const resolvedBody =
    props.loading && props.translate ? renderCardSkeleton(props.translate) : props.body;
  const ariaBusy = props.loading ? ' aria-busy="true"' : "";
  const staggerClass = resolveStaggerClass(props.staggerIndex);
  const finalRootClasses = staggerClass ? `${rootClasses} ${staggerClass}` : rootClasses;

  return `
  <${tag} class="${finalRootClasses}"${rootAttributes ? ` ${rootAttributes}` : ""}${ariaBusy}>
    <div class="${cardBodyClasses}">
      ${headerBlock}
      ${resolvedBody}
    </div>
  </${tag}>`;
}
