/**
 * BunBuddy routing status schemas.
 *
 * Defines canonical payloads for bunbuddy routing policy and host gateway
 * resolution so server APIs and Eden clients stay type-safe.
 *
 * @shared/schemas/bunbuddy-routing.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import { BunBuddyContractKubernetesDistributionSchema } from "./bunbuddy-contracts.schemas.ts";
import { ResolvedPlatformRuntimeSchema } from "./platform-runtime.schemas.ts";

/**
 * Supported bunbuddy routing mode schema.
 */
export const BunBuddyRoutingModeSchema: TUnion<
  (TLiteral<"auto"> | TLiteral<"host"> | TLiteral<"container">)[]
> = TypeExports.Union(
  [TypeExports.Literal("auto"), TypeExports.Literal("host"), TypeExports.Literal("container")],
  {},
);

/**
 * Type-safe bunbuddy routing mode.
 */
export type BunBuddyRoutingMode = Static<typeof BunBuddyRoutingModeSchema>;

/**
 * BunBuddy prefer-host policy schema.
 */
export const BunBuddyPreferHostPolicySchema: TObject<
  {
    readonly preferHostWhenContainer: TBoolean;
    readonly preferHostWhenRootless: TBoolean;
    readonly preferHostOnNonLinux: TBoolean;
    readonly forceHostWhenRootless: TBoolean;
    readonly forceHostOnNonLinux: TBoolean;
  },
  | "preferHostWhenContainer"
  | "preferHostWhenRootless"
  | "preferHostOnNonLinux"
  | "forceHostWhenRootless"
  | "forceHostOnNonLinux",
  never
> = TypeExports.Object(
  {
    preferHostWhenContainer: TypeExports.Boolean(),
    preferHostWhenRootless: TypeExports.Boolean(),
    preferHostOnNonLinux: TypeExports.Boolean(),
    forceHostWhenRootless: TypeExports.Boolean(),
    forceHostOnNonLinux: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy prefer-host policy values.
 */
export type BunBuddyPreferHostPolicy = Static<typeof BunBuddyPreferHostPolicySchema>;

/**
 * BunBuddy Kubernetes distribution schema.
 */
export const BunBuddyKubernetesDistributionSchema: TUnion<
  (
    | TUnion<[TLiteral<"k0" | "k3" | "k8">, ...TLiteral<"k0" | "k3" | "k8">[]]>
    | TLiteral<"unknown">
  )[]
> = TypeExports.Union(
  [BunBuddyContractKubernetesDistributionSchema, TypeExports.Literal("unknown")],
  {},
);

/**
 * Type-safe bunbuddy Kubernetes distribution values.
 */
export type BunBuddyKubernetesDistribution = Static<typeof BunBuddyKubernetesDistributionSchema>;

/**
 * BunBuddy Kubernetes routing policy schema.
 */
export const BunBuddyKubernetesPolicySchema: TObject<
  {
    readonly runtimeKubernetes: TBoolean;
    readonly distribution: TUnion<
      (
        | TUnion<[TLiteral<"k0" | "k3" | "k8">, ...TLiteral<"k0" | "k3" | "k8">[]]>
        | TLiteral<"unknown">
      )[]
    >;
    readonly distributionSupported: TBoolean;
    readonly supportedDistributions: TArray<
      TUnion<[TLiteral<"k0" | "k3" | "k8">, ...TLiteral<"k0" | "k3" | "k8">[]]>
    >;
    readonly enforceContainerMode: TBoolean;
    readonly disableHostCandidates: TBoolean;
  },
  | "supportedDistributions"
  | "runtimeKubernetes"
  | "distribution"
  | "distributionSupported"
  | "enforceContainerMode"
  | "disableHostCandidates",
  never
> = TypeExports.Object(
  {
    runtimeKubernetes: TypeExports.Boolean(),
    distribution: BunBuddyKubernetesDistributionSchema,
    distributionSupported: TypeExports.Boolean(),
    supportedDistributions: TypeExports.Array(BunBuddyContractKubernetesDistributionSchema),
    enforceContainerMode: TypeExports.Boolean(),
    disableHostCandidates: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy Kubernetes routing policy.
 */
export type BunBuddyKubernetesPolicy = Static<typeof BunBuddyKubernetesPolicySchema>;

/**
 * BunBuddy routing plan source schema.
 */
export const BunBuddyRoutingPlanSourceSchema: TUnion<
  (TLiteral<"env"> | TLiteral<"policy"> | TLiteral<"default">)[]
> = TypeExports.Union(
  [TypeExports.Literal("env"), TypeExports.Literal("policy"), TypeExports.Literal("default")],
  {},
);

/**
 * Type-safe routing plan source values.
 */
export type BunBuddyRoutingPlanSource = Static<typeof BunBuddyRoutingPlanSourceSchema>;

/**
 * BunBuddy routing plan entry schema.
 */
export const BunBuddyRoutingPlanEntrySchema = TypeExports.Object(
  {
    bunbuddy: BunBuddyKindSchema,
    mode: BunBuddyRoutingModeSchema,
    baseUrl: TypeExports.String({ minLength: 1 }),
    candidates: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    source: BunBuddyRoutingPlanSourceSchema,
    policyHash: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy routing plan entries.
 */
export type BunBuddyRoutingPlanEntry = Static<typeof BunBuddyRoutingPlanEntrySchema>;

/**
 * BunBuddy routing refresh request schema.
 */
export const BunBuddyRoutingRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy routing refresh requests.
 */
export type BunBuddyRoutingRefreshRequest = Static<typeof BunBuddyRoutingRefreshRequestSchema>;

/**
 * BunBuddy routing status response schema.
 */
export const BunBuddyRoutingStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    mode: BunBuddyRoutingModeSchema,
    policy: BunBuddyPreferHostPolicySchema,
    kubernetesPolicy: BunBuddyKubernetesPolicySchema,
    platformRuntime: ResolvedPlatformRuntimeSchema,
    hostPlatform: TypeExports.String({ minLength: 1 }),
    hostArch: TypeExports.Union([
      TypeExports.Literal("amd64"),
      TypeExports.Literal("arm64"),
      TypeExports.Null(),
    ]),
    runtime: TypeExports.Object(
      {
        inContainer: TypeExports.Boolean(),
        kubernetes: TypeExports.Boolean(),
      },
      { additionalProperties: false },
    ),
    hostGateway: TypeExports.String({ minLength: 1 }),
    hostCandidates: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    policyHash: TypeExports.String({ minLength: 1 }),
    planGeneratedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    plans: TypeExports.Optional(TypeExports.Array(BunBuddyRoutingPlanEntrySchema)),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy routing status responses.
 */
export type BunBuddyRoutingStatusResponse = Static<typeof BunBuddyRoutingStatusResponseSchema>;

/**
 * BunBuddy routing refresh response schema.
 */
export const BunBuddyRoutingRefreshResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly refreshed: TBoolean;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    refreshed: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy routing refresh responses.
 */
export type BunBuddyRoutingRefreshResponse = Static<typeof BunBuddyRoutingRefreshResponseSchema>;
