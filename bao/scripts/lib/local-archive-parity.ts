import { ARCHIVE_ENTRIES } from "@baohaus/bao-contracts/bao/bao-archive.contract";
import {
  extractBaoArchiveManifest,
  readBaoArchiveEntries,
} from "@baohaus/bao-utils/canonical/bao-archive";
import { BAO_GOVERNANCE_ENTRY, BAO_LOCK_ARCHIVE_ENTRY, BAO_LOCK_ENTRY } from "./archive-layout.ts";
import { canonicalJson } from "./fs-io.ts";
import { assertBaoLock, assertPackageIdentity } from "./schema-guards.ts";

const BAOHAUS_NAME_PREFIX = /^@baohaus\//;

const decoder = new TextDecoder();

const readRequiredEntry = (
  entries: ReadonlyMap<string, Uint8Array>,
  archive: string,
  entryPath: string,
): Uint8Array => {
  const entry = entries.get(entryPath);
  if (entry === undefined) {
    throw new Error(`Archive ${archive} missing required member: ${entryPath}`);
  }
  return entry;
};

export const assertLocalBaoArchiveParity = async (
  archive: string,
  archiveBytes: Uint8Array,
): Promise<void> => {
  const packageJson = assertPackageIdentity(await Bun.file("package.json").json());
  const packageId = packageJson.name.replace(BAOHAUS_NAME_PREFIX, "");
  const manifest = extractBaoArchiveManifest(archiveBytes);

  if (manifest === null) {
    throw new Error(`Archive ${archive} missing canonical manifest.json`);
  }
  if (manifest.metadata.name !== packageId || manifest.metadata.version !== packageJson.version) {
    throw new Error("Archive manifest identity does not match package.json");
  }

  const entries = readBaoArchiveEntries(archiveBytes);
  const governanceJson = decoder.decode(
    readRequiredEntry(entries, archive, ARCHIVE_ENTRIES.GOVERNANCE_BAO),
  );
  const localGovernanceJson = await Bun.file(BAO_GOVERNANCE_ENTRY).text();
  if (governanceJson !== localGovernanceJson) {
    throw new Error(
      "Archive governance/bao-governance.json does not match local bao-governance.json",
    );
  }

  const lockJson = decoder.decode(readRequiredEntry(entries, archive, BAO_LOCK_ARCHIVE_ENTRY));
  const lock = assertBaoLock(JSON.parse(lockJson));
  const localLock = assertBaoLock(await Bun.file(BAO_LOCK_ENTRY).json());
  if (canonicalJson(lock) !== canonicalJson(localLock)) {
    throw new Error("Archive provenance/dependency-lock.json does not match local bao.lock");
  }
};
