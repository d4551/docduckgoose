import { lstat, mkdir, readdir, readlink, rename, rm, stat, symlink } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

function isMissingPathError(error: object): boolean {
  return Reflect.get(error, "code") === "ENOENT";
}

const COPY_TREE_SKIP_NAMES = new Set(["node_modules", "dist", ".bun-cache", ".turbo"]);

export type JsonValue = boolean | null | number | string | JsonObject | JsonValue[];

export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

export function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function copyTree(sourceRoot: string, targetRoot: string): Promise<void> {
  const linkProbe = await lstat(sourceRoot).then(
    (info) => ({ info, ok: true as const }),
    (error: object) => {
      if (isMissingPathError(error)) {
        return { ok: false as const };
      }
      throw error;
    },
  );

  if (!linkProbe.ok) {
    return;
  }

  if (linkProbe.info.isSymbolicLink()) {
    const linkTarget = await readlink(sourceRoot);
    await ensureDirectory(dirname(targetRoot));
    await rm(targetRoot, { force: true });
    await symlink(linkTarget, targetRoot);
    return;
  }

  const existence = await inspectPath(sourceRoot);
  if (!existence.exists) {
    return;
  }

  if (existence.isFile) {
    await ensureDirectory(dirname(targetRoot));
    await Bun.write(targetRoot, Bun.file(sourceRoot));
    return;
  }

  if (!existence.isDirectory) {
    return;
  }

  await ensureDirectory(targetRoot);
  const entries = await readdir(sourceRoot);
  for (const entry of entries) {
    if (COPY_TREE_SKIP_NAMES.has(entry)) {
      continue;
    }
    await copyTree(join(sourceRoot, entry), join(targetRoot, entry));
  }
}

export async function inspectPath(path: string): Promise<FileExistence> {
  const result = await stat(path).then(
    (info) => ({ info, ok: true as const }),
    (error: object) => {
      if (isMissingPathError(error)) {
        return { ok: false as const };
      }
      throw error;
    },
  );
  if (!result.ok) {
    return { exists: false, isFile: false, isDirectory: false };
  }
  return {
    exists: true,
    isFile: result.info.isFile(),
    isDirectory: result.info.isDirectory(),
  };
}

export async function ensureDirectory(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function removePath(path: string): Promise<void> {
  await rm(path, { recursive: true, force: true });
}

export async function movePath(sourcePath: string, targetPath: string): Promise<void> {
  await ensureDirectory(dirname(targetPath));
  await rename(sourcePath, targetPath);
}

export async function listEntries(path: string): Promise<string[]> {
  const existence = await inspectPath(path);
  if (!existence.isDirectory) {
    return [];
  }
  const entries = await readdir(path);
  return entries.sort((left, right) => left.localeCompare(right));
}

export async function readJsonFile(path: string): Promise<JsonValue> {
  return await Bun.file(path).json();
}

export async function writeJsonFile(path: string, value: object): Promise<void> {
  await ensureDirectory(dirname(path));
  await Bun.write(path, `${JSON.stringify(value, null, 2)}\n`);
}

export async function writeTextFile(path: string, content: string): Promise<void> {
  await ensureDirectory(dirname(path));
  await Bun.write(path, content);
}

export interface FileExistence {
  exists: boolean;
  isFile: boolean;
  isDirectory: boolean;
}

export function resolvePath(...segments: string[]): string {
  return resolve(...segments);
}

export function isPathInsideRoot(root: string, candidate: string): boolean {
  const resolvedRoot = resolve(root);
  const resolvedCandidate = resolve(candidate);
  return resolvedCandidate === resolvedRoot || resolvedCandidate.startsWith(`${resolvedRoot}/`);
}
