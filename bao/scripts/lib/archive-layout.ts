import {
  ARCHIVE_ENTRIES,
  BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES,
} from "@baohaus/bao-contracts/bao/bao-archive.contract";

export const BAO_GOVERNANCE_ENTRY = "bao-governance.json";
export const BAO_LOCK_ENTRY = "bao.lock";
export const BAO_LOCK_ARCHIVE_ENTRY = ARCHIVE_ENTRIES.PROVENANCE_DEP_LOCK;

export interface BaoArchiveMembersOptions {
  /** When set, included in the archive (e.g. kit packages ship `src/`). Omit for metadata-only archives. */
  readonly sourceTree?: string;
}

export const baoArchiveMembers = (
  sbomPath: string,
  provenancePath: string,
  options?: BaoArchiveMembersOptions,
): string[] => {
  const members = new Set<string>([
    ...BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES,
    sbomPath,
    provenancePath,
  ]);
  if (options?.sourceTree) {
    members.add(options.sourceTree);
  }
  return [...members].sort();
};
