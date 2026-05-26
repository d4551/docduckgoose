/**
 * Unified Validation System (Non-API)
 *
 * Runtime validation at the API boundary is handled by Elysia route schemas (`t.*`).
 * This module provides a lightweight orchestrator for non-API validations:
 * - UI component validation
 * - Integration/config validation
 * - Ad-hoc baobox schema checks
 */

import type {
  ValidationError,
  ValidationOptions,
  ValidationResult,
} from "@baohaus/bao-types/validation";
import { Errors, TryParse } from "@baohaus/baobox/value";
import { validateIntegration } from "./integration";
import { validateUI } from "./ui";

/** Re-exported validation error descriptor. */
export type {
  /** Describes a single validation failure with field path, code, and message. */
  ValidationError,
  /** Options bag for the validation system (cache toggle, schema, etc.). */
  ValidationOptions,
  /** Outcome of a validation run including validity flag, errors, and warnings. */
  ValidationResult,
  /** Describes a non-fatal validation warning attached to a validation result. */
  ValidationWarning,
} from "@baohaus/bao-types/validation";

/**
 * Convert baobox validation issues into normalized validation errors.
 *
 * @param schema - Baobox schema used for validation.
 * @param data - Data being validated.
 * @returns Normalized validation errors.
 */
function schemaErrors(schema: ValidationOptions["schema"], data: unknown): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!schema) {
    return errors;
  }
  for (const issue of Errors(schema, data)) {
    errors.push({
      field: issue.path?.split("/").filter(Boolean).join(".") || undefined,
      path: issue.path,
      message: issue.message,
      code: issue.code || "VALIDATION_ERROR",
    });
  }
  return errors;
}

/**
 * Validation orchestrator for non-API checks (flows, UI, integrations, schemas).
 */
export class ValidationSystem {
  private static readonly CACHE_KEY_MAX_LENGTH = 256;
  private readonly cacheResults: boolean;
  private cache = new Map<string, ValidationResult>();

  /**
   * Create a validation system instance.
   *
   * @param [options={}] - Validation system options.
   */
  constructor(options: ValidationOptions = {}) {
    this.cacheResults = options.cache !== false;
  }

  /**
   * Validate data with a specified validation pipeline.
   *
   * Uses baobox's TryParse for single-pass validation with normalization
   * when a schema is provided.
   *
   * @param data - Data to validate.
   * @param validatorType - Validation pipeline selector.
   * @param [options={}] - Validation options for the pipeline.
   * @returns Validation result with errors, warnings, and optional data.
   */
  async validate(
    data: unknown,
    validatorType: "schema" | "ui" | "integration",
    options: ValidationOptions = {},
  ): Promise<ValidationResult> {
    const useCache = this.cacheResults && options.cache !== false;
    const cacheKey = useCache
      ? `${validatorType}:${JSON.stringify(data).slice(0, ValidationSystem.CACHE_KEY_MAX_LENGTH)}`
      : null;

    const cached = cacheKey ? this.cache.get(cacheKey) : undefined;
    if (cached) {
      return cached;
    }

    let result: ValidationResult;
    switch (validatorType) {
      case "schema": {
        const schema = options.schema;
        if (!schema) {
          result = {
            valid: false,
            errors: [
              {
                message: "ValidationOptions.schema is required for schema validation",
                code: "MISSING_SCHEMA",
              },
            ],
            warnings: [],
          };
          break;
        }

        const parseResult = TryParse(schema, data);
        result = parseResult.success
          ? { valid: true, errors: [], warnings: [], data: parseResult.value }
          : { valid: false, errors: schemaErrors(schema, data), warnings: [] };
        break;
      }
      case "ui": {
        result = await validateUI(data, options);
        break;
      }
      case "integration": {
        result = await validateIntegration(data, options);
        break;
      }
    }

    if (cacheKey) {
      this.cache.set(cacheKey, result);
    }
    return result;
  }
}

/**
 * Default shared validation system instance.
 */
export const defaultValidator: ValidationSystem = new ValidationSystem();
