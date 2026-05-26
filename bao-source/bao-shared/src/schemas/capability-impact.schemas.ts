/**
 * Capability impact schemas for top hardware/device ownership mapping.
 *
 * Defines TypeBox schemas for the impact summary surface used by the integration hub.
 *
 * @shared/schemas/capability-impact.ts
 */

import { CapabilityOwnershipCategoryMapSchema } from "@baohaus/bao-schemas/capability-ownership/category";
import { CapabilityOwnershipDomainSchema } from "@baohaus/bao-schemas/capability-ownership/domain";
import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipMcpSurfaceSchema } from "@baohaus/bao-schemas/capability-ownership/mcp-surface";
import { CapabilityOwnershipOwnerMapSchema } from "@baohaus/bao-schemas/capability-ownership/owner-map";
import { CapabilityOwnershipSegmentSchema } from "@baohaus/bao-schemas/capability-ownership/segment";
import { CapabilityOwnershipSummarySchema } from "@baohaus/bao-schemas/capability-ownership/summary";
import { CapabilityOwnershipSurfaceSchema } from "@baohaus/bao-schemas/capability-ownership/surface";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

// Capability Impact Requests

/**
 * Schema for capability impact requests.
 */
export const CapabilityImpactRequestSchema: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability impact requests.
 */
export type CapabilityImpactRequest = Static<typeof CapabilityImpactRequestSchema>;

/**
 * Schema for capability impact refresh requests.
 */
export const CapabilityImpactRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability impact refresh requests.
 */
export type CapabilityImpactRefreshRequest = Static<typeof CapabilityImpactRefreshRequestSchema>;

// Capability Impact Responses

/**
 * Schema for capability impact metadata.
 */
export const CapabilityImpactMetadataSchema: Type.TObject<
  {
    readonly ownershipTimestamp: Type.TOptional<Type.TString>;
    readonly domainIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly segmentIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly queued: Type.TOptional<Type.TBoolean>;
    readonly jobId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly disabled: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly ownershipTimestamp: Type.TOptional<Type.TString>;
    readonly domainIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly segmentIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly queued: Type.TOptional<Type.TBoolean>;
    readonly jobId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly disabled: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    domainIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    segmentIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    queued: Type.Optional(Type.Boolean()),
    jobId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    disabled: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability impact metadata.
 */
export type CapabilityImpactMetadata = Static<typeof CapabilityImpactMetadataSchema>;

/**
 * Schema for capability impact response payloads.
 */
export const CapabilityImpactResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: Type.Optional(Type.Array(CapabilityOwnershipMcpSurfaceSchema)),
    categoryMap: Type.Optional(CapabilityOwnershipCategoryMapSchema),
    ownerMap: Type.Optional(CapabilityOwnershipOwnerMapSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    metadata: Type.Optional(CapabilityImpactMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability impact responses.
 */
export type CapabilityImpactResponse = Static<typeof CapabilityImpactResponseSchema>;

/**
 * Schema for capability impact refresh responses.
 *
 * @remarks
 * Refresh responses reuse the standard impact response envelope while
 * returning queue metadata when refresh is scheduled.
 */
export const CapabilityImpactRefreshResponseSchema = CapabilityImpactResponseSchema;

/**
 * TypeScript type for capability impact refresh responses.
 */
export type CapabilityImpactRefreshResponse = CapabilityImpactResponse;
