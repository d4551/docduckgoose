/**
 * Shared MCP types.
 *
 * Provides shared MCP resource definitions for API contracts and UI integrations.
 *
 * @shared/types/mcp.ts
 */

import type {
  McpContextEndpointGroupSchema,
  McpIntegrationEndpointGroupSchema,
  McpIntegrationEndpointsSchema,
  McpIntegrationProviderSchema,
  McpIntegrationSummarySchema,
  McpProviderMetadataSchema,
  McpProviderSummarySchema,
  McpResourceDefinitionSchema,
  McpResourceTemplateDefinitionSchema,
} from "@baohaus/bao-schemas/mcp.schemas";
import type { Static } from "@baohaus/baobox/elysia";

/**
 * MCP resource definition.
 */
export type McpResourceDefinition = Static<typeof McpResourceDefinitionSchema>;

/**
 * MCP resource template definition.
 */
export type McpResourceTemplateDefinition = Static<typeof McpResourceTemplateDefinitionSchema>;

/**
 * MCP REST endpoint bundle for a capability domain.
 */
export type McpIntegrationEndpointGroup = Static<typeof McpIntegrationEndpointGroupSchema>;

/**
 * Generic provider-backed MCP endpoint inventory.
 */
export type McpIntegrationEndpoints = Static<typeof McpIntegrationEndpointsSchema>;

/**
 * MCP provider metadata payload.
 */
export type McpProviderMetadata = Static<typeof McpProviderMetadataSchema>;

/**
 * MCP provider inventory entry used by context bundles.
 */
export type McpProviderSummary = Static<typeof McpProviderSummarySchema>;

/**
 * MCP provider inventory entry used by integration summaries.
 */
export type McpIntegrationProvider = Static<typeof McpIntegrationProviderSchema>;

/**
 * MCP REST endpoint bundle for context responses.
 */
export type McpContextEndpointGroup = Static<typeof McpContextEndpointGroupSchema>;

/**
 * MCP integration summary payload for AI/XR/hardware orchestration.
 */
export type McpIntegrationSummary = Static<typeof McpIntegrationSummarySchema>;
