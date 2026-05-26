import { isPlainRecord } from "../shared/runtime-guards.js";
import {
  schemaKind,
  schemaProperties,
  schemaSchemaListField,
  schemaStringField,
  schemaUnknownField,
} from "../shared/schema-access.js";
import { OptionalKind } from "../shared/symbols.js";
import type { TSchema } from "../type/base-types.js";
import { IsOptional } from "../type/guards.js";
import { ResultDisjoint, ResultLeftInside, ResultRightInside } from "../type/root-constants.js";
import { Compare } from "../type/root-helpers.js";
import { Check } from "./check.js";

function deterministicCompare(left: TSchema, right: TSchema): number {
  return JSON.stringify(left).localeCompare(JSON.stringify(right));
}

function isOptionalSchema(schema: TSchema): boolean {
  return IsOptional(schema) || Reflect.has(schema, OptionalKind);
}

export function IsOptionalUndefined(
  property: TSchema,
  key: string,
  value: Record<string, unknown>,
): boolean {
  return isOptionalSchema(property) && value[key] === undefined;
}

export function UnionPrioritySort(types: TSchema[], order = 1): TSchema[] {
  return types.sort((left, right) => {
    const result = Compare(left, right);
    return (
      (result === ResultDisjoint
        ? deterministicCompare(left, right)
        : result === ResultRightInside
          ? 1
          : result === ResultLeftInside
            ? -1
            : deterministicCompare(left, right)) * order
    );
  });
}

function deref(context: Record<string, TSchema>, schema: TSchema): TSchema {
  if (schemaKind(schema) !== "Ref") {
    return schema;
  }

  const ref = schemaStringField(schema, "$ref") ?? schemaStringField(schema, "name");
  const target = ref === undefined ? undefined : context[ref];
  if (target === undefined) {
    throw new Error("Unable to Deref target");
  }
  return deref(context, target);
}

function scoreVariant(schema: TSchema, value: unknown): number {
  if (schemaKind(schema) !== "Object" || !isPlainRecord(value)) {
    return 0;
  }

  let result = 0;
  const keys = Object.keys(value);
  for (const [key, property] of Object.entries(schemaProperties(schema))) {
    const entryValue = value[key];
    const literal =
      schemaKind(property) === "Literal" &&
      Object.is(schemaUnknownField(property, "const"), entryValue)
        ? 100
        : 0;
    const checks = Check(property, entryValue) ? 10 : 0;
    const exists = keys.includes(key) ? 1 : 0;
    result += literal + checks + exists;
  }
  return result;
}

export function UnionScoreSelect(
  context: Record<string, TSchema>,
  type: TSchema,
  value: unknown,
): TSchema {
  const schemas = schemaSchemaListField(type, "variants").map((schema) => deref(context, schema));
  const first = schemas[0];
  if (first === undefined) {
    throw new Error("UnionScoreSelect expected a union with at least one variant");
  }

  let select = first;
  let best = 0;
  for (const schema of schemas) {
    const score = scoreVariant(schema, value);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
}
