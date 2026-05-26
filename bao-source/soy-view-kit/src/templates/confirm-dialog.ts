/**
 * Shared shell confirmation dialog primitive.
 *
 * One DaisyUI dialog per shell, driven by the `ui-shell` HTMX extension. All
 * `hx-confirm` flows route through it so confirmation UX is owned by the shell
 * rather than browser dialogs or per-route `showModal()` calls.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveTemplateButtonClasses } from "./buttons.js";
import { SURFACE_GLASS, TEXT_SECONDARY_CLASS } from "./design-tokens.js";
import type { TranslateFn } from "./types.js";

/** Stable DOM id for the shared shell confirmation dialog. */
export const SHELL_CONFIRM_DIALOG_ID = "ui-shell-confirm-dialog";

/** Props for the shared shell confirmation dialog. */
export interface ConfirmDialogProps {
  /** Translator callback. */
  readonly translate: TranslateFn;
  /** Dialog element id. Defaults to `SHELL_CONFIRM_DIALOG_ID`. */
  readonly id?: string;
  /** Default dialog title text. */
  readonly title?: string;
  /** Default descriptive message shown until a request supplies a question. */
  readonly message?: string;
  /** Confirm button label. */
  readonly confirmLabel?: string;
  /** Cancel button label. */
  readonly cancelLabel?: string;
  /** Close button label. */
  readonly closeLabel?: string;
}

/**
 * Render the shared daisyUI shell confirmation dialog.
 *
 * The `ui-shell` HTMX extension updates the title/message per request and
 * issues the underlying request only after the user confirms.
 *
 * @param props - Dialog props.
 * @returns HTML string for the dialog element.
 */
export function renderConfirmDialog(props: ConfirmDialogProps): string {
  const dialogId = props.id ?? SHELL_CONFIRM_DIALOG_ID;
  const translate = props.translate;
  const title = props.title ?? translate("common.actions.confirm");
  const message = props.message ?? translate("common.confirm.defaultMessage");
  const confirmLabel = props.confirmLabel ?? translate("common.actions.confirm");
  const cancelLabel = props.cancelLabel ?? translate("common.actions.cancel");
  const closeLabel = props.closeLabel ?? translate("common.actions.close");
  const closeIcon = translate("common.actions.closeIcon");
  const titleId = `${dialogId}-title`;
  const messageId = `${dialogId}-message`;
  const confirmButtonId = `${dialogId}-confirm`;
  const cancelButtonId = `${dialogId}-cancel`;

  return `
    <dialog id="${escapeAttr(dialogId)}" class="modal modal-bottom sm:modal-middle" aria-labelledby="${escapeAttr(titleId)}" aria-describedby="${escapeAttr(messageId)}" aria-modal="true">
      <div class="modal-box shadow-2xl border border-base-300/30 overscroll-contain motion-safe:transition-opacity motion-safe:[transition-duration:var(--v-duration-fast)]">
        <form method="dialog">
          <button type="submit" class="${escapeAttr(resolveTemplateButtonClasses({ variant: "ghost", size: "icon-compact", className: "absolute right-3 top-3 hover:bg-base-content/10" }))}" data-confirm-dialog-close="true" aria-label="${escapeAttr(closeLabel)}">${escapeHtml(closeIcon)}</button>
        </form>
        <h3 id="${escapeAttr(titleId)}" class="text-lg font-bold tracking-tight">${escapeHtml(title)}</h3>
        <p id="${escapeAttr(messageId)}" class="py-4 ${TEXT_SECONDARY_CLASS} text-sm leading-relaxed">${escapeHtml(message)}</p>
        <div class="modal-action flex-col-reverse gap-2 sm:flex-row">
          <form method="dialog">
            <button id="${escapeAttr(cancelButtonId)}" type="submit" class="${escapeAttr(resolveTemplateButtonClasses({ variant: "ghost" }))}" data-confirm-dialog-cancel="true" aria-label="${escapeAttr(cancelLabel)}" autofocus>${escapeHtml(cancelLabel)}</button>
          </form>
          <button id="${escapeAttr(confirmButtonId)}" type="button" class="${escapeAttr(resolveTemplateButtonClasses({ variant: "error" }))}" data-confirm-dialog-confirm="true" aria-label="${escapeAttr(confirmLabel)}">${escapeHtml(confirmLabel)}</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop ${SURFACE_GLASS}">
        <button type="submit" data-confirm-dialog-close="true" aria-label="${escapeAttr(closeLabel)}">${escapeHtml(closeLabel)}</button>
      </form>
    </dialog>`;
}
