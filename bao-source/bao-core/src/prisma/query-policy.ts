/**
 * Prisma query policy for hot read paths.
 *
 * Enforces select-only on hot read paths and batched IN usage patterns
 * to prevent N+1 and over-fetching. Used by lint checks.
 *
 * @packageDocumentation
 */

/**
 * Policy configuration for Prisma query validation.
 */
export interface PrismaQueryPolicy {
  /** Require explicit select on hot read paths. */
  requireSelectOnHotPaths?: boolean;
  /** Require batched IN for list-by-ID queries. */
  requireBatchedIn?: boolean;
  /** File path patterns (glob or substring) considered hot read paths. */
  hotPathPatterns?: readonly string[];
  /** File paths allowed to skip select (exceptions). */
  allowlist?: readonly string[];
}

/** Default hot path patterns (high-traffic services). */
export const DEFAULT_HOT_READ_PATTERNS: readonly [
  "device-lifecycle",
  "chat-memory-jobs",
  "device-lifecycle.service",
  "chat-memory-jobs.service",
  "baofire-hl7.service",
  "cases.plugin",
  "devices.plugin",
  "robotics.plugin",
  "xr-session.service",
  "baodown-repository.service",
] = [
  "device-lifecycle",
  "chat-memory-jobs",
  "device-lifecycle.service",
  "chat-memory-jobs.service",
  "baofire-hl7.service",
  "cases.plugin",
  "devices.plugin",
  "robotics.plugin",
  "xr-session.service",
  "baodown-repository.service",
] as const;

/** Default policy. */
export const DEFAULT_PRISMA_QUERY_POLICY: PrismaQueryPolicy = {
  requireSelectOnHotPaths: true,
  requireBatchedIn: false,
  hotPathPatterns: DEFAULT_HOT_READ_PATTERNS,
  allowlist: [],
};

/**
 * Check if a file path is a hot read path under the policy.
 *
 * @param filePath - Relative or absolute file path.
 * @param policy - Query policy.
 * @returns True when the path matches hot path patterns.
 */
export function isHotReadPath(
  filePath: string,
  policy: PrismaQueryPolicy = DEFAULT_PRISMA_QUERY_POLICY,
): boolean {
  const patterns = policy.hotPathPatterns ?? DEFAULT_HOT_READ_PATTERNS;
  const normalized = filePath.replace(/\\/g, "/");
  return patterns.some((p) => normalized.includes(p));
}

/**
 * Check if a file path is in the allowlist.
 *
 * @param filePath - Relative or absolute file path.
 * @param policy - Query policy.
 * @returns True when the path is allowed to skip policy.
 */
export function isPolicyAllowlisted(
  filePath: string,
  policy: PrismaQueryPolicy = DEFAULT_PRISMA_QUERY_POLICY,
): boolean {
  const allowlist = policy.allowlist ?? [];
  const normalized = filePath.replace(/\\/g, "/");
  return allowlist.some((a) => normalized.includes(a));
}
