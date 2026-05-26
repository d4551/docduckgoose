/**
 * BunBuddy routing status schemas.
 *
 * Defines canonical payloads for bunbuddy routing policy and host gateway
 * resolution so server APIs and Eden clients stay type-safe.
 *
 * @shared/schemas/bunbuddy-routing.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import { BunBuddyContractKubernetesDistributionSchema } from "./bunbuddy-contracts.schemas.ts";
import { ResolvedPlatformRuntimeSchema } from "./platform-runtime.schemas.ts";

/**
 * Supported bunbuddy routing mode schema.
 */
export const BunBuddyRoutingModeSchema: Type.TUnion<
  (Type.TLiteral<"auto"> | Type.TLiteral<"host"> | Type.TLiteral<"container">)[]
> = Type.Union([Type.Literal("auto"), Type.Literal("host"), Type.Literal("container")], {});

/**
 * Type-safe bunbuddy routing mode.
 */
export type BunBuddyRoutingMode = Static<typeof BunBuddyRoutingModeSchema>;

/**
 * BunBuddy prefer-host policy schema.
 */
export const BunBuddyPreferHostPolicySchema: Type.TObject<
  {
    readonly preferHostWhenContainer: Type.TBoolean;
    readonly preferHostWhenRootless: Type.TBoolean;
    readonly preferHostOnNonLinux: Type.TBoolean;
    readonly forceHostWhenRootless: Type.TBoolean;
    readonly forceHostOnNonLinux: Type.TBoolean;
  },
  | "preferHostWhenContainer"
  | "preferHostWhenRootless"
  | "preferHostOnNonLinux"
  | "forceHostWhenRootless"
  | "forceHostOnNonLinux",
  never
> = Type.Object(
  {
    preferHostWhenContainer: Type.Boolean(),
    preferHostWhenRootless: Type.Boolean(),
    preferHostOnNonLinux: Type.Boolean(),
    forceHostWhenRootless: Type.Boolean(),
    forceHostOnNonLinux: Type.Boolean(),
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
export const BunBuddyKubernetesDistributionSchema: Type.TUnion<
  (
    | Type.TUnion<[Type.TLiteral<"k0" | "k3" | "k8">, ...Type.TLiteral<"k0" | "k3" | "k8">[]]>
    | Type.TLiteral<"unknown">
  )[]
> = Type.Union([BunBuddyContractKubernetesDistributionSchema, Type.Literal("unknown")], {});

/**
 * Type-safe bunbuddy Kubernetes distribution values.
 */
export type BunBuddyKubernetesDistribution = Static<typeof BunBuddyKubernetesDistributionSchema>;

/**
 * BunBuddy Kubernetes routing policy schema.
 */
export const BunBuddyKubernetesPolicySchema: Type.TObject<
  {
    readonly runtimeKubernetes: Type.TBoolean;
    readonly distribution: Type.TUnion<
      (
        | Type.TUnion<[Type.TLiteral<"k0" | "k3" | "k8">, ...Type.TLiteral<"k0" | "k3" | "k8">[]]>
        | Type.TLiteral<"unknown">
      )[]
    >;
    readonly distributionSupported: Type.TBoolean;
    readonly supportedDistributions: Type.TArray<
      Type.TUnion<[Type.TLiteral<"k0" | "k3" | "k8">, ...Type.TLiteral<"k0" | "k3" | "k8">[]]>
    >;
    readonly enforceContainerMode: Type.TBoolean;
    readonly disableHostCandidates: Type.TBoolean;
  },
  | "supportedDistributions"
  | "runtimeKubernetes"
  | "distribution"
  | "distributionSupported"
  | "enforceContainerMode"
  | "disableHostCandidates",
  never
> = Type.Object(
  {
    runtimeKubernetes: Type.Boolean(),
    distribution: BunBuddyKubernetesDistributionSchema,
    distributionSupported: Type.Boolean(),
    supportedDistributions: Type.Array(BunBuddyContractKubernetesDistributionSchema),
    enforceContainerMode: Type.Boolean(),
    disableHostCandidates: Type.Boolean(),
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
export const BunBuddyRoutingPlanSourceSchema: Type.TUnion<
  (Type.TLiteral<"env"> | Type.TLiteral<"policy"> | Type.TLiteral<"default">)[]
> = Type.Union([Type.Literal("env"), Type.Literal("policy"), Type.Literal("default")], {});

/**
 * Type-safe routing plan source values.
 */
export type BunBuddyRoutingPlanSource = Static<typeof BunBuddyRoutingPlanSourceSchema>;

/**
 * BunBuddy routing plan entry schema.
 */
export const BunBuddyRoutingPlanEntrySchema = Type.Object(
  {
    bunbuddy: BunBuddyKindSchema,
    mode: BunBuddyRoutingModeSchema,
    baseUrl: Type.String({ minLength: 1 }),
    candidates: Type.Array(Type.String({ minLength: 1 })),
    source: BunBuddyRoutingPlanSourceSchema,
    policyHash: Type.String({ minLength: 1 }),
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
export const BunBuddyRoutingRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
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
export const BunBuddyRoutingStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    mode: BunBuddyRoutingModeSchema,
    policy: BunBuddyPreferHostPolicySchema,
    kubernetesPolicy: BunBuddyKubernetesPolicySchema,
    platformRuntime: ResolvedPlatformRuntimeSchema,
    hostPlatform: Type.String({ minLength: 1 }),
    hostArch: Type.Union([Type.Literal("amd64"), Type.Literal("arm64"), Type.Null()]),
    runtime: Type.Object(
      {
        inContainer: Type.Boolean(),
        kubernetes: Type.Boolean(),
      },
      { additionalProperties: false },
    ),
    hostGateway: Type.String({ minLength: 1 }),
    hostCandidates: Type.Array(Type.String({ minLength: 1 })),
    policyHash: Type.String({ minLength: 1 }),
    planGeneratedAt: Type.Optional(Type.String({ format: "date-time" })),
    plans: Type.Optional(Type.Array(BunBuddyRoutingPlanEntrySchema)),
    timestamp: Type.String({ format: "date-time" }),
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
export const BunBuddyRoutingRefreshResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    refreshed: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy routing refresh responses.
 */
export type BunBuddyRoutingRefreshResponse = Static<typeof BunBuddyRoutingRefreshResponseSchema>;
