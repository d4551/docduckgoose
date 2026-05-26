/**
 * HuggingFace Error Handler - Retry helpers and client wrapper.
 *
 * @packageDocumentation
 */

import { toResult } from "@baohaus/bao-utils/async-result";
import type { RetryOptions } from "../../utils/retry.js";
import { retryWithBackoff } from "../../utils/retry.js";
import { classifyHfError, getOriginalError } from "./classify.js";
import { DEFAULT_RETRY_STRATEGIES, logger } from "./constants.js";
import { HfAllRetriesFailedError } from "./errors.js";
import type { ErrorType, HfRetryOptions, RetryStrategy } from "./types.js";

/**
 * Wrap a HuggingFace API call with retry logic and exponential backoff.
 *
 * Uses the consolidated retry utilities from @shared/utils/retry for robust
 * error handling with configurable backoff strategies.
 *
 * T - The return type of the wrapped function
 * @param function_ - Async function to execute with retry context
 * @param [options={}] - Retry configuration options
 * @returns Result from the function or throws the last error after all retries exhausted
 * @throws When all retry attempts fail
 *
 * @example
 * ```typescript
 * const result = await withHfRetry(
 *   async () => client.textGeneration({ model: 'gpt2', inputs: 'Hello' }),
 *   {
 *     maxAttempts: 3,
 *     baseDelay: 1000,
 *     onRetry: (error, attempt) => {
 *       logger.info(`Retry attempt ${attempt} after error:`, error.message);
 *     }
 *   }
 * );
 * ```
 */
export async function withHfRetry<T>(
  function_: (context: { attempt: number; signal?: AbortSignal }) => Promise<T>,
  options: HfRetryOptions = {},
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    exponentialBackoff = true,
    onRetry = null,
    shouldRetry = null,
    timeout = null,
  } = options;

  const retryOptions: RetryOptions = {
    maxAttempts,
    baseDelay,
    maxDelay,
    factor: exponentialBackoff ? 2 : 1, // If exponentialBackoff=false, use factor=1 (constant delay)
    useJitter: exponentialBackoff, // Only use jitter with exponential backoff
    timeout: timeout ?? undefined,
    shouldRetry: (error: unknown, attempt: number): boolean => {
      const classified = classifyHfError(error);

      // Log the error
      logger.warn(
        `Attempt ${attempt + 1}/${maxAttempts} failed:`,
        classified.type,
        classified.message,
      );

      // Check if we should retry using custom logic or default strategy
      const defaultStrategy =
        DEFAULT_RETRY_STRATEGIES[classified.type] || DEFAULT_RETRY_STRATEGIES.unknown_error;

      return shouldRetry
        ? shouldRetry(classified, attempt)
        : classified.isRetryable && defaultStrategy.shouldRetry;
    },
    onRetry: async (error: unknown, attempt: number, delay: number): Promise<void> => {
      const classified = classifyHfError(error);

      // Call user-provided callback if present
      if (onRetry) {
        const callbackResult = await toResult(() => onRetry(classified, attempt, delay));
        if (!callbackResult.ok) {
          logger.warn("onRetry callback error:", callbackResult.error);
        }
      }

      logger.info(`Retrying in ${delay}ms...`);
    },
  };

  const result = await toResult(() => retryWithBackoff(function_, retryOptions));
  if (!result.ok) {
    const originalError = getOriginalError(result.error);
    const lastClassified = classifyHfError(originalError);
    throw new HfAllRetriesFailedError({
      attempts: maxAttempts,
      originalError,
      classified: lastClassified,
    });
  }
  return result.value;
}

/**
 * Check if an error is retryable based on classification
 *
 * @param error - Error to check
 * @returns True if the error should be retried
 *
 * @example
 * const result = await toResultAsync(client.textGeneration({ model: 'gpt2', inputs: 'Hello' }));
 * if (!result.ok && isRetryableError(result.error)) {
 *   // Retry the request
 * }
 */
export function isRetryableError(error: unknown): boolean {
  const classified = classifyHfError(error);
  return classified.isRetryable;
}

/**
 * Get retry strategy for a specific error type
 *
 * @param errorType - The error type
 * @returns Retry strategy configuration
 *
 * @example
 * const strategy = getRetryStrategy('provider_api_error');
 * logger.info(strategy.maxAttempts); // 3
 */
export function getRetryStrategy(errorType: ErrorType): RetryStrategy {
  return DEFAULT_RETRY_STRATEGIES[errorType] || DEFAULT_RETRY_STRATEGIES.unknown_error;
}

/**
 * Extract user-friendly error message from HuggingFace error
 * Compatible with RealHuggingFaceService.getErrorMessage
 *
 * @param error - The error to extract message from
 * @returns User-friendly error message
 *
 * @example
 * const message = getErrorMessage(error);
 * logger.info(message); // "API Error: Rate limit exceeded (Status: 429)"
 */
export function getErrorMessage(error: unknown): string {
  const classified = classifyHfError(error);
  return classified.message;
}

/**
 * Create a retry wrapper for HuggingFace InferenceClient methods
 * Returns a wrapped client with automatic retry logic
 *
 * @param client - HuggingFace InferenceClient instance
 * @param [defaultOptions={}] - Default retry options
 * @returns Proxied client with retry logic
 *
 * @example
 * import { InferenceClient } from '@huggingface/inference';
 *
 * const client = new InferenceClient('hf_...');
 * const retryClient = createRetryClient(client, {
 *   maxAttempts: 3,
 *   baseDelay: 1000,
 * });
 *
 * // All methods now have automatic retry
 * const result = await retryClient.textGeneration({
 *   model: 'gpt2',
 *   inputs: 'Hello world'
 * });
 */
export function createRetryClient<ClientShape extends object>(
  client: ClientShape,
  defaultOptions: HfRetryOptions = {},
): ClientShape {
  return new Proxy(client, {
    get(target: ClientShape, property: string | symbol, receiver: unknown): unknown {
      const originalValue: unknown = Reflect.get(target, property, receiver);

      // Only wrap function properties with retry logic.
      // After typeof === 'function', TS narrows to Function which is callable
      // via Reflect.apply without type assertions.
      if (typeof originalValue === "function") {
        return (...args: unknown[]) =>
          withHfRetry(
            async (): Promise<unknown> => Reflect.apply(originalValue, target, args),
            defaultOptions,
          );
      }

      return originalValue;
    },
  });
}
