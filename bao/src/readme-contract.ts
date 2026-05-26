import type { CatalogPackageEntry } from "./catalog.ts";
import { CATALOG_PACKAGE_KINDS, type CatalogPackageKind } from "./constants.ts";
import type { PackageSourceInsights } from "./readme-source-insights.ts";

export const README_HEADER_BEGIN = "<!-- BEGIN BAOHAUS README HEADER -->" as const;
export const README_HEADER_END = "<!-- END BAOHAUS README HEADER -->" as const;
export const PACKAGE_CARD_BEGIN = "<!-- BEGIN BAOHAUS PACKAGE CARD -->" as const;
export const PACKAGE_CARD_END = "<!-- END BAOHAUS PACKAGE CARD -->" as const;
export const PACKAGE_MANUAL_BEGIN = "<!-- BEGIN BAOHAUS PACKAGE MANUAL -->" as const;
export const PACKAGE_MANUAL_END = "<!-- END BAOHAUS PACKAGE MANUAL -->" as const;

/** Required first explanation block (plain language, package-accurate). */
export const ELI5_HEADING = "## Explain Like I'm Five" as const;
/** C4-style context diagram. */
export const ARCHITECTURE_HEADING = "## Architecture" as const;
/** arc42 boundaries table. */
export const SCOPE_HEADING = "## Scope" as const;

/** @deprecated Use SCOPE_HEADING — kept for legacy README migration reads. */
export const OWNERSHIP_HEADING = "## What This Package Owns" as const;

export const MIN_ELI5_CHARACTERS = 80;
export const MIN_ELI5_SENTENCES = 2;

export type MermaidDiagramKind = "flowchart" | "sequenceDiagram" | "stateDiagram-v2";

export interface ReadmeOverrideEntry {
  /** Preferred curated overview (pyOpenSci explanation). */
  overview?: string;
  /** Alias for overview; optional extra ELI5 block when set without overview. */
  eli5?: string;
  mermaid?: string;
  /** Scope table — preferred keys */
  inScope?: string[];
  dependencies?: string[];
  outOfScope?: string[];
  /** Legacy scope keys */
  owns?: string[];
  consumes?: string[];
  neverOwns?: string[];
  manual?: string;
}

export interface ReadmeOverridesFile {
  packages: Record<string, ReadmeOverrideEntry>;
}

export interface PackageReadmeContext {
  id: string;
  packageName: string;
  packageRoot: string;
  sourcePath: string;
  description: string;
  packageKind: CatalogPackageKind;
  catalogEntry: CatalogPackageEntry | null;
  exportSubpaths: string[];
  dependencies: string[];
  hasElysia: boolean;
  hasRoutes: boolean;
  sourceInsights: PackageSourceInsights;
}

export function isCatalogPackageKind(value: string): value is CatalogPackageKind {
  return (CATALOG_PACKAGE_KINDS as readonly string[]).includes(value);
}

export function pickMermaidDiagramKind(context: PackageReadmeContext): MermaidDiagramKind {
  if (context.id === "bao-sdk" || context.packageName.endsWith("/bao-sdk")) {
    return "stateDiagram-v2";
  }
  if (context.hasElysia || context.hasRoutes) {
    return "sequenceDiagram";
  }
  if (context.packageKind === "runtime-package" || context.packageKind === "extension") {
    return "flowchart";
  }
  return "flowchart";
}

export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return 0;
  }
  const parts = trimmed.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  return parts.length;
}

export function eli5MeetsMinimum(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length >= MIN_ELI5_CHARACTERS && countSentences(trimmed) >= MIN_ELI5_SENTENCES;
}

export const overviewMeetsMinimum = eli5MeetsMinimum;

export function readmeContainsMermaid(content: string): boolean {
  return content.includes("```mermaid");
}

export function readmeContainsEli5AtTop(content: string, lineLimit = 100): boolean {
  const head = content.split("\n").slice(0, lineLimit).join("\n");
  const eli5Index = head.indexOf(ELI5_HEADING);
  const altIndex = head.indexOf("## Explain Like I'm 5");
  const firstEli5 =
    eli5Index < 0 ? altIndex : altIndex < 0 ? eli5Index : Math.min(eli5Index, altIndex);
  if (firstEli5 < 0) {
    return false;
  }
  const architectureIndex = head.indexOf(ARCHITECTURE_HEADING);
  if (architectureIndex >= 0 && firstEli5 > architectureIndex) {
    return false;
  }
  return true;
}

export function readmeContainsOverviewInHeader(content: string, lineLimit = 140): boolean {
  return (
    readmeContainsEli5AtTop(content, lineLimit) || readmeContainsScopeTable(content, lineLimit)
  );
}

export function readmeContainsScopeTable(content: string, lineLimit = 160): boolean {
  const head = content.split("\n").slice(0, lineLimit).join("\n");
  return head.includes(SCOPE_HEADING) || head.includes(OWNERSHIP_HEADING);
}
