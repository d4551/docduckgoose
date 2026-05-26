import { schemaPath } from "../../shared/schema-access.js";
import type { TSchema } from "../../type/base-types.js";
import type {
  TConstructor,
  TConstructorParameters,
  TFunction,
  TParameters,
} from "../../type/higher-order-types.js";
import type { TRest } from "../../type/string-action-types.js";
import { createSchemaIssue, type SchemaIssue } from "../messages.js";
import { appendPath, type CollectSchemaIssues, type ReferenceMap } from "./shared.js";

function collectTupleParameterIssues(
  parameters: readonly TSchema[],
  rootSchema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] {
  const currentPath = schemaPath(path);

  if (!Array.isArray(value)) {
    return [createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "array" }, rootSchema)];
  }

  const issues: SchemaIssue[] = [];
  if (value.length !== parameters.length) {
    issues.push(
      createSchemaIssue(currentPath, "PARAMETERS_LENGTH", { count: parameters.length }, rootSchema),
    );
  }
  value.forEach((item, index) => {
    const parameter = parameters[index];
    if (parameter !== undefined) {
      issues.push(...collectSchemaIssues(parameter, item, appendPath(path, String(index)), refs));
    }
  });
  return issues;
}

export function collectParameterCollectionIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
  collectSchemaIssues: CollectSchemaIssues,
): SchemaIssue[] | undefined {
  switch (kind) {
    case "Rest": {
      const currentPath = schemaPath(path);
      if (!Array.isArray(value)) {
        return [createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "array" }, schema)];
      }

      // Safe: kind === 'Rest' verified by switch; TS cannot narrow TSchema to TRest
      // from a string discriminant on a separate parameter.
      const restSchema = schema as TRest;
      const issues: SchemaIssue[] = [];
      value.forEach((item, index) => {
        issues.push(
          ...collectSchemaIssues(restSchema.items, item, appendPath(path, String(index)), refs),
        );
      });
      return issues;
    }
    case "Parameters":
      // Safe: kind === 'Parameters' verified by switch case
      return collectTupleParameterIssues(
        (schema as TParameters<TFunction>).function.parameters,
        schema,
        value,
        path,
        refs,
        collectSchemaIssues,
      );
    case "ConstructorParameters":
      // Safe: kind === 'ConstructorParameters' verified by switch case
      return collectTupleParameterIssues(
        (schema as TConstructorParameters<TConstructor>).constructor.parameters,
        schema,
        value,
        path,
        refs,
        collectSchemaIssues,
      );
    default:
      return;
  }
}
