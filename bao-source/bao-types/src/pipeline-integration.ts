/**
 * Shared pipeline integration summary types.
 *
 * Defines the pipeline integration capability snapshot surfaced to AI/XR/USD clients.
 *
 * @shared/types/pipeline-integration.ts
 */

import {
  isPipelineResourceType,
  PIPELINE_RESOURCE_TYPES,
  type PipelineResourceType,
} from "@baohaus/bao-constants/pipeline-resources";
import type { BunBuddyKind } from "@baohaus/bao-schemas/bunbuddy.schemas";

/**
 * Pipeline cleanup resource keys (canonical).
 */
export const PIPELINE_CLEANUP_RESOURCES: readonly [
  "bluetooth_handles",
  "scanner_connections",
  "turntable_connections",
  "camera_streams",
  "temp_files",
  "ros_nodes",
  "mavlink_connections",
  "modbus_connections",
  "websocket_connections",
  "gpu_memory",
] = PIPELINE_RESOURCE_TYPES;

/** Inferred type from the PipelineCleanupResource schema. */
export type PipelineCleanupResource = PipelineResourceType;

/**
 * Type guard for pipeline cleanup resource keys.
 *
 * @param value - Candidate value.
 * @returns True when value is a supported cleanup resource key.
 */
export const isPipelineCleanupResource: typeof isPipelineResourceType = isPipelineResourceType;

/**
 * Pipeline integration capability summary payload.
 */
export interface PipelineIntegrationSummary {
  enabled: boolean;
  timestamp: string;
  endpoints: {
    base: string;
    definitions: {
      list: string;
      create: string;
      byId: string;
      update: string;
      delete: string;
      run: string;
    };
    runs: {
      list: string;
      byId: string;
      cancel: string;
      events: string;
    };
    integration: string;
    summary: string;
    automation: string;
  };
  config: {
    rateLimit: {
      requestsPerWindow: number;
      windowSeconds: number;
      burstCapacity: number;
      maxConcurrent: number;
    };
    list: {
      defaultLimit: number;
      maxLimit: number;
      minLimit: number;
      offsetMax: number;
    };
    summary: {
      definitionLimit: number;
      runLimit: number;
      minDefinitionLimit: number;
      maxDefinitionLimit: number;
      minRunLimit: number;
      maxRunLimit: number;
    };
    sse: {
      pollIntervalMs: number;
      idleTimeoutMs: number;
    };
  };
  catalog: {
    tags: string[];
    byTag: Record<string, number>;
  };
  stats: {
    definitionCount: number;
    runCount: number;
    activeRunCount: number;
    completedRunCount: number;
    runsByStatus: {
      pending: number;
      running: number;
      completed: number;
      failed: number;
      cancelled: number;
      timeout: number;
    };
    pipelineIds: string[];
    status: "healthy" | "degraded" | "unavailable";
  };
  dependencies: {
    bunbuddies: {
      kinds: BunBuddyKind[];
      chains: Record<string, BunBuddyKind[]>;
      requiredFeatures: Record<string, string[]>;
    };
    plugins: {
      handlers: string[];
      byPipeline: Record<string, string[]>;
    };
    cleanupResources: Record<string, PipelineCleanupResource[]>;
  };
}
