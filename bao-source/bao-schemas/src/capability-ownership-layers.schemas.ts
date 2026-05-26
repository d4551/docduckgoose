/**
 * Capability ownership — matrix, coverage, focus maps, stack, category, composite map payloads.
 */

import type { Static, TArray, TInteger, TObject, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  CapabilityOwnershipKindSchema,
  CapabilityOwnershipSummarySchema,
} from "./capability-ownership-foundation.schemas.ts";
import {
  CapabilityOwnershipDomainSchema,
  CapabilityOwnershipMcpSurfaceSchema,
  CapabilityOwnershipMcpSurfaceSummarySchema,
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSurfaceSchema,
  CapabilityOwnershipSurfaceSummarySchema,
} from "./capability-ownership-views.schemas.ts";

// Capability Ownership Matrix

/**
 * Schema for capability ownership matrix cells.
 */
export const CapabilityOwnershipMatrixCellSchema = TypeExports.Object(
  {
    kind: CapabilityOwnershipKindSchema,
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership matrix cells.
 */
export type CapabilityOwnershipMatrixCell = Static<typeof CapabilityOwnershipMatrixCellSchema>;

/**
 * Schema for capability ownership matrix rows.
 */
export const CapabilityOwnershipMatrixRowSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    summary: CapabilityOwnershipSummarySchema,
    cells: TypeExports.Array(CapabilityOwnershipMatrixCellSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership matrix rows.
 */
export type CapabilityOwnershipMatrixRow = Static<typeof CapabilityOwnershipMatrixRowSchema>;

/**
 * Schema for capability ownership matrix payloads.
 */
export const CapabilityOwnershipMatrixSchema = TypeExports.Object(
  {
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    kindOrder: TypeExports.Array(CapabilityOwnershipKindSchema),
    rows: TypeExports.Array(CapabilityOwnershipMatrixRowSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership matrix payloads.
 */
export type CapabilityOwnershipMatrix = Static<typeof CapabilityOwnershipMatrixSchema>;

// Capability Ownership Coverage

/**
 * Schema for coverage segment payloads (entries omitted).
 */
export const CapabilityOwnershipCoverageSegmentSchema = TypeExports.Object(
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
    kindSummary: TypeExports.Array(CapabilityOwnershipMatrixCellSchema),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for coverage segment payloads.
 */
export type CapabilityOwnershipCoverageSegment = Static<
  typeof CapabilityOwnershipCoverageSegmentSchema
>;

// Capability Ownership Highlights

/**
 * Schema for ownership highlight segment metadata.
 */
export const CapabilityOwnershipHighlightsSchema: TObject<
  { readonly segments: TArray<TString> },
  "segments",
  never
> = TypeExports.Object(
  {
    segments: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership highlight payloads.
 */
export type CapabilityOwnershipHighlights = Static<typeof CapabilityOwnershipHighlightsSchema>;

// Capability Ownership Stack Map

/**
 * Schema for capability ownership stack summary.
 */
export const CapabilityOwnershipStackSummarySchema: TObject<
  {
    readonly total: TInteger;
    readonly segments: TInteger;
    readonly owners: TInteger;
    readonly responsibilities: TInteger;
    readonly kinds: TInteger;
  },
  "total" | "segments" | "owners" | "responsibilities" | "kinds",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    segments: TypeExports.Integer({ minimum: 0 }),
    owners: TypeExports.Integer({ minimum: 0 }),
    responsibilities: TypeExports.Integer({ minimum: 0 }),
    kinds: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership stack summary.
 */
export type CapabilityOwnershipStackSummary = Static<typeof CapabilityOwnershipStackSummarySchema>;

// Capability Ownership Category Map

/**
 * Schema for capability ownership category entries.
 */
export const CapabilityOwnershipCategorySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    summary: CapabilityOwnershipSummarySchema,
    kinds: TypeExports.Array(CapabilityOwnershipKindSchema),
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    groupIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    surfaceSummary: TypeExports.Optional(CapabilityOwnershipSurfaceSummarySchema),
    mcpSummary: TypeExports.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership category entries.
 */
export type CapabilityOwnershipCategory = Static<typeof CapabilityOwnershipCategorySchema>;

/**
 * Schema for capability ownership category maps.
 */
export const CapabilityOwnershipCategoryMapSchema = TypeExports.Object(
  {
    categoryIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    categories: TypeExports.Array(CapabilityOwnershipCategorySchema),
    summary: CapabilityOwnershipSummarySchema,
    stack: CapabilityOwnershipStackSummarySchema,
    surfaceSummary: TypeExports.Optional(CapabilityOwnershipSurfaceSummarySchema),
    mcpSummary: TypeExports.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership category maps.
 */
export type CapabilityOwnershipCategoryMap = Static<typeof CapabilityOwnershipCategoryMapSchema>;

/**
 * Schema for capability ownership stack map payloads.
 */
export const CapabilityOwnershipStackMapSchema = TypeExports.Object(
  {
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    summary: CapabilityOwnershipStackSummarySchema,
    mcpSummary: TypeExports.Optional(CapabilityOwnershipMcpSurfaceSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership stack map payloads.
 */
export type CapabilityOwnershipStackMap = Static<typeof CapabilityOwnershipStackMapSchema>;

// Capability Ownership Focus

/**
 * Schema for capability ownership focus metadata.
 */
export const CapabilityOwnershipFocusSchema: TObject<
  { readonly segmentIds: TArray<TString>; readonly domainIds: TArray<TString> },
  "domainIds" | "segmentIds",
  never
> = TypeExports.Object(
  {
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus metadata.
 */
export type CapabilityOwnershipFocus = Static<typeof CapabilityOwnershipFocusSchema>;

// Capability Ownership Focus Map

/**
 * Schema for capability ownership focus map payloads.
 */
export const CapabilityOwnershipFocusMapSchema = TypeExports.Object(
  {
    focus: CapabilityOwnershipFocusSchema,
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipMcpSurfaceSchema)),
    categoryMap: TypeExports.Optional(CapabilityOwnershipCategoryMapSchema),
    highlights: TypeExports.Optional(CapabilityOwnershipHighlightsSchema),
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus maps.
 */
export type CapabilityOwnershipFocusMap = Static<typeof CapabilityOwnershipFocusMapSchema>;

// Capability Ownership Stack Entries

/**
 * Schema for capability ownership stack entries.
 */
export const CapabilityOwnershipStackEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    map: CapabilityOwnershipFocusMapSchema,
    summary: CapabilityOwnershipSummarySchema,
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership stack entries.
 */
export type CapabilityOwnershipStackEntry = Static<typeof CapabilityOwnershipStackEntrySchema>;

// Capability Ownership Coverage Map

/**
 * Schema for capability ownership coverage map payloads.
 */
export const CapabilityOwnershipCoverageMapSchema = TypeExports.Object(
  {
    focus: CapabilityOwnershipFocusSchema,
    segments: TypeExports.Array(CapabilityOwnershipCoverageSegmentSchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipMcpSurfaceSchema)),
    matrix: CapabilityOwnershipMatrixSchema,
    summary: CapabilityOwnershipSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership coverage maps.
 */
export type CapabilityOwnershipCoverageMap = Static<typeof CapabilityOwnershipCoverageMapSchema>;
