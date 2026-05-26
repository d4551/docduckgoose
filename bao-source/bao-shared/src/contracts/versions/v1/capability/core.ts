/**
 * Capability contract core: shared types, helpers, and base path constants.
 *
 * @shared/contracts/versions/v1/capability/core
 */

import { API_PATHS, API_VERSION } from "@baohaus/bao-constants/api-paths";

/**
 * Supported HTTP methods in capability route definitions.
 */
export type ApiRouteMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "WS" | "SSE";

/**
 * Shape of an API route definition.
 */
export interface ApiRouteDefinition {
  /** HTTP method for the route. */
  method: ApiRouteMethod;
  /** Path template for the route. */
  path: string;
}

/**
 * Convert an API route definition into a contract route string.
 *
 * @param definition - Route definition to format.
 * @returns String formatted as "METHOD /path".
 */
export function formatApiRoute(definition: ApiRouteDefinition): string {
  return `${definition.method} ${definition.path}`;
}

/**
 * Build a list of contract route strings from route definitions.
 *
 * @param definitions - Map of route definitions.
 * @returns Array of formatted contract route strings.
 */
export function buildRouteList(definitions: Record<string, ApiRouteDefinition>): string[] {
  return Object.values(definitions).map(formatApiRoute);
}

/**
 * Build a list of contract route strings from route definitions.
 *
 * @param definitions - Route definition list.
 * @returns Array of formatted contract route strings.
 */
export function buildRouteListFromDefinitions(
  definitions: readonly ApiRouteDefinition[],
): string[] {
  return definitions.map(formatApiRoute);
}

/**
 * Convert Elysia-style `:param` tokens into app-contract `{param}` tokens.
 *
 * @param path - Route path template.
 * @returns App-contract-compatible path template.
 */
export function toAppContractPath(path: string): string {
  return path.replaceAll(/:([A-Za-z0-9_]+)/g, "{$1}");
}

export const AI_BASE: string = API_PATHS.ai;
export const AI_CHAT_BASE: string = API_PATHS.aiChat;
export const CHAT_BASE: string = API_PATHS.chat;
export const AI_AZURE_BASE: string = `${AI_BASE}/azure`;
export const AI_HUGGINGFACE_BASE: string = `${AI_BASE}/huggingface`;
export const AI_NIM_BASE: string = `${AI_BASE}/nim`;
export const AI_OLLAMA_BASE: string = `${AI_BASE}/ollama`;
export const AI_RAMLAMA_BASE: string = `${AI_BASE}/ramalama`;
export const AI_WEAVIATE_BASE: string = `${AI_BASE}/weaviate`;
export const AI_EMBEDDINGS_BASE: string = `${AI_BASE}/embeddings`;
export const AI_OPENAI_BASE: string = `${AI_BASE}/openai/${API_VERSION}`;

export const XR_BASE: string = API_PATHS.xr;
export const XR_EXPERIENCES_BASE: string = `${XR_BASE}/experiences`;
export const XR_SHARED_BASE: string = API_PATHS.xrShared;

export const USD_BASE: string = API_PATHS.usd;
export const USD_ASSETS_BASE: string = `${USD_BASE}/assets`;
export const USD_SCAN_IMPORT_BASE: string = `${USD_ASSETS_BASE}/from-scan-session`;

export const HARDWARE_BASE: string = API_PATHS.hardware;
export const NETWORK_BASE: string = API_PATHS.network;
export const CAPABILITY_REGISTRY_BASE: string = `${API_PATHS.base}/capabilities`;
export const CALIBRATION_BASE: string = `${API_PATHS.base}/calibration`;
export const FOOTPEDAL_BASE: string = `${API_PATHS.base}/footpedal`;
export const BUNBUDDIES_BASE: string = API_PATHS.bunbuddies;
export const DEVICES_BASE: string = API_PATHS.devices;
export const DRIVERS_BASE: string = API_PATHS.drivers;
export const MCP_TOOLS_BASE: string = API_PATHS.mcpTools;
export const MCP_RESOURCES_BASE: string = API_PATHS.mcpResources;
export const MCP_CONTEXTS_BASE: string = API_PATHS.mcpContexts;
export const MCP_HARDWARE_CONTEXT: string = API_PATHS.mcpContextByProvider.replace(
  ":providerId",
  "hardware",
);
export const MCP_RPA_CONTEXT: string = API_PATHS.mcpContextByProvider.replace(":providerId", "rpa");
export const MCP_RPC_BASE: string = `${API_PATHS.mcp}/rpc`;
export const LIGHTING_BASE: string = `${API_PATHS.base}/lighting`;
export const PRINTER_BASE: string = `${API_PATHS.base}/printer`;
export const INDUSTRIAL_BASE: string = `${API_PATHS.base}/industrial`;
export const IOT_BASE: string = `${API_PATHS.base}/iot`;
export const IMAGER_BASE: string = API_PATHS.imager;

export const PIPELINES_BASE: string = API_PATHS.pipelines;
export const PIPELINE_DEFINITIONS_BASE: string = `${PIPELINES_BASE}/definitions`;
export const PIPELINE_RUNS_BASE: string = `${PIPELINES_BASE}/runs`;
export const BAODOWN_BASE: string = API_PATHS.baodown;
export const BAODOWN_DEFINITIONS_BASE: string = `${BAODOWN_BASE}/definitions`;
export const BAODOWN_VERSIONS_BASE: string = `${BAODOWN_BASE}/versions`;
export const BAODOWN_RUNS_BASE: string = `${BAODOWN_BASE}/runs`;
export const BAODOWN_WEBHOOKS_BASE: string = `${BAODOWN_BASE}/webhooks`;
export const BAO_EXTENSIONS_RUNTIME_BASE: string = API_PATHS.baoExtensionsRuntime;

export const ONNX_BASE: string = API_PATHS.onnx;
export const TRAINING_BASE: string = API_PATHS.training;
export const TRAINING_JOBS_BASE: string = `${TRAINING_BASE}/jobs`;
export const ORCHESTRATION_BASE: string = API_PATHS.orchestration;

export const THREE_BASE: string = API_PATHS.three;
export const THREE_MEDIA_BASE: string = `${THREE_BASE}/media-assets`;
export const THREE_AI_BASE: string = `${THREE_BASE}/ai`;
export const THREE_AI_JOBS_BASE: string = `${THREE_AI_BASE}/jobs`;
export const API_EXPLORER_BASE: string = API_PATHS.apiExplorer;
export const FLEET_BASE: string = API_PATHS.fleet;
