import { Hint, Kind, OptionalKind, ReadonlyKind } from "../shared/symbols.js";

export type TKind = string;

export interface StandardSchemaV1Types<Input = unknown, Output = Input> {
  readonly input: Input;
  readonly output: Output;
}

export interface StandardSchemaV1Issue {
  readonly message: string;
  readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }> | undefined;
}

export interface StandardSchemaV1Success<Output> {
  readonly issues?: undefined;
  readonly value: Output;
}

export interface StandardSchemaV1Failure {
  readonly issues: readonly StandardSchemaV1Issue[];
}

export type StandardSchemaV1Result<Output> =
  | StandardSchemaV1Success<Output>
  | StandardSchemaV1Failure;

export interface StandardSchemaV1Props<Input = unknown, Output = Input> {
  readonly types?: StandardSchemaV1Types<Input, Output> | undefined;
  readonly validate: (value: unknown) => StandardSchemaV1Result<Output>;
  readonly vendor: "baobox";
  readonly version: 1;
}

export interface TStandardSchema<Output> {
  readonly "~standard": StandardSchemaV1Props<unknown, Output>;
}

export interface TSchemaOptions {
  [key: string]: unknown;
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

export interface TSchema extends TSchemaOptions {
  [Kind]: string;
  [Hint]?: string;
  [ReadonlyKind]?: string;
  [OptionalKind]?: string;
  "~kind"?: TKind;
  params: unknown[];
  static: unknown;
}
