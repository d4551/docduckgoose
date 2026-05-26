import type { TSchema } from "./base-types.js";
import type { TIntersect, TUnion } from "./composite-types.js";
import type { TArray, TObject, TRecord, TTuple } from "./containers-types.js";
import type { TRefinement } from "./extensions.js";
import type {
  TAsyncIterator,
  TConstructor,
  TFunction,
  TIterator,
  TPromise,
} from "./higher-order-types.js";
import { discardKeys, getKind, isObjectValue, withSchemaFields } from "./root-shared.js";

export const BigIntPattern = "-?(?:0|[1-9][0-9]*)n";
export const IntegerPattern = "-?(?:0|[1-9][0-9]*)";
export const NumberPattern = "-?(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?";
export const StringPattern = ".*";
export const NeverPattern = "(?!)";
export const IntegerKey: string = `^${IntegerPattern}$`;
export const NumberKey: string = `^${NumberPattern}$`;
export const StringKey: string = `^${StringPattern}$`;
export const ResultEqual: "equal" = "equal" as const;
export const ResultDisjoint: "disjoint" = "disjoint" as const;
export const ResultLeftInside: "left-inside" = "left-inside" as const;
export const ResultRightInside: "right-inside" = "right-inside" as const;

function schemaOptions(type: TSchema, keys: readonly string[]): Record<string, unknown> {
  return discardKeys(type, keys);
}

export function ArrayOptions(type: TArray): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "items"]);
}

export function AsyncIteratorOptions(type: TAsyncIterator): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "item"]);
}

export function ConstructorOptions(type: TConstructor): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "parameters", "returns"]);
}

export function FunctionOptions(type: TFunction): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "parameters", "returns"]);
}

export function IntersectOptions(type: TIntersect): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "variants"]);
}

export function IteratorOptions(type: TIterator): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "item"]);
}

export function ObjectOptions(type: TObject): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "properties"]);
}

export function PromiseOptions(type: TPromise): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "item"]);
}

export function RecordOptions(type: TRecord): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "key", "value"]);
}

export function TupleOptions(type: TTuple): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "items", "minItems", "maxItems", "additionalItems"]);
}

export function UnionOptions(type: TUnion): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "variants"]);
}

export function CyclicOptions(type: TSchema): Record<string, unknown> {
  return schemaOptions(type, ["~kind", "$defs", "$ref"]);
}

function isOptionalSchema(schema: TSchema): boolean {
  return getKind(schema) === "Optional" || (isObjectValue(schema) && schema["~optional"] === true);
}

export function RequiredArray(properties: Record<string, TSchema>): string[] {
  return Object.entries(properties)
    .filter(([, property]) => !isOptionalSchema(property))
    .map(([key]) => key);
}

export function PropertyKeys<TProperties extends Record<string, TSchema>>(
  properties: TProperties,
): Extract<keyof TProperties, string>[] {
  return Object.keys(properties) as Extract<keyof TProperties, string>[];
}

export function PropertyValues<TProperties extends Record<string, TSchema>>(
  properties: TProperties,
): TProperties[Extract<keyof TProperties, string>][] {
  return Object.values(properties) as TProperties[Extract<keyof TProperties, string>][];
}

export interface TOptionalAddAction<Type extends TSchema = TSchema> extends TSchema {
  "~kind": "OptionalAddAction";
  type: Type;
}

export interface TOptionalRemoveAction<Type extends TSchema = TSchema> extends TSchema {
  "~kind": "OptionalRemoveAction";
  type: Type;
}

export interface TReadonlyAddAction<Type extends TSchema = TSchema> extends TSchema {
  "~kind": "ReadonlyAddAction";
  type: Type;
}

export interface TReadonlyRemoveAction<Type extends TSchema = TSchema> extends TSchema {
  "~kind": "ReadonlyRemoveAction";
  type: Type;
}

export function OptionalAddAction<Type extends TSchema>(type: Type): TOptionalAddAction<Type> {
  return withSchemaFields({ "~kind": "OptionalAddAction", type }) as TOptionalAddAction<Type>;
}

export function OptionalRemoveAction<Type extends TSchema>(
  type: Type,
): TOptionalRemoveAction<Type> {
  return withSchemaFields({ "~kind": "OptionalRemoveAction", type }) as TOptionalRemoveAction<Type>;
}

export function ReadonlyAddAction<Type extends TSchema>(type: Type): TReadonlyAddAction<Type> {
  return withSchemaFields({ "~kind": "ReadonlyAddAction", type }) as TReadonlyAddAction<Type>;
}

export function ReadonlyRemoveAction<Type extends TSchema>(
  type: Type,
): TReadonlyRemoveAction<Type> {
  return withSchemaFields({ "~kind": "ReadonlyRemoveAction", type }) as TReadonlyRemoveAction<Type>;
}

function removeModifier<Type extends TSchema>(type: Type, key: string): Type {
  return discardKeys(type, [key]) as Type;
}

export function OptionalAdd<Type extends TSchema>(type: Type): Type & { "~optional": true } {
  return { ...type, "~optional": true } as Type & { "~optional": true };
}

export function OptionalRemove<Type extends TSchema>(type: Type): Type {
  return removeModifier(type, "~optional");
}

export function ReadonlyAdd<Type extends TSchema>(type: Type): Type & { "~readonly": true } {
  return { ...type, "~readonly": true } as Type & { "~readonly": true };
}

export function ReadonlyRemove<Type extends TSchema>(type: Type): Type {
  return removeModifier(type, "~readonly");
}

export function ImmutableAdd<Type extends TSchema>(type: Type): Type & { "~immutable": true } {
  return { ...type, "~immutable": true } as Type & { "~immutable": true };
}

export function ImmutableRemove<Type extends TSchema>(type: Type): Type {
  return removeModifier(type, "~immutable");
}

export function RefineAdd<Type extends TSchema>(
  type: Type,
  refinement: TRefinement<Type>,
): Type & { "~refine": TRefinement<Type>[] } {
  const existing =
    isObjectValue(type) && Array.isArray(type["~refine"])
      ? (type["~refine"] as TRefinement<Type>[])
      : [];
  return { ...type, "~refine": [...existing, refinement] } as Type & {
    "~refine": TRefinement<Type>[];
  };
}
