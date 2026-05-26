import type { BaoManifest } from "./manifest.schemas.ts";

const STRIPPED_KEYS: ReadonlySet<string> = new Set(["checksum", "signature", "$schema"]);
type BaoManifestChecksumScalar = string | number | boolean | null;
type BaoManifestChecksumArray = readonly BaoManifestChecksumValue[];
type BaoManifestChecksumRecord = {
  readonly [key: string]: BaoManifestChecksumValue | undefined;
};
export type BaoManifestChecksumValue =
  | BaoManifestChecksumScalar
  | BaoManifestChecksumArray
  | BaoManifestChecksumRecord;

function isChecksumArray(
  value: BaoManifest | BaoManifestChecksumValue,
): value is BaoManifestChecksumArray {
  return Array.isArray(value);
}

function stripFields(value: BaoManifest | BaoManifestChecksumValue): BaoManifestChecksumValue {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (isChecksumArray(value)) {
    return value.map(stripFields);
  }

  const result: Record<string, BaoManifestChecksumValue> = {};
  for (const [key, fieldValue] of Object.entries(value)) {
    if (STRIPPED_KEYS.has(key) || fieldValue === undefined) {
      continue;
    }
    result[key] = stripFields(fieldValue);
  }
  return result;
}

function sortedStringify(value: BaoManifestChecksumValue): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (isChecksumArray(value)) {
    const items = value.map(sortedStringify);
    return `[${items.join(",")}]`;
  }

  const keys = Object.keys(value).sort();
  const entries = keys.flatMap((key): string[] => {
    const fieldValue = value[key];
    return fieldValue === undefined
      ? []
      : [`${JSON.stringify(key)}:${sortedStringify(fieldValue)}`];
  });
  return `{${entries.join(",")}}`;
}

const ALGORITHM_MAP = {
  sha256: "SHA-256",
  sha1: "SHA-1",
} as const;
const HEX_RADIX = 16;
const HEX_BYTE_WIDTH = 2;

export function buildUnsignedBaoManifestPayload(manifest: BaoManifest): BaoManifestChecksumValue {
  return stripFields(manifest);
}

export function serializeBaoManifestForChecksum(manifest: BaoManifest): string {
  return sortedStringify(buildUnsignedBaoManifestPayload(manifest));
}

export async function computeBaoManifestChecksum(
  manifest: BaoManifest,
  algorithm: "sha256" | "sha1" = "sha256",
): Promise<string> {
  const json = serializeBaoManifestForChecksum(manifest);
  const bytes = new TextEncoder().encode(json);
  const digest = await crypto.subtle.digest(ALGORITHM_MAP[algorithm], bytes);
  const hashArray = new Uint8Array(digest);
  return Array.from(hashArray)
    .map((b) => b.toString(HEX_RADIX).padStart(HEX_BYTE_WIDTH, "0"))
    .join("");
}
