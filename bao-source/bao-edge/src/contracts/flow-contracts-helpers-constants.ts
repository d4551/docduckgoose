import type { BuildKind, BuildType, DesktopBuildVariant } from "./flow-contracts-1";
import { SUPPORTED_BUILD_TYPES } from "./flow-contracts-1";

const DEFAULT_JOB_TIMEOUT_MINUTES = 20 as const;
const MILLISECONDS_PER_MINUTE = 60_000 as const;

/** Output size limit for persisted async command logs. */
export const MAX_JOB_LOG_CHARS = 12_000 as const;

/** Default timeout for async build/pull jobs. */
export const DEFAULT_JOB_TIMEOUT_MS = DEFAULT_JOB_TIMEOUT_MINUTES * MILLISECONDS_PER_MINUTE;

/** Supported build platform constants for validation. */
export const SUPPORTED_BUILD_KINDS = [
  "android",
  "ios",
  "desktop",
] as const satisfies readonly BuildKind[];

/** Supported desktop build variants for deterministic validation across tooling and UI. */
export const SUPPORTED_DESKTOP_BUILD_VARIANTS = [
  "linux-x64",
  "linux-arm64",
  "darwin-arm64",
  "darwin-x64",
  "windows-x64",
] as const satisfies readonly DesktopBuildVariant[];

const SUPPORTED_BUILD_KIND_SET = new Set<string>(SUPPORTED_BUILD_KINDS);
const SUPPORTED_BUILD_TYPE_SET = new Set<string>(SUPPORTED_BUILD_TYPES);
const SUPPORTED_DESKTOP_BUILD_VARIANT_SET = new Set<string>(SUPPORTED_DESKTOP_BUILD_VARIANTS);

/** Validate build platform names. */
export function isSupportedBuildKind(value: string): value is BuildKind {
  return SUPPORTED_BUILD_KIND_SET.has(value);
}

/** Validate build type names. */
export function isSupportedBuildType(value: string): value is BuildType {
  return SUPPORTED_BUILD_TYPE_SET.has(value);
}

/** Validate supported desktop build variant names. */
export function isSupportedDesktopBuildVariant(value: string): value is DesktopBuildVariant {
  return SUPPORTED_DESKTOP_BUILD_VARIANT_SET.has(value);
}

/** Build routing helper for app builds and polling pages. */
export function buildJobRouteFromKind(_kind: BuildKind, jobId?: string): string {
  const base = "/api/apps/build";
  return jobId ? `${base}/${jobId}` : base;
}
