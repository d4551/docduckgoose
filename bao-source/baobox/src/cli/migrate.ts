/** Core migration engine — scans files and applies transforms */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { joinCliPath } from "./path.js";
import { detectManualReviewItems, transformApiCalls } from "./transforms/api-calls.js";
import { hasTypeBoxImportDeclaration, transformImport } from "./transforms/imports.js";

interface MigrationOptions {
  dryRun: boolean;
  path: string;
  report: boolean;
  includeJs?: boolean;
}

export interface FileChange {
  filePath: string;
  originalLines: string[];
  transformedLines: string[];
  changedLineNumbers: number[];
  notes: string[];
  manualReviewItems: string[];
}

export interface MigrationReport {
  filesScanned: number;
  filesChanged: number;
  changes: FileChange[];
  totalTransforms: number;
  totalManualReviewItems: number;
}

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "out",
  ".turbo",
  ".cache",
  ".next",
  ".nuxt",
  ".output",
]);

function isTypeScriptFile(path: string): boolean {
  return path.endsWith(".ts") || path.endsWith(".tsx");
}

function isJavaScriptFile(path: string): boolean {
  return (
    path.endsWith(".js") || path.endsWith(".jsx") || path.endsWith(".mjs") || path.endsWith(".cjs")
  );
}

function isSupportedFile(path: string, includeJs: boolean): boolean {
  return isTypeScriptFile(path) || (includeJs && isJavaScriptFile(path));
}

function includesSkippedDirectory(path: string): boolean {
  return path.split("/").some((segment) => SKIP_DIRS.has(segment));
}

async function scanDirectory(dir: string, includeJs: boolean): Promise<string[]> {
  const results: string[] = [];

  async function scanRelative(relativeDirectory: string): Promise<void> {
    const directoryPath =
      relativeDirectory.length === 0 ? dir : joinCliPath(dir, relativeDirectory);
    const entries = await readdir(directoryPath, { withFileTypes: true });

    for (const entry of entries) {
      const relativePath =
        relativeDirectory.length === 0 ? entry.name : `${relativeDirectory}/${entry.name}`;

      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) {
          await scanRelative(relativePath);
        }
        continue;
      }

      if (
        !entry.isFile() ||
        includesSkippedDirectory(relativePath) ||
        !isSupportedFile(relativePath, includeJs)
      ) {
        continue;
      }

      results.push(joinCliPath(dir, relativePath));
    }
  }

  await scanRelative("");

  results.sort();
  return results;
}

function migrateFileContent(content: string, filePath: string): FileChange {
  const lines = content.split("\n");
  const transformedLines: string[] = [];
  const changedLineNumbers: number[] = [];
  const notes: string[] = [];
  const manualReviewItems: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const originalLine = lines[i];
    if (originalLine === undefined) {
      continue;
    }
    let line = originalLine;
    let changed = false;

    // Detect manual review items on the ORIGINAL line before transforms
    manualReviewItems.push(...detectManualReviewItems(originalLine, i + 1));

    // Apply import transforms
    const importResult = transformImport(line);
    if (importResult.changed) {
      line = importResult.line;
      changed = true;
      if (importResult.note) {
        notes.push(`Line ${i + 1}: ${importResult.note}`);
      }
    }

    // Apply API call transforms
    const apiResult = transformApiCalls(line);
    if (apiResult.changed) {
      line = apiResult.line;
      changed = true;
      if (apiResult.note) {
        notes.push(`Line ${i + 1}: ${apiResult.note}`);
      }
    }

    transformedLines.push(line);
    if (changed) {
      changedLineNumbers.push(i + 1);
    }
  }

  return {
    filePath,
    originalLines: lines,
    transformedLines,
    changedLineNumbers,
    notes,
    manualReviewItems,
  };
}

export async function migrate(options: MigrationOptions): Promise<MigrationReport> {
  const files = await scanDirectory(options.path, options.includeJs ?? false);
  const changes: FileChange[] = [];
  let totalTransforms = 0;
  let totalManualReviewItems = 0;

  for (const filePath of files) {
    const content = await readFile(filePath, "utf8");
    if (!hasTypeBoxImportDeclaration(content)) {
      continue;
    }

    const change = migrateFileContent(content, filePath);
    if (change.changedLineNumbers.length > 0 || change.manualReviewItems.length > 0) {
      changes.push(change);
      totalTransforms += change.changedLineNumbers.length;
      totalManualReviewItems += change.manualReviewItems.length;

      if (!options.dryRun && change.changedLineNumbers.length > 0) {
        await writeFile(filePath, change.transformedLines.join("\n"));
      }
    }
  }

  return {
    filesScanned: files.length,
    filesChanged: changes.filter((c) => c.changedLineNumbers.length > 0).length,
    changes,
    totalTransforms,
    totalManualReviewItems,
  };
}
