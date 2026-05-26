import { describe, expect, it } from "bun:test";
import { renderTemplateEditorPanel } from "../src/http/html/template-editor-view.ts";

describe("renderTemplateEditorPanel", () => {
  it("renders editable template fields", () => {
    const html = renderTemplateEditorPanel("en", {
      id: "template-1",
      title: "Starter",
      description: "Desc",
      body: "# Body",
      draftStyle: "notes",
      updatedAt: "2026-05-26T00:00:00.000Z",
    });
    expect(html).toContain("/templates/template-1/edit");
    expect(html).toContain('name="templateTitle"');
    expect(html).toContain('name="body"');
    expect(html).toContain('value="notes" selected');
  });
});
