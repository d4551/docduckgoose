/**
 * BunBuddy workload registry helpers.
 *
 * Provides synchronous accessors for the checked-in BunBuddy deployment
 * descriptor registry derived from `.bao` manifests.
 *
 * @shared/utils/bunbuddy-workload-registry
 */

import type {
  BaoRuntimeBunBuddyPlatformTargets,
  BunBuddyDeploymentDescriptor,
  BunBuddyDeploymentRegistry,
} from "@baohaus/bao-schemas/bao-runtime-workload.schemas";
import {
  BunBuddyDeploymentRegistrySchema,
  isBunBuddyDeploymentRegistry,
} from "@baohaus/bao-schemas/bao-runtime-workload.schemas";
import { formatSchemaErrors } from "@baohaus/bao-shared/validation/schema";

/**
 * Read-only accessor API for the BunBuddy workload registry.
 */
export interface BunBuddyWorkloadRegistry {
  /**
   * Return the validated workload registry payload.
   *
   * @returns Full registry payload.
   */
  getConfig(): BunBuddyDeploymentRegistry;
  /**
   * Return a deployment descriptor or null when missing.
   *
   * @param bunbuddy - BunBuddy kind key.
   * @returns Deployment descriptor or null.
   */
  getDescriptor(bunbuddy: string): BunBuddyDeploymentDescriptor | null;
  /**
   * Return a required deployment descriptor.
   *
   * @param bunbuddy - BunBuddy kind key.
   * @returns Deployment descriptor.
   */
  getRequiredDescriptor(bunbuddy: string): BunBuddyDeploymentDescriptor;
  /**
   * Return platform targets projected from the deployment descriptor.
   *
   * @param bunbuddy - BunBuddy kind key.
   * @returns Platform targets or null when unavailable.
   */
  getPlatformTargets(bunbuddy: string): BaoRuntimeBunBuddyPlatformTargets | null;
  /**
   * Return required platform targets projected from the deployment descriptor.
   *
   * @param bunbuddy - BunBuddy kind key.
   * @returns Platform targets.
   */
  getRequiredPlatformTargets(bunbuddy: string): BaoRuntimeBunBuddyPlatformTargets;
  /**
   * Return the unique supported Kubernetes distributions across all descriptors.
   *
   * @returns Ordered distribution list.
   */
  getSupportedKubernetesDistributions(): readonly BaoRuntimeBunBuddyPlatformTargets["kubernetesDistributions"][number][];
}

function resolveDescriptorPlatformTargets(
  descriptor: BunBuddyDeploymentDescriptor,
): BaoRuntimeBunBuddyPlatformTargets {
  return {
    baoRuntime: true,
    kubernetesDistributions: [...descriptor.workload.providers],
  };
}

/**
 * Build a workload registry accessor from a validated payload.
 *
 * @param loaded - Validated workload registry.
 * @returns Read-only accessor API.
 */
export function buildBunBuddyWorkloadRegistry(
  loaded: BunBuddyDeploymentRegistry,
): BunBuddyWorkloadRegistry {
  const getDescriptor = (bunbuddy: string): BunBuddyDeploymentDescriptor | null => {
    if (!Object.hasOwn(loaded.bunbuddies, bunbuddy)) {
      return null;
    }
    return loaded.bunbuddies[bunbuddy as keyof typeof loaded.bunbuddies];
  };

  return {
    getConfig: () => loaded,
    getDescriptor,
    getRequiredDescriptor: (bunbuddy: string) => {
      const descriptor = getDescriptor(bunbuddy);
      if (!descriptor) {
        throw new Error(
          `BunBuddy workload registry violation: missing deployment descriptor for "${bunbuddy}".`,
        );
      }
      return descriptor;
    },
    getPlatformTargets: (bunbuddy: string) => {
      const descriptor = getDescriptor(bunbuddy);
      return descriptor ? resolveDescriptorPlatformTargets(descriptor) : null;
    },
    getRequiredPlatformTargets: (bunbuddy: string) => {
      const descriptor = getDescriptor(bunbuddy);
      if (!descriptor) {
        throw new Error(
          `BunBuddy workload registry violation: missing platform targets for "${bunbuddy}".`,
        );
      }
      return resolveDescriptorPlatformTargets(descriptor);
    },
    getSupportedKubernetesDistributions: () => {
      const distributions = new Set<string>();
      for (const descriptor of Object.values(loaded.bunbuddies)) {
        const workload: { providers: string[] } = (
          descriptor as { workload: { providers: string[] } }
        ).workload;
        for (const distribution of workload.providers) {
          distributions.add(distribution);
        }
      }
      return [
        ...distributions,
      ] as BaoRuntimeBunBuddyPlatformTargets["kubernetesDistributions"][number][];
    },
  };
}

/**
 * Assert that a checked-in workload registry payload matches the canonical schema.
 *
 * @param payload - Embedded JSON payload.
 * @param label - Friendly registry label for errors.
 * @returns Validated registry payload.
 */
export function validateBunBuddyWorkloadRegistry(
  payload: unknown,
  label: string,
): BunBuddyDeploymentRegistry {
  const errors = formatSchemaErrors(BunBuddyDeploymentRegistrySchema, payload, label);
  if (errors.length > 0) {
    throw new Error(`${label} failed schema validation:\n- ${errors.join("\n- ")}`);
  }
  if (!isBunBuddyDeploymentRegistry(payload)) {
    throw new Error(`${label} failed schema validation:\n- unexpected workload registry shape`);
  }
  return payload;
}
