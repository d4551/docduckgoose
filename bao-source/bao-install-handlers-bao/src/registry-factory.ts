/**
 * @baohaus/bao-install-handlers-bao/registry-factory
 *
 * Canonical install-handler-registry factory consumed by every consuming
 * app (registry, forge, .bao AI Gateway, and any future .bao app that mounts
 * the canonical contribution-surface + UI-fabric + generic-runtime handler
 * trio). Composition-root pattern: each consumer app's
 * `install-handler-registry.ts` is a single eager-const line that calls
 * this factory with its `appId` + per-app contribution-surfaces +
 * driver-registry dir. No per-app function indirection.
 *
 * Registers all 12 canonical handlers in fixed order:
 *   - 6 contribution-surface handlers (sidebar / settings-tab /
 *     palette-entry-group / api-group / tile-group / topbar), each wired against the
 *     consumer's per-surface contribution host + the canonical
 *     `@baohaus/contribution-registry-bao/<surface>-validate` validator.
 *   - 4 UI-fabric handlers (theme-pack / design-tokens / motion-preset /
 *     density-preset).
 *   - 2 generic-runtime handlers (htmx-extension / ui-component-kit).
 *
 * Exported via the canonical subpath
 * `@baohaus/bao-install-handlers-bao/registry-factory`.
 */

import type {
  BaoInstallHandlerLoggerPort,
  BaoInstallTargetHandlerHostContext,
} from "@baohaus/bao-sdk/install-target-handler";
import { BaoTargetHandlerRegistry } from "@baohaus/bao-sdk/target-handler-registry";
import type { ApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group";
import { isApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group-validate";
import type { PaletteEntryGroupRegistration } from "@baohaus/contribution-registry-bao/palette-entry-group";
import { isPaletteEntryGroupRegistration } from "@baohaus/contribution-registry-bao/palette-entry-group-validate";
import type { SettingsTabRegistration } from "@baohaus/contribution-registry-bao/settings-tab";
import { isSettingsTabRegistration } from "@baohaus/contribution-registry-bao/settings-tab-validate";
import type { SidebarRegistration } from "@baohaus/contribution-registry-bao/sidebar";
import { isSidebarRegistration } from "@baohaus/contribution-registry-bao/sidebar-validate";
import type { TileGroupRegistration } from "@baohaus/contribution-registry-bao/tile-group";
import { isTileGroupRegistration } from "@baohaus/contribution-registry-bao/tile-group-validate";
import type { TopbarRegistration } from "@baohaus/contribution-registry-bao/topbar";
import { isTopbarRegistration } from "@baohaus/contribution-registry-bao/topbar-validate";
import { createApiGroupTargetHandler } from "./api-group.ts";
import type { ContributionSurfaceRegistryPort } from "./contribution-surface-handler.ts";
import { DensityPresetTargetHandler } from "./density-preset.ts";
import { DesignTokensTargetHandler } from "./design-tokens.ts";
import { HtmxExtensionTargetHandler } from "./htmx-extension.ts";
import { MotionPresetTargetHandler } from "./motion-preset.ts";
import { createPaletteEntryGroupTargetHandler } from "./palette-entry-group.ts";
import { createSettingsTabTargetHandler } from "./settings-tab.ts";
import { createSidebarTargetHandler } from "./sidebar.ts";
import { ThemePackTargetHandler } from "./theme-pack.ts";
import { createTileGroupTargetHandler } from "./tile-group.ts";
import { createTopbarTargetHandler } from "./topbar.ts";
import { NativeMobileShellTargetHandler } from "./native-mobile-shell.ts";
import { UiComponentKitTargetHandler } from "./ui-component-kit.ts";

/**
 * Canonical `.bao` extension module base path. Identical across every
 * Bao app (registry, forge, bao-ai-gateway) — `.bao` install convention,
 * not per-app config. Lifted here to remove the literal from per-app
 * composition-root bindings.
 */
export const INSTALL_HANDLER_EXTENSION_BASE_PATH = "/install/extensions" as const;

/**
 * Bao-app discriminator literal-union. Constrains the `appId` passed to
 * {@link buildInstallHandlerRegistry} so future apps register here, not
 * via free-form strings.
 */
export const BAO_APP_ID = {
  registry: "registry",
  forge: "forge",
  baoAiGateway: "bao-ai-gateway",
  baoRuntime: "bao-runtime",
  gooseWord: "goose-word",
} as const;

export type BaoAppId = (typeof BAO_APP_ID)[keyof typeof BAO_APP_ID];

/**
 * Per-app contribution-surface singleton bundle. Every consumer app
 * constructs this from `@baohaus/contribution-host-bao/<surface>` factories
 * and passes the resulting record to {@link buildInstallHandlerRegistry}.
 */
export interface InstallHandlerRegistryContributionSurfaces {
  readonly sidebar: ContributionSurfaceRegistryPort<SidebarRegistration>;
  readonly settingsTab: ContributionSurfaceRegistryPort<SettingsTabRegistration>;
  readonly paletteEntryGroup: ContributionSurfaceRegistryPort<PaletteEntryGroupRegistration>;
  readonly apiGroup: ContributionSurfaceRegistryPort<ApiGroupRegistration>;
  readonly tileGroup: ContributionSurfaceRegistryPort<TileGroupRegistration>;
  readonly topbar: ContributionSurfaceRegistryPort<TopbarRegistration>;
}

/**
 * Build options for {@link buildInstallHandlerRegistry}. The
 * composition-root binding in each consumer app supplies its `appId`
 * literal + per-surface contribution-host singletons + the on-disk
 * directory in which it persists hardware-driver registry state. The
 * `.bao` extension-module URL prefix is platform-canonical
 * ({@link INSTALL_HANDLER_EXTENSION_BASE_PATH}) and is NOT a per-app
 * input.
 */
export interface BuildInstallHandlerRegistryOptions {
  readonly appId: BaoAppId;
  readonly surfaces: InstallHandlerRegistryContributionSurfaces;
  readonly driverRegistryDir: string;
  readonly logger: BaoInstallHandlerLoggerPort;
  readonly failOnImportError?: boolean;
}

function buildHostContext(
  options: BuildInstallHandlerRegistryOptions,
): BaoInstallTargetHandlerHostContext {
  const failOnImportError = options.failOnImportError === true;
  return {
    resolveExtensionModuleImportSpecifier: (moduleId: string) =>
      `${INSTALL_HANDLER_EXTENSION_BASE_PATH}/${moduleId}`,
    resolveHtmlRouteExtensionModuleSpecifier: (moduleId: string) =>
      `${INSTALL_HANDLER_EXTENSION_BASE_PATH}/${moduleId}`,
    resolveDriverRegistryDir: () => options.driverRegistryDir,
    resolveFailOnImportError: () => failOnImportError,
    logger: options.logger,
  };
}

/**
 * Construct a fully-populated {@link BaoTargetHandlerRegistry} wired with
 * the 12 canonical install-target handlers (6 contribution-surface +
 * 4 UI-fabric + 2 generic-runtime). Idempotency / per-app memoization is
 * the consumer's responsibility — the per-app wrapper modules keep the
 * `cachedRegistry` pattern.
 */
export function buildInstallHandlerRegistry(
  options: BuildInstallHandlerRegistryOptions,
): BaoTargetHandlerRegistry {
  const registry = new BaoTargetHandlerRegistry();
  const hostContext = buildHostContext(options);
  const { surfaces } = options;

  registry.register(
    createSidebarTargetHandler({
      registry: surfaces.sidebar,
      hostContext,
      isValidRegistration: isSidebarRegistration,
    }),
  );
  registry.register(
    createSettingsTabTargetHandler({
      registry: surfaces.settingsTab,
      hostContext,
      isValidRegistration: isSettingsTabRegistration,
    }),
  );
  registry.register(
    createPaletteEntryGroupTargetHandler({
      registry: surfaces.paletteEntryGroup,
      hostContext,
      isValidRegistration: isPaletteEntryGroupRegistration,
    }),
  );
  registry.register(
    createApiGroupTargetHandler({
      registry: surfaces.apiGroup,
      hostContext,
      isValidRegistration: isApiGroupRegistration,
    }),
  );
  registry.register(
    createTileGroupTargetHandler({
      registry: surfaces.tileGroup,
      hostContext,
      isValidRegistration: isTileGroupRegistration,
    }),
  );
  registry.register(
    createTopbarTargetHandler({
      registry: surfaces.topbar,
      hostContext,
      isValidRegistration: isTopbarRegistration,
    }),
  );

  registry.register(new ThemePackTargetHandler(options.logger));
  registry.register(new DesignTokensTargetHandler(options.logger));
  registry.register(new MotionPresetTargetHandler(options.logger));
  registry.register(new DensityPresetTargetHandler(options.logger));
  registry.register(new NativeMobileShellTargetHandler(options.logger));
  registry.register(new HtmxExtensionTargetHandler(hostContext));
  registry.register(new UiComponentKitTargetHandler(hostContext));

  return registry;
}
