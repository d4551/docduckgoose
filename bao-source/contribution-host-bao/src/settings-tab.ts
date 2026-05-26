/**
 * Settings-tab contribution host — process-local singleton factory.
 *
 * Mounts a typed `SettingsTabRegistration` registry on top of the
 * canonical generic factory in
 * `@baohaus/contribution-registry-bao/registry`, carries the
 * platform-canonical compare order (`section.order` → `position` →
 * `id`), and exposes a section-keyed snapshot helper aligned to
 * {@link SETTINGS_TAB_SECTIONS}.
 *
 * Each call to {@link createSettingsTabHost} returns an INDEPENDENT
 * process-local store so apps that scope settings tabs per tenant
 * hold one host per scope.
 *
 * @packageDocumentation
 */

import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";
import {
  SETTINGS_TAB_SECTIONS,
  type SettingsTabRegistration,
  type SettingsTabSectionId,
} from "@baohaus/contribution-registry-bao/settings-tab";

function compareSettingsTabRegistrations(
  a: SettingsTabRegistration,
  b: SettingsTabRegistration,
): number {
  const sectionDelta =
    SETTINGS_TAB_SECTIONS[a.section].order - SETTINGS_TAB_SECTIONS[b.section].order;
  if (sectionDelta !== 0) {
    return sectionDelta;
  }
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
}

export interface SettingsTabHost {
  readonly register: (registration: SettingsTabRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly SettingsTabRegistration[];
  readonly snapshotBySection: () => Readonly<
    Record<SettingsTabSectionId, readonly SettingsTabRegistration[]>
  >;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

export function createSettingsTabHost(): SettingsTabHost {
  const store = createContributionRegistry<SettingsTabRegistration>(
    compareSettingsTabRegistrations,
  );

  function snapshotBySection(): Readonly<
    Record<SettingsTabSectionId, readonly SettingsTabRegistration[]>
  > {
    const buckets: Record<SettingsTabSectionId, SettingsTabRegistration[]> = {
      general: [],
      ecosystem: [],
      apis: [],
      features: [],
      instructions: [],
      agents: [],
      shortcuts: [],
    };
    for (const reg of store.snapshot()) {
      buckets[reg.section].push(reg);
    }
    return Object.freeze({
      general: Object.freeze(buckets.general),
      ecosystem: Object.freeze(buckets.ecosystem),
      apis: Object.freeze(buckets.apis),
      features: Object.freeze(buckets.features),
      instructions: Object.freeze(buckets.instructions),
      agents: Object.freeze(buckets.agents),
      shortcuts: Object.freeze(buckets.shortcuts),
    });
  }

  return {
    register: store.register,
    unregister: store.unregister,
    unregisterByOwner: store.unregisterByOwner,
    snapshot: store.snapshot,
    snapshotBySection,
    size: store.size,
    version: store.version,
    resetForTests: store.resetForTests,
  };
}
