import { EDITOR_FONT_CATALOG, type EditorFontId } from "../../config/editor-fonts.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { UserPreferences } from "../../services/user-prefs.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { UI_EMPHASIS_XS_CLASS } from "./surface-typography.ts";

const isFavorite = (favorites: readonly EditorFontId[], id: EditorFontId): boolean =>
  favorites.includes(id);

export const fontOptions = (
  locale: LocaleCode,
  selected: EditorFontId,
  favorites: readonly EditorFontId[],
): string =>
  EDITOR_FONT_CATALOG.map((font) => {
    const label = translate(locale, font.labelKey);
    const selectedAttr = font.id === selected ? " selected" : "";
    const favoriteLabel = isFavorite(favorites, font.id) ? "★ " : "";
    return `<option value="${escapeAttr(font.id)}"${selectedAttr} data-gw-font-label="${escapeAttr(label)}">${escapeHtml(`${favoriteLabel}${label}`)}</option>`;
  }).join("");

export const renderEditorFontFilterFavorite = (
  locale: LocaleCode,
  prefs: UserPreferences,
): string => {
  const searchLabel = translate(locale, "typography.fontSearch");
  const favoriteLabel = translate(locale, "typography.favoriteFont");
  const favoriteValue = prefs.favoriteEditorFonts.join(",");
  const checked = isFavorite(prefs.favoriteEditorFonts, prefs.editorFont) ? " checked" : "";
  return `<div class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
    <label class="form-control">
      <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(searchLabel)}</span>
      <input class="input input-bordered input-sm" type="search" data-gw-font-filter data-gw-font-target="editorFont" placeholder="${escapeAttr(searchLabel)}" aria-label="${escapeAttr(searchLabel)}" autocomplete="off" />
    </label>
    <label class="label cursor-pointer justify-start gap-2 self-end rounded-box border border-base-300 px-3 py-2">
      <input class="checkbox checkbox-sm" type="checkbox" data-gw-font-favorite name="favoriteEditorFont" value="${escapeAttr(prefs.editorFont)}"${checked} />
      <span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(favoriteLabel)}</span>
    </label>
    <input type="hidden" name="favoriteEditorFonts" data-gw-favorite-fonts value="${escapeAttr(favoriteValue)}" />
  </div>`;
};
