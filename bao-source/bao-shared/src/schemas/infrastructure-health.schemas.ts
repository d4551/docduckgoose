/**
 * Infrastructure health response schemas.
 *
 * Shared TypeBox schemas for the `/api/v1/infrastructure/health` endpoint.
 * Extracted from inline Elysia `t.*` definitions to prevent contract drift
 * between server validation and Eden client type inference.
 *
 * @shared/schemas/infrastructure-health
 */

import {
  BaoControlPlaneFailureHintSchema,
  BaoControlPlaneRecommendedActionSchema,
  BaoRuntimeStatusSchema,
} from "@baohaus/bao-schemas/bao-runtime.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const InfraKubernetesSummarySchema: Type.TObject<
  {
    readonly reachable: Type.TBoolean;
    readonly inCluster: Type.TBoolean;
    readonly version: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "version" | "reachable" | "inCluster",
  never
> = Type.Object(
  {
    reachable: Type.Boolean({ description: "Whether the Kubernetes API is reachable" }),
    inCluster: Type.Boolean({ description: "Whether the server is running in-cluster" }),
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()], {
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
export const InfraWorkloadsSummarySchema: Type.TObject<
  { readonly total: Type.TNumber; readonly ready: Type.TNumber; readonly degraded: Type.TNumber },
  "total" | "ready" | "degraded",
  never
> = Type.Object(
  {
    total: Type.Number({ minimum: 0 }),
    ready: Type.Number({ minimum: 0 }),
    degraded: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraWorkloadsSummarySchema}. */
export type InfraWorkloadsSummary = Static<typeof InfraWorkloadsSummarySchema>;

/**
 * Pod summary for infrastructure health.
 */
export const InfraPodsSummarySchema: Type.TObject<
  { readonly running: Type.TNumber; readonly total: Type.TNumber },
  "running" | "total",
  never
> = Type.Object(
  {
    running: Type.Number({ minimum: 0 }),
    total: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraPodsSummarySchema}. */
export type InfraPodsSummary = Static<typeof InfraPodsSummarySchema>;

/**
 * Package release summary for infrastructure health.
 */
export const InfraReleaseSummarySchema: Type.TObject<
  {
    readonly name: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly namespace: Type.TString;
  },
  "name" | "status" | "namespace",
  never
> = Type.Object(
  {
    name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    namespace: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraReleaseSummarySchema}. */
export type InfraReleaseSummary = Static<typeof InfraReleaseSummarySchema>;

/**
 * Package / control-plane summary for infrastructure health.
 */
export const InfraPackageGitOpsSummarySchema: Type.TObject<
  {
    readonly packageInstalled: Type.TOptional<Type.TBoolean>;
    readonly packageStatus: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly gitopsPhase: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly gitopsStatus: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly bunbuddyFleetReady: Type.TOptional<Type.TBoolean>;
  },
  "packageStatus" | "gitopsPhase" | "gitopsStatus",
  Type.InferOptionalKeys<{
    readonly packageInstalled: Type.TOptional<Type.TBoolean>;
    readonly packageStatus: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly gitopsPhase: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly gitopsStatus: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly bunbuddyFleetReady: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    packageInstalled: Type.Optional(Type.Boolean()),
    packageStatus: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    gitopsPhase: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    gitopsStatus: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    bunbuddyFleetReady: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfraPackageGitOpsSummarySchema}. */
export type InfraPackageGitOpsSummary = Static<typeof InfraPackageGitOpsSummarySchema>;

/**
 * Full infrastructure health response payload.
 */
export const InfrastructureHealthPayloadSchema = Type.Object(
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
    recommendedActions: Type.Array(BaoControlPlaneRecommendedActionSchema),
    failureHint: BaoControlPlaneFailureHintSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfrastructureHealthPayloadSchema}. */
export type InfrastructureHealthPayload = Static<typeof InfrastructureHealthPayloadSchema>;

/**
 * Infrastructure metrics routing response payload.
 */
export const InfrastructureMetricsPayloadSchema: Type.TObject<
  {
    readonly source: Type.TLiteral<"siumai">;
    readonly hint: Type.TString;
    readonly metricsEndpoint: Type.TString;
    readonly metricsConfigured: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "source" | "hint" | "timestamp" | "metricsEndpoint" | "metricsConfigured",
  never
> = Type.Object(
  {
    source: Type.Literal("siumai"),
    hint: Type.String({ minLength: 1 }),
    metricsEndpoint: Type.String({ minLength: 1 }),
    metricsConfigured: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link InfrastructureMetricsPayloadSchema}. */
export type InfrastructureMetricsPayload = Static<typeof InfrastructureMetricsPayloadSchema>;
