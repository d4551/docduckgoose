/**
 * Defines shared, end-to-end types for the integration context snapshot used by
 * AI, XR, hardware, and automation surfaces.
 *
 * @packageDocumentation
 */

import type { BaoRuntimeSnapshot } from "@baohaus/bao-schemas/bao-runtime.schemas";
import type { CapabilityOwnershipError } from "@baohaus/bao-schemas/capability-ownership/errors";
import type { CapabilityOwnershipFocusMap } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { AiGatewayDeploymentHint } from "@baohaus/bao-types/ai-gateway";
import type { DroneSummarySnapshot } from "@baohaus/bao-types/drone-summary";
import type { HardwareIntegrationSummary } from "@baohaus/bao-types/hardware-integration";
import type {
  McpIntegrationEndpointGroup,
  McpResourceDefinition,
  McpResourceTemplateDefinition,
} from "@baohaus/bao-types/mcp";
import type { OnnxIntegrationSummary } from "@baohaus/bao-types/onnx-integration";
import type { PipelineIntegrationSummary } from "@baohaus/bao-types/pipeline-integration";
import type { RpaIntegrationSummary } from "@baohaus/bao-types/rpa-integration";
import type { RpaTrainingCohesionSummary } from "@baohaus/bao-types/rpa-training-cohesion";
import type { ThreeIntegrationSummary } from "@baohaus/bao-types/three-integration";
import type { TrainingIntegrationSummary } from "@baohaus/bao-types/training-integration";
import type { UserSummary } from "@baohaus/bao-types/users";
import type { BaoDownPgNotifyStatus } from "../schemas/baodown/baodown-pg-notify.schemas";
import type { BunBuddyRoutingStatusResponse } from "../schemas/bunbuddy-routing.schemas";
import type { DriverRegistryScope as SchemaDriverRegistryScope } from "../schemas/driver-registry.schemas";
import type {
  ChatIntegrationOwnershipContext,
  ChatIntegrationOwnershipSummary,
} from "../schemas/integration-ownership.schemas";
import type {
  LibraryCategory,
  LibrarySource,
  LibraryStatus,
} from "../schemas/library-registry.schemas";
import type {
  ServerPluginManifest,
  ServerPluginRegistryItem,
} from "../schemas/plugin-contract.schemas";
import type { AiProviderKeyResolved } from "./ai-providers";
import type {
  AnnotationAlignmentError,
  AnnotationAlignmentProvider,
  AnnotationAlignmentSource,
  AnnotationAlignmentSummary,
} from "./annotation-alignment";
import type { BunBuddyCapabilityGraph, BunBuddyCapabilityRole } from "./bunbuddy-capabilities";
import type { CapabilityEntry } from "./capability-registry";
import type { RoboticsSummaryResponse } from "./robotics-summary";
import type { UsdIntegrationSummary } from "./usd-integration";
import type { XrRuntimeConfig } from "./xr";
import type { XrApiCapabilities } from "./xr-capabilities";

/** Ownership context and summary types for integration snapshot payloads. */
export type { ChatIntegrationOwnershipContext, ChatIntegrationOwnershipSummary };

/**
 * Annotation alignment integration context payload.
 */
export interface ChatIntegrationAnnotationsContext {
  endpoints: {
    base: string;
    map: string;
    refresh: string;
  };
  summary: AnnotationAlignmentSummary;
  sources: AnnotationAlignmentSource[];
  providers: AnnotationAlignmentProvider[];
  ownership?: CapabilityOwnershipFocusMap;
  ownershipErrors?: CapabilityOwnershipError[];
  ownershipTimestamp?: string;
  timestamp: string;
  errors?: AnnotationAlignmentError[];
}

/**
 * Annotation alignment summary payload for integration context summary.
 */
export interface ChatIntegrationAnnotationsSummary {
  summary: AnnotationAlignmentSummary;
  endpoint: string;
  refreshEndpoint: string;
  updatedAt: string;
}

/**
 * Re-export of driver registry scope from the schema layer.
 */
export type DriverRegistryScope = SchemaDriverRegistryScope;

/**
 * Summary of pipeline definitions for integration context.
 */
export interface PipelineDefinitionSummary {
  id: string;
  name: string;
  version: string;
  tags: string[];
}

/**
 * AI provider summary included in integration context.
 */
export interface ChatIntegrationProviderSummary {
  configured: boolean;
  enabled?: boolean;
  model?: string | null;
  endpoint?: string | null;
  mode?: string | null;
  features: {
    chat: boolean;
    chatStream: boolean;
    embeddings: boolean;
    images: boolean;
    models: boolean;
    training: boolean;
    download: boolean;
  };
}

/**
 * API endpoint paths exposed by the AI subsystem for integration consumers.
 */
export interface ChatIntegrationAiEndpoints {
  base: string;
  chat: string;
  models: string;
  training: string;
  onnx: string;
  huggingface: string;
}

/**
 * Full AI subsystem context including provider status, deployment mode, and offline state.
 */
export interface ChatIntegrationAiContext {
  endpoints: ChatIntegrationAiEndpoints;
  deployment: AiGatewayDeploymentHint;
  orderedProviders: AiProviderKeyResolved[];
  offline: {
    enabled: boolean;
    reason: string | null;
  };
  providers: Record<AiProviderKeyResolved, ChatIntegrationProviderSummary>;
}

/**
 * User directory integration context payload.
 */
export interface ChatIntegrationUserContext {
  endpoints: {
    base: string;
    list: string;
    count: string;
    byId: string;
    roles: string;
    summary: string;
  };
  summary: UserSummary;
}

/**
 * Robotics integration context payload.
 */
export interface ChatIntegrationRoboticsContext {
  enabled: boolean;
  endpoints: {
    base: string;
    summary: string;
    status: string;
    capabilities: string;
    metrics: string;
    devices: string;
    scan: string;
    policy: {
      check: string;
    };
    motion: {
      plan: string;
    };
    localization: {
      status: string;
      control: string;
    };
    telemetry: {
      capture: string;
      list: string;
      replay: string;
    };
    missions: {
      create: string;
      list: string;
      status: string;
      cancel: string;
    };
    ros2: {
      graph: string;
      topics: string;
      services: string;
      actions: string;
      nodes: string;
      params: string;
      publish: string;
      service: string;
      action: string;
      paramsQuery: string;
      paramsSet: string;
    };
  };
  snapshot: RoboticsSummaryResponse["data"] | null;
  errors: string[];
}

/**
 * Drone integration context payload.
 */
export interface ChatIntegrationDroneContext {
  enabled: boolean;
  endpoints: {
    base: string;
    status: string;
    capabilities: string;
    devices: string;
    scan: string;
    realtime: string;
    bunbuddyCapabilities: string;
    history: {
      events: string;
      deviceEvents: string;
      deviceTelemetry: string;
    };
    controls: {
      connect: string;
      disconnect: string;
      arm: string;
      disarm: string;
      takeoff: string;
      land: string;
      rtl: string;
      hover: string;
      move: string;
      goto: string;
      velocity: string;
      gimbal: string;
      mode: string;
      emergencyStop: string;
      mission: string;
      missionStart: string;
      missionPause: string;
      missionResume: string;
      cameraPhoto: string;
      cameraRecordStart: string;
      cameraRecordStop: string;
    };
  };
  snapshot: DroneSummarySnapshot | null;
  errors: string[];
}

/**
 * MCP summary included in integration context.
 */
export interface ChatIntegrationMcpEndpoints {
  base: string;
  hardware: McpIntegrationEndpointGroup;
  rpa: McpIntegrationEndpointGroup;
}

/**
 * Full MCP subsystem context including resource counts, host distribution, and templates.
 */
export interface ChatIntegrationMcpContext {
  endpoints: ChatIntegrationMcpEndpoints;
  total: number;
  hosts: Record<string, number>;
  resources: McpResourceDefinition[];
  templates: McpResourceTemplateDefinition[];
}

/**
 * Driver registry sample entry.
 */
export interface ChatIntegrationDriverSample {
  key: string;
  packageName: string;
  scope: DriverRegistryScope;
}

/**
 * Driver registry summary included in integration context.
 */
export interface ChatIntegrationDriversContext {
  endpoints: {
    catalog: string;
    deviceDrivers: string;
    install: string;
  };
  installAllowed: boolean;
  installBlockedReason: string | null;
  count: number;
  scopeCounts: Record<DriverRegistryScope, number>;
  sample: ChatIntegrationDriverSample[];
  timestamp: string;
}

/**
 * Individual plugin descriptor with extensible metadata for integration context consumers.
 */
export type ChatIntegrationPluginDescriptor = ServerPluginRegistryItem & Record<string, unknown>;

/**
 * Aggregate plugin registry summary including manifest version and registered API plugins.
 */
export interface ChatIntegrationPluginSummary {
  updatedAt: string;
  count: number;
  manifest: ServerPluginManifest;
  apiPlugins: ChatIntegrationPluginDescriptor[];
}

/**
 * Capability dependency summary included in integration context.
 */
export interface ChatIntegrationCapabilityDependencySummary {
  id: string;
  required: boolean;
  missing: boolean;
  status: CapabilityEntry["status"] | null;
  responsibility: string | null;
  kind: CapabilityEntry["kind"] | null;
}

/**
 * Capability registry summary included in integration context.
 */
export interface ChatIntegrationCapabilitySummary {
  stats: {
    total: number;
    plugins: number;
    bunbuddies: number;
    healthy: number;
    degraded: number;
    unavailable: number;
    version: number;
    lastDiscoveryAt: string | null;
  };
  dependencyStats: {
    total: number;
    required: number;
    optional: number;
    missing: number;
  };
  missingDependencies: string[];
  sample: Array<{
    id: string;
    name: string;
    kind: CapabilityEntry["kind"];
    status: CapabilityEntry["status"];
    owner: string;
    responsibility: string;
    version: string;
    bunbuddyKind?: string | null;
    dependencies: ChatIntegrationCapabilityDependencySummary[];
  }>;
}

/**
 * Library entry summary included in integration context.
 */
export interface ChatIntegrationLibraryEntrySummary {
  name: string;
  version: string;
  source: LibrarySource;
  runtime: string;
  status: LibraryStatus;
  bunbuddyKind?: string | null;
  endpoints: string[];
}

/**
 * Library coverage summary per category.
 */
export interface ChatIntegrationLibraryCoverageCategorySummary {
  label: string;
  total: number;
  missing: number;
  missingLibraries: string[];
  sources: Record<LibrarySource, number>;
}

/**
 * Library coverage summary for integration context.
 */
export interface ChatIntegrationLibraryCoverageSummary {
  categories: Record<LibraryCategory, ChatIntegrationLibraryCoverageCategorySummary>;
}

/**
 * Library registry summary included in integration context.
 */
export interface ChatIntegrationLibrarySummary {
  observedAt: string;
  total: number;
  sources: Record<LibrarySource, number>;
  runtimes: Record<string, number>;
  categories: {
    ai: string[];
    training: string[];
    hardware: string[];
    drone: string[];
    robotics: string[];
    xr: string[];
    usd: string[];
    mcp: string[];
    spa: string[];
  };
  coverage: ChatIntegrationLibraryCoverageSummary;
  sample: ChatIntegrationLibraryEntrySummary[];
}

/**
 * BunBuddy handoff summary for role-to-role coordination.
 */
export interface BunBuddyCapabilityHandoffPairSummary {
  from: BunBuddyCapabilityRole;
  to: BunBuddyCapabilityRole;
  total: number;
  active: number;
}

/**
 * Aggregated bunbuddy handoff summary.
 */
export interface BunBuddyCapabilityHandoffSummary {
  total: number;
  active: number;
  blocked: number;
  pairs: BunBuddyCapabilityHandoffPairSummary[];
}

/**
 * BunBuddy graph summary included in integration context.
 */
export interface ChatIntegrationBunBuddyGraphContext {
  endpoints: {
    graph: string;
    capabilities: string;
  };
  graph: BunBuddyCapabilityGraph;
  handoffs: BunBuddyCapabilityHandoffSummary;
  /** Known collaboration chain IDs (e.g. ble:basler:vision) for AI tooling. */
  knownChains?: Record<string, string>;
}

/**
 * BunBuddy routing integration context payload.
 */
export interface ChatIntegrationBunBuddyRoutingContext {
  endpoints: {
    status: string;
    refresh: string;
  };
  snapshot: BunBuddyRoutingStatusResponse;
}

/**
 * BaoDown integration endpoints exposed in system integration context.
 */
export interface ChatIntegrationBaoDownEndpoints {
  /** Canonical BaoDown integration snapshot endpoint. */
  integration: string;
}

/**
 * BaoDown cross-replica wakeup (PG LISTEN/NOTIFY) context included in system integration payloads.
 */
export interface ChatIntegrationBaoDownContext {
  endpoints: ChatIntegrationBaoDownEndpoints;
  pgNotify: BaoDownPgNotifyStatus;
}

/**
 * BaoControlPlane runtime integration context payload.
 */
export interface ChatIntegrationBaoRuntimeContext {
  endpoints: {
    status: string;
    refresh: string;
    ensure: string;
  };
  snapshot: BaoRuntimeSnapshot;
}

/**
 * Capability route summary included in integration context.
 */
export interface ChatIntegrationRouteCapabilitySummary {
  id: string;
  responsibility: string;
  kind: CapabilityEntry["kind"];
  ownershipGroupId?: string;
  ownershipDomainId?: string;
  endpointCount: number;
  endpoints: string[];
  eventCount: number;
  events: string[];
}

/**
 * Route catalog summary included in integration context.
 */
export interface ChatIntegrationRouteSummary {
  total: number;
  eventTotal: number;
  endpoints: string[];
  events: string[];
  capabilities: ChatIntegrationRouteCapabilitySummary[];
}

/**
 * API documentation summary (Happydumpling/OpenAPI) included in integration context.
 */
export interface ChatIntegrationDocsSummary {
  enabled: boolean;
  path: string;
  specPath: string;
  specUrl: string;
  viewerUrl: string;
  title?: string;
  description: string;
  serverUrl: string;
}

/**
 * Full integration context snapshot aggregating all subsystem states for AI chat generation.
 */
export interface ChatIntegrationContext {
  timestamp: string;
  /**
   * Optional metadata for consumers that need schema/version or request tracing.
   */
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

/**
 * Lightweight summary of the integration context for bandwidth-sensitive consumers.
 */
export interface ChatIntegrationContextSummary {
  timestamp: string;
  /**
   * Optional metadata for consumers that need schema/version or request tracing.
   */
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

/**
 * Optional metadata for integration context payloads.
 */
export interface IntegrationContextMeta {
  /**
   * Schema version of the integration context payload.
   */
  schemaVersion: string;
  /**
   * ISO timestamp for when the context was generated.
   */
  generatedAt: string;
  /**
   * Optional correlation id for tracing across services.
   */
  correlationId?: string;
  /**
   * Optional source label for the producer of this context.
   */
  source?: string;
}
