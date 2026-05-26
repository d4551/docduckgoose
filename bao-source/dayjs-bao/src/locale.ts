/**
 * @baohaus/dayjs-bao/./locale
 *
 * Bao-native date locale entry point.
 * Domain: utility
 */

export const PACKAGE_NAME = "@baohaus/dayjs-bao" as const;

export const DEFAULT_LOCALE = "en" as const;

export function normalizeLocale(locale: string | undefined): string {
  return locale?.trim().toLowerCase() || DEFAULT_LOCALE;
}
