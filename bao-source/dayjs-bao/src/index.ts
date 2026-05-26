/**
 * @baohaus/dayjs-bao
 *
 * Bao-native date, time, duration, and locale utilities.
 * Domain: utility
 */

const PACKAGE_NAME = "@baohaus/dayjs-bao" as const;

type DayjsUnit = "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond";

interface Dayjs {
  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;
  readonly millisecond: number;
  /** Returns the underlying Unix epoch in milliseconds. */
  valueOf(): number;
  add(amount: number, unit: DayjsUnit): Dayjs;
  subtract(amount: number, unit: DayjsUnit): Dayjs;
  format(template?: string): string;
  diff(other: Dayjs | string | number | Date, unit?: DayjsUnit): number;
  toDate(): Date;
  toISOString(): string;
  isValid(): boolean;
  isSame(other: Dayjs | string | number | Date, unit?: DayjsUnit): boolean;
  isBefore(other: Dayjs | string | number | Date): boolean;
  isAfter(other: Dayjs | string | number | Date): boolean;
  fromNow(withoutSuffix?: boolean): string;
  from(input: string | number | Date, withoutSuffix?: boolean): string;
  toNow(withoutSuffix?: boolean): string;
  to(input: string | number | Date, withoutSuffix?: boolean): string;
  unix(): number;
  startOf(unit: DayjsUnit): Dayjs;
  endOf(unit: DayjsUnit): Dayjs;
  daysInMonth(): number;
}

const SECONDS_THRESHOLD_FEW = 45;
const SECONDS_THRESHOLD_MINUTE = 90;
const MINUTES_THRESHOLD = 45;
const HOURS_THRESHOLD_SINGLE = 1.5;
const HOURS_THRESHOLD_DAY = 22;
const DAYS_THRESHOLD_SINGLE = 1.5;
const DAYS_THRESHOLD_MONTH = 26;
const MONTHS_THRESHOLD_SINGLE = 1.5;
const MONTHS_THRESHOLD_YEAR = 11;
const YEARS_THRESHOLD_SINGLE = 1.5;
const DAYS_PER_MONTH = 30.44;
const DAYS_PER_YEAR = 365.25;
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

function pickShortRelativePhrase(seconds: number, minutes: number): string | null {
  if (seconds < SECONDS_THRESHOLD_FEW) {
    return "a few seconds";
  }
  if (seconds < SECONDS_THRESHOLD_MINUTE) {
    return "a minute";
  }
  if (minutes < MINUTES_THRESHOLD) {
    return `${Math.round(minutes)} minutes`;
  }
  return null;
}

function pickLongRelativePhrase(
  hours: number,
  days: number,
  months: number,
  years: number,
): string {
  if (hours < HOURS_THRESHOLD_DAY) {
    return hours < HOURS_THRESHOLD_SINGLE ? "an hour" : `${Math.round(hours)} hours`;
  }
  if (days < DAYS_THRESHOLD_MONTH) {
    return days < DAYS_THRESHOLD_SINGLE ? "a day" : `${Math.round(days)} days`;
  }
  if (months < MONTHS_THRESHOLD_YEAR) {
    return months < MONTHS_THRESHOLD_SINGLE ? "a month" : `${Math.round(months)} months`;
  }
  return years < YEARS_THRESHOLD_SINGLE ? "a year" : `${Math.round(years)} years`;
}

function pickRelativePhrase(abs: number): string {
  const seconds = abs / MS_PER_SECOND;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / DAYS_PER_MONTH;
  const years = days / DAYS_PER_YEAR;

  const short = pickShortRelativePhrase(seconds, minutes);
  if (short !== null) {
    return short;
  }
  return pickLongRelativePhrase(hours, days, months, years);
}

function formatRelative(diffMs: number, withoutSuffix = false): string {
  const phrase = pickRelativePhrase(Math.abs(diffMs));
  if (withoutSuffix) {
    return phrase;
  }
  return diffMs > 0 ? `${phrase} ago` : `in ${phrase}`;
}

function toDayjs(input: Dayjs | string | number | Date): Dayjs {
  if (typeof input === "object" && "valueOf" in input && "year" in input) {
    return input;
  }
  return dayjs(input);
}

function startOf(d: Date, unit: DayjsUnit): Date {
  const result = new Date(d);
  switch (unit) {
    case "year":
      result.setMonth(0, 1);
      result.setHours(0, 0, 0, 0);
      break;
    case "month":
      result.setDate(1);
      result.setHours(0, 0, 0, 0);
      break;
    case "day":
      result.setHours(0, 0, 0, 0);
      break;
    case "hour":
      result.setMinutes(0, 0, 0);
      break;
    case "minute":
      result.setSeconds(0, 0);
      break;
    case "second":
      result.setMilliseconds(0);
      break;
    case "millisecond":
      break;
    default:
      unit satisfies never;
  }
  return result;
}

function endOf(d: Date, unit: DayjsUnit): Date {
  const result = new Date(d);
  switch (unit) {
    case "year":
      result.setMonth(11, 31);
      result.setHours(23, 59, 59, 999);
      break;
    case "month":
      result.setMonth(result.getMonth() + 1, 0);
      result.setHours(23, 59, 59, 999);
      break;
    case "day":
      result.setHours(23, 59, 59, 999);
      break;
    case "hour":
      result.setMinutes(59, 59, 999);
      break;
    case "minute":
      result.setSeconds(59, 999);
      break;
    case "second":
      result.setMilliseconds(999);
      break;
    case "millisecond":
      break;
    default:
      unit satisfies never;
  }
  return result;
}

class DayjsImpl implements Dayjs {
  private readonly _d: Date;

  constructor(d: Date) {
    this._d = d;
  }

  valueOf(): number {
    return this._d.getTime();
  }

  toDate(): Date {
    return new Date(this._d);
  }

  toISOString(): string {
    return this._d.toISOString();
  }

  isValid(): boolean {
    return !Number.isNaN(this._d.getTime());
  }

  get year(): number {
    return this._d.getFullYear();
  }
  get month(): number {
    return this._d.getMonth();
  }
  get date(): number {
    return this._d.getDate();
  }
  get hour(): number {
    return this._d.getHours();
  }
  get minute(): number {
    return this._d.getMinutes();
  }
  get second(): number {
    return this._d.getSeconds();
  }
  get millisecond(): number {
    return this._d.getMilliseconds();
  }

  add(amount: number, unit: DayjsUnit): Dayjs {
    const d = new Date(this._d);
    switch (unit) {
      case "year":
        d.setFullYear(d.getFullYear() + amount);
        break;
      case "month":
        d.setMonth(d.getMonth() + amount);
        break;
      case "day":
        d.setDate(d.getDate() + amount);
        break;
      case "hour":
        d.setHours(d.getHours() + amount);
        break;
      case "minute":
        d.setMinutes(d.getMinutes() + amount);
        break;
      case "second":
        d.setSeconds(d.getSeconds() + amount);
        break;
      case "millisecond":
        d.setMilliseconds(d.getMilliseconds() + amount);
        break;
      default:
        unit satisfies never;
        throw new Error(`Unsupported unit: ${String(unit)}`);
    }
    return new DayjsImpl(d);
  }

  subtract(amount: number, unit: DayjsUnit): Dayjs {
    return this.add(-amount, unit);
  }

  format(template = "YYYY-MM-DD HH:mm:ss"): string {
    return template
      .replace("YYYY", String(this.year))
      .replace("MM", String(this.month + 1).padStart(2, "0"))
      .replace("DD", String(this.date).padStart(2, "0"))
      .replace("HH", String(this.hour).padStart(2, "0"))
      .replace("mm", String(this.minute).padStart(2, "0"))
      .replace("ss", String(this.second).padStart(2, "0"));
  }

  diff(other: Dayjs | string | number | Date, unit: DayjsUnit = "millisecond"): number {
    const otherDayjs = toDayjs(other);
    const ms = this.valueOf() - otherDayjs.valueOf();
    switch (unit) {
      case "year":
        return Math.floor(ms / (DAYS_PER_YEAR * MS_PER_DAY));
      case "month":
        return Math.floor(ms / (30 * MS_PER_DAY));
      case "day":
        return Math.floor(ms / MS_PER_DAY);
      case "hour":
        return Math.floor(ms / MS_PER_HOUR);
      case "minute":
        return Math.floor(ms / MS_PER_MINUTE);
      case "second":
        return Math.floor(ms / MS_PER_SECOND);
      case "millisecond":
        return ms;
      default:
        unit satisfies never;
        throw new Error(`Unsupported unit: ${String(unit)}`);
    }
  }

  isSame(other: Dayjs | string | number | Date, unit: DayjsUnit = "millisecond"): boolean {
    const otherDayjs = toDayjs(other);
    if (unit === "millisecond") {
      return this.valueOf() === otherDayjs.valueOf();
    }
    const a = startOf(this._d, unit);
    const b = startOf(otherDayjs.toDate(), unit);
    return a.getTime() === b.getTime();
  }

  isBefore(other: Dayjs | string | number | Date): boolean {
    return this.valueOf() < toDayjs(other).valueOf();
  }

  isAfter(other: Dayjs | string | number | Date): boolean {
    return this.valueOf() > toDayjs(other).valueOf();
  }

  fromNow(withoutSuffix?: boolean): string {
    return formatRelative(Date.now() - this.valueOf(), withoutSuffix);
  }

  from(input: string | number | Date, withoutSuffix?: boolean): string {
    return formatRelative(this.valueOf() - dayjs(input).valueOf(), withoutSuffix);
  }

  toNow(withoutSuffix?: boolean): string {
    return formatRelative(this.valueOf() - Date.now(), withoutSuffix);
  }

  to(input: string | number | Date, withoutSuffix?: boolean): string {
    return formatRelative(dayjs(input).valueOf() - this.valueOf(), withoutSuffix);
  }

  unix(): number {
    return Math.floor(this._d.getTime() / MS_PER_SECOND);
  }

  startOf(unit: DayjsUnit): Dayjs {
    return new DayjsImpl(startOf(this._d, unit));
  }

  endOf(unit: DayjsUnit): Dayjs {
    return new DayjsImpl(endOf(this._d, unit));
  }

  daysInMonth(): number {
    return new Date(this._d.getFullYear(), this._d.getMonth() + 1, 0).getDate();
  }
}

interface Duration {
  humanize(withSuffix?: boolean): string;
  asMilliseconds(): number;
  asSeconds(): number;
  asMinutes(): number;
  asHours(): number;
  asDays(): number;
  minutes(): number;
  seconds(): number;
}

const SECONDS_PER_MINUTE = 60;

class DurationImpl implements Duration {
  private readonly ms: number;

  constructor(ms: number) {
    this.ms = ms;
  }

  humanize(withSuffix = false): string {
    return formatRelative(withSuffix ? -this.ms : this.ms, !withSuffix);
  }

  asMilliseconds(): number {
    return this.ms;
  }
  asSeconds(): number {
    return this.ms / MS_PER_SECOND;
  }
  asMinutes(): number {
    return this.ms / MS_PER_MINUTE;
  }
  asHours(): number {
    return this.ms / MS_PER_HOUR;
  }
  asDays(): number {
    return this.ms / MS_PER_DAY;
  }
  minutes(): number {
    return Math.floor((Math.abs(this.ms) / MS_PER_MINUTE) % SECONDS_PER_MINUTE);
  }
  seconds(): number {
    return Math.floor((Math.abs(this.ms) / MS_PER_SECOND) % SECONDS_PER_MINUTE);
  }
}

function createDuration(value: number, unit?: string): Duration {
  if (unit === "seconds" || unit === "second") {
    return new DurationImpl(value * MS_PER_SECOND);
  }
  return new DurationImpl(value);
}

function dayjs(input?: string | number | Date): Dayjs {
  const d =
    input === undefined
      ? new Date()
      : typeof input === "string"
        ? new Date(input)
        : typeof input === "number"
          ? new Date(input)
          : input;
  return new DayjsImpl(d);
}

const dayjsWithExtras = Object.assign(dayjs, {
  extend: (_plugin: unknown) => dayjsWithExtras,
  duration: createDuration,
});

export type { Dayjs, DayjsUnit, Duration };
export { dayjsWithExtras as dayjs, PACKAGE_NAME };
