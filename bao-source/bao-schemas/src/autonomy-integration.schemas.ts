/**
 * Autonomy integration schemas.
 *
 * Defines TypeBox schemas for the autonomy integration snapshot that
 * aligns ownership focus maps with drone + robotics capability portfolios.
 *
 * @shared/schemas/autonomy-integration
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TObject,
  TOptional,
  TSchema,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import {
  CapabilityOwnershipCategoryMapSchema,
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
} from "./capability-ownership.schemas.ts";
import { DroneCapabilityPortfolioResponseSchema } from "./drone-capability.schemas.ts";
import { RoboticsCapabilityPortfolioResponseSchema } from "./robotics-capability.schemas.ts";
import { TrainingIntegrationSummarySchema } from "./training-integration.schemas.ts";

// Autonomy Integration Requests

/**
 * Schema for autonomy integration snapshot requests.
 */
export const AutonomyIntegrationRequestSchema: TObject<
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
 * TypeScript type for snapshot requests.
 */
export type AutonomyIntegrationRequest = Static<typeof AutonomyIntegrationRequestSchema>;

/**
 * Schema for autonomy integration refresh requests.
 */
export const AutonomyIntegrationRefreshRequestSchema: TObject<
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
export const AutonomyIntegrationAlignmentStatusSchema: TUnion<
  [
    TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
    ...TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
  ]
> = stringEnum(AUTONOMY_INTEGRATION_ALIGNMENT_STATUSES, {
  description: "Ownership alignment status for autonomy systems",
});

/**
 * Schema for autonomy integration alignment entries.
 */
export const AutonomyIntegrationAlignmentSchema: TObject<
  {
    readonly id: TString;
    readonly stack: TUnion<(TLiteral<"drone"> | TLiteral<"robotics">)[]>;
    readonly systemId: TString;
    readonly systemLabel: TString;
    readonly status: TUnion<
      [
        TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
        ...TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
      ]
    >;
    readonly domainIds: TArray<TString>;
    readonly segmentIds: TArray<TString>;
    readonly missingDomains: TArray<TString>;
    readonly missingSegments: TArray<TString>;
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
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    stack: TypeExports.Union([TypeExports.Literal("drone"), TypeExports.Literal("robotics")]),
    systemId: TypeExports.String({ minLength: 1 }),
    systemLabel: TypeExports.String({ minLength: 1 }),
    status: AutonomyIntegrationAlignmentStatusSchema,
    domainIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    segmentIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    missingDomains: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    missingSegments: TypeExports.Array(TypeExports.String({ minLength: 1 })),
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
export const AutonomyIntegrationAlignmentSnapshotSchema: TObject<
  {
    readonly systems: TArray<
      TObject<
        {
          readonly id: TString;
          readonly stack: TUnion<(TLiteral<"drone"> | TLiteral<"robotics">)[]>;
          readonly systemId: TString;
          readonly systemLabel: TString;
          readonly status: TUnion<
            [
              TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">,
              ...TLiteral<"healthy" | "degraded" | "unavailable" | "unknown">[],
            ]
          >;
          readonly domainIds: TArray<TString>;
          readonly segmentIds: TArray<TString>;
          readonly missingDomains: TArray<TString>;
          readonly missingSegments: TArray<TString>;
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
> = TypeExports.Object(
  {
    systems: TypeExports.Array(AutonomyIntegrationAlignmentSchema),
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
export const AutonomyIntegrationMetadataSchema = TypeExports.Object(
  {
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    droneTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    roboticsTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    trainingTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    queued: TypeExports.Optional(TypeExports.Boolean()),
    jobId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    disabled: TypeExports.Optional(TypeExports.Boolean()),
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
export const AutonomyIntegrationResponseSchema: TSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    ownership: CapabilityOwnershipFocusMapSchema,
    ownershipCategoryMap: CapabilityOwnershipCategoryMapSchema,
    drone: DroneCapabilityPortfolioResponseSchema,
    robotics: RoboticsCapabilityPortfolioResponseSchema,
    training: TypeExports.Optional(TrainingIntegrationSummarySchema),
    alignment: AutonomyIntegrationAlignmentSnapshotSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    metadata: TypeExports.Optional(AutonomyIntegrationMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for autonomy integration responses.
 */
export interface AutonomyIntegrationResponse {
  ok: true;
  ownership: Static<typeof CapabilityOwnershipFocusMapSchema>;
  ownershipCategoryMap: Static<typeof CapabilityOwnershipCategoryMapSchema>;
  drone: Static<typeof DroneCapabilityPortfolioResponseSchema>;
  robotics: Static<typeof RoboticsCapabilityPortfolioResponseSchema>;
  training?: Static<typeof TrainingIntegrationSummarySchema> | undefined;
  alignment: AutonomyIntegrationAlignmentSnapshot;
  timestamp: string;
  correlationId?: string;
  errors?: Static<typeof CapabilityOwnershipErrorSchema>[];
  metadata?: AutonomyIntegrationMetadata;
}
