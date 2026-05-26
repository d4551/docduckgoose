/**
 * Shared Three.js integration summary types.
 *
 * Defines the Three.js integration capability snapshot surfaced to AI/XR clients.
 *
 * @shared/types/three-integration.ts
 */

import type {
  CapabilityContracts,
  CapabilityKind,
  CapabilityStatus,
} from "./capability-registry.ts";
import type { UsdIntegrationSummary } from "./usd-integration.ts";

/**
 * Pipeline summary payload surfaced for Three.js integrations.
 */
export interface ThreePipelineSummary {
  id: string;
  name: string;
  version: string;
  tags: string[];
}

/**
 * Integration target groups for Three.js cross-system mappings.
 */
export interface ThreeIntegrationTargets {
  pluginNames: string[];
  bunbuddyKinds: string[];
  responsibilities: string[];
}

/**
 * Capability entry mapped for Three.js integration summaries.
 */
export interface ThreeIntegrationCapability {
  id: string;
  name: string;
  kind: CapabilityKind;
  status: CapabilityStatus;
  owner: string;
  responsibility: string;
  version: string;
  bunbuddyKind?: string;
  contracts: Pick<CapabilityContracts, "endpoints" | "events">;
}

/**
 * Three.js integration capability summary payload.
 */
export interface ThreeIntegrationSummary {
  enabled: boolean;
  timestamp: string;
  endpoints: {
    base: string;
    capabilities: string;
    mediaAssets: string;
    mediaAssetById: string;
    mediaAssetFile: string;
    mediaAssetStats: string;
    importUsd: string;
    importScanSession: {
      sync: string;
      queue: string;
      jobStatus: string;
    };
    ai: {
      jobs: string;
      jobById: string;
      jobDecision: string;
      queue: string;
      queueMetrics: string;
    };
  };
  config: {
    assets: {
      rootDir: string;
      defaultFileName: string;
      defaultDisplayName: string;
      defaultMediaType: string;
      defaultMimeType: string;
      defaultListLimit: number;
      maxListLimit: number;
      minListLimit: number;
      defaultExtension: string;
      allowedExtensions: string[];
      allowedMimeTypes: string[];
      mimeTypeExtensions: Record<string, string>;
      usdMetadataSource: string;
    };
    imports: {
      scanSessionTimeoutMs: number;
    };
    rendering: {
      antialiasDefault: boolean;
      maxPixelRatio: number;
      powerPreference: string;
      toneMapping: string;
      toneMappingExposure: number;
      colorSpace: string;
      shadowMap: boolean;
      shadowMapType: string;
      camera: {
        fov: number;
        near: number;
        far: number;
      };
    };
    pipelines: {
      tags: string[];
    };
  };
  pipelines: {
    tags: string[];
    definitions: ThreePipelineSummary[];
  };
  integrations: {
    targets: ThreeIntegrationTargets;
    capabilities: ThreeIntegrationCapability[];
    missing: ThreeIntegrationTargets;
  };
  usd: UsdIntegrationSummary;
}
