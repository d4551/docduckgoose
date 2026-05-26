#!/usr/bin/env bun
import { join } from "node:path";
import { loadCatalog } from "../src/catalog.ts";
import { isJsonObject, readJsonFile } from "../src/fs.ts";
import {
  buildCatalogPathIndex,
  buildPackageReadmeContext,
  discoverPackageRoots,
} from "../src/readme-context.ts";
import {
  ELI5_HEADING,
  eli5MeetsMinimum,
  PACKAGE_CARD_BEGIN,
  PACKAGE_CARD_END,
  readmeContainsEli5AtTop,
  readmeContainsMermaid,
  readmeContainsScopeTable,
  SCOPE_HEADING,
} from "../src/readme-contract.ts";
import { eli5LooksGenericOnly, eli5ReferencesPackage } from "../src/readme-eli5.ts";

interface ValidationFailure {
  sourcePath: string;
  id: string;
  reason: string;
}

const RETIRED_FILLER = [
  "Host apps consume it through",
  "shared parts crate",
  "tool crate on the factory shelf",
  "hand-carve duplicates",
] as const;

function extractEli5Body(content: string): string {
  const lines = content.split("\n");
  const start = lines.findIndex(
    (line) => line === ELI5_HEADING || line === "## Explain Like I'm 5",
  );
  if (start < 0) {
    return "";
  }
  const collected: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (
      line.startsWith("## ") ||
      line.startsWith("```") ||
      line === SCOPE_HEADING ||
      line === "## What This Package Owns"
    ) {
      break;
    }
    if (line.trim().length > 0) {
      collected.push(line.trim());
    }
  }
  return collected.join(" ");
}

async function packageJsonListsReadme(packageRoot: string): Promise<boolean> {
  const packageJsonPath = join(packageRoot, "package.json");
  const value = await readJsonFile(packageJsonPath);
  if (!isJsonObject(value)) {
    return false;
  }
  const files = value.files;
  if (!Array.isArray(files)) {
    return true;
  }
  return files.some((entry) => entry === "README.md");
}

async function main(): Promise<void> {
  const catalog = await loadCatalog();
  const catalogByPath = buildCatalogPathIndex(catalog.packages);
  const packageRoots = await discoverPackageRoots();
  const failures: ValidationFailure[] = [];

  for (const packageRoot of packageRoots) {
    const context = await buildPackageReadmeContext(packageRoot, catalogByPath);
    const readmePath = join(packageRoot, "README.md");
    const file = Bun.file(readmePath);
    if (!(await file.exists())) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "missing README.md",
      });
      continue;
    }
    const content = await file.text();
    if (!readmeContainsEli5AtTop(content)) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "missing Explain Like I'm Five before Architecture",
      });
    }
    if (!readmeContainsMermaid(content)) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "missing Architecture mermaid fenced block",
      });
    }
    if (!readmeContainsScopeTable(content)) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "missing Scope (or legacy ownership) table",
      });
    }
    const eli5Body = extractEli5Body(content);
    if (!eli5MeetsMinimum(eli5Body)) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "ELI5 body below minimum length/sentences",
      });
    }
    if (!eli5ReferencesPackage(eli5Body, context)) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "ELI5 does not reference package id, exports, or description keywords",
      });
    }
    if (eli5LooksGenericOnly(eli5Body)) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "ELI5 is generic filler only",
      });
    }
    for (const phrase of RETIRED_FILLER) {
      if (eli5Body.includes(phrase)) {
        failures.push({
          sourcePath: context.sourcePath,
          id: context.id,
          reason: `ELI5 contains retired filler: ${phrase}`,
        });
      }
    }
    if (
      context.catalogEntry !== null &&
      !(content.includes(PACKAGE_CARD_BEGIN) && content.includes(PACKAGE_CARD_END))
    ) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "catalog package missing package card markers",
      });
    }
    const packageJsonValue = await readJsonFile(join(packageRoot, "package.json"));
    const isPrivate = isJsonObject(packageJsonValue) && packageJsonValue.private === true;
    const listsReadme = await packageJsonListsReadme(packageRoot);
    if (!(listsReadme || isPrivate) && context.catalogEntry?.visibility === "public") {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "package.json files[] should include README.md for publishing",
      });
    }
    if (!(content.includes("## Quick start") || content.includes("## Capability"))) {
      failures.push({
        sourcePath: context.sourcePath,
        id: context.id,
        reason: "manual missing Quick start (or legacy Capability) section",
      });
    }
  }

  if (failures.length > 0) {
    Bun.stderr.write(`[validate:readme-contract] ${failures.length} failure(s):\n`);
    for (const failure of failures.slice(0, 40)) {
      Bun.stderr.write(`- ${failure.sourcePath} (${failure.id}): ${failure.reason}\n`);
    }
    if (failures.length > 40) {
      Bun.stderr.write(`... and ${failures.length - 40} more\n`);
    }
    process.exit(1);
  }

  Bun.stdout.write(`[validate:readme-contract] ok (${packageRoots.length} package roots)\n`);
}

await main();
