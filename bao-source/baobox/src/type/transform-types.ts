import type { TSchema, TStandardSchema } from "./base-types.js";
import type { TObject } from "./containers-types.js";
import type { TString } from "./primitives-types.js";
import type { Static } from "./static-types.js";

type TObjectLike = TObject<Record<string, TSchema>, string, string>;

export interface TKeyOf<T extends TObjectLike>
  extends TSchema,
    TStandardSchema<keyof T["properties"]> {
  "~kind": "KeyOf";
  static: keyof T["properties"];
  object: T;
}

export interface TPartial<T extends TObjectLike>
  extends TSchema,
    TStandardSchema<Partial<{ [K in keyof T["properties"]]: Static<T["properties"][K]> }>> {
  "~kind": "Partial";
  static: Partial<{ [K in keyof T["properties"]]: Static<T["properties"][K]> }>;
  object: T;
}

export interface TRequired<T extends TObjectLike>
  extends TSchema,
    TStandardSchema<{ [K in keyof T["properties"]]-?: Static<T["properties"][K]> }> {
  "~kind": "Required";
  static: { [K in keyof T["properties"]]-?: Static<T["properties"][K]> };
  object: T;
}

export interface TPick<T extends TObjectLike, K extends keyof T["properties"]>
  extends TSchema,
    TStandardSchema<{ [P in K]: Static<T["properties"][P]> }> {
  "~kind": "Pick";
  static: { [P in K]: Static<T["properties"][P]> };
  object: T;
  keys: K[];
}

export interface TOmit<T extends TObjectLike, K extends keyof T["properties"]>
  extends TSchema,
    TStandardSchema<{
      [P in keyof T["properties"] as P extends K ? never : P]: Static<T["properties"][P]>;
    }> {
  "~kind": "Omit";
  static: { [P in keyof T["properties"] as P extends K ? never : P]: Static<T["properties"][P]> };
  object: T;
  keys: K[];
}

export interface TNot<T extends TSchema>
  extends TSchema,
    TStandardSchema<Static<T> extends never ? unknown : never> {
  "~kind": "Not";
  static: Static<T> extends never ? unknown : never;
  schema: T;
}

export interface TIfThenElse<TCond extends TSchema, TThen extends TSchema, TElse extends TSchema>
  extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    Static<TCond> extends never ? Static<TElse> : Static<TThen>
  >;
  "~kind": "IfThenElse";
  static: Static<TCond> extends never ? Static<TElse> : Static<TThen>;
  if: TCond;
  then: TThen;
  else: TElse;
}

export interface TIndex<T extends TObjectLike, TKey extends TSchema = TString> extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    TKey extends import("./primitives-types.js").TLiteral<infer K extends string | number | boolean>
      ? K extends keyof T["properties"]
        ? Static<T["properties"][K]>
        : never
      : Static<T["properties"][keyof T["properties"]]>
  >;
  "~kind": "Index";
  static: TKey extends import("./primitives-types.js").TLiteral<
    infer K extends string | number | boolean
  >
    ? K extends keyof T["properties"]
      ? Static<T["properties"][K]>
      : never
    : Static<T["properties"][keyof T["properties"]]>;
  object: T;
  key: TKey;
}

export interface TMapped<T extends TObjectLike, TTransform extends TSchema = TSchema>
  extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    { [K in keyof T["properties"]]: Static<TTransform> }
  >;
  "~kind": "Mapped";
  static: { [K in keyof T["properties"]]: Static<TTransform> };
  object: T;
  transform?: (schema: TSchema, key: string) => TTransform;
}

export interface TConditional<
  TCheck extends TSchema,
  TUnion extends TSchema[],
  TDefault extends TSchema = import("./primitives-types.js").TNever,
> extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    Static<TUnion[number]> | Static<TDefault>
  >;
  "~kind": "Conditional";
  static: Static<TUnion[number]> | Static<TDefault>;
  check: TCheck;
  union: TUnion;
  default?: TDefault;
}
