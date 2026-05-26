import {
  isPlainObject,
  type JsonObject,
  parseJsonObjectFromText,
  parseJsonSafe,
  readStringField,
} from "@baohaus/bao-json-safe";
import type { Elysia } from "elysia";
import { isEditorFontId } from "../../config/editor-fonts.ts";
import { preferencesApiPath } from "../../config/routes.ts";
import {
  type DraftStyleId,
  type EditorFontStyle,
  type GooseThemeId,
  getUserPreferences,
  patchUserPreferences,
  type UserPreferences,
} from "../../services/user-prefs.ts";

type RouteHost = Elysia;

const isEditorFontStyle = (value: string): value is EditorFontStyle =>
  value === "normal" || value === "italic";

const isDraftStyleId = (value: string): value is DraftStyleId =>
  value === "" || value === "letter" || value === "manuscript" || value === "notes";

const isGooseThemeId = (value: string): value is GooseThemeId =>
  value === "baohaus-aurora-light" || value === "bao-aurora-glass";

const readPatch = (body: JsonObject): Partial<UserPreferences> => {
  const patch: {
    editorFont?: UserPreferences["editorFont"];
    editorFontStyle?: UserPreferences["editorFontStyle"];
    uiFont?: UserPreferences["uiFont"];
    defaultDraftStyle?: UserPreferences["defaultDraftStyle"];
    theme?: UserPreferences["theme"];
  } = {};
  const editorFont = readStringField(body, "editorFont");
  const uiFont = readStringField(body, "uiFont");
  const editorFontStyle = readStringField(body, "editorFontStyle");
  const defaultDraftStyle = readStringField(body, "defaultDraftStyle");
  const theme = readStringField(body, "theme");
  if (editorFont !== undefined && isEditorFontId(editorFont)) {
    patch.editorFont = editorFont;
  }
  if (uiFont !== undefined && isEditorFontId(uiFont)) {
    patch.uiFont = uiFont;
  }
  if (editorFontStyle !== undefined && isEditorFontStyle(editorFontStyle)) {
    patch.editorFontStyle = editorFontStyle;
  }
  if (defaultDraftStyle !== undefined && isDraftStyleId(defaultDraftStyle)) {
    patch.defaultDraftStyle = defaultDraftStyle;
  }
  if (theme !== undefined && isGooseThemeId(theme)) {
    patch.theme = theme;
  }
  return patch;
};

const parseBodyObject = async (text: string): Promise<JsonObject | undefined> => {
  const fromText = await parseJsonObjectFromText(text);
  if (fromText !== undefined) {
    return fromText;
  }
  const parsed = parseJsonSafe(text);
  if (!parsed.ok || !isPlainObject(parsed.value)) {
    return undefined;
  }
  return parsed.value;
};

export const registerPreferencesApiRoutes = (app: RouteHost): void => {
  app
    .get(preferencesApiPath, () => getUserPreferences())
    .put(preferencesApiPath, async ({ request }) => {
      const body = await parseBodyObject(await request.text());
      if (body === undefined) {
        return new Response("Bad Request", { status: 400 });
      }
      const saved = patchUserPreferences(readPatch(body));
      return saved;
    });
};
