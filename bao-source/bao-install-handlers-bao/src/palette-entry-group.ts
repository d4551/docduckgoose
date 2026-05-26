/**
 * @baohaus/bao-install-handlers-bao/palette-entry-group
 *
 * Canonical install-target handler for the `palette-entry-group` contribution
 * surface. Lifted from `bao-runtime/.../handlers/palette-entry-group.handler.ts`
 * during Cycle 1 #59 phase 2.
 */

import { BaoPaletteEntryGroupTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import type { PaletteEntryGroupRegistration } from "@baohaus/contribution-registry-bao/palette-entry-group";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import {
  ContributionSurfaceHandler,
  type ContributionSurfaceRegistryPort,
} from "./contribution-surface-handler.ts";

export interface PaletteEntryGroupTargetHandlerDependencies {
  readonly registry: ContributionSurfaceRegistryPort<PaletteEntryGroupRegistration>;
  readonly hostContext: BaoInstallTargetHandlerHostContext;
  readonly isValidRegistration: (value: unknown) => value is PaletteEntryGroupRegistration;
}

export function createPaletteEntryGroupTargetHandler(
  deps: PaletteEntryGroupTargetHandlerDependencies,
): BaoInstallTargetHandlerContract {
  return new ContributionSurfaceHandler<PaletteEntryGroupRegistration>(
    {
      kind: "palette-entry-group",
      displayName: "Palette Entry Group Registration",
      targetSchema: BaoPaletteEntryGroupTargetSchema,
      factoryExport: "createPaletteEntryGroupRegistrations",
      moduleFieldName: "paletteEntryGroupModule",
      ecosystemSurface: ECOSYSTEM_CONTRIBUTION_SURFACE.paletteEntryGroup,
      isValidRegistration: deps.isValidRegistration,
      registry: deps.registry,
    },
    deps.hostContext,
  );
}
