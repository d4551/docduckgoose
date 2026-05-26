/**
 * @baohaus/bao-install-handlers-bao/tile-group
 *
 * Canonical install-target handler for the `tile-group` contribution
 * surface. Lifted from `bao-runtime/.../handlers/tile-group.handler.ts`
 * during Cycle 1 #59 phase 2.
 */

import { BaoTileGroupTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import type { TileGroupRegistration } from "@baohaus/contribution-registry-bao/tile-group";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import {
  ContributionSurfaceHandler,
  type ContributionSurfaceRegistryPort,
} from "./contribution-surface-handler.ts";

export interface TileGroupTargetHandlerDependencies {
  readonly registry: ContributionSurfaceRegistryPort<TileGroupRegistration>;
  readonly hostContext: BaoInstallTargetHandlerHostContext;
  readonly isValidRegistration: (value: unknown) => value is TileGroupRegistration;
}

export function createTileGroupTargetHandler(
  deps: TileGroupTargetHandlerDependencies,
): BaoInstallTargetHandlerContract {
  return new ContributionSurfaceHandler<TileGroupRegistration>(
    {
      kind: "tile-group",
      displayName: "Tile Group Registration",
      targetSchema: BaoTileGroupTargetSchema,
      factoryExport: "createTileGroupRegistrations",
      moduleFieldName: "tileGroupModule",
      ecosystemSurface: ECOSYSTEM_CONTRIBUTION_SURFACE.tileGroup,
      isValidRegistration: deps.isValidRegistration,
      registry: deps.registry,
    },
    deps.hostContext,
  );
}
