import { join } from "node:path";
import type { CatalogPackageEntry } from "./catalog.ts";
import { writeJsonFile } from "./fs.ts";
import { resolvePackageSourceDirectory } from "./manifest.ts";

interface CanonicalPackageTsConfig {
  extends: "./tsconfig.package.json";
  compilerOptions: {
    jsx: "preserve";
    outDir: "./dist";
  };
  include: ["src/**/*"];
  exclude: ["dist", "node_modules", "scripts", "tests", "**/*.test.ts", "**/*.test.tsx"];
}

interface CanonicalPackageCompilerTsConfig {
  compilerOptions: {
    target: "ESNext";
    module: "ESNext";
    moduleResolution: "bundler";
    moduleDetection: "force";
    allowImportingTsExtensions: true;
    rewriteRelativeImportExtensions: true;
    verbatimModuleSyntax: true;
    strict: true;
    noImplicitOverride: true;
    noFallthroughCasesInSwitch: true;
    resolveJsonModule: true;
    skipLibCheck: true;
    types: ["bun", "bun-types"];
  };
}

export function renderCanonicalPackageCompilerTsConfig(): CanonicalPackageCompilerTsConfig {
  return {
    compilerOptions: {
      target: "ESNext",
      module: "ESNext",
      moduleResolution: "bundler",
      moduleDetection: "force",
      allowImportingTsExtensions: true,
      rewriteRelativeImportExtensions: true,
      verbatimModuleSyntax: true,
      strict: true,
      noImplicitOverride: true,
      noFallthroughCasesInSwitch: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      types: ["bun", "bun-types"],
    },
  };
}

export function renderCanonicalTsConfig(): CanonicalPackageTsConfig {
  return {
    extends: "./tsconfig.package.json",
    compilerOptions: {
      jsx: "preserve",
      outDir: "./dist",
    },
    include: ["src/**/*"],
    exclude: ["dist", "node_modules", "scripts", "tests", "**/*.test.ts", "**/*.test.tsx"],
  };
}

export function resolveTsConfigPath(entry: CatalogPackageEntry): string {
  return join(resolvePackageSourceDirectory(entry), "tsconfig.json");
}

export function resolveTsConfigPackagePath(entry: CatalogPackageEntry): string {
  return join(resolvePackageSourceDirectory(entry), "tsconfig.package.json");
}

export async function writeCanonicalTsConfig(entry: CatalogPackageEntry): Promise<void> {
  await writeJsonFile(resolveTsConfigPath(entry), renderCanonicalTsConfig());
}

export async function writeCanonicalTsConfigPackage(entry: CatalogPackageEntry): Promise<void> {
  await writeJsonFile(resolveTsConfigPackagePath(entry), renderCanonicalPackageCompilerTsConfig());
}
