import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { BaoArchiveInput } from "@baohaus/bao-utils/canonical/bao-archive";
import { sha256Hex } from "./fs-io.ts";
import type { BaoLock, BaoManifest, PackageIdentity } from "./schema-guards.ts";

type JsonPrimitive = string | number | boolean | null;
interface JsonObject {
  readonly [key: string]: JsonValue;
}
type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];

interface DependencyLicenseInfo {
  readonly name: string;
  readonly version: string;
  readonly license: string | null;
}

function isString(value: JsonValue): value is string {
  return typeof value === "string";
}

function isLicenseEntry(value: JsonValue): value is { type?: string } {
  return typeof value === "object" && value !== null && "type" in value;
}

interface PackageJsonLicense {
  readonly license?: JsonValue | undefined;
  readonly licenses?: JsonValue | undefined;
}

function extractLicense(pkg: PackageJsonLicense): string | null {
  if (pkg.license) {
    return String(pkg.license);
  }
  if (Array.isArray(pkg.licenses) && pkg.licenses.length > 0) {
    const first = pkg.licenses[0];
    if (isLicenseEntry(first)) {
      return first.type ?? String(first);
    }
    return String(first);
  }
  return null;
}

function hasLicenseFields(value: object): value is PackageJsonLicense {
  return "license" in value || "licenses" in value;
}

function readPackageJsonAt(path: string): PackageJsonLicense | null {
  if (!existsSync(path)) {
    return null;
  }
  const text = readFileSync(path, "utf8");
  const parsed: JsonValue = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }
  if (!hasLicenseFields(parsed)) {
    return { license: undefined, licenses: undefined };
  }
  return parsed;
}

function readPackageJsonLicense(packageName: string): string | null {
  const nodeModulesPath = join("node_modules", packageName, "package.json");
  const nodePkg = readPackageJsonAt(nodeModulesPath);
  if (nodePkg) {
    const lic = extractLicense(nodePkg);
    if (lic) {
      return lic;
    }
  }

  if (packageName.startsWith("@baohaus/")) {
    const id = packageName.slice("@baohaus/".length);
    const workspacePath = join("..", "..", "bao-source", id, "package.json");
    const wsPkg = readPackageJsonAt(workspacePath);
    if (wsPkg) {
      return extractLicense(wsPkg);
    }
  }

  return null;
}

function collectDependencyLicenses(lock: BaoLock): DependencyLicenseInfo[] {
  return lock.resolved.map((dep) => ({
    name: dep.name,
    version: dep.version,
    license: readPackageJsonLicense(dep.name),
  }));
}

function readRootLicense(): string {
  const pkg = readPackageJsonAt("package.json");
  if (pkg) {
    const lic = extractLicense(pkg);
    if (lic) {
      return lic;
    }
  }
  return "UNLICENSED";
}

interface GitMetadata {
  readonly commit: string | undefined;
  readonly remote: string | undefined;
  readonly branch: string | undefined;
}

function tryGitMetadata(): GitMetadata {
  const gitAvailable = Bun.which("git") !== null;
  if (!gitAvailable) {
    return { commit: undefined, remote: undefined, branch: undefined };
  }

  const commitResult = Bun.spawnSync(["git", "rev-parse", "HEAD"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const commit = commitResult.success ? commitResult.stdout.toString().trim() : undefined;

  const remoteResult = Bun.spawnSync(["git", "remote", "get-url", "origin"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const remote = remoteResult.success ? remoteResult.stdout.toString().trim() : undefined;

  const branchResult = Bun.spawnSync(["git", "rev-parse", "--abbrev-ref", "HEAD"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const branch = branchResult.success ? branchResult.stdout.toString().trim() : undefined;

  return { commit, remote, branch };
}

interface CycloneDxComponent {
  type: string;
  name: string;
  version: string;
  purl: string;
  hashes?: { alg: string; content: string }[];
  licenses?: { license: { id: string } }[];
}

interface CycloneDxDependency {
  ref: string;
  dependsOn: string[];
}

interface SpdxPackage {
  SPDXID: string;
  name: string;
  versionInfo: string;
  downloadLocation: string;
  filesAnalyzed: boolean;
  licenseConcluded: string;
  licenseDeclared: string;
  externalRefs: { referenceCategory: string; referenceType: string; referenceLocator: string }[];
}

interface SpdxRelationship {
  spdxElementId: string;
  relatedSpdxElement: string;
  relationshipType: string;
}

export function buildAttestationsFromGovernance(
  governance: BaoManifest,
  identity: PackageIdentity,
  manifestSha: string,
  packageId: string,
  lock: BaoLock,
): NonNullable<BaoArchiveInput["attestations"]> {
  const govIdentity = governance.identity;
  const sourceDateEpoch = governance.reproducibleBuild.sourceDateEpoch;
  const builtAt = new Date(sourceDateEpoch * 1000).toISOString();
  const rootLicense = readRootLicense();
  const depLicenses = collectDependencyLicenses(lock);
  const git = tryGitMetadata();

  // CycloneDX 1.6 SBOM
  const components: CycloneDxComponent[] = lock.resolved.map((dep) => {
    const lic = depLicenses.find((d) => d.name === dep.name);
    const comp: CycloneDxComponent = {
      type: "library",
      name: dep.name,
      version: dep.version,
      purl: `pkg:bun/${encodeURIComponent(dep.name)}@${dep.version}`,
    };
    if (dep.ociDigest) {
      comp.hashes = [{ alg: "SHA-256", content: dep.ociDigest.replace("sha256:", "") }];
    }
    if (lic?.license) {
      comp.licenses = [{ license: { id: lic.license } }];
    }
    return comp;
  });

  const cycloneDxDependencies: CycloneDxDependency[] = [];
  if (lock.resolved.length > 0) {
    cycloneDxDependencies.push({
      ref: `pkg:baohaus/${encodeURIComponent(identity.name)}@${identity.version}`,
      dependsOn: lock.resolved.map(
        (dep) => `pkg:bun/${encodeURIComponent(dep.name)}@${dep.version}`,
      ),
    });
  }

  const sbomCycloneDx = {
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    serialNumber: `urn:sha256:${sha256Hex(`${identity.name}@${identity.version}`)}`,
    version: 1,
    metadata: {
      timestamp: builtAt,
      component: {
        type: "library",
        name: identity.name,
        version: identity.version,
        purl: `pkg:baohaus/${encodeURIComponent(identity.name)}@${identity.version}`,
        licenses: [{ license: { id: rootLicense } }],
      },
      tools: [{ vendor: "Baohaus", name: "baohaus-bao", version: "1.0.0" }],
    },
    components,
    dependencies: cycloneDxDependencies,
  };

  // SPDX 2.3 SBOM
  const spdxPackages: SpdxPackage[] = [
    {
      SPDXID: "SPDXRef-Package-root",
      name: identity.name,
      versionInfo: identity.version,
      downloadLocation: git.remote ? `${git.remote}@${git.commit ?? "HEAD"}` : "NOASSERTION",
      filesAnalyzed: false,
      licenseConcluded: rootLicense,
      licenseDeclared: rootLicense,
      externalRefs: [
        {
          referenceCategory: "PACKAGE-MANAGER",
          referenceType: "purl",
          referenceLocator: `pkg:baohaus/${encodeURIComponent(identity.name)}@${identity.version}`,
        },
      ],
    },
    ...lock.resolved.map((dep, index) => {
      const lic = depLicenses.find((d) => d.name === dep.name);
      return {
        SPDXID: `SPDXRef-Package-dep-${index}`,
        name: dep.name,
        versionInfo: dep.version,
        downloadLocation: dep.ociDigest
          ? `https://registry.baohaus.dev/v2/${dep.ociRepository}/blobs/${dep.ociDigest}`
          : "NOASSERTION",
        filesAnalyzed: false,
        licenseConcluded: lic?.license ?? "NOASSERTION",
        licenseDeclared: lic?.license ?? "NOASSERTION",
        externalRefs: [
          {
            referenceCategory: "PACKAGE-MANAGER",
            referenceType: "purl",
            referenceLocator: `pkg:bun/${encodeURIComponent(dep.name)}@${dep.version}`,
          },
        ],
      };
    }),
  ];

  const spdxRelationships: SpdxRelationship[] = [
    {
      spdxElementId: "SPDXRef-DOCUMENT",
      relatedSpdxElement: "SPDXRef-Package-root",
      relationshipType: "DESCRIBES",
    },
    ...lock.resolved.map((_dep, index) => ({
      spdxElementId: "SPDXRef-Package-root",
      relatedSpdxElement: `SPDXRef-Package-dep-${index}`,
      relationshipType: "DEPENDS_ON",
    })),
  ];

  const sbomSpdx = {
    spdxVersion: "SPDX-2.3",
    dataLicense: "CC0-1.0",
    SPDXID: "SPDXRef-DOCUMENT",
    name: identity.name,
    documentNamespace: `https://baohaus.dev/spdx/${encodeURIComponent(identity.name)}/${identity.version}`,
    creationInfo: {
      created: builtAt,
      creators: ["Organization: Baohaus", "Tool: baohaus-bao-1.0.0"],
    },
    packages: spdxPackages,
    relationships: spdxRelationships,
  };

  // SLSA v1 provenance
  const slsaProvenance = {
    _type: "https://in-toto.io/Statement/v1",
    predicateType: "https://slsa.dev/provenance/v1",
    subject: [
      {
        name: govIdentity.ociRepository,
        digest: { sha256: manifestSha },
      },
    ],
    predicate: {
      buildDefinition: {
        buildType: "https://bao.haus/builders/bao-archive/v1",
        externalParameters: {
          packageName: identity.name,
          packageVersion: identity.version,
          sourceRepository: git.remote ?? null,
          sourceCommit: git.commit ?? null,
          sourceBranch: git.branch ?? null,
        },
        internalParameters: {
          bunVersion: governance.reproducibleBuild.toolchain.bun,
          sourceDateEpoch,
        },
        resolvedDependencies: lock.resolved.map((dep) => ({
          uri: `pkg:baohaus/${encodeURIComponent(dep.name)}@${dep.version}`,
          digest: dep.ociDigest ? { sha256: dep.ociDigest.replace("sha256:", "") } : {},
        })),
      },
      runDetails: {
        builder: {
          id: `baohaus/${packageId}`,
          version: { builder: "1.0.0" },
        },
        metadata: {
          invocationId: manifestSha,
          startedOn: builtAt,
          finishedOn: builtAt,
        },
      },
    },
  };

  // OpenVEX 0.2.0
  const vex = {
    "@context": "https://openvex.dev/ns/v0.2.0",
    "@id": `https://baohaus.dev/vex/${encodeURIComponent(identity.name)}/${identity.version}/${manifestSha.slice(0, 16)}`,
    author: "Baohaus Registry",
    role: "document author",
    timestamp: builtAt,
    version: 1,
    statements: [] as readonly string[],
  };

  // License scan
  const licenseScan = {
    timestamp: builtAt,
    licenses: [
      { id: rootLicense, package: identity.name },
      ...depLicenses
        .filter((d) => isString(d.license))
        .map((d) => ({ id: d.license, package: d.name })),
    ],
  };

  // Vulnerability scan (structured for OSV integration)
  const vulnPackages = lock.resolved.map((dep) => ({
    name: dep.name,
    version: dep.version,
    purl: `pkg:bun/${encodeURIComponent(dep.name)}@${dep.version}`,
    ociDigest: dep.ociDigest,
  }));

  const vulnScan = {
    timestamp: builtAt,
    vulnerabilities: [] as readonly string[],
    packages: vulnPackages,
  };

  return {
    slsa: slsaProvenance,
    sbomCycloneDx,
    sbomSpdx,
    vex,
    licenseScan,
    vulnScan,
  };
}
