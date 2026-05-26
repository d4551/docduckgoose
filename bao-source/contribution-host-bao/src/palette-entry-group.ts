/**
 * Palette-entry-group contribution host — process-local singleton factory.
 *
 * Mounts a typed `PaletteEntryGroupRegistration` registry on top of the
 * canonical generic factory in
 * `@baohaus/contribution-registry-bao/registry` with the canonical
 * compare order (`position` → `id`) consumed by the canonical command-
 * palette renderer in
 * `@baohaus/happydumpling/server/partials/command-palette`.
 *
 * @packageDocumentation
 */

import type { PaletteEntryGroupRegistration } from "@baohaus/contribution-registry-bao/palette-entry-group";
import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";

function comparePaletteEntryGroupRegistrations(
  a: PaletteEntryGroupRegistration,
  b: PaletteEntryGroupRegistration,
): number {
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.id.localeCompare(b.id);
}

export interface PaletteEntryGroupHost {
  readonly register: (registration: PaletteEntryGroupRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly PaletteEntryGroupRegistration[];
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

export function createPaletteEntryGroupHost(): PaletteEntryGroupHost {
  const store = createContributionRegistry<PaletteEntryGroupRegistration>(
    comparePaletteEntryGroupRegistrations,
  );
  return {
    register: store.register,
    unregister: store.unregister,
    unregisterByOwner: store.unregisterByOwner,
    snapshot: store.snapshot,
    size: store.size,
    version: store.version,
    resetForTests: store.resetForTests,
  };
}
