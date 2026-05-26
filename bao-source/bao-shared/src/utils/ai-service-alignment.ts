/**
 * AI service alignment coverage helpers.
 *
 * Builds coverage inventories from ownership maps and merges coverage payloads
 * with deterministic ordering for UI and API consumers.
 *
 * @shared/utils/ai-service-alignment
 */

import type { CapabilityOwnershipEntry } from "@baohaus/bao-schemas/capability-ownership/entry";
import type { CapabilityOwnershipFocusMap } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { AiServiceAlignmentCoverage } from "../schemas/ai-service-alignment.schemas";

const BUNBUDDY_PREFIX_RE: RegExp = /^bunbuddy:/;
const DRIVER_PREFIX_RE: RegExp = /^driver:/;

const COVERAGE_KEYS = [
  "libraries",
  "libraryCategories",
  "plugins",
  "bunbuddies",
  "drivers",
  "driverPackages",
  "devices",
  "deviceSources",
  "deviceDriverPackages",
  "mcpDomains",
] as const satisfies ReadonlyArray<keyof AiServiceAlignmentCoverage>;

/**
 * Normalize a token for coverage lists.
 */
function normalizeToken(value?: string | null): string | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

/**
 * Add a token to a coverage set.
 */
function addCoverageToken(set: Set<string>, value?: string | null): void {
  const token = normalizeToken(value);
  if (!token) {
    return;
  }
  set.add(token);
}

/**
 * Convert a set into a sorted array.
 */
function toSortedArray(values: Iterable<string>): string[] {
  return Array.from(values).sort((left, right) => left.localeCompare(right));
}

/**
 * Create an empty coverage payload.
 */
function createEmptyCoverage(): AiServiceAlignmentCoverage {
  return {
    libraries: [],
    libraryCategories: [],
    plugins: [],
    bunbuddies: [],
    drivers: [],
    driverPackages: [],
    devices: [],
    deviceSources: [],
    deviceDriverPackages: [],
    mcpDomains: [],
  };
}

function createCoverageSets(): CoverageSets {
  return {
    libraries: new Set<string>(),
    libraryCategories: new Set<string>(),
    plugins: new Set<string>(),
    bunbuddies: new Set<string>(),
    drivers: new Set<string>(),
    driverPackages: new Set<string>(),
    devices: new Set<string>(),
    deviceSources: new Set<string>(),
    deviceDriverPackages: new Set<string>(),
    mcpDomains: new Set<string>(),
  };
}

/**
 * Resolve a bunbuddy identifier from a capability ownership entry.
 */
function resolveBunBuddyIdentifier(entry: CapabilityOwnershipEntry): string | null {
  if (entry.source.kind === "bunbuddy") {
    return (
      normalizeToken(entry.source.bunbuddyKind) ??
      normalizeToken(entry.id.replace(BUNBUDDY_PREFIX_RE, ""))
    );
  }
  return normalizeToken(entry.id.replace(BUNBUDDY_PREFIX_RE, ""));
}

type CoverageSets = {
  libraries: Set<string>;
  libraryCategories: Set<string>;
  plugins: Set<string>;
  bunbuddies: Set<string>;
  drivers: Set<string>;
  driverPackages: Set<string>;
  devices: Set<string>;
  deviceSources: Set<string>;
  deviceDriverPackages: Set<string>;
  mcpDomains: Set<string>;
};

function normalizeGroupIds(groupIds: readonly string[]): string[] {
  return groupIds.map((id) => normalizeToken(id)).filter((id): id is string => id !== null);
}

function collectMatchingEntries(
  ownership: CapabilityOwnershipFocusMap,
  groupIdSet: ReadonlySet<string>,
): CapabilityOwnershipEntry[] {
  const entryMap = new Map<string, CapabilityOwnershipEntry>();

  for (const segment of ownership.segments) {
    if (!segment.groupIds.some((groupId: string) => groupIdSet.has(groupId))) {
      continue;
    }

    for (const entry of segment.entries ?? []) {
      if (entryMap.has(entry.id)) {
        continue;
      }
      entryMap.set(entry.id, entry);
    }
  }

  return Array.from(entryMap.values());
}

function addMcpSurfaceCoverage(
  ownership: CapabilityOwnershipFocusMap,
  groupIdSet: ReadonlySet<string>,
  coverageSets: CoverageSets,
): void {
  for (const surface of ownership.mcpSurfaces ?? []) {
    const groupId = normalizeToken(surface.groupId);
    if (!(groupId && groupIdSet.has(groupId))) {
      continue;
    }
    addCoverageToken(coverageSets.mcpDomains, surface.domain);
  }
}

function materializeCoverage(coverageSets: CoverageSets): AiServiceAlignmentCoverage | null {
  const coverage = createEmptyCoverage();
  coverage.libraries = toSortedArray(coverageSets.libraries);
  coverage.libraryCategories = toSortedArray(coverageSets.libraryCategories);
  coverage.plugins = toSortedArray(coverageSets.plugins);
  coverage.bunbuddies = toSortedArray(coverageSets.bunbuddies);
  coverage.drivers = toSortedArray(coverageSets.drivers);
  coverage.driverPackages = toSortedArray(coverageSets.driverPackages);
  coverage.devices = toSortedArray(coverageSets.devices);
  coverage.deviceSources = toSortedArray(coverageSets.deviceSources);
  coverage.deviceDriverPackages = toSortedArray(coverageSets.deviceDriverPackages);
  coverage.mcpDomains = toSortedArray(coverageSets.mcpDomains);

  return COVERAGE_KEYS.some((key) => coverage[key].length > 0) ? coverage : null;
}

/**
 * Add coverage tokens for a single ownership entry based on its kind.
 *
 * @param entry - Ownership entry.
 * @param sets - Mutable coverage set collection.
 */
function addEntryCoverage(entry: CapabilityOwnershipEntry, sets: CoverageSets): void {
  switch (entry.kind) {
    case "library": {
      addCoverageToken(sets.libraries, entry.source.library?.name ?? entry.name);
      for (const category of entry.source.library?.categories ?? []) {
        addCoverageToken(sets.libraryCategories, category);
      }
      break;
    }
    case "plugin":
      addCoverageToken(sets.plugins, entry.id);
      break;
    case "bunbuddy":
      addCoverageToken(sets.bunbuddies, resolveBunBuddyIdentifier(entry));
      break;
    case "driver":
      addCoverageToken(
        sets.drivers,
        entry.source.driver?.key ?? entry.id.replace(DRIVER_PREFIX_RE, ""),
      );
      addCoverageToken(sets.driverPackages, entry.source.driver?.packageName ?? entry.name);
      break;
    case "device":
      addCoverageToken(sets.devices, entry.source.device?.deviceType ?? entry.name);
      addCoverageToken(sets.deviceSources, entry.source.device?.discoverySource);
      addCoverageToken(sets.deviceDriverPackages, entry.source.device?.driverPackage);
      break;
  }
}

/**
 * Build alignment coverage from an ownership focus map.
 */
export function buildAiServiceAlignmentCoverageFromOwnership(options: {
  ownership?: CapabilityOwnershipFocusMap | null;
  groupIds: string[];
}): AiServiceAlignmentCoverage | null {
  const ownership = options.ownership;
  if (!ownership) {
    return null;
  }

  const normalizedGroupIds = normalizeGroupIds(options.groupIds);
  if (normalizedGroupIds.length === 0) {
    return null;
  }
  const groupIdSet = new Set<string>(normalizedGroupIds);
  const coverageSets = createCoverageSets();

  for (const entry of collectMatchingEntries(ownership, groupIdSet)) {
    addEntryCoverage(entry, coverageSets);
  }

  addMcpSurfaceCoverage(ownership, groupIdSet, coverageSets);
  return materializeCoverage(coverageSets);
}

/**
 * Merge two coverage payloads into a unified list.
 */
export function mergeAiServiceAlignmentCoverage(
  base: AiServiceAlignmentCoverage,
  next: AiServiceAlignmentCoverage,
): AiServiceAlignmentCoverage {
  const merged = createEmptyCoverage();

  for (const key of COVERAGE_KEYS) {
    const combined = new Set<string>();
    for (const value of base[key]) {
      addCoverageToken(combined, value);
    }
    for (const value of next[key]) {
      addCoverageToken(combined, value);
    }
    merged[key] = toSortedArray(combined);
  }

  return merged;
}

/**
 * Limit coverage lists to a max item count.
 */
export function limitAiServiceAlignmentCoverage(
  coverage: AiServiceAlignmentCoverage,
  maxItems?: number | null,
): AiServiceAlignmentCoverage {
  const limit =
    typeof maxItems === "number" && Number.isFinite(maxItems) ? Math.max(0, maxItems) : null;
  if (!limit) {
    return coverage;
  }

  const limited = createEmptyCoverage();
  for (const key of COVERAGE_KEYS) {
    limited[key] = coverage[key]
      .slice()
      .sort((left: string, right: string) => left.localeCompare(right))
      .slice(0, limit);
  }

  return limited;
}
