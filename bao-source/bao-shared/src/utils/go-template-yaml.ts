/**
 * Go-template YAML sanitization helpers.
 *
 * Strips Helm/Go-template directives while preserving enough YAML structure for
 * offline parsers to validate manifest syntax without invoking template engines.
 *
 * @shared/utils/go-template-yaml
 */

const TEMPLATE_OPEN_RE: RegExp = /^\{\{[+-]?\s*/;
const TEMPLATE_CLOSE_RE: RegExp = /\s*[+-]?\}\}$/;
const INLINE_TEMPLATE_RE: RegExp = /:\s*\{\{/;
const WHITESPACE_SPLIT_RE: RegExp = /\s+/;
const NEWLINE_RE: RegExp = /\r?\n/;

const GO_TEMPLATE_CONTROL_KEYWORDS = [
  "if",
  "with",
  "range",
  "define",
  "template",
  "else",
  "end",
] as const;

type GoTemplateControlKeyword = (typeof GO_TEMPLATE_CONTROL_KEYWORDS)[number];
type GoTemplateBlockOpeningKeyword = Extract<
  GoTemplateControlKeyword,
  "if" | "with" | "range" | "define" | "template"
>;

type ControlStackFrame = {
  keyword: GoTemplateBlockOpeningKeyword;
  skipElse: boolean;
};

const GO_TEMPLATE_BLOCK_OPENING_KEYWORDS: Set<GoTemplateBlockOpeningKeyword> =
  new Set<GoTemplateBlockOpeningKeyword>(["if", "with", "range", "define", "template"]);

/**
 * Remove Go-template delimiters from a template line body.
 *
 * @param line - Trimmed template line.
 * @returns Inner body text without `{{ ... }}` delimiters.
 */
function stripTemplateBody(line: string): string {
  return line.replace(TEMPLATE_OPEN_RE, "").replace(TEMPLATE_CLOSE_RE, "").trim();
}

/**
 * Determine whether a trimmed line contains only a standalone template directive.
 *
 * @param trimmed - Trimmed source line.
 * @returns True when the line is template-only.
 */
function isTemplateOnlyLine(trimmed: string): boolean {
  if (!(trimmed.startsWith("{{") && trimmed.endsWith("}}"))) {
    return false;
  }
  return !INLINE_TEMPLATE_RE.test(trimmed);
}

/**
 * Narrow a parsed template keyword to the known control keyword set.
 *
 * @param value - Parsed keyword token.
 * @returns True when the token is a supported control keyword.
 */
function isGoTemplateControlKeyword(value: string): value is GoTemplateControlKeyword {
  return GO_TEMPLATE_CONTROL_KEYWORDS.some((keyword) => keyword === value);
}

/**
 * Narrow a keyword to one that opens a control block.
 *
 * @param value - Parsed keyword token.
 * @returns True when the keyword opens a block scope.
 */
function isBlockOpeningKeyword(value: string): value is GoTemplateBlockOpeningKeyword {
  return [...GO_TEMPLATE_BLOCK_OPENING_KEYWORDS].some((keyword) => keyword === value);
}

/**
 * Extract a normalized control keyword from a template line body.
 *
 * @param line - Trimmed template line.
 * @returns Parsed keyword, or null when not a control directive.
 */
function getControlKeyword(line: string): GoTemplateControlKeyword | null {
  const body = stripTemplateBody(line);
  if (body.startsWith("/*") || body.startsWith("*/")) {
    return null;
  }
  if (body.startsWith("$")) {
    return null;
  }
  const keyword = body.split(WHITESPACE_SPLIT_RE, 1)[0]?.replace("-", "") ?? "";
  return isGoTemplateControlKeyword(keyword) ? keyword : null;
}

/**
 * Push a new control frame when the directive opens a block.
 *
 * @param keyword - Parsed control keyword.
 * @param controlStack - Mutable control stack.
 * @param shouldSkip - Current skip state.
 * @returns True when a new frame was pushed.
 */
function maybePushControlFrame(
  keyword: GoTemplateControlKeyword,
  controlStack: ControlStackFrame[],
  shouldSkip: boolean,
): boolean {
  if (!isBlockOpeningKeyword(keyword)) {
    return false;
  }
  controlStack.push({ keyword, skipElse: shouldSkip });
  return true;
}

/**
 * Mark the current `if` frame so its `else` branch is skipped.
 *
 * @param controlStack - Mutable control stack.
 */
function handleElseKeyword(controlStack: ControlStackFrame[]): void {
  const top = controlStack.at(-1);
  if (!top || top.keyword !== "if") {
    return;
  }
  top.skipElse = true;
}

/**
 * Update the control stack for a complete single-line template directive.
 *
 * @param keyword - Parsed control keyword.
 * @param controlStack - Mutable control stack.
 * @param shouldSkip - Current skip state.
 */
function processCompleteTemplateDirective(
  keyword: GoTemplateControlKeyword | null,
  controlStack: ControlStackFrame[],
  shouldSkip: boolean,
): void {
  if (!keyword) {
    return;
  }
  if (maybePushControlFrame(keyword, controlStack, shouldSkip)) {
    return;
  }
  if (keyword === "else") {
    handleElseKeyword(controlStack);
    return;
  }
  if (keyword === "end" && controlStack.length > 0) {
    controlStack.pop();
  }
}

/**
 * Update the control stack for a multi-line template directive start.
 *
 * @param keyword - Parsed control keyword.
 * @param controlStack - Mutable control stack.
 * @param shouldSkip - Current skip state.
 */
function processMultilineTemplateOpen(
  keyword: GoTemplateControlKeyword | null,
  controlStack: ControlStackFrame[],
  shouldSkip: boolean,
): void {
  if (!keyword) {
    return;
  }
  maybePushControlFrame(keyword, controlStack, shouldSkip);
  if (keyword === "else") {
    handleElseKeyword(controlStack);
  }
}

type TemplateLineResult = {
  handled: boolean;
  inTemplateBlock: boolean;
};

function resolveSkipState(controlStack: ControlStackFrame[]): boolean {
  return controlStack.some((frame) => frame.skipElse);
}

function continueTemplateBlock(line: string, inTemplateBlock: boolean): TemplateLineResult {
  if (!inTemplateBlock) {
    return { handled: false, inTemplateBlock };
  }
  return {
    handled: true,
    inTemplateBlock: !line.includes("}}"),
  };
}

function processTemplateDirectiveLine(
  trimmed: string,
  controlStack: ControlStackFrame[],
  shouldSkip: boolean,
): TemplateLineResult {
  if (!trimmed.startsWith("{{")) {
    return { handled: false, inTemplateBlock: false };
  }

  const keyword = getControlKeyword(trimmed);
  if (!trimmed.includes("}}")) {
    processMultilineTemplateOpen(keyword, controlStack, shouldSkip);
    return { handled: true, inTemplateBlock: true };
  }

  if (!isTemplateOnlyLine(trimmed)) {
    return { handled: true, inTemplateBlock: false };
  }

  processCompleteTemplateDirective(keyword, controlStack, shouldSkip);
  return { handled: true, inTemplateBlock: false };
}

function sanitizeInlineTemplateLine(line: string): string {
  return line.replace(/{{[+-]?[\s\S]*?[+-]?}}/g, "__template__");
}

/**
 * Remove Go-template directives while preserving YAML structure.
 *
 * This keeps offline YAML validation deterministic for raw template files.
 *
 * @param content - Raw YAML manifest text containing Go-template directives.
 * @returns YAML-like content safe for parsing.
 */
export function sanitizeGoTemplateForYaml(content: string): string {
  const lines = content.split(NEWLINE_RE);
  const output: string[] = [];
  const controlStack: ControlStackFrame[] = [];
  let inTemplateBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      output.push("");
      continue;
    }

    const templateBlockResult = continueTemplateBlock(line, inTemplateBlock);
    if (templateBlockResult.handled) {
      inTemplateBlock = templateBlockResult.inTemplateBlock;
      continue;
    }

    const shouldSkip = resolveSkipState(controlStack);
    const directiveResult = processTemplateDirectiveLine(trimmed, controlStack, shouldSkip);
    if (directiveResult.handled) {
      inTemplateBlock = directiveResult.inTemplateBlock;
      continue;
    }

    if (shouldSkip) {
      continue;
    }

    output.push(sanitizeInlineTemplateLine(line));
  }

  return output.join("\n");
}
