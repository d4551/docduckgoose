/**
 * AI Gateway types.
 *
 * Defines shared, end-to-end types for the unified AI gateway:
 * - Provider capabilities
 * - Unified model catalog items
 *
 * @shared/types/ai-gateway.ts
 */

import type {
  AiGatewayModelCatalogItem as SchemaAiGatewayModelCatalogItem,
  AiGatewayModelCatalogResponse as SchemaAiGatewayModelCatalogResponse,
} from "@baohaus/bao-schemas/ai-gateway.schemas";
import type {
  LibraryCoverageResponse,
  LibraryEntry,
} from "@baohaus/bao-schemas/library-registry.schemas";
import type { HardwareIntegrationSummary } from "./hardware-integration.ts";
import type { McpIntegrationSummary } from "./mcp.ts";
import type { OnnxIntegrationSummary } from "./onnx-integration.ts";
import type { PipelineIntegrationSummary } from "./pipeline-integration.ts";
import type { RpaIntegrationSummary } from "./rpa-integration.ts";
import type { ThreeIntegrationSummary } from "./three-integration.ts";
import type { TrainingIntegrationSummary } from "./training-integration.ts";
import type { UsdIntegrationSummary } from "./usd-integration.ts";
import type { XrApiCapabilities } from "./xr-capabilities.ts";

/**
 * Supported catalog origins for model discovery.
 */
export type AiGatewayModelOrigin = "registry" | "onnx" | "nim" | "ollama" | "ramalama" | "local";

/**
 * High-level deployment hint emitted by the gateway.
 */
export type AiGatewayDeploymentHint = "edge" | "workstation" | "cloud" | "mixed" | "unknown";

/**
 * Provider capability flags.
 */
export interface AiGatewayProviderFeatures {
  chat: boolean;
  chatStream: boolean;
  embeddings: boolean;
  images: boolean;
  models: boolean;
  training: boolean;
  download: boolean;
}

/**
 * Provider capability summary emitted by the gateway.
 */
export interface AiGatewayProviderCapability {
  enabled?: boolean;
  configured: boolean;
  label?: string;
  mode?: string;
  endpoint?: string | null;
  model?: string | null;
  features: AiGatewayProviderFeatures;
  libraries?: LibraryEntry[];
  librariesExpected?: string[];
  librariesMissing?: string[];
}

/**
 * AI gateway capabilities response returned by `/api/v1/ai/capabilities`.
 */
export interface AiGatewayCapabilitiesResponse {
  ok: true;
  data: {
    timestamp: string;
    deployment: AiGatewayDeploymentHint;
    providers: Record<string, AiGatewayProviderCapability>;
    usd?: UsdIntegrationSummary;
    hardware?: HardwareIntegrationSummary;
    mcp?: McpIntegrationSummary;
    rpa?: RpaIntegrationSummary;
    pipelines?: PipelineIntegrationSummary;
    three?: ThreeIntegrationSummary;
    xr?: XrApiCapabilities;
    onnx?: OnnxIntegrationSummary;
    training?: TrainingIntegrationSummary;
    libraryCoverage?: LibraryCoverageResponse;
  };
}

/**
 * Unified model catalog item returned by `/api/v1/ai/models`.
 */
export type AiGatewayModelCatalogItem = SchemaAiGatewayModelCatalogItem;

/**
 * Model catalog response returned by `/api/v1/ai/models`.
 */
export type AiGatewayModelCatalogResponse = SchemaAiGatewayModelCatalogResponse;
