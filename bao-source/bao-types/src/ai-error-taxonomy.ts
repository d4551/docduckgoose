/**
 * AI error taxonomy for structured output and refusal handling.
 *
 * Maps AI-specific finish reasons and validation outcomes to the platform
 * error envelope taxonomy for deterministic UI states. Used by AI plugin,
 * chat runner, and output validator to normalize errors across endpoints.
 *
 * @shared/types/ai-error-taxonomy
 */

import { STREAM_ERROR_CODES, type StreamErrorCode } from "@baohaus/bao-schemas/streaming.schemas";

/** Finish reasons returned by AI providers (streaming and non-streaming). */
export type AiFinishReason =
  | "stop"
  | "length"
  | "content_filter"
  | "error"
  | "unknown"
  | "cancelled";

export const AiTaxonomyErrorCode = {
  AiGenerationFailed: "AI_GENERATION_FAILED",
  AiProviderError: "AI_PROVIDER_ERROR",
  AiInvalidOutput: "AI_INVALID_OUTPUT",
  AiContentFilter: "AI_CONTENT_FILTER",
  AiOutputIncomplete: "AI_OUTPUT_INCOMPLETE",
} as const;
export type AiTaxonomyErrorCode = (typeof AiTaxonomyErrorCode)[keyof typeof AiTaxonomyErrorCode];

/** Structured mapping of finish reason to platform error code. */
const FINISH_REASON_TO_ERROR_CODE: Record<AiFinishReason, AiTaxonomyErrorCode> = {
  stop: AiTaxonomyErrorCode.AiGenerationFailed,
  length: AiTaxonomyErrorCode.AiOutputIncomplete,
  content_filter: AiTaxonomyErrorCode.AiContentFilter,
  error: AiTaxonomyErrorCode.AiProviderError,
  unknown: AiTaxonomyErrorCode.AiProviderError,
  cancelled: AiTaxonomyErrorCode.AiGenerationFailed,
};

/** Structured mapping of finish reason to stream error code (for SSE). */
const FINISH_REASON_TO_STREAM_CODE: Record<AiFinishReason, StreamErrorCode> = {
  stop: STREAM_ERROR_CODES.AI_PROVIDER_ERROR,
  length: STREAM_ERROR_CODES.AI_OUTPUT_INCOMPLETE,
  content_filter: STREAM_ERROR_CODES.AI_CONTENT_FILTER,
  error: STREAM_ERROR_CODES.AI_PROVIDER_ERROR,
  unknown: STREAM_ERROR_CODES.AI_PROVIDER_ERROR,
  cancelled: STREAM_ERROR_CODES.ABORTED,
};

/**
 * Map an AI finish reason to the platform error code.
 *
 * @param reason - Finish reason from provider response.
 * @returns Canonical error code for the error envelope.
 */
export function finishReasonToErrorCode(reason: AiFinishReason): AiTaxonomyErrorCode {
  return FINISH_REASON_TO_ERROR_CODE[reason] ?? AiTaxonomyErrorCode.AiProviderError;
}

/**
 * Map an AI finish reason to stream error code (for SSE error events).
 *
 * @param reason - Finish reason from provider response.
 * @returns Stream error code string for StreamErrorData.
 */
export function finishReasonToStreamCode(reason: AiFinishReason): StreamErrorCode {
  return FINISH_REASON_TO_STREAM_CODE[reason] ?? STREAM_ERROR_CODES.AI_PROVIDER_ERROR;
}

/**
 * Check if a finish reason indicates a refusal or content filter.
 *
 * @param reason - Finish reason from provider.
 * @returns True when the response was refused or filtered.
 */
export function isRefusalOrFilter(reason: AiFinishReason): boolean {
  return reason === "content_filter";
}

/**
 * Check if a finish reason indicates incomplete output (truncation, etc.).
 *
 * @param reason - Finish reason from provider.
 * @returns True when output may be incomplete.
 */
export function isOutputIncomplete(reason: AiFinishReason): boolean {
  return reason === "length" || reason === "unknown";
}

/**
 * Map validation failure (structured output) to platform error code.
 *
 * @param _errors - Validation errors (for future extension; e.g., severity-based codes).
 * @returns Error code for invalid structured output.
 */
export function validationFailureToErrorCode(_errors?: readonly string[]): AiTaxonomyErrorCode {
  return AiTaxonomyErrorCode.AiInvalidOutput;
}
