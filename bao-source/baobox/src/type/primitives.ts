import {
  BASE64_FORMAT,
  CREDIT_CARD_FORMAT,
  DATE_FORMAT,
  DATETIME_FORMAT,
  DURATION_FORMAT,
  EMAIL_FORMAT,
  HEX_COLOR_FORMAT,
  HEX_FORMAT,
  HOSTNAME_FORMAT,
  IP_FORMAT,
  JSON_FORMAT,
  REGEX_FORMAT,
  TIME_FORMAT,
  URI_FORMAT,
  UUID_FORMAT,
} from "../shared/format-constants.js";
import { type ExpandRestItems, ExpandTupleRest } from "./actions.js";
import type { TSchema } from "./base-types.js";
import type {
  TAsyncIterator,
  TConstructor,
  TDecode,
  TEncode,
  TFunction,
  TIterator,
  TPromise,
  TRegExpInstance,
  TUint8Array,
} from "./higher-order-types.js";
import type { TTemplateLiteral } from "./narrow-types.js";
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
} from "./primitives-types.js";
import { withSchemaFields } from "./root-shared.js";
import type { TNumberOptions, TSchemaOptions, TStringOptions } from "./schema-options.js";

/** Create a string schema */
function createStringSchema(options?: TStringOptions): TString {
  return withSchemaFields({ "~kind": "String", ...options }) as TString;
}

export { createStringSchema as String };

/** Create a number schema */
function createNumberSchema(options?: TNumberOptions): TNumber {
  return withSchemaFields({ "~kind": "Number", ...options }) as TNumber;
}

export { createNumberSchema as Number };

/** Create an integer schema */
export function Integer(options?: TNumberOptions): TInteger {
  return withSchemaFields({ "~kind": "Integer", ...options }) as TInteger;
}

/** Create a boolean schema */
function createBooleanSchema(options?: TSchemaOptions): TBoolean {
  return withSchemaFields({ "~kind": "Boolean", ...options }) as TBoolean;
}

export { createBooleanSchema as Boolean };

/** Create a null schema */
export function Null(options?: TSchemaOptions): TNull {
  return withSchemaFields({ "~kind": "Null", ...options }) as TNull;
}

/** Create a literal schema for an exact value */
export function Literal<const TValue extends string | number | boolean | null>(
  value: TValue,
  options?: TSchemaOptions,
): TLiteral<TValue> {
  return withSchemaFields({ "~kind": "Literal", const: value, ...options }) as TLiteral<TValue>;
}

/** Create a void schema (undefined or null) */
export function Void(options?: TSchemaOptions): TVoid {
  return withSchemaFields({ "~kind": "Void", ...options }) as TVoid;
}

/** Create an undefined schema */
export function Undefined(options?: TSchemaOptions): TUndefined {
  return withSchemaFields({ "~kind": "Undefined", ...options }) as TUndefined;
}

/** Create an unknown schema (accepts any value) */
export function Unknown(options?: TSchemaOptions): TUnknown {
  return withSchemaFields({ "~kind": "Unknown", ...options }) as TUnknown;
}

/** Create an any schema */
export function Any(options?: TSchemaOptions): TAny {
  return withSchemaFields({ "~kind": "Any", ...options }) as TAny;
}

/** Create a never schema (rejects all values) */
export function Never(options?: TSchemaOptions): TNever {
  return withSchemaFields({ "~kind": "Never", ...options }) as TNever;
}

/** Create a bigint schema */
function createBigIntSchema(options?: Partial<Omit<TBigInt, "'~kind'">>): TBigInt {
  return withSchemaFields({ "~kind": "BigInt", ...options }) as TBigInt;
}

export { createBigIntSchema as BigInt };

/** Create a native Date instance schema with optional timestamp constraints */
function createDateSchema(options?: Partial<Omit<TDate, "'~kind'">>): TDate {
  return withSchemaFields({ "~kind": "Date", ...options }) as TDate;
}

export { createDateSchema as Date };

/** Create a string schema with date format (YYYY-MM-DD) */
export function DateFormat(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: DATE_FORMAT, ...options });
}

/** Create a UUID string schema */
export function Uuid(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: UUID_FORMAT, ...options });
}

/** Create an email string schema */
export function Email(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: EMAIL_FORMAT, ...options });
}

/** Create a URI string schema */
export function Uri(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: URI_FORMAT, ...options });
}

/** Create a hostname string schema */
export function Hostname(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: HOSTNAME_FORMAT, ...options });
}

/** Create an IP address string schema (v4 or v6) */
export function Ip(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: IP_FORMAT, ...options });
}

/** Create a base64 string schema */
export function Base64(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: BASE64_FORMAT, ...options });
}

/** Create a hex string schema */
export function Hex(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: HEX_FORMAT, ...options });
}

/** Create a hex colour string schema (#RGB or #RRGGBB) */
export function HexColor(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: HEX_COLOR_FORMAT, ...options });
}

/** Create a date-time string schema (ISO 8601) */
export function DateTime(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: DATETIME_FORMAT, ...options });
}

/** Create a time string schema (HH:MM:SS) */
export function Time(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: TIME_FORMAT, ...options });
}

/** Create a duration string schema (ISO 8601) */
export function Duration(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: DURATION_FORMAT, ...options });
}

/** Create a JSON string schema */
export function Json(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: JSON_FORMAT, ...options });
}

/** Create a credit card string schema (Luhn validated) */
export function CreditCard(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: CREDIT_CARD_FORMAT, ...options });
}

/** Create a Uint8Array schema with optional byte length constraints */
function createUint8ArraySchema(options?: Partial<Omit<TUint8Array, "'~kind'">>): TUint8Array {
  return withSchemaFields({ "~kind": "Uint8Array", ...options }) as TUint8Array;
}

export { createUint8ArraySchema as Uint8Array };

/** Create a RegExpInstance schema that validates actual RegExp objects */
export function RegExpInstance(
  options?: Partial<Omit<TRegExpInstance, "'~kind'">>,
): TRegExpInstance {
  return withSchemaFields({ "~kind": "RegExpInstance", ...options }) as TRegExpInstance;
}

/** Create a regex-validated string schema */
function createRegExpSchema(options?: Partial<Omit<TString, "'~kind'">>): TString {
  return createStringSchema({ format: REGEX_FORMAT, ...options });
}

export { createRegExpSchema as RegExp };

/** Create a symbol schema */
function createSymbolSchema(options?: Partial<Omit<TSymbol, "'~kind'">>): TSymbol {
  return withSchemaFields({ "~kind": "Symbol", ...options }) as TSymbol;
}

export { createSymbolSchema as Symbol };

/** Create a template literal string schema */
export function TemplateLiteral(
  patterns: string[],
  options?: Partial<Omit<TTemplateLiteral, "'~kind' | 'patterns'">>,
): TTemplateLiteral {
  return withSchemaFields({ "~kind": "TemplateLiteral", patterns, ...options }) as TTemplateLiteral;
}

/** Create a function schema */
function createFunctionSchema<
  TParameters extends TSchema[] = TSchema[],
  TReturns extends TSchema = TAny,
>(
  parameters?: TParameters,
  returns?: TReturns,
  options?: Partial<
    Omit<TFunction<ExpandRestItems<TParameters>, TReturns>, "'~kind' | 'parameters' | 'returns'">
  >,
): TFunction<ExpandRestItems<TParameters>, TReturns> {
  const resolvedParameters = ExpandTupleRest((parameters ?? []) as TParameters);
  const resolvedReturns = (returns ?? Any()) as TReturns;
  return withSchemaFields({
    "~kind": "Function",
    parameters: resolvedParameters,
    returns: resolvedReturns,
    ...options,
  }) as TFunction<ExpandRestItems<TParameters>, TReturns>;
}

export { createFunctionSchema as Function };

/** Create a constructor schema */
export function Constructor<
  TParameters extends TSchema[] = TSchema[],
  TReturns extends TSchema = TAny,
>(
  parameters?: TParameters,
  returns?: TReturns,
  options?: Partial<
    Omit<TConstructor<ExpandRestItems<TParameters>, TReturns>, "'~kind' | 'parameters' | 'returns'">
  >,
): TConstructor<ExpandRestItems<TParameters>, TReturns> {
  const resolvedParameters = ExpandTupleRest((parameters ?? []) as TParameters);
  const resolvedReturns = (returns ?? Any()) as TReturns;
  return withSchemaFields({
    "~kind": "Constructor",
    parameters: resolvedParameters,
    returns: resolvedReturns,
    ...options,
  }) as TConstructor<ExpandRestItems<TParameters>, TReturns>;
}

/** Create a Promise schema */
function createPromiseSchema<T extends TSchema = TSchema>(
  item: T,
  options?: Partial<Omit<TPromise<T>, "'~kind' | 'item'">>,
): TPromise<T> {
  return withSchemaFields({ "~kind": "Promise", item, ...options }) as TPromise<T>;
}

export { createPromiseSchema as Promise };

/** Create an Iterator schema */
export function Iterator<T extends TSchema = TSchema>(
  item: T,
  options?: Partial<Omit<TIterator<T>, "'~kind' | 'item'">>,
): TIterator<T> {
  return withSchemaFields({ "~kind": "Iterator", item, ...options }) as TIterator<T>;
}

/** Create an AsyncIterator schema */
export function AsyncIterator<T extends TSchema = TSchema>(
  item: T,
  options?: Partial<Omit<TAsyncIterator<T>, "'~kind' | 'item'">>,
): TAsyncIterator<T> {
  return withSchemaFields({ "~kind": "AsyncIterator", item, ...options }) as TAsyncIterator<T>;
}

/** Wrap a schema with a decode transform */
export function Decode<T extends TSchema>(
  inner: T,
  decode: (value: unknown) => unknown,
): TDecode<T> {
  return withSchemaFields({ "~kind": "Decode", inner, decode }) as TDecode<T>;
}

/** Wrap a schema with an encode transform */
export function Encode<T extends TSchema>(
  inner: T,
  encode: (value: unknown) => unknown,
): TEncode<T> {
  return withSchemaFields({ "~kind": "Encode", inner, encode }) as TEncode<T>;
}
