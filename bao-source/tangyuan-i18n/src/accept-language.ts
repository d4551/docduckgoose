import { normalizeLocale } from "./bcp47.js";

export type AcceptLanguageEntry = Readonly<{
  locale: string;
  quality: number;
}>;

const DEFAULT_QUALITY = 1;
const MIN_QUALITY = 0;
const MAX_QUALITY = 1;

function parseQuality(token: string): number {
  const match = /^q=([0-9]+(?:\.[0-9]+)?)$/u.exec(token.trim());
  const captured = match?.[1];
  if (captured === undefined) {
    return DEFAULT_QUALITY;
  }
  const value = Number.parseFloat(captured);
  if (!Number.isFinite(value) || value < MIN_QUALITY || value > MAX_QUALITY) {
    return DEFAULT_QUALITY;
  }
  return value;
}

function parseEntry(raw: string): AcceptLanguageEntry | null {
  const segments = raw.split(";");
  const localeToken = segments[0]?.trim();
  if (localeToken === undefined || localeToken === "") {
    return null;
  }
  const locale = normalizeLocale(localeToken);
  if (locale === "") {
    return null;
  }
  const quality = segments.slice(1).reduce<number>((acc, token) => {
    const parsed = parseQuality(token);
    return parsed < acc ? parsed : acc;
  }, DEFAULT_QUALITY);
  return { locale, quality };
}

export function parseAcceptLanguage(header: string | null): readonly AcceptLanguageEntry[] {
  if (header === null) {
    return [];
  }
  const entries = header
    .split(",")
    .map((raw) => parseEntry(raw))
    .filter((entry): entry is AcceptLanguageEntry => entry !== null);
  return entries.slice().sort((left, right) => right.quality - left.quality);
}
