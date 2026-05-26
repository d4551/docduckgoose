/**
 * @baohaus/bao-install-handlers-bao/asset-pack-registry
 *
 * Canonical process-local UI asset-pack contribution registry. Stores
 * the four UI/UX asset bundles `.bao` packages contribute through the
 * canonical install kinds — `theme-pack`, `design-tokens`,
 * `motion-preset`, `density-preset`.
 *
 * Lifted from `bao-runtime/src/domains/system/services/ui-asset-pack-registry.service.ts`
 * during Cycle 1 #59 phase 2. The bao-runtime path now re-exports from
 * this canonical surface so every Bao consumer (registry, bao-runtime,
 * forge, bao-ai-gateway, bao-desktop) sees a single source of truth for
 * installed UI assets — no per-app duplication of the same registry
 * shape.
 *
 * Re-uses the generic factory from `@baohaus/contribution-registry-bao/registry`
 * so lifecycle semantics (register/unregister/unregister-by-owner/
 * snapshot) match every other contribution surface.
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

export type {
  UiAssetPackColorScheme,
  UiAssetPackDensityLevel,
  UiAssetPackKind,
  UiAssetPackMotionProfile,
  UiAssetPackRegistration,
  UiAssetPackSnapshotByKind,
  UiAssetPackTokenCategory,
} from "@baohaus/contribution-registry-bao/ui-asset-pack";
export {
  UI_ASSET_PACK_COLOR_SCHEMES,
  UI_ASSET_PACK_DENSITY_LEVELS,
  UI_ASSET_PACK_KINDS,
  UI_ASSET_PACK_MOTION_PROFILES,
  UI_ASSET_PACK_TOKEN_CATEGORIES,
} from "@baohaus/contribution-registry-bao/ui-asset-pack";

const store = createContributionRegistry<UiAssetPackRegistration>(compareUiAssetPackRegistrations);

export const uiAssetPackRegistry: {
  readonly register: (registration: UiAssetPackRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly UiAssetPackRegistration[];
  readonly snapshotByKind: () => UiAssetPackSnapshotByKind;
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
} = {
  register: store.register,
  unregister: store.unregister,
  unregisterByOwner: store.unregisterByOwner,
  snapshot: store.snapshot,
  snapshotByKind: () => bucketUiAssetPacksByKind(store.snapshot()),
  size: store.size,
  version: store.version,
  resetForTests: store.resetForTests,
};
