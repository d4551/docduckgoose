import type { TSchema } from "../type/base-types.js";
import { Exclude, Extract, Omit, Partial, Pick, Required } from "../type/combinator-objects.js";
import { Array as ArraySchema, Record as RecordSchema } from "../type/containers.js";
import type { TObject } from "../type/containers-types.js";
import {
  AsyncIterator as AsyncIteratorSchema,
  Iterator,
  Promise as PromiseSchema,
  String as StringSchema,
  Unknown,
} from "../type/primitives.js";
import {
  findMatchingAngle,
  type ParseResult,
  resolveType,
  type ScriptDefinitions,
  type ScriptParser,
  splitTopLevel,
} from "./shared.js";

function isObjectSchema(schema: TSchema): schema is TObject {
  return schema["~kind"] === "Object";
}

function getLiteralString(schema: TSchema): string {
  if (schema["~kind"] !== "Literal") {
    return "";
  }
  const literal = schema as TSchema & { const?: string };
  return typeof literal.const === "string" ? literal.const : "";
}

type GenericHandler = (arguments_: TSchema[], rest: string) => ParseResult;

function resolveUnaryArgument(arguments_: TSchema[]): TSchema {
  return arguments_[0] ?? Unknown();
}

function resolveBinaryArguments(arguments_: TSchema[]): [TSchema, TSchema] {
  return [arguments_[0] ?? Unknown(), arguments_[1] ?? Unknown()];
}

function createUnaryHandler(factory: (argument: TSchema) => TSchema): GenericHandler {
  return (arguments_, rest) => ({
    schema: factory(resolveUnaryArgument(arguments_)),
    rest,
  });
}

function createBinaryHandler(factory: (left: TSchema, right: TSchema) => TSchema): GenericHandler {
  return (arguments_, rest) => {
    const [left, right] = resolveBinaryArguments(arguments_);
    return { schema: factory(left, right), rest };
  };
}

function createObjectTransformHandler(factory: (object: TObject) => TSchema): GenericHandler {
  return (arguments_, rest) => {
    const object = arguments_[0];
    return {
      schema:
        object !== undefined && isObjectSchema(object) ? factory(object) : (object ?? Unknown()),
      rest,
    };
  };
}

function createObjectKeyTransformHandler(
  factory: (object: TObject, keys: string[]) => TSchema,
): GenericHandler {
  return (arguments_, rest) => {
    const object = arguments_[0];
    const keys = arguments_.slice(1).map(getLiteralString);
    return {
      schema:
        object !== undefined && isObjectSchema(object)
          ? factory(object, keys)
          : (object ?? Unknown()),
      rest,
    };
  };
}

const GENERIC_HANDLERS: Record<string, GenericHandler> = {
  Array: createUnaryHandler((argument) => ArraySchema(argument)),
  AsyncIterator: createUnaryHandler((argument) => AsyncIteratorSchema(argument)),
  Exclude: createBinaryHandler((left, right) => Exclude(left, right)),
  Extract: createBinaryHandler((left, right) => Extract(left, right)),
  Iterator: createUnaryHandler((argument) => Iterator(argument)),
  Omit: createObjectKeyTransformHandler((object, keys) => Omit(object, keys)),
  Partial: createObjectTransformHandler((object) => Partial(object)),
  Pick: createObjectKeyTransformHandler((object, keys) => Pick(object, keys)),
  Promise: createUnaryHandler((argument) => PromiseSchema(argument)),
  Record: (arguments_, rest) => ({
    schema: RecordSchema(arguments_[0] ?? StringSchema(), arguments_[1] ?? Unknown()),
    rest,
  }),
  Required: createObjectTransformHandler((object) => Required(object)),
};

export function parseGeneric(
  name: string,
  rest: string,
  defs: ScriptDefinitions,
  parseScript: ScriptParser,
): ParseResult {
  const argumentSource = findMatchingAngle(rest);
  const arguments_ = splitTopLevel(argumentSource, ",").map((entry) =>
    parseScript(entry.trim(), defs),
  );
  const afterArguments = rest.slice(argumentSource.length + 2).trim();
  const handler = GENERIC_HANDLERS[name];
  return handler
    ? handler(arguments_, afterArguments)
    : { schema: resolveType(name, defs), rest: afterArguments };
}
