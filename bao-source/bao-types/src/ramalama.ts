/**
 * Shared Ramalama types for API and UI alignment.
 *
 * Centralizes local model management payloads to keep server and client
 * contracts consistent (status, models, and action inputs).
 *
 * @shared/types/ramalama.ts
 */

import type { BaoRuntimeSnapshot } from "@baohaus/bao-schemas/bao-runtime.schemas";
import type {
  ChatIntegrationBunBuddyGraphContext,
  ChatIntegrationContextSummary,
} from "./integration-context.ts";

/**
 * Model source/transport for Ramalama.
 */
export type RamalamaTransport = "huggingface" | "ollama" | "oci" | "file";

/**
 * Container engine for Ramalama.
 */
export type RamalamaEngine = "bao-control-plane" | "external";

/**
 * Runtime backend for inference.
 */
export type RamalamaRuntime = "llama.cpp" | "vllm";

/**
 * GPU type detected by Ramalama.
 */
export type RamalamaGpuType = "cuda" | "rocm" | "metal" | "intel" | "cpu";

/**
 * Ramalama availability status.
 */
export type RamalamaStatusState = "available" | "disabled" | "missing_cli" | "error";

/**
 * Ramalama status payload.
 */
export interface RamalamaStatus {
  enabled: boolean;
  managementEnabled: boolean;
  available: boolean;
  status: RamalamaStatusState;
  engine: RamalamaEngine | null;
  runtime: RamalamaRuntime | null;
  version: string | null;
  gpu: RamalamaGpuType | null;
  endpoint: string | null;
  model: string | null;
  error: string | null;
  checkedAt: string;
}

/**
 * Model info returned by Ramalama list.
 */
export interface RamalamaModel {
  name: string;
  size: string;
  modified: string;
  transport: RamalamaTransport;
}

/**
 * Ramalama models snapshot payload.
 */
export interface RamalamaModelsSnapshot {
  status: RamalamaStatusState;
  models: RamalamaModel[];
  count: number;
  error: string | null;
  checkedAt: string;
}

/**
 * Result payload for Ramalama CLI actions.
 */
export interface RamalamaActionResult {
  output: string | null;
  checkedAt: string;
}

/**
 * Input payload for referencing a Ramalama model.
 */
export interface RamalamaModelRefInput {
  transport: RamalamaTransport;
  model: string;
}

/**
 * Input payload for serving a Ramalama model.
 */
export interface RamalamaServeInput extends RamalamaModelRefInput {
  name?: string | undefined;
  port?: number | undefined;
  detach?: boolean | undefined;
  runtime?: RamalamaRuntime | undefined;
  ctxSize?: number | undefined;
  ngl?: number | undefined;
  temp?: number | undefined;
  threads?: number | undefined;
  generateKubernetesManifest?: boolean;
}

/**
 * Input payload for stopping a Ramalama model server.
 */
export interface RamalamaStopInput {
  name: string;
}

/**
 * Standard response wrapper for Ramalama status.
 */
export interface RamalamaStatusResponse {
  ok: boolean;
  data: RamalamaStatus;
  error?: string;
}

/**
 * Standard response wrapper for Ramalama models.
 */
export interface RamalamaModelsResponse {
  ok: boolean;
  data: RamalamaModelsSnapshot;
  error?: string;
}

/**
 * Warning codes for Ramalama overview aggregation.
 */
export type RamalamaOverviewWarningCode =
  | "ramalama_status_unavailable"
  | "ramalama_models_unavailable"
  | "ramalama_integration_unavailable"
  | "ramalama_infra_unavailable";

/**
 * Warning payload for Ramalama overview aggregation.
 */
export interface RamalamaOverviewWarning {
  code: RamalamaOverviewWarningCode;
  source: "status" | "models" | "integration" | "infra";
  detail?: string | null;
}

/**
 * BunBuddy handoff summary snapshot for Ramalama overview.
 */
export type RamalamaBunBuddyHandoffs = ChatIntegrationBunBuddyGraphContext["handoffs"];

/**
 * Infrastructure automation summary for Ramalama runtime operations.
 */
export interface RamalamaInfraSummary {
  container: {
    runtime: "container" | "host";
    engine: RamalamaEngine | null;
    hostGateway: string | null;
    hostPlatform: string | null;
    hostArch: string | null;
  };
  baoControlPlane: {
    runtime: BaoRuntimeSnapshot | null;
  };
  kubernetes: {
    stackRunAsNonRoot: boolean | null;
    stackRunAsUser: string | null;
    stackRunAsGroup: string | null;
    stackFsGroup: string | null;
  };
  checkedAt: string;
}

/**
 * Aggregated Ramalama overview payload.
 */
export interface RamalamaOverview {
  status: RamalamaStatus;
  models: RamalamaModelsSnapshot;
  integrationSummary: ChatIntegrationContextSummary | null;
  bunbuddyHandoffs: RamalamaBunBuddyHandoffs | null;
  infraSummary: RamalamaInfraSummary | null;
  warnings: RamalamaOverviewWarning[];
  timestamp: string;
}

/**
 * Standard response wrapper for Ramalama overview.
 */
export interface RamalamaOverviewResponse {
  ok: boolean;
  data: RamalamaOverview;
  error?: string;
}

/**
 * Standard response wrapper for Ramalama actions.
 */
export interface RamalamaActionResponse {
  ok: boolean;
  data: RamalamaActionResult;
  error?: string;
}

const RAMALAMA_EPOCH: string = new Date(0).toISOString();

/**
 * Default Ramalama status payload for SSR-safe fallbacks.
 */
export const DEFAULT_RAMALAMA_STATUS: RamalamaStatus = {
  enabled: false,
  managementEnabled: false,
  available: false,
  status: "disabled",
  engine: null,
  runtime: null,
  version: null,
  gpu: null,
  endpoint: null,
  model: null,
  error: null,
  checkedAt: RAMALAMA_EPOCH,
};

/**
 * Default Ramalama models snapshot for SSR-safe fallbacks.
 */
export const DEFAULT_RAMALAMA_MODELS: RamalamaModelsSnapshot = {
  status: "disabled",
  models: [],
  count: 0,
  error: null,
  checkedAt: RAMALAMA_EPOCH,
};

/**
 * Default Ramalama overview payload for SSR-safe fallbacks.
 */
export const DEFAULT_RAMALAMA_OVERVIEW: RamalamaOverview = {
  status: DEFAULT_RAMALAMA_STATUS,
  models: DEFAULT_RAMALAMA_MODELS,
  integrationSummary: null,
  bunbuddyHandoffs: null,
  infraSummary: null,
  warnings: [],
  timestamp: RAMALAMA_EPOCH,
};
