const BAOHAUS_IMPORT_REGEX =
  /^(?:\s*)(?:import|export)\b[\s\S]*?from\s+["']@baohaus\/([a-z][a-z0-9-]*)(\/[^"']*)?["']/gm;

const RELATIVE_IMPORT_REGEX =
  /^(?:\s*)(?:import|export)\b[\s\S]*?from\s+["'](\.{1,2}\/[^"']+)["']/gm;

const DYNAMIC_IMPORT_REGEX = /\bimport\(\s*["']@baohaus\/([a-z][a-z0-9-]*)(\/[^"']*)?["']\s*\)/g;

const DYNAMIC_RELATIVE_IMPORT_REGEX = /\bimport\(\s*["'](\.{1,2}\/[^"']+)["']\s*\)/g;

export interface BaohausImport {
  packageId: string;
  subpath: string;
}

export interface RelativeImport {
  specifier: string;
}

export function findBaohausImports(source: string): readonly BaohausImport[] {
  const results: BaohausImport[] = [];
  for (const match of source.matchAll(BAOHAUS_IMPORT_REGEX)) {
    const packageId = match[1];
    const subpathFragment = match[2] ?? "";
    if (!packageId) {
      continue;
    }
    results.push({
      packageId,
      subpath: subpathFragment.length === 0 ? "." : `.${subpathFragment}`,
    });
  }
  for (const match of source.matchAll(DYNAMIC_IMPORT_REGEX)) {
    const packageId = match[1];
    const subpathFragment = match[2] ?? "";
    if (!packageId) {
      continue;
    }
    results.push({
      packageId,
      subpath: subpathFragment.length === 0 ? "." : `.${subpathFragment}`,
    });
  }
  return results;
}

export function findRelativeImports(source: string): readonly RelativeImport[] {
  const results: RelativeImport[] = [];
  for (const match of source.matchAll(RELATIVE_IMPORT_REGEX)) {
    const specifier = match[1];
    if (!specifier) {
      continue;
    }
    results.push({ specifier });
  }
  for (const match of source.matchAll(DYNAMIC_RELATIVE_IMPORT_REGEX)) {
    const specifier = match[1];
    if (!specifier) {
      continue;
    }
    results.push({ specifier });
  }
  return results;
}
