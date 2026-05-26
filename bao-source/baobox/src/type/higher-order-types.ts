import type { TSchema, TStandardSchema } from "./base-types.js";

type StaticTuple<TItems extends TSchema[]> = TItems extends [
  infer Head extends TSchema,
  ...infer Tail extends TSchema[],
]
  ? [Head["static"], ...StaticTuple<Tail>]
  : TItems extends []
    ? []
    : TItems[number]["static"][];

export interface TPromise<T extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<Promise<T["static"]>> {
  "~kind": "Promise";
  static: Promise<T["static"]>;
  item: T;
}

export interface TIterator<T extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<IterableIterator<T["static"]>> {
  "~kind": "Iterator";
  static: IterableIterator<T["static"]>;
  item: T;
}

export interface TAsyncIterator<T extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<AsyncIterableIterator<T["static"]>> {
  "~kind": "AsyncIterator";
  static: AsyncIterableIterator<T["static"]>;
  item: T;
}

export interface TUint8Array extends TSchema, TStandardSchema<Uint8Array> {
  "~kind": "Uint8Array";
  static: Uint8Array;
  minByteLength?: number;
  maxByteLength?: number;
  constBytes?: Uint8Array;
  title?: string;
  description?: string;
}

export interface TRegExpInstance extends TSchema, TStandardSchema<RegExp> {
  "~kind": "RegExpInstance";
  static: RegExp;
  title?: string;
  description?: string;
}

export interface TFunction<
  TFnParams extends TSchema[] = TSchema[],
  TReturns extends TSchema = TSchema,
> extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    (...args: StaticTuple<TFnParams>) => TReturns["static"]
  >;
  "~kind": "Function";
  static: (...args: StaticTuple<TFnParams>) => TReturns["static"];
  parameters: TFnParams;
  returns: TReturns;
}

export interface TConstructor<
  TParams extends TSchema[] = TSchema[],
  TReturns extends TSchema = TSchema,
> extends TSchema {
  readonly "~standard": import("./base-types.js").StandardSchemaV1Props<
    unknown,
    new (
      ...args: StaticTuple<TParams>
    ) => TReturns["static"]
  >;
  "~kind": "Constructor";
  static: new (...args: StaticTuple<TParams>) => TReturns["static"];
  parameters: TParams;
  returns: TReturns;
}

export interface TDecode<T extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<T["static"]> {
  "~kind": "Decode";
  static: T["static"];
  inner: T;
  decode: (value: unknown) => unknown;
}

export interface TEncode<T extends TSchema = TSchema>
  extends TSchema,
    TStandardSchema<T["static"]> {
  "~kind": "Encode";
  static: T["static"];
  inner: T;
  encode: (value: unknown) => unknown;
}

export interface TAwaited<T extends TPromise = TPromise>
  extends TSchema,
    TStandardSchema<Awaited<T["static"]>> {
  "~kind": "Awaited";
  static: Awaited<T["static"]>;
  promise: T;
}

export interface TReturnType<T extends TFunction = TFunction>
  extends TSchema,
    TStandardSchema<T["returns"]["static"]> {
  "~kind": "ReturnType";
  static: T["returns"]["static"];
  function: T;
}

export interface TParameters<T extends TFunction = TFunction>
  extends TSchema,
    TStandardSchema<StaticTuple<T["parameters"]>> {
  "~kind": "Parameters";
  static: StaticTuple<T["parameters"]>;
  function: T;
}

export interface TInstanceType<T extends TConstructor = TConstructor>
  extends TSchema,
    TStandardSchema<T["returns"]["static"]> {
  "~kind": "InstanceType";
  static: T["returns"]["static"];
  constructor: T;
}

export interface TConstructorParameters<T extends TConstructor = TConstructor>
  extends TSchema,
    TStandardSchema<StaticTuple<T["parameters"]>> {
  "~kind": "ConstructorParameters";
  static: StaticTuple<T["parameters"]>;
  constructor: T;
}

export interface TModule extends TSchema, TStandardSchema<unknown> {
  "~kind": "Module";
  static: unknown;
  definitions: Record<string, TSchema>;
}
