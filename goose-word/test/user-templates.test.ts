import { afterEach, describe, expect, it } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  closeUserTemplateStore,
  createUserTemplate,
  deleteUserTemplate,
  getUserTemplate,
  listUserTemplates,
  resetUserTemplateStoreForTests,
  updateUserTemplate,
} from "../src/services/user-templates.ts";

describe("user-templates store", () => {
  let dir = "";

  afterEach(() => {
    closeUserTemplateStore();
    if (dir) {
      rmSync(dir, { recursive: true, force: true });
      dir = "";
    }
  });

  it("creates, lists, gets, and deletes a user template", () => {
    dir = mkdtempSync(join(tmpdir(), "goose-word-user-templates-"));
    const dbPath = join(dir, "templates.db");
    resetUserTemplateStoreForTests(dbPath);
    const created = createUserTemplate({
      title: "My template",
      description: "Saved layout",
      body: "# Draft\n",
      draftStyle: "notes",
    });
    expect(listUserTemplates().length).toBe(1);
    expect(getUserTemplate(created.id)?.title).toBe("My template");
    expect(deleteUserTemplate(created.id)?.id).toBe(created.id);
    expect(listUserTemplates().length).toBe(0);
  });

  it("updates a user template", () => {
    dir = mkdtempSync(join(tmpdir(), "goose-word-user-templates-"));
    const dbPath = join(dir, "templates.db");
    resetUserTemplateStoreForTests(dbPath);
    const created = createUserTemplate({
      title: "Original",
      description: "",
      body: "Body",
      draftStyle: "",
    });
    const updated = updateUserTemplate(created.id, {
      title: "Edited",
      description: "Custom",
      body: "# Edited",
      draftStyle: "manuscript",
    });
    expect(updated?.title).toBe("Edited");
    expect(getUserTemplate(created.id)?.draftStyle).toBe("manuscript");
  });
});
