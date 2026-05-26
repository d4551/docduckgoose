/**
 * @baohaus/bao-install-handlers-bao/api-group
 *
 * Canonical install-target handler for the `api-group` contribution
 * surface. Lifted from `bao-runtime/.../handlers/api-group.handler.ts`
 * during Cycle 1 #59 phase 2.
 */

import { BaoApiGroupTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import type { ApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import {
  ContributionSurfaceHandler,
  type ContributionSurfaceRegistryPort,
} from "./contribution-surface-handler.ts";

export interface ApiGroupTargetHandlerDependencies {
  readonly registry: ContributionSurfaceRegistryPort<ApiGroupRegistration>;
  readonly hostContext: BaoInstallTargetHandlerHostContext;
  readonly isValidRegistration: (value: unknown) => value is ApiGroupRegistration;
}

export function createApiGroupTargetHandler(
  deps: ApiGroupTargetHandlerDependencies,
): BaoInstallTargetHandlerContract {
  return new ContributionSurfaceHandler<ApiGroupRegistration>(
    {
      kind: "api-group",
      displayName: "API Group Registration",
      targetSchema: BaoApiGroupTargetSchema,
      factoryExport: "createApiGroupRegistrations",
      moduleFieldName: "apiGroupModule",
      ecosystemSurface: ECOSYSTEM_CONTRIBUTION_SURFACE.apiGroup,
      isValidRegistration: deps.isValidRegistration,
      registry: deps.registry,
    },
    deps.hostContext,
  );
}
