/**
 * System setup wizard schemas.
 *
 * Defines TypeBox schemas for the system setup wizard snapshot that
 * combines easy-auth readiness with capability ownership focus mapping.
 *
 * @shared/schemas/setup-wizard.ts
 */

import { CapabilityDomainMapResponseSchema } from "@baohaus/bao-schemas/capability-domain-map.schemas";
import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import { CapabilityOwnershipRefreshResponseSchema } from "@baohaus/bao-schemas/capability-ownership/responses";
import { CapabilityOwnershipSegmentSchema } from "@baohaus/bao-schemas/capability-ownership/segment";
import { CapabilityOwnershipSummarySchema } from "@baohaus/bao-schemas/capability-ownership/summary";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DeviceInventoryRefreshResponseSchema } from "./device-inventory.schemas";
import {
  BaoControlPlaneFailurePhaseSchema,
  ProcessStatusSummarySchema,
  ResolvedPlatformRuntimeSchema,
  ResourceObservedSummarySchema,
  ResourcePolicySummarySchema,
} from "./platform-runtime.schemas";
import { InfraServiceStatusSchema } from "./system-health.schemas";

// Setup Wizard Requests

/**
 * Schema for setup wizard snapshot requests.
 */
export const SetupWizardRequestSchema: Type.TObject<
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
 * TypeScript type for setup wizard snapshot requests.
 */
export type SetupWizardRequest = Static<typeof SetupWizardRequestSchema>;

/**
 * Schema for setup wizard refresh requests.
 */
export const SetupWizardRefreshRequestSchema: Type.TObject<
  {
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly autoRepair: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly autoRepair: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
    autoRepair: Type.Optional(Type.Boolean()),
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
export const SetupWizardRunRequestSchema: Type.TObject<
  {
    readonly action: Type.TUnion<(Type.TLiteral<"configure"> | Type.TLiteral<"setup:auto">)[]>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "action",
  "idempotencyKey"
> = Type.Object(
  {
    action: Type.Union([Type.Literal("configure"), Type.Literal("setup:auto")], {
      description: "Allowlisted action to run",
    }),
    idempotencyKey: Type.Optional(
      Type.String({
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
export const SetupWizardRunEnqueueStatusSchema: Type.TUnion<
  (Type.TLiteral<"queued"> | Type.TLiteral<"deduplicated">)[]
> = Type.Union([Type.Literal("queued"), Type.Literal("deduplicated")], {});

/**
 * Schema for setup wizard run status request params.
 */
export const SetupWizardRunStatusRequestSchema: Type.TObject<
  { readonly jobId: Type.TString },
  "jobId",
  never
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
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
export const SetupWizardRunJobStateSchema: Type.TUnion<
  (
    | Type.TLiteral<"created">
    | Type.TLiteral<"retry">
    | Type.TLiteral<"active">
    | Type.TLiteral<"completed">
    | Type.TLiteral<"cancelled">
    | Type.TLiteral<"failed">
  )[]
> = Type.Union(
  [
    Type.Literal("created"),
    Type.Literal("retry"),
    Type.Literal("active"),
    Type.Literal("completed"),
    Type.Literal("cancelled"),
    Type.Literal("failed"),
  ],
  {},
);

/**
 * Schema for setup wizard run job metadata.
 */
export const SetupWizardRunJobInfoSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly state: Type.TUnion<
      (
        | Type.TLiteral<"created">
        | Type.TLiteral<"retry">
        | Type.TLiteral<"active">
        | Type.TLiteral<"completed">
        | Type.TLiteral<"cancelled">
        | Type.TLiteral<"failed">
      )[]
    >;
    readonly createdOn: Type.TString;
    readonly startedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly completedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly retryCount: Type.TInteger;
    readonly retryLimit: Type.TInteger;
  },
  "startedOn" | "completedOn" | "id" | "state" | "createdOn" | "retryCount" | "retryLimit",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    state: SetupWizardRunJobStateSchema,
    createdOn: Type.String({ format: "date-time" }),
    startedOn: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    completedOn: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    retryCount: Type.Integer({ minimum: 0 }),
    retryLimit: Type.Integer({ minimum: 0 }),
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
export const SetupWizardRunJobOutputSchema = Type.Object(
  {
    completedAt: Type.String({ format: "date-time" }),
    commandLabel: Type.Optional(Type.String()),
    commandSource: Type.Optional(Type.String()),
    failureContext: Type.Optional(
      Type.Object({
        snippet: Type.Optional(Type.String()),
        file: Type.Optional(Type.String()),
        line: Type.Optional(Type.Number()),
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
export const SetupWizardRunStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    job: SetupWizardRunJobInfoSchema,
    output: Type.Union([SetupWizardRunJobOutputSchema, Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
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
export const SetupWizardRunResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly status: Type.TUnion<(Type.TLiteral<"queued"> | Type.TLiteral<"deduplicated">)[]>;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "jobId" | "status",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    jobId: Type.Union([Type.String(), Type.Null()]),
    status: SetupWizardRunEnqueueStatusSchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
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
export const SetupWizardAuthBootstrapSchema: Type.TObject<
  {
    readonly enabled: Type.TBoolean;
    readonly configured: Type.TBoolean;
    readonly environment: Type.TString;
    readonly environmentAllowed: Type.TBoolean;
    readonly allowedEnvironments: Type.TArray<Type.TString>;
  },
  "allowedEnvironments" | "enabled" | "configured" | "environment" | "environmentAllowed",
  never
> = Type.Object(
  {
    enabled: Type.Boolean(),
    configured: Type.Boolean(),
    environment: Type.String({ minLength: 1 }),
    environmentAllowed: Type.Boolean(),
    allowedEnvironments: Type.Array(Type.String({ minLength: 1 })),
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
export const SetupWizardAuthSchema = Type.Object(
  {
    service: InfraServiceStatusSchema,
    internalApiConfigured: Type.Boolean(),
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
export const SetupWizardOwnershipSchema = Type.Object(
  {
    focus: Type.Optional(CapabilityOwnershipFocusSchema),
    segments: Type.Array(CapabilityOwnershipSegmentSchema),
    summary: CapabilityOwnershipSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
    errors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
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
export const SetupWizardFileStatusSchema: Type.TObject<
  {
    readonly path: Type.TString;
    readonly exists: Type.TBoolean;
    readonly readable: Type.TBoolean;
    readonly writable: Type.TBoolean;
  },
  "path" | "exists" | "readable" | "writable",
  never
> = Type.Object(
  {
    path: Type.String({ minLength: 1 }),
    exists: Type.Boolean(),
    readable: Type.Boolean(),
    writable: Type.Boolean(),
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
export const SetupWizardEnvironmentSchema = Type.Object(
  {
    envFiles: Type.Object(
      {
        primary: SetupWizardFileStatusSchema,
        local: SetupWizardFileStatusSchema,
        example: SetupWizardFileStatusSchema,
        exampleFallback: Type.Optional(SetupWizardFileStatusSchema),
        template: SetupWizardFileStatusSchema,
        packageValues: Type.Optional(SetupWizardFileStatusSchema),
      },
      { additionalProperties: false },
    ),
    bun: Type.Object(
      {
        version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        requiredVersion: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        compatible: Type.Union([Type.Boolean(), Type.Null()]),
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
export const SetupWizardCredentialSourceSchema: Type.TUnion<
  (Type.TLiteral<"env"> | Type.TLiteral<"db"> | Type.TLiteral<"none">)[]
> = Type.Union([Type.Literal("env"), Type.Literal("db"), Type.Literal("none")], {});

/**
 * Schema for setup wizard credential status.
 */
export const SetupWizardCredentialStatusSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly label: Type.TString;
    readonly configured: Type.TBoolean;
    readonly source: Type.TUnion<
      (Type.TLiteral<"env"> | Type.TLiteral<"db"> | Type.TLiteral<"none">)[]
    >;
    readonly message: Type.TOptional<Type.TString>;
  },
  "label" | "configured" | "id" | "source",
  "message"
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    configured: Type.Boolean(),
    source: SetupWizardCredentialSourceSchema,
    message: Type.Optional(Type.String({ minLength: 1 })),
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
export const SetupWizardCredentialsSchema: Type.TObject<
  {
    readonly providers: Type.TArray<
      Type.TObject<
        {
          readonly id: Type.TString;
          readonly label: Type.TString;
          readonly configured: Type.TBoolean;
          readonly source: Type.TUnion<
            (Type.TLiteral<"env"> | Type.TLiteral<"db"> | Type.TLiteral<"none">)[]
          >;
          readonly message: Type.TOptional<Type.TString>;
        },
        "label" | "configured" | "id" | "source",
        "message"
      >
    >;
  },
  "providers",
  never
> = Type.Object(
  {
    providers: Type.Array(SetupWizardCredentialStatusSchema),
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
export const SetupWizardInfraModeSchema: Type.TLiteral<"bao-control-plane"> = Type.Literal(
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
export const SetupWizardAutoSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    apiRunEnabled: Type.Boolean(),
    command: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    mode: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    writeRunPorts: Type.Boolean(),
    packageOutput: Type.Boolean(),
    packageDir: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    infraMode: SetupWizardInfraModeSchema,
    bunbuddyMode: Type.Union([Type.Literal("dev"), Type.Literal("start")]),
    startBunBuddies: Type.Boolean(),
    ensureKubernetesRuntime: Type.Boolean(),
    seedEnabled: Type.Boolean(),
    seedFixtures: Type.Boolean(),
    hardwareSimulate: Type.Boolean(),
    runAction: Type.Union([Type.Literal("configure"), Type.Literal("setup:auto")], {
      description: "Allowlisted action for the API setup run endpoint.",
    }),
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
export const SetupWizardBaoControlPlaneStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"disabled">
    | Type.TLiteral<"not_configured">
    | Type.TLiteral<"unreachable">
    | Type.TLiteral<"healthy">
    | Type.TLiteral<"degraded">
    | Type.TLiteral<"unknown">
    | Type.TLiteral<"error">
  )[]
> = Type.Union(
  [
    Type.Literal("disabled"),
    Type.Literal("not_configured"),
    Type.Literal("unreachable"),
    Type.Literal("healthy"),
    Type.Literal("degraded"),
    Type.Literal("unknown"),
    Type.Literal("error"),
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
export const SetupWizardBaoControlPlanePackageSchema = Type.Object(
  {
    configured: Type.Boolean(),
    installed: Type.Boolean(),
    phase: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    releaseName: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    namespace: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    valuesHash: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    message: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    checkedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    updatedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    packagesTotal: Type.Integer({ minimum: 0 }),
    packagesInstalled: Type.Integer({ minimum: 0 }),
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
export const SetupWizardBaoControlPlaneGitOpsSchema: Type.TObject<
  {
    readonly configured: Type.TBoolean;
    readonly phase: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly synced: Type.TUnion<(Type.TBoolean | Type.TNull)[]>;
    readonly revision: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly message: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly checkedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "phase" | "status" | "message" | "checkedAt" | "configured" | "synced" | "revision",
  never
> = Type.Object(
  {
    configured: Type.Boolean(),
    phase: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    synced: Type.Union([Type.Boolean(), Type.Null()]),
    revision: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    message: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    checkedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
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
export const SetupWizardBaoControlPlaneSecretsStrategySchema: Type.TUnion<
  (Type.TLiteral<"sops"> | Type.TLiteral<"eso"> | Type.TLiteral<"none">)[]
> = Type.Union([Type.Literal("sops"), Type.Literal("eso"), Type.Literal("none")], {});

/** TypeScript type for secrets strategy. */
export type SetupWizardBaoControlPlaneSecretsStrategy = Static<
  typeof SetupWizardBaoControlPlaneSecretsStrategySchema
>;

/**
 * Secrets strategy validation status for the setup wizard.
 */
export const SetupWizardBaoControlPlaneSecretsSchema: Type.TObject<
  {
    readonly strategy: Type.TUnion<
      (Type.TLiteral<"sops"> | Type.TLiteral<"eso"> | Type.TLiteral<"none">)[]
    >;
    readonly configured: Type.TBoolean;
    readonly sopsKeyConfigured: Type.TUnion<(Type.TBoolean | Type.TNull)[]>;
    readonly esoInstalled: Type.TUnion<(Type.TBoolean | Type.TNull)[]>;
    readonly encryptedFileCount: Type.TInteger;
    readonly leakWarnings: Type.TInteger;
    readonly checkedAt: Type.TString;
    readonly message: Type.TOptional<Type.TString>;
  },
  | "sopsKeyConfigured"
  | "esoInstalled"
  | "strategy"
  | "configured"
  | "encryptedFileCount"
  | "leakWarnings"
  | "checkedAt",
  "message"
> = Type.Object(
  {
    strategy: SetupWizardBaoControlPlaneSecretsStrategySchema,
    configured: Type.Boolean(),
    /** Whether the SOPS age key is set (not placeholder). */
    sopsKeyConfigured: Type.Union([Type.Boolean(), Type.Null()]),
    /** Whether ESO CRDs are installed in-cluster. */
    esoInstalled: Type.Union([Type.Boolean(), Type.Null()]),
    /** Number of encrypted files found. */
    encryptedFileCount: Type.Integer({ minimum: 0 }),
    /** Plaintext leak warnings detected. */
    leakWarnings: Type.Integer({ minimum: 0 }),
    checkedAt: Type.String({ format: "date-time" }),
    message: Type.Optional(Type.String({ minLength: 1 })),
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
export const SetupWizardBaoControlPlaneSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    inCluster: Type.Boolean(),
    platformRuntime: ResolvedPlatformRuntimeSchema,
    package: SetupWizardBaoControlPlanePackageSchema,
    gitops: SetupWizardBaoControlPlaneGitOpsSchema,
    resourcePolicySummary: ResourcePolicySummarySchema,
    resourceObservedSummary: ResourceObservedSummarySchema,
    processStatusSummary: ProcessStatusSummarySchema,
    failurePhase: BaoControlPlaneFailurePhaseSchema,
    /** Secrets management strategy validation (SOPS/ESO/none). */
    secrets: Type.Optional(SetupWizardBaoControlPlaneSecretsSchema),
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
export const SetupWizardResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    infraMode: SetupWizardInfraModeSchema,
    baoControlPlane: SetupWizardBaoControlPlaneSchema,
    auth: SetupWizardAuthSchema,
    ownership: SetupWizardOwnershipSchema,
    environment: Type.Optional(SetupWizardEnvironmentSchema),
    credentials: Type.Optional(SetupWizardCredentialsSchema),
    auto: Type.Optional(SetupWizardAutoSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
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
export const SetupWizardRefreshResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    ownership: CapabilityOwnershipRefreshResponseSchema,
    domainMap: Type.Optional(CapabilityDomainMapResponseSchema),
    deviceInventory: Type.Optional(DeviceInventoryRefreshResponseSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for setup wizard refresh responses.
 */
export type SetupWizardRefreshResponse = Static<typeof SetupWizardRefreshResponseSchema>;
