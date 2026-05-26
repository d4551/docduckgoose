/**
 * UAV capability registry — single source of truth for 100 stable `uav.*` IDs.
 *
 * @shared/schemas/uav-capability-registry
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

export const UAV_CAPABILITY_SURFACES = [
  "mcp",
  "api",
  "bunbuddy",
  "bao",
  "baodown",
  "fabric",
] as const;

export type UavCapabilitySurface = (typeof UAV_CAPABILITY_SURFACES)[number];

export const UavCapabilitySurfaceSchema = stringEnum(UAV_CAPABILITY_SURFACES, {
  description: "Integration surfaces for a UAV capability",
});

export const UAV_PORTFOLIO_SYSTEM_IDS = [
  "uav-registry",
  "uav-security",
  "uav-types",
  "uav-errors",
  "uav-flight",
  "uav-api",
  "uav-mcp",
  "uav-mission",
  "uav-fleet",
  "uav-ui",
] as const;

export type UavPortfolioSystemId = (typeof UAV_PORTFOLIO_SYSTEM_IDS)[number];

type CapabilitySeed = {
  readonly id: string;
  readonly systemId: UavPortfolioSystemId;
  readonly surfaces: readonly UavCapabilitySurface[];
  readonly permission?: string;
  readonly mcpTool?: string;
  readonly apiRoute?: string;
  readonly packageId?: string;
  readonly baodownNode?: string;
  readonly legacyIds?: readonly string[];
};

const CAPABILITY_SEEDS: readonly CapabilitySeed[] = [
  {
    id: "uav.registry.catalog",
    systemId: "uav-registry",
    surfaces: ["bao"],
    packageId: "bao-schemas",
  },
  {
    id: "uav.registry.validator",
    systemId: "uav-registry",
    surfaces: ["bao"],
    packageId: "bao-packages",
  },
  {
    id: "uav.portfolio.config",
    systemId: "uav-registry",
    surfaces: ["api", "bao"],
    apiRoute: API_PATHS.drone,
  },
  {
    id: "uav.portfolio.snapshot",
    systemId: "uav-registry",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.capability.portfolio",
    apiRoute: `${API_PATHS.base}/drone/capabilities/portfolio`,
  },
  {
    id: "uav.bao.drone-mission.capabilities",
    systemId: "uav-registry",
    surfaces: ["bao"],
    packageId: "drone-mission-bao",
    legacyIds: ["drone.mission.compile", "drone.mission.export", "drone.mission.segment"],
  },
  {
    id: "uav.bao.drone-schemas.capabilities",
    systemId: "uav-registry",
    surfaces: ["bao"],
    packageId: "drone-schemas",
  },
  {
    id: "uav.bao.drone-bunbuddy.capabilities",
    systemId: "uav-registry",
    surfaces: ["bao", "bunbuddy"],
    packageId: "drone-bunbuddy",
  },
  {
    id: "uav.names.uav-alias-cutover",
    systemId: "uav-registry",
    surfaces: ["baodown"],
    baodownNode: "integration.uav",
  },
  {
    id: "uav.registry.build-manifest",
    systemId: "uav-registry",
    surfaces: ["bao"],
    packageId: "bao-packages",
  },
  {
    id: "uav.registry.capability-domain",
    systemId: "uav-registry",
    surfaces: ["bao"],
    packageId: "bao-constants",
  },
  {
    id: "uav.authz.arm-disarm",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    permission: "drone:arm",
    mcpTool: "drone.arm",
    legacyIds: ["drone:disarm"],
  },
  {
    id: "uav.authz.mission-mutate",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    permission: "drone:mission:upload",
    mcpTool: "drone.mission.upload",
  },
  {
    id: "uav.authz.offboard",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    permission: "drone:offboard:setpoint",
    mcpTool: "drone.offboard.setpoint",
  },
  {
    id: "uav.authz.emergency-stop",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    permission: "drone:emergency-stop",
    mcpTool: "drone.emergencyStop",
  },
  {
    id: "uav.authz.geofence-mutate",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.geofence.update",
  },
  {
    id: "uav.authz.rtk-inject",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.rtk.corrections",
  },
  {
    id: "uav.authz.logs-export",
    systemId: "uav-security",
    surfaces: ["api", "mcp"],
    permission: "drone:mission:export",
    mcpTool: "drone.logs.export",
  },
  { id: "uav.rate-limit.device-ops", systemId: "uav-security", surfaces: ["api"] },
  { id: "uav.audit.command-trail", systemId: "uav-security", surfaces: ["api", "fabric"] },
  { id: "uav.policy.preflight-gate", systemId: "uav-security", surfaces: ["bunbuddy", "api"] },
  {
    id: "uav.types.capability-id",
    systemId: "uav-types",
    surfaces: ["bao"],
    packageId: "bao-schemas",
  },
  {
    id: "uav.types.vehicle-capabilities",
    systemId: "uav-types",
    surfaces: ["bunbuddy"],
    packageId: "drone-bunbuddy",
  },
  { id: "uav.types.portfolio-system", systemId: "uav-types", surfaces: ["api", "bao"] },
  { id: "uav.types.mcp-parity", systemId: "uav-types", surfaces: ["mcp", "bao"] },
  {
    id: "uav.types.sdk-parity",
    systemId: "uav-types",
    surfaces: ["api", "bao"],
    packageId: "bao-sdk",
  },
  {
    id: "uav.types.mission-planner",
    systemId: "uav-types",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.missionPlanner.compile",
  },
  {
    id: "uav.types.realtime-v1",
    systemId: "uav-types",
    surfaces: ["api", "bao"],
    packageId: "bao-core",
  },
  {
    id: "uav.types.permissions-union",
    systemId: "uav-types",
    surfaces: ["bao"],
    packageId: "bao-shared",
  },
  {
    id: "uav.cutover.drone-capability-schema",
    systemId: "uav-types",
    surfaces: ["bao"],
    packageId: "bao-schemas",
  },
  {
    id: "uav.types.fabric-tools",
    systemId: "uav-types",
    surfaces: ["fabric"],
    packageId: "agentic-fabric-bao",
  },
  { id: "uav.error.result-envelope", systemId: "uav-errors", surfaces: ["api", "bunbuddy"] },
  { id: "uav.error.mcp-failure-shape", systemId: "uav-errors", surfaces: ["mcp"] },
  { id: "uav.error.bunbuddy-timeout", systemId: "uav-errors", surfaces: ["bunbuddy", "api"] },
  {
    id: "uav.error.connection-lost",
    systemId: "uav-errors",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.telemetry",
  },
  {
    id: "uav.error.mission-rejected",
    systemId: "uav-errors",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.mission.upload",
  },
  {
    id: "uav.error.offboard-stale",
    systemId: "uav-errors",
    surfaces: ["bunbuddy", "mcp"],
    mcpTool: "drone.offboard.setpoint",
  },
  {
    id: "uav.error.portfolio-partial",
    systemId: "uav-errors",
    surfaces: ["api"],
    apiRoute: `${API_PATHS.base}/drone/capabilities/portfolio`,
  },
  { id: "uav.telemetry.span-names", systemId: "uav-errors", surfaces: ["api"] },
  { id: "uav.metrics.counters", systemId: "uav-errors", surfaces: ["api"] },
  { id: "uav.error.no-fake-success", systemId: "uav-errors", surfaces: ["api", "fabric"] },
  {
    id: "uav.flight.arm",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "mcp", "api"],
    permission: "drone:arm",
    mcpTool: "drone.arm",
  },
  {
    id: "uav.flight.takeoff-land",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "mcp", "api"],
    permission: "drone:takeoff",
    mcpTool: "drone.takeoff",
  },
  {
    id: "uav.flight.rtl-hover",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "mcp", "api"],
    permission: "drone:rtl",
    mcpTool: "drone.rtl",
  },
  {
    id: "uav.flight.goto-move-velocity",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "api"],
    permission: "drone:goto",
  },
  {
    id: "uav.flight.mode-set",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "api"],
    permission: "drone:mode",
  },
  {
    id: "uav.mission.upload-start-pause",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "mcp"],
    mcpTool: "drone.mission.start",
  },
  {
    id: "uav.offboard.setpoint",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "mcp"],
    permission: "drone:offboard:setpoint",
    mcpTool: "drone.offboard.setpoint",
  },
  {
    id: "uav.sensor.snapshot",
    systemId: "uav-flight",
    surfaces: ["bunbuddy", "mcp"],
    mcpTool: "drone.capturePhoto",
  },
  { id: "uav.health.link", systemId: "uav-flight", surfaces: ["bunbuddy", "api"] },
  {
    id: "uav.sim.sitl-profile",
    systemId: "uav-flight",
    surfaces: ["bunbuddy"],
    packageId: "drone-bunbuddy",
  },
  { id: "uav.api.device-crud", systemId: "uav-api", surfaces: ["api"], apiRoute: API_PATHS.drone },
  {
    id: "uav.api.telemetry-stream",
    systemId: "uav-api",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.telemetry",
  },
  {
    id: "uav.api.geofence-rally",
    systemId: "uav-api",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.geofence.get",
  },
  {
    id: "uav.api.video-fusion",
    systemId: "uav-api",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.videoFusion.get",
  },
  {
    id: "uav.api.flight-logs",
    systemId: "uav-api",
    surfaces: ["api", "mcp"],
    mcpTool: "drone.logs.list",
  },
  { id: "uav.api.history-recorder", systemId: "uav-api", surfaces: ["api"] },
  {
    id: "uav.api.ownership-focus",
    systemId: "uav-api",
    surfaces: ["api"],
    apiRoute: API_PATHS.droneOwnership,
  },
  {
    id: "uav.api.training-snapshot",
    systemId: "uav-api",
    surfaces: ["api"],
    apiRoute: API_PATHS.droneTraining,
  },
  { id: "uav.api.scan", systemId: "uav-api", surfaces: ["api"] },
  { id: "uav.api.summary-status", systemId: "uav-api", surfaces: ["api"] },
  {
    id: "uav.mcp.connect-lifecycle",
    systemId: "uav-mcp",
    surfaces: ["mcp", "fabric"],
    mcpTool: "drone.connect",
  },
  {
    id: "uav.mcp.mission-planner",
    systemId: "uav-mcp",
    surfaces: ["mcp", "fabric"],
    mcpTool: "drone.missionPlanner.compile",
  },
  {
    id: "uav.mcp.geofence-mutate",
    systemId: "uav-mcp",
    surfaces: ["mcp"],
    mcpTool: "drone.geofence.update",
  },
  { id: "uav.mcp.fleet-handoff", systemId: "uav-mcp", surfaces: ["mcp", "api", "fabric"] },
  {
    id: "uav.mcp.portfolio-refresh",
    systemId: "uav-mcp",
    surfaces: ["mcp", "api"],
    mcpTool: "drone.capability.portfolio",
  },
  { id: "uav.mcp.perception-trigger", systemId: "uav-mcp", surfaces: ["mcp", "fabric"] },
  {
    id: "uav.mcp.training-deploy",
    systemId: "uav-mcp",
    surfaces: ["api", "fabric"],
    apiRoute: API_PATHS.droneTrainingDeploy,
  },
  {
    id: "uav.mcp.log-export",
    systemId: "uav-mcp",
    surfaces: ["mcp"],
    mcpTool: "drone.logs.export",
  },
  {
    id: "uav.mcp.video-fusion",
    systemId: "uav-mcp",
    surfaces: ["mcp"],
    mcpTool: "drone.videoFusion.update",
  },
  {
    id: "uav.mcp.emergency-stop",
    systemId: "uav-mcp",
    surfaces: ["mcp", "fabric"],
    mcpTool: "drone.emergencyStop",
  },
  {
    id: "uav.mission.compile",
    systemId: "uav-mission",
    surfaces: ["bao", "mcp"],
    packageId: "drone-mission-bao",
    mcpTool: "drone.missionPlanner.compile",
    legacyIds: ["drone.mission.compile"],
  },
  {
    id: "uav.mission.export.qgc",
    systemId: "uav-mission",
    surfaces: ["bao", "mcp"],
    packageId: "drone-mission-bao",
    mcpTool: "drone.missionPlanner.export",
  },
  {
    id: "uav.mission.export.mavlink-wpl",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-mission-bao",
  },
  {
    id: "uav.mission.export.dji-wpml",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-mission-bao",
  },
  {
    id: "uav.mission.export.geojson",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-mission-bao",
  },
  {
    id: "uav.mission.segment",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-mission-bao",
    legacyIds: ["drone.mission.segment"],
  },
  { id: "uav.mission.policy-eval", systemId: "uav-mission", surfaces: ["bunbuddy", "api"] },
  {
    id: "uav.schema.mavlink",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-schemas",
  },
  {
    id: "uav.schema.autopilot",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-schemas",
  },
  {
    id: "uav.mission.usd-export",
    systemId: "uav-mission",
    surfaces: ["bao"],
    packageId: "drone-mission-bao",
  },
  { id: "uav.fleet.run-create", systemId: "uav-fleet", surfaces: ["api", "baodown"] },
  { id: "uav.fleet.assignment", systemId: "uav-fleet", surfaces: ["api"] },
  { id: "uav.fleet.realtime-events", systemId: "uav-fleet", surfaces: ["api"] },
  { id: "uav.fleet.incident", systemId: "uav-fleet", surfaces: ["api"] },
  {
    id: "uav.perception.pipeline",
    systemId: "uav-fleet",
    surfaces: ["api", "baodown"],
    baodownNode: "integration.drone.perception",
  },
  {
    id: "uav.training.deploy",
    systemId: "uav-fleet",
    surfaces: ["api"],
    apiRoute: API_PATHS.droneTrainingDeploy,
  },
  {
    id: "uav.integration.baodown-compile",
    systemId: "uav-fleet",
    surfaces: ["baodown"],
    baodownNode: "integration.drone.missionCompile",
  },
  {
    id: "uav.integration.baodown-upload",
    systemId: "uav-fleet",
    surfaces: ["baodown"],
    baodownNode: "integration.drone.missionUpload",
  },
  { id: "uav.ws.reconnect", systemId: "uav-fleet", surfaces: ["api", "bunbuddy"] },
  {
    id: "uav.e2e.sitl-smoke",
    systemId: "uav-fleet",
    surfaces: ["bunbuddy"],
    packageId: "drone-bunbuddy",
  },
  { id: "uav.ui.portfolio-hub", systemId: "uav-ui", surfaces: ["api"] },
  { id: "uav.ui.device-control", systemId: "uav-ui", surfaces: ["api"] },
  { id: "uav.ui.capability-gates", systemId: "uav-ui", surfaces: ["api"] },
  { id: "uav.i18n.drone-strings", systemId: "uav-ui", surfaces: ["api"] },
  { id: "uav.a11y.control-keyboard", systemId: "uav-ui", surfaces: ["api"] },
  { id: "uav.a11y.live-regions", systemId: "uav-ui", surfaces: ["api"] },
  {
    id: "uav.docs.openAPI-sync",
    systemId: "uav-ui",
    surfaces: ["bao"],
    packageId: "bao-contracts",
  },
  { id: "uav.docs.package-readmes", systemId: "uav-ui", surfaces: ["bao"] },
  {
    id: "uav.validate.strict-gate",
    systemId: "uav-ui",
    surfaces: ["bao"],
    packageId: "bao-packages",
  },
  { id: "uav.judge.certify", systemId: "uav-ui", surfaces: ["fabric"] },
] as const;

function buildEntry(seed: CapabilitySeed): UavCapabilityEntry {
  return {
    id: seed.id,
    tier: UAV_PORTFOLIO_SYSTEM_IDS.indexOf(seed.systemId) + 1,
    systemId: seed.systemId,
    surfaces: [...seed.surfaces],
    ...(seed.permission ? { permission: seed.permission } : {}),
    ...(seed.mcpTool ? { mcpTool: seed.mcpTool } : {}),
    ...(seed.apiRoute ? { apiRoute: seed.apiRoute } : {}),
    ...(seed.packageId ? { packageId: seed.packageId } : {}),
    ...(seed.baodownNode ? { baodownNode: seed.baodownNode } : {}),
    ...(seed.legacyIds ? { legacyIds: [...seed.legacyIds] } : {}),
    readinessProbe: seed.mcpTool ?? seed.apiRoute ?? seed.id,
  };
}

export interface UavCapabilityEntry {
  id: string;
  tier: number;
  systemId: UavPortfolioSystemId;
  surfaces: UavCapabilitySurface[];
  permission?: string;
  mcpTool?: string;
  apiRoute?: string;
  packageId?: string;
  baodownNode?: string;
  legacyIds?: string[];
  readinessProbe: string;
}

export const UAV_CAPABILITY_REGISTRY: readonly UavCapabilityEntry[] = Object.freeze(
  CAPABILITY_SEEDS.map(buildEntry),
);

export const UAV_CAPABILITY_IDS = Object.freeze(
  UAV_CAPABILITY_REGISTRY.map((entry) => entry.id),
) as readonly string[];

export type UavCapabilityId = (typeof UAV_CAPABILITY_IDS)[number];

const UAV_CAPABILITY_ID_SET = new Set<string>(UAV_CAPABILITY_IDS);

export function isUavCapabilityId(value: string): value is UavCapabilityId {
  return UAV_CAPABILITY_ID_SET.has(value);
}

export const UAV_CAPABILITY_COUNT = UAV_CAPABILITY_REGISTRY.length;

if (UAV_CAPABILITY_ID_SET.size !== UAV_CAPABILITY_COUNT) {
  throw new Error("UAV capability registry contains duplicate ids");
}
if (UAV_CAPABILITY_COUNT !== 100) {
  throw new Error(
    `UAV capability registry must contain 100 ids; got ${String(UAV_CAPABILITY_COUNT)}`,
  );
}

export const UAV_MCP_TOOL_NAMES = Object.freeze(
  UAV_CAPABILITY_REGISTRY.map((entry) => entry.mcpTool).filter((name): name is string =>
    Boolean(name),
  ),
);

export const DRONE_HARDWARE_MCP_TOOL_NAMES = Object.freeze([
  "drone.connect",
  "drone.disconnect",
  "drone.arm",
  "drone.disarm",
  "drone.takeoff",
  "drone.land",
  "drone.rtl",
  "drone.hover",
  "drone.emergencyStop",
  "drone.capturePhoto",
  "drone.startRecording",
  "drone.stopRecording",
  "drone.video",
  "drone.telemetry",
  "drone.geofence.get",
  "drone.geofence.update",
  "drone.geofence.clear",
  "drone.rally.get",
  "drone.rally.update",
  "drone.rally.clear",
  "drone.rtk.status",
  "drone.rtk.corrections",
  "drone.offboard.status",
  "drone.offboard.start",
  "drone.offboard.stop",
  "drone.offboard.setpoint",
  "drone.missionPlanner.compile",
  "drone.missionPlanner.export",
  "drone.mission.upload",
  "drone.mission.start",
  "drone.mission.pause",
  "drone.mission.resume",
  "drone.videoFusion.get",
  "drone.videoFusion.update",
  "drone.logs.list",
  "drone.logs.start",
  "drone.logs.stop",
  "drone.logs.export",
  "drone.capability.portfolio",
]);

const SYSTEM_LABELS: Record<
  UavPortfolioSystemId,
  { label: string; description: string; owner: string; responsibility: string }
> = {
  "uav-registry": {
    label: "UAV registry",
    description: "Canonical capability catalog, validators, and .bao descriptors",
    owner: "architecture",
    responsibility: "SSOT registry and package consumption",
  },
  "uav-security": {
    label: "UAV security",
    description: "Authorization, rate limits, audit, and preflight policy",
    owner: "security",
    responsibility: "Control-plane gates on UAV operations",
  },
  "uav-types": {
    label: "UAV types",
    description: "TypeBox boundaries and MCP/SDK/permission parity",
    owner: "type-safety",
    responsibility: "Strict contracts at integration boundaries",
  },
  "uav-errors": {
    label: "UAV errors",
    description: "Result envelopes, telemetry spans, and honest degraded states",
    owner: "error-handling",
    responsibility: "Failure surfaces without swallowed errors",
  },
  "uav-flight": {
    label: "UAV flight",
    description: "Vehicle protocol truth in drone-bunbuddy drivers",
    owner: "architecture",
    responsibility: "MAVLink/Tello/simulation command paths",
  },
  "uav-api": {
    label: "UAV API",
    description: "bao-runtime drone REST, realtime, and ownership APIs",
    owner: "architecture",
    responsibility: "HTTP control plane for UAV devices",
  },
  "uav-mcp": {
    label: "UAV MCP",
    description: "Hardware MCP tools and agentic-fabric bindings",
    owner: "architecture",
    responsibility: "Agent tool-runs aligned to registry",
  },
  "uav-mission": {
    label: "UAV mission",
    description: "Mission planner exports and drone-schemas packages",
    owner: "architecture",
    responsibility: "Mission compile/export schema consumption",
  },
  "uav-fleet": {
    label: "UAV fleet",
    description: "Multi-UAV fleet, perception, BaoDown, and SITL smoke",
    owner: "test-verification",
    responsibility: "Orchestration and integration E2E",
  },
  "uav-ui": {
    label: "UAV UI",
    description: "Integration hub, devices, i18n, a11y, and documentation gates",
    owner: "ui-ux",
    responsibility: "Enterprise SSR surfaces wired to readiness",
  },
};

export interface DroneCapabilityPortfolioSystemSeed {
  id: string;
  enabled: boolean;
  label: string;
  description: string;
  owner: string;
  responsibility: string;
  segmentIds: string[];
  domainIds: string[];
  capabilityIds: string[];
  bunbuddyKinds: string[];
  libraryCategories: string[];
  endpoints: string[];
  featureKeys: string[];
  policyKeys: string[];
  featureMode: "any" | "all";
  mcpTools: string[];
  tags: string[];
}

export const DRONE_CAPABILITY_PORTFOLIO_BOUNDS = {
  cacheTtlMs: { min: 60_000, max: 3_600_000 },
  idempotencyTtlMs: { min: 60_000, max: 3_600_000 },
  job: {
    singletonSeconds: { min: 30, max: 600 },
    scheduleMs: { min: 60_000, max: 3_600_000 },
  },
} as const;

export function listUavCapabilitiesForSystem(
  systemId: UavPortfolioSystemId,
): readonly UavCapabilityEntry[] {
  return UAV_CAPABILITY_REGISTRY.filter((entry) => entry.systemId === systemId);
}

export function getUavCapabilityEntry(id: string): UavCapabilityEntry | undefined {
  return UAV_CAPABILITY_REGISTRY.find((entry) => entry.id === id);
}

export function buildDroneCapabilityPortfolioSystems(): DroneCapabilityPortfolioSystemSeed[] {
  return UAV_PORTFOLIO_SYSTEM_IDS.map((systemId) => {
    const meta = SYSTEM_LABELS[systemId];
    const capabilities = listUavCapabilitiesForSystem(systemId);
    const mcpTools = Array.from(
      new Set(
        capabilities
          .map((entry) => entry.mcpTool)
          .filter((tool): tool is string => typeof tool === "string" && tool.length > 0),
      ),
    );
    const endpoints = Array.from(
      new Set(
        capabilities
          .map((entry) => entry.apiRoute)
          .filter((route): route is string => typeof route === "string" && route.length > 0),
      ),
    );
    if (endpoints.length === 0) {
      endpoints.push(`${API_PATHS.base}/drone/capabilities/portfolio`);
    }
    return {
      id: systemId,
      enabled: true,
      label: meta.label,
      description: meta.description,
      owner: meta.owner,
      responsibility: meta.responsibility,
      segmentIds: ["automation"],
      domainIds: ["drone", "hardware", "mcp"],
      capabilityIds: capabilities.map((entry) => entry.id),
      bunbuddyKinds: ["drone"],
      libraryCategories: ["drone", "hardware", "mcp"],
      endpoints,
      featureKeys: [],
      policyKeys: ["drone.policy"],
      featureMode: "any",
      mcpTools: mcpTools.length > 0 ? mcpTools : ["drone.capability.portfolio"],
      tags: ["uav", systemId],
    };
  });
}

export const DRONE_CAPABILITY_PORTFOLIO_DEFAULTS = {
  enabled: true,
  cacheTtlMs: 300_000,
  idempotencyTtlMs: 600_000,
  bounds: DRONE_CAPABILITY_PORTFOLIO_BOUNDS,
  job: {
    enabled: true,
    singletonSeconds: 60,
    scheduleMs: 300_000,
  },
  systems: buildDroneCapabilityPortfolioSystems(),
} as const;

export function listPackageCapabilitiesForPackage(packageId: string): readonly string[] {
  return UAV_CAPABILITY_REGISTRY.filter((entry) => entry.packageId === packageId).flatMap(
    (entry) => [entry.id, ...(entry.legacyIds ?? [])],
  );
}

export const UavCapabilityEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    tier: TypeExports.Integer({ minimum: 1, maximum: 10 }),
    systemId: stringEnum(UAV_PORTFOLIO_SYSTEM_IDS, { description: "Portfolio system bucket" }),
    surfaces: TypeExports.Array(UavCapabilitySurfaceSchema, { minItems: 1 }),
    permission: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    mcpTool: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    apiRoute: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    packageId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    baodownNode: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    legacyIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    readinessProbe: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);
