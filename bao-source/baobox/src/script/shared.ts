import type { TSchema } from "../type/base-types.js";
import { Ref } from "../type/combinator-core.js";
import {
  Any,
  BigInt as BigIntSchema,
  Boolean as BooleanSchema,
  Date as DateSchema,
  Integer,
  Never,
  Null,
  Number as NumberSchema,
  String as StringSchema,
  Symbol as SymbolSchema,
  Uint8Array as Uint8ArraySchema,
  Undefined,
  Unknown,
  Void,
} from "../type/primitives.js";

const IDENTIFIER_RE: RegExp = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;

export type ScriptDefinitions = Record<string, TSchema>;

export interface ParseResult {
  schema: TSchema;
  rest: string;
}

export type ScriptParser = (input: string, defs: ScriptDefinitions) => TSchema;

export function parseIdentifier(input: string): string | null {
  const match = IDENTIFIER_RE.exec(input);
  return match ? match[0] : null;
}

export function resolveType(name: string, defs: ScriptDefinitions): TSchema {
  const definition = defs[name];
  switch (name) {
    case "string":
      return StringSchema();
    case "number":
      return NumberSchema();
    case "integer":
      return Integer();
    case "boolean":
      return BooleanSchema();
    case "null":
      return Null();
    case "undefined":
      return Undefined();
    case "void":
      return Void();
    case "unknown":
      return Unknown();
    case "any":
      return Any();
    case "never":
      return Never();
    case "bigint":
      return BigIntSchema();
    case "symbol":
      return SymbolSchema();
    case "Date":
      return DateSchema();
    case "Uint8Array":
      return Uint8ArraySchema();
    default:
      return definition ?? Ref(name);
  }
}

export function findMatchingParen(input: string): string {
  return findMatching(input, "(", ")");
}

export function findMatchingBrace(input: string): string {
  return findMatching(input, "{", "}");
}

export function findMatchingBracket(input: string): string {
  return findMatching(input, "[", "]");
}

export function findMatchingAngle(input: string): string {
  return findMatching(input, "<", ">");
}

function findMatching(input: string, open: string, close: string): string {
  let depth = 0;
  let index = 0;
  while (index < input.length) {
    const character = input[index];
    if (character === open) {
      depth += 1;
    }
    if (character === close) {
      depth -= 1;
      if (depth === 0) {
        return input.slice(1, index);
      }
    }
    index += 1;
  }
  return input.slice(1);
}

export function splitTopLevel(input: string, delimiter: string): string[] {
  const result: string[] = [];
  let depth = 0;
  let current = "";

  for (const character of input) {
    if (character === "(" || character === "{" || character === "[" || character === "<") {
      depth += 1;
    }
    if (character === ")" || character === "}" || character === "]" || character === ">") {
      depth -= 1;
    }

    if (character === delimiter && depth === 0) {
      result.push(current);
      current = "";
      continue;
    }
    current += character;
  }

  if (current.trim().length > 0) {
    result.push(current);
  }
  return result;
}
