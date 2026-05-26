import { isPlainRecord, recordEntries } from "../shared/runtime-guards.js";
import {
  schemaBooleanOrSchemaField,
  schemaInner,
  schemaItem,
  schemaKind,
  schemaProperties,
  schemaSchemaField,
  schemaSchemaListField,
  schemaStringField,
  schemaVariants,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import type { StaticParse } from "../type/static-types.js";
import { CheckInternal } from "./check.js";

const NOT_HANDLED = Symbol("clean.not-handled");

/** Remove properties without expanding static inference. */
export function CleanValue(schema: TSchema, value: unknown): unknown {
  return CleanInternal(schema, value, new Map());
}

/** Remove properties not defined in the schema from a value */
export function Clean<T extends TSchema>(schema: T, value: unknown): StaticParse<T> {
  return CleanValue(schema, value) as StaticParse<T>;
}

function cleanStructuredValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Object":
      return cleanObjectValue(schema, value, refs);
    case "Array":
      return cleanArrayValue(schema, value, refs);
    case "Tuple":
      return cleanTupleValue(schema, value, refs);
    case "Record":
      return cleanRecordValue(schema, value, refs);
    default:
      return NOT_HANDLED;
  }
}

function cleanAdditionalProperty(
  additionalProperties: boolean | TSchema | undefined,
  entryValue: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  if (additionalProperties === true) {
    return entryValue;
  }
  if (typeof additionalProperties === "object") {
    return CleanInternal(additionalProperties, entryValue, refs);
  }
  return NOT_HANDLED;
}

function cleanObjectValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  if (!isPlainRecord(value)) {
    return value;
  }
  const result: Record<string, unknown> = {};
  const properties = schemaProperties(schema);
  const additionalProperties = schemaBooleanOrSchemaField(schema, "additionalProperties");
  for (const [key, entryValue] of recordEntries(value)) {
    const propertySchema = properties[key];
    if (propertySchema !== undefined) {
      result[key] = CleanInternal(propertySchema, entryValue, refs);
      continue;
    }
    const cleanedAdditionalProperty = cleanAdditionalProperty(
      additionalProperties,
      entryValue,
      refs,
    );
    if (cleanedAdditionalProperty !== NOT_HANDLED) {
      result[key] = cleanedAdditionalProperty;
    }
  }
  return result;
}

function cleanArrayValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  const itemSchema = schemaSchemaField(schema, "items");
  return Array.isArray(value) && itemSchema
    ? value.map((item) => CleanInternal(itemSchema, item, refs))
    : value;
}

function cleanTupleValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  if (!Array.isArray(value)) {
    return value;
  }
  const items = schemaSchemaListField(schema, "items");
  const cleanedItems = value.slice(0, items.length).map((item, index) => {
    const itemSchema = items[index];
    return itemSchema ? CleanInternal(itemSchema, item, refs) : item;
  });
  return schemaBooleanOrSchemaField(schema, "additionalItems") === true
    ? [...cleanedItems, ...value.slice(items.length)]
    : cleanedItems;
}

function cleanRecordValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  if (!isPlainRecord(value)) {
    return value;
  }
  const valueSchema = schemaSchemaField(schema, "value");
  if (valueSchema === undefined) {
    return value;
  }
  const result: Record<string, unknown> = {};
  for (const [key, entryValue] of recordEntries(value)) {
    result[key] = CleanInternal(valueSchema, entryValue, refs);
  }
  return result;
}

function cleanCompositeValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Union": {
      for (const variant of schemaVariants(schema)) {
        if (CheckInternal(variant, value, refs)) {
          return CleanInternal(variant, value, refs);
        }
      }
      for (const variant of schemaVariants(schema)) {
        const cleaned = CleanInternal(variant, value, refs);
        if (cleaned !== value) {
          return cleaned;
        }
      }
      return value;
    }
    case "Intersect": {
      let result: unknown = value;
      for (const variant of schemaVariants(schema)) {
        const cleaned = CleanInternal(variant, value, refs);
        result =
          isPlainRecord(result) && isPlainRecord(cleaned) ? { ...result, ...cleaned } : cleaned;
      }
      return result;
    }
    case "Optional":
    case "Readonly":
    case "Immutable":
    case "Refine": {
      const itemSchema = schemaItem(schema);
      return value === undefined || itemSchema === undefined
        ? value
        : CleanInternal(itemSchema, value, refs);
    }
    case "Recursive": {
      const name = schemaStringField(schema, "name");
      const target = schemaSchemaField(schema, "schema");
      if (!name || target === undefined) {
        return value;
      }
      const nextRefs = new Map(refs);
      nextRefs.set(name, target);
      return CleanInternal(target, value, nextRefs);
    }
    case "Ref": {
      const target = refs.get(schemaStringField(schema, "name") ?? "");
      return target ? CleanInternal(target, value, refs) : value;
    }
    case "Decode":
    case "Encode": {
      const inner = schemaInner(schema);
      return inner ? CleanInternal(inner, value, refs) : value;
    }
    default:
      return NOT_HANDLED;
  }
}

function CleanInternal(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  const kind = schemaKind(schema);
  const structured = cleanStructuredValue(kind, schema, value, refs);
  if (structured !== NOT_HANDLED) {
    return structured;
  }
  const composite = cleanCompositeValue(kind, schema, value, refs);
  return composite === NOT_HANDLED ? value : composite;
}
