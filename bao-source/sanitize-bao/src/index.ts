/**
 * @baohaus/sanitize-bao
 *
 * BAO parity clean-room implementation for upstream: sanitize-html@2.17.2
 * Domain: content
 */

const PACKAGE_NAME = "@baohaus/sanitize-bao";
const UPSTREAM_PACKAGE = "sanitize-html@2.17.2";

interface TransformResult {
  readonly tagName: string;
  readonly attribs: Readonly<Record<string, string>>;
}

type TagTransformer = (tagName: string, attribs: Record<string, string>) => TransformResult;

interface SanitizeOptions {
  readonly allowedTags?: readonly string[];
  readonly allowedAttributes?: Readonly<Record<string, readonly string[]>>;
  readonly allowedSchemes?: readonly string[];
  readonly allowedSchemesByTag?: Readonly<Record<string, readonly string[]>>;
  readonly disallowedTagsMode?: "discard" | "escape";
  readonly transformTags?: Readonly<Record<string, TagTransformer>>;
}

type IOptions = SanitizeOptions;

const DEFAULT_ALLOWED_TAGS: readonly string[] = [
  "address",
  "article",
  "aside",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  "main",
  "nav",
  "section",
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "hr",
  "li",
  "ol",
  "p",
  "pre",
  "ul",
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "strike",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "img",
];

const DEFAULT_ALLOWED_ATTRIBUTES: Readonly<Record<string, readonly string[]>> = {
  a: ["href", "name", "title", "target", "rel"],
  img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
};

// VOID elements — never have a closing tag
const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

type HtmlToken =
  | { readonly kind: "text"; readonly raw: string }
  | {
      readonly kind: "open";
      readonly tag: string;
      readonly attrs: ReadonlyMap<string, string>;
      readonly selfClosing: boolean;
    }
  | { readonly kind: "close"; readonly tag: string }
  | { readonly kind: "doctype" | "comment" };

type OpenToken = Extract<HtmlToken, { readonly kind: "open" }>;
type CloseToken = Extract<HtmlToken, { readonly kind: "close" }>;
type TextToken = Extract<HtmlToken, { readonly kind: "text" }>;

interface SanitizerState {
  readonly allowedTags: ReadonlySet<string>;
  readonly allowedAttrs: Readonly<Record<string, readonly string[]>>;
  readonly allowedSchemes: readonly string[] | undefined;
  readonly allowedSchemesByTag: Readonly<Record<string, readonly string[]>> | undefined;
  readonly transformTags: Readonly<Record<string, TagTransformer>> | undefined;
  readonly escapeMode: boolean;
  readonly parts: string[];
  readonly openStack: string[];
  readonly suppressStack: string[];
}

// Matches an HTML attribute: name="value", name='value', name=value, or name
const ATTR_RE = /\s+([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/gu;
const URL_SCHEME_RE = /^([a-z][a-z0-9+.-]*)\s*:/i;

function parseAttrs(attrStr: string): ReadonlyMap<string, string> {
  const map = new Map<string, string>();
  for (const m of attrStr.matchAll(ATTR_RE)) {
    const name = (m[1] ?? "").toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    map.set(name, value);
  }
  return map;
}

// Tokenise raw HTML into a flat token stream (not a tree)
const TAG_RE =
  /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/\s*([\w-]+)\s*>|<([\w-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*))?)*)\s*(\/?)>|([^<]+)/giu;

function tokenFromMatch(match: RegExpMatchArray): HtmlToken {
  const full = match[0] ?? "";
  if (full.startsWith("<!--") || full.startsWith("<!")) {
    return { kind: "doctype" };
  }

  const closeTag = match[1];
  if (closeTag !== undefined) {
    return { kind: "close", tag: closeTag.toLowerCase() };
  }

  const openTag = match[2];
  if (openTag !== undefined) {
    const tag = openTag.toLowerCase();
    return {
      kind: "open",
      tag,
      attrs: parseAttrs(match[3] ?? ""),
      selfClosing: match[4] === "/" || VOID_TAGS.has(tag),
    };
  }

  return { kind: "text", raw: match[5] ?? "" };
}

function tokenize(html: string): readonly HtmlToken[] {
  const tokens: HtmlToken[] = [];
  for (const m of html.matchAll(TAG_RE)) {
    tokens.push(tokenFromMatch(m));
  }
  return tokens;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function serializeOpenTag(
  tag: string,
  attrs: ReadonlyMap<string, string>,
  selfClosing: boolean,
): string {
  let result = `<${tag}`;
  for (const [name, value] of attrs) {
    result += ` ${name}="${escapeHtml(value)}"`;
  }
  result += selfClosing && VOID_TAGS.has(tag) ? " />" : ">";
  return result;
}

function createSanitizerState(options: SanitizeOptions): SanitizerState {
  return {
    allowedTags: new Set(options.allowedTags ?? DEFAULT_ALLOWED_TAGS),
    allowedAttrs: options.allowedAttributes ?? DEFAULT_ALLOWED_ATTRIBUTES,
    allowedSchemes: options.allowedSchemes,
    allowedSchemesByTag: options.allowedSchemesByTag,
    transformTags: options.transformTags,
    escapeMode: options.disallowedTagsMode === "escape",
    parts: [],
    openStack: [],
    suppressStack: [],
  };
}

function removeSuppressedTag(tag: string, suppressStack: string[]): void {
  const index = suppressStack.lastIndexOf(tag);
  if (index !== -1) {
    suppressStack.splice(index, 1);
  }
}

function closeAllowedTag(tag: string, state: SanitizerState): void {
  const index = state.openStack.lastIndexOf(tag);
  if (index !== -1) {
    state.openStack.splice(index, 1);
    state.parts.push(`</${tag}>`);
  }
}

function handleCloseToken(token: CloseToken, state: SanitizerState): void {
  if (state.suppressStack.length > 0) {
    removeSuppressedTag(token.tag, state.suppressStack);
    return;
  }
  if (state.allowedTags.has(token.tag)) {
    closeAllowedTag(token.tag, state);
  }
}

function handleTextToken(token: TextToken, state: SanitizerState): void {
  if (state.suppressStack.length === 0) {
    state.parts.push(token.raw);
  }
}

function serializeRawOpenToken(token: OpenToken): string {
  let raw = `<${token.tag}`;
  for (const [name, value] of token.attrs) {
    raw += ` ${name}="${value}"`;
  }
  return `${raw}${token.selfClosing ? " />" : ">"}`;
}

function handleDisallowedOpenToken(token: OpenToken, state: SanitizerState): void {
  if (state.escapeMode) {
    state.parts.push(escapeHtml(serializeRawOpenToken(token)));
    return;
  }
  if (!(token.selfClosing || VOID_TAGS.has(token.tag))) {
    state.suppressStack.push(token.tag);
  }
}

const DANGEROUS_SCHEMES_RE = /^\s*(?:javascript|data|vbscript)\s*:/i;

function isUriAttribute(name: string): boolean {
  return name === "href" || name === "src" || name === "srcset" || name === "action";
}

function isSchemeAllowed(
  value: string,
  attrName: string,
  tagName: string,
  allowedSchemes: readonly string[] | undefined,
  allowedSchemesByTag: Readonly<Record<string, readonly string[]>> | undefined,
): boolean {
  if (DANGEROUS_SCHEMES_RE.test(value)) {
    return false;
  }
  const tagSchemes = allowedSchemesByTag?.[tagName];
  const schemes = tagSchemes ?? allowedSchemes;
  if (!schemes || schemes.length === 0) {
    return true;
  }
  if (!isUriAttribute(attrName)) {
    return true;
  }
  const trimmed = value.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#") || trimmed.startsWith("?")) {
    return true;
  }
  const schemeMatch = trimmed.match(URL_SCHEME_RE);
  if (!schemeMatch) {
    return true;
  }
  const scheme = (schemeMatch[1] ?? "").toLowerCase();
  return schemes.some((allowed) => allowed.toLowerCase() === scheme);
}

function filterAllowedAttrs(
  token: OpenToken,
  state: SanitizerState,
  attrs?: ReadonlyMap<string, string>,
): ReadonlyMap<string, string> {
  const sourceAttrs = attrs ?? token.attrs;
  const permittedAttrNames = state.allowedAttrs[token.tag] ?? [];
  const filteredAttrs = new Map<string, string>();
  for (const attrName of permittedAttrNames) {
    if (sourceAttrs.has(attrName)) {
      const value = sourceAttrs.get(attrName) ?? "";
      if (
        isUriAttribute(attrName) &&
        !isSchemeAllowed(
          value,
          attrName,
          token.tag,
          state.allowedSchemes,
          state.allowedSchemesByTag,
        )
      ) {
        continue;
      }
      filteredAttrs.set(attrName, value);
    }
  }
  return filteredAttrs;
}

function attrsMapFromRecord(record: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  const map = new Map<string, string>();
  for (const [key, value] of Object.entries(record)) {
    map.set(key, value);
  }
  return map;
}

function attrsRecordFromMap(attrs: ReadonlyMap<string, string>): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of attrs) {
    record[key] = value;
  }
  return record;
}

function handleAllowedOpenToken(token: OpenToken, state: SanitizerState): void {
  const transformer = state.transformTags?.[token.tag];
  if (transformer) {
    const result = transformer(token.tag, attrsRecordFromMap(token.attrs));
    const transformedAttrs = attrsMapFromRecord(result.attribs);
    const filteredAttrs = filterAllowedAttrs(token, state, transformedAttrs);
    if (!token.selfClosing) {
      state.openStack.push(result.tagName);
    }
    state.parts.push(serializeOpenTag(result.tagName, filteredAttrs, token.selfClosing));
    return;
  }
  const filteredAttrs = filterAllowedAttrs(token, state);
  if (!token.selfClosing) {
    state.openStack.push(token.tag);
  }
  state.parts.push(serializeOpenTag(token.tag, filteredAttrs, token.selfClosing));
}

function handleOpenToken(token: OpenToken, state: SanitizerState): void {
  if (!state.allowedTags.has(token.tag)) {
    handleDisallowedOpenToken(token, state);
    return;
  }
  handleAllowedOpenToken(token, state);
}

function handleToken(token: HtmlToken, state: SanitizerState): void {
  switch (token.kind) {
    case "doctype":
    case "comment":
      return;
    case "close":
      handleCloseToken(token, state);
      return;
    case "text":
      handleTextToken(token, state);
      return;
    case "open":
      handleOpenToken(token, state);
      return;
    default:
      return;
  }
}

function sanitizeHtml(input: string, options: SanitizeOptions = {}): string {
  const state = createSanitizerState(options);
  for (const token of tokenize(input)) {
    handleToken(token, state);
  }
  return state.parts.join("");
}

export type { IOptions, SanitizeOptions, TagTransformer, TransformResult };
export { PACKAGE_NAME, sanitizeHtml, UPSTREAM_PACKAGE };
