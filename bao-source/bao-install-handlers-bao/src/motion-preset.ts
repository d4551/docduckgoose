/**
 * @baohaus/bao-install-handlers-bao/motion-preset
 *
 * Canonical install-target handler for the `motion-preset` kind.
 * Lifted from `bao-runtime/.../motion-preset.handler.ts` during
 * Cycle 1 #59 phase 2.
 */

import { BaoMotionPresetTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
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
  UI_ASSET_PACK_MOTION_PROFILES,
  type UiAssetPackMotionProfile,
  uiAssetPackRegistry,
} from "./asset-pack-registry.ts";
import type { BaoInstallHandlerLoggerPort } from "./logger-port.ts";

function deriveOwnerId(target: BaoInstallTargetRecord): string {
  const presetId = typeof target.presetId === "string" ? target.presetId : "";
  const explicit = typeof target.target === "string" ? target.target : "";
  return explicit.length > 0 ? explicit : presetId;
}

function isProfile(value: BaoInstallTargetRecord[string]): value is UiAssetPackMotionProfile {
  return (
    typeof value === "string" &&
    (UI_ASSET_PACK_MOTION_PROFILES as readonly string[]).includes(value)
  );
}

export class MotionPresetTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = "motion-preset" as const;
  readonly displayName = "Motion Preset";
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoMotionPresetTargetSchema;

  private readonly logger: BaoInstallHandlerLoggerPort;

  constructor(logger: BaoInstallHandlerLoggerPort) {
    this.logger = logger;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    return typeof target.presetId === "string" ? target.presetId : String(target.target ?? "");
  }

  install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "motion-preset") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for MotionPresetTargetHandler",
          retryable: this.retryable,
          phase: "install",
        }),
      );
    }
    const presetId = typeof target.presetId === "string" ? target.presetId : "";
    const profile = isProfile(target.profile) ? target.profile : null;
    const stylesheet = typeof target.stylesheet === "string" ? target.stylesheet : "";
    const respectsReducedMotion = target.respectsReducedMotion === true;
    const ownerId = deriveOwnerId(target);

    if (presetId.length === 0 || stylesheet.length === 0 || profile === null) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `motion-preset target "${String(target.target)}" missing required fields after schema parse`,
          retryable: false,
          phase: "install",
        }),
      );
    }

    if (!respectsReducedMotion) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `motion-preset "${presetId}" rejected: respectsReducedMotion must be true (Apple HIG / Bao motion-governance invariant)`,
          retryable: false,
          phase: "install",
        }),
      );
    }

    uiAssetPackRegistry.unregisterByOwner(ownerId);
    const registerResult = uiAssetPackRegistry.register({
      id: `motion-preset:${presetId}`,
      extensionId: ownerId,
      kind: "motion-preset",
      presetId,
      profile,
      respectsReducedMotion: true,
      stylesheet,
    });
    if (!registerResult.ok) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `motion-preset registration "${registerResult.error.id}" collided with extension "${registerResult.error.currentOwner}"`,
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
    this.logger.info("Motion-preset installed", { ownerId, presetId, profile });

    return Promise.resolve(
      targetHandlerSuccess({
        message: `motion-preset "${presetId}" installed`,
        details: { ownerId, presetId, profile },
        requiresRestart: false,
      }),
    );
  }

  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "motion-preset") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for MotionPresetTargetHandler",
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
    this.logger.info("Motion-preset uninstalled", { ownerId, removed: String(removed) });
    return Promise.resolve(
      targetHandlerSuccess({
        message: `motion-preset "${ownerId}" uninstalled (${removed} registration(s) removed)`,
        requiresRestart: false,
      }),
    );
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "motion-preset") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for MotionPresetTargetHandler",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (typeof target.presetId !== "string" || target.presetId.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'motion-preset target missing required "presetId" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (!isProfile(target.profile)) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `motion-preset target has invalid profile "${String(target.profile)}"`,
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (target.respectsReducedMotion !== true) {
      return Promise.resolve(
        targetHandlerFailure({
          message: "motion-preset target must declare respectsReducedMotion: true",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `motion-preset target "${String(target.target)}" is valid`,
      }),
    );
  }
}
