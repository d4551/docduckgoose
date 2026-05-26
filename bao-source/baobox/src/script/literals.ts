import type { TSchema } from "../type/base-types.js";
import { Optional } from "../type/combinator-core.js";
import { Object as ObjectSchema, Tuple } from "../type/containers.js";
import { Literal } from "../type/primitives.js";
import {
  findMatchingBrace,
  findMatchingBracket,
  type ParseResult,
  type ScriptDefinitions,
  type ScriptParser,
  splitTopLevel,
} from "./shared.js";

const OPTIONAL_PROP_RE: RegExp = /^(\w+)\?\s*:\s*(.+)$/;
const REQUIRED_PROP_RE: RegExp = /^(\w+)\s*:\s*(.+)$/;

export function parseObjectLiteral(
  input: string,
  defs: ScriptDefinitions,
  parseScript: ScriptParser,
): ParseResult {
  const body = findMatchingBrace(input);
  const entries = splitTopLevel(body, ";").filter((entry) => entry.trim().length > 0);
  const properties: Record<string, TSchema> = {};

  for (const entry of entries) {
    const parsedEntry = parseObjectLiteralEntry(entry, defs, parseScript);
    if (!parsedEntry) {
      continue;
    }
    properties[parsedEntry.key] = parsedEntry.schema;
  }

  return {
    schema: ObjectSchema(properties),
    rest: input.slice(body.length + 2).trim(),
  };
}

export function parseTupleLiteral(
  input: string,
  defs: ScriptDefinitions,
  parseScript: ScriptParser,
): ParseResult {
  const body = findMatchingBracket(input);
  const elements = splitTopLevel(body, ",").filter((entry) => entry.trim().length > 0);
  const items = elements.map((entry) => parseScript(entry.trim(), defs));
  return {
    schema: Tuple(items),
    rest: input.slice(body.length + 2).trim(),
  };
}

export function parseStringLiteral(input: string): ParseResult {
  const quote = input.charAt(0);
  let index = 1;
  while (index < input.length && input[index] !== quote) {
    if (input[index] === "\\") {
      index += 1;
    }
    index += 1;
  }
  return {
    schema: Literal(input.slice(1, index)),
    rest: input.slice(index + 1).trim(),
  };
}

interface ParsedObjectLiteralEntry {
  key: string;
  schema: TSchema;
}

function parseObjectLiteralEntry(
  entry: string,
  defs: ScriptDefinitions,
  parseScript: ScriptParser,
): ParsedObjectLiteralEntry | null {
  const trimmed = entry.trim();
  const optionalMatch = OPTIONAL_PROP_RE.exec(trimmed);
  const optionalKey = optionalMatch?.[1];
  const optionalType = optionalMatch?.[2]?.trim();
  if (optionalKey && optionalType) {
    return {
      key: optionalKey,
      schema: Optional(parseScript(optionalType, defs)),
    };
  }

  const requiredMatch = REQUIRED_PROP_RE.exec(trimmed);
  const requiredKey = requiredMatch?.[1];
  const requiredType = requiredMatch?.[2]?.trim();
  if (!(requiredKey && requiredType)) {
    return null;
  }

  return {
    key: requiredKey,
    schema: parseScript(requiredType, defs),
  };
}
