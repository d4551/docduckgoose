import { basename, join, resolve } from "node:path";
import { readTarMember } from "./fs-io.ts";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | JsonRecord;

interface JsonRecord {
  readonly [key: string]: JsonValue;
}

interface MissingArchiveDependency {
  readonly archive: string;
  readonly dependencyName: string;
  readonly expectedArchive: string;
}

interface LocalArchiveClosureReport {
  readonly archiveDirectory: string;
  readonly archives: string[];
  readonly missingDependencies: MissingArchiveDependency[];
}

const BAOHAUS_PACKAGE_PREFIX = "@baohaus/";
const MANIFEST_ENTRY = "manifest.json";
const decoder = new TextDecoder();

const isRecord = (value: JsonValue): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const packageArchiveName = (packageName: string): string | null => {
  if (!packageName.startsWith(BAOHAUS_PACKAGE_PREFIX)) {
    return null;
  }
  return `${packageName.slice(BAOHAUS_PACKAGE_PREFIX.length)}.bao`;
};

const readStringField = (record: JsonRecord, field: string): string | null => {
  const value = record[field];
  return typeof value === "string" ? value : null;
};

const readArrayField = (record: JsonRecord, field: string): JsonValue[] => {
  const value = record[field];
  return Array.isArray(value) ? value : [];
};

const addDependencyName = (names: Set<string>, dependency: JsonValue): void => {
  if (!isRecord(dependency)) {
    return;
  }
  const name = readStringField(dependency, "name");
  if (name !== null) {
    names.add(name);
  }
};

const addTargetDependencyNames = (names: Set<string>, target: JsonValue): void => {
  if (!isRecord(target)) {
    return;
  }
  for (const dependency of readArrayField(target, "dependencyLock")) {
    addDependencyName(names, dependency);
  }
};

const collectDependencyNames = (manifest: JsonRecord): string[] => {
  const names = new Set<string>();
  for (const dependency of readArrayField(manifest, "dependencies")) {
    addDependencyName(names, dependency);
  }
  for (const target of readArrayField(manifest, "targets")) {
    addTargetDependencyNames(names, target);
  }
  return [...names].sort((left, right) => left.localeCompare(right));
};

const readArchiveManifest = (archive: string): JsonRecord => {
  const manifest = JSON.parse(decoder.decode(readTarMember(archive, MANIFEST_ENTRY)));
  if (!isRecord(manifest)) {
    throw new Error(`${archive}: ${MANIFEST_ENTRY} must be a JSON object`);
  }
  return manifest;
};

const validateLocalArchiveClosure = async (
  archiveDirectory: string,
): Promise<LocalArchiveClosureReport> => {
  const resolvedDirectory = resolve(archiveDirectory);
  const archives: string[] = [];
  for await (const archive of new Bun.Glob("*.bao").scan({
    cwd: resolvedDirectory,
    onlyFiles: true,
  })) {
    archives.push(archive);
  }
  archives.sort((left, right) => left.localeCompare(right));
  if (archives.length === 0) {
    throw new Error(`${resolvedDirectory}: no .bao archives found`);
  }

  const archiveSet = new Set(archives);
  const missingDependencies: MissingArchiveDependency[] = [];
  for (const archive of archives) {
    const manifest = readArchiveManifest(join(resolvedDirectory, archive));
    for (const dependencyName of collectDependencyNames(manifest)) {
      const expectedArchive = packageArchiveName(dependencyName);
      if (expectedArchive !== null && !archiveSet.has(expectedArchive)) {
        missingDependencies.push({ archive, dependencyName, expectedArchive });
      }
    }
  }

  return {
    archiveDirectory: resolvedDirectory,
    archives,
    missingDependencies,
  };
};

const formatLocalArchiveClosureFailures = (report: LocalArchiveClosureReport): string[] =>
  report.missingDependencies.map(
    (missing) =>
      `${basename(report.archiveDirectory)}/${missing.archive}: ${missing.dependencyName} requires ${missing.expectedArchive}`,
  );

export type { LocalArchiveClosureReport, MissingArchiveDependency };
export { formatLocalArchiveClosureFailures, validateLocalArchiveClosure };
