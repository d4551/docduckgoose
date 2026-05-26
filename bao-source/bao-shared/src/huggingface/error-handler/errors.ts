/**
 * HuggingFace Error Handler - Error classes.
 *
 * @packageDocumentation
 */

import type { ClassifiedError, ErrorType } from "./types.js";

/**
 * Error thrown when all retry attempts are exhausted.
 *
 * Error
 */
export class HfAllRetriesFailedError extends Error {
  override readonly name: string = "HfAllRetriesFailedError";
  /** Original thrown error from the final attempt */
  readonly originalError: unknown;
  /** Classified representation of the final error */
  readonly classified: ClassifiedError;
  /** Number of attempts that were made */
  readonly attempts: number;

  constructor(options: { attempts: number; originalError: unknown; classified: ClassifiedError }) {
    super(`All ${options.attempts} attempts failed. Last error: ${options.classified.message}`);
    this.originalError = options.originalError;
    this.classified = options.classified;
    this.attempts = options.attempts;
  }
}

/**
 * Error thrown when all providers fail in {@link handleProviderFallback}.
 *
 * Error
 */
export class HfAllProvidersFailedError extends Error {
  override readonly name: string = "HfAllProvidersFailedError";
  /** Provider error summaries */
  readonly errors: Array<{ provider: string; error: string; type: ErrorType }>;
  /** Providers attempted (order preserved) */
  readonly attemptedProviders: string[];

  constructor(options: {
    errors: Array<{ provider: string; error: string; type: ErrorType }>;
    attemptedProviders: string[];
  }) {
    const errorSummary = options.errors.map((e) => `${e.provider}: ${e.error}`).join("; ");
    super(`All ${options.attemptedProviders.length} provider(s) failed: ${errorSummary}`);
    this.errors = options.errors;
    this.attemptedProviders = options.attemptedProviders;
  }
}
