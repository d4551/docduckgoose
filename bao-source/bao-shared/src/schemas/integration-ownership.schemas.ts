/**
 * Integration ownership schemas.
 *
 * Defines TypeBox schemas for capability ownership payloads embedded in
 * integration context snapshots (AI/XR/USD/MCP/device stacks).
 *
 * @shared/schemas/integration-ownership.ts
 */

import { CapabilityDomainMapResponseSchema } from "@baohaus/bao-schemas/capability-domain-map.schemas";
import { CapabilityOwnershipCategoryMapSchema } from "@baohaus/bao-schemas/capability-ownership/category";
import { CapabilityOwnershipCoverageMapSchema } from "@baohaus/bao-schemas/capability-ownership/coverage-map";
import { CapabilityOwnershipDomainSchema } from "@baohaus/bao-schemas/capability-ownership/domain";
import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import {
  CapabilityOwnershipFocusMapSchema,
  CapabilityOwnershipFocusSchema,
} from "@baohaus/bao-schemas/capability-ownership/focus";
import { CapabilityOwnershipGroupSchema } from "@baohaus/bao-schemas/capability-ownership/group";
import { CapabilityOwnershipHighlightsSchema } from "@baohaus/bao-schemas/capability-ownership/highlights";
import { CapabilityOwnershipMatrixSchema } from "@baohaus/bao-schemas/capability-ownership/matrix";
import {
  CapabilityOwnershipMcpSurfaceSchema,
  CapabilityOwnershipMcpSurfaceSummarySchema,
} from "@baohaus/bao-schemas/capability-ownership/mcp-surface";
import { CapabilityOwnershipMapMetadataSchema } from "@baohaus/bao-schemas/capability-ownership/metadata";
import {
  CapabilityOwnershipOwnerMapMatrixSchema,
  CapabilityOwnershipOwnerMapSchema,
} from "@baohaus/bao-schemas/capability-ownership/owner-map";
import {
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSegmentSummarySchema,
} from "@baohaus/bao-schemas/capability-ownership/segment";
import {
  CapabilityOwnershipStackMapSchema,
  CapabilityOwnershipStackSummarySchema,
} from "@baohaus/bao-schemas/capability-ownership/stack";
import { CapabilityOwnershipStackEntrySchema } from "@baohaus/bao-schemas/capability-ownership/stack-entry";
import { CapabilityOwnershipSummarySchema } from "@baohaus/bao-schemas/capability-ownership/summary";
import {
  CapabilityOwnershipSurfaceSchema,
  CapabilityOwnershipSurfaceSummarySchema,
} from "@baohaus/bao-schemas/capability-ownership/surface";
import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Cross-domain ownership map snapshot embedded in integration ownership context.
 */
export const ChatIntegrationOwnershipDomainMapContextSchema = Type.Object(
  {
    endpoint: Type.String({ minLength: 1 }),
    refreshEndpoint: Type.String({ minLength: 1 }),
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
export const ChatIntegrationOwnershipDomainMapSummarySchema = Type.Object(
  {
    endpoint: Type.String({ minLength: 1 }),
    refreshEndpoint: Type.String({ minLength: 1 }),
    domains: Type.Integer({ minimum: 0 }),
    edges: Type.Integer({ minimum: 0 }),
    ownerMatrixStacks: Type.Integer({ minimum: 0 }),
    updatedAt: Type.String({ format: "date-time" }),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
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
export const ChatIntegrationOwnershipContextSchema: TSchema = Type.Object(
  {
    endpoints: Type.Object({
      map: Type.String(),
      refresh: Type.String(),
      impact: Type.String(),
    }),
    summary: CapabilityOwnershipSummarySchema,
    groups: Type.Array(CapabilityOwnershipGroupSchema),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: Type.Optional(Type.Array(CapabilityOwnershipMcpSurfaceSchema)),
    stackMap: CapabilityOwnershipStackMapSchema,
    stacks: Type.Optional(Type.Array(CapabilityOwnershipStackEntrySchema)),
    categoryMap: Type.Optional(CapabilityOwnershipCategoryMapSchema),
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    coverage: Type.Optional(CapabilityOwnershipCoverageMapSchema),
    highlights: Type.Optional(CapabilityOwnershipHighlightsSchema),
    matrix: Type.Optional(CapabilityOwnershipMatrixSchema),
    ownerMap: Type.Optional(CapabilityOwnershipOwnerMapSchema),
    ownerMapMatrix: Type.Optional(CapabilityOwnershipOwnerMapMatrixSchema),
    focus: Type.Optional(CapabilityOwnershipFocusSchema),
    focusMap: Type.Optional(CapabilityOwnershipFocusMapSchema),
    domainMap: Type.Optional(ChatIntegrationOwnershipDomainMapContextSchema),
    timestamp: Type.String({ format: "date-time" }),
    errors: Type.Array(CapabilityOwnershipErrorSchema),
    metadata: Type.Optional(CapabilityOwnershipMapMetadataSchema),
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
export const ChatIntegrationOwnershipFocusSummarySchema = Type.Object(
  {
    segments: Type.Array(CapabilityOwnershipSegmentSummarySchema),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    surfaces: CapabilityOwnershipSurfaceSummarySchema,
    mcp: Type.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
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
export const ChatIntegrationOwnershipSummarySchema = Type.Object(
  {
    summary: CapabilityOwnershipSummarySchema,
    stack: CapabilityOwnershipStackSummarySchema,
    endpoint: Type.String(),
    refreshEndpoint: Type.String(),
    impactEndpoint: Type.String(),
    focus: Type.Optional(ChatIntegrationOwnershipFocusSummarySchema),
    domainMap: Type.Optional(ChatIntegrationOwnershipDomainMapSummarySchema),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration ownership summary.
 */
export type ChatIntegrationOwnershipSummary = Static<typeof ChatIntegrationOwnershipSummarySchema>;
