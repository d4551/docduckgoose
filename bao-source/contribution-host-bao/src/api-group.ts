/**
 * API-group contribution host — process-local singleton factory.
 *
 * Mounts a typed `ApiGroupRegistration` registry on top of the canonical
 * generic factory in `@baohaus/contribution-registry-bao/registry` with
 * the canonical compare order (`position` → `id`) plus a serviceId-keyed
 * snapshot partition the API Explorer renderer consumes.
 *
 * Service ids are dynamic (any connected runtime / registry / forge /
 * .bao AI Gateway service can declare its own), so the partition is a
 * `ReadonlyMap` rather than a literal record. Insertion order in the
 * snapshot matches first-seen order from the canonical compare-ordered
 * iteration.
 *
 * @packageDocumentation
 */

import type { ApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group";
import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";

function compareApiGroupRegistrations(a: ApiGroupRegistration, b: ApiGroupRegistration): number {
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
}

export interface ApiGroupHost {
  readonly register: (registration: ApiGroupRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly ApiGroupRegistration[];
  readonly snapshotByService: () => ReadonlyMap<string, readonly ApiGroupRegistration[]>;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

export function createApiGroupHost(): ApiGroupHost {
  const store = createContributionRegistry<ApiGroupRegistration>(compareApiGroupRegistrations);

  function snapshotByService(): ReadonlyMap<string, readonly ApiGroupRegistration[]> {
    const buckets = new Map<string, ApiGroupRegistration[]>();
    for (const reg of store.snapshot()) {
      const existing = buckets.get(reg.serviceId);
      if (existing) {
        existing.push(reg);
      } else {
        buckets.set(reg.serviceId, [reg]);
      }
    }
    const frozen = new Map<string, readonly ApiGroupRegistration[]>();
    for (const [serviceId, regs] of buckets) {
      frozen.set(serviceId, Object.freeze(regs));
    }
    return frozen;
  }

  return {
    register: store.register,
    unregister: store.unregister,
    unregisterByOwner: store.unregisterByOwner,
    snapshot: store.snapshot,
    snapshotByService,
    size: store.size,
    version: store.version,
    resetForTests: store.resetForTests,
  };
}
