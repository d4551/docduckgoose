/**
 * Bun-first filesystem utilities.
 *
 * Replaces filesystem usage with Bun-native APIs where available.
 * Re-exports watch, open, stat, and lstat from fs/promises for operations
 * where Bun does not yet expose an equivalent.
 *
 * JUSTIFIED: chmod, cp, lstat, mkdir, open, rename, rm, stat, watch, and
 * readFileSync have no Bun-native equivalent for the required sync/Node-compatible
 * semantics. Uses fs/fs.promises for those operations per AGENTS.md.
 *
 * @packageDocumentation
 */

import { readFileSync as nodeReadFileSync } from "node:fs";
import {
  chmod as nodeChmod,
  cp as nodeCp,
  lstat as nodeLstat,
  mkdir as nodeMkdir,
  open as nodeOpen,
  readdir as nodeReaddir,
  readlink as nodeReadlink,
  rename as nodeRename,
  rm as nodeRm,
  stat as nodeStat,
  symlink as nodeSymlink,
  watch as nodeWatch,
} from "node:fs/promises";
import { toResultAsync } from "@baohaus/bao-utils/async-result";
import { basename, join } from "./bun-path";

const TEMP_SUFFIX_LENGTH = 6;

/**
 * Check whether a file or directory exists.
 *
 * Uses fs.stat (not Bun.file) so directories are detected correctly.
 * Bun.file().exists() returns false for directories.
 *
 * @param targetPath - Path to probe.
 * @returns True when the target exists.
 */
export async function exists(targetPath: string): Promise<boolean> {
  const result = await toResultAsync(nodeStat(targetPath));
  return result.ok;
}

/**
 * Read a UTF-8 text file using Bun's native file API.
 *
 * @param targetPath - Path to read.
 * @returns File contents as text.
 */
export function readTextFile(targetPath: string): Promise<string> {
  return Bun.file(targetPath).text();
}

/**
 * Read a UTF-8 text file synchronously.
 *
 * Bun does not expose a synchronous text file API. Modules that must finish
 * initialization during CJS bundle evaluation use the Node sync read here.
 *
 * @param targetPath - Path to read.
 * @returns File contents as text.
 */
export function readTextFileSync(targetPath: string): string {
  return nodeReadFileSync(targetPath, "utf8");
}

/**
 * Read a file synchronously as bytes.
 *
 * Bun does not expose a synchronous binary file API. Modules that must finish
 * initialization during sync evaluation use the Node sync read here.
 *
 * @param targetPath - Path to read.
 * @returns File contents as bytes.
 */
export function readBinaryFileSync(targetPath: string): Uint8Array {
  return new Uint8Array(nodeReadFileSync(targetPath));
}

/**
 * Write UTF-8 text using Bun's native file API.
 *
 * @param targetPath - Path to write.
 * @param content - UTF-8 content to persist.
 */
export async function writeTextFile(targetPath: string, content: string): Promise<void> {
  await Bun.write(targetPath, content);
}

/**
 * Node-compatible file handle type re-exported for shared filesystem helpers.
 */
export type { FileHandle } from "node:fs/promises";

/** Stats type inferred from fs/promises stat return. */
export type Stats = Awaited<ReturnType<typeof nodeStat>>;

/** Re-export stat for Node Stats compatibility (isDirectory, isFile, isSocket, isFIFO). */
export const stat: typeof nodeStat = nodeStat;

/** Re-export lstat for Node Stats compatibility (symlink-aware). */
export const lstat: typeof nodeLstat = nodeLstat;

/** Re-export readlink for symlink-aware filesystem assembly. */
export const readlink: typeof nodeReadlink = nodeReadlink;

/** Re-export symlink; Bun has no native symlink creation API. */
export const symlink: typeof nodeSymlink = nodeSymlink;

/** Re-export watch; Bun has no native file watcher API. */
export const watch: typeof nodeWatch = nodeWatch;

/** Re-export open for fd-based operations (e.g. spawn stdout piping, atomic wx create). */
export const open: typeof nodeOpen = nodeOpen;

/**
 * Create a directory.
 *
 * @param dir - Directory path to create.
 * @param options - Recursive option is supported and defaults to true.
 * @returns Promise that resolves with `dir` when recursive mode is enabled.
 */
export async function mkdir(
  dir: string,
  options: { recursive?: boolean } = {},
): Promise<string | undefined> {
  const recursive = options.recursive ?? true;
  await nodeMkdir(dir, { recursive });
  return recursive ? dir : undefined;
}

/** Dirent-like object for withFileTypes. */
export interface DirEntLike {
  name: string;
  isFile: () => boolean;
  isDirectory: () => boolean;
  isSymbolicLink: () => boolean;
}

/** Options for readdir without withFileTypes. */
export interface ReaddirOptions {
  encoding?: BufferEncoding | null;
  withFileTypes?: false;
  recursive?: boolean;
  /** When recursive, exclude directories from results (Bun Glob onlyFiles). */
  onlyFiles?: boolean;
}

/** Options for readdir with withFileTypes. */
export interface ReaddirOptionsWithFileTypes {
  encoding?: BufferEncoding | null;
  withFileTypes: true;
  recursive?: boolean;
  /** When recursive, exclude directories from results (Bun Glob onlyFiles). */
  onlyFiles?: boolean;
}

type ReaddirFlags = Readonly<{
  withFileTypes: boolean;
  recursive: boolean;
  onlyFiles: boolean;
}>;

function resolveReaddirFlags(options?: ReaddirOptions | ReaddirOptionsWithFileTypes): ReaddirFlags {
  const normalizedOptions = options ?? {};
  return {
    withFileTypes: normalizedOptions.withFileTypes === true,
    recursive: normalizedOptions.recursive === true,
    onlyFiles: normalizedOptions.onlyFiles === true,
  };
}

async function readNonRecursiveEntries(
  dir: string,
  flags: Pick<ReaddirFlags, "onlyFiles" | "withFileTypes">,
): Promise<string[] | DirEntLike[]> {
  if (flags.withFileTypes) {
    const entries = await nodeReaddir(dir, { withFileTypes: true });
    return flags.onlyFiles ? entries.filter((entry) => entry.isFile()) : entries;
  }

  if (flags.onlyFiles) {
    const entries = await nodeReaddir(dir, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  }

  return await nodeReaddir(dir);
}

async function readRecursiveEntries(dir: string, onlyFiles: boolean): Promise<string[]> {
  const glob = new Bun.Glob("**/*");
  const entries: string[] = [];
  for await (const entry of glob.scan({
    cwd: dir,
    onlyFiles,
    dot: true,
  })) {
    if (entry === "." || entry === "..") {
      continue;
    }
    entries.push(entry);
  }
  return entries;
}

async function toDirEntLikes(dir: string, entries: readonly string[]): Promise<DirEntLike[]> {
  const dirents: DirEntLike[] = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const st = await nodeLstat(fullPath);
    dirents.push({
      name: basename(entry),
      isFile: () => st.isFile(),
      isDirectory: () => st.isDirectory(),
      isSymbolicLink: () => st.isSymbolicLink(),
    });
  }
  return dirents;
}

/**
 * Read directory contents using Bun Glob.
 *
 * @param dir - Directory path to read.
 * @param options - Options; recursive, withFileTypes, and onlyFiles (recursive mode) supported.
 * @returns Array of entry names (or Dirent-like objects for withFileTypes).
 */
/** Read directory entries with optional Bun-first recursion and Dirent-like output. */
export async function readdir(
  dir: string,
  options: ReaddirOptionsWithFileTypes,
): Promise<DirEntLike[]>;
export async function readdir(dir: string, options?: ReaddirOptions): Promise<string[]>;
export async function readdir(dir: string, options?: ReaddirOptions | ReaddirOptionsWithFileTypes) {
  const { withFileTypes, recursive, onlyFiles } = resolveReaddirFlags(options);

  if (!recursive) {
    return readNonRecursiveEntries(dir, { withFileTypes, onlyFiles });
  }

  const entries = await readRecursiveEntries(dir, onlyFiles);

  if (!withFileTypes) {
    return entries;
  }

  return toDirEntLikes(dir, entries);
}

/**
 * Create a unique temporary directory.
 *
 * @param prefix - Path prefix (for example `myapp-`).
 * @returns Path to the created directory.
 */
export async function mkdtemp(prefix: string): Promise<string> {
  const suffix = crypto.randomUUID().slice(0, TEMP_SUFFIX_LENGTH);
  const dir = `${prefix}${suffix}`;
  await mkdir(dir, { recursive: true });
  return dir;
}

/**
 * Remove a file or directory.
 *
 * @param path - Path to remove.
 * @param options - Recursive and force options.
 */
export async function rm(
  targetPath: string,
  options: { recursive?: boolean; force?: boolean } = {},
): Promise<void> {
  const { recursive = false, force = false } = options;
  const statResult = await toResultAsync(nodeLstat(targetPath));
  if (!statResult.ok) {
    const isMissingPath =
      statResult.error instanceof Error &&
      "code" in statResult.error &&
      statResult.error.code === "ENOENT";
    if (force && isMissingPath) {
      return;
    }
    if (isMissingPath) {
      throw new Error(`ENOENT: no such file or directory, unlink '${targetPath}'`);
    }
    throw statResult.error;
  }

  const rmResult = await toResultAsync(nodeRm(targetPath, { recursive, force: force ?? false }));
  if (!rmResult.ok) {
    throw rmResult.error;
  }
}

/**
 * Change file mode.
 *
 * @param targetPath - Path to file.
 * @param mode - Mode as octal number or string.
 */
export async function chmod(targetPath: string, mode: string | number): Promise<void> {
  const result = await toResultAsync(nodeChmod(targetPath, mode));
  if (!result.ok) {
    throw result.error;
  }
}

/**
 * Copy a file or directory.
 *
 * @param src - Source path.
 * @param dest - Destination path.
 * @param options - Recursive and filter options.
 */
export async function cp(
  src: string,
  dest: string,
  options?: {
    recursive?: boolean;
    dereference?: boolean;
    filter?: (source: string, destination: string) => boolean | Promise<boolean>;
  },
): Promise<void> {
  const { recursive = false, dereference, filter } = options ?? {};

  const statResult = await toResultAsync((dereference ? nodeStat : nodeLstat)(src));
  if (!statResult.ok) {
    throw statResult.error;
  }
  if (statResult.value.isDirectory() && !recursive) {
    throw new Error("EISDIR: illegal operation on a directory, copy");
  }

  const copyResult = await toResultAsync(
    nodeCp(src, dest, {
      recursive,
      dereference,
      filter: filter
        ? async (source: string, destination: string) => filter(source, destination)
        : undefined,
    }),
  );
  if (!copyResult.ok) {
    throw copyResult.error;
  }
}

/**
 * Rename a file or directory.
 *
 * @param oldPath - Source path.
 * @param newPath - Destination path.
 */
export async function rename(oldPath: string, newPath: string): Promise<void> {
  const result = await toResultAsync(nodeRename(oldPath, newPath));
  if (!result.ok) {
    throw result.error;
  }
}

/**
 * Remove a Bun.file(alias for single-file rm).
 *
 * @param targetPath - Path to file.
 */
export async function unlink(targetPath: string): Promise<void> {
  const result = await toResultAsync(Bun.file(targetPath).delete());
  if (!result.ok) {
    throw result.error;
  }
}
