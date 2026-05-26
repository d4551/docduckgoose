import { schemaConst, schemaKind, schemaVariants } from "../shared/schema-access.js";
import type { TSchema } from "./base-types.js";
import type { TObject } from "./containers-types.js";
import type { TInfer } from "./extensions.js";
import type { TProperties } from "./instantiation.js";

export interface TExtendsUnion<Inferred extends TProperties = TProperties> {
  "~kind": "ExtendsUnion";
  inferred: Inferred;
}

export interface TExtendsTrue<Inferred extends TProperties = TProperties> {
  "~kind": "ExtendsTrue";
  inferred: Inferred;
}

export interface TExtendsFalse {
  "~kind": "ExtendsFalse";
}

export type TExtendsResult<Inferred extends TProperties = TProperties> =
  | TExtendsUnion<Inferred>
  | TExtendsTrue<Inferred>
  | TExtendsFalse;
export type TExtends<
  Inferred extends TProperties,
  _Left extends TSchema,
  _Right extends TSchema,
> = TExtendsResult<Inferred>;

function extendsUnion<Inferred extends TProperties>(inferred: Inferred): TExtendsUnion<Inferred> {
  return { "~kind": "ExtendsUnion", inferred };
}

function extendsTrue<Inferred extends TProperties>(inferred: Inferred): TExtendsTrue<Inferred> {
  return { "~kind": "ExtendsTrue", inferred };
}

function extendsFalse(): TExtendsFalse {
  return { "~kind": "ExtendsFalse" };
}

function isExtendsTrueLike(value: TExtendsResult): value is TExtendsUnion | TExtendsTrue {
  return value["~kind"] === "ExtendsTrue" || value["~kind"] === "ExtendsUnion";
}

function mergeInferred(left: TProperties, right: TProperties): TProperties {
  return { ...left, ...right };
}

function extendsObject(inferred: TProperties, left: TObject, right: TObject): TExtendsResult {
  const leftProps = left.properties as Record<string, TSchema>;
  const rightProps = right.properties as Record<string, TSchema>;
  let result: TExtendsResult = extendsTrue(inferred);
  for (const [key, rightSchema] of Object.entries(rightProps)) {
    const leftSchema = leftProps[key];
    if (leftSchema === undefined) {
      return extendsFalse();
    }
    result = extendsSchemas(result.inferred, leftSchema, rightSchema);
    if (!isExtendsTrueLike(result)) {
      return result;
    }
  }
  return result;
}

function extendsLiteral(left: TSchema, right: TSchema): boolean {
  const leftValue = schemaConst(left);
  const rightKind = schemaKind(right);
  if (rightKind === "Literal") {
    return leftValue === schemaConst(right);
  }
  if (rightKind === "String") {
    return typeof leftValue === "string";
  }
  if (rightKind === "Number" || rightKind === "Integer") {
    return typeof leftValue === "number";
  }
  if (rightKind === "Boolean") {
    return typeof leftValue === "boolean";
  }
  return false;
}

function extendsSameKind(inferred: TProperties, left: TSchema, right: TSchema): TExtendsResult {
  const kind = schemaKind(left);
  if (kind === "Object") {
    return extendsObject(inferred, left as TObject, right as TObject);
  }
  return extendsTrue(inferred);
}

function inferFromSchema(inferred: TProperties, left: TSchema, right: TSchema): TExtendsResult {
  if (schemaKind(right) === "Infer") {
    const infer = right as TInfer;
    return extendsSchemas(mergeInferred(inferred, { [infer.name]: left }), left, infer.extends);
  }
  return extendsSchemas(inferred, left, right);
}

function extendsRightUnion(inferred: TProperties, left: TSchema, right: TSchema): TExtendsResult {
  let sawUnion = false;
  for (const variant of schemaVariants(right)) {
    const result = inferFromSchema(inferred, left, variant);
    if (result["~kind"] === "ExtendsTrue") {
      return result;
    }
    if (result["~kind"] === "ExtendsUnion") {
      sawUnion = true;
    }
  }
  return sawUnion ? extendsUnion(inferred) : extendsFalse();
}

function extendsLeftUnion(inferred: TProperties, left: TSchema, right: TSchema): TExtendsResult {
  let result: TExtendsResult = extendsTrue(inferred);
  for (const variant of schemaVariants(left)) {
    result = extendsSchemas(result.inferred, variant, right);
    if (!isExtendsTrueLike(result)) {
      return result;
    }
  }
  return result;
}

function extendsResolvedKinds(
  inferred: TProperties,
  left: TSchema,
  right: TSchema,
  leftKind: string | undefined,
  rightKind: string | undefined,
): TExtendsResult {
  if (leftKind === "Literal") {
    return extendsLiteral(left, right) ? extendsTrue(inferred) : extendsFalse();
  }
  if (rightKind === "Unknown" || rightKind === "Any") {
    return extendsTrue(inferred);
  }
  if (leftKind === rightKind) {
    return extendsSameKind(inferred, left, right);
  }
  if (leftKind === "Integer" && rightKind === "Number") {
    return extendsTrue(inferred);
  }
  return extendsFalse();
}

function extendsSchemas(inferred: TProperties, left: TSchema, right: TSchema): TExtendsResult {
  const leftKind = schemaKind(left);
  const rightKind = schemaKind(right);

  if (rightKind === "Union") {
    return extendsRightUnion(inferred, left, right);
  }

  if (leftKind === "Union") {
    return extendsLeftUnion(inferred, left, right);
  }

  return extendsResolvedKinds(inferred, left, right, leftKind, rightKind);
}

export function Extends<Inferred extends TProperties, Left extends TSchema, Right extends TSchema>(
  inferred: Inferred,
  left: Left,
  right: Right,
): TExtends<Inferred, Left, Right>;
export function Extends<Inferred extends TProperties, Left extends TSchema, Right extends TSchema>(
  left: Left,
  right: Right,
): TExtends<Inferred, Left, Right>;
export function Extends<Inferred extends TProperties, Left extends TSchema, Right extends TSchema>(
  arg0: Inferred | Left,
  arg1: Left | Right,
  arg2?: Right,
): TExtends<Inferred, Left, Right> {
  if (arg2 === undefined) {
    return extendsSchemas({}, arg0 as Left, arg1 as Right) as TExtends<Inferred, Left, Right>;
  }
  return extendsSchemas(arg0 as Inferred, arg1 as Left, arg2) as TExtends<Inferred, Left, Right>;
}

export const ExtendsResult: {
  Union: typeof extendsUnion;
  True: typeof extendsTrue;
  False: typeof extendsFalse;
  isExtendsUnion(value: TExtendsResult): value is TExtendsUnion;
  isExtendsTrue(value: TExtendsResult): value is TExtendsTrue;
  isExtendsFalse(value: TExtendsResult): value is TExtendsFalse;
  isExtendsTrueLike: typeof isExtendsTrueLike;
} = {
  Union: extendsUnion,
  True: extendsTrue,
  False: extendsFalse,
  isExtendsUnion(value: TExtendsResult): value is TExtendsUnion {
    return value["~kind"] === "ExtendsUnion";
  },
  isExtendsTrue(value: TExtendsResult): value is TExtendsTrue {
    return value["~kind"] === "ExtendsTrue";
  },
  isExtendsFalse(value: TExtendsResult): value is TExtendsFalse {
    return value["~kind"] === "ExtendsFalse";
  },
  isExtendsTrueLike: isExtendsTrueLike,
};
