/**
 * BaoControlPlane platform and architecture normalization helpers.
 *
 * Centralizes CPU architecture and OCI platform parsing so setup/config/build
 * scripts share deterministic behavior across host architectures.
 *
 * @baohaus/bao-utils/bao-control-plane-platform
 */

/**
 * Canonical CPU architectures supported for BaoControlPlane image workflows.
 */
export const BAO_CONTROL_PLANE_CPU_ARCHITECTURES: readonly ["amd64", "arm64"] = [
  "amd64",
  "arm64",
] as const;

/**
 * Canonical BaoControlPlane CPU architecture.
 */
export type BaoControlPlaneCpuArchitecture = (typeof BAO_CONTROL_PLANE_CPU_ARCHITECTURES)[number];

/**
 * Canonical container OS values used in OCI platform strings.
 */
export type BaoControlPlaneContainerOs = "linux" | "darwin" | "windows";

/**
 * Canonical OCI platform string.
 */
export type BaoControlPlaneContainerPlatform =
  `${BaoControlPlaneContainerOs}/${BaoControlPlaneCpuArchitecture}`;

/**
 * Parsed platform details.
 */
export type ParsedBaoControlPlanePlatform = {
  os: BaoControlPlaneContainerOs;
  architecture: BaoControlPlaneCpuArchitecture;
  value: BaoControlPlaneContainerPlatform;
};

const ARCH_ALIASES: Record<string, BaoControlPlaneCpuArchitecture> = {
  amd64: "amd64",
  x64: "amd64",
  x86_64: "amd64",
  arm64: "arm64",
  aarch64: "arm64",
};

const OS_ALIASES: Record<string, BaoControlPlaneContainerOs> = {
  linux: "linux",
  darwin: "darwin",
  macos: "darwin",
  mac: "darwin",
  osx: "darwin",
  windows: "windows",
  win32: "windows",
  win: "windows",
};

function normalizeOptionalString(value: unknown): string | null {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();
  return normalized ? normalized : null;
}

function normalizeContainerOs(value: unknown): BaoControlPlaneContainerOs | null {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    return null;
  }
  return OS_ALIASES[normalized] ?? null;
}

function parsePlatformTokens(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => String(entry ?? "").split(","))
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  const normalized = String(value ?? "").trim();
  if (!normalized) {
    return [];
  }
  return normalized
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/**
 * Normalize a CPU architecture identifier into BaoControlPlane canonical values.
 *
 * Accepted aliases include host-runtime tokens like `x64` and `aarch64`.
 *
 * @param value - Candidate architecture value.
 * @returns Canonical architecture or null when unsupported.
 */
export function normalizeBaoControlPlaneCpuArchitecture(
  value: unknown,
): BaoControlPlaneCpuArchitecture | null {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    return null;
  }
  return ARCH_ALIASES[normalized] ?? null;
}

/**
 * Parse a single OCI platform token into canonical OS/architecture fields.
 *
 * Examples:
 * - `linux/amd64`
 * - `linux/arm64`
 * - `linux/arm64/v8` (variant ignored for canonicalization)
 *
 * @param value - Raw platform token.
 * @returns Parsed platform details or null when invalid/unsupported.
 */
export function parseBaoControlPlanePlatform(value: unknown): ParsedBaoControlPlanePlatform | null {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    return null;
  }
  const segments = normalized.split("/");
  if (segments.length < 2) {
    return null;
  }

  const os = normalizeContainerOs(segments[0]);
  const architecture = normalizeBaoControlPlaneCpuArchitecture(segments[1]);
  if (!(os && architecture)) {
    return null;
  }

  const platform = `${os}/${architecture}` as BaoControlPlaneContainerPlatform;
  return {
    os,
    architecture,
    value: platform,
  };
}

/**
 * Normalize a platform list into canonical OCI platform entries.
 *
 * Unsupported entries are dropped and duplicates are removed while preserving order.
 *
 * @param value - CSV string or string array of platform entries.
 * @returns Canonical platform list.
 */
export function normalizeBaoControlPlanePlatformList(
  value: unknown,
): BaoControlPlaneContainerPlatform[] {
  const tokens = parsePlatformTokens(value);
  if (tokens.length === 0) {
    return [];
  }

  const platforms: BaoControlPlaneContainerPlatform[] = [];
  const seen = new Set<BaoControlPlaneContainerPlatform>();

  for (const token of tokens) {
    const parsed = parseBaoControlPlanePlatform(token);
    if (!parsed || seen.has(parsed.value)) {
      continue;
    }
    seen.add(parsed.value);
    platforms.push(parsed.value);
  }

  return platforms;
}

/**
 * Resolve a single architecture from a platform list.
 *
 * Returns null when the list is empty or includes mixed architectures.
 *
 * @param value - Platform list (CSV string or string array).
 * @returns Canonical architecture when unambiguous; otherwise null.
 */
export function resolveBaoControlPlaneSingleArchitectureFromPlatforms(
  value: unknown,
): BaoControlPlaneCpuArchitecture | null {
  const platforms = normalizeBaoControlPlanePlatformList(value);
  if (platforms.length === 0) {
    return null;
  }

  let resolved: BaoControlPlaneCpuArchitecture | null = null;
  for (const platform of platforms) {
    const architecture = normalizeBaoControlPlaneCpuArchitecture(platform.split("/")[1]);
    if (!architecture) {
      return null;
    }
    if (!resolved) {
      resolved = architecture;
      continue;
    }
    if (resolved !== architecture) {
      return null;
    }
  }

  return resolved;
}

/**
 * Normalize host runtime architecture into a canonical BaoControlPlane value.
 *
 * @param hostArch - Host architecture token (e.g. `process.arch`).
 * @returns Canonical architecture or null when unsupported.
 */
export function resolveBaoControlPlaneHostArchitecture(
  hostArch: unknown,
): BaoControlPlaneCpuArchitecture | null {
  return normalizeBaoControlPlaneCpuArchitecture(hostArch);
}

/**
 * Build a canonical Linux OCI platform string for a given architecture.
 *
 * @param architecture - Canonical architecture.
 * @returns Linux platform token.
 */
export function toBaoControlPlaneLinuxPlatform(
  architecture: BaoControlPlaneCpuArchitecture,
): BaoControlPlaneContainerPlatform {
  return `linux/${architecture}`;
}

/**
 * Resolve build platforms for BaoControlPlane image workflows.
 *
 * Precedence: BAO_CONTROL_PLANE_PLATFORMS (env) → defaultPlatforms.
 *
 * Host architecture remains host metadata, not a build-matrix default. This
 * keeps configured multi-arch defaults intact unless the operator explicitly
 * narrows them.
 *
 * @param defaultPlatforms - CSV fallback when env and host arch are unset (e.g. DEFAULT_BAO_CONTROL_PLANE_IMAGE_PLATFORMS).
 * @param env - Env map for BAO_CONTROL_PLANE_PLATFORMS (runtime env map).
 * @returns Canonical platform list.
 */
export function resolveBaoControlPlaneBuildPlatforms(
  defaultPlatforms: string,
  env: Record<string, string | undefined>,
): BaoControlPlaneContainerPlatform[] {
  const explicit = normalizeOptionalString(env.BAO_CONTROL_PLANE_PLATFORMS);
  if (explicit) {
    const platforms = normalizeBaoControlPlanePlatformList(explicit);
    if (platforms.length > 0) {
      return platforms;
    }
    throw new Error(`Invalid BAO_CONTROL_PLANE_PLATFORMS value: ${explicit}`);
  }

  const normalized = normalizeBaoControlPlanePlatformList(defaultPlatforms);
  if (normalized.length === 0) {
    throw new Error(`Invalid baoControlPlane build platforms default: ${defaultPlatforms}`);
  }
  return normalized;
}
