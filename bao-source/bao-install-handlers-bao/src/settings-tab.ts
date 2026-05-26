/**
 * @baohaus/bao-install-handlers-bao/settings-tab
 *
 * Canonical install-target handler for the `settings-tab` contribution
 * surface. Lifted from `bao-runtime/.../handlers/settings-tab.handler.ts`
 * during Cycle 1 #59 phase 2.
 */

import { BaoSettingsTabTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import type { SettingsTabRegistration } from "@baohaus/contribution-registry-bao/settings-tab";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import {
  ContributionSurfaceHandler,
  type ContributionSurfaceRegistryPort,
} from "./contribution-surface-handler.ts";

export interface SettingsTabTargetHandlerDependencies {
  readonly registry: ContributionSurfaceRegistryPort<SettingsTabRegistration>;
  readonly hostContext: BaoInstallTargetHandlerHostContext;
  readonly isValidRegistration: (value: unknown) => value is SettingsTabRegistration;
}

export function createSettingsTabTargetHandler(
  deps: SettingsTabTargetHandlerDependencies,
): BaoInstallTargetHandlerContract {
  return new ContributionSurfaceHandler<SettingsTabRegistration>(
    {
      kind: "settings-tab",
      displayName: "Settings Tab Registration",
      targetSchema: BaoSettingsTabTargetSchema,
      factoryExport: "createSettingsTabRegistrations",
      moduleFieldName: "settingsTabModule",
      ecosystemSurface: ECOSYSTEM_CONTRIBUTION_SURFACE.settingsTab,
      isValidRegistration: deps.isValidRegistration,
      registry: deps.registry,
    },
    deps.hostContext,
  );
}
