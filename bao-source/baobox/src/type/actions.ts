import { OptionalKind } from "../shared/symbols.js";
import { Clone as CloneValue } from "../value/clone.js";
import type { TSchema } from "./base-types.js";
import type { TReadonly, TUnion } from "./composite-types.js";
import type { TObject, TTuple } from "./containers-types.js";
import type { TExclude } from "./narrow-types.js";
import { Null, Undefined, Unknown } from "./primitives.js";
import type { TNull, TUndefined } from "./primitives-types.js";
import { withSchemaFields } from "./root-shared.js";
import type { UnionToIntersection } from "./static-shared-types.js";
import type {
  TCapitalize,
  TLowercase,
  TRest,
  TUncapitalize,
  TUppercase,
} from "./string-action-types.js";

type TObjectLike = TObject<Record<string, TSchema>, string, string>;

function isOptionalProperty(schema: TSchema): boolean {
  const optionalMarker = Object.getOwnPropertyDescriptor(schema, OptionalKind)?.value;
  return (
    schema["~kind"] === "Optional" || schema["~optional"] === true || optionalMarker === "Optional"
  );
}

function createObjectSchema(properties: Record<string, TSchema>): TObjectLike {
  const required: string[] = [];
  const optional: string[] = [];
  for (const [key, value] of Object.entries(properties)) {
    if (isOptionalProperty(value)) {
      optional.push(key);
    } else {
      required.push(key);
    }
  }
  return withSchemaFields({
    "~kind": "Object",
    type: "object",
    properties,
    ...(required.length > 0 ? { required } : {}),
    ...(optional.length > 0 ? { optional } : {}),
  }) as TObjectLike;
}

function composeObjectSchemas(
  objects: readonly TObjectLike[],
): TObject<Record<string, TSchema>, string, string> {
  const properties: Record<string, TSchema> = {};
  const required = new Set<string>();
  const optional = new Set<string>();

  for (const object of objects) {
    Object.assign(properties, object.properties ?? {});
    for (const key of object.required ?? []) {
      required.add(String(key));
    }
    for (const key of object.optional ?? []) {
      optional.add(String(key));
    }
  }

  for (const key of optional) {
    required.delete(key);
  }

  return withSchemaFields({
    "~kind": "Object",
    type: "object",
    properties,
    ...(required.size > 0 ? { required: [...required] } : {}),
    ...(optional.size > 0 ? { optional: [...optional] } : {}),
  }) as TObject<Record<string, TSchema>, string, string>;
}

function hasKind(value: TSchema, kind: string): boolean {
  return (value as { "~kind"?: string })["~kind"] === kind;
}

export type ExpandRestItems<TItems extends TSchema[]> = TItems extends [
  infer Head extends TSchema,
  ...infer Tail extends TSchema[],
]
  ? Head extends TRest<infer Item extends TSchema>
    ? Item extends TTuple<infer RestItems>
      ? [...ExpandRestItems<RestItems>, ...ExpandRestItems<Tail>]
      : [Head, ...ExpandRestItems<Tail>]
    : [Head, ...ExpandRestItems<Tail>]
  : [];

export function ExpandTupleRest<TItems extends TSchema[]>(items: TItems): ExpandRestItems<TItems> {
  const expanded: TSchema[] = [];
  for (const item of items) {
    if (hasKind(item, "Rest")) {
      const rest = item as TRest<TSchema>;
      if (hasKind(rest.items, "Tuple")) {
        expanded.push(...(rest.items as TTuple<TSchema[]>).items);
        continue;
      }
    }
    expanded.push(item);
  }
  return expanded as ExpandRestItems<TItems>;
}

export function Rest<T extends TSchema>(item: T): TRest<T> {
  return withSchemaFields({ "~kind": "Rest", type: "rest", items: item }) as TRest<T>;
}

export function Composite<TObjects extends TObjectLike[]>(
  objects: [...TObjects],
): TObject<Record<string, TSchema>, string, string> {
  return composeObjectSchemas(objects);
}

export function Clone<T extends TSchema>(schema: T): T {
  return CloneValue(schema);
}

export function Capitalize<T extends TSchema>(item: T): TCapitalize<T> {
  return withSchemaFields({ "~kind": "Capitalize", item }) as TCapitalize<T>;
}

export function Lowercase<T extends TSchema>(item: T): TLowercase<T> {
  return withSchemaFields({ "~kind": "Lowercase", item }) as TLowercase<T>;
}

export function Uppercase<T extends TSchema>(item: T): TUppercase<T> {
  return withSchemaFields({ "~kind": "Uppercase", item }) as TUppercase<T>;
}

export function Uncapitalize<T extends TSchema>(item: T): TUncapitalize<T> {
  return withSchemaFields({ "~kind": "Uncapitalize", item }) as TUncapitalize<T>;
}

type InterfaceProperties<
  Heritage extends TObject[],
  Properties extends Record<string, TSchema>,
> = Properties &
  UnionToIntersection<
    Heritage[number] extends TObject<infer InheritedProperties, infer _Required, infer _Optional>
      ? InheritedProperties
      : Record<string, never>
  >;

export type TInterface<
  Heritage extends TObject[] = TObject[],
  Properties extends Record<string, TSchema> = Record<string, TSchema>,
> = TObject<InterfaceProperties<Heritage, Properties>>;

export function Interface<Heritage extends TObject[], Properties extends Record<string, TSchema>>(
  heritage: [...Heritage],
  properties: Properties,
  options?: Record<string, unknown>,
): TInterface<Heritage, Properties> {
  const own = createObjectSchema(properties);
  const objectSchemas: TObjectLike[] = [];
  for (const objectSchema of heritage) {
    objectSchemas.push(objectSchema);
  }
  objectSchemas.push(own);
  return withSchemaFields({
    ...composeObjectSchemas(objectSchemas),
    ...options,
  }) as TInterface<Heritage, Properties>;
}

export type TNonNullable<Type extends TSchema> = TExclude<Type, TUnion<[TNull, TUndefined]>>;

export function NonNullable<Type extends TSchema>(
  type: Type,
  options?: Record<string, unknown>,
): TNonNullable<Type> {
  return withSchemaFields({
    "~kind": "Exclude",
    left: type,
    right: withSchemaFields({
      "~kind": "Union",
      variants: [Null(), Undefined()],
      anyOf: [Null(), Undefined()],
    }),
    ...options,
  }) as TNonNullable<Type>;
}

export type TOptions<Type extends TSchema, SchemaOptions extends Record<string, unknown>> = Type &
  SchemaOptions;

export function Options<Type extends TSchema, SchemaOptions extends Record<string, unknown>>(
  type: Type,
  options: SchemaOptions,
): TOptions<Type, SchemaOptions> {
  return {
    ...type,
    ...options,
  } as TOptions<Type, SchemaOptions>;
}

export type TReadonlyType<Type extends TSchema> = TReadonly<Type>;

export function ReadonlyType<Type extends TSchema>(
  type: Type,
  options?: Record<string, unknown>,
): TReadonlyType<Type> {
  return withSchemaFields({ "~kind": "Readonly", item: type, ...options }) as TReadonlyType<Type>;
}

export interface TIdentifier<Name extends string = string> extends TSchema {
  "~kind": "Identifier";
  type: "identifier";
  name: Name;
}

export function Identifier<Name extends string>(name: Name): TIdentifier<Name> {
  return withSchemaFields({
    "~kind": "Identifier",
    type: "identifier",
    name,
  }) as TIdentifier<Name>;
}

export interface TParameter<
  Name extends string = string,
  Extends extends TSchema = TSchema,
  Equals extends TSchema = Extends,
> extends TSchema {
  "~kind": "Parameter";
  name: Name;
  extends: Extends;
  equals: Equals;
}

export function Parameter<Name extends string, Extends extends TSchema, Equals extends TSchema>(
  name: Name,
  extends_: Extends,
  equals: Equals,
): TParameter<Name, Extends, Equals>;
export function Parameter<Name extends string, Extends extends TSchema>(
  name: Name,
  extends_: Extends,
): TParameter<Name, Extends, Extends>;
export function Parameter<Name extends string>(name: Name): TParameter<Name>;
export function Parameter(name: string, extends_?: TSchema, equals?: TSchema): TParameter {
  const constraint = extends_ ?? Unknown();
  const fallback = equals ?? constraint;
  return withSchemaFields({
    "~kind": "Parameter",
    name,
    extends: constraint,
    equals: fallback,
  }) as TParameter;
}

export interface TThis extends TSchema {
  "~kind": "This";
  $ref: "#";
}

export function This(options?: Partial<Omit<TThis, "'~kind' | '$ref'">>): TThis {
  return withSchemaFields({
    "~kind": "This",
    $ref: "#",
    ...options,
  }) as TThis;
}

export function Import<
  TModule extends { definitions: Record<string, TSchema> },
  TName extends Extract<keyof TModule["definitions"], string>,
>(module: TModule, name: TName): TModule["definitions"][TName] {
  const definition = module.definitions[name];
  if (definition === undefined) {
    throw new Error(`Unknown module definition: ${name}`);
  }
  return definition as TModule["definitions"][TName];
}
