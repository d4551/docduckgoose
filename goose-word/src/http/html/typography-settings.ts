import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { UserPreferences } from "../../services/user-prefs.ts";
import { escapeHtml } from "./escape-html.ts";
import { fontOptions, renderEditorFontFilterFavorite } from "./font-settings-controls.ts";
import {
  SECTION_HEADING_CLASS,
  UI_EMPHASIS_XS_CLASS,
  UI_META_SECONDARY_CLASS,
} from "./surface-typography.ts";

export const renderTypographySettingsPanel = (
  locale: LocaleCode,
  prefs: UserPreferences,
): string => {
  const title = translate(locale, "typography.title");
  const summary = translate(locale, "typography.summary");
  const editorFontLabel = translate(locale, "typography.editorFont");
  const editorStyleLabel = translate(locale, "typography.editorStyle");
  const uiFontLabel = translate(locale, "typography.uiFont");
  const draftStyleLabel = translate(locale, "typography.defaultDraftStyle");
  const themeLabel = translate(locale, "typography.theme");
  const saveLabel = translate(locale, "typography.save");
  const styleNormal = translate(locale, "typography.style.normal");
  const styleItalic = translate(locale, "typography.style.italic");
  const draftNone = translate(locale, "typography.draft.none");
  const draftLetter = translate(locale, "typography.draft.letter");
  const draftManuscript = translate(locale, "typography.draft.manuscript");
  const draftNotes = translate(locale, "typography.draft.notes");
  const themeLight = translate(locale, "typography.theme.light");
  const themeGlass = translate(locale, "theme.glass");
  const localeLabel = translate(locale, "typography.locale");
  const localeEn = translate(locale, "typography.locale.en");
  const localeZh = translate(locale, "typography.locale.zh");
  const localeJa = translate(locale, "typography.locale.ja");
  const localeKo = translate(locale, "typography.locale.ko");
  const saveBtn = resolveTemplateButtonClasses({
    variant: "primary",
    size: "compact",
    className: "w-full",
  });

  return `
    <section id="gw-typography-panel" class="gw-typography mb-4" aria-label="${escapeHtml(title)}">
      <h2 class="mb-2 ${SECTION_HEADING_CLASS}">${escapeHtml(title)}</h2>
      <p class="mb-3 ${UI_META_SECONDARY_CLASS}">${escapeHtml(summary)}</p>
      <form class="grid gap-3" data-gw-typography-form>
        ${renderEditorFontFilterFavorite(locale, prefs)}
        <label class="form-control">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(editorFontLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="editorFont" data-gw-pref="editorFont">
            ${fontOptions(locale, prefs.editorFont, prefs.favoriteEditorFonts)}
          </select>
        </label>
        <label class="form-control">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(editorStyleLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="editorFontStyle" data-gw-pref="editorFontStyle">
            <option value="normal"${prefs.editorFontStyle === "normal" ? " selected" : ""}>${escapeHtml(styleNormal)}</option>
            <option value="italic"${prefs.editorFontStyle === "italic" ? " selected" : ""}>${escapeHtml(styleItalic)}</option>
          </select>
        </label>
        <label class="form-control">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(uiFontLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="uiFont" data-gw-pref="uiFont">
            ${fontOptions(locale, prefs.uiFont, prefs.favoriteEditorFonts)}
          </select>
        </label>
        <label class="form-control">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(draftStyleLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="defaultDraftStyle" data-gw-pref="defaultDraftStyle">
            <option value=""${prefs.defaultDraftStyle === "" ? " selected" : ""}>${escapeHtml(draftNone)}</option>
            <option value="letter"${prefs.defaultDraftStyle === "letter" ? " selected" : ""}>${escapeHtml(draftLetter)}</option>
            <option value="manuscript"${prefs.defaultDraftStyle === "manuscript" ? " selected" : ""}>${escapeHtml(draftManuscript)}</option>
            <option value="notes"${prefs.defaultDraftStyle === "notes" ? " selected" : ""}>${escapeHtml(draftNotes)}</option>
          </select>
        </label>
        <label class="form-control">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(localeLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="locale" data-gw-pref="locale">
            <option value="en"${prefs.locale === "en" ? " selected" : ""}>${escapeHtml(localeEn)}</option>
            <option value="zh-Hans"${prefs.locale === "zh-Hans" ? " selected" : ""}>${escapeHtml(localeZh)}</option>
            <option value="ja"${prefs.locale === "ja" ? " selected" : ""}>${escapeHtml(localeJa)}</option>
            <option value="ko"${prefs.locale === "ko" ? " selected" : ""}>${escapeHtml(localeKo)}</option>
          </select>
        </label>
        <label class="form-control">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(themeLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="theme" data-gw-pref="theme">
            <option value="baohaus-aurora-light"${prefs.theme === "baohaus-aurora-light" ? " selected" : ""}>${escapeHtml(themeLight)}</option>
            <option value="bao-aurora-glass"${prefs.theme === "bao-aurora-glass" ? " selected" : ""}>${escapeHtml(themeGlass)}</option>
          </select>
        </label>
        <button type="submit" id="gw-typography-save" class="${saveBtn}">${escapeHtml(saveLabel)}</button>
        <output id="gw-typography-status" class="min-h-5 ${UI_META_SECONDARY_CLASS}" role="status" aria-live="polite"></output>
      </form>
    </section>`;
};
