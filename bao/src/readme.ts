import { join, relative } from "node:path";
import type { CatalogPackageEntry } from "./catalog.ts";
import { REPO_ROOT } from "./constants.ts";
import { writeTextFile } from "./fs.ts";
import { resolvePackageSourceDirectory } from "./manifest.ts";
import type { PackageReadmeContext, ReadmeOverrideEntry } from "./readme-contract.ts";
import {
  ARCHITECTURE_HEADING,
  ELI5_HEADING,
  PACKAGE_MANUAL_BEGIN,
  PACKAGE_MANUAL_END,
  README_HEADER_BEGIN,
  README_HEADER_END,
} from "./readme-contract.ts";
import { resolveEli5 } from "./readme-eli5.ts";
import { renderDefaultManual } from "./readme-manual.ts";
import { mergeReadmeSections, parseReadmeRegions, preserveManualBody } from "./readme-merge.ts";
import { renderMermaidBlock } from "./readme-mermaid.ts";
import { renderScopeTable } from "./readme-scope.ts";

const PARENT_DIRECTORY_PREFIX_PATTERN = /^\.\.\//;

function listValues(values: readonly string[], limit = 18): string {
  if (values.length === 0) {
    return "_None declared._";
  }
  const shown = values
    .slice(0, limit)
    .map((value) => `\`${value}\``)
    .join(", ");
  const remaining = values.length - limit;
  return remaining > 0 ? `${shown}, plus ${remaining} more.` : `${shown}.`;
}

function renderProofCommands(entry: CatalogPackageEntry): string[] {
  return [
    entry.buildCommand,
    entry.typecheckCommand,
    entry.testCommand,
    "bun run lint",
    entry.baoCommand,
    "bun run bao:validate",
    "bun run verify",
  ].filter((command, index, commands) => commands.indexOf(command) === index);
}

export function renderReadmeHeader(
  context: PackageReadmeContext,
  override: ReadmeOverrideEntry | undefined,
): string {
  const eli5 = resolveEli5(context, override);
  const mermaid = renderMermaidBlock(context, override?.mermaid);
  const scope = renderScopeTable(context, override);
  const lines = [
    README_HEADER_BEGIN,
    `# ${context.packageName}`,
    "",
    ELI5_HEADING,
    "",
    eli5,
    "",
    ARCHITECTURE_HEADING,
    "",
    mermaid,
    "",
    scope,
    README_HEADER_END,
  ];
  return lines.join("\n");
}

export function renderPackageManualBlock(manualBody: string): string {
  return [PACKAGE_MANUAL_BEGIN, manualBody.trim(), PACKAGE_MANUAL_END].join("\n");
}

export function renderMergedReadme(
  context: PackageReadmeContext,
  override: ReadmeOverrideEntry | undefined,
  existingContent: string | null,
): string {
  const headerBlock = renderReadmeHeader(context, override);
  const cardBlock =
    context.catalogEntry === null
      ? renderStandalonePackageCard(context)
      : renderCanonicalReadme(context.catalogEntry);
  const generatedManual =
    override?.manual !== undefined && override.manual.trim().length > 0
      ? override.manual.trim()
      : renderDefaultManual(context);
  const regions =
    existingContent !== null && existingContent.length > 0
      ? parseReadmeRegions(existingContent)
      : {
          beforeHeader: "",
          header: null,
          betweenHeaderAndCard: "",
          card: null,
          betweenCardAndManual: "",
          manual: null,
          afterManual: "",
        };
  const manualBody = preserveManualBody(regions, generatedManual);
  return mergeReadmeSections({
    beforeHeader: regions.beforeHeader,
    headerBlock,
    cardBlock,
    manualBlock: renderPackageManualBlock(manualBody),
    afterManual: regions.afterManual,
  });
}

function renderStandalonePackageCard(context: PackageReadmeContext): string {
  const exportList =
    context.exportSubpaths.length > 0
      ? context.exportSubpaths.map((value) => `\`${value}\``).join(", ")
      : "_None declared._";
  return [
    "<!-- BEGIN BAOHAUS PACKAGE CARD -->",
    `# ${context.packageName}`,
    "",
    context.description.length > 0
      ? context.description
      : "Standalone package in the Baohaus monorepo.",
    "",
    `Source at \`${context.sourcePath}\`.`,
    "",
    "## Public Pieces",
    "",
    exportList,
    "",
    "## Proof Commands",
    "",
    `Run from \`${context.sourcePath}\`:`,
    "",
    "- `bun run typecheck`",
    "- `bun run test`",
    "- `bun run lint`",
    "<!-- END BAOHAUS PACKAGE CARD -->",
  ].join("\n");
}

export function renderCanonicalReadme(entry: CatalogPackageEntry): string {
  const packageSourceDirectory = resolvePackageSourceDirectory(entry);
  const sourcePath = relative(REPO_ROOT, packageSourceDirectory).replaceAll("\\", "/");
  const publicEntrypoints =
    entry.publicEntrypoints.length > 0 ? entry.publicEntrypoints : entry.exportSubpaths;
  const lines = [
    "<!-- BEGIN BAOHAUS PACKAGE CARD -->",
    `# ${entry.packageName}`,
    "",
    `Standalone Baohaus package. Catalog identity \`${entry.id}\`. Source at \`${sourcePath}\`. Publishes to \`${entry.ociRepository}\`. Canonical archive: \`${entry.canonicalBaoOutputPath.replace(PARENT_DIRECTORY_PREFIX_PATTERN, "")}\`.`,
    "",
    "Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).",
    "",
    "## Package Facts",
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| Package | \`${entry.packageName}\` |`,
    `| Catalog id | \`${entry.id}\` |`,
    `| Source path | \`${sourcePath}\` |`,
    `| OCI repository | \`${entry.ociRepository}\` |`,
    `| Channel | \`${entry.channel}\` |`,
    `| Visibility | \`${entry.visibility}\` |`,
    `| Kind | \`${entry.packageKind}\` |`,
    `| Runtime installable | \`${entry.runtimeInstallable ? "yes" : "no"}\` |`,
    `| Publish gate | \`${entry.publishGateProfile}\` |`,
    "",
    "## Public Pieces",
    "",
    listValues(publicEntrypoints),
    "",
    "## Proof Commands",
    "",
    `Run from \`${sourcePath}\`:`,
    "",
    ...renderProofCommands(entry).map((command) => `- \`${command}\``),
    "",
    "## Publishing Path",
    "",
    `\`${entry.packageName}\` publishes to \`${entry.ociRepository}\` through the canonical \`.bao\` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.`,
    "<!-- END BAOHAUS PACKAGE CARD -->",
  ];
  return lines.join("\n");
}

export function resolveReadmePath(entry: CatalogPackageEntry): string {
  return join(resolvePackageSourceDirectory(entry), "README.md");
}

export async function writeCanonicalReadme(entry: CatalogPackageEntry): Promise<void> {
  await writeTextFile(resolveReadmePath(entry), renderCanonicalReadme(entry));
}
