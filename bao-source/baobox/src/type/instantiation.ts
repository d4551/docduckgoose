import { isRecord } from "../shared/runtime-guards.js";
import type { TParameter } from "./actions.js";
import type { TSchema } from "./base-types.js";
import type { TObject } from "./containers-types.js";
import { withSchemaFields } from "./root-shared.js";

export type TProperties = Record<string, TSchema>;

export interface TState {
  callstack: string[];
}

export type TInstantiate = TSchema;

function getString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function getField(schema: TSchema, field: string): unknown {
  return Reflect.get(schema, field);
}

function getSchema(value: unknown): TSchema | undefined {
  if (!isRecord(value) || typeof value["~kind"] !== "string") {
    return;
  }

  return withSchemaFields({ ...value, "~kind": value["~kind"] }) as TSchema;
}

function isParameter(value: unknown): value is TParameter {
  return (
    isRecord(value) &&
    value["~kind"] === "Parameter" &&
    typeof value.name === "string" &&
    getSchema(value.extends) !== undefined &&
    getSchema(value.equals) !== undefined
  );
}

function getSchemaArray(value: unknown): TSchema[] {
  return Array.isArray(value)
    ? value.flatMap((entry) => {
        const schema = getSchema(entry);
        return schema ? [schema] : [];
      })
    : [];
}

function getParameterSchema(schema: TSchema): { name: string; equals: TSchema } {
  return {
    name: getString(getField(schema, "name")) ?? "",
    equals: getSchema(getField(schema, "equals")) ?? schema,
  };
}

function getInferSchema(schema: TSchema): { name: string; extends: TSchema } {
  return {
    name: getString(getField(schema, "name")) ?? "",
    extends: getSchema(getField(schema, "extends")) ?? schema,
  };
}

function getGenericSchema(schema: TSchema): { parameters: TParameter[]; expression: TSchema } {
  const parametersSource = getField(schema, "parameters");
  const parameters = Array.isArray(parametersSource)
    ? parametersSource.flatMap((entry) => {
        const parameter = isParameter(entry) ? entry : undefined;
        return parameter ? [parameter] : [];
      })
    : [];
  return {
    parameters,
    expression: getSchema(getField(schema, "expression")) ?? schema,
  };
}

function getCallSchema(schema: TSchema): { target: TSchema; arguments: TSchema[] } {
  return {
    target: getSchema(getField(schema, "target")) ?? schema,
    arguments: getSchemaArray(getField(schema, "arguments")),
  };
}

function getCyclicSchema(schema: TSchema): { $defs: Record<string, TSchema>; $ref: string } {
  const defsSource = getField(schema, "$defs");
  const defs = isRecord(defsSource)
    ? Object.entries(defsSource).reduce<Record<string, TSchema>>((result, [key, entry]) => {
        const nextSchema = getSchema(entry);
        if (nextSchema !== undefined) {
          result[key] = nextSchema;
        }
        return result;
      }, {})
    : {};
  return {
    $defs: defs,
    $ref: getString(getField(schema, "$ref")) ?? "",
  };
}

export function bindParameterContext(
  parameters: readonly TParameter[],
  arguments_: readonly TSchema[],
): TProperties {
  const context: TProperties = {};
  for (const [index, parameter] of parameters.entries()) {
    const name = parameter.name;
    const argument = arguments_[index] ?? parameter.equals;
    context[name] = argument;
  }
  return context;
}

function getObjectSchema(schema: TSchema): TObject<Record<string, TSchema>, string, string> {
  const propertiesSource = getField(schema, "properties");
  const patternPropertiesSource = getField(schema, "patternProperties");
  const requiredSource = getField(schema, "required");
  const optionalSource = getField(schema, "optional");

  return withSchemaFields({
    ...schema,
    "~kind": "Object" as const,
    properties: isRecord(propertiesSource)
      ? Object.entries(propertiesSource).reduce<Record<string, TSchema>>((result, [key, entry]) => {
          const nextSchema = getSchema(entry);
          if (nextSchema !== undefined) {
            result[key] = nextSchema;
          }
          return result;
        }, {})
      : {},
    ...(isRecord(patternPropertiesSource)
      ? {
          patternProperties: Object.entries(patternPropertiesSource).reduce<
            Record<string, TSchema>
          >((result, [key, entry]) => {
            const nextSchema = getSchema(entry);
            if (nextSchema !== undefined) {
              result[key] = nextSchema;
            }
            return result;
          }, {}),
        }
      : {}),
    ...(Array.isArray(requiredSource)
      ? { required: requiredSource.filter((entry): entry is string => typeof entry === "string") }
      : {}),
    ...(Array.isArray(optionalSource)
      ? { optional: optionalSource.filter((entry): entry is string => typeof entry === "string") }
      : {}),
  }) as TObject<Record<string, TSchema>, string, string>;
}

function instantiateObject(
  context: TProperties,
  schema: TSchema,
): TObject<Record<string, TSchema>, string, string> {
  const objectSchema = getObjectSchema(schema);
  const properties = Object.fromEntries(
    Object.entries(objectSchema.properties).map(([key, value]) => [
      key,
      Instantiate(context, value),
    ]),
  ) as Record<string, TSchema>;
  const patternProperties =
    objectSchema.patternProperties === undefined
      ? undefined
      : Object.fromEntries(
          Object.entries(objectSchema.patternProperties).map(([key, value]) => [
            key,
            Instantiate(context, value),
          ]),
        );
  const additionalProperties = getSchema(objectSchema.additionalProperties);
  return {
    ...objectSchema,
    properties,
    ...(patternProperties === undefined ? {} : { patternProperties }),
    ...(additionalProperties === undefined
      ? {}
      : { additionalProperties: Instantiate(context, additionalProperties) }),
  };
}

function instantiateField(context: TProperties, schema: TSchema, field: string): TSchema {
  return Instantiate(context, getSchema(getField(schema, field)) ?? schema);
}

function instantiateSchemaFields(
  context: TProperties,
  schema: TSchema,
  fields: readonly string[],
): TSchema {
  return {
    ...schema,
    ...Object.fromEntries(fields.map((field) => [field, instantiateField(context, schema, field)])),
  };
}

function instantiateSchemaArrayField(
  context: TProperties,
  schema: TSchema,
  field: string,
): TSchema[] {
  return getSchemaArray(getField(schema, field)).map((item) => Instantiate(context, item));
}

function instantiateParameter(context: TProperties, schema: TSchema): TSchema {
  const parameter = getParameterSchema(schema);
  return context[parameter.name] ?? parameter.equals;
}

function instantiateInfer(context: TProperties, schema: TSchema): TSchema {
  const infer = getInferSchema(schema);
  return context[infer.name] ?? infer.extends;
}

function instantiateRef(context: TProperties, schema: TSchema): TSchema {
  const name = getField(schema, "name");
  return typeof name === "string" && context[name] !== undefined ? context[name] : schema;
}

function instantiateVariants(context: TProperties, schema: TSchema): TSchema {
  return {
    ...schema,
    variants: instantiateSchemaArrayField(context, schema, "variants"),
  };
}

function instantiateItem(context: TProperties, schema: TSchema): TSchema {
  return instantiateSchemaFields(context, schema, ["item"]);
}

function instantiateInner(context: TProperties, schema: TSchema): TSchema {
  return instantiateSchemaFields(context, schema, ["inner"]);
}

function instantiatePair(
  context: TProperties,
  schema: TSchema,
  leftField: string,
  rightField: string,
): TSchema {
  return instantiateSchemaFields(context, schema, [leftField, rightField]);
}

function instantiateConditional(context: TProperties, schema: TSchema): TSchema {
  const defaultValue = getField(schema, "default");
  return {
    ...instantiateSchemaFields(context, schema, ["check"]),
    union: instantiateSchemaArrayField(context, schema, "union"),
    ...(defaultValue === undefined
      ? {}
      : { default: Instantiate(context, getSchema(defaultValue) ?? schema) }),
  };
}

function instantiateCallable(context: TProperties, schema: TSchema): TSchema {
  return {
    ...schema,
    parameters: instantiateSchemaArrayField(context, schema, "parameters"),
    returns: instantiateField(context, schema, "returns"),
  };
}

function instantiateItemAndItems(context: TProperties, schema: TSchema): TSchema {
  return {
    ...schema,
    item: instantiateField(context, schema, "item"),
    items: Instantiate(
      context,
      getSchema(getField(schema, "items")) ?? getSchema(getField(schema, "item")) ?? schema,
    ),
  };
}

function instantiateGeneric(context: TProperties, schema: TSchema): TSchema {
  const generic = getGenericSchema(schema);
  return withSchemaFields({
    ...schema,
    "~kind": "Generic",
    parameters: generic.parameters,
    expression: Instantiate(context, generic.expression),
  });
}

function instantiateCall(context: TProperties, schema: TSchema): TSchema {
  const call = getCallSchema(schema);
  const target = Instantiate(context, call.target);
  const arguments_ = call.arguments.map((item) => Instantiate(context, item));
  if (target["~kind"] === "Generic") {
    const generic = getGenericSchema(target);
    const nextContext = bindParameterContext(generic.parameters, arguments_);
    return Instantiate({ ...context, ...nextContext }, generic.expression);
  }
  return withSchemaFields({
    "~kind": "Call",
    target,
    arguments: arguments_,
  });
}

function instantiateCyclic(context: TProperties, schema: TSchema): TSchema {
  const cyclic = getCyclicSchema(schema);
  const defs = Object.fromEntries(
    Object.entries(cyclic.$defs).map(([key, value]) => [key, Instantiate(context, value)]),
  ) as Record<string, TSchema>;
  return withSchemaFields({
    ...schema,
    "~kind": "Cyclic",
    $defs: defs,
    $ref: cyclic.$ref,
  });
}

const instantiateHandlers: Record<string, (context: TProperties, schema: TSchema) => TSchema> = {
  Parameter: instantiateParameter,
  Infer: instantiateInfer,
  This: (_context, schema) => schema,
  Ref: instantiateRef,
  Array: (context, schema) => instantiateSchemaFields(context, schema, ["items"]),
  Object: instantiateObject,
  Tuple: (context, schema) => ({
    ...schema,
    items: instantiateSchemaArrayField(context, schema, "items"),
  }),
  Record: (context, schema) => instantiatePair(context, schema, "key", "value"),
  Union: instantiateVariants,
  Intersect: instantiateVariants,
  Optional: instantiateItem,
  Readonly: instantiateItem,
  Capitalize: instantiateItem,
  Lowercase: instantiateItem,
  Uppercase: instantiateItem,
  Uncapitalize: instantiateItem,
  Awaited: instantiateItem,
  Immutable: instantiateItem,
  Refine: instantiateItem,
  Codec: instantiateInner,
  Exclude: (context, schema) => instantiatePair(context, schema, "left", "right"),
  Extract: (context, schema) => instantiatePair(context, schema, "left", "right"),
  Not: (context, schema) => instantiateSchemaFields(context, schema, ["schema"]),
  IfThenElse: (context, schema) => instantiateSchemaFields(context, schema, ["if", "then", "else"]),
  Index: (context, schema) => instantiatePair(context, schema, "object", "key"),
  Mapped: (context, schema) => instantiateSchemaFields(context, schema, ["object"]),
  Conditional: instantiateConditional,
  Function: instantiateCallable,
  Constructor: instantiateCallable,
  Promise: instantiateItemAndItems,
  Iterator: instantiateItemAndItems,
  AsyncIterator: instantiateItemAndItems,
  Rest: instantiateItemAndItems,
  Decode: instantiateInner,
  Encode: instantiateInner,
  ReturnType: (context, schema) => instantiateSchemaFields(context, schema, ["function"]),
  Parameters: (context, schema) => instantiateSchemaFields(context, schema, ["function"]),
  InstanceType: (context, schema) => instantiateSchemaFields(context, schema, ["constructor"]),
  ConstructorParameters: (context, schema) =>
    instantiateSchemaFields(context, schema, ["constructor"]),
  Generic: instantiateGeneric,
  Call: instantiateCall,
  Cyclic: instantiateCyclic,
};

export function Instantiate(context: TProperties, schema: TSchema): TInstantiate {
  const kind = schema["~kind"];
  return typeof kind === "string" && instantiateHandlers[kind] !== undefined
    ? instantiateHandlers[kind](context, schema)
    : schema;
}
