import { stringEnum } from "../schemas/baobox-enum";

/**
 * Canonical providers for env-driven bao-control-plane-local behavior.
 */
export const BAO_CONTROL_PLANE_LOCAL_CANONICAL_PROVIDERS: readonly ["k0", "k3", "k8"] = [
  "k0",
  "k3",
  "k8",
] as const;

/**
 * Canonical providers used in env config and schema validation.
 */
export const BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDERS: readonly ["k0", "k3", "k8"] =
  BAO_CONTROL_PLANE_LOCAL_CANONICAL_PROVIDERS;

/**
 * Canonical provider inputs accepted by env and API surfaces.
 */
export const BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDER_INPUTS: readonly ["k0", "k3", "k8"] = [
  ...BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDERS,
] as const;

/**
 * Runtime provider inputs accepted by CLI flows.
 */
export const BAO_CONTROL_PLANE_LOCAL_CLUSTER_RUNTIME_PROVIDER_INPUTS: readonly ["k0", "k3", "k8"] =
  BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDER_INPUTS;

/**
 * Provider tokens that request default auto-detection instead of explicit provider selection.
 */
export const BAO_CONTROL_PLANE_LOCAL_CLUSTER_AUTO_PROVIDER_TOKENS: readonly [
  "auto",
  "default",
  "local",
  "dev",
] = ["auto", "default", "local", "dev"] as const;

/**
 * Canonical provider type.
 */
export type BaoControlPlaneLocalClusterProvider =
  (typeof BAO_CONTROL_PLANE_LOCAL_CANONICAL_PROVIDERS)[number];

/**
 * Canonical env input token type.
 */
export type BaoControlPlaneLocalClusterProviderInput = BaoControlPlaneLocalClusterProvider;

/**
 * Runtime provider token type.
 */
export type BaoControlPlaneLocalClusterRuntimeProviderInput =
  (typeof BAO_CONTROL_PLANE_LOCAL_CLUSTER_RUNTIME_PROVIDER_INPUTS)[number];

/**
 * Provider token aliases that indicate auto-detection behavior.
 */
export type BaoControlPlaneLocalClusterAutoProviderToken =
  (typeof BAO_CONTROL_PLANE_LOCAL_CLUSTER_AUTO_PROVIDER_TOKENS)[number];

/**
 * Host-platform constraints for canonical providers.
 *
 * `null` means the provider is host-platform agnostic.
 */
export const BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDER_PLATFORM_CONSTRAINTS: {
  readonly k0: readonly ["linux"];
  readonly k3: readonly ["linux"];
  readonly k8: null;
} = {
  k0: ["linux"],
  k3: ["linux"],
  k8: null,
} as const satisfies Record<BaoControlPlaneLocalClusterProvider, readonly string[] | null>;

/**
 * Whether a provider token is one of the canonical env providers.
 */
export function isCanonicalBaoControlPlaneLocalProvider(
  value: string | undefined,
): value is BaoControlPlaneLocalClusterProvider {
  return value === "k0" || value === "k3" || value === "k8";
}

/**
 * Whether a provider token is accepted by runtime CLI parsing.
 */
export function isRuntimeBaoControlPlaneLocalProvider(
  value: string | undefined,
): value is BaoControlPlaneLocalClusterRuntimeProviderInput {
  return isCanonicalBaoControlPlaneLocalProvider(value);
}

/**
 * Whether a provider token indicates auto-detection mode.
 */
export function isBaoControlPlaneLocalClusterAutoProviderToken(
  value: string | null | undefined,
): value is BaoControlPlaneLocalClusterAutoProviderToken {
  const normalized = normalizeOptionalString(value);
  return (
    normalized === "auto" ||
    normalized === "default" ||
    normalized === "local" ||
    normalized === "dev"
  );
}

/**
 * Resolve the default canonical local provider for the current host platform.
 */
export function resolveDefaultBaoControlPlaneLocalClusterProvider(
  platform: string = process.platform,
): BaoControlPlaneLocalClusterProvider {
  return platform === "linux" ? "k3" : "k8";
}

/**
 * Whether a canonical provider is supported on the requested host platform.
 */
export function isBaoControlPlaneLocalClusterProviderSupportedOnPlatform(
  provider: BaoControlPlaneLocalClusterProvider,
  platform: string = process.platform,
): boolean {
  const constraints = BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDER_PLATFORM_CONSTRAINTS[provider];
  if (constraints === null) {
    return true;
  }
  const normalizedPlatform = normalizeOptionalString(platform);
  if (!normalizedPlatform) {
    return false;
  }
  return constraints.some((supportedPlatform) => supportedPlatform === normalizedPlatform);
}

/**
 * Resolve canonical providers supported on the requested host platform.
 */
export function resolveBaoControlPlaneLocalClusterSupportedProvidersForPlatform(
  platform: string = process.platform,
): BaoControlPlaneLocalClusterProvider[] {
  return BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDER_INPUTS.filter((provider) =>
    isBaoControlPlaneLocalClusterProviderSupportedOnPlatform(provider, platform),
  );
}

/**
 * Resolve a deterministic unsupported-provider host error message.
 */
export function resolveBaoControlPlaneLocalClusterUnsupportedPlatformMessage(
  provider: BaoControlPlaneLocalClusterProvider,
  platform: string = process.platform,
): string | null {
  if (isBaoControlPlaneLocalClusterProviderSupportedOnPlatform(provider, platform)) {
    return null;
  }
  const normalizedPlatform = normalizeOptionalString(platform) ?? platform;
  const supportedProviders =
    resolveBaoControlPlaneLocalClusterSupportedProvidersForPlatform(normalizedPlatform);
  return (
    `provider=${provider} is not supported on platform=${normalizedPlatform}. ` +
    `Supported providers on this host: ${supportedProviders.join(", ")}.`
  );
}

/**
 * Normalize provider input to canonical provider values.
 */
export function normalizeBaoControlPlaneLocalClusterProvider(
  value: string | null | undefined,
  defaultValue: BaoControlPlaneLocalClusterProvider = "k8",
): BaoControlPlaneLocalClusterProvider {
  const normalized = parseBaoControlPlaneLocalClusterProviderInput(value);
  return normalized ?? defaultValue;
}

/**
 * Parse raw input as canonical provider when the token is already canonical.
 */
export function parseBaoControlPlaneLocalClusterProvider(
  value: string | null | undefined,
): BaoControlPlaneLocalClusterProvider | null {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    return null;
  }
  if (isBaoControlPlaneLocalClusterAutoProviderToken(normalized)) {
    return null;
  }
  if (isCanonicalBaoControlPlaneLocalProvider(normalized)) {
    return normalized;
  }
  return null;
}

/**
 * Parse raw input as canonical provider while preserving canonical parser contract.
 */
export function parseBaoControlPlaneLocalClusterProviderInput(
  value: string | null | undefined,
): BaoControlPlaneLocalClusterProvider | null {
  return parseBaoControlPlaneLocalClusterProvider(value);
}

/**
 * Parse raw input as canonical runtime provider token.
 */
export function parseBaoControlPlaneLocalClusterRuntimeProviderInput(
  value: string | null | undefined,
): BaoControlPlaneLocalClusterRuntimeProviderInput | null {
  return parseBaoControlPlaneLocalClusterProvider(value);
}

/**
 * Predicate for providers owned by the BaoControlPlane local-cluster bootstrap path.
 *
 * All canonical providers (`k0`, `k3`, `k8`) resolve through the same
 * setup/launcher ownership contract even when `k8` reuses a reachable kube
 * context instead of provisioning a Linux-on-host runtime directly.
 */
export function shouldBootstrapBaoControlPlaneLocalClusterProvider(
  value: BaoControlPlaneLocalClusterProvider | null | undefined,
): boolean {
  return value === "k0" || value === "k3" || value === "k8";
}

/**
 * Whether a canonical provider requires non-interactive sudo for host-owned bootstrap flows.
 */
export function requiresNonInteractiveSudoForBaoControlPlaneLocalClusterProvider(
  value: BaoControlPlaneLocalClusterProvider | null | undefined,
): value is Extract<BaoControlPlaneLocalClusterProvider, "k0" | "k3"> {
  return value === "k0" || value === "k3";
}

/**
 * Runtime schema for canonical env-driven provider inputs.
 * TypeBox schema for Elysia/Eden alignment; use Check for runtime validation.
 */
export const BaoControlPlaneLocalClusterProviderSchema: ReturnType<typeof stringEnum> = stringEnum(
  BAO_CONTROL_PLANE_LOCAL_CLUSTER_PROVIDER_INPUTS,
);

/**
 * Runtime schema for canonical runtime provider inputs.
 */
export const BaoRuntimeLocalClusterProviderSchema: ReturnType<typeof stringEnum> = stringEnum(
  BAO_CONTROL_PLANE_LOCAL_CLUSTER_RUNTIME_PROVIDER_INPUTS,
);

/**
 * Canonical env/schema type for local provider.
 */
export const BaoControlPlaneCanonicalLocalClusterProviderSchema: ReturnType<typeof stringEnum> =
  stringEnum(BAO_CONTROL_PLANE_LOCAL_CANONICAL_PROVIDERS);

function normalizeOptionalString(value: string | null | undefined): string | null {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();
  return normalized.length ? normalized : null;
}
