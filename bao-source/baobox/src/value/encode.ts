import type { RuntimeContextArg } from "../shared/runtime-context.js";
import { isCodecShape, isPlainRecord, recordEntries } from "../shared/runtime-guards.js";
import {
  schemaCallbackField,
  schemaDefinitions,
  schemaInner,
  schemaItem,
  schemaKind,
  schemaProperties,
  schemaSchemaField,
  schemaSchemaListField,
  schemaStringField,
  schemaUnknownField,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import { Instantiate } from "../type/instantiation.js";
import type { StaticEncode } from "../type/static-types.js";
import { CheckInternal } from "./check.js";

const NOT_HANDLED = Symbol("encode.not-handled");

/** Run encode callbacks depth-first on a value */
export function Encode<T extends TSchema>(
  schema: T,
  value: unknown,
  context?: RuntimeContextArg,
): StaticEncode<T> {
  return EncodeInternal(schema, value, new Map(), context) as StaticEncode<T>;
}

function resolveCodec(schema: TSchema): { encode: (input: unknown) => unknown } | undefined {
  const codec = schemaUnknownField(schema, "codec");
  return isCodecShape(codec) && typeof codec.encode === "function"
    ? { encode: codec.encode }
    : undefined;
}

function encodeObject(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  if (!isPlainRecord(value)) {
    return value;
  }
  const result: Record<string, unknown> = {};
  const properties = schemaProperties(schema);
  for (const [key, entryValue] of recordEntries(value)) {
    const propertySchema = properties[key];
    result[key] = propertySchema
      ? EncodeInternal(propertySchema, entryValue, refs, checkContext)
      : entryValue;
  }
  return result;
}

function encodeArrayItems(
  itemSchema: TSchema | undefined,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  return Array.isArray(value) && itemSchema
    ? value.map((item) => EncodeInternal(itemSchema, item, refs, checkContext))
    : value;
}

function encodeTupleItems(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  if (!Array.isArray(value)) {
    return value;
  }
  const items = schemaSchemaListField(schema, "items");
  return value.map((item, index) => {
    const itemSchema = items[index];
    return itemSchema ? EncodeInternal(itemSchema, item, refs, checkContext) : item;
  });
}

function encodeWrappedInner(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  const inner = schemaInner(schema) ?? schemaItem(schema);
  return value === undefined || inner === undefined
    ? value
    : EncodeInternal(inner, value, refs, checkContext);
}

function encodeReferenceSchema(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  switch (schemaKind(schema)) {
    case "Call": {
      const instantiated = Instantiate({}, schema);
      return instantiated === schema
        ? value
        : EncodeInternal(instantiated, value, refs, checkContext);
    }
    case "Cyclic": {
      const defs = schemaDefinitions(schema);
      const refName = schemaStringField(schema, "$ref");
      const nextRefs = new Map(refs);
      for (const [key, definition] of Object.entries(defs)) {
        nextRefs.set(key, definition);
      }
      const target = refName ? defs[refName] : undefined;
      return target === undefined ? value : EncodeInternal(target, value, nextRefs, checkContext);
    }
    case "Recursive": {
      const name = schemaStringField(schema, "name");
      const target = schemaSchemaField(schema, "schema");
      if (!name || target === undefined) {
        return value;
      }
      const nextRefs = new Map(refs);
      nextRefs.set(name, target);
      nextRefs.set("#", target);
      return EncodeInternal(target, value, nextRefs, checkContext);
    }
    case "Ref": {
      const target = refs.get(schemaStringField(schema, "name") ?? "");
      return target ? EncodeInternal(target, value, refs, checkContext) : value;
    }
    default:
      return value;
  }
}

function encodeRecord(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  if (!isPlainRecord(value)) {
    return value;
  }
  const valueSchema = schemaSchemaField(schema, "value");
  if (!valueSchema) {
    return value;
  }
  const result: Record<string, unknown> = {};
  for (const [key, entryValue] of recordEntries(value)) {
    result[key] = EncodeInternal(valueSchema, entryValue, refs, checkContext);
  }
  return result;
}

function encodeUnion(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  for (const variant of schemaSchemaListField(schema, "variants")) {
    const encoded = EncodeInternal(variant, value, refs, checkContext);
    if (CheckInternal(variant, encoded, refs, checkContext)) {
      return encoded;
    }
  }
  return value;
}

function encodeIntersect(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  let result = value;
  for (const variant of schemaSchemaListField(schema, "variants")) {
    result = EncodeInternal(variant, result, refs, checkContext);
  }
  return result;
}

function encodeSchemaFieldTarget(
  schema: TSchema,
  field: "expression" | "extends",
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  return EncodeInternal(schemaSchemaField(schema, field) ?? schema, value, refs, checkContext);
}

function encodeCallbackValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Encode": {
      const inner = schemaInner(schema);
      const encode = schemaCallbackField<(input: unknown) => unknown>(schema, "encode");
      return inner && encode ? EncodeInternal(inner, encode(value), refs, checkContext) : value;
    }
    case "Codec": {
      const inner = schemaInner(schema);
      const codec = resolveCodec(schema);
      return inner && codec
        ? EncodeInternal(inner, codec.encode(value), refs, checkContext)
        : value;
    }
    case "Base": {
      const convert = schemaCallbackField<(input: unknown) => unknown>(schema, "Convert");
      return convert ? convert(value) : value;
    }
    default:
      return NOT_HANDLED;
  }
}

function encodeCollectionValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Object":
      return encodeObject(schema, value, refs, checkContext);
    case "Array":
      return encodeArrayItems(schemaSchemaField(schema, "items"), value, refs, checkContext);
    case "Tuple":
      return encodeTupleItems(schema, value, refs, checkContext);
    case "Record":
      return encodeRecord(schema, value, refs, checkContext);
    case "Union":
      return encodeUnion(schema, value, refs, checkContext);
    case "Intersect":
      return encodeIntersect(schema, value, refs, checkContext);
    default:
      return NOT_HANDLED;
  }
}

function encodeCompositeValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Optional":
    case "Readonly":
    case "Immutable":
    case "Refine":
    case "Decode":
      return encodeWrappedInner(schema, value, refs, checkContext);
    case "Generic":
      return encodeSchemaFieldTarget(schema, "expression", value, refs, checkContext);
    case "Infer":
      return encodeSchemaFieldTarget(schema, "extends", value, refs, checkContext);
    case "Call":
    case "Cyclic":
    case "Recursive":
    case "Ref":
      return encodeReferenceSchema(schema, value, refs, checkContext);
    default:
      return NOT_HANDLED;
  }
}

function EncodeInternal(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  checkContext?: RuntimeContextArg,
): unknown {
  const kind = schemaKind(schema);
  const callbackValue = encodeCallbackValue(kind, schema, value, refs, checkContext);
  if (callbackValue !== NOT_HANDLED) {
    return callbackValue;
  }
  const collectionValue = encodeCollectionValue(kind, schema, value, refs, checkContext);
  if (collectionValue !== NOT_HANDLED) {
    return collectionValue;
  }
  const compositeValue = encodeCompositeValue(kind, schema, value, refs, checkContext);
  return compositeValue === NOT_HANDLED ? value : compositeValue;
}
