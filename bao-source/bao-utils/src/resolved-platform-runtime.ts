import { getRuntimeEnv } from "@baohaus/bao-config/env";
import { parseStrictBoolean } from "@baohaus/bao-config/env-boolean";
import { DEFAULT_BAO_CONTROL_PLANE_IMAGE_PLATFORMS } from "@baohaus/bao-constants/bao-control-plane-defaults";
import {
  type BaoControlPlaneLocalClusterProvider,
  isBaoControlPlaneLocalClusterAutoProviderToken,
  parseBaoControlPlaneLocalClusterProviderInput,
  resolveDefaultBaoControlPlaneLocalClusterProvider,
} from "./bao-control-plane-local-cluster-provider";
import {
  type BaoControlPlaneContainerPlatform,
  type BaoControlPlaneCpuArchitecture,
  resolveBaoControlPlaneBuildPlatforms,
  resolveBaoControlPlaneHostArchitecture,
  resolveBaoControlPlaneSingleArchitectureFromPlatforms,
  toBaoControlPlaneLinuxPlatform,
} from "./bao-control-plane-platform";

/**
 * Machine-readable BaoControlPlane bootstrap mode.
 */
export const BAO_CONTROL_PLANE_BOOTSTRAP_MODES: readonly [
  "attached",
  "bootstrap-kind",
  "bootstrap-direct",
] = ["attached", "bootstrap-kind", "bootstrap-direct"] as const;

/**
 * BaoControlPlane bootstrap mode.
 */
export type BaoControlPlaneBootstrapMode = (typeof BAO_CONTROL_PLANE_BOOTSTRAP_MODES)[number];

/**
 * Canonical requested-provider token.
 *
 * `auto` preserves intent when the user asked for default resolution.
 */
export type RequestedBaoControlPlaneProvider = BaoControlPlaneLocalClusterProvider | "auto";

/**
 * Privileged BaoControlPlane host runtime owner status.
 */
export type BaoControlPlanePrivilegedOwnerStatus = "available" | "unavailable" | "version-mismatch";

/**
 * Canonical BaoControlPlane container build profiles.
 */
export const BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILES: readonly [
  "ci",
  "lean",
  "standard",
  "dev",
] = ["ci", "lean", "standard", "dev"] as const;

/**
 * Canonical BaoControlPlane container build profile.
 */
export type BaoControlPlaneContainerBuildProfile =
  (typeof BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILES)[number];

/**
 * Default BaoControlPlane container build profile.
 */
export const DEFAULT_BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILE: BaoControlPlaneContainerBuildProfile =
  "standard";

/**
 * Shared build-optimization projection.
 */
export type BaoControlPlaneBuildOptimizations = Readonly<{
  bytecodeSupported: boolean;
  bytecodeEnabled: boolean;
}>;

/**
 * Canonical resolved platform runtime contract shared across setup, runtime,
 * routing, and operator status surfaces.
 */
export type ResolvedPlatformRuntime = Readonly<{
  requestedProvider: RequestedBaoControlPlaneProvider;
  resolvedProvider: BaoControlPlaneLocalClusterProvider;
  bootstrapMode: BaoControlPlaneBootstrapMode;
  distribution: BaoControlPlaneLocalClusterProvider;
  hostPlatform: string;
  hostArch: BaoControlPlaneCpuArchitecture | null;
  buildPlatforms: readonly BaoControlPlaneContainerPlatform[];
  targetArch: BaoControlPlaneCpuArchitecture | null;
  containerBuildProfile: BaoControlPlaneContainerBuildProfile;
  localDevImages: boolean;
  registryCacheEnabled: boolean;
  buildOptimizations: BaoControlPlaneBuildOptimizations;
  autoResolutionReason: string | null;
  privilegedOwnerStatus: BaoControlPlanePrivilegedOwnerStatus | null;
}>;
type ResolveBaoControlPlanePlatformRuntimeParams = {
  requestedProvider?: string | null;
  resolvedProvider?: BaoControlPlaneLocalClusterProvider | null;
  hostPlatform?: string | null;
  hostArch?: unknown;
  kubeContextReachable?: boolean | null;
  defaultBuildPlatforms?: string;
  env?: Record<string, string | undefined>;
  buildPlatforms?: readonly BaoControlPlaneContainerPlatform[] | null;
  preferHostBuildPlatformWhenUnset?: boolean;
  targetArch?: unknown;
  containerBuildProfile?: string | null;
  defaultContainerBuildProfile?: BaoControlPlaneContainerBuildProfile;
  localDevImages?: boolean | null;
  defaultLocalDevImages?: boolean;
  registryCacheEnabled?: boolean | null;
  defaultRegistryCacheEnabled?: boolean;
  watch?: boolean;
  nodeEnv?: string | null;
  autoResolutionReason?: string | null;
  privilegedOwnerStatus?: BaoControlPlanePrivilegedOwnerStatus | null;
};

/**
 * Normalize optional strings for case-insensitive runtime/env comparisons.
 *
 * @param value - Raw runtime value.
 * @returns Lower-cased non-empty string or null.
 */
function normalizeOptionalString(value: unknown): string | null {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();
  return normalized ? normalized : null;
}

/**
 * Parse an optional strict boolean runtime value.
 *
 * Only the canonical string tokens `true` and `false` are accepted. Any other
 * alias is treated as absent so the shared fallback chain remains deterministic.
 *
 * @param value - Raw runtime value.
 * @returns Parsed boolean or null when the value is unset/invalid.
 */
function parseOptionalStrictBoolean(value: unknown): boolean | null {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    return null;
  }
  if (normalized !== "true" && normalized !== "false") {
    return null;
  }
  return parseStrictBoolean(normalized, false);
}

function resolveBaoControlPlaneResolvedProvider(
  requestedProvider: RequestedBaoControlPlaneProvider,
  hostPlatform: string,
  resolvedProvider: BaoControlPlaneLocalClusterProvider | null | undefined,
): BaoControlPlaneLocalClusterProvider {
  return (
    resolvedProvider ??
    (requestedProvider === "auto"
      ? resolveDefaultBaoControlPlaneLocalClusterProvider(hostPlatform)
      : requestedProvider)
  );
}

function resolveBaoControlPlaneBuildPlatformSelection(params: {
  buildPlatforms?: readonly BaoControlPlaneContainerPlatform[] | null | undefined;
  preferHostBuildPlatformWhenUnset?: boolean | undefined;
  defaultBuildPlatforms?: string | undefined;
  env: Record<string, string | undefined>;
  hostArch: BaoControlPlaneCpuArchitecture | null;
}): readonly BaoControlPlaneContainerPlatform[] {
  if (params.buildPlatforms && params.buildPlatforms.length > 0) {
    return [...params.buildPlatforms];
  }
  if (
    params.preferHostBuildPlatformWhenUnset &&
    !normalizeOptionalString(params.env.BAO_CONTROL_PLANE_PLATFORMS) &&
    params.hostArch
  ) {
    return [toBaoControlPlaneLinuxPlatform(params.hostArch)];
  }
  return resolveBaoControlPlaneBuildPlatforms(
    params.defaultBuildPlatforms ?? DEFAULT_BAO_CONTROL_PLANE_IMAGE_PLATFORMS,
    params.env,
  );
}

function resolveBaoControlPlaneOptionalBoolean(
  value: boolean | null | undefined,
  envValue: string | undefined,
  defaultValue: boolean,
): boolean {
  return value ?? parseOptionalStrictBoolean(envValue) ?? defaultValue;
}

/**
 * Determine whether a normalized string is a canonical BaoControlPlane container build profile.
 *
 * @param value - Normalized profile token.
 * @returns True when the value is a supported build profile.
 */
function isBaoControlPlaneContainerBuildProfile(
  value: string,
): value is BaoControlPlaneContainerBuildProfile {
  return BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILES.some((profile) => profile === value);
}

/**
 * Parse a container build profile value into the canonical BaoControlPlane profile type.
 *
 * @param value - Raw profile token.
 * @returns Canonical build profile.
 */
export function parseBaoControlPlaneContainerBuildProfile(
  value: string,
): BaoControlPlaneContainerBuildProfile {
  const normalized = normalizeOptionalString(value);
  if (normalized && isBaoControlPlaneContainerBuildProfile(normalized)) {
    return normalized;
  }
  throw new Error(
    `Invalid BaoControlPlane container build profile "${value}". Expected one of: ${BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILES.join(
      ", ",
    )}.`,
  );
}

/**
 * Resolve a container build profile from explicit inputs, env, and defaults.
 *
 * @param params - Resolution inputs.
 * @returns Canonical build profile.
 */
export function resolveBaoControlPlaneContainerBuildProfile(params: {
  value?: string | null | undefined;
  env?: Record<string, string | undefined>;
  defaultValue?: BaoControlPlaneContainerBuildProfile | undefined;
}): BaoControlPlaneContainerBuildProfile {
  const explicitValue = normalizeOptionalString(params.value);
  if (explicitValue) {
    return parseBaoControlPlaneContainerBuildProfile(explicitValue);
  }

  const env = params.env ?? getRuntimeEnv();
  const envValue =
    normalizeOptionalString(env.BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILE) ??
    normalizeOptionalString(env.CONTAINER_BUILD_PROFILE) ??
    normalizeOptionalString(env.SETUP_WIZARD_AUTO_CONTAINER_BUILD_PROFILE);
  if (envValue) {
    return parseBaoControlPlaneContainerBuildProfile(envValue);
  }

  return params.defaultValue ?? DEFAULT_BAO_CONTROL_PLANE_CONTAINER_BUILD_PROFILE;
}

/**
 * Resolve the target architecture for BaoControlPlane runtime/build policy.
 *
 * @param params - Architecture inputs.
 * @returns Canonical target architecture.
 */
export function resolveBaoControlPlaneTargetArchitecture(params: {
  targetArch?: unknown;
  hostArch?: unknown;
  buildPlatforms?: readonly BaoControlPlaneContainerPlatform[] | null;
  env?: Record<string, string | undefined>;
}): BaoControlPlaneCpuArchitecture | null {
  const env = params.env ?? getRuntimeEnv();
  return (
    resolveBaoControlPlaneHostArchitecture(params.targetArch) ??
    resolveBaoControlPlaneHostArchitecture(env.BAO_CONTROL_PLANE_TARGET_ARCH) ??
    resolveBaoControlPlaneSingleArchitectureFromPlatforms(params.buildPlatforms ?? []) ??
    resolveBaoControlPlaneHostArchitecture(params.hostArch) ??
    resolveBaoControlPlaneHostArchitecture(env.BAO_CONTROL_PLANE_HOST_ARCH) ??
    null
  );
}

/**
 * Resolve BaoControlPlane bytecode optimization support and enablement.
 *
 * @param params - Runtime/build inputs.
 * @returns Bytecode support and effective enablement.
 */
export function resolveBaoControlPlaneBuildOptimizations(params: {
  hostPlatform: string;
  hostArch: BaoControlPlaneCpuArchitecture | null;
  containerBuildProfile: BaoControlPlaneContainerBuildProfile;
  watch?: boolean | undefined;
  nodeEnv?: string | null | undefined;
  env?: Record<string, string | undefined>;
}): BaoControlPlaneBuildOptimizations {
  const env = params.env ?? getRuntimeEnv();
  const bytecodeSupported = !(params.hostPlatform === "linux" && params.hostArch === "arm64");
  const bytecodeRequested = normalizeOptionalString(env.BUN_BUILD_BYTECODE) === "true";
  const developmentMode = normalizeOptionalString(params.nodeEnv ?? env.NODE_ENV) === "development";
  const bytecodeEnabled =
    bytecodeRequested &&
    bytecodeSupported &&
    !developmentMode &&
    !params.watch &&
    params.containerBuildProfile !== "lean" &&
    params.containerBuildProfile !== "ci";

  return {
    bytecodeSupported,
    bytecodeEnabled,
  };
}

/**
 * Resolve the requested provider token while preserving `auto`.
 *
 * @param value - Raw provider input.
 * @returns Canonical requested-provider token.
 */
export function resolveRequestedBaoControlPlaneProvider(
  value: string | null | undefined,
): RequestedBaoControlPlaneProvider {
  const parsed = parseBaoControlPlaneLocalClusterProviderInput(value);
  if (parsed) {
    return parsed;
  }
  return isBaoControlPlaneLocalClusterAutoProviderToken(value) ? "auto" : "auto";
}

/**
 * Resolve the bootstrap mode for a canonical provider.
 *
 * @param params - Bootstrap inputs.
 * @returns Machine-readable bootstrap mode.
 */
export function resolveBaoControlPlaneBootstrapMode(params: {
  requestedProvider: RequestedBaoControlPlaneProvider;
  resolvedProvider: BaoControlPlaneLocalClusterProvider;
  kubeContextReachable?: boolean | null | undefined;
}): BaoControlPlaneBootstrapMode {
  if (params.resolvedProvider !== "k8") {
    return "bootstrap-direct";
  }
  return params.kubeContextReachable ? "attached" : "bootstrap-direct";
}

/**
 * Resolve the canonical platform runtime snapshot.
 *
 * @param params - Platform-runtime resolution inputs.
 * @returns Canonical platform-runtime contract.
 */
export function resolveBaoControlPlanePlatformRuntime(
  params: ResolveBaoControlPlanePlatformRuntimeParams = {},
): ResolvedPlatformRuntime {
  const env = params.env ?? getRuntimeEnv();
  const requestedProvider = resolveRequestedBaoControlPlaneProvider(params.requestedProvider);
  const hostPlatform = normalizeHostPlatform(params.hostPlatform ?? process.platform);
  const hostArch = resolveBaoControlPlaneHostArchitecture(params.hostArch ?? process.arch);
  const resolvedProvider = resolveBaoControlPlaneResolvedProvider(
    requestedProvider,
    hostPlatform,
    params.resolvedProvider,
  );
  const buildPlatforms = resolveBaoControlPlaneBuildPlatformSelection({
    buildPlatforms: params.buildPlatforms,
    preferHostBuildPlatformWhenUnset: params.preferHostBuildPlatformWhenUnset,
    defaultBuildPlatforms: params.defaultBuildPlatforms,
    env,
    hostArch,
  });
  const targetArch = resolveBaoControlPlaneTargetArchitecture({
    targetArch: params.targetArch,
    hostArch,
    buildPlatforms,
    env,
  });
  const containerBuildProfile = resolveBaoControlPlaneContainerBuildProfile({
    value: params.containerBuildProfile ?? undefined,
    env,
    defaultValue: params.defaultContainerBuildProfile ?? undefined,
  });
  const localDevImages = resolveBaoControlPlaneOptionalBoolean(
    params.localDevImages,
    env.BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES,
    params.defaultLocalDevImages ?? false,
  );
  const registryCacheEnabled = resolveBaoControlPlaneOptionalBoolean(
    params.registryCacheEnabled,
    env.BAO_CONTROL_PLANE_IMAGE_REGISTRY_CACHE_ENABLED,
    params.defaultRegistryCacheEnabled ?? false,
  );
  const buildOptimizations = resolveBaoControlPlaneBuildOptimizations({
    hostPlatform,
    hostArch,
    containerBuildProfile,
    watch: params.watch,
    nodeEnv: params.nodeEnv ?? undefined,
    env,
  });

  return {
    requestedProvider,
    resolvedProvider,
    bootstrapMode: resolveBaoControlPlaneBootstrapMode({
      requestedProvider,
      resolvedProvider,
      kubeContextReachable: params.kubeContextReachable ?? undefined,
    }),
    distribution: resolvedProvider,
    hostPlatform,
    hostArch,
    buildPlatforms,
    targetArch,
    containerBuildProfile,
    localDevImages,
    registryCacheEnabled,
    buildOptimizations,
    autoResolutionReason: params.autoResolutionReason ?? null,
    privilegedOwnerStatus: params.privilegedOwnerStatus ?? null,
  };
}

/**
 * Normalize runtime host-platform values into Node-compatible platform tokens.
 *
 * @param value - Raw platform identifier.
 * @returns Normalized platform token.
 */
export function normalizeHostPlatform(value: string | null | undefined): string {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!normalized) {
    return process.platform;
  }
  if (normalized === "macos" || normalized === "mac" || normalized === "osx") {
    return "darwin";
  }
  if (normalized === "windows" || normalized === "win") {
    return "win32";
  }
  return normalized;
}
