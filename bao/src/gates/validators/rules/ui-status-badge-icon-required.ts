/**
 * `ui-status-badge-icon-required`
 *
 * UI/UX governance "status = icon + text + color" rule. Every call to
 * `renderStatusBadge(label, variant, options?)` with a tone-carrying variant
 * (`success` | `error` | `warning` | `info`) must pass an `icon:` option so
 * the badge isn't communicating via colour alone (WCAG 1.4.1).
 *
 * `ghost`, `neutral`, `outline`, `primary`, `secondary`, `accent`, and the
 * `null` style-only form are exempt because they are not tone-carrying.
 */

import type { ValidatorContext } from "../context.ts";

const TONE_VARIANTS: ReadonlySet<string> = new Set(["success", "error", "warning", "info"]);

const CALL_TOKEN = "renderStatusBadge";
const LITERAL_VARIANT_PATTERN = /^\s*['"]([a-z]+)['"]/u;
const ICON_OPTION_PATTERN = /\bicon\s*:/u;
const TYPESCRIPT_FILE_PATTERN = /\.tsx?$/u;
const WHITESPACE_PATTERN = /\s/u;

const extractLineNumber = (contents: string, matchIndex: number): number =>
  contents.slice(0, matchIndex).split("\n").length;

type ScannerMode = "code" | "single" | "double" | "template" | "line-comment" | "block-comment";

interface ScannerAdvance {
  readonly mode: ScannerMode;
  readonly skip: number;
}

interface StatusBadgeCall {
  readonly body: string;
  readonly nextCursor: number;
  readonly tokenIndex: number;
}

const CODE_ADVANCE: ScannerAdvance = { mode: "code", skip: 0 };

const isOpeningDelimiter = (char: string): boolean => char === "(" || char === "{" || char === "[";

const isClosingDelimiter = (char: string): boolean => char === ")" || char === "}" || char === "]";

const advanceStringMode = (
  mode: "single" | "double" | "template",
  closing: string,
  char: string,
): ScannerAdvance => {
  if (char === "\\") {
    return { mode, skip: 1 };
  }
  return char === closing ? CODE_ADVANCE : { mode, skip: 0 };
};

const advanceCommentMode = (
  mode: "line-comment" | "block-comment",
  char: string,
  next: string,
): ScannerAdvance => {
  if (mode === "line-comment") {
    return char === "\n" ? CODE_ADVANCE : { mode, skip: 0 };
  }
  return char === "*" && next === "/" ? { mode: "code", skip: 1 } : { mode, skip: 0 };
};

const advanceCodeMode = (char: string, next: string): ScannerAdvance => {
  if (char === "/" && next === "/") {
    return { mode: "line-comment", skip: 1 };
  }
  if (char === "/" && next === "*") {
    return { mode: "block-comment", skip: 1 };
  }
  if (char === "'") {
    return { mode: "single", skip: 0 };
  }
  if (char === '"') {
    return { mode: "double", skip: 0 };
  }
  return char === "`" ? { mode: "template", skip: 0 } : CODE_ADVANCE;
};

const advanceScanner = (mode: ScannerMode, char: string, next: string): ScannerAdvance => {
  switch (mode) {
    case "single":
      return advanceStringMode(mode, "'", char);
    case "double":
      return advanceStringMode(mode, '"', char);
    case "template":
      return advanceStringMode(mode, "`", char);
    case "line-comment":
    case "block-comment":
      return advanceCommentMode(mode, char, next);
    case "code":
      return advanceCodeMode(char, next);
    default:
      return advanceCodeMode(char, next);
  }
};

const delimiterDelta = (char: string): number => {
  if (isOpeningDelimiter(char)) {
    return 1;
  }
  return isClosingDelimiter(char) ? -1 : 0;
};

/**
 * Find a single `renderStatusBadge(...)` call expression starting at the
 * given index in `contents`. Returns the substring spanning the opening
 * paren through the matching closing paren, or `null` when the source is
 * truncated. The scan respects nested parens / braces / brackets so a call
 * never bleeds into a sibling call.
 */
function extractCallBody(contents: string, startIndex: number): string | null {
  let depth = 0;
  let mode: ScannerMode = "code";
  for (let i = startIndex; i < contents.length; i += 1) {
    const char = contents.at(i) ?? "";
    const next = contents.at(i + 1) ?? "";
    const advance = advanceScanner(mode, char, next);
    if (mode !== "code" || advance.mode !== "code") {
      mode = advance.mode;
      i += advance.skip;
      continue;
    }
    depth += delimiterDelta(char);
    if (depth === 0 && char === ")") {
      return contents.slice(startIndex, i + 1);
    }
  }
  return null;
}

/**
 * Split the body of a `(...)` call into its top-level comma-separated
 * arguments. Nested parens / braces / brackets / strings are respected so
 * an object literal or template-string argument is returned intact.
 */
function splitCallArgs(body: string): string[] {
  if (body.length < 2 || body.at(0) !== "(" || body.at(-1) !== ")") {
    return [];
  }
  const inner = body.slice(1, -1);
  const args: string[] = [];
  let depth = 0;
  let start = 0;
  let mode: ScannerMode = "code";
  for (let i = 0; i < inner.length; i += 1) {
    const char = inner.at(i) ?? "";
    const next = inner.at(i + 1) ?? "";
    const advance = advanceScanner(mode, char, next);
    if (mode !== "code" || advance.mode !== "code") {
      mode = advance.mode;
      i += advance.skip;
      continue;
    }
    if (char === "," && depth === 0) {
      args.push(inner.slice(start, i));
      start = i + 1;
      continue;
    }
    depth += delimiterDelta(char);
  }
  args.push(inner.slice(start));
  return args.map((arg) => arg.trim());
}

const openingParenIndex = (contents: string, parenIndex: number): number | null => {
  let openIndex = parenIndex;
  while (openIndex < contents.length && WHITESPACE_PATTERN.test(contents.at(openIndex) ?? "")) {
    openIndex += 1;
  }
  return contents.at(openIndex) === "(" ? openIndex : null;
};

const findNextStatusBadgeCall = (contents: string, cursor: number): StatusBadgeCall | null => {
  const tokenIndex = contents.indexOf(CALL_TOKEN, cursor);
  if (tokenIndex === -1) {
    return null;
  }
  const parenIndex = tokenIndex + CALL_TOKEN.length;
  const openIndex = openingParenIndex(contents, parenIndex);
  if (openIndex === null) {
    return { body: "", nextCursor: parenIndex, tokenIndex };
  }
  const body = extractCallBody(contents, openIndex);
  return body === null ? null : { body, nextCursor: openIndex + body.length, tokenIndex };
};

const statusBadgeViolation = (
  path: string,
  contents: string,
  call: StatusBadgeCall,
): string | null => {
  const args = splitCallArgs(call.body);
  const variantArg = args.at(1) ?? "";
  const variantMatch = LITERAL_VARIANT_PATTERN.exec(variantArg);
  const variant = variantMatch?.[1];
  const optionsArg = args.at(2) ?? "";
  if (
    variant === undefined ||
    !TONE_VARIANTS.has(variant) ||
    ICON_OPTION_PATTERN.test(optionsArg)
  ) {
    return null;
  }
  const line = extractLineNumber(contents, call.tokenIndex);
  return `${path}:${line} renderStatusBadge(..., "${variant}") missing icon — tone-carrying variants must declare icon for the icon+text+color rule`;
};

const collectStatusBadgeViolations = (path: string, contents: string): string[] => {
  const violations: string[] = [];
  for (let cursor = 0; cursor < contents.length; ) {
    const call = findNextStatusBadgeCall(contents, cursor);
    if (call === null) {
      break;
    }
    cursor = call.nextCursor;
    const violation = statusBadgeViolation(path, contents, call);
    if (violation !== null) {
      violations.push(violation);
    }
  }
  return violations;
};

const readStatusBadgeViolations = async (
  ctx: ValidatorContext,
  path: string,
): Promise<string[]> => {
  if (!TYPESCRIPT_FILE_PATTERN.test(path)) {
    return [];
  }
  const contents = await ctx.readFile(path);
  return collectStatusBadgeViolations(path, contents);
};

export const uiStatusBadgeIconRequired = async (ctx: ValidatorContext): Promise<void> => {
  const perFileViolations = await Promise.all(
    ctx.htmlFiles().map((path) => readStatusBadgeViolations(ctx, path)),
  );
  const violations = perFileViolations.flat();

  ctx.failAll(violations, "status-badge tone-carrying variants must declare an icon");
};
