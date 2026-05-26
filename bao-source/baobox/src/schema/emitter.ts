import { BASE64_FORMAT } from "../shared/format-constants.js";
import {
  schemaConst,
  schemaItem,
  schemaItemOrInner,
  schemaRefinements,
  schemaStringListField,
  schemaUnknownField,
  schemaVariants,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";
import type { TArray, TObject, TRecord, TTuple } from "../type/containers-types.js";
import type { TUint8Array } from "../type/higher-order-types.js";
import type { TInteger, TLiteral, TNumber, TString } from "../type/primitives-types.js";
import { integerSchema, numberSchema, objectLikeSchema, stringSchema } from "./emitter-base.js";
import { emitDerivedSchema } from "./emitter-derived.js";
import { emitReferenceSchema } from "./emitter-reference.js";
import { emitSpecialKindSchema } from "./emitter-special-kinds.js";
import type { ApplyOptions, EmitJsonSchema } from "./emitter-types.js";

/** Base64 encoding ratio numerator (4 output bytes per 3 input bytes). */
const BASE64_RATIO_NUM = 4;
/** Base64 encoding ratio denominator. */
const BASE64_RATIO_DEN = 3;

export interface JsonSchemaOptions {
  descriptions?: boolean;
  titles?: boolean;
  defaults?: boolean;
  examples?: boolean;
  resolveRefs?: boolean;
}

export interface JsonSchema {
  [key: string]: unknown;
  $comment?: string;
  $defs?: Record<string, JsonSchema>;
  $id?: string;
  $ref?: string;
  $schema?: string;
  additionalProperties?: boolean | JsonSchema;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  const?: string | number | boolean | null;
  contains?: JsonSchema;
  contentEncoding?: string;
  default?: unknown;
  deprecated?: boolean;
  description?: string;
  else?: JsonSchema;
  enum?: Array<string | number | boolean | null>;
  examples?: unknown[];
  format?: string;
  if?: JsonSchema;
  items?: boolean | JsonSchema;
  maxContains?: number;
  maxItems?: number;
  maxLength?: number;
  maxProperties?: number;
  minContains?: number;
  minItems?: number;
  minLength?: number;
  minProperties?: number;
  not?: JsonSchema;
  pattern?: string;
  patternProperties?: Record<string, JsonSchema>;
  prefixItems?: JsonSchema[];
  properties?: Record<string, JsonSchema>;
  propertyNames?: JsonSchema;
  readOnly?: boolean;
  required?: string[];
  then?: JsonSchema;
  title?: string;
  type?: string | string[];
  uniqueItems?: boolean;
  writeOnly?: boolean;
}

export interface JsonSchemaResult {
  schema: JsonSchema;
  definitions: Record<string, JsonSchema>;
}

const JSON_SCHEMA_DATE_TIME_FORMAT = "date-time";

function toJsonLiteralValue(value: unknown): JsonSchema["const"] | undefined {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  ) {
    return value;
  }
}

export function Schema(schema: TSchema, options: JsonSchemaOptions = {}): JsonSchemaResult {
  const refs = new Map<string, TSchema>();
  const emitted = toJsonSchema(schema, refs, options);
  const result: JsonSchema = { ...emitted };
  const definitions: Record<string, JsonSchema> = {};
  for (const [name, refSchema] of refs) {
    definitions[name] = toJsonSchema(refSchema, refs, options);
  }
  if (Object.keys(definitions).length > 0) {
    result.$defs = definitions;
  }
  return { schema: result, definitions };
}

export function To(schema: TSchema, options: JsonSchemaOptions = {}): JsonSchema {
  return toJsonSchema(schema, new Map(), options ?? {});
}

function applySchemaOptions(schema: TSchema, options: JsonSchemaOptions): ApplyOptions {
  const { descriptions = true, titles = true, defaults = true, examples = true } = options;
  return (obj: JsonSchema, extra: JsonSchema = {}): JsonSchema => {
    const result: JsonSchema = { ...obj, ...extra };
    const description = schemaUnknownField(schema, "description");
    const title = schemaUnknownField(schema, "title");
    const defaultValue = schemaUnknownField(schema, "default");
    const examplesValue = schemaUnknownField(schema, "examples");
    const deprecated = schemaUnknownField(schema, "deprecated");
    const readOnly = schemaUnknownField(schema, "readOnly");
    const writeOnly = schemaUnknownField(schema, "writeOnly");
    const $id = schemaUnknownField(schema, "$id");
    const $schema = schemaUnknownField(schema, "$schema");
    if (descriptions && typeof description === "string") {
      result.description = description;
    }
    if (titles && typeof title === "string") {
      result.title = title;
    }
    if (defaults && defaultValue !== undefined) {
      result.default = defaultValue;
    }
    if (examples && examplesValue !== undefined) {
      result.examples = Array.isArray(examplesValue) ? examplesValue : [examplesValue];
    }
    if (typeof deprecated === "boolean") {
      result.deprecated = deprecated;
    }
    if (typeof readOnly === "boolean") {
      result.readOnly = readOnly;
    }
    if (typeof writeOnly === "boolean") {
      result.writeOnly = writeOnly;
    }
    if (typeof $id === "string") {
      result.$id = $id;
    }
    if (typeof $schema === "string") {
      result.$schema = $schema;
    }
    return result;
  };
}

function emitBuiltInSchema(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema | undefined {
  const scalarSchema = emitScalarSchema(kind, schema, opt);
  if (scalarSchema !== undefined) {
    return scalarSchema;
  }
  const collectionSchema = emitCollectionSchema(kind, schema, refs, options, opt, emit);
  if (collectionSchema !== undefined) {
    return collectionSchema;
  }
  return emitDecoratedSchema(kind, schema, refs, options, emit);
}

function emitScalarSchema(
  kind: string | undefined,
  schema: TSchema,
  opt: ApplyOptions,
): JsonSchema | undefined {
  switch (kind) {
    case "String":
      return opt(stringSchema(schema as TString));
    case "Uint8Array": {
      const bytes = schema as TUint8Array;
      return opt({
        type: "string",
        contentEncoding: BASE64_FORMAT,
        ...(bytes.minByteLength === undefined
          ? {}
          : { minLength: Math.ceil((bytes.minByteLength * BASE64_RATIO_NUM) / BASE64_RATIO_DEN) }),
        ...(bytes.maxByteLength === undefined
          ? {}
          : { maxLength: Math.ceil((bytes.maxByteLength * BASE64_RATIO_NUM) / BASE64_RATIO_DEN) }),
        $comment:
          "Uint8Array runtime values are represented as base64 strings in emitted JSON Schema.",
      });
    }
    case "RegExpInstance":
      return opt({
        type: "object",
        $comment: "RegExpInstance validates actual RegExp objects; no JSON Schema equivalent.",
      });
    case "Number":
      return opt(numberSchema(schema as TNumber));
    case "Integer":
      return opt(integerSchema(schema as TInteger));
    case "Boolean":
      return opt({ type: "boolean" });
    case "Null":
      return opt({ type: "null" });
    case "BigInt":
      return opt({
        type: "string",
        $comment: "BigInt runtime value; no native JSON Schema equivalent.",
      });
    case "Date":
      return opt({
        type: "string",
        format: JSON_SCHEMA_DATE_TIME_FORMAT,
        $comment: "Date runtime instance; validated as native Date at runtime.",
      });
    case "Literal": {
      const literalValue = toJsonLiteralValue(
        schemaConst(schema as TLiteral<string | number | boolean>),
      );
      return opt(literalValue === undefined ? {} : { const: literalValue });
    }
    case "Void":
      return opt({ type: "null", description: "void (undefined or null)" });
    case "Undefined":
      return opt({ not: {}, description: "undefined" });
    case "Unknown":
    case "Any":
      return opt({});
    case "Never":
      return opt({ not: {} });
    case "Enum":
      return opt({ type: "string", enum: schemaStringListField(schema, "values") });
    default:
      return;
  }
}

function emitCollectionSchema(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema | undefined {
  const indexedCollectionSchema = emitIndexedCollectionSchema(
    kind,
    schema,
    refs,
    options,
    opt,
    emit,
  );
  if (indexedCollectionSchema !== undefined) {
    return indexedCollectionSchema;
  }
  return emitStructuredCollectionSchema(kind, schema, refs, options, opt, emit);
}

function emitIndexedCollectionSchema(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema | undefined {
  if (kind === "Array") {
    return emitArrayCollectionSchema(schema as TArray, refs, options, opt, emit);
  }
  if (kind === "Tuple") {
    return emitTupleCollectionSchema(schema as TTuple, refs, options, opt, emit);
  }
}

function emitArrayCollectionSchema(
  schema: TArray,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema {
  return opt({
    type: "array",
    items: emit(schema.items, refs, options),
    ...(schema.minItems === undefined ? {} : { minItems: schema.minItems }),
    ...(schema.maxItems === undefined ? {} : { maxItems: schema.maxItems }),
    ...(schema.uniqueItems ? { uniqueItems: true } : {}),
    ...(schema.contains === undefined ? {} : { contains: emit(schema.contains, refs, options) }),
    ...(schema.minContains === undefined ? {} : { minContains: schema.minContains }),
    ...(schema.maxContains === undefined ? {} : { maxContains: schema.maxContains }),
  });
}

function emitTupleCollectionSchema(
  schema: TTuple,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema {
  return opt({
    type: "array",
    prefixItems: schema.items.map((item) => emit(item, refs, options)),
    minItems: schema.minItems ?? schema.items.length,
    ...(schema.maxItems === undefined
      ? schema.additionalItems === true
        ? {}
        : { maxItems: schema.items.length }
      : { maxItems: schema.maxItems }),
    items: schema.additionalItems === true ? {} : false,
  });
}

function emitStructuredCollectionSchema(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema | undefined {
  switch (kind) {
    case "Object":
      return opt(
        objectLikeSchema(
          schema as TObject<Record<string, TSchema>, string, string>,
          refs,
          options,
          emit,
        ),
      );
    case "Record": {
      const record = schema as TRecord;
      return opt({
        type: "object",
        propertyNames: emit(record.key, refs, options),
        additionalProperties: emit(record.value, refs, options),
        ...(record.minProperties === undefined ? {} : { minProperties: record.minProperties }),
        ...(record.maxProperties === undefined ? {} : { maxProperties: record.maxProperties }),
      });
    }
    case "Union":
      return opt({ anyOf: schemaVariants(schema).map((entry) => emit(entry, refs, options)) });
    case "Intersect":
      return opt({ allOf: schemaVariants(schema).map((entry) => emit(entry, refs, options)) });
    default:
      return;
  }
}

function emitDecoratedSchema(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  emit: EmitJsonSchema,
): JsonSchema | undefined {
  switch (kind) {
    case "Optional":
      return {
        ...emit(schemaItem(schema) ?? schema, refs, options),
        $comment:
          "Optional schema accepts undefined at runtime; JSON Schema represents the defined-value branch only.",
      };
    case "Readonly":
    case "Immutable":
      return emit(schemaItem(schema) ?? schema, refs, options);
    case "Codec":
      return emit(schemaItemOrInner(schema) ?? schema, refs, options);
    case "Refine": {
      const emitted = emit(schemaItem(schema) ?? schema, refs, options);
      const messages = schemaRefinements(schema).flatMap((entry) =>
        entry.message === undefined ? [] : [entry.message],
      );
      return { ...emitted, ...(messages.length > 0 ? { $comment: messages.join("; ") } : {}) };
    }
    default:
      return;
  }
}

function toJsonSchema(
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
): JsonSchema {
  const kind = schemaUnknownField(schema, "~kind");
  const resolvedKind = typeof kind === "string" ? kind : undefined;
  const opt = applySchemaOptions(schema, options);
  const emit: EmitJsonSchema = (nextSchema, nextRefs, nextOptions) =>
    toJsonSchema(nextSchema, nextRefs, nextOptions);

  return (
    emitBuiltInSchema(resolvedKind, schema, refs, options, opt, emit) ??
    emitReferenceSchema(resolvedKind, schema, refs, options, opt, emit) ??
    emitSpecialKindSchema(resolvedKind, schema, refs, options, opt, emit) ??
    emitDerivedSchema(resolvedKind, schema, refs, options, opt, emit) ??
    {}
  );
}
