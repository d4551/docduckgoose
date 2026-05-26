import { describe, expect, test } from "bun:test";
import {
  HTMX_CORE_RELATIVE_PATH,
  HTMX_VENDOR_EXTENSION_DIR,
  PACKAGE_NAME,
} from "../src/manifest.ts";

describe("@baohaus/htmx-vendor-bao/manifest", () => {
  test("exports stable vendor paths", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/htmx-vendor-bao");
    expect(HTMX_CORE_RELATIVE_PATH).toBe("htmx/dist/htmx.min.js");
    expect(HTMX_VENDOR_EXTENSION_DIR).toBe("htmx-ext");
  });
});
