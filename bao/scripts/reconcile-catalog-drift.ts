#!/usr/bin/env bun
type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}

/**
 * reconcile:catalog-drift — Rewrites identity fields in bao-governance.json and bao.lock
 * to match the catalog, fixing drift that validate:catalog-drift would flag.
 *
 * Only touches the specific drifting fields; all other content is preserved.
 * Packages with missing governance or lock files are reported but not created.
 *
 * Exit codes: `0` all reconciled, `1` irreconcilable issues remain.
 */

import { join, resolve } from "node:path";
import { baohausRoot, ok } from "./policy/shared.ts";

const BAO_GOVERNANCE_FILE = "bao-governance.json";
const BAO_LOCK_FILE = "bao.lock";
const CATALOG_DIR = `${baohausRoot}/bao-packages`;
const CATALOG_PATH = `${CATALOG_DIR}/bao-packages.json`;

interface CatalogEntry {
  readonly id: string;
  readonly packageName: string;
  readonly packageVersion: string;
  readonly repoRoot: string;
  readonly ociRepository: string;
  readonly channel: string;
  readonly visibility: string;
  readonly packageKind: string;
}

function isRecord(value: JsonField): value is Record<string, JsonValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: JsonField): value is string {
  return typeof value === "string" && value.length > 0;
}

function parseCatalogEntry(value: JsonField, index: number): CatalogEntry {
  if (!isRecord(value)) {
    throw new Error(`catalog.packages[${index}] must be an object`);
  }
  const p = `catalog.packages[${index}]`;
  const str = (field: string): string => {
    const v = value[field];
    if (isNonEmptyString(v)) {
      return v;
    }
    throw new Error(`${p}.${field} must be a non-empty string`);
  };
  return {
    id: str("id"),
    packageName: str("packageName"),
    packageVersion: str("packageVersion"),
    repoRoot: str("repoRoot"),
    ociRepository: str("ociRepository"),
    channel: str("channel"),
    visibility: str("visibility"),
    packageKind: str("packageKind"),
  };
}

async function readCatalog(): Promise<CatalogEntry[]> {
  const raw: JsonValue = JSON.parse(await Bun.file(CATALOG_PATH).text());
  if (!(isRecord(raw) && Array.isArray(raw.packages))) {
    throw new Error("Invalid catalog shape");
  }
  return (raw.packages as JsonValue[]).map(parseCatalogEntry);
}

function resolvePkgRoot(repoRoot: string): string {
  return resolve(join(CATALOG_DIR, repoRoot));
}

function needsGovernanceUpdate(entry: CatalogEntry, gov: Record<string, JsonValue>): boolean {
  const identity = gov.identity;
  const classification = gov.classification;
  if (!(isRecord(identity) && isRecord(classification))) {
    return true;
  }
  return (
    identity.id !== entry.id ||
    identity.packageName !== entry.packageName ||
    identity.packageVersion !== entry.packageVersion ||
    identity.ociRepository !== entry.ociRepository ||
    classification.channel !== entry.channel ||
    classification.visibility !== entry.visibility ||
    classification.packageKind !== entry.packageKind
  );
}

function reconcileGovernance(
  entry: CatalogEntry,
  gov: Record<string, JsonValue>,
): Record<string, JsonValue> {
  const identity = isRecord(gov.identity) ? gov.identity : {};
  const classification = isRecord(gov.classification) ? gov.classification : {};
  return {
    ...gov,
    identity: {
      ...identity,
      id: entry.id,
      packageName: entry.packageName,
      packageVersion: entry.packageVersion,
      ociRepository: entry.ociRepository,
    },
    classification: {
      ...classification,
      channel: entry.channel,
      visibility: entry.visibility,
      packageKind: entry.packageKind,
    },
  };
}

function needsLockUpdate(entry: CatalogEntry, lock: Record<string, JsonValue>): boolean {
  return (
    lock.id !== entry.id ||
    lock.packageName !== entry.packageName ||
    lock.packageVersion !== entry.packageVersion
  );
}

function reconcileLock(
  entry: CatalogEntry,
  lock: Record<string, JsonValue>,
): Record<string, JsonValue> {
  return {
    ...lock,
    id: entry.id,
    packageName: entry.packageName,
    packageVersion: entry.packageVersion,
  };
}

const catalog = await readCatalog();
let fixedCount = 0;
let skippedCount = 0;
const irreconcilable: string[] = [];

for (const entry of catalog) {
  const pkgRoot = resolvePkgRoot(entry.repoRoot);
  const govPath = join(pkgRoot, BAO_GOVERNANCE_FILE);
  const lockPath = join(pkgRoot, BAO_LOCK_FILE);

  const [govFile, lockFile] = [Bun.file(govPath), Bun.file(lockPath)];
  const [govExists, lockExists] = await Promise.all([govFile.exists(), lockFile.exists()]);

  if (govExists) {
    const govRaw: JsonValue = JSON.parse(await govFile.text());
    if (!isRecord(govRaw)) {
      irreconcilable.push(`${entry.packageName}: ${BAO_GOVERNANCE_FILE} is not an object`);
    } else if (needsGovernanceUpdate(entry, govRaw)) {
      const updated = reconcileGovernance(entry, govRaw);
      await Bun.write(govPath, `${JSON.stringify(updated, null, 2)}\n`);
      fixedCount += 1;
    } else {
      skippedCount += 1;
    }
  } else {
    irreconcilable.push(`${entry.packageName}: ${BAO_GOVERNANCE_FILE} missing`);
  }

  if (lockExists) {
    const lockRaw: JsonValue = JSON.parse(await lockFile.text());
    if (!isRecord(lockRaw)) {
      irreconcilable.push(`${entry.packageName}: ${BAO_LOCK_FILE} is not an object`);
    } else if (needsLockUpdate(entry, lockRaw)) {
      const updated = reconcileLock(entry, lockRaw);
      await Bun.write(lockPath, `${JSON.stringify(updated, null, 2)}\n`);
      fixedCount += 1;
    } else {
      skippedCount += 1;
    }
  } else {
    irreconcilable.push(`${entry.packageName}: ${BAO_LOCK_FILE} missing`);
  }
}

if (irreconcilable.length > 0) {
  Bun.stderr.write(`Irreconcilable drift (missing files):\n  ${irreconcilable.join("\n  ")}\n`);
  process.exit(1);
}

ok(`reconcile:catalog-drift — fixed ${fixedCount}, already aligned ${skippedCount}`);
