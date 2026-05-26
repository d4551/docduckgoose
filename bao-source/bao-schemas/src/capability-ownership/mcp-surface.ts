/**
 * Capability ownership MCP surface schemas.
 *
 * @shared/schemas/capability-ownership/mcp-surface.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  McpResourceDefinitionSchema,
  McpResourceTemplateDefinitionSchema,
  McpToolDefinitionSchema,
} from "../mcp.schemas.ts";

/**
 * Schema for MCP surface summary counts.
 */
export const CapabilityOwnershipMcpSurfaceSummarySchema: Type.TObject<
  {
    readonly resources: Type.TInteger;
    readonly tools: Type.TInteger;
    readonly templates: Type.TInteger;
    readonly total: Type.TInteger;
  },
  "total" | "resources" | "tools" | "templates",
  never
> = Type.Object(
  {
    resources: Type.Integer({ minimum: 0 }),
    tools: Type.Integer({ minimum: 0 }),
    templates: Type.Integer({ minimum: 0 }),
    total: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for MCP surface summaries.
 */
export type CapabilityOwnershipMcpSurfaceSummary = Static<
  typeof CapabilityOwnershipMcpSurfaceSummarySchema
>;

/**
 * Schema for MCP surface ownership entries.
 */
export const CapabilityOwnershipMcpSurfaceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    domain: Type.String({ minLength: 1 }),
    groupId: Type.Optional(Type.String({ minLength: 1 })),
    groupLabel: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    segmentIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    summary: CapabilityOwnershipMcpSurfaceSummarySchema,
    resources: Type.Optional(Type.Array(McpResourceDefinitionSchema)),
    tools: Type.Optional(Type.Array(McpToolDefinitionSchema)),
    templates: Type.Optional(Type.Array(McpResourceTemplateDefinitionSchema)),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for MCP surface entries.
 */
export type CapabilityOwnershipMcpSurface = Static<typeof CapabilityOwnershipMcpSurfaceSchema>;
