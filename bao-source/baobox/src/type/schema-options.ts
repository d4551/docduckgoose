/**
 * Shared schema option interfaces for baobox type constructors.
 *
 * These interfaces preserve the public option surface used across baobox
 * without introducing a second schema source of truth.
 */

import type { TSchema } from "./base-types.js";

export interface TSchemaOptions {
  [key: PropertyKey]: unknown;
  $schema?: string;
  $id?: string;
  title?: string;
  description?: string;
  default?: unknown;
  examples?: unknown;
  readOnly?: boolean;
  writeOnly?: boolean;
  if?: TSchema;
  then?: TSchema;
  else?: TSchema;
}

export interface TObjectOptions extends TSchemaOptions {
  additionalProperties?: TSchema | boolean;
  minProperties?: number;
  maxProperties?: number;
  patternProperties?: Record<string, TSchema>;
}

export interface TArrayOptions extends TSchemaOptions {
  minItems?: number;
  maxItems?: number;
  contains?: TSchema;
  minContains?: number;
  maxContains?: number;
  uniqueItems?: boolean;
}

export interface TTupleOptions extends TArrayOptions {
  unevaluatedItems?: TSchema | boolean;
}

export interface TIntersectOptions extends TSchemaOptions {
  additionalProperties?: TSchema | boolean;
  unevaluatedProperties?: TSchema | boolean;
}

export interface TNumberOptions extends TSchemaOptions {
  exclusiveMaximum?: number | bigint;
  exclusiveMinimum?: number | bigint;
  maximum?: number | bigint;
  minimum?: number | bigint;
  multipleOf?: number | bigint;
}

export interface TStringOptions extends TSchemaOptions {
  format?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
}

export type TProperties = Record<string, TSchema>;

export type TLiteralValue = string | number | boolean | null;

export type TEnumValue = string | number;

export type TFormat =
  | "date-time"
  | "date"
  | "duration"
  | "email"
  | "hostname"
  | "idn-email"
  | "idn-hostname"
  | "ipv4"
  | "ipv6"
  | "iri-reference"
  | "iri"
  | "json-pointer-uri-fragment"
  | "json-pointer"
  | "json-string"
  | "regex"
  | "relative-json-pointer"
  | "time"
  | "uri-reference"
  | "uri-template"
  | "uri"
  | "url"
  | "uuid"
  | ({} & string);
