/**
 * UI asset-pack contribution host.
 *
 * @packageDocumentation
 */

import {
  createContributionRegistry,
  type RegisterResult,
} from "@baohaus/contribution-registry-bao/registry";
import {
  bucketUiAssetPacksByKind,
  compareUiAssetPackRegistrations,
  type UiAssetPackRegistration,
  type UiAssetPackSnapshotByKind,
} from "@baohaus/contribution-registry-bao/ui-asset-pack";

export type { UiAssetPackSnapshotByKind } from "@baohaus/contribution-registry-bao/ui-asset-pack";

export interface UiAssetPackHost {
  readonly register: (registration: UiAssetPackRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly UiAssetPackRegistration[];
  readonly snapshotByKind: () => UiAssetPackSnapshotByKind;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
}

export function createUiAssetPackHost(): UiAssetPackHost {
  const store = createContributionRegistry<UiAssetPackRegistration>(
    compareUiAssetPackRegistrations,
  );
  return {
    register: store.register,
    unregister: store.unregister,
    unregisterByOwner: store.unregisterByOwner,
    snapshot: store.snapshot,
    snapshotByKind: () => bucketUiAssetPacksByKind(store.snapshot()),
    size: store.size,
    version: store.version,
    resetForTests: store.resetForTests,
  };
}
