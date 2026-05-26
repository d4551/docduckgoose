/**
 * Capability ownership metadata schemas (MCP resource metadata, policy stats,
 * map limits, device inventory metadata, and the aggregated map metadata).
 *
 * @shared/schemas/capability-ownership/metadata.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "../baobox-enum.ts";
import { McpRuntimeServerMetadataSchema } from "../mcp-runtime.schemas.ts";

/**
 * Schema for MCP resource metadata in ownership maps.
 */
export const CapabilityOwnershipMcpResourceMetadataSchema: Type.TObject<
  {
    readonly uri: Type.TString;
    readonly name: Type.TString;
    readonly title: Type.TOptional<Type.TString>;
    readonly description: Type.TOptional<Type.TString>;
    readonly mimeType: Type.TOptional<Type.TString>;
    readonly allowRefresh: Type.TOptional<Type.TBoolean>;
  },
  "uri" | "name",
  Type.InferOptionalKeys<{
    readonly uri: Type.TString;
    readonly name: Type.TString;
    readonly title: Type.TOptional<Type.TString>;
    readonly description: Type.TOptional<Type.TString>;
    readonly mimeType: Type.TOptional<Type.TString>;
    readonly allowRefresh: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    uri: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    title: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String()),
    mimeType: Type.Optional(Type.String({ minLength: 1 })),
    allowRefresh: Type.Optional(Type.Boolean()),
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
export const CapabilityOwnershipPolicyStatsSchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly overridden: Type.TInteger;
    readonly ownerOverrides: Type.TInteger;
    readonly responsibilityOverrides: Type.TInteger;
  },
  "total" | "overridden" | "ownerOverrides" | "responsibilityOverrides",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    overridden: Type.Integer({ minimum: 0 }),
    ownerOverrides: Type.Integer({ minimum: 0 }),
    responsibilityOverrides: Type.Integer({ minimum: 0 }),
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
export const CapabilityOwnershipPolicyGroupSummarySchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly label: Type.TString;
    readonly stats: Type.TObject<
      {
        readonly total: Type.TInteger;
        readonly overridden: Type.TInteger;
        readonly ownerOverrides: Type.TInteger;
        readonly responsibilityOverrides: Type.TInteger;
      },
      "total" | "overridden" | "ownerOverrides" | "responsibilityOverrides",
      never
    >;
  },
  "id" | "label" | "stats",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
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
export const CapabilityOwnershipPolicySummarySchema = Type.Object(
  {
    total: CapabilityOwnershipPolicyStatsSchema,
    // See note in `CapabilityOwnershipSummarySchema` for why this is an object.
    byKind: Type.Object(
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
    byGroup: Type.Array(CapabilityOwnershipPolicyGroupSummarySchema),
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
export const CapabilityOwnershipMapSegmentLimitSchema: Type.TObject<
  {
    readonly limit: Type.TInteger;
    readonly available: Type.TInteger;
    readonly selected: Type.TInteger;
    readonly truncated: Type.TBoolean;
  },
  "limit" | "available" | "selected" | "truncated",
  never
> = Type.Object(
  {
    limit: Type.Integer({ minimum: 0 }),
    available: Type.Integer({ minimum: 0 }),
    selected: Type.Integer({ minimum: 0 }),
    truncated: Type.Boolean(),
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
export const CapabilityOwnershipMapEntryLimitSchema: Type.TObject<
  { readonly limit: Type.TInteger; readonly truncated: Type.TBoolean },
  "limit" | "truncated",
  never
> = Type.Object(
  {
    limit: Type.Integer({ minimum: 0 }),
    truncated: Type.Boolean(),
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
export const CapabilityOwnershipMapLimitsSchema: Type.TObject<
  {
    readonly segments: Type.TObject<
      {
        readonly limit: Type.TInteger;
        readonly available: Type.TInteger;
        readonly selected: Type.TInteger;
        readonly truncated: Type.TBoolean;
      },
      "limit" | "available" | "selected" | "truncated",
      never
    >;
    readonly entries: Type.TObject<
      { readonly limit: Type.TInteger; readonly truncated: Type.TBoolean },
      "limit" | "truncated",
      never
    >;
  },
  "segments" | "entries",
  never
> = Type.Object(
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
export const CapabilityOwnershipDeviceInventorySourceSchema: Type.TUnion<
  [
    Type.TLiteral<"database" | "bunbuddy" | "none">,
    ...Type.TLiteral<"database" | "bunbuddy" | "none">[],
  ]
> = stringEnum(CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES, {
  description: "Device inventory source",
});

/**
 * Schema for device inventory metadata attached to ownership maps.
 */
export const CapabilityOwnershipDeviceInventoryMetadataSchema: Type.TObject<
  {
    readonly source: Type.TUnion<
      [
        Type.TLiteral<"database" | "bunbuddy" | "none">,
        ...Type.TLiteral<"database" | "bunbuddy" | "none">[],
      ]
    >;
    readonly count: Type.TInteger;
    readonly limit: Type.TInteger;
    readonly includeSimulated: Type.TBoolean;
  },
  "source" | "count" | "limit" | "includeSimulated",
  never
> = Type.Object(
  {
    source: CapabilityOwnershipDeviceInventorySourceSchema,
    count: Type.Integer({ minimum: 0 }),
    limit: Type.Integer({ minimum: 0 }),
    includeSimulated: Type.Boolean(),
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
export const CapabilityOwnershipMapMetadataSchema = Type.Object(
  {
    disabled: Type.Optional(Type.Boolean()),
    mcp: Type.Optional(CapabilityOwnershipMcpResourceMetadataSchema),
    mcpServers: Type.Optional(Type.Array(McpRuntimeServerMetadataSchema)),
    policy: Type.Optional(CapabilityOwnershipPolicySummarySchema),
    limits: Type.Optional(CapabilityOwnershipMapLimitsSchema),
    deviceInventory: Type.Optional(CapabilityOwnershipDeviceInventoryMetadataSchema),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for ownership map metadata.
 */
export type CapabilityOwnershipMapMetadata = Static<typeof CapabilityOwnershipMapMetadataSchema>;
