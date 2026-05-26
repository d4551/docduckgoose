import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KIT_DIR = dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = resolve(KIT_DIR, "..", "..");

export const CATALOG_FILE_PATH = resolve(REPO_ROOT, "bao-packages", "bao-packages.json");

export const PACKAGE_SOURCE_ROOT = "bao-source";
export const PLATFORM_REGISTRY_ROOT = "registry";
export const PLATFORM_RUNTIME_ROOT = "bao-runtime";

export const REGISTRY_NAMESPACE = "baohaus";

export const CATALOG_CHANNELS = ["public", "internal", "test", "labs"] as const;
export type CatalogChannel = (typeof CATALOG_CHANNELS)[number];

export const CATALOG_VISIBILITIES = ["public", "hidden"] as const;
export type CatalogVisibility = (typeof CATALOG_VISIBILITIES)[number];

export const CATALOG_PACKAGE_KINDS = [
  "library",
  "runtime-package",
  "extension",
  "internal",
  "test",
] as const;
export type CatalogPackageKind = (typeof CATALOG_PACKAGE_KINDS)[number];

export const CATALOG_LAYOUT_VARIANTS = ["monorepo-root", "nested-workspace"] as const;
export type CatalogLayoutVariant = (typeof CATALOG_LAYOUT_VARIANTS)[number];

export const CATALOG_RUNTIME_AFFINITIES = [
  "web",
  "desktop",
  "tauri",
  "node",
  "bun",
  "tauri-mobile",
] as const;
export type CatalogRuntimeAffinity = (typeof CATALOG_RUNTIME_AFFINITIES)[number];

export const RELEASE_AUTHORITY = "registry-first";
export type ReleaseAuthority = typeof RELEASE_AUTHORITY;

export const CATALOG_SCHEMA_VERSION = 2;

export const CANONICAL_SCRIPT_NAMES = [
  "build",
  "typecheck",
  "test",
  "lint",
  "bao:build",
  "bao:validate",
] as const;
