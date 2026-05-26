/**
 * Non-throwing JSON parser. Pure-TS recursive descent over the RFC 8259
 * grammar — no `JSON.parse`, no `try/catch`, no `.catch`. Returns a typed
 * Result envelope with byte offsets on failure for actionable diagnostics.
 *
 * Output is `JsonValue` — a closed sum type the caller narrows structurally.
 *
 * @module @baohaus/bao-json-safe/parse
 */

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };

export type ParseOutcome =
  | { readonly ok: true; readonly value: JsonValue }
  | { readonly ok: false; readonly reason: string; readonly offset: number };

interface Cursor {
  readonly text: string;
  pos: number;
}

const CHAR_SPACE = 0x20;
const CHAR_TAB = 0x09;
const CHAR_LF = 0x0a;
const CHAR_CR = 0x0d;
const CHAR_QUOTE = 0x22;
const CHAR_BACKSLASH = 0x5c;
const CHAR_LBRACE = 0x7b;
const CHAR_RBRACE = 0x7d;
const CHAR_LBRACKET = 0x5b;
const CHAR_RBRACKET = 0x5d;
const CHAR_COMMA = 0x2c;
const CHAR_COLON = 0x3a;
const CHAR_MINUS = 0x2d;
const CHAR_PLUS = 0x2b;
const CHAR_DOT = 0x2e;
const CHAR_0 = 0x30;
const CHAR_9 = 0x39;
const CHAR_E_LOWER = 0x65;
const CHAR_E_UPPER = 0x45;

export function parseJsonSafe(text: string): ParseOutcome {
  const cursor: Cursor = { text, pos: 0 };
  skipWs(cursor);
  const valueOutcome = parseValue(cursor);
  if (!valueOutcome.ok) {
    return valueOutcome;
  }
  skipWs(cursor);
  if (cursor.pos !== text.length) {
    return { ok: false, reason: `unexpected trailing data`, offset: cursor.pos };
  }
  return valueOutcome;
}

function skipWs(c: Cursor): void {
  while (c.pos < c.text.length) {
    const ch = c.text.charCodeAt(c.pos);
    if (ch === CHAR_SPACE || ch === CHAR_TAB || ch === CHAR_LF || ch === CHAR_CR) {
      c.pos++;
      continue;
    }
    return;
  }
}

function parseValue(c: Cursor): ParseOutcome {
  if (c.pos >= c.text.length) {
    return { ok: false, reason: "unexpected end of input", offset: c.pos };
  }
  const ch = c.text.charCodeAt(c.pos);
  if (ch === CHAR_LBRACE) return parseObject(c);
  if (ch === CHAR_LBRACKET) return parseArray(c);
  if (ch === CHAR_QUOTE) return parseString(c);
  if (ch === CHAR_MINUS || (ch >= CHAR_0 && ch <= CHAR_9)) return parseNumber(c);
  if (matchKeyword(c, "true")) return { ok: true, value: true };
  if (matchKeyword(c, "false")) return { ok: true, value: false };
  if (matchKeyword(c, "null")) return { ok: true, value: null };
  return { ok: false, reason: `unexpected token`, offset: c.pos };
}

function matchKeyword(c: Cursor, keyword: string): boolean {
  if (c.text.startsWith(keyword, c.pos)) {
    c.pos += keyword.length;
    return true;
  }
  return false;
}

function parseObject(c: Cursor): ParseOutcome {
  c.pos++; // consume '{'
  const result: Record<string, JsonValue> = {};
  skipWs(c);
  if (c.text.charCodeAt(c.pos) === CHAR_RBRACE) {
    c.pos++;
    return { ok: true, value: result };
  }
  for (;;) {
    skipWs(c);
    if (c.text.charCodeAt(c.pos) !== CHAR_QUOTE) {
      return { ok: false, reason: "expected string key in object", offset: c.pos };
    }
    const keyOutcome = parseString(c);
    if (!keyOutcome.ok) return keyOutcome;
    if (typeof keyOutcome.value !== "string") {
      return { ok: false, reason: "object key not a string", offset: c.pos };
    }
    skipWs(c);
    if (c.text.charCodeAt(c.pos) !== CHAR_COLON) {
      return { ok: false, reason: "expected ':' after object key", offset: c.pos };
    }
    c.pos++;
    skipWs(c);
    const valueOutcome = parseValue(c);
    if (!valueOutcome.ok) return valueOutcome;
    result[keyOutcome.value] = valueOutcome.value;
    skipWs(c);
    const next = c.text.charCodeAt(c.pos);
    if (next === CHAR_COMMA) {
      c.pos++;
      continue;
    }
    if (next === CHAR_RBRACE) {
      c.pos++;
      return { ok: true, value: result };
    }
    return { ok: false, reason: "expected ',' or '}' in object", offset: c.pos };
  }
}

function parseArray(c: Cursor): ParseOutcome {
  c.pos++; // consume '['
  const result: JsonValue[] = [];
  skipWs(c);
  if (c.text.charCodeAt(c.pos) === CHAR_RBRACKET) {
    c.pos++;
    return { ok: true, value: result };
  }
  for (;;) {
    skipWs(c);
    const valueOutcome = parseValue(c);
    if (!valueOutcome.ok) return valueOutcome;
    result.push(valueOutcome.value);
    skipWs(c);
    const next = c.text.charCodeAt(c.pos);
    if (next === CHAR_COMMA) {
      c.pos++;
      continue;
    }
    if (next === CHAR_RBRACKET) {
      c.pos++;
      return { ok: true, value: result };
    }
    return { ok: false, reason: "expected ',' or ']' in array", offset: c.pos };
  }
}

function parseString(c: Cursor): ParseOutcome {
  if (c.text.charCodeAt(c.pos) !== CHAR_QUOTE) {
    return { ok: false, reason: "expected '\"'", offset: c.pos };
  }
  c.pos++;
  const start = c.pos;
  let result = "";
  let chunkStart = start;
  while (c.pos < c.text.length) {
    const ch = c.text.charCodeAt(c.pos);
    if (ch === CHAR_QUOTE) {
      result += c.text.slice(chunkStart, c.pos);
      c.pos++;
      return { ok: true, value: result };
    }
    if (ch === CHAR_BACKSLASH) {
      result += c.text.slice(chunkStart, c.pos);
      c.pos++;
      const escaped = parseEscape(c);
      if (!escaped.ok) return escaped;
      result += escaped.value;
      chunkStart = c.pos;
      continue;
    }
    if (ch < 0x20) {
      return { ok: false, reason: "control character in string", offset: c.pos };
    }
    c.pos++;
  }
  return { ok: false, reason: "unterminated string", offset: c.pos };
}

function parseEscape(
  c: Cursor,
):
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly reason: string; readonly offset: number } {
  if (c.pos >= c.text.length) {
    return { ok: false, reason: "unterminated escape", offset: c.pos };
  }
  const ch = c.text.charCodeAt(c.pos);
  c.pos++;
  switch (ch) {
    case 0x22:
      return { ok: true, value: '"' };
    case 0x5c:
      return { ok: true, value: "\\" };
    case 0x2f:
      return { ok: true, value: "/" };
    case 0x62:
      return { ok: true, value: "\b" };
    case 0x66:
      return { ok: true, value: "\f" };
    case 0x6e:
      return { ok: true, value: "\n" };
    case 0x72:
      return { ok: true, value: "\r" };
    case 0x74:
      return { ok: true, value: "\t" };
    case 0x75:
      return parseUnicodeEscape(c);
    default:
      return {
        ok: false,
        reason: `invalid escape \\${String.fromCharCode(ch)}`,
        offset: c.pos - 1,
      };
  }
}

function parseUnicodeEscape(
  c: Cursor,
):
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly reason: string; readonly offset: number } {
  if (c.pos + 4 > c.text.length) {
    return { ok: false, reason: "truncated \\u escape", offset: c.pos };
  }
  const hex = c.text.slice(c.pos, c.pos + 4);
  if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
    return { ok: false, reason: `invalid \\u${hex}`, offset: c.pos };
  }
  c.pos += 4;
  return { ok: true, value: String.fromCharCode(Number.parseInt(hex, 16)) };
}

function parseNumber(c: Cursor): ParseOutcome {
  const start = c.pos;
  if (c.text.charCodeAt(c.pos) === CHAR_MINUS) c.pos++;
  if (!isDigit(c.text.charCodeAt(c.pos))) {
    return { ok: false, reason: "expected digit", offset: c.pos };
  }
  if (c.text.charCodeAt(c.pos) === CHAR_0) {
    c.pos++;
  } else {
    while (isDigit(c.text.charCodeAt(c.pos))) c.pos++;
  }
  if (c.text.charCodeAt(c.pos) === CHAR_DOT) {
    c.pos++;
    if (!isDigit(c.text.charCodeAt(c.pos))) {
      return { ok: false, reason: "expected fraction digit", offset: c.pos };
    }
    while (isDigit(c.text.charCodeAt(c.pos))) c.pos++;
  }
  const exp = c.text.charCodeAt(c.pos);
  if (exp === CHAR_E_LOWER || exp === CHAR_E_UPPER) {
    c.pos++;
    const sign = c.text.charCodeAt(c.pos);
    if (sign === CHAR_PLUS || sign === CHAR_MINUS) c.pos++;
    if (!isDigit(c.text.charCodeAt(c.pos))) {
      return { ok: false, reason: "expected exponent digit", offset: c.pos };
    }
    while (isDigit(c.text.charCodeAt(c.pos))) c.pos++;
  }
  const slice = c.text.slice(start, c.pos);
  const value = Number(slice);
  if (!Number.isFinite(value)) {
    return { ok: false, reason: `non-finite number ${slice}`, offset: start };
  }
  return { ok: true, value };
}

function isDigit(ch: number): boolean {
  return ch >= CHAR_0 && ch <= CHAR_9;
}
