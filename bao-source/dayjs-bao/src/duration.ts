/**
 * @baohaus/dayjs-bao/./duration
 *
 * Bao-native duration entry point.
 * Domain: utility
 */

import { type DayjsUnit, dayjs } from "./index.ts";

const PACKAGE_NAME = "@baohaus/dayjs-bao" as const;

export function durationBetween(
  start: string | number | Date,
  end: string | number | Date,
  unit?: DayjsUnit,
): number {
  return dayjs(end).diff(dayjs(start), unit);
}

export type { DayjsUnit };
export { PACKAGE_NAME };
