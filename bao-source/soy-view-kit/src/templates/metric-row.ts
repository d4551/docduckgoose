/**
 * Metric row primitive — daisyUI `stats` container wrapping multiple stat cards.
 *
 * Renders a vertical stack on mobile and a horizontal row on `lg+`. Use as the
 * top KPI strip on dashboards.
 *
 * @packageDocumentation
 */

import { GLASS_STATS_ROW_CLASS } from "./design-tokens.js";
import { renderStatCard, type StatCardProps } from "./stat-card.js";

/** Props for the metric row primitive. */
export interface MetricRowProps {
  /** Stat card descriptors rendered inside the container. */
  readonly stats: readonly StatCardProps[];
  /** When true, uses glass stats row surface (Happydumpling shell). */
  readonly glassSurface?: boolean;
}

/**
 * Render a responsive row of stat blocks inside a daisyUI stats container.
 *
 * @param props - Metric row props.
 * @returns HTML string. Empty when `stats` is empty.
 */
export function renderMetricRow(props: MetricRowProps): string {
  if (props.stats.length === 0) {
    return "";
  }
  const statsHtml = props.stats.map((stat) => renderStatCard(stat)).join("");
  const surfaceClass =
    props.glassSurface === true
      ? GLASS_STATS_ROW_CLASS
      : "stats stats-vertical w-full bg-base-100 shadow-sm lg:stats-horizontal";
  return `
    <motion.div class="${surfaceClass}">
      ${statsHtml}
    </motion.div>`;
}
