/**
 * Integration context summary and full context types.
 * Extracted from integration-context.ts to keep module size under 400 lines.
 */

import type { BaoRuntimeSnapshot } from "@baohaus/bao-schemas/bao-runtime.schemas";
import type { BaoDownPgNotifyStatus } from "@baohaus/bao-schemas/baodown/baodown-pg-notify.schemas";
import type { BunBuddyRoutingStatusResponse } from "@baohaus/bao-schemas/bunbuddy-routing.schemas";
import type {
  ChatIntegrationOwnershipContext,
  ChatIntegrationOwnershipSummary,
} from "@baohaus/bao-schemas/integration-ownership.schemas";
import type { LibraryCategory, LibrarySource } from "@baohaus/bao-schemas/library-registry.schemas";
import type { AiGatewayDeploymentHint } from "./ai-gateway.ts";
import type { AiProviderKeyResolved } from "./ai-providers.ts";
import type { HardwareIntegrationSummary } from "./hardware-integration.ts";
import type {
  ChatIntegrationAiContext,
  ChatIntegrationAnnotationsContext,
  ChatIntegrationAnnotationsSummary,
  ChatIntegrationBaoDownContext,
  ChatIntegrationBaoRuntimeContext,
  ChatIntegrationBunBuddyGraphContext,
  ChatIntegrationBunBuddyRoutingContext,
  ChatIntegrationCapabilitySummary,
  ChatIntegrationDocsSummary,
  ChatIntegrationDriversContext,
  ChatIntegrationDroneContext,
  ChatIntegrationLibrarySummary,
  ChatIntegrationMcpContext,
  ChatIntegrationPluginSummary,
  ChatIntegrationRoboticsContext,
  ChatIntegrationRouteSummary,
  ChatIntegrationUserContext,
  DriverRegistryScope,
  IntegrationContextMeta,
  PipelineDefinitionSummary,
} from "./integration-context.ts";
import type { OnnxIntegrationSummary } from "./onnx-integration.ts";
import type { PipelineIntegrationSummary } from "./pipeline-integration.ts";
import type { RpaIntegrationSummary } from "./rpa-integration.ts";
import type { RpaTrainingCohesionSummary } from "./rpa-training-cohesion.ts";
import type { ThreeIntegrationSummary } from "./three-integration.ts";
import type { TrainingIntegrationSummary } from "./training-integration.ts";
import type { UsdIntegrationSummary } from "./usd-integration.ts";
import type { XrRuntimeConfig } from "./xr.ts";
import type { XrApiCapabilities } from "./xr-capabilities.ts";

export interface ChatIntegrationContext {
  timestamp: string;
  meta?: IntegrationContextMeta;
  ai?: ChatIntegrationAiContext;
  users?: ChatIntegrationUserContext;
  robotics?: ChatIntegrationRoboticsContext;
  drone?: ChatIntegrationDroneContext;
  pipelines?: PipelineIntegrationSummary & {
    definitions: PipelineDefinitionSummary[];
    stats: PipelineIntegrationSummary["stats"];
  };
  hardware?: HardwareIntegrationSummary;
  rpa?: RpaIntegrationSummary;
  rpaTraining?: RpaTrainingCohesionSummary;
  usd?: UsdIntegrationSummary;
  three?: ThreeIntegrationSummary;
  xr?: XrApiCapabilities;
  onnx?: OnnxIntegrationSummary;
  training?: TrainingIntegrationSummary;
  annotations?: ChatIntegrationAnnotationsContext;
  libraries?: ChatIntegrationLibrarySummary;
  docs?: ChatIntegrationDocsSummary;
  ownership?: ChatIntegrationOwnershipContext;
  routes?: ChatIntegrationRouteSummary;
  mcp?: ChatIntegrationMcpContext;
  drivers?: ChatIntegrationDriversContext;
  plugins?: ChatIntegrationPluginSummary;
  capabilities?: ChatIntegrationCapabilitySummary;
  bunbuddyGraph?: ChatIntegrationBunBuddyGraphContext;
  bunbuddyRouting?: ChatIntegrationBunBuddyRoutingContext;
  baodown?: ChatIntegrationBaoDownContext;
  baoRuntime?: ChatIntegrationBaoRuntimeContext;
  errors?: string[];
}

export interface ChatIntegrationContextSummary {
  timestamp: string;
  meta?: IntegrationContextMeta;
  ai?: {
    deployment: AiGatewayDeploymentHint;
    orderedProviders: AiProviderKeyResolved[];
    offline: { enabled: boolean; reason: string | null };
  };
  annotations?: ChatIntegrationAnnotationsSummary;
  users?: {
    total: number;
    active: number;
    inactive: number;
    verified: number;
    unverified: number;
    activeSessions: number;
    ssoProviders: number;
    ssoDomains: number;
    roleCount: number;
    endpoint: string;
    lastCreatedAt: string | null;
    updatedAt: string;
  };
  robotics?: {
    status: string | null;
    protocolCount: number;
    connectedRobots: number | null;
    totalRobots: number | null;
    activeRobots: number | null;
    pendingRequests: number | null;
    cacheAgeMs: number | null;
    lastScanTime: string | null;
    deviceCount: number;
    endpoint: string;
  };
  drone?: {
    status: string | null;
    protocolCount: number;
    deviceCount: number;
    connectedDevices: number;
    activeVehicles: number;
    pendingRequests: number | null;
    pendingWebSockets: number | null;
    lastScanTime: string | null;
    baseUrl: string | null;
    realtimeChannels: number;
    historyBufferTelemetry: number;
    historyBufferEvents: number;
    endpoint: string;
  };
  pipelines?: {
    enabled: boolean;
    definitionCount: number;
    endpoint: string;
    runCount: number;
    activeRunCount: number;
    status: PipelineIntegrationSummary["stats"]["status"];
    tags: string[];
    tagCount: number;
    flowCount: number;
    bunbuddyKindCount: number;
    handlerCount: number;
    requiredFeatureCount: number;
    cleanupResourceCount: number;
    handoffReadyCount: number;
    handoffBlockedCount: number;
    handoffBlockedSample: string[];
  };
  hardware?: { enabled: boolean; endpoint: string; mcpEndpoint: string };
  rpa?: {
    enabled?: boolean;
    endpoint: string;
    toolCount: number;
    resourceCount: number;
    bunbuddyHealth?: string;
    workflowCount?: number;
    executionCount?: number;
    templateCount?: number;
  };
  rpaTraining?: RpaTrainingCohesionSummary;
  usd?: { enabled: boolean; endpoint: string };
  three?: { enabled: boolean; pipelineCount: number; tags: string[] };
  xr?: {
    status: XrApiCapabilities["status"];
    runtimeDefaults: Pick<XrRuntimeConfig, "defaultMode" | "defaultDeviceClass">;
    endpointCount: number;
  };
  onnx?: {
    enabled: boolean;
    endpoint: string;
    modelCount: number;
    providers: string[];
  };
  training?: {
    enabled: boolean;
    endpoint: string;
    providerCount: number;
    offlineReady: boolean;
  };
  libraries?: {
    total: number;
    sources: Record<LibrarySource, number>;
    runtimes: Record<string, number>;
    categories: ChatIntegrationLibrarySummary["categories"];
    missing: {
      total: number;
      byCategory: Record<LibraryCategory, number>;
    };
    sample: string[];
  };
  docs?: ChatIntegrationDocsSummary;
  ownership?: ChatIntegrationOwnershipSummary;
  routes?: {
    total: number;
    eventTotal: number;
    endpoints: string[];
    events: string[];
    capabilitySample: string[];
  };
  mcp?: { total: number; hosts: Record<string, number>; templates: number };
  drivers?: {
    count: number;
    installAllowed: boolean;
    installBlockedReason: string | null;
    endpoint: string;
    scopeCounts: Record<DriverRegistryScope, number>;
    sample: string[];
    updatedAt: string;
  };
  plugins?: {
    apiCount: number;
    enabledCount: number;
    contractMappedCount: number;
    trustedCount: number;
    interfaceCompatibleCount: number;
    capabilityCompatibleCount: number;
    groupCount: number;
    manifestVersion: string;
    registryHash: string;
    sample: string[];
  };
  capabilities?: {
    total: number;
    plugins: number;
    bunbuddies: number;
    healthy: number;
    degraded: number;
    unavailable: number;
    version: number;
    lastDiscoveryAt: string | null;
    dependencyCount: number;
    requiredDependencyCount: number;
    optionalDependencyCount: number;
    missingDependencyCount: number;
    missingDependencies: string[];
    sample: string[];
  };
  bunbuddyGraph?: {
    nodeCount: number;
    edgeCount: number;
    activeEdges: number;
    blockedEdges: number;
    missingRequirementCount: number;
    missingRequirementSample: string[];
  };
  bunbuddyRouting?: {
    mode: BunBuddyRoutingStatusResponse["mode"];
    runtime: BunBuddyRoutingStatusResponse["runtime"];
    hostGateway: string;
    hostCandidateCount: number;
    planCount: number;
    lastUpdated: string;
  };
  baodown?: {
    endpoint: string;
    pgNotify: BaoDownPgNotifyStatus;
  };
  baoRuntime?: {
    status: BaoRuntimeSnapshot["status"];
    kubeReachable: boolean;
    inCluster: boolean;
    releaseStatus: string | null;
    packageInstalled: boolean;
    gitopsSynced: boolean | null;
    bunbuddyFleetReady: boolean;
    registryReachable: boolean;
    secretsCompliant: boolean;
    actionCount: number;
    failureHint: string | null;
    endpoint: string;
  };
  errors?: string[];
}
