/**
 * Infrastructure health response schemas.
 *
 * Shared TypeBox schemas for the `/api/v1/infrastructure/health` endpoint.
 * Extracted from inline Elysia `t.*` definitions to prevent contract drift
 * between server validation and Eden client type inference.
 *
 * @shared/schemas/infrastructure-health
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  BaoControlPlaneFailureHintSchema,
  BaoControlPlaneRecommendedActionSchema,
  BaoRuntimeStatusSchema,
} from "./bao-runtime.schemas";
import {
  BaoControlPlaneFailurePhaseSchema,
  ProcessStatusSummarySchema,
  ResolvedPlatformRuntimeSchema,
  ResourceObservedSummarySchema,
  ResourcePolicySummarySchema,
} from "./platform-runtime.schemas.ts";

/**
 * Kubernetes cluster summary for infrastructure health.
 */
export const InfraKubernetesSummarySchema: TObject<
  {
    readonly reachable: TBoolean;
    readonly inCluster: TBoolean;
    readonly version: TUnion<(TString | TNull)[]>;
  },
  "version" | "reachable" | "inCluster",
  never
> = TypeExports.Object(
  {
    reachable: TypeExports.Boolean({ description: "Whether the Kubernetes API is reachable" }),
    inCluster: TypeExports.Boolean({ description: "Whether the server is running in-cluster" }),
    version: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Kubernetes server version",
    }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraKubernetesSummarySchema}. */
export type InfraKubernetesSummary = Static<typeof InfraKubernetesSummarySchema>;

/**
 * Workload summary for infrastructure health.
 */
export const InfraWorkloadsSummarySchema: TObject<
  { readonly total: TNumber; readonly ready: TNumber; readonly degraded: TNumber },
  "total" | "ready" | "degraded",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Number({ minimum: 0 }),
    ready: TypeExports.Number({ minimum: 0 }),
    degraded: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraWorkloadsSummarySchema}. */
export type InfraWorkloadsSummary = Static<typeof InfraWorkloadsSummarySchema>;

/**
 * Pod summary for infrastructure health.
 */
export const InfraPodsSummarySchema: TObject<
  { readonly running: TNumber; readonly total: TNumber },
  "running" | "total",
  never
> = TypeExports.Object(
  {
    running: TypeExports.Number({ minimum: 0 }),
    total: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraPodsSummarySchema}. */
export type InfraPodsSummary = Static<typeof InfraPodsSummarySchema>;

/**
 * Package release summary for infrastructure health.
 */
export const InfraReleaseSummarySchema: TObject<
  {
    readonly name: TUnion<(TString | TNull)[]>;
    readonly status: TUnion<(TString | TNull)[]>;
    readonly namespace: TString;
  },
  "name" | "status" | "namespace",
  never
> = TypeExports.Object(
  {
    name: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    namespace: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraReleaseSummarySchema}. */
export type InfraReleaseSummary = Static<typeof InfraReleaseSummarySchema>;

/**
 * Package / control-plane summary for infrastructure health.
 */
export const InfraPackageGitOpsSummarySchema: TObject<
  {
    readonly packageInstalled: TOptional<TBoolean>;
    readonly packageStatus: TUnion<(TString | TNull)[]>;
    readonly gitopsPhase: TUnion<(TString | TNull)[]>;
    readonly gitopsStatus: TUnion<(TString | TNull)[]>;
    readonly bunbuddyFleetReady: TOptional<TBoolean>;
  },
  "packageStatus" | "gitopsPhase" | "gitopsStatus",
  InferOptionalKeys<{
    readonly packageInstalled: TOptional<TBoolean>;
    readonly packageStatus: TUnion<(TString | TNull)[]>;
    readonly gitopsPhase: TUnion<(TString | TNull)[]>;
    readonly gitopsStatus: TUnion<(TString | TNull)[]>;
    readonly bunbuddyFleetReady: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    packageInstalled: TypeExports.Optional(TypeExports.Boolean()),
    packageStatus: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    gitopsPhase: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    gitopsStatus: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    bunbuddyFleetReady: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraPackageGitOpsSummarySchema}. */
export type InfraPackageGitOpsSummary = Static<typeof InfraPackageGitOpsSummarySchema>;

/**
 * Full infrastructure health response payload.
 */
export const InfrastructureHealthPayloadSchema = TypeExports.Object(
  {
    status: BaoRuntimeStatusSchema,
    platformRuntime: ResolvedPlatformRuntimeSchema,
    kubernetes: InfraKubernetesSummarySchema,
    workloads: InfraWorkloadsSummarySchema,
    pods: InfraPodsSummarySchema,
    release: InfraReleaseSummarySchema,
    packageGitOps: InfraPackageGitOpsSummarySchema,
    resourcePolicySummary: ResourcePolicySummarySchema,
    resourceObservedSummary: ResourceObservedSummarySchema,
    processStatusSummary: ProcessStatusSummarySchema,
    failurePhase: BaoControlPlaneFailurePhaseSchema,
    recommendedActions: TypeExports.Array(BaoControlPlaneRecommendedActionSchema),
    failureHint: BaoControlPlaneFailureHintSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfrastructureHealthPayloadSchema}. */
export type InfrastructureHealthPayload = Static<typeof InfrastructureHealthPayloadSchema>;

/**
 * Infrastructure metrics routing response payload.
 */
export const InfrastructureMetricsPayloadSchema: TObject<
  {
    readonly source: TLiteral<"siumai">;
    readonly hint: TString;
    readonly metricsEndpoint: TString;
    readonly metricsConfigured: TBoolean;
    readonly timestamp: TString;
  },
  "source" | "hint" | "timestamp" | "metricsEndpoint" | "metricsConfigured",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Literal("siumai"),
    hint: TypeExports.String({ minLength: 1 }),
    metricsEndpoint: TypeExports.String({ minLength: 1 }),
    metricsConfigured: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfrastructureMetricsPayloadSchema}. */
export type InfrastructureMetricsPayload = Static<typeof InfrastructureMetricsPayloadSchema>;
