/**
 * @baohaus/bao-install-handlers-bao/density-preset
 *
 * Canonical install-target handler for the `density-preset` kind.
 * Lifted from `bao-runtime/.../density-preset.handler.ts` during
 * Cycle 1 #59 phase 2.
 */

import { BaoDensityPresetTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerResult,
  BaoInstallTargetRecord,
} from "@baohaus/bao-sdk/install-target-handler";
import {
  targetHandlerFailure,
  targetHandlerSuccess,
} from "@baohaus/bao-sdk/install-target-handler";
import type { TSchema } from "@baohaus/baobox/elysia";
import { ecosystemEventBus } from "@baohaus/ecosystem-events-bao/service";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  ECOSYSTEM_CONTRIBUTION_SURFACE,
} from "@baohaus/ecosystem-events-bao/types";
import {
  UI_ASSET_PACK_DENSITY_LEVELS,
  type UiAssetPackDensityLevel,
  uiAssetPackRegistry,
} from "./asset-pack-registry.ts";
import type { BaoInstallHandlerLoggerPort } from "./logger-port.ts";

function deriveOwnerId(target: BaoInstallTargetRecord): string {
  const presetId = typeof target.presetId === "string" ? target.presetId : "";
  const explicit = typeof target.target === "string" ? target.target : "";
  return explicit.length > 0 ? explicit : presetId;
}

function isDensity(value: BaoInstallTargetRecord[string]): value is UiAssetPackDensityLevel {
  return (
    typeof value === "string" && (UI_ASSET_PACK_DENSITY_LEVELS as readonly string[]).includes(value)
  );
}

export class DensityPresetTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = "density-preset" as const;
  readonly displayName = "Density Preset";
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoDensityPresetTargetSchema;

  private readonly logger: BaoInstallHandlerLoggerPort;

  constructor(logger: BaoInstallHandlerLoggerPort) {
    this.logger = logger;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    return typeof target.presetId === "string" ? target.presetId : String(target.target ?? "");
  }

  install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "density-preset") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for DensityPresetTargetHandler",
          retryable: this.retryable,
          phase: "install",
        }),
      );
    }
    const presetId = typeof target.presetId === "string" ? target.presetId : "";
    const density = isDensity(target.density) ? target.density : null;
    const stylesheet = typeof target.stylesheet === "string" ? target.stylesheet : "";
    const ownerId = deriveOwnerId(target);

    if (presetId.length === 0 || stylesheet.length === 0 || density === null) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `density-preset target "${String(target.target)}" missing required fields after schema parse`,
          retryable: false,
          phase: "install",
        }),
      );
    }

    uiAssetPackRegistry.unregisterByOwner(ownerId);
    const registerResult = uiAssetPackRegistry.register({
      id: `density-preset:${presetId}`,
      extensionId: ownerId,
      kind: "density-preset",
      presetId,
      density,
      stylesheet,
    });
    if (!registerResult.ok) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `density-preset registration "${registerResult.error.id}" collided with extension "${registerResult.error.currentOwner}"`,
          retryable: false,
          phase: "install",
          details: { ownerId, presetId },
        }),
      );
    }

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: ownerId,
    });
    this.logger.info("Density-preset installed", { ownerId, presetId, density });

    return Promise.resolve(
      targetHandlerSuccess({
        message: `density-preset "${presetId}" installed`,
        details: { ownerId, presetId, density },
        requiresRestart: false,
      }),
    );
  }

  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "density-preset") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for DensityPresetTargetHandler",
          retryable: this.retryable,
          phase: "uninstall",
        }),
      );
    }
    const ownerId = deriveOwnerId(target);
    const removed = uiAssetPackRegistry.unregisterByOwner(ownerId);
    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled,
      extensionId: ownerId,
    });
    this.logger.info("Density-preset uninstalled", { ownerId, removed: String(removed) });
    return Promise.resolve(
      targetHandlerSuccess({
        message: `density-preset "${ownerId}" uninstalled (${removed} registration(s) removed)`,
        requiresRestart: false,
      }),
    );
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "density-preset") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for DensityPresetTargetHandler",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (typeof target.presetId !== "string" || target.presetId.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'density-preset target missing required "presetId" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (!isDensity(target.density)) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `density-preset target has invalid density "${String(target.density)}"`,
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `density-preset target "${String(target.target)}" is valid`,
      }),
    );
  }
}
