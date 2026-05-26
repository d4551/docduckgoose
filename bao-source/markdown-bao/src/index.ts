/**
 * @baohaus/markdown-bao
 *
 * Bao-native markdown parsing and rendering.
 * Domain: content
 */

const PACKAGE_NAME = "@baohaus/markdown-bao" as const;
const HEADING_MARKER_PATTERN = /^#+/u;
const UNORDERED_LIST_ITEM_PATTERN = /^\s*[-*+]\s/u;
const TABLE_LEADING_PIPE_PATTERN = /^\|/u;
const TABLE_TRAILING_PIPE_PATTERN = /\|$/u;
const TABLE_SEPARATOR_CELL_PATTERN = /^:?-{3,}:?$/u;

interface Token {
  readonly type: string;
  readonly raw: string;
}

interface HeadingToken extends Token {
  readonly type: "heading";
  readonly depth: number;
  readonly text: string;
}

interface ParagraphToken extends Token {
  readonly type: "paragraph";
  readonly text: string;
}

interface CodeToken extends Token {
  readonly type: "code";
  readonly lang?: string;
  readonly text: string;
}

interface ListToken extends Token {
  readonly type: "list";
  readonly ordered: boolean;
  readonly items: readonly ListItemToken[];
}

interface ListItemToken extends Token {
  readonly type: "list_item";
  readonly text: string;
}

interface TableToken extends Token {
  readonly type: "table";
  readonly header: readonly string[];
  readonly rows: readonly (readonly string[])[];
}

interface ExtensionToken extends Token {
  readonly type: "extension";
  readonly name: string;
  readonly text: string;
}

type MarkdownToken =
  | HeadingToken
  | ParagraphToken
  | CodeToken
  | ListToken
  | ListItemToken
  | TableToken
  | ExtensionToken;

interface TokenizeResult {
  readonly token?: MarkdownToken;
  readonly nextIndex: number;
}

interface MarkedOptions {
  readonly async?: boolean;
  readonly gfm?: boolean;
  readonly breaks?: boolean;
  readonly renderer?: MarkdownRenderer;
  readonly tokenizer?: MarkdownTokenizer;
  readonly extensions?: readonly MarkdownExtension[];
}

interface MarkdownRenderer {
  readonly heading?: (token: HeadingToken) => string;
  readonly paragraph?: (token: ParagraphToken, options: MarkedOptions) => string;
  readonly code?: (token: CodeToken) => string;
  readonly list?: (token: ListToken, options: MarkedOptions) => string;
  readonly table?: (token: TableToken, options: MarkedOptions) => string;
}

interface MarkdownTokenizer {
  readonly heading?: (line: string, index: number) => HeadingToken | null;
  readonly paragraph?: (line: string, index: number) => ParagraphToken | null;
}

interface MarkdownExtension {
  readonly name: string;
  readonly level?: "block" | "inline";
  readonly tokenizer?: (source: string) => ExtensionToken | null;
  readonly renderer?: (token: ExtensionToken) => string;
}

function tokenizeHeading(line: string, index: number): TokenizeResult {
  const depth = line.match(HEADING_MARKER_PATTERN)?.[0].length ?? 1;
  return {
    token: { type: "heading", depth, text: line.slice(depth).trim(), raw: line },
    nextIndex: index + 1,
  };
}

function tokenizeCodeBlock(lines: readonly string[], index: number): TokenizeResult {
  const openingLine = lines[index] ?? "";
  const lang = openingLine.slice(3).trim();
  const start = index;
  let cursor = index + 1;
  const codeLines: string[] = [];
  while (cursor < lines.length && !lines[cursor]?.startsWith("```")) {
    const codeLine = lines[cursor];
    if (codeLine !== undefined) {
      codeLines.push(codeLine);
    }
    cursor++;
  }
  return {
    token: {
      type: "code",
      lang: lang || undefined,
      text: codeLines.join("\n"),
      raw: lines.slice(start, cursor + 1).join("\n"),
    },
    nextIndex: cursor + 1,
  };
}

function tokenizeList(lines: readonly string[], index: number): TokenizeResult {
  let cursor = index;
  const items: ListItemToken[] = [];
  while (cursor < lines.length && UNORDERED_LIST_ITEM_PATTERN.test(lines[cursor] ?? "")) {
    const itemLine = lines[cursor];
    if (itemLine !== undefined) {
      items.push({
        type: "list_item",
        text: itemLine.replace(UNORDERED_LIST_ITEM_PATTERN, ""),
        raw: itemLine,
      });
    }
    cursor++;
  }
  return {
    token: { type: "list", ordered: false, items, raw: items.map((item) => item.raw).join("\n") },
    nextIndex: cursor,
  };
}

function parseTableRow(line: string): readonly string[] {
  return line
    .trim()
    .replace(TABLE_LEADING_PIPE_PATTERN, "")
    .replace(TABLE_TRAILING_PIPE_PATTERN, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string | undefined): boolean {
  if (line === undefined) {
    return false;
  }
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every((cell) => TABLE_SEPARATOR_CELL_PATTERN.test(cell));
}

function tokenizeTable(lines: readonly string[], index: number): TokenizeResult {
  const headerLine = lines[index] ?? "";
  const header = parseTableRow(headerLine);
  let cursor = index + 2;
  const rows: (readonly string[])[] = [];

  while (cursor < lines.length && (lines[cursor]?.includes("|") ?? false)) {
    rows.push(parseTableRow(lines[cursor] ?? ""));
    cursor += 1;
  }

  return {
    token: {
      type: "table",
      header,
      rows,
      raw: lines.slice(index, cursor).join("\n"),
    },
    nextIndex: cursor,
  };
}

function tokenizeExtensionLine(
  lines: readonly string[],
  index: number,
  options: MarkedOptions,
): TokenizeResult | null {
  for (const extension of options.extensions ?? []) {
    if (extension.level === "inline" || extension.tokenizer === undefined) {
      continue;
    }
    const token = extension.tokenizer(lines.slice(index).join("\n"));
    if (token !== null) {
      const rawLineCount = token.raw.split("\n").length;
      return { token, nextIndex: index + rawLineCount };
    }
  }
  return null;
}

function tokenizeLine(
  lines: readonly string[],
  index: number,
  options: MarkedOptions,
): TokenizeResult {
  const line = lines[index];
  if (line === undefined || line.trim().length === 0) {
    return { nextIndex: index + 1 };
  }
  const extensionToken = tokenizeExtensionLine(lines, index, options);
  if (extensionToken !== null) {
    return extensionToken;
  }
  if (line.startsWith("#")) {
    const customHeading = options.tokenizer?.heading?.(line, index);
    if (customHeading !== undefined && customHeading !== null) {
      return { token: customHeading, nextIndex: index + 1 };
    }
    return tokenizeHeading(line, index);
  }
  if (line.startsWith("```")) {
    return tokenizeCodeBlock(lines, index);
  }
  if (UNORDERED_LIST_ITEM_PATTERN.test(line)) {
    return tokenizeList(lines, index);
  }
  if (line.includes("|") && isTableSeparator(lines[index + 1])) {
    return tokenizeTable(lines, index);
  }
  const customParagraph = options.tokenizer?.paragraph?.(line, index);
  return {
    token: customParagraph ?? { type: "paragraph", text: line.trim(), raw: line },
    nextIndex: index + 1,
  };
}

function tokenize(input: string, options: MarkedOptions = {}): MarkdownToken[] {
  const tokens: MarkdownToken[] = [];
  const lines = input.split("\n");
  let index = 0;

  while (index < lines.length) {
    const result = tokenizeLine(lines, index, options);
    if (result.token !== undefined) {
      tokens.push(result.token);
    }
    index = result.nextIndex;
  }

  return tokens;
}

const STRONG_PATTERN = /\*\*([^*]+)\*\*/gu;
const EMPHASIS_PATTERN = /(^|[^*])\*([^*]+)\*/gu;
const CODE_PATTERN = /`([^`]+)`/gu;
const IMAGE_PATTERN = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/gu;
const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/gu;
const SCRIPT_STYLE_BLOCK_PATTERN = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/giu;
const HTML_TAG_PATTERN = /<[^>]+>/gu;

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInlineMarkdown(input: string, options: MarkedOptions): string {
  const withoutRawHtml = input
    .replace(SCRIPT_STYLE_BLOCK_PATTERN, "")
    .replace(HTML_TAG_PATTERN, "");
  const withBreaks =
    options.breaks === true ? withoutRawHtml.replaceAll("\n", "<br>") : withoutRawHtml;
  return escapeHtml(withBreaks)
    .replace(CODE_PATTERN, "<code>$1</code>")
    .replace(STRONG_PATTERN, "<strong>$1</strong>")
    .replace(EMPHASIS_PATTERN, "$1<em>$2</em>")
    .replace(IMAGE_PATTERN, (_match, alt: string, src: string, title: string | undefined) => {
      const titleAttr = title === undefined ? "" : ` title="${escapeHtml(title)}"`;
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${titleAttr}>`;
    })
    .replace(LINK_PATTERN, (_match, label: string, href: string, title: string | undefined) => {
      const titleAttr = title === undefined ? "" : ` title="${escapeHtml(title)}"`;
      return `<a href="${escapeHtml(href)}"${titleAttr}>${label}</a>`;
    });
}

function renderHeadingToken(token: HeadingToken, options: MarkedOptions): string {
  if (options.renderer?.heading !== undefined) {
    return options.renderer.heading(token);
  }
  return `<h${token.depth}>${escapeHtml(token.text)}</h${token.depth}>`;
}

function renderParagraphToken(token: ParagraphToken, options: MarkedOptions): string {
  if (options.renderer?.paragraph !== undefined) {
    return options.renderer.paragraph(token, options);
  }
  return `<p>${renderInlineMarkdown(token.text, options)}</p>`;
}

function renderCodeToken(token: CodeToken, options: MarkedOptions): string {
  if (options.renderer?.code !== undefined) {
    return options.renderer.code(token);
  }
  return `<pre><code${token.lang ? ` class="language-${token.lang}"` : ""}>${escapeHtml(token.text)}</code></pre>`;
}

function renderListToken(token: ListToken, options: MarkedOptions): string {
  if (options.renderer?.list !== undefined) {
    return options.renderer.list(token, options);
  }
  const tag = token.ordered ? "ol" : "ul";
  const items = token.items
    .map((item) => `<li>${renderInlineMarkdown(item.text, options)}</li>`)
    .join("");
  return `<${tag}>${items}</${tag}>`;
}

function renderTableToken(token: TableToken, options: MarkedOptions): string {
  if (options.renderer?.table !== undefined) {
    return options.renderer.table(token, options);
  }
  const header = token.header
    .map((cell) => `<th>${renderInlineMarkdown(cell, options)}</th>`)
    .join("");
  const rows = token.rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell, options)}</td>`).join("")}</tr>`,
    )
    .join("");
  return `<table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table>`;
}

function renderExtensionToken(token: ExtensionToken, options: MarkedOptions): string {
  const renderer = options.extensions?.find((extension) => extension.name === token.name)?.renderer;
  return renderer === undefined ? escapeHtml(token.text) : renderer(token);
}

function renderMarkdownToken(token: MarkdownToken, options: MarkedOptions): string {
  switch (token.type) {
    case "heading":
      return renderHeadingToken(token, options);
    case "paragraph":
      return renderParagraphToken(token, options);
    case "code":
      return renderCodeToken(token, options);
    case "list":
      return renderListToken(token, options);
    case "table":
      return renderTableToken(token, options);
    case "extension":
      return renderExtensionToken(token, options);
    case "list_item":
      return renderInlineMarkdown(token.text, options);
    default: {
      const exhaustiveToken: never = token;
      return exhaustiveToken;
    }
  }
}

function renderHTML(tokens: readonly MarkdownToken[], options: MarkedOptions = {}): string {
  return tokens.map((token) => renderMarkdownToken(token, options)).join("\n");
}

let markedOptions: MarkedOptions = {};

function mergeMarkedOptions(options: MarkedOptions): void {
  markedOptions = {
    ...markedOptions,
    ...options,
    renderer: { ...markedOptions.renderer, ...options.renderer },
    tokenizer: { ...markedOptions.tokenizer, ...options.tokenizer },
    extensions: [...(markedOptions.extensions ?? []), ...(options.extensions ?? [])],
  };
}

function resolveMarkedOptions(options: MarkedOptions = {}): MarkedOptions {
  return {
    ...markedOptions,
    ...options,
    renderer: { ...markedOptions.renderer, ...options.renderer },
    tokenizer: { ...markedOptions.tokenizer, ...options.tokenizer },
    extensions: [...(markedOptions.extensions ?? []), ...(options.extensions ?? [])],
  };
}

function lexer(input: string, options: MarkedOptions = {}): MarkdownToken[] {
  return tokenize(input, resolveMarkedOptions(options));
}

function parser(tokens: readonly MarkdownToken[], options: MarkedOptions = {}): string {
  return renderHTML(tokens, resolveMarkedOptions(options));
}

function parse(input: string, options: MarkedOptions & { readonly async: true }): Promise<string>;
function parse(input: string, options?: MarkedOptions): string;
function parse(input: string, options: MarkedOptions = {}): string | Promise<string> {
  const resolvedOptions = resolveMarkedOptions(options);
  const html = renderHTML(tokenize(input, resolvedOptions), resolvedOptions);
  return options.async === true ? Promise.resolve(html) : html;
}

const marked = Object.assign(parse, { lexer, parse, parser, use: mergeMarkedOptions });

export type {
  CodeToken,
  HeadingToken,
  ListItemToken,
  ListToken,
  MarkdownExtension,
  MarkdownRenderer,
  MarkdownToken,
  MarkdownTokenizer,
  MarkedOptions,
  ParagraphToken,
  TableToken,
  Token,
};
export { lexer, marked, PACKAGE_NAME, parse, parser, renderHTML, tokenize };
