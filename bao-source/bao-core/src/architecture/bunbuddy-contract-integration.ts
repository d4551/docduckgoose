/**
 * Integration path between the JSON-based BunBuddy contract registry and
 * the DomainModuleDescriptor / ModuleContractRegistry systems.
 *
 * Translates JSON-based bunbuddy contract entries into canonical
 * DomainModuleDescriptor instances so both TS and Python bunbuddies
 * appear in the unified module registry.
 *
 * JSON-contract-specific fields (operations, timeouts, discovery, OpenAPI file)
 * are stored in the descriptor's `configSchema`
 * slot via the typed {@link BunBuddyContractExtensions} interface.
 *
 * @shared/architecture/bunbuddy-contract-integration
 */

import { MS_PER_SECOND } from "@baohaus/bao-constants/time";
import type {
  BunBuddyContractDefinition,
  BunBuddyContractMethod,
  BunBuddyContractsConfig,
  BunBuddyContractsDocsMetadata,
} from "@baohaus/bao-schemas/bunbuddy-contracts.schemas";
import type { DomainModuleDescriptor, DomainRouteDescriptor } from "./domain-module.contract";
import {
  createDomainModuleDescriptor,
  resolveDomainRoutesFromContractRoutes,
} from "./domain-module.contract";
import type { ModuleContractRegistry } from "./module-contract-registry";

const MIN_TIMEOUT_MS = 100;
const DEFAULT_TIMEOUT_MS = 2000;

// Types

/**
 * BunBuddy-specific fields stored in `configSchema` of a
 * DomainModuleDescriptor when translated from the JSON contract registry.
 */
export interface BunBuddyContractExtensions {
  /** Discriminator for safe runtime narrowing. */
  readonly discriminator: "bunbuddy-contract-extensions";
  /** Operation name to contract key mapping. */
  readonly operations: Readonly<Record<string, string>>;
  /** Default timeout in seconds for capability probes. */
  readonly timeoutSec: number | null;
  /** Discovery metadata for device/list endpoints. */
  readonly discovery: {
    readonly listContractKey: string | null;
    readonly listResponseKeys: readonly string[];
  };
  /** Checked-in OpenAPI YAML file path relative to repo root. */
  readonly openapiFile: string | null;
  /** Presentation metadata for docs UI. */
  readonly docsMetadata: BunBuddyContractsDocsMetadata | null;
  /** Full contract definitions keyed by contract name. */
  readonly contracts: Readonly<Record<string, BunBuddyContractDefinition>>;
}

/**
 * Result of a bulk integration registration operation.
 */
export interface BunBuddyContractIntegrationResult {
  /** Number of descriptors successfully registered. */
  registered: number;
  /** Module IDs that were registered. */
  moduleIds: readonly string[];
  /** Module IDs that were skipped (already registered). */
  skipped: readonly string[];
}

// Translation

/**
 * Resolve the canonical module ID for a BunBuddy kind key.
 *
 * @param kind - Short bunbuddy kind (e.g. `usb`, `ble`, `basler`).
 * @returns Canonical module ID (e.g. `usb-bunbuddy`, `bluetooth-bunbuddy`).
 */
export function resolveBunBuddyModuleId(kind: string): string {
  const kindAliases: Record<string, string> = {
    ble: "bluetooth",
  };
  const resolved = kindAliases[kind] ?? kind;
  return `${resolved}-bunbuddy`;
}

/**
 * Translate a single raw bunbuddy JSON entry into a DomainModuleDescriptor.
 *
 * @param kind - Short bunbuddy kind key from the JSON registry.
 * @param entry - Full JSON contract entry for this bunbuddy.
 * @param registryVersion - Version string from the JSON registry root.
 * @returns Canonical DomainModuleDescriptor with extensions in configSchema.
 */
export function translateBunBuddyContractToDescriptor(
  kind: string,
  entry: BunBuddyContractsConfig["bunbuddies"][string],
  registryVersion: string,
): DomainModuleDescriptor {
  const moduleId = resolveBunBuddyModuleId(kind);

  const contractValues = Object.values(entry.contracts) as Array<{ method: string; path: string }>;
  const routeStrings = contractValues.map((contract) => `${contract.method} ${contract.path}`);
  const routesWithDefaults: string[] = [...routeStrings];
  const hasHealthRoute = routeStrings.some((route) => route.toUpperCase().includes(" /HEALTH"));
  const hasCapabilitiesRoute = routeStrings.some((route) =>
    route.toUpperCase().includes(" /CAPABILITIES"),
  );

  if (!hasHealthRoute) {
    routesWithDefaults.push("GET /health");
  }
  if (!hasCapabilitiesRoute) {
    routesWithDefaults.push("GET /capabilities");
  }

  const defaultSec = entry.timeouts?.defaultSec;
  const timeoutMs =
    defaultSec != null && Number.isFinite(defaultSec)
      ? Math.max(MIN_TIMEOUT_MS, Math.floor(defaultSec * MS_PER_SECOND))
      : DEFAULT_TIMEOUT_MS;

  const routes: DomainRouteDescriptor[] = resolveDomainRoutesFromContractRoutes(routesWithDefaults);

  const extensions: BunBuddyContractExtensions = {
    discriminator: "bunbuddy-contract-extensions",
    operations: Object.freeze({ ...(entry.operations ?? {}) }),
    timeoutSec: entry.timeouts?.defaultSec ?? null,
    discovery: {
      listContractKey: entry.discovery?.listContractKey ?? null,
      listResponseKeys: Object.freeze([...(entry.discovery?.listResponseKeys ?? [])]),
    },
    openapiFile: entry.openapiFile?.trim() || null,
    docsMetadata: entry.docsMetadata ?? null,
    contracts: Object.freeze(
      Object.fromEntries(
        (
          Object.entries(entry.contracts) as [
            string,
            { method: BunBuddyContractMethod; path: string },
          ][]
        ).map(([key, def]) => [key, Object.freeze({ ...def })]),
      ),
    ),
  };

  return createDomainModuleDescriptor({
    moduleId,
    kind: "bunbuddy",
    version: registryVersion,
    description: entry.docsMetadata?.description ?? `${kind} bunbuddy service`,
    routes,
    health: {
      healthProfile: "standard",
      probes: [
        {
          probeId: `${moduleId}:health`,
          endpoint: "/health",
          method: "GET",
          critical: true,
          timeoutMs,
        },
      ],
    },
    transport: {
      protocol: "http",
      basePath: "/",
    },
    configSchema: extensions,
  });
}

/**
 * Register all bunbuddy entries from a raw JSON config into a
 * ModuleContractRegistry.
 *
 * Existing entries with matching module IDs are skipped (not overwritten)
 * so that self-registered TS bunbuddies take precedence over JSON stubs.
 *
 * @param config - Parsed raw bunbuddy contracts JSON.
 * @param registry - Target module contract registry.
 * @returns Registration result summary.
 */
export function registerBunBuddyContractsInModuleRegistry(
  config: BunBuddyContractsConfig,
  registry: ModuleContractRegistry,
): BunBuddyContractIntegrationResult {
  const registered: string[] = [];
  const skipped: string[] = [];

  for (const [kind, entry] of Object.entries(config.bunbuddies)) {
    const descriptor = translateBunBuddyContractToDescriptor(kind, entry, config.version);

    if (registry.has(descriptor.moduleId)) {
      skipped.push(descriptor.moduleId);
      continue;
    }

    registry.register(descriptor);
    registered.push(descriptor.moduleId);
  }

  return {
    registered: registered.length,
    moduleIds: registered,
    skipped,
  };
}

// Extraction Helpers

/**
 * Type guard: check whether a descriptor's configSchema contains
 * BunBuddyContractExtensions.
 *
 * @param descriptor - Module descriptor to check.
 * @returns True when configSchema is typed extensions.
 */
export function hasBunBuddyContractExtensions(
  descriptor: DomainModuleDescriptor,
): descriptor is DomainModuleDescriptor & { configSchema: BunBuddyContractExtensions } {
  if (!descriptor.configSchema || typeof descriptor.configSchema !== "object") {
    return false;
  }
  return (
    "discriminator" in descriptor.configSchema &&
    descriptor.configSchema.discriminator === "bunbuddy-contract-extensions"
  );
}

/**
 * Extract typed BunBuddy contract extensions from a descriptor.
 *
 * @param descriptor - Module descriptor.
 * @returns Extensions or null when not present.
 */
export function getBunBuddyContractExtensions(
  descriptor: DomainModuleDescriptor,
): BunBuddyContractExtensions | null {
  return hasBunBuddyContractExtensions(descriptor) ? descriptor.configSchema : null;
}
