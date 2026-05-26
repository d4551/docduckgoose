/**
 * Contract payload validation helpers.
 *
 * Provides schema-first validation utilities for contract payloads without
 * introducing compatibility-layer normalization.
 *
 * @shared/contracts/validation
 */

import { Errors } from "@baohaus/baobox/error/errors";
import type { TSchema } from "@baohaus/baobox/type/schema";
import { Check } from "@baohaus/baobox/value/check";

/**
 * Contract payload validation result.
 */
export interface PayloadValidationResult {
  /** Whether payload satisfies the schema. */
  valid: boolean;
  /** Validation errors when invalid. */
  errors: string[];
}

/**
 * Validate a payload against a TypeBox schema.
 *
 * @param schema - TypeBox schema.
 * @param payload - Unknown payload to validate.
 * @returns Validation result with normalized error messages.
 */
export function validatePayload<T extends TSchema>(
  schema: T,
  payload: unknown,
): PayloadValidationResult {
  const valid = Check(schema, payload);
  if (valid) {
    return { valid: true, errors: [] };
  }

  return {
    valid: false,
    errors: [...Errors(schema, payload)].map((entry) => `${entry.path}: ${entry.message}`),
  };
}
