export type IcuText = Readonly<{ kind: "text"; value: string }>;
export type IcuPlaceholder = Readonly<{
  kind: "placeholder";
  name: string;
  format: string | null;
}>;
export type IcuPlural = Readonly<{
  kind: "plural";
  name: string;
  offset: number;
  cases: Readonly<Record<string, string>>;
}>;
export type IcuSelect = Readonly<{
  kind: "select";
  name: string;
  cases: Readonly<Record<string, string>>;
}>;
export type IcuSegment = IcuText | IcuPlaceholder | IcuPlural | IcuSelect;
export type IcuValue = string | number | boolean | Date | null | undefined;
export type IcuParams = Readonly<Record<string, IcuValue>>;

const CASE_PATTERN = /(\w+|=-?\d+)\s*\{([^}]*)\}/gu;
const OFFSET_PATTERN = /offset:\s*(-?\d+)/u;

function findMatchingBrace(template: string, start: number): number {
  let depth = 1;
  let index = start + 1;
  while (index < template.length && depth > 0) {
    const char = template[index];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
    }
    if (depth === 0) {
      return index;
    }
    index += 1;
  }
  return -1;
}

function parseCases(body: string): Record<string, string> {
  const cases: Record<string, string> = {};
  CASE_PATTERN.lastIndex = 0;
  let match = CASE_PATTERN.exec(body);
  while (match !== null) {
    const caseKey = match[1];
    const caseBody = match[2];
    if (caseKey !== undefined && caseBody !== undefined) {
      cases[caseKey] = caseBody;
    }
    match = CASE_PATTERN.exec(body);
  }
  return cases;
}

function parseInner(inner: string): IcuSegment {
  const commaIndex = inner.indexOf(",");
  if (commaIndex === -1) {
    return { kind: "placeholder", name: inner.trim(), format: null };
  }
  const name = inner.slice(0, commaIndex).trim();
  const remainder = inner.slice(commaIndex + 1).trim();
  if (remainder.startsWith("plural")) {
    const body = remainder.slice("plural".length).trim().replace(/^,\s*/u, "");
    const offsetMatch = OFFSET_PATTERN.exec(body);
    const offsetCapture = offsetMatch?.[1];
    const offset = offsetCapture === undefined ? 0 : Number.parseInt(offsetCapture, 10);
    const cases = parseCases(body.replace(OFFSET_PATTERN, ""));
    return { kind: "plural", name, offset, cases };
  }
  if (remainder.startsWith("select")) {
    const body = remainder.slice("select".length).trim().replace(/^,\s*/u, "");
    return { kind: "select", name, cases: parseCases(body) };
  }
  return { kind: "placeholder", name, format: remainder };
}

export function parseIcu(template: string): readonly IcuSegment[] {
  const segments: IcuSegment[] = [];
  let buffer = "";
  let index = 0;
  while (index < template.length) {
    const char = template[index];
    if (char === "{") {
      if (buffer !== "") {
        segments.push({ kind: "text", value: buffer });
        buffer = "";
      }
      const end = findMatchingBrace(template, index);
      if (end === -1) {
        buffer += char;
        index += 1;
        continue;
      }
      segments.push(parseInner(template.slice(index + 1, end)));
      index = end + 1;
      continue;
    }
    buffer += char;
    index += 1;
  }
  if (buffer !== "") {
    segments.push({ kind: "text", value: buffer });
  }
  return segments;
}

function pluralCategory(locale: string, n: number): Intl.LDMLPluralRule {
  return new Intl.PluralRules(locale).select(n);
}

function dateInputFromValue(value: IcuValue): string | number | Date {
  if (value instanceof Date || typeof value === "number" || typeof value === "string") {
    return value;
  }
  return "";
}

function formatValue(locale: string, value: IcuValue, format: string | null): string {
  if (format === "number") {
    return new Intl.NumberFormat(locale).format(Number(value));
  }
  if (format === "date") {
    return new Intl.DateTimeFormat(locale).format(new Date(dateInputFromValue(value)));
  }
  if (format === "time") {
    return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(
      new Date(dateInputFromValue(value)),
    );
  }
  return String(value);
}

export function interpolate(template: string, params: IcuParams, locale: string): string {
  const segments = parseIcu(template);
  let output = "";
  for (const segment of segments) {
    if (segment.kind === "text") {
      output += segment.value;
      continue;
    }
    if (segment.kind === "placeholder") {
      const raw = params[segment.name];
      if (raw === undefined) {
        output += `{${segment.name}}`;
        continue;
      }
      output += formatValue(locale, raw, segment.format);
      continue;
    }
    if (segment.kind === "plural") {
      const numeric = Number(params[segment.name] ?? 0);
      const adjusted = numeric - segment.offset;
      const exactKey = `=${adjusted}`;
      const category = pluralCategory(locale, adjusted);
      const caseBody =
        segment.cases[exactKey] ?? segment.cases[category] ?? segment.cases.other ?? "";
      const formattedCount = new Intl.NumberFormat(locale).format(adjusted);
      const hydrated = caseBody.replaceAll("#", formattedCount);
      output += interpolate(hydrated, { ...params, [segment.name]: adjusted }, locale);
      continue;
    }
    const key = String(params[segment.name] ?? "other");
    const caseBody = segment.cases[key] ?? segment.cases.other ?? "";
    output += interpolate(caseBody, params, locale);
  }
  return output;
}
