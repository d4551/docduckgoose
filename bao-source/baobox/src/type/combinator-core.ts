import type { TSchema } from "./base-types.js";
import type {
  TEnum,
  TIntersect,
  TOptional,
  TReadonly,
  TRecursive,
  TRef,
  TUnion,
} from "./composite-types.js";
import type { TObject } from "./containers-types.js";
import { withSchemaFields } from "./root-shared.js";
import type { TEnumValue, TIntersectOptions, TSchemaOptions } from "./schema-options.js";
import type { UnionToIntersection } from "./static-shared-types.js";

type Simplify<T> = { [K in keyof T]: T[K] };
type TObjectLike = TObject<Record<string, TSchema>, string, string>;
type TEnumRecord = Record<string, TEnumValue>;

type EvaluateProperties<T extends TObjectLike | TIntersect<TObjectLike[]>> =
  T extends TObject<infer P>
    ? P
    : T extends TIntersect<infer V>
      ? Simplify<UnionToIntersection<V[number] extends TObject<infer P> ? P : never>>
      : never;

interface EvaluatedObjectFields {
  additionalProperties: boolean | TSchema | undefined;
  optional: Set<string>;
  patternProperties: Record<string, TSchema>;
  properties: Record<string, TSchema>;
  required: Set<string>;
}

function createEvaluatedObjectFields(): EvaluatedObjectFields {
  return {
    additionalProperties: undefined,
    optional: new Set<string>(),
    patternProperties: {},
    properties: {},
    required: new Set<string>(),
  };
}

function resolveAdditionalProperties(
  current: boolean | TSchema | undefined,
  next: boolean | TSchema | undefined,
): boolean | TSchema | undefined {
  if (next === false) {
    return false;
  }

  if (current !== false && next !== undefined) {
    return next;
  }

  return current;
}

function mergeEvaluatedObjectFields(
  fields: EvaluatedObjectFields,
  variant: TObjectLike,
): EvaluatedObjectFields {
  Object.assign(fields.properties, variant.properties);

  for (const key of variant.required ?? []) {
    fields.required.add(String(key));
  }

  for (const key of variant.optional ?? []) {
    fields.optional.add(String(key));
  }

  Object.assign(fields.patternProperties, variant.patternProperties);
  fields.additionalProperties = resolveAdditionalProperties(
    fields.additionalProperties,
    variant.additionalProperties,
  );

  return fields;
}

function collectEvaluatedObjectFields(variants: readonly TObjectLike[]): EvaluatedObjectFields {
  const fields = createEvaluatedObjectFields();

  for (const variant of variants) {
    mergeEvaluatedObjectFields(fields, variant);
  }

  for (const key of fields.optional) {
    fields.required.delete(key);
  }

  return fields;
}

/** Create a union schema from an array of variants */
export function Union<TOptions extends TSchema[]>(
  variants: TOptions,
  options?: TSchemaOptions & { discriminator?: string },
): TUnion<TOptions> {
  return withSchemaFields({
    "~kind": "Union",
    variants,
    anyOf: variants,
    ...options,
  }) as TUnion<TOptions>;
}

/** Create an intersection schema from an array of variants */
export function Intersect<TOptions extends TSchema[]>(
  variants: TOptions,
  options?: TIntersectOptions,
): TIntersect<TOptions> {
  return withSchemaFields({
    "~kind": "Intersect",
    variants,
    allOf: variants,
    ...options,
  }) as TIntersect<TOptions>;
}

/** Flatten an Object or Intersect<Object[]> into a single Object schema */
export function Evaluate<T extends TObjectLike | TIntersect<TObjectLike[]>>(
  schema: T,
): TObject<EvaluateProperties<T>> {
  if (schema["~kind"] === "Object") {
    return schema as TObject<EvaluateProperties<T>>;
  }

  const fields = collectEvaluatedObjectFields(schema.variants);

  return withSchemaFields({
    "~kind": "Object",
    type: "object",
    properties: fields.properties as EvaluateProperties<T>,
    ...(fields.required.size > 0
      ? { required: [...fields.required] as (keyof EvaluateProperties<T>)[] }
      : {}),
    ...(fields.optional.size > 0
      ? { optional: [...fields.optional] as (keyof EvaluateProperties<T>)[] }
      : {}),
    ...(Object.keys(fields.patternProperties).length > 0
      ? { patternProperties: fields.patternProperties }
      : {}),
    ...(fields.additionalProperties === undefined
      ? {}
      : { additionalProperties: fields.additionalProperties }),
  }) as TObject<EvaluateProperties<T>>;
}

/** Mark a schema as optional (value | undefined) */
export function Optional<T extends TSchema>(item: T, options?: TSchemaOptions): TOptional<T> {
  return withSchemaFields({ "~kind": "Optional", item, ...options }) as TOptional<T>;
}

/** Mark a schema as readonly */
export function Readonly<T extends TSchema>(item: T, options?: TSchemaOptions): TReadonly<T> {
  return withSchemaFields({ "~kind": "Readonly", item, ...options }) as TReadonly<T>;
}

/** Create an enum schema from array values or a const enum-style object */
export function Enum<const TValues extends readonly TEnumValue[]>(
  values: TValues,
  options?: TSchemaOptions,
): TEnum<TValues>;
export function Enum<const TValues extends TEnumRecord>(
  values: TValues,
  options?: TSchemaOptions,
): TEnum<readonly TValues[keyof TValues][]>;
export function Enum(
  values: readonly TEnumValue[] | TEnumRecord,
  options?: TSchemaOptions,
): TEnum<readonly TEnumValue[]> {
  const normalizedValues = Array.isArray(values) ? values : Object.values(values);
  return withSchemaFields({
    "~kind": "Enum",
    values: normalizedValues,
    enum: normalizedValues,
    ...options,
  }) as TEnum<readonly TEnumValue[]>;
}

/** Create a reference to a named schema */
export function Ref<T extends TSchema = TSchema>(
  name: string,
  options?: TSchemaOptions & { generic?: TSchema[] },
): TRef<T> {
  return withSchemaFields({ "~kind": "Ref", name, ...options }) as TRef<T>;
}

/** Create a recursive (self-referential) schema */
export function Recursive<const T extends TSchema>(
  build: (self: TRef<TSchema>) => T,
  options?: TSchemaOptions,
): TRecursive<T>;
export function Recursive<const T extends TSchema>(
  name: string,
  build: (self: TRef<TSchema>) => T,
  options?: TSchemaOptions,
): TRecursive<T>;
export function Recursive<const T extends TSchema>(
  nameOrBuild: string | ((self: TRef<TSchema>) => T),
  buildOrOptions?: ((self: TRef<TSchema>) => T) | TSchemaOptions,
  options?: TSchemaOptions,
): TRecursive<T> {
  const recursiveOptions =
    typeof nameOrBuild === "function" ? (buildOrOptions as TSchemaOptions | undefined) : options;
  const name =
    typeof nameOrBuild === "string" ? nameOrBuild : (recursiveOptions?.$id ?? "Recursive");
  const build = typeof nameOrBuild === "function" ? nameOrBuild : buildOrOptions;
  if (typeof build !== "function") {
    throw new TypeError("Recursive requires a schema builder function");
  }
  const self = Ref<TSchema>(name);
  const schema = build(self);
  return withSchemaFields({
    "~kind": "Recursive",
    name,
    schema,
    ...recursiveOptions,
  }) as TRecursive<T>;
}

/** Create a discriminated union schema */
export function Variant<TOptions extends TObjectLike[]>(
  discriminator: string,
  variants: TOptions,
  options?: TSchemaOptions,
): TUnion<TOptions> {
  return withSchemaFields({
    "~kind": "Union",
    variants,
    anyOf: variants,
    discriminator,
    ...options,
  }) as TUnion<TOptions>;
}
