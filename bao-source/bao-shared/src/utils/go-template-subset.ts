/**
 * Go-template subset for Package CRD rendering.
 *
 * Implements the minimal function set required by BaoControlPlane Package controller:
 * include, default, required, quote, printf, trunc, fail, eq, and, hasPrefix,
 * toString, sha256sum, .Files.Glob.
 *
 * Compatible with Go-template {{ }} syntax.
 * Does not support full Go text/template; only the documented functions.
 *
 * @shared/utils/go-template-subset
 */

import { createHash } from "node:crypto";
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { normalizeError, toResultSync } from "@baohaus/bao-utils/async-result";

const WHITESPACE_SPLIT_RE: RegExp = /\s+/;

/** Template context: dot-notation accessible values. */
export type TemplateContext = Record<string, unknown>;

/**
 * Resolve a dot-notation path in the context.
 *
 * @param ctx - Template context.
 * @param path - Dot-separated path (e.g. "Values.image.tag").
 * @returns Resolved value or undefined.
 */
function resolvePath(ctx: TemplateContext, path: string): unknown {
  const parts = path.split(".").filter(Boolean);
  let current: unknown = ctx;
  for (const part of parts) {
    if (current === null || current === undefined) {
      return;
    }
    if (typeof current !== "object") {
      return;
    }
    current = Reflect.get(current, part);
  }
  return current;
}

/**
 * Compute SHA256 hex of input string.
 *
 * @param input - Input string.
 * @returns Lowercase hex digest.
 */
function sha256sum(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function escapeRegExp(value: string): string {
  return value.replace(/[\\^$+?.()|[\]{}]/g, "\\$&");
}

function globPatternToRegExp(pattern: string): RegExp {
  const normalizedPattern = pattern.split(sep).join("/");
  let source = "^";
  for (let index = 0; index < normalizedPattern.length; index += 1) {
    const char = normalizedPattern[index];
    const nextChar = normalizedPattern[index + 1];
    const afterNextChar = normalizedPattern[index + 2];

    if (char === "*" && nextChar === "*" && afterNextChar === "/") {
      source += "(?:.*/)?";
      index += 2;
      continue;
    }
    if (char === "*" && nextChar === "*") {
      source += ".*";
      index += 1;
      continue;
    }
    if (char === "*") {
      source += "[^/]*";
      continue;
    }
    if (char === "?") {
      source += "[^/]";
      continue;
    }
    source += escapeRegExp(char ?? "");
  }
  return new RegExp(`${source}$`);
}

function walkFiles(baseDir: string, currentDir: string = baseDir): string[] {
  return readdirSync(currentDir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(currentDir, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(baseDir, entryPath);
    }
    if (!entry.isFile()) {
      return [];
    }
    return [relative(baseDir, entryPath).split(sep).join("/")];
  });
}

/**
 * Glob files relative to a base directory.
 *
 * @param baseDir - Base directory.
 * @param pattern - Glob pattern (e.g. "*.yaml").
 * @returns Array of relative paths.
 */
function filesGlob(baseDir: string, pattern: string): string[] {
  const matcher = globPatternToRegExp(pattern);
  return walkFiles(baseDir)
    .filter((filePath) => matcher.test(filePath))
    .sort((left, right) => left.localeCompare(right));
}

/** Built-in template functions. */
type TemplateFunc = (...args: unknown[]) => unknown;

/**
 * Create the standard template function map.
 *
 * @param options - Options for template evaluation.
 * @returns Map of function name to implementation.
 */
export function createTemplateFuncs(options: {
  ctx: TemplateContext;
  include?: (...args: unknown[]) => string;
}): Record<string, TemplateFunc> {
  const { ctx, include: includeFn } = options;

  return {
    default: (a: unknown, b: unknown) => (a !== undefined && a !== null && a !== "" ? a : b),
    required: (msg: unknown) => {
      if (msg === undefined || msg === null) {
        return;
      }
      throw new Error(String(msg));
    },
    quote: (v: unknown) => (v !== undefined && v !== null ? JSON.stringify(String(v)) : '""'),
    printf: (fmt: unknown, ...rest: unknown[]) => {
      if (typeof fmt !== "string") {
        return "";
      }
      return sprintf(fmt, ...rest);
    },
    trunc: (n: unknown, v: unknown) => {
      const defaultTruncLength = 63;
      const max = typeof n === "number" ? n : Number.parseInt(String(n), 10) || defaultTruncLength;
      const s = String(v ?? "");
      return s.length <= max ? s : s.slice(0, max);
    },
    fail: (msg: unknown) => {
      throw new Error(String(msg ?? "template fail"));
    },
    eq: (...args: unknown[]) => {
      if (args.length < 2) {
        return false;
      }
      const a = args[0];
      const b = args[1];
      return a === b || String(a) === String(b);
    },
    and: (...args: unknown[]) => args.every((x) => Boolean(x)),
    hasPrefix: (prefix: unknown, s: unknown) =>
      typeof s === "string" && typeof prefix === "string" && s.startsWith(prefix),
    toString: (v: unknown) => String(v ?? ""),
    sha256sum: (v: unknown) => sha256sum(String(v ?? "")),
    include: (...args: unknown[]) => {
      const [name, subCtx] = args;
      if (typeof name !== "string" || name.length === 0) {
        throw new Error("include name must be a non-empty string");
      }
      if (includeFn) {
        return includeFn(name, (subCtx ?? ctx) as TemplateContext);
      }
      throw new Error(`include not configured: ${name}`);
    },
    // .Files.Glob - exposed as Files.Glob in context
  };
}

/**
 * Minimal sprintf for printf.
 *
 * @param fmt - Format string (%s, %d, %v).
 * @param args - Arguments.
 * @returns Formatted string.
 */
function sprintf(fmt: string, ...args: unknown[]): string {
  let i = 0;
  return fmt.replace(/%[sdvf]/g, () => {
    const v = args[i++];
    if (v === undefined) {
      return "";
    }
    if (fmt.includes("%d") || fmt.includes("%v")) {
      return String(Number(v) || v);
    }
    return String(v);
  });
}

/**
 * Create a .Files.Glob helper for template context.
 *
 * @param baseDir - Base directory for glob.
 * @returns Function (pattern: string) => string[].
 */
export function createFilesGlob(baseDir: string): (pattern: string) => string[] {
  return (pattern: string) => filesGlob(baseDir, pattern);
}

/**
 * Execute a simple template string with the given context.
 *
 * Supports {{ func args }} and {{ .path }}.
 * Does not support full action/define/range; single expression only.
 *
 * @param template - Template string.
 * @param ctx - Context object.
 * @param funcs - Function map.
 * @returns Rendered string.
 */
export function executeTemplate(
  template: string,
  ctx: TemplateContext,
  funcs: Record<string, TemplateFunc>,
): string {
  return template.replace(/\{\{\s*(.+?)\s*\}\}/gs, (_match, expr) => {
    const trimmed = expr.trim();
    if (trimmed.startsWith(".")) {
      const val = resolvePath(ctx, trimmed.slice(1));
      return String(val ?? "");
    }
    const parts = trimmed.split(WHITESPACE_SPLIT_RE);
    const fnName = parts[0];
    const fn = funcs[fnName];
    if (!fn) {
      const val = resolvePath(ctx, trimmed);
      return String(val ?? "");
    }
    const args = parts.slice(1).map((p: string) => {
      if (p.startsWith(".")) {
        return resolvePath(ctx, p.slice(1));
      }
      if (p.startsWith('"') && p.endsWith('"')) {
        return p.slice(1, -1);
      }
      return p;
    });
    const r = toResultSync(() => fn(...args));
    if (!r.ok) {
      throw normalizeError(r.error);
    }
    return String(r.value ?? "");
  });
}
