import { resolveStringActionSchema } from "../../shared/object-utils.js";
import { type TypeValidatorEntry, typeRegistry } from "../../shared/registries.js";
import { schemaPath, schemaStringField } from "../../shared/schema-access.js";
import type { TSchema } from "../../type/base-types.js";
import type { TOptional, TRecursive } from "../../type/composite-types.js";
import type {
  TAwaited,
  TConstructor,
  TInstanceType,
  TReturnType,
} from "../../type/higher-order-types.js";
import { Instantiate } from "../../type/instantiation.js";
import type { TConditional } from "../../type/transform-types.js";
import { CheckInternal } from "../../value/check.js";
import { createSchemaIssue, type SchemaIssue } from "../messages.js";
import type { CollectSchemaIssues, ReferenceMap } from "./shared.js";

interface TExcludeSchema extends TSchema {
  "~kind": "Exclude";
  left: TSchema;
  right: TSchema;
}

interface TExtractSchema extends TSchema {
  "~kind": "Extract";
  left: TSchema;
  right: TSchema;
}

interface TNotSchema extends TSchema {
  "~kind": "Not";
  schema: TSchema;
}

interface TIfThenElseSchema extends TSchema {
  "~kind": "IfThenElse";
  if: TSchema;
  then: TSchema;
  else: TSchema;
}

interface TParameterSchema extends TSchema {
  "~kind": "Parameter";
  equals: TSchema;
}

interface TGenericSchema extends TSchema {
  "~kind": "Generic";
  expression: TSchema;
}

interface TInferSchema extends TSchema {
  "~kind": "Infer";
  extends: TSchema;
}

interface TRefinement {
  refine: (value: unknown) => boolean;
  message: string;
}

interface TRefineSchema extends TSchema {
  "~kind": "Refine";
  item: TSchema;
  "~refine": TRefinement[];
}

interface TCyclicSchema extends TSchema {
  "~kind": "Cyclic";
  $defs: Record<string, TSchema>;
  $ref: string;
}

interface TCodecSchema extends TSchema {
  "~kind": "Codec";
  inner: TSchema;
}

interface TDecodeSchema extends TSchema {
  "~kind": "Decode";
  inner: TSchema;
}

interface TEncodeSchema extends TSchema {
  "~kind": "Encode";
  inner: TSchema;
}

function unresolvedRefIssue(schema: TSchema, path: readonly string[]): SchemaIssue[] {
  return [createSchemaIssue(schemaPath(path), "UNRESOLVED_REF", {}, schema)];
}

// All `schema as TFoo` casts in the functions below are guarded by the enclosing
// switch case on `kind`. TypeScript cannot narrow a function parameter (`schema: TSchema`)
// based on the value of a different parameter (`kind: string`), so these casts are
// structurally required. Each cast targets an interface defined in this module or
// imported from the schema type system, all of which extend TSchema.

function collectDelegatedIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] | undefined {
  switch (kind) {
    case "Optional":
      return value === undefined
        ? []
        : collectSchemaIssues((schema as TOptional<TSchema>).item, value, path, refs);
    case "Readonly":
    case "Immutable":
      return collectSchemaIssues((schema as TOptional<TSchema>).item, value, path, refs);
    case "Codec":
      return collectSchemaIssues((schema as TCodecSchema).inner, value, path, refs);
    case "Decode":
      return collectSchemaIssues((schema as TDecodeSchema).inner, value, path, refs);
    case "Encode":
      return collectSchemaIssues((schema as TEncodeSchema).inner, value, path, refs);
    case "Awaited":
      return collectSchemaIssues((schema as TAwaited).promise.item, value, path, refs);
    case "ReturnType":
      return collectSchemaIssues((schema as TReturnType).function.returns, value, path, refs);
    case "InstanceType":
      return collectSchemaIssues(
        (schema as TInstanceType<TConstructor>).constructor.returns,
        value,
        path,
        refs,
      );
    case "Capitalize":
    case "Lowercase":
    case "Uppercase":
    case "Uncapitalize":
      return collectSchemaIssues(resolveStringActionSchema(schema), value, path, refs);
    case "Parameter":
      return collectSchemaIssues((schema as TParameterSchema).equals, value, path, refs);
    case "Generic":
      return collectSchemaIssues((schema as TGenericSchema).expression, value, path, refs);
    case "Infer":
      return collectSchemaIssues((schema as TInferSchema).extends, value, path, refs);
    default:
      return;
  }
}

function collectReferenceIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] | undefined {
  switch (kind) {
    case "Recursive": {
      const recursiveSchema = schema as TRecursive;
      const nextRefs = new Map(refs);
      nextRefs.set(recursiveSchema.name, recursiveSchema.schema);
      nextRefs.set("#", recursiveSchema.schema);
      return collectSchemaIssues(recursiveSchema.schema, value, path, nextRefs);
    }
    case "Ref": {
      const target = refs.get(schemaStringField(schema, "name") ?? "");
      return target === undefined
        ? unresolvedRefIssue(schema, path)
        : collectSchemaIssues(target, value, path, refs);
    }
    case "This": {
      const target = refs.get("#");
      return target === undefined
        ? unresolvedRefIssue(schema, path)
        : collectSchemaIssues(target, value, path, refs);
    }
    case "Call": {
      const instantiated = Instantiate({}, schema);
      return instantiated === schema
        ? [createSchemaIssue(schemaPath(path), "CALL", {}, schema)]
        : collectSchemaIssues(instantiated, value, path, refs);
    }
    case "Cyclic": {
      const cyclicSchema = schema as TCyclicSchema;
      const nextRefs = new Map(refs);
      for (const [name, definition] of Object.entries(cyclicSchema.$defs)) {
        nextRefs.set(name, definition);
      }
      const target = cyclicSchema.$defs[cyclicSchema.$ref];
      return target === undefined ? [] : collectSchemaIssues(target, value, path, nextRefs);
    }
    default:
      return;
  }
}

function collectBranchIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] | undefined {
  switch (kind) {
    case "Exclude":
      return collectExcludeIssues(schema as TExcludeSchema, value, path, refs, collectSchemaIssues);
    case "Extract":
      return collectExtractIssues(schema as TExtractSchema, value, path, refs, collectSchemaIssues);
    case "Not":
      return collectNotIssues(schema as TNotSchema, value, path, refs);
    case "IfThenElse":
      return collectIfThenElseIssues(
        schema as TIfThenElseSchema,
        value,
        path,
        refs,
        collectSchemaIssues,
      );
    case "Conditional":
      return collectConditionalIssues(
        schema as TConditional<TSchema, TSchema[]>,
        value,
        path,
        refs,
        collectSchemaIssues,
      );
    case "Refine":
      return collectRefineIssues(schema as TRefineSchema, value, path, refs, collectSchemaIssues);
    default:
      return;
  }
}

function collectExcludeIssues(
  schema: TExcludeSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  if (!CheckInternal(schema.left, value, refs)) {
    return collectSchemaIssues(schema.left, value, path, refs);
  }
  return CheckInternal(schema.right, value, refs)
    ? [createSchemaIssue(schemaPath(path), "EXCLUDE", {}, schema)]
    : [];
}

function collectExtractIssues(
  schema: TExtractSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  if (!CheckInternal(schema.left, value, refs)) {
    return collectSchemaIssues(schema.left, value, path, refs);
  }
  return CheckInternal(schema.right, value, refs)
    ? []
    : [createSchemaIssue(schemaPath(path), "EXTRACT", {}, schema)];
}

function collectNotIssues(
  schema: TNotSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
): SchemaIssue[] {
  return CheckInternal(schema.schema, value, refs)
    ? [createSchemaIssue(schemaPath(path), "NOT", {}, schema)]
    : [];
}

function collectIfThenElseIssues(
  schema: TIfThenElseSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const branch = CheckInternal(schema.if, value, refs) ? schema.then : schema.else;
  return collectSchemaIssues(branch, value, path, refs);
}

function collectConditionalIssues(
  schema: TConditional<TSchema, TSchema[]>,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  if (!CheckInternal(schema.check, value, refs)) {
    return schema.default === undefined
      ? []
      : collectSchemaIssues(schema.default, value, path, refs);
  }

  const variantIssues = schema.union.map((entry) => collectSchemaIssues(entry, value, path, refs));
  return variantIssues.some((entry) => entry.length === 0)
    ? []
    : [createSchemaIssue(schemaPath(path), "CONDITIONAL", {}, schema)];
}

function collectRefineIssues(
  schema: TRefineSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const nestedIssues = collectSchemaIssues(schema.item, value, path, refs);
  if (nestedIssues.length > 0) {
    return nestedIssues;
  }
  return schema["~refine"].flatMap((refinement) =>
    refinement.refine(value)
      ? []
      : [
          createSchemaIssue(
            schemaPath(path),
            "REFINE",
            { customMessage: refinement.message },
            schema,
          ),
        ],
  );
}

export function collectAdvancedIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  return (
    collectDelegatedIssues(kind, schema, value, path, refs, collectSchemaIssues) ??
    collectReferenceIssues(kind, schema, value, path, refs, collectSchemaIssues) ??
    collectBranchIssues(kind, schema, value, path, refs, collectSchemaIssues) ??
    (() => {
      const entry: TypeValidatorEntry | undefined = typeRegistry.get(kind ?? "");
      if (entry === undefined) {
        return [];
      }
      const valid = typeof entry === "function" ? entry(schema, value) : entry.check(schema, value);
      return !valid
        ? [createSchemaIssue(schemaPath(path), "CUSTOM_TYPE", { kind: kind ?? "" }, schema)]
        : [];
    })()
  );
}
