/**
 * HuggingFace Error Handler - Error classification.
 *
 * @packageDocumentation
 */

import {
  InferenceClientError,
  InferenceClientHubApiError,
  InferenceClientInputError,
  InferenceClientProviderApiError,
  InferenceClientProviderOutputError,
  InferenceClientRoutingError,
} from "@huggingface/inference";
import {
  HF_ERROR_HANDLER_OPTIONS,
  HF_HTTP_INTERNAL,
  IDEMPOTENT_METHODS,
  RETRYABLE_MESSAGE_PATTERNS,
  RETRYABLE_STATUS_CODES,
  STATUS_MESSAGE_MAP,
} from "./constants.js";
import type { ClassifiedError, ErrorType } from "./types.js";

interface HfHttpResponseLike {
  status?: number;
  statusText?: string;
  body?: unknown;
}

interface HfHttpRequestLike {
  url?: string;
  method?: string;
  headers?: unknown;
}

interface HfErrorWithHttp {
  httpResponse?: HfHttpResponseLike;
  response?: HfHttpResponseLike;
  httpRequest?: HfHttpRequestLike;
  request?: HfHttpRequestLike;
}

/**
 * Runtime guard for HfHttpResponseLike shape.
 *
 * @param value - Candidate value.
 * @returns True when value is a non-null object (all HfHttpResponseLike fields are optional).
 */
function isHfHttpResponseLike(value: unknown): value is HfHttpResponseLike {
  return typeof value === "object" && value !== null;
}

/**
 * Runtime guard for HfHttpRequestLike shape.
 *
 * @param value - Candidate value.
 * @returns True when value is a non-null object (all HfHttpRequestLike fields are optional).
 */
function isHfHttpRequestLike(value: unknown): value is HfHttpRequestLike {
  return typeof value === "object" && value !== null;
}

/**
 * Safely extract HTTP request/response metadata from an error object.
 *
 * The HF SDK attaches these fields at runtime but they are not part of the
 * public type definitions. Uses runtime guards instead of type assertions.
 *
 * @param error - Error instance to inspect.
 * @returns Object with optional HTTP metadata fields.
 */
function extractHfHttpFields(error: object): HfErrorWithHttp {
  const result: HfErrorWithHttp = {};
  if ("httpResponse" in error && isHfHttpResponseLike(error.httpResponse)) {
    result.httpResponse = error.httpResponse;
  }
  if ("response" in error && isHfHttpResponseLike(error.response)) {
    result.response = error.response;
  }
  if ("httpRequest" in error && isHfHttpRequestLike(error.httpRequest)) {
    result.httpRequest = error.httpRequest;
  }
  if ("request" in error && isHfHttpRequestLike(error.request)) {
    result.request = error.request;
  }
  return result;
}

/**
 * Extract a best-effort message from an unknown error value.
 *
 * @param error - Any thrown value
 * @returns Best-effort message string
 */
export function getUnknownErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return String(error);
}

/**
 * Extract a best-effort name from an unknown error value.
 *
 * @param error - Any thrown value
 * @returns Best-effort error name
 */
export function getUnknownErrorName(error: unknown): string {
  if (error instanceof Error) {
    return error.name;
  }
  if (error && typeof error === "object" && "name" in error && typeof error.name === "string") {
    return error.name;
  }
  return "Error";
}

/**
 * Unwrap a nested original error if present.
 *
 * Used to normalize errors thrown by retry/fallback helpers.
 *
 * @param error - Any thrown value
 * @returns The unwrapped original error if available
 */
export function getOriginalError(error: unknown): unknown {
  if (error && typeof error === "object" && "originalError" in error) {
    // The `in` operator narrows to `{ originalError: unknown }` in TS 4.9+
    const maybe: unknown = error.originalError;
    return maybe ?? error;
  }
  return error;
}

/**
 * Resolve retryability and message for a known HTTP status code.
 *
 * @param statusCode - HTTP status code.
 * @param errorMessage - Original error message.
 * @returns Object with resolved message and retryable flag.
 */
function resolveStatusCodeClassification(
  statusCode: number,
  errorMessage: string,
): { message: string; isRetryable: boolean } {
  const override = STATUS_MESSAGE_MAP[statusCode];
  if (override) {
    return { message: override.message, isRetryable: override.retryable };
  }
  if (statusCode >= HF_HTTP_INTERNAL) {
    return { message: `Server error (${statusCode}): ${errorMessage}`, isRetryable: true };
  }
  return { message: errorMessage, isRetryable: RETRYABLE_STATUS_CODES.has(statusCode) };
}

/**
 * Resolve retryability for a provider API error without an HTTP status code.
 *
 * @param request - Optional HTTP request metadata.
 * @returns Whether the error should be retried.
 */
function resolveNoStatusRetryability(request: HfHttpRequestLike | undefined): boolean {
  const strategy = HF_ERROR_HANDLER_OPTIONS.defaultRetryProviderApiNoStatusStrategy;
  if (strategy === "always") {
    return true;
  }
  if (strategy === "idempotent") {
    const method = (request?.method ?? "").toString().toUpperCase();
    return IDEMPOTENT_METHODS.has(method);
  }
  return false;
}

/**
 * Classify a Provider or Hub API error from HuggingFace.
 *
 * @param error - The provider/hub error instance.
 * @returns Partial classified error fields.
 */
function classifyApiError(
  error: InferenceClientProviderApiError | InferenceClientHubApiError,
): Pick<ClassifiedError, "type" | "message" | "isRetryable" | "statusCode" | "details"> {
  const type: ErrorType =
    error instanceof InferenceClientProviderApiError ? "provider_api_error" : "hub_api_error";
  // Extract optional HTTP metadata that HF SDK attaches at runtime
  const hfError = extractHfHttpFields(error);
  const response = hfError.httpResponse ?? hfError.response;
  const request = hfError.httpRequest ?? hfError.request;
  const statusCode = response?.status ?? null;
  const label = type === "provider_api_error" ? "Provider" : "Hub";
  let message = `${label} API Error: ${error.message}`;
  let isRetryable = false;

  const details: Record<string, unknown> = {
    request: {
      url: request?.url,
      method: request?.method,
      headers: request?.headers ? "***" : undefined,
    },
    response: { status: statusCode, statusText: response?.statusText, body: response?.body },
  };

  if (statusCode) {
    const classification = resolveStatusCodeClassification(statusCode, error.message);
    message = classification.message;
    isRetryable = classification.isRetryable;
  } else {
    isRetryable = resolveNoStatusRetryability(request);
  }

  return { type, message, isRetryable, statusCode, details };
}

/**
 * Classify a HuggingFace error into a structured error type.
 *
 * @param error - The error to classify.
 * @returns Classified error information.
 */
export function classifyHfError(error: unknown): ClassifiedError {
  if (error instanceof InferenceClientInputError) {
    return {
      type: "input_error",
      message: `Invalid Input: ${error.message}`,
      isRetryable: false,
      statusCode: null,
      details: null,
      originalError: error,
    };
  }

  if (
    error instanceof InferenceClientProviderApiError ||
    error instanceof InferenceClientHubApiError
  ) {
    const result = classifyApiError(error);
    return { ...result, originalError: error };
  }

  if (error instanceof InferenceClientProviderOutputError) {
    return {
      type: "provider_output_error",
      message: `Provider Output Error: ${error.message}`,
      isRetryable: true,
      statusCode: null,
      details: null,
      originalError: error,
    };
  }

  if (error instanceof InferenceClientRoutingError) {
    return {
      type: "inference_error",
      message: `Routing Error: ${error.message}`,
      isRetryable: true,
      statusCode: null,
      details: null,
      originalError: error,
    };
  }

  if (error instanceof InferenceClientError) {
    return {
      type: "inference_error",
      message: `Inference Error: ${error.message}`,
      isRetryable: true,
      statusCode: null,
      details: null,
      originalError: error,
    };
  }

  if (error instanceof TypeError && error.message.includes("fetch")) {
    return {
      type: "network_error",
      message: `Network Error: ${error.message}`,
      isRetryable: true,
      statusCode: null,
      details: null,
      originalError: error,
    };
  }

  if (
    getUnknownErrorName(error) === "AbortError" ||
    getUnknownErrorMessage(error).includes("timeout")
  ) {
    return {
      type: "timeout_error",
      message: `Request Timeout: ${getUnknownErrorMessage(error)}`,
      isRetryable: true,
      statusCode: null,
      details: null,
      originalError: error,
    };
  }

  const message = getUnknownErrorMessage(error);
  const isRetryable = RETRYABLE_MESSAGE_PATTERNS.some((pattern) => pattern.test(message));
  return {
    type: "unknown_error",
    message,
    isRetryable,
    statusCode: null,
    details: null,
    originalError: error,
  };
}
