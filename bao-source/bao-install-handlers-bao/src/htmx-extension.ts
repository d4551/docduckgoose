/**
 * @baohaus/bao-install-handlers-bao/htmx-extension
 *
 * Canonical install-target handler for the `htmx-extension` kind.
 * Lifted from `bao-runtime/.../handlers/htmx-extension.handler.ts` during
 * Cycle 1 #59 phase 2.
 *
 * HTMX-extension adds HTML-route surfaces; it does NOT contribute to the
 * sidebar / settings-tab / palette / api-group / tile-group contribution
 * registries. Therefore the install path does not publish an
 * `ecosystem.contribution-changed` event — the canonical SidebarHandler
 * (and friends) publish events from their own install paths when the
 * same `.bao` archive contributes those surfaces alongside the HTMX
 * extension.
 *
 * Hot-reload of the Elysia app + module-host deregistration are exposed
 * as ports on `BaoInstallTargetHandlerHostContext`; consumers without
 * hot-reload support omit the field and the handler returns a
 * `requiresRestart: true` success.
 */

import { BaoHtmxExtensionTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallHandlerLoggerPort,
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
  BaoInstallTargetHandlerResult,
  BaoInstallTargetRecord,
} from "@baohaus/bao-sdk/install-target-handler";
import {
  isTargetHandlerSuccess,
  targetHandlerFailure,
  targetHandlerSuccess,
} from "@baohaus/bao-sdk/install-target-handler";
import type { UnknownRecord } from "@baohaus/bao-types/common";
import { getErrorMessage, toResultAsync } from "@baohaus/bao-utils/async-result";
import type { TSchema } from "@baohaus/baobox/elysia";

const HTMX_EXTENSION_KIND = "htmx-extension";

const hasHtmlRouteExtensionExport = (moduleRecord: UnknownRecord): boolean => {
  if (typeof moduleRecord.createHtmlRouteExtensions === "function") {
    return true;
  }
  if (Array.isArray(moduleRecord.extensions)) {
    return true;
  }
  if (Array.isArray(moduleRecord.default)) {
    return true;
  }
  return typeof moduleRecord.default === "function";
};

const isRecordValue = (value: unknown): value is UnknownRecord => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

export class HtmxExtensionTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = HTMX_EXTENSION_KIND;
  readonly displayName = "HTMX Extension";
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoHtmxExtensionTargetSchema;

  private readonly hostContext: BaoInstallTargetHandlerHostContext;

  constructor(hostContext: BaoInstallTargetHandlerHostContext) {
    this.hostContext = hostContext;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    return typeof target.extension === "string" ? target.extension : String(target.target ?? "");
  }

  async install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    const logger = this.resolveLogger();
    if (target.kind !== HTMX_EXTENSION_KIND) {
      return targetHandlerFailure({
        message: "Invalid target kind for HtmxExtensionTargetHandler",
        retryable: this.retryable,
        phase: "install",
      });
    }
    const validation = await this.validate(target);
    if (!isTargetHandlerSuccess(validation)) {
      return validation;
    }
    const extension = String(target.extension ?? "");
    logger.info("Installing HTMX extension — rebuilding HTML routes", {
      extension,
      target: String(target.target ?? ""),
    });
    return this.invokeRebuild({
      extension,
      phase: "install",
      successMessage: `HTMX extension "${extension}" installed and hot-loaded`,
      restartMessage: `HTMX extension "${extension}" registered (hot-reload failed, restart required)`,
    });
  }

  async uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    const logger = this.resolveLogger();
    if (target.kind !== HTMX_EXTENSION_KIND) {
      return targetHandlerFailure({
        message: "Invalid target kind for HtmxExtensionTargetHandler",
        retryable: this.retryable,
        phase: "uninstall",
      });
    }
    const extension = String(target.extension ?? "");
    const targetId = String(target.target ?? "");
    logger.info("Removing HTMX extension module during uninstall", {
      extension,
      target: targetId,
    });
    if (this.hostContext.moduleHost !== undefined && targetId.length > 0) {
      this.hostContext.moduleHost.unregisterModule(targetId);
    }
    return this.invokeRebuild({
      extension,
      phase: "uninstall",
      successMessage: `HTMX extension "${extension}" unloaded via hot-reload`,
      restartMessage: `HTMX extension "${extension}" deregistered (hot-reload failed, restart required)`,
    });
  }

  async validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== HTMX_EXTENSION_KIND) {
      return targetHandlerFailure({
        message: "Invalid target kind for HtmxExtensionTargetHandler",
        retryable: false,
        phase: "validate",
      });
    }
    const extensionModuleId = String(target.extension ?? "").trim();
    if (extensionModuleId.length === 0) {
      return targetHandlerFailure({
        message: "htmx-extension target is missing extension identifier",
        retryable: false,
        phase: "validate",
      });
    }
    const specifier = this.hostContext.resolveHtmlRouteExtensionModuleSpecifier(extensionModuleId);
    const importResult = await toResultAsync(import(specifier));
    if (!importResult.ok) {
      return targetHandlerFailure({
        message: `htmx-extension "${extensionModuleId}" could not be imported as an HTML route extension module`,
        retryable: this.hostContext.resolveFailOnImportError(this.kind),
        phase: "validate",
        details: { error: getErrorMessage(importResult.error) },
      });
    }
    if (!isRecordValue(importResult.value)) {
      return targetHandlerFailure({
        message: `htmx-extension "${extensionModuleId}" did not resolve to a module object`,
        retryable: false,
        phase: "validate",
      });
    }
    if (!hasHtmlRouteExtensionExport(importResult.value)) {
      return targetHandlerFailure({
        message: `htmx-extension "${extensionModuleId}" must export createHtmlRouteExtensions, an extensions array, or a default extension factory`,
        retryable: false,
        phase: "validate",
      });
    }
    return targetHandlerSuccess({
      message: `htmx-extension target "${String(target.target)}" is valid`,
    });
  }

  private resolveLogger(): BaoInstallHandlerLoggerPort {
    return this.hostContext.logger;
  }

  private async invokeRebuild(input: {
    readonly extension: string;
    readonly phase: "install" | "uninstall";
    readonly successMessage: string;
    readonly restartMessage: string;
  }): Promise<BaoInstallTargetHandlerResult> {
    const rebuild = this.hostContext.rebuildAndReloadElysiaApp;
    if (rebuild === undefined) {
      return targetHandlerSuccess({
        message: input.restartMessage,
        requiresRestart: true,
      });
    }
    const reloadResult = await toResultAsync(rebuild());
    if (!reloadResult.ok) {
      this.resolveLogger().warn(
        `Elysia hot-reload failed after HTMX extension ${input.phase} — restart required`,
        {
          extension: input.extension,
          error: getErrorMessage(reloadResult.error),
        },
      );
      return targetHandlerSuccess({
        message: input.restartMessage,
        requiresRestart: true,
      });
    }
    return targetHandlerSuccess({ message: input.successMessage });
  }
}
