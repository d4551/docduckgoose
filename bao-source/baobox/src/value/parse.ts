import type { ParseFailure, ParseResult, ParseSuccess, SchemaError } from "../error/errors.js";
import { Errors } from "../error/errors.js";
import type { ExternalTypeBoxSchema } from "../interop/typebox.js";
import { isIngestedTypeBoxSchema } from "../interop/typebox.js";
import type { RuntimeContext } from "../shared/runtime-context.js";
import type { TSchema } from "../type/base-types.js";
import type { StaticParse } from "../type/static-types.js";
import { Check } from "./check.js";
import { CleanValue } from "./clean.js";
import { Clone } from "./clone.js";
import { ConvertValue } from "./convert.js";
import { DefaultValue } from "./default.js";

/** Error thrown when Value.Parse fails validation */
export class ParseError extends Error {
  public readonly errors: SchemaError[];
  constructor(errors: SchemaError[]) {
    super(`Parse failed with ${errors.length} error(s)`);
    this.name = "ParseError";
    this.errors = errors;
  }
}

type ParseSchema = TSchema | ExternalTypeBoxSchema;
type RuntimeSchema<T extends ParseSchema> = T & TSchema;

function isRuntimeSchema<T extends ParseSchema>(schema: T): schema is RuntimeSchema<T> {
  return (
    typeof schema === "object" &&
    schema !== null &&
    ("~kind" in schema || isIngestedTypeBoxSchema(schema))
  );
}

export function TryParseValue(
  schema: ParseSchema,
  value: unknown,
  context?: RuntimeContext,
): ParseResult<unknown> {
  if (!isRuntimeSchema(schema)) {
    return {
      success: false,
      errors: [],
    };
  }
  const runtimeSchema = schema as TSchema;
  let result = Clone(value);
  result = DefaultValue(runtimeSchema, result);
  result = ConvertValue(runtimeSchema, result);
  result = CleanValue(runtimeSchema, result);
  if (!Check(runtimeSchema, result, context)) {
    return {
      success: false,
      errors: Errors(runtimeSchema, result, context),
    };
  }
  return {
    success: true,
    value: result,
  };
}

export function TryParse<T extends ParseSchema>(
  schema: T,
  value: unknown,
  context?: RuntimeContext,
): ParseResult<StaticParse<T>> {
  return TryParseValue(schema, value, context) as ParseResult<StaticParse<T>>;
}

/** Full validation pipeline: Clone → Default → Convert → Clean → Check */
export function Parse<T extends ParseSchema>(
  schema: T,
  value: unknown,
  context?: RuntimeContext,
): StaticParse<T> {
  const result = TryParseValue(schema, value, context);
  if (!result.success) {
    throw new ParseError(result.errors);
  }
  return result.value as StaticParse<T>;
}

export type { ParseFailure, ParseResult, ParseSuccess };
