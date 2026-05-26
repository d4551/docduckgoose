/**
 * Hugging Face API DTOs shared between server and client.
 *
 * Defines stable response shapes for Hugging Face endpoints so the htmx/HTML client
 * can consume them without ad-hoc casting/parsing.
 *
 * @shared/types/huggingface.ts
 */

/**
 * Minimal dataset metadata returned by the "recommended datasets" endpoint.
 */
export interface HuggingFaceRecommendedDataset {
  id: string;
  name: string;
  author?: string;
  tags: string[];
}

/**
 * Response payload returned by `GET /api/v1/huggingface/datasets/recommended`.
 */
export interface HuggingFaceRecommendedDatasetsResponse {
  ok: true;
  data: HuggingFaceRecommendedDataset[];
  tokenConfigured?: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Runtime guard for Hugging Face recommended dataset entries.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link HuggingFaceRecommendedDataset}.
 */
export function isHuggingFaceRecommendedDataset(
  value: unknown,
): value is HuggingFaceRecommendedDataset {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string")
  );
}

/**
 * Runtime guard for the recommended datasets response payload.
 *
 * @param value - Candidate payload.
 * @returns True when value matches {@link HuggingFaceRecommendedDatasetsResponse}.
 */
export function isHuggingFaceRecommendedDatasetsResponse(
  value: unknown,
): value is HuggingFaceRecommendedDatasetsResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (!Array.isArray(value.data)) {
    return false;
  }
  if (!value.data.every(isHuggingFaceRecommendedDataset)) {
    return false;
  }
  if (value.tokenConfigured !== undefined && typeof value.tokenConfigured !== "boolean") {
    return false;
  }
  return true;
}
