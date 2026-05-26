import { describe, expect, it } from "bun:test";
import { join } from "node:path";
import { getMimeType, PACKAGE_NAME, resolveAssetPath, serveStatic } from "../src/index.ts";

const FIXTURES_ROOT = join(import.meta.dir, "fixtures");
const ROUTE_PREFIX = "/static";
const ROOT_TEXT = "0123456789ABCDEF";

describe("static-bao", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/static-bao");
  });

  it("resolves mime types", () => {
    expect(getMimeType("style.css")).toBe("text/css");
    expect(getMimeType("script.js")).toBe("text/javascript");
    expect(getMimeType("image.png")).toBe("image/png");
    expect(getMimeType("unknown.xyz")).toBe("application/octet-stream");
  });

  it("resolves safe asset paths and blocks traversal", () => {
    const options = { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX };
    expect(resolveAssetPath("/static/route/index.html", options)).toContain("index.html");
    expect(resolveAssetPath("/staticity/route/index.html", options)).toBeNull();
    expect(resolveAssetPath("/static/%2e%2e/secret", options)).toBeNull();
  });

  it("serves index fallback for root and nested directories", async () => {
    const options = { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX };
    const rootResponse = serveStatic(new Request(`http://example.com${ROUTE_PREFIX}`), options);
    expect(rootResponse).not.toBeNull();
    expect(rootResponse?.status).toBe(200);
    expect(rootResponse?.headers.get("ETag")).toBeDefined();
    expect(rootResponse?.headers.get("Content-Type")).toBe("text/html");

    const nestedResponse = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/app`),
      options,
    );
    expect(nestedResponse).not.toBeNull();
    expect(nestedResponse?.status).toBe(200);
    expect(await nestedResponse?.text()).toContain("spa index");
  });

  it("serves compressed files when acceptable", () => {
    const response = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: { "Accept-Encoding": "br,gzip" },
      }),
      { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX },
    );
    expect(response).not.toBeNull();
    expect(response?.status).toBe(200);
    expect(response?.headers.get("Content-Encoding")).toBe("br");
    expect(response?.headers.get("Vary")).toBe("Accept-Encoding");
    expect(response?.headers.get("Content-Type")).toBe("text/plain");
  });

  it("implements caching headers and conditional responses", () => {
    const request = new Request(`http://example.com${ROUTE_PREFIX}/root.txt`);
    const initialResponse = serveStatic(request, { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX });
    expect(initialResponse).not.toBeNull();
    const etag = initialResponse?.headers.get("ETag");
    expect(etag).toBeDefined();

    const noneMatchResponse = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: { "If-None-Match": etag },
      }),
      { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX },
    );
    expect(noneMatchResponse?.status).toBe(304);

    const lastModified = initialResponse?.headers.get("Last-Modified") ?? "";
    const notModifiedResponse = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: { "If-Modified-Since": lastModified },
      }),
      { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX },
    );
    expect(notModifiedResponse?.status).toBe(304);

    const customCache = serveStatic(new Request(`http://example.com${ROUTE_PREFIX}/root.txt`), {
      assets: FIXTURES_ROOT,
      prefix: ROUTE_PREFIX,
      headers: { "Cache-Control": "private, max-age=7" },
    });
    expect(customCache?.headers.get("Cache-Control")).toBe("private, max-age=7");
  });

  it("supports suffix and byte range responses", async () => {
    const prefixOptions = { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX };
    const headResponse = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, { method: "HEAD" }),
      prefixOptions,
    );
    expect(headResponse?.status).toBe(200);
    expect(await headResponse?.text()).toBe("");

    const openRangeResponse = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: { Range: "bytes=0-3" },
      }),
      prefixOptions,
    );
    expect(openRangeResponse?.status).toBe(206);
    expect(openRangeResponse?.headers.get("Content-Range")).toBe("bytes 0-3/16");
    expect(await openRangeResponse?.text()).toBe("0123");

    const suffixRangeResponse = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: { Range: "bytes=-4" },
      }),
      prefixOptions,
    );
    expect(suffixRangeResponse?.status).toBe(206);
    expect(await suffixRangeResponse?.text()).toBe("CDEF");

    const unsatisfiable = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: { Range: "bytes=99-199" },
      }),
      prefixOptions,
    );
    expect(unsatisfiable?.status).toBe(416);
    expect(unsatisfiable?.headers.get("Content-Range")).toBe("bytes */16");
  });

  it("honors If-Range and falls back to full response", async () => {
    const response = serveStatic(
      new Request(`http://example.com${ROUTE_PREFIX}/root.txt`, {
        headers: {
          Range: "bytes=0-3",
          "If-Range": '"mismatched-etag"',
        },
      }),
      { assets: FIXTURES_ROOT, prefix: ROUTE_PREFIX },
    );
    expect(response?.status).toBe(200);
    expect(await response?.text()).toBe(ROOT_TEXT);
  });

  it("respects ignore patterns in path resolution", () => {
    const options = {
      assets: FIXTURES_ROOT,
      prefix: ROUTE_PREFIX,
      ignorePatterns: ["ignore.me"],
    };
    expect(resolveAssetPath("/static/ignore.me", options)).toBeNull();
    expect(
      serveStatic(new Request(`http://example.com${ROUTE_PREFIX}/ignore.me`), options),
    ).toBeNull();
  });
});
