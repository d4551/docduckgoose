import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";

export const packageRoot = resolve(import.meta.dir, "..");
export const distRoot = resolve(packageRoot, "dist");

const DIST_PREFIX = "./dist/";
const JS_EXTENSION = ".js";

function sourceEntrypointForDistTarget(target: string): string {
  if (!target.startsWith(DIST_PREFIX) || !target.endsWith(JS_EXTENSION)) {
    throw new Error(`Package export target must point at dist JavaScript: ${target}`);
  }
  const relativePath = target.slice(DIST_PREFIX.length, -JS_EXTENSION.length);
  return `src/${relativePath}.ts`;
}

function createEntrypoints(): string[] {
  const packageJson = JSON.parse(readFileSync(resolve(packageRoot, "package.json"), "utf8"));
  const exportedEntrypoints = new Set<string>();
  for (const exportTarget of Object.values(packageJson.exports)) {
    if (typeof exportTarget === "object" && exportTarget !== null && !Array.isArray(exportTarget)) {
      const defaultTarget = exportTarget.default;
      if (typeof defaultTarget === "string") {
        const entrypoint = sourceEntrypointForDistTarget(defaultTarget);
        if (!existsSync(resolve(packageRoot, entrypoint))) {
          throw new Error(`Package export has no source entrypoint: ${entrypoint}`);
        }
        exportedEntrypoints.add(entrypoint);
      }
    }
  }
  return [...exportedEntrypoints];
}

export const entrypoints = createEntrypoints();

export function createCompilerOptions(): ts.CompilerOptions {
  return {
    declaration: true,
    declarationMap: false,
    emitDeclarationOnly: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    outDir: distRoot,
    rootDir: resolve(packageRoot, "src"),
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ESNext,
    types: ["bun"],
  };
}

export function createDiagnosticHost(): ts.FormatDiagnosticsHost {
  return {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => packageRoot,
    getNewLine: () => ts.sys.newLine,
  };
}
