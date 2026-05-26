import { isPlainRecord, recordEntries } from "../shared/runtime-guards.js";
import {
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
import { Check } from "./check.js";

const NOT_HANDLED = Symbol("convert.not-handled");

function isBigIntText(value: string): boolean {
  const normalized = value.trim();
  if (normalized.length === 0) {
    return false;
  }
  const first = normalized[0];
  const start = first === "+" || first === "-" ? 1 : 0;
  if (start === normalized.length) {
    return false;
  }
  for (let index = start; index < normalized.length; index += 1) {
    const char = normalized[index];
    if (char === undefined || char < "0" || char > "9") {
      return false;
    }
  }
  return true;
}

/** Coerce schema-aligned values without expanding static inference. */
export function ConvertValue(schema: TSchema, value: unknown): unknown {
  return ConvertInternal(schema, value, new Map());
}

/** Coerce schema-aligned values to match a schema */
export function Convert<T extends TSchema>(schema: T, value: unknown): StaticParse<T> {
  return ConvertValue(schema, value) as StaticParse<T>;
}

function convertStringValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return globalThis.String(value);
  }
  return value;
}

function convertNumberValue(value: unknown): unknown {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const next = globalThis.Number(value);
    if (!Number.isNaN(next)) {
      return next;
    }
  }
  return typeof value === "boolean" ? (value ? 1 : 0) : value;
}

function convertIntegerValue(value: unknown): unknown {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }
  if (typeof value === "string") {
    const next = globalThis.Number(value);
    if (Number.isInteger(next)) {
      return next;
    }
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return typeof value === "number" ? Math.trunc(value) : value;
}

function convertBooleanValue(value: unknown): unknown {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    if (value === "true" || value === "1") {
      return true;
    }
    if (value === "false" || value === "0") {
      return false;
    }
  }
  return typeof value === "number" ? value !== 0 : value;
}

function convertBigIntValue(value: unknown): unknown {
  if (typeof value === "bigint") {
    return value;
  }
  if (typeof value === "number" && Number.isInteger(value)) {
    return globalThis.BigInt(value);
  }
  if (typeof value === "string") {
    const normalized = value.trim();
    if (isBigIntText(normalized)) {
      return globalThis.BigInt(normalized);
    }
  }
  return value;
}

function convertDateValue(value: unknown): unknown {
  if (value instanceof globalThis.Date) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const next = new globalThis.Date(value);
    if (!Number.isNaN(next.getTime())) {
      return next;
    }
  }
  return value;
}

function convertPrimitiveValue(
  kind: string | undefined,
  _schema: TSchema,
  value: unknown,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "String":
      return convertStringValue(value);
    case "Number":
      return convertNumberValue(value);
    case "Integer":
      return convertIntegerValue(value);
    case "Boolean":
      return convertBooleanValue(value);
    case "BigInt":
      return convertBigIntValue(value);
    case "Date":
      return convertDateValue(value);
    case "Null":
      return value === null ? value : value === "null" || value === undefined ? null : value;
    default:
      return NOT_HANDLED;
  }
}

function convertStructuredValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Object": {
      if (!isPlainRecord(value)) {
        return value;
      }
      const result: Record<string, unknown> = {};
      const properties = schemaProperties(schema);
      for (const [key, entryValue] of recordEntries(value)) {
        const propertySchema = properties[key];
        result[key] = propertySchema
          ? ConvertInternal(propertySchema, entryValue, refs)
          : entryValue;
      }
      return result;
    }
    case "Array": {
      const itemSchema = schemaSchemaField(schema, "items");
      return Array.isArray(value) && itemSchema
        ? value.map((item) => ConvertInternal(itemSchema, item, refs))
        : value;
    }
    case "Tuple": {
      if (!Array.isArray(value)) {
        return value;
      }
      const items = schemaSchemaListField(schema, "items");
      return value.map((item, index) => {
        const itemSchema = items[index];
        return itemSchema ? ConvertInternal(itemSchema, item, refs) : item;
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
        result[key] = ConvertInternal(valueSchema, entryValue, refs);
      }
      return result;
    }
    default:
      return NOT_HANDLED;
  }
}

function convertCompositeValue(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Optional":
      return convertOptionalValue(schema, value, refs);
    case "Readonly":
    case "Immutable":
    case "Refine":
      return convertWrappedValue(schema, value, refs);
    case "Union":
      return convertUnionValue(schema, value, refs);
    case "Intersect":
      return convertIntersectValue(schema, value, refs);
    case "Recursive":
      return convertRecursiveValue(schema, value, refs);
    case "Ref":
      return convertReferenceValue(schema, value, refs);
    case "Decode":
    case "Encode":
      return convertInnerValue(schema, value, refs);
    default:
      return NOT_HANDLED;
  }
}

function convertOptionalValue(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown {
  const itemSchema = schemaItem(schema);
  return value === undefined || itemSchema === undefined
    ? value
    : ConvertInternal(itemSchema, value, refs);
}

function convertWrappedValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  const itemSchema = schemaItem(schema);
  return itemSchema ? ConvertInternal(itemSchema, value, refs) : value;
}

function convertUnionValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  for (const variant of schemaVariants(schema)) {
    if (Check(variant, value)) {
      return value;
    }
  }
  for (const variant of schemaVariants(schema)) {
    const converted = ConvertInternal(variant, value, refs);
    if (converted !== value && Check(variant, converted)) {
      return converted;
    }
  }
  return value;
}

function convertIntersectValue(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown {
  let result = value;
  for (const variant of schemaVariants(schema)) {
    result = ConvertInternal(variant, result, refs);
  }
  return result;
}

function convertRecursiveValue(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown {
  const name = schemaStringField(schema, "name");
  const target = schemaSchemaField(schema, "schema");
  if (!name || target === undefined) {
    return value;
  }
  const nextRefs = new Map(refs);
  nextRefs.set(name, target);
  return ConvertInternal(target, value, nextRefs);
}

function convertReferenceValue(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
): unknown {
  const target = refs.get(schemaStringField(schema, "name") ?? "");
  return target ? ConvertInternal(target, value, refs) : value;
}

function convertInnerValue(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  const inner = schemaInner(schema);
  return inner ? ConvertInternal(inner, value, refs) : value;
}

function ConvertInternal(schema: TSchema, value: unknown, refs: Map<string, TSchema>): unknown {
  const kind = schemaKind(schema);
  const primitive = convertPrimitiveValue(kind, schema, value);
  if (primitive !== NOT_HANDLED) {
    return primitive;
  }
  const structured = convertStructuredValue(kind, schema, value, refs);
  if (structured !== NOT_HANDLED) {
    return structured;
  }
  const composite = convertCompositeValue(kind, schema, value, refs);
  return composite === NOT_HANDLED ? value : composite;
}
