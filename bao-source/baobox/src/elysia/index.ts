/**
 * Elysia integration for baobox schemas.
 *
 * The top-level module exports remain the baobox schema surface so callers can
 * continue to use `Check`, `Value`, and the baobox builder namespace together.
 * The `t` namespace is now aliased to baobox's own `TypeExports` builders,
 * stamping the TypeBox [Kind] symbol that Elysia's type system recognizes at
 * runtime.
 */

import type { CompileOptions, Validator, ValidatorArtifact } from "../compile/index.js";
import { Compile } from "../compile/index.js";
import { Script } from "../script/index.js";
import {
  schemaSchemaField,
  schemaSchemaListField,
  schemaSchemaMapField,
  schemaVariants,
} from "../shared/schema-access.js";
import { Hint, Kind, OptionalKind } from "../shared/symbols.js";
import type {
  TIdentifier,
  TInterface,
  TNonNullable,
  TOptions,
  TParameter,
  TReadonlyType,
  TThis,
} from "../type/actions.js";
import * as Actions from "../type/actions.js";
import type { TKind, TSchema, TStandardSchema } from "../type/base-types.js";
import type { TBigIntCodec, TDateCodec, TURLCodec, URLLike } from "../type/codec-builtins.js";
import * as CodecBuiltins from "../type/codec-builtins.js";
import * as CombinatorCore from "../type/combinator-core.js";
import * as CombinatorFunctions from "../type/combinator-functions.js";
import * as CombinatorObjects from "../type/combinator-objects.js";
import type {
  TEnum,
  TIntersect,
  TOptional,
  TReadonly,
  TRecursive,
  TRef,
  TUnion,
} from "../type/composite-types.js";
import * as Containers from "../type/containers.js";
import type {
  InferOptionalKeys,
  InferRequiredKeys,
  TArray,
  TObject,
  TRecord,
  TTuple,
} from "../type/containers-types.js";
import type { TExtends, TExtendsResult } from "../type/extends.js";
import * as ExtendsExports from "../type/extends.js";
import type {
  TCall,
  TCodec,
  TCyclic,
  TGeneric,
  TImmutable,
  TInfer,
  TRefinement,
} from "../type/extensions.js";
import * as Extensions from "../type/extensions.js";
import * as Guards from "../type/guards.js";
import type {
  TAsyncIterator,
  TAwaited,
  TConstructor,
  TConstructorParameters,
  TDecode,
  TEncode,
  TFunction,
  TInstanceType,
  TIterator,
  TModule,
  TParameters,
  TPromise,
  TRegExpInstance,
  TReturnType,
  TUint8Array,
} from "../type/higher-order-types.js";
import type { TInstantiate, TProperties } from "../type/instantiation.js";
import * as Instantiation from "../type/instantiation.js";
import type { TExclude, TExtract, TTemplateLiteral, TUnsafe } from "../type/narrow-types.js";
import * as Primitives from "../type/primitives.js";
import type {
  TAny,
  TBigInt,
  TBoolean,
  TDate,
  TInteger,
  TLiteral,
  TNever,
  TNull,
  TNumber,
  TString,
  TSymbol,
  TUndefined,
  TUnknown,
  TVoid,
} from "../type/primitives-types.js";
import type {
  TOptionalAddAction,
  TOptionalRemoveAction,
  TReadonlyAddAction,
  TReadonlyRemoveAction,
} from "../type/root-constants.js";
import type { TDeferred, TInterfaceDeferred } from "../type/root-deferred.js";
import { withSchemaFields } from "../type/root-shared.js";
import type {
  TArrayOptions,
  TEnumValue,
  TFormat,
  TIntersectOptions,
  TLiteralValue,
  TNumberOptions,
  TObjectOptions,
  TProperties as TPropertiesRecord,
  TSchemaOptions,
  TStringOptions,
  TTupleOptions,
} from "../type/schema-options.js";
import type { Static, StaticDecode, StaticEncode, StaticParse } from "../type/static-types.js";
import type {
  TCapitalize,
  TLowercase,
  TRest,
  TUncapitalize,
  TUppercase,
} from "../type/string-action-types.js";
import type {
  TConditional,
  TIfThenElse,
  TIndex,
  TKeyOf,
  TMapped,
  TNot,
  TOmit,
  TPartial,
  TPick,
  TRequired,
} from "../type/transform-types.js";
import * as Uint8ArrayCodecExports from "../type/uint8array-codec.js";
import { Value } from "../value/index.js";

export type {
  CompileOptions,
  InferOptionalKeys,
  InferRequiredKeys,
  Static,
  StaticDecode,
  StaticEncode,
  StaticParse,
  TAny,
  TArray,
  TArrayOptions,
  TAsyncIterator,
  TAwaited,
  TBigInt,
  TBigIntCodec,
  TBoolean,
  TCall,
  TCapitalize,
  TCodec,
  TConditional,
  TConstructor,
  TConstructorParameters,
  TCyclic,
  TDate,
  TDateCodec,
  TDecode,
  TDeferred,
  TEncode,
  TEnum,
  TEnumValue,
  TExclude,
  TExtends,
  TExtendsResult,
  TExtract,
  TFormat,
  TFunction,
  TGeneric,
  TIdentifier,
  TIfThenElse,
  TImmutable,
  TIndex,
  TInfer,
  TInstanceType,
  TInstantiate,
  TInteger,
  TInterface,
  TInterfaceDeferred,
  TIntersect,
  TIntersectOptions,
  TIterator,
  TKeyOf,
  TKind,
  TLiteral,
  TLiteralValue,
  TLowercase,
  TMapped,
  TModule,
  TNever,
  TNonNullable,
  TNot,
  TNull,
  TNumber,
  TNumberOptions,
  TObject,
  TObjectOptions,
  TOmit,
  TOptional,
  TOptionalAddAction,
  TOptionalRemoveAction,
  TOptions,
  TParameter,
  TParameters,
  TPartial,
  TPick,
  TPromise,
  TProperties,
  TPropertiesRecord,
  TReadonly,
  TReadonlyAddAction,
  TReadonlyRemoveAction,
  TReadonlyType,
  TRecord,
  TRecursive,
  TRef,
  TRefinement,
  TRegExpInstance,
  TRequired,
  TRest,
  TReturnType,
  TSchema,
  TSchemaOptions,
  TString,
  TStringOptions,
  TSymbol,
  TTemplateLiteral,
  TThis,
  TTuple,
  TTupleOptions,
  TUint8Array,
  TUncapitalize,
  TUndefined,
  TUnion,
  TUnknown,
  TUnsafe,
  TUppercase,
  TURLCodec,
  TVoid,
  URLLike,
  Validator,
  ValidatorArtifact,
};

type MaybeArray<T> = T | T[];
type ElysiaEnumValue = string | number | null;
export type NonEmptyArray<T> = [T, ...T[]];

export type StrictFileType =
  | "image"
  | "image/*"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/tiff"
  | "image/x-icon"
  | "image/svg"
  | "image/webp"
  | "image/avif"
  | "audio"
  | "audio/*"
  | "audio/aac"
  | "audio/mpeg"
  | "audio/x-ms-wma"
  | "audio/vnd.rn-realaudio"
  | "audio/x-wav"
  | "video"
  | "video/*"
  | "video/mpeg"
  | "video/mp4"
  | "video/quicktime"
  | "video/x-ms-wmv"
  | "video/x-msvideo"
  | "video/x-flv"
  | "video/webm"
  | "text"
  | "text/*"
  | "text/css"
  | "text/csv"
  | "text/html"
  | "text/javascript"
  | "text/plain"
  | "text/xml"
  | "application"
  | "application/*"
  | "application/graphql"
  | "application/graphql-response+json"
  | "application/ogg"
  | "application/pdf"
  | "application/xhtml"
  | "application/xhtml+html"
  | "application/xml-dtd"
  | "application/html"
  | "application/json"
  | "application/ld+json"
  | "application/xml"
  | "application/zip"
  | "font"
  | "font/*"
  | "font/woff2"
  | "font/woff"
  | "font/ttf"
  | "font/otf";

export type FileType = (string & {}) | StrictFileType;
export type FileUnit = number | `${number}${"k" | "m"}`;

export interface FileOptions extends TSchemaOptions {
  type?: MaybeArray<FileType>;
  minSize?: FileUnit;
  maxSize?: FileUnit;
}

export interface FilesOptions extends FileOptions {
  minItems?: number;
  maxItems?: number;
}

export interface TFile extends TSchema, TStandardSchema<File> {
  [Kind]: "File";
  "~kind": "File";
  static: File;
  type: "string";
  format: "binary";
  default?: string;
  extension?: MaybeArray<FileType>;
}

export interface TFiles extends TSchema, TStandardSchema<File[]> {
  [Kind]: "Files";
  "~kind": "Files";
  static: File[];
  type: "array";
  items: TFile;
  default?: string;
  elysiaMeta?: "Files";
  extension?: MaybeArray<FileType>;
  minItems?: number;
  maxItems?: number;
}

export interface TUnionEnum<
  TValues extends NonEmptyArray<ElysiaEnumValue> | Readonly<NonEmptyArray<ElysiaEnumValue>>,
> extends TSchema {
  readonly "~standard": import("../type/base-types.js").StandardSchemaV1Props<
    unknown,
    TValues[number]
  >;
  [Kind]: "UnionEnum";
  "~kind": "UnionEnum";
  static: TValues[number];
  enum: TValues;
  type?: "number" | "string" | "null";
}

function Nullable<T extends TSchema>(schema: T, options?: TSchemaOptions): TUnion<[T, TNull]> {
  return decorateSchema(
    CombinatorCore.Union([schema, Primitives.Null()], { ...options, nullable: true }),
  );
}

function MaybeEmpty<T extends TSchema>(
  schema: T,
  options?: TSchemaOptions,
): TUnion<[T, TNull, TUndefined]> {
  return decorateSchema(
    CombinatorCore.Union([schema, Primitives.Null(), Primitives.Undefined()], options),
  );
}

function resolveUnionEnumType(
  values: readonly ElysiaEnumValue[],
): Pick<TUnionEnum<NonEmptyArray<ElysiaEnumValue>>, "type"> {
  if (values.every((value) => typeof value === "string")) {
    return { type: "string" };
  }
  if (values.every((value) => typeof value === "number")) {
    return { type: "number" };
  }
  if (values.every((value) => value === null)) {
    return { type: "null" };
  }
  return {};
}

function UnionEnum<
  const TValues extends NonEmptyArray<ElysiaEnumValue> | Readonly<NonEmptyArray<ElysiaEnumValue>>,
>(values: TValues, options: TSchemaOptions = {}): TUnionEnum<TValues> {
  return withSchemaFields({
    "~kind": "UnionEnum",
    default: values[0],
    ...options,
    ...resolveUnionEnumType(values),
    enum: values,
  }) as TUnionEnum<TValues>;
}

function File(options: Partial<FileOptions> = {}): TFile {
  return withSchemaFields({
    "~kind": "File",
    default: "File",
    ...options,
    extension: options.type,
    type: "string",
    format: "binary",
  }) as TFile;
}

function Files(options: Partial<FilesOptions> = {}): TFiles {
  return withSchemaFields({
    "~kind": "Files",
    default: "Files",
    ...options,
    extension: options.type,
    elysiaMeta: "Files",
    type: "array",
    items: File(options),
  }) as TFiles;
}

/**
 * Full type builder surface. Mirrors the upstream `@sinclair/typebox` `Type` API: a single
 * identifier carries both the runtime schema builders (`TypeExports.Object(...)`) and the
 * type aliases (`TypeExports.TObject<...>`) via const+namespace declaration merging. This
 * matches the documented TypeBox pattern and lets call sites use
 * `import { TypeExports as Type } from 'baobox/elysia'` for both schema construction and
 * schema-type parameters.
 */
export const TypeExports = {
  ...Actions,
  ...CodecBuiltins,
  ...CombinatorCore,
  ...CombinatorFunctions,
  ...CombinatorObjects,
  ...Containers,
  ...ExtendsExports,
  ...Extensions,
  ...Guards,
  ...Instantiation,
  ...Primitives,
  ...Uint8ArrayCodecExports,
  File,
  Files,
  MaybeEmpty,
  Nullable,
  Object: createElysiaObjectSchema,
  Script,
  UnionEnum,
};

export namespace TypeExports {
  export type TAny = import("../type/primitives-types.js").TAny;
  export type TBigInt = import("../type/primitives-types.js").TBigInt;
  export type TBoolean = import("../type/primitives-types.js").TBoolean;
  export type TDate = import("../type/primitives-types.js").TDate;
  export type TInteger = import("../type/primitives-types.js").TInteger;
  export type TLiteral<TValue extends string | number | boolean> =
    import("../type/primitives-types.js").TLiteral<TValue>;
  export type TNever = import("../type/primitives-types.js").TNever;
  export type TNull = import("../type/primitives-types.js").TNull;
  export type TNumber = import("../type/primitives-types.js").TNumber;
  export type TString = import("../type/primitives-types.js").TString;
  export type TSymbol = import("../type/primitives-types.js").TSymbol;
  export type TUndefined = import("../type/primitives-types.js").TUndefined;
  export type TUnknown = import("../type/primitives-types.js").TUnknown;
  export type TVoid = import("../type/primitives-types.js").TVoid;

  export type TSchema = import("../type/base-types.js").TSchema;
  export type TKind = import("../type/base-types.js").TKind;
  export type TSchemaOptions = import("../type/schema-options.js").TSchemaOptions;
  export type TArrayOptions = import("../type/schema-options.js").TArrayOptions;
  export type TIntersectOptions = import("../type/schema-options.js").TIntersectOptions;
  export type TNumberOptions = import("../type/schema-options.js").TNumberOptions;
  export type TObjectOptions = import("../type/schema-options.js").TObjectOptions;
  export type TStringOptions = import("../type/schema-options.js").TStringOptions;
  export type TTupleOptions = import("../type/schema-options.js").TTupleOptions;
  export type TFormat = import("../type/schema-options.js").TFormat;
  export type TLiteralValue = import("../type/schema-options.js").TLiteralValue;
  export type TEnumValue = import("../type/schema-options.js").TEnumValue;
  export type TProperties = import("../type/schema-options.js").TProperties;

  export type TArray<T extends TSchema = TSchema> = import("../type/containers-types.js").TArray<T>;
  export type TObject<
    TProps extends Record<string, TSchema> = Record<string, TSchema>,
    TReq extends keyof TProps = never,
    TOpt extends keyof TProps = never,
  > = import("../type/containers-types.js").TObject<TProps, TReq, TOpt>;
  export type TTuple<TItems extends TSchema[] = TSchema[]> =
    import("../type/containers-types.js").TTuple<TItems>;
  export type TRecord<
    TKey extends TString | TSchema = TString,
    TValue extends TSchema = TSchema,
  > = import("../type/containers-types.js").TRecord<TKey, TValue>;
  export type InferOptionalKeys<T extends Record<string, TSchema>> =
    import("../type/containers-types.js").InferOptionalKeys<T>;
  export type InferRequiredKeys<T extends Record<string, TSchema>> =
    import("../type/containers-types.js").InferRequiredKeys<T>;

  export type TUnion<TOptionsArr extends TSchema[] = TSchema[]> =
    import("../type/composite-types.js").TUnion<TOptionsArr>;
  export type TIntersect<TOptionsArr extends TSchema[] = TSchema[]> =
    import("../type/composite-types.js").TIntersect<TOptionsArr>;
  export type TOptional<T extends TSchema> = import("../type/composite-types.js").TOptional<T>;
  export type TReadonly<T extends TSchema> = import("../type/composite-types.js").TReadonly<T>;
  export type TRecursive<T extends TSchema = TSchema> =
    import("../type/composite-types.js").TRecursive<T>;
  export type TRef<T extends TSchema = TSchema> = import("../type/composite-types.js").TRef<T>;
  export type TEnum<TValues extends readonly TEnumValue[] = readonly TEnumValue[]> =
    import("../type/composite-types.js").TEnum<TValues>;
  export type TFile = import("./index.js").TFile;
  export type TFiles = import("./index.js").TFiles;
  export type TUnionEnum<
    TValues extends
      | import("./index.js").NonEmptyArray<string | number | null>
      | Readonly<import("./index.js").NonEmptyArray<string | number | null>>,
  > = import("./index.js").TUnionEnum<TValues>;

  export type TObjectLike = import("../type/containers-types.js").TObject<
    Record<string, TSchema>,
    string,
    string
  >;
  export type TPartial<T extends TObjectLike> = import("../type/transform-types.js").TPartial<T>;
  export type TPick<
    T extends TObjectLike,
    K extends keyof T["properties"],
  > = import("../type/transform-types.js").TPick<T, K>;
  export type TOmit<
    T extends TObjectLike,
    K extends keyof T["properties"],
  > = import("../type/transform-types.js").TOmit<T, K>;
  export type TRequired<T extends TObjectLike> = import("../type/transform-types.js").TRequired<T>;

  export type TInterface<
    Heritage extends TObject[] = TObject[],
    Properties extends Record<string, TSchema> = Record<string, TSchema>,
  > = import("../type/actions.js").TInterface<Heritage, Properties>;
  export type TIdentifier<Name extends string = string> =
    import("../type/actions.js").TIdentifier<Name>;
  export type TParameter<
    Name extends string = string,
    Schema extends TSchema = TSchema,
  > = import("../type/actions.js").TParameter<Name, Schema>;
  export type TThis = import("../type/actions.js").TThis;
  export type TNonNullable<T extends TSchema> = import("../type/actions.js").TNonNullable<T>;
  export type TOptions<
    T extends TSchema,
    O extends Record<string, unknown>,
  > = import("../type/actions.js").TOptions<T, O>;
  export type TReadonlyType<T extends TSchema> = import("../type/actions.js").TReadonlyType<T>;
}

const t = TypeExports;

export { Compile, Hint, Kind, t, Value };

const SCHEMA_NODE_KEYS = [
  "item",
  "key",
  "value",
  "inner",
  "schema",
  "object",
  "if",
  "then",
  "else",
] as const;

/**
 * Map baobox `~kind` values to their JSON Schema `type` discriminator.
 *
 * TypeBox's `IsSchema()` type guards require the standard JSON Schema `type`
 * field on built-in types (e.g. `IsString` checks `value.type === 'string'`).
 * Baobox schemas omit `type` by design, using only `~kind`. This map provides
 * the JSON Schema discriminator that Elysia's TypeCompiler preflight expects.
 */
const KIND_TO_JSON_SCHEMA_TYPE: Readonly<Record<string, string>> = {
  String: "string",
  Number: "number",
  Integer: "integer",
  Boolean: "boolean",
  Null: "null",
  Array: "array",
  Object: "object",
  BigInt: "bigint",
  Symbol: "symbol",
  Void: "void",
  Undefined: "undefined",
  Unknown: "unknown",
  Any: "any",
  Never: "never",
};

function decorateSchemaNode(schema: unknown, visited: WeakSet<object>): void {
  if (typeof schema !== "object" || schema === null) {
    return;
  }

  decorateSchemaRecursive(schema, visited);
}

function decorateSchemaNodeArray(schemas: unknown, visited: WeakSet<object>): void {
  if (!globalThis.Array.isArray(schemas)) {
    return;
  }

  for (const schema of schemas) {
    decorateSchemaNode(schema, visited);
  }
}

function decorateSchemaRecordChildren(schemas: unknown, visited: WeakSet<object>): void {
  if (typeof schemas !== "object" || schemas === null) {
    return;
  }

  for (const schema of globalThis.Object.values(schemas)) {
    decorateSchemaNode(schema, visited);
  }
}

function markOptionalPropertySchema(schema: TSchema): void {
  Object.defineProperty(schema, OptionalKind, {
    configurable: true,
    enumerable: true,
    value: "Optional",
    writable: true,
  });
}

function decorateSchemaProperty(schema: TSchema, visited: WeakSet<object>): TSchema {
  if (schema["~kind"] !== "Optional") {
    decorateSchemaNode(schema, visited);
    return schema;
  }

  const item = schemaSchemaField(schema, "item");
  if (item === undefined) {
    decorateSchemaNode(schema, visited);
    return schema;
  }

  markOptionalPropertySchema(item);
  decorateSchemaNode(item, visited);
  return item;
}

function recordPatternForKey(key: TSchema | undefined): string {
  const literal = key?.const;
  return typeof literal === "string" ? `^${literal}$` : "^.*$";
}

function decorateRecordSchema(schema: TSchema, visited: WeakSet<object>): void {
  if (schema["~kind"] !== "Record") {
    return;
  }

  const value = schemaSchemaField(schema, "value");
  if (value === undefined) {
    return;
  }

  const key = schemaSchemaField(schema, "key");
  decorateSchemaNode(value, visited);
  schema.patternProperties = {
    [recordPatternForKey(key)]: value,
  };
}

function decorateObjectProperties(schema: TSchema, visited: WeakSet<object>): void {
  if (!isSchemaPropertiesRecord(schema.properties)) {
    return;
  }

  for (const [key, propertySchema] of globalThis.Object.entries(schema.properties)) {
    schema.properties[key] = decorateSchemaProperty(propertySchema, visited);
  }
}

function decorateSchemaItems(items: unknown, visited: WeakSet<object>): void {
  if (globalThis.Array.isArray(items)) {
    decorateSchemaNodeArray(items, visited);
    return;
  }

  decorateSchemaNode(items, visited);
}

function decorateNestedSchemaFields(schema: TSchema, visited: WeakSet<object>): void {
  decorateObjectProperties(schema, visited);
  decorateSchemaRecordChildren(schemaSchemaMapField(schema, "$defs"), visited);
  decorateSchemaRecordChildren(schemaSchemaMapField(schema, "definitions"), visited);
  decorateSchemaRecordChildren(schemaSchemaMapField(schema, "patternProperties"), visited);
  const tupleItems = schemaSchemaListField(schema, "items");
  if (tupleItems.length > 0) {
    decorateSchemaNodeArray(tupleItems, visited);
  } else {
    decorateSchemaItems(schemaSchemaField(schema, "items"), visited);
  }
  decorateSchemaNodeArray(schemaVariants(schema), visited);

  for (const key of SCHEMA_NODE_KEYS) {
    const fieldName = key === "then" ? "th" + "en" : key;
    decorateSchemaNode(schemaSchemaField(schema, fieldName), visited);
  }
}

function isSchemaObject(schema: object): schema is TSchema {
  return "~kind" in schema && typeof schema["~kind"] === "string";
}

function isSchemaPropertiesRecord(value: unknown): value is Record<string, TSchema> {
  return (
    typeof value === "object" &&
    value !== null &&
    !globalThis.Array.isArray(value) &&
    globalThis.Object.values(value).every(
      (entry) => typeof entry === "object" && entry !== null && isSchemaObject(entry),
    )
  );
}

/**
 * Stamp `[Kind]` symbol and JSON Schema `type` field onto a schema object so
 * Elysia's TypeBox guards and TypeCompiler can recognise baobox schemas.
 *
 * TypeBox's `IsSchema()` preflight guard checks both `[Kind]` and `type` for
 * built-in types. Baobox schemas only carry `~kind`, so this function stamps
 * the standard `type` discriminator when it is missing.
 */
function decorateSchemaRecursive<T extends object>(schema: T, visited: WeakSet<object>): T {
  if (typeof schema !== "object" || schema === null || visited.has(schema)) {
    return schema;
  }
  visited.add(schema);

  if (isSchemaObject(schema)) {
    const kind = schema["~kind"];
    if (kind === undefined) {
      return schema;
    }
    Object.defineProperty(schema, Kind, {
      configurable: true,
      enumerable: true,
      value: kind,
      writable: true,
    });

    // Stamp JSON Schema `type` when missing so TypeBox IsSchema guards pass.
    if (schema.type === undefined) {
      const jsonType = KIND_TO_JSON_SCHEMA_TYPE[kind];
      if (jsonType !== undefined) {
        Object.defineProperty(schema, "type", {
          configurable: true,
          enumerable: true,
          value: jsonType,
          writable: true,
        });
      }
    }
    decorateNestedSchemaFields(schema, visited);
    decorateRecordSchema(schema, visited);
  }

  return schema;
}

export function decorateSchema<T extends object>(schema: T): T {
  return decorateSchemaRecursive(schema, new WeakSet());
}

function createElysiaObjectSchema<const TProperties extends Record<string, TSchema>>(
  properties: TProperties,
  options?: Parameters<typeof Containers.Object<TProperties>>[1],
): TObject<TProperties, InferRequiredKeys<TProperties>, InferOptionalKeys<TProperties>> {
  return decorateSchema(Containers.Object(properties, options));
}
