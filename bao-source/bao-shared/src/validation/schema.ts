/**
 * Baobox Schema Validation.
 *
 * Provides runtime validation using baobox schemas with detailed error reporting.
 * This module handles:
 *
 * - Schema-first validation for baobox schemas
 * - Detailed error reporting with field paths and error codes
 * - TryParse-based validation (single pass, no double-evaluation)
 * - Warning collection for non-critical validation issues
 *
 * @shared/validation/schema
 *
 * @example
 * ```typescript
 * import { TypeExports as Type } from '@baohaus/baobox/elysia';
 *
 * const UserSchema = Type.Object({
 *   name: Type.String(),
 *   email: Type.String({ format: 'email' }),
 *   age: Type.Number({ minimum: 0 })
 * });
 *
 * const result = await validateSchema(userData, UserSchema);
 * if (result.valid) {
 *   // result.data is normalized
 * } else {
 *   // result.errors contains field-level errors
 * }
 * ```
 */

import type { TSchema } from "@baohaus/baobox/elysia";
import { Check, Errors, TryParse } from "@baohaus/baobox/value";

/**
 * Validate data against a baobox schema.
 *
 * Uses baobox's TryParse for single-pass validation with normalization.
 * Returns detailed error information including field paths and error codes.
 *
 * T - The expected type of the validated data
 * @param data - The data to validate
 * @param schema - Baobox schema to validate against
 * @returns Validation result with errors and warnings
 */
export function validateSchema<T = unknown>(
  data: unknown,
  schema: TSchema,
): Promise<{
  /** Whether validation passed */
  valid: boolean;
  /** Array of validation errors with field paths and messages */
  errors: Array<{ field: string; message: string; code: string; path?: string }>;
  /** Array of validation warnings (currently unused) */
  warnings: Array<{ field?: string; message: string; suggestion?: string }>;
  /** Validated data (only present if valid) */
  data?: T;
}> {
  const result = TryParse(schema, data);
  if (result.success) {
    return Promise.resolve({
      valid: true,
      errors: [],
      warnings: [],
      data: result.value as T,
    });
  }

  const errors = result.errors.map((issue) => ({
    field: issue.path?.split("/").filter(Boolean).join(".") || "",
    message: issue.message,
    code: issue.code || "VALIDATION_ERROR",
    path: issue.path,
  }));

  return Promise.resolve({ valid: false, errors, warnings: [] });
}

/**
 * Format baobox validation errors into a compact string list.
 *
 * @param schema - Baobox schema to validate against.
 * @param data - Candidate data for validation.
 * @param context - Optional label to prefix each error.
 * @returns Array of formatted validation error messages.
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
