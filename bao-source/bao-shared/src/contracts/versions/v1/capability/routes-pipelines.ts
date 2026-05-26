/**
 * Capability route definitions for pipelines, baodown, bao runtime,
 * observability, onnx, training, orchestration, mcp, and capability registry.
 *
 * @shared/contracts/versions/v1/capability/routes-pipelines
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import type { ApiRouteDefinition } from "./core";
import {
  BAO_EXTENSIONS_RUNTIME_BASE,
  BAODOWN_DEFINITIONS_BASE,
  BAODOWN_RUNS_BASE,
  BAODOWN_VERSIONS_BASE,
  BAODOWN_WEBHOOKS_BASE,
  CAPABILITY_REGISTRY_BASE,
  MCP_CONTEXTS_BASE,
  MCP_HARDWARE_CONTEXT,
  MCP_RESOURCES_BASE,
  MCP_RPA_CONTEXT,
  MCP_RPC_BASE,
  MCP_TOOLS_BASE,
  ONNX_BASE,
  ORCHESTRATION_BASE,
  PIPELINE_DEFINITIONS_BASE,
  PIPELINE_RUNS_BASE,
  PIPELINES_BASE,
  TRAINING_JOBS_BASE,
} from "./core";

export const PIPELINE_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "GET", path: `${PIPELINES_BASE}/integration` },
  { method: "GET", path: `${PIPELINES_BASE}/summary` },
  { method: "GET", path: `${PIPELINES_BASE}/automation` },
  { method: "GET", path: PIPELINE_DEFINITIONS_BASE },
  { method: "POST", path: PIPELINE_DEFINITIONS_BASE },
  { method: "DELETE", path: `${PIPELINE_DEFINITIONS_BASE}/:id` },
  { method: "GET", path: `${PIPELINE_DEFINITIONS_BASE}/:id` },
  { method: "PUT", path: `${PIPELINE_DEFINITIONS_BASE}/:id` },
  { method: "POST", path: `${PIPELINE_DEFINITIONS_BASE}/:id/run` },
  { method: "GET", path: PIPELINE_RUNS_BASE },
  { method: "GET", path: `${PIPELINE_RUNS_BASE}/:runId` },
  { method: "POST", path: `${PIPELINE_RUNS_BASE}/:runId/cancel` },
  { method: "GET", path: `${PIPELINE_RUNS_BASE}/:runId/events` },
] satisfies ApiRouteDefinition[];

export const BAODOWN_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "GET", path: API_PATHS.baodownIntegration },
  { method: "GET", path: API_PATHS.baodownCatalogNodes },
  { method: "GET", path: BAODOWN_DEFINITIONS_BASE },
  { method: "POST", path: BAODOWN_DEFINITIONS_BASE },
  { method: "GET", path: `${BAODOWN_DEFINITIONS_BASE}/:id` },
  { method: "PUT", path: `${BAODOWN_DEFINITIONS_BASE}/:id` },
  { method: "DELETE", path: `${BAODOWN_DEFINITIONS_BASE}/:id` },
  { method: "PUT", path: `${BAODOWN_DEFINITIONS_BASE}/:id/graph` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/validate` },
  { method: "GET", path: `${BAODOWN_DEFINITIONS_BASE}/:id/versions` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/versions` },
  { method: "GET", path: `${BAODOWN_DEFINITIONS_BASE}/:id/versions/diff` },
  { method: "GET", path: `${BAODOWN_VERSIONS_BASE}/:id` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/versions/:versionId/publish` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/versions/:versionId/rollback` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/unpublish` },
  { method: "GET", path: `${BAODOWN_DEFINITIONS_BASE}/:id/runs` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/runs` },
  { method: "GET", path: `${BAODOWN_RUNS_BASE}/:id` },
  { method: "POST", path: `${BAODOWN_RUNS_BASE}/:id/cancel` },
  { method: "SSE", path: `${BAODOWN_RUNS_BASE}/:id/events` },
  { method: "GET", path: `${BAODOWN_DEFINITIONS_BASE}/:id/schedules` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/schedules` },
  { method: "PUT", path: `${BAODOWN_DEFINITIONS_BASE}/:id/schedules/:scheduleId` },
  { method: "DELETE", path: `${BAODOWN_DEFINITIONS_BASE}/:id/schedules/:scheduleId` },
  { method: "GET", path: `${BAODOWN_DEFINITIONS_BASE}/:id/webhooks` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/webhooks` },
  { method: "PUT", path: `${BAODOWN_DEFINITIONS_BASE}/:id/webhooks/:webhookId` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/webhooks/:webhookId/rotate` },
  { method: "DELETE", path: `${BAODOWN_DEFINITIONS_BASE}/:id/webhooks/:webhookId` },
  { method: "POST", path: `${BAODOWN_WEBHOOKS_BASE}/:endpointKey` },
  { method: "POST", path: `${BAODOWN_DEFINITIONS_BASE}/:id/trigger/api` },
] satisfies ApiRouteDefinition[];

export const BAO_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "POST", path: API_PATHS.baoInstall },
  { method: "GET", path: API_PATHS.baoInstallStatus },
  { method: "POST", path: API_PATHS.baoInstallRetry },
  { method: "POST", path: API_PATHS.baoUninstall },
  { method: "GET", path: BAO_EXTENSIONS_RUNTIME_BASE },
] satisfies ApiRouteDefinition[];

export const BAO_OBSERVABILITY_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "GET", path: `${API_PATHS.baoObservability}/health` },
  { method: "GET", path: API_PATHS.baoObservabilityMetrics },
  { method: "GET", path: `${API_PATHS.baoObservabilityMetrics}/live` },
  { method: "GET", path: API_PATHS.baoObservabilityTraces },
  { method: "GET", path: API_PATHS.baoObservabilityLogs },
  { method: "GET", path: API_PATHS.baoObservabilityAlerts },
  { method: "GET", path: API_PATHS.baoObservabilityAlertRules },
  { method: "POST", path: API_PATHS.baoObservabilityAlertRules },
] satisfies ApiRouteDefinition[];

export const ONNX_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "DELETE", path: `${ONNX_BASE}/cache` },
  { method: "GET", path: `${ONNX_BASE}/cache` },
  { method: "GET", path: `${ONNX_BASE}/capabilities` },
  { method: "GET", path: `${ONNX_BASE}/health` },
  { method: "POST", path: `${ONNX_BASE}/infer` },
  { method: "GET", path: `${ONNX_BASE}/metrics` },
  { method: "GET", path: `${ONNX_BASE}/models` },
  { method: "GET", path: `${ONNX_BASE}/status` },
] satisfies ApiRouteDefinition[];

export const TRAINING_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "GET", path: API_PATHS.trainingStats },
  { method: "GET", path: TRAINING_JOBS_BASE },
  { method: "POST", path: TRAINING_JOBS_BASE },
  { method: "GET", path: `${TRAINING_JOBS_BASE}/:id` },
  { method: "PATCH", path: `${TRAINING_JOBS_BASE}/:id` },
  { method: "GET", path: `${TRAINING_JOBS_BASE}/:id/artifacts` },
  { method: "POST", path: `${TRAINING_JOBS_BASE}/:id/artifacts` },
  { method: "GET", path: `${TRAINING_JOBS_BASE}/:id/artifacts/:artifactId/file` },
  { method: "POST", path: `${TRAINING_JOBS_BASE}/:id/complete` },
  { method: "POST", path: `${TRAINING_JOBS_BASE}/:id/cancel` },
] satisfies ApiRouteDefinition[];

export const ORCHESTRATION_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "POST", path: `${ORCHESTRATION_BASE}/models/download` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/models/download/:id` },
  { method: "DELETE", path: `${ORCHESTRATION_BASE}/models/download/:id` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/models/downloads` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/models/cache` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/models/cache/:modelId` },
  { method: "POST", path: `${ORCHESTRATION_BASE}/datasets/sync` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/datasets/sync/:id` },
  { method: "DELETE", path: `${ORCHESTRATION_BASE}/datasets/sync/:id` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/datasets` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/datasets/syncs` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/datasets/:datasetId/info` },
  { method: "POST", path: `${ORCHESTRATION_BASE}/training/workflows` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/training/workflows` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/training/workflows/:id` },
  { method: "POST", path: `${ORCHESTRATION_BASE}/training/workflows/:id/start` },
  { method: "POST", path: `${ORCHESTRATION_BASE}/training/workflows/:id/pause` },
  { method: "DELETE", path: `${ORCHESTRATION_BASE}/training/workflows/:id` },
  { method: "GET", path: `${ORCHESTRATION_BASE}/status` },
  { method: "GET", path: API_PATHS.baoControlPlaneStatus },
  { method: "GET", path: API_PATHS.baoRuntimeStatus },
] satisfies ApiRouteDefinition[];

export const MCP_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "GET", path: MCP_TOOLS_BASE },
  { method: "POST", path: `${MCP_TOOLS_BASE}/:name` },
  { method: "GET", path: MCP_RESOURCES_BASE },
  { method: "GET", path: `${MCP_RESOURCES_BASE}/:encoded` },
  { method: "GET", path: `${API_PATHS.mcp}/templates` },
  { method: "GET", path: MCP_CONTEXTS_BASE },
  { method: "GET", path: MCP_HARDWARE_CONTEXT },
  { method: "GET", path: MCP_RPA_CONTEXT },
  { method: "GET", path: MCP_RPC_BASE },
  { method: "POST", path: MCP_RPC_BASE },
  { method: "DELETE", path: MCP_RPC_BASE },
] satisfies ApiRouteDefinition[];

export const CAPABILITY_REGISTRY_ROUTE_DEFINITIONS_V1: readonly ApiRouteDefinition[] = [
  { method: "GET", path: CAPABILITY_REGISTRY_BASE },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/stats` },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/health` },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/ownership` },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/ownership/focus` },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/ownership/coverage` },
  { method: "POST", path: `${CAPABILITY_REGISTRY_BASE}/ownership/refresh` },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/responsibility/:responsibility` },
  { method: "GET", path: `${CAPABILITY_REGISTRY_BASE}/:id` },
  { method: "POST", path: CAPABILITY_REGISTRY_BASE },
  { method: "POST", path: `${CAPABILITY_REGISTRY_BASE}/discover` },
  { method: "POST", path: `${CAPABILITY_REGISTRY_BASE}/sync-health` },
  { method: "DELETE", path: `${CAPABILITY_REGISTRY_BASE}/:id` },
] satisfies ApiRouteDefinition[];
