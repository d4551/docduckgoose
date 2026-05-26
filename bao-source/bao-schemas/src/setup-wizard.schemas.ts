/**
 * System setup wizard schemas.
 *
 * Defines TypeBox schemas for the system setup wizard snapshot that
 * combines easy-auth readiness with capability ownership focus mapping.
 *
 * @shared/schemas/setup-wizard.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { CapabilityDomainMapResponseSchema } from "./capability-domain-map.schemas.ts";
import {
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusSchema,
  CapabilityOwnershipRefreshResponseSchema,
  CapabilityOwnershipSegmentSchema,
  CapabilityOwnershipSummarySchema,
} from "./capability-ownership.schemas.ts";
import { DeviceInventoryRefreshResponseSchema } from "./device-inventory.schemas.ts";
import {
  BaoControlPlaneFailurePhaseSchema,
  ProcessStatusSummarySchema,
  ResolvedPlatformRuntimeSchema,
  ResourceObservedSummarySchema,
  ResourcePolicySummarySchema,
} from "./platform-runtime.schemas.ts";
import { InfraServiceStatusSchema } from "./system-health.schemas.ts";

// Setup Wizard Requests

/**
 * Schema for setup wizard snapshot requests.
 */
export const SetupWizardRequestSchema: TObject<
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
 * TypeScript type for setup wizard snapshot requests.
 */
export type SetupWizardRequest = Static<typeof SetupWizardRequestSchema>;

/**
 * Schema for setup wizard refresh requests.
 */
export const SetupWizardRefreshRequestSchema: TObject<
  {
    readonly idempotencyKey: TOptional<TString>;
    readonly autoRepair: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly idempotencyKey: TOptional<TString>;
    readonly autoRepair: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
    autoRepair: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard refresh requests.
 */
export type SetupWizardRefreshRequest = Static<typeof SetupWizardRefreshRequestSchema>;

/**
 * TypeScript type for setup wizard API run actions.
 */
export type SetupWizardRunAction = "configure" | "setup:auto";

/**
 * Default setup wizard API run action.
 */
export const DEFAULT_SETUP_WIZARD_RUN_ACTION: SetupWizardRunAction = "setup:auto";

/**
 * Schema for setup wizard run requests.
 */
export const SetupWizardRunRequestSchema: TObject<
  {
    readonly action: TUnion<(TLiteral<"configure"> | TLiteral<"setup:auto">)[]>;
    readonly idempotencyKey: TOptional<TString>;
  },
  "action",
  "idempotencyKey"
> = TypeExports.Object(
  {
    action: TypeExports.Union(
      [TypeExports.Literal("configure"), TypeExports.Literal("setup:auto")],
      {
        description: "Allowlisted action to run",
      },
    ),
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        maxLength: 128,
        description: "Idempotency key for run requests",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard run requests.
 */
export type SetupWizardRunRequest = Static<typeof SetupWizardRunRequestSchema>;

/**
 * Schema for setup wizard run responses.
 */
export const SETUP_WIZARD_RUN_ENQUEUE_STATUSES: readonly ["queued", "deduplicated"] = [
  "queued",
  "deduplicated",
] as const;

/**
 * TypeScript type for setup wizard run enqueue statuses.
 */
export type SetupWizardRunEnqueueStatus = (typeof SETUP_WIZARD_RUN_ENQUEUE_STATUSES)[number];

/**
 * Schema for setup wizard run enqueue statuses.
 */
export const SetupWizardRunEnqueueStatusSchema: TUnion<
  (TLiteral<"queued"> | TLiteral<"deduplicated">)[]
> = TypeExports.Union([TypeExports.Literal("queued"), TypeExports.Literal("deduplicated")], {});

/**
 * Schema for setup wizard run status request params.
 */
export const SetupWizardRunStatusRequestSchema: TObject<
  { readonly jobId: TString },
  "jobId",
  never
> = TypeExports.Object(
  {
    jobId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard run status request params.
 */
export type SetupWizardRunStatusRequest = Static<typeof SetupWizardRunStatusRequestSchema>;

/**
 * Supported setup wizard job states (bao-boss).
 */
export const SETUP_WIZARD_RUN_JOB_STATES: readonly [
  "created",
  "retry",
  "active",
  "completed",
  "cancelled",
  "failed",
] = ["created", "retry", "active", "completed", "cancelled", "failed"] as const;

/**
 * TypeScript type for setup wizard run job states.
 */
export type SetupWizardRunJobState = (typeof SETUP_WIZARD_RUN_JOB_STATES)[number];

/**
 * Schema for setup wizard run job states.
 */
export const SetupWizardRunJobStateSchema: TUnion<
  (
    | TLiteral<"created">
    | TLiteral<"retry">
    | TLiteral<"active">
    | TLiteral<"completed">
    | TLiteral<"cancelled">
    | TLiteral<"failed">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("created"),
    TypeExports.Literal("retry"),
    TypeExports.Literal("active"),
    TypeExports.Literal("completed"),
    TypeExports.Literal("cancelled"),
    TypeExports.Literal("failed"),
  ],
  {},
);

/**
 * Schema for setup wizard run job metadata.
 */
export const SetupWizardRunJobInfoSchema: TObject<
  {
    readonly id: TString;
    readonly state: TUnion<
      (
        | TLiteral<"created">
        | TLiteral<"retry">
        | TLiteral<"active">
        | TLiteral<"completed">
        | TLiteral<"cancelled">
        | TLiteral<"failed">
      )[]
    >;
    readonly createdOn: TString;
    readonly startedOn: TUnion<(TString | TNull)[]>;
    readonly completedOn: TUnion<(TString | TNull)[]>;
    readonly retryCount: TInteger;
    readonly retryLimit: TInteger;
  },
  "startedOn" | "completedOn" | "id" | "state" | "createdOn" | "retryCount" | "retryLimit",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    state: SetupWizardRunJobStateSchema,
    createdOn: TypeExports.String({ format: "date-time" }),
    startedOn: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    completedOn: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    retryCount: TypeExports.Integer({ minimum: 0 }),
    retryLimit: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard run job metadata.
 */
export type SetupWizardRunJobInfo = Static<typeof SetupWizardRunJobInfoSchema>;

/**
 * Schema for setup wizard run worker output.
 */
export const SetupWizardRunJobOutputSchema = TypeExports.Object(
  {
    completedAt: TypeExports.String({ format: "date-time" }),
    commandLabel: TypeExports.Optional(TypeExports.String()),
    commandSource: TypeExports.Optional(TypeExports.String()),
    failureContext: TypeExports.Optional(
      TypeExports.Object({
        snippet: TypeExports.Optional(TypeExports.String()),
        file: TypeExports.Optional(TypeExports.String()),
        line: TypeExports.Optional(TypeExports.Number()),
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard run worker output.
 */
export type SetupWizardRunJobOutput = Static<typeof SetupWizardRunJobOutputSchema>;

/**
 * Schema for setup wizard run job status responses.
 */
export const SetupWizardRunStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    job: SetupWizardRunJobInfoSchema,
    output: TypeExports.Union([SetupWizardRunJobOutputSchema, TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard run job status responses.
 */
export type SetupWizardRunStatusResponse = Static<typeof SetupWizardRunStatusResponseSchema>;

/**
 * Schema for setup wizard run responses.
 */
export const SetupWizardRunResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly status: TUnion<(TLiteral<"queued"> | TLiteral<"deduplicated">)[]>;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "timestamp" | "jobId" | "status",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    jobId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    status: SetupWizardRunEnqueueStatusSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard run responses.
 */
export type SetupWizardRunResponse = Static<typeof SetupWizardRunResponseSchema>;

// Setup Wizard Responses

/**
 * Schema for easy-auth bootstrap status.
 */
export const SetupWizardAuthBootstrapSchema: TObject<
  {
    readonly enabled: TBoolean;
    readonly configured: TBoolean;
    readonly environment: TString;
    readonly environmentAllowed: TBoolean;
    readonly allowedEnvironments: TArray<TString>;
  },
  "allowedEnvironments" | "enabled" | "configured" | "environment" | "environmentAllowed",
  never
> = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    configured: TypeExports.Boolean(),
    environment: TypeExports.String({ minLength: 1 }),
    environmentAllowed: TypeExports.Boolean(),
    allowedEnvironments: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for easy-auth bootstrap status.
 */
export type SetupWizardAuthBootstrap = Static<typeof SetupWizardAuthBootstrapSchema>;

/**
 * Schema for easy-auth setup status.
 */
export const SetupWizardAuthSchema = TypeExports.Object(
  {
    service: InfraServiceStatusSchema,
    internalApiConfigured: TypeExports.Boolean(),
    bootstrap: SetupWizardAuthBootstrapSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for easy-auth setup status.
 */
export type SetupWizardAuth = Static<typeof SetupWizardAuthSchema>;

/**
 * Schema for capability ownership focus snapshot in the setup wizard.
 */
export const SetupWizardOwnershipSchema = TypeExports.Object(
  {
    focus: TypeExports.Optional(CapabilityOwnershipFocusSchema),
    segments: TypeExports.Array(CapabilityOwnershipSegmentSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    errors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard ownership snapshot.
 */
export type SetupWizardOwnership = Static<typeof SetupWizardOwnershipSchema>;

/**
 * Schema for setup wizard file status.
 */
export const SetupWizardFileStatusSchema: TObject<
  {
    readonly path: TString;
    readonly exists: TBoolean;
    readonly readable: TBoolean;
    readonly writable: TBoolean;
  },
  "path" | "exists" | "readable" | "writable",
  never
> = TypeExports.Object(
  {
    path: TypeExports.String({ minLength: 1 }),
    exists: TypeExports.Boolean(),
    readable: TypeExports.Boolean(),
    writable: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard file status.
 */
export type SetupWizardFileStatus = Static<typeof SetupWizardFileStatusSchema>;

/**
 * Schema for setup wizard environment status.
 */
export const SetupWizardEnvironmentSchema = TypeExports.Object(
  {
    envFiles: TypeExports.Object(
      {
        primary: SetupWizardFileStatusSchema,
        local: SetupWizardFileStatusSchema,
        example: SetupWizardFileStatusSchema,
        exampleFallback: TypeExports.Optional(SetupWizardFileStatusSchema),
        template: SetupWizardFileStatusSchema,
        packageValues: TypeExports.Optional(SetupWizardFileStatusSchema),
      },
      { additionalProperties: false },
    ),
    bun: TypeExports.Object(
      {
        version: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
        requiredVersion: TypeExports.Union([
          TypeExports.String({ minLength: 1 }),
          TypeExports.Null(),
        ]),
        compatible: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
        config: SetupWizardFileStatusSchema,
        lockfile: SetupWizardFileStatusSchema,
        packageJson: SetupWizardFileStatusSchema,
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard environment status.
 */
export type SetupWizardEnvironment = Static<typeof SetupWizardEnvironmentSchema>;

/**
 * Schema for setup wizard credential sources.
 */
export const SetupWizardCredentialSourceSchema: TUnion<
  (TLiteral<"env"> | TLiteral<"db"> | TLiteral<"none">)[]
> = TypeExports.Union(
  [TypeExports.Literal("env"), TypeExports.Literal("db"), TypeExports.Literal("none")],
  {},
);

/**
 * Schema for setup wizard credential status.
 */
export const SetupWizardCredentialStatusSchema: TObject<
  {
    readonly id: TString;
    readonly label: TString;
    readonly configured: TBoolean;
    readonly source: TUnion<(TLiteral<"env"> | TLiteral<"db"> | TLiteral<"none">)[]>;
    readonly message: TOptional<TString>;
  },
  "label" | "configured" | "id" | "source",
  "message"
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    configured: TypeExports.Boolean(),
    source: SetupWizardCredentialSourceSchema,
    message: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard credential status.
 */
export type SetupWizardCredentialStatus = Static<typeof SetupWizardCredentialStatusSchema>;

/**
 * Schema for setup wizard credential summaries.
 */
export const SetupWizardCredentialsSchema: TObject<
  {
    readonly providers: TArray<
      TObject<
        {
          readonly id: TString;
          readonly label: TString;
          readonly configured: TBoolean;
          readonly source: TUnion<(TLiteral<"env"> | TLiteral<"db"> | TLiteral<"none">)[]>;
          readonly message: TOptional<TString>;
        },
        "label" | "configured" | "id" | "source",
        "message"
      >
    >;
  },
  "providers",
  never
> = TypeExports.Object(
  {
    providers: TypeExports.Array(SetupWizardCredentialStatusSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard credential summaries.
 */
export type SetupWizardCredentials = Static<typeof SetupWizardCredentialsSchema>;

/**
 * Schema for container infrastructure mode selection.
 *
 * BaoControlPlane is the only supported infrastructure mode.
 */
export const SetupWizardInfraModeSchema: TLiteral<"bao-control-plane"> = TypeExports.Literal(
  "bao-control-plane",
  {},
);

/**
 * TypeScript type for setup wizard infra modes.
 */
export type SetupWizardInfraMode = Static<typeof SetupWizardInfraModeSchema>;

/**
 * Schema for setup wizard auto-setup configuration.
 */
export const SetupWizardAutoSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    apiRunEnabled: TypeExports.Boolean(),
    command: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    mode: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    writeRunPorts: TypeExports.Boolean(),
    packageOutput: TypeExports.Boolean(),
    packageDir: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    infraMode: SetupWizardInfraModeSchema,
    bunbuddyMode: TypeExports.Union([TypeExports.Literal("dev"), TypeExports.Literal("start")]),
    startBunBuddies: TypeExports.Boolean(),
    ensureKubernetesRuntime: TypeExports.Boolean(),
    seedEnabled: TypeExports.Boolean(),
    seedFixtures: TypeExports.Boolean(),
    hardwareSimulate: TypeExports.Boolean(),
    runAction: TypeExports.Union(
      [TypeExports.Literal("configure"), TypeExports.Literal("setup:auto")],
      {
        description: "Allowlisted action for the API setup run endpoint.",
      },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard auto-setup configuration.
 */
export type SetupWizardAuto = Static<typeof SetupWizardAutoSchema>;

/**
 * BaoControlPlane setup wizard status classification.
 */
export const SetupWizardBaoControlPlaneStatusSchema: TUnion<
  (
    | TLiteral<"disabled">
    | TLiteral<"not_configured">
    | TLiteral<"unreachable">
    | TLiteral<"healthy">
    | TLiteral<"degraded">
    | TLiteral<"unknown">
    | TLiteral<"error">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("disabled"),
    TypeExports.Literal("not_configured"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("healthy"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("unknown"),
    TypeExports.Literal("error"),
  ],
  {},
);

/**
 * TypeScript type for BaoControlPlane status classification.
 */
export type SetupWizardBaoControlPlaneStatus = Static<
  typeof SetupWizardBaoControlPlaneStatusSchema
>;

/**
 * BaoControlPlane package-controller status surface.
 */
export const SetupWizardBaoControlPlanePackageSchema = TypeExports.Object(
  {
    configured: TypeExports.Boolean(),
    installed: TypeExports.Boolean(),
    phase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    releaseName: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    namespace: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    version: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    valuesHash: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    message: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    checkedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    updatedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    packagesTotal: TypeExports.Integer({ minimum: 0 }),
    packagesInstalled: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for BaoControlPlane package-controller status.
 */
export type SetupWizardBaoControlPlanePackage = Static<
  typeof SetupWizardBaoControlPlanePackageSchema
>;

/**
 * BaoControlPlane GitOps runtime status surface.
 */
export const SetupWizardBaoControlPlaneGitOpsSchema: TObject<
  {
    readonly configured: TBoolean;
    readonly phase: TUnion<(TString | TNull)[]>;
    readonly status: TUnion<(TString | TNull)[]>;
    readonly synced: TUnion<(TBoolean | TNull)[]>;
    readonly revision: TUnion<(TString | TNull)[]>;
    readonly message: TUnion<(TString | TNull)[]>;
    readonly checkedAt: TUnion<(TString | TNull)[]>;
  },
  "phase" | "status" | "message" | "checkedAt" | "configured" | "synced" | "revision",
  never
> = TypeExports.Object(
  {
    configured: TypeExports.Boolean(),
    phase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    synced: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    revision: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    message: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    checkedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for BaoControlPlane GitOps status.
 */
export type SetupWizardBaoControlPlaneGitOps = Static<
  typeof SetupWizardBaoControlPlaneGitOpsSchema
>;

/**
 * Secrets management strategy for fleet-grade deployments.
 *
 * - `sops`: SOPS+age encryption (self-contained, no external vault dependency)
 * - `eso`: External Secrets Operator (delegates to Vault, AWS SM, GCP SM, Azure KV)
 * - `none`: No secrets encryption configured (development only)
 */
export const SetupWizardBaoControlPlaneSecretsStrategySchema: TUnion<
  (TLiteral<"sops"> | TLiteral<"eso"> | TLiteral<"none">)[]
> = TypeExports.Union(
  [TypeExports.Literal("sops"), TypeExports.Literal("eso"), TypeExports.Literal("none")],
  {},
);

/** TypeScript type for secrets strategy. */
export type SetupWizardBaoControlPlaneSecretsStrategy = Static<
  typeof SetupWizardBaoControlPlaneSecretsStrategySchema
>;

/**
 * Secrets strategy validation status for the setup wizard.
 */
export const SetupWizardBaoControlPlaneSecretsSchema: TObject<
  {
    readonly strategy: TUnion<(TLiteral<"sops"> | TLiteral<"eso"> | TLiteral<"none">)[]>;
    readonly configured: TBoolean;
    readonly sopsKeyConfigured: TUnion<(TBoolean | TNull)[]>;
    readonly esoInstalled: TUnion<(TBoolean | TNull)[]>;
    readonly encryptedFileCount: TInteger;
    readonly leakWarnings: TInteger;
    readonly checkedAt: TString;
    readonly message: TOptional<TString>;
  },
  | "sopsKeyConfigured"
  | "esoInstalled"
  | "strategy"
  | "configured"
  | "encryptedFileCount"
  | "leakWarnings"
  | "checkedAt",
  "message"
> = TypeExports.Object(
  {
    strategy: SetupWizardBaoControlPlaneSecretsStrategySchema,
    configured: TypeExports.Boolean(),
    /** Whether the SOPS age key is set (not placeholder). */
    sopsKeyConfigured: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    /** Whether ESO CRDs are installed in-cluster. */
    esoInstalled: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    /** Number of encrypted files found. */
    encryptedFileCount: TypeExports.Integer({ minimum: 0 }),
    /** Plaintext leak warnings detected. */
    leakWarnings: TypeExports.Integer({ minimum: 0 }),
    checkedAt: TypeExports.String({ format: "date-time" }),
    message: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for secrets strategy status. */
export type SetupWizardBaoControlPlaneSecrets = Static<
  typeof SetupWizardBaoControlPlaneSecretsSchema
>;

/**
 * BaoControlPlane status surface in the setup wizard.
 */
export const SetupWizardBaoControlPlaneSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    inCluster: TypeExports.Boolean(),
    platformRuntime: ResolvedPlatformRuntimeSchema,
    package: SetupWizardBaoControlPlanePackageSchema,
    gitops: SetupWizardBaoControlPlaneGitOpsSchema,
    resourcePolicySummary: ResourcePolicySummarySchema,
    resourceObservedSummary: ResourceObservedSummarySchema,
    processStatusSummary: ProcessStatusSummarySchema,
    failurePhase: BaoControlPlaneFailurePhaseSchema,
    /** Secrets management strategy validation (SOPS/ESO/none). */
    secrets: TypeExports.Optional(SetupWizardBaoControlPlaneSecretsSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for BaoControlPlane setup wizard status.
 */
export type SetupWizardBaoControlPlane = Static<typeof SetupWizardBaoControlPlaneSchema>;

/**
 * Schema for setup wizard snapshot responses.
 */
export const SetupWizardResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    infraMode: SetupWizardInfraModeSchema,
    baoControlPlane: SetupWizardBaoControlPlaneSchema,
    auth: SetupWizardAuthSchema,
    ownership: SetupWizardOwnershipSchema,
    environment: TypeExports.Optional(SetupWizardEnvironmentSchema),
    credentials: TypeExports.Optional(SetupWizardCredentialsSchema),
    auto: TypeExports.Optional(SetupWizardAutoSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard snapshot responses.
 */
export type SetupWizardResponse = Static<typeof SetupWizardResponseSchema>;

/**
 * Schema for setup wizard refresh responses.
 */
export const SetupWizardRefreshResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    ownership: CapabilityOwnershipRefreshResponseSchema,
    domainMap: TypeExports.Optional(CapabilityDomainMapResponseSchema),
    deviceInventory: TypeExports.Optional(DeviceInventoryRefreshResponseSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard refresh responses.
 */
export type SetupWizardRefreshResponse = Static<typeof SetupWizardRefreshResponseSchema>;
