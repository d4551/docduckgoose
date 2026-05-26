/**
 * Topbar contribution host — process-local singleton factory.
 *
 * Mounts a typed `TopbarRegistration` registry on top of the canonical
 * generic factory in `@baohaus/contribution-registry-bao/registry`,
 * carries the canonical compare order (`slot.order` → `position` →
 * `id`), and exposes a slot-keyed snapshot helper aligned to
 * {@link TOPBAR_SLOTS}.
 *
 * @packageDocumentation
 */

import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";
import {
  TOPBAR_SLOTS,
  type TopbarRegistration,
  type TopbarSlotId,
} from "@baohaus/contribution-registry-bao/topbar";

function compareTopbarRegistrations(a: TopbarRegistration, b: TopbarRegistration): number {
  const slotDelta = TOPBAR_SLOTS[a.slot].order - TOPBAR_SLOTS[b.slot].order;
  if (slotDelta !== 0) {
    return slotDelta;
  }
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
}

export interface TopbarHost {
  readonly register: (registration: TopbarRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly TopbarRegistration[];
  readonly snapshotBySlot: () => Readonly<Record<TopbarSlotId, readonly TopbarRegistration[]>>;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

export function createTopbarHost(): TopbarHost {
  const store = createContributionRegistry<TopbarRegistration>(compareTopbarRegistrations);

  function snapshotBySlot(): Readonly<Record<TopbarSlotId, readonly TopbarRegistration[]>> {
    const buckets: Record<TopbarSlotId, TopbarRegistration[]> = {
      start: [],
      center: [],
      end: [],
    };
    for (const reg of store.snapshot()) {
      buckets[reg.slot].push(reg);
    }
    return Object.freeze({
      start: Object.freeze(buckets.start),
      center: Object.freeze(buckets.center),
      end: Object.freeze(buckets.end),
    });
  }

  return {
    register: store.register,
    unregister: store.unregister,
    unregisterByOwner: store.unregisterByOwner,
    snapshot: store.snapshot,
    snapshotBySlot,
    size: store.size,
    version: store.version,
    resetForTests: store.resetForTests,
  };
}
