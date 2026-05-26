import { isUint8ArrayBase64String } from "../shared/bytes.js";
import {
  type DeriveObjectOptions,
  deriveIndexSchemas,
  deriveObjectSchema,
} from "../shared/object-utils.js";
import {
  schemaCallbackField,
  schemaDefinitions,
  schemaItem,
  schemaItemOrInner,
  schemaKind,
  schemaNumberField,
  schemaProperties,
  schemaRefinements,
  schemaSchemaField,
  schemaSchemaListField,
  schemaStringField,
  schemaUnknownField,
  schemaVariants,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import type { TObject } from "../type/containers-types.js";

type CheckFn = (schema: TSchema, value: unknown, refs: Map<string, TSchema>) => boolean;

function isObjectSchema(
  schema: TSchema | undefined,
): schema is TObject<Record<string, TSchema>, string, string> {
  return schema !== undefined && schemaKind(schema) === "Object";
}

function readDerivedKeys(schema: TSchema): string[] {
  const keys = schemaUnknownField(schema, "keys");
  return Array.isArray(keys) ? keys.map(String) : [];
}

function withRecursiveRefs(
  name: string,
  target: TSchema,
  refs: Map<string, TSchema>,
): Map<string, TSchema> {
  const nextRefs = new Map(refs);
  nextRefs.set(name, target);
  nextRefs.set("#", target);
  return nextRefs;
}

function withCyclicRefs(schema: TSchema, refs: Map<string, TSchema>): Map<string, TSchema> {
  const nextRefs = new Map(refs);
  for (const [name, definition] of Object.entries(schemaDefinitions(schema))) {
    nextRefs.set(name, definition);
  }
  return nextRefs;
}

function checkSchemaPair(
  schema: TSchema,
  predicate: (left: TSchema, right: TSchema) => boolean,
): boolean {
  const left = schemaSchemaField(schema, "left");
  const right = schemaSchemaField(schema, "right");
  return left !== undefined && right !== undefined ? predicate(left, right) : false;
}

function checkDerivedObject(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
  options: DeriveObjectOptions,
): boolean {
  const objectSchema = schemaSchemaField(schema, "object");
  return isObjectSchema(objectSchema)
    ? check(deriveObjectSchema(objectSchema, options), value, refs)
    : false;
}

function checkIndexCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  const objectSchema = schemaSchemaField(schema, "object");
  const keySchema = schemaSchemaField(schema, "key");
  if (!isObjectSchema(objectSchema) || keySchema === undefined) {
    return false;
  }
  const candidates = deriveIndexSchemas(objectSchema, keySchema, (candidate, candidateValue) =>
    check(candidate, candidateValue, new Map()),
  );
  return candidates.length > 0 && candidates.some((candidate) => check(candidate, value, refs));
}

function checkMappedCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  const objectSchema = schemaSchemaField(schema, "object");
  if (!isObjectSchema(objectSchema)) {
    return false;
  }
  const transform = schemaCallbackField<(sch: TSchema, key: string) => TSchema>(
    schema,
    "transform",
  );
  if (!transform) {
    return check(objectSchema, value, refs);
  }
  const transformedProperties: Record<string, TSchema> = {};
  for (const [key, propertySchema] of Object.entries(schemaProperties(objectSchema))) {
    transformedProperties[key] = transform(propertySchema, key);
  }
  const transformedSchema: TObject<Record<string, TSchema>, string, string> = {
    ...objectSchema,
    properties: transformedProperties,
  };
  return check(transformedSchema, value, refs);
}

function checkConditionalCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  const checkSchema = schemaSchemaField(schema, "check");
  if (checkSchema === undefined) {
    return false;
  }
  if (check(checkSchema, value, refs)) {
    return schemaSchemaListField(schema, "union").some((candidate) =>
      check(candidate, value, refs),
    );
  }
  const defaultSchema = schemaSchemaField(schema, "default");
  return defaultSchema === undefined ? true : check(defaultSchema, value, refs);
}

function checkRefineCollection(
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean {
  if (schemaUnknownField(schema, "~uint8arrayCodec") === true) {
    const constBytes = schemaUnknownField(schema, "constBytes");
    return isUint8ArrayBase64String(
      value,
      schemaNumberField(schema, "minByteLength"),
      schemaNumberField(schema, "maxByteLength"),
      constBytes instanceof Uint8Array ? constBytes : undefined,
      schemaStringField(schema, "constBase64"),
    );
  }
  const itemSchema = schemaItem(schema);
  return (
    itemSchema !== undefined &&
    check(itemSchema, value, refs) &&
    schemaRefinements(schema).every((entry) => entry.refine(value))
  );
}

export function checkReferenceCollection(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean | undefined {
  switch (kind) {
    case "Union":
      return schemaVariants(schema).some((variant) => check(variant, value, refs));
    case "Intersect":
      return schemaVariants(schema).every((variant) => check(variant, value, refs));
    case "Optional": {
      const itemSchema = schemaItem(schema);
      return value === undefined || (itemSchema ? check(itemSchema, value, refs) : false);
    }
    case "Readonly":
    case "Immutable":
    case "Codec": {
      const inner = schemaItemOrInner(schema);
      return inner ? check(inner, value, refs) : false;
    }
    case "Ref": {
      const target = refs.get(schemaStringField(schema, "name") ?? "");
      return target ? check(target, value, refs) : false;
    }
    case "Recursive": {
      const name = schemaStringField(schema, "name");
      const target = schemaSchemaField(schema, "schema");
      return name && target !== undefined
        ? check(target, value, withRecursiveRefs(name, target, refs))
        : false;
    }
    case "Cyclic": {
      const defs = schemaDefinitions(schema);
      const refName = schemaStringField(schema, "$ref");
      const target = refName ? defs[refName] : undefined;
      return target ? check(target, value, withCyclicRefs(schema, refs)) : false;
    }
    case "Exclude":
      return checkSchemaPair(
        schema,
        (left, right) => check(left, value, refs) && !check(right, value, refs),
      );
    case "Extract":
      return checkSchemaPair(
        schema,
        (left, right) => check(left, value, refs) && check(right, value, refs),
      );
    default:
      return;
  }
}

export function checkDerivedCollection(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  refs: Map<string, TSchema>,
  check: CheckFn,
): boolean | undefined {
  switch (kind) {
    case "Partial":
      return checkDerivedObject(schema, value, refs, check, { requiredMode: "none" });
    case "Required":
      return checkDerivedObject(schema, value, refs, check, { requiredMode: "all" });
    case "KeyOf": {
      const objectSchema = schemaSchemaField(schema, "object");
      return isObjectSchema(objectSchema)
        ? typeof value === "string" && Object.keys(schemaProperties(objectSchema)).includes(value)
        : false;
    }
    case "Pick":
      return checkDerivedObject(schema, value, refs, check, {
        pickKeys: readDerivedKeys(schema),
        additionalProperties: false,
      });
    case "Omit":
      return checkDerivedObject(schema, value, refs, check, {
        omitKeys: readDerivedKeys(schema),
        additionalProperties: false,
      });
    case "Not": {
      const target = schemaSchemaField(schema, "schema");
      return target ? !check(target, value, refs) : false;
    }
    case "IfThenElse": {
      const checkSchema = schemaSchemaField(schema, "if");
      const thenSchema = schemaSchemaField(schema, "then");
      const elseSchema = schemaSchemaField(schema, "else");
      if (checkSchema === undefined || thenSchema === undefined || elseSchema === undefined) {
        return false;
      }
      return check(checkSchema, value, refs)
        ? check(thenSchema, value, refs)
        : check(elseSchema, value, refs);
    }
    case "Index":
      return checkIndexCollection(schema, value, refs, check);
    case "Mapped":
      return checkMappedCollection(schema, value, refs, check);
    case "Conditional":
      return checkConditionalCollection(schema, value, refs, check);
    case "Rest": {
      const items = schemaSchemaField(schema, "items");
      return (
        Array.isArray(value) &&
        items !== undefined &&
        value.every((item) => check(items, item, refs))
      );
    }
    case "Refine":
      return checkRefineCollection(schema, value, refs, check);
    default:
      return;
  }
}
