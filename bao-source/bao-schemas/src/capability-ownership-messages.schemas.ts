/**
 * Capability ownership — errors, map metadata, API responses, MCP resource envelope.
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TSchema,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import type { CapabilityOwnershipSummary } from "./capability-ownership-foundation.schemas.ts";
import { CapabilityOwnershipSummarySchema } from "./capability-ownership-foundation.schemas.ts";
import type {
  CapabilityOwnershipCategoryMap,
  CapabilityOwnershipCoverageMap,
  CapabilityOwnershipFocus,
  CapabilityOwnershipFocusMap,
  CapabilityOwnershipHighlights,
  CapabilityOwnershipMatrix,
  CapabilityOwnershipStackEntry,
  CapabilityOwnershipStackMap,
} from "./capability-ownership-layers.schemas.ts";
import {
  CapabilityOwnershipCategoryMapSchema,
  CapabilityOwnershipCoverageMapSchema,
  CapabilityOwnershipFocusMapSchema,
  CapabilityOwnershipFocusSchema,
  CapabilityOwnershipHighlightsSchema,
  CapabilityOwnershipMatrixSchema,
  CapabilityOwnershipStackEntrySchema,
  CapabilityOwnershipStackMapSchema,
} from "./capability-ownership-layers.schemas.ts";
import type {
  CapabilityOwnershipDomain,
  CapabilityOwnershipGroup,
  CapabilityOwnershipMcpSurface,
  CapabilityOwnershipOwnerMap,
  CapabilityOwnershipOwnerMapMatrix,
  CapabilityOwnershipSegment,
  CapabilityOwnershipSurface,
} from "./capability-ownership-views.schemas.ts";
import {
  CapabilityOwnershipDomainSchema,
  CapabilityOwnershipGroupSchema,
  CapabilityOwnershipMcpSurfaceSchema,
  CapabilityOwnershipOwnerMapMatrixSchema,
  CapabilityOwnershipOwnerMapSchema,
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSurfaceSchema,
} from "./capability-ownership-views.schemas.ts";
import { McpRuntimeServerMetadataSchema } from "./mcp-runtime.schemas.ts";

// Capability Ownership Errors

/**
 * Schema for ownership map errors.
 */
export const CapabilityOwnershipErrorSchema: TObject<
  {
    readonly scope: TString;
    readonly message: TString;
    readonly code: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  },
  "scope" | "message",
  InferOptionalKeys<{
    readonly scope: TString;
    readonly message: TString;
    readonly code: TOptional<TString>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    scope: TypeExports.String({ minLength: 1 }),
    message: TypeExports.String({ minLength: 1 }),
    code: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    details: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership map errors.
 */
export type CapabilityOwnershipError = Static<typeof CapabilityOwnershipErrorSchema>;

// Capability Ownership Metadata

/**
 * Schema for MCP resource metadata in ownership maps.
 */
export const CapabilityOwnershipMcpResourceMetadataSchema: TObject<
  {
    readonly uri: TString;
    readonly name: TString;
    readonly title: TOptional<TString>;
    readonly description: TOptional<TString>;
    readonly mimeType: TOptional<TString>;
    readonly allowRefresh: TOptional<TBoolean>;
  },
  "uri" | "name",
  InferOptionalKeys<{
    readonly uri: TString;
    readonly name: TString;
    readonly title: TOptional<TString>;
    readonly description: TOptional<TString>;
    readonly mimeType: TOptional<TString>;
    readonly allowRefresh: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    uri: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    title: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String()),
    mimeType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    allowRefresh: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for MCP resource metadata.
 */
export type CapabilityOwnershipMcpResourceMetadata = Static<
  typeof CapabilityOwnershipMcpResourceMetadataSchema
>;

/**
 * Schema for ownership policy stats counters.
 */
export const CapabilityOwnershipPolicyStatsSchema: TObject<
  {
    readonly total: TInteger;
    readonly overridden: TInteger;
    readonly ownerOverrides: TInteger;
    readonly responsibilityOverrides: TInteger;
  },
  "total" | "overridden" | "ownerOverrides" | "responsibilityOverrides",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    overridden: TypeExports.Integer({ minimum: 0 }),
    ownerOverrides: TypeExports.Integer({ minimum: 0 }),
    responsibilityOverrides: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership policy stats counters.
 */
export type CapabilityOwnershipPolicyStats = Static<typeof CapabilityOwnershipPolicyStatsSchema>;

/**
 * Schema for ownership policy group summaries.
 */
export const CapabilityOwnershipPolicyGroupSummarySchema: TObject<
  {
    readonly id: TString;
    readonly label: TString;
    readonly stats: TObject<
      {
        readonly total: TInteger;
        readonly overridden: TInteger;
        readonly ownerOverrides: TInteger;
        readonly responsibilityOverrides: TInteger;
      },
      "total" | "overridden" | "ownerOverrides" | "responsibilityOverrides",
      never
    >;
  },
  "id" | "label" | "stats",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    stats: CapabilityOwnershipPolicyStatsSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership policy group summaries.
 */
export type CapabilityOwnershipPolicyGroupSummary = Static<
  typeof CapabilityOwnershipPolicyGroupSummarySchema
>;

/**
 * Schema for ownership policy summary payloads.
 */
export const CapabilityOwnershipPolicySummarySchema = TypeExports.Object(
  {
    total: CapabilityOwnershipPolicyStatsSchema,
    // See note in `CapabilityOwnershipSummarySchema` for why this is an object.
    byKind: TypeExports.Object(
      {
        plugin: CapabilityOwnershipPolicyStatsSchema,
        bunbuddy: CapabilityOwnershipPolicyStatsSchema,
        library: CapabilityOwnershipPolicyStatsSchema,
        driver: CapabilityOwnershipPolicyStatsSchema,
        device: CapabilityOwnershipPolicyStatsSchema,
        bao: CapabilityOwnershipPolicyStatsSchema,
      },
      { additionalProperties: false },
    ),
    byGroup: TypeExports.Array(CapabilityOwnershipPolicyGroupSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership policy summary payloads.
 */
export type CapabilityOwnershipPolicySummary = Static<
  typeof CapabilityOwnershipPolicySummarySchema
>;

/**
 * Schema for ownership map segment limit metadata.
 */
export const CapabilityOwnershipMapSegmentLimitSchema: TObject<
  {
    readonly limit: TInteger;
    readonly available: TInteger;
    readonly selected: TInteger;
    readonly truncated: TBoolean;
  },
  "limit" | "available" | "selected" | "truncated",
  never
> = TypeExports.Object(
  {
    limit: TypeExports.Integer({ minimum: 0 }),
    available: TypeExports.Integer({ minimum: 0 }),
    selected: TypeExports.Integer({ minimum: 0 }),
    truncated: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership map segment limit metadata.
 */
export type CapabilityOwnershipMapSegmentLimit = Static<
  typeof CapabilityOwnershipMapSegmentLimitSchema
>;

/**
 * Schema for ownership map entry limit metadata.
 */
export const CapabilityOwnershipMapEntryLimitSchema: TObject<
  { readonly limit: TInteger; readonly truncated: TBoolean },
  "limit" | "truncated",
  never
> = TypeExports.Object(
  {
    limit: TypeExports.Integer({ minimum: 0 }),
    truncated: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership map entry limit metadata.
 */
export type CapabilityOwnershipMapEntryLimit = Static<
  typeof CapabilityOwnershipMapEntryLimitSchema
>;

/**
 * Schema for ownership map limit metadata.
 */
export const CapabilityOwnershipMapLimitsSchema: TObject<
  {
    readonly segments: TObject<
      {
        readonly limit: TInteger;
        readonly available: TInteger;
        readonly selected: TInteger;
        readonly truncated: TBoolean;
      },
      "limit" | "available" | "selected" | "truncated",
      never
    >;
    readonly entries: TObject<
      { readonly limit: TInteger; readonly truncated: TBoolean },
      "limit" | "truncated",
      never
    >;
  },
  "segments" | "entries",
  never
> = TypeExports.Object(
  {
    segments: CapabilityOwnershipMapSegmentLimitSchema,
    entries: CapabilityOwnershipMapEntryLimitSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership map limit metadata.
 */
export type CapabilityOwnershipMapLimits = Static<typeof CapabilityOwnershipMapLimitsSchema>;

/**
 * Supported device inventory sources for ownership metadata.
 */
export const CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES: readonly [
  "database",
  "bunbuddy",
  "none",
] = ["database", "bunbuddy", "none"] as const;

/**
 * Type-safe device inventory source enumeration.
 */
export type CapabilityOwnershipDeviceInventorySource =
  (typeof CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES)[number];

/**
 * Device inventory source schema.
 */
export const CapabilityOwnershipDeviceInventorySourceSchema: TUnion<
  [TLiteral<"database" | "bunbuddy" | "none">, ...TLiteral<"database" | "bunbuddy" | "none">[]]
> = stringEnum(CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES, {
  description: "Device inventory source",
});

/**
 * Schema for device inventory metadata attached to ownership maps.
 */
export const CapabilityOwnershipDeviceInventoryMetadataSchema: TObject<
  {
    readonly source: TUnion<
      [TLiteral<"database" | "bunbuddy" | "none">, ...TLiteral<"database" | "bunbuddy" | "none">[]]
    >;
    readonly count: TInteger;
    readonly limit: TInteger;
    readonly includeSimulated: TBoolean;
  },
  "source" | "count" | "limit" | "includeSimulated",
  never
> = TypeExports.Object(
  {
    source: CapabilityOwnershipDeviceInventorySourceSchema,
    count: TypeExports.Integer({ minimum: 0 }),
    limit: TypeExports.Integer({ minimum: 0 }),
    includeSimulated: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for device inventory metadata.
 */
export type CapabilityOwnershipDeviceInventoryMetadata = Static<
  typeof CapabilityOwnershipDeviceInventoryMetadataSchema
>;

/**
 * Schema for ownership map metadata.
 */
export const CapabilityOwnershipMapMetadataSchema = TypeExports.Object(
  {
    disabled: TypeExports.Optional(TypeExports.Boolean()),
    mcp: TypeExports.Optional(CapabilityOwnershipMcpResourceMetadataSchema),
    mcpServers: TypeExports.Optional(TypeExports.Array(McpRuntimeServerMetadataSchema)),
    policy: TypeExports.Optional(CapabilityOwnershipPolicySummarySchema),
    limits: TypeExports.Optional(CapabilityOwnershipMapLimitsSchema),
    deviceInventory: TypeExports.Optional(CapabilityOwnershipDeviceInventoryMetadataSchema),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for ownership map metadata.
 */
export type CapabilityOwnershipMapMetadata = Static<typeof CapabilityOwnershipMapMetadataSchema>;

// Capability Ownership Responses

/**
 * Schema for capability ownership focus responses.
 */
export const CapabilityOwnershipFocusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    map: CapabilityOwnershipFocusMapSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
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
export const CapabilityOwnershipCoverageResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    map: CapabilityOwnershipCoverageMapSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
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
export const CapabilityOwnershipMapResponseSchema: TSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    groups: TypeExports.Array(CapabilityOwnershipGroupSchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipMcpSurfaceSchema)),
    ownerMap: TypeExports.Optional(CapabilityOwnershipOwnerMapSchema),
    ownerMapMatrix: TypeExports.Optional(CapabilityOwnershipOwnerMapMatrixSchema),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    coverage: TypeExports.Optional(CapabilityOwnershipCoverageMapSchema),
    matrix: TypeExports.Optional(CapabilityOwnershipMatrixSchema),
    stackMap: CapabilityOwnershipStackMapSchema,
    categoryMap: TypeExports.Optional(CapabilityOwnershipCategoryMapSchema),
    stacks: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipStackEntrySchema)),
    highlights: TypeExports.Optional(CapabilityOwnershipHighlightsSchema),
    focus: TypeExports.Optional(CapabilityOwnershipFocusSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    metadata: TypeExports.Optional(CapabilityOwnershipMapMetadataSchema),
    focusMap: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership map responses.
 */
export interface CapabilityOwnershipMapResponse {
  ok: true;
  groups: CapabilityOwnershipGroup[];
  domains: CapabilityOwnershipDomain[];
  surfaces: CapabilityOwnershipSurface[];
  mcpSurfaces?: CapabilityOwnershipMcpSurface[];
  ownerMap?: CapabilityOwnershipOwnerMap;
  ownerMapMatrix?: CapabilityOwnershipOwnerMapMatrix;
  segments: CapabilityOwnershipSegment[];
  coverage?: CapabilityOwnershipCoverageMap;
  matrix?: CapabilityOwnershipMatrix;
  stackMap: CapabilityOwnershipStackMap;
  categoryMap?: CapabilityOwnershipCategoryMap;
  stacks?: CapabilityOwnershipStackEntry[];
  highlights?: CapabilityOwnershipHighlights;
  focus?: CapabilityOwnershipFocus;
  summary: CapabilityOwnershipSummary;
  timestamp: string;
  correlationId?: string;
  errors?: CapabilityOwnershipError[];
  metadata?: CapabilityOwnershipMapMetadata;
  focusMap?: CapabilityOwnershipFocusMap;
}

/**
 * Schema for ownership refresh responses.
 */
export const CapabilityOwnershipRefreshResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly refreshed: TBoolean;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    refreshed: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
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
export const CapabilityOwnershipMcpResourceSchema: TSchema = TypeExports.Object(
  {
    map: CapabilityOwnershipMapResponseSchema,
    refresh: TypeExports.Optional(CapabilityOwnershipRefreshResponseSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership MCP resource payloads.
 */
export interface CapabilityOwnershipMcpResource {
  map: CapabilityOwnershipMapResponse;
  refresh?: CapabilityOwnershipRefreshResponse;
  timestamp: string;
}
