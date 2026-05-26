/**
 * @baohaus/dayjs-bao/./format
 *
 * Bao-native date formatting entry point.
 * Domain: utility
 */

import { dayjs } from "./index.ts";

const PACKAGE_NAME = "@baohaus/dayjs-bao" as const;

export function formatDate(input: string | number | Date, template?: string): string {
  return dayjs(input).format(template);
}

export { PACKAGE_NAME };
