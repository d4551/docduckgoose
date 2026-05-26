import { existsSync, statSync } from "node:fs";
import { COMPRESSION_EXTENSIONS, DEFAULT_DIRECTIVE, DEFAULT_MAX_AGE } from "../internal/constants";
import type { FileStats, SelectedFile, StaticOptions } from "../internal/types";
import { getMimeType, stripCompressionSuffix } from "./path";
import { parseRangeHeader } from "./range";

function hasMatchingEtag(ifNoneMatchHeader: string, etag: string): boolean {
  return ifNoneMatchHeader
    .split(",")
    .map((entry) => entry.trim())
    .some((entry) => entry === "*" || entry === etag || entry === `W/${etag}`);
}

function generateEtag(stat: FileStats): string {
  return `"${stat.size.toString(36)}-${Math.floor(stat.mtimeMs).toString(36)}"`;
}

function isCachedResponse(
  request: Request,
  etag: string,
  stat: FileStats,
  useEtag: boolean,
): boolean {
  if (!useEtag) {
    return false;
  }

  const ifNoneMatch = request.headers.get("If-None-Match");
  if (ifNoneMatch !== null) {
    return hasMatchingEtag(ifNoneMatch, etag);
  }

  const ifModifiedSince = request.headers.get("If-Modified-Since");
  if (ifModifiedSince === null) {
    return false;
  }

  const ifModifiedSinceMs = Date.parse(ifModifiedSince);
  if (Number.isNaN(ifModifiedSinceMs)) {
    return false;
  }

  const fileModifiedSeconds = Math.floor(stat.mtimeMs / 1000);
  const ifModifiedSinceSeconds = Math.floor(ifModifiedSinceMs / 1000);
  return fileModifiedSeconds <= ifModifiedSinceSeconds;
}

function shouldHonorRange(request: Request, etag: string, stat: FileStats): boolean {
  const ifRange = request.headers.get("If-Range");
  if (ifRange === null) {
    return true;
  }

  const normalizedIfRange = ifRange.trim();
  if (normalizedIfRange === etag || normalizedIfRange === `W/${etag}`) {
    return true;
  }

  const ifRangeMs = Date.parse(normalizedIfRange);
  if (Number.isNaN(ifRangeMs)) {
    return false;
  }

  return stat.mtimeMs <= ifRangeMs;
}

function normalizeResponseHeaders(
  stat: FileStats,
  selectedFilePath: string,
  contentEncoding: string | undefined,
  options: StaticOptions,
): Record<string, string> {
  const useEtag = options.etag ?? true;
  const cacheDirective = options.directive ?? DEFAULT_DIRECTIVE;
  const maxAge = options.maxAge ?? DEFAULT_MAX_AGE;
  const headers: Record<string, string> = {
    "Content-Type": getMimeType(stripCompressionSuffix(selectedFilePath)),
    "Content-Length": String(stat.size),
    "Accept-Ranges": "bytes",
    "Cache-Control": `${cacheDirective}, max-age=${Math.max(0, maxAge)}`,
    "Last-Modified": new Date(stat.mtimeMs).toUTCString(),
  };

  if (contentEncoding !== undefined) {
    headers["Content-Encoding"] = contentEncoding;
    headers.Vary = "Accept-Encoding";
  }

  if (useEtag) {
    headers.ETag = generateEtag(stat);
  }

  for (const [key, value] of Object.entries(options.headers ?? {})) {
    headers[key] = value;
  }

  return headers;
}

function respond(
  body: Blob | null,
  status: number,
  headers: Record<string, string>,
  method: string,
): Response {
  if (method === "HEAD") {
    return new Response(null, { status, headers });
  }
  return new Response(body, { status, headers });
}

function resolveCompressedPath(assetPath: string, acceptEncoding: string): SelectedFile | null {
  const lower = acceptEncoding.toLowerCase();
  const hasBrotli = lower.includes("br");
  const hasGzip = lower.includes("gzip") || lower.includes("deflate");
  const candidates = [
    { extension: COMPRESSION_EXTENSIONS[0], encoding: "br", canUse: hasBrotli },
    { extension: COMPRESSION_EXTENSIONS[1], encoding: "gzip", canUse: hasGzip },
  ] as const;

  for (const candidate of candidates) {
    if (!candidate.canUse) {
      continue;
    }

    const compressed = `${assetPath}${candidate.extension}`;
    if (!existsSync(compressed)) {
      continue;
    }

    const compressedStat = statSync(compressed);
    if (!compressedStat.isFile()) {
      continue;
    }

    return {
      finalPath: compressed,
      finalStat: compressedStat,
      contentEncoding: candidate.encoding,
    };
  }

  return null;
}

function selectFileAndStat(assetPath: string, acceptEncoding: string): SelectedFile | null {
  const compressed = resolveCompressedPath(assetPath, acceptEncoding);
  if (compressed !== null) {
    return compressed;
  }

  const finalStat = statSync(assetPath);
  if (!finalStat.isFile()) {
    return null;
  }

  return {
    finalPath: assetPath,
    finalStat,
    contentEncoding: undefined,
  };
}

function buildRangeResponse(
  request: Request,
  selectedFile: SelectedFile,
  range: { start: number; end: number },
  options: StaticOptions,
): Response {
  const file = Bun.file(selectedFile.finalPath);
  const headers = normalizeResponseHeaders(
    selectedFile.finalStat,
    selectedFile.finalPath,
    selectedFile.contentEncoding,
    options,
  );
  const contentLength = range.end - range.start + 1;
  headers["Content-Length"] = String(contentLength);
  headers["Content-Range"] = `bytes ${range.start}-${range.end}/${selectedFile.finalStat.size}`;

  return respond(file.slice(range.start, range.end + 1), 206, headers, request.method);
}

function buildStaticResponse(
  request: Request,
  selectedFile: SelectedFile,
  options: StaticOptions,
): Response {
  const headers = normalizeResponseHeaders(
    selectedFile.finalStat,
    selectedFile.finalPath,
    selectedFile.contentEncoding,
    options,
  );
  const file = Bun.file(selectedFile.finalPath);
  return respond(file, 200, headers, request.method);
}

function buildNotModifiedResponse(
  request: Request,
  selectedFile: SelectedFile,
  options: StaticOptions,
): Response {
  const headers = normalizeResponseHeaders(
    selectedFile.finalStat,
    selectedFile.finalPath,
    selectedFile.contentEncoding,
    options,
  );
  return respond(null, 304, headers, request.method);
}

function buildRangeUnsatisfiableResponse(
  request: Request,
  selectedFile: SelectedFile,
  range: { size: number },
  options: StaticOptions,
): Response {
  const headers = normalizeResponseHeaders(
    selectedFile.finalStat,
    selectedFile.finalPath,
    selectedFile.contentEncoding,
    options,
  );
  headers["Content-Range"] = `bytes */${range.size}`;
  headers["Content-Length"] = "0";
  return respond(null, 416, headers, request.method);
}

function buildRangeResponseIfApplicable(
  request: Request,
  etag: string | null,
  selectedFile: SelectedFile,
  options: StaticOptions,
): Response | null {
  const rangeHeader = request.headers.get("Range");
  if (rangeHeader === null) {
    return null;
  }

  if (!shouldHonorRange(request, etag ?? "", selectedFile.finalStat)) {
    return null;
  }

  const range = parseRangeHeader(rangeHeader, selectedFile.finalStat.size);
  if (range.kind === "satisfiable") {
    return buildRangeResponse(request, selectedFile, range, options);
  }

  if (range.kind === "unsatisfiable") {
    return buildRangeUnsatisfiableResponse(request, selectedFile, range, options);
  }

  return null;
}

export function handleFileResponse(
  request: Request,
  assetPath: string,
  options: StaticOptions,
): Response | null {
  const acceptEncoding = request.headers.get("Accept-Encoding") ?? "";
  const selectedFile = selectFileAndStat(assetPath, acceptEncoding);
  if (selectedFile === null) {
    return null;
  }

  const useEtag = options.etag ?? true;
  const etag = useEtag ? generateEtag(selectedFile.finalStat) : null;
  if (etag !== null && isCachedResponse(request, etag, selectedFile.finalStat, useEtag)) {
    return buildNotModifiedResponse(request, selectedFile, options);
  }

  const rangeResponse = buildRangeResponseIfApplicable(request, etag, selectedFile, options);
  if (rangeResponse !== null) {
    return rangeResponse;
  }

  return buildStaticResponse(request, selectedFile, options);
}
