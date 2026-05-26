/**
 * Enterprise KPI stat card primitive — daisyUI `stat` block.
 *
 * Designed to live inside a `stats` container (rendered by `metric-row`).
 * Trend indicators use the canonical success/error/quaternary colour mapping
 * so KPI direction is consistent across packages.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveStaggerClass, TEXT_QUATERNARY_CLASS } from "./design-tokens.js";

/** Trend direction for stat card delta annotation. */
export type StatCardTrend = "up" | "down" | "neutral";

/** Color accent controlling the metric value colour. */
export type StatCardAccent = "default" | "primary" | "success" | "warning" | "error" | "info";

/** Props for the KPI stat card primitive. */
export interface StatCardProps {
  /** Section title above the metric value. */
  readonly title: string;
  /** Primary metric value displayed large. */
  readonly value: string;
  /** Supporting description rendered below the value. */
  readonly subtitle?: string;
  /** Optional trend arrow direction. */
  readonly trend?: StatCardTrend;
  /** Optional trend label rendered next to the arrow (e.g. "+12%", "3 new"). */
  readonly trendLabel?: string;
  /** Color accent applied to the metric value. Defaults to amber data colour. */
  readonly accent?: StatCardAccent;
  /** Optional pre-rendered decorative icon SVG markup for the stat-figure slot. */
  readonly iconSvg?: string;
  /** Optional DOM id for the root stat element. */
  readonly id?: string;
  /** Whether the card is in a loading state (renders skeleton). */
  readonly loading?: boolean;
  /** Stagger index (0–5) for sequential entry animation. */
  readonly staggerIndex?: number;
  /** Additional pre-escaped root attributes for HTMX hooks. */
  readonly extraAttributes?: string;
}

const ACCENT_CLASS_MAP: Record<StatCardAccent, string> = {
  default: "text-warning",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
};

const TREND_CLASS_MAP: Record<StatCardTrend, string> = {
  up: "text-success",
  down: "text-error",
  neutral: TEXT_QUATERNARY_CLASS,
};

const TREND_SVG_UP =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline size-3.5"><path d="M3 11 8 6l5 5"/></svg>';

const TREND_SVG_DOWN =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline size-3.5"><path d="M3 5l5 5 5-5"/></svg>';

function resolveTrendSvg(trend: StatCardTrend): string {
  if (trend === "up") {
    return TREND_SVG_UP;
  }
  if (trend === "down") {
    return TREND_SVG_DOWN;
  }
  return "";
}

function buildStatFigure(iconSvg: string | undefined, accentClass: string): string {
  if (!iconSvg) {
    return "";
  }
  const svg = iconSvg.includes("inline-block")
    ? iconSvg
    : iconSvg.replace("<svg", '<svg class="inline-block h-8 w-8 stroke-current"');
  return `<div class="stat-figure ${accentClass}">${svg}</div>`;
}

function buildTrendDesc(trend: StatCardTrend | undefined, trendLabel: string | undefined): string {
  if (!trend) {
    return "";
  }
  const trendClass = TREND_CLASS_MAP[trend];
  const trendSvg = resolveTrendSvg(trend);
  const labelPart = trendLabel ? escapeHtml(trendLabel) : "";
  return `<div class="stat-desc ${trendClass}">${trendSvg}${labelPart}</div>`;
}

/**
 * Render a KPI stat block for use inside a daisyUI `stats` container.
 *
 * @param props - Stat card properties.
 * @returns HTML string for a single `stat` block.
 */
export function renderStatCard(props: StatCardProps): string {
  const accent = props.accent ?? "default";
  const loading = props.loading ?? false;
  const staggerClass = resolveStaggerClass(props.staggerIndex);
  const idAttr = props.id ? ` id="${escapeAttr(props.id)}"` : "";
  const extraAttr = props.extraAttributes?.trim() ? ` ${props.extraAttributes.trim()}` : "";
  const animClasses = `motion-safe:animate-slide-up-fade${staggerClass ? ` ${staggerClass}` : ""}`;

  if (loading) {
    return `<div class="stat ${animClasses}"${idAttr}${extraAttr}>
    <div class="stat-title"><div class="skeleton h-3 w-20 rounded"></div></div>
    <div class="stat-value"><div class="skeleton h-8 w-16 rounded"></div></div>
    <div class="stat-desc"><div class="skeleton h-3 w-24 rounded"></div></div>
  </div>`;
  }

  const accentClass = ACCENT_CLASS_MAP[accent];
  const figureBlock = buildStatFigure(props.iconSvg, accentClass);
  const trendBlock = buildTrendDesc(props.trend, props.trendLabel);
  const subtitleBlock = props.subtitle
    ? `<div class="stat-desc">${escapeHtml(props.subtitle)}</div>`
    : "";

  return `<div class="stat ${animClasses}"${idAttr}${extraAttr}>
    ${figureBlock}
    <div class="stat-title">${escapeHtml(props.title)}</div>
    <div class="stat-value font-data ${accentClass}">${escapeHtml(props.value)}</div>
    ${subtitleBlock}
    ${trendBlock}
  </div>`;
}
