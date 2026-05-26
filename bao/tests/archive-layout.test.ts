import { describe, expect, test } from "bun:test";
import {
  ARCHIVE_ENTRIES,
  BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES,
  BAO_LAYOUT_A_CORE_ARCHIVE_ENTRIES,
} from "@baohaus/bao-contracts/bao/bao-archive.contract";
import {
  BAO_GOVERNANCE_ENTRY,
  BAO_LOCK_ARCHIVE_ENTRY,
  BAO_LOCK_ENTRY,
  baoArchiveMembers,
} from "../scripts/lib/archive-layout.ts";

describe("Layout A archive members", () => {
  test("keeps local metadata names separate from archive member paths", () => {
    expect(BAO_GOVERNANCE_ENTRY).toBe("bao-governance.json");
    expect(BAO_LOCK_ENTRY).toBe("bao.lock");
    expect(ARCHIVE_ENTRIES.GOVERNANCE_BAO).toBe("governance/bao-governance.json");
    expect(BAO_LOCK_ARCHIVE_ENTRY).toBe(ARCHIVE_ENTRIES.PROVENANCE_DEP_LOCK);
  });

  test("exposes canonical Layout A required entries", () => {
    expect(BAO_LAYOUT_A_CORE_ARCHIVE_ENTRIES).toEqual([
      ARCHIVE_ENTRIES.MANIFEST_BIN,
      ARCHIVE_ENTRIES.MANIFEST_JSON,
      ARCHIVE_ENTRIES.PAYLOAD_SHARED_KEEP,
    ]);

    expect(BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES).toEqual([
      ...BAO_LAYOUT_A_CORE_ARCHIVE_ENTRIES,
      ARCHIVE_ENTRIES.MANIFEST_SIGNATURE,
      ARCHIVE_ENTRIES.ATTESTATION_SLSA,
      ARCHIVE_ENTRIES.ATTESTATION_SBOM_CYCLONEDX,
      ARCHIVE_ENTRIES.ATTESTATION_SBOM_SPDX,
      ARCHIVE_ENTRIES.ATTESTATION_VEX,
      ARCHIVE_ENTRIES.PROVENANCE_BUILD_ENVIRONMENT,
      ARCHIVE_ENTRIES.PROVENANCE_DEP_GRAPH,
      ARCHIVE_ENTRIES.PROVENANCE_DEP_LOCK,
      ARCHIVE_ENTRIES.PROVENANCE_LICENSES,
      ARCHIVE_ENTRIES.PROVENANCE_PACKUMENT,
      ARCHIVE_ENTRIES.SECURITY_TRUST_POLICY,
      ARCHIVE_ENTRIES.GOVERNANCE_BAO,
    ]);
  });

  test("keeps source metadata proposals out of required archive entries", () => {
    expect(
      BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES.filter((entry) => {
        const archiveEntry = String(entry);
        return (
          archiveEntry.startsWith(".bao/") ||
          archiveEntry === ".bao.lock" ||
          archiveEntry === "bao.lock"
        );
      }),
    ).toEqual([]);
  });

  test("builds sorted Layout A archive member list with optional source tree", () => {
    expect(
      baoArchiveMembers("attestations/custom-sbom.json", "provenance/custom-provenance.json", {
        sourceTree: "payload/shared/src",
      }),
    ).toEqual(
      [
        ...BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES,
        "attestations/custom-sbom.json",
        "provenance/custom-provenance.json",
        "payload/shared/src",
      ].sort(),
    );
  });
});
