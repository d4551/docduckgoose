import type { TSchema } from "./base-types.js";
import { Ref, Union } from "./combinator-core.js";
import { Record as TypeRecord } from "./containers.js";
import type { TRecord } from "./containers-types.js";
import {
  Literal,
  BigInt as TypeBigInt,
  Integer as TypeInteger,
  Number as TypeNumber,
  String as TypeString,
  TemplateLiteral as TypeTemplateLiteral,
} from "./primitives.js";
import {
  BigIntPattern,
  IntegerKey,
  IntegerPattern,
  NeverPattern,
  NumberKey,
  NumberPattern,
  StringKey,
  StringPattern,
} from "./root-constants.js";
import { escapePattern, getKind, getLiteralConst, stripAnchors } from "./root-shared.js";

const TEMPLATE_INTEGER_RE: RegExp = /^-?\d+$/;
const TEMPLATE_FLOAT_RE: RegExp = /^-?\d+\.\d+$/;
const LITERAL_SPECIAL_CHARS_RE: RegExp = /[()[\]{}+*?]/;
const ESCAPE_RE: RegExp = /\\(.)/g;
const ALTERNATION_GROUP_RE: RegExp = /^\(([^()]+)\)$/;

function parseTemplateExpression(expression: string): TSchema {
  const trimmed = expression.trim();
  if (trimmed.includes("|")) {
    return Union(trimmed.split("|").map((entry) => parseTemplateExpression(entry)));
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return Literal(trimmed.slice(1, -1));
  }
  if (trimmed === "string") {
    return TypeString();
  }
  if (trimmed === "number") {
    return TypeNumber();
  }
  if (trimmed === "integer") {
    return TypeInteger();
  }
  if (trimmed === "bigint") {
    return TypeBigInt();
  }
  if (trimmed === "true") {
    return Literal(true);
  }
  if (trimmed === "false") {
    return Literal(false);
  }
  if (TEMPLATE_INTEGER_RE.test(trimmed)) {
    return Literal(globalThis.Number.parseInt(trimmed, 10));
  }
  if (TEMPLATE_FLOAT_RE.test(trimmed)) {
    return Literal(globalThis.Number.parseFloat(trimmed));
  }
  return Ref(trimmed);
}

interface ParsedTemplateSegment {
  nextIndex: number;
  schema: TSchema;
}

function parseTemplateSegment(template: string, startIndex: number): ParsedTemplateSegment {
  let depth = 1;
  let cursor = startIndex + 2;
  while (cursor < template.length && depth > 0) {
    const inner = template[cursor];
    if (inner === undefined) {
      break;
    }
    if (inner === "{") {
      depth += 1;
    }
    if (inner === "}") {
      depth -= 1;
    }
    cursor += 1;
  }
  return {
    nextIndex: cursor,
    schema: parseTemplateExpression(template.slice(startIndex + 2, cursor - 1)),
  };
}

function getOnlyPattern(patterns: readonly string[], fallback: string): string {
  return patterns[0] ?? fallback;
}

export function TemplateLiteralCreate(pattern: string): TSchema {
  return TypeTemplateLiteral([pattern]);
}

export function ParseTemplateIntoTypes(template: string): TSchema[] {
  const result: TSchema[] = [];
  let index = 0;
  let current = "";

  while (index < template.length) {
    const character = template[index];
    if (character === undefined) {
      break;
    }
    if (character === "$" && template[index + 1] === "{") {
      if (current.length > 0) {
        result.push(Literal(current));
        current = "";
      }
      const segment = parseTemplateSegment(template, index);
      result.push(segment.schema);
      index = segment.nextIndex;
      continue;
    }
    current += character;
    index += 1;
  }

  if (current.length > 0 || result.length === 0) {
    result.push(Literal(current));
  }
  return result;
}

function encodeUnionPattern(variants: TSchema[]): string {
  return `(${variants.map((variant) => encodeTypePattern(variant)).join("|")})`;
}

function encodeTypePattern(type: TSchema): string {
  const literal = getLiteralConst(type);
  if (literal !== undefined) {
    return escapePattern(globalThis.String(literal));
  }
  switch (getKind(type)) {
    case "String":
      return StringPattern;
    case "Number":
      return NumberPattern;
    case "Integer":
      return IntegerPattern;
    case "BigInt":
      return BigIntPattern;
    case "Boolean":
      return "(false|true)";
    case "Enum":
      return encodeUnionPattern(
        (type as TSchema & { values: string[] }).values.map((value) => Literal(value)),
      );
    case "Union":
      return encodeUnionPattern((type as TSchema & { variants: TSchema[] }).variants);
    case "TemplateLiteral": {
      const patterns = (type as TSchema & { patterns: string[] }).patterns.map((pattern) =>
        stripAnchors(pattern),
      );
      return patterns.length === 1
        ? getOnlyPattern(patterns, NeverPattern)
        : `(${patterns.join("|")})`;
    }
    default:
      return NeverPattern;
  }
}

export function TemplateLiteralEncode(types: TSchema[]): TSchema {
  return TemplateLiteralCreate(`^${types.map((type) => encodeTypePattern(type)).join("")}$`);
}

function decodeLiteralPattern(pattern: string): string | undefined {
  if (pattern.length === 0 || LITERAL_SPECIAL_CHARS_RE.test(pattern) || pattern.includes("|")) {
    return;
  }
  return pattern.replace(ESCAPE_RE, "$1");
}

function decodeAlternationPattern(pattern: string): string[] | undefined {
  const match = ALTERNATION_GROUP_RE.exec(pattern);
  if (!match) {
    return;
  }
  const group = match[1];
  if (group === undefined) {
    return;
  }
  const parts = group.split("|").map((entry) => decodeLiteralPattern(entry));
  return parts.every((entry) => entry !== undefined) ? (parts as string[]) : undefined;
}

export function TemplateLiteralDecodeUnsafe(pattern: string): TSchema {
  const inner = stripAnchors(pattern);
  if (inner === StringPattern) {
    return TypeString();
  }
  if (inner === NumberPattern) {
    return TypeNumber();
  }
  if (inner === IntegerPattern) {
    return TypeInteger();
  }
  if (inner === BigIntPattern) {
    return TypeBigInt();
  }
  if (inner === "(false|true)") {
    return Union([Literal("false"), Literal("true")]);
  }

  const alternates = decodeAlternationPattern(inner);
  if (alternates) {
    return Union(alternates.map((value) => Literal(value)));
  }

  const literal = decodeLiteralPattern(inner);
  if (literal !== undefined) {
    return Literal(literal);
  }

  return TemplateLiteralCreate(pattern);
}

export function TemplateLiteralDecode(pattern: string): TSchema {
  const decoded = TemplateLiteralDecodeUnsafe(pattern);
  return getKind(decoded) === "TemplateLiteral" ? TypeString() : decoded;
}

export function ParsePatternIntoTypes(pattern: string): TSchema[] {
  const decoded = TemplateLiteralDecodeUnsafe(pattern);
  return getKind(decoded) === "Union"
    ? (decoded as TSchema & { variants: TSchema[] }).variants
    : [decoded];
}

export function TemplateLiteralFromTypes(types: TSchema[]): TSchema {
  return TemplateLiteralEncode(types);
}

export function TemplateLiteralFromString(template: string): TSchema {
  return TemplateLiteralFromTypes(ParseTemplateIntoTypes(template));
}

export function RecordConstruct(
  key: TSchema,
  value: TSchema,
  options: Record<string, unknown> = {},
): TRecord<TSchema, TSchema> {
  return TypeRecord(
    key,
    value,
    options as Partial<Omit<TRecord<TSchema, TSchema>, "'~kind' | 'key' | 'value'">>,
  );
}

export function RecordFromPattern(keyPattern: string, value: TSchema): TRecord<TSchema, TSchema> {
  return RecordConstruct(TemplateLiteralDecode(keyPattern), value);
}

export function RecordPattern(type: TRecord<TSchema, TSchema>): string {
  const key = type.key;
  const literal = getLiteralConst(key);
  if (literal !== undefined) {
    return `^${escapePattern(globalThis.String(literal))}$`;
  }
  switch (getKind(key)) {
    case "String":
      return StringKey;
    case "Number":
      return NumberKey;
    case "Integer":
      return IntegerKey;
    case "Enum":
      return `^(${(key as TSchema & { values: string[] }).values.map((value) => escapePattern(value)).join("|")})$`;
    case "TemplateLiteral": {
      const patterns = (key as TSchema & { patterns: string[] }).patterns;
      return patterns.length === 1
        ? getOnlyPattern(patterns, StringKey)
        : `^(${patterns.map((pattern) => stripAnchors(pattern)).join("|")})$`;
    }
    default:
      return StringKey;
  }
}

export function RecordKey(type: TRecord<TSchema, TSchema>): TSchema {
  return type.key;
}

export function RecordValue(type: TRecord<TSchema, TSchema>): TSchema {
  return type.value;
}
