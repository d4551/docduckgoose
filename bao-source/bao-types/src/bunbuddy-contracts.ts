/**
 * Canonical BunBuddy contract aliases for TS control-plane services.
 *
 * This module centralizes BunBuddy contract-facing type aliases so server
 * orchestration and Python worker boundary adapters share one typed surface.
 *
 * @shared/types/bunbuddy-contracts
 */

import type {
  BunBuddyContractDefinition,
  BunBuddyContractMethod,
  BunBuddyContractsConfig,
  BunBuddyContractsDocsMetadata,
  BunBuddyContractsEntry,
} from "@baohaus/bao-schemas/bunbuddy-contracts.schemas";
import type { McpProviderMetadata } from "@baohaus/bao-schemas/mcp.schemas";

/**
 * Canonical BunBuddy contracts registry payload.
 */
export type BunbuddyContractRegistry = BunBuddyContractsConfig;

/**
 * Canonical BunBuddy entry payload.
 */
export type BunbuddyContractEntry = BunBuddyContractsEntry;

/**
 * Canonical BunBuddy endpoint contract definition.
 */
export type BunbuddyEndpointContract = BunBuddyContractDefinition;

/**
 * Canonical BunBuddy contract method.
 */
export type BunbuddyContractMethod = BunBuddyContractMethod;

/**
 * Canonical BunBuddy docs metadata.
 */
export type BunbuddyDocsMetadata = BunBuddyContractsDocsMetadata;

/**
 * Canonical BunBuddy MCP metadata.
 */
export type BunbuddyMcpMetadata = McpProviderMetadata;

/**
 * Flattened endpoint descriptor used by TS control-plane adapters.
 */
export interface BunbuddyEndpointDescriptor {
  /** BunBuddy identifier (`vision`, `scanner`, and so on). */
  bunbuddy: string;
  /** Logical endpoint contract key (`health`, `capabilities`, etc). */
  contractKey: string;
  /** HTTP/WS method. */
  method: BunbuddyContractMethod;
  /** Route path. */
  path: string;
}

/**
 * Flatten endpoint contracts for all BunBuddies in a registry.
 *
 * @param registry - Contract registry payload.
 * @returns Flattened endpoint descriptors.
 */
export function flattenBunbuddyContracts(
  registry: BunbuddyContractRegistry,
): BunbuddyEndpointDescriptor[] {
  const entries: BunbuddyEndpointDescriptor[] = [];

  for (const [bunbuddy, contractEntry] of Object.entries(registry.bunbuddies)) {
    const contracts: Record<string, { method: BunbuddyContractMethod; path: string }> = (
      contractEntry as {
        contracts: Record<string, { method: BunbuddyContractMethod; path: string }>;
      }
    ).contracts;
    for (const [contractKey, contract] of Object.entries(contracts)) {
      entries.push({
        bunbuddy,
        contractKey,
        method: contract.method,
        path: contract.path,
      });
    }
  }

  return entries;
}

/**
 * Resolve one BunBuddy contract entry by key.
 *
 * @param registry - Contract registry payload.
 * @param bunbuddy - BunBuddy identifier.
 * @returns Matching contract entry or null.
 */
export function resolveBunbuddyContractEntry(
  registry: BunbuddyContractRegistry,
  bunbuddy: string,
): BunbuddyContractEntry | null {
  return registry.bunbuddies[bunbuddy] ?? null;
}
