/**
 * @baohaus/bao-install-handlers-bao/topbar
 *
 * Canonical install-target handler for the `topbar` contribution surface.
 */

import { BaoTopbarTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import type { TopbarRegistration } from "@baohaus/contribution-registry-bao/topbar";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import {
  ContributionSurfaceHandler,
  type ContributionSurfaceRegistryPort,
} from "./contribution-surface-handler.ts";

export interface TopbarTargetHandlerDependencies {
  readonly registry: ContributionSurfaceRegistryPort<TopbarRegistration>;
  readonly hostContext: BaoInstallTargetHandlerHostContext;
  readonly isValidRegistration: (value: unknown) => value is TopbarRegistration;
}

export function createTopbarTargetHandler(
  deps: TopbarTargetHandlerDependencies,
): BaoInstallTargetHandlerContract {
  return new ContributionSurfaceHandler<TopbarRegistration>(
    {
      kind: "topbar",
      displayName: "Topbar Registration",
      targetSchema: BaoTopbarTargetSchema,
      factoryExport: "createTopbarRegistrations",
      moduleFieldName: "topbarModule",
      ecosystemSurface: ECOSYSTEM_CONTRIBUTION_SURFACE.topbar,
      isValidRegistration: deps.isValidRegistration,
      registry: deps.registry,
    },
    deps.hostContext,
  );
}
