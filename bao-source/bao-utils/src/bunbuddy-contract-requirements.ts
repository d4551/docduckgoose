/**
 * BunBuddy contract requirement resolvers.
 *
 * Centralizes strict contract checks used by both server and bunbuddy runtime
 * loaders so required docs semantics are implemented once.
 *
 * @baohaus/bao-utils/bunbuddy-contract-requirements
 */

import type { BunBuddyContractsEntry } from "@baohaus/bao-schemas/bunbuddy-contracts.schemas";
import { resolveBunBuddyDocsAndSpecContracts } from "@baohaus/bao-utils/bunbuddy-docs-contracts";

/**
 * Required bunbuddy docs contract shape.
 */
export type RequiredBunBuddyDocsContract = {
  title: string;
  description: string;
  specPath: string;
  docsPath: string;
};

/**
 * Resolve required docs contract fields from a bunbuddy contract entry.
 *
 * @param bunbuddy - BunBuddy kind key.
 * @param entry - BunBuddy contract entry.
 * @returns Required docs contract values.
 * @throws Error when docs metadata or docs/spec paths violate the contract.
 */
export function resolveRequiredBunBuddyDocsContractFromEntry(
  bunbuddy: string,
  entry: BunBuddyContractsEntry | null | undefined,
): RequiredBunBuddyDocsContract {
  if (!entry) {
    throw new Error(
      `Contract violation for bunbuddy "${bunbuddy}": missing bunbuddy contract entry`,
    );
  }

  const title = entry.docsMetadata?.title?.trim() ?? "";
  if (title.length === 0) {
    throw new Error(
      `Contract violation for bunbuddy "${bunbuddy}": missing non-empty docsMetadata.title`,
    );
  }

  const description = entry.docsMetadata?.description?.trim() ?? "";
  if (description.length === 0) {
    throw new Error(
      `Contract violation for bunbuddy "${bunbuddy}": missing non-empty docsMetadata.description`,
    );
  }

  const resolvedDocsPaths = resolveBunBuddyDocsAndSpecContracts(entry);
  const specPath = resolvedDocsPaths.specPath?.trim() ?? "";
  if (specPath.length === 0) {
    throw new Error(
      `Contract violation for bunbuddy "${bunbuddy}": missing non-empty openapiPath in docs contracts`,
    );
  }

  const docsPath = resolvedDocsPaths.docsPath?.trim() ?? "";
  if (docsPath.length === 0) {
    throw new Error(
      `Contract violation for bunbuddy "${bunbuddy}": missing non-empty happydumplingPath in docs contracts`,
    );
  }

  return {
    title,
    description,
    specPath,
    docsPath,
  };
}
