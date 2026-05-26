/**
 * Capability impact schemas for top hardware/device ownership mapping.
 *
 * Defines TypeBox schemas for the impact summary surface used by the integration hub.
 *
 * @shared/schemas/capability-impact.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  CapabilityOwnershipCategoryMapSchema,
  CapabilityOwnershipDomainSchema,
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipMcpSurfaceSchema,
  CapabilityOwnershipOwnerMapSchema,
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSummarySchema,
  CapabilityOwnershipSurfaceSchema,
} from "./capability-ownership.schemas.ts";

// Capability Impact Requests

/**
 * Schema for capability impact requests.
 */
export const CapabilityImpactRequestSchema: TObject<
  { readonly refresh: TOptional<TBoolean> },
  never,
  "refresh"
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
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
export const CapabilityImpactRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
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
export const CapabilityImpactMetadataSchema: TObject<
  {
    readonly ownershipTimestamp: TOptional<TString>;
    readonly domainIds: TOptional<TArray<TString>>;
    readonly segmentIds: TOptional<TArray<TString>>;
    readonly queued: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
    readonly disabled: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly ownershipTimestamp: TOptional<TString>;
    readonly domainIds: TOptional<TArray<TString>>;
    readonly segmentIds: TOptional<TArray<TString>>;
    readonly queued: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
    readonly disabled: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    domainIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    segmentIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    queued: TypeExports.Optional(TypeExports.Boolean()),
    jobId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    disabled: TypeExports.Optional(TypeExports.Boolean()),
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
export const CapabilityImpactResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    mcpSurfaces: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipMcpSurfaceSchema)),
    categoryMap: TypeExports.Optional(CapabilityOwnershipCategoryMapSchema),
    ownerMap: TypeExports.Optional(CapabilityOwnershipOwnerMapSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    metadata: TypeExports.Optional(CapabilityImpactMetadataSchema),
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
