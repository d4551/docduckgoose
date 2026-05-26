/**
 * Shared helpers for validation rules.
 */

const isExportUsedInFile = (content: string, name: string): boolean => {
  const pattern = new RegExp(`\\b${name}\\b`, "g");
  return (content.match(pattern) ?? []).length > 1;
};

const isExportUsedElsewhere = (
  name: string,
  sourcePath: string,
  allPaths: readonly string[],
  allContents: readonly string[],
): boolean => {
  const pattern = new RegExp(`\\b${name}\\b`);

  for (let j = 0; j < allPaths.length; j += 1) {
    if (allPaths[j] !== sourcePath) {
      const content = allContents[j];
      if (content !== undefined && pattern.test(content)) {
        return true;
      }
    }
  }

  return false;
};

const isEntryOrConfigPath = (path: string): boolean =>
  path.includes("src/index.ts") || path.includes("src/config/") || path.includes("prisma.config");

const SUCCESS_STATE_PATTERN =
  /\b(?:state:\s*["'](?:ready|success)["']|successState\(|renderSuccessState\()/;

export const hasSkeleton = (contents: string): boolean =>
  contents.includes("loadingSkeleton(") ||
  contents.includes("tableSkeleton(") ||
  contents.includes("statsSkeleton(") ||
  contents.includes("gridSkeleton(");

export const stripCodeComments = (contents: string): string =>
  contents.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

export const checkStateContract = (contents: string): string[] => {
  const missing: string[] = [];

  if (!hasSkeleton(contents)) {
    missing.push("loading skeleton");
  }
  if (!contents.includes("emptyState(")) {
    missing.push("emptyState");
  }
  if (!contents.includes("errorState(")) {
    missing.push("errorState");
  }
  if (!SUCCESS_STATE_PATTERN.test(contents)) {
    missing.push("success state");
  }

  return missing;
};

export const collectRouteContents = async (
  path: string,
  trackedFiles: readonly string[],
  readFile: (p: string) => Promise<string>,
): Promise<string> => {
  const directory = path.slice(0, path.lastIndexOf("/"));
  const viewContents = await Promise.all(
    trackedFiles
      .filter((candidate) => candidate.startsWith(`${directory}/`) && candidate.endsWith("view.ts"))
      .map((candidate) => readFile(candidate)),
  );

  return `${await readFile(path)}\n${viewContents.join("\n")}`;
};

export const findDeadExportsInFile = (
  path: string,
  content: string,
  allPaths: readonly string[],
  allContents: readonly string[],
): string[] => {
  const dead: string[] = [];

  for (const match of content.matchAll(
    /export\s+(?:const|function|type|interface)\s+(?<name>\w+)/g,
  )) {
    const name = match.groups?.name;

    if (
      name !== undefined &&
      !isExportUsedInFile(content, name) &&
      !isExportUsedElsewhere(name, path, allPaths, allContents) &&
      !isEntryOrConfigPath(path)
    ) {
      dead.push(`${path}: ${name}`);
    }
  }

  return dead;
};

export const checkSwapLine = (lines: readonly string[], index: number): boolean => {
  const line = lines[index];
  if (line === undefined) {
    return false;
  }
  const hasRequest = line.includes("hx-get=") || line.includes("hx-post=");

  if (!(hasRequest && line.includes("hx-target=")) || line.includes("hx-swap=")) {
    return false;
  }

  const context = [lines[index - 1] ?? "", line, lines[index + 1] ?? ""].join("");

  return !context.includes("hx-swap=");
};

const HTML_TAG_NEEDLE_PATTERN = /^<([a-zA-Z][a-zA-Z0-9-]*)>$/;

/**
 * Match a contract needle against shell contents.
 *
 * Needles shaped like an HTML start-tag (`<title>`, `<main>`, `<nav>`) are
 * matched via a regex that allows attribute-bearing emissions
 * (`<title id="…">`, `<main role="main" class="…">`). All other needles use
 * exact substring matching so SEO/a11y contracts can mix tag presence with
 * arbitrary attribute / class literals.
 */
export const contentSatisfiesNeedle = (contents: string, needle: string): boolean => {
  const tagMatch = HTML_TAG_NEEDLE_PATTERN.exec(needle);
  if (tagMatch === null) {
    return contents.includes(needle);
  }
  const tagName = tagMatch[1];
  const tagPattern = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, "u");
  return tagPattern.test(contents);
};
