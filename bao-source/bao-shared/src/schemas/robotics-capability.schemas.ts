/**
 * Robotics capability portfolio schemas.
 *
 * Defines TypeBox schemas for the robotics capability portfolio surface used by
 * the integration hub and autonomy tooling.
 *
 * @shared/schemas/robotics-capability.ts
 */

import { CapabilityOwnershipDomainSchema } from "@baohaus/bao-schemas/capability-ownership/domain";
import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipSegmentSchema } from "@baohaus/bao-schemas/capability-ownership/segment";
import { CapabilityOwnershipSummarySchema } from "@baohaus/bao-schemas/capability-ownership/summary";
import { CapabilityOwnershipSurfaceSchema } from "@baohaus/bao-schemas/capability-ownership/surface";
import { CapabilityPortfolioDeviceReadinessSchema } from "@baohaus/bao-schemas/capability-portfolio.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";
import { BunBuddyKindSchema } from "./bunbuddy.schemas";
import { LibraryCategorySchema } from "./library-registry.schemas";

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
export const RoboticsCapabilityStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"available" | "degraded" | "unavailable" | "disabled">,
    ...Type.TLiteral<"available" | "degraded" | "unavailable" | "disabled">[],
  ]
> = stringEnum(ROBOTICS_CAPABILITY_STATUSES, {
  description: "Robotics capability system status",
});

// Robotics Capability System

/**
 * Robotics capability readiness schema.
 */
export const RoboticsCapabilityReadinessSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    bunbuddyStatus: Type.Union([
      Type.Literal("healthy"),
      Type.Literal("degraded"),
      Type.Literal("unavailable"),
      Type.Literal("unknown"),
    ]),
    deviceReadiness: CapabilityPortfolioDeviceReadinessSchema,
    featuresReady: Type.Boolean(),
    mcpToolsReady: Type.Boolean(),
    policyReady: Type.Boolean(),
    dependenciesReady: Type.Boolean(),
    missingDependencies: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    degradedDependencies: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    missingMcpTools: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    notes: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
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
export const RoboticsCapabilitySurfaceSchema = Type.Object(
  {
    domainIds: Type.Array(Type.String({ minLength: 1 })),
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    capabilityIds: Type.Array(Type.String({ minLength: 1 })),
    bunbuddyKinds: Type.Array(BunBuddyKindSchema),
    libraryCategories: Type.Array(LibraryCategorySchema),
    mcpTools: Type.Array(Type.String({ minLength: 1 })),
    tags: Type.Array(Type.String({ minLength: 1 })),
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
export const RoboticsCapabilitySystemSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    description: Type.String({ minLength: 1 }),
    owner: Type.String({ minLength: 1 }),
    responsibility: Type.String({ minLength: 1 }),
    status: RoboticsCapabilityStatusSchema,
    readiness: RoboticsCapabilityReadinessSchema,
    surfaces: RoboticsCapabilitySurfaceSchema,
    endpoints: Type.Array(Type.String({ minLength: 1 })),
    policies: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
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
export const RoboticsCapabilityPortfolioRequestSchema: Type.TObject<
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
 * TypeScript type for portfolio requests.
 */
export type RoboticsCapabilityPortfolioRequest = Static<
  typeof RoboticsCapabilityPortfolioRequestSchema
>;

/**
 * Schema for robotics capability portfolio refresh requests.
 */
export const RoboticsCapabilityPortfolioRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
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
export const RoboticsCapabilityPortfolioMetadataSchema: Type.TObject<
  {
    readonly ownershipTimestamp: Type.TOptional<Type.TString>;
    readonly queued: Type.TOptional<Type.TBoolean>;
    readonly jobId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly disabled: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly ownershipTimestamp: Type.TOptional<Type.TString>;
    readonly queued: Type.TOptional<Type.TBoolean>;
    readonly jobId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly disabled: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    queued: Type.Optional(Type.Boolean()),
    jobId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    disabled: Type.Optional(Type.Boolean()),
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
export const RoboticsCapabilityPortfolioResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    systems: Type.Array(RoboticsCapabilitySystemSchema),
    domains: Type.Array(CapabilityOwnershipDomainSchema),
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    surfaces: Type.Array(CapabilityOwnershipSurfaceSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    metadata: Type.Optional(RoboticsCapabilityPortfolioMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for robotics capability portfolio responses.
 */
export type RoboticsCapabilityPortfolioResponse = Static<
  typeof RoboticsCapabilityPortfolioResponseSchema
>;
