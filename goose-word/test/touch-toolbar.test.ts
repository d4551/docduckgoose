import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TOUCH_TOOLBAR_JS = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "client",
  "touch-toolbar.js",
);

const js = readFileSync(TOUCH_TOOLBAR_JS, "utf8");

describe("touch-toolbar.js preview wiring", () => {
  it("posts current editor form data for preview", () => {
    expect(js).toContain("postPreviewHtml");
    expect(js).toContain("new FormData(form)");
    expect(js).toContain('button.getAttribute("hx-post")');
  });

  it("inserts Mermaid fenced markdown from toolbar", () => {
    expect(js).toContain("data-mermaid-insert");
    expect(js).toContain("```mermaid\\nflowchart LR");
  });

  it("prints current unsaved form data", () => {
    expect(js).toContain("postPrintHtml");
    expect(js).toContain("data-print-current");
    expect(js).toContain("new FormData(form)");
  });
});
