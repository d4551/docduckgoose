/**
 * @baohaus/bao-install-handlers-bao/design-tokens
 *
 * Canonical install-target handler for the `design-tokens` kind.
 * Lifted from `bao-runtime/.../design-tokens.handler.ts` during
 * Cycle 1 #59 phase 2.
 */

import { BaoDesignTokensTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
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
  UI_ASSET_PACK_TOKEN_CATEGORIES,
  type UiAssetPackTokenCategory,
  uiAssetPackRegistry,
} from "./asset-pack-registry.ts";
import type { BaoInstallHandlerLoggerPort } from "./logger-port.ts";

function deriveOwnerId(target: BaoInstallTargetRecord): string {
  const tokenSetId = typeof target.tokenSetId === "string" ? target.tokenSetId : "";
  const explicit = typeof target.target === "string" ? target.target : "";
  return explicit.length > 0 ? explicit : tokenSetId;
}

function isTokenCategory(value: BaoInstallTargetRecord[string]): value is UiAssetPackTokenCategory {
  return (
    typeof value === "string" &&
    (UI_ASSET_PACK_TOKEN_CATEGORIES as readonly string[]).includes(value)
  );
}

function narrowCategories(
  value: BaoInstallTargetRecord[string],
): readonly UiAssetPackTokenCategory[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const out: UiAssetPackTokenCategory[] = [];
  for (const entry of value) {
    if (!isTokenCategory(entry)) {
      return null;
    }
    out.push(entry);
  }
  return out;
}

export class DesignTokensTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = "design-tokens" as const;
  readonly displayName = "Design Tokens";
  readonly hotInstallable = true;
  readonly retryable = false;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoDesignTokensTargetSchema;

  private readonly logger: BaoInstallHandlerLoggerPort;

  constructor(logger: BaoInstallHandlerLoggerPort) {
    this.logger = logger;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    return typeof target.tokenSetId === "string" ? target.tokenSetId : String(target.target ?? "");
  }

  install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "design-tokens") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for DesignTokensTargetHandler",
          retryable: this.retryable,
          phase: "install",
        }),
      );
    }
    const tokenSetId = typeof target.tokenSetId === "string" ? target.tokenSetId : "";
    const stylesheet = typeof target.stylesheet === "string" ? target.stylesheet : "";
    const categories = narrowCategories(target.categories);
    const ownerId = deriveOwnerId(target);

    if (
      tokenSetId.length === 0 ||
      stylesheet.length === 0 ||
      categories === null ||
      categories.length === 0
    ) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `design-tokens target "${String(target.target)}" missing required fields after schema parse`,
          retryable: false,
          phase: "install",
        }),
      );
    }

    uiAssetPackRegistry.unregisterByOwner(ownerId);
    const registerResult = uiAssetPackRegistry.register({
      id: `design-tokens:${tokenSetId}`,
      extensionId: ownerId,
      kind: "design-tokens",
      tokenSetId,
      categories,
      stylesheet,
    });
    if (!registerResult.ok) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `design-tokens registration "${registerResult.error.id}" collided with extension "${registerResult.error.currentOwner}"`,
          retryable: false,
          phase: "install",
          details: { ownerId, tokenSetId },
        }),
      );
    }

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.uiAssetPack,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: ownerId,
    });
    this.logger.info("Design-tokens installed", {
      ownerId,
      tokenSetId,
      categoryCount: String(categories.length),
    });

    return Promise.resolve(
      targetHandlerSuccess({
        message: `design-tokens "${tokenSetId}" installed`,
        details: { ownerId, tokenSetId, categoryCount: categories.length },
        requiresRestart: false,
      }),
    );
  }

  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "design-tokens") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for DesignTokensTargetHandler",
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
    this.logger.info("Design-tokens uninstalled", { ownerId, removed: String(removed) });
    return Promise.resolve(
      targetHandlerSuccess({
        message: `design-tokens "${ownerId}" uninstalled (${removed} registration(s) removed)`,
        requiresRestart: false,
      }),
    );
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== "design-tokens") {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for DesignTokensTargetHandler",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (typeof target.tokenSetId !== "string" || target.tokenSetId.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'design-tokens target missing required "tokenSetId" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (narrowCategories(target.categories) === null) {
      return Promise.resolve(
        targetHandlerFailure({
          message: 'design-tokens target has invalid "categories" field',
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `design-tokens target "${String(target.target)}" is valid`,
      }),
    );
  }
}
