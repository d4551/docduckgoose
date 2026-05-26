/**
 * Canonical lifecycle and ordering policy for checked-in `.bao` manifests.
 *
 * The target-kind lifecycle table is the single source of truth used by
 * generators and manifest synchronization tooling.
 *
 * @packageDocumentation
 */

import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";

/**
 * Lifecycle policy applied to a manifest or target kind.
 */
interface BaoManifestLifecyclePolicy {
  hotInstallable: boolean;
  restartRequired: boolean;
}

type BaoManifestTarget = BaoManifest["targets"][number];
type BaoManifestTargetKind = BaoManifestTarget["kind"];

/**
 * Canonical lifecycle policy by target kind.
 */
const BAO_TARGET_KIND_LIFECYCLE_POLICIES = {
  "ai-model": { hotInstallable: false, restartRequired: true },
  "baodown-flow": { hotInstallable: true, restartRequired: false },
  "baodown-node": { hotInstallable: true, restartRequired: false },
  "bao-package": { hotInstallable: false, restartRequired: true },
  "bunbuddy-contract": { hotInstallable: true, restartRequired: false },
  "bun-plugin": { hotInstallable: true, restartRequired: false },
  "config-overlay": { hotInstallable: true, restartRequired: false },
  "better-auth-extension": { hotInstallable: true, restartRequired: false },
  "elysia-plugin": { hotInstallable: true, restartRequired: false },
  "flatbuffer-schema": { hotInstallable: false, restartRequired: true },
  "hardware-driver": { hotInstallable: false, restartRequired: true },
  "htmx-extension": { hotInstallable: true, restartRequired: false },
  "mcp-provider": { hotInstallable: true, restartRequired: false },
  "oci-image": { hotInstallable: false, restartRequired: true },
  "bao-runtime-workload": { hotInstallable: false, restartRequired: true },
  "prisma-extension": { hotInstallable: true, restartRequired: false },
  sidebar: { hotInstallable: true, restartRequired: false },
  topbar: { hotInstallable: true, restartRequired: false },
  nav: { hotInstallable: true, restartRequired: false },
  "settings-tab": { hotInstallable: true, restartRequired: false },
  "palette-entry-group": { hotInstallable: true, restartRequired: false },
  "api-group": { hotInstallable: true, restartRequired: false },
  "tile-group": { hotInstallable: true, restartRequired: false },
  "ui-component-kit": { hotInstallable: true, restartRequired: false },
  "usd-scene": { hotInstallable: true, restartRequired: false },
  "theme-pack": { hotInstallable: true, restartRequired: false },
  "design-tokens": { hotInstallable: true, restartRequired: false },
  "motion-preset": { hotInstallable: true, restartRequired: false },
  "density-preset": { hotInstallable: true, restartRequired: false },
} as const satisfies Record<BaoManifestTargetKind, BaoManifestLifecyclePolicy>;

const BAO_POSITIONAL_ORDER_TARGET_KINDS = new Set<BaoManifestTargetKind>([
  "better-auth-extension",
  "elysia-plugin",
  "htmx-extension",
  "prisma-extension",
]);

/**
 * Resolve the lifecycle policy for a manifest from its target kinds.
 *
 * @param targets - Manifest targets.
 * @returns Canonical lifecycle policy.
 */
function resolveBaoManifestLifecyclePolicy(
  targets: readonly BaoManifestTarget[],
): BaoManifestLifecyclePolicy {
  const policies = targets.map((target) => BAO_TARGET_KIND_LIFECYCLE_POLICIES[target.kind]);
  const hotInstallable = policies.every((policy) => policy.hotInstallable);
  return {
    hotInstallable,
    restartRequired: policies.some((policy) => policy.restartRequired) || !hotInstallable,
  };
}

function stripBaoTargetOrdering(target: BaoManifestTarget): BaoManifestTarget {
  const { before: _before, after: _after, ...rest } = target;
  return rest;
}

/**
 * Normalize target ordering to an explicit sequential `after` chain.
 *
 * The manifest target array remains human-readable, while runtime resolvers can
 * rely on explicit ordering metadata instead of implicit array position alone.
 *
 * @param targets - Ordered target list.
 * @returns Targets with explicit sequential ordering.
 */
function applySequentialBaoTargetOrdering(
  targets: readonly BaoManifestTarget[],
): BaoManifestTarget[] {
  if (
    targets.length <= 1 ||
    targets.some((target) => !BAO_POSITIONAL_ORDER_TARGET_KINDS.has(target.kind))
  ) {
    return targets.map(stripBaoTargetOrdering);
  }

  return targets.map((target, index) => {
    const baseTarget = stripBaoTargetOrdering(target);
    if (index === 0) {
      return baseTarget;
    }
    const previous = targets[index - 1];
    if (!previous) {
      return baseTarget;
    }
    return {
      ...baseTarget,
      after: [previous.target],
    };
  });
}

/**
 * Normalize lifecycle and ordering policy fields on a manifest.
 *
 * @param manifest - Existing manifest.
 * @returns Manifest with canonical lifecycle and target ordering policy fields.
 */
export function normalizeBaoManifestPolicyFields(manifest: BaoManifest): BaoManifest {
  const targets = applySequentialBaoTargetOrdering(manifest.targets);
  return {
    ...manifest,
    metadata: {
      ...manifest.metadata,
      lifecycle: resolveBaoManifestLifecyclePolicy(targets),
    },
    targets,
  };
}
