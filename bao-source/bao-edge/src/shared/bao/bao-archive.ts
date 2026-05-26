/**
 * Archive creation, reading, and extraction utilities for canonical .bao archives.
 *
 * Implements uncompressed tar archives with deterministic, lexicographic entry ordering.
 * Uses POSIX ustar header format with fixed mtime (0) for reproducibility.
 */

import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoArchiveEntry } from "@baohaus/bao-spec/bao-archive/entry";
import type { BaoArchiveProvenance } from "@baohaus/bao-spec/bao-archive/provenance";
import {
  BAO_KEEP_FILE,
  BAO_MANIFEST_ENTRY,
  BAO_PLATFORM_IDS,
  type BaoArchivePlatformId,
  validateArchivePath,
} from "./bao-archive.contract.ts";

// Types

export type { BaoArchiveEntry, BaoArchiveProvenance };

export interface WriteBaoArchiveParams {
  readonly outputPath: string;
  readonly manifest: BaoManifest;
  readonly sharedFiles?: Map<string, Uint8Array>;
  readonly platformFiles?: Map<BaoArchivePlatformId, Map<string, Uint8Array>>;
  readonly provenance?: BaoArchiveProvenance;
}

// Constants

const BLOCK_SIZE = 512;
const ENCODER = new TextEncoder();
const DECODER = new TextDecoder();
const TAR_OCTAL_RADIX = 8;
const TAR_MODE_DIRECTORY = 0o755;
const TAR_MODE_FILE = 0o644;
const TAR_TRAILING_ZERO_BLOCK_COUNT = 2;
const TAR_CHECKSUM_AS_SPACE = 0x20;
const TAR_TYPEFLAG_FILE = "0" as const;
const TAR_TYPEFLAG_DIRECTORY = "5" as const;
const TAR_TYPEFLAG_NULL = "\0" as const;
const TAR_OWNER_NAME = "root" as const;
const TAR_MAGIC = "ustar\0" as const;
const TAR_VERSION = "0" as const;

const TAR_HEADER_LAYOUT = {
  NAME_OFFSET: 0,
  NAME_LENGTH: 100,
  MODE_OFFSET: 100,
  MODE_LENGTH: 8,
  UID_OFFSET: 108,
  UID_LENGTH: 8,
  GID_OFFSET: 116,
  GID_LENGTH: 8,
  SIZE_OFFSET: 124,
  SIZE_LENGTH: 12,
  MTIME_OFFSET: 136,
  MTIME_LENGTH: 12,
  CHECKSUM_OFFSET: 148,
  CHECKSUM_LENGTH: 8,
  CHECKSUM_CONTENT_LENGTH: 6,
  TYPEFLAG_OFFSET: 156,
  MAGIC_OFFSET: 257,
  MAGIC_LENGTH: 6,
  VERSION_OFFSET: 263,
  VERSION_LENGTH: 2,
  UNAME_OFFSET: 265,
  UNAME_LENGTH: 32,
  GNAME_OFFSET: 297,
  GNAME_LENGTH: 32,
  DEVMAJOR_OFFSET: 329,
  DEVMAJOR_LENGTH: 8,
  DEVMINOR_OFFSET: 337,
  DEVMINOR_LENGTH: 8,
  PREFIX_OFFSET: 345,
  PREFIX_LENGTH: 155,
} as const;

const TAR_CHECKSUM_FIELD_END =
  TAR_HEADER_LAYOUT.CHECKSUM_OFFSET + TAR_HEADER_LAYOUT.CHECKSUM_LENGTH;
const TAR_CHECKSUM_TRAILING_NULL_OFFSET =
  TAR_HEADER_LAYOUT.CHECKSUM_OFFSET + TAR_HEADER_LAYOUT.CHECKSUM_CONTENT_LENGTH;
const TAR_CHECKSUM_TRAILING_SPACE_OFFSET = TAR_CHECKSUM_TRAILING_NULL_OFFSET + 1;
const TAR_VERSION_SECOND_OFFSET = TAR_HEADER_LAYOUT.VERSION_OFFSET + 1;

// Tar header helpers

function writeOctal(buffer: Uint8Array, offset: number, length: number, value: number): void {
  const octal = value.toString(TAR_OCTAL_RADIX);
  const padded = octal.padStart(length - 1, "0");
  for (let i = 0; i < padded.length; i++) {
    buffer[offset + i] = padded.charCodeAt(i);
  }
  buffer[offset + length - 1] = 0;
}

function writeString(buffer: Uint8Array, offset: number, length: number, value: string): void {
  const encoded = ENCODER.encode(value);
  const copyLen = Math.min(encoded.length, length);
  buffer.set(encoded.subarray(0, copyLen), offset);
}

function computeChecksum(header: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < BLOCK_SIZE; i++) {
    // Checksum field (offset 148, length 8) is treated as spaces during computation
    if (i >= TAR_HEADER_LAYOUT.CHECKSUM_OFFSET && i < TAR_CHECKSUM_FIELD_END) {
      sum += TAR_CHECKSUM_AS_SPACE;
    } else {
      sum += header[i] ?? 0;
    }
  }
  return sum;
}

function createTarHeader(path: string, size: number, typeflag: "0" | "5"): Uint8Array {
  const header = new Uint8Array(BLOCK_SIZE);

  let name = path;
  let prefix = "";

  // Split long names into prefix + name if needed
  if (name.length > TAR_HEADER_LAYOUT.NAME_LENGTH) {
    const slashIndex = name.lastIndexOf("/", name.length - 1);
    if (slashIndex > 0 && slashIndex <= TAR_HEADER_LAYOUT.PREFIX_LENGTH) {
      prefix = name.slice(0, slashIndex);
      name = name.slice(slashIndex + 1);
    }
  }

  // name: 0, 100
  writeString(header, TAR_HEADER_LAYOUT.NAME_OFFSET, TAR_HEADER_LAYOUT.NAME_LENGTH, name);
  // mode: 100, 8
  writeOctal(
    header,
    TAR_HEADER_LAYOUT.MODE_OFFSET,
    TAR_HEADER_LAYOUT.MODE_LENGTH,
    typeflag === TAR_TYPEFLAG_DIRECTORY ? TAR_MODE_DIRECTORY : TAR_MODE_FILE,
  );
  // uid: 108, 8
  writeOctal(header, TAR_HEADER_LAYOUT.UID_OFFSET, TAR_HEADER_LAYOUT.UID_LENGTH, 0);
  // gid: 116, 8
  writeOctal(header, TAR_HEADER_LAYOUT.GID_OFFSET, TAR_HEADER_LAYOUT.GID_LENGTH, 0);
  // size: 124, 12
  writeOctal(header, TAR_HEADER_LAYOUT.SIZE_OFFSET, TAR_HEADER_LAYOUT.SIZE_LENGTH, size);
  // mtime: 136, 12 (fixed epoch 0 for determinism)
  writeOctal(header, TAR_HEADER_LAYOUT.MTIME_OFFSET, TAR_HEADER_LAYOUT.MTIME_LENGTH, 0);
  // typeflag: 156, 1
  header[TAR_HEADER_LAYOUT.TYPEFLAG_OFFSET] = typeflag.charCodeAt(0);
  // linkname: 157, 100 (empty)
  // magic: 257, 6
  writeString(header, TAR_HEADER_LAYOUT.MAGIC_OFFSET, TAR_HEADER_LAYOUT.MAGIC_LENGTH, TAR_MAGIC);
  // version: 263, 2
  header[TAR_HEADER_LAYOUT.VERSION_OFFSET] = TAR_VERSION.charCodeAt(0);
  header[TAR_VERSION_SECOND_OFFSET] = TAR_VERSION.charCodeAt(0);
  // uname: 265, 32
  writeString(
    header,
    TAR_HEADER_LAYOUT.UNAME_OFFSET,
    TAR_HEADER_LAYOUT.UNAME_LENGTH,
    TAR_OWNER_NAME,
  );
  // gname: 297, 32
  writeString(
    header,
    TAR_HEADER_LAYOUT.GNAME_OFFSET,
    TAR_HEADER_LAYOUT.GNAME_LENGTH,
    TAR_OWNER_NAME,
  );
  // devmajor: 329, 8
  writeOctal(header, TAR_HEADER_LAYOUT.DEVMAJOR_OFFSET, TAR_HEADER_LAYOUT.DEVMAJOR_LENGTH, 0);
  // devminor: 337, 8
  writeOctal(header, TAR_HEADER_LAYOUT.DEVMINOR_OFFSET, TAR_HEADER_LAYOUT.DEVMINOR_LENGTH, 0);
  // prefix: 345, 155
  if (prefix.length > 0) {
    writeString(header, TAR_HEADER_LAYOUT.PREFIX_OFFSET, TAR_HEADER_LAYOUT.PREFIX_LENGTH, prefix);
  }

  // Compute and write checksum: 148, 8
  const checksum = computeChecksum(header);
  const checksumStr = checksum
    .toString(TAR_OCTAL_RADIX)
    .padStart(TAR_HEADER_LAYOUT.CHECKSUM_CONTENT_LENGTH, "0");
  for (let i = 0; i < checksumStr.length; i++) {
    header[TAR_HEADER_LAYOUT.CHECKSUM_OFFSET + i] = checksumStr.charCodeAt(i);
  }
  header[TAR_CHECKSUM_TRAILING_NULL_OFFSET] = 0;
  header[TAR_CHECKSUM_TRAILING_SPACE_OFFSET] = TAR_CHECKSUM_AS_SPACE;

  return header;
}

function padToBlock(size: number): number {
  const remainder = size % BLOCK_SIZE;
  return remainder === 0 ? 0 : BLOCK_SIZE - remainder;
}

// Tar reading helpers

function readOctal(buffer: Uint8Array, offset: number, length: number): number {
  let end = offset + length;
  // Trim trailing nulls and spaces
  while (end > offset && (buffer[end - 1] === 0 || buffer[end - 1] === TAR_CHECKSUM_AS_SPACE)) {
    end--;
  }
  const str = DECODER.decode(buffer.subarray(offset, end));
  if (str.length === 0) {
    return 0;
  }
  return Number.parseInt(str, TAR_OCTAL_RADIX);
}

function readString(buffer: Uint8Array, offset: number, length: number): string {
  let end = offset + length;
  // Trim trailing nulls
  while (end > offset && buffer[end - 1] === 0) {
    end--;
  }
  return DECODER.decode(buffer.subarray(offset, end));
}

function isZeroBlock(buffer: Uint8Array, offset: number): boolean {
  for (let i = 0; i < BLOCK_SIZE; i++) {
    if (buffer[offset + i] !== 0) {
      return false;
    }
  }
  return true;
}

interface TarEntry {
  readonly path: string;
  readonly size: number;
  readonly typeflag: string;
  readonly data: Uint8Array;
}

function parseTarEntries(data: Uint8Array): TarEntry[] {
  const entries: TarEntry[] = [];
  let offset = 0;

  while (offset + BLOCK_SIZE <= data.length) {
    if (isZeroBlock(data, offset)) {
      break;
    }

    const prefix = readString(
      data,
      offset + TAR_HEADER_LAYOUT.PREFIX_OFFSET,
      TAR_HEADER_LAYOUT.PREFIX_LENGTH,
    );
    const name = readString(
      data,
      offset + TAR_HEADER_LAYOUT.NAME_OFFSET,
      TAR_HEADER_LAYOUT.NAME_LENGTH,
    );
    const path = prefix.length > 0 ? `${prefix}/${name}` : name;
    const size = readOctal(
      data,
      offset + TAR_HEADER_LAYOUT.SIZE_OFFSET,
      TAR_HEADER_LAYOUT.SIZE_LENGTH,
    );
    const typeflag = String.fromCharCode(
      data[offset + TAR_HEADER_LAYOUT.TYPEFLAG_OFFSET] ?? TAR_TYPEFLAG_FILE.charCodeAt(0),
    );

    const dataStart = offset + BLOCK_SIZE;
    const entryData = data.subarray(dataStart, dataStart + size);

    entries.push({ path, size, typeflag, data: new Uint8Array(entryData) });

    offset = dataStart + size + padToBlock(size);
  }

  return entries;
}

// Serialization helpers

function serializeManifest(manifest: BaoManifest): Uint8Array {
  return ENCODER.encode(JSON.stringify(manifest));
}

function assertValidPath(path: string): void {
  const result = validateArchivePath(path);
  if (!result.valid) {
    throw new Error(`Invalid archive path "${path}": ${result.reason}`);
  }
}

// Entry builders (decomposed for complexity)

function addProvenanceEntries(
  provenance: BaoArchiveProvenance | undefined,
  entries: BaoArchiveEntry[],
): void {
  if (provenance?.packument) {
    entries.push({
      path: "provenance/packument.json",
      data: ENCODER.encode(JSON.stringify(provenance.packument)),
      type: "file",
    });
  }
  if (provenance?.dependencyGraph) {
    entries.push({
      path: "provenance/dependency-graph.json",
      data: ENCODER.encode(JSON.stringify(provenance.dependencyGraph)),
      type: "file",
    });
  }
  if (provenance?.licenses) {
    entries.push({
      path: "provenance/licenses.json",
      data: ENCODER.encode(JSON.stringify(provenance.licenses)),
      type: "file",
    });
  }
}

function addSharedFileEntries(
  sharedFiles: Map<string, Uint8Array> | undefined,
  entries: BaoArchiveEntry[],
): void {
  if (sharedFiles !== undefined && sharedFiles.size > 0) {
    for (const [filePath, fileData] of sharedFiles) {
      assertValidPath(filePath);
      entries.push({ path: `payload/shared/${filePath}`, data: fileData, type: "file" });
    }
  } else {
    entries.push({
      path: `payload/shared/${BAO_KEEP_FILE}`,
      data: new Uint8Array(0),
      type: "file",
    });
  }
}

function addPlatformFileEntries(
  platformFiles: Map<BaoArchivePlatformId, Map<string, Uint8Array>> | undefined,
  entries: BaoArchiveEntry[],
): void {
  for (const platformId of BAO_PLATFORM_IDS) {
    const files = platformFiles?.get(platformId);
    if (files === undefined || files.size === 0) {
      entries.push({
        path: `payload/platforms/${platformId}/${BAO_KEEP_FILE}`,
        data: new Uint8Array(0),
        type: "file",
      });
    } else {
      for (const [filePath, fileData] of files) {
        assertValidPath(filePath);
        entries.push({
          path: `payload/platforms/${platformId}/${filePath}`,
          data: fileData,
          type: "file",
        });
      }
    }
  }
}

// Public API

/**
 * Build the sorted list of archive entries without creating the tar bytes.
 */
export function buildBaoArchiveEntries(
  params: Omit<WriteBaoArchiveParams, "outputPath">,
): BaoArchiveEntry[] {
  const entries: BaoArchiveEntry[] = [];

  entries.push({
    path: BAO_MANIFEST_ENTRY,
    data: serializeManifest(params.manifest),
    type: "file",
  });
  addProvenanceEntries(params.provenance, entries);
  addSharedFileEntries(params.sharedFiles, entries);
  addPlatformFileEntries(params.platformFiles, entries);

  entries.sort((a, b) => a.path.localeCompare(b.path));
  return entries;
}

/**
 * Create a .bao archive in memory as bytes.
 */
export function createBaoArchiveBytes(
  params: Omit<WriteBaoArchiveParams, "outputPath">,
): Uint8Array {
  const entries = buildBaoArchiveEntries(params);

  // Calculate total size
  let totalSize = 0;
  for (const entry of entries) {
    totalSize += BLOCK_SIZE; // header
    totalSize += entry.data.length;
    totalSize += padToBlock(entry.data.length);
  }
  // Two zero blocks at end
  totalSize += BLOCK_SIZE * TAR_TRAILING_ZERO_BLOCK_COUNT;

  const archive = new Uint8Array(totalSize);
  let offset = 0;

  for (const entry of entries) {
    const typeflag = entry.type === "directory" ? TAR_TYPEFLAG_DIRECTORY : TAR_TYPEFLAG_FILE;
    const header = createTarHeader(entry.path, entry.data.length, typeflag);
    archive.set(header, offset);
    offset += BLOCK_SIZE;

    if (entry.data.length > 0) {
      archive.set(entry.data, offset);
    }
    offset += entry.data.length + padToBlock(entry.data.length);
  }

  // Two zero blocks are already zero-filled by Uint8Array initialization

  return archive;
}

/**
 * Write a .bao archive to disk.
 */
export async function writeBaoArchiveFile(params: WriteBaoArchiveParams): Promise<void> {
  const bytes = createBaoArchiveBytes(params);
  await Bun.write(params.outputPath, bytes);
}

/**
 * Extract just the manifest from archive bytes.
 */
export function extractBaoArchiveManifestFromBytes(data: Uint8Array): BaoManifest {
  const entries = parseTarEntries(data);
  const manifestEntry = entries.find((e) => e.path === BAO_MANIFEST_ENTRY);
  if (manifestEntry === undefined) {
    throw new Error(`Archive does not contain ${BAO_MANIFEST_ENTRY}`);
  }
  return JSON.parse(DECODER.decode(manifestEntry.data)) as BaoManifest;
}

/**
 * Sync alias for extractBaoArchiveManifestFromBytes (already synchronous).
 */
export function extractBaoArchiveManifestFromBytesSync(data: Uint8Array): BaoManifest {
  return extractBaoArchiveManifestFromBytes(data);
}

/**
 * Read a .bao file and extract just the manifest.
 */
export async function extractBaoArchiveManifestFromFile(filePath: string): Promise<BaoManifest> {
  const file = Bun.file(filePath);
  const buffer = await file.arrayBuffer();
  return extractBaoArchiveManifestFromBytes(new Uint8Array(buffer));
}

/**
 * Extract manifest from a .bao archive file using Bun.file.
 * Named "Sync" for API compatibility but uses Bun.file (async under the hood).
 */
export async function extractBaoArchiveManifestFromFileSync(
  filePath: string,
): Promise<BaoManifest> {
  return await extractBaoArchiveManifestFromFile(filePath);
}

/**
 * Read all files from archive bytes.
 */
export function readBaoArchiveFiles(data: Uint8Array): Map<string, Uint8Array> {
  const entries = parseTarEntries(data);
  const files = new Map<string, Uint8Array>();
  for (const entry of entries) {
    if (entry.typeflag === TAR_TYPEFLAG_FILE || entry.typeflag === TAR_TYPEFLAG_NULL) {
      files.set(entry.path, entry.data);
    }
  }
  return files;
}

/**
 * Read a specific text entry from archive bytes.
 */
export function readBaoArchiveEntryText(data: Uint8Array, entryPath: string): string | undefined {
  const entries = parseTarEntries(data);
  const entry = entries.find((e) => e.path === entryPath);
  if (entry === undefined) {
    return undefined;
  }
  return DECODER.decode(entry.data);
}
