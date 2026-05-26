/**
 * @baohaus/bao-install-handlers-bao/native-mobile-shell
 *
 * Canonical install-target handler for the `native-mobile-shell` kind.
 */

import { BaoNativeMobileShellTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
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
  NATIVE_MOBILE_SHELL_PLATFORMS,
  type NativeMobileShellPlatform,
} from "./native-mobile-shell-registry.ts";
import { nativeMobileShellRegistry } from "./native-mobile-shell-registry.ts";
import type { BaoInstallHandlerLoggerPort } from "./logger-port.ts";

function deriveOwnerId(target: BaoInstallTargetRecord): string {
  const explicit = typeof target.target === "string" ? target.target : "";
  return explicit.length > 0 ? explicit : "native-mobile-shell";
}

function isPlatform(value: BaoInstallTargetRecord[string]): value is NativeMobileShellPlatform {
  return (
    typeof value === "string" &&
    (NATIVE_MOBILE_SHELL_PLATFORMS as readonly string[]).includes(value)
  );
}

function readPort(value: BaoInstallTargetRecord[string]): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 65535) {
    return null;
  }
  return value;
}

export class NativeMobileShellTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = "native-mobile-shell" as const;
  readonly displayName = "Native Mobile Shell";
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoNativeMobileShellTargetSchema;

  private readonly logger: BaoInstallHandlerLoggerPort;

  constructor(logger: BaoInstallHandlerLoggerPort) {
    this.logger = logger;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    const platform = isPlatform(target.platform) ? target.platform : "";
    const shellTarget = typeof target.target === "string" ? target.target : "";
    return shellTarget.length > 0 ? shellTarget : platform;
  }

  install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "native-mobile-shell") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for NativeMobileShellTargetHandler",
          retryable: this.retryable,
          phase: "install",
        }),
      );
    }
    const platform = isPlatform(target.platform) ? target.platform : null;
    const serverMode = target.serverMode === "embedded" ? "embedded" : null;
    const loopbackHost = typeof target.loopbackHost === "string" ? target.loopbackHost : "";
    const loopbackPort = readPort(target.loopbackPort);
    const healthPath = typeof target.healthPath === "string" ? target.healthPath : "";
    const iconSetRef = typeof target.iconSetRef === "string" ? target.iconSetRef : "";
    const binaryAssetRef =
      typeof target.binaryAssetRef === "string" ? target.binaryAssetRef : undefined;
    const ownerId = deriveOwnerId(target);

    if (
      platform === null ||
      serverMode === null ||
      loopbackHost.length === 0 ||
      loopbackPort === null ||
      healthPath.length === 0 ||
      iconSetRef.length === 0
    ) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `native-mobile-shell target "${String(target.target)}" missing required fields after schema parse`,
          retryable: false,
          phase: "install",
        }),
      );
    }
    if (platform === "android" && (binaryAssetRef === undefined || binaryAssetRef.length === 0)) {
      return Promise.resolve(
        targetHandlerFailure({
          message: "android native-mobile-shell requires binaryAssetRef",
          retryable: false,
          phase: "install",
        }),
      );
    }

    nativeMobileShellRegistry.unregisterByOwner(ownerId);
    const registerResult = nativeMobileShellRegistry.register({
      id: `native-mobile-shell:${platform}:${ownerId}`,
      extensionId: ownerId,
      kind: "native-mobile-shell",
      platform,
      serverMode,
      loopbackHost,
      loopbackPort,
      healthPath,
      dataDirEnvKey: "GOOSE_WORD_DATA_DIR",
      iconSetRef,
      binaryAssetRef,
      offlineCapable: true,
    });
    if (!registerResult.ok) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `native-mobile-shell registration "${registerResult.error.id}" collided with extension "${registerResult.error.currentOwner}"`,
          retryable: false,
          phase: "install",
          details: { ownerId, platform },
        }),
      );
    }

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.nativeMobileShell,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: ownerId,
    });
    this.logger.info("Native mobile shell installed", {
      ownerId,
      platform,
      loopbackPort: String(loopbackPort),
    });

    return Promise.resolve(
      targetHandlerSuccess({
        message: `native-mobile-shell "${platform}" installed`,
        details: { ownerId, platform, loopbackPort },
        requiresRestart: false,
      }),
    );
  }

  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "native-mobile-shell") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for NativeMobileShellTargetHandler",
          retryable: this.retryable,
          phase: "uninstall",
        }),
      );
    }
    const ownerId = deriveOwnerId(target);
    const removed = nativeMobileShellRegistry.unregisterByOwner(ownerId);
    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.nativeMobileShell,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled,
      extensionId: ownerId,
    });
    this.logger.info("Native mobile shell uninstalled", { ownerId, removed: String(removed) });
    return Promise.resolve(
      targetHandlerSuccess({
        message: `native-mobile-shell "${ownerId}" uninstalled (${removed} registration(s) removed)`,
        requiresRestart: false,
      }),
    );
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "native-mobile-shell") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for NativeMobileShellTargetHandler",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (!isPlatform(target.platform)) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'native-mobile-shell target has invalid "platform" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (target.serverMode !== "embedded") {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'native-mobile-shell v1 requires serverMode "embedded"',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (target.platform === "android" && typeof target.binaryAssetRef !== "string") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "android native-mobile-shell requires binaryAssetRef",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `native-mobile-shell target "${String(target.target)}" is valid`,
      }),
    );
  }
}
