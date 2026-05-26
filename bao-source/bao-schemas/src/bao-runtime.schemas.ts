/**
 * Bao runtime status schemas.
 *
 * TypeBox schemas for the Kubernetes-native runtime status surface. Covers:
 * - Kubernetes reachability + context
 * - Namespace + Package release health
 * - GitOps convergence status
 * - BunBuddy fleet readiness
 * - OCI registry status
 * - Secrets strategy compliance (SOPS/ESO/none)
 * - Recommended actions and failure hints
 *
 * @shared/schemas/bao-runtime
 */

import { BAO_RUNTIME_CHECKS } from "@baohaus/bao-constants/bao-runtime";
import { BAO_RUNTIME_IDEMPOTENCY_KEY_MAX_LENGTH } from "@baohaus/bao-constants/bao-runtime-limits";
import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { type LocalizedText, LocalizedTextSchema } from "./i18n.schemas.ts";
import {
  BaoControlPlaneFailurePhaseSchema,
  ProcessStatusSummarySchema,
  ResolvedPlatformRuntimeSchema,
  ResourceObservedSummarySchema,
  ResourcePolicySummarySchema,
} from "./platform-runtime.schemas.ts";
import { observabilityFields } from "./route-response.schemas.ts";

// Enums / Literals

/**
 * Bao runtime overall status.
 */
export const BaoRuntimeStatusSchema: TUnion<
  (
    | TLiteral<"healthy">
    | TLiteral<"degraded">
    | TLiteral<"unreachable">
    | TLiteral<"not-configured">
    | TLiteral<"unknown">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("healthy"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("not-configured"),
    TypeExports.Literal("unknown"),
  ],
  {},
);

/** TypeScript type for {@link BaoRuntimeStatusSchema}. */
export type BaoRuntimeStatus = Static<typeof BaoRuntimeStatusSchema>;

/**
 * Secrets strategy kind.
 */
export const BaoControlPlaneSecretsStrategyKindSchema: TUnion<
  (TLiteral<"sops"> | TLiteral<"eso"> | TLiteral<"none"> | TLiteral<"unknown">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("sops"),
    TypeExports.Literal("eso"),
    TypeExports.Literal("none"),
    TypeExports.Literal("unknown"),
  ],
  {},
);

/** TypeScript type for {@link BaoControlPlaneSecretsStrategyKindSchema}. */
export type BaoControlPlaneSecretsStrategyKind = Static<
  typeof BaoControlPlaneSecretsStrategyKindSchema
>;

/**
 * Recommended action severity.
 */
export const BaoControlPlaneActionSeveritySchema: TUnion<
  (TLiteral<"critical"> | TLiteral<"warning"> | TLiteral<"info">)[]
> = TypeExports.Union(
  [TypeExports.Literal("critical"), TypeExports.Literal("warning"), TypeExports.Literal("info")],
  {},
);

/** TypeScript type for {@link BaoControlPlaneActionSeveritySchema}. */
export type BaoControlPlaneActionSeverity = Static<typeof BaoControlPlaneActionSeveritySchema>;

/**
 * Localized message payload for BaoControlPlane UI translation.
 *
 * This aliases the shared localized-text schema so every API surface uses the
 * same translation contract.
 */
export const BaoControlPlaneLocalizedTextSchema: TObject<
  {
    readonly key: TString;
    readonly params: TOptional<TRecord<TString, TUnion<(TString | TNumber)[]>>>;
  },
  "key",
  "params"
> = LocalizedTextSchema;

/** TypeScript type for {@link BaoControlPlaneLocalizedTextSchema}. */
export type BaoControlPlaneLocalizedText = LocalizedText;

/**
 * Failure hint value for runtime snapshots.
 */
export const BaoControlPlaneFailureHintSchema: TUnion<
  (
    | TString
    | TObject<
        {
          readonly key: TString;
          readonly params: TOptional<TRecord<TString, TUnion<(TString | TNumber)[]>>>;
        },
        "key",
        "params"
      >
    | TNull
  )[]
> = TypeExports.Union([
  TypeExports.String({ minLength: 1 }),
  BaoControlPlaneLocalizedTextSchema,
  TypeExports.Null(),
]);

/** TypeScript type for {@link BaoControlPlaneFailureHintSchema}. */
export type BaoControlPlaneFailureHint = Static<typeof BaoControlPlaneFailureHintSchema>;

/**
 * Bao runtime ensure/probe check name.
 */
const BAO_RUNTIME_CHECK_LITERALS = [
  TypeExports.Literal(BAO_RUNTIME_CHECKS.kube),
  TypeExports.Literal(BAO_RUNTIME_CHECKS.namespace),
  TypeExports.Literal(BAO_RUNTIME_CHECKS.package),
  TypeExports.Literal(BAO_RUNTIME_CHECKS.gitops),
  TypeExports.Literal(BAO_RUNTIME_CHECKS.bunbuddyFleet),
  TypeExports.Literal(BAO_RUNTIME_CHECKS.registry),
  TypeExports.Literal(BAO_RUNTIME_CHECKS.secrets),
] as const;

/**
 * Schema for runtime probe and ensure check names.
 */
export const BaoRuntimeCheckNameSchema: TUnion<
  [
    TLiteral<"kube">,
    TLiteral<"namespace">,
    TLiteral<"package">,
    TLiteral<"gitops">,
    TLiteral<"bunbuddyFleet">,
    TLiteral<"registry">,
    TLiteral<"secrets">,
  ]
> = TypeExports.Union([...BAO_RUNTIME_CHECK_LITERALS]);

/** TypeScript type for {@link BaoRuntimeCheckNameSchema}. */
export type BaoRuntimeCheckName = Static<typeof BaoRuntimeCheckNameSchema>;

// Sub-schemas

/**
 * Kubernetes cluster reachability status.
 */
export const BaoControlPlaneKubeReachabilitySchema = TypeExports.Object(
  {
    reachable: TypeExports.Boolean({ description: "Whether the Kubernetes API is reachable" }),
    context: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Current kubeconfig context or in-cluster hint",
    }),
    apiUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Kubernetes API server URL",
    }),
    inCluster: TypeExports.Boolean({ description: "Whether the server is running in-cluster" }),
    version: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
        description: "Kubernetes server version string",
      }),
    ),
    latencyMs: TypeExports.Optional(
      TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()], {
        description: "API round-trip latency in milliseconds",
      }),
    ),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneKubeReachabilitySchema}. */
export type BaoControlPlaneKubeReachability = Static<typeof BaoControlPlaneKubeReachabilitySchema>;

/**
 * Namespace workload health.
 */
export const BaoControlPlaneNamespaceHealthSchema = TypeExports.Object(
  {
    namespace: TypeExports.String({ minLength: 1 }),
    releaseName: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    releaseStatus: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Package release status (Installed, Failed, Pending, etc.)",
    }),
    releaseRevision: TypeExports.Optional(
      TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    ),
    workloadsTotal: TypeExports.Number({ minimum: 0 }),
    workloadsReady: TypeExports.Number({ minimum: 0 }),
    workloadsDegraded: TypeExports.Number({ minimum: 0 }),
    podsRunning: TypeExports.Number({ minimum: 0 }),
    podsTotal: TypeExports.Number({ minimum: 0 }),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneNamespaceHealthSchema}. */
export type BaoControlPlaneNamespaceHealth = Static<typeof BaoControlPlaneNamespaceHealthSchema>;

/**
 * Package controller status.
 */
export const BaoControlPlanePackageStatusSchema = TypeExports.Object(
  {
    configured: TypeExports.Boolean({
      description: "Whether package controller checks are configured",
    }),
    installed: TypeExports.Boolean({ description: "Whether the platform package is installed" }),
    phase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed package release phase",
    }),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed package release status",
    }),
    valuesHash: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    version: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    message: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlanePackageStatusSchema}. */
export type BaoControlPlanePackageStatus = Static<typeof BaoControlPlanePackageStatusSchema>;

/**
 * Package render/apply validation diagnostics.
 */
export const BaoControlPlanePackageDiagnosticsSchema: TObject<
  {
    readonly validated: TBoolean;
    readonly renderApplyReady: TBoolean;
    readonly manifestPolicyValid: TBoolean;
    readonly componentInventoryValid: TBoolean;
    readonly issues: TArray<TString>;
    readonly missingComponents: TArray<TString>;
    readonly unexpectedComponents: TArray<TString>;
    readonly updatedAt: TUnion<(TString | TNull)[]>;
  },
  | "issues"
  | "missingComponents"
  | "unexpectedComponents"
  | "updatedAt"
  | "validated"
  | "renderApplyReady"
  | "manifestPolicyValid"
  | "componentInventoryValid",
  never
> = TypeExports.Object(
  {
    validated: TypeExports.Boolean({
      description: "Whether package validation ran for the current bundle",
    }),
    renderApplyReady: TypeExports.Boolean({
      description: "Whether the rendered package bundle passed validation and is safe to apply",
    }),
    manifestPolicyValid: TypeExports.Boolean({
      description: "Whether rendered-manifest policy checks passed",
    }),
    componentInventoryValid: TypeExports.Boolean({
      description: "Whether rendered components match the canonical inventory",
    }),
    issues: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    missingComponents: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    unexpectedComponents: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    updatedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlanePackageDiagnosticsSchema}. */
export type BaoControlPlanePackageDiagnostics = Static<
  typeof BaoControlPlanePackageDiagnosticsSchema
>;

/**
 * GitOps convergence status for hard-cut migration.
 */
export const BaoControlPlaneGitOpsStatusSchema = TypeExports.Object(
  {
    configured: TypeExports.Boolean({
      description: "Whether GitOps controller checks are configured",
    }),
    phase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed GitOps phase",
    }),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed GitOps status",
    }),
    synced: TypeExports.Optional(TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()])),
    revision: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    message: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneGitOpsStatusSchema}. */
export type BaoControlPlaneGitOpsStatus = Static<typeof BaoControlPlaneGitOpsStatusSchema>;

/**
 * BunBuddy control-plane readiness status for hard-cut migration.
 */
export const BaoControlPlaneBunBuddyFleetStatusSchema = TypeExports.Object(
  {
    configured: TypeExports.Boolean({
      description: "Whether BunBuddy fleet checks are configured",
    }),
    ready: TypeExports.Boolean({ description: "Whether the BunBuddy fleet is ready" }),
    phase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed BunBuddy fleet phase",
    }),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed BunBuddy fleet status",
    }),
    healthy: TypeExports.Optional(TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()])),
    requiredKinds: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Required BunBuddy kinds observed in snapshot",
      }),
    ),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneBunBuddyFleetStatusSchema}. */
export type BaoControlPlaneBunBuddyFleetStatus = Static<
  typeof BaoControlPlaneBunBuddyFleetStatusSchema
>;

/**
 * OCI registry control-plane status for hard-cut migration.
 */
export const BaoControlPlaneRegistryStatusSchema: TObject<
  {
    readonly enabled: TBoolean;
    readonly reachable: TBoolean;
    readonly phase: TUnion<(TString | TNull)[]>;
    readonly status: TUnion<(TString | TNull)[]>;
    readonly storageType: TOptional<TUnion<(TString | TNull)[]>>;
    readonly error: TOptional<TUnion<(TString | TNull)[]>>;
  },
  "phase" | "status" | "enabled" | "reachable",
  InferOptionalKeys<{
    readonly enabled: TBoolean;
    readonly reachable: TBoolean;
    readonly phase: TUnion<(TString | TNull)[]>;
    readonly status: TUnion<(TString | TNull)[]>;
    readonly storageType: TOptional<TUnion<(TString | TNull)[]>>;
    readonly error: TOptional<TUnion<(TString | TNull)[]>>;
  }>
> = TypeExports.Object(
  {
    enabled: TypeExports.Boolean({
      description: "Whether the control-plane registry checks are enabled",
    }),
    reachable: TypeExports.Boolean({ description: "Whether the registry is reachable" }),
    phase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed registry phase",
    }),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Observed registry status",
    }),
    storageType: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneRegistryStatusSchema}. */
export type BaoControlPlaneRegistryStatus = Static<typeof BaoControlPlaneRegistryStatusSchema>;

/**
 * Retained remote build-session lifecycle state.
 */
export const BaoControlPlaneRemoteBuildSessionLifecycleStatusSchema: TUnion<
  (TLiteral<"active"> | TLiteral<"retained"> | TLiteral<"released"> | TLiteral<"failed">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("active"),
    TypeExports.Literal("retained"),
    TypeExports.Literal("released"),
    TypeExports.Literal("failed"),
  ],
  {},
);

/** TypeScript type for {@link BaoControlPlaneRemoteBuildSessionLifecycleStatusSchema}. */
export type BaoControlPlaneRemoteBuildSessionLifecycleStatus = Static<
  typeof BaoControlPlaneRemoteBuildSessionLifecycleStatusSchema
>;

/**
 * Remote Linux builder session summary projected into BaoControlPlane runtime diagnostics.
 */
export const BaoControlPlaneRemoteBuildSessionSchema: TObject<
  {
    readonly sessionId: TString;
    readonly imageName: TUnion<(TString | TNull)[]>;
    readonly stageName: TUnion<(TString | TNull)[]>;
    readonly remoteRoot: TString;
    readonly uploadCount: TNumber;
    readonly syncAttemptCount: TNumber;
    readonly hasSyncedRemoteRootBackToLocal: TBoolean;
    readonly status: TUnion<
      (TLiteral<"active"> | TLiteral<"retained"> | TLiteral<"released"> | TLiteral<"failed">)[]
    >;
    readonly updatedAt: TString;
    readonly failurePhase: TUnion<(TString | TNull)[]>;
  },
  | "imageName"
  | "stageName"
  | "failurePhase"
  | "sessionId"
  | "remoteRoot"
  | "uploadCount"
  | "syncAttemptCount"
  | "hasSyncedRemoteRootBackToLocal"
  | "status"
  | "updatedAt",
  never
> = TypeExports.Object(
  {
    sessionId: TypeExports.String({ minLength: 1 }),
    imageName: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    stageName: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    remoteRoot: TypeExports.String({ minLength: 1 }),
    uploadCount: TypeExports.Number({ minimum: 0 }),
    syncAttemptCount: TypeExports.Number({ minimum: 0 }),
    hasSyncedRemoteRootBackToLocal: TypeExports.Boolean(),
    status: BaoControlPlaneRemoteBuildSessionLifecycleStatusSchema,
    updatedAt: TypeExports.String({ format: "date-time" }),
    failurePhase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneRemoteBuildSessionSchema}. */
export type BaoControlPlaneRemoteBuildSession = Static<
  typeof BaoControlPlaneRemoteBuildSessionSchema
>;

/**
 * Aggregate projection of remote build sessions for runtime/SSR diagnostics.
 *
 * Consumed by bao-runtime and infrastructure SSR.
 */
export const BaoControlPlaneRemoteBuildSessionProjectionSchema: TObject<
  {
    readonly retainedCount: TNumber;
    readonly releasedCount: TNumber;
    readonly failedCount: TNumber;
    readonly lastSyncBack: TUnion<(TString | TNull)[]>;
    readonly totalSessions: TNumber;
  },
  "lastSyncBack" | "retainedCount" | "releasedCount" | "failedCount" | "totalSessions",
  never
> = TypeExports.Object(
  {
    retainedCount: TypeExports.Number({ minimum: 0 }),
    releasedCount: TypeExports.Number({ minimum: 0 }),
    failedCount: TypeExports.Number({ minimum: 0 }),
    lastSyncBack: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    totalSessions: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneRemoteBuildSessionProjectionSchema}. */
export type BaoControlPlaneRemoteBuildSessionProjection = Static<
  typeof BaoControlPlaneRemoteBuildSessionProjectionSchema
>;

/**
 * BaoControlPlane image-build and remote-session diagnostics projected into the runtime surface.
 */
export const BaoControlPlaneBuildDiagnosticsSchema = TypeExports.Object(
  {
    workflow: TypeExports.Union([TypeExports.Literal("oci-native"), TypeExports.Null()]),
    selectedImages: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    rebuiltImages: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    cacheHitCount: TypeExports.Number({ minimum: 0 }),
    cacheMissCount: TypeExports.Number({ minimum: 0 }),
    currentImage: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    currentStage: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    remoteSessions: TypeExports.Array(BaoControlPlaneRemoteBuildSessionSchema),
    failureCode: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    failureMessage: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    timestamp: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneBuildDiagnosticsSchema}. */
export type BaoControlPlaneBuildDiagnostics = Static<typeof BaoControlPlaneBuildDiagnosticsSchema>;

/**
 * Runtime probe-concurrency summary projected from the BaoControlPlane diagnostics engine.
 */
export const BaoControlPlaneProbeConcurrencyStateSchema: TObject<
  {
    readonly limit: TNumber;
    readonly activeCount: TNumber;
    readonly queuedCount: TNumber;
  },
  "limit" | "activeCount" | "queuedCount",
  never
> = TypeExports.Object(
  {
    limit: TypeExports.Number({ minimum: 0 }),
    activeCount: TypeExports.Number({ minimum: 0 }),
    queuedCount: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneProbeConcurrencyStateSchema}. */
export type BaoControlPlaneProbeConcurrencyState = Static<
  typeof BaoControlPlaneProbeConcurrencyStateSchema
>;

/**
 * Runtime cache-state projection for Bao runtime status snapshots.
 */
export const BaoRuntimeCacheStateSchema: TObject<
  {
    readonly snapshotCacheWarm: TBoolean;
    readonly snapshotBuildInFlight: TBoolean;
    readonly idempotencyEntries: TNumber;
    readonly idempotencyCleanupActive: TBoolean;
    readonly idempotencyTtlMs: TNumber;
  },
  | "snapshotCacheWarm"
  | "snapshotBuildInFlight"
  | "idempotencyEntries"
  | "idempotencyCleanupActive"
  | "idempotencyTtlMs",
  never
> = TypeExports.Object(
  {
    snapshotCacheWarm: TypeExports.Boolean(),
    snapshotBuildInFlight: TypeExports.Boolean(),
    idempotencyEntries: TypeExports.Number({ minimum: 0 }),
    idempotencyCleanupActive: TypeExports.Boolean(),
    idempotencyTtlMs: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeCacheStateSchema}. */
export type BaoRuntimeCacheState = Static<typeof BaoRuntimeCacheStateSchema>;

/**
 * Runtime distributed-lock policy projection for Bao runtime status snapshots.
 */
export const BaoRuntimeLockStateSchema: TObject<
  {
    readonly key: TString;
    readonly ttlSeconds: TNumber;
    readonly retryDelayMs: TNumber;
  },
  "key" | "ttlSeconds" | "retryDelayMs",
  never
> = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1 }),
    ttlSeconds: TypeExports.Number({ minimum: 0 }),
    retryDelayMs: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeLockStateSchema}. */
export type BaoRuntimeLockState = Static<typeof BaoRuntimeLockStateSchema>;

/**
 * Bao runtime-internal diagnostics projected into the operator surface.
 */
export const BaoRuntimeInternalsSchema = TypeExports.Object(
  {
    probeConcurrency: BaoControlPlaneProbeConcurrencyStateSchema,
    cache: BaoRuntimeCacheStateSchema,
    lock: BaoRuntimeLockStateSchema,
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeInternalsSchema}. */
export type BaoRuntimeInternals = Static<typeof BaoRuntimeInternalsSchema>;

/**
 * Canonical BaoControlPlane bootstrap phase names persisted by `local-cluster`.
 */
export const BaoControlPlaneBootstrapPhaseSchema: TUnion<
  (
    | TLiteral<"preflight">
    | TLiteral<"cluster">
    | TLiteral<"registry">
    | TLiteral<"builder">
    | TLiteral<"images">
    | TLiteral<"bootstrap">
    | TLiteral<"gate">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("preflight"),
    TypeExports.Literal("cluster"),
    TypeExports.Literal("registry"),
    TypeExports.Literal("builder"),
    TypeExports.Literal("images"),
    TypeExports.Literal("bootstrap"),
    TypeExports.Literal("gate"),
  ],
  {},
);

/** TypeScript type for {@link BaoControlPlaneBootstrapPhaseSchema}. */
export type BaoControlPlaneBootstrapPhase = Static<typeof BaoControlPlaneBootstrapPhaseSchema>;

/**
 * Canonical bootstrap phase status values persisted by `local-cluster`.
 */
export const BaoControlPlaneBootstrapPhaseStatusSchema: TUnion<
  (
    | TLiteral<"pending">
    | TLiteral<"running">
    | TLiteral<"success">
    | TLiteral<"failed">
    | TLiteral<"skipped">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("pending"),
    TypeExports.Literal("running"),
    TypeExports.Literal("success"),
    TypeExports.Literal("failed"),
    TypeExports.Literal("skipped"),
  ],
  {},
);

/** TypeScript type for {@link BaoControlPlaneBootstrapPhaseStatusSchema}. */
export type BaoControlPlaneBootstrapPhaseStatus = Static<
  typeof BaoControlPlaneBootstrapPhaseStatusSchema
>;

/**
 * Persisted bootstrap/preflight execution state projected into runtime SSR.
 */
export const BaoControlPlaneBootstrapPreflightStateSchema = TypeExports.Object(
  {
    phase: BaoControlPlaneBootstrapPhaseSchema,
    status: BaoControlPlaneBootstrapPhaseStatusSchema,
    lastUpdated: TypeExports.String({ format: "date-time" }),
    lastSuccessfulPhase: TypeExports.Union([
      BaoControlPlaneBootstrapPhaseSchema,
      TypeExports.Null(),
    ]),
    resumeFromPhase: TypeExports.Union([BaoControlPlaneBootstrapPhaseSchema, TypeExports.Null()]),
    retryable: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    recoveryHint: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneBootstrapPreflightStateSchema}. */
export type BaoControlPlaneBootstrapPreflightState = Static<
  typeof BaoControlPlaneBootstrapPreflightStateSchema
>;

/**
 * Projected workflow lock-state entry for script-owned BaoControlPlane subsystems.
 */
export const BaoControlPlaneWorkflowLockStateSchema: TObject<
  {
    readonly key: TString;
    readonly scope: TString;
    readonly active: TBoolean;
    readonly stale: TBoolean;
    readonly ownerPid: TUnion<(TNull | TInteger)[]>;
    readonly ownerId: TUnion<(TString | TNull)[]>;
    readonly acquiredAt: TUnion<(TString | TNull)[]>;
    readonly ageMs: TUnion<(TNumber | TNull)[]>;
  },
  "key" | "ownerPid" | "ownerId" | "acquiredAt" | "ageMs" | "scope" | "active" | "stale",
  never
> = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1 }),
    scope: TypeExports.String({ minLength: 1 }),
    active: TypeExports.Boolean(),
    stale: TypeExports.Boolean(),
    ownerPid: TypeExports.Union([TypeExports.Integer({ minimum: 1 }), TypeExports.Null()]),
    ownerId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    acquiredAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    ageMs: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneWorkflowLockStateSchema}. */
export type BaoControlPlaneWorkflowLockState = Static<
  typeof BaoControlPlaneWorkflowLockStateSchema
>;

/**
 * Canonical build/local-cluster lock projection for infrastructure SSR.
 */
export const BaoControlPlaneLockStateSchema = TypeExports.Object(
  {
    buildImages: BaoControlPlaneWorkflowLockStateSchema,
    localCluster: BaoControlPlaneWorkflowLockStateSchema,
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneLockStateSchema}. */
export type BaoControlPlaneLockState = Static<typeof BaoControlPlaneLockStateSchema>;

/**
 * Secrets strategy compliance status.
 */
export const BaoControlPlaneSecretsComplianceSchema = TypeExports.Object(
  {
    strategy: BaoControlPlaneSecretsStrategyKindSchema,
    compliant: TypeExports.Boolean({
      description: "Whether the current secrets strategy meets policy",
    }),
    leakWarnings: TypeExports.Number({
      minimum: 0,
      description: "Number of plaintext secrets detected",
    }),
    maxAllowed: TypeExports.Number({ minimum: 0 }),
    details: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    error: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneSecretsComplianceSchema}. */
export type BaoControlPlaneSecretsCompliance = Static<
  typeof BaoControlPlaneSecretsComplianceSchema
>;

/**
 * Recommended action for runtime issues.
 */
export const BaoControlPlaneRecommendedActionSchema = TypeExports.Object(
  {
    severity: BaoControlPlaneActionSeveritySchema,
    category: TypeExports.String({
      minLength: 1,
      description: "Grouping label (for example: kube, package, gitops, secrets)",
    }),
    message: TypeExports.String({ minLength: 1 }),
    messageI18n: TypeExports.Optional(LocalizedTextSchema),
    hint: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    hintI18n: TypeExports.Optional(LocalizedTextSchema),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoControlPlaneRecommendedActionSchema}. */
export type BaoControlPlaneRecommendedAction = Static<
  typeof BaoControlPlaneRecommendedActionSchema
>;

// Top-level runtime snapshot

/**
 * Full Bao runtime status snapshot.
 */
export const BaoRuntimeSnapshotSchema = TypeExports.Object(
  {
    status: BaoRuntimeStatusSchema,
    platformRuntime: ResolvedPlatformRuntimeSchema,
    kube: BaoControlPlaneKubeReachabilitySchema,
    namespace: BaoControlPlaneNamespaceHealthSchema,
    package: BaoControlPlanePackageStatusSchema,
    packageDiagnostics: BaoControlPlanePackageDiagnosticsSchema,
    gitops: BaoControlPlaneGitOpsStatusSchema,
    bunbuddyFleet: BaoControlPlaneBunBuddyFleetStatusSchema,
    registry: BaoControlPlaneRegistryStatusSchema,
    buildDiagnostics: BaoControlPlaneBuildDiagnosticsSchema,
    runtimeInternals: BaoRuntimeInternalsSchema,
    secrets: BaoControlPlaneSecretsComplianceSchema,
    resourcePolicySummary: ResourcePolicySummarySchema,
    resourceObservedSummary: ResourceObservedSummarySchema,
    processStatusSummary: ProcessStatusSummarySchema,
    failurePhase: BaoControlPlaneFailurePhaseSchema,
    recommendedActions: TypeExports.Array(BaoControlPlaneRecommendedActionSchema),
    failureHint: BaoControlPlaneFailureHintSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    /** Persisted local-cluster bootstrap/preflight summary for SSR diagnostics. */
    preflightState: TypeExports.Optional(
      TypeExports.Union([BaoControlPlaneBootstrapPreflightStateSchema, TypeExports.Null()]),
    ),
    /** Script-owned execution lock projection for build-images and local-cluster. */
    lockState: TypeExports.Optional(
      TypeExports.Union([BaoControlPlaneLockStateSchema, TypeExports.Null()]),
    ),
    /** Aggregate remote build session projection for infrastructure SSR. */
    buildSessionSummary: TypeExports.Optional(
      TypeExports.Union([BaoControlPlaneRemoteBuildSessionProjectionSchema, TypeExports.Null()]),
    ),
    /** Per-target lifecycle state projection for hot-load/cold-unload SSR visibility. */
    targetLifecycleStates: TypeExports.Optional(
      TypeExports.Record(
        TypeExports.String({ minLength: 1 }),
        TypeExports.Union(
          [
            TypeExports.Literal("idle"),
            TypeExports.Literal("installing"),
            TypeExports.Literal("installed"),
            TypeExports.Literal("activating"),
            TypeExports.Literal("active"),
            TypeExports.Literal("deactivating"),
            TypeExports.Literal("uninstalling"),
            TypeExports.Literal("failed"),
          ],
          {
            description: "Per-target lifecycle state from the hot-load/cold-unload state machine.",
          },
        ),
      ),
    ),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeSnapshotSchema}. */
export type BaoRuntimeSnapshot = Static<typeof BaoRuntimeSnapshotSchema>;

// Request schemas

/**
 * Refresh request body for runtime status.
 */
export const BaoRuntimeRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        maxLength: BAO_RUNTIME_IDEMPOTENCY_KEY_MAX_LENGTH,
        description: "Idempotency key for refresh requests",
      }),
    ),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeRefreshRequestSchema}. */
export type BaoRuntimeRefreshRequest = Static<typeof BaoRuntimeRefreshRequestSchema>;

/**
 * Ensure request body for runtime provisioning checks.
 */
export const BaoRuntimeEnsureRequestSchema: TObject<
  {
    readonly idempotencyKey: TOptional<TString>;
    readonly checks: TOptional<TArray<typeof BaoRuntimeCheckNameSchema>>;
  },
  never,
  InferOptionalKeys<{
    readonly idempotencyKey: TOptional<TString>;
    readonly checks: TOptional<TArray<typeof BaoRuntimeCheckNameSchema>>;
  }>
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        maxLength: BAO_RUNTIME_IDEMPOTENCY_KEY_MAX_LENGTH,
        description: "Idempotency key for ensure requests",
      }),
    ),
    checks: TypeExports.Optional(
      TypeExports.Array(BaoRuntimeCheckNameSchema, {
        description: "Subset of checks to run (defaults to all)",
      }),
    ),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeEnsureRequestSchema}. */
export type BaoRuntimeEnsureRequest = Static<typeof BaoRuntimeEnsureRequestSchema>;

// Response schemas

/**
 * Runtime status response (GET /status).
 */
export const BaoRuntimeStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String()),
    data: BaoRuntimeSnapshotSchema,
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeStatusResponseSchema}. */
export type BaoRuntimeStatusResponse = Static<typeof BaoRuntimeStatusResponseSchema>;

/**
 * Runtime refresh response (POST /refresh).
 */
export const BaoRuntimeRefreshResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String()),
    refreshed: TypeExports.Boolean(),
    data: BaoRuntimeSnapshotSchema,
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeRefreshResponseSchema}. */
export type BaoRuntimeRefreshResponse = Static<typeof BaoRuntimeRefreshResponseSchema>;

/**
 * Runtime ensure response (POST /ensure).
 */
export const BaoRuntimeEnsureResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.Optional(TypeExports.String()),
    ensured: TypeExports.Boolean({ description: "Whether all requested checks passed" }),
    data: BaoRuntimeSnapshotSchema,
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link BaoRuntimeEnsureResponseSchema}. */
export type BaoRuntimeEnsureResponse = Static<typeof BaoRuntimeEnsureResponseSchema>;
