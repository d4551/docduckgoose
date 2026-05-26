/**
 * @baohaus/yaml-bao
 *
 * Bao-native YAML parsing and stringifying.
 * Domain: content
 */

const INTEGER_PATTERN = /^-?(?:0|[1-9]\d*)$/u;
const FLOAT_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/u;
const INLINE_COMMENT_PATTERN = /#[^\n]*$/u;
const YAML_BACKSLASH_PATTERN = /\\/gu;
const YAML_QUOTE_PATTERN = /"/gu;
const YAML_NEWLINE_PATTERN = /\n/gu;
const ANCHOR_PATTERN = /^(?<value>.+?)\s+&(?<anchor>[A-Za-z][\w-]*)$/u;
const ANCHOR_PREFIX_PATTERN = /^&(?<anchor>[A-Za-z][\w-]*)\s+(?<value>.+)$/u;
const TAG_PATTERN = /^(?<tag>![^\s]+)\s+(?<value>.*)$/u;
const ALIAS_PATTERN = /^\*(?<anchor>[A-Za-z][\w-]*)$/u;

interface ParseOptions {
  readonly maxAliasCount?: number;
  readonly customTags?: readonly YamlCustomTag[];
}

interface StringifyOptions {
  readonly indent?: number;
  readonly customTags?: readonly YamlCustomTag[];
}

interface YamlCustomTag {
  readonly tag: string;
  readonly resolve?: (value: string) => unknown;
  readonly identify?: (value: unknown) => boolean;
  readonly stringify?: (value: unknown) => string;
}

interface YamlLine {
  readonly indent: number;
  readonly raw: string;
}

interface ParseState {
  readonly lines: readonly YamlLine[];
  readonly options: ParseOptions;
  readonly anchors: Map<string, unknown>;
  pos: number;
  steps: number;
  aliasCount: number;
}

function guardProgress(state: ParseState): void {
  state.steps += 1;
  if (state.steps > state.lines.length * 50 + 100) {
    const line = state.lines[state.pos];
    throw new Error(
      `YAML parser exceeded progress guard at line ${state.pos}: ${line?.raw ?? "<eof>"}`,
    );
  }
}

function stripComment(line: string): string {
  return line.replace(INLINE_COMMENT_PATTERN, "").trimEnd();
}

function toLines(input: string): readonly YamlLine[] {
  return input.split("\n").map((line) => {
    const stripped = stripComment(line);
    return {
      indent: stripped.length - stripped.trimStart().length,
      raw: stripped.trimStart(),
    };
  });
}

function skipEmpty(state: ParseState): void {
  while (state.pos < state.lines.length && (state.lines[state.pos]?.raw ?? "") === "") {
    guardProgress(state);
    state.pos++;
  }
}

function unquote(value: string): string {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(YAML_NEWLINE_PATTERN, "\n");
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/gu, "'");
  }
  return value;
}

function readAnchoredRawValue(raw: string): { readonly value: string; readonly anchor?: string } {
  const trimmed = raw.trim();
  const prefixMatch = trimmed.match(ANCHOR_PREFIX_PATTERN);
  if (prefixMatch?.groups !== undefined) {
    return {
      value: prefixMatch.groups.value,
      anchor: prefixMatch.groups.anchor,
    };
  }
  const match = trimmed.match(ANCHOR_PATTERN);
  return {
    value: match?.groups?.value ?? raw,
    anchor: match?.groups?.anchor,
  };
}

function resolveAlias(raw: string, state: ParseState): unknown | null {
  const alias = raw.trim().match(ALIAS_PATTERN)?.groups?.anchor;
  if (alias === undefined) {
    return null;
  }
  state.aliasCount += 1;
  if (state.aliasCount > (state.options.maxAliasCount ?? 100)) {
    throw new Error("YAML alias count exceeded maxAliasCount");
  }
  if (!state.anchors.has(alias)) {
    throw new Error(`YAML alias references missing anchor: ${alias}`);
  }
  return state.anchors.get(alias);
}

function resolveCustomTag(raw: string, state: ParseState): unknown | null {
  const match = raw.trim().match(TAG_PATTERN);
  const tag = match?.groups?.tag;
  const value = match?.groups?.value;
  if (tag === undefined || value === undefined) {
    return null;
  }
  const customTag = state.options.customTags?.find((entry) => entry.tag === tag);
  if (customTag?.resolve === undefined) {
    return unquote(value);
  }
  return customTag.resolve(value);
}

function parseScalarCore(raw: string, state: ParseState): unknown {
  const value = raw.trim();
  const alias = resolveAlias(value, state);
  if (alias !== null) {
    return alias;
  }
  const tagged = resolveCustomTag(value, state);
  if (tagged !== null) {
    return tagged;
  }
  if (value === "" || value === "null" || value === "~") {
    return null;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (INTEGER_PATTERN.test(value)) {
    return Number.parseInt(value, 10);
  }
  if (FLOAT_PATTERN.test(value)) {
    return Number.parseFloat(value);
  }
  return unquote(value);
}

function parseScalar(raw: string, state: ParseState): unknown {
  const anchored = readAnchoredRawValue(raw);
  const value = parseScalarCore(anchored.value, state);
  if (anchored.anchor !== undefined) {
    state.anchors.set(anchored.anchor, value);
  }
  return value;
}

function updateDepth(char: string | undefined, depth: number): number {
  if (char === "[" || char === "{") {
    return depth + 1;
  }
  if (char === "]" || char === "}") {
    return depth - 1;
  }
  return depth;
}

function splitFlowItems(input: string): readonly string[] {
  const items: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index <= input.length; index++) {
    const char = index < input.length ? input[index] : ",";
    if (char === "," && depth === 0) {
      const item = input.slice(start, index).trim();
      if (item !== "") {
        items.push(item);
      }
      start = index + 1;
    } else {
      depth = updateDepth(char, depth);
    }
  }
  return items;
}

function parseFlowMapEntry(entry: string, state: ParseState): readonly [string, unknown] {
  const index = entry.indexOf(":");
  if (index === -1) {
    return [unquote(entry.trim()), null];
  }
  return [
    unquote(entry.slice(0, index).trim()),
    parseFlowValue(entry.slice(index + 1).trim(), state),
  ];
}

function parseFlowMap(input: string, state: ParseState): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const entry of splitFlowItems(input)) {
    const [key, value] = parseFlowMapEntry(entry, state);
    result[key] = value;
  }
  return result;
}

function parseFlowValue(raw: string, state: ParseState): unknown {
  const value = raw.trim();
  if (value.startsWith("[") && value.endsWith("]")) {
    return splitFlowItems(value.slice(1, -1)).map((item) => parseFlowValue(item, state));
  }
  if (value.startsWith("{") && value.endsWith("}")) {
    return parseFlowMap(value.slice(1, -1), state);
  }
  return parseScalar(value, state);
}

function parseInlineMapping(value: string, state: ParseState): Record<string, unknown> | null {
  const separator = value.indexOf(":");
  if (separator <= 0) {
    return null;
  }
  const key = unquote(value.slice(0, separator).trim());
  const rawValue = value.slice(separator + 1).trim();
  return { [key]: rawValue === "" ? null : parseFlowValue(rawValue, state) };
}

function parseSequenceItem(state: ParseState, indent: number, value: string): unknown {
  if (value === "") {
    return parseBlock(state, indent + 2);
  }
  const inlineMapping = parseInlineMapping(value, state);
  if (inlineMapping === null) {
    return parseFlowValue(value, state);
  }
  const continuation = parseMapping(state, indent + 2);
  return { ...inlineMapping, ...continuation };
}

function parseSequence(state: ParseState, indent: number): unknown[] {
  const items: unknown[] = [];
  while (state.pos < state.lines.length) {
    guardProgress(state);
    skipEmpty(state);
    const line = state.lines[state.pos];
    if (
      line === undefined ||
      line.indent !== indent ||
      !(line.raw === "-" || line.raw.startsWith("- "))
    ) {
      break;
    }
    state.pos++;
    const value = line.raw.slice(1).trim();
    items.push(parseSequenceItem(state, indent, value));
  }
  return items;
}

function parseMappingValue(value: string, state: ParseState, indent: number): unknown {
  if (value === "") {
    return parseBlock(state, indent + 2);
  }
  return parseFlowValue(value, state);
}

function collectScalarContinuation(value: string, state: ParseState, indent: number): string {
  const parts = [value];
  while (state.pos < state.lines.length) {
    guardProgress(state);
    const next = state.lines[state.pos];
    if (
      next === undefined ||
      next.raw === "" ||
      next.indent <= indent ||
      next.raw.includes(":") ||
      next.raw === "-" ||
      next.raw.startsWith("- ")
    ) {
      break;
    }
    parts.push(next.raw.trim());
    state.pos += 1;
  }
  return parts.join(" ");
}

function parseMapping(state: ParseState, indent: number): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  while (state.pos < state.lines.length) {
    guardProgress(state);
    skipEmpty(state);
    const line = state.lines[state.pos];
    if (line === undefined || line.indent !== indent || !line.raw.includes(":")) {
      break;
    }
    state.pos++;
    const separator = line.raw.indexOf(":");
    const key = unquote(line.raw.slice(0, separator).trim());
    const rawValue = line.raw.slice(separator + 1).trim();
    const value =
      rawValue === "" ? rawValue : collectScalarContinuation(rawValue, state, line.indent);
    result[key] = parseMappingValue(value, state, indent);
  }
  return result;
}

function parseBlock(state: ParseState, _indent: number): unknown {
  skipEmpty(state);
  const line = state.lines[state.pos];
  if (line === undefined) {
    return null;
  }
  if (line.raw === "-" || line.raw.startsWith("- ")) {
    return parseSequence(state, line.indent);
  }
  if (line.raw.startsWith("{") || line.raw.startsWith("[")) {
    state.pos++;
    return parseFlowValue(line.raw, state);
  }
  if (line.raw.includes(":")) {
    return parseMapping(state, line.indent);
  }
  state.pos++;
  return parseFlowValue(line.raw, state);
}

function serializeString(value: string): string {
  if (!(value.includes("\n") || value.includes('"') || value.includes("'"))) {
    return value;
  }
  return `"${value
    .replace(YAML_BACKSLASH_PATTERN, "\\\\")
    .replace(YAML_QUOTE_PATTERN, '\\"')
    .replace(YAML_NEWLINE_PATTERN, "\\n")}"`;
}

function serializeArray(
  value: readonly unknown[],
  depth: number,
  indentSize: number,
  options: StringifyOptions,
): string {
  if (value.length === 0) {
    return "[]";
  }
  const pad = " ".repeat(depth * indentSize);
  return value
    .map((item) => `${pad}- ${serializeYAMLValue(item, depth + 1, indentSize, options)}`)
    .join("\n");
}

function serializeObject(
  value: object,
  depth: number,
  indentSize: number,
  options: StringifyOptions,
): string {
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return "{}";
  }
  const pad = " ".repeat(depth * indentSize);
  return entries
    .map(([key, item]) => {
      const serialized = serializeYAMLValue(item, depth + 1, indentSize, options);
      return serialized.includes("\n")
        ? `${pad}${key}:\n${serialized}`
        : `${pad}${key}: ${serialized}`;
    })
    .join("\n");
}

function serializeCustomTaggedValue(value: unknown, options: StringifyOptions): string | null {
  const customTag = options.customTags?.find((entry) => entry.identify?.(value) === true);
  if (customTag === undefined) {
    return null;
  }
  const serialized =
    customTag.stringify === undefined ? serializeString(String(value)) : customTag.stringify(value);
  return `${customTag.tag} ${serialized}`;
}

function serializeYAMLValue(
  value: unknown,
  depth: number,
  indentSize: number,
  options: StringifyOptions,
): string {
  const tagged = serializeCustomTaggedValue(value, options);
  if (tagged !== null) {
    return tagged;
  }
  if (value === null || value === undefined) {
    return "null";
  }
  if (typeof value === "string") {
    return serializeString(value);
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return serializeArray(value, depth, indentSize, options);
  }
  if (typeof value === "object") {
    return serializeObject(value, depth, indentSize, options);
  }
  return String(value);
}

const PACKAGE_NAME = "@baohaus/yaml-bao" as const;

export function parseYAML(input: string, _options: ParseOptions = {}): unknown {
  const state: ParseState = {
    lines: toLines(input),
    options: _options,
    anchors: new Map(),
    pos: 0,
    steps: 0,
    aliasCount: 0,
  };
  return parseBlock(state, 0);
}

export function stringifyYAML(value: unknown, options: StringifyOptions = {}): string {
  return serializeYAMLValue(value, 0, options.indent ?? 2, options);
}

export type { ParseOptions, StringifyOptions, YamlCustomTag };
export { PACKAGE_NAME, parseYAML as parse, stringifyYAML as stringify };
