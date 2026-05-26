/**
 * Shared platform-runtime status schemas.
 *
 * Canonical platform, build-matrix, process, and resource metadata projected
 * by BaoControlPlane runtime, infrastructure health, setup-wizard, and BunBuddy
 * routing surfaces.
 *
 * @shared/schemas/platform-runtime
 */

import type { Static, TBoolean, TLiteral, TObject, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { formatRegistry } from "@baohaus/baobox/shared/registries";
import { BUNBUDDY_KINDS, type BunBuddyKind, BunBuddyKindSchema } from "./bunbuddy.schemas.ts";

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/u;
let formatsRegistered = false;

function registerSchemaFormats(): void {
  if (formatsRegistered) {
    return;
  }

  registerFormat("email", (value) => EMAIL_REGEX.test(value));
  registerFormat("date-time", (value) => Number.isFinite(Date.parse(value)));
  registerFormat("date", (value) => DATE_REGEX.test(value) && Number.isFinite(Date.parse(value)));
  registerFormat("uuid", (value) => UUID_REGEX.test(value));

  formatsRegistered = true;
}

function registerFormat(format: string, check: (value: string) => boolean): void {
  if (formatRegistry.has(format)) {
    return;
  }
  formatRegistry.set(format, check);
}

/**
 * Ensure TypeBox format validators (date-time, email, uuid, etc.) are
 * registered once per process so that Check correctly validates
 * format-annotated strings in union types.
 */
registerSchemaFormats();

/**
 * Canonical requested-provider token.
 */
export const RequestedBaoControlPlaneProviderSchema: TUnion<
  (TLiteral<"auto"> | TLiteral<"k0"> | TLiteral<"k3"> | TLiteral<"k8">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("auto"),
    TypeExports.Literal("k0"),
    TypeExports.Literal("k3"),
    TypeExports.Literal("k8"),
  ],
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
export const BaoControlPlaneResolvedProviderSchema: TUnion<
  (TLiteral<"k0"> | TLiteral<"k3"> | TLiteral<"k8">)[]
> = TypeExports.Union(
  [TypeExports.Literal("k0"), TypeExports.Literal("k3"), TypeExports.Literal("k8")],
  {},
);

/**
 * TypeScript type for {@link BaoControlPlaneResolvedProviderSchema}.
 */
export type BaoControlPlaneResolvedProvider = Static<typeof BaoControlPlaneResolvedProviderSchema>;

/**
 * Machine-readable bootstrap mode.
 */
export const BaoControlPlaneBootstrapModeSchema: TUnion<
  (TLiteral<"attached"> | TLiteral<"bootstrap-kind"> | TLiteral<"bootstrap-direct">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("attached"),
    TypeExports.Literal("bootstrap-kind"),
    TypeExports.Literal("bootstrap-direct"),
  ],
  {},
);

/**
 * TypeScript type for {@link BaoControlPlaneBootstrapModeSchema}.
 */
export type BaoControlPlaneBootstrapMode = Static<typeof BaoControlPlaneBootstrapModeSchema>;

/**
 * Machine-readable runtime failure phase.
 */
export const BaoControlPlaneFailurePhaseSchema: TUnion<
  (
    | TLiteral<"preflight">
    | TLiteral<"bootstrap">
    | TLiteral<"registry">
    | TLiteral<"package">
    | TLiteral<"fleet">
    | TLiteral<"secrets">
    | TLiteral<"process">
    | TLiteral<"resource">
    | TLiteral<"monitoring">
    | TLiteral<"unknown">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("preflight"),
    TypeExports.Literal("bootstrap"),
    TypeExports.Literal("registry"),
    TypeExports.Literal("package"),
    TypeExports.Literal("fleet"),
    TypeExports.Literal("secrets"),
    TypeExports.Literal("process"),
    TypeExports.Literal("resource"),
    TypeExports.Literal("monitoring"),
    TypeExports.Literal("unknown"),
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
export const BaoControlPlaneBuildPlatformSchema: TString = TypeExports.String({
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
export const BaoControlPlanePrivilegedOwnerStatusSchema: TUnion<
  (TLiteral<"available"> | TLiteral<"unavailable"> | TLiteral<"version-mismatch">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("available"),
    TypeExports.Literal("unavailable"),
    TypeExports.Literal("version-mismatch"),
  ],
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
export const BaoControlPlaneContainerBuildProfileSchema: TUnion<
  (TLiteral<"ci"> | TLiteral<"lean"> | TLiteral<"standard"> | TLiteral<"dev">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("ci"),
    TypeExports.Literal("lean"),
    TypeExports.Literal("standard"),
    TypeExports.Literal("dev"),
  ],
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
export const BaoControlPlaneBuildOptimizationsSchema: TObject<
  { readonly bytecodeSupported: TBoolean; readonly bytecodeEnabled: TBoolean },
  "bytecodeSupported" | "bytecodeEnabled",
  never
> = TypeExports.Object(
  {
    bytecodeSupported: TypeExports.Boolean(),
    bytecodeEnabled: TypeExports.Boolean(),
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
export const ResolvedPlatformRuntimeSchema = TypeExports.Object(
  {
    requestedProvider: RequestedBaoControlPlaneProviderSchema,
    resolvedProvider: BaoControlPlaneResolvedProviderSchema,
    bootstrapMode: BaoControlPlaneBootstrapModeSchema,
    distribution: BaoControlPlaneResolvedProviderSchema,
    hostPlatform: TypeExports.String({ minLength: 1 }),
    hostArch: TypeExports.Union([
      TypeExports.Literal("amd64"),
      TypeExports.Literal("arm64"),
      TypeExports.Null(),
    ]),
    buildPlatforms: TypeExports.Array(BaoControlPlaneBuildPlatformSchema),
    targetArch: TypeExports.Union([
      TypeExports.Literal("amd64"),
      TypeExports.Literal("arm64"),
      TypeExports.Null(),
    ]),
    containerBuildProfile: BaoControlPlaneContainerBuildProfileSchema,
    localDevImages: TypeExports.Boolean(),
    registryCacheEnabled: TypeExports.Boolean(),
    buildOptimizations: BaoControlPlaneBuildOptimizationsSchema,
    autoResolutionReason: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    privilegedOwnerStatus: TypeExports.Union([
      BaoControlPlanePrivilegedOwnerStatusSchema,
      TypeExports.Null(),
    ]),
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
export const RuntimeResourceValuesSchema: TObject<
  { readonly cpu: TString; readonly memory: TString },
  "cpu" | "memory",
  never
> = TypeExports.Object(
  {
    cpu: TypeExports.String({ minLength: 1 }),
    memory: TypeExports.String({ minLength: 1 }),
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
export const RuntimeResourcePolicySchema: TObject<
  {
    readonly requests: TObject<
      { readonly cpu: TString; readonly memory: TString },
      "cpu" | "memory",
      never
    >;
    readonly limits: TObject<
      { readonly cpu: TString; readonly memory: TString },
      "cpu" | "memory",
      never
    >;
  },
  "requests" | "limits",
  never
> = TypeExports.Object(
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
export const BunBuddyResourcePolicyMapSchema: TObject<
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
    TObject<
      {
        readonly requests: TObject<
          { readonly cpu: TString; readonly memory: TString },
          "cpu" | "memory",
          never
        >;
        readonly limits: TObject<
          { readonly cpu: TString; readonly memory: TString },
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
> = TypeExports.Object(bunBuddyResourcePolicyProperties, {
  additionalProperties: false,
});

/**
 * TypeScript type for {@link BunBuddyResourcePolicyMapSchema}.
 */
export type BunBuddyResourcePolicyMap = Static<typeof BunBuddyResourcePolicyMapSchema>;

/**
 * Resource-policy summary projected into runtime status.
 */
export const ResourcePolicySummarySchema = TypeExports.Object(
  {
    source: TypeExports.Literal("deployment-config"),
    hardwareNodeArchitecture: TypeExports.Union([
      TypeExports.String({ minLength: 1 }),
      TypeExports.Null(),
    ]),
    defaultResources: RuntimeResourcePolicySchema,
    appResources: RuntimeResourcePolicySchema,
    bunbuddyDefaultResources: RuntimeResourcePolicySchema,
    bunbuddyResourcesByKind: BunBuddyResourcePolicyMapSchema,
    bunbuddyResourceKinds: TypeExports.Array(BunBuddyKindSchema),
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
export const ManagedProcessStateSchema: TUnion<
  (TLiteral<"active"> | TLiteral<"inactive"> | TLiteral<"missing"> | TLiteral<"unknown">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("active"),
    TypeExports.Literal("inactive"),
    TypeExports.Literal("missing"),
    TypeExports.Literal("unknown"),
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
export const ManagedProcessModeSchema: TUnion<
  (
    | TLiteral<"direct">
    | TLiteral<"detached">
    | TLiteral<"service">
    | TLiteral<"kind">
    | TLiteral<"launcher">
    | TLiteral<"port-forward">
    | TLiteral<"rpc">
    | TLiteral<"none">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("direct"),
    TypeExports.Literal("detached"),
    TypeExports.Literal("service"),
    TypeExports.Literal("kind"),
    TypeExports.Literal("launcher"),
    TypeExports.Literal("port-forward"),
    TypeExports.Literal("rpc"),
    TypeExports.Literal("none"),
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
export const ManagedProcessStartupStateSchema: TUnion<
  (
    | TLiteral<"starting">
    | TLiteral<"ready">
    | TLiteral<"stopping">
    | TLiteral<"stopped">
    | TLiteral<"failed">
    | TLiteral<"unknown">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("starting"),
    TypeExports.Literal("ready"),
    TypeExports.Literal("stopping"),
    TypeExports.Literal("stopped"),
    TypeExports.Literal("failed"),
    TypeExports.Literal("unknown"),
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
export const ManagedProcessRestartPolicySchema: TUnion<
  (TLiteral<"never"> | TLiteral<"manual"> | TLiteral<"on-failure"> | TLiteral<"always">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("never"),
    TypeExports.Literal("manual"),
    TypeExports.Literal("on-failure"),
    TypeExports.Literal("always"),
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
export const ManagedProcessObservedUsageSchema = TypeExports.Object(
  {
    sampledAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    sampleSource: TypeExports.Union(
      [
        TypeExports.Literal("live"),
        TypeExports.Literal("ps"),
        TypeExports.Literal("hybrid"),
        TypeExports.Literal("none"),
      ],
      {},
    ),
    stale: TypeExports.Boolean(),
    cpuPercent: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    memoryPercent: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    residentSetKb: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
    maxResidentSetBytes: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    cpuTimeUserMicros: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
    cpuTimeSystemMicros: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    cpuTimeTotalMicros: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
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
export const ManagedProcessRegistryEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.String({ minLength: 1 }),
    purpose: TypeExports.String({ minLength: 1 }),
    command: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    cwd: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    pid: TypeExports.Union([TypeExports.Integer({ minimum: 1 }), TypeExports.Null()]),
    state: ManagedProcessStateSchema,
    mode: ManagedProcessModeSchema,
    startupState: ManagedProcessStartupStateSchema,
    startedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    lastSeenAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    lastRestartAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    exitCode: TypeExports.Union([TypeExports.Integer(), TypeExports.Null()]),
    signalCode: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    restartCount: TypeExports.Integer({ minimum: 0 }),
    restartPolicy: ManagedProcessRestartPolicySchema,
    restartRequired: TypeExports.Boolean(),
    lastError: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    details: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    resourceUsage: TypeExports.Union([ManagedProcessObservedUsageSchema, TypeExports.Null()]),
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
export const ManagedProcessRegistrySnapshotSchema = TypeExports.Object(
  {
    version: TypeExports.Literal(1),
    updatedAt: TypeExports.String({ format: "date-time" }),
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
export const ResourceObservedProcessSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.String({ minLength: 1 }),
    purpose: TypeExports.String({ minLength: 1 }),
    pid: TypeExports.Union([TypeExports.Integer({ minimum: 1 }), TypeExports.Null()]),
    state: ManagedProcessStateSchema,
    sampleSource: TypeExports.Union(
      [
        TypeExports.Literal("live"),
        TypeExports.Literal("ps"),
        TypeExports.Literal("hybrid"),
        TypeExports.Literal("none"),
      ],
      {},
    ),
    stale: TypeExports.Boolean(),
    restartCount: TypeExports.Integer({ minimum: 0 }),
    cpuPercent: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    memoryPercent: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    residentSetKb: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
    maxResidentSetBytes: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    cpuTimeUserMicros: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
    cpuTimeSystemMicros: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    cpuTimeTotalMicros: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    requestedCpu: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    requestedMemory: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    requestedToObservedCpuRatio: TypeExports.Union([
      TypeExports.Number({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    requestedToObservedMemoryRatio: TypeExports.Union([
      TypeExports.Number({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    oomKilled: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    throttled: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
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
export const ResourceObservedSummarySchema = TypeExports.Object(
  {
    source: TypeExports.Literal("managed-process-registry"),
    sampledAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    stale: TypeExports.Boolean(),
    activeProcessCount: TypeExports.Integer({ minimum: 0 }),
    degradedProcessCount: TypeExports.Integer({ minimum: 0 }),
    restartCount: TypeExports.Integer({ minimum: 0 }),
    oomKilledCount: TypeExports.Integer({ minimum: 0 }),
    throttledProcessCount: TypeExports.Integer({ minimum: 0 }),
    totalCpuPercent: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    totalMemoryPercent: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    totalResidentSetKb: TypeExports.Union([
      TypeExports.Integer({ minimum: 0 }),
      TypeExports.Null(),
    ]),
    processes: TypeExports.Array(ResourceObservedProcessSchema),
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
export const ProcessStatusSummarySchema = TypeExports.Object(
  {
    owner: TypeExports.Literal("bao-runtime"),
    managed: TypeExports.Boolean(),
    startupState: ManagedProcessStartupStateSchema,
    activeCount: TypeExports.Integer({ minimum: 0 }),
    degradedCount: TypeExports.Integer({ minimum: 0 }),
    restartRequired: TypeExports.Boolean(),
    lastRestartAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    processes: TypeExports.Array(ManagedProcessSummarySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link ProcessStatusSummarySchema}.
 */
export type ProcessStatusSummary = Static<typeof ProcessStatusSummarySchema>;
