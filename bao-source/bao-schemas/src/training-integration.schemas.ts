/**
 * Training integration schemas.
 *
 * Defines contract-first schemas for training integration snapshots shared
 * across API responses and UI hydration.
 *
 * @shared/schemas/training-integration
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import {
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
} from "./capability-ownership.schemas.ts";
import { CapabilityPortfolioReadinessStatusSchema } from "./capability-portfolio.schemas.ts";
import { LibraryCategorySchema } from "./library-registry.schemas.ts";
import { TrainingJobStatsSchema } from "./training.schemas.ts";

/**
 * Training provider library status schema.
 */
export const TrainingProviderLibraryStatusSchema: TObject<
  {
    readonly required: TArray<TString>;
    readonly available: TArray<TString>;
    readonly missing: TArray<TString>;
  },
  "available" | "required" | "missing",
  never
> = TypeExports.Object(
  {
    required: TypeExports.Array(TypeExports.String()),
    available: TypeExports.Array(TypeExports.String()),
    missing: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Training integration providers schema.
 */
export const TrainingIntegrationProvidersSchema: TObject<
  {
    readonly trainingEnabled: TArray<TString>;
    readonly priority: TArray<TString>;
    readonly priorityOffline: TArray<TString>;
    readonly libraries: TRecord<TString, TArray<TString>>;
    readonly libraryStatus: TOptional<
      TRecord<
        TString,
        TObject<
          {
            readonly required: TArray<TString>;
            readonly available: TArray<TString>;
            readonly missing: TArray<TString>;
          },
          "available" | "required" | "missing",
          never
        >
      >
    >;
    readonly offlineReady: TBoolean;
  },
  "trainingEnabled" | "priority" | "priorityOffline" | "libraries" | "offlineReady",
  "libraryStatus"
> = TypeExports.Object(
  {
    trainingEnabled: TypeExports.Array(TypeExports.String()),
    priority: TypeExports.Array(TypeExports.String()),
    priorityOffline: TypeExports.Array(TypeExports.String()),
    libraries: TypeExports.Record(TypeExports.String(), TypeExports.Array(TypeExports.String())),
    libraryStatus: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TrainingProviderLibraryStatusSchema),
    ),
    offlineReady: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Training bunbuddy status schema.
 */
export const TrainingBunBuddyStatusSchema: TUnion<
  (
    | TLiteral<"healthy">
    | TLiteral<"degraded">
    | TLiteral<"unreachable">
    | TLiteral<"not-configured">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("healthy"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("not-configured"),
  ],
  {},
);

/**
 * Training bunbuddy summary schema.
 */
export const TrainingIntegrationBunBuddySummarySchema = TypeExports.Object(
  {
    source: BunBuddyKindSchema,
    status: TrainingBunBuddyStatusSchema,
    baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    endpoints: TypeExports.Array(TypeExports.String()),
    libraries: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    features: TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
    notes: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Training bunbuddy snapshot schema.
 */
export const TrainingIntegrationBunBuddySnapshotSchema = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    sources: TypeExports.Array(BunBuddyKindSchema),
    ready: TypeExports.Array(BunBuddyKindSchema),
    items: TypeExports.Array(TrainingIntegrationBunBuddySummarySchema),
  },
  { additionalProperties: false },
);

/**
 * Supported autonomy training source statuses.
 */
export const TRAINING_INTEGRATION_AUTONOMY_SOURCE_STATUSES: readonly [
  "available",
  "degraded",
  "unavailable",
  "disabled",
] = ["available", "degraded", "unavailable", "disabled"] as const;

/**
 * Type-safe autonomy training source status.
 */
export type TrainingIntegrationAutonomySourceStatus =
  (typeof TRAINING_INTEGRATION_AUTONOMY_SOURCE_STATUSES)[number];

/**
 * Autonomy training source status schema.
 */
export const TrainingIntegrationAutonomySourceStatusSchema: TUnion<
  [
    TLiteral<"available" | "degraded" | "unavailable" | "disabled">,
    ...TLiteral<"available" | "degraded" | "unavailable" | "disabled">[],
  ]
> = stringEnum(TRAINING_INTEGRATION_AUTONOMY_SOURCE_STATUSES, {});

/**
 * Autonomy training source readiness schema.
 */
export const TrainingIntegrationAutonomySourceReadinessSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    bunbuddyStatus: CapabilityPortfolioReadinessStatusSchema,
    featuresReady: TypeExports.Boolean(),
    policyReady: TypeExports.Boolean(),
    dependenciesReady: TypeExports.Boolean(),
    missingDependencies: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
    degradedDependencies: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 })),
    ),
    missingFeatures: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    disabledPolicies: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * Autonomy training source surfaces schema.
 */
export const TrainingIntegrationAutonomySourceSurfaceSchema = TypeExports.Object(
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
 * Autonomy training source schema.
 */
export const TrainingIntegrationAutonomySourceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    stack: TypeExports.Union([TypeExports.Literal("drone"), TypeExports.Literal("robotics")]),
    systemId: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    status: TrainingIntegrationAutonomySourceStatusSchema,
    readiness: TrainingIntegrationAutonomySourceReadinessSchema,
    surfaces: TrainingIntegrationAutonomySourceSurfaceSchema,
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Autonomy training source summary schema.
 */
export const TrainingIntegrationAutonomySourceSummarySchema: TObject<
  {
    readonly total: TInteger;
    readonly byStatus: TObject<
      {
        readonly available: TInteger;
        readonly degraded: TInteger;
        readonly unavailable: TInteger;
        readonly disabled: TInteger;
      },
      "degraded" | "unavailable" | "available" | "disabled",
      never
    >;
  },
  "total" | "byStatus",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    // NOTE: Use explicit objects instead of `TypeExports.Record(union, ...)` to preserve
    // strong Static<> typing across UI indexing.
    byStatus: TypeExports.Object(
      {
        available: TypeExports.Integer({ minimum: 0 }),
        degraded: TypeExports.Integer({ minimum: 0 }),
        unavailable: TypeExports.Integer({ minimum: 0 }),
        disabled: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Autonomy training sources snapshot schema.
 */
export const TrainingIntegrationAutonomySourcesSchema = TypeExports.Object(
  {
    timestamp: TypeExports.String({ format: "date-time" }),
    sources: TypeExports.Array(TrainingIntegrationAutonomySourceSchema),
    summary: TrainingIntegrationAutonomySourceSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * Training integration summary schema.
 */
export const TrainingIntegrationSummarySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    endpoints: TypeExports.Object(
      {
        base: TypeExports.String(),
        stats: TypeExports.String(),
        jobs: TypeExports.String(),
        jobById: TypeExports.String(),
        jobArtifacts: TypeExports.String(),
        jobArtifactFile: TypeExports.String(),
        jobComplete: TypeExports.String(),
        jobCancel: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    rateLimit: TypeExports.Object(
      {
        requestsPerWindow: TypeExports.Integer({ minimum: 0 }),
        windowSeconds: TypeExports.Integer({ minimum: 0 }),
        burstCapacity: TypeExports.Integer({ minimum: 0 }),
        maxConcurrent: TypeExports.Integer({ minimum: 0 }),
        tokensPerDay: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    providers: TrainingIntegrationProvidersSchema,
    stats: TypeExports.Optional(TrainingJobStatsSchema),
    bunbuddies: TypeExports.Optional(TrainingIntegrationBunBuddySnapshotSchema),
    ownership: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    autonomySources: TypeExports.Optional(TrainingIntegrationAutonomySourcesSchema),
    autonomyErrors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
  },
  { additionalProperties: false },
);

/** Inferred type from the TrainingProviderLibraryStatus schema. */
export type TrainingProviderLibraryStatus = Static<typeof TrainingProviderLibraryStatusSchema>;
/** Inferred type from the TrainingIntegrationProviders schema. */
export type TrainingIntegrationProviders = Static<typeof TrainingIntegrationProvidersSchema>;
/** Inferred type from the TrainingIntegrationBunBuddySummary schema. */
export type TrainingIntegrationBunBuddySummary = Static<
  typeof TrainingIntegrationBunBuddySummarySchema
>;
/** Inferred type from the TrainingIntegrationBunBuddySnapshot schema. */
export type TrainingIntegrationBunBuddySnapshot = Static<
  typeof TrainingIntegrationBunBuddySnapshotSchema
>;
/** Inferred type from the TrainingIntegrationAutonomySource schema. */
export type TrainingIntegrationAutonomySource = Static<
  typeof TrainingIntegrationAutonomySourceSchema
>;
/** Inferred type from the TrainingIntegrationAutonomySources schema. */
export type TrainingIntegrationAutonomySources = Static<
  typeof TrainingIntegrationAutonomySourcesSchema
>;
/** Inferred type from the TrainingIntegrationSummary schema. */
export type TrainingIntegrationSummary = Static<typeof TrainingIntegrationSummarySchema>;
