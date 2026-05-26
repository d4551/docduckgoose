import { isPlainRecord } from "../shared/runtime-guards.js";
import {
  schemaDefinitions,
  schemaInner,
  schemaItem,
  schemaKind,
  schemaProperties,
  schemaSchemaField,
  schemaSchemaListField,
  schemaStringField,
  schemaStringListField,
  schemaUnknownField,
  schemaVariants,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import type { Static } from "../type/static-types.js";

const NOT_HANDLED = Symbol("create.not-handled");

function cloneValue<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    return structuredClone(value);
  }
  return value;
}

/** Generate a default-populated value matching the schema shape */
export function Create<T extends TSchema>(schema: T): Static<T> {
  return CreateInternal(schema, new Map()) as Static<T>;
}

function createPrimitiveValue(
  kind: string | undefined,
  schema: TSchema,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "String":
      return "";
    case "Number":
      return 0;
    case "Integer":
      return 0;
    case "Boolean":
      return false;
    case "Null":
      return null;
    case "BigInt":
      return 0n;
    case "Date":
      return new globalThis.Date(0);
    case "Literal":
      return schemaUnknownField(schema, "const");
    case "Void":
    case "Undefined":
    case "Unknown":
    case "Any":
    case "Never":
      return;
    case "Symbol":
      return globalThis.Symbol();
    case "Uint8Array":
      return new globalThis.Uint8Array(0);
    case "Function":
      return function baoboxCreatedFunction(): undefined {
        return undefined;
      };
    case "Constructor":
      return class {};
    case "Promise":
      return globalThis.Promise.resolve(undefined);
    default:
      return NOT_HANDLED;
  }
}

function createStructuredValue(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Array":
      return [];
    case "Tuple":
      return schemaSchemaListField(schema, "items").map((item) => CreateInternal(item, refs));
    case "Object":
      return createObjectValue(schema, refs);
    case "Record":
    case "Partial":
      return {};
    case "Union":
      return createUnionValue(schema, refs);
    case "Intersect":
      return createIntersectValue(schema, refs);
    case "Readonly":
    case "Immutable":
    case "Optional":
    case "Refine": {
      const itemSchema = schemaItem(schema);
      return itemSchema ? CreateInternal(itemSchema, refs) : undefined;
    }
    case "Enum": {
      const values = schemaStringListField(schema, "values");
      return values.length > 0 ? values[0] : "";
    }
    case "Required":
      return createRequiredValue(schema, refs);
    default:
      return NOT_HANDLED;
  }
}

function createObjectValue(schema: TSchema, refs: Map<string, TSchema>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const properties = schemaProperties(schema);
  const required = schemaStringListField(schema, "required");
  const optionalKeys = new Set(schemaStringListField(schema, "optional"));
  for (const key of required) {
    const propertySchema = properties[key];
    if (propertySchema !== undefined) {
      result[key] = CreateInternal(propertySchema, refs);
    }
  }
  for (const [key, propertySchema] of Object.entries(properties)) {
    if (!(key in result || optionalKeys.has(key))) {
      result[key] = CreateInternal(propertySchema, refs);
    }
  }
  return result;
}

function createUnionValue(schema: TSchema, refs: Map<string, TSchema>): unknown {
  const [firstVariant] = schemaVariants(schema);
  return firstVariant === undefined ? undefined : CreateInternal(firstVariant, refs);
}

function createIntersectValue(
  schema: TSchema,
  refs: Map<string, TSchema>,
): Record<string, unknown> {
  let result: Record<string, unknown> = {};
  for (const variant of schemaVariants(schema)) {
    const nextValue = CreateInternal(variant, refs);
    if (isPlainRecord(nextValue)) {
      result = { ...result, ...nextValue };
    }
  }
  return result;
}

function createRequiredValue(schema: TSchema, refs: Map<string, TSchema>): Record<string, unknown> {
  const objectSchema = schemaSchemaField(schema, "object");
  if (objectSchema === undefined) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(schemaProperties(objectSchema)).map(([key, propertySchema]) => [
      key,
      CreateInternal(propertySchema, refs),
    ]),
  );
}

function createReferenceValue(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
): unknown | typeof NOT_HANDLED {
  switch (kind) {
    case "Ref": {
      const target = refs.get(schemaStringField(schema, "name") ?? "");
      return target ? CreateInternal(target, refs) : undefined;
    }
    case "Recursive": {
      const name = schemaStringField(schema, "name");
      const target = schemaSchemaField(schema, "schema");
      if (!name || target === undefined) {
        return NOT_HANDLED;
      }
      const nextRefs = new Map(refs);
      nextRefs.set(name, target);
      return CreateInternal(target, nextRefs);
    }
    case "Decode":
    case "Encode": {
      const inner = schemaInner(schema);
      return inner ? CreateInternal(inner, refs) : undefined;
    }
    case "Cyclic": {
      const refName = schemaStringField(schema, "$ref");
      const defs = schemaDefinitions(schema);
      const target = refName ? defs[refName] : undefined;
      return target ? CreateInternal(target, refs) : undefined;
    }
    default:
      return NOT_HANDLED;
  }
}

function CreateInternal(schema: TSchema, refs: Map<string, TSchema>): unknown {
  const defaultValue = schemaUnknownField(schema, "default");
  if (defaultValue !== undefined) {
    return cloneValue(defaultValue);
  }

  const kind = schemaKind(schema);
  const primitive = createPrimitiveValue(kind, schema);
  if (primitive !== NOT_HANDLED) {
    return primitive;
  }
  const structured = createStructuredValue(kind, schema, refs);
  if (structured !== NOT_HANDLED) {
    return structured;
  }
  const reference = createReferenceValue(kind, schema, refs);
  return reference === NOT_HANDLED ? undefined : reference;
}
