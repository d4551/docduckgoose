import { isPlainRecord, recordEntries } from "../shared/runtime-guards.js";
import {
  schemaInner,
  schemaItem,
  schemaKind,
  schemaProperties,
  schemaSchemaField,
  schemaSchemaListField,
  schemaStringField,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import type { Static } from "../type/static-types.js";
import { Clone } from "./clone.js";

const NOT_HANDLED = Symbol("cast.not-handled");

function castPrimitiveValue(schema: TSchema, value: unknown): unknown | typeof NOT_HANDLED {
  switch (schemaKind(schema)) {
    case "String":
      return typeof value === "string" ? value : globalThis.String(value);
    case "Number":
      return typeof value === "number"
        ? value
        : typeof value === "string"
          ? globalThis.Number(value)
          : value;
    case "Integer":
      return typeof value === "number" && globalThis.Number.isInteger(value)
        ? value
        : typeof value === "string"
          ? globalThis.Number(value)
          : value;
    case "Boolean":
      return typeof value === "boolean"
        ? value
        : typeof value === "string"
          ? value === "true" || value === "1"
            ? true
            : value === "false" || value === "0"
              ? false
              : value
          : typeof value === "number"
            ? value !== 0
            : value;
    case "BigInt":
      return typeof value === "bigint"
        ? value
        : typeof value === "number"
          ? globalThis.BigInt(value)
          : typeof value === "string"
            ? globalThis.BigInt(value)
            : value;
    case "Date":
      return value instanceof globalThis.Date
        ? value
        : new globalThis.Date(globalThis.String(value));
    case "Literal":
      return value;
    default:
      return NOT_HANDLED;
  }
}

function castCollectionValue(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (schemaKind(schema)) {
    case "Object": {
      if (!isPlainRecord(value)) {
        return value;
      }
      const result: Record<string, unknown> = {};
      const properties = schemaProperties(schema);
      for (const [key, entryValue] of recordEntries(value)) {
        const propertySchema = properties[key];
        result[key] = propertySchema ? CastInternal(propertySchema, entryValue, refs) : entryValue;
      }
      return result;
    }
    case "Array": {
      if (!Array.isArray(value)) {
        return value;
      }
      const itemSchema = schemaSchemaField(schema, "items");
      return itemSchema ? value.map((item) => CastInternal(itemSchema, item, refs)) : value;
    }
    case "Tuple": {
      if (!Array.isArray(value)) {
        return value;
      }
      const items = schemaSchemaListField(schema, "items");
      return value.map((item, index) => {
        const itemSchema = items[index];
        return itemSchema ? CastInternal(itemSchema, item, refs) : item;
      });
    }
    case "Record": {
      if (!isPlainRecord(value)) {
        return value;
      }
      const valueSchema = schemaSchemaField(schema, "value");
      if (!valueSchema) {
        return value;
      }
      const result: Record<string, unknown> = {};
      for (const [key, entryValue] of recordEntries(value)) {
        result[key] = CastInternal(valueSchema, entryValue, refs);
      }
      return result;
    }
    default:
      return NOT_HANDLED;
  }
}

function castCompositeValue(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (schemaKind(schema)) {
    case "Optional": {
      const itemSchema = schemaItem(schema);
      return value === undefined || itemSchema === undefined
        ? value
        : CastInternal(itemSchema, value, refs);
    }
    case "Readonly":
    case "Immutable":
    case "Refine": {
      const itemSchema = schemaItem(schema);
      return itemSchema ? CastInternal(itemSchema, value, refs) : value;
    }
    case "Intersect": {
      let result = value;
      for (const variant of schemaSchemaListField(schema, "variants")) {
        result = CastInternal(variant, result, refs);
      }
      return result;
    }
    case "Union": {
      for (const variant of schemaSchemaListField(schema, "variants")) {
        const casted = CastInternal(variant, value, refs);
        if (casted !== value) {
          return casted;
        }
      }
      return value;
    }
    case "Recursive": {
      const name = schemaStringField(schema, "name");
      const target = schemaSchemaField(schema, "schema");
      if (!name || target === undefined) {
        return value;
      }
      const nextRefs = new Map(refs);
      nextRefs.set(name, target);
      return CastInternal(target, value, nextRefs);
    }
    case "Ref": {
      const target = refs.get(schemaStringField(schema, "name") ?? "");
      return target ? CastInternal(target, value, refs) : value;
    }
    case "Decode":
    case "Encode": {
      const inner = schemaInner(schema);
      return inner ? CastInternal(inner, value, refs) : value;
    }
    default:
      return NOT_HANDLED;
  }
}

function CastInternal(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  const primitive = castPrimitiveValue(schema, value);
  if (primitive !== NOT_HANDLED) {
    return primitive;
  }
  const collection = castCollectionValue(schema, value, refs);
  if (collection !== NOT_HANDLED) {
    return collection;
  }
  const composite = castCompositeValue(schema, value, refs);
  return composite === NOT_HANDLED ? value : composite;
}

export function Cast<T extends TSchema>(schema: T, value: unknown): Static<T> {
  return CastInternal(schema, Clone(value), new Map()) as Static<T>;
}
