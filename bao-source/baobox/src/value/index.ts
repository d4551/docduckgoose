import type { ParseFailure, ParseResult, ParseSuccess } from "../error/errors.js";
import { Errors } from "../error/errors.js";
import { Assert, AssertError } from "./assert.js";
import { Cast } from "./cast.js";
import type { ValueCheckOptions } from "./check.js";
import { Check } from "./check.js";
import { Clean } from "./clean.js";
import { Clone } from "./clone.js";
import { Convert } from "./convert.js";
import { Create } from "./create.js";
import { Decode } from "./decode.js";
import { Default } from "./default.js";
import type { DiffEdit } from "./diff.js";
import { Diff } from "./diff.js";
import { Encode } from "./encode.js";
import { Equal } from "./equal.js";
import { HasCodec } from "./has-codec.js";
import { Hash } from "./hash.js";
import { Mutate } from "./mutate.js";
import { Parse, ParseError, TryParse } from "./parse.js";
import { Patch } from "./patch.js";
import type { PipelineStage } from "./pipeline.js";
import { Pipeline } from "./pipeline.js";
import { Pointer } from "./pointer.js";
import { Repair } from "./repair.js";
import { Explain, TryCast, TryCreate, TryDecode, TryEncode, TryRepair } from "./result.js";
import { IsOptionalUndefined, UnionPrioritySort, UnionScoreSelect } from "./union-selection.js";
import type { ValueError } from "./value-errors.js";
import { ErrorsIterator, First, ValueErrorType } from "./value-errors.js";

export { ValueErrorType };

export class CreateError extends Error {
  public readonly causeValue: unknown;
  constructor(message: string, causeValue: unknown) {
    super(message);
    this.name = "CreateError";
    this.causeValue = causeValue;
  }
}

export class DecodeError extends Error {
  public readonly causeValue: unknown;
  constructor(message: string, causeValue: unknown) {
    super(message);
    this.name = "DecodeError";
    this.causeValue = causeValue;
  }
}

export class EncodeError extends Error {
  public readonly causeValue: unknown;
  constructor(message: string, causeValue: unknown) {
    super(message);
    this.name = "EncodeError";
    this.causeValue = causeValue;
  }
}

export const Insert: {
  readonly type: "object";
  readonly required: readonly ["type", "path", "value"];
  readonly properties: {
    readonly type: { readonly const: "insert" };
    readonly path: { readonly type: "string" };
    readonly value: object;
  };
} = {
  type: "object",
  required: ["type", "path", "value"],
  properties: {
    type: { const: "insert" },
    path: { type: "string" },
    value: {},
  },
} as const;

export const Update: {
  readonly type: "object";
  readonly required: readonly ["type", "path", "value"];
  readonly properties: {
    readonly type: { readonly const: "update" };
    readonly path: { readonly type: "string" };
    readonly value: object;
  };
} = {
  type: "object",
  required: ["type", "path", "value"],
  properties: {
    type: { const: "update" },
    path: { type: "string" },
    value: {},
  },
} as const;

export const Delete: {
  readonly type: "object";
  readonly required: readonly ["type", "path"];
  readonly properties: {
    readonly type: { readonly const: "delete" };
    readonly path: { readonly type: "string" };
  };
} = {
  type: "object",
  required: ["type", "path"],
  properties: {
    type: { const: "delete" },
    path: { type: "string" },
  },
} as const;

export const Edit: {
  readonly anyOf: readonly [
    {
      readonly type: "object";
      readonly required: readonly ["type", "path", "value"];
      readonly properties: {
        readonly type: { readonly const: "insert" };
        readonly path: { readonly type: "string" };
        readonly value: object;
      };
    },
    {
      readonly type: "object";
      readonly required: readonly ["type", "path", "value"];
      readonly properties: {
        readonly type: { readonly const: "update" };
        readonly path: { readonly type: "string" };
        readonly value: object;
      };
    },
    {
      readonly type: "object";
      readonly required: readonly ["type", "path"];
      readonly properties: {
        readonly type: { readonly const: "delete" };
        readonly path: { readonly type: "string" };
      };
    },
  ];
} = {
  anyOf: [Insert, Update, Delete],
} as const;

const Value = {
  Assert,
  Cast,
  Check,
  Clean,
  Clone,
  Convert,
  Create,
  Decode,
  Default,
  Diff,
  Encode,
  Equal,
  Errors,
  ErrorsIterator,
  Explain,
  First,
  HasCodec,
  Hash,
  IsOptionalUndefined,
  Mutate,
  Parse,
  TryCast,
  TryCreate,
  TryDecode,
  TryEncode,
  TryParse,
  TryRepair,
  Patch,
  Pipeline,
  Pointer,
  Repair,
  UnionPrioritySort,
  UnionScoreSelect,
};

export type {
  DiffEdit,
  ParseFailure,
  ParseResult,
  ParseSuccess,
  PipelineStage,
  ValueCheckOptions,
  ValueError,
};
export {
  Assert,
  AssertError,
  Cast,
  Check,
  Clean,
  Clone,
  Convert,
  Create,
  Decode,
  Decode as DecodeUnsafe,
  Default,
  Diff,
  Encode,
  Encode as EncodeUnsafe,
  Equal,
  Errors,
  ErrorsIterator,
  Explain,
  First,
  HasCodec,
  Hash,
  IsOptionalUndefined,
  Mutate,
  Parse,
  ParseError,
  Patch,
  Pipeline,
  Pointer,
  Repair,
  TryCast,
  TryCreate,
  TryDecode,
  TryEncode,
  TryParse,
  TryRepair,
  UnionPrioritySort,
  UnionScoreSelect,
};

export function Parser(): typeof Value {
  return Value;
}

export { Value };
export default Value;
