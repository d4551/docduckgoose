import { Kind } from "../shared/symbols.js";
import type { TSchema, TStandardSchema } from "./base-types.js";
import type { TOptional as TOptionalSchema } from "./composite-types.js";
import type { TString } from "./primitives-types.js";
import type { Static } from "./static-types.js";

/** Extract property keys whose schemas are wrapped in TOptional */
export type InferOptionalKeys<T extends Record<string, TSchema>> = {
  [K in keyof T]: T[K] extends TOptionalSchema<TSchema> ? K : never;
}[keyof T] &
  string;

/** Extract property keys whose schemas are NOT wrapped in TOptional */
export type InferRequiredKeys<T extends Record<string, TSchema>> = Exclude<
  keyof T & string,
  InferOptionalKeys<T>
>;

type StaticObject<
  TProperties extends Record<string, TSchema>,
  TRequired extends keyof TProperties,
  TOptional extends keyof TProperties,
> = [TProperties] extends [Record<string, never>]
  ? Record<string, unknown>
  : {
      [K in Exclude<TRequired, TOptional>]-?: Static<TProperties[K]>;
    } & {
      [K in Exclude<keyof TProperties, Exclude<TRequired, TOptional>>]?:
        | (TProperties[K] extends TOptionalSchema<infer Inner>
            ? Static<Inner>
            : Static<TProperties[K]>)
        | undefined;
    };

type StaticTuple<TItems extends TSchema[]> = TItems extends [
  infer Head extends TSchema,
  ...infer Tail extends TSchema[],
]
  ? [Static<Head>, ...StaticTuple<Tail>]
  : TItems extends []
    ? []
    : Static<TItems[number]>[];

export interface TArray<T extends TSchema = TSchema> extends TSchema, TStandardSchema<Static<T>[]> {
  [Kind]: "Array";
  "~kind": "Array";
  static: Static<T>[];
  type: "array";
  items: T;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  contains?: T;
  minContains?: number;
  maxContains?: number;
  default?: Static<T>[];
  title?: string;
  description?: string;
}

export interface TObject<
  TProperties extends Record<string, TSchema> = Record<string, TSchema>,
  TRequired extends keyof TProperties = never,
  TOptional extends keyof TProperties = never,
> extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    StaticObject<TProperties, TRequired, TOptional>
  >;
  [Kind]: "Object";
  "~kind": "Object";
  static: StaticObject<TProperties, TRequired, TOptional>;
  type: "object";
  properties: TProperties;
  required?: TRequired[];
  optional?: TOptional[];
  additionalProperties?: boolean | TSchema;
  patternProperties?: Record<string, TSchema>;
  default?: Partial<{ [K in keyof TProperties]: Static<TProperties[K]> }>;
  title?: string;
  description?: string;
}

export interface TTuple<TItems extends TSchema[] = TSchema[]>
  extends TSchema,
    TStandardSchema<StaticTuple<TItems>> {
  [Kind]: "Tuple";
  "~kind": "Tuple";
  static: StaticTuple<TItems>;
  type: "array";
  items: TItems;
  minItems?: number;
  maxItems?: number;
  additionalItems?: boolean;
  default?: { [K in keyof TItems]?: Static<TItems[K]> };
  title?: string;
  description?: string;
}

export interface TRecord<TKey extends TString | TSchema = TString, TValue extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<Record<string, TValue["static"]>> {
  [Kind]: "Record";
  "~kind": "Record";
  static: Record<string, TValue["static"]>;
  type: "object";
  key: TKey;
  value: TValue;
  minProperties?: number;
  maxProperties?: number;
  default?: Record<string, TValue["static"]>;
  title?: string;
  description?: string;
}
