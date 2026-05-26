/**
 * Autonomy integration schemas.
 *
 * Defines TypeBox schemas for the autonomy integration snapshot that
 * aligns ownership focus maps with drone + robotics capability portfolios.
 *
 * @shared/schemas/autonomy-integration
 */

import { CapabilityOwnershipCategoryMapSchema } from "@baohaus/bao-schemas/capability-ownership/category";
import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusMapSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";
import { DroneCapabilityPortfolioResponseSchema } from "./drone-capability.schemas";
import { RoboticsCapabilityPortfolioResponseSchema } from "./robotics-capability.schemas";
import { TrainingIntegrationSummarySchema } from "./training-integration.schemas";

// Autonomy Integration Requests

/**
 * Schema for autonomy integration snapshot requests.
 */
export const AutonomyIntegrationRequestSchema: Type.TObject<
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
 * TypeScript type for snapshot requests.
 */
export type AutonomyIntegrationRequest = Static<typeof AutonomyIntegrationRequestSchema>;

/**
 * Schema for autonomy integration refresh requests.
 */
export const AutonomyIntegrationRefreshRequestSchema: Type.TObject<
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
 * TypeScript type for refresh requests.
 */
export type AutonomyIntegrationRefreshRequest = Static<
  typeof AutonomyIntegrationRefreshRequestSchema
>;

// Autonomy Integration Alignment

/**
 * Supported autonomy integration alignment statuses.
 */
export const AUTONOMY_INTEGRATION_ALIGNMENT_STATUSES: readonly [
  "healthy",
  "degraded",
  "unavailable",
  "unknown",
] = ["healthy", "degraded", "unavailable", "unknown"] as const;

/**
 * Type-safe alignment status.
 */
export type AutonomyIntegrationAlignmentStatus =
  (typeof AUTONOMY_INTEGRATION_ALIGNMENT_STATUSES)[number];

/**
 * Alignment status schema.
 */
export const AutonomyIntegrationAlignmentStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
    ...Type.TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
  ]
> = stringEnum(AUTONOMY_INTEGRATION_ALIGNMENT_STATUSES, {
  description: "Ownership alignment status for autonomy systems",
});

/**
 * Schema for autonomy integration alignment entries.
 */
export const AutonomyIntegrationAlignmentSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly stack: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]>;
    readonly systemId: Type.TString;
    readonly systemLabel: Type.TString;
    readonly status: Type.TUnion<
      [
        Type.TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
        ...Type.TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
      ]
    >;
    readonly domainIds: Type.TArray<Type.TString>;
    readonly segmentIds: Type.TArray<Type.TString>;
    readonly missingDomains: Type.TArray<Type.TString>;
    readonly missingSegments: Type.TArray<Type.TString>;
  },
  | "stack"
  | "domainIds"
  | "segmentIds"
  | "missingDomains"
  | "missingSegments"
  | "id"
  | "systemId"
  | "systemLabel"
  | "status",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    stack: Type.Union([Type.Literal("drone"), Type.Literal("robotics")]),
    systemId: Type.String({ minLength: 1 }),
    systemLabel: Type.String({ minLength: 1 }),
    status: AutonomyIntegrationAlignmentStatusSchema,
    domainIds: Type.Array(Type.String({ minLength: 1 })),
    segmentIds: Type.Array(Type.String({ minLength: 1 })),
    missingDomains: Type.Array(Type.String({ minLength: 1 })),
    missingSegments: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment entries.
 */
export type AutonomyIntegrationAlignment = Static<typeof AutonomyIntegrationAlignmentSchema>;

/**
 * Schema for autonomy integration alignment snapshots.
 */
export const AutonomyIntegrationAlignmentSnapshotSchema: Type.TObject<
  {
    readonly systems: Type.TArray<
      Type.TObject<
        {
          readonly id: Type.TString;
          readonly stack: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"robotics">)[]>;
          readonly systemId: Type.TString;
          readonly systemLabel: Type.TString;
          readonly status: Type.TUnion<
            [
              Type.TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
              ...Type.TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
            ]
          >;
          readonly domainIds: Type.TArray<Type.TString>;
          readonly segmentIds: Type.TArray<Type.TString>;
          readonly missingDomains: Type.TArray<Type.TString>;
          readonly missingSegments: Type.TArray<Type.TString>;
        },
        | "stack"
        | "domainIds"
        | "segmentIds"
        | "missingDomains"
        | "missingSegments"
        | "id"
        | "systemId"
        | "systemLabel"
        | "status",
        never
      >
    >;
  },
  "systems",
  never
> = Type.Object(
  {
    systems: Type.Array(AutonomyIntegrationAlignmentSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for alignment snapshots.
 */
export type AutonomyIntegrationAlignmentSnapshot = Static<
  typeof AutonomyIntegrationAlignmentSnapshotSchema
>;

// Autonomy Integration Responses

/**
 * Schema for autonomy integration response metadata.
 */
export const AutonomyIntegrationMetadataSchema = Type.Object(
  {
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    droneTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    roboticsTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    trainingTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    queued: Type.Optional(Type.Boolean()),
    jobId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    disabled: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for autonomy integration metadata.
 */
export type AutonomyIntegrationMetadata = Static<typeof AutonomyIntegrationMetadataSchema>;

/**
 * Schema for autonomy integration responses.
 */
export const AutonomyIntegrationResponseSchema: TSchema = Type.Object(
  {
    ok: Type.Literal(true),
    ownership: CapabilityOwnershipFocusMapSchema,
    ownershipCategoryMap: CapabilityOwnershipCategoryMapSchema,
    drone: DroneCapabilityPortfolioResponseSchema,
    robotics: RoboticsCapabilityPortfolioResponseSchema,
    training: Type.Optional(TrainingIntegrationSummarySchema),
    alignment: AutonomyIntegrationAlignmentSnapshotSchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    metadata: Type.Optional(AutonomyIntegrationMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for autonomy integration responses.
 */
export type AutonomyIntegrationResponse = Static<typeof AutonomyIntegrationResponseSchema>;
