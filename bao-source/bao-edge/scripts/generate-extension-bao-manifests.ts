/**
 * Generate .bao manifest files for extensions discovered in the project.
 *
 * Usage:
 *   bun scripts/generate-extension-bao-manifests.ts
 *   bun scripts/generate-extension-bao-manifests.ts --check
 *   bun scripts/generate-extension-bao-manifests.ts --kind elysia-plugin
 *
 * --check   Validate existing manifests without writing
 * --kind    Only process a specific target kind
 */

import path from "node:path";
import {
  BAO_INSTALL_TARGET_KIND_VALUES,
  type BaoInstallTargetKind,
} from "@baohaus/bao-schemas/bao-install/core.schemas";
import {
  type BaoManifest,
  BaoManifestSchema,
} from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { computeBaoManifestChecksum } from "@baohaus/bao-schemas/bao-install/manifest-checksum";
import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { Value } from "@baohaus/baobox/value";
import { Glob } from "bun";
import { writeBaoArchiveFile } from "../shared/bao/bao-archive.ts";

// CLI Arguments

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const kindIndex = args.indexOf("--kind");
const filterKindCandidate = kindIndex >= 0 ? args[kindIndex + 1] : undefined;
const targetKindSet = new Set<string>(BAO_INSTALL_TARGET_KIND_VALUES);

function log(msg: string): void {
  process.stdout.write(`${msg}\n`);
}

function logError(msg: string): void {
  process.stderr.write(`${msg}\n`);
}

function isBaoInstallTargetKind(value: string | undefined): value is BaoInstallTargetKind {
  return value !== undefined && targetKindSet.has(value);
}

if (filterKindCandidate !== undefined && !isBaoInstallTargetKind(filterKindCandidate)) {
  logError(`Unknown target kind: "${filterKindCandidate}"`);
  logError(`Supported kinds: ${BAO_INSTALL_TARGET_KIND_VALUES.join(", ")}`);
  process.exit(1);
}
const filterKind = isBaoInstallTargetKind(filterKindCandidate) ? filterKindCandidate : undefined;

// Extension Discovery Patterns

interface ExtensionPattern {
  kind: BaoInstallTargetKind;
  glob: string;
  baseDir: string;
  extractTarget: (filePath: string) => string;
  buildTarget: (filePath: string, relativePath: string) => BaoInstallTarget;
}

const PROJECT_ROOT = path.resolve(import.meta.dir, "..");
const CONTROL_PLANE_SRC = path.join(PROJECT_ROOT, "command-bao", "src");
const SRC_ROOT = path.join(PROJECT_ROOT, "src");

const EXTENSION_PATTERNS: ExtensionPattern[] = [
  {
    kind: "elysia-plugin",
    glob: "**/*.plugin.ts",
    baseDir: path.join(CONTROL_PLANE_SRC, "plugins"),
    extractTarget: (fp) => path.basename(fp, ".plugin.ts"),
    buildTarget: (_fp, rel) => ({
      kind: "elysia-plugin",
      target: path.basename(rel, ".plugin.ts"),
      plugin: `./${rel}`,
    }),
  },
  {
    kind: "htmx-extension",
    glob: "**/*.js",
    baseDir: path.join(CONTROL_PLANE_SRC, "static", "htmx-ext"),
    extractTarget: (fp) => `htmx.ext.local.${path.basename(fp, ".js")}`,
    buildTarget: (_fp, rel) => ({
      kind: "htmx-extension",
      target: `htmx.ext.local.${path.basename(rel, ".js")}`,
      extension: `./${rel}`,
    }),
  },
  {
    kind: "prisma-extension",
    glob: "**/*-extension.ts",
    baseDir: path.join(CONTROL_PLANE_SRC, "database"),
    extractTarget: (fp) => `prisma.ext.${path.basename(fp, ".ts").replace("-extension", "")}`,
    buildTarget: (_fp, rel) => ({
      kind: "prisma-extension",
      target: `prisma.ext.${path.basename(rel, ".ts").replace("-extension", "")}`,
      extension: `./${rel}`,
    }),
  },
  {
    kind: "mcp-provider",
    glob: "**/*-mcp.service.ts",
    baseDir: path.join(SRC_ROOT, "services", "mcp"),
    extractTarget: (fp) => `provider.${path.basename(fp, ".service.ts").replace("-mcp", "")}`,
    buildTarget: (_fp, rel) => ({
      kind: "mcp-provider",
      target: `provider.${path.basename(rel, ".service.ts").replace("-mcp", "")}`,
      provider: `./${rel}`,
    }),
  },
  {
    kind: "bun-plugin",
    glob: "**/*.bun-plugin.ts",
    baseDir: SRC_ROOT,
    extractTarget: (fp) => path.basename(fp, ".bun-plugin.ts"),
    buildTarget: (_fp, rel) => ({
      kind: "bun-plugin",
      target: path.basename(rel, ".bun-plugin.ts"),
      plugin: `./${rel}`,
    }),
  },
  {
    kind: "flatbuffer-schema",
    glob: "**/*.fbs",
    baseDir: PROJECT_ROOT,
    extractTarget: (fp) => path.basename(fp, ".fbs"),
    buildTarget: (_fp, rel) => ({
      kind: "flatbuffer-schema",
      target: path.basename(rel, ".fbs"),
      schemaPath: `./${rel}`,
    }),
  },
  {
    kind: "baodown-node",
    glob: "**/*.baodown.ts",
    baseDir: SRC_ROOT,
    extractTarget: (fp) => path.basename(fp, ".baodown.ts"),
    buildTarget: (_fp, rel) => ({
      kind: "baodown-node",
      target: path.basename(rel, ".baodown.ts"),
      nodeModule: `./${rel}`,
    }),
  },
  {
    kind: "better-auth-extension",
    glob: "**/*-auth-provider.ts",
    baseDir: path.join(SRC_ROOT, "auth"),
    extractTarget: (fp) => path.basename(fp, ".ts").replace("-auth-provider", ""),
    buildTarget: (_fp, rel) => ({
      kind: "better-auth-extension",
      target: path.basename(rel, ".ts").replace("-auth-provider", ""),
      provider: `./${rel}`,
    }),
  },
];

// Discovery and Generation

async function discoverExtensions(
  pattern: ExtensionPattern,
): Promise<Array<{ filePath: string; relativePath: string }>> {
  const results: Array<{ filePath: string; relativePath: string }> = [];
  const glob = new Glob(pattern.glob);
  for await (const match of glob.scan({ cwd: pattern.baseDir, absolute: true })) {
    results.push({ filePath: match, relativePath: path.relative(pattern.baseDir, match) });
  }
  return results.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

async function generateManifestForExtension(
  pattern: ExtensionPattern,
  filePath: string,
  relativePath: string,
): Promise<BaoManifest> {
  const targetName = pattern.extractTarget(filePath);
  const target = pattern.buildTarget(filePath, relativePath);

  const manifest: BaoManifest = {
    schemaVersion: 1,
    description: `Auto-generated manifest for ${pattern.kind} "${targetName}"`,
    metadata: {
      name: targetName,
      version: "0.1.0",
      description: `${pattern.kind} extension: ${targetName}`,
      source: filePath,
    },
    targets: [target],
  };

  const checksum = await computeBaoManifestChecksum(manifest);
  manifest.metadata.checksum = { algorithm: "sha256", value: checksum };
  return manifest;
}

// Main

let exitCode = 0;
let totalFound = 0;
let totalGenerated = 0;
let totalErrors = 0;

const patterns = filterKind
  ? EXTENSION_PATTERNS.filter((p) => p.kind === filterKind)
  : EXTENSION_PATTERNS;

for (const pattern of patterns) {
  const extensions = await discoverExtensions(pattern);
  if (extensions.length === 0) {
    continue;
  }

  log(`\n[${pattern.kind}] Found ${String(extensions.length)} extension(s) in ${pattern.baseDir}`);
  totalFound += extensions.length;

  for (const { filePath, relativePath } of extensions) {
    const manifest = await generateManifestForExtension(pattern, filePath, relativePath);
    const isValid = Value.Check(BaoManifestSchema, manifest);

    if (!isValid) {
      for (const err of Value.Errors(BaoManifestSchema, manifest)) {
        logError(`  ERROR: ${err.path}: ${err.message}`);
      }
      totalErrors++;
      exitCode = 1;
      continue;
    }

    if (checkOnly) {
      log(`  OK: ${relativePath} → ${manifest.metadata.name}`);
      continue;
    }

    const outputPath = filePath.replace(/\.[^.]+$/, ".bao");
    await writeBaoArchiveFile({ outputPath, manifest });
    log(`  GENERATED: ${relativePath} → ${outputPath}`);
    totalGenerated++;
  }
}

log(
  `\nSummary: ${String(totalFound)} found, ${String(totalGenerated)} generated, ${String(totalErrors)} errors`,
);
process.exit(exitCode);
