/**
 * Hugging Face API DTOs shared between server and client.
 *
 * Defines stable response shapes for Hugging Face endpoints so the htmx/HTML client
 * can consume them without ad-hoc casting/parsing.
 *
 * @shared/types/huggingface.ts
 */

import { isRecord } from "./internal/record.js";

function isStringValue(value: unknown): value is string {
  return typeof value === "string";
}

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
  const record = value;
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    Array.isArray(record.tags) &&
    record.tags.every(isStringValue)
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
  const record = value;
  if (record.ok !== true) {
    return false;
  }
  if (!Array.isArray(record.data)) {
    return false;
  }
  if (!record.data.every(isHuggingFaceRecommendedDataset)) {
    return false;
  }
  if (record.tokenConfigured !== undefined && typeof record.tokenConfigured !== "boolean") {
    return false;
  }
  return true;
}
