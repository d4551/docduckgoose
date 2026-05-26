import type { TKind, TSchema } from "../type/base-types.js";
import { isRecord } from "./runtime-guards.js";

export type SchemaNode = TSchema;
type SchemaRefinement = { refine: (value: unknown) => boolean; message?: string };

function isSchemaRecord(value: unknown): value is Record<string, unknown> {
  return isRecord(value);
}

function isNativeJsonSchema(value: Record<string, unknown>): boolean {
  return (
    typeof value.type === "string" ||
    typeof value.$ref === "string" ||
    "const" in value ||
    Array.isArray(value.enum) ||
    Array.isArray(value.anyOf) ||
    Array.isArray(value.oneOf) ||
    Array.isArray(value.allOf) ||
    Array.isArray(value.items) ||
    isRecord(value.properties) ||
    isRecord(value.patternProperties) ||
    isRecord(value.$defs)
  );
}

function isSchemaValue(value: unknown): value is TSchema {
  return isSchemaRecord(value) && (typeof value["~kind"] === "string" || isNativeJsonSchema(value));
}

function schemaListAlias(schema: TSchema, field: string): unknown {
  if (field === "variants") {
    const anyOf = schema.anyOf;
    if (Array.isArray(anyOf)) {
      return anyOf;
    }
    const oneOf = schema.oneOf;
    if (Array.isArray(oneOf)) {
      return oneOf;
    }
    const allOf = schema.allOf;
    if (Array.isArray(allOf)) {
      return allOf;
    }
  }

  if (field === "optional") {
    const properties = schemaRecordField(schema, "properties");
    const required = new Set(schemaRequiredKeys(schema));
    return Object.keys(properties).filter((key) => !required.has(key));
  }

  if (field === "values") {
    return schema.enum;
  }

  if (field === "patterns") {
    const pattern = schema.pattern;
    const patterns = typeof pattern === "string" ? [pattern] : undefined;
    return patterns;
  }

  let alias: unknown;
  return alias;
}

function schemaField(schema: TSchema, field: string): unknown {
  const direct = schema[field];
  return direct ?? schemaListAlias(schema, field);
}

export function schemaKind(schema: TSchema): TKind | undefined {
  let resolvedKind: TKind | undefined;
  const schemaKindValue = schema["~kind"];
  if (typeof schemaKindValue === "string") {
    resolvedKind = schemaKindValue as TKind;
    return resolvedKind;
  }

  if (typeof schema.$ref === "string") {
    return "Ref";
  }

  if (Array.isArray(schema.allOf)) {
    return "Intersect";
  }

  if (Array.isArray(schema.anyOf) || Array.isArray(schema.oneOf)) {
    return "Union";
  }

  if ("const" in schema) {
    return "Literal";
  }

  if (Array.isArray(schema.enum)) {
    return "Enum";
  }

  const type = schema.type;
  if (type === "array") {
    return Array.isArray(schema.items) ? "Tuple" : "Array";
  }

  if (type === "object") {
    return "Object";
  }

  if (type === "string") {
    return "String";
  }

  if (type === "number") {
    return "Number";
  }

  if (type === "integer") {
    return "Integer";
  }

  if (type === "boolean") {
    return "Boolean";
  }

  if (type === "null") {
    resolvedKind = "Null";
    return resolvedKind;
  }

  return resolvedKind;
}

export function schemaUnknownField(schema: TSchema, field: string): unknown {
  return schemaField(schema, field);
}

export function schemaStringField(schema: TSchema, field: string): string | undefined {
  const value = schemaUnknownField(schema, field);
  if (field === "name" && value === undefined) {
    const refName = schemaUnknownField(schema, "$ref");
    return typeof refName === "string" ? refName : undefined;
  }
  return typeof value === "string" ? value : undefined;
}

export function schemaNumberField(schema: TSchema, field: string): number | undefined {
  const value = schemaUnknownField(schema, field);
  return typeof value === "number" ? value : undefined;
}

export function schemaBigIntField(schema: TSchema, field: string): bigint | undefined {
  const value = schemaUnknownField(schema, field);
  return typeof value === "bigint" ? value : undefined;
}

export function schemaBooleanField(schema: TSchema, field: string): boolean | undefined {
  const value = schemaUnknownField(schema, field);
  return typeof value === "boolean" ? value : undefined;
}

export function schemaStringListField(schema: TSchema, field: string): string[] {
  const value = schemaUnknownField(schema, field);
  return Array.isArray(value) && value.every((entry) => typeof entry === "string") ? value : [];
}

function schemaRecordField(schema: TSchema, field: string): Record<string, unknown> {
  const value = schemaUnknownField(schema, field);
  return isRecord(value) ? value : {};
}

export function schemaSchemaField(schema: TSchema, field: string): TSchema | undefined {
  const value = schemaUnknownField(schema, field);
  if (field === "items" && Array.isArray(value)) {
    let itemSchema: TSchema | undefined;
    return itemSchema;
  }
  const schemaValue = isSchemaValue(value) ? value : undefined;
  return schemaValue;
}

export function schemaSchemaListField(schema: TSchema, field: string): TSchema[] {
  const value = schemaUnknownField(schema, field);
  return Array.isArray(value) && value.every(isSchemaValue) ? value : [];
}

export function schemaSchemaMapField(schema: TSchema, field: string): Record<string, TSchema> {
  const value = schemaUnknownField(schema, field);
  if (!isRecord(value)) {
    return {};
  }
  return Object.entries(value).reduce<Record<string, TSchema>>((result, [key, entry]) => {
    if (isSchemaValue(entry)) {
      result[key] = entry;
    }
    return result;
  }, {});
}

export function schemaBooleanOrSchemaField(
  schema: TSchema,
  field: string,
): boolean | TSchema | undefined {
  const value = schemaUnknownField(schema, field);
  if (typeof value === "boolean" || value === undefined) {
    return value;
  }
  return isSchemaValue(value) ? value : undefined;
}

export function schemaCallbackField<T extends (...args: never[]) => unknown>(
  schema: TSchema,
  field: string,
): T | undefined {
  const value = schemaUnknownField(schema, field);
  return typeof value === "function" ? (value as T) : undefined;
}

export function schemaItem(schema: TSchema): TSchema | undefined {
  return schemaSchemaField(schema, "item");
}

export function schemaInner(schema: TSchema): TSchema | undefined {
  return schemaSchemaField(schema, "inner");
}

export function schemaItemOrInner(schema: TSchema): TSchema | undefined {
  return schemaItem(schema) ?? schemaInner(schema);
}

export function schemaVariants(schema: TSchema): TSchema[] {
  return schemaSchemaListField(schema, "variants");
}

export function schemaProperties(schema: TSchema): Record<string, TSchema> {
  return schemaSchemaMapField(schema, "properties");
}

export function schemaDefinitions(schema: TSchema): Record<string, TSchema> {
  return schemaSchemaMapField(schema, "$defs");
}

export function schemaPatternProperties(schema: TSchema): Record<string, TSchema> {
  return schemaSchemaMapField(schema, "patternProperties");
}

export function schemaRequiredKeys(schema: TSchema): string[] {
  return schemaStringListField(schema, "required");
}

export function schemaOptionalKeys(schema: TSchema): string[] {
  return schemaStringListField(schema, "optional");
}

export function schemaConst(schema: TSchema): unknown {
  return schemaUnknownField(schema, "const");
}

export function schemaPatterns(schema: TSchema): string[] {
  return schemaStringListField(schema, "patterns");
}

export function schemaRefinements(schema: TSchema): SchemaRefinement[] {
  const value = schemaUnknownField(schema, "~refine");
  return Array.isArray(value)
    ? value.filter(
        (entry): entry is SchemaRefinement =>
          isRecord(entry) &&
          typeof entry.refine === "function" &&
          (entry.message === undefined || typeof entry.message === "string"),
      )
    : [];
}

export function schemaPath(path: readonly string[]): string {
  return path.join(".") || "/";
}
