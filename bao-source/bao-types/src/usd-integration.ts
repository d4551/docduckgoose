/**
 * Shared OpenUSD integration summary types.
 *
 * Defines the USD integration capability snapshot surfaced to AI/XR clients.
 *
 * @shared/types/usd-integration.ts
 */

import type { McpResourceDefinition, McpResourceTemplateDefinition } from "./mcp.ts";
import type { OnnxIntegrationSummary } from "./onnx-integration.ts";
import type { PipelineIntegrationSummary } from "./pipeline-integration.ts";
import type { TrainingIntegrationSummary } from "./training-integration.ts";
import type { UsdValidationProfile } from "./usd.ts";

/**
 * USD integration capability summary payload.
 */
export interface UsdIntegrationSummary {
  enabled: boolean;
  timestamp: string;
  endpoints: {
    base: string;
    assets: string;
    assetById: string;
    assetFile: string;
    assetArUrls: string;
    assetValidate: string;
    scanImport: {
      sync: string;
      queue: string;
      jobStatus: string;
    };
  };
  config: {
    assets: {
      rootDir: string;
      defaultFileName: string;
      defaultDisplayName: string;
      defaultFormat: string;
      defaultMimeType: string;
      defaultListLimit: number;
      maxListLimit: number;
    };
    presign: {
      defaultTtlSeconds: number;
      arTtlSeconds: number;
    };
    scanImport: {
      timeoutMs: number;
    };
    validation: {
      minFileSizeBytes: number;
      maxFileSizeMb: number;
      warnFileSizeMb: number;
      maxTextureCount: number;
      defaultProfile: UsdValidationProfile;
      profiles: Record<
        UsdValidationProfile,
        {
          maxTextureDimension: number;
          maxTextureMemoryBytes: number;
          textureBytesPerPixel: number;
          maxTextureCount: number;
          minFileSizeBytes?: number;
          maxFileSizeMb?: number;
          warnFileSizeMb?: number;
        }
      >;
    };
    ai: {
      defaultAssetName: string;
      defaultFileName: string;
      defaultFormat: string;
      defaultContentType: string;
    };
    pipelines: {
      derivedArtifacts: {
        enabled: boolean;
        pipelineId?: string | null;
        idempotencyPrefix: string;
      };
    };
  };
  pipelines?: PipelineIntegrationSummary;
  onnx?: OnnxIntegrationSummary;
  training?: TrainingIntegrationSummary;
  mcp: {
    resources: McpResourceDefinition[];
    templates: McpResourceTemplateDefinition[];
  };
}
