import { existsSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import {
  DEFAULT_ASSETS,
  DEFAULT_IGNORE_PATTERNS,
  DEFAULT_PREFIX,
  LEADING_SLASH_RE,
  MIME_TYPES,
} from "../internal/constants";
import type { IgnorePattern, StaticOptions } from "../internal/types";

function isHexChar(code: number): boolean {
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 70) || (code >= 97 && code <= 102);
}

function maybeDecodeRequestPath(pathname: string): string | null {
  if (!pathname.includes("%")) {
    return pathname;
  }

  for (let i = 0; i < pathname.length; i += 1) {
    if (pathname.charCodeAt(i) !== 37) {
      continue;
    }

    if (i + 2 >= pathname.length) {
      return null;
    }

    if (!(isHexChar(pathname.charCodeAt(i + 1)) && isHexChar(pathname.charCodeAt(i + 2)))) {
      return null;
    }

    i += 2;
  }

  return decodeURIComponent(pathname);
}

function hasPathTraversal(decodedPath: string): boolean {
  if (decodedPath.includes("\u0000")) {
    return true;
  }

  const normalized = decodedPath.replace(/\\/g, "/");
  for (const segment of normalized.split("/")) {
    if (segment === "..") {
      return true;
    }
  }

  return false;
}

function normalizePrefix(prefix: string): string {
  const withSlash = prefix.startsWith("/") ? prefix : `/${prefix}`;
  if (withSlash === "/") {
    return "/";
  }
  return withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
}

function resolveRootPath(pathname: string): string {
  return resolve(pathname);
}

function isWithinRoot(rootPath: string, candidatePath: string): boolean {
  if (rootPath === sep) {
    return candidatePath.startsWith(sep);
  }

  return candidatePath === rootPath || candidatePath.startsWith(`${rootPath}${sep}`);
}

function isIgnoredPath(relativePath: string, ignorePatterns?: readonly IgnorePattern[]): boolean {
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const checks = ignorePatterns ?? DEFAULT_IGNORE_PATTERNS;
  for (const pattern of checks) {
    if (typeof pattern === "string") {
      if (normalizedPath.includes(pattern)) {
        return true;
      }
      continue;
    }

    const matcher = new RegExp(pattern.source, pattern.flags);
    if (matcher.test(normalizedPath)) {
      return true;
    }
  }

  return false;
}

export function stripCompressionSuffix(pathname: string): string {
  if (pathname.endsWith(".br")) {
    return pathname.slice(0, -3);
  }
  if (pathname.endsWith(".gz")) {
    return pathname.slice(0, -3);
  }
  return pathname;
}

export function getMimeType(pathname: string): string {
  const extIndex = pathname.lastIndexOf(".");
  const ext = extIndex >= 0 ? pathname.slice(extIndex) : "";
  return MIME_TYPES[ext.toLowerCase()] ?? "application/octet-stream";
}

export function resolveAssetPath(urlPath: string, options: StaticOptions): string | null {
  const rootPath = resolveRootPath(options.assets ?? DEFAULT_ASSETS);
  const prefix = normalizePrefix(options.prefix ?? DEFAULT_PREFIX);

  if (!urlPath.startsWith(prefix)) {
    return null;
  }

  if (prefix !== "/" && urlPath.length > prefix.length && urlPath[prefix.length] !== "/") {
    return null;
  }

  const rawRelativePath = urlPath.slice(prefix.length).replace(LEADING_SLASH_RE, "");
  const decodedPath = maybeDecodeRequestPath(rawRelativePath);
  if (decodedPath === null || hasPathTraversal(decodedPath)) {
    return null;
  }

  const normalizedRelativePath = decodedPath
    .replace(/\\/g, "/")
    .split("/")
    .filter((segment) => segment !== "." && segment !== "")
    .join("/");

  if (isIgnoredPath(normalizedRelativePath, options.ignorePatterns)) {
    return null;
  }

  const resolvedPath = resolve(rootPath, normalizedRelativePath);
  if (!isWithinRoot(rootPath, resolvedPath)) {
    return null;
  }

  return resolvedPath;
}

export function isAssetFile(pathname: string): boolean {
  return existsSync(pathname) && statSync(pathname).isFile();
}
