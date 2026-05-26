import { afterEach, describe, expect, it } from "bun:test";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import {
  closeUserPrefsStore,
  getUserPreferences,
  isPluginEnabled,
  patchUserPreferences,
  resetUserPrefsStoreForTests,
  setPluginEnabled,
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
    expect(prefs.favoriteEditorFonts).toEqual(["goose-handwriting"]);
    expect(prefs.disabledPluginIds).toEqual([]);
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
      favoriteEditorFonts: ["inter", "jetbrains-mono"],
      disabledPluginIds: ["spellcheck-bao"],
      defaultDraftStyle: "manuscript",
      theme: "bao-aurora-glass",
    });
    expect(saved.editorFont).toBe("inter");
    expect(saved.favoriteEditorFonts).toEqual(["inter", "jetbrains-mono"]);
    expect(saved.disabledPluginIds).toEqual(["spellcheck-bao"]);
    expect(saved.editorFontStyle).toBe("italic");
    expect(saved.theme).toBe("bao-aurora-glass");
    expect(getUserPreferences().defaultDraftStyle).toBe("manuscript");
    expect(getUserPreferences().theme).toBe("bao-aurora-glass");
    unlinkSync(dbPath);
  });

  it("persists plugin enable and disable state", () => {
    const dbPath = tempDb();
    resetUserPrefsStoreForTests(dbPath);
    expect(isPluginEnabled("spellcheck-bao")).toBe(true);
    setPluginEnabled("spellcheck-bao", false);
    expect(isPluginEnabled("spellcheck-bao")).toBe(false);
    setPluginEnabled("spellcheck-bao", true);
    expect(isPluginEnabled("spellcheck-bao")).toBe(true);
    unlinkSync(dbPath);
  });
});
