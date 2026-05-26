/**
 * @baohaus/bao-install-handlers-bao/sidebar
 *
 * Canonical install-target handler for the `sidebar` contribution surface.
 * Lifted from `bao-runtime/.../handlers/sidebar.handler.ts` during Cycle 1
 * #59 phase 2.
 */

import { BaoSidebarTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import type { SidebarRegistration } from "@baohaus/contribution-registry-bao/sidebar";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import {
  ContributionSurfaceHandler,
  type ContributionSurfaceRegistryPort,
} from "./contribution-surface-handler.ts";

export interface SidebarTargetHandlerDependencies {
  readonly registry: ContributionSurfaceRegistryPort<SidebarRegistration>;
  readonly hostContext: BaoInstallTargetHandlerHostContext;
  readonly isValidRegistration: (value: unknown) => value is SidebarRegistration;
}

export function createSidebarTargetHandler(
  deps: SidebarTargetHandlerDependencies,
): BaoInstallTargetHandlerContract {
  return new ContributionSurfaceHandler<SidebarRegistration>(
    {
      kind: "sidebar",
      displayName: "Sidebar Registration",
      targetSchema: BaoSidebarTargetSchema,
      factoryExport: "createSidebarRegistrations",
      moduleFieldName: "sidebarModule",
      ecosystemSurface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      isValidRegistration: deps.isValidRegistration,
      registry: deps.registry,
    },
    deps.hostContext,
  );
}
