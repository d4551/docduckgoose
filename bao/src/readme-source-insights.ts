import { readdir } from "node:fs/promises";
import { join } from "node:path";

const EXPORT_NAME_PATTERN =
  /export\s+(?:async\s+)?(?:type|interface|class|function|const)\s+([A-Za-z_$][\w$]*)/g;
const EXPORT_LIST_PATTERN = /export\s*\{\s*([^}]+)\}/g;

export interface PackageSourceInsights {
  readonly topSymbols: string[];
  readonly primarySubpaths: string[];
  readonly hasTests: boolean;
  readonly indexPath: string | null;
}

function parseExportBlock(block: string): string[] {
  return block
    .split(",")
    .map(
      (part) =>
        part
          .trim()
          .split(/\s+as\s+/)[0]
          ?.trim() ?? "",
    )
    .filter((name) => name.length > 0 && /^[A-Za-z_$]/.test(name));
}

function collectSymbolsFromSource(source: string): string[] {
  const names = new Set<string>();
  for (const match of source.matchAll(EXPORT_NAME_PATTERN)) {
    const name = match[1];
    if (name !== undefined) {
      names.add(name);
    }
  }
  for (const match of source.matchAll(EXPORT_LIST_PATTERN)) {
    const block = match[1];
    if (block !== undefined) {
      for (const name of parseExportBlock(block)) {
        names.add(name);
      }
    }
  }
  return [...names].sort((left, right) => left.localeCompare(right));
}

function subpathLabel(subpath: string): string {
  if (subpath === ".") {
    return "Main entry";
  }
  const segment = subpath.replace(/^\.\//, "").replace(/-/g, " ");
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function describeSubpath(subpath: string): string {
  const label = subpathLabel(subpath);
  const slug = subpath.replace(/^\.\//, "");
  if (slug.includes("federation")) {
    return `${label} — federation wire, snapshot, or validation`;
  }
  if (slug.includes("auth") || slug.includes("session")) {
    return `${label} — auth/session contracts`;
  }
  if (slug.includes("schema")) {
    return `${label} — shared schemas`;
  }
  if (slug.includes("route") || slug.includes("http")) {
    return `${label} — HTTP handlers`;
  }
  if (slug.includes("host-context") || slug === "host-context") {
    return `${label} — host lifecycle context types`;
  }
  if (slug.includes("install-target") || slug.includes("handler")) {
    return `${label} — .bao install target handlers`;
  }
  if (slug.includes("cas-resolver")) {
    return `${label} — content-addressed archive resolution`;
  }
  if (slug.includes("port")) {
    return `${label} — port contracts for adapters`;
  }
  if (slug.includes("sidebar") || slug.includes("palette") || slug.includes("settings")) {
    return `${label} — host UI registration surface`;
  }
  return `${label} — typed surface from this .bao crate`;
}

async function readIndexSource(packageRoot: string): Promise<string | null> {
  const candidates = [join(packageRoot, "src", "index.ts"), join(packageRoot, "src", "main.ts")];
  for (const candidate of candidates) {
    const file = Bun.file(candidate);
    if (await file.exists()) {
      return file.text();
    }
  }
  return null;
}

async function hasTestDirectory(packageRoot: string): Promise<boolean> {
  const testsDir = join(packageRoot, "tests");
  if (!(await Bun.file(testsDir).exists())) {
    return false;
  }
  const entries = await readdir(testsDir).then(
    (names) => names,
    () => [] as string[],
  );
  return entries.some((name) => name.endsWith(".test.ts") || name.endsWith(".spec.ts"));
}

export async function collectPackageSourceInsights(
  packageRoot: string,
  exportSubpaths: readonly string[],
): Promise<PackageSourceInsights> {
  const indexPath = join(packageRoot, "src", "index.ts");
  const indexExists = await Bun.file(indexPath).exists();
  const source = indexExists
    ? await Bun.file(indexPath).text()
    : await readIndexSource(packageRoot);
  const topSymbols = source === null ? [] : collectSymbolsFromSource(source).slice(0, 12);
  const primarySubpaths = exportSubpaths.filter((subpath) => subpath !== ".").slice(0, 10);
  return {
    topSymbols,
    primarySubpaths,
    hasTests: await hasTestDirectory(packageRoot),
    indexPath: source !== null && indexExists ? "src/index.ts" : null,
  };
}
