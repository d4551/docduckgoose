/**
 * HuggingFace Error Handler - Shared types.
 *
 * @packageDocumentation
 */

/**
 * Strategy to use when an error doesn't contain an HTTP status code.
 */
export type DefaultRetryNoStatusStrategy = "never" | "idempotent" | "always";

/**
 * Global, opt-in configuration for handler behavior.
 *
 * Extend cautiously to avoid breaking changes; defaults are conservative.
 *
 * HfErrorHandlerOptions
 */
export interface HfErrorHandlerOptions {
  // Strategy when Provider API errors lack an HTTP status
  // 'never' (conservative), 'idempotent' (default), or 'always' (aggressive)
  defaultRetryProviderApiNoStatusStrategy: DefaultRetryNoStatusStrategy;
}

/**
 * Error classification types based on HuggingFace error classes.
 */
export type ErrorType =
  | "input_error"
  | "provider_api_error"
  | "hub_api_error"
  | "provider_output_error"
  | "inference_error"
  | "network_error"
  | "timeout_error"
  | "unknown_error";

/**
 * Retry strategy configuration.
 */
export interface RetryStrategy {
  /** Whether this error type should be retried */
  shouldRetry: boolean;
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Base delay in milliseconds for exponential backoff */
  baseDelay: number;
  /** Maximum delay in milliseconds */
  maxDelay: number;
  /** Whether to use exponential backoff */
  exponentialBackoff: boolean;
}

/**
 * Classified error information.
 */
export interface ClassifiedError {
  /** The classified error type */
  type: ErrorType;
  /** User-friendly error message */
  message: string;
  /** Whether the error is retryable */
  isRetryable: boolean;
  /** HTTP status code (if applicable) */
  statusCode: number | null;
  /** Additional error details */
  details: Record<string, unknown> | null;
  /** The original error object (unknown) */
  originalError: unknown;
}

/**
 * Retry options for withHfRetry.
 * Mirrors {@link RetryOptions} from '@/shared/utils/retry'.
 */
export interface HfRetryOptions {
  /** Maximum number of retry attempts (including initial attempt) */
  maxAttempts?: number;
  /** Base delay in milliseconds */
  baseDelay?: number;
  /** Maximum delay in milliseconds */
  maxDelay?: number;
  /** Whether to use exponential backoff (factor=2 + jitter) */
  exponentialBackoff?: boolean;
  /** Optional per-attempt timeout in milliseconds */
  timeout?: number | null;
  /** Custom retry condition */
  shouldRetry?: ((classified: ClassifiedError, attempt: number) => boolean) | null;
  /** Callback invoked before each retry attempt */
  onRetry?:
    | ((classified: ClassifiedError, attempt: number, delay: number) => void | Promise<void>)
    | null;
}

/**
 * Provider fallback options.
 */
export interface FallbackOptions {
  /** Maximum attempts per provider */
  maxAttempts?: number;
  /** Base delay between retries */
  baseDelay?: number;
  /** Callback when a provider fails */
  onProviderFailed?: ((provider: string, error: ClassifiedError) => void | Promise<void>) | null;
  /** Callback when a provider succeeds */
  onProviderSuccess?: ((provider: string, result: unknown) => void | Promise<void>) | null;
  /** Try all providers in parallel */
  parallelExecution?: boolean;
}
