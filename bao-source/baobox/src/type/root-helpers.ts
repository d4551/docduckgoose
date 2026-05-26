import { Composite } from "./actions.js";
import type { TSchema } from "./base-types.js";
import { Evaluate as EvaluateObject, Intersect, Union } from "./combinator-core.js";
import { Object as TypeObject } from "./containers.js";
import type { TObject } from "./containers-types.js";
import { Extends, ExtendsResult } from "./extends.js";
import {
  Never,
  Number as TypeNumber,
  String as TypeString,
  Symbol as TypeSymbol,
} from "./primitives.js";
import {
  ResultDisjoint,
  ResultEqual,
  ResultLeftInside,
  ResultRightInside,
} from "./root-constants.js";
import { getKind, isLiteralValue, isObjectValue, withSchemaFields } from "./root-shared.js";
import type { TObjectOptions } from "./schema-options.js";

const INTEGER_KEY_RE: RegExp = /^(?:0|[1-9][0-9]*)$/;

/**
 * Schema with a variants array (Union/Intersect). Used to access .variants on TSchema
 * after a getKind() guard confirms the schema is a Union or Intersect kind.
 * TS cannot narrow TSchema based on getKind()'s string return, so this type is used
 * in assertions guarded by the preceding kind check.
 */
interface TSchemaWithVariants extends TSchema {
  variants: TSchema[];
}

/**
 * Extract the variants array from a schema that has been verified as Union or Intersect
 * via getKind(). Provides a readable alternative to inline type assertions.
 */
function schemaVariantsUnchecked(schema: TSchema): TSchema[] {
  return (schema as TSchemaWithVariants).variants;
}

export class InvalidLiteralValue extends Error {
  constructor(readonly value: unknown) {
    super("Invalid Literal value");
  }
}

export function LiteralTypeName(value: unknown): "bigint" | "boolean" | "number" | "string" {
  if (typeof value === "bigint") {
    return "bigint";
  }
  if (typeof value === "boolean") {
    return "boolean";
  }
  if (typeof value === "number") {
    return "number";
  }
  if (typeof value === "string") {
    return "string";
  }
  throw new InvalidLiteralValue(value);
}

// Safe: withSchemaFields adds Kind/params/static runtime fields, producing a valid TSchema.
// TS cannot structurally verify the intersection satisfies TSchema's extended interface chain
// (TypeBoxSchema + TSchemaOptions), so the cast is required for schema factory functions.
function literalSchema(value: string | number | boolean | bigint): TSchema {
  return withSchemaFields({ "~kind": "Literal", const: value }) as TSchema;
}

export function ConvertToIntegerKey(value: string | number): string | number {
  const normal = `${value}`;
  return INTEGER_KEY_RE.test(normal) ? globalThis.Number.parseInt(normal, 10) : value;
}

export function KeysToIndexer(keys: ReadonlyArray<string | number | boolean | bigint>): TSchema {
  const literals = keys.filter((key) => isLiteralValue(key)).map((key) => literalSchema(key));
  return EvaluateUnionFast(literals);
}

export function EnumValuesToVariants(values: readonly unknown[]): TSchema[] {
  return values.flatMap((value) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "bigint"
    ) {
      return [literalSchema(value)];
    }
    return [];
  });
}

export function EnumValuesToUnion(values: readonly unknown[]): TSchema {
  return EvaluateUnionFast(EnumValuesToVariants(values));
}

export function EnumToUnion(type: TSchema): TSchema {
  const valuesSource = isObjectValue(type) ? type.values : undefined;
  const enumSource = isObjectValue(type) ? type.enum : undefined;
  const values = Array.isArray(valuesSource)
    ? valuesSource
    : Array.isArray(enumSource)
      ? enumSource
      : [];
  return EnumValuesToUnion(values);
}

export function TypeScriptEnumToEnumValues(
  type: Record<string, string | number>,
): Array<string | number> {
  const values: Array<string | number> = [];
  for (const key of Object.keys(type)) {
    if (!globalThis.Number.isNaN(globalThis.Number(key))) {
      continue;
    }
    const value = type[key];
    if (value === undefined) {
      continue;
    }
    values.push(value);
  }
  return values;
}

export function Compare(
  left: TSchema,
  right: TSchema,
): typeof ResultDisjoint | typeof ResultEqual | typeof ResultLeftInside | typeof ResultRightInside {
  const leftExtendsRight = Extends(left, right);
  const rightExtendsLeft = Extends(right, left);
  return ExtendsResult.isExtendsTrueLike(leftExtendsRight) &&
    ExtendsResult.isExtendsTrueLike(rightExtendsLeft)
    ? ResultEqual
    : ExtendsResult.isExtendsTrueLike(leftExtendsRight) &&
        ExtendsResult.isExtendsFalse(rightExtendsLeft)
      ? ResultLeftInside
      : ExtendsResult.isExtendsFalse(leftExtendsRight) &&
          ExtendsResult.isExtendsTrueLike(rightExtendsLeft)
        ? ResultRightInside
        : ResultDisjoint;
}

export function Flatten(types: readonly TSchema[]): TSchema[] {
  return types.flatMap((type) =>
    getKind(type) === "Union" ? Flatten(schemaVariantsUnchecked(type)) : [type],
  );
}

export function Narrow(left: TSchema, right: TSchema): TSchema {
  const result = Compare(left, right);
  return result === ResultLeftInside
    ? left
    : result === ResultRightInside || result === ResultEqual
      ? right
      : Never();
}

function broadenFilter(type: TSchema, types: readonly TSchema[]): TSchema[] {
  return types.filter((candidate) => Compare(type, candidate) !== ResultRightInside);
}

function isBroadestType(type: TSchema, types: readonly TSchema[]): boolean {
  return !types.some((candidate) => {
    const result = Compare(type, candidate);
    return result === ResultLeftInside || result === ResultEqual;
  });
}

function broadenType(type: TSchema, types: readonly TSchema[]): TSchema[] {
  const evaluated = EvaluateType(type);
  return getKind(evaluated) === "Any"
    ? [evaluated]
    : isBroadestType(evaluated, types)
      ? [...broadenFilter(evaluated, types), evaluated]
      : [...types];
}

export function Broaden(types: readonly TSchema[]): TSchema {
  let broadened: TSchema[] = [];
  for (const type of types) {
    if (getKind(type) === "Object") {
      broadened = [...broadened, type];
      continue;
    }
    if (getKind(type) === "Never") {
      continue;
    }
    broadened = broadenType(type, broadened);
  }
  const flattened = Flatten(broadened);
  return flattened.length === 0
    ? Never()
    : flattened.length === 1
      ? (flattened[0] ?? Never())
      : Union(flattened);
}

function isObjectLike(type: TSchema): boolean {
  const kind = getKind(type);
  return kind === "Object" || kind === "Tuple";
}

function distributeOperation(left: TSchema, right: TSchema): TSchema {
  const evaluatedLeft = EvaluateType(left);
  const evaluatedRight = EvaluateType(right);
  if (getKind(evaluatedLeft) === "Union" || getKind(evaluatedRight) === "Union") {
    return EvaluateIntersect([evaluatedLeft, evaluatedRight]);
  }
  if (isObjectLike(evaluatedLeft) && isObjectLike(evaluatedRight)) {
    return Composite([CollapseToObject(evaluatedLeft), CollapseToObject(evaluatedRight)]);
  }
  if (isObjectLike(evaluatedLeft)) {
    return evaluatedLeft;
  }
  if (isObjectLike(evaluatedRight)) {
    return evaluatedRight;
  }
  return Narrow(evaluatedLeft, evaluatedRight);
}

function distributeType(
  type: TSchema,
  types: readonly TSchema[],
  result: TSchema[] = [],
): TSchema[] {
  const [left, ...right] = types;
  return left === undefined
    ? result.length === 0
      ? [type]
      : result
    : distributeType(type, right, [...result, distributeOperation(type, left)]);
}

function distributeUnion(
  types: readonly TSchema[],
  distribution: readonly TSchema[],
  result: TSchema[] = [],
): TSchema[] {
  const [left, ...right] = types;
  return left === undefined
    ? result
    : distributeUnion(right, distribution, [...result, ...Distribute([left], distribution)]);
}

export function Distribute(types: readonly TSchema[], result: readonly TSchema[] = []): TSchema[] {
  const [left, ...right] = types;
  if (left === undefined) {
    return [...result];
  }
  return getKind(left) === "Union"
    ? Distribute(right, distributeUnion(schemaVariantsUnchecked(left), result))
    : Distribute(right, distributeType(left, result));
}

export function EvaluateIntersect(types: readonly TSchema[]): TSchema {
  return Broaden(Distribute(types));
}

export function EvaluateUnion(types: readonly TSchema[]): TSchema {
  return Broaden(types);
}

export function EvaluateType(type: TSchema): TSchema {
  return getKind(type) === "Intersect"
    ? EvaluateIntersect(schemaVariantsUnchecked(type))
    : getKind(type) === "Union"
      ? EvaluateUnion(schemaVariantsUnchecked(type))
      : type;
}

export function EvaluateUnionFast(types: readonly TSchema[]): TSchema {
  return types.length === 0
    ? Never()
    : types.length === 1
      ? (types[0] ?? Never())
      : Union([...types]);
}

// Safe: all casts below are guarded by getKind() checks. TS cannot narrow TSchema based
// on getKind()'s string return value. Each cast targets a type that extends TSchema.
export function CollapseToObject(type: TSchema): TObject<Record<string, TSchema>, string, string> {
  if (getKind(type) === "Object") {
    return type as TObject<Record<string, TSchema>, string, string>;
  }
  if (getKind(type) === "Intersect") {
    // Safe: getKind(type) === 'Intersect' verified above; filter keeps only Object-kind schemas
    const variants = schemaVariantsUnchecked(type).filter(
      (variant) => getKind(variant) === "Object",
    ) as TObject[];
    return variants.length > 0
      ? (EvaluateObject(Intersect(variants)) as TObject<Record<string, TSchema>, string, string>)
      : TypeObject({});
  }
  return TypeObject({});
}

// Safe: see literalSchema comment — withSchemaFields cast to TSchema is structurally required.
export function _Function_(
  parameters: TSchema[],
  returnType: TSchema,
  options: Record<string, unknown> = {},
): TSchema {
  return withSchemaFields({
    "~kind": "Function",
    parameters,
    returns: returnType,
    ...options,
  }) as TSchema;
}

export function _Object_(
  properties: Record<string, TSchema>,
  options: TObjectOptions = {},
): TObject<Record<string, TSchema>, string, string> {
  // Safe: TypeObject's const generic infers exact property keys, but _Object_ is called
  // with a dynamic Record<string, TSchema>. The return type coerces the inferred key types.
  return TypeObject(properties, options) as TObject<Record<string, TSchema>, string, string>;
}

// Safe: see literalSchema comment — withSchemaFields cast to TSchema is structurally required.
export function CallConstruct(target: TSchema, arguments_: TSchema[]): TSchema {
  return withSchemaFields({ "~kind": "Call", target, arguments: arguments_ }) as TSchema;
}

// Safe: all casts below are guarded by getKind() switch cases. TS cannot narrow TSchema
// based on getKind()'s string return. Each cast accesses properties specific to the matched kind.
export function KeyOfAction(type: TSchema): TSchema {
  switch (getKind(type)) {
    case "Any":
      return Union([TypeNumber(), TypeString(), TypeSymbol()]);
    case "Array":
      return TypeNumber();
    case "Object": {
      const keys = Object.keys((type as TObject).properties).map((key) => ConvertToIntegerKey(key));
      return EvaluateUnionFast(keys.map((key) => literalSchema(key)));
    }
    case "Record":
      return (type as TSchema & { key: TSchema }).key;
    case "Tuple": {
      const variants = (type as TSchema & { items: TSchema[] }).items.map((_, index) =>
        literalSchema(index),
      );
      return EvaluateUnionFast(variants);
    }
    default:
      return Never();
  }
}
