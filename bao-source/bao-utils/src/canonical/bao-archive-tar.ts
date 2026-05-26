export const DETERMINISTIC_EPOCH_SECONDS = 0 as const;
const TAR_BLOCK_SIZE = 512 as const;
const TAR_EMPTY_ARCHIVE_BLOCKS = 2 as const;
const TAR_PADDING_REMAINDER_DIVISOR = TAR_BLOCK_SIZE;
const TAR_PATH_MAX_BYTES = 255 as const;
const TAR_NAME_MAX_BYTES = 100 as const;
const TAR_PREFIX_MAX_BYTES = 155 as const;
const TAR_NAME_OFFSET = 0 as const;
const TAR_MODE_OFFSET = 100 as const;
const TAR_UID_OFFSET = 108 as const;
const TAR_GID_OFFSET = 116 as const;
const TAR_SIZE_OFFSET = 124 as const;
const TAR_MTIME_OFFSET = 136 as const;
const TAR_CHECKSUM_OFFSET = 148 as const;
const TAR_TYPEFLAG_OFFSET = 156 as const;
const TAR_PREFIX_OFFSET = 345 as const;
const TAR_USTAR_MAGIC_OFFSET = 257 as const;
const TAR_USTAR_MAGIC = "ustar" as const;
const TAR_USTAR_MAGIC_LENGTH = TAR_USTAR_MAGIC.length;
const TAR_USTAR_VERSION_OFFSET = 263 as const;
const TAR_USTAR_OWNER_OFFSET = 265 as const;
const TAR_USTAR_GROUP_OFFSET = 297 as const;
const TAR_DEFAULT_MODE = 0o644 as const;
const TAR_CHECKSUM_SPACE_BYTE = 0x20 as const;
const TAR_REGULAR_FILE_TYPE = "0" as const;
const TAR_REGULAR_FILE_TYPE_INDEX = 0 as const;
const TAR_OCTAL_RADIX = 8 as const;
const TAR_OCTAL_FIELD_LENGTH = 8 as const;
const TAR_OCTAL_SIZE_FIELD_LENGTH = 12 as const;
const TAR_OCTAL_MTIME_FIELD_LENGTH = 12 as const;
const TAR_OCTAL_PADDING_DIGITS = 6 as const;
const TAR_ZERO_FIELD_VALUE = 0 as const;
const TAR_FIELD_LENGTH_ADJUSTMENT = 1 as const;

function writeOctal(header: Uint8Array, offset: number, length: number, value: number): void {
  const encoded = new TextEncoder().encode(
    `${value.toString(TAR_OCTAL_RADIX).padStart(length - TAR_FIELD_LENGTH_ADJUSTMENT, "0")}\0`,
  );
  header.set(encoded.slice(0, length), offset);
}

type TarPathParts = {
  name: string;
  prefix: string;
};

function resolveTarPathParts(path: string): TarPathParts {
  const encoder = new TextEncoder();
  const pathBytes = encoder.encode(path);

  if (pathBytes.length <= TAR_NAME_MAX_BYTES) {
    return { name: path, prefix: "" };
  }

  if (pathBytes.length > TAR_PATH_MAX_BYTES) {
    throw new Error(`Archive entry path exceeds 255 bytes: ${path}`);
  }

  let separatorIndex = path.lastIndexOf("/");
  while (separatorIndex > TAR_ZERO_FIELD_VALUE) {
    const prefix = path.slice(0, separatorIndex);
    const name = path.slice(separatorIndex + 1);

    if (
      encoder.encode(name).length <= TAR_NAME_MAX_BYTES &&
      encoder.encode(prefix).length <= TAR_PREFIX_MAX_BYTES
    ) {
      return { name, prefix };
    }

    separatorIndex = path.lastIndexOf("/", separatorIndex - TAR_FIELD_LENGTH_ADJUSTMENT);
  }

  throw new Error(`Archive entry path cannot be encoded in ustar header: ${path}`);
}

function createTarHeader(path: string, size: number): Uint8Array {
  const header = new Uint8Array(TAR_BLOCK_SIZE);
  const encoder = new TextEncoder();
  const { name, prefix } = resolveTarPathParts(path);
  const pathBytes = encoder.encode(name);

  header.set(pathBytes, TAR_NAME_OFFSET);
  if (prefix.length > TAR_ZERO_FIELD_VALUE) {
    header.set(encoder.encode(prefix), TAR_PREFIX_OFFSET);
  }
  writeOctal(header, TAR_MODE_OFFSET, TAR_OCTAL_FIELD_LENGTH, TAR_DEFAULT_MODE);
  writeOctal(header, TAR_UID_OFFSET, TAR_OCTAL_FIELD_LENGTH, TAR_ZERO_FIELD_VALUE);
  writeOctal(header, TAR_GID_OFFSET, TAR_OCTAL_FIELD_LENGTH, TAR_ZERO_FIELD_VALUE);
  writeOctal(header, TAR_SIZE_OFFSET, TAR_OCTAL_SIZE_FIELD_LENGTH, size);
  writeOctal(header, TAR_MTIME_OFFSET, TAR_OCTAL_MTIME_FIELD_LENGTH, DETERMINISTIC_EPOCH_SECONDS);

  for (
    let index = TAR_CHECKSUM_OFFSET;
    index < TAR_CHECKSUM_OFFSET + TAR_OCTAL_FIELD_LENGTH;
    index += TAR_FIELD_LENGTH_ADJUSTMENT
  ) {
    header[index] = TAR_CHECKSUM_SPACE_BYTE;
  }

  header[TAR_TYPEFLAG_OFFSET] = TAR_REGULAR_FILE_TYPE.charCodeAt(TAR_REGULAR_FILE_TYPE_INDEX);
  header.set(encoder.encode("ustar\0"), TAR_USTAR_MAGIC_OFFSET);
  header.set(encoder.encode("00"), TAR_USTAR_VERSION_OFFSET);
  header.set(encoder.encode("root"), TAR_USTAR_OWNER_OFFSET);
  header.set(encoder.encode("root"), TAR_USTAR_GROUP_OFFSET);

  let checksum = TAR_ZERO_FIELD_VALUE;
  for (const byte of header) {
    checksum += byte;
  }

  const checksumBytes = encoder.encode(
    `${checksum.toString(TAR_OCTAL_RADIX).padStart(TAR_OCTAL_PADDING_DIGITS, "0")}\0`,
  );
  header.set(checksumBytes, TAR_CHECKSUM_OFFSET);
  header[TAR_CHECKSUM_OFFSET + TAR_OCTAL_FIELD_LENGTH - TAR_FIELD_LENGTH_ADJUSTMENT] =
    TAR_CHECKSUM_SPACE_BYTE;

  return header;
}

function extractTarField(block: Uint8Array, start: number, length: number): string {
  const field = block.slice(start, start + length);
  return new TextDecoder().decode(field).replace(/\0+$/u, "").trim();
}

function extractTarPath(block: Uint8Array): string {
  const name = extractTarField(block, TAR_NAME_OFFSET, TAR_NAME_MAX_BYTES);
  const prefix = extractTarField(block, TAR_PREFIX_OFFSET, TAR_PREFIX_MAX_BYTES);
  return prefix.length > TAR_ZERO_FIELD_VALUE ? `${prefix}/${name}` : name;
}

export function createTarArchive(entries: Map<string, Uint8Array>): Uint8Array {
  const chunks: Uint8Array[] = [];

  for (const [path, content] of entries) {
    const header = createTarHeader(path, content.length);
    chunks.push(header);
    chunks.push(content);

    const paddingSize =
      (TAR_BLOCK_SIZE - (content.length % TAR_PADDING_REMAINDER_DIVISOR)) % TAR_BLOCK_SIZE;
    if (paddingSize > TAR_ZERO_FIELD_VALUE) {
      chunks.push(new Uint8Array(paddingSize));
    }
  }

  chunks.push(new Uint8Array(TAR_BLOCK_SIZE * TAR_EMPTY_ARCHIVE_BLOCKS));

  const totalSize = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const archive = new Uint8Array(totalSize);
  let offset = TAR_ZERO_FIELD_VALUE;

  for (const chunk of chunks) {
    archive.set(chunk, offset);
    offset += chunk.length;
  }

  return archive;
}

export function readTarEntries(archiveData: Uint8Array): Map<string, Uint8Array> {
  assertLikelyTarArchive(archiveData);
  const entries = new Map<string, Uint8Array>();
  let offset = TAR_ZERO_FIELD_VALUE;

  while (offset + TAR_BLOCK_SIZE <= archiveData.length) {
    const headerBlock = archiveData.slice(offset, offset + TAR_BLOCK_SIZE);
    const path = extractTarPath(headerBlock);

    if (path.length === TAR_ZERO_FIELD_VALUE) {
      break;
    }

    const size = Number.parseInt(
      extractTarField(headerBlock, TAR_SIZE_OFFSET, TAR_OCTAL_SIZE_FIELD_LENGTH) || "0",
      8,
    );
    const contentOffset = offset + TAR_BLOCK_SIZE;
    const content = archiveData.slice(contentOffset, contentOffset + size);

    entries.set(path, content);
    offset += TAR_BLOCK_SIZE + Math.ceil(size / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
  }

  return entries;
}

function assertLikelyTarArchive(archiveData: Uint8Array): void {
  if (archiveData.length < TAR_BLOCK_SIZE) {
    throw new Error("Archive too small to contain a tar header");
  }

  const header = archiveData.slice(TAR_ZERO_FIELD_VALUE, TAR_BLOCK_SIZE);
  const magic = new TextDecoder().decode(
    header.slice(TAR_USTAR_MAGIC_OFFSET, TAR_USTAR_MAGIC_OFFSET + TAR_USTAR_MAGIC_LENGTH),
  );

  if (magic !== TAR_USTAR_MAGIC) {
    throw new Error("Archive does not contain a canonical ustar header");
  }

  const path = extractTarPath(header);
  if (path.length === TAR_ZERO_FIELD_VALUE) {
    throw new Error("Archive header missing first entry path");
  }
}
