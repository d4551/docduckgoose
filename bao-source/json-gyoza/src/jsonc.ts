/**
 * @baohaus/json-gyoza/jsonc
 *
 * JSONC (JSON with Comments) parser — clean-room parity implementation for
 * upstream: jsonc-parser
 *
 * Strips line (//) and block (/* ... * /) comments before delegating to
 * standard JSON.parse.  Also exports a `parse` function with an error-collecting
 * signature compatible with the `jsonc-parser` package.
 */

import { parseJsonSafe } from "@baohaus/bao-json-safe/parse";

export interface ParseError {
  readonly error: ParseErrorCode;
  readonly offset: number;
  readonly length: number;
}

export enum ParseErrorCode {
  InvalidSymbol = 1,
  InvalidNumberFormat = 2,
  PropertyNameExpected = 3,
  ValueExpected = 4,
  ColonExpected = 5,
  CommaExpected = 6,
  CloseBraceExpected = 7,
  CloseBracketExpected = 8,
  EndOfFileExpected = 9,
  InvalidCommentToken = 10,
  UnexpectedEndOfComment = 11,
  UnexpectedEndOfString = 12,
  UnexpectedEndOfNumber = 13,
  InvalidUnicode = 14,
  InvalidEscapeCharacter = 15,
  InvalidCharacter = 16,
}

const PARSE_ERROR_CODE_LABELS: Readonly<Record<ParseErrorCode, string>> = {
  [ParseErrorCode.InvalidSymbol]: "InvalidSymbol",
  [ParseErrorCode.InvalidNumberFormat]: "InvalidNumberFormat",
  [ParseErrorCode.PropertyNameExpected]: "PropertyNameExpected",
  [ParseErrorCode.ValueExpected]: "ValueExpected",
  [ParseErrorCode.ColonExpected]: "ColonExpected",
  [ParseErrorCode.CommaExpected]: "CommaExpected",
  [ParseErrorCode.CloseBraceExpected]: "CloseBraceExpected",
  [ParseErrorCode.CloseBracketExpected]: "CloseBracketExpected",
  [ParseErrorCode.EndOfFileExpected]: "EndOfFileExpected",
  [ParseErrorCode.InvalidCommentToken]: "InvalidCommentToken",
  [ParseErrorCode.UnexpectedEndOfComment]: "UnexpectedEndOfComment",
  [ParseErrorCode.UnexpectedEndOfString]: "UnexpectedEndOfString",
  [ParseErrorCode.UnexpectedEndOfNumber]: "UnexpectedEndOfNumber",
  [ParseErrorCode.InvalidUnicode]: "InvalidUnicode",
  [ParseErrorCode.InvalidEscapeCharacter]: "InvalidEscapeCharacter",
  [ParseErrorCode.InvalidCharacter]: "InvalidCharacter",
};

export function printParseErrorCode(code: ParseErrorCode): string {
  return PARSE_ERROR_CODE_LABELS[code] ?? `Unknown(${String(code)})`;
}

// Comment stripping

/**
 * Remove line (//) and block (/* ... *\/) comments from a JSONC string.
 * Handles strings so that comment-like tokens inside strings are preserved.
 */
export function stripJsonComments(text: string): string {
  const output: string[] = [];
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    // String literal – copy verbatim until closing quote
    if (ch === '"' || ch === "'") {
      const quote = ch;
      output.push(quote);
      i++;
      while (i < text.length) {
        const inner = text[i];
        if (inner === "\\") {
          output.push(inner);
          i++;
          if (i < text.length) {
            output.push(text[i]);
            i++;
          }
          continue;
        }
        if (inner === quote) {
          output.push(inner);
          i++;
          break;
        }
        output.push(inner);
        i++;
      }
      continue;
    }

    // Line comment
    if (ch === "/" && i + 1 < text.length && text[i + 1] === "/") {
      i += 2;
      while (i < text.length && text[i] !== "\n") {
        i++;
      }
      continue;
    }

    // Block comment
    if (ch === "/" && i + 1 < text.length && text[i + 1] === "*") {
      i += 2;
      while (i + 1 < text.length) {
        if (text[i] === "*" && text[i + 1] === "/") {
          i += 2;
          break;
        }
        i++;
      }
      continue;
    }

    output.push(ch);
    i++;
  }

  return output.join("");
}

// Parse with error collection (jsonc-parser compatible signature)

export interface ParseOptions {
  readonly allowTrailingComma?: boolean;
  readonly disallowComments?: boolean;
}

const DEFAULT_PARSE_OPTIONS: ParseOptions = {
  allowTrailingComma: false,
  disallowComments: false,
};

function buildParseError(code: ParseErrorCode, offset: number, length: number): ParseError {
  return { error: code, offset, length };
}

/**
 * Parse JSON/JSONC text into a value, collecting errors rather than throwing.
 * Compatible with the `jsonc-parser` `parse()` signature.
 */
export function parse(text: string, errors?: ParseError[], options?: ParseOptions): unknown {
  const opts = { ...DEFAULT_PARSE_OPTIONS, ...options };

  // Remove comments unless disallowed (in which case comments are illegal JSON
  // and will naturally fail JSON.parse).
  let cleaned = text;
  if (!opts.disallowComments) {
    cleaned = stripJsonComments(text);
  }

  // Handle trailing commas by stripping them before JSON.parse
  if (opts.allowTrailingComma) {
    cleaned = stripTrailingCommas(cleaned);
  }

  const parsed = parseJsonSafe(cleaned);
  if (!parsed.ok) {
    if (errors) {
      errors.push(
        buildParseError(
          ParseErrorCode.InvalidSymbol,
          parsed.offset,
          Math.max(1, cleaned.length - parsed.offset),
        ),
      );
      return undefined;
    }
    throw new SyntaxError(parsed.reason);
  }
  return parsed.value;
}

// Trailing comma helper

function stripTrailingCommas(json: string): string {
  const output: string[] = [];
  let i = 0;

  while (i < json.length) {
    const ch = json[i];

    if (ch === '"') {
      output.push(ch);
      i++;
      while (i < json.length) {
        const inner = json[i];
        output.push(inner);
        if (inner === "\\" && i + 1 < json.length) {
          i++;
          output.push(json[i]);
        }
        i++;
        if (inner === '"') {
          break;
        }
      }
      continue;
    }

    if (ch === "," && i + 1 < json.length) {
      let peek = i + 1;
      while (
        peek < json.length &&
        (json[peek] === " " || json[peek] === "\t" || json[peek] === "\n" || json[peek] === "\r")
      ) {
        peek++;
      }
      if (peek < json.length && (json[peek] === "}" || json[peek] === "]")) {
        i++;
        continue;
      }
    }

    output.push(ch);
    i++;
  }

  return output.join("");
}

// Simple JSONC parse (for consumers that just want comment stripping)

/**
 * Parse a JSONC string (JSON with comments) into a JavaScript value.
 * Throws on invalid syntax.
 */
export function parseJsonc(text: string): unknown {
  const cleaned = stripJsonComments(text);
  const parsed = parseJsonSafe(cleaned);
  if (!parsed.ok) {
    throw new SyntaxError(parsed.reason);
  }
  return parsed.value;
}
