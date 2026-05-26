import {
  PACKAGE_CARD_BEGIN,
  PACKAGE_CARD_END,
  PACKAGE_MANUAL_BEGIN,
  PACKAGE_MANUAL_END,
  README_HEADER_BEGIN,
  README_HEADER_END,
} from "./readme-contract.ts";

export interface ReadmeRegions {
  readonly beforeHeader: string;
  readonly header: string | null;
  readonly betweenHeaderAndCard: string;
  readonly card: string | null;
  readonly betweenCardAndManual: string;
  readonly manual: string | null;
  readonly afterManual: string;
}

function extractRegion(
  content: string,
  begin: string,
  end: string,
): { inner: string | null; before: string; after: string } {
  const beginIndex = content.indexOf(begin);
  if (beginIndex < 0) {
    return { inner: null, before: content, after: "" };
  }
  const endIndex = content.indexOf(end, beginIndex + begin.length);
  if (endIndex < 0) {
    return { inner: null, before: content, after: "" };
  }
  const innerStart = beginIndex + begin.length;
  const inner = content.slice(innerStart, endIndex).trim();
  return {
    inner: inner.length > 0 ? inner : "",
    before: content.slice(0, beginIndex),
    after: content.slice(endIndex + end.length),
  };
}

export function parseReadmeRegions(content: string): ReadmeRegions {
  const headerExtract = extractRegion(content, README_HEADER_BEGIN, README_HEADER_END);
  const afterHeader = headerExtract.inner === null ? headerExtract.before : headerExtract.after;

  const cardExtract = extractRegion(afterHeader, PACKAGE_CARD_BEGIN, PACKAGE_CARD_END);
  const afterCard = cardExtract.inner === null ? cardExtract.before : cardExtract.after;

  const manualExtract = extractRegion(afterCard, PACKAGE_MANUAL_BEGIN, PACKAGE_MANUAL_END);

  return {
    beforeHeader: headerExtract.inner === null ? "" : headerExtract.before,
    header: headerExtract.inner,
    betweenHeaderAndCard: cardExtract.inner === null ? cardExtract.before : "",
    card: cardExtract.inner,
    betweenCardAndManual: manualExtract.inner === null ? manualExtract.before : "",
    manual: manualExtract.inner,
    afterManual: manualExtract.inner === null ? "" : manualExtract.after,
  };
}

export function mergeReadmeSections(parts: {
  beforeHeader: string;
  headerBlock: string;
  cardBlock: string;
  manualBlock: string;
  afterManual: string;
}): string {
  const blocks: string[] = [];
  const preamble = parts.beforeHeader.trim();
  if (preamble.length > 0) {
    blocks.push(preamble);
  }
  blocks.push(parts.headerBlock.trim(), "", parts.cardBlock.trim(), "", parts.manualBlock.trim());
  const tail = parts.afterManual.trim();
  if (tail.length > 0) {
    blocks.push("", tail);
  }
  return `${blocks
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

function isExportDumpOnly(manual: string): boolean {
  const trimmed = manual.trim();
  if (trimmed.length < 80) {
    return false;
  }
  const hasApiSurface = trimmed.includes("## API Surface");
  const hasCapability = trimmed.includes("## Capability");
  const hasIntegration = trimmed.includes("## Integration");
  const hasSubpaths = trimmed.includes("## Subpaths");
  return hasApiSurface && !hasCapability && !hasIntegration && !hasSubpaths;
}

function isSubstantiveManual(manual: string): boolean {
  const trimmed = manual.trim();
  if (trimmed.length < 120 || isExportDumpOnly(trimmed)) {
    return false;
  }
  const sectionCount = (trimmed.match(/^## /gm) ?? []).length;
  if (
    trimmed.includes("```mermaid") ||
    trimmed.includes("| Subpath |") ||
    trimmed.includes("## Quick start")
  ) {
    return true;
  }
  if (sectionCount >= 3) {
    return true;
  }
  if (trimmed.length > 500 && sectionCount >= 2) {
    return true;
  }
  return false;
}

function extractManualSection(manual: string, heading: string): string | null {
  const start = manual.indexOf(heading);
  if (start < 0) {
    return null;
  }
  const afterHeading = start + heading.length;
  const rest = manual.slice(afterHeading);
  const nextHeading = rest.search(/\n## /);
  const chunk =
    nextHeading < 0
      ? manual.slice(start).trim()
      : manual.slice(start, afterHeading + nextHeading).trim();
  return chunk.length > heading.length ? chunk : null;
}

export function mergeManualBodies(preserved: string, generated: string): string {
  let body = preserved.trim();
  if (!body.includes("## Quick start")) {
    const quickStart = extractManualSection(generated, "## Quick start");
    if (quickStart !== null) {
      body = `${quickStart}\n\n${body}`;
    }
  }
  for (const heading of [
    "## Reference",
    "### Subpaths",
    "### Symbols",
    "## Verification",
  ] as const) {
    if (body.includes(heading)) {
      continue;
    }
    const section = extractManualSection(generated, heading);
    if (section !== null) {
      body = `${body}\n\n${section}`;
    }
  }
  return body.trim();
}

export function preserveManualBody(regions: ReadmeRegions, generatedManual: string): string {
  const generated = generatedManual.trim();
  if (regions.manual !== null && isSubstantiveManual(regions.manual)) {
    return mergeManualBodies(regions.manual.trim(), generated);
  }
  const legacy = regions.betweenCardAndManual.trim();
  if (isSubstantiveManual(legacy)) {
    return mergeManualBodies(legacy, generated);
  }
  return generated;
}
