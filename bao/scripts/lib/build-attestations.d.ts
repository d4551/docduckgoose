import type { BaoArchiveInput } from "@baohaus/bao-utils/canonical/bao-archive";
import type { BaoLock, BaoManifest, PackageIdentity } from "./schema-guards.ts";
export declare function buildAttestationsFromGovernance(
  governance: BaoManifest,
  identity: PackageIdentity,
  manifestSha: string,
  packageId: string,
  lock: BaoLock,
): NonNullable<BaoArchiveInput["attestations"]>;
//# sourceMappingURL=build-attestations.d.ts.map
