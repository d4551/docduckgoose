/**
 * Sidebar contribution host — process-local singleton factory.
 *
 * Mounts a typed `SidebarRegistration` registry on top of the canonical
 * generic factory in `@baohaus/contribution-registry-bao/registry`,
 * carries the bao-platform-canonical compare order
 * (`section.order` → `position` → `id`), and exposes a section-keyed
 * snapshot helper aligned to {@link SIDEBAR_SECTIONS}.
 *
 * Each call to {@link createSidebarHost} returns an INDEPENDENT
 * process-local store so apps that host more than one sidebar (e.g.
 * a tenant-scoped admin dashboard rendering one sidebar per active
 * organization) hold one host per scope. Cross-process visibility is
 * NOT provided here — callers publish to
 * `@baohaus/ecosystem-events-bao/service` after a successful local
 * mutation; the cross-process bridge is a separate, additive layer.
 *
 * The snapshot-by-section literal record below is checked against the
 * `SidebarSectionId` literal-union at compile time. Adding a section to
 * `SIDEBAR_SECTIONS` upstream is a deliberate cross-package PR that
 * forces a coordinated update here — TypeScript fails the build with
 * "missing property" otherwise. This is the structural guarantee that
 * the sidebar taxonomy stays in lock-step across the ecosystem.
 *
 * @packageDocumentation
 */

import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";
import {
  SIDEBAR_SECTIONS,
  type SidebarRegistration,
  type SidebarSectionId,
} from "@baohaus/contribution-registry-bao/sidebar";

/** Canonical compare order for the sidebar surface. */
function compareSidebarRegistrations(a: SidebarRegistration, b: SidebarRegistration): number {
  const sectionDelta = SIDEBAR_SECTIONS[a.section].order - SIDEBAR_SECTIONS[b.section].order;
  if (sectionDelta !== 0) {
    return sectionDelta;
  }
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
}

/**
 * Public surface of a sidebar contribution host. Mirrors the
 * `ContributionRegistry<SidebarRegistration>` shape plus the
 * platform-canonical {@link snapshotBySection} partition helper consumed
 * by every consumer app's sidebar renderer.
 */
export interface SidebarHost {
  readonly register: (registration: SidebarRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly SidebarRegistration[];
  readonly snapshotBySection: () => Readonly<
    Record<SidebarSectionId, readonly SidebarRegistration[]>
  >;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

/**
 * Build a fresh sidebar host. Each call returns an independent
 * process-local store. Callers that want one host per app keep the
 * returned reference at module scope.
 */
export function createSidebarHost(): SidebarHost {
  const store = createContributionRegistry<SidebarRegistration>(compareSidebarRegistrations);

  function snapshotBySection(): Readonly<Record<SidebarSectionId, readonly SidebarRegistration[]>> {
    const buckets: Record<SidebarSectionId, SidebarRegistration[]> = {
      overview: [],
      operations: [],
      runtime: [],
      automation: [],
      imaging: [],
      spatial: [],
      intelligence: [],
      hardware: [],
      commerce: [],
      clinical: [],
      develop: [],
      system: [],
    };
    for (const reg of store.snapshot()) {
      buckets[reg.section].push(reg);
    }
    return Object.freeze({
      overview: Object.freeze(buckets.overview),
      operations: Object.freeze(buckets.operations),
      runtime: Object.freeze(buckets.runtime),
      automation: Object.freeze(buckets.automation),
      imaging: Object.freeze(buckets.imaging),
      spatial: Object.freeze(buckets.spatial),
      intelligence: Object.freeze(buckets.intelligence),
      hardware: Object.freeze(buckets.hardware),
      commerce: Object.freeze(buckets.commerce),
      clinical: Object.freeze(buckets.clinical),
      develop: Object.freeze(buckets.develop),
      system: Object.freeze(buckets.system),
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
