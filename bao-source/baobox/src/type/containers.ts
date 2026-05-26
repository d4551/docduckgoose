import { schemaKind } from "../shared/schema-access.js";
import { OptionalKind } from "../shared/symbols.js";
import { type ExpandRestItems, ExpandTupleRest } from "./actions.js";
import type { TSchema } from "./base-types.js";
import type {
  InferOptionalKeys,
  InferRequiredKeys,
  TArray,
  TObject,
  TRecord,
  TTuple,
} from "./containers-types.js";
import { withSchemaFields } from "./root-shared.js";
import type {
  TArrayOptions,
  TObjectOptions,
  TSchemaOptions,
  TTupleOptions,
} from "./schema-options.js";

type TRecordOptions = TSchemaOptions & {
  minProperties?: number;
  maxProperties?: number;
  default?: Record<string, unknown>;
};

function createArraySchema<T extends TSchema>(item: T, options?: TArrayOptions): TArray<T> {
  return withSchemaFields({
    "~kind": "Array",
    type: "array",
    items: item,
    ...options,
  }) as TArray<T>;
}

export { createArraySchema as Array };

/** Check if a schema property is optional (via TOptional or ~optional metadata) */
function isOptionalProperty(schema: TSchema): boolean {
  const optionalMarker = Object.getOwnPropertyDescriptor(schema, OptionalKind)?.value;
  return (
    schemaKind(schema) === "Optional" ||
    schema["~optional"] === true ||
    optionalMarker === "Optional"
  );
}

/** Compute required and optional key arrays from properties at runtime */
function computeObjectKeys(properties: Record<string, TSchema>): {
  required: string[];
  optional: string[];
} {
  const required: string[] = [];
  const optional: string[] = [];
  for (const [key, value] of globalThis.Object.entries(properties)) {
    if (isOptionalProperty(value)) {
      optional.push(key);
    } else {
      required.push(key);
    }
  }
  return { required, optional };
}

function createObjectSchema<const TProperties extends Record<string, TSchema>>(
  properties: TProperties,
  options?: TObjectOptions,
): TObject<TProperties, InferRequiredKeys<TProperties>, InferOptionalKeys<TProperties>> {
  const keys = computeObjectKeys(properties);
  return withSchemaFields({
    "~kind": "Object",
    type: "object",
    properties,
    ...(keys.required.length > 0 ? { required: keys.required } : {}),
    ...(keys.optional.length > 0 ? { optional: keys.optional } : {}),
    ...options,
  }) as TObject<TProperties, InferRequiredKeys<TProperties>, InferOptionalKeys<TProperties>>;
}

export { createObjectSchema as Object };

export function Tuple<TItems extends TSchema[]>(
  items: TItems,
  options?: TTupleOptions & { additionalItems?: boolean },
): TTuple<ExpandRestItems<TItems>> {
  const expandedItems = ExpandTupleRest(items);
  return withSchemaFields({
    "~kind": "Tuple",
    type: "array",
    items: expandedItems,
    minItems: options?.minItems ?? expandedItems.length,
    maxItems:
      options?.maxItems ?? (options?.additionalItems === true ? undefined : expandedItems.length),
    additionalItems: options?.additionalItems ?? false,
    ...options,
  }) as TTuple<ExpandRestItems<TItems>>;
}

export function Record<TKey extends TSchema, TValue extends TSchema>(
  key: TKey,
  value: TValue,
  options?: TRecordOptions,
): TRecord<TKey, TValue> {
  return withSchemaFields({
    "~kind": "Record",
    type: "object",
    key,
    value,
    ...options,
  }) as TRecord<TKey, TValue>;
}

export function RecordKey<TKey extends TSchema, TValue extends TSchema>(
  record: TRecord<TKey, TValue>,
): TKey {
  return record.key;
}

export function RecordValue<TKey extends TSchema, TValue extends TSchema>(
  record: TRecord<TKey, TValue>,
): TValue {
  return record.value;
}

export function RecordKeyAsPattern(record: TRecord): string {
  const literalKey = record.key.const;
  if (typeof literalKey === "string") {
    return `^${literalKey}$`;
  }

  const firstPattern = Object.keys(record.patternProperties ?? {})[0];
  if (firstPattern !== undefined) {
    return firstPattern;
  }

  return "^.*$";
}
