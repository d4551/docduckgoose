/**
 * Training integration schemas.
 *
 * Defines contract-first schemas for training integration snapshots shared
 * across API responses and UI hydration.
 *
 * @shared/schemas/training-integration
 */

import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusMapSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import { CapabilityPortfolioReadinessStatusSchema } from "@baohaus/bao-schemas/capability-portfolio.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";
import { BunBuddyKindSchema } from "./bunbuddy.schemas";
import { LibraryCategorySchema } from "./library-registry.schemas";
import { TrainingJobStatsSchema } from "./training.schemas";

/**
 * Training provider library status schema.
 */
export const TrainingProviderLibraryStatusSchema: Type.TObject<
  {
    readonly required: Type.TArray<Type.TString>;
    readonly available: Type.TArray<Type.TString>;
    readonly missing: Type.TArray<Type.TString>;
  },
  "available" | "required" | "missing",
  never
> = Type.Object(
  {
    required: Type.Array(Type.String()),
    available: Type.Array(Type.String()),
    missing: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Training integration providers schema.
 */
export const TrainingIntegrationProvidersSchema: Type.TObject<
  {
    readonly trainingEnabled: Type.TArray<Type.TString>;
    readonly priority: Type.TArray<Type.TString>;
    readonly priorityOffline: Type.TArray<Type.TString>;
    readonly libraries: Type.TRecord<Type.TString, Type.TArray<Type.TString>>;
    readonly libraryStatus: Type.TOptional<
      Type.TRecord<
        Type.TString,
        Type.TObject<
          {
            readonly required: Type.TArray<Type.TString>;
            readonly available: Type.TArray<Type.TString>;
            readonly missing: Type.TArray<Type.TString>;
          },
          "available" | "required" | "missing",
          never
        >
      >
    >;
    readonly offlineReady: Type.TBoolean;
  },
  "trainingEnabled" | "priority" | "priorityOffline" | "libraries" | "offlineReady",
  "libraryStatus"
> = Type.Object(
  {
    trainingEnabled: Type.Array(Type.String()),
    priority: Type.Array(Type.String()),
    priorityOffline: Type.Array(Type.String()),
    libraries: Type.Record(Type.String(), Type.Array(Type.String())),
    libraryStatus: Type.Optional(Type.Record(Type.String(), TrainingProviderLibraryStatusSchema)),
    offlineReady: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Training bunbuddy status schema.
 */
export const TrainingBunBuddyStatusSchema: Type.TUnion<
  (Type.TLiteral<"healthy"> | Type.TLiteral<"degraded"> | Type.TLiteral<"unreachable">)[]
> = Type.Union(
  [Type.Literal("healthy"), Type.Literal("degraded"), Type.Literal("unreachable")],
  {},
);

/**
 * Training bunbuddy summary schema.
 */
export const TrainingIntegrationBunBuddySummarySchema = Type.Object(
  {
    source: BunBuddyKindSchema,
    status: TrainingBunBuddyStatusSchema,
    baseUrl: Type.Union([Type.String(), Type.Null()]),
    endpoints: Type.Array(Type.String()),
    libraries: Type.Record(Type.String(), Type.String()),
    features: Type.Record(Type.String(), Type.Boolean()),
    notes: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Training bunbuddy snapshot schema.
 */
export const TrainingIntegrationBunBuddySnapshotSchema = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    sources: Type.Array(BunBuddyKindSchema),
    ready: Type.Array(BunBuddyKindSchema),
    items: Type.Array(TrainingIntegrationBunBuddySummarySchema),
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
export const TrainingIntegrationAutonomySourceStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"available" | "degraded" | "unavailable" | "disabled">,
    ...Type.TLiteral<"available" | "degraded" | "unavailable" | "disabled">[],
  ]
> = stringEnum(TRAINING_INTEGRATION_AUTONOMY_SOURCE_STATUSES, {});

/**
 * Autonomy training source readiness schema.
 */
export const TrainingIntegrationAutonomySourceReadinessSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    bunbuddyStatus: CapabilityPortfolioReadinessStatusSchema,
    featuresReady: Type.Boolean(),
    policyReady: Type.Boolean(),
    dependenciesReady: Type.Boolean(),
    missingDependencies: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    degradedDependencies: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    missingFeatures: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    disabledPolicies: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    notes: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

/**
 * Autonomy training source surfaces schema.
 */
export const TrainingIntegrationAutonomySourceSurfaceSchema = Type.Object(
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
 * Autonomy training source schema.
 */
export const TrainingIntegrationAutonomySourceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    stack: Type.Union([Type.Literal("drone"), Type.Literal("robotics")]),
    systemId: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    status: TrainingIntegrationAutonomySourceStatusSchema,
    readiness: TrainingIntegrationAutonomySourceReadinessSchema,
    surfaces: TrainingIntegrationAutonomySourceSurfaceSchema,
    endpoints: Type.Array(Type.String({ minLength: 1 })),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Autonomy training source summary schema.
 */
export const TrainingIntegrationAutonomySourceSummarySchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly byStatus: Type.TObject<
      {
        readonly available: Type.TInteger;
        readonly degraded: Type.TInteger;
        readonly unavailable: Type.TInteger;
        readonly disabled: Type.TInteger;
      },
      "degraded" | "unavailable" | "available" | "disabled",
      never
    >;
  },
  "total" | "byStatus",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    // NOTE: Use explicit objects instead of `Type.Record(union, ...)` to preserve
    // strong Static<> typing across UI indexing.
    byStatus: Type.Object(
      {
        available: Type.Integer({ minimum: 0 }),
        degraded: Type.Integer({ minimum: 0 }),
        unavailable: Type.Integer({ minimum: 0 }),
        disabled: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Autonomy training sources snapshot schema.
 */
export const TrainingIntegrationAutonomySourcesSchema = Type.Object(
  {
    timestamp: Type.String({ format: "date-time" }),
    sources: Type.Array(TrainingIntegrationAutonomySourceSchema),
    summary: TrainingIntegrationAutonomySourceSummarySchema,
  },
  { additionalProperties: false },
);

/**
 * Training integration summary schema.
 */
export const TrainingIntegrationSummarySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    endpoints: Type.Object(
      {
        base: Type.String(),
        stats: Type.String(),
        jobs: Type.String(),
        jobById: Type.String(),
        jobArtifacts: Type.String(),
        jobArtifactFile: Type.String(),
        jobComplete: Type.String(),
        jobCancel: Type.String(),
      },
      { additionalProperties: false },
    ),
    rateLimit: Type.Object(
      {
        requestsPerWindow: Type.Integer({ minimum: 0 }),
        windowSeconds: Type.Integer({ minimum: 0 }),
        burstCapacity: Type.Integer({ minimum: 0 }),
        maxConcurrent: Type.Integer({ minimum: 0 }),
        tokensPerDay: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    providers: TrainingIntegrationProvidersSchema,
    stats: Type.Optional(TrainingJobStatsSchema),
    bunbuddies: Type.Optional(TrainingIntegrationBunBuddySnapshotSchema),
    ownership: Type.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    autonomySources: Type.Optional(TrainingIntegrationAutonomySourcesSchema),
    autonomyErrors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
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
