/**
 * BunBuddy contract registry loader.
 *
 * @baohaus/bao-contracts/bunbuddy-contracts
 */

import { isAbsolute, resolve as resolvePath } from "node:path";
import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { isRecord } from "@baohaus/bao-utils/type-guards";
import embeddedBunBuddyContracts from "./contracts/bunbuddy-contracts.json";
import embeddedBunBuddyWorkloads from "./contracts/bunbuddy-workloads.json";

export type BunBuddyContractMethod =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "WS";

export type BunBuddyContractDefinition = {
  method: BunBuddyContractMethod;
  path: string;
};

export type BunBuddyContractKubernetesDistribution = "k0" | "k3" | "k8";

export type BunBuddyContractsDocsMetadata = {
  title: string;
  description: string;
  notes?: readonly string[] | undefined;
  readmePath?: string | undefined;
  systemDocPath?: string | undefined;
};

export type McpProviderMetadata = {
  description?: string | undefined;
  tags?: readonly string[] | undefined;
};

export type BaoRuntimeBunBuddyPlatformTargets = {
  baoRuntime: boolean;
  kubernetesDistributions: readonly BunBuddyContractKubernetesDistribution[];
};

export type BunBuddyContractsConfig = {
  version?: string | undefined;
  bunbuddies: Record<string, Record<string, unknown>>;
};

const REPO_ROOT = resolvePath(import.meta.dir, "../../..");

export const BUNBUDDY_CONTRACTS_DEFAULT_PATH: "bao-source/bao-contracts/src/contracts/bunbuddy-contracts.json" =
  "bao-source/bao-contracts/src/contracts/bunbuddy-contracts.json" as const;
export const BUNBUDDY_WORKLOADS_DEFAULT_PATH: "bao-source/bao-contracts/src/contracts/bunbuddy-workloads.json" =
  "bao-source/bao-contracts/src/contracts/bunbuddy-workloads.json" as const;

const DEFAULT_CONTRACTS_FILE = resolvePath(REPO_ROOT, BUNBUDDY_CONTRACTS_DEFAULT_PATH);
const DEFAULT_WORKLOADS_FILE = resolvePath(REPO_ROOT, BUNBUDDY_WORKLOADS_DEFAULT_PATH);

function getRecordProperty(
  record: Record<string, unknown> | null | undefined,
  key: string,
): Record<string, unknown> | null {
  if (!record) {
    return null;
  }
  const value = record[key];
  return isRecord(value) ? value : null;
}

function getStringProperty(
  record: Record<string, unknown> | null | undefined,
  key: string,
): string | null {
  if (!record) {
    return null;
  }
  const value = record[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getBooleanProperty(
  record: Record<string, unknown> | null | undefined,
  key: string,
): boolean {
  if (!record) {
    return false;
  }
  return record[key] === true;
}

function getStringListProperty(
  record: Record<string, unknown> | null | undefined,
  key: string,
): string[] {
  if (!record) {
    return [];
  }
  const value = record[key];
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getContractRoot(): Record<string, unknown> {
  return isRecord(embeddedBunBuddyContracts) ? embeddedBunBuddyContracts : {};
}

function getWorkloadRoot(): Record<string, unknown> {
  return isRecord(embeddedBunBuddyWorkloads) ? embeddedBunBuddyWorkloads : {};
}

function getBunBuddyKindRecord(
  root: Record<string, unknown>,
  kind: string,
): Record<string, unknown> | null {
  const bunbuddies = getRecordProperty(root, "bunbuddies");
  if (!bunbuddies) {
    return null;
  }
  const entry = bunbuddies[kind];
  return isRecord(entry) ? entry : null;
}

function getContractEntry(kind: string): Record<string, unknown> | null {
  return getBunBuddyKindRecord(getContractRoot(), kind);
}

function getWorkloadEntry(kind: string): Record<string, unknown> | null {
  return getBunBuddyKindRecord(getWorkloadRoot(), kind);
}

export function getBunBuddyContractsPath(): string {
  const configuredPath = readEnvStringOrNull("BUNBUDDY_CONTRACTS_PATH");
  if (!configuredPath) {
    return DEFAULT_CONTRACTS_FILE;
  }
  return isAbsolute(configuredPath) ? configuredPath : resolvePath(REPO_ROOT, configuredPath);
}

export function getBunBuddyWorkloadsPath(): string {
  const configuredPath = readEnvStringOrNull("BUNBUDDY_WORKLOADS_PATH");
  if (!configuredPath) {
    return DEFAULT_WORKLOADS_FILE;
  }
  return isAbsolute(configuredPath) ? configuredPath : resolvePath(REPO_ROOT, configuredPath);
}

export function getBunBuddyContractsConfig(): BunBuddyContractsConfig {
  const root = getContractRoot();
  const bunbuddies = getRecordProperty(root, "bunbuddies");
  const config: Record<string, Record<string, unknown>> = {};
  if (bunbuddies) {
    for (const [kind, entry] of Object.entries(bunbuddies)) {
      if (isRecord(entry)) {
        config[kind] = entry;
      }
    }
  }
  return {
    version: getStringProperty(root, "version") ?? undefined,
    bunbuddies: config,
  };
}

export function getBunBuddyContracts(
  bunbuddy: string,
): BunBuddyContractsConfig["bunbuddies"][string] | null {
  return getContractEntry(bunbuddy);
}

export interface BunBuddyWorkloadConfig {
  version?: string | undefined;
  bunbuddies: Record<string, Record<string, unknown>>;
}

export function getBunBuddyWorkloadConfig(): BunBuddyWorkloadConfig {
  const root = getWorkloadRoot();
  const bunbuddies = isRecord(root.bunbuddies) ? root.bunbuddies : {};
  const config: Record<string, Record<string, unknown>> = {};
  for (const [kind, entry] of Object.entries(bunbuddies)) {
    if (isRecord(entry)) {
      config[kind] = entry;
    }
  }
  return {
    version: getStringProperty(root, "version") ?? undefined,
    bunbuddies: config,
  };
}

export function getBunBuddyContractEndpoints(bunbuddy: string): string[] {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return [];
  }
  const contracts = getRecordProperty(entry, "contracts");
  if (!contracts) {
    return [];
  }

  const endpoints: string[] = [];
  for (const [_name, value] of Object.entries(contracts)) {
    if (!isRecord(value)) {
      continue;
    }
    const method = getStringProperty(value, "method");
    const path = getStringProperty(value, "path");
    if (!(method && path)) {
      continue;
    }
    endpoints.push(`${method} ${path}`.trim());
  }
  return endpoints;
}

export function getBunBuddyOperations(bunbuddy: string): Record<string, string> {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return {};
  }
  const operations = getRecordProperty(entry, "operations");
  if (!operations) {
    return {};
  }
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(operations)) {
    if (typeof value === "string" && value.trim().length > 0) {
      result[key] = value.trim();
    }
  }
  return result;
}

export function getBunBuddyDocsMetadata(bunbuddy: string): BunBuddyContractsDocsMetadata | null {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  const docs = getRecordProperty(entry, "docsMetadata");
  if (!docs) {
    return null;
  }

  const title = getStringProperty(docs, "title");
  const description = getStringProperty(docs, "description");
  if (!(title && description)) {
    return null;
  }

  return {
    title,
    description,
    notes: getStringListProperty(docs, "notes"),
    readmePath: getStringProperty(docs, "readmePath") ?? undefined,
    systemDocPath: getStringProperty(docs, "systemDocPath") ?? undefined,
  };
}

export function getBunBuddyMcpMetadata(bunbuddy: string): McpProviderMetadata | null {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  const mcp = getRecordProperty(entry, "mcpMetadata");
  if (!mcp) {
    return null;
  }
  return {
    description: getStringProperty(mcp, "description") ?? undefined,
    tags: getStringListProperty(mcp, "tags"),
  };
}

export function getBunBuddyPlatformTargets(
  bunbuddy: string,
): BaoRuntimeBunBuddyPlatformTargets | null {
  const entry = getWorkloadEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  const platformTargets = getRecordProperty(entry, "platformTargets");
  if (!platformTargets) {
    return null;
  }

  const distributions = getStringListProperty(platformTargets, "kubernetesDistributions").filter(
    (value): value is BunBuddyContractKubernetesDistribution => ["k0", "k3", "k8"].includes(value),
  );

  return {
    baoRuntime: getBooleanProperty(platformTargets, "baoRuntime"),
    kubernetesDistributions: distributions,
  };
}

export function getRequiredBunBuddyPlatformTargets(
  bunbuddy: string,
): BaoRuntimeBunBuddyPlatformTargets {
  const targets = getBunBuddyPlatformTargets(bunbuddy);
  if (!targets) {
    throw new Error(`Missing platform targets for bunbuddy "${bunbuddy}"`);
  }
  return targets;
}

export function getBunBuddySupportedKubernetesDistributions(): BunBuddyContractKubernetesDistribution[] {
  const root = getWorkloadRoot();
  const bunbuddies = getRecordProperty(root, "bunbuddies");
  if (!bunbuddies) {
    return [];
  }

  const seen = new Set<BunBuddyContractKubernetesDistribution>();
  for (const value of Object.values(bunbuddies)) {
    if (!isRecord(value)) {
      continue;
    }
    const platformTargets = getRecordProperty(value, "platformTargets");
    if (!platformTargets) {
      continue;
    }
    for (const distribution of getStringListProperty(platformTargets, "kubernetesDistributions")) {
      if (distribution === "k0" || distribution === "k3" || distribution === "k8") {
        seen.add(distribution);
      }
    }
  }
  return [...seen];
}

export function getBunBuddyContract(
  bunbuddy: string,
  contractKey: string,
): BunBuddyContractDefinition | null {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  const contracts = getRecordProperty(entry, "contracts");
  if (!contracts) {
    return null;
  }
  const contract = getRecordProperty(contracts, contractKey);
  if (!contract) {
    return null;
  }
  const method = getStringProperty(contract, "method");
  const path = getStringProperty(contract, "path");
  if (!(method && path)) {
    return null;
  }
  if (
    method !== "GET" &&
    method !== "POST" &&
    method !== "PATCH" &&
    method !== "PUT" &&
    method !== "DELETE" &&
    method !== "OPTIONS" &&
    method !== "HEAD" &&
    method !== "WS"
  ) {
    return null;
  }
  return { method, path };
}

export function getBunBuddyDocsContractPaths(bunbuddy: string): {
  happydumplingPath: string | null;
  openapiPath: string | null;
} {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return { happydumplingPath: null, openapiPath: null };
  }
  const contracts = getRecordProperty(entry, "contracts");
  if (!contracts) {
    return { happydumplingPath: null, openapiPath: null };
  }

  const docs = getRecordProperty(contracts, "docs");
  const openapi = getRecordProperty(contracts, "openapi");
  const docsJson = getRecordProperty(contracts, "docsJson");
  const openapiJson = getRecordProperty(contracts, "openapiJson");

  return {
    happydumplingPath: getStringProperty(docs, "path") ?? getStringProperty(openapi, "path"),
    openapiPath:
      getStringProperty(openapiJson, "path") ??
      getStringProperty(docsJson, "path") ??
      getStringProperty(openapi, "path"),
  };
}

export function getRequiredBunBuddyDocsContract(bunbuddy: string): {
  title: string;
  description: string;
  specPath: string;
  docsPath: string;
} {
  const metadata = getBunBuddyDocsMetadata(bunbuddy);
  if (!metadata) {
    throw new Error(`Missing docs metadata for bunbuddy "${bunbuddy}"`);
  }

  const paths = getBunBuddyDocsContractPaths(bunbuddy);
  const docsPath = paths.happydumplingPath;
  const specPath = paths.openapiPath;
  if (!(docsPath && specPath)) {
    throw new Error(`Missing docs/spec paths for bunbuddy "${bunbuddy}"`);
  }

  return {
    title: metadata.title,
    description: metadata.description,
    docsPath,
    specPath,
  };
}

export function getBunBuddyOpenApiFile(bunbuddy: string): string | null {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  return getStringProperty(entry, "openapiFile");
}

export function getBunBuddyDiscoveryListContractKey(bunbuddy: string): string | null {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  const discovery = getRecordProperty(entry, "discovery");
  if (!discovery) {
    return null;
  }
  return getStringProperty(discovery, "listContractKey");
}

export function getBunBuddyTimeoutSec(bunbuddy: string): number | null {
  const entry = getContractEntry(bunbuddy);
  if (!entry) {
    return null;
  }
  const timeouts = getRecordProperty(entry, "timeouts");
  if (!timeouts) {
    return null;
  }
  const value = timeouts.defaultSec;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
