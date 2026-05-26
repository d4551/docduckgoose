import { join } from "node:path";
import type { CatalogPackageEntry } from "./catalog.ts";
import type { CANONICAL_SCRIPT_NAMES } from "./constants.ts";
import {
  isJsonObject,
  type JsonObject,
  type JsonValue,
  readJsonFile,
  writeJsonFile,
} from "./fs.ts";
import { resolvePackageSourceDirectory } from "./manifest.ts";

const DOT_SLASH_PATTERN = /^\.\//;

function isStringRecord(value: JsonValue | undefined): value is Record<string, string> {
  return isJsonObject(value) && Object.values(value).every((entry) => typeof entry === "string");
}

function isStringArray(value: JsonValue | undefined): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function isMinimalPackageJson(value: JsonValue): value is JsonObject & MinimalPackageJson {
  return (
    isJsonObject(value) &&
    typeof value.name === "string" &&
    typeof value.version === "string" &&
    typeof value.private === "boolean" &&
    value.type === "module" &&
    typeof value.packageManager === "string" &&
    isStringRecord(value.scripts) &&
    isJsonObject(value.exports) &&
    isStringArray(value.files)
  );
}

const CANONICAL_PACKAGE_MANAGER = "bun@1.3.13";

const CANONICAL_SCRIPTS: Record<(typeof CANONICAL_SCRIPT_NAMES)[number], string> = {
  build: "bun run ./scripts/build.ts",
  typecheck: "bunx --bun tsc --noEmit --project tsconfig.json",
  test: "bun test",
  lint: "bunx --bun @biomejs/biome check --error-on-warnings ./src ./tests ./package.json ./tsconfig.json",
  "bao:build": "bun run ./scripts/bao-build.ts",
  "bao:validate": "bun run ./scripts/bao-validate.ts",
};

function toExportsField(entry: CatalogPackageEntry): JsonObject {
  const exports: JsonObject = {};
  for (const subpath of entry.publicEntrypoints) {
    const name = subpath === "." ? "index" : subpath.replace(DOT_SLASH_PATTERN, "");
    exports[subpath] = {
      bun: `./src/${name}.ts`,
      import: `./dist/${name}.js`,
      types: `./dist/${name}.d.ts`,
      default: `./dist/${name}.js`,
    };
  }
  if (!("." in exports)) {
    exports["."] = {
      bun: "./src/index.ts",
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
    };
  }
  return exports;
}

export function renderCanonicalPackageJson(entry: CatalogPackageEntry): MinimalPackageJson {
  return {
    name: entry.packageName,
    version: entry.packageVersion,
    private: entry.visibility === "hidden",
    type: "module",
    packageManager: CANONICAL_PACKAGE_MANAGER,
    scripts: { ...CANONICAL_SCRIPTS },
    exports: toExportsField(entry),
    main: "./dist/index.js",
    types: "./dist/index.d.ts",
    files: ["dist", "README.md", "bao-governance.json", "bao.lock"],
    license: "UNLICENSED",
  };
}

export function resolvePackageJsonPath(entry: CatalogPackageEntry): string {
  return join(resolvePackageSourceDirectory(entry), "package.json");
}

export async function loadCurrentPackageJson(
  entry: CatalogPackageEntry,
): Promise<MinimalPackageJson | null> {
  const path = resolvePackageJsonPath(entry);
  const file = Bun.file(path);
  if (!(await file.exists())) {
    return null;
  }
  const value = await readJsonFile(path);
  if (!isMinimalPackageJson(value)) {
    throw new Error(`Invalid package.json: ${path}`);
  }
  return value;
}

export async function writeCanonicalPackageJson(
  entry: CatalogPackageEntry,
  overrides?: Partial<MinimalPackageJson>,
): Promise<void> {
  const canonical = renderCanonicalPackageJson(entry);
  const merged: MinimalPackageJson = { ...canonical, ...overrides };
  await writeJsonFile(resolvePackageJsonPath(entry), merged);
}

export async function mergeCanonicalPackageJson(entry: CatalogPackageEntry): Promise<void> {
  const canonical = renderCanonicalPackageJson(entry);
  const current = await loadCurrentPackageJson(entry);
  const merged: MinimalPackageJson = {
    ...canonical,
    packageManager: current?.packageManager ?? canonical.packageManager,
    ...(current?.description ? { description: current.description } : {}),
    ...(current?.main ? { main: current.main } : {}),
    ...(current?.types ? { types: current.types } : {}),
    exports: current?.exports ?? canonical.exports,
    files: current?.files ?? canonical.files,
    scripts: canonical.scripts,
    ...(current?.license ? { license: current.license } : {}),
    ...(current?.dependencies ? { dependencies: current.dependencies } : {}),
    ...(current?.devDependencies ? { devDependencies: current.devDependencies } : {}),
    ...(current?.peerDependencies ? { peerDependencies: current.peerDependencies } : {}),
    ...(current?.optionalDependencies
      ? { optionalDependencies: current.optionalDependencies }
      : {}),
  };
  await writeJsonFile(resolvePackageJsonPath(entry), merged);
}

export interface MinimalPackageJson {
  name: string;
  version: string;
  private: boolean;
  type: "module";
  packageManager: string;
  description?: string;
  scripts: Record<string, string>;
  exports: JsonObject;
  main?: string;
  types?: string;
  files: string[];
  license?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}
