import { getPatternPropertySchemas } from "../../shared/object-utils.js";
import { isPlainRecord, recordEntries } from "../../shared/runtime-guards.js";
import {
  schemaBooleanOrSchemaField,
  schemaNumberField,
  schemaOptionalKeys,
  schemaPath,
  schemaPatternProperties,
  schemaProperties,
  schemaRequiredKeys,
} from "../../shared/schema-access.js";
import type { TSchema } from "../../type/base-types.js";
import type { TArray, TObject, TRecord, TTuple } from "../../type/containers-types.js";
import { CheckInternal } from "../../value/check.js";
import { createSchemaIssue, type SchemaIssue } from "../messages.js";
import { appendPath, type CollectSchemaIssues, type ReferenceMap } from "./shared.js";

function collectContainsIssues(
  issues: SchemaIssue[],
  schema: TArray,
  value: unknown[],
  currentPath: string,
  refs: ReferenceMap,
): void {
  const containsSchema = schema.contains;
  if (containsSchema === undefined) {
    return;
  }
  let containsCount = 0;
  for (const item of value) {
    if (CheckInternal(containsSchema, item, refs)) {
      containsCount += 1;
    }
  }
  if (containsCount === 0) {
    issues.push(createSchemaIssue(currentPath, "CONTAINS", {}, schema));
  }
  if (schema.minContains !== undefined && containsCount < schema.minContains) {
    issues.push(
      createSchemaIssue(currentPath, "MIN_CONTAINS", { minimum: schema.minContains }, schema),
    );
  }
  if (schema.maxContains !== undefined && containsCount > schema.maxContains) {
    issues.push(
      createSchemaIssue(currentPath, "MAX_CONTAINS", { maximum: schema.maxContains }, schema),
    );
  }
}

function collectArrayIssues(
  schema: TArray,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);

  if (!Array.isArray(value)) {
    issues.push(createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "array" }, schema));
    return issues;
  }

  if (schema.minItems !== undefined && value.length < schema.minItems) {
    issues.push(createSchemaIssue(currentPath, "MIN_ITEMS", { minimum: schema.minItems }, schema));
  }
  if (schema.maxItems !== undefined && value.length > schema.maxItems) {
    issues.push(createSchemaIssue(currentPath, "MAX_ITEMS", { maximum: schema.maxItems }, schema));
  }
  if (schema.uniqueItems && new Set(value).size !== value.length) {
    issues.push(createSchemaIssue(currentPath, "UNIQUE_ITEMS", {}, schema));
  }
  if (schema.contains !== undefined) {
    collectContainsIssues(issues, schema, value, currentPath, refs);
  }

  for (const [index, item] of value.entries()) {
    issues.push(...collectSchemaIssues(schema.items, item, appendPath(path, String(index)), refs));
  }

  return issues;
}

function collectObjectCountIssues(
  schema: TObject,
  entryCount: number,
  currentPath: string,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const minProperties = schemaNumberField(schema, "minProperties");
  const maxProperties = schemaNumberField(schema, "maxProperties");

  if (minProperties !== undefined && entryCount < minProperties) {
    issues.push(
      createSchemaIssue(currentPath, "MIN_PROPERTIES", { minimum: minProperties }, schema),
    );
  }
  if (maxProperties !== undefined && entryCount > maxProperties) {
    issues.push(
      createSchemaIssue(currentPath, "MAX_PROPERTIES", { maximum: maxProperties }, schema),
    );
  }

  return issues;
}

function collectMissingRequiredIssues(
  schema: TObject,
  objectValue: Record<string, unknown>,
  path: readonly string[],
): SchemaIssue[] {
  return schemaRequiredKeys(schema).flatMap((key) =>
    key in objectValue
      ? []
      : [
          createSchemaIssue(
            schemaPath(appendPath(path, String(key))),
            "MISSING_REQUIRED",
            { property: String(key) },
            schema,
          ),
        ],
  );
}

/** Collect issues for a single object entry against its schema constraints. */
function collectSingleObjectEntryIssues(params: {
  key: string;
  entryValue: unknown;
  entryPath: readonly string[];
  propertySchema: TSchema | undefined;
  patternSchemas: TSchema[];
  optional: Set<string>;
  additionalProperties: boolean | TSchema | undefined;
  schema: TObject;
  collectSchemaIssues: CollectSchemaIssues;
  refs: ReferenceMap;
}): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  if (
    params.propertySchema !== undefined &&
    !(params.entryValue === undefined && params.optional.has(params.key))
  ) {
    issues.push(
      ...params.collectSchemaIssues(
        params.propertySchema,
        params.entryValue,
        params.entryPath,
        params.refs,
      ),
    );
  }
  if (params.patternSchemas.length > 0) {
    for (const patternSchema of params.patternSchemas) {
      issues.push(
        ...params.collectSchemaIssues(
          patternSchema,
          params.entryValue,
          params.entryPath,
          params.refs,
        ),
      );
    }
    return issues;
  }
  if (params.propertySchema === undefined && params.additionalProperties === false) {
    issues.push(
      createSchemaIssue(
        schemaPath(params.entryPath),
        "ADDITIONAL_PROPERTY",
        { property: params.key },
        params.schema,
      ),
    );
    return issues;
  }
  if (params.propertySchema === undefined && typeof params.additionalProperties === "object") {
    issues.push(
      ...params.collectSchemaIssues(
        params.additionalProperties,
        params.entryValue,
        params.entryPath,
        params.refs,
      ),
    );
  }
  return issues;
}

function collectObjectEntryIssues(
  schema: TObject,
  objectValue: Record<string, unknown>,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const properties = schemaProperties(schema);
  const optional = new Set(schemaOptionalKeys(schema));
  const patternProperties = schemaPatternProperties(schema);
  const additionalProperties = schemaBooleanOrSchemaField(schema, "additionalProperties");

  for (const [key, entryValue] of Object.entries(objectValue)) {
    issues.push(
      ...collectSingleObjectEntryIssues({
        key,
        entryValue,
        entryPath: appendPath(path, key),
        propertySchema: properties[key],
        patternSchemas: getPatternPropertySchemas(patternProperties, key),
        optional,
        additionalProperties,
        schema,
        collectSchemaIssues,
        refs,
      }),
    );
  }

  return issues;
}

function collectObjectIssues(
  schema: TObject,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);

  if (!isPlainRecord(value)) {
    issues.push(createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "object" }, schema));
    return issues;
  }

  const objectValue = value;
  const entryCount = Object.keys(objectValue).length;

  issues.push(...collectObjectCountIssues(schema, entryCount, currentPath));
  issues.push(...collectMissingRequiredIssues(schema, objectValue, path));
  issues.push(...collectObjectEntryIssues(schema, objectValue, path, refs, collectSchemaIssues));

  return issues;
}

function collectTupleIssues(
  schema: TTuple,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);

  if (!Array.isArray(value)) {
    issues.push(createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "array" }, schema));
    return issues;
  }

  if (schema.minItems !== undefined && value.length < schema.minItems) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MIN_ITEMS",
        { label: "Tuple", minimum: schema.minItems },
        schema,
      ),
    );
  }
  if (schema.maxItems !== undefined && value.length > schema.maxItems) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MAX_ITEMS",
        { label: "Tuple", maximum: schema.maxItems },
        schema,
      ),
    );
  }

  value.forEach((item, index) => {
    const itemSchema = schema.items[index];
    if (itemSchema !== undefined) {
      issues.push(...collectSchemaIssues(itemSchema, item, appendPath(path, String(index)), refs));
    } else if (!schema.additionalItems) {
      issues.push(
        createSchemaIssue(
          schemaPath(appendPath(path, String(index))),
          "ADDITIONAL_ITEMS",
          { count: index },
          schema,
        ),
      );
    }
  });

  return issues;
}

function collectRecordIssues(
  schema: TRecord,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);

  if (!isPlainRecord(value)) {
    issues.push(createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "object" }, schema));
    return issues;
  }

  const entries = recordEntries(value);
  if (schema.minProperties !== undefined && entries.length < schema.minProperties) {
    issues.push(
      createSchemaIssue(currentPath, "MIN_PROPERTIES", { minimum: schema.minProperties }, schema),
    );
  }
  if (schema.maxProperties !== undefined && entries.length > schema.maxProperties) {
    issues.push(
      createSchemaIssue(currentPath, "MAX_PROPERTIES", { maximum: schema.maxProperties }, schema),
    );
  }

  for (const [key, entryValue] of entries) {
    if (!CheckInternal(schema.key, key, refs)) {
      issues.push(
        createSchemaIssue(schemaPath(appendPath(path, key)), "INVALID_KEY", { key }, schema),
      );
    }
    issues.push(...collectSchemaIssues(schema.value, entryValue, appendPath(path, key), refs));
  }

  return issues;
}

export function collectBasicCollectionIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] | undefined {
  switch (kind) {
    case "Array":
      return collectArrayIssues(schema as TArray, value, path, refs, collectSchemaIssues);
    case "Object":
      return collectObjectIssues(schema as TObject, value, path, refs, collectSchemaIssues);
    case "Tuple":
      return collectTupleIssues(schema as TTuple, value, path, refs, collectSchemaIssues);
    case "Record":
      return collectRecordIssues(schema as TRecord, value, path, refs, collectSchemaIssues);
    default:
      return;
  }
}
