import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon } from "@baohaus/soy-view-kit/templates/icons";
import {
  docApiPath,
  docPreviewPath,
  docPrintPath,
  docSavePath,
  docTemplateCreatePath,
} from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { DocRecord } from "../../services/doc-store.ts";
import { renderMarkdown } from "../../services/markdown-render.ts";
import { getUserPreferences, type UserPreferences } from "../../services/user-prefs.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { renderPageShell } from "./layout.ts";
import { fontOptions, renderEditorFontFilterFavorite } from "./font-settings-controls.ts";
import { UI_EMPHASIS_XS_CLASS, UI_META_SECONDARY_CLASS } from "./surface-typography.ts";

export const renderEditorPage = (
  locale: LocaleCode,
  doc: DocRecord,
  draftStyle?: string,
): string => {
  const body = renderEditorPanel(locale, doc, false, draftStyle);

  return renderPageShell({
    locale,
    titleKey: "editor.title",
    bodyHtml: body,
    activeNav: "docs",
  });
};

const toolBtn = (extra = ""): string =>
  resolveTemplateButtonClasses({
    variant: "ghost",
    size: "icon-compact",
    className: `gw-tool-btn tooltip tooltip-top ${extra}`.trim(),
  });

const actionBtn = (variant: "primary" | "ghost" | "outline", extra = ""): string =>
  resolveTemplateButtonClasses({
    variant,
    size: "icon-compact",
    className: `tooltip tooltip-top join-item ${extra}`.trim(),
  });

const renderEditorFontControls = (locale: LocaleCode, prefs: UserPreferences): string => {
  const editorFontLabel = translate(locale, "typography.editorFont");
  const editorStyleLabel = translate(locale, "typography.editorStyle");
  const styleNormal = translate(locale, "typography.style.normal");
  const styleItalic = translate(locale, "typography.style.italic");
  return `<form class="gw-editor-font-form grid gap-2 rounded-box border border-base-300 bg-base-100 p-2" data-gw-typography-form aria-label="${escapeHtml(editorFontLabel)}">
    ${renderEditorFontFilterFavorite(locale, prefs)}
    <div class="grid gap-2 sm:grid-cols-2">
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
    </div>
    <button type="submit" class="sr-only">${escapeHtml(translate(locale, "typography.save"))}</button>
  </form>`;
};

export const renderEditorPanel = (
  locale: LocaleCode,
  doc: DocRecord,
  saved = false,
  draftStyle?: string,
  statusOverride?: string,
): string => {
  const saveLabel = translate(locale, "editor.save");
  const previewLabel = translate(locale, "editor.preview");
  const editLabel = translate(locale, "editor.edit");
  const printLabel = translate(locale, "editor.print");
  const exportPdfLabel = translate(locale, "editor.exportPdf");
  const saveTemplateLabel = translate(locale, "templates.save.action");
  const bodyLabel = translate(locale, "editor.body.label");
  const titleLabel = translate(locale, "editor.title.label");
  const toolbarLabel = translate(locale, "toolbar.markdown");
  const headingLabel = translate(locale, "toolbar.heading");
  const boldLabel = translate(locale, "toolbar.bold");
  const listLabel = translate(locale, "toolbar.list");
  const linkLabel = translate(locale, "toolbar.link");
  const undoLabel = translate(locale, "toolbar.undo");
  const mermaidLabel = translate(locale, "toolbar.mermaid");
  const prefs = getUserPreferences();
  const effectiveDraftStyle =
    draftStyle && draftStyle.length > 0 ? draftStyle : prefs.defaultDraftStyle;
  const dictateLabel = translate(locale, "toolbar.dictate");
  const speakLabel = translate(locale, "toolbar.speak");
  const savedStatus = saved
    ? `<div class="alert alert-success alert-soft py-2 ${UI_META_SECONDARY_CLASS}" role="status">${escapeHtml(statusOverride ?? translate(locale, "editor.saved"))}</div>`
    : "";
  const pageTitle = `${translate(locale, "editor.title")} · ${translate(locale, "app.title")}`;

  return `
    <section class="gw-editor flex min-h-full flex-col gap-3" id="gw-editor-panel" data-gw-page-title="${escapeAttr(pageTitle)}"${effectiveDraftStyle ? ` data-draft-style="${escapeHtml(effectiveDraftStyle)}"` : ""}>
      ${savedStatus}
      ${renderEditorFontControls(locale, prefs)}
      <form class="gw-editor-form flex flex-1 flex-col gap-2"
        method="post"
        action="${docSavePath(doc.id)}"
        hx-post="${docApiPath(doc.id)}"
        hx-target="#gw-editor-panel"
        hx-swap="outerHTML"
        hx-indicator="#global-indicator">
        <input type="hidden" name="draftStyle" value="${escapeHtml(effectiveDraftStyle)}" />
        <label class="form-control w-full">
          <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(titleLabel)}</span>
          <input class="input input-bordered input-sm gw-handwriting w-full" name="title" value="${escapeHtml(doc.title)}" required />
        </label>
        <div class="gw-touch-toolbar flex flex-wrap gap-1" id="gw-touch-toolbar" role="toolbar" aria-label="${escapeHtml(toolbarLabel)}" data-target="gw-body-textarea">
          <button type="button" class="${toolBtn()}" data-md-insert="# " data-tip="${escapeHtml(headingLabel)}" aria-label="${escapeHtml(headingLabel)}">${renderIcon("heading")}</button>
          <button type="button" class="${toolBtn()}" data-md-insert="**" data-tip="${escapeHtml(boldLabel)}" aria-label="${escapeHtml(boldLabel)}">${renderIcon("bold")}</button>
          <button type="button" class="${toolBtn()}" data-md-insert="- " data-tip="${escapeHtml(listLabel)}" aria-label="${escapeHtml(listLabel)}">${renderIcon("list")}</button>
          <button type="button" class="${toolBtn()}" data-md-insert="[]()" data-tip="${escapeHtml(linkLabel)}" aria-label="${escapeHtml(linkLabel)}">${renderIcon("link")}</button>
          <button type="button" class="${toolBtn()}" data-md-undo data-tip="${escapeHtml(undoLabel)}" aria-label="${escapeHtml(undoLabel)}">${renderIcon("undo")}</button>
          <button type="button" class="${toolBtn()}" data-mermaid-insert data-tip="${escapeHtml(mermaidLabel)}" aria-label="${escapeHtml(mermaidLabel)}">${renderIcon("mermaid")}</button>
          <button type="button" class="${toolBtn()}" data-dictate-target="gw-body-textarea" data-stop-label="${escapeHtml(translate(locale, "dictation.stop"))}" data-recording-label="${escapeHtml(translate(locale, "dictation.recording"))}" data-tip="${escapeHtml(dictateLabel)}" aria-label="${escapeHtml(dictateLabel)}" aria-pressed="false">${renderIcon("mic")}</button>
          <button type="button" class="${toolBtn()}" data-speak-target="gw-body-textarea" data-stop-label="${escapeHtml(translate(locale, "speech.stop"))}" data-tip="${escapeHtml(speakLabel)}" aria-label="${escapeHtml(speakLabel)}" aria-pressed="false">${renderIcon("speak")}</button>
        </div>
        <div class="gw-editor-body">
          <label for="gw-body-textarea" class="gw-editor-label">${escapeHtml(bodyLabel)}</label>
          <textarea id="gw-body-textarea" class="textarea textarea-bordered gw-textarea gw-textarea-handwriting gw-handwriting w-full font-normal leading-relaxed" name="body" rows="26">${escapeHtml(doc.body)}</textarea>
        </div>
        <div class="join join-horizontal gw-editor-actions flex-wrap justify-end gap-1">
          <button type="submit" class="${actionBtn("primary")}" data-tip="${escapeHtml(saveLabel)}" aria-label="${escapeHtml(saveLabel)}">${renderIcon("save")}</button>
          <button type="button" class="${actionBtn("outline")} gw-template-save" hx-post="${docTemplateCreatePath(doc.id)}" hx-vals='{"templateStep":"form"}' hx-include="closest form" hx-target="#gw-editor-panel" hx-swap="outerHTML" hx-indicator="#global-indicator" data-tip="${escapeHtml(saveTemplateLabel)}" aria-label="${escapeHtml(saveTemplateLabel)}">${renderIcon("template-notes")}</button>
          <button type="button" class="${actionBtn("ghost")}"
            hx-post="${docPreviewPath(doc.id)}"
            hx-target="#gw-preview-pane"
            hx-swap="innerHTML"
            data-preview-toggle
            data-preview-target="gw-preview-pane"
            data-preview-open-label="${escapeHtml(editLabel)}"
            data-preview-closed-label="${escapeHtml(previewLabel)}"
            data-tip="${escapeHtml(previewLabel)}"
            aria-label="${escapeHtml(previewLabel)}">${renderIcon("preview")}</button>
          <button type="button" class="${actionBtn("outline")}" data-print-current data-print-url="${docPrintPath(doc.id)}" data-tip="${escapeHtml(printLabel)}" aria-label="${escapeHtml(printLabel)}">${renderIcon("print")}</button>
          <button type="button" class="${actionBtn("outline")}" data-print-current data-print-url="${docPrintPath(doc.id)}?print=1" data-tip="${escapeHtml(exportPdfLabel)}" aria-label="${escapeHtml(exportPdfLabel)}">${renderIcon("pdf")}</button>
        </div>
      </form>
      <div id="gw-preview-pane" class="gw-preview prose gw-handwriting p-3" aria-live="polite" hidden></div>
    </section>`;
};

export const renderSaveTemplateFormPanel = (
  locale: LocaleCode,
  doc: DocRecord,
  draftStyle?: string,
  currentTitle = doc.title,
  currentBody = doc.body,
): string => {
  const prefs = getUserPreferences();
  const effectiveDraftStyle =
    draftStyle && draftStyle.length > 0 ? draftStyle : prefs.defaultDraftStyle;
  const title = translate(locale, "templates.save.action");
  const hint = translate(locale, "templates.save.hint");
  const titleLabel = translate(locale, "templates.save.titleLabel");
  const descriptionLabel = translate(locale, "templates.save.descriptionLabel");
  const saveLabel = translate(locale, "templates.save.action");
  const cancelLabel = translate(locale, "templates.save.cancel");
  const submitClass = resolveTemplateButtonClasses({ variant: "primary", size: "compact" });
  const cancelClass = resolveTemplateButtonClasses({ variant: "outline", size: "compact" });
  return `<section class="gw-editor flex min-h-full flex-col gap-3" id="gw-editor-panel"${effectiveDraftStyle ? ` data-draft-style="${escapeHtml(effectiveDraftStyle)}"` : ""}>
    <h2 class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(title)}</h2>
    <p class="${UI_META_SECONDARY_CLASS}">${escapeHtml(hint)}</p>
    <form class="gw-template-save-form grid gap-3"
      hx-post="${docTemplateCreatePath(doc.id)}"
      hx-target="#gw-editor-panel"
      hx-swap="outerHTML"
      hx-indicator="#global-indicator">
      <input type="hidden" name="body" value="${escapeAttr(currentBody)}" />
      <input type="hidden" name="title" value="${escapeAttr(currentTitle)}" />
      <input type="hidden" name="draftStyle" value="${escapeAttr(effectiveDraftStyle)}" />
      <label class="form-control w-full">
        <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(titleLabel)}</span>
        <input class="input input-bordered input-sm w-full" name="templateTitle" value="${escapeHtml(currentTitle)}" required />
      </label>
      <label class="form-control w-full">
        <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(descriptionLabel)}</span>
        <input class="input input-bordered input-sm w-full" name="templateDescription" value="" />
      </label>
      <div class="flex flex-wrap justify-end gap-2">
        <button type="button" class="${cancelClass}" hx-post="${docTemplateCreatePath(doc.id)}" hx-vals='{"templateStep":"cancel"}' hx-target="#gw-editor-panel" hx-swap="outerHTML" hx-indicator="#global-indicator">${escapeHtml(cancelLabel)}</button>
        <button type="submit" class="${submitClass}">${escapeHtml(saveLabel)}</button>
      </div>
    </form>
  </section>`;
};

export const renderPreviewFragment = (markdown: string): string => {
  const html = renderMarkdown(markdown);
  return `<article class="gw-preview-inner">${html}</article>`;
};

export const renderEditorPanelAfterSave = (
  locale: LocaleCode,
  doc: DocRecord,
  statusOverride?: string,
): string => {
  return renderEditorPanel(locale, doc, true, undefined, statusOverride);
};

export const renderEditorSavedPage = (locale: LocaleCode, doc: DocRecord): string =>
  renderPageShell({
    locale,
    titleKey: "editor.title",
    bodyHtml: renderEditorPanel(locale, doc, true),
    activeNav: "docs",
  });
