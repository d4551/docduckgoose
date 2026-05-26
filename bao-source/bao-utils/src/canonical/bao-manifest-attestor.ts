import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { OpenVexDocument, VexStatement } from "./bao-manifest-attestor.types.ts";
import { sha256Hex } from "./bao-manifest-checksum.ts";

export interface BuildContext {
  readonly builder: { readonly id: string; readonly version: string };
  readonly buildType: string;
  readonly startedAt: string;
  readonly finishedAt: string;
  readonly sourceUri: string;
  readonly sourceCommit: string;
  readonly sourceRepository?: string;
  readonly isolated: boolean;
  readonly reproducible: boolean;
  readonly parameters?: Record<string, unknown>;
  readonly materials?: ReadonlyArray<{
    readonly uri: string;
    readonly digest: Record<string, string>;
  }>;
  readonly bunVersion: string;
  readonly os: string;
  readonly arch: string;
}

export interface SlsaProvenanceV1 {
  readonly _type: "https://in-toto.io/Statement/v1";
  readonly predicateType: "https://slsa.dev/provenance/v1";
  readonly subject: ReadonlyArray<{
    readonly name: string;
    readonly digest: { readonly sha256: string };
  }>;
  readonly predicate: {
    readonly buildDefinition: {
      readonly buildType: string;
      readonly externalParameters: Record<string, unknown>;
      readonly internalParameters: Record<string, unknown>;
      readonly resolvedDependencies: ReadonlyArray<{
        readonly uri: string;
        readonly digest: Record<string, string>;
      }>;
    };
    readonly runDetails: {
      readonly builder: {
        readonly id: string;
        readonly version: { readonly [key: string]: string };
      };
      readonly metadata: {
        readonly invocationId: string;
        readonly startedOn: string;
        readonly finishedOn: string;
      };
      readonly byproducts: ReadonlyArray<{
        readonly name: string;
        readonly uri: string;
        readonly digest: Record<string, string>;
      }>;
    };
  };
}

export function emitSlsaProvenance(
  manifest: BaoManifest,
  archiveSha256: string,
  context: BuildContext,
): SlsaProvenanceV1 {
  return {
    _type: "https://in-toto.io/Statement/v1",
    predicateType: "https://slsa.dev/provenance/v1",
    subject: [
      {
        name: manifest.metadata.name,
        digest: { sha256: archiveSha256 },
      },
    ],
    predicate: {
      buildDefinition: {
        buildType: context.buildType,
        externalParameters: context.parameters ?? {},
        internalParameters: {
          bunVersion: context.bunVersion,
          os: context.os,
          arch: context.arch,
          isolated: context.isolated,
          reproducible: context.reproducible,
        },
        resolvedDependencies: (context.materials ?? []).map((material) => ({
          uri: material.uri,
          digest: material.digest,
        })),
      },
      runDetails: {
        builder: {
          id: context.builder.id,
          version: { builder: context.builder.version },
        },
        metadata: {
          invocationId: sha256Hex(
            `${context.sourceCommit}:${context.startedAt}:${manifest.metadata.version}`,
          ),
          startedOn: context.startedAt,
          finishedOn: context.finishedAt,
        },
        byproducts: [
          {
            name: "manifest.bin",
            uri: `pkg:baohaus/${manifest.metadata.name}@${manifest.metadata.version}`,
            digest: { sha256: archiveSha256 },
          },
        ],
      },
    },
  };
}

export interface CycloneDxSbomV16 {
  readonly $schema: "http://cyclonedx.org/schema/bom-1.6.schema.json";
  readonly bomFormat: "CycloneDX";
  readonly specVersion: "1.6";
  readonly serialNumber: string;
  readonly version: number;
  readonly metadata: {
    readonly timestamp: string;
    readonly component: {
      readonly type: "library" | "application" | "framework";
      readonly name: string;
      readonly version: string;
      readonly purl: string;
      readonly licenses?: ReadonlyArray<{ readonly license: { readonly id: string } }>;
    };
    readonly tools?: ReadonlyArray<{
      readonly vendor: string;
      readonly name: string;
      readonly version: string;
    }>;
  };
  readonly components: ReadonlyArray<{
    readonly type: "library";
    readonly name: string;
    readonly version: string;
    readonly purl: string;
    readonly hashes?: ReadonlyArray<{ readonly alg: "SHA-256"; readonly content: string }>;
  }>;
  readonly dependencies: ReadonlyArray<{
    readonly ref: string;
    readonly dependsOn?: readonly string[];
  }>;
}

export interface DependencyResolution {
  readonly name: string;
  readonly version: string;
  readonly purl: string;
  readonly sha256?: string;
  readonly dependsOn?: readonly string[];
}

export function emitSbomCycloneDx(
  manifest: BaoManifest,
  resolvedDependencies: readonly DependencyResolution[],
  builtAt: string,
): CycloneDxSbomV16 {
  const rootPurl = `pkg:baohaus/${encodeURIComponent(manifest.metadata.name)}@${manifest.metadata.version}`;
  return {
    $schema: "http://cyclonedx.org/schema/bom-1.6.schema.json",
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    serialNumber: `urn:uuid:${deterministicUuid(rootPurl)}`,
    version: DOCUMENT_VERSION,
    metadata: {
      timestamp: builtAt,
      component: {
        type: "library",
        name: manifest.metadata.name,
        version: manifest.metadata.version,
        purl: rootPurl,
        licenses: [{ license: { id: "NOASSERTION" } }],
      },
      tools: [{ vendor: "Baohaus", name: "baohaus-bao", version: "1.0.0" }],
    },
    components: resolvedDependencies.map((dep) => ({
      type: "library",
      name: dep.name,
      version: dep.version,
      purl: dep.purl,
      hashes: dep.sha256 ? [{ alg: "SHA-256", content: dep.sha256 }] : undefined,
    })),
    dependencies: [
      { ref: rootPurl, dependsOn: resolvedDependencies.map((dep) => dep.purl) },
      ...resolvedDependencies.map((dep) => ({
        ref: dep.purl,
        dependsOn: dep.dependsOn,
      })),
    ],
  };
}

export interface SpdxSbomV23 {
  readonly spdxVersion: "SPDX-2.3";
  readonly dataLicense: "CC0-1.0";
  readonly SPDXID: "SPDXRef-DOCUMENT";
  readonly name: string;
  readonly documentNamespace: string;
  readonly creationInfo: {
    readonly created: string;
    readonly creators: readonly string[];
  };
  readonly packages: ReadonlyArray<{
    readonly SPDXID: string;
    readonly name: string;
    readonly versionInfo: string;
    readonly downloadLocation: string;
    readonly filesAnalyzed: boolean;
    readonly licenseConcluded: string;
    readonly licenseDeclared: string;
    readonly externalRefs?: ReadonlyArray<{
      readonly referenceCategory: "PACKAGE-MANAGER";
      readonly referenceType: "purl";
      readonly referenceLocator: string;
    }>;
  }>;
  readonly relationships: ReadonlyArray<{
    readonly spdxElementId: string;
    readonly relationshipType: "DESCRIBES" | "DEPENDS_ON";
    readonly relatedSpdxElement: string;
  }>;
}

const SPDX_IDENTIFIER_HASH_LENGTH = 16;
const UUID_VARIANT_INDEX = 16;
const UUID_SEGMENT_ONE_START = 0;
const UUID_SEGMENT_ONE_END = 8;
const UUID_SEGMENT_TWO_START = 8;
const UUID_SEGMENT_TWO_END = 12;
const UUID_SEGMENT_THREE_SOURCE_START = 13;
const UUID_SEGMENT_THREE_SOURCE_END = 16;
const UUID_SEGMENT_FOUR_SOURCE_START = 17;
const UUID_SEGMENT_FOUR_SOURCE_END = 20;
const UUID_SEGMENT_FIVE_START = 20;
const UUID_SEGMENT_FIVE_END = 32;
const UUID_VERSION_PREFIX = "4";
const UUID_VARIANT_MASK = 0x3;
const UUID_VARIANT_PREFIX_MASK = 0x8;
const HEX_RADIX = 16;
const DOCUMENT_VERSION = 1;

function toSpdxPackageId(seed: string): string {
  return `SPDXRef-Package-${sha256Hex(seed).slice(0, SPDX_IDENTIFIER_HASH_LENGTH)}`;
}

export function emitSbomSpdx(
  manifest: BaoManifest,
  resolvedDependencies: readonly DependencyResolution[],
  builtAt: string,
): SpdxSbomV23 {
  const rootId = toSpdxPackageId(manifest.metadata.name);
  return {
    spdxVersion: "SPDX-2.3",
    dataLicense: "CC0-1.0",
    SPDXID: "SPDXRef-DOCUMENT",
    name: manifest.metadata.name,
    documentNamespace: `https://baohaus.dev/spdx/${encodeURIComponent(manifest.metadata.name)}/${manifest.metadata.version}`,
    creationInfo: {
      created: builtAt,
      creators: ["Organization: Baohaus", "Tool: baohaus-bao-1.0.0"],
    },
    packages: [
      {
        SPDXID: rootId,
        name: manifest.metadata.name,
        versionInfo: manifest.metadata.version,
        downloadLocation: "NOASSERTION",
        filesAnalyzed: false,
        licenseConcluded: "NOASSERTION",
        licenseDeclared: "NOASSERTION",
        externalRefs: [
          {
            referenceCategory: "PACKAGE-MANAGER",
            referenceType: "purl",
            referenceLocator: `pkg:baohaus/${encodeURIComponent(manifest.metadata.name)}@${manifest.metadata.version}`,
          },
        ],
      },
      ...resolvedDependencies.map((dep) => ({
        SPDXID: toSpdxPackageId(dep.purl),
        name: dep.name,
        versionInfo: dep.version,
        downloadLocation: "NOASSERTION",
        filesAnalyzed: false,
        licenseConcluded: "NOASSERTION",
        licenseDeclared: "NOASSERTION",
        externalRefs: [
          {
            referenceCategory: "PACKAGE-MANAGER" as const,
            referenceType: "purl" as const,
            referenceLocator: dep.purl,
          },
        ],
      })),
    ],
    relationships: [
      {
        spdxElementId: "SPDXRef-DOCUMENT",
        relationshipType: "DESCRIBES",
        relatedSpdxElement: rootId,
      },
      ...resolvedDependencies.map((dep) => ({
        spdxElementId: rootId,
        relationshipType: "DEPENDS_ON" as const,
        relatedSpdxElement: toSpdxPackageId(dep.purl),
      })),
    ],
  };
}

export function emitVex(
  manifest: BaoManifest,
  statements: readonly VexStatement[],
  author: string,
  builtAt: string,
): OpenVexDocument {
  return {
    "@context": "https://openvex.dev/ns/v0.2.0",
    "@id": `https://baohaus.dev/vex/${encodeURIComponent(manifest.metadata.name)}/${manifest.metadata.version}/${sha256Hex(builtAt).slice(0, SPDX_IDENTIFIER_HASH_LENGTH)}`,
    author,
    role: "document author",
    timestamp: builtAt,
    version: DOCUMENT_VERSION,
    statements,
  };
}

function deterministicUuid(seed: string): string {
  const digest = sha256Hex(seed);
  const variantNibble = Number.parseInt(digest.charAt(UUID_VARIANT_INDEX) || "0", HEX_RADIX);
  return [
    digest.slice(UUID_SEGMENT_ONE_START, UUID_SEGMENT_ONE_END),
    digest.slice(UUID_SEGMENT_TWO_START, UUID_SEGMENT_TWO_END),
    `${UUID_VERSION_PREFIX}${digest.slice(
      UUID_SEGMENT_THREE_SOURCE_START,
      UUID_SEGMENT_THREE_SOURCE_END,
    )}`,
    `${((variantNibble & UUID_VARIANT_MASK) | UUID_VARIANT_PREFIX_MASK).toString(HEX_RADIX)}${digest.slice(
      UUID_SEGMENT_FOUR_SOURCE_START,
      UUID_SEGMENT_FOUR_SOURCE_END,
    )}`,
    digest.slice(UUID_SEGMENT_FIVE_START, UUID_SEGMENT_FIVE_END),
  ].join("-");
}
