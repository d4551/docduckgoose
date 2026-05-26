import { Kind } from "../shared/symbols.js";
import type { TSchema, TStandardSchema } from "./base-types.js";

export interface TString extends TSchema, TStandardSchema<string> {
  [Kind]: "String";
  "~kind": "String";
  static: string;
  type: "string";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  default?: string;
  title?: string;
  description?: string;
  errors?: Record<string, string>;
}

export interface TNumber extends TSchema, TStandardSchema<number> {
  [Kind]: "Number";
  "~kind": "Number";
  static: number;
  type: "number";
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  default?: number;
  title?: string;
  description?: string;
  errors?: Record<string, string>;
}

export interface TInteger extends TSchema, TStandardSchema<number> {
  [Kind]: "Integer";
  "~kind": "Integer";
  static: number;
  type: "integer";
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  default?: number;
  title?: string;
  description?: string;
  errors?: Record<string, string>;
}

export interface TBoolean extends TSchema, TStandardSchema<boolean> {
  [Kind]: "Boolean";
  "~kind": "Boolean";
  static: boolean;
  type: "boolean";
  default?: boolean;
  title?: string;
  description?: string;
}

export interface TNull extends TSchema, TStandardSchema<null> {
  [Kind]: "Null";
  "~kind": "Null";
  static: null;
  type: "null";
  title?: string;
  description?: string;
}

export interface TLiteral<TValue extends string | number | boolean | null>
  extends TSchema,
    TStandardSchema<TValue> {
  [Kind]: "Literal";
  "~kind": "Literal";
  static: TValue;
  const: TValue;
  title?: string;
  description?: string;
}

export interface TVoid extends TSchema, TStandardSchema<undefined> {
  [Kind]: "Void";
  "~kind": "Void";
  static: undefined;
  type: "void";
  title?: string;
  description?: string;
}

export interface TUndefined extends TSchema, TStandardSchema<undefined> {
  [Kind]: "Undefined";
  "~kind": "Undefined";
  static: undefined;
  type: "undefined";
  title?: string;
  description?: string;
}

export interface TUnknown extends TSchema, TStandardSchema<unknown> {
  [Kind]: "Unknown";
  "~kind": "Unknown";
  static: unknown;
  title?: string;
  description?: string;
}

export interface TAny extends TSchema, TStandardSchema<unknown> {
  [Kind]: "Any";
  "~kind": "Any";
  static: unknown;
  title?: string;
  description?: string;
}

export interface TNever extends TSchema, TStandardSchema<never> {
  [Kind]: "Never";
  "~kind": "Never";
  static: never;
  title?: string;
  description?: string;
}

export interface TBigInt extends TSchema, TStandardSchema<bigint> {
  [Kind]: "BigInt";
  "~kind": "BigInt";
  static: bigint;
  type: "bigint";
  minimum?: bigint;
  maximum?: bigint;
  exclusiveMinimum?: bigint;
  exclusiveMaximum?: bigint;
  multipleOf?: bigint;
  title?: string;
  description?: string;
}

export interface TDate extends TSchema, TStandardSchema<Date> {
  [Kind]: "Date";
  "~kind": "Date";
  static: Date;
  type: "Date";
  minimumTimestamp?: number;
  maximumTimestamp?: number;
  exclusiveMinimumTimestamp?: number;
  exclusiveMaximumTimestamp?: number;
  title?: string;
  description?: string;
}

export interface TSymbol extends TSchema, TStandardSchema<symbol> {
  [Kind]: "Symbol";
  "~kind": "Symbol";
  static: symbol;
  type: "symbol";
  title?: string;
  description?: string;
}
