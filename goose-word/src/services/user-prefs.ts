import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { isPlainObject, parseJsonSafe, readStringField } from "@baohaus/bao-json-safe";
import type { EditorFontId } from "../config/editor-fonts.ts";
import { isEditorFontId } from "../config/editor-fonts.ts";
import { gooseWordDbPath } from "../config/paths.ts";

export type EditorFontStyle = "normal" | "italic";
export type DraftStyleId = "" | "letter" | "manuscript" | "notes";
export type GooseThemeId = "baohaus-aurora-light" | "bao-aurora-glass";

export interface UserPreferences {
  readonly editorFont: EditorFontId;
  readonly editorFontStyle: EditorFontStyle;
  readonly uiFont: EditorFontId;
  readonly defaultDraftStyle: DraftStyleId;
  readonly theme: GooseThemeId;
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  editorFont: "goose-handwriting",
  editorFontStyle: "normal",
  uiFont: "goose-handwriting",
  defaultDraftStyle: "",
  theme: "baohaus-aurora-light",
};

const PREFS_ROW_ID = "default";

interface PrefsRow {
  readonly id: string;
  readonly json: string;
}

const isEditorFontStyle = (value: string): value is EditorFontStyle =>
  value === "normal" || value === "italic";

const isDraftStyleId = (value: string): value is DraftStyleId =>
  value === "" || value === "letter" || value === "manuscript" || value === "notes";

const isGooseThemeId = (value: string): value is GooseThemeId =>
  value === "baohaus-aurora-light" || value === "bao-aurora-glass";

const parsePreferences = (json: string): UserPreferences => {
  const parsed = parseJsonSafe(json);
  if (!parsed.ok || !isPlainObject(parsed.value)) {
    return DEFAULT_USER_PREFERENCES;
  }
  const record = parsed.value;
  const editorFontRaw = readStringField(record, "editorFont");
  const uiFontRaw = readStringField(record, "uiFont");
  const editorFontStyleRaw = readStringField(record, "editorFontStyle");
  const defaultDraftStyleRaw = readStringField(record, "defaultDraftStyle");
  const themeRaw = readStringField(record, "theme");
  return {
    editorFont:
      editorFontRaw !== undefined && isEditorFontId(editorFontRaw)
        ? editorFontRaw
        : DEFAULT_USER_PREFERENCES.editorFont,
    editorFontStyle:
      editorFontStyleRaw !== undefined && isEditorFontStyle(editorFontStyleRaw)
        ? editorFontStyleRaw
        : DEFAULT_USER_PREFERENCES.editorFontStyle,
    uiFont:
      uiFontRaw !== undefined && isEditorFontId(uiFontRaw)
        ? uiFontRaw
        : DEFAULT_USER_PREFERENCES.uiFont,
    defaultDraftStyle:
      defaultDraftStyleRaw !== undefined && isDraftStyleId(defaultDraftStyleRaw)
        ? defaultDraftStyleRaw
        : DEFAULT_USER_PREFERENCES.defaultDraftStyle,
    theme:
      themeRaw !== undefined && isGooseThemeId(themeRaw)
        ? themeRaw
        : DEFAULT_USER_PREFERENCES.theme,
  };
};

export class UserPrefsStore {
  readonly #db: Database;

  constructor(dbPath = gooseWordDbPath) {
    mkdirSync(dirname(dbPath), { recursive: true });
    this.#db = new Database(dbPath);
    this.#db.run("PRAGMA journal_mode = WAL;");
    this.#db.run(`
      CREATE TABLE IF NOT EXISTS user_prefs (
        id TEXT PRIMARY KEY,
        json TEXT NOT NULL
      );
    `);
    const row = this.#db
      .query<PrefsRow, [string]>("SELECT id, json FROM user_prefs WHERE id = ?")
      .get(PREFS_ROW_ID);
    if (row === null) {
      this.#db
        .query("INSERT INTO user_prefs (id, json) VALUES (?, ?)")
        .run(PREFS_ROW_ID, JSON.stringify(DEFAULT_USER_PREFERENCES));
    }
  }

  get(): UserPreferences {
    const row = this.#db
      .query<PrefsRow, [string]>("SELECT id, json FROM user_prefs WHERE id = ?")
      .get(PREFS_ROW_ID);
    if (row === null) {
      return DEFAULT_USER_PREFERENCES;
    }
    return parsePreferences(row.json);
  }

  save(next: UserPreferences): UserPreferences {
    this.#db
      .query("UPDATE user_prefs SET json = ? WHERE id = ?")
      .run(JSON.stringify(next), PREFS_ROW_ID);
    return next;
  }

  patch(patch: Partial<UserPreferences>): UserPreferences {
    const current = this.get();
    const merged: UserPreferences = {
      editorFont: patch.editorFont ?? current.editorFont,
      editorFontStyle: patch.editorFontStyle ?? current.editorFontStyle,
      uiFont: patch.uiFont ?? current.uiFont,
      defaultDraftStyle: patch.defaultDraftStyle ?? current.defaultDraftStyle,
      theme: patch.theme ?? current.theme,
    };
    return this.save(merged);
  }

  close(): void {
    this.#db.close();
  }
}

let defaultPrefsStore: UserPrefsStore | null = null;

const getDefaultPrefsStore = (): UserPrefsStore => {
  if (defaultPrefsStore === null) {
    defaultPrefsStore = new UserPrefsStore();
  }
  return defaultPrefsStore;
};

export const getUserPreferences = (): UserPreferences => getDefaultPrefsStore().get();

export const saveUserPreferences = (next: UserPreferences): UserPreferences =>
  getDefaultPrefsStore().save(next);

export const patchUserPreferences = (patch: Partial<UserPreferences>): UserPreferences =>
  getDefaultPrefsStore().patch(patch);

export const closeUserPrefsStore = (): void => {
  if (defaultPrefsStore !== null) {
    defaultPrefsStore.close();
    defaultPrefsStore = null;
  }
};

export const resetUserPrefsStoreForTests = (dbPath: string): void => {
  closeUserPrefsStore();
  defaultPrefsStore = new UserPrefsStore(dbPath);
};
