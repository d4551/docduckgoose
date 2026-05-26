import type { TSchema } from "../type/base-types.js";
import type { JsonSchema, JsonSchemaOptions } from "./emitter.js";

export type EmitJsonSchema = (
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
) => JsonSchema;

export type ApplyOptions = (obj: JsonSchema, extra?: JsonSchema) => JsonSchema;
