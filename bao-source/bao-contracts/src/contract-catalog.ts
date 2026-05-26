/**
 * Contract catalog.
 *
 * Defines canonical, active contract versions plus representation policy across
 * server, UI, BunBuddy runtime, test, and docs surfaces. This catalog is the
 * single source of truth for active contracts and their required integration
 * surfaces.
 *
 * @shared/contracts/contract-catalog
 */

const BUNBUDDY_SUFFIX_RE: RegExp = /-bunbuddy$/;

/**
 * Supported representation exposures for active contracts.
 */
export const CONTRACT_EXPOSURES: readonly [
  "public-ui",
  "internal-api",
  "bunbuddy-runtime",
  "docs-only",
] = ["public-ui", "internal-api", "bunbuddy-runtime", "docs-only"] as const;

/**
 * Representation exposure union type.
 */
export type ContractExposure = (typeof CONTRACT_EXPOSURES)[number];

/**
 * Supported representation surfaces for contract convergence.
 */
export const CONTRACT_REPRESENTATION_SURFACES: readonly [
  "server",
  "ui",
  "bunbuddy",
  "tests",
  "docs",
] = ["server", "ui", "bunbuddy", "tests", "docs"] as const;

/**
 * Representation surface union type.
 */
export type ContractRepresentationSurface = (typeof CONTRACT_REPRESENTATION_SURFACES)[number];

/**
 * Canonical representation policy owned by the contract catalog.
 */
export interface ContractRepresentationPolicy {
  /** Exposure class used by audits and generated inventories. */
  exposure: ContractExposure;
  /** Required surfaces that must be represented for this contract. */
  requiredSurfaces: readonly ContractRepresentationSurface[];
  /** Owning subsystem or domain. */
  owner: string;
  /** Optional capability linkage for UI/docs registries. */
  capabilityId?: string;
  /** Optional canonical repo docs path. */
  docsPath?: string;
  /** Optional UI prefixes that represent this contract in SSR surfaces. */
  uiPrefixes?: readonly string[];
}

/**
 * Canonical contract catalog entry.
 */
export interface ContractCatalogEntry {
  /** Contract name. */
  contract: string;
  /** Canonical active version. */
  version: string;
  /** Canonical representation policy. */
  representation: ContractRepresentationPolicy;
}

const INFRA_DOC_PATH: string = "docs/operations/bao-control-plane.md" as const;
const CAPABILITY_DOC_PATH: string = "docs/capability-ownership-map.md" as const;
const AUTOMATION_DOC_PATH: string = "docs/baodown/domain-map.md" as const;
const BUNBUDDY_DOC_PATH: string = "docs/architecture/bunbuddy-contract-model.md" as const;
const PLATFORM_GUIDE_DOC_PATH: string = "docs/eli5-platform-guide.md" as const;
const BAO_COMPOSER_DOC_PATH: string = "docs/development/bao-composer.md" as const;
const ROOT_DOC_PATH: string = "docs/README.md" as const;

const PUBLIC_UI_REQUIRED_SURFACES = [
  "server",
  "ui",
  "tests",
  "docs",
] as const satisfies readonly ContractRepresentationSurface[];
const INTERNAL_API_REQUIRED_SURFACES: readonly ContractRepresentationSurface[] = [
  "server",
  "tests",
  "docs",
] as const satisfies readonly ContractRepresentationSurface[];
const BUNBUDDY_RUNTIME_REQUIRED_SURFACES: readonly ContractRepresentationSurface[] = [
  "server",
  "bunbuddy",
  "tests",
  "docs",
] as const satisfies readonly ContractRepresentationSurface[];

const BUNBUDDY_README_BY_CONTRACT: Record<string, string> = {
  "basler-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/basler-bunbuddy/README.md",
  "usb-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/usb-bunbuddy/README.md",
  "ble-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/bluetooth-bunbuddy/README.md",
  "lighting-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/lighting-bunbuddy/README.md",
  "printer-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/printer-bunbuddy/README.md",
  "industrial-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/industrial-bunbuddy/README.md",
  "iot-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/iot-bunbuddy/README.md",
  "scanner-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/scanner-bunbuddy/README.md",
  "drone-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/drone-bunbuddy/README.md",
  "robotics-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/robotics-bunbuddy/README.md",
  "perception-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/perception-bunbuddy/README.md",
  "rpa-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/rpa-bunbuddy/README.md",
  "vision-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/vision-bunbuddy/README.md",
  "gaussian-bunbuddy": "bao-source/bunbuddy-shared/src/bunbuddies/gaussian-bunbuddy/README.md",
};

const DEFAULT_DEVICE_UI_PREFIXES = ["/devices", "/hardware"] as const;
const BUNBUDDY_UI_PREFIXES_BY_CONTRACT: Record<string, readonly string[]> = {
  "perception-bunbuddy": ["/imaging/perception"],
  "vision-bunbuddy": ["/ai", "/apps/gen-ai", "/imaging/perception"],
  "gaussian-bunbuddy": ["/imaging/gaussian"],
  "scanner-bunbuddy": ["/imaging/scanner", "/devices", "/hardware"],
  "rpa-bunbuddy": ["/automation/rpa"],
  "drone-bunbuddy": ["/uav"],
  "robotics-bunbuddy": ["/robotics"],
};

const IMAGING_BUNBUDDY_CONTRACTS: Set<string> = new Set([
  "perception-bunbuddy",
  "vision-bunbuddy",
  "gaussian-bunbuddy",
  "scanner-bunbuddy",
]);

interface ContractRepresentationResolver {
  /** Whether the resolver owns the contract. */
  matches: (contract: string) => boolean;
  /** Build representation policy for the contract. */
  resolve: (contract: string) => ContractRepresentationPolicy;
}

/**
 * Determine whether a route matches a canonical UI prefix.
 *
 * @param route - Route path.
 * @param prefix - Prefix path.
 * @returns True when the route is equal to or nested under the prefix.
 */
function matchesUiPrefix(route: string, prefix: string): boolean {
  if (prefix === "/") {
    return true;
  }
  return route === prefix || route.startsWith(`${prefix}/`);
}

/**
 * Determine whether a contract matches any prefix in a list.
 *
 * @param contract - Contract identifier.
 * @param prefixes - Prefix list.
 * @returns True when the contract starts with one of the prefixes.
 */
function startsWithAny(contract: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => contract.startsWith(prefix));
}

/**
 * Create a public UI representation policy.
 *
 * @param owner - Owning subsystem or domain.
 * @param capabilityId - Optional linked capability id.
 * @param docsPath - Optional canonical docs path.
 * @param uiPrefixes - Optional represented UI prefixes.
 * @returns Representation policy.
 */
function createPublicUiRepresentation(
  owner: string,
  capabilityId?: string,
  docsPath?: string,
  uiPrefixes?: readonly string[],
): ContractRepresentationPolicy {
  const representation: ContractRepresentationPolicy = {
    exposure: "public-ui",
    requiredSurfaces: PUBLIC_UI_REQUIRED_SURFACES,
    owner,
  };
  if (capabilityId !== undefined) {
    representation.capabilityId = capabilityId;
  }
  if (docsPath !== undefined) {
    representation.docsPath = docsPath;
  }
  if (uiPrefixes !== undefined) {
    representation.uiPrefixes = uiPrefixes;
  }
  return representation;
}

/**
 * Create the default internal API representation policy.
 *
 * @returns Representation policy.
 */
function createInternalApiRepresentation(): ContractRepresentationPolicy {
  return {
    exposure: "internal-api",
    requiredSurfaces: INTERNAL_API_REQUIRED_SURFACES,
    owner: "core",
    docsPath: ROOT_DOC_PATH,
  };
}

/**
 * Resolve the owner for a BunBuddy runtime contract.
 *
 * @param contract - BunBuddy contract identifier.
 * @returns Owning subsystem or domain.
 */
function resolveBunbuddyOwner(contract: string): string {
  if (IMAGING_BUNBUDDY_CONTRACTS.has(contract)) {
    return "imaging";
  }
  if (contract === "rpa-bunbuddy") {
    return "automation";
  }
  return "devices";
}

/**
 * Resolve the canonical UI prefixes for a BunBuddy runtime contract.
 *
 * @param contract - BunBuddy contract identifier.
 * @returns UI prefixes represented by the BunBuddy.
 */
function resolveBunbuddyUiPrefixes(contract: string): readonly string[] {
  return BUNBUDDY_UI_PREFIXES_BY_CONTRACT[contract] ?? DEFAULT_DEVICE_UI_PREFIXES;
}

/**
 * Resolve representation policy for a BunBuddy runtime contract.
 *
 * @param contract - BunBuddy contract identifier.
 * @returns Representation policy.
 */
function resolveBunbuddyRepresentation(contract: string): ContractRepresentationPolicy {
  const representation: ContractRepresentationPolicy = {
    exposure: "bunbuddy-runtime",
    requiredSurfaces: BUNBUDDY_RUNTIME_REQUIRED_SURFACES,
    owner: resolveBunbuddyOwner(contract),
    capabilityId: contract.replace(BUNBUDDY_SUFFIX_RE, ""),
    uiPrefixes: resolveBunbuddyUiPrefixes(contract),
  };
  const docsPath = BUNBUDDY_README_BY_CONTRACT[contract];
  if (docsPath !== undefined) {
    representation.docsPath = docsPath;
  }
  return representation;
}

/**
 * Resolve representation policy for infrastructure runtime contracts.
 *
 * @param contract - Contract identifier.
 * @returns Representation policy.
 */
function resolveInfrastructureRuntimeRepresentation(
  contract: string,
): ContractRepresentationPolicy {
  return createPublicUiRepresentation(
    "infrastructure",
    contract.startsWith("bao-runtime-") ? "bao-runtime" : "bunbuddy-routing",
    INFRA_DOC_PATH,
    ["/infrastructure", "/hub/operations", "/hub/integrations"],
  );
}

/**
 * Resolve representation policy for capability and library registry contracts.
 *
 * @param contract - Contract identifier.
 * @returns Representation policy.
 */
function resolveCapabilityOwnershipRepresentation(contract: string): ContractRepresentationPolicy {
  const capabilityId =
    contract === "capability-registry-list"
      ? "capability-registry"
      : contract.startsWith("library-registry-")
        ? "library-registry"
        : "capability-ownership";

  return createPublicUiRepresentation("core", capabilityId, CAPABILITY_DOC_PATH, [
    "/agentic",
    "/ai",
  ]);
}

/**
 * Resolve representation policy for device and imaging control contracts.
 *
 * @returns Representation policy.
 */
function createHardwareRepresentation(): ContractRepresentationPolicy {
  return createPublicUiRepresentation("devices", "hardware", BUNBUDDY_DOC_PATH, [
    "/devices",
    "/hardware",
    "/dashboard",
    "/imaging/scanner",
  ]);
}

const CONTRACT_REPRESENTATION_RESOLVERS: readonly ContractRepresentationResolver[] = [
  {
    matches: (contract: string) => contract === "bao-composer-manifest",
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("automation", "bao-composer", BAO_COMPOSER_DOC_PATH, [
        "/automation",
        "/automation/bao-composer",
      ]),
  },
  {
    matches: (contract: string) => contract.endsWith("-bunbuddy"),
    resolve: resolveBunbuddyRepresentation,
  },
  {
    matches: (contract: string) =>
      contract === "setup-wizard" || contract === "setup-wizard-refresh",
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("infrastructure", "setup-wizard", INFRA_DOC_PATH, [
        "/infrastructure",
      ]),
  },
  {
    matches: (contract: string) => startsWithAny(contract, ["bao-runtime-", "bunbuddy-routing-"]),
    resolve: resolveInfrastructureRuntimeRepresentation,
  },
  {
    matches: (contract: string) =>
      startsWithAny(contract, ["capability-ownership-", "library-registry-"]) ||
      contract === "capability-registry-list",
    resolve: resolveCapabilityOwnershipRepresentation,
  },
  {
    matches: (contract: string) =>
      contract.startsWith("capability-impact") || contract.startsWith("autonomy-integration"),
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("automation", "autonomy", AUTOMATION_DOC_PATH, [
        "/automation",
        "/ai",
      ]),
  },
  {
    matches: (contract: string) => contract.startsWith("mcp-"),
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("mcp", "mcp", PLATFORM_GUIDE_DOC_PATH, ["/agentic/mcp"]),
  },
  {
    matches: (contract: string) => startsWithAny(contract, ["xr-", "usd-", "annotation-"]),
    resolve: (contract: string): ContractRepresentationPolicy =>
      createPublicUiRepresentation(
        "xr",
        contract.startsWith("annotation-") ? "xr-annotations" : "xr",
        PLATFORM_GUIDE_DOC_PATH,
        ["/xr"],
      ),
  },
  {
    matches: (contract: string) => contract.startsWith("robotics-"),
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("devices", "robotics", PLATFORM_GUIDE_DOC_PATH, ["/robotics"]),
  },
  {
    matches: (contract: string) => contract.startsWith("drone-"),
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("devices", "drone", PLATFORM_GUIDE_DOC_PATH, ["/uav"]),
  },
  {
    matches: (contract: string) =>
      startsWithAny(contract, ["network-discovery-", "imager-", "calibration-"]) ||
      [
        "hardware-summary",
        "driver-registry",
        "bunbuddy-health",
        "bunbuddy-devices",
        "bunbuddy-capabilities",
      ].includes(contract),
    resolve: createHardwareRepresentation,
  },
  {
    matches: (contract: string) => contract === "ai-device-assist" || contract === "chat-tools",
    resolve: (): ContractRepresentationPolicy =>
      createPublicUiRepresentation("ai", "ai", PLATFORM_GUIDE_DOC_PATH, [
        "/ai",
        "/apps/chat",
        "/apps/gen-ai",
      ]),
  },
];

/**
 * Resolve canonical representation policy for one contract.
 *
 * @param contract - Contract identifier.
 * @returns Representation policy.
 */
function resolveContractRepresentation(contract: string): ContractRepresentationPolicy {
  const resolver = CONTRACT_REPRESENTATION_RESOLVERS.find((candidate) =>
    candidate.matches(contract),
  );
  return resolver?.resolve(contract) ?? createInternalApiRepresentation();
}

/**
 * Create a canonical contract catalog entry.
 *
 * @param contract - Contract identifier.
 * @param version - Canonical version.
 * @returns Fully populated catalog entry.
 */
function defineContract(contract: string, version = "1.0.0"): ContractCatalogEntry {
  return {
    contract,
    version,
    representation: resolveContractRepresentation(contract),
  };
}

/**
 * Canonical contract catalog for all runtime surfaces.
 */
export const CONTRACT_CATALOG: Record<string, ContractCatalogEntry> = {
  // Core bunbuddy contracts
  "bunbuddy-health": defineContract("bunbuddy-health"),
  "bunbuddy-devices": defineContract("bunbuddy-devices"),
  "bunbuddy-capabilities": defineContract("bunbuddy-capabilities"),
  "hardware-summary": defineContract("hardware-summary"),
  "imager-status": defineContract("imager-status"),
  "imager-enumerate": defineContract("imager-enumerate"),
  "imager-health": defineContract("imager-health"),
  "calibration-snapshot": defineContract("calibration-snapshot"),
  "calibration-status": defineContract("calibration-status"),
  "calibration-run": defineContract("calibration-run"),
  "calibration-run-job": defineContract("calibration-run-job"),
  "calibration-job-status": defineContract("calibration-job-status"),
  "calibration-detail": defineContract("calibration-detail"),
  "driver-registry": defineContract("driver-registry"),
  "chat-tools": defineContract("chat-tools"),
  "network-discovery-protocols": defineContract("network-discovery-protocols"),
  "network-discovery-full": defineContract("network-discovery-full"),
  "network-discovery-onvif": defineContract("network-discovery-onvif"),
  "network-discovery-mdns": defineContract("network-discovery-mdns"),
  "network-discovery-ssdp": defineContract("network-discovery-ssdp"),
  "network-discovery-cameras": defineContract("network-discovery-cameras"),
  "network-discovery-categorized": defineContract("network-discovery-categorized"),
  "robotics-summary": defineContract("robotics-summary"),
  "robotics-device-detail": defineContract("robotics-device-detail"),
  "robotics-device-telemetry": defineContract("robotics-device-telemetry"),
  "drone-summary": defineContract("drone-summary"),
  "drone-history-telemetry": defineContract("drone-history-telemetry"),
  "drone-mission-planner-compile": defineContract("drone-mission-planner-compile"),
  "drone-mission-planner-export": defineContract("drone-mission-planner-export"),
  "drone-history-events": defineContract("drone-history-events"),
  "drone-history-global-events": defineContract("drone-history-global-events"),
  "capability-registry-list": defineContract("capability-registry-list"),
  "library-registry-list": defineContract("library-registry-list"),
  "library-registry-detail": defineContract("library-registry-detail"),
  "library-registry-coverage": defineContract("library-registry-coverage"),
  "library-registry-overview": defineContract("library-registry-overview"),
  "library-registry-refresh": defineContract("library-registry-refresh"),
  "library-registry-overview-refresh": defineContract("library-registry-overview-refresh"),
  "capability-ownership-map": defineContract("capability-ownership-map"),
  "capability-ownership-focus": defineContract("capability-ownership-focus"),
  "capability-ownership-coverage": defineContract("capability-ownership-coverage"),
  "capability-ownership-refresh": defineContract("capability-ownership-refresh"),
  "setup-wizard": defineContract("setup-wizard"),
  "setup-wizard-refresh": defineContract("setup-wizard-refresh"),
  "capability-impact": defineContract("capability-impact"),
  "autonomy-integration": defineContract("autonomy-integration"),
  "autonomy-integration-refresh": defineContract("autonomy-integration-refresh"),
  "capability-impact-refresh": defineContract("capability-impact-refresh"),
  "xr-sessions-list": defineContract("xr-sessions-list"),
  "xr-sessions-create": defineContract("xr-sessions-create"),
  "xr-sessions-detail": defineContract("xr-sessions-detail"),
  "xr-sessions-join": defineContract("xr-sessions-join"),
  "xr-sessions-leave": defineContract("xr-sessions-leave"),
  "xr-sessions-close": defineContract("xr-sessions-close"),
  "xr-session-events-list": defineContract("xr-session-events-list"),
  "xr-session-events-create": defineContract("xr-session-events-create"),
  "xr-input-profiles-list": defineContract("xr-input-profiles-list"),
  "xr-composition-plan": defineContract("xr-composition-plan"),
  "xr-reviews-list": defineContract("xr-reviews-list"),
  "xr-reviews-create": defineContract("xr-reviews-create"),
  "xr-ingest-scan": defineContract("xr-ingest-scan"),
  "mcp-resources-list": defineContract("mcp-resources-list"),
  "mcp-resource-read": defineContract("mcp-resource-read"),
  "mcp-resource-templates": defineContract("mcp-resource-templates"),
  "mcp-hardware-tools-list": defineContract("mcp-hardware-tools-list"),
  "mcp-hardware-tool-call": defineContract("mcp-hardware-tool-call"),
  "mcp-rpa-tools-list": defineContract("mcp-rpa-tools-list"),
  "mcp-rpa-tool-call": defineContract("mcp-rpa-tool-call"),
  "usd-assets-list": defineContract("usd-assets-list"),
  "usd-asset-detail": defineContract("usd-asset-detail"),
  "usd-asset-ar-urls": defineContract("usd-asset-ar-urls"),
  "usd-asset-validate": defineContract("usd-asset-validate"),
  "usd-scan-session-import": defineContract("usd-scan-session-import"),
  "usd-scan-session-queue": defineContract("usd-scan-session-queue"),
  "usd-scan-session-job-status": defineContract("usd-scan-session-job-status"),
  "usd-annotation-roundtrip": defineContract("usd-annotation-roundtrip"),
  "bunbuddy-routing-status": defineContract("bunbuddy-routing-status"),
  "bunbuddy-routing-refresh": defineContract("bunbuddy-routing-refresh"),
  "bao-runtime-status": defineContract("bao-runtime-status"),
  "bao-runtime-refresh": defineContract("bao-runtime-refresh"),
  "bao-runtime-ensure": defineContract("bao-runtime-ensure"),
  "annotation-alignment-map": defineContract("annotation-alignment-map"),
  "annotation-alignment-refresh": defineContract("annotation-alignment-refresh"),
  "annotation-auto-ingest-status": defineContract("annotation-auto-ingest-status"),
  "annotation-auto-ingest-enqueue": defineContract("annotation-auto-ingest-enqueue"),
  "ai-device-assist": defineContract("ai-device-assist"),

  // Hardware bunbuddies (ports 1891-1898)
  "basler-bunbuddy": defineContract("basler-bunbuddy"),
  "usb-bunbuddy": defineContract("usb-bunbuddy"),
  "ble-bunbuddy": defineContract("ble-bunbuddy"),
  "lighting-bunbuddy": defineContract("lighting-bunbuddy"),
  "printer-bunbuddy": defineContract("printer-bunbuddy"),
  "industrial-bunbuddy": defineContract("industrial-bunbuddy"),
  "iot-bunbuddy": defineContract("iot-bunbuddy"),
  "scanner-bunbuddy": defineContract("scanner-bunbuddy"),

  // Autonomous bunbuddies (ports 1899-1900)
  "drone-bunbuddy": defineContract("drone-bunbuddy"),
  "robotics-bunbuddy": defineContract("robotics-bunbuddy"),

  // AI bunbuddies (ports 1901-1904)
  "perception-bunbuddy": defineContract("perception-bunbuddy"),
  "rpa-bunbuddy": defineContract("rpa-bunbuddy"),
  "vision-bunbuddy": defineContract("vision-bunbuddy"),
  "gaussian-bunbuddy": defineContract("gaussian-bunbuddy"),
};

/**
 * Get the current version of a contract.
 *
 * @param contractName - Name of the contract.
 * @returns Current canonical version or undefined if not found.
 */
export function getContractVersion(contractName: string): string | undefined {
  return CONTRACT_CATALOG[contractName]?.version;
}

/**
 * Resolve one canonical contract entry.
 *
 * @param contractName - Name of the contract.
 * @returns Canonical entry or undefined when missing.
 */
export function getContractCatalogEntry(contractName: string): ContractCatalogEntry | undefined {
  return CONTRACT_CATALOG[contractName];
}

/**
 * Resolve one contract's representation policy.
 *
 * @param contractName - Name of the contract.
 * @returns Representation policy or undefined when missing.
 */
export function getContractRepresentation(
  contractName: string,
): ContractRepresentationPolicy | undefined {
  return CONTRACT_CATALOG[contractName]?.representation;
}

/**
 * Resolve all contracts represented by a UI route path.
 *
 * @param route - Canonical route path.
 * @returns Matching catalog entries.
 */
export function getContractsForUiRoute(route: string): ContractCatalogEntry[] {
  return getAllContracts().filter((entry) =>
    entry.representation.uiPrefixes?.some((prefix) => matchesUiPrefix(route, prefix)),
  );
}

/**
 * Contract validation result.
 */
export interface ContractValidationResult {
  /** Whether the payload is valid. */
  valid: boolean;
  /** Contract name. */
  contract: string;
  /** Contract version. */
  version: string;
  /** Validation errors if any. */
  errors: string[];
}

/**
 * All supported contract names.
 */
export const SUPPORTED_CONTRACTS: string[] = Object.keys(CONTRACT_CATALOG);

/**
 * Get all contracts in the canonical catalog.
 *
 * @returns Array of catalog entries.
 */
export function getAllContracts(): ContractCatalogEntry[] {
  return Object.values(CONTRACT_CATALOG);
}

/**
 * Check if a contract exists in the catalog.
 *
 * @param contractName - Name of the contract.
 * @returns True when the contract exists.
 */
export function hasContract(contractName: string): boolean {
  return contractName in CONTRACT_CATALOG;
}

/**
 * BunBuddy contract port mapping.
 */
export const BUNBUDDY_PORT_MAPPING: Record<string, number> = {
  "basler-bunbuddy": 1891,
  "usb-bunbuddy": 1892,
  "ble-bunbuddy": 1893,
  "lighting-bunbuddy": 1894,
  "printer-bunbuddy": 1895,
  "industrial-bunbuddy": 1896,
  "iot-bunbuddy": 1897,
  "scanner-bunbuddy": 1898,
  "drone-bunbuddy": 1899,
  "robotics-bunbuddy": 1900,
  "perception-bunbuddy": 1901,
  "rpa-bunbuddy": 1902,
  "vision-bunbuddy": 1903,
  "gaussian-bunbuddy": 1904,
};

/**
 * Get the port for a bunbuddy contract.
 *
 * @param contractName - Name of the bunbuddy contract
 * @returns Port number or undefined if not a bunbuddy
 */
export function getBunBuddyPort(contractName: string): number | undefined {
  return BUNBUDDY_PORT_MAPPING[contractName];
}

/**
 * Contract catalog summary for health checks.
 */
export interface ContractCatalogSummary {
  /** Total number of contracts. */
  total: number;
  /** Number of active contracts. */
  active: number;
  /** Number of stale/inactive contracts. */
  stale: number;
}
