import type { SupportedLocale } from "./bcp47.js";
import type { CatalogBundle } from "./catalog.js";

export type ParityReport = Readonly<{
  missing: Readonly<Record<SupportedLocale, readonly string[]>>;
  extra: Readonly<Record<SupportedLocale, readonly string[]>>;
  complete: readonly SupportedLocale[];
}>;

function collectUnion(bundle: CatalogBundle, locales: readonly SupportedLocale[]): Set<string> {
  const union = new Set<string>();
  for (const locale of locales) {
    for (const key of Object.keys(bundle[locale])) {
      union.add(key);
    }
  }
  return union;
}

function diffLocale(
  localeKeys: ReadonlySet<string>,
  union: ReadonlySet<string>,
): { missing: string[]; extra: string[] } {
  const missing: string[] = [];
  const extra: string[] = [];
  for (const key of union) {
    if (!localeKeys.has(key)) {
      missing.push(key);
    }
  }
  for (const key of localeKeys) {
    if (!union.has(key)) {
      extra.push(key);
    }
  }
  return { missing, extra };
}

export function auditParity(bundle: CatalogBundle): ParityReport {
  const locales = Object.keys(bundle) as SupportedLocale[];
  const union = collectUnion(bundle, locales);
  const missing: Record<SupportedLocale, string[]> = {} as Record<SupportedLocale, string[]>;
  const extra: Record<SupportedLocale, string[]> = {} as Record<SupportedLocale, string[]>;
  const complete: SupportedLocale[] = [];
  for (const locale of locales) {
    const localeKeys = new Set(Object.keys(bundle[locale]));
    const diff = diffLocale(localeKeys, union);
    missing[locale] = diff.missing;
    extra[locale] = diff.extra;
    if (diff.missing.length === 0 && diff.extra.length === 0) {
      complete.push(locale);
    }
  }
  return { missing, extra, complete };
}
