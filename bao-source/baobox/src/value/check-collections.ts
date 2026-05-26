import { getPatternPropertySchemas } from "../shared/object-utils.js";
import {
  schemaBooleanField,
  schemaBooleanOrSchemaField,
  schemaNumberField,
  schemaOptionalKeys,
  schemaPatternProperties,
  schemaProperties,
  schemaRequiredKeys,
  schemaSchemaField,
  schemaSchemaListField,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import { checkDerivedCollection, checkReferenceCollection } from "./check-collections-derived.js";

type CheckFn = (schema: TSchema, value: unknown, refs: Map<string, TSchema>) => boolean;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkArrayCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  const minItems = schemaNumberField(schema, "minItems");
  const maxItems = schemaNumberField(schema, "maxItems");
  const uniqueItems = schemaBooleanField(schema, "uniqueItems");
  if (minItems !== undefined && value.length < minItems) {
    return false;
  }
  if (maxItems !== undefined && value.length > maxItems) {
    return false;
  }
  if (uniqueItems && new Set(value).size !== value.length) {
    return false;
  }
  if (!checkArrayContains(schema, value, refs, check)) {
    return false;
  }
  const itemSchema = schemaSchemaField(schema, "items");
  return itemSchema ? value.every((item) => check(itemSchema, item, refs)) : false;
}

function checkArrayContains(
  schema: TSchema,
  value: readonly unknown[],
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  const containsSchema = schemaSchemaField(schema, "contains");
  if (containsSchema === undefined) {
    return true;
  }
  let containsCount = 0;
  for (const item of value) {
    if (check(containsSchema, item, refs)) {
      containsCount += 1;
    }
  }
  if (containsCount === 0) {
    return false;
  }
  const minContains = schemaNumberField(schema, "minContains");
  const maxContains = schemaNumberField(schema, "maxContains");
  if (minContains !== undefined && containsCount < minContains) {
    return false;
  }
  if (maxContains !== undefined && containsCount > maxContains) {
    return false;
  }
  return true;
}

function checkObjectCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  if (!isRecord(value)) {
    return false;
  }
  const entries = Object.entries(value);
  const properties = schemaProperties(schema);
  const required = schemaRequiredKeys(schema);
  const optional = new Set(schemaOptionalKeys(schema));
  const patternProperties = schemaPatternProperties(schema);
  const additionalProperties = schemaBooleanOrSchemaField(schema, "additionalProperties");
  const minProperties = schemaNumberField(schema, "minProperties");
  const maxProperties = schemaNumberField(schema, "maxProperties");

  if (minProperties !== undefined && entries.length < minProperties) {
    return false;
  }
  if (maxProperties !== undefined && entries.length > maxProperties) {
    return false;
  }
  if (!checkRequiredProperties(required, properties, value, refs, check)) {
    return false;
  }

  for (const [key, entryValue] of entries) {
    if (
      !checkObjectEntry(
        key,
        entryValue,
        properties,
        optional,
        patternProperties,
        additionalProperties,
        refs,
        check,
      )
    ) {
      return false;
    }
  }
  return true;
}

function checkRequiredProperties(
  required: readonly string[],
  properties: Record<string, TSchema>,
  value: Record<string, unknown>,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  for (const key of required) {
    if (!(key in value)) {
      return false;
    }
    const propertySchema = properties[key];
    if (propertySchema === undefined || !check(propertySchema, value[key], refs)) {
      return false;
    }
  }
  return true;
}

function checkObjectEntry(
  key: string,
  entryValue: unknown,
  properties: Record<string, TSchema>,
  optional: ReadonlySet<string>,
  patternProperties: Record<string, TSchema>,
  additionalProperties: boolean | TSchema | undefined,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  const propertySchema = properties[key];
  if (
    propertySchema !== undefined &&
    !(entryValue === undefined && optional.has(key)) &&
    !check(propertySchema, entryValue, refs)
  ) {
    return false;
  }
  const matchedPatterns = getPatternPropertySchemas(patternProperties, key);
  if (
    matchedPatterns.length > 0 &&
    !matchedPatterns.every((patternSchema) => check(patternSchema, entryValue, refs))
  ) {
    return false;
  }
  if (propertySchema !== undefined || matchedPatterns.length > 0) {
    return true;
  }
  if (additionalProperties === false) {
    return false;
  }
  return typeof additionalProperties !== "object" || check(additionalProperties, entryValue, refs);
}

function checkTupleCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  const items = schemaSchemaListField(schema, "items");
  const minItems = schemaNumberField(schema, "minItems");
  const maxItems = schemaNumberField(schema, "maxItems");
  const additionalItems = schemaBooleanField(schema, "additionalItems");
  if (minItems !== undefined && value.length < minItems) {
    return false;
  }
  if (maxItems !== undefined && value.length > maxItems) {
    return false;
  }
  if (value.length > items.length && additionalItems !== true) {
    return false;
  }
  return value.every((item, index) => {
    const itemSchema = items[index];
    return itemSchema ? check(itemSchema, item, refs) : true;
  });
}

function checkRecordCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  if (!isRecord(value)) {
    return false;
  }
  const keySchema = schemaSchemaField(schema, "key");
  const valueSchema = schemaSchemaField(schema, "value");
  const entries = Object.entries(value);
  const minProperties = schemaNumberField(schema, "minProperties");
  const maxProperties = schemaNumberField(schema, "maxProperties");
  if (keySchema === undefined || valueSchema === undefined) {
    return false;
  }
  if (minProperties !== undefined && entries.length < minProperties) {
    return false;
  }
  if (maxProperties !== undefined && entries.length > maxProperties) {
    return false;
  }
  return entries.every(
    ([entryKey, entryValue]) =>
      check(keySchema, entryKey, refs) && check(valueSchema, entryValue, refs),
  );
}

export function checkCollectionKind(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean | undefined {
  switch (kind) {
    case "Array":
      return checkArrayCollection(schema, value, refs, check);
    case "Object":
      return checkObjectCollection(schema, value, refs, check);
    case "Tuple":
      return checkTupleCollection(schema, value, refs, check);
    case "Record":
      return checkRecordCollection(schema, value, refs, check);
    default:
      return (
        checkReferenceCollection(kind, schema, value, refs, check) ??
        checkDerivedCollection(kind, schema, value, refs, check)
      );
  }
}
