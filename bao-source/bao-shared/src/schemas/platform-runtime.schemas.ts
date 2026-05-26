/**
 * Shared platform-runtime status schemas.
 *
 * Canonical platform, build-matrix, process, and resource metadata projected
 * by BaoControlPlane runtime, infrastructure health, setup-wizard, and BunBuddy
 * routing surfaces.
 *
 * @shared/schemas/platform-runtime
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { registerSchemaFormats } from "../utils/schema-formats.ts";
import { BUNBUDDY_KINDS, type BunBuddyKind, BunBuddyKindSchema } from "./bunbuddy.schemas.ts";

/**
 * Ensure TypeBox format validators (date-time, email, uuid, etc.) are
 * registered once per process so that Check correctly validates
 * format-annotated strings in union types.
 */
registerSchemaFormats();

/**
 * Canonical requested-provider token.
 */
export const RequestedBaoControlPlaneProviderSchema: Type.TUnion<
  (Type.TLiteral<"auto"> | Type.TLiteral<"k0"> | Type.TLiteral<"k3"> | Type.TLiteral<"k8">)[]
> = Type.Union(
  [Type.Literal("auto"), Type.Literal("k0"), Type.Literal("k3"), Type.Literal("k8")],
  {},
);

/**
 * TypeScript type for {@link RequestedBaoControlPlaneProviderSchema}.
 */
export type RequestedBaoControlPlaneProvider = Static<
  typeof RequestedBaoControlPlaneProviderSchema
>;

/**
 * Canonical resolved BaoControlPlane provider schema.
 */
export const BaoControlPlaneResolvedProviderSchema: Type.TUnion<
  (Type.TLiteral<"k0"> | Type.TLiteral<"k3"> | Type.TLiteral<"k8">)[]
> = Type.Union([Type.Literal("k0"), Type.Literal("k3"), Type.Literal("k8")], {});

/**
 * TypeScript type for {@link BaoControlPlaneResolvedProviderSchema}.
 */
export type BaoControlPlaneResolvedProvider = Static<typeof BaoControlPlaneResolvedProviderSchema>;

/**
 * Machine-readable bootstrap mode.
 */
export const BaoControlPlaneBootstrapModeSchema: Type.TUnion<
  (
    | Type.TLiteral<"attached">
    | Type.TLiteral<"bootstrap-kind">
    | Type.TLiteral<"bootstrap-direct">
  )[]
> = Type.Union(
  [Type.Literal("attached"), Type.Literal("bootstrap-kind"), Type.Literal("bootstrap-direct")],
  {},
);

/**
 * TypeScript type for {@link BaoControlPlaneBootstrapModeSchema}.
 */
export type BaoControlPlaneBootstrapMode = Static<typeof BaoControlPlaneBootstrapModeSchema>;

/**
 * Machine-readable runtime failure phase.
 */
export const BaoControlPlaneFailurePhaseSchema: Type.TUnion<
  (
    | Type.TLiteral<"preflight">
    | Type.TLiteral<"bootstrap">
    | Type.TLiteral<"registry">
    | Type.TLiteral<"package">
    | Type.TLiteral<"fleet">
    | Type.TLiteral<"secrets">
    | Type.TLiteral<"process">
    | Type.TLiteral<"resource">
    | Type.TLiteral<"monitoring">
    | Type.TLiteral<"unknown">
  )[]
> = Type.Union(
  [
    Type.Literal("preflight"),
    Type.Literal("bootstrap"),
    Type.Literal("registry"),
    Type.Literal("package"),
    Type.Literal("fleet"),
    Type.Literal("secrets"),
    Type.Literal("process"),
    Type.Literal("resource"),
    Type.Literal("monitoring"),
    Type.Literal("unknown"),
  ],
  {},
);

/**
 * TypeScript type for {@link BaoControlPlaneFailurePhaseSchema}.
 */
export type BaoControlPlaneFailurePhase = Static<typeof BaoControlPlaneFailurePhaseSchema>;

/**
 * Canonical build platform token.
 */
export const BaoControlPlaneBuildPlatformSchema: Type.TString = Type.String({
  minLength: 1,
  pattern: "^[a-z0-9]+/[a-z0-9_]+$",
});

/**
 * TypeScript type for {@link BaoControlPlaneBuildPlatformSchema}.
 */
export type BaoControlPlaneBuildPlatform = Static<typeof BaoControlPlaneBuildPlatformSchema>;

/**
 * Privileged BaoControlPlane host runtime owner status.
 */
export const BaoControlPlanePrivilegedOwnerStatusSchema: Type.TUnion<
  (Type.TLiteral<"available"> | Type.TLiteral<"unavailable"> | Type.TLiteral<"version-mismatch">)[]
> = Type.Union(
  [Type.Literal("available"), Type.Literal("unavailable"), Type.Literal("version-mismatch")],
  {},
);

/**
 * TypeScript type for {@link BaoControlPlanePrivilegedOwnerStatusSchema}.
 */
export type BaoControlPlanePrivilegedOwnerStatus = Static<
  typeof BaoControlPlanePrivilegedOwnerStatusSchema
>;

/**
 * Canonical BaoControlPlane container build profile.
 */
export const BaoControlPlaneContainerBuildProfileSchema: Type.TUnion<
  (Type.TLiteral<"ci"> | Type.TLiteral<"lean"> | Type.TLiteral<"standard"> | Type.TLiteral<"dev">)[]
> = Type.Union(
  [Type.Literal("ci"), Type.Literal("lean"), Type.Literal("standard"), Type.Literal("dev")],
  {},
);

/**
 * TypeScript type for {@link BaoControlPlaneContainerBuildProfileSchema}.
 */
export type BaoControlPlaneContainerBuildProfile = Static<
  typeof BaoControlPlaneContainerBuildProfileSchema
>;

/**
 * Shared build-optimization projection.
 */
export const BaoControlPlaneBuildOptimizationsSchema: Type.TObject<
  { readonly bytecodeSupported: Type.TBoolean; readonly bytecodeEnabled: Type.TBoolean },
  "bytecodeSupported" | "bytecodeEnabled",
  never
> = Type.Object(
  {
    bytecodeSupported: Type.Boolean(),
    bytecodeEnabled: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoControlPlaneBuildOptimizationsSchema}.
 */
export type BaoControlPlaneBuildOptimizations = Static<
  typeof BaoControlPlaneBuildOptimizationsSchema
>;

/**
 * Canonical resolved platform-runtime contract.
 */
export const ResolvedPlatformRuntimeSchema = Type.Object(
  {
    requestedProvider: RequestedBaoControlPlaneProviderSchema,
    resolvedProvider: BaoControlPlaneResolvedProviderSchema,
    bootstrapMode: BaoControlPlaneBootstrapModeSchema,
    distribution: BaoControlPlaneResolvedProviderSchema,
    hostPlatform: Type.String({ minLength: 1 }),
    hostArch: Type.Union([Type.Literal("amd64"), Type.Literal("arm64"), Type.Null()]),
    buildPlatforms: Type.Array(BaoControlPlaneBuildPlatformSchema),
    targetArch: Type.Union([Type.Literal("amd64"), Type.Literal("arm64"), Type.Null()]),
    containerBuildProfile: BaoControlPlaneContainerBuildProfileSchema,
    localDevImages: Type.Boolean(),
    registryCacheEnabled: Type.Boolean(),
    buildOptimizations: BaoControlPlaneBuildOptimizationsSchema,
    autoResolutionReason: Type.Union([Type.String(), Type.Null()]),
    privilegedOwnerStatus: Type.Union([BaoControlPlanePrivilegedOwnerStatusSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ResolvedPlatformRuntimeSchema}.
 */
export type ResolvedPlatformRuntime = Static<typeof ResolvedPlatformRuntimeSchema>;

/**
 * Kubernetes resource pair.
 */
export const RuntimeResourceValuesSchema: Type.TObject<
  { readonly cpu: Type.TString; readonly memory: Type.TString },
  "cpu" | "memory",
  never
> = Type.Object(
  {
    cpu: Type.String({ minLength: 1 }),
    memory: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link RuntimeResourceValuesSchema}.
 */
export type RuntimeResourceValues = Static<typeof RuntimeResourceValuesSchema>;

/**
 * Kubernetes resource request and limit policy.
 */
export const RuntimeResourcePolicySchema: Type.TObject<
  {
    readonly requests: Type.TObject<
      { readonly cpu: Type.TString; readonly memory: Type.TString },
      "cpu" | "memory",
      never
    >;
    readonly limits: Type.TObject<
      { readonly cpu: Type.TString; readonly memory: Type.TString },
      "cpu" | "memory",
      never
    >;
  },
  "requests" | "limits",
  never
> = Type.Object(
  {
    requests: RuntimeResourceValuesSchema,
    limits: RuntimeResourceValuesSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link RuntimeResourcePolicySchema}.
 */
export type RuntimeResourcePolicy = Static<typeof RuntimeResourcePolicySchema>;

const bunBuddyResourcePolicyProperties = Object.fromEntries(
  BUNBUDDY_KINDS.map((kind) => [kind, RuntimeResourcePolicySchema]),
) as Record<BunBuddyKind, typeof RuntimeResourcePolicySchema>;

/**
 * BunBuddy resource-policy map keyed by BunBuddy kind.
 */
export const BunBuddyResourcePolicyMapSchema: Type.TObject<
  Record<
    | "basler"
    | "ble"
    | "dimsum"
    | "drone"
    | "gaussian"
    | "industrial"
    | "iot"
    | "lighting"
    | "perception"
    | "printer"
    | "robotics"
    | "rpa"
    | "scanner"
    | "scoutdumpling"
    | "usb"
    | "vision",
    Type.TObject<
      {
        readonly requests: Type.TObject<
          { readonly cpu: Type.TString; readonly memory: Type.TString },
          "cpu" | "memory",
          never
        >;
        readonly limits: Type.TObject<
          { readonly cpu: Type.TString; readonly memory: Type.TString },
          "cpu" | "memory",
          never
        >;
      },
      "requests" | "limits",
      never
    >
  >,
  | "basler"
  | "ble"
  | "dimsum"
  | "drone"
  | "gaussian"
  | "industrial"
  | "iot"
  | "lighting"
  | "perception"
  | "printer"
  | "robotics"
  | "rpa"
  | "scanner"
  | "scoutdumpling"
  | "usb"
  | "vision",
  never
> = Type.Object(bunBuddyResourcePolicyProperties, {
  additionalProperties: false,
});

/**
 * TypeScript type for {@link BunBuddyResourcePolicyMapSchema}.
 */
export type BunBuddyResourcePolicyMap = Static<typeof BunBuddyResourcePolicyMapSchema>;

/**
 * Resource-policy summary projected into runtime status.
 */
export const ResourcePolicySummarySchema = Type.Object(
  {
    source: Type.Literal("deployment-config"),
    hardwareNodeArchitecture: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    defaultResources: RuntimeResourcePolicySchema,
    appResources: RuntimeResourcePolicySchema,
    bunbuddyDefaultResources: RuntimeResourcePolicySchema,
    bunbuddyResourcesByKind: BunBuddyResourcePolicyMapSchema,
    bunbuddyResourceKinds: Type.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ResourcePolicySummarySchema}.
 */
export type ResourcePolicySummary = Static<typeof ResourcePolicySummarySchema>;

/**
 * Managed process lifecycle state.
 */
export const ManagedProcessStateSchema: Type.TUnion<
  (
    | Type.TLiteral<"active">
    | Type.TLiteral<"inactive">
    | Type.TLiteral<"missing">
    | Type.TLiteral<"unknown">
  )[]
> = Type.Union(
  [
    Type.Literal("active"),
    Type.Literal("inactive"),
    Type.Literal("missing"),
    Type.Literal("unknown"),
  ],
  {},
);

/**
 * TypeScript type for {@link ManagedProcessStateSchema}.
 */
export type ManagedProcessState = Static<typeof ManagedProcessStateSchema>;

/**
 * Managed process execution mode.
 */
export const ManagedProcessModeSchema: Type.TUnion<
  (
    | Type.TLiteral<"direct">
    | Type.TLiteral<"detached">
    | Type.TLiteral<"service">
    | Type.TLiteral<"kind">
    | Type.TLiteral<"launcher">
    | Type.TLiteral<"port-forward">
    | Type.TLiteral<"rpc">
    | Type.TLiteral<"none">
  )[]
> = Type.Union(
  [
    Type.Literal("direct"),
    Type.Literal("detached"),
    Type.Literal("service"),
    Type.Literal("kind"),
    Type.Literal("launcher"),
    Type.Literal("port-forward"),
    Type.Literal("rpc"),
    Type.Literal("none"),
  ],
  {},
);

/**
 * TypeScript type for {@link ManagedProcessModeSchema}.
 */
export type ManagedProcessMode = Static<typeof ManagedProcessModeSchema>;

/**
 * Managed process startup state.
 */
export const ManagedProcessStartupStateSchema: Type.TUnion<
  (
    | Type.TLiteral<"starting">
    | Type.TLiteral<"ready">
    | Type.TLiteral<"stopping">
    | Type.TLiteral<"stopped">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"unknown">
  )[]
> = Type.Union(
  [
    Type.Literal("starting"),
    Type.Literal("ready"),
    Type.Literal("stopping"),
    Type.Literal("stopped"),
    Type.Literal("failed"),
    Type.Literal("unknown"),
  ],
  {},
);

/**
 * TypeScript type for {@link ManagedProcessStartupStateSchema}.
 */
export type ManagedProcessStartupState = Static<typeof ManagedProcessStartupStateSchema>;

/**
 * Managed process restart policy.
 */
export const ManagedProcessRestartPolicySchema: Type.TUnion<
  (
    | Type.TLiteral<"never">
    | Type.TLiteral<"manual">
    | Type.TLiteral<"on-failure">
    | Type.TLiteral<"always">
  )[]
> = Type.Union(
  [
    Type.Literal("never"),
    Type.Literal("manual"),
    Type.Literal("on-failure"),
    Type.Literal("always"),
  ],
  {},
);

/**
 * TypeScript type for {@link ManagedProcessRestartPolicySchema}.
 */
export type ManagedProcessRestartPolicy = Static<typeof ManagedProcessRestartPolicySchema>;

/**
 * Managed-process observed resource usage.
 */
export const ManagedProcessObservedUsageSchema = Type.Object(
  {
    sampledAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    sampleSource: Type.Union(
      [Type.Literal("live"), Type.Literal("ps"), Type.Literal("hybrid"), Type.Literal("none")],
      {},
    ),
    stale: Type.Boolean(),
    cpuPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    memoryPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    residentSetKb: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    maxResidentSetBytes: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cpuTimeUserMicros: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cpuTimeSystemMicros: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cpuTimeTotalMicros: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ManagedProcessObservedUsageSchema}.
 */
export type ManagedProcessObservedUsage = Static<typeof ManagedProcessObservedUsageSchema>;

/**
 * Backward-compatible alias for managed-process resource usage entries.
 */
export const ManagedProcessResourceUsageSchema = ManagedProcessObservedUsageSchema;

/**
 * TypeScript type for {@link ManagedProcessResourceUsageSchema}.
 */
export type ManagedProcessResourceUsage = ManagedProcessObservedUsage;

/**
 * Managed process registry entry persisted for runtime ownership.
 */
export const ManagedProcessRegistryEntrySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    owner: Type.String({ minLength: 1 }),
    purpose: Type.String({ minLength: 1 }),
    command: Type.Array(Type.String({ minLength: 1 })),
    cwd: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    pid: Type.Union([Type.Integer({ minimum: 1 }), Type.Null()]),
    state: ManagedProcessStateSchema,
    mode: ManagedProcessModeSchema,
    startupState: ManagedProcessStartupStateSchema,
    startedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastSeenAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastRestartAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    exitCode: Type.Union([Type.Integer(), Type.Null()]),
    signalCode: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    restartCount: Type.Integer({ minimum: 0 }),
    restartPolicy: ManagedProcessRestartPolicySchema,
    restartRequired: Type.Boolean(),
    lastError: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    details: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    resourceUsage: Type.Union([ManagedProcessObservedUsageSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ManagedProcessRegistryEntrySchema}.
 */
export type ManagedProcessRegistryEntry = Static<typeof ManagedProcessRegistryEntrySchema>;

/**
 * Managed-process summary entry.
 */
export const ManagedProcessSummarySchema = ManagedProcessRegistryEntrySchema;

/**
 * TypeScript type for {@link ManagedProcessSummarySchema}.
 */
export type ManagedProcessSummary = Static<typeof ManagedProcessSummarySchema>;

/**
 * Persisted managed-process registry file payload.
 */
export const ManagedProcessRegistrySnapshotSchema = Type.Object(
  {
    version: Type.Literal(1),
    updatedAt: Type.String({ format: "date-time" }),
    process: ManagedProcessRegistryEntrySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ManagedProcessRegistrySnapshotSchema}.
 */
export type ManagedProcessRegistrySnapshot = Static<typeof ManagedProcessRegistrySnapshotSchema>;

/**
 * Resource observation entry for an individual managed process.
 */
export const ResourceObservedProcessSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    owner: Type.String({ minLength: 1 }),
    purpose: Type.String({ minLength: 1 }),
    pid: Type.Union([Type.Integer({ minimum: 1 }), Type.Null()]),
    state: ManagedProcessStateSchema,
    sampleSource: Type.Union(
      [Type.Literal("live"), Type.Literal("ps"), Type.Literal("hybrid"), Type.Literal("none")],
      {},
    ),
    stale: Type.Boolean(),
    restartCount: Type.Integer({ minimum: 0 }),
    cpuPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    memoryPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    residentSetKb: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    maxResidentSetBytes: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cpuTimeUserMicros: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cpuTimeSystemMicros: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cpuTimeTotalMicros: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    requestedCpu: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    requestedMemory: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    requestedToObservedCpuRatio: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    requestedToObservedMemoryRatio: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    oomKilled: Type.Union([Type.Boolean(), Type.Null()]),
    throttled: Type.Union([Type.Boolean(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ResourceObservedProcessSchema}.
 */
export type ResourceObservedProcess = Static<typeof ResourceObservedProcessSchema>;

/**
 * Observed resource summary projected into runtime status.
 */
export const ResourceObservedSummarySchema = Type.Object(
  {
    source: Type.Literal("managed-process-registry"),
    sampledAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    stale: Type.Boolean(),
    activeProcessCount: Type.Integer({ minimum: 0 }),
    degradedProcessCount: Type.Integer({ minimum: 0 }),
    restartCount: Type.Integer({ minimum: 0 }),
    oomKilledCount: Type.Integer({ minimum: 0 }),
    throttledProcessCount: Type.Integer({ minimum: 0 }),
    totalCpuPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    totalMemoryPercent: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    totalResidentSetKb: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    processes: Type.Array(ResourceObservedProcessSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ResourceObservedSummarySchema}.
 */
export type ResourceObservedSummary = Static<typeof ResourceObservedSummarySchema>;

/**
 * Process-status summary projected into runtime status.
 */
export const ProcessStatusSummarySchema = Type.Object(
  {
    owner: Type.Literal("bao-runtime"),
    managed: Type.Boolean(),
    startupState: ManagedProcessStartupStateSchema,
    activeCount: Type.Integer({ minimum: 0 }),
    degradedCount: Type.Integer({ minimum: 0 }),
    restartRequired: Type.Boolean(),
    lastRestartAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    processes: Type.Array(ManagedProcessSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ProcessStatusSummarySchema}.
 */
export type ProcessStatusSummary = Static<typeof ProcessStatusSummarySchema>;
