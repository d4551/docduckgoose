import { BAO_MANIFEST_FILE_IDENTIFIER } from "@baohaus/bao-contracts/bao/bao-archive.contract";
import { type BaoManifest, isBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";

const MANIFEST_BIN_HEADER_BYTES = 8;
const MANIFEST_BIN_MAGIC_OFFSET = 4;

type CanonicalSerializable =
  | null
  | boolean
  | number
  | string
  | CanonicalSerializable[]
  | { [key: string]: CanonicalSerializable | undefined };

const STRIPPED_SIGNATURE_KEYS = new Set<string>(["value", "sigstoreBundle", "transparencyLog"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasRecordSignature(
  value: Record<string, unknown>,
): value is Record<string, unknown> & { signature: Record<string, unknown> } {
  return isRecord(value.signature);
}

function normalizeValue(value: unknown): CanonicalSerializable {
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
  throw new Error(`Unsupported canonical BAO manifest value type: ${typeof value}`);
}

function sortKeys(value: CanonicalSerializable): CanonicalSerializable {
  if (Array.isArray(value)) {
    return value.map((entry) => sortKeys(entry));
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .flatMap((key) => {
        const entryValue = value[key];
        return entryValue === undefined ? [] : [[key, sortKeys(entryValue)] as const];
      }),
  );
}

function stableStringify(value: CanonicalSerializable): string {
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
    return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
  }
  return `{${Object.keys(value)
    .sort()
    .flatMap((key) => {
      const entryValue = value[key];
      return entryValue === undefined
        ? []
        : [`${JSON.stringify(key)}:${stableStringify(entryValue)}`];
    })
    .join(",")}}`;
}

function stripForSignature(manifest: BaoManifest): Record<string, unknown> {
  const copy: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(manifest)) {
    if (key === "metadata" && isRecord(value) && hasRecordSignature(value)) {
      const signature: Record<string, unknown> = { ...value.signature };
      for (const strippedKey of STRIPPED_SIGNATURE_KEYS) {
        delete signature[strippedKey];
      }
      copy[key] = {
        ...value,
        signature,
      };
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

function parseManifestJsonBytes(bytes: Uint8Array): BaoManifest | null {
  const text = new TextDecoder().decode(bytes).trim();
  if (text.length === 0) {
    return null;
  }
  const decoded: unknown = JSON.parse(text);
  return isBaoManifest(decoded) ? decoded : null;
}

export function serializeBaoManifestCanonical(manifest: BaoManifest): string {
  return stableStringify(sortKeys(normalizeValue(manifest)));
}

export function encodeBaoManifestJson(manifest: BaoManifest): Uint8Array {
  return new TextEncoder().encode(serializeBaoManifestCanonical(manifest));
}

export function serializeBaoManifestForSignature(manifest: BaoManifest): string {
  return stableStringify(sortKeys(normalizeValue(stripForSignature(manifest))));
}

export function encodeBaoManifestSignaturePayload(manifest: BaoManifest): Uint8Array {
  return new TextEncoder().encode(serializeBaoManifestForSignature(manifest));
}

export function encodeBaoManifestBin(manifest: BaoManifest): Uint8Array {
  const header = new Uint8Array(MANIFEST_BIN_HEADER_BYTES);
  const magic = new TextEncoder().encode(BAO_MANIFEST_FILE_IDENTIFIER);
  header.set(magic, MANIFEST_BIN_MAGIC_OFFSET);

  const body = encodeBaoManifestJson(manifest);
  const bytes = new Uint8Array(header.length + body.length);
  bytes.set(header, 0);
  bytes.set(body, header.length);
  return bytes;
}

export function readBaoManifestBinIdentifier(manifestBin: Uint8Array): string | null {
  if (manifestBin.byteLength < MANIFEST_BIN_HEADER_BYTES) {
    return null;
  }
  const MANIFEST_BIN_IDENTIFIER_BYTES = 4;
  return new TextDecoder().decode(
    manifestBin.slice(
      MANIFEST_BIN_MAGIC_OFFSET,
      MANIFEST_BIN_MAGIC_OFFSET + MANIFEST_BIN_IDENTIFIER_BYTES,
    ),
  );
}

export function isCanonicalBaoManifestBin(manifestBin: Uint8Array): boolean {
  return readBaoManifestBinIdentifier(manifestBin) === BAO_MANIFEST_FILE_IDENTIFIER;
}

export function decodeBaoManifestBin(manifestBin: Uint8Array): BaoManifest | null {
  if (!isCanonicalBaoManifestBin(manifestBin)) {
    return null;
  }
  return parseManifestJsonBytes(manifestBin.slice(MANIFEST_BIN_HEADER_BYTES));
}
