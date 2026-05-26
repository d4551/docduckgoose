export const MIME_TYPES: Readonly<Record<string, string>> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".pdf": "application/octet-stream",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".csv": "text/csv",
  ".wasm": "application/wasm",
  ".zip": "application/zip",
};

export const DEFAULT_ASSETS = "public";
export const DEFAULT_PREFIX = "/public";
export const DEFAULT_DIRECTIVE = "public";
export const DEFAULT_MAX_AGE = 86_400;
export const DEFAULT_IGNORE_PATTERNS: readonly string[] = [".DS_Store", ".git", ".env"];
export const COMPRESSION_EXTENSIONS = [".br", ".gz"] as const;
export const LEADING_SLASH_RE = /^\//;
