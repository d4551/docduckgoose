/**
 * Shared BaoControlPlane registry utilities for Bun scripts and server services.
 *
 * Keeps registry prefix handling and artifact-detection normalization in one
 * canonical location so scripts and control-plane services use the same
 * repository-matching behavior.
 *
 * @shared/utils/bao-control-plane-registry
 */

import { isLoopbackHost } from "../constants/loopback-hosts";

const TRAILING_SLASH_RE: RegExp = /\/$/;
const PRECISION_DIGITS = 4;

/**
 * Registry path style image specification.
 */
export interface BaoControlPlaneImageSpecLike {
  /** Image repository suffix as defined by the build/image spec registry. */
  repository: string;
}

/**
 * Registry image coverage result for detected repositories.
 */
export interface BaoControlPlaneImageRepositoryCoverage {
  /** Expected repository set from image specs. */
  expectedImageRepositories: string[];
  /** Present repositories matched against the observed catalog/repository set. */
  presentImageRepositories: string[];
  /** Missing repositories from expected set that were not observed. */
  missingImageRepositories: string[];
  /** Count of expected repository entries. */
  expectedImageRepositoryCount: number;
  /** Count of present repository entries. */
  presentImageRepositoryCount: number;
  /** Count of missing repository entries. */
  missingImageRepositoryCount: number;
  /** Coverage ratio in the range [0,1]. */
  artifactCoverageRatio: number;
}

function buildSortedUniqueList(values: readonly string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

/**
 * Resolve whether a registry path segment is a host token.
 *
 * @param value - Candidate path segment.
 * @returns True when the segment looks like a host token.
 */
export function isRegistryHostSegment(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  return isLoopbackHost(normalized) || normalized.includes(".") || normalized.includes(":");
}

/**
 * Resolve a repository-relative path from a registry prefix.
 *
 * @param registryPrefix - Registry prefix from baoControlPlane images configuration.
 * @returns Repository-relative path or null when unusable.
 */
export function resolveRegistryRepositoryPath(registryPrefix: string): string | null {
  const normalized = String(registryPrefix ?? "").trim();
  if (!normalized) {
    return null;
  }

  const segments = normalized
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length === 0) {
    return null;
  }
  if (segments.length === 1) {
    return segments[0] ?? null;
  }

  if (isRegistryHostSegment(segments[0] ?? "")) {
    const withHostRemoved = segments.slice(1).join("/").trim();
    return withHostRemoved || null;
  }

  const combined = segments.join("/").trim();
  return combined || null;
}

/**
 * Normalize a catalog check candidate so host:port comparisons are stable.
 *
 * @param value - Raw host or host:port string.
 * @returns Normalized `hostname:port`-style value.
 */
export function normalizeRegistryAddressForCompare(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return "";
  }

  const withoutScheme = trimmed.includes("://") ? (trimmed.split("://")[1] ?? "") : trimmed;
  return withoutScheme.split("/")[0] ?? "".trim();
}

/**
 * Resolve catalog endpoint URL for a registry address.
 *
 * Preserves existing registry address path segments while ensuring protocol and
 * path normalization for `_catalog` probing.
 *
 * @param params - Registry address + optional scheme.
 * @returns Full URL for `_catalog` probe.
 */
export function resolveRegistryCatalogEndpoint(params: {
  /** Registry base address (host[:port] or URL). */
  registryAddress: string;
  /** Default scheme when not included in `registryAddress`. */
  scheme?: "http" | "https";
}): string {
  const scheme = params.scheme ?? "http";
  const base = params.registryAddress.trim();
  const normalized = base.includes("://") ? base : `${scheme}://${base}`;
  const parsed = new URL(normalized);
  const path = parsed.pathname === "/" ? "" : parsed.pathname.replace(TRAILING_SLASH_RE, "");
  const suffix = path ? `${path}/_catalog` : "/v2/_catalog";
  return `${parsed.origin}${suffix.startsWith("/v2/") ? suffix : `/v2/${suffix}`}`;
}

/**
 * Resolve full expected image repository names from an image registry spec set.
 *
 * @param params.registryPrefix - Registry prefix used for local/build metadata.
 * @param params.imageSpecs - Image spec descriptors containing repository suffixes.
 * @returns Deduplicated full repository names.
 */
export function resolveExpectedImageRepositories(params: {
  /** Registry prefix from baoControlPlane images configuration. */
  registryPrefix: string;
  /** Image specs with repository suffixes. */
  imageSpecs: readonly BaoControlPlaneImageSpecLike[];
}): string[] {
  const repositoryPath = resolveRegistryRepositoryPath(params.registryPrefix);
  if (!repositoryPath) {
    return [];
  }

  const expected = new Set<string>();
  for (const spec of params.imageSpecs) {
    const normalized = String(spec.repository ?? "").trim();
    if (!normalized) {
      continue;
    }
    const repository = `${repositoryPath}/${normalized}`;
    expected.add(repository);
  }

  return Array.from(expected);
}

/**
 * Resolve whether a concrete repository path matches an expected image repository.
 *
 * Supports suffix matches to tolerate registries that return path-prefixed names.
 *
 * @param repository - Observed repository from registry metadata.
 * @param expected - Expected repository from build-time spec.
 * @returns True when they are direct or suffix matches.
 */
export function isImageRepositoryMatch(repository: string, expected: string): boolean {
  const actual = repository.trim();
  const expectedRepository = expected.trim();
  if (!(actual && expectedRepository)) {
    return false;
  }
  return actual === expectedRepository || actual.endsWith(`/${expectedRepository}`);
}

/**
 * Resolve image-repository coverage for observed registry entries against expected image specs.
 *
 * @param params - Expected and observed repository lists.
 * @returns Normalized and sorted coverage metrics.
 */
export function resolveImageRepositoryCoverage(params: {
  /** Expected repositories derived from image specs. */
  expected: readonly string[];
  /** Observed repositories from registry catalog/query data. */
  observed: readonly string[];
}): BaoControlPlaneImageRepositoryCoverage {
  const expectedImageRepositories = buildSortedUniqueList(params.expected);
  const observedRepositories = params.observed
    .map((repository) => repository.trim())
    .filter(Boolean);

  const presentImageRepositories = expectedImageRepositories.filter((expected) =>
    observedRepositories.some((repository) => isImageRepositoryMatch(repository, expected)),
  );
  const presentImageRepositorySet = new Set(presentImageRepositories);
  const missingImageRepositories = expectedImageRepositories.filter(
    (expected) => !presentImageRepositorySet.has(expected),
  );

  const expectedImageRepositoryCount = expectedImageRepositories.length;
  const presentImageRepositoryCount = presentImageRepositories.length;
  const missingImageRepositoryCount = missingImageRepositories.length;
  const artifactCoverageRatio =
    expectedImageRepositoryCount <= 0
      ? 1
      : Math.max(
          0,
          Math.min(
            1,
            Number(
              (presentImageRepositoryCount / expectedImageRepositoryCount).toFixed(
                PRECISION_DIGITS,
              ),
            ),
          ),
        );

  return {
    expectedImageRepositories,
    presentImageRepositories: buildSortedUniqueList(presentImageRepositories),
    missingImageRepositories: buildSortedUniqueList(missingImageRepositories),
    expectedImageRepositoryCount,
    presentImageRepositoryCount,
    missingImageRepositoryCount,
    artifactCoverageRatio,
  };
}
