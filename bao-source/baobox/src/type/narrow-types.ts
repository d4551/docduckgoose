import type { TSchema, TStandardSchema } from "./base-types.js";

export interface TExclude<TLeft extends TSchema, TRight extends TSchema>
  extends TSchema,
    TStandardSchema<Exclude<TLeft["static"], TRight["static"]>> {
  "~kind": "Exclude";
  static: Exclude<TLeft["static"], TRight["static"]>;
  left: TLeft;
  right: TRight;
}

export interface TExtract<TLeft extends TSchema, TRight extends TSchema>
  extends TSchema,
    TStandardSchema<Extract<TLeft["static"], TRight["static"]>> {
  "~kind": "Extract";
  static: Extract<TLeft["static"], TRight["static"]>;
  left: TLeft;
  right: TRight;
}

export interface TTemplateLiteral<TPatterns extends string[] = string[]> extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<unknown, string>;
  "~kind": "TemplateLiteral";
  static: string;
  patterns: TPatterns;
  title?: string;
  description?: string;
}

export interface TUnsafe<T = unknown> extends TSchema, TStandardSchema<T> {
  "~kind": "Unsafe";
  static: T;
  schema: Record<string, unknown>;
  type: T;
}
