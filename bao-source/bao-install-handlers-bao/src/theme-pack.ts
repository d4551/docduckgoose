/**
 * @baohaus/bao-install-handlers-bao/theme-pack
 *
 * Canonical install-target handler for the `theme-pack` kind. Lifted
 * from `bao-runtime/src/domains/packages/services/bao-install/handlers/theme-pack.handler.ts`
 * during Cycle 1 #59 phase 2.
 */

import { BaoThemePackTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
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
  UI_ASSET_PACK_COLOR_SCHEMES,
  type UiAssetPackColorScheme,
  uiAssetPackRegistry,
} from "./asset-pack-registry.ts";
import type { BaoInstallHandlerLoggerPort } from "./logger-port.ts";

function deriveOwnerId(target: BaoInstallTargetRecord): string {
  const themeId = typeof target.themeId === "string" ? target.themeId : "";
  const explicit = typeof target.target === "string" ? target.target : "";
  return explicit.length > 0 ? explicit : themeId;
}

function isColorScheme(value: BaoInstallTargetRecord[string]): value is UiAssetPackColorScheme {
  return (
    typeof value === "string" && (UI_ASSET_PACK_COLOR_SCHEMES as readonly string[]).includes(value)
  );
}

export class ThemePackTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = "theme-pack" as const;
  readonly displayName = "Theme Pack";
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoThemePackTargetSchema;

  private readonly logger: BaoInstallHandlerLoggerPort;

  constructor(logger: BaoInstallHandlerLoggerPort) {
    this.logger = logger;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    return typeof target.themeId === "string" ? target.themeId : String(target.target ?? "");
  }

  install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "theme-pack") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for ThemePackTargetHandler",
          retryable: this.retryable,
          phase: "install",
        }),
      );
    }
    const themeId = typeof target.themeId === "string" ? target.themeId : "";
    const colorScheme = isColorScheme(target.colorScheme) ? target.colorScheme : null;
    const daisyUiVersionRange =
      typeof target.daisyUiVersionRange === "string" ? target.daisyUiVersionRange : "";
    const stylesheet = typeof target.stylesheet === "string" ? target.stylesheet : "";
    const ownerId = deriveOwnerId(target);

    if (themeId.length === 0 || stylesheet.length === 0 || colorScheme === null) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `theme-pack target "${String(target.target)}" missing required fields after schema parse`,
          retryable: false,
          phase: "install",
        }),
      );
    }

    uiAssetPackRegistry.unregisterByOwner(ownerId);
    const registerResult = uiAssetPackRegistry.register({
      id: `theme-pack:${themeId}`,
      extensionId: ownerId,
      kind: "theme-pack",
      themeId,
      colorScheme,
      daisyUiVersionRange,
      stylesheet,
    });
    if (!registerResult.ok) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `theme-pack registration "${registerResult.error.id}" collided with extension "${registerResult.error.currentOwner}"`,
          retryable: false,
          phase: "install",
          details: { ownerId, themeId },
        }),
      );
    }

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: ownerId,
    });
    this.logger.info("Theme-pack installed", { ownerId, themeId, colorScheme });

    return Promise.resolve(
      targetHandlerSuccess({
        message: `theme-pack "${themeId}" installed`,
        details: { ownerId, themeId, colorScheme },
        requiresRestart: false,
      }),
    );
  }

  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "theme-pack") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for ThemePackTargetHandler",
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
    this.logger.info("Theme-pack uninstalled", { ownerId, removed: String(removed) });
    return Promise.resolve(
      targetHandlerSuccess({
        message: `theme-pack "${ownerId}" uninstalled (${removed} registration(s) removed)`,
        requiresRestart: false,
      }),
    );
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "theme-pack") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for ThemePackTargetHandler",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (typeof target.themeId !== "string" || target.themeId.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'theme-pack target missing required "themeId" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (!isColorScheme(target.colorScheme)) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `theme-pack target has invalid colorScheme "${String(target.colorScheme)}"`,
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (typeof target.stylesheet !== "string" || target.stylesheet.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'theme-pack target missing required "stylesheet" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `theme-pack target "${String(target.target)}" is valid`,
      }),
    );
  }
}
