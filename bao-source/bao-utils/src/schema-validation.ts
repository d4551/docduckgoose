/**
 * Shared baobox schema validation helpers.
 *
 * Utility-level validation belongs in `@baohaus/bao-utils`, not runtime
 * orchestration packages. This keeps package validation available without
 * pulling `@baohaus/bao-core` into the release graph.
 */

import type { TSchema } from "@baohaus/baobox/elysia";
import { Check, Errors, TryParse } from "@baohaus/baobox/value";

export interface SchemaValidationError {
  field: string;
  message: string;
  code: string;
  path?: string;
}

export interface SchemaValidationWarning {
  field?: string;
  message: string;
  suggestion?: string;
}

export interface SchemaValidationResult<T> {
  valid: boolean;
  errors: SchemaValidationError[];
  warnings: SchemaValidationWarning[];
  data?: T;
}

/**
 * Validate data against a baobox schema with normalized issue metadata.
 *
 * @param data - Candidate payload.
 * @param schema - Canonical schema.
 * @returns Validation result with normalized errors.
 */
export function validateSchema<T = unknown>(
  data: unknown,
  schema: TSchema,
): Promise<SchemaValidationResult<T>> {
  const result = TryParse(schema, data);
  if (result.success) {
    return Promise.resolve({ valid: true, errors: [], warnings: [], data: result.value as T });
  }

  return Promise.resolve({
    valid: false,
    errors: result.errors.map((issue) => ({
      field: issue.path?.split("/").filter(Boolean).join(".") || "",
      message: issue.message,
      code: issue.code || "VALIDATION_ERROR",
      path: issue.path,
    })),
    warnings: [],
  });
}

/**
 * Format validation issues into compact human-readable lines.
 *
 * @param schema - Canonical schema.
 * @param data - Candidate payload.
 * @param context - Optional error prefix.
 * @returns Ordered formatted validation errors.
 */
export function formatSchemaErrors(schema: TSchema, data: unknown, context?: string): string[] {
  if (Check(schema, data)) {
    return [];
  }

  return [...Errors(schema, data)].map((issue) => {
    const field = issue.path?.split("/").filter(Boolean).join(".") || "<root>";
    const prefix = context ? `${context}: ` : "";
    return `${prefix}${field} ${issue.message}`.trim();
  });
}
