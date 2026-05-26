/**
 * Relative time formatting helpers.
 * Extracted from formatting.ts to keep module size under 400 lines.
 *
 * @baohaus/bao-utils/formatting-relative
 */

import { SECONDS_PER_DAY } from "@baohaus/bao-constants/time";

const SECONDS_PER_WEEK = 604800;
const DAYS_PER_MONTH_APPROX = 30;
const DAYS_PER_YEAR_APPROX = 365;

const RELATIVE_SHORT_UNITS: readonly {
  readonly maxUnits: number;
  readonly unit: string;
  readonly value: (seconds: number) => number;
}[] = [
  { maxUnits: 1, unit: "s", value: (seconds: number) => seconds },
  { maxUnits: 60, unit: "m", value: (seconds: number) => Math.floor(seconds / 60) },
  {
    maxUnits: 24,
    unit: "h",
    value: (seconds: number) => Math.floor(Math.floor(seconds / 60) / 60),
  },
  {
    maxUnits: 7,
    unit: "d",
    value: (seconds: number) => Math.floor(Math.floor(Math.floor(seconds / 60) / 60) / 24),
  },
  {
    maxUnits: 4,
    unit: "w",
    value: (seconds: number): number => Math.floor(seconds / SECONDS_PER_WEEK),
  },
  {
    maxUnits: 12,
    unit: "mo",
    value: (seconds: number): number =>
      Math.floor(seconds / (SECONDS_PER_DAY * DAYS_PER_MONTH_APPROX)),
  },
] as const;

export function formatShortRelative(
  diffSeconds: number,
  withSuffix: boolean,
  futureDirection: boolean,
): string {
  const absSeconds = Math.abs(diffSeconds);
  if (absSeconds < 60) {
    return "now";
  }

  const absMinutes = Math.floor(absSeconds / 60);
  const absHours = Math.floor(absMinutes / 60);
  const absDays = Math.floor(absHours / 24);
  const absWeeks = Math.floor(absDays / DAYS_PER_MONTH_APPROX);
  const absMonths = Math.floor(absDays / DAYS_PER_MONTH_APPROX);
  const absYears = Math.floor(absDays / DAYS_PER_YEAR_APPROX);

  const values = [absSeconds, absMinutes, absHours, absDays, absWeeks, absMonths, absYears];
  const suffix = withSuffix ? (futureDirection ? " from now" : " ago") : "";
  const shortUnit = RELATIVE_SHORT_UNITS.find((entry, index) => {
    const nextValue = values[index + 1];
    if (nextValue === undefined) {
      return false;
    }
    return nextValue < entry.maxUnits;
  });

  if (!shortUnit) {
    return `${absYears}y${suffix}`;
  }

  const unitIndex = RELATIVE_SHORT_UNITS.indexOf(shortUnit);
  if (unitIndex < 0 || unitIndex >= values.length) {
    return `${absYears}y${suffix}`;
  }
  const unitValue = values[unitIndex];
  if (unitValue === undefined) {
    return `${absYears}y${suffix}`;
  }

  return `${shortUnit.value(unitValue)}${shortUnit.unit}${suffix}`;
}
