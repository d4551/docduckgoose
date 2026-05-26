/**
 * Date comparison and boolean check utilities.
 *
 * @shared/utils/formatting/date-checks
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
import { dayjs } from "@baohaus/dayjs-bao";

/** HL7 timestamp pad target for month/day/hour/minute/second. */
const PAD_2 = 2;

export function isToday(value: string | Date | number | null | undefined): boolean {
  if (!value) {
    return false;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    return date.isValid() && date.isSame(dayjs(), "day");
  });
  return result.ok ? result.value : false;
}

export function isWithinDays(
  value: string | Date | number | null | undefined,
  days: number,
): boolean {
  if (!value || days < 0) {
    return false;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    if (!date.isValid()) {
      return false;
    }
    return Math.abs(dayjs().diff(date, "day")) <= days;
  });
  return result.ok ? result.value : false;
}

export function isYesterday(value: string | Date | number | null | undefined): boolean {
  if (!value) {
    return false;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    return date.isValid() && date.isSame(dayjs().subtract(1, "day"), "day");
  });
  return result.ok ? result.value : false;
}

export function isPast(value: string | Date | number | null | undefined): boolean {
  if (!value) {
    return false;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    return date.isValid() && date.isBefore(dayjs());
  });
  return result.ok ? result.value : false;
}

export function isFuture(value: string | Date | number | null | undefined): boolean {
  if (!value) {
    return false;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    return date.isValid() && date.isAfter(dayjs());
  });
  return result.ok ? result.value : false;
}

export function daysBetween(
  start: string | Date | number | null | undefined,
  end: string | Date | number | null | undefined,
): number {
  if (!(start && end)) {
    return 0;
  }
  const result = toResultSync(() => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    if (!(startDate.isValid() && endDate.isValid())) {
      return 0;
    }
    return endDate.diff(startDate, "day");
  });
  return result.ok ? result.value : 0;
}

export function getDaysDifference(
  date1: string | Date | number | null | undefined,
  date2: string | Date | number | null | undefined,
): number {
  return Math.abs(daysBetween(date1, date2));
}

export function parseDate(dateString: string, _timezone?: string): Date {
  const date = dayjs(dateString);
  if (!date.isValid()) {
    return new Date(NaN);
  }
  return date.toDate();
}

export function getTimezoneOffset(date: Date | string | number, timezone?: string): string {
  const d = dayjs(date);
  if (!d.isValid()) {
    return "+00:00";
  }
  if (!timezone) {
    const offset = d.toDate().getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    const sign = offset <= 0 ? "+" : "-";
    return `${sign}${String(hours).padStart(PAD_2, "0")}:${String(minutes).padStart(PAD_2, "0")}`;
  }
  const result = toResultSync(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(d.toDate());
    const offsetPart = parts.find((p) => p.type === "timeZoneName");
    return offsetPart?.value || "+00:00";
  });
  return result.ok ? result.value : "+00:00";
}
