import { deriveIndexSchemasForEmission, deriveObjectSchema } from "../shared/object-utils.js";
import type { TSchema } from "../type/base-types.js";
import type { TObject } from "../type/containers-types.js";
import type { TExclude, TExtract } from "../type/narrow-types.js";
import type {
  TConditional,
  TIfThenElse,
  TIndex,
  TKeyOf,
  TMapped,
  TNot,
  TOmit,
  TPartial,
  TPick,
  TRequired,
} from "../type/transform-types.js";
import type { JsonSchema, JsonSchemaOptions } from "./emitter.js";
import { objectLikeSchema } from "./emitter-base.js";
import type { ApplyOptions, EmitJsonSchema } from "./emitter-types.js";

export function emitDerivedSchema(
  kind: string | undefined,
  schema: TSchema,
  refs: Map<string, TSchema>,
  options: JsonSchemaOptions,
  opt: ApplyOptions,
  emit: EmitJsonSchema,
): JsonSchema | undefined {
  switch (kind) {
    case "Exclude": {
      const excluded = schema as TExclude<TSchema, TSchema>;
      return opt({
        allOf: [emit(excluded.left, refs, options), { not: emit(excluded.right, refs, options) }],
      });
    }
    case "Extract": {
      const extracted = schema as TExtract<TSchema, TSchema>;
      return opt({
        allOf: [emit(extracted.left, refs, options), emit(extracted.right, refs, options)],
      });
    }
    case "Partial": {
      const partial = schema as TPartial<TObject>;
      const derived = deriveObjectSchema(partial.object, { requiredMode: "none" });
      return opt(objectLikeSchema(derived, refs, options, emit));
    }
    case "Required": {
      const required = schema as TRequired<TObject>;
      const derived = deriveObjectSchema(required.object, { requiredMode: "all" });
      return opt(objectLikeSchema(derived, refs, options, emit));
    }
    case "Pick": {
      const picked = schema as TPick<TObject, keyof TObject["properties"]>;
      const derived = deriveObjectSchema(picked.object, {
        pickKeys: picked.keys.map(String),
        additionalProperties: false,
      });
      return opt(objectLikeSchema(derived, refs, options, emit));
    }
    case "Omit": {
      const omitted = schema as TOmit<TObject, keyof TObject["properties"]>;
      const derived = deriveObjectSchema(omitted.object, {
        omitKeys: omitted.keys.map(String),
        additionalProperties: false,
      });
      return opt(objectLikeSchema(derived, refs, options, emit));
    }
    case "KeyOf":
      return opt({
        type: "string",
        enum: Object.keys((schema as TKeyOf<TObject>).object.properties),
      });
    case "Not":
      return opt({ not: emit((schema as TNot<TSchema>).schema, refs, options) });
    case "IfThenElse": {
      const conditional = schema as TIfThenElse<TSchema, TSchema, TSchema>;
      const result = opt({
        if: emit(conditional.if, refs, options),
        ...(conditional.else ? { else: emit(conditional.else, refs, options) } : {}),
      });
      Reflect.set(result, "then", emit(conditional.then, refs, options));
      return result;
    }
    case "Conditional": {
      const conditional = schema as TConditional<TSchema, TSchema[]>;
      const elseBranch = conditional.default ? emit(conditional.default, refs, options) : undefined;
      const result = opt({
        if: emit(conditional.check, refs, options),
        ...(elseBranch !== undefined && Object.keys(elseBranch).length > 0
          ? { else: elseBranch }
          : {}),
      });
      Reflect.set(
        result,
        "then",
        conditional.union.length > 0
          ? { anyOf: conditional.union.map((entry) => emit(entry, refs, options)) }
          : {},
      );
      return result;
    }
    case "Index": {
      const index = schema as TIndex<TObject, TSchema>;
      const candidates = deriveIndexSchemasForEmission(index.object, index.key);
      if (candidates.length === 0) {
        return opt({ not: {} });
      }
      if (candidates.length === 1 && candidates[0] !== undefined) {
        return emit(candidates[0], refs, options);
      }
      return opt({ anyOf: candidates.map((candidate) => emit(candidate, refs, options)) });
    }
    case "Mapped":
      return opt(objectLikeSchema((schema as TMapped<TObject>).object, refs, options, emit));
    default:
      return;
  }
}
