import { deriveObjectSchema } from "../shared/object-utils.js";
import type { TSchema } from "./base-types.js";
import type { TObject } from "./containers-types.js";
import type { TExclude, TExtract, TUnsafe } from "./narrow-types.js";
import { String as TypeString } from "./primitives.js";
import { withSchemaFields } from "./root-shared.js";
import type {
  TConditional,
  TIfThenElse,
  TIndex,
  TKeyOf,
  TMapped,
  TNot,
} from "./transform-types.js";

type TObjectLike = TObject<Record<string, TSchema>, string, string>;
type TObjectProperties<T extends TObjectLike> = T["properties"];
type TObjectKeys<T extends TObjectLike> = keyof TObjectProperties<T> & string;
type TPickProperties<T extends TObjectLike, K extends keyof TObjectProperties<T>> = Pick<
  TObjectProperties<T>,
  K
>;
type TOmitProperties<T extends TObjectLike, K extends keyof TObjectProperties<T>> = Omit<
  TObjectProperties<T>,
  K
>;

/** Create an Exclude schema (Left ∩ ¬Right) */
export function Exclude<TLeft extends TSchema, TRight extends TSchema>(
  left: TLeft,
  right: TRight,
  options?: Record<string, unknown>,
): TExclude<TLeft, TRight> {
  return withSchemaFields({ "~kind": "Exclude", left, right, ...options }) as TExclude<
    TLeft,
    TRight
  >;
}

/** Create an Extract schema (Left ∩ Right) */
export function Extract<TLeft extends TSchema, TRight extends TSchema>(
  left: TLeft,
  right: TRight,
  options?: Record<string, unknown>,
): TExtract<TLeft, TRight> {
  return withSchemaFields({ "~kind": "Extract", left, right, ...options }) as TExtract<
    TLeft,
    TRight
  >;
}

/** Create a KeyOf schema (extracts keys of an object) */
export function KeyOf<T extends TObjectLike>(
  object: T,
  options?: Record<string, unknown>,
): TKeyOf<T> {
  return withSchemaFields({ "~kind": "KeyOf", object, ...options }) as TKeyOf<T>;
}

/** Create a Partial schema (all properties optional) */
export function Partial<T extends TObjectLike>(
  object: T,
  options?: Record<string, unknown>,
): TObject<TObjectProperties<T>, never, TObjectKeys<T>> {
  return withSchemaFields({
    ...deriveObjectSchema(object, { requiredMode: "none" }),
    ...options,
  }) as TObject<TObjectProperties<T>, never, TObjectKeys<T>>;
}

/** Create a Required schema (all properties required) */
export function Required<T extends TObjectLike>(
  object: T,
  options?: Record<string, unknown>,
): TObject<TObjectProperties<T>, TObjectKeys<T>, never> {
  return withSchemaFields({
    ...deriveObjectSchema(object, { requiredMode: "all" }),
    ...options,
  }) as TObject<TObjectProperties<T>, TObjectKeys<T>, never>;
}

/** Create a Pick schema (subset of object properties) */
export function Pick<T extends TObjectLike, K extends keyof T["properties"]>(
  object: T,
  keys: K[],
  options?: Record<string, unknown>,
): TObject<TPickProperties<T, K>, Extract<T["required"], K>, Extract<T["optional"], K>> {
  return withSchemaFields({
    ...deriveObjectSchema(object, { pickKeys: keys.map(String), additionalProperties: false }),
    ...options,
  }) as TObject<TPickProperties<T, K>, Extract<T["required"], K>, Extract<T["optional"], K>>;
}

/** Create an Omit schema (object without specified properties) */
export function Omit<T extends TObjectLike, K extends keyof T["properties"]>(
  object: T,
  keys: K[],
  options?: Record<string, unknown>,
): TObject<
  TOmitProperties<T, K>,
  Exclude<T["required"], K> & keyof TOmitProperties<T, K>,
  Exclude<T["optional"], K> & keyof TOmitProperties<T, K>
> {
  return withSchemaFields({
    ...deriveObjectSchema(object, { omitKeys: keys.map(String), additionalProperties: false }),
    ...options,
  }) as TObject<
    TOmitProperties<T, K>,
    Exclude<T["required"], K> & keyof TOmitProperties<T, K>,
    Exclude<T["optional"], K> & keyof TOmitProperties<T, K>
  >;
}

/** Create a Not schema (negation) */
export function Not<T extends TSchema>(schema: T, options?: Record<string, unknown>): TNot<T> {
  return withSchemaFields({ "~kind": "Not", schema, ...options }) as TNot<T>;
}

/** Create an if/then/else conditional schema */
export function IfThenElse<TCond extends TSchema, TThen extends TSchema, TElse extends TSchema>(
  condition: TCond,
  then: TThen,
  elseSchema: TElse,
  options?: Record<string, unknown>,
): TIfThenElse<TCond, TThen, TElse> {
  return withSchemaFields({
    "~kind": "IfThenElse",
    if: condition,
    then,
    else: elseSchema,
    ...options,
  }) as TIfThenElse<TCond, TThen, TElse>;
}

/** Create an unsafe schema from a raw JSON Schema record */
export function Unsafe<T = unknown>(
  schema: Record<string, unknown>,
  options?: Record<string, unknown>,
): TUnsafe<T> {
  return withSchemaFields({
    "~kind": "Unsafe",
    schema,
    type: undefined as T,
    ...options,
  }) as TUnsafe<T>;
}

/** Create an Index schema (value-type lookup by key) */
export function Index<T extends TObjectLike, TKey extends TSchema = TSchema>(
  object: T,
  key?: TKey,
  options?: Record<string, unknown>,
): TIndex<T, TKey> {
  return withSchemaFields({
    "~kind": "Index",
    object,
    key: key ?? TypeString(),
    ...options,
  }) as TIndex<T, TKey>;
}

/** Create a Mapped schema (delegates to inner object, with optional transform) */
export function Mapped<T extends TObjectLike>(
  object: T,
  transform?: (schema: TSchema, key: string) => TSchema,
  options?: Record<string, unknown>,
): TMapped<T> {
  return withSchemaFields({
    "~kind": "Mapped",
    object,
    ...(transform ? { transform } : {}),
    ...options,
  }) as TMapped<T>;
}

/** Create a Conditional schema with check/union/default branches */
export function Conditional<
  TCheck extends TSchema,
  TUnion extends TSchema[],
  TDefault extends TSchema = TSchema,
>(
  check: TCheck,
  union: TUnion,
  defaultSchema?: TDefault,
  options?: Record<string, unknown>,
): TConditional<TCheck, TUnion, TDefault> {
  return withSchemaFields({
    "~kind": "Conditional",
    check,
    union,
    default: defaultSchema,
    ...options,
  }) as TConditional<TCheck, TUnion, TDefault>;
}
