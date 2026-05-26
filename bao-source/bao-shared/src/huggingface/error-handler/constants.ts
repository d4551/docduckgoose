/**
 * HuggingFace Error Handler - Constants and global options.
 *
 * @packageDocumentation
 */

import { createLogger } from "../../logger/index.js";
import type { ErrorType, HfErrorHandlerOptions, RetryStrategy } from "./types.js";

export const HF_HTTP_REQUEST_TIMEOUT = 408;
export const HF_HTTP_TOO_MANY = 429;
export const HF_HTTP_INTERNAL = 500;
export const HF_HTTP_BAD_GATEWAY = 502;
export const HF_HTTP_UNAVAILABLE = 503;
export const HF_HTTP_GATEWAY_TIMEOUT = 504;

export const logger: ReturnType<typeof createLogger> = createLogger("HFErrorHandler");

/**
 * Default retry and error handling options for Hugging Face API calls.
 */
export const HF_ERROR_HANDLER_OPTIONS: HfErrorHandlerOptions = {
  defaultRetryProviderApiNoStatusStrategy: "idempotent",
};

/**
 * Update HuggingFace error handler global options.
 *
 * @param options - Options to merge into global config
 */
export function setHfErrorHandlerOptions(options: Partial<HfErrorHandlerOptions> = {}): void {
  Object.assign(HF_ERROR_HANDLER_OPTIONS, options);
}

/**
 * Default retry strategies for different error types
 * Based on HuggingFace API behavior and best practices
 */
export const DEFAULT_RETRY_STRATEGIES: Record<ErrorType, RetryStrategy> = {
  input_error: {
    shouldRetry: false,
    maxAttempts: 1,
    baseDelay: 0,
    maxDelay: 0,
    exponentialBackoff: false,
  },
  provider_api_error: {
    shouldRetry: true,
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    exponentialBackoff: true,
  },
  hub_api_error: {
    shouldRetry: true,
    maxAttempts: 3,
    baseDelay: 2000,
    maxDelay: 30000,
    exponentialBackoff: true,
  },
  provider_output_error: {
    shouldRetry: true,
    maxAttempts: 2,
    baseDelay: 500,
    maxDelay: 5000,
    exponentialBackoff: true,
  },
  inference_error: {
    shouldRetry: true,
    maxAttempts: 2,
    baseDelay: 1000,
    maxDelay: 10000,
    exponentialBackoff: true,
  },
  network_error: {
    shouldRetry: true,
    maxAttempts: 3,
    baseDelay: 2000,
    maxDelay: 30000,
    exponentialBackoff: true,
  },
  timeout_error: {
    shouldRetry: true,
    maxAttempts: 2,
    baseDelay: 3000,
    maxDelay: 30000,
    exponentialBackoff: true,
  },
  unknown_error: {
    shouldRetry: true,
    maxAttempts: 2,
    baseDelay: 1000,
    maxDelay: 10000,
    exponentialBackoff: true,
  },
};

/**
 * HTTP status codes that should trigger retries
 */
export const RETRYABLE_STATUS_CODES: Set<number> = new Set([
  HF_HTTP_REQUEST_TIMEOUT,
  HF_HTTP_TOO_MANY,
  HF_HTTP_INTERNAL,
  HF_HTTP_BAD_GATEWAY,
  HF_HTTP_UNAVAILABLE,
  HF_HTTP_GATEWAY_TIMEOUT,
]);

/**
 * Status-specific error message overrides.
 */
export const STATUS_MESSAGE_MAP: Record<number, { message: string; retryable: boolean }> = {
  401: { message: "Authentication failed: Invalid or expired API token", retryable: false },
  403: { message: "Access forbidden: Insufficient permissions", retryable: false },
  404: { message: "Model or endpoint not found", retryable: false },
  429: { message: "Rate limit exceeded: Too many requests", retryable: true },
};

/**
 * Idempotent HTTP methods that are safe to retry.
 */
export const IDEMPOTENT_METHODS: Set<string> = new Set([
  "GET",
  "HEAD",
  "PUT",
  "DELETE",
  "OPTIONS",
  "TRACE",
]);

/**
 * Patterns in error messages that indicate retryability.
 */
export const RETRYABLE_MESSAGE_PATTERNS: readonly RegExp[] = [
  /timeout/i,
  /network/i,
  /ECONNREFUSED/i,
  /ENOTFOUND/i,
  /temporarily unavailable/i,
  /try again/i,
];
