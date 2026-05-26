/** Bun-native path helpers for the baobox CLI. */

import { fileURLToPath, pathToFileURL } from "node:url";

function isAbsoluteCliPath(pathname: string): boolean {
  return pathname.startsWith("/") || /^[A-Za-z]:\//.test(pathname);
}

function ensureDirectoryUrl(pathname: string): URL {
  const directoryUrl = pathToFileURL(pathname);
  const href = directoryUrl.href.endsWith("/") ? directoryUrl.href : `${directoryUrl.href}/`;
  return new URL(href);
}

/** Resolve a CLI path relative to a base directory using Bun URL helpers. */
export function resolveCliPath(pathname: string, basePath: string = process.cwd()): string {
  const normalizedPath = pathname.replace(/\\/g, "/");
  if (isAbsoluteCliPath(normalizedPath)) {
    return fileURLToPath(pathToFileURL(normalizedPath));
  }
  return fileURLToPath(new URL(normalizedPath, ensureDirectoryUrl(basePath)));
}

/** Join a relative scan result back onto an absolute directory path. */
export function joinCliPath(basePath: string, relativePath: string): string {
  return resolveCliPath(relativePath, basePath);
}
