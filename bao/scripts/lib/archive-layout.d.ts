export declare const BAO_GOVERNANCE_ENTRY = "bao-governance.json";
export declare const BAO_LOCK_ENTRY = "bao.lock";
export declare const BAO_LOCK_ARCHIVE_ENTRY: "provenance/dependency-lock.json";
export interface BaoArchiveMembersOptions {
  /** When set, included in the archive (e.g. kit packages ship `src/`). Omit for metadata-only archives. */
  readonly sourceTree?: string;
}
export declare const baoArchiveMembers: (
  sbomPath: string,
  provenancePath: string,
  options?: BaoArchiveMembersOptions,
) => string[];
//# sourceMappingURL=archive-layout.d.ts.map
