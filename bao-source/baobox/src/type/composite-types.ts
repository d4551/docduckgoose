import { Kind } from "../shared/symbols.js";
import type { TSchema, TStandardSchema } from "./base-types.js";
import type { TEnumValue } from "./schema-options.js";
import type { Static } from "./static-types.js";

export interface TUnion<TOptions extends TSchema[] = TSchema[]>
  extends TSchema,
    TStandardSchema<Static<TOptions[number]>> {
  [Kind]: "Union";
  "~kind": "Union";
  static: Static<TOptions[number]>;
  variants: TOptions;
  anyOf?: TOptions;
  discriminator?: string;
  title?: string;
  description?: string;
}

export interface TIntersect<TOptions extends TSchema[] = TSchema[]>
  extends TSchema,
    TStandardSchema<import("./static-types.js").UnionToIntersection<Static<TOptions[number]>>> {
  [Kind]: "Intersect";
  "~kind": "Intersect";
  static: import("./static-types.js").UnionToIntersection<Static<TOptions[number]>>;
  variants: TOptions;
  allOf?: TOptions;
  additionalProperties?: boolean | TSchema;
  unevaluatedProperties?: boolean | TSchema;
  title?: string;
  description?: string;
}

export interface TOptional<T extends TSchema>
  extends TSchema,
    TStandardSchema<Static<T> | undefined> {
  [Kind]: "Optional";
  "~kind": "Optional";
  static: Static<T> | undefined;
  item: T;
}

export interface TReadonly<T extends TSchema>
  extends TSchema,
    TStandardSchema<Readonly<Static<T>>> {
  [Kind]: "Readonly";
  "~kind": "Readonly";
  static: Readonly<Static<T>>;
  item: T;
}

export interface TEnum<TValues extends readonly TEnumValue[] = readonly TEnumValue[]>
  extends TSchema,
    TStandardSchema<TValues[number]> {
  [Kind]: "Enum";
  "~kind": "Enum";
  static: TValues[number];
  values: TValues;
  title?: string;
  description?: string;
}

export interface TRef<_T extends TSchema = TSchema> extends TSchema, TStandardSchema<Static<_T>> {
  [Kind]: "Ref";
  "~kind": "Ref";
  static: Static<_T>;
  name: string;
  generic?: TSchema[];
}

export interface TRecursive<T extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<Static<T>> {
  [Kind]: "Recursive";
  "~kind": "Recursive";
  static: Static<T>;
  name: string;
  schema: T;
}
