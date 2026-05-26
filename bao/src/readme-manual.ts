import type { PackageReadmeContext } from "./readme-contract.ts";
import { describeSubpath } from "./readme-source-insights.ts";

const QUICK_START_SCRIPTS = [
  "typecheck",
  "test",
  "lint",
  "build",
  "bao:build",
  "bao:validate",
  "verify",
] as const;

function renderQuickStart(context: PackageReadmeContext): string {
  const commands: string[] = ["bun install"];
  if (context.catalogEntry !== null) {
    for (const command of [
      context.catalogEntry.typecheckCommand,
      context.catalogEntry.testCommand,
      context.catalogEntry.buildCommand,
    ]) {
      if (!commands.includes(command)) {
        commands.push(command);
      }
    }
  }
  for (const script of QUICK_START_SCRIPTS) {
    const entry = `bun run ${script}`;
    if (!commands.includes(entry)) {
      commands.push(entry);
    }
  }
  return [
    "## Quick start",
    "",
    `From \`${context.sourcePath}\`:`,
    "",
    "```bash",
    ...commands,
    "```",
    "",
  ].join("\n");
}

function renderReferenceSection(context: PackageReadmeContext): string {
  const lines = ["## Reference", ""];
  const subpaths =
    context.exportSubpaths.length > 0
      ? context.exportSubpaths
      : context.sourceInsights.primarySubpaths;

  if (subpaths.length > 0) {
    lines.push("### Subpaths", "", "| Subpath | Purpose |", "| --- | --- |");
    const limited = subpaths.slice(0, 12);
    for (const subpath of limited) {
      lines.push(`| \`${subpath}\` | ${describeSubpath(subpath)} |`);
    }
    if (subpaths.length > limited.length) {
      lines.push(
        `| _…_ | _${subpaths.length - limited.length} more in \`package.json#exports\`_ |`,
      );
    }
    lines.push("");
  }

  if (context.sourceInsights.topSymbols.length > 0) {
    lines.push(
      "### Symbols",
      "",
      context.sourceInsights.topSymbols
        .slice(0, 15)
        .map((symbol) => `- \`${symbol}\``)
        .join("\n"),
      "",
    );
  }

  return lines.join("\n");
}

export function renderDefaultManual(context: PackageReadmeContext): string {
  const lines = [
    renderQuickStart(context),
    renderReferenceSection(context),
    "## Integration",
    "",
    `Source tree: \`${context.sourcePath}\`${context.sourceInsights.indexPath === null ? "." : ` — entry \`${context.sourceInsights.indexPath}\`.`}`,
    "Import only documented subpaths from the package card; do not deep-link into `dist/`.",
  ];

  if (context.catalogEntry !== null) {
    lines.push(
      "",
      "## Registry",
      "",
      `Catalog id \`${context.catalogEntry.id}\` → OCI \`${context.catalogEntry.ociRepository}\`.`,
      "Canonical archive path is listed in the package card above.",
    );
  }

  if (context.sourceInsights.hasTests) {
    lines.push(
      "",
      "## Verification",
      "",
      "Tests live under `tests/`; see **Quick start** commands.",
    );
  }

  return lines.join("\n");
}
