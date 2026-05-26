#!/usr/bin/env bun
import { join } from "node:path";
import { loadCatalog } from "../src/catalog.ts";
import { REPO_ROOT } from "../src/constants.ts";
import { writeTextFile } from "../src/fs.ts";
import { renderMergedReadme } from "../src/readme.ts";
import {
  buildCatalogPathIndex,
  buildPackageReadmeContext,
  discoverPackageRoots,
} from "../src/readme-context.ts";
import {
  overviewMeetsMinimum,
  PACKAGE_CARD_BEGIN,
  readmeContainsMermaid,
  readmeContainsOverviewInHeader,
} from "../src/readme-contract.ts";
import { loadReadmeOverrides, resolveOverride } from "../src/readme-overrides.ts";

interface SyncOptions {
  write: boolean;
  onlyMissing: boolean;
  strict: boolean;
  catalogId: string | null;
}

interface PackageGap {
  packageRoot: string;
  sourcePath: string;
  id: string;
  missingReadme: boolean;
  missingEli5: boolean;
  missingMermaid: boolean;
  missingCard: boolean;
  weakEli5: boolean;
}

function parseArgs(argv: string[]): SyncOptions {
  let write = false;
  let onlyMissing = false;
  let strict = false;
  let catalogId: string | null = null;
  for (const arg of argv) {
    if (arg === "--write") {
      write = true;
    } else if (arg === "--only-missing") {
      onlyMissing = true;
    } else if (arg === "--strict") {
      strict = true;
    } else if (arg.startsWith("--id=")) {
      catalogId = arg.slice("--id=".length);
    }
  }
  return { write, onlyMissing, strict, catalogId };
}

async function readReadmeIfExists(path: string): Promise<string | null> {
  const file = Bun.file(path);
  if (!(await file.exists())) {
    return null;
  }
  return file.text();
}

function inspectGap(
  sourcePath: string,
  packageRoot: string,
  id: string,
  content: string | null,
): PackageGap {
  const missingReadme = content === null;
  const body = content ?? "";
  return {
    packageRoot,
    sourcePath,
    id,
    missingReadme,
    missingEli5: missingReadme || !readmeContainsOverviewInHeader(body),
    missingMermaid: missingReadme || !readmeContainsMermaid(body),
    missingCard: missingReadme || !body.includes(PACKAGE_CARD_BEGIN),
    weakEli5: missingReadme,
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const catalog = await loadCatalog();
  const catalogByPath = buildCatalogPathIndex(catalog.packages);
  const overrides = await loadReadmeOverrides();
  const packageRoots = await discoverPackageRoots();

  const gaps: PackageGap[] = [];
  let updated = 0;
  let skipped = 0;

  for (const packageRoot of packageRoots) {
    const context = await buildPackageReadmeContext(packageRoot, catalogByPath);
    if (options.catalogId !== null && context.id !== options.catalogId) {
      continue;
    }

    const readmePath = join(packageRoot, "README.md");
    const existing = await readReadmeIfExists(readmePath);
    const gap = inspectGap(context.sourcePath, packageRoot, context.id, existing);
    gaps.push(gap);

    if (options.onlyMissing && existing !== null) {
      skipped += 1;
      continue;
    }

    const override = resolveOverride(overrides, context.id, context.packageName);
    const merged = renderMergedReadme(context, override, existing);

    if (!overviewMeetsMinimum(merged) && options.strict) {
      throw new Error(`Overview below minimum for ${context.sourcePath}`);
    }

    if (options.write) {
      await writeTextFile(readmePath, merged);
      updated += 1;
    }
  }

  const auditPath = join(REPO_ROOT, "audit", "readme-contract-2026-05-19.json");
  const auditPayload = {
    generatedAt: new Date().toISOString(),
    packageCount: packageRoots.length,
    write: options.write,
    updated,
    skipped,
    summary: {
      missingReadme: gaps.filter((gap) => gap.missingReadme).length,
      missingEli5: gaps.filter((gap) => gap.missingEli5).length,
      missingMermaid: gaps.filter((gap) => gap.missingMermaid).length,
      missingCard: gaps.filter((gap) => gap.missingCard).length,
    },
    gaps,
  };
  await writeTextFile(auditPath, `${JSON.stringify(auditPayload, null, 2)}\n`);

  const mode = options.write ? "write" : "dry-run";
  Bun.stdout.write(
    `[readme-sync:${mode}] packages=${packageRoots.length} updated=${updated} skipped=${skipped} missingReadme=${auditPayload.summary.missingReadme} audit=${auditPath}\n`,
  );

  if (options.strict && !options.write) {
    const blockers = gaps.filter(
      (gap) => gap.missingReadme || gap.missingEli5 || gap.missingMermaid,
    );
    if (blockers.length > 0) {
      Bun.stderr.write(
        `[readme-sync] strict mode: ${blockers.length} packages still non-compliant\n`,
      );
      process.exit(1);
    }
  }
}

await main();
