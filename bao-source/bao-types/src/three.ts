/**
 * Shared Three.js media asset and AI annotation job types.
 *
 * Centralizes the API response shapes consumed by HTML pages and composables
 * that integrate with the /api/v1/three endpoints.
 *
 * @shared/types/three.ts
 */

import type {
  AnnotationSetCoordinateSpace,
  AnnotationSetDeleteResponse,
  AnnotationSetDto,
  AnnotationSetListResponse,
  AnnotationSetResponse,
} from "./annotations.ts";

/**
 * Supported media types for Three.js assets.
 */
export type ThreeMediaType = "image" | "model" | "video";

/**
 * Media asset list item returned by the Three.js media API.
 */
export interface ThreeMediaAssetListItem {
  id: string;
  name: string;
  mediaType: ThreeMediaType | null;
  mimeType: string | null;
  extension: string | null;
  caseId: string | null;
  fileUrl: string;
  fileSize: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Minimal media asset payload returned by the Three.js API.
 */
export interface ThreeMediaAssetSummary {
  id: string;
  name: string;
  mediaType: ThreeMediaType | null;
  mimeType: string | null;
  extension: string | null;
  caseId: string | null;
  fileUrl: string;
}

/**
 * Media asset detail response for the Three.js assets API.
 */
export type ThreeMediaAssetResponse = { ok: true } & ThreeMediaAssetSummary;

/**
 * Media asset list response for the Three.js assets API.
 */
export interface ThreeMediaListResponse {
  ok: true;
  items: ThreeMediaAssetListItem[];
}

/**
 * Media asset import response for USD -> Three.js transfers.
 */
export interface ThreeMediaImportResponse {
  ok: true;
  asset: ThreeMediaAssetListItem;
}

/**
 * bao-boss job status payload returned by queue-backed endpoints.
 */
export interface BaoBossJobStatus<TOutput = Record<string, unknown>> {
  id: string;
  state: string;
  createdOn: string;
  startedOn: string | null;
  completedOn: string | null;
  output: TOutput | null;
}

/**
 * Queue response for scan session -> Three media asset import.
 *
 * When queues are disabled, the server may run inline and return `queued: false` with the created asset.
 */
export type ThreeMediaImportQueueResponse =
  | {
      ok: true;
      queued: true;
      jobId: string;
    }
  | {
      ok: true;
      queued: false;
      jobId: null;
      asset: ThreeMediaAssetListItem;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };

/**
 * Job status response for scan session -> Three media import jobs.
 */
export type ThreeMediaImportJobStatusResponse =
  | { ok: true; job: BaoBossJobStatus }
  | { ok: false; error: string; code?: string };

/**
 * Media asset storage stats response.
 */
export interface ThreeMediaStatsResponse {
  ok: true;
  totalAssets: number;
  totalBytes: number;
  byType: Array<{ mediaType: string; count: number; totalBytes: number }>;
}

/**
 * Three.js annotation set record.
 */
export type ThreeAnnotationSetDto = AnnotationSetDto;

/**
 * Annotation set list response.
 */
export type ThreeAnnotationSetListResponse = AnnotationSetListResponse;

/**
 * Annotation set response payload.
 */
export type ThreeAnnotationSetResponse = AnnotationSetResponse;

/**
 * Annotation set delete response payload.
 */
export type ThreeAnnotationSetDeleteResponse = AnnotationSetDeleteResponse;

/**
 * AI annotation suggestion returned by Three AI jobs.
 */
export interface AiAnnotationSuggestion {
  id?: string;
  type?: string;
  color?: string | number;
  confidence?: number;
  coordinates?: {
    space?: AnnotationSetCoordinateSpace;
    values?: number[];
  };
  metadata?: Record<string, unknown>;
}

/**
 * AI job summary payload for UI status and metrics.
 */
export interface ThreeAiJobSummary {
  confidence?: number | null;
  coverage?: number | null;
  /** Pixel dimensions of the analyzed media asset. */
  dimensions?: { width: number; height: number } | null;
  provider?: string | null;
  providerLabel?: string | null;
  fallback?: boolean;
  prompt?: string | null;
}

/**
 * AI job output envelope returned by the Three AI API.
 */
export interface ThreeAiJobOutput {
  annotations?: AiAnnotationSuggestion[];
  annotationSetId?: string | null;
  summary?: ThreeAiJobSummary;
  metadata?: Record<string, unknown>;
}

/**
 * AI job response payload.
 */
export interface ThreeAiJobDto {
  id: string;
  assetId: string | null;
  annotationSetId: string | null;
  subjectType: string | null;
  subjectId: string | null;
  provider: string | null;
  model: string | null;
  status: string | null;
  input: Record<string, unknown> | null;
  output: ThreeAiJobOutput | null;
  metadata: Record<string, unknown> | null;
  error: string | null;
  queuedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdBy: string | null;
}

/**
 * AI job API response wrapper.
 */
export interface ThreeAiJobResponse {
  ok: true;
  job: ThreeAiJobDto;
}

/**
 * AI job list response payload.
 */
export interface ThreeAiJobListResponse {
  ok: true;
  items: ThreeAiJobDto[];
}
