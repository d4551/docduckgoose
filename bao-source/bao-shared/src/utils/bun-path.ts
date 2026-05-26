/**
 * Bun-first path utilities.
 *
 * Pure JS implementation without node:path. Single source of truth for path
 * operations across the codebase.
 *
 * @packageDocumentation
 */

const IS_WIN: boolean = typeof process !== "undefined" && process.platform === "win32";
const DRIVE_LETTER_SLASH_RE: RegExp = /^[A-Za-z]:\//;
const DRIVE_LETTER_RE: RegExp = /^[A-Za-z]:$/;
const DRIVE_LETTER_I_RE: RegExp = /^[A-Za-z]:/i;
const LEADING_SLASHES_RE: RegExp = /^\/+/;
const TRAILING_SLASHES_RE: RegExp = /\/+$/;
const WINDOWS_PATH_PREFIX = /^[A-Za-z]:\//;

/**
 * Platform-specific path separator.
 * `\` on Windows, `/` on POSIX.
 */
export const sep: string = IS_WIN ? "\\" : "/";

/**
 * Platform-specific PATH environment variable delimiter.
 * `;` on Windows, `:` on POSIX.
 */
export const delimiter: string = IS_WIN ? ";" : ":";

/**
 * POSIX path API for cross-platform output.
 * join and resolve use POSIX separators.
 */
export const posix: {
  sep: "/";
  delimiter: ":";
  join: typeof join;
  resolve: typeof resolve;
  dirname: typeof dirname;
  basename: typeof basename;
  extname: typeof extname;
  relative: typeof relative;
  normalize: typeof normalize;
  isAbsolute: typeof isAbsolute;
  parse: typeof parse;
} = {
  sep: "/" as const,
  delimiter: ":" as const,
  join,
  resolve,
  dirname,
  basename,
  extname,
  relative,
  normalize,
  isAbsolute,
  parse,
};

/**
 * Normalize a filesystem segment into a POSIX-style path fragment.
 *
 * @param segment - Path fragment to normalize.
 * @returns Normalized fragment.
 */
function normalizePathSegment(segment: string): string {
  return segment.replace(/\\+/g, "/");
}

/**
 * Determine whether a normalized path is absolute.
 *
 * @param value - Normalized path string.
 * @returns `true` when the path is absolute.
 */
function isAbsoluteNormalizedPath(value: string): boolean {
  return value.startsWith("/") || DRIVE_LETTER_SLASH_RE.test(value);
}

type ResolvedPathState = {
  isAbsolute: boolean;
  drivePrefix: string | null;
  out: string[];
};

function resetResolveState(): ResolvedPathState {
  return { isAbsolute: false, drivePrefix: null, out: [] };
}

type ParsedCandidate = {
  isAbsolute: boolean;
  drivePrefix: string | null;
  segments: string[];
};

function parseResolvedCandidate(candidate: string): ParsedCandidate {
  if (!WINDOWS_PATH_PREFIX.test(candidate)) {
    if (candidate.startsWith("/")) {
      return {
        isAbsolute: true,
        drivePrefix: null,
        segments: candidate.replace(LEADING_SLASHES_RE, "").split("/").filter(Boolean),
      };
    }
    return { isAbsolute: false, drivePrefix: null, segments: candidate.split("/").filter(Boolean) };
  }

  const drivePrefix = `${candidate.slice(0, 2)}/`;
  return {
    isAbsolute: true,
    drivePrefix: drivePrefix.slice(0, -1),
    segments: candidate.slice(drivePrefix.length).split("/").filter(Boolean),
  };
}

function applySegment(state: ResolvedPathState, segment: string): void {
  if (segment === "" || segment === ".") {
    return;
  }
  if (segment === "..") {
    if (state.isAbsolute) {
      if (state.out.length > 0) {
        state.out.pop();
      }
      return;
    }
    if (state.out.length > 0 && state.out[state.out.length - 1] !== "..") {
      state.out.pop();
      return;
    }
    state.out.push("..");
    return;
  }
  state.out.push(segment);
}

function applySegmentEntries(state: ResolvedPathState, pathFragment: string): void {
  for (const entry of pathFragment.split("/")) {
    applySegment(state, entry);
  }
}

function applyResolvedCandidate(state: ResolvedPathState, candidate: ParsedCandidate): void {
  state.isAbsolute = candidate.isAbsolute;
  state.drivePrefix = candidate.drivePrefix;
  state.out = [];
  applySegmentEntries(state, candidate.segments.join("/"));
}

function formatAbsolutePath(state: ResolvedPathState): string {
  const joined = state.out.join("/");
  if (state.drivePrefix) {
    return joined ? `${state.drivePrefix}/${joined}` : `${state.drivePrefix}/`;
  }
  return joined ? `/${joined}` : "/";
}

function formatPosixRelativeFromCwd(state: ResolvedPathState): string {
  return state.out.length === 0 ? "." : state.out.join("/");
}

function formatResolveResult(state: ResolvedPathState, isAbsoluteMode: boolean): string {
  if (isAbsoluteMode) {
    return formatAbsolutePath(state);
  }
  return formatPosixRelativeFromCwd(state);
}

function resolveRelativeStateAgainstCwd(state: ResolvedPathState): string | null {
  if (state.isAbsolute) {
    return null;
  }

  const cwd = process.cwd().replace(/\\/g, "/");
  const cwdIsAbsolute = cwd.startsWith("/");
  applySegmentEntries(state, cwd);
  return cwdIsAbsolute ? formatAbsolutePath(state) : null;
}

/**
 * Join path segments.
 *
 * @param segments - Path fragments to join.
 * @returns Joined path.
 */
export function join(...segments: string[]): string {
  if (!segments.length) {
    return "";
  }

  const [firstRaw = "", ...restRaw] = segments.map((segment) =>
    normalizePathSegment(String(segment)),
  );
  const normalizedFirst = firstRaw.replace(/\\+/g, "/");
  const firstHasAbsPrefix = isAbsoluteNormalizedPath(normalizedFirst);

  const normalizedSegments = [normalizedFirst, ...restRaw]
    .filter((segment) => segment.length > 0)
    .map((segment) => {
      if (segment === normalizedFirst && firstHasAbsPrefix) {
        return segment.replace(TRAILING_SLASHES_RE, "");
      }
      return segment.replace(LEADING_SLASHES_RE, "").replace(TRAILING_SLASHES_RE, "");
    });

  const joined = normalizedSegments.join("/").replace(/\/{2,}/g, "/");
  if (firstHasAbsPrefix && !DRIVE_LETTER_SLASH_RE.test(normalizedFirst)) {
    return `/${joined.replace(LEADING_SLASHES_RE, "")}`;
  }

  return joined;
}

/**
 * Resolve path segments to an absolute path.
 *
 * @param segments - Path fragments.
 * @returns Resolved absolute path.
 */
export function resolve(...segments: string[]): string {
  if (segments.length === 0) {
    return process.cwd();
  }

  const state = resetResolveState();
  const normalizedSegments = segments.map((segment) => normalizePathSegment(String(segment)));

  for (const segment of normalizedSegments) {
    if (!segment) {
      continue;
    }
    if (isAbsoluteNormalizedPath(segment)) {
      applyResolvedCandidate(state, parseResolvedCandidate(segment));
      continue;
    }
    applySegmentEntries(state, segment);
  }

  const cwdResolvedPath = resolveRelativeStateAgainstCwd(state);
  if (cwdResolvedPath !== null) {
    return cwdResolvedPath;
  }

  return formatResolveResult(state, state.isAbsolute);
}

/**
 * Return the directory name of a path.
 *
 * @param value - Input path.
 * @returns Parent directory path.
 */
export function dirname(value: string): string {
  const normalized = normalizePathSegment(String(value)).trim();
  if (!normalized) {
    return ".";
  }
  const trimmed = normalized.replace(TRAILING_SLASHES_RE, "");
  const lastSlash = trimmed.lastIndexOf("/");
  if (lastSlash < 0) {
    return ".";
  }
  if (trimmed === "/") {
    return "/";
  }
  const parent = trimmed.slice(0, lastSlash);
  if (DRIVE_LETTER_RE.test(parent)) {
    return `${parent}/`;
  }
  return parent === "" ? "/" : parent;
}

/**
 * Return the last portion of a path.
 *
 * @param value - Path string.
 * @param suffix - Optional extension to remove from result.
 * @returns Basename.
 */
export function basename(value: string, suffix?: string): string {
  const normalized = normalizePathSegment(String(value)).replace(TRAILING_SLASHES_RE, "");
  if (!normalized) {
    return "";
  }
  const slashIndex = normalized.lastIndexOf("/");
  const base = slashIndex < 0 ? normalized : normalized.slice(slashIndex + 1);
  if (suffix && base.endsWith(suffix)) {
    return base.slice(0, base.length - suffix.length);
  }
  return base;
}

/**
 * Return the extension of a path.
 *
 * @param value - Path string.
 * @returns Extension including leading dot, or empty string.
 */
export function extname(value: string): string {
  const base = basename(value);
  const dotIndex = base.lastIndexOf(".");
  if (dotIndex <= 0) {
    return "";
  }
  return base.slice(dotIndex);
}

/**
 * Test if a path is absolute.
 *
 * @param value - Path string.
 * @returns `true` when the path is absolute.
 */
export function isAbsolute(value: string): boolean {
  return isAbsoluteNormalizedPath(normalizePathSegment(String(value)));
}

/**
 * Parsed path object.
 */
export interface ParsedPath {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
}

/**
 * Parse a path into components.
 *
 * @param value - Path string.
 * @returns Parsed path object.
 */
export function parse(value: string): ParsedPath {
  const normalized = normalizePathSegment(String(value));
  const base = basename(value);
  const ext = extname(value);
  const name = ext ? base.slice(0, base.length - ext.length) : base;
  const dir = dirname(value);

  let root = "";
  if (normalized.startsWith("/")) {
    root = "/";
  } else {
    const driveMatch = DRIVE_LETTER_SLASH_RE.exec(normalized);
    if (driveMatch) {
      root = `${driveMatch[0].slice(0, -1)}/`;
    }
  }

  return { root, dir, base, ext, name };
}

/**
 * Solve the relative path from `from` to `to`.
 *
 * @param from - Base path.
 * @param to - Target path.
 * @returns Relative path from from to to.
 */
export function relative(from: string, to: string): string {
  const fromResolved = resolve(from);
  const toResolved = resolve(to);

  if (fromResolved === toResolved) {
    return "";
  }

  const fromParts = fromResolved.replace(/\\/g, "/").split("/").filter(Boolean);
  const toParts = toResolved.replace(/\\/g, "/").split("/").filter(Boolean);

  const fromDrive = DRIVE_LETTER_I_RE.exec(fromResolved)?.[0];
  const toDrive = DRIVE_LETTER_I_RE.exec(toResolved)?.[0];
  if (fromDrive !== toDrive) {
    return toResolved;
  }

  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i += 1;
  }

  const ups = fromParts.length - i;
  const downs = toParts.slice(i);
  const result = [...Array.from({ length: ups }, () => ".."), ...downs].join("/");
  return result || ".";
}

/**
 * Normalize a path, reducing `.` and `..` segments and multiple slashes.
 *
 * @param value - Path string.
 * @returns Normalized path.
 */
export function normalize(value: string): string {
  const trimmed = String(value).trim();
  if (!trimmed) {
    return ".";
  }
  const normalized = normalizePathSegment(trimmed);
  const parts = normalized.replace(LEADING_SLASHES_RE, "").split("/").filter(Boolean);

  const collapse = (items: string[]): string[] => {
    const out: string[] = [];
    for (const item of items) {
      if (item === ".") {
        continue;
      }
      if (item === "..") {
        if (out.length > 0) {
          out.pop();
        }
        continue;
      }
      out.push(item);
    }
    return out;
  };

  const collapsedParts = collapse(parts);
  const isAbs = normalized.startsWith("/") || WINDOWS_PATH_PREFIX.test(normalized);
  if (!isAbs) {
    return collapsedParts.join("/") || ".";
  }

  if (WINDOWS_PATH_PREFIX.test(normalized)) {
    const [drivePrefix, ...remaining] = normalized.split("/");
    const normalizedDrive = `${drivePrefix}/`;
    const collapsed = collapse(remaining);
    return collapsed.length > 0 ? `${normalizedDrive}${collapsed.join("/")}` : normalizedDrive;
  }

  return collapsedParts.length > 0 ? `/${collapsedParts.join("/")}` : "/";
}

/**
 * Resolve a path value against process.cwd() when path is relative.
 *
 * @param value - Path to resolve.
 * @returns Absolute path when necessary.
 */
export function resolveFromCwd(value: string): string {
  const trimmed = normalizePathSegment(String(value)).trim();
  return isAbsoluteNormalizedPath(trimmed) ? trimmed : join(process.cwd(), trimmed);
}

/** Bun-native path module facade. */
export const path = {
  join,
  resolve,
  dirname,
  basename,
  extname,
  isAbsolute,
  parse,
  relative,
  normalize,
  sep,
  delimiter,
  posix,
} as const;
