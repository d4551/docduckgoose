/**
 * Capability ownership response schemas.
 *
 * @shared/schemas/capability-ownership/responses.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipCategoryMapSchema } from "./category.ts";
import { CapabilityOwnershipCoverageMapSchema } from "./coverage-map.ts";
import { CapabilityOwnershipDomainSchema } from "./domain.ts";
import { CapabilityOwnershipErrorSchema } from "./errors.ts";
import { CapabilityOwnershipFocusMapSchema, CapabilityOwnershipFocusSchema } from "./focus.ts";
import { CapabilityOwnershipGroupSchema } from "./group.ts";
import { CapabilityOwnershipHighlightsSchema } from "./highlights.ts";
import { CapabilityOwnershipMatrixSchema } from "./matrix.ts";
import { CapabilityOwnershipMcpSurfaceSchema } from "./mcp-surface.ts";
import { CapabilityOwnershipMapMetadataSchema } from "./metadata.ts";
import {
  CapabilityOwnershipOwnerMapMatrixSchema,
  CapabilityOwnershipOwnerMapSchema,
} from "./owner-map.ts";
import { CapabilityOwnershipSegmentSchema } from "./segment.ts";
import { CapabilityOwnershipStackMapSchema } from "./stack.ts";
import { CapabilityOwnershipStackEntrySchema } from "./stack-entry.ts";
import { CapabilityOwnershipSummarySchema } from "./summary.ts";
import { CapabilityOwnershipSurfaceSchema } from "./surface.ts";

/**
 * Schema for capability ownership focus responses.
 */
export const CapabilityOwnershipFocusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    map: CapabilityOwnershipFocusMapSchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus responses.
 */
export type CapabilityOwnershipFocusResponse = Static<
  typeof CapabilityOwnershipFocusResponseSchema
>;

/**
 * Schema for capability ownership coverage responses.
 */
export const CapabilityOwnershipCoverageResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    map: CapabilityOwnershipCoverageMapSchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership coverage responses.
 */
export type CapabilityOwnershipCoverageResponse = Static<
  typeof CapabilityOwnershipCoverageResponseSchema
>;

/**
 * Schema for capability ownership map responses.
 */
export const CapabilityOwnershipMapResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly groups: Type.TArray<typeof CapabilityOwnershipGroupSchema>;
    readonly domains: Type.TArray<typeof CapabilityOwnershipDomainSchema>;
    readonly surfaces: Type.TArray<typeof CapabilityOwnershipSurfaceSchema>;
    readonly mcpSurfaces: Type.TOptional<Type.TArray<typeof CapabilityOwnershipMcpSurfaceSchema>>;
    readonly ownerMap: Type.TOptional<typeof CapabilityOwnershipOwnerMapSchema>;
    readonly ownerMapMatrix: Type.TOptional<typeof CapabilityOwnershipOwnerMapMatrixSchema>;
    readonly segments: Type.TArray<typeof CapabilityOwnershipSegmentSchema>;
    readonly coverage: Type.TOptional<typeof CapabilityOwnershipCoverageMapSchema>;
    readonly matrix: Type.TOptional<typeof CapabilityOwnershipMatrixSchema>;
    readonly stackMap: typeof CapabilityOwnershipStackMapSchema;
    readonly categoryMap: Type.TOptional<typeof CapabilityOwnershipCategoryMapSchema>;
    readonly stacks: Type.TOptional<Type.TArray<typeof CapabilityOwnershipStackEntrySchema>>;
    readonly highlights: Type.TOptional<typeof CapabilityOwnershipHighlightsSchema>;
    readonly focus: Type.TOptional<typeof CapabilityOwnershipFocusSchema>;
    readonly summary: typeof CapabilityOwnershipSummarySchema;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly errors: Type.TOptional<Type.TArray<typeof CapabilityOwnershipErrorSchema>>;
    readonly metadata: Type.TOptional<typeof CapabilityOwnershipMapMetadataSchema>;
    readonly focusMap: Type.TOptional<typeof CapabilityOwnershipFocusMapSchema>;
  },
  "ok" | "groups" | "domains" | "surfaces" | "segments" | "stackMap" | "summary" | "timestamp",
  | "mcpSurfaces"
  | "ownerMap"
  | "ownerMapMatrix"
  | "coverage"
  | "matrix"
  | "categoryMap"
  | "stacks"
  | "highlights"
  | "focus"
  | "correlationId"
  | "errors"
  | "metadata"
  | "focusMap"
> = Type.Object(
  {
    ok: Type.Literal(true),
    groups: Type.Array(CapabilityOwnershipGroupSchema),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: Type.Optional(Type.Array(CapabilityOwnershipMcpSurfaceSchema)),
    ownerMap: Type.Optional(CapabilityOwnershipOwnerMapSchema),
    ownerMapMatrix: Type.Optional(CapabilityOwnershipOwnerMapMatrixSchema),
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    coverage: Type.Optional(CapabilityOwnershipCoverageMapSchema),
    matrix: Type.Optional(CapabilityOwnershipMatrixSchema),
    stackMap: CapabilityOwnershipStackMapSchema,
    categoryMap: Type.Optional(CapabilityOwnershipCategoryMapSchema),
    stacks: Type.Optional(Type.Array(CapabilityOwnershipStackEntrySchema)),
    highlights: Type.Optional(CapabilityOwnershipHighlightsSchema),
    focus: Type.Optional(CapabilityOwnershipFocusSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    metadata: Type.Optional(CapabilityOwnershipMapMetadataSchema),
    focusMap: Type.Optional(CapabilityOwnershipFocusMapSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership map responses.
 */
export type CapabilityOwnershipMapResponse = Static<typeof CapabilityOwnershipMapResponseSchema>;

/**
 * Schema for ownership refresh responses.
 */
export const CapabilityOwnershipRefreshResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    refreshed: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership refresh responses.
 */
export type CapabilityOwnershipRefreshResponse = Static<
  typeof CapabilityOwnershipRefreshResponseSchema
>;

/**
 * Schema for capability ownership MCP resource payloads.
 */
export const CapabilityOwnershipMcpResourceSchema: Type.TObject<
  {
    readonly map: typeof CapabilityOwnershipMapResponseSchema;
    readonly refresh: Type.TOptional<typeof CapabilityOwnershipRefreshResponseSchema>;
    readonly timestamp: Type.TString;
  },
  "map" | "timestamp",
  "refresh"
> = Type.Object(
  {
    map: CapabilityOwnershipMapResponseSchema,
    refresh: Type.Optional(CapabilityOwnershipRefreshResponseSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership MCP resource payloads.
 */
export type CapabilityOwnershipMcpResource = Static<typeof CapabilityOwnershipMcpResourceSchema>;
