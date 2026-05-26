import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { isPlainObject, parseJsonSafe, readStringField } from "@baohaus/bao-json-safe";
import type { Elysia } from "elysia";
import { gooseWordBaoPluginsDir } from "../config/paths.ts";
import { gooseWordContributionSurfaces } from "./contribution-surfaces.ts";

export interface InstalledPluginRow {
  readonly id: string;
  readonly version: string;
  readonly targets: readonly string[];
  readonly source: "installed" | "dev";
}

type RouteHost = Elysia;

const readGovernance = (dir: string): Omit<InstalledPluginRow, "source"> | null => {
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
      rows.push({ ...manifest, source });
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
  const modulePath = join(packageDir, "dist/bao-extensions/settings-tab.js");
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(modulePath);
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
  const mod = await import(modulePath);
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
  const mod = await import(modulePath);
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
  const mod = await import(modulePath);
  if (typeof mod.createEnterpriseContextRegistrations !== "function") {
    return;
  }
  const registrations = mod.createEnterpriseContextRegistrations();
  for (const registration of registrations) {
    gooseWordContributionSurfaces.enterpriseContext.register({
      ...registration,
      extensionId: registration.extensionId ?? packageName,
    });
  }
};

const mountElysiaPluginModule = async (app: RouteHost, packageDir: string): Promise<void> => {
  const modulePath = join(packageDir, "dist/bao-extensions/elysia-plugin.js");
  if (!existsSync(modulePath)) {
    return;
  }
  const mod = await import(modulePath);
  if (typeof mod.default === "function") {
    app.use(mod.default);
  }
};

export const mountPluginsFromDirectory = async (app: RouteHost, rootDir: string): Promise<void> => {
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
    await registerSettingsTabModule(packageDir, manifest.id);
    await registerDocumentTemplateModule(packageDir, manifest.id);
    await registerThemeModule(packageDir, manifest.id);
    await registerEnterpriseContextModule(packageDir, manifest.id);
    if (manifest.targets.includes("elysia-plugin")) {
      await mountElysiaPluginModule(app, packageDir);
    }
  }
};

export const rescanAndMount = async (app: RouteHost): Promise<readonly InstalledPluginRow[]> => {
  ensurePluginDirectory();
  await mountPluginsFromDirectory(app, gooseWordBaoPluginsDir);
  await mountPluginsFromDirectory(app, devPluginsDir());
  return listInstalledPlugins();
};

export const reloadPlugins = rescanAndMount;
