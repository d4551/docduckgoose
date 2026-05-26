import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { EDITOR_FONT_CATALOG, type EditorFontId } from "../../config/editor-fonts.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { UserPreferences } from "../../services/user-prefs.ts";
import { escapeHtml } from "./escape-html.ts";

const fontOptions = (locale: LocaleCode, selected: EditorFontId): string =>
  EDITOR_FONT_CATALOG.map((font) => {
    const label = translate(locale, font.labelKey);
    const selectedAttr = font.id === selected ? " selected" : "";
    return `<option value="${escapeHtml(font.id)}"${selectedAttr}>${escapeHtml(label)}</option>`;
  }).join("");

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
  const saveBtn = resolveTemplateButtonClasses({
    variant: "primary",
    size: "compact",
    className: "w-full",
  });

  return `
    <section id="gw-typography-panel" class="gw-typography mb-4" aria-label="${escapeHtml(title)}">
      <h2 class="mb-2 text-sm font-semibold">${escapeHtml(title)}</h2>
      <p class="mb-3 text-xs text-base-content/70">${escapeHtml(summary)}</p>
      <form class="grid gap-3" data-gw-typography-form>
        <label class="form-control">
          <span class="label-text text-xs font-semibold">${escapeHtml(editorFontLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="editorFont" data-gw-pref="editorFont">
            ${fontOptions(locale, prefs.editorFont)}
          </select>
        </label>
        <label class="form-control">
          <span class="label-text text-xs font-semibold">${escapeHtml(editorStyleLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="editorFontStyle" data-gw-pref="editorFontStyle">
            <option value="normal"${prefs.editorFontStyle === "normal" ? " selected" : ""}>${escapeHtml(styleNormal)}</option>
            <option value="italic"${prefs.editorFontStyle === "italic" ? " selected" : ""}>${escapeHtml(styleItalic)}</option>
          </select>
        </label>
        <label class="form-control">
          <span class="label-text text-xs font-semibold">${escapeHtml(uiFontLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="uiFont" data-gw-pref="uiFont">
            ${fontOptions(locale, prefs.uiFont)}
          </select>
        </label>
        <label class="form-control">
          <span class="label-text text-xs font-semibold">${escapeHtml(draftStyleLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="defaultDraftStyle" data-gw-pref="defaultDraftStyle">
            <option value=""${prefs.defaultDraftStyle === "" ? " selected" : ""}>${escapeHtml(draftNone)}</option>
            <option value="letter"${prefs.defaultDraftStyle === "letter" ? " selected" : ""}>${escapeHtml(draftLetter)}</option>
            <option value="manuscript"${prefs.defaultDraftStyle === "manuscript" ? " selected" : ""}>${escapeHtml(draftManuscript)}</option>
            <option value="notes"${prefs.defaultDraftStyle === "notes" ? " selected" : ""}>${escapeHtml(draftNotes)}</option>
          </select>
        </label>
        <label class="form-control">
          <span class="label-text text-xs font-semibold">${escapeHtml(themeLabel)}</span>
          <select class="select select-bordered select-sm w-full" name="theme" data-gw-pref="theme">
            <option value="baohaus-aurora-light"${prefs.theme === "baohaus-aurora-light" ? " selected" : ""}>${escapeHtml(themeLight)}</option>
            <option value="bao-aurora-glass"${prefs.theme === "bao-aurora-glass" ? " selected" : ""}>${escapeHtml(themeGlass)}</option>
          </select>
        </label>
        <button type="submit" class="${saveBtn}">${escapeHtml(saveLabel)}</button>
      </form>
    </section>`;
};
