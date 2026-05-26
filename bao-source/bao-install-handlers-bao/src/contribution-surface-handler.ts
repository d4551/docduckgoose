/**
 * @baohaus/bao-install-handlers-bao/contribution-surface-handler (internal)
 *
 * Canonical contribution-surface install handler. ONE generic implementation
 * that covers the 6 contribution surfaces (sidebar, nav, settings-tab,
 * palette-entry-group, api-group, tile-group) — each per-surface module
 * (`./sidebar`, `./nav`, etc.) is a thin entrypoint that instantiates this
 * class with a surface-specific config object.
 *
 * The shape of every contribution-surface install is identical:
 *
 *   1. Resolve an extension-module import specifier from the target's
 *      `<surface>Module` field (via the injected host port).
 *   2. Dynamically `import()` the resolved specifier.
 *   3. Read the named factory export from the module.
 *   4. Invoke the factory to get an array of contribution registrations.
 *   5. Filter registrations through the per-surface validator.
 *   6. Unregister any existing entries owned by this extension.
 *   7. Register each new entry; on per-entry collision, transactionally
 *      roll back the entire batch.
 *   8. Publish an `ecosystem.contribution-changed` event on success.
 *
 * Re-writing this shape in 6 near-identical files violates the
 * "no duplicated wire shapes" hard ban. The per-surface fields that DO
 * vary (kind literal, schema, factory export name, module field, validator,
 * registry singleton, ecosystem surface enum) live in the config object
 * each per-surface entrypoint passes to this class.
 *
 * Internal — no subpath export. Per-surface modules consume it directly;
 * external apps never reach into this surface (they consume the per-surface
 * entrypoints instead).
 */

import type {
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
  BaoInstallTargetHandlerResult,
  BaoInstallTargetRecord,
} from "@baohaus/bao-sdk/install-target-handler";
import {
  targetHandlerFailure,
  targetHandlerSuccess,
} from "@baohaus/bao-sdk/install-target-handler";
import { getErrorMessage, toResultAsync } from "@baohaus/bao-utils/async-result";
import type { TSchema } from "@baohaus/baobox/elysia";
import type { RegisterResult } from "@baohaus/contribution-registry-bao/registry";
import { ecosystemEventBus } from "@baohaus/ecosystem-events-bao/service";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  type EcosystemContributionSurface,
} from "@baohaus/ecosystem-events-bao/types";

/**
 * Per-surface registry surface this handler consumes. The 6 contribution
 * registries in `@baohaus/contribution-host-bao/<surface>` all expose this
 * minimal contract — the handler uses only these two methods, so the
 * config field is typed accordingly.
 */
interface ContributionSurfaceRegistryPort<Reg> {
  readonly register: (registration: Reg) => RegisterResult;
  readonly unregisterByOwner: (extensionId: string) => number;
}

/** Per-surface configuration the canonical handler consumes. */
interface ContributionSurfaceHandlerConfig<Reg> {
  readonly kind: string;
  readonly displayName: string;
  readonly targetSchema: TSchema;
  readonly factoryExport: string;
  readonly moduleFieldName: string;
  readonly ecosystemSurface: EcosystemContributionSurface;
  readonly isValidRegistration: (value: unknown) => value is Reg;
  readonly registry: ContributionSurfaceRegistryPort<Reg>;
}

const isRecordValue = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

const stringField = (target: BaoInstallTargetRecord, field: string): string => {
  const value = target[field];
  return typeof value === "string" ? value : "";
};

class ContributionSurfaceHandler<Reg extends { readonly id: string; readonly extensionId: string }>
  implements BaoInstallTargetHandlerContract
{
  readonly kind: string;
  readonly displayName: string;
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema;

  private readonly config: ContributionSurfaceHandlerConfig<Reg>;
  private readonly hostContext: BaoInstallTargetHandlerHostContext;

  constructor(
    config: ContributionSurfaceHandlerConfig<Reg>,
    hostContext: BaoInstallTargetHandlerHostContext,
  ) {
    this.config = config;
    this.hostContext = hostContext;
    this.kind = config.kind;
    this.displayName = config.displayName;
    this.targetSchema = config.targetSchema;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    const moduleValue = target[this.config.moduleFieldName];
    return typeof moduleValue === "string" ? moduleValue : String(target.target ?? "");
  }

  async install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    const logger = this.hostContext.logger;
    if (target.kind !== this.config.kind) {
      return targetHandlerFailure({
        message: `Invalid target kind for ${this.config.displayName}`,
        retryable: this.retryable,
        phase: "install",
      });
    }
    const moduleSpecifier = stringField(target, this.config.moduleFieldName);
    const ownerId = this.deriveOwnerId(target, moduleSpecifier);
    if (moduleSpecifier.length === 0) {
      return targetHandlerFailure({
        message: `${this.config.kind} target missing required "${this.config.moduleFieldName}" field`,
        retryable: false,
        phase: "install",
      });
    }
    const loadResult = await this.loadRegistrationsFromModule(moduleSpecifier);
    if ("failure" in loadResult) {
      logger.error(`${this.config.displayName} registration failed`, {
        module: moduleSpecifier,
        error: loadResult.failure.message,
      });
      return loadResult.failure;
    }
    this.config.registry.unregisterByOwner(ownerId);
    let registered = 0;
    for (const raw of loadResult) {
      const registration: Reg = { ...raw, extensionId: ownerId };
      const result = this.config.registry.register(registration);
      if (!result.ok) {
        this.config.registry.unregisterByOwner(ownerId);
        const message = `Duplicate ${this.config.kind} registration id "${result.error.id}" already owned by "${result.error.currentOwner}"`;
        logger.error(`${this.config.displayName} entry rejected; owner rollback completed`, {
          module: moduleSpecifier,
          id: registration.id,
          ownerId,
          error: message,
        });
        return targetHandlerFailure({
          message: `${this.config.kind} registration "${registration.id}" was rejected: ${message}`,
          retryable: false,
          phase: "install",
          details: { ownerId, module: moduleSpecifier, registrationId: registration.id },
        });
      }
      registered += 1;
    }
    ecosystemEventBus.publish({
      surface: this.config.ecosystemSurface,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: ownerId,
    });
    logger.info(`${this.config.displayName} contributions registered`, {
      module: moduleSpecifier,
      ownerId,
      registered: String(registered),
    });
    return targetHandlerSuccess({
      message: `${this.config.kind} contributions registered from "${moduleSpecifier}"`,
      details: { ownerId, registered },
    });
  }

  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    const logger = this.hostContext.logger;
    if (target.kind !== this.config.kind) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `Invalid target kind for ${this.config.displayName}`,
          retryable: this.retryable,
          phase: "uninstall",
        }),
      );
    }
    const moduleSpecifier = stringField(target, this.config.moduleFieldName);
    const ownerId = this.deriveOwnerId(target, moduleSpecifier);
    const removed = this.config.registry.unregisterByOwner(ownerId);
    ecosystemEventBus.publish({
      surface: this.config.ecosystemSurface,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled,
      extensionId: ownerId,
    });
    logger.info(`${this.config.displayName} contributions unregistered`, {
      ownerId,
      removed: String(removed),
    });
    return Promise.resolve(
      targetHandlerSuccess({
        message: `${this.config.kind} contributions for "${ownerId}" unregistered (${removed} removed)`,
      }),
    );
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== this.config.kind) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `Invalid target kind for ${this.config.displayName}`,
          retryable: false,
          phase: "validate",
        }),
      );
    }
    const moduleSpecifier = stringField(target, this.config.moduleFieldName);
    if (moduleSpecifier.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `${this.config.kind} target missing required "${this.config.moduleFieldName}" field`,
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `${this.config.kind} target "${String(target.target)}" is valid`,
      }),
    );
  }

  private deriveOwnerId(target: BaoInstallTargetRecord, moduleSpecifier: string): string {
    const descriptorOwner = stringField(target, "extensionId");
    if (descriptorOwner.length > 0) {
      return descriptorOwner;
    }
    const explicit = stringField(target, "target");
    return explicit.length > 0 ? explicit : moduleSpecifier;
  }

  private async loadRegistrationsFromModule(
    moduleSpecifier: string,
  ): Promise<readonly Reg[] | { failure: BaoInstallTargetHandlerResult }> {
    const importSpecifier = this.hostContext.resolveExtensionModuleImportSpecifier(moduleSpecifier);
    const importResult = await toResultAsync(import(importSpecifier));
    if (!importResult.ok) {
      return {
        failure: targetHandlerFailure({
          message: `${this.config.displayName} module "${moduleSpecifier}" failed to import`,
          retryable: false,
          phase: "install",
          details: {
            moduleId: moduleSpecifier,
            error: getErrorMessage(importResult.error),
          },
        }),
      };
    }
    const mod = importResult.value;
    if (!isRecordValue(mod)) {
      return {
        failure: targetHandlerFailure({
          message: `${this.config.displayName} module "${moduleSpecifier}" did not resolve to a module object`,
          retryable: false,
          phase: "install",
        }),
      };
    }
    const factory = mod[this.config.factoryExport];
    if (typeof factory !== "function") {
      return {
        failure: targetHandlerFailure({
          message: `${this.config.displayName} module "${moduleSpecifier}" missing "${this.config.factoryExport}" factory export`,
          retryable: false,
          phase: "install",
        }),
      };
    }
    const factoryResult = await toResultAsync(Promise.resolve(factory()));
    if (!factoryResult.ok) {
      return {
        failure: targetHandlerFailure({
          message: `${this.config.displayName} module "${moduleSpecifier}" factory threw: ${getErrorMessage(factoryResult.error)}`,
          retryable: false,
          phase: "install",
        }),
      };
    }
    const factoryValue = factoryResult.value;
    if (!Array.isArray(factoryValue)) {
      return {
        failure: targetHandlerFailure({
          message: `${this.config.displayName} module "${moduleSpecifier}" factory did not return an array`,
          retryable: false,
          phase: "install",
        }),
      };
    }
    const filtered: Reg[] = [];
    for (const entry of factoryValue) {
      if (this.config.isValidRegistration(entry)) {
        filtered.push(entry);
      }
    }
    if (filtered.length === 0) {
      return {
        failure: targetHandlerFailure({
          message: `${this.config.displayName} module "${moduleSpecifier}" produced no valid registrations`,
          retryable: false,
          phase: "install",
        }),
      };
    }
    return filtered;
  }
}

export type { ContributionSurfaceHandlerConfig, ContributionSurfaceRegistryPort };
export { ContributionSurfaceHandler };
