/**
 * Robotics capability portfolio schemas.
 *
 * Defines TypeBox schemas for the robotics capability portfolio surface used by
 * the integration hub and autonomy tooling.
 *
 * @shared/schemas/robotics-capability.ts
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

// Robotics Capability Status

/**
 * Supported robotics capability system statuses.
 */
export const ROBOTICS_CAPABILITY_STATUSES: readonly [
  "available",
  "degraded",
  "unavailable",
  "disabled",
] = ["available", "degraded", "unavailable", "disabled"] as const;

/**
 * Type-safe robotics capability status.
 */
export type RoboticsCapabilityStatus = (typeof ROBOTICS_CAPABILITY_STATUSES)[number];

/**
 * Robotics capability status schema.
 */
export const RoboticsCapabilityStatusSchema: TUnion<
  [
    TLiteral<"available" | "degraded" | "unavailable" | "disabled">,
    ...TLiteral<"available" | "degraded" | "unavailable" | "disabled">[],
  ]
> = stringEnum(ROBOTICS_CAPABILITY_STATUSES, {
  description: "Robotics capability system status",
});

// Robotics Capability System

/**
 * Robotics capability readiness schema.
 */
export const RoboticsCapabilityReadinessSchema = TypeExports.Object(
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
 * TypeScript type for robotics capability readiness.
 */
export type RoboticsCapabilityReadiness = Static<typeof RoboticsCapabilityReadinessSchema>;

/**
 * Robotics capability surface mapping schema.
 */
export const RoboticsCapabilitySurfaceSchema = TypeExports.Object(
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
 * TypeScript type for robotics capability surface mapping.
 */
export type RoboticsCapabilitySurface = Static<typeof RoboticsCapabilitySurfaceSchema>;

/**
 * Robotics capability system schema.
 */
export const RoboticsCapabilitySystemSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    description: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.String({ minLength: 1 }),
    responsibility: TypeExports.String({ minLength: 1 }),
    status: RoboticsCapabilityStatusSchema,
    readiness: RoboticsCapabilityReadinessSchema,
    surfaces: RoboticsCapabilitySurfaceSchema,
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    policies: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for robotics capability system.
 */
export type RoboticsCapabilitySystem = Static<typeof RoboticsCapabilitySystemSchema>;

// Robotics Capability Portfolio

/**
 * Schema for robotics capability portfolio requests.
 */
export const RoboticsCapabilityPortfolioRequestSchema: TObject<
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
export type RoboticsCapabilityPortfolioRequest = Static<
  typeof RoboticsCapabilityPortfolioRequestSchema
>;

/**
 * Schema for robotics capability portfolio refresh requests.
 */
export const RoboticsCapabilityPortfolioRefreshRequestSchema: TObject<
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
export type RoboticsCapabilityPortfolioRefreshRequest = Static<
  typeof RoboticsCapabilityPortfolioRefreshRequestSchema
>;

/**
 * Schema for robotics capability portfolio metadata.
 */
export const RoboticsCapabilityPortfolioMetadataSchema: TObject<
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
 * TypeScript type for robotics capability portfolio metadata.
 */
export type RoboticsCapabilityPortfolioMetadata = Static<
  typeof RoboticsCapabilityPortfolioMetadataSchema
>;

/**
 * Schema for robotics capability portfolio responses.
 */
export const RoboticsCapabilityPortfolioResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    systems: TypeExports.Array(RoboticsCapabilitySystemSchema),
    domains: TypeExports.Array(CapabilityOwnershipDomainSchema),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    surfaces: TypeExports.Array(CapabilityOwnershipSurfaceSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    metadata: TypeExports.Optional(RoboticsCapabilityPortfolioMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for robotics capability portfolio responses.
 */
export type RoboticsCapabilityPortfolioResponse = Static<
  typeof RoboticsCapabilityPortfolioResponseSchema
>;
