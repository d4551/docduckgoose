import type { TSchema } from "@baohaus/baobox/elysia";

/**
 * Normalized validation error shape shared across non-API validation utilities.
 *
 * @remarks
 * This is intentionally lightweight and transport-agnostic so it can be used in:
 * - Flow validation
 * - UI/template validation
 * - Integration/config validation
 * - Ad-hoc TypeBox schema validation
 */
export interface ValidationError {
  /** Optional field path where the error occurred (dot-path). */
  field?: string;
  /** Human-readable error message. */
  message: string;
  /** Machine-readable error code for deterministic handling. */
  code?: string;
  /** Optional original path (e.g. JSON pointer or schema path). */
  path?: string;
  /** Optional additional context (e.g. surrounding snippet). */
  context?: string;
}

/**
 * Normalized validation warning shape shared across non-API validation utilities.
 */
export interface ValidationWarning {
  /** Optional field path where the warning applies (dot-path). */
  field?: string;
  /** Human-readable warning message. */
  message: string;
  /** Optional suggestion for remediation. */
  suggestion?: string;
}

/**
 * Common validation result envelope for non-API validators.
 *
 * TData - Optional metadata payload shape.
 */
export interface ValidationResult<TData = unknown> {
  /** True when no validation errors were produced. */
  valid: boolean;
  /** Validation errors. */
  errors: ValidationError[];
  /** Validation warnings. */
  warnings: ValidationWarning[];
  /** Optional metadata payload. */
  data?: TData;
}

/**
 * Shared option bag for non-API validators.
 *
 * @remarks
 * Individual validators read only the keys they understand and ignore others.
 * This keeps the orchestration layer DRY without requiring a complex generic API.
 */
export interface ValidationOptions {
  /** Whether to cache results in the orchestrator layer. */
  cache?: boolean;
  /** Optional TypeBox schema for ad-hoc schema validation. */
  schema?: TSchema;
  /** Flow validation: require pathology nodes. */
  requirePathologyNodes?: boolean;
  /** Flow validation: enable performance checks. */
  performanceCheck?: boolean;
  /** UI validation: enable accessibility checks. */
  checkAccessibility?: boolean;
  /** UI validation: enable performance checks. */
  checkPerformance?: boolean;
  /** Integration validation: enable security checks. */
  checkSecurity?: boolean;
}
