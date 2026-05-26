#!/usr/bin/env bun
type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}

/**
 * validate:catalog-drift — Cross-checks three sources of truth against each other:
 *
 *   catalog (bao-packages.json)
 *   ↕
 *   per-package bao-governance.json identity fields
 *   ↕
 *   per-package bao.lock identity + resolved dependency resolution state
 *
 * Reports drift between them and exits 1 if any found.
 */

import { join, resolve } from "node:path";
import { baohausRoot, fail, ok } from "./policy/shared.ts";

const BAO_GOVERNANCE_FILE = "bao-governance.json";
const BAO_LOCK_FILE = "bao.lock";
const CATALOG_DIR = `${baohausRoot}/bao-packages`;
const CATALOG_PATH = `${CATALOG_DIR}/bao-packages.json`;
const MISSING_REPORT_LIMIT = 10;

interface FullCatalogEntry {
  readonly id: string;
  readonly packageName: string;
  readonly packageVersion: string;
  readonly repoRoot: string;
  readonly ociRepository: string;
  readonly channel: string;
  readonly visibility: string;
  readonly packageKind: string;
}

function isNonEmptyString(value: JsonField): value is string {
  return typeof value === "string" && value.length > 0;
}

function isRecord(value: JsonField): value is Record<string, JsonValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseFullCatalogEntry(value: JsonField, index: number): FullCatalogEntry {
  if (!isRecord(value)) {
    throw new Error(`catalog.packages[${index}] must be an object`);
  }
  const path = `catalog.packages[${index}]`;
  const requiredStr = (field: string): string => {
    const v = value[field];
    if (isNonEmptyString(v)) {
      return v;
    }
    throw new Error(`${path}.${field} must be a non-empty string`);
  };
  return {
    id: requiredStr("id"),
    packageName: requiredStr("packageName"),
    packageVersion: requiredStr("packageVersion"),
    repoRoot: requiredStr("repoRoot"),
    ociRepository: requiredStr("ociRepository"),
    channel: requiredStr("channel"),
    visibility: requiredStr("visibility"),
    packageKind: requiredStr("packageKind"),
  };
}

async function readCatalog(): Promise<FullCatalogEntry[]> {
  const raw: JsonValue = JSON.parse(await Bun.file(CATALOG_PATH).text());
  if (!isRecord(raw)) {
    throw new Error("catalog must be an object");
  }
  const packages = raw.packages;
  if (!Array.isArray(packages)) {
    throw new Error("catalog.packages must be an array");
  }
  return packages.map(parseFullCatalogEntry);
}

function resolvePkgRoot(repoRoot: string): string {
  return resolve(join(CATALOG_DIR, repoRoot));
}

function governanceDrift(entry: FullCatalogEntry, manifest: Record<string, JsonValue>): string[] {
  const drift: string[] = [];
  const identity = manifest.identity;
  const classification = manifest.classification;

  if (!isRecord(identity)) {
    drift.push("governance: missing or invalid identity");
    return drift;
  }
  if (!isRecord(classification)) {
    drift.push("governance: missing or invalid classification");
    return drift;
  }

  if (identity.id !== entry.id) {
    drift.push(`governance.identity.id=${identity.id} ≠ catalog=${entry.id}`);
  }
  if (identity.packageName !== entry.packageName) {
    drift.push(
      `governance.identity.packageName=${identity.packageName} ≠ catalog=${entry.packageName}`,
    );
  }
  if (identity.packageVersion !== entry.packageVersion) {
    drift.push(
      `governance.identity.packageVersion=${identity.packageVersion} ≠ catalog=${entry.packageVersion}`,
    );
  }
  if (identity.ociRepository !== entry.ociRepository) {
    drift.push(
      `governance.identity.ociRepository=${identity.ociRepository} ≠ catalog=${entry.ociRepository}`,
    );
  }
  if (classification.channel !== entry.channel) {
    drift.push(
      `governance.classification.channel=${classification.channel} ≠ catalog=${entry.channel}`,
    );
  }
  if (classification.visibility !== entry.visibility) {
    drift.push(
      `governance.classification.visibility=${classification.visibility} ≠ catalog=${entry.visibility}`,
    );
  }
  if (classification.packageKind !== entry.packageKind) {
    drift.push(
      `governance.classification.packageKind=${classification.packageKind} ≠ catalog=${entry.packageKind}`,
    );
  }
  return drift;
}

function ociRegistryDepDrift(dep: Record<string, JsonValue>, ref: string): string[] {
  const out: string[] = [];
  if (dep.ociDigest === null || dep.ociDigest === undefined) {
    out.push(`bao.lock: ${ref} oci-registry entry missing ociDigest`);
  }
  if (dep.integrity === null || dep.integrity === undefined) {
    out.push(`bao.lock: ${ref} oci-registry entry missing integrity`);
  }
  if (dep.signature === null || dep.signature === undefined) {
    out.push(`bao.lock: ${ref} oci-registry entry missing signature`);
  }
  return out;
}

interface ResolvedDriftResult {
  readonly failures: string[];
  readonly warnings: string[];
}

function resolvedDrift(resolved: JsonValue[]): ResolvedDriftResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  for (const dep of resolved) {
    if (!isRecord(dep)) {
      continue;
    }
    const depName = isNonEmptyString(dep.name) ? dep.name : "(unresolved-name)";
    const depVersion = isNonEmptyString(dep.version) ? dep.version : "(unresolved-version)";
    const ref = `${depName}@${depVersion}`;
    if (dep.resolvedFrom === "pending-publish") {
      warnings.push(`bao.lock: ${ref} still pending-publish — run bao:resolve`);
    } else if (dep.resolvedFrom === "oci-registry") {
      failures.push(...ociRegistryDepDrift(dep, ref));
    }
  }
  return { failures, warnings };
}

interface LockDriftResult {
  readonly failures: string[];
  readonly warnings: string[];
}

function lockDrift(entry: FullCatalogEntry, lock: Record<string, JsonValue>): LockDriftResult {
  const failures: string[] = [];
  const warnings: string[] = [];

  if (lock.id !== entry.id) {
    failures.push(`bao.lock.id=${lock.id} ≠ catalog=${entry.id}`);
  }
  if (lock.packageName !== entry.packageName) {
    failures.push(`bao.lock.packageName=${lock.packageName} ≠ catalog=${entry.packageName}`);
  }
  if (lock.packageVersion !== entry.packageVersion) {
    failures.push(
      `bao.lock.packageVersion=${lock.packageVersion} ≠ catalog=${entry.packageVersion}`,
    );
  }

  const resolved = lock.resolved;
  if (!Array.isArray(resolved)) {
    failures.push("bao.lock.resolved must be array");
    return { failures, warnings };
  }

  const result = resolvedDrift(resolved);
  failures.push(...result.failures);
  warnings.push(...result.warnings);
  return { failures, warnings };
}

const packages = await readCatalog();
const failures: string[] = [];
const warnings: string[] = [];
let missingGovCount = 0;
let missingLockCount = 0;

for (const entry of packages) {
  const pkgRoot = resolvePkgRoot(entry.repoRoot);
  const govPath = join(pkgRoot, BAO_GOVERNANCE_FILE);
  const lockPath = join(pkgRoot, BAO_LOCK_FILE);

  const [govExists, lockExists] = await Promise.all([
    Bun.file(govPath).exists(),
    Bun.file(lockPath).exists(),
  ]);

  if (govExists) {
    const govRaw: JsonValue = JSON.parse(await Bun.file(govPath).text());
    if (isRecord(govRaw)) {
      const driftLines = governanceDrift(entry, govRaw);
      for (const line of driftLines) {
        failures.push(`[governance-drift] ${entry.packageName}: ${line}`);
      }
    } else {
      failures.push(
        `[governance-drift] ${entry.packageName}: bao-governance.json is not an object`,
      );
    }
  } else {
    missingGovCount += 1;
    if (missingGovCount <= MISSING_REPORT_LIMIT) {
      failures.push(`[missing-governance] ${entry.packageName}: ${BAO_GOVERNANCE_FILE} not found`);
    }
  }

  if (lockExists) {
    const lockRaw: JsonValue = JSON.parse(await Bun.file(lockPath).text());
    if (isRecord(lockRaw)) {
      const drift = lockDrift(entry, lockRaw);
      for (const line of drift.failures) {
        failures.push(`[lock-drift] ${entry.packageName}: ${line}`);
      }
      for (const line of drift.warnings) {
        warnings.push(`[lock-drift] ${entry.packageName}: ${line}`);
      }
    } else {
      failures.push(`[lock-drift] ${entry.packageName}: bao.lock is not an object`);
    }
  } else {
    missingLockCount += 1;
    if (missingLockCount <= MISSING_REPORT_LIMIT) {
      failures.push(`[missing-lock] ${entry.packageName}: ${BAO_LOCK_FILE} not found`);
    }
  }
}

if (missingGovCount > MISSING_REPORT_LIMIT) {
  failures.push(
    `[missing-governance] ...and ${missingGovCount - MISSING_REPORT_LIMIT} more packages missing bao-governance.json`,
  );
}
if (missingLockCount > MISSING_REPORT_LIMIT) {
  failures.push(
    `[missing-lock] ...and ${missingLockCount - MISSING_REPORT_LIMIT} more packages missing bao.lock`,
  );
}

if (warnings.length > 0) {
  Bun.stderr.write(`${warnings.join("\n")}\n`);
}
fail(failures);
ok("validate:catalog-drift");
