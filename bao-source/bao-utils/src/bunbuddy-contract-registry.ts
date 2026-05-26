import type {
  BunBuddyContractDefinition,
  BunBuddyContractsConfig,
  BunBuddyContractsDocsMetadata,
  BunBuddyContractsEntry,
} from "@baohaus/bao-schemas/bunbuddy-contracts.schemas";
import { BunBuddyContractsConfigSchema } from "@baohaus/bao-schemas/bunbuddy-contracts.schemas";
import type { McpProviderMetadata } from "@baohaus/bao-schemas/mcp.schemas";
import { getErrorMessage, toResultAsync } from "./async-result";
import { readTextFile } from "./bun-fs";
import { resolveRequiredBunBuddyDocsContractFromEntry } from "./bunbuddy-contract-requirements";
import { resolveBunBuddyDocsAndSpecContracts } from "./bunbuddy-docs-contracts";
import { safeJsonParse } from "./safe-json-parse";
import { formatSchemaErrors } from "./schema-validation";

/**
 * Read-only accessor API for BunBuddy contracts.
 */
interface BunBuddyContractsRegistry {
  /**
   * Return validated contracts config.
   */
  getConfig(): BunBuddyContractsConfig;
  /**
   * Return bunbuddy entry or null.
   */
  getContracts(bunbuddy: string): BunBuddyContractsConfig["bunbuddies"][string] | null;
  /**
   * Return endpoint strings for a bunbuddy.
   */
  getContractEndpoints(bunbuddy: string): string[];
  /**
   * Return operation map for a bunbuddy.
   */
  getOperations(bunbuddy: string): Record<string, string>;
  /**
   * Return docs metadata for a bunbuddy.
   */
  getDocsMetadata(bunbuddy: string): BunBuddyContractsDocsMetadata | null;
  /**
   * Return MCP metadata for a bunbuddy.
   */
  getMcpMetadata(bunbuddy: string): McpProviderMetadata | null;
  /**
   * Return a contract definition for a bunbuddy/contract key pair.
   */
  getContract(bunbuddy: string, contractKey: string): BunBuddyContractDefinition | null;
  /**
   * Return docs and OpenAPI paths.
   */
  getDocsContractPaths(bunbuddy: string): {
    happydumplingPath: string | null;
    openapiPath: string | null;
  };
  /**
   * Return required docs contract values.
   */
  getRequiredDocsContract(bunbuddy: string): {
    title: string;
    description: string;
    specPath: string;
    docsPath: string;
  };
  /**
   * Return checked-in OpenAPI file path.
   */
  getOpenApiFile(bunbuddy: string): string | null;
  /**
   * Return discovery contract key.
   */
  getDiscoveryListContractKey(bunbuddy: string): string | null;
  /**
   * Return discovery response keys.
   */
  getDiscoveryListResponseKeys(bunbuddy: string): string[];
  /**
   * Return default timeout seconds for a bunbuddy.
   */
  getTimeoutSec(bunbuddy: string): number | null;
}

/**
 * Load BunBuddy contracts from a candidate list.
 *
 * @param candidates - Ordered candidate files.
 * @returns Loaded contract registry.
 */
export async function loadBunBuddyContractsRegistry(
  candidates: readonly (string | URL)[],
): Promise<BunBuddyContractsRegistry> {
  const failures: string[] = [];
  let loaded: BunBuddyContractsConfig | null = null;

  for (const candidate of candidates) {
    const candidatePath = String(candidate);
    const textResult = await toResultAsync(readTextFile(candidatePath));
    if (!textResult.ok) {
      failures.push(`${candidatePath}: ${getErrorMessage(textResult.error)}`);
      continue;
    }
    const parsed = safeJsonParse<BunBuddyContractsConfig>(textResult.value, null);
    if (!parsed) {
      failures.push(`${candidatePath}: Failed to parse bunbuddy contracts JSON`);
      continue;
    }
    const schemaErrors = formatSchemaErrors(
      BunBuddyContractsConfigSchema,
      parsed,
      "bunbuddy-contracts.json",
    );
    if (schemaErrors.length > 0) {
      failures.push(
        `${candidatePath}: Invalid bunbuddy contracts config:\n- ${schemaErrors.join("\n- ")}`,
      );
      continue;
    }
    loaded = parsed;
    break;
  }

  if (!loaded) {
    throw new Error(`Failed to load bunbuddy contracts config:\n- ${failures.join("\n- ")}`);
  }

  return buildBunBuddyContractsRegistry(loaded);
}

/**
 * Build the runtime accessor API for a validated BunBuddy contracts config.
 *
 * @param loaded - Validated bunbuddy contracts config.
 * @returns Registry facade.
 */
export function buildBunBuddyContractsRegistry(
  loaded: BunBuddyContractsConfig,
): BunBuddyContractsRegistry {
  const getContracts = (bunbuddy: string): BunBuddyContractsEntry | null =>
    loaded.bunbuddies[bunbuddy] ?? null;

  return {
    getConfig: () => loaded,
    getContracts,
    getContractEndpoints: (bunbuddy: string) => {
      const entry = getContracts(bunbuddy);
      if (!entry) {
        return [];
      }
      const contracts = Object.values(entry.contracts) as Array<{ method: string; path: string }>;
      return contracts.map((contract) => `${contract.method} ${contract.path}`);
    },
    getOperations: (bunbuddy: string) => getContracts(bunbuddy)?.operations ?? {},
    getDocsMetadata: (bunbuddy: string) => getContracts(bunbuddy)?.docsMetadata ?? null,
    getMcpMetadata: (bunbuddy: string) => getContracts(bunbuddy)?.mcpMetadata ?? null,
    getContract: (bunbuddy: string, contractKey: string) => {
      const entry = getContracts(bunbuddy);
      if (!entry) {
        return null;
      }
      return entry.contracts[contractKey] ?? null;
    },
    getDocsContractPaths: (bunbuddy: string) => {
      const entry = getContracts(bunbuddy);
      if (!entry) {
        return {
          happydumplingPath: null,
          openapiPath: null,
        };
      }
      const resolved = resolveBunBuddyDocsAndSpecContracts(entry);
      return {
        happydumplingPath: resolved.docsPath,
        openapiPath: resolved.specPath,
      };
    },
    getRequiredDocsContract: (bunbuddy: string) =>
      resolveRequiredBunBuddyDocsContractFromEntry(bunbuddy, getContracts(bunbuddy)),
    getOpenApiFile: (bunbuddy: string) => {
      const entry = getContracts(bunbuddy);
      const openapiFile = entry?.openapiFile;
      if (typeof openapiFile !== "string") {
        return null;
      }
      const trimmed = openapiFile.trim();
      return trimmed.length > 0 ? trimmed : null;
    },
    getDiscoveryListContractKey: (bunbuddy: string) => {
      const contractKey = getContracts(bunbuddy)?.discovery?.listContractKey;
      if (!contractKey) {
        return null;
      }
      return contractKey;
    },
    getDiscoveryListResponseKeys: (bunbuddy: string) => {
      const keys = getContracts(bunbuddy)?.discovery?.listResponseKeys;
      if (!Array.isArray(keys)) {
        return ["devices"];
      }
      return keys
        .map((key) => (typeof key === "string" ? key.trim() : ""))
        .filter((key) => key.length > 0);
    },
    getTimeoutSec: (bunbuddy: string) => {
      const timeout = getContracts(bunbuddy)?.timeouts?.defaultSec;
      return typeof timeout === "number" && Number.isFinite(timeout) ? timeout : null;
    },
  };
}

/**
 * Build candidate paths from preferred + fallback values while deduping.
 *
 * @param values - Candidate values.
 * @returns Unique normalized values.
 */
export function dedupeBunBuddyContractCandidates(
  values: readonly (string | URL)[],
): (string | URL)[] {
  const out: (string | URL)[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    const key = String(value);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(value);
  }
  return out;
}
