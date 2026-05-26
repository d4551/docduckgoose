import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon } from "@baohaus/soy-view-kit/templates/icons";
import { docListPath, userTemplateEditPath } from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { UserTemplateRecord } from "../../services/user-templates.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { renderPageShell } from "./layout.ts";
import {
  PAGE_HEADING_CLASS,
  UI_EMPHASIS_XS_CLASS,
  UI_META_SECONDARY_CLASS,
} from "./surface-typography.ts";

const draftOption = (
  value: UserTemplateRecord["draftStyle"],
  selected: UserTemplateRecord["draftStyle"],
  label: string,
): string =>
  `<option value="${escapeAttr(value)}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>`;

export const renderTemplateEditorPanel = (
  locale: LocaleCode,
  template: UserTemplateRecord,
  saved = false,
): string => {
  const saveLabel = translate(locale, "editor.save");
  const status = saved
    ? `<div class="alert alert-success alert-soft py-2 ${UI_META_SECONDARY_CLASS}" role="status">${escapeHtml(translate(locale, "templates.saved"))}</div>`
    : "";
  return `<section class="gw-panel gw-admin-surface grid gap-3" id="gw-template-editor-panel">
    ${status}
    <div class="flex items-center justify-between gap-2">
      <h1 class="${PAGE_HEADING_CLASS}">${escapeHtml(translate(locale, "templates.edit.title"))}</h1>
      <a class="${resolveTemplateButtonClasses({ variant: "ghost", size: "icon-compact", className: "tooltip tooltip-left" })}" href="${docListPath}" data-tip="${escapeAttr(translate(locale, "nav.docs"))}" aria-label="${escapeAttr(translate(locale, "nav.docs"))}">${renderIcon("docs")}</a>
    </div>
    <form class="grid gap-3" method="post" action="${userTemplateEditPath(template.id)}" hx-post="${userTemplateEditPath(template.id)}" hx-target="#gw-template-editor-panel" hx-swap="outerHTML" hx-indicator="#global-indicator">
      <label class="form-control">
        <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(translate(locale, "templates.save.titleLabel"))}</span>
        <input class="input input-bordered input-sm" name="templateTitle" value="${escapeAttr(template.title)}" required />
      </label>
      <label class="form-control">
        <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(translate(locale, "templates.save.descriptionLabel"))}</span>
        <input class="input input-bordered input-sm" name="templateDescription" value="${escapeAttr(template.description)}" />
      </label>
      <label class="form-control">
        <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(translate(locale, "typography.defaultDraftStyle"))}</span>
        <select class="select select-bordered select-sm" name="draftStyle">
          ${draftOption("", template.draftStyle, translate(locale, "typography.draft.none"))}
          ${draftOption("letter", template.draftStyle, translate(locale, "typography.draft.letter"))}
          ${draftOption("manuscript", template.draftStyle, translate(locale, "typography.draft.manuscript"))}
          ${draftOption("notes", template.draftStyle, translate(locale, "typography.draft.notes"))}
        </select>
      </label>
      <label class="form-control">
        <span class="label-text ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(translate(locale, "editor.body.label"))}</span>
        <textarea class="textarea textarea-bordered gw-textarea min-h-80" name="body">${escapeHtml(template.body)}</textarea>
      </label>
      <button type="submit" class="${resolveTemplateButtonClasses({ variant: "primary", size: "compact" })}">${renderIcon("save", { className: "size-4", ariaHidden: true })}<span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(saveLabel)}</span></button>
    </form>
  </section>`;
};

export const renderTemplateEditorPage = (
  locale: LocaleCode,
  template: UserTemplateRecord,
): string =>
  renderPageShell({
    locale,
    titleKey: "templates.edit.title",
    bodyHtml: renderTemplateEditorPanel(locale, template),
    activeNav: "docs",
  });
