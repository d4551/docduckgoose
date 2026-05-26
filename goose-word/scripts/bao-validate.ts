import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { cliError, cliLog } from "./cli-log.ts";
import { basename, join, resolve } from "node:path";
import { isPlainObject, type JsonObject, parseJsonSafe } from "@baohaus/bao-json-safe";
import {
  GOOSE_WORD_CLIENT_ASSETS,
  GOOSE_WORD_UI_APP_CSS_PATH,
  GOOSE_WORD_UI_CLIENT_DIR,
  GOOSE_WORD_UI_MANIFEST_PATH,
} from "@baohaus/goose-word-ui-bao/manifest";

type JsonRecord = JsonObject;

const ROOT = resolve(import.meta.dir, "..");
const WORKSPACE_ROOT = resolve(ROOT, "..");
const PLUGINS_ROOT = resolve(WORKSPACE_ROOT, "goose-word-plugins");
const UI_ROOT = resolve(WORKSPACE_ROOT, "bao-source", "goose-word-ui-bao");
const ARCHIVE_EXTENSIONS = [".bao", ".zip", ".tar", ".tar.gz"] as const;

const args = new Set(Bun.argv.slice(2));
const pluginFlagIndex = Bun.argv.indexOf("--plugin");
const pluginArg = pluginFlagIndex >= 0 ? Bun.argv[pluginFlagIndex + 1] : undefined;
const pluginRoots =
  pluginArg !== undefined
    ? [resolve(pluginArg)]
    : readdirSync(PLUGINS_ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(PLUGINS_ROOT, entry.name))
        .filter((dir) => existsSync(join(dir, "package.json")));

const failures: string[] = [];

const fail = (message: string): void => {
  failures.push(message);
};

const readJson = (path: string): JsonRecord | null => {
  if (!existsSync(path)) {
    fail(`Missing ${path}`);
    return null;
  }
  const parsed = parseJsonSafe(readFileSync(path, "utf8"));
  if (parsed.ok === false) {
    fail(`${path} is not valid JSON`);
    return null;
  }
  if (!isPlainObject(parsed.value)) {
    fail(`${path} must contain a JSON object`);
    return null;
  }
  return parsed.value;
};

const readString = (record: JsonRecord, key: string): string | null => {
  const value = record[key];
  return typeof value === "string" && value.length > 0 ? value : null;
};

const listArchives = (dir: string, out: string[] = []): string[] => {
  if (!existsSync(dir)) {
    return out;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      listArchives(path, out);
      continue;
    }
    if (ARCHIVE_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      out.push(path);
    }
  }
  return out;
};

const validatePackagePair = (dir: string): JsonRecord | null => {
  const pkg = readJson(join(dir, "package.json"));
  const governance = readJson(join(dir, "bao-governance.json"));
  if (pkg === null || governance === null) {
    return null;
  }

  const packageName = readString(pkg, "name");
  const packageVersion = readString(pkg, "version");
  const governanceName = readString(governance, "name");
  const governanceVersion = readString(governance, "version");
  const id = readString(governance, "id");

  if (packageName === null) {
    fail(`${dir}/package.json must declare name`);
  }
  if (packageVersion === null) {
    fail(`${dir}/package.json must declare version`);
  }
  if (id === null) {
    fail(`${dir}/bao-governance.json must declare id`);
  }
  if (governanceName !== packageName) {
    fail(`${dir}/bao-governance.json name must match package.json name`);
  }
  if (governanceVersion !== packageVersion) {
    fail(`${dir}/bao-governance.json version must match package.json version`);
  }

  const copyFirst = governance.copyFirst;
  if (copyFirst === undefined || !isPlainObject(copyFirst) || copyFirst.required !== true) {
    fail(`${dir}/bao-governance.json must require copyFirst installs`);
  }
  if (
    copyFirst !== undefined &&
    isPlainObject(copyFirst) &&
    copyFirst.archivePolicy !== "no-prebuilt-archives"
  ) {
    fail(`${dir}/bao-governance.json copyFirst.archivePolicy must be no-prebuilt-archives`);
  }

  const targets = governance.targets;
  if (!Array.isArray(targets)) {
    fail(`${dir}/bao-governance.json targets must be an array`);
    return governance;
  }
  for (const target of targets) {
    if (!isPlainObject(target) || readString(target, "kind") === null) {
      fail(`${dir}/bao-governance.json targets must include kind fields`);
    }
  }
  return governance;
};

const validatePlugin = (dir: string): void => {
  if (validatePackagePair(dir) === null) {
    return;
  }
};

const validatePluginEntrypoints = (dir: string): void => {
  const governance = readJson(join(dir, "bao-governance.json"));
  if (governance === null || !Array.isArray(governance.targets)) {
    return;
  }
  for (const target of governance.targets) {
    if (!isPlainObject(target)) {
      continue;
    }
    const entrypoint = readString(target, "entrypoint");
    if (entrypoint === null) {
      continue;
    }
    requireFile(join(dir, entrypoint));
  }
};

const requireFile = (path: string): void => {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`Missing asset file: ${path}`);
  }
};

const validateUiAssets = (): void => {
  requireFile(join(UI_ROOT, GOOSE_WORD_UI_APP_CSS_PATH));
  requireFile(join(UI_ROOT, GOOSE_WORD_UI_MANIFEST_PATH));
  for (const file of Object.values(GOOSE_WORD_CLIENT_ASSETS)) {
    requireFile(join(UI_ROOT, GOOSE_WORD_UI_CLIENT_DIR, file));
  }
};

validatePackagePair(ROOT);
validateUiAssets();
for (const root of pluginRoots) {
  validatePlugin(root);
}

for (const archivePath of listArchives(WORKSPACE_ROOT)) {
  fail(`Prebuilt archive is not allowed in copy-first MVP: ${archivePath}`);
}

if (!args.has("--skip-built-entrypoints")) {
  for (const root of pluginRoots) {
    validatePluginEntrypoints(root);
  }
}

if (failures.length > 0) {
  cliError(`bao:validate failed (${failures.length})`);
  for (const failure of failures) {
    cliError(`- ${failure}`);
  }
  process.exit(1);
}

cliLog(
  `bao:validate ok (${basename(ROOT)} + ${pluginRoots.map((root) => basename(root)).join(", ")}, copy-first, no archives)`,
);
