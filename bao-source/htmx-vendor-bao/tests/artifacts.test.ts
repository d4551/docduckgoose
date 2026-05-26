import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const packageRoot = resolve(import.meta.dir, "..");

const REQUIRED_VENDOR_ASSETS: readonly string[] = [
  "dist/vendor/htmx/dist/htmx.min.js",
  "dist/vendor/htmx-ext/class-tools.min.js",
  "dist/vendor/htmx-ext/head-support.min.js",
  "dist/vendor/htmx-ext/json-enc.js",
  "dist/vendor/htmx-ext/loading-states.min.js",
  "dist/vendor/htmx-ext/preload.min.js",
  "dist/vendor/htmx-ext/remove-me.min.js",
  "dist/vendor/htmx-ext/response-targets.min.js",
  "dist/vendor/htmx-ext/sse.min.js",
  "dist/vendor/htmx-ext/ws.min.js",
  "dist/vendor/htmx-ext/multi-swap.min.js",
  "dist/vendor/htmx-ext/include-vals.min.js",
  "dist/vendor/htmx-ext/idiomorph-ext.min.js",
];

describe("@baohaus/htmx-vendor-bao dist artifacts", () => {
  test("materializes all vendored HTMX assets after build", () => {
    for (const relativePath of REQUIRED_VENDOR_ASSETS) {
      expect(existsSync(join(packageRoot, relativePath))).toBe(true);
    }
  });
});
