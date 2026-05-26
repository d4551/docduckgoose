/**
 * @baohaus/dayjs-bao/./parse
 *
 * Bao-native date parsing entry point.
 * Domain: utility
 */

import { type Dayjs, dayjs } from "./index.ts";

const PACKAGE_NAME = "@baohaus/dayjs-bao" as const;

export function parseDate(input?: string | number | Date): Dayjs {
  return dayjs(input);
}

export type { Dayjs };
export { PACKAGE_NAME };
