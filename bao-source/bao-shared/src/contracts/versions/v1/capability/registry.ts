/**
 * Capability contract registry (v1) and helpers.
 *
 * @shared/contracts/versions/v1/capability/registry
 */

import {
  buildRouteList,
  buildRouteListFromDefinitions,
  formatApiRoute,
  PIPELINE_DEFINITIONS_BASE,
  PIPELINE_RUNS_BASE,
} from "./core";
import {
  AI_ROUTE_DEFINITIONS_V1,
  API_EXPLORER_ROUTE_DEFINITIONS_V1,
  AUTH_ROUTE_DEFINITIONS_V1,
  CHAT_ROUTE_DEFINITIONS_V1,
  FLEET_ROUTE_DEFINITIONS_V1,
  THREE_ROUTE_DEFINITIONS_V1,
  USD_ROUTE_DEFINITIONS_V1,
  XR_ROUTE_DEFINITIONS_V1,
} from "./routes-ai-chat";
import { HARDWARE_ROUTE_DEFINITIONS_V1 } from "./routes-hardware";
import {
  BAO_OBSERVABILITY_ROUTE_DEFINITIONS_V1,
  BAO_ROUTE_DEFINITIONS_V1,
  BAODOWN_ROUTE_DEFINITIONS_V1,
  CAPABILITY_REGISTRY_ROUTE_DEFINITIONS_V1,
  MCP_ROUTE_DEFINITIONS_V1,
  ONNX_ROUTE_DEFINITIONS_V1,
  ORCHESTRATION_ROUTE_DEFINITIONS_V1,
  PIPELINE_ROUTE_DEFINITIONS_V1,
  TRAINING_ROUTE_DEFINITIONS_V1,
} from "./routes-pipelines";
import {
  DRONE_ROUTES_V1,
  GAUSSIAN_ROUTES_V1,
  PERCEPTION_ROUTES_V1,
  ROBOTICS_ROUTES_V1,
  RPA_ROUTES_V1,
  SCANNER_ROUTES_V1,
  VISION_ROUTES_V1,
} from "./routes-services";

/** A single capability contract entry with routes and optional events. */
export interface CapabilityContractEntry {
  routes: string[];
  events?: string[];
}

/**
 * Capability contract registry (v1).
 */
export const CAPABILITY_CONTRACTS_V1 = {
  perception: {
    routes: buildRouteList(PERCEPTION_ROUTES_V1),
    events: ["perception.bunbuddy.health.changed"],
  },
  gaussian: {
    routes: buildRouteList(GAUSSIAN_ROUTES_V1),
  },
  scanner: {
    routes: buildRouteList(SCANNER_ROUTES_V1),
    events: ["scanner.device.connected", "scanner.scan.completed"],
  },
  drone: {
    routes: buildRouteList(DRONE_ROUTES_V1),
    events: ["drone.telemetry.updated", "drone.mission.completed"],
  },
  robotics: {
    routes: buildRouteList(ROBOTICS_ROUTES_V1),
  },
  rpa: {
    routes: buildRouteList(RPA_ROUTES_V1),
  },
  vision: {
    routes: buildRouteList(VISION_ROUTES_V1),
  },
  ai: {
    routes: buildRouteListFromDefinitions(AI_ROUTE_DEFINITIONS_V1),
  },
  apiExplorer: {
    routes: buildRouteListFromDefinitions(API_EXPLORER_ROUTE_DEFINITIONS_V1),
  },
  auth: {
    routes: buildRouteListFromDefinitions(AUTH_ROUTE_DEFINITIONS_V1),
  },
  chat: {
    routes: buildRouteListFromDefinitions(CHAT_ROUTE_DEFINITIONS_V1),
  },
  fleet: {
    routes: buildRouteListFromDefinitions(FLEET_ROUTE_DEFINITIONS_V1),
  },
  onnx: {
    routes: buildRouteListFromDefinitions(ONNX_ROUTE_DEFINITIONS_V1),
  },
  training: {
    routes: buildRouteListFromDefinitions(TRAINING_ROUTE_DEFINITIONS_V1),
  },
  orchestration: {
    routes: buildRouteListFromDefinitions(ORCHESTRATION_ROUTE_DEFINITIONS_V1),
  },
  xr: {
    routes: buildRouteListFromDefinitions(XR_ROUTE_DEFINITIONS_V1),
  },
  usd: {
    routes: buildRouteListFromDefinitions(USD_ROUTE_DEFINITIONS_V1),
  },
  three: {
    routes: buildRouteListFromDefinitions(THREE_ROUTE_DEFINITIONS_V1),
  },
  pipelines: {
    routes: buildRouteListFromDefinitions(PIPELINE_ROUTE_DEFINITIONS_V1),
    events: [
      "pipeline:queued",
      "pipeline:started",
      "pipeline:completed",
      "pipeline:failed",
      "pipeline:cancelled",
      "pipeline:timeout",
    ],
  },
  baodown: {
    routes: buildRouteListFromDefinitions(BAODOWN_ROUTE_DEFINITIONS_V1),
  },
  bao: {
    routes: buildRouteListFromDefinitions(BAO_ROUTE_DEFINITIONS_V1),
  },
  hardware: {
    routes: buildRouteListFromDefinitions(HARDWARE_ROUTE_DEFINITIONS_V1),
  },
  mcp: {
    routes: buildRouteListFromDefinitions(MCP_ROUTE_DEFINITIONS_V1),
  },
  capabilityRegistry: {
    routes: buildRouteListFromDefinitions(CAPABILITY_REGISTRY_ROUTE_DEFINITIONS_V1),
  },
  baoObservability: {
    routes: buildRouteListFromDefinitions(BAO_OBSERVABILITY_ROUTE_DEFINITIONS_V1),
  },
} as const satisfies Record<string, CapabilityContractEntry>;

/**
 * Keys for capability contract registry entries.
 */
export type CapabilityContractKey = keyof typeof CAPABILITY_CONTRACTS_V1;

/**
 * Resolve a capability contract entry by key.
 *
 * @param key - Capability contract key.
 * @returns Contract entry for the capability.
 */
export function getCapabilityContractV1ByKey(
  key: CapabilityContractKey,
): (typeof CAPABILITY_CONTRACTS_V1)[CapabilityContractKey] {
  return CAPABILITY_CONTRACTS_V1[key];
}

/**
 * Build the pipeline API route list for a pipeline definition.
 *
 * @param definitionId - Pipeline definition identifier.
 * @returns Pipeline contract route list.
 */
export function buildPipelineCapabilityRoutes(definitionId: string): string[] {
  return [
    formatApiRoute({ method: "GET", path: `${PIPELINE_DEFINITIONS_BASE}/${definitionId}` }),
    formatApiRoute({
      method: "POST",
      path: `${PIPELINE_DEFINITIONS_BASE}/${definitionId}/run`,
    }),
    formatApiRoute({ method: "GET", path: `${PIPELINE_RUNS_BASE}/:runId` }),
    formatApiRoute({ method: "GET", path: `${PIPELINE_RUNS_BASE}/:runId/events` }),
  ];
}
