import { utf16Advance } from "./monolith-char.ts";

const SLASH = "/".codePointAt(0) ?? 47;
const STAR = "*".codePointAt(0) ?? 42;
const BACKSLASH = "\\".codePointAt(0) ?? 92;
const NEWLINE = "\n".codePointAt(0) ?? 10;
const OPEN_BRACE = "{".codePointAt(0) ?? 123;
const BACKTICK = "`".codePointAt(0) ?? 96;

export type NestedBodyScan = (source: string, at: number) => { readonly endIndex: number };

export const skipLineComment = (source: string, start: number): number => {
  let i = start;
  while (i < source.length) {
    const c = source.codePointAt(i) ?? 0;
    if (c === NEWLINE) {
      return i + 1;
    }
    i += utf16Advance(c);
  }
  return source.length;
};

export const skipBlockComment = (source: string, start: number): number => {
  let i = start + 2;
  while (i < source.length) {
    const c = source.codePointAt(i) ?? 0;
    const n = source.codePointAt(i + 1) ?? 0;
    if (c === STAR && n === SLASH) {
      return i + 2;
    }
    i += utf16Advance(c);
  }
  return source.length;
};

export const skipQuotedString = (source: string, start: number, delimiter: number): number => {
  let i = start + 1;
  while (i < source.length) {
    const c = source.codePointAt(i) ?? 0;
    if (c === BACKSLASH) {
      const n = source.codePointAt(i + 1) ?? 0;
      i += 1 + utf16Advance(n);
      continue;
    }
    if (c === delimiter) {
      return i + utf16Advance(c);
    }
    i += utf16Advance(c);
  }
  return source.length;
};

export const skipTemplateLiteral = (
  source: string,
  start: number,
  scanNestedBody: NestedBodyScan,
): number => {
  let i = start + 1;
  while (i < source.length) {
    const c = source.codePointAt(i) ?? 0;
    if (c === BACKSLASH) {
      const n = source.codePointAt(i + 1) ?? 0;
      i += 1 + utf16Advance(n);
      continue;
    }
    if (c === BACKTICK) {
      return i + utf16Advance(c);
    }
    if (c === OPEN_BRACE) {
      i = scanNestedBody(source, i).endIndex;
      continue;
    }
    i += utf16Advance(c);
  }
  return source.length;
};
