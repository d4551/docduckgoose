/**
 * HuggingFace Error Handler - Multi-provider fallback.
 *
 * @packageDocumentation
 */

import { toResult } from "@baohaus/bao-utils/async-result";
import { classifyHfError, getOriginalError } from "./classify.js";
import { logger } from "./constants.js";
import { HfAllProvidersFailedError } from "./errors.js";
import { withHfRetry } from "./retry.js";
import type { ErrorType, FallbackOptions } from "./types.js";

/**
 * Safely invoke a fallback callback with error logging.
 *
 * @param callback - Optional callback to invoke.
 * @param args - Arguments to pass to the callback.
 */
async function invokeFallbackCallback<CallbackArgs extends unknown[]>(
  callback: ((...cbArgs: CallbackArgs) => void | Promise<void>) | null,
  ...args: CallbackArgs
): Promise<void> {
  if (!callback) {
    return;
  }
  const cbResult = await toResult(() => callback(...args));
  if (!cbResult.ok) {
    logger.warn("Fallback callback error:", cbResult.error);
  }
}

/**
 * Result type for internal fallback execution paths.
 */
type FallbackResult<T> =
  | { ok: true; result: T; provider: string; attemptedProviders: number }
  | { ok: false; errors: Array<{ provider: string; error: string; type: ErrorType }> };

interface FallbackExecutionOptions<T> {
  providers: string[];
  providerTask: (provider: string) => Promise<T>;
  maxAttempts: number;
  baseDelay: number;
  onProviderFailed: FallbackOptions["onProviderFailed"];
  onProviderSuccess: FallbackOptions["onProviderSuccess"];
}

/**
 * Execute providers in parallel, returning the first success.
 *
 * @param options - Provider execution options.
 * @returns Fallback result.
 */
async function executeParallel<T>(
  options: FallbackExecutionOptions<T>,
): Promise<FallbackResult<T>> {
  const { providers, providerTask, maxAttempts, baseDelay, onProviderFailed, onProviderSuccess } =
    options;
  const results = await Promise.allSettled(
    providers.map(async (provider) => {
      const retryResult = await toResult(() =>
        withHfRetry(async () => providerTask(provider), { maxAttempts, baseDelay }),
      );
      if (!retryResult.ok) {
        const classified = classifyHfError(getOriginalError(retryResult.error));
        await invokeFallbackCallback(onProviderFailed ?? null, provider, classified);
        throw retryResult.error;
      }
      await invokeFallbackCallback(onProviderSuccess ?? null, provider, retryResult.value);
      return { provider, result: retryResult.value };
    }),
  );

  const successful = results.find(
    (r): r is PromiseFulfilledResult<{ provider: string; result: T }> => r.status === "fulfilled",
  );
  if (successful) {
    return {
      ok: true,
      result: successful.value.result,
      provider: successful.value.provider,
      attemptedProviders: providers.length,
    };
  }

  const errors: Array<{ provider: string; error: string; type: ErrorType }> = [];
  for (let index = 0; index < results.length; index++) {
    const result = results[index];
    const provider = providers[index];
    if (result && result.status === "rejected" && provider) {
      const classified = classifyHfError(getOriginalError(result.reason));
      errors.push({ provider, error: classified.message, type: classified.type });
    }
  }
  return { ok: false, errors };
}

/**
 * Execute providers sequentially, returning on first success.
 *
 * @param options - Provider execution options.
 * @returns Fallback result.
 */
async function executeSequential<T>(
  options: FallbackExecutionOptions<T>,
): Promise<FallbackResult<T>> {
  const { providers, providerTask, maxAttempts, baseDelay, onProviderFailed, onProviderSuccess } =
    options;
  const errors: Array<{ provider: string; error: string; type: ErrorType }> = [];

  for (const provider of providers) {
    logger.info(`Attempting provider: ${provider}`);
    const retryResult = await toResult(() =>
      withHfRetry(async () => providerTask(provider), { maxAttempts, baseDelay }),
    );

    if (retryResult.ok) {
      logger.info(`Provider ${provider} succeeded`);
      await invokeFallbackCallback(onProviderSuccess ?? null, provider, retryResult.value);
      return {
        ok: true,
        result: retryResult.value,
        provider,
        attemptedProviders: errors.length + 1,
      };
    }

    const classified = classifyHfError(getOriginalError(retryResult.error));
    logger.warn(`Provider ${provider} failed:`, classified.message);
    errors.push({ provider, error: classified.message, type: classified.type });
    await invokeFallbackCallback(onProviderFailed ?? null, provider, classified);
  }

  return { ok: false, errors };
}

/**
 * Execute provider failover across provider list with optional retry strategy and callbacks.
 *
 * @param providers - Ordered provider keys.
 * @param function_ - Provider execution function.
 * @param options - Retry and callback controls.
 * @returns Successful provider result and metadata.
 */
export async function handleProviderFallback<T>(
  providers: string[],
  function_: (provider: string) => Promise<T>,
  options: FallbackOptions = {},
): Promise<{ success: true; result: T; provider: string; attemptedProviders: number }> {
  const {
    maxAttempts = 2,
    baseDelay = 1000,
    onProviderFailed = null,
    onProviderSuccess = null,
    parallelExecution = false,
  } = options;

  if (!Array.isArray(providers) || providers.length === 0) {
    throw new Error("providers must be a non-empty array");
  }

  const fallbackResult = parallelExecution
    ? await executeParallel({
        providers,
        providerTask: function_,
        maxAttempts,
        baseDelay,
        onProviderFailed,
        onProviderSuccess,
      })
    : await executeSequential({
        providers,
        providerTask: function_,
        maxAttempts,
        baseDelay,
        onProviderFailed,
        onProviderSuccess,
      });

  if (fallbackResult.ok) {
    return {
      success: true,
      result: fallbackResult.result,
      provider: fallbackResult.provider,
      attemptedProviders: fallbackResult.attemptedProviders,
    };
  }

  throw new HfAllProvidersFailedError({
    errors: fallbackResult.errors,
    attemptedProviders: providers,
  });
}
