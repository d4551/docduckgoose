import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import type { StaticOptions } from "../internal/types";
import { isAssetFile, resolveAssetPath } from "./path";
import { handleFileResponse } from "./response";

function buildIndexFallbackResponse(
  request: Request,
  assetPath: string,
  options: StaticOptions,
): Response | null {
  if (options.indexHTML ?? true) {
    const indexPath = join(assetPath, "index.html");
    if (isAssetFile(indexPath)) {
      return handleFileResponse(request, indexPath, options);
    }
  }

  return null;
}

export function serveStatic(request: Request, options: StaticOptions): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return null;
  }

  const url = new URL(request.url);
  const assetPath = resolveAssetPath(url.pathname, options);
  if (assetPath === null) {
    return null;
  }

  if (!existsSync(assetPath)) {
    return buildIndexFallbackResponse(request, assetPath, options);
  }

  const stat = statSync(assetPath);
  if (stat.isDirectory()) {
    return buildIndexFallbackResponse(request, assetPath, options);
  }
  if (!stat.isFile()) {
    return null;
  }

  return handleFileResponse(request, assetPath, options);
}
