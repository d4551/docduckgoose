/**
 * Bao runtime workload deployment schemas.
 *
 * Owns the typed deployment/install metadata derived from checked-in BunBuddy
 * `.bao` manifests so platform, tenancy, resource, and cleanup policy do not
 * drift across tooling surfaces.
 *
 * @shared/schemas/bao-runtime-workload
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value/check";
import { stringEnum } from "./baobox-enum.ts";
import { BUNBUDDY_KINDS } from "./bunbuddy.schemas.ts";
import { BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS } from "./bunbuddy-contracts.schemas.ts";

const BAO_RUNTIME_WORKLOAD_BUNBUDDY_KINDS = ["dimsum", ...BUNBUDDY_KINDS] as const;
const BAO_RUNTIME_WORKLOAD_RUNTIME_ENGINES = ["bun", "python"] as const;
const BAO_RUNTIME_WORKLOAD_EXECUTION_MODES = ["in-cluster", "host-runtime", "hybrid"] as const;
const BAO_RUNTIME_WORKLOAD_HOST_PLATFORMS = ["linux", "darwin", "win32"] as const;
const BAO_RUNTIME_WORKLOAD_HOST_ARCHITECTURES = ["x64", "arm64"] as const;
const BAO_RUNTIME_WORKLOAD_IMAGE_PLATFORMS = ["linux/amd64", "linux/arm64"] as const;
const BAO_RUNTIME_WORKLOAD_TENANCY_MODES = ["tenant-release"] as const;
const BAO_RUNTIME_WORKLOAD_SANDBOX_TIERS = ["B0", "B1", "B2", "B3", "Bw"] as const;
const BAO_RUNTIME_WORKLOAD_NETWORK_EXPOSURES = [
  "cluster-internal",
  "cluster-public",
  "host-only",
] as const;
const BAO_RUNTIME_WORKLOAD_CLEANUP_SCOPES = ["tenant-release", "shared-control-plane"] as const;

/**
 * Supported deployment descriptor BunBuddy kinds.
 */
export type BaoRuntimeWorkloadBunBuddyKind = (typeof BAO_RUNTIME_WORKLOAD_BUNBUDDY_KINDS)[number];

/**
 * Supported runtime engine tokens for workload commands.
 */
export type BaoRuntimeWorkloadRuntimeEngine = (typeof BAO_RUNTIME_WORKLOAD_RUNTIME_ENGINES)[number];

/**
 * Supported execution modes for Bao runtime workloads.
 */
export type BaoRuntimeWorkloadExecutionMode = (typeof BAO_RUNTIME_WORKLOAD_EXECUTION_MODES)[number];

/**
 * Supported host platforms for BunBuddy workloads.
 */
export type BaoRuntimeWorkloadHostPlatform = (typeof BAO_RUNTIME_WORKLOAD_HOST_PLATFORMS)[number];

/**
 * Supported host CPU architectures for BunBuddy workloads.
 */
export type BaoRuntimeWorkloadHostArchitecture =
  (typeof BAO_RUNTIME_WORKLOAD_HOST_ARCHITECTURES)[number];

/**
 * Supported OCI image platforms for BunBuddy workloads.
 */
export type BaoRuntimeWorkloadImagePlatform = (typeof BAO_RUNTIME_WORKLOAD_IMAGE_PLATFORMS)[number];

/**
 * Supported namespace tenancy modes for BunBuddy workloads.
 */
export type BaoRuntimeWorkloadTenancyMode = (typeof BAO_RUNTIME_WORKLOAD_TENANCY_MODES)[number];

/**
 * Supported sandbox tiers for BunBuddy runtime isolation policy.
 */
export type BaoRuntimeWorkloadSandboxTier = (typeof BAO_RUNTIME_WORKLOAD_SANDBOX_TIERS)[number];

/**
 * Supported exposure modes for BunBuddy workloads.
 */
export type BaoRuntimeWorkloadNetworkExposure =
  (typeof BAO_RUNTIME_WORKLOAD_NETWORK_EXPOSURES)[number];

/**
 * Supported cleanup scopes for owned workload resources.
 */
export type BaoRuntimeWorkloadCleanupScope = (typeof BAO_RUNTIME_WORKLOAD_CLEANUP_SCOPES)[number];

/**
 * Canonical workload platform target payload returned to BunBuddy runtime APIs.
 */
export const BaoRuntimeBunBuddyPlatformTargetsSchema: TObject<
  {
    readonly baoRuntime: TLiteral<true>;
    readonly kubernetesDistributions: TArray<
      TUnion<[TLiteral<"k0" | "k3" | "k8">, ...TLiteral<"k0" | "k3" | "k8">[]]>
    >;
  },
  "baoRuntime" | "kubernetesDistributions",
  never
> = TypeExports.Object(
  {
    baoRuntime: TypeExports.Literal(true),
    kubernetesDistributions: TypeExports.Array(
      stringEnum(BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS, {}),
      { minItems: 1 },
    ),
  },
  { additionalProperties: false },
);

/**
 * Canonical workload platform target type.
 */
export type BaoRuntimeBunBuddyPlatformTargets = Static<
  typeof BaoRuntimeBunBuddyPlatformTargetsSchema
>;

/**
 * Canonical runtime command descriptor for BunBuddy workloads.
 */
export const BaoRuntimeWorkloadCommandSchema: TObject<
  {
    readonly runtime: TUnion<[TLiteral<"bun" | "python">, ...TLiteral<"bun" | "python">[]]>;
    readonly args: TArray<TString>;
  },
  "runtime" | "args",
  never
> = TypeExports.Object(
  {
    runtime: stringEnum(BAO_RUNTIME_WORKLOAD_RUNTIME_ENGINES, {}),
    args: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Runtime command descriptor type.
 */
export type BaoRuntimeWorkloadCommand = Static<typeof BaoRuntimeWorkloadCommandSchema>;

/**
 * Canonical resource values for requests and limits.
 */
export const BaoRuntimeWorkloadResourceValuesSchema: TObject<
  {
    readonly cpu: TString;
    readonly memory: TString;
    readonly ephemeralStorage: TOptional<TString>;
  },
  "cpu" | "memory",
  "ephemeralStorage"
> = TypeExports.Object(
  {
    cpu: TypeExports.String({ minLength: 1 }),
    memory: TypeExports.String({ minLength: 1 }),
    ephemeralStorage: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Persistent storage contract for workload PVC requests.
 */
export const BaoRuntimeWorkloadPersistentVolumeSchema: TObject<
  {
    readonly name: TString;
    readonly mountPath: TString;
    readonly size: TString;
    readonly storageClassName: TOptional<TString>;
    readonly accessModes: TOptional<TArray<TString>>;
  },
  "name" | "mountPath" | "size",
  InferOptionalKeys<{
    readonly name: TString;
    readonly mountPath: TString;
    readonly size: TString;
    readonly storageClassName: TOptional<TString>;
    readonly accessModes: TOptional<TArray<TString>>;
  }>
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    mountPath: TypeExports.String({ minLength: 1 }),
    size: TypeExports.String({ minLength: 1 }),
    storageClassName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    accessModes: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Optional GPU contract for accelerator workloads.
 */
export const BaoRuntimeWorkloadGpuSchema: TObject<
  { readonly resourceKey: TString; readonly count: TInteger },
  "resourceKey" | "count",
  never
> = TypeExports.Object(
  {
    resourceKey: TypeExports.String({ minLength: 1 }),
    count: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Canonical resource policy block for a workload target.
 */
export const BaoRuntimeWorkloadResourcesSchema = TypeExports.Object(
  {
    requests: BaoRuntimeWorkloadResourceValuesSchema,
    limits: BaoRuntimeWorkloadResourceValuesSchema,
    persistentVolumes: TypeExports.Optional(
      TypeExports.Array(BaoRuntimeWorkloadPersistentVolumeSchema, { minItems: 1 }),
    ),
    gpu: TypeExports.Optional(BaoRuntimeWorkloadGpuSchema),
    deviceClaims: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Canonical scheduling policy for a BunBuddy workload.
 */
export const BaoRuntimeWorkloadSchedulingSchema = TypeExports.Object(
  {
    nodeSelector: TypeExports.Optional(
      TypeExports.Record(
        TypeExports.String({ minLength: 1 }),
        TypeExports.String({ minLength: 1 }),
      ),
    ),
    tolerations: TypeExports.Optional(
      TypeExports.Array(
        TypeExports.Object(
          {
            key: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
            operator: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
            value: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
            effect: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          },
          { additionalProperties: false },
        ),
      ),
    ),
    affinity: TypeExports.Optional(
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.Unknown()),
    ),
    privileged: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Canonical network policy hints for a BunBuddy workload.
 */
export const BaoRuntimeWorkloadNetworkSchema: TObject<
  {
    readonly exposure: TUnion<
      [
        TLiteral<"cluster-internal" | "cluster-public" | "host-only">,
        ...TLiteral<"cluster-internal" | "cluster-public" | "host-only">[],
      ]
    >;
    readonly servicePort: TOptional<TInteger>;
    readonly containerPort: TOptional<TInteger>;
  },
  "exposure",
  InferOptionalKeys<{
    readonly exposure: TUnion<
      [
        TLiteral<"cluster-internal" | "cluster-public" | "host-only">,
        ...TLiteral<"cluster-internal" | "cluster-public" | "host-only">[],
      ]
    >;
    readonly servicePort: TOptional<TInteger>;
    readonly containerPort: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    exposure: stringEnum(BAO_RUNTIME_WORKLOAD_NETWORK_EXPOSURES, {}),
    servicePort: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
    containerPort: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
  },
  { additionalProperties: false },
);

/**
 * Canonical tenant label-key ownership block.
 */
export const BaoRuntimeTenantLabelKeysSchema: TObject<
  {
    readonly tenant: TString;
    readonly environment: TString;
    readonly release: TString;
    readonly component: TString;
    readonly bunbuddyKind: TString;
  },
  "tenant" | "environment" | "release" | "component" | "bunbuddyKind",
  never
> = TypeExports.Object(
  {
    tenant: TypeExports.String({ minLength: 1 }),
    environment: TypeExports.String({ minLength: 1 }),
    release: TypeExports.String({ minLength: 1 }),
    component: TypeExports.String({ minLength: 1 }),
    bunbuddyKind: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Canonical tenant release contract derived from workload metadata.
 */
export const BaoRuntimeTenantReleaseDescriptorSchema: TObject<
  {
    readonly isolationMode: TUnion<[TLiteral<"tenant-release">, ...TLiteral<"tenant-release">[]]>;
    readonly namespaceTemplate: TString;
    readonly releaseNameTemplate: TString;
    readonly sharedControlPlane: TBoolean;
    readonly labelKeys: TObject<
      {
        readonly tenant: TString;
        readonly environment: TString;
        readonly release: TString;
        readonly component: TString;
        readonly bunbuddyKind: TString;
      },
      "tenant" | "environment" | "release" | "component" | "bunbuddyKind",
      never
    >;
  },
  | "isolationMode"
  | "namespaceTemplate"
  | "releaseNameTemplate"
  | "sharedControlPlane"
  | "labelKeys",
  never
> = TypeExports.Object(
  {
    isolationMode: stringEnum(BAO_RUNTIME_WORKLOAD_TENANCY_MODES, {}),
    namespaceTemplate: TypeExports.String({ minLength: 1 }),
    releaseNameTemplate: TypeExports.String({ minLength: 1 }),
    sharedControlPlane: TypeExports.Boolean(),
    labelKeys: BaoRuntimeTenantLabelKeysSchema,
  },
  { additionalProperties: false },
);

/**
 * Canonical owned resource descriptor used for cleanup and validation.
 */
export const BaoRuntimeOwnedResourceDescriptorSchema: TObject<
  {
    readonly kind: TString;
    readonly namespaceScoped: TBoolean;
    readonly component: TString;
    readonly cleanupScope: TUnion<
      [
        TLiteral<"tenant-release" | "shared-control-plane">,
        ...TLiteral<"tenant-release" | "shared-control-plane">[],
      ]
    >;
  },
  "cleanupScope" | "kind" | "namespaceScoped" | "component",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.String({ minLength: 1 }),
    namespaceScoped: TypeExports.Boolean(),
    component: TypeExports.String({ minLength: 1 }),
    cleanupScope: stringEnum(BAO_RUNTIME_WORKLOAD_CLEANUP_SCOPES, {}),
  },
  { additionalProperties: false },
);

/**
 * Canonical `.bao` workload target.
 */
export const BaoRuntimeWorkloadTargetSchema = TypeExports.Object(
  {
    kind: TypeExports.Literal("bao-runtime-workload"),
    target: TypeExports.String({ minLength: 1 }),
    bunbuddyKind: stringEnum(BAO_RUNTIME_WORKLOAD_BUNBUDDY_KINDS, {}),
    component: TypeExports.String({ minLength: 1 }),
    executionMode: stringEnum(BAO_RUNTIME_WORKLOAD_EXECUTION_MODES, {}),
    runtime: TypeExports.Object(
      {
        dev: BaoRuntimeWorkloadCommandSchema,
        start: BaoRuntimeWorkloadCommandSchema,
      },
      { additionalProperties: false },
    ),
    providers: TypeExports.Array(stringEnum(BUNBUDDY_CONTRACT_KUBERNETES_DISTRIBUTIONS, {}), {
      minItems: 1,
    }),
    hostPlatforms: TypeExports.Array(stringEnum(BAO_RUNTIME_WORKLOAD_HOST_PLATFORMS, {}), {
      minItems: 1,
    }),
    hostArchitectures: TypeExports.Array(stringEnum(BAO_RUNTIME_WORKLOAD_HOST_ARCHITECTURES, {}), {
      minItems: 1,
    }),
    imagePlatforms: TypeExports.Array(stringEnum(BAO_RUNTIME_WORKLOAD_IMAGE_PLATFORMS, {}), {
      minItems: 1,
    }),
    tenancy: BaoRuntimeTenantReleaseDescriptorSchema,
    resources: BaoRuntimeWorkloadResourcesSchema,
    scheduling: BaoRuntimeWorkloadSchedulingSchema,
    network: BaoRuntimeWorkloadNetworkSchema,
    cleanup: TypeExports.Object(
      {
        scope: stringEnum(BAO_RUNTIME_WORKLOAD_CLEANUP_SCOPES, {}),
      },
      { additionalProperties: false },
    ),
    notes: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Canonical `.bao` workload target type.
 */
export type BaoRuntimeWorkloadTarget = Static<typeof BaoRuntimeWorkloadTargetSchema>;

/**
 * Determine whether a runtime value satisfies the canonical Bao runtime workload target shape.
 *
 * @param value - Runtime candidate to validate.
 * @returns True when the value conforms to {@link BaoRuntimeWorkloadTargetSchema}.
 */
export function isBaoRuntimeWorkloadTarget(value: unknown): value is BaoRuntimeWorkloadTarget {
  return Check(BaoRuntimeWorkloadTargetSchema, value);
}

/**
 * Canonical derived BunBuddy deployment descriptor.
 */
export const BunBuddyDeploymentDescriptorSchema = TypeExports.Object(
  {
    kind: stringEnum(BAO_RUNTIME_WORKLOAD_BUNBUDDY_KINDS, {}),
    moduleId: TypeExports.String({ minLength: 1 }),
    serviceName: TypeExports.String({ minLength: 1 }),
    directory: TypeExports.String({ minLength: 1 }),
    manifestPath: TypeExports.String({ minLength: 1 }),
    contractPath: TypeExports.String({ minLength: 1 }),
    buildContext: TypeExports.String({ minLength: 1 }),
    containerfile: TypeExports.String({ minLength: 1 }),
    ociImage: TypeExports.String({ minLength: 1 }),
    ociTarget: TypeExports.String({ minLength: 1 }),
    sandboxTier: stringEnum(BAO_RUNTIME_WORKLOAD_SANDBOX_TIERS, {}),
    workload: BaoRuntimeWorkloadTargetSchema,
    platformTargets: BaoRuntimeBunBuddyPlatformTargetsSchema,
    tenantRelease: BaoRuntimeTenantReleaseDescriptorSchema,
    ownedResources: TypeExports.Array(BaoRuntimeOwnedResourceDescriptorSchema, { minItems: 1 }),
    notes: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Canonical derived BunBuddy deployment descriptor type.
 */
export type BunBuddyDeploymentDescriptor = Static<typeof BunBuddyDeploymentDescriptorSchema>;

/**
 * Canonical checked-in BunBuddy workload registry.
 */
export const BunBuddyDeploymentRegistrySchema = TypeExports.Object(
  {
    version: TypeExports.String({ minLength: 1 }),
    bunbuddies: TypeExports.Record(
      stringEnum(BAO_RUNTIME_WORKLOAD_BUNBUDDY_KINDS, {}),
      BunBuddyDeploymentDescriptorSchema,
    ),
  },
  { additionalProperties: false },
);

/**
 * Canonical checked-in BunBuddy workload registry type.
 */
export type BunBuddyDeploymentRegistry = Static<typeof BunBuddyDeploymentRegistrySchema>;

/**
 * Determine whether a runtime value satisfies the canonical BunBuddy workload registry shape.
 *
 * @param value - Runtime candidate to validate.
 * @returns True when the value conforms to {@link BunBuddyDeploymentRegistrySchema}.
 */
export function isBunBuddyDeploymentRegistry(value: unknown): value is BunBuddyDeploymentRegistry {
  return Check(BunBuddyDeploymentRegistrySchema, value);
}
