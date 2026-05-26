import { parseAcceptLanguage } from "./accept-language.js";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./bcp47.js";

const LOCALE_COOKIE_NAME = "locale";
const LOCALE_QUERY_NAME = "locale";

function readCookie(cookieHeader: string | null, name: string): string | null {
  if (cookieHeader === null) {
    return null;
  }
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const trimmed = pair.trim();
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex <= 0) {
      continue;
    }
    const key = trimmed.slice(0, equalsIndex).trim();
    if (key === name) {
      return trimmed.slice(equalsIndex + 1).trim();
    }
  }
  return null;
}

function isInScope(
  locale: SupportedLocale,
  supported: readonly SupportedLocale[] | undefined,
): boolean {
  return supported === undefined || supported.includes(locale);
}

function matchLanguageFamily(
  locale: string,
  supported: readonly SupportedLocale[],
): SupportedLocale | null {
  const language = locale.split("-")[0]?.toLowerCase();
  if (language === undefined) {
    return null;
  }
  const match = supported.find((candidate) => candidate.toLowerCase().startsWith(`${language}-`));
  return match ?? null;
}

function resolveDirect(
  candidate: string | null,
  supported: readonly SupportedLocale[] | undefined,
): SupportedLocale | null {
  if (candidate === null || !isSupportedLocale(candidate)) {
    return null;
  }
  return isInScope(candidate, supported) ? candidate : null;
}

function resolveFromAcceptLanguage(
  header: string | null,
  supported: readonly SupportedLocale[] | undefined,
): SupportedLocale | null {
  const accepted = parseAcceptLanguage(header);
  for (const entry of accepted) {
    const direct = resolveDirect(entry.locale, supported);
    if (direct !== null) {
      return direct;
    }
    const family = matchLanguageFamily(entry.locale, supported ?? []);
    if (family !== null) {
      return family;
    }
  }
  return null;
}

export type DetectOptions = Readonly<{
  supported?: readonly SupportedLocale[];
  defaultLocale?: SupportedLocale;
}>;

export function detectLocale(request: Request, options: DetectOptions = {}): SupportedLocale {
  const supported = options.supported;
  const defaultLocale = options.defaultLocale ?? DEFAULT_LOCALE;
  const url = new URL(request.url);
  const fromQuery = resolveDirect(url.searchParams.get(LOCALE_QUERY_NAME), supported);
  if (fromQuery !== null) {
    return fromQuery;
  }
  const fromCookie = resolveDirect(
    readCookie(request.headers.get("cookie"), LOCALE_COOKIE_NAME),
    supported,
  );
  if (fromCookie !== null) {
    return fromCookie;
  }
  const fromHeader = resolveFromAcceptLanguage(request.headers.get("accept-language"), supported);
  if (fromHeader !== null) {
    return fromHeader;
  }
  return defaultLocale;
}
