import {
  extractBaoArchiveManifest,
  readBaoArchiveEntries,
} from "@baohaus/bao-utils/canonical/bao-archive";

const PAYLOAD_SHARED_PREFIX = "payload/shared/";
const LOCAL_EXPORT_PREFIX = "./";
const PARENT_SEGMENT = "..";

const toPayloadSharedEntry = (archive: string, packagePath: string): string => {
  if (!packagePath.startsWith(LOCAL_EXPORT_PREFIX)) {
    throw new Error(`${archive}: package entrypoint path must be relative: ${packagePath}`);
  }
  const relativePath = packagePath.slice(LOCAL_EXPORT_PREFIX.length);
  if (relativePath.length === 0 || relativePath.split("/").includes(PARENT_SEGMENT)) {
    throw new Error(`${archive}: package entrypoint path is not safe: ${packagePath}`);
  }
  return `${PAYLOAD_SHARED_PREFIX}${relativePath}`;
};

const collectExportPaths = (exportsRecord: Record<string, string | Record<string, string>>) => {
  const paths: string[] = [];
  for (const exportValue of Object.values(exportsRecord)) {
    if (typeof exportValue === "string") {
      paths.push(exportValue);
      continue;
    }
    paths.push(...Object.values(exportValue));
  }
  return paths;
};

const collectBinPaths = (binRecord: Record<string, string> | undefined): readonly string[] =>
  binRecord === undefined ? [] : Object.values(binRecord);

export const assertLocalBaoArchiveEntrypoints = (
  archive: string,
  archiveBytes: Uint8Array,
): void => {
  const manifest = extractBaoArchiveManifest(archiveBytes);
  if (manifest === null) {
    throw new Error(`${archive}: manifest.json is missing or invalid`);
  }

  const entries = readBaoArchiveEntries(archiveBytes);
  const missingEntrypoints: string[] = [];

  for (const target of manifest.targets) {
    if (target.kind !== "bao-package") {
      continue;
    }
    const packageName = target.packageName;
    const exportPaths = target.exports === undefined ? [] : collectExportPaths(target.exports);
    const binPaths = collectBinPaths(target.bin);
    for (const packagePath of [...exportPaths, ...binPaths]) {
      const archiveEntry = toPayloadSharedEntry(archive, packagePath);
      if (!entries.has(archiveEntry)) {
        missingEntrypoints.push(`${packageName} ${packagePath} -> ${archiveEntry}`);
      }
    }
  }

  if (missingEntrypoints.length > 0) {
    throw new Error(
      `${archive}: package entrypoints point at missing payload files:\n${missingEntrypoints
        .map((entry, index) => `  ${index + 1}. ${entry}`)
        .join("\n")}`,
    );
  }
};
