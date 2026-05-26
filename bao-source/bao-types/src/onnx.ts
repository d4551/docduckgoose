/**
 * Shared ONNX + WebGPU API types.
 *
 * Defines stable request/response shapes used across:
 * - Elysia `/api/v1/onnx/*` endpoints
 * - AI gateway capability hints
 * - SSR composables (Eden Treaty)
 *
 * @shared/types/onnx.ts
 */

import { isRecord } from "./internal/record.js";

/**
 * Supported inference device preferences exposed via API/config.
 *
 * Notes:
 * - `cpu` maps to server-side native execution when available.
 * - `wasm` and `webgpu` map to browser-style ONNX runtimes/backends (when supported).
 * - `auto` prefers WebGPU when available, otherwise falls back to CPU.
 */
export type InferenceDevicePreference = "auto" | "cpu" | "wasm" | "webgpu";

/**
 * CPU vendor resolution source.
 */
export type CpuVendorSource = "proc" | "os" | "unknown";

/**
 * CPU vendor detection payload.
 */
export interface CpuVendorStatus {
  vendor: string | null;
  raw: string | null;
  source: CpuVendorSource;
  isUnknown: boolean;
  message?: string;
}

/**
 * Canonical `.bao` ONNX runtime module identifiers (status/API payloads).
 */
export const ONNX_BAO_RUNTIME_MODULE = {
  NODE: "onnx-node-bao",
  WEB: "onnx-web-bao",
} as const;

export type OnnxRuntimeModuleId =
  | (typeof ONNX_BAO_RUNTIME_MODULE)[keyof typeof ONNX_BAO_RUNTIME_MODULE]
  | null;

/**
 * ONNX runtime availability status.
 */
export interface OnnxRuntimeStatus {
  available: boolean;
  supported: boolean;
  module: OnnxRuntimeModuleId;
  version: string | null;
  message?: string | undefined;
  cpuVendor: CpuVendorStatus;
}

/**
 * ONNX WASM backend status (for @baohaus/onnx-web-bao).
 */
export interface OnnxWasmStatus {
  available: boolean;
  supported: boolean;
  module: typeof ONNX_BAO_RUNTIME_MODULE.WEB | null;
}

/**
 * WebGPU availability status.
 */
export interface WebGpuStatus {
  available: boolean;
  supported: boolean;
  module: string | null;
  message?: string;
}

/**
 * Availability status for WebGPU-tagged models.
 */
export interface WebGpuModelsStatus {
  available: boolean;
}

/**
 * ONNX runtime capability matrix for status and client gating.
 */
export interface OnnxRuntimeCapabilityMatrix {
  host: "bun" | "browser" | "node";
  crossOriginIsolated: boolean;
  serverWebInference: boolean;
  browserClientInference: boolean;
  executionProviderChains: {
    webgpu: readonly string[];
    wasm: readonly string[];
    native: readonly string[];
  };
}

/**
 * ONNX status payload returned by `/api/v1/onnx/status` (without the `{ ok: true }` envelope).
 */
export interface OnnxStatusData {
  onnx: OnnxRuntimeStatus;
  webgpu: WebGpuStatus;
  onnxWasm: OnnxWasmStatus;
  webgpuModels: WebGpuModelsStatus;
  capabilities: OnnxRuntimeCapabilityMatrix;
  environment: string;
  timestamp: string;
}

/**
 * ONNX status response returned by `/api/v1/onnx/status`.
 */
export type OnnxStatusResponse = { ok: true } & OnnxStatusData;

/**
 * ONNX model metadata returned by `/api/v1/onnx/models`.
 */
export interface OnnxModelDto {
  id: string;
  name: string;
  format: string;
  path: string;
  available: boolean;
  runtime: string | null;
  type: string;
  provider: string;
  metadata?: Record<string, unknown>;
  tags?: string[];
}

/**
 * ONNX model list response returned by `/api/v1/onnx/models`.
 */
export interface OnnxModelsListResponse {
  ok: true;
  models: OnnxModelDto[];
  count: number;
  timestamp: string;
  performance?: unknown;
}

/**
 * Runtime guard for ONNX model DTOs.
 *
 * @param value - Candidate model value.
 * @returns True when value matches {@link OnnxModelDto}.
 */
export function isOnnxModelDto(value: unknown): value is OnnxModelDto {
  if (!isRecord(value)) {
    return false;
  }
  const record = value;
  if (
    typeof record.id !== "string" ||
    typeof record.name !== "string" ||
    typeof record.format !== "string" ||
    typeof record.path !== "string" ||
    typeof record.available !== "boolean" ||
    typeof record.type !== "string" ||
    typeof record.provider !== "string"
  ) {
    return false;
  }
  const runtime = record.runtime;
  if (runtime !== null && runtime !== undefined && typeof runtime !== "string") {
    return false;
  }
  const tags = record.tags;
  if (tags !== undefined) {
    if (!(Array.isArray(tags) && tags.every((tag) => typeof tag === "string"))) {
      return false;
    }
  }
  const metadata = record.metadata;
  if (
    metadata !== undefined &&
    (typeof metadata !== "object" || metadata === null || Array.isArray(metadata))
  ) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for ONNX models list response payload.
 *
 * @param value - Candidate payload value.
 * @returns True when value matches {@link OnnxModelsListResponse}.
 */
export function isOnnxModelsListResponse(value: unknown): value is OnnxModelsListResponse {
  if (!isRecord(value)) {
    return false;
  }
  const record = value;
  if (record.ok !== true) {
    return false;
  }
  if (!(Array.isArray(record.models) && record.models.every(isOnnxModelDto))) {
    return false;
  }
  if (typeof record.count !== "number") {
    return false;
  }
  if (typeof record.timestamp !== "string") {
    return false;
  }
  return true;
}

/**
 * Request payload accepted by `/api/v1/onnx/infer`.
 */
export interface OnnxInferRequest {
  modelId?: string;
  modelPath?: string;
  inputData?: Record<string, unknown>;
  devicePreference?: InferenceDevicePreference;
}
