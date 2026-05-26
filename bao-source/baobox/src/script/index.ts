import type { TSchema } from "../type/base-types.js";
import { Intersect, Union } from "../type/combinator-core.js";
import { Array as ArraySchema } from "../type/containers.js";
import { Literal, Unknown } from "../type/primitives.js";
import { parseGeneric } from "./generic.js";
import { parseObjectLiteral, parseStringLiteral, parseTupleLiteral } from "./literals.js";
import {
  findMatchingParen,
  type ParseResult,
  parseIdentifier,
  resolveType,
  type ScriptDefinitions,
} from "./shared.js";

const NUMERIC_LITERAL_RE: RegExp = /^(-?\d+(?:\.\d+)?)/;
const UNION_DELIMITER = "|";
const INTERSECTION_DELIMITER = "&";
const ARRAY_SUFFIX = "[]";
const GROUP_START = "(";
const OBJECT_START = "{";
const TUPLE_START = "[";
const TRUE_LITERAL = "true";
const FALSE_LITERAL = "false";

/** Parse a TypeScript-like type expression string into a baobox TSchema */
export function Script(input: string): TSchema {
  return parseScript(input.trim(), {});
}

/** Parse with existing definitions for resolution */
export function ScriptWithDefinitions(input: string, definitions: ScriptDefinitions): TSchema {
  return parseScript(input.trim(), definitions);
}

function parseScript(input: string, defs: ScriptDefinitions): TSchema {
  return parseUnionOrIntersect(input, defs).schema;
}

function parseUnionOrIntersect(input: string, defs: ScriptDefinitions): ParseResult {
  const left = parsePrimary(input, defs);
  let rest = left.rest.trim();

  if (rest.startsWith(UNION_DELIMITER)) {
    const variants: TSchema[] = [left.schema];
    while (rest.startsWith(UNION_DELIMITER)) {
      rest = rest.slice(UNION_DELIMITER.length).trim();
      const next = parsePrimary(rest, defs);
      variants.push(next.schema);
      rest = next.rest.trim();
    }
    return { schema: Union(variants), rest };
  }

  if (rest.startsWith(INTERSECTION_DELIMITER)) {
    const variants: TSchema[] = [left.schema];
    while (rest.startsWith(INTERSECTION_DELIMITER)) {
      rest = rest.slice(INTERSECTION_DELIMITER.length).trim();
      const next = parsePrimary(rest, defs);
      variants.push(next.schema);
      rest = next.rest.trim();
    }
    return { schema: Intersect(variants), rest };
  }

  return left;
}

function parsePrimary(input: string, defs: ScriptDefinitions): ParseResult {
  let result = parseAtom(input, defs);
  let rest = result.rest.trim();

  while (rest.startsWith(ARRAY_SUFFIX)) {
    result = { schema: ArraySchema(result.schema), rest: rest.slice(ARRAY_SUFFIX.length).trim() };
    rest = result.rest;
  }

  return result;
}

function parseAtom(input: string, defs: ScriptDefinitions): ParseResult {
  if (input.startsWith(GROUP_START)) {
    const inner = findMatchingParen(input);
    return {
      schema: parseScript(inner, defs),
      rest: input.slice(inner.length + GROUP_START.length + 1).trim(),
    };
  }

  if (input.startsWith(OBJECT_START)) {
    return parseObjectLiteral(input, defs, parseScript);
  }

  if (input.startsWith(TUPLE_START)) {
    return parseTupleLiteral(input, defs, parseScript);
  }

  if (input.startsWith('"') || input.startsWith("'")) {
    return parseStringLiteral(input);
  }

  const numericLiteral = parseNumericLiteral(input);
  if (numericLiteral) {
    return numericLiteral;
  }

  if (input.startsWith(TRUE_LITERAL)) {
    return { schema: Literal(true), rest: input.slice(TRUE_LITERAL.length).trim() };
  }
  if (input.startsWith(FALSE_LITERAL)) {
    return { schema: Literal(false), rest: input.slice(FALSE_LITERAL.length).trim() };
  }

  const identifier = parseIdentifier(input);
  if (!identifier) {
    return { schema: Unknown(), rest: input };
  }

  const rest = input.slice(identifier.length).trim();
  if (rest.startsWith("<")) {
    return parseGeneric(identifier, rest, defs, parseScript);
  }

  return { schema: resolveType(identifier, defs), rest };
}

function parseNumericLiteral(input: string): ParseResult | null {
  const literal = NUMERIC_LITERAL_RE.exec(input)?.[1];
  if (literal === undefined) {
    return null;
  }
  return {
    schema: Literal(Number.parseFloat(literal)),
    rest: input.slice(literal.length).trim(),
  };
}
