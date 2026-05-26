/**
 * Shared pipeline constraint constants.
 *
 * Centralizes pipeline constraint values used across server and client
 * to keep API contracts and UI payloads aligned.
 *
 * @packageDocumentation
 */

/**
 * Idempotency key constraints for pipeline runs.
 */
export const PIPELINE_IDEMPOTENCY_KEY_CONSTRAINTS: {
  readonly minLength: 1;
  readonly maxLength: 128;
} = {
  /** Minimum allowed length for idempotency keys. */
  minLength: 1,
  /** Maximum allowed length for idempotency keys. */
  maxLength: 128,
} as const;

/**
 * Default idempotency key settings for pipeline runs.
 */
export const PIPELINE_IDEMPOTENCY_KEY_DEFAULTS: { readonly prefix: "pipeline-run" } = {
  /** Prefix used when generating pipeline idempotency keys. */
  prefix: "pipeline-run",
} as const;
