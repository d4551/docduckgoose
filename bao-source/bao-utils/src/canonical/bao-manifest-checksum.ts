import { createHash } from "node:crypto";
import type { BaoInstallChecksum } from "@baohaus/bao-schemas/bao-install/artifact.schemas";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTargetBase } from "@baohaus/bao-schemas/bao-install/targets.schemas";

type ChecksumSerializable =
  | null
  | boolean
  | number
  | string
  | ChecksumSerializable[]
  | { [key: string]: ChecksumSerializable | undefined };

export const DEFAULT_CHECKSUM_ALGORITHM = "sha256" as const;
const MERKLE_EXCLUDED_ARCHIVE_ENTRY_PATHS = new Set<string>([
  "manifest.bin",
  "manifest.json",
  "manifest.signature",
]);

const STRIPPED_TOP_LEVEL_KEYS = new Set<string>(["$schema"]);
const STRIPPED_METADATA_KEYS = new Set<string>(["checksum"]);
const STRIPPED_METADATA_SIGNATURE_KEYS = new Set<string>([
  "value",
  "sigstoreBundle",
  "transparencyLog",
]);
const STRIPPED_TARGET_KEYS = new Set<string>(["checksum", "signature"]);

export function computeBaoManifestChecksum(manifest: BaoManifest): string {
  const canonical = serializeBaoManifestForChecksum(manifest);
  return sha256Hex(canonical);
}

export function serializeBaoManifestForChecksum(manifest: BaoManifest): string {
  const stripped = stripForChecksum(manifest);
  return stableStringify(sortKeys(normalizeValue(stripped)));
}

export function serializeBaoTargetForChecksum(target: BaoInstallTargetBase): string {
  const stripped = stripTargetForChecksum(target);
  return stableStringify(sortKeys(normalizeValue(stripped)));
}

function stripMetadataSection(value: Record<string, unknown>): Record<string, unknown> {
  const metadata = { ...value };
  for (const key of STRIPPED_METADATA_KEYS) {
    delete metadata[key];
  }

  if (isRecord(metadata.signature)) {
    const signature = { ...metadata.signature };
    for (const key of STRIPPED_METADATA_SIGNATURE_KEYS) {
      delete signature[key];
    }
    metadata.signature = signature;
  }

  return metadata;
}

function stripForChecksum(manifest: BaoManifest): Record<string, unknown> {
  const copy: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(manifest)) {
    if (!STRIPPED_TOP_LEVEL_KEYS.has(key)) {
      if (key === "metadata" && isRecord(value)) {
        copy[key] = stripMetadataSection(value);
      } else {
        copy[key] = value;
      }
    }
  }

  return copy;
}

function stripTargetForChecksum(target: BaoInstallTargetBase): Record<string, unknown> {
  const copy: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(target)) {
    if (!STRIPPED_TARGET_KEYS.has(key)) {
      copy[key] = value;
    }
  }

  return copy;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeValue(value: unknown): ChecksumSerializable {
  if (value === null) {
    return null;
  }
  if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeValue(entry));
  }
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).flatMap(([key, entryValue]) => {
        if (entryValue === undefined) {
          return [];
        }
        return [[key, normalizeValue(entryValue)]];
      }),
    );
  }
  throw new Error(`Unsupported checksum payload value type: ${typeof value}`);
}

function sortKeys(value: ChecksumSerializable): ChecksumSerializable {
  if (Array.isArray(value)) {
    return value.map((item) => sortKeys(item));
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  const sortedEntries = Object.keys(value)
    .sort()
    .flatMap((key) => {
      const entryValue = value[key];
      return entryValue === undefined ? [] : [[key, sortKeys(entryValue)] as const];
    });
  return Object.fromEntries(sortedEntries);
}

function stableStringify(value: ChecksumSerializable): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  const entries = Object.keys(value)
    .sort()
    .flatMap((key) => {
      const entryValue = value[key];
      return entryValue === undefined
        ? []
        : [`${JSON.stringify(key)}:${stableStringify(entryValue)}`];
    });
  return `{${entries.join(",")}}`;
}

export function sha256Hex(data: string | Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

export function sha256Bytes(data: Uint8Array): Uint8Array {
  return new Uint8Array(createHash("sha256").update(data).digest());
}

export interface MerkleLeaf {
  readonly path: string;
  readonly sha256: string;
}

export function computeMerkleRootFromLeaves(leaves: readonly MerkleLeaf[]): string {
  if (leaves.length === 0) {
    return `sha256-${bytesToBase64(sha256Bytes(new Uint8Array()))}`;
  }
  const sorted = [...leaves].sort((left, right) => left.path.localeCompare(right.path));
  let layer: Uint8Array[] = sorted.map((leaf) => hexToBytes(leaf.sha256));
  while (layer.length > 1) {
    const next: Uint8Array[] = [];
    for (let index = 0; index < layer.length; index += 2) {
      const left = layer[index] as Uint8Array;
      const right = (index + 1 < layer.length ? layer[index + 1] : left) as Uint8Array;
      const concat = new Uint8Array(left.length + right.length);
      concat.set(left, 0);
      concat.set(right, left.length);
      next.push(sha256Bytes(concat));
    }
    layer = next;
  }
  return `sha256-${bytesToBase64(layer[0] as Uint8Array)}`;
}

export function computeMerkleRootFromEntries(entries: ReadonlyMap<string, Uint8Array>): string {
  const leaves: MerkleLeaf[] = [...entries.entries()].map(([path, bytes]) => ({
    path,
    sha256: sha256Hex(bytes),
  }));
  return computeMerkleRootFromLeaves(leaves);
}

export function computeArchiveContentMerkleRoot(entries: ReadonlyMap<string, Uint8Array>): string {
  const filteredEntries = new Map(
    [...entries.entries()].filter(([path]) => !MERKLE_EXCLUDED_ARCHIVE_ENTRY_PATHS.has(path)),
  );
  return computeMerkleRootFromEntries(filteredEntries);
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error(`Invalid hex string length: ${hex.length}`);
  }
  const out = new Uint8Array(hex.length / 2);
  for (let index = 0; index < out.length; index += 1) {
    out[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function verifyBaoManifestChecksum(
  manifest: BaoManifest,
  expectedChecksum: BaoInstallChecksum,
): boolean {
  if (expectedChecksum.algorithm !== DEFAULT_CHECKSUM_ALGORITHM) {
    return false;
  }
  const computed = computeBaoManifestChecksum(manifest);
  return computed === expectedChecksum.value;
}
