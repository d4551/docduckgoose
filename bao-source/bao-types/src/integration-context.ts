/**
 * Integration context snapshot types for AI, XR, hardware, and automation.
 * @baohaus/bao-types/integration-context
 */

import type { BaoRuntimeSnapshot } from "@baohaus/bao-schemas/bao-runtime.schemas";
import type { BaoDownPgNotifyStatus } from "@baohaus/bao-schemas/baodown/baodown-pg-notify.schemas";
import type { BunBuddyRoutingStatusResponse } from "@baohaus/bao-schemas/bunbuddy-routing.schemas";
import type {
  CapabilityOwnershipError,
  CapabilityOwnershipFocusMap,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import type { DriverRegistryScope as SchemaDriverRegistryScope } from "@baohaus/bao-schemas/driver-registry.schemas";
import type {
  ChatIntegrationOwnershipContext,
  ChatIntegrationOwnershipSummary,
} from "@baohaus/bao-schemas/integration-ownership.schemas";
import type {
  LibraryCategory,
  LibrarySource,
  LibraryStatus,
} from "@baohaus/bao-schemas/library-registry.schemas";
import type {
  ServerPluginManifest,
  ServerPluginRegistryItem,
} from "@baohaus/bao-schemas/plugin-contract.schemas";
import type { AiGatewayDeploymentHint } from "./ai-gateway.ts";
import type { AiProviderKeyResolved } from "./ai-providers.ts";
import type {
  AnnotationAlignmentError,
  AnnotationAlignmentProvider,
  AnnotationAlignmentSource,
  AnnotationAlignmentSummary,
} from "./annotation-alignment.ts";
import type { BunBuddyCapabilityGraph, BunBuddyCapabilityRole } from "./bunbuddy-capabilities.ts";
import type { CapabilityEntry } from "./capability-registry.ts";
import type { DroneSummarySnapshot } from "./drone-summary.ts";
import type {
  McpIntegrationEndpointGroup,
  McpResourceDefinition,
  McpResourceTemplateDefinition,
} from "./mcp.ts";
import type { RoboticsSummaryResponse } from "./robotics-summary.ts";

export type { ChatIntegrationOwnershipContext, ChatIntegrationOwnershipSummary };

export interface ChatIntegrationAnnotationsContext {
  endpoints: { base: string; map: string; refresh: string };
  summary: AnnotationAlignmentSummary;
  sources: AnnotationAlignmentSource[];
  providers: AnnotationAlignmentProvider[];
  ownership?: CapabilityOwnershipFocusMap;
  ownershipErrors?: CapabilityOwnershipError[];
  ownershipTimestamp?: string;
  timestamp: string;
  errors?: AnnotationAlignmentError[];
}

export interface ChatIntegrationAnnotationsSummary {
  summary: AnnotationAlignmentSummary;
  endpoint: string;
  refreshEndpoint: string;
  updatedAt: string;
}

export type DriverRegistryScope = SchemaDriverRegistryScope;

export interface PipelineDefinitionSummary {
  id: string;
  name: string;
  version: string;
  tags: string[];
}

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

export interface ChatIntegrationAiEndpoints {
  base: string;
  chat: string;
  models: string;
  training: string;
  onnx: string;
  huggingface: string;
}

export interface ChatIntegrationAiContext {
  endpoints: ChatIntegrationAiEndpoints;
  deployment: AiGatewayDeploymentHint;
  orderedProviders: AiProviderKeyResolved[];
  offline: { enabled: boolean; reason: string | null };
  providers: Record<AiProviderKeyResolved, ChatIntegrationProviderSummary>;
}

export interface ChatIntegrationUserContext {
  endpoints: {
    base: string;
    list: string;
    count: string;
    byId: string;
    roles: string;
    summary: string;
  };
  summary: import("./users.ts").UserSummary;
}

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
    policy: { check: string };
    motion: { plan: string };
    localization: { status: string; control: string };
    telemetry: { capture: string; list: string; replay: string };
    missions: { create: string; list: string; status: string; cancel: string };
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
    history: { events: string; deviceEvents: string; deviceTelemetry: string };
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

export interface ChatIntegrationMcpEndpoints {
  base: string;
  hardware: McpIntegrationEndpointGroup;
  rpa: McpIntegrationEndpointGroup;
}

export interface ChatIntegrationMcpContext {
  endpoints: ChatIntegrationMcpEndpoints;
  total: number;
  hosts: Record<string, number>;
  resources: McpResourceDefinition[];
  templates: McpResourceTemplateDefinition[];
}

export interface ChatIntegrationDriverSample {
  key: string;
  packageName: string;
  scope: DriverRegistryScope;
}

export interface ChatIntegrationDriversContext {
  endpoints: { catalog: string; deviceDrivers: string; install: string };
  installAllowed: boolean;
  installBlockedReason: string | null;
  count: number;
  scopeCounts: Record<DriverRegistryScope, number>;
  sample: ChatIntegrationDriverSample[];
  timestamp: string;
}

export type ChatIntegrationPluginDescriptor = ServerPluginRegistryItem & Record<string, unknown>;

export interface ChatIntegrationPluginSummary {
  updatedAt: string;
  count: number;
  manifest: ServerPluginManifest;
  apiPlugins: ChatIntegrationPluginDescriptor[];
}

export interface ChatIntegrationCapabilityDependencySummary {
  id: string;
  required: boolean;
  missing: boolean;
  status: CapabilityEntry["status"] | null;
  responsibility: string | null;
  kind: CapabilityEntry["kind"] | null;
}

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

export interface ChatIntegrationLibraryEntrySummary {
  name: string;
  version: string;
  source: LibrarySource;
  runtime: string;
  status: LibraryStatus;
  bunbuddyKind?: string | null;
  endpoints: string[];
}

export interface ChatIntegrationLibraryCoverageCategorySummary {
  label: string;
  total: number;
  missing: number;
  missingLibraries: string[];
  sources: Record<LibrarySource, number>;
}

export interface ChatIntegrationLibraryCoverageSummary {
  categories: Record<LibraryCategory, ChatIntegrationLibraryCoverageCategorySummary>;
}

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

export interface BunBuddyCapabilityHandoffPairSummary {
  from: BunBuddyCapabilityRole;
  to: BunBuddyCapabilityRole;
  total: number;
  active: number;
}

export interface BunBuddyCapabilityHandoffSummary {
  total: number;
  active: number;
  blocked: number;
  pairs: BunBuddyCapabilityHandoffPairSummary[];
}

export interface ChatIntegrationBunBuddyGraphContext {
  endpoints: { graph: string; capabilities: string };
  graph: BunBuddyCapabilityGraph;
  handoffs: BunBuddyCapabilityHandoffSummary;
  knownChains?: Record<string, string>;
}

export interface ChatIntegrationBunBuddyRoutingContext {
  endpoints: { status: string; refresh: string };
  snapshot: BunBuddyRoutingStatusResponse;
}

export interface ChatIntegrationBaoDownEndpoints {
  integration: string;
}

export interface ChatIntegrationBaoDownContext {
  endpoints: ChatIntegrationBaoDownEndpoints;
  pgNotify: BaoDownPgNotifyStatus;
}

export interface ChatIntegrationBaoRuntimeContext {
  endpoints: { status: string; refresh: string; ensure: string };
  snapshot: BaoRuntimeSnapshot;
}

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

export interface ChatIntegrationRouteSummary {
  total: number;
  eventTotal: number;
  endpoints: string[];
  events: string[];
  capabilities: ChatIntegrationRouteCapabilitySummary[];
}

export interface ChatIntegrationDocsSummary {
  enabled: boolean;
  path: string;
  specPath: string;
  specUrl: string;
  viewerUrl: string;
  title?: string | undefined;
  description: string;
  serverUrl: string;
}

export interface IntegrationContextMeta {
  schemaVersion: string;
  generatedAt: string;
  correlationId?: string;
  source?: string;
}

// Re-export from split module
export type {
  ChatIntegrationContext,
  ChatIntegrationContextSummary,
} from "./integration-context-full";
