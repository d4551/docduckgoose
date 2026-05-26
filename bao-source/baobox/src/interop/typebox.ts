import type {
  Static as ElysiaStatic,
  StaticDecode as ElysiaStaticDecode,
  StaticEncode as ElysiaStaticEncode,
  TSchema as ElysiaTypeBoxSchema,
} from "@sinclair/typebox";
import type {
  TSchema as TypeBoxV1Schema,
  Static as TypeBoxV1Static,
  StaticDecode as TypeBoxV1StaticDecode,
  StaticEncode as TypeBoxV1StaticEncode,
} from "typebox";
import type { TSchema } from "../type/base-types.js";

export type ExternalTypeBoxSchema = TypeBoxV1Schema | ElysiaTypeBoxSchema;
export type IngestedTypeBoxSchema = ExternalTypeBoxSchema & TSchema;

function hasJsonSchemaShape(value: object): boolean {
  return (
    typeof Reflect.get(value, "type") === "string" ||
    typeof Reflect.get(value, "$ref") === "string" ||
    Reflect.has(value, "const") ||
    Array.isArray(Reflect.get(value, "enum")) ||
    Array.isArray(Reflect.get(value, "anyOf")) ||
    Array.isArray(Reflect.get(value, "oneOf")) ||
    Array.isArray(Reflect.get(value, "allOf")) ||
    typeof Reflect.get(value, "properties") === "object" ||
    typeof Reflect.get(value, "patternProperties") === "object" ||
    typeof Reflect.get(value, "$defs") === "object"
  );
}

export function isTypeBoxSchema(value: unknown): value is ExternalTypeBoxSchema {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const kindSymbol = Symbol.for("TypeBox.Kind");
  return Object.getOwnPropertySymbols(value).includes(kindSymbol) || hasJsonSchemaShape(value);
}

export function isIngestedTypeBoxSchema(value: unknown): value is IngestedTypeBoxSchema {
  return isTypeBoxSchema(value);
}

export type {
  ElysiaStatic,
  ElysiaStaticDecode,
  ElysiaStaticEncode,
  ElysiaTypeBoxSchema,
  TypeBoxV1Schema,
  TypeBoxV1Static,
  TypeBoxV1StaticDecode,
  TypeBoxV1StaticEncode,
};
