/**
 * Drone capability portfolio schemas.
 *
 * Defines TypeBox schemas for the drone capability portfolio surface used by
 * the integration hub and autonomy tooling.
 *
 * @shared/schemas/drone-capability.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import {
  CapabilityOwnershipDomainSchema,
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSummarySchema,
  CapabilityOwnershipSurfaceSchema,
} from "./capability-ownership.schemas.ts";
import { CapabilityPortfolioDeviceReadinessSchema } from "./capability-portfolio.schemas.ts";
import { LibraryCategorySchema } from "./library-registry.schemas.ts";

// Drone Capability Status

/**
 * Supported drone capability system statuses.
 */
export const DRONE_CAPABILITY_STATUSES: readonly [
  "available",
  "degraded",
  "unavailable",
  "disabled",
] = ["available", "degraded", "unavailable", "disabled"] as const;

/**
 * Type-safe drone capability status.
 */
export type DroneCapabilityStatus = (typeof DRONE_CAPABILITY_STATUSES)[number];

/**
 * Drone capability status schema.
 */
export const DroneCapabilityStatusSchema: TUnion<
  [
    TLiteral<"available" | "degraded" | "unavailable" | "disabled">,
    ...TLiteral<"available" | "degraded" | "unavailable" | "disabled">[],
  ]
> = stringEnum(DRONE_CAPABILITY_STATUSES, {
  description: "Drone capability system status",
});

// Drone Capability System

/**
 * Drone capability readiness schema.
 */
export const DroneCapabilityReadinessSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    bunbuddyStatus: TypeExports.Union([
      TypeExports.Literal("healthy"),
      TypeExports.Literal("degraded"),
      TypeExports.Literal("unavailable"),
      TypeExports.Literal("unknown"),
    ]),
    deviceReadiness: CapabilityPortfolioDeviceReadinessSchema,
    featuresReady: TypeExports.Boolean(),
    mcpToolsReady: TypeExports.Boolean(),
    policyReady: TypeExports.Boolean(),
    dependenciesReady: TypeExports.Boolean(),
    missingDependencies: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
    degradedDependencies: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
    missingMcpTools: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for drone capability readiness.
 */
export type DroneCapabilityReadiness = Static<typeof DroneCapabilityReadinessSchema>;

/**
 * Drone capability surface mapping schema.
 */
export const DroneCapabilitySurfaceSchema = TypeExports.Object(
  {
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    capabilityIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    bunbuddyKinds: TypeExports.Array(BunBuddyKindSchema),
    libraryCategories: TypeExports.Array(LibraryCategorySchema),
    mcpTools: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    tags: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for drone capability surface mapping.
 */
export type DroneCapabilitySurface = Static<typeof DroneCapabilitySurfaceSchema>;

/**
 * Drone capability system schema.
 */
export const DroneCapabilitySystemSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    description: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.String({ minLength: 1 }),
    responsibility: TypeExports.String({ minLength: 1 }),
    status: DroneCapabilityStatusSchema,
    readiness: DroneCapabilityReadinessSchema,
    surfaces: DroneCapabilitySurfaceSchema,
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    policies: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for drone capability system.
 */
export type DroneCapabilitySystem = Static<typeof DroneCapabilitySystemSchema>;

// Drone Capability Portfolio

/**
 * Schema for drone capability portfolio requests.
 */
export const DroneCapabilityPortfolioRequestSchema: TObject<
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
 * TypeScript type for portfolio requests.
 */
export type DroneCapabilityPortfolioRequest = Static<typeof DroneCapabilityPortfolioRequestSchema>;

/**
 * Schema for drone capability portfolio refresh requests.
 */
export const DroneCapabilityPortfolioRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for portfolio refresh requests.
 */
export type DroneCapabilityPortfolioRefreshRequest = Static<
  typeof DroneCapabilityPortfolioRefreshRequestSchema
>;

/**
 * Schema for drone capability portfolio metadata.
 */
export const DroneCapabilityPortfolioMetadataSchema: TObject<
  {
    readonly ownershipTimestamp: TOptional<TString>;
    readonly queued: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
    readonly disabled: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly ownershipTimestamp: TOptional<TString>;
    readonly queued: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
    readonly disabled: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    queued: TypeExports.Optional(TypeExports.Boolean()),
    jobId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    disabled: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for drone capability portfolio metadata.
 */
export type DroneCapabilityPortfolioMetadata = Static<
  typeof DroneCapabilityPortfolioMetadataSchema
>;

/**
 * Schema for drone capability portfolio responses.
 */
export const DroneCapabilityPortfolioResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    systems: TypeExports.Array(DroneCapabilitySystemSchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    metadata: TypeExports.Optional(DroneCapabilityPortfolioMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for drone capability portfolio responses.
 */
export type DroneCapabilityPortfolioResponse = Static<
  typeof DroneCapabilityPortfolioResponseSchema
>;
