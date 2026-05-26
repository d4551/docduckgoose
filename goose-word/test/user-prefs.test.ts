import { afterEach, describe, expect, it } from "bun:test";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import {
  closeUserPrefsStore,
  getUserPreferences,
  patchUserPreferences,
  resetUserPrefsStoreForTests,
} from "../src/services/user-prefs.ts";

const tempDb = (): string => join(import.meta.dir, `.prefs-test-${crypto.randomUUID()}.sqlite`);

afterEach(() => {
  closeUserPrefsStore();
});

describe("user preferences", () => {
  it("returns defaults for a fresh database", () => {
    const dbPath = tempDb();
    resetUserPrefsStoreForTests(dbPath);
    const prefs = getUserPreferences();
    expect(prefs.editorFont).toBe("goose-handwriting");
    expect(prefs.theme).toBe("baohaus-aurora-light");
    unlinkSync(dbPath);
  });

  it("persists typography patch", () => {
    const dbPath = tempDb();
    resetUserPrefsStoreForTests(dbPath);
    const saved = patchUserPreferences({
      editorFont: "inter",
      editorFontStyle: "italic",
      uiFont: "jetbrains-mono",
      defaultDraftStyle: "manuscript",
      theme: "bao-aurora-glass",
    });
    expect(saved.editorFont).toBe("inter");
    expect(saved.editorFontStyle).toBe("italic");
    expect(getUserPreferences().defaultDraftStyle).toBe("manuscript");
    unlinkSync(dbPath);
  });
});
