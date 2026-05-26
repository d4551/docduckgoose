import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { isPlainObject, parseJsonSafe, readStringField } from "@baohaus/bao-json-safe";
import type { Elysia } from "elysia";
import { gooseWordBaoPluginsDir, gooseWordNativeShellBaoDir } from "../config/paths.ts";
import { PLUGIN_SETTINGS_TAB_ENTRYPOINT } from "../config/constants.ts";
import {
  clearGooseWordContributionSurfaces,
  gooseWordContributionSurfaces,
} from "./contribution-surfaces.ts";
import {
  isEnterpriseTenancyHotLoadAllowed,
  isHotLoadState,
  isTenancyTier,
} from "@baohaus/contribution-registry-bao/enterprise-tenancy";
import { installNativeMobileShellFromPackage } from "./native-mobile-shell-mount.ts";
import { getGooseWordInstallHandlerRegistry } from "./install-handler-registry.ts";
import {
  clearPluginRoutes,
  createPluginRouteApp,
  registerPluginRouteApp,
} from "./plugin-route-registry.ts";
import { isPluginEnabled } from "../services/user-prefs.ts";

export interface InstalledPluginRow {
  readonly id: string;
  readonly version: string;
  readonly targets: readonly string[];
  readonly source: "installed" | "dev";
  readonly enabled: boolean;
}

type RouteHost = Elysia;

const hotImportPath = (modulePath: string): string => {
  const href = pathToFileURL(modulePath).href;
  const version = String(Math.trunc(statSync(modulePath).mtimeMs));
  return `${href}?hot=${version}`;
};

type PluginManifestRow = Omit<InstalledPluginRow, "source" | "enabled">;

const readGovernance = (dir: string): PluginManifestRow | null => {
  const path = join(dir, "bao-governance.json");
  if (!existsSync(path)) {
    return null;
  }
  const raw = readFileSync(path, "utf8");
  const parsed = parseJsonSafe(raw);
  if (parsed.ok === false || !isPlainObject(parsed.value)) {
    return null;
  }
  const root = parsed.value;
  let id = readStringField(root, "id") ?? "";
  let version = "0.0.0";
  const identity = Reflect.get(root, "identity");
  if (identity !== undefined && isPlainObject(identity)) {
    id = readStringField(identity, "id") ?? id;
    version = readStringField(identity, "packageVersion") ?? version;
  }
  const targetsValue = Reflect.get(root, "targets");
  const targets: string[] = [];
  if (Array.isArray(targetsValue)) {
    for (const item of targetsValue) {
      const target = item ?? null;
      if (isPlainObject(target)) {
        const kind = readStringField(target, "kind");
        if (kind !== undefined) {
          targets.push(kind);
        }
      }
    }
  }
  return { id: id.length > 0 ? id : "unknown", version, targets };
};

const listPluginsInDirectory = (
  rootDir: string,
  source: InstalledPluginRow["source"],
): readonly InstalledPluginRow[] => {
  if (!existsSync(rootDir)) {
    return [];
  }
  const rows: InstalledPluginRow[] = [];
  const scan = readdirSync(rootDir, { withFileTypes: true });
  for (const entry of scan) {
    if (!entry.isDirectory()) {
      continue;
    }
    const dir = join(rootDir, entry.name);
    const manifest = readGovernance(dir);
    if (manifest !== null) {
      rows.push({ ...manifest, source, enabled: isPluginEnabled(manifest.id) });
    }
  }
  return rows;
};

const devPluginsDir = (): string => join(import.meta.dir, "../../../goose-word-plugins");

export const listInstalledPlugins = (): readonly InstalledPluginRow[] => {
  ensurePluginDirectory();
  return [
    ...listPluginsInDirectory(gooseWordBaoPluginsDir, "installed"),
    ...listPluginsInDirectory(devPluginsDir(), "dev"),
  ].sort((a, b) => a.id.localeCompare(b.id));
};

export const ensurePluginDirectory = (): void => {
  mkdirSync(gooseWordBaoPluginsDir, { recursive: true });
};

const registerSettingsTabModule = async (
  packageDir: string,
  packageName: string,
): Promise<void> => {
  const modulePath = join(packageDir, PLUGIN_SETTINGS_TAB_ENTRYPOINT);
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(hotImportPath(modulePath));
  if (typeof mod.createSettingsTabRegistrations !== "function") {
    return;
  }
  const registrations = mod.createSettingsTabRegistrations();
  for (const registration of registrations) {
    gooseWordContributionSurfaces.settingsTab.register({
      ...registration,
      extensionId: registration.extensionId ?? packageName,
    });
  }
};

const registerDocumentTemplateModule = async (
  packageDir: string,
  packageName: string,
): Promise<void> => {
  const modulePath = join(packageDir, "dist/bao-extensions/document-template.js");
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(hotImportPath(modulePath));
  if (typeof mod.createDocumentTemplateRegistrations !== "function") {
    return;
  }
  const registrations = mod.createDocumentTemplateRegistrations();
  for (const registration of registrations) {
    gooseWordContributionSurfaces.documentTemplate.register({
      ...registration,
      extensionId: registration.extensionId ?? packageName,
    });
  }
};

const registerThemeModule = async (packageDir: string, packageName: string): Promise<void> => {
  const modulePath = join(packageDir, "dist/bao-extensions/theme.js");
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(hotImportPath(modulePath));
  if (typeof mod.createThemeRegistrations !== "function") {
    return;
  }
  const registrations = mod.createThemeRegistrations();
  for (const registration of registrations) {
    gooseWordContributionSurfaces.theme.register({
      ...registration,
      extensionId: registration.extensionId ?? packageName,
    });
  }
};

const registerEnterpriseContextModule = async (
  packageDir: string,
  packageName: string,
): Promise<void> => {
  const modulePath = join(packageDir, "dist/bao-extensions/enterprise-context.js");
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(hotImportPath(modulePath));
  if (typeof mod.createEnterpriseContextRegistrations !== "function") {
    return;
  }
  const registrations = mod.createEnterpriseContextRegistrations();
  for (const registration of registrations) {
    const tier = registration.type;
    const hotLoadState = registration.hotLoadState ?? "idle";
    if (!isTenancyTier(tier) || !isHotLoadState(hotLoadState)) {
      continue;
    }
    if (!isEnterpriseTenancyHotLoadAllowed(tier, hotLoadState)) {
      continue;
    }
    gooseWordContributionSurfaces.enterpriseContext.register({
      ...registration,
      extensionId: registration.extensionId ?? packageName,
    });
  }
};

const mountElysiaPluginModule = async (packageName: string, packageDir: string): Promise<void> => {
  const modulePath = join(packageDir, "dist/bao-extensions/elysia-plugin.js");
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(hotImportPath(modulePath));
  if (typeof mod.default === "function") {
    const pluginApp = createPluginRouteApp();
    mod.default(pluginApp);
    registerPluginRouteApp(packageName, pluginApp);
  }
};

export const mountPluginsFromDirectory = async (
  _app: RouteHost,
  rootDir: string,
): Promise<void> => {
  if (!existsSync(rootDir)) {
    return;
  }
  const names: string[] = [];
  const entries = readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      names.push(entry.name);
    }
  }
  for (const name of names) {
    const packageDir = join(rootDir, name);
    const stat = statSync(packageDir);
    if (!stat.isDirectory()) {
      continue;
    }
    const manifest = readGovernance(packageDir);
    if (manifest === null) {
      continue;
    }
    if (!isPluginEnabled(manifest.id)) {
      continue;
    }
    await registerSettingsTabModule(packageDir, manifest.id);
    await registerDocumentTemplateModule(packageDir, manifest.id);
    await registerThemeModule(packageDir, manifest.id);
    await registerEnterpriseContextModule(packageDir, manifest.id);
    if (manifest.targets.includes("elysia-plugin")) {
      await mountElysiaPluginModule(manifest.id, packageDir);
    }
    await installNativeMobileShellFromPackage(packageDir);
  }
};

export const rescanAndMount = async (app: RouteHost): Promise<readonly InstalledPluginRow[]> => {
  clearGooseWordContributionSurfaces();
  clearPluginRoutes();
  ensurePluginDirectory();
  getGooseWordInstallHandlerRegistry();
  await installNativeMobileShellFromPackage(gooseWordNativeShellBaoDir);
  await mountPluginsFromDirectory(app, gooseWordBaoPluginsDir);
  await mountPluginsFromDirectory(app, devPluginsDir());
  return listInstalledPlugins();
};

export const reloadPlugins = rescanAndMount;
