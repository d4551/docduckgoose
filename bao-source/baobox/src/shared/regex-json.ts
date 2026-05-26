const HEX_DIGIT_RE: RegExp = /^[0-9a-fA-F]$/;
/** Offset after \u prefix in unicode escape sequence. */
const UNICODE_ESCAPE_START = 2;
/** Total length of \uXXXX unicode escape. */
const UNICODE_ESCAPE_LENGTH = 6;

function isAsciiDigit(value: string): boolean {
  return value >= "0" && value <= "9";
}

function consumeRegexQuantifier(pattern: string, start: number): number {
  let index = start;
  const first = pattern[index];
  if (first === undefined || !isAsciiDigit(first)) {
    return -1;
  }
  while (index < pattern.length) {
    const character = pattern[index];
    if (character === undefined || !isAsciiDigit(character)) {
      break;
    }
    index += 1;
  }
  if (pattern[index] === ",") {
    index += 1;
    while (index < pattern.length) {
      const character = pattern[index];
      if (character === undefined || !isAsciiDigit(character)) {
        break;
      }
      index += 1;
    }
  }
  return pattern[index] === "}" ? index : -1;
}

interface RegexState {
  escaped: boolean;
  inCharacterClass: boolean;
  groupDepth: number;
  hasToken: boolean;
  groupPrefixAllowed: boolean;
}

/** @internal Check if a string is a valid regular expression */
export function isValidRegex(value: string): boolean {
  const state: RegexState = {
    escaped: false,
    inCharacterClass: false,
    groupDepth: 0,
    hasToken: false,
    groupPrefixAllowed: false,
  };

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === undefined) {
      return false;
    }
    if (consumeEscapedRegexCharacter(state)) {
      continue;
    }
    if (character === "\\") {
      state.escaped = true;
      continue;
    }
    if (consumeCharacterClassCharacter(state, character)) {
      continue;
    }
    if (consumeGroupPrefix(state, character)) {
      continue;
    }
    state.groupPrefixAllowed = false;
    const nextIndex = handleRegexCharacter(value, index, character, state);
    if (nextIndex < 0) {
      return false;
    }
    index = nextIndex;
  }

  return !(state.escaped || state.inCharacterClass) && state.groupDepth === 0;
}

interface JsonState {
  index: number;
  text: string;
}

function skipWhitespace(state: JsonState): void {
  while (state.index < state.text.length) {
    const character = state.text[state.index];
    if (character !== " " && character !== "\n" && character !== "\r" && character !== "\t") {
      break;
    }
    state.index += 1;
  }
}

function consumeLiteral(state: JsonState, literal: string): boolean {
  if (state.text.slice(state.index, state.index + literal.length) !== literal) {
    return false;
  }
  state.index += literal.length;
  return true;
}

function consumeEscapedRegexCharacter(state: RegexState): boolean {
  if (!state.escaped) {
    return false;
  }
  state.escaped = false;
  state.hasToken = true;
  state.groupPrefixAllowed = false;
  return true;
}

function consumeCharacterClassCharacter(state: RegexState, character: string): boolean {
  if (!state.inCharacterClass) {
    return false;
  }
  if (character === "]") {
    state.inCharacterClass = false;
    state.hasToken = true;
  }
  return true;
}

function consumeGroupPrefix(state: RegexState, character: string): boolean {
  if (!state.groupPrefixAllowed || character !== "?") {
    return false;
  }
  state.groupPrefixAllowed = false;
  return true;
}

function handleRegexCharacter(
  value: string,
  index: number,
  character: string,
  state: RegexState,
): number {
  switch (character) {
    case "[":
      state.inCharacterClass = true;
      state.hasToken = true;
      return index;
    case "(":
      state.groupDepth += 1;
      state.hasToken = false;
      state.groupPrefixAllowed = true;
      return index;
    case ")":
      if (state.groupDepth === 0) {
        return -1;
      }
      state.groupDepth -= 1;
      state.hasToken = true;
      return index;
    case "{":
      return handleRegexQuantifier(value, index, state);
    case "*":
    case "+":
    case "?":
      return handleRegexOperator(index, state);
    case "]":
    case "}":
      return -1;
    case "|":
      state.hasToken = false;
      return index;
    default:
      state.hasToken = true;
      return index;
  }
}

function handleRegexQuantifier(value: string, index: number, state: RegexState): number {
  if (!state.hasToken) {
    return -1;
  }
  const quantifierEnd = consumeRegexQuantifier(value, index + 1);
  if (quantifierEnd < 0) {
    return -1;
  }
  state.hasToken = true;
  return quantifierEnd;
}

function handleRegexOperator(index: number, state: RegexState): number {
  if (!state.hasToken) {
    return -1;
  }
  state.hasToken = true;
  return index;
}

function isHexDigit(value: string): boolean {
  return HEX_DIGIT_RE.test(value);
}

function consumeUnicodeEscape(text: string, index: number): number {
  for (let offset = UNICODE_ESCAPE_START; offset < UNICODE_ESCAPE_LENGTH; offset += 1) {
    const hex = text[index + offset];
    if (hex === undefined || !isHexDigit(hex)) {
      return -1;
    }
  }
  return index + UNICODE_ESCAPE_LENGTH;
}

function consumeSimpleEscape(text: string, index: number): number {
  const escapeCharacter = text[index + 1];
  if (escapeCharacter === undefined || !'"\\/bfnrt'.includes(escapeCharacter)) {
    return -1;
  }
  return index + 2;
}

function consumeEscapedJsonCharacter(text: string, index: number): number {
  const escapeCharacter = text[index + 1];
  if (escapeCharacter === undefined) {
    return -1;
  }
  return escapeCharacter === "u"
    ? consumeUnicodeEscape(text, index)
    : consumeSimpleEscape(text, index);
}

function isValidJsonStringCharacter(character: string): boolean {
  return character >= " ";
}

function parseString(state: JsonState): boolean {
  if (state.text[state.index] !== '"') {
    return false;
  }
  state.index += 1;
  while (state.index < state.text.length) {
    const character = state.text[state.index];
    if (character === undefined) {
      return false;
    }
    if (character === '"') {
      state.index += 1;
      return true;
    }
    if (character === "\\") {
      const nextIndex = consumeEscapedJsonCharacter(state.text, state.index);
      if (nextIndex < 0) {
        return false;
      }
      state.index = nextIndex;
      continue;
    }
    if (!isValidJsonStringCharacter(character)) {
      return false;
    }
    state.index += 1;
  }
  return false;
}

function parseNumber(state: JsonState): boolean {
  const start = state.index;
  consumeNumberSign(state);
  if (!consumeIntegerDigits(state)) {
    return false;
  }
  if (!consumeFractionDigits(state)) {
    return false;
  }
  if (!consumeExponentDigits(state)) {
    return false;
  }
  return state.index > start;
}

function parseArray(state: JsonState): boolean {
  if (state.text[state.index] !== "[") {
    return false;
  }
  state.index += 1;
  skipWhitespace(state);
  if (state.text[state.index] === "]") {
    state.index += 1;
    return true;
  }
  while (state.index < state.text.length) {
    if (!parseValue(state)) {
      return false;
    }
    skipWhitespace(state);
    const separator = state.text[state.index];
    if (separator === ",") {
      state.index += 1;
      skipWhitespace(state);
      continue;
    }
    if (separator === "]") {
      state.index += 1;
      return true;
    }
    return false;
  }
  return false;
}

function parseObject(state: JsonState): boolean {
  if (state.text[state.index] !== "{") {
    return false;
  }
  state.index += 1;
  skipWhitespace(state);
  if (state.text[state.index] === "}") {
    state.index += 1;
    return true;
  }
  while (state.index < state.text.length) {
    if (!parseString(state)) {
      return false;
    }
    skipWhitespace(state);
    if (state.text[state.index] !== ":") {
      return false;
    }
    state.index += 1;
    if (!parseValue(state)) {
      return false;
    }
    skipWhitespace(state);
    const separator = state.text[state.index];
    if (separator === ",") {
      state.index += 1;
      skipWhitespace(state);
      continue;
    }
    if (separator === "}") {
      state.index += 1;
      return true;
    }
    return false;
  }
  return false;
}

function parseValue(state: JsonState): boolean {
  skipWhitespace(state);
  const character = state.text[state.index];
  switch (character) {
    case '"':
      return parseString(state);
    case "{":
      return parseObject(state);
    case "[":
      return parseArray(state);
    case "t":
      return consumeLiteral(state, "true");
    case "f":
      return consumeLiteral(state, "false");
    case "n":
      return consumeLiteral(state, "null");
    default:
      return character === "-" || (character !== undefined && isAsciiDigit(character))
        ? parseNumber(state)
        : false;
  }
}

/** @internal Check if a string is valid JSON */
export function isValidJson(value: string): boolean {
  const state: JsonState = { index: 0, text: value };
  if (!parseValue(state)) {
    return false;
  }
  skipWhitespace(state);
  return state.index === state.text.length;
}

function consumeNumberSign(state: JsonState): void {
  if (state.text[state.index] === "-") {
    state.index += 1;
  }
}

function consumeIntegerDigits(state: JsonState): boolean {
  const firstDigit = state.text[state.index];
  if (firstDigit === undefined || !isAsciiDigit(firstDigit)) {
    return false;
  }
  if (firstDigit === "0") {
    state.index += 1;
    return true;
  }
  consumeDigitRun(state);
  return true;
}

function consumeFractionDigits(state: JsonState): boolean {
  if (state.text[state.index] !== ".") {
    return true;
  }
  state.index += 1;
  return consumeRequiredDigitRun(state);
}

function consumeExponentDigits(state: JsonState): boolean {
  const exponent = state.text[state.index];
  if (exponent !== "e" && exponent !== "E") {
    return true;
  }
  state.index += 1;
  const sign = state.text[state.index];
  if (sign === "+" || sign === "-") {
    state.index += 1;
  }
  return consumeRequiredDigitRun(state);
}

function consumeRequiredDigitRun(state: JsonState): boolean {
  const digit = state.text[state.index];
  if (digit === undefined || !isAsciiDigit(digit)) {
    return false;
  }
  consumeDigitRun(state);
  return true;
}

function consumeDigitRun(state: JsonState): void {
  while (state.index < state.text.length) {
    const digit = state.text[state.index];
    if (digit === undefined || !isAsciiDigit(digit)) {
      return;
    }
    state.index += 1;
  }
}
