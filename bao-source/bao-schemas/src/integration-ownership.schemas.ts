/**
 * Integration ownership schemas.
 *
 * Defines TypeBox schemas for capability ownership payloads embedded in
 * integration context snapshots (AI/XR/USD/MCP/device stacks).
 *
 * @shared/schemas/integration-ownership.ts
 */

import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { CapabilityDomainMapResponseSchema } from "./capability-domain-map.schemas.ts";
import {
  CapabilityOwnershipCategoryMapSchema,
  CapabilityOwnershipCoverageMapSchema,
  CapabilityOwnershipDomainSchema,
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
  CapabilityOwnershipFocusSchema,
  CapabilityOwnershipGroupSchema,
  CapabilityOwnershipHighlightsSchema,
  CapabilityOwnershipMapMetadataSchema,
  CapabilityOwnershipMatrixSchema,
  CapabilityOwnershipMcpSurfaceSchema,
  CapabilityOwnershipMcpSurfaceSummarySchema,
  CapabilityOwnershipOwnerMapMatrixSchema,
  CapabilityOwnershipOwnerMapSchema,
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSegmentSummarySchema,
  CapabilityOwnershipStackEntrySchema,
  CapabilityOwnershipStackMapSchema,
  CapabilityOwnershipStackSummarySchema,
  CapabilityOwnershipSummarySchema,
  CapabilityOwnershipSurfaceSchema,
  CapabilityOwnershipSurfaceSummarySchema,
} from "./capability-ownership.schemas.ts";

/**
 * Cross-domain ownership map snapshot embedded in integration ownership context.
 */
export const ChatIntegrationOwnershipDomainMapContextSchema = TypeExports.Object(
  {
    endpoint: TypeExports.String({ minLength: 1 }),
    refreshEndpoint: TypeExports.String({ minLength: 1 }),
    snapshot: CapabilityDomainMapResponseSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration ownership domain-map context.
 */
export type ChatIntegrationOwnershipDomainMapContext = Static<
  typeof ChatIntegrationOwnershipDomainMapContextSchema
>;

/**
 * Cross-domain ownership map summary embedded in integration ownership summary payloads.
 */
export const ChatIntegrationOwnershipDomainMapSummarySchema = TypeExports.Object(
  {
    endpoint: TypeExports.String({ minLength: 1 }),
    refreshEndpoint: TypeExports.String({ minLength: 1 }),
    domains: TypeExports.Integer({ minimum: 0 }),
    edges: TypeExports.Integer({ minimum: 0 }),
    ownerMatrixStacks: TypeExports.Integer({ minimum: 0 }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration ownership domain-map summary.
 */
export type ChatIntegrationOwnershipDomainMapSummary = Static<
  typeof ChatIntegrationOwnershipDomainMapSummarySchema
>;

/**
 * Capability ownership integration context schema.
 */
export const ChatIntegrationOwnershipContextSchema: TSchema = TypeExports.Object(
  {
    endpoints: TypeExports.Object({
      map: TypeExports.String(),
      refresh: TypeExports.String(),
      impact: TypeExports.String(),
    }),
    summary: CapabilityOwnershipSummarySchema,
    groups: TypeExports.Array(CapabilityOwnershipGroupSchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipMcpSurfaceSchema)),
    stackMap: CapabilityOwnershipStackMapSchema,
    stacks: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipStackEntrySchema)),
    categoryMap: TypeExports.Optional(CapabilityOwnershipCategoryMapSchema),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    coverage: TypeExports.Optional(CapabilityOwnershipCoverageMapSchema),
    highlights: TypeExports.Optional(CapabilityOwnershipHighlightsSchema),
    matrix: TypeExports.Optional(CapabilityOwnershipMatrixSchema),
    ownerMap: TypeExports.Optional(CapabilityOwnershipOwnerMapSchema),
    ownerMapMatrix: TypeExports.Optional(CapabilityOwnershipOwnerMapMatrixSchema),
    focus: TypeExports.Optional(CapabilityOwnershipFocusSchema),
    focusMap: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
    domainMap: TypeExports.Optional(ChatIntegrationOwnershipDomainMapContextSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    errors: TypeExports.Array(CapabilityOwnershipErrorSchema),
    metadata: TypeExports.Optional(CapabilityOwnershipMapMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration ownership context.
 */
export interface ChatIntegrationOwnershipContext {
  endpoints: {
    map: string;
    refresh: string;
    impact: string;
  };
  summary: Static<typeof CapabilityOwnershipSummarySchema>;
  groups: Static<typeof CapabilityOwnershipGroupSchema>[];
  domains: Static<typeof CapabilityOwnershipDomainSchema>[];
  surfaces: Static<typeof CapabilityOwnershipSurfaceSchema>[];
  mcpSurfaces?: Static<typeof CapabilityOwnershipMcpSurfaceSchema>[];
  stackMap: Static<typeof CapabilityOwnershipStackMapSchema>;
  stacks?: Static<typeof CapabilityOwnershipStackEntrySchema>[];
  categoryMap?: Static<typeof CapabilityOwnershipCategoryMapSchema>;
  segments: Static<typeof CapabilityOwnershipSegmentSchema>[];
  coverage?: Static<typeof CapabilityOwnershipCoverageMapSchema>;
  highlights?: Static<typeof CapabilityOwnershipHighlightsSchema>;
  matrix?: Static<typeof CapabilityOwnershipMatrixSchema>;
  ownerMap?: Static<typeof CapabilityOwnershipOwnerMapSchema>;
  ownerMapMatrix?: Static<typeof CapabilityOwnershipOwnerMapMatrixSchema>;
  focus?: Static<typeof CapabilityOwnershipFocusSchema>;
  focusMap?: Static<typeof CapabilityOwnershipFocusMapSchema>;
  domainMap?: ChatIntegrationOwnershipDomainMapContext;
  timestamp: string;
  errors: Static<typeof CapabilityOwnershipErrorSchema>[];
  metadata?: Static<typeof CapabilityOwnershipMapMetadataSchema>;
}

/**
 * Ownership summary schema.
 */
export const ChatIntegrationOwnershipFocusSummarySchema = TypeExports.Object(
  {
    segments: TypeExports.Array(CapabilityOwnershipSegmentSummarySchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    surfaces: CapabilityOwnershipSurfaceSummarySchema,
    mcp: TypeExports.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * Ownership focus summary type.
 */
export type ChatIntegrationOwnershipFocusSummary = Static<
  typeof ChatIntegrationOwnershipFocusSummarySchema
>;

/**
 * Ownership summary schema.
 */
export const ChatIntegrationOwnershipSummarySchema = TypeExports.Object(
  {
    summary: CapabilityOwnershipSummarySchema,
    stack: CapabilityOwnershipStackSummarySchema,
    endpoint: TypeExports.String(),
    refreshEndpoint: TypeExports.String(),
    impactEndpoint: TypeExports.String(),
    focus: TypeExports.Optional(ChatIntegrationOwnershipFocusSummarySchema),
    domainMap: TypeExports.Optional(ChatIntegrationOwnershipDomainMapSummarySchema),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration ownership summary.
 */
export type ChatIntegrationOwnershipSummary = Static<typeof ChatIntegrationOwnershipSummarySchema>;
