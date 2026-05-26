import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { PlatformId } from "@baohaus/bao-schemas/bao-install-primitives.schemas";
import type { JsonValue } from "@baohaus/bao-schemas/json.schemas";

type BaoArchiveFileContent = string | Uint8Array;
type BaoArchiveRelativeFileMap = Readonly<Record<string, BaoArchiveFileContent>>;
type BaoArchiveProvenancePayload = Pick<
  BaoArchiveProvenance,
  "dependencyGraph" | "licenses" | "packument"
>;

export interface BaoArchiveAttestations {
  readonly slsa?: JsonValue;
  readonly sbomCycloneDx?: JsonValue;
  readonly sbomSpdx?: JsonValue;
  readonly vex?: JsonValue;
  readonly licenseScan?: JsonValue;
  readonly vulnScan?: JsonValue;
  readonly sigstoreBundle?: Uint8Array;
}

export interface BaoArchiveProvenance {
  readonly buildEnvironment?: JsonValue;
  readonly dependencyGraph?: JsonValue;
  readonly dependencyLock?: JsonValue;
  readonly licenses?: JsonValue;
  readonly packument?: JsonValue;
}

export interface BaoArchiveSchemaFiles {
  readonly config?: BaoArchiveFileContent;
  readonly target?: BaoArchiveFileContent;
  readonly openApi?: BaoArchiveFileContent;
  readonly asyncApi?: BaoArchiveFileContent;
  readonly prisma?: BaoArchiveFileContent;
  readonly flatbuffer?: BaoArchiveFileContent;
}

export interface BaoArchiveAuxFiles {
  readonly lifecycle?: Record<string, BaoArchiveFileContent>;
  readonly docs?: Record<string, BaoArchiveFileContent>;
  readonly observability?: Record<string, BaoArchiveFileContent>;
  readonly i18n?: Record<string, BaoArchiveFileContent>;
  readonly tests?: Record<string, BaoArchiveFileContent>;
  readonly security?: Record<string, BaoArchiveFileContent>;
  readonly governance?: Record<string, BaoArchiveFileContent>;
  readonly release?: Record<string, BaoArchiveFileContent>;
}

export interface BaoArchivePayloadInputs {
  readonly shared?: BaoArchiveRelativeFileMap;
  readonly platforms?: Partial<Record<PlatformId, BaoArchiveRelativeFileMap>>;
  readonly bytecode?: BaoArchiveRelativeFileMap;
  readonly wasm?: BaoArchiveRelativeFileMap;
}

export interface BaoArchiveInput {
  readonly manifest: BaoManifest;
  readonly manifestBin: Uint8Array;
  readonly manifestSignature?: Uint8Array;
  readonly attestations?: BaoArchiveAttestations;
  readonly provenance?: BaoArchiveProvenance;
  readonly payload?: BaoArchivePayloadInputs;
  readonly schema?: BaoArchiveSchemaFiles;
  readonly aux?: BaoArchiveAuxFiles;
  readonly extras?: Record<string, BaoArchiveFileContent>;
}

export type { BaoArchiveFileContent, BaoArchiveProvenancePayload, BaoArchiveRelativeFileMap };
