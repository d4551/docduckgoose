#!/usr/bin/env bun

/**
 * Canonical `.bao` archive validator — runs the full 18-gate validator.
 *
 * Replaces the old Layout B validation (bao-governance.json / bao.lock / sha256 sidecar).
 * Archives built by buildBaoArchive (Layout A) pass through the same validator
 * used by the .bao Registry publisher.
 */

import {
  extractBaoArchiveManifest,
  listBaoArchiveEntriesFromFile,
} from "@baohaus/bao-utils/canonical/bao-archive";
import {
  type ValidationReport,
  validateBaoArchive,
} from "@baohaus/bao-utils/canonical/bao-manifest-validator";
import { BAO_ARCHIVE_OUTPUT_DIR } from "./lib/archive-output.ts";
import { assertLocalBaoArchiveParity } from "./lib/local-archive-parity.ts";
import { collectUnresolvedReleaseDependencies } from "./lib/release-resolution.ts";
import { assertBaoLock, assertPackageIdentity } from "./lib/schema-guards.ts";

const packageJson = assertPackageIdentity(await Bun.file("package.json").json());
const packageId = packageJson.name.replace(/^@baohaus\//, "");
const archive = `${BAO_ARCHIVE_OUTPUT_DIR}/${packageId}.bao`;
const baoLock = assertBaoLock(await Bun.file("bao.lock").json());
const releaseValidation = Bun.argv.includes("--release");

const unresolvedReleaseDependencies = collectUnresolvedReleaseDependencies(baoLock);

if (releaseValidation && unresolvedReleaseDependencies.length > 0) {
  throw new Error(
    `Archive ${archive} is not release-resolved; run bao:resolve against the registry before release validation:\n${unresolvedReleaseDependencies
      .map((entry) => `  - ${entry.name}@${entry.version}: ${entry.resolvedFrom}`)
      .join("\n")}`,
  );
}

if (!(await Bun.file(archive).exists())) {
  throw new Error(`Missing archive: ${archive}`);
}

const archiveBytes = await Bun.file(archive).bytes();

if (archiveBytes.length === 0) {
  throw new Error(`Archive ${archive} is empty`);
}

const archiveManifest = extractBaoArchiveManifest(archiveBytes);
const transparencyLog = archiveManifest?.metadata.signature?.transparencyLog?.trim();
if (releaseValidation && !(typeof transparencyLog === "string" && transparencyLog.length > 0)) {
  throw new Error(
    `Archive ${archive} is missing metadata.signature.transparencyLog; release archives must carry registry-verifiable transparency log material.`,
  );
}

const entries = await listBaoArchiveEntriesFromFile(archive);
if (entries.length === 0) {
  throw new Error(`Archive ${archive} contains no entries`);
}

const report: ValidationReport = await validateBaoArchive(archiveBytes, {});
await assertLocalBaoArchiveParity(archive, archiveBytes);

if (!report.valid) {
  const issueLines = (report.issues ?? []).map((issue, index) => `  ${index + 1}. ${issue}`);
  throw new Error(
    `Archive ${archive} failed validation:\n${issueLines.join("\n")}\n\nGates:\n${report.gates
      .filter((gate) => !gate.valid)
      .map((gate) => `  [${gate.gate}] ${gate.name}: ${gate.issues.join("; ")}`)
      .join("\n")}`,
  );
}

Bun.stdout.write(`${archive} valid (${report.gates.length} gates passed)\n`);

if (!releaseValidation && unresolvedReleaseDependencies.length > 0) {
  Bun.stdout.write(
    `Release lock resolution pending for ${String(unresolvedReleaseDependencies.length)} dependencies; run bao:validate -- --release before publishing.\n`,
  );
}
