import { afterEach, describe, expect, it } from "bun:test";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import { renderEditorPage, renderSaveTemplateFormPanel } from "../src/http/html/editor-view.ts";
import type { DocRecord } from "../src/services/doc-store.ts";
import { closeUserPrefsStore, resetUserPrefsStoreForTests } from "../src/services/user-prefs.ts";

const tempDb = (): string =>
  join(import.meta.dir, `.prefs-editor-test-${crypto.randomUUID()}.sqlite`);

const makeDoc = (): DocRecord => ({
  id: "doc-1",
  title: "Draft",
  body: "# Draft",
  slug: "draft",
  updatedAt: "2026-05-26T00:00:00.000Z",
  filePath: "/tmp/draft.md",
});

afterEach(() => {
  closeUserPrefsStore();
});

describe("renderEditorPage", () => {
  it("renders visible editor font controls", () => {
    const dbPath = tempDb();
    resetUserPrefsStoreForTests(dbPath);
    const html = renderEditorPage("en", makeDoc());
    expect(html).toContain("gw-editor-font-form");
    expect(html).toContain('name="editorFont"');
    expect(html).toContain("data-gw-font-filter");
    expect(html).toContain("data-gw-font-favorite");
    expect(html).toContain('name="favoriteEditorFonts"');
    expect(html).toContain("Editor font");
    expect(html).toContain('hx-post="/docs/doc-1/preview"');
    expect(html).not.toContain('hx-get="/docs/doc-1/preview"');
    expect(html).toContain("data-print-current");
    expect(html).toContain('data-print-url="/docs/doc-1/print"');
    closeUserPrefsStore();
    unlinkSync(dbPath);
  });

  it("renders save-as-template control and form panel", () => {
    const dbPath = tempDb();
    resetUserPrefsStoreForTests(dbPath);
    const page = renderEditorPage("en", makeDoc(), "notes");
    expect(page).toContain("gw-template-save");
    expect(page).toContain('hx-vals=\'{"templateStep":"form"}\'');
    const formPanel = renderSaveTemplateFormPanel("en", makeDoc(), "notes");
    expect(formPanel).toContain("gw-template-save-form");
    expect(formPanel).toContain('name="templateTitle"');
    expect(formPanel).toContain('name="templateDescription"');
    expect(formPanel).toContain('name="draftStyle" value="notes"');
    closeUserPrefsStore();
    unlinkSync(dbPath);
  });
});
