/**
 * Capability ownership — groups, domains, surfaces, MCP surfaces, owner maps, segments.
 */

import type { Static, TInteger, TObject } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  CapabilityOwnershipEntrySchema,
  CapabilityOwnershipKindSchema,
  CapabilityOwnershipSummarySchema,
} from "./capability-ownership-foundation.schemas.ts";
import {
  McpResourceDefinitionSchema,
  McpResourceTemplateDefinitionSchema,
  McpToolDefinitionSchema,
} from "./mcp.schemas.ts";

// Capability Ownership Group

/**
 * Schema for grouped ownership entries.
 */
export const CapabilityOwnershipGroupSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    entries: TypeExports.Array(CapabilityOwnershipEntrySchema),
    summary: CapabilityOwnershipSummarySchema,
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership group payloads.
 */
export type CapabilityOwnershipGroup = Static<typeof CapabilityOwnershipGroupSchema>;

// Capability Ownership Domain

/**
 * Schema for ownership domain summaries.
 */
export const CapabilityOwnershipDomainSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    groupIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership domain payloads.
 */
export type CapabilityOwnershipDomain = Static<typeof CapabilityOwnershipDomainSchema>;

// Capability Ownership Surfaces

/**
 * Schema for ownership surface summaries (group + kind slice).
 */
export const CapabilityOwnershipSurfaceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    groupId: TypeExports.String({ minLength: 1 }),
    groupLabel: TypeExports.String({ minLength: 1 }),
    domainIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    segmentIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    kind: CapabilityOwnershipKindSchema,
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership surface payloads.
 */
export type CapabilityOwnershipSurface = Static<typeof CapabilityOwnershipSurfaceSchema>;

/**
 * Schema for ownership surface summary counts.
 */
export const CapabilityOwnershipSurfaceSummarySchema: TObject<
  {
    readonly total: TInteger;
    readonly surfaces: TInteger;
    readonly groups: TInteger;
    readonly kinds: TInteger;
    readonly owners: TInteger;
    readonly responsibilities: TInteger;
    readonly domains: TInteger;
  },
  "total" | "surfaces" | "groups" | "kinds" | "owners" | "responsibilities" | "domains",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    surfaces: TypeExports.Integer({ minimum: 0 }),
    groups: TypeExports.Integer({ minimum: 0 }),
    kinds: TypeExports.Integer({ minimum: 0 }),
    owners: TypeExports.Integer({ minimum: 0 }),
    responsibilities: TypeExports.Integer({ minimum: 0 }),
    domains: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership surface summary payloads.
 */
export type CapabilityOwnershipSurfaceSummary = Static<
  typeof CapabilityOwnershipSurfaceSummarySchema
>;

// Capability Ownership MCP Surfaces

/**
 * Schema for MCP surface summary counts.
 */
export const CapabilityOwnershipMcpSurfaceSummarySchema: TObject<
  {
    readonly resources: TInteger;
    readonly tools: TInteger;
    readonly templates: TInteger;
    readonly total: TInteger;
  },
  "total" | "resources" | "tools" | "templates",
  never
> = TypeExports.Object(
  {
    resources: TypeExports.Integer({ minimum: 0 }),
    tools: TypeExports.Integer({ minimum: 0 }),
    templates: TypeExports.Integer({ minimum: 0 }),
    total: TypeExports.Integer({ minimum: 0 }),
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
export const CapabilityOwnershipMcpSurfaceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    domain: TypeExports.String({ minLength: 1 }),
    groupId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    groupLabel: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    segmentIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    summary: CapabilityOwnershipMcpSurfaceSummarySchema,
    resources: TypeExports.Optional(TypeExports.Array(McpResourceDefinitionSchema)),
    tools: TypeExports.Optional(TypeExports.Array(McpToolDefinitionSchema)),
    templates: TypeExports.Optional(TypeExports.Array(McpResourceTemplateDefinitionSchema)),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for MCP surface entries.
 */
export type CapabilityOwnershipMcpSurface = Static<typeof CapabilityOwnershipMcpSurfaceSchema>;

// Capability Ownership Owner Map

/**
 * Schema for ownership owner map sections.
 */
export const CapabilityOwnershipOwnerMapSectionSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    groupIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner map sections.
 */
export type CapabilityOwnershipOwnerMapSection = Static<
  typeof CapabilityOwnershipOwnerMapSectionSchema
>;

/**
 * Schema for ownership owner maps.
 */
export const CapabilityOwnershipOwnerMapSchema = TypeExports.Object(
  {
    sections: TypeExports.Array(CapabilityOwnershipOwnerMapSectionSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner maps.
 */
export type CapabilityOwnershipOwnerMap = Static<typeof CapabilityOwnershipOwnerMapSchema>;

// Capability Ownership Segments

/**
 * Schema for ownership owner-map matrix rows.
 */
export const CapabilityOwnershipOwnerMapMatrixRowSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    groupIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner-map matrix rows.
 */
export type CapabilityOwnershipOwnerMapMatrixRow = Static<
  typeof CapabilityOwnershipOwnerMapMatrixRowSchema
>;

/**
 * Schema for ownership owner-map matrices.
 */
export const CapabilityOwnershipOwnerMapMatrixSchema = TypeExports.Object(
  {
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    rows: TypeExports.Array(CapabilityOwnershipOwnerMapMatrixRowSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership owner-map matrices.
 */
export type CapabilityOwnershipOwnerMapMatrix = Static<
  typeof CapabilityOwnershipOwnerMapMatrixSchema
>;

/**
 * Schema for ownership segments (targeted slices across groups/kinds).
 */
export const CapabilityOwnershipSegmentSummarySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    groupIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    kinds: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipKindSchema)),
    summary: CapabilityOwnershipSummarySchema,
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership segment summary payloads.
 */
export type CapabilityOwnershipSegmentSummary = Static<
  typeof CapabilityOwnershipSegmentSummarySchema
>;

/**
 * Schema for ownership segments (targeted slices across groups/kinds).
 */
export const CapabilityOwnershipSegmentSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    groupIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    kinds: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipKindSchema)),
    summary: CapabilityOwnershipSummarySchema,
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    entries: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipEntrySchema)),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership segments.
 */
export type CapabilityOwnershipSegment = Static<typeof CapabilityOwnershipSegmentSchema>;
