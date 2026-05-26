import { formatRegistry } from "../shared/registries.js";
import {
  Entries,
  IsObject,
  IsPlainObject,
  IsSchema,
  type SchemaContext,
  type XSchema,
} from "./shared.js";

export function MatchesType(type: unknown, value: unknown): boolean {
  if (Array.isArray(type)) {
    return type.some((entry) => MatchesType(entry, value));
  }
  if (typeof type !== "string") {
    return true;
  }
  switch (type) {
    case "array":
      return Array.isArray(value);
    case "boolean":
      return typeof value === "boolean";
    case "integer":
      return typeof value === "number" && Number.isInteger(value);
    case "null":
      return value === null;
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "object":
      return IsPlainObject(value);
    case "string":
      return typeof value === "string";
    default:
      return true;
  }
}

function uniqueItems(items: unknown[]): boolean {
  const seen = new Set<string>();
  for (const item of items) {
    const signature = JSON.stringify(item);
    if (seen.has(signature)) {
      return false;
    }
    seen.add(signature);
  }
  return true;
}

export function CheckStringKeywords(record: Record<string, unknown>, value: unknown): boolean {
  if (typeof value !== "string") {
    return true;
  }
  const minLength = record.minLength;
  if (typeof minLength === "number" && value.length < minLength) {
    return false;
  }
  const maxLength = record.maxLength;
  if (typeof maxLength === "number" && value.length > maxLength) {
    return false;
  }
  const pattern = record.pattern;
  if (typeof pattern === "string" && !new RegExp(pattern).test(value)) {
    return false;
  }
  const format = record.format;
  if (typeof format === "string") {
    const validator = formatRegistry.get(format);
    if (validator !== undefined && !validator(value)) {
      return false;
    }
  }
  return true;
}

export function CheckNumberKeywords(record: Record<string, unknown>, value: unknown): boolean {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return true;
  }
  const minimum = record.minimum;
  if (typeof minimum === "number" && value < minimum) {
    return false;
  }
  const maximum = record.maximum;
  if (typeof maximum === "number" && value > maximum) {
    return false;
  }
  const exclusiveMinimum = record.exclusiveMinimum;
  if (typeof exclusiveMinimum === "number" && value <= exclusiveMinimum) {
    return false;
  }
  const exclusiveMaximum = record.exclusiveMaximum;
  if (typeof exclusiveMaximum === "number" && value >= exclusiveMaximum) {
    return false;
  }
  const multipleOf = record.multipleOf;
  if (typeof multipleOf === "number" && value % multipleOf !== 0) {
    return false;
  }
  return true;
}

export function CheckArrayKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: unknown,
  root: XSchema,
): boolean {
  if (!Array.isArray(value)) {
    return true;
  }
  const prefixItems = Array.isArray(record.prefixItems) ? record.prefixItems : undefined;
  const items = IsSchema(record.items) ? record.items : undefined;
  return (
    checkArrayLengthKeywords(record, value) &&
    checkPrefixItems(check, context, prefixItems, value, root) &&
    checkArrayItemRange(check, context, items, prefixItems?.length ?? 0, value, root) &&
    checkArrayTrailingSchema(
      check,
      context,
      prefixItems,
      items,
      record.additionalItems,
      value,
      root,
    ) &&
    checkArrayTrailingSchema(
      check,
      context,
      prefixItems,
      items,
      record.unevaluatedItems,
      value,
      root,
    ) &&
    checkContainsKeywords(check, context, record, value, root)
  );
}

export function CheckObjectKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: unknown,
  root: XSchema,
): boolean {
  if (!IsPlainObject(value)) {
    return true;
  }
  const keys = Object.keys(value);
  const properties = IsObject(record.properties) ? record.properties : undefined;
  const patternProperties = IsObject(record.patternProperties)
    ? record.patternProperties
    : undefined;
  if (
    !(
      checkObjectPropertyCounts(record, keys.length) &&
      checkRequiredProperties(record, value) &&
      checkPropertyNameKeywords(check, context, record, keys, root)
    )
  ) {
    return false;
  }
  for (const key of keys) {
    if (
      !checkObjectPropertyEntry(
        check,
        context,
        record,
        value,
        key,
        properties?.[key],
        patternProperties,
        root,
      )
    ) {
      return false;
    }
  }
  return true;
}

export function CheckDependentKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: unknown,
  root: XSchema,
): boolean {
  if (!IsPlainObject(value)) {
    return true;
  }
  return (
    checkDependentRequiredKeywords(record, value) &&
    checkDependentSchemasKeywords(check, context, record, value, root) &&
    checkLegacyDependenciesKeywords(check, context, record, value, root)
  );
}

function checkArrayLengthKeywords(record: Record<string, unknown>, value: unknown[]): boolean {
  const minItems = record.minItems;
  if (typeof minItems === "number" && value.length < minItems) {
    return false;
  }
  const maxItems = record.maxItems;
  if (typeof maxItems === "number" && value.length > maxItems) {
    return false;
  }
  return record.uniqueItems !== true || uniqueItems(value);
}

function checkPrefixItems(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  prefixItems: unknown[] | undefined,
  value: unknown[],
  root: XSchema,
): boolean {
  if (prefixItems === undefined) {
    return true;
  }
  for (const [index, itemSchema] of prefixItems.entries()) {
    if (IsSchema(itemSchema) && !check(context, itemSchema, value[index], root)) {
      return false;
    }
  }
  return true;
}

function checkArrayItemRange(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  itemSchema: XSchema | undefined,
  startIndex: number,
  value: unknown[],
  root: XSchema,
): boolean {
  if (itemSchema === undefined) {
    return true;
  }
  for (let index = startIndex; index < value.length; index += 1) {
    if (!check(context, itemSchema, value[index], root)) {
      return false;
    }
  }
  return true;
}

function checkArrayTrailingSchema(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  prefixItems: unknown[] | undefined,
  itemSchema: XSchema | undefined,
  trailingSchema: unknown,
  value: unknown[],
  root: XSchema,
): boolean {
  const normalizedTrailingSchema = IsSchema(trailingSchema) ? trailingSchema : undefined;
  if (
    normalizedTrailingSchema === undefined ||
    prefixItems === undefined ||
    itemSchema !== undefined
  ) {
    return true;
  }
  return checkArrayItemRange(
    check,
    context,
    normalizedTrailingSchema,
    prefixItems.length,
    value,
    root,
  );
}

function checkContainsKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: unknown[],
  root: XSchema,
): boolean {
  const contains = IsSchema(record.contains) ? record.contains : undefined;
  if (contains === undefined) {
    return true;
  }
  const count = value.filter((entry) => check(context, contains, entry, root)).length;
  if (count === 0) {
    return false;
  }
  const minContains = record.minContains;
  if (typeof minContains === "number" && count < minContains) {
    return false;
  }
  const maxContains = record.maxContains;
  return typeof maxContains !== "number" || count <= maxContains;
}

function checkObjectPropertyCounts(record: Record<string, unknown>, keyCount: number): boolean {
  const minProperties = record.minProperties;
  if (typeof minProperties === "number" && keyCount < minProperties) {
    return false;
  }
  const maxProperties = record.maxProperties;
  return typeof maxProperties !== "number" || keyCount <= maxProperties;
}

function checkRequiredProperties(
  record: Record<string, unknown>,
  value: Record<string, unknown>,
): boolean {
  const required = Array.isArray(record.required) ? record.required : undefined;
  return (
    required === undefined || required.every((entry) => typeof entry === "string" && entry in value)
  );
}

function checkPropertyNameKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  keys: string[],
  root: XSchema,
): boolean {
  const propertyNames = IsSchema(record.propertyNames) ? record.propertyNames : undefined;
  return (
    propertyNames === undefined || keys.every((key) => check(context, propertyNames, key, root))
  );
}

function resolvePatternSchemas(
  patternProperties: Record<string, unknown> | undefined,
  key: string,
): XSchema[] {
  if (patternProperties === undefined) {
    return [];
  }
  return Entries(patternProperties).flatMap(([pattern, schema]) =>
    new RegExp(pattern).test(key) && IsSchema(schema) ? [schema] : [],
  );
}

function checkSchemaList(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  schemas: XSchema[],
  value: unknown,
  root: XSchema,
): boolean {
  return schemas.every((schema) => check(context, schema, value, root));
}

function checkFallbackObjectSchema(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  schema: unknown,
  value: unknown,
  root: XSchema,
): boolean {
  if (schema === false) {
    return false;
  }
  return !IsSchema(schema) || check(context, schema, value, root);
}

function checkObjectPropertyEntry(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: Record<string, unknown>,
  key: string,
  propertySchema: unknown,
  patternProperties: Record<string, unknown> | undefined,
  root: XSchema,
): boolean {
  const matchedPatterns = resolvePatternSchemas(patternProperties, key);
  const propertyValue = value[key];
  if (IsSchema(propertySchema) && !check(context, propertySchema, propertyValue, root)) {
    return false;
  }
  if (!checkSchemaList(check, context, matchedPatterns, propertyValue, root)) {
    return false;
  }
  if (propertySchema !== undefined || matchedPatterns.length > 0) {
    return true;
  }
  return (
    checkFallbackObjectSchema(check, context, record.additionalProperties, propertyValue, root) &&
    checkFallbackObjectSchema(check, context, record.unevaluatedProperties, propertyValue, root)
  );
}

function hasRequiredDependencyValues(dependency: unknown, value: Record<string, unknown>): boolean {
  return (
    !Array.isArray(dependency) ||
    dependency.every((entry) => typeof entry === "string" && entry in value)
  );
}

function checkDependentRequiredKeywords(
  record: Record<string, unknown>,
  value: Record<string, unknown>,
): boolean {
  const dependentRequired = IsObject(record.dependentRequired)
    ? record.dependentRequired
    : undefined;
  if (dependentRequired === undefined) {
    return true;
  }
  return Entries(dependentRequired).every(
    ([key, dependency]) => !(key in value) || hasRequiredDependencyValues(dependency, value),
  );
}

function checkDependentSchemasKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: Record<string, unknown>,
  root: XSchema,
): boolean {
  const dependentSchemas = IsObject(record.dependentSchemas) ? record.dependentSchemas : undefined;
  if (dependentSchemas === undefined) {
    return true;
  }
  return Entries(dependentSchemas).every(
    ([key, dependency]) =>
      !(key in value && IsSchema(dependency)) || check(context, dependency, value, root),
  );
}

function checkLegacyDependenciesKeywords(
  check: (ctx: SchemaContext, sch: XSchema, val: unknown, rootSchema: XSchema) => boolean,
  context: SchemaContext,
  record: Record<string, unknown>,
  value: Record<string, unknown>,
  root: XSchema,
): boolean {
  const dependencies = IsObject(record.dependencies) ? record.dependencies : undefined;
  if (dependencies === undefined) {
    return true;
  }
  return Entries(dependencies).every(([key, dependency]) => {
    if (!(key in value)) {
      return true;
    }
    if (!hasRequiredDependencyValues(dependency, value)) {
      return false;
    }
    return !IsSchema(dependency) || check(context, dependency, value, root);
  });
}
