#!/usr/bin/env bun

import {
  formatLocalArchiveClosureFailures,
  validateLocalArchiveClosure,
} from "./lib/local-archive-closure.ts";

const archiveDirectory = Bun.argv.at(2);

if (archiveDirectory === undefined) {
  throw new Error("Usage: bun run ./scripts/validate-local-archive-closure.ts <archive-directory>");
}

const report = await validateLocalArchiveClosure(archiveDirectory);
const failures = formatLocalArchiveClosureFailures(report);

if (failures.length > 0) {
  throw new Error(`Local .bao archive closure failed:\n${failures.join("\n")}`);
}

Bun.stdout.write(`Local .bao archive closure passed (${report.archives.length} archives)\n`);
