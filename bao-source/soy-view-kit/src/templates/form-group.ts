/**
 * Form input primitives for daisyUI 5 fieldset-based forms.
 *
 * Centralises labelled inputs, selects, textareas, and form action buttons so
 * every consumer renders the same fieldset/legend/help/error pattern. All
 * primitives accept a translator callback rather than coupling to a specific
 * i18n provider.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveTemplateActionLabel, resolveTemplateButtonClasses } from "./buttons.js";
import { TEXT_HINT_CLASS } from "./design-tokens.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";
import { renderButtonLoadingIndicator } from "./loading-indicator.js";
import type { TemplateActionLabelKey, TranslateFn } from "./types.js";

const DEFAULT_TEXTAREA_ROWS = 3;

interface ControlMessageIds {
  readonly hintId?: string;
  readonly errorId?: string;
}

interface ResolveControlMessageIdsInput {
  readonly id: string;
  readonly helpText?: string;
  readonly helpTextId?: string;
  readonly error?: string;
  readonly errorId?: string;
}

function resolveControlMessageIds(input: ResolveControlMessageIdsInput): ControlMessageIds {
  return {
    hintId: input.helpText ? (input.helpTextId ?? `${input.id}-hint`) : undefined,
    errorId: input.error ? (input.errorId ?? `${input.id}-error`) : undefined,
  };
}

function renderDescribedByAttr(hintId?: string, errorId?: string): string {
  const ids = [hintId, errorId].filter((value): value is string => Boolean(value)).join(" ");
  return ids.length > 0 ? ` aria-describedby="${escapeAttr(ids)}"` : "";
}

function renderLabelledByAttr(legendId: string, ariaLabel?: string): string {
  return ariaLabel
    ? ` aria-label="${escapeAttr(ariaLabel)}"`
    : ` aria-labelledby="${escapeAttr(legendId)}"`;
}

interface RenderLegendOptions {
  readonly label: string;
  readonly legendId: string;
  readonly required?: boolean;
}

function renderFieldsetLegend(options: RenderLegendOptions): string {
  return `<legend id="${escapeAttr(options.legendId)}" class="fieldset-legend">${escapeHtml(options.label)}${options.required ? '<span aria-hidden="true"> *</span>' : ""}</legend>`;
}

interface RenderMessagesOptions extends ControlMessageIds {
  readonly helpText?: string;
  readonly error?: string;
}

function renderFieldMessages(options: RenderMessagesOptions): string {
  const helpBlock =
    options.helpText && options.hintId
      ? `<p id="${escapeAttr(options.hintId)}" class="label ${TEXT_HINT_CLASS}">${escapeHtml(options.helpText)}</p>`
      : "";
  const errorBlock =
    options.error && options.errorId
      ? `<p id="${escapeAttr(options.errorId)}" class="label text-xs text-error">${escapeHtml(options.error)}</p>`
      : "";
  return `${helpBlock}${errorBlock}`;
}

/** Props for a single labelled input group. */
export interface FormGroupProps {
  /** Input element id (also used as `name` when `name` is omitted). */
  readonly id: string;
  /** Visible label text. */
  readonly label: string;
  /** HTML input type. Defaults to `text`. */
  readonly type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "time"
    | "tel"
    | "url"
    | "file"
    | "hidden";
  /** Input name attribute. Defaults to `id`. */
  readonly name?: string;
  /** Whether the field is required. */
  readonly required?: boolean;
  /** Current value. */
  readonly value?: string;
  /** Placeholder text. */
  readonly placeholder?: string;
  /** Help text rendered below the input. */
  readonly helpText?: string;
  /** Inline error message. */
  readonly error?: string;
  /** Externally owned hint id. */
  readonly helpTextId?: string;
  /** Externally owned error id. */
  readonly errorId?: string;
  /** Override input CSS class. */
  readonly inputClass?: string;
  /** Override fieldset CSS class. */
  readonly fieldsetClass?: string;
  /** Minimum value (number/date). */
  readonly min?: number | string;
  /** Maximum value (number/date). */
  readonly max?: number | string;
  /** Optional autocomplete token. */
  readonly autocomplete?: string;
  /** Optional `maxlength`. */
  readonly maxLength?: number;
  /** Optional `minlength`. */
  readonly minLength?: number;
  /** Whether the field is read-only. */
  readonly readOnly?: boolean;
  /** Whether the field is disabled. */
  readonly disabled?: boolean;
  /** Accessible label override for icon-only controls. */
  readonly ariaLabel?: string;
}

function buildInputAttributes(props: FormGroupProps): string {
  const parts: string[] = [];
  if (props.required) {
    parts.push(' required aria-required="true"');
  }
  if (props.value !== undefined) {
    parts.push(` value="${escapeAttr(props.value)}"`);
  }
  if (props.placeholder) {
    parts.push(` placeholder="${escapeAttr(props.placeholder)}"`);
  }
  if (props.min !== undefined) {
    parts.push(` min="${escapeAttr(String(props.min))}"`);
  }
  if (props.max !== undefined) {
    parts.push(` max="${escapeAttr(String(props.max))}"`);
  }
  if (props.autocomplete) {
    parts.push(` autocomplete="${escapeAttr(props.autocomplete)}"`);
  }
  if (props.maxLength !== undefined) {
    parts.push(` maxlength="${escapeAttr(String(props.maxLength))}"`);
  }
  if (props.minLength !== undefined) {
    parts.push(` minlength="${escapeAttr(String(props.minLength))}"`);
  }
  if (props.readOnly) {
    parts.push(' readonly aria-readonly="true"');
  }
  if (props.disabled) {
    parts.push(" disabled");
  }
  return parts.join("");
}

/**
 * Render a labelled input group inside a daisyUI fieldset.
 *
 * @param props - Form group properties.
 * @returns HTML string.
 */
export function renderFormGroup(props: FormGroupProps): string {
  const name = props.name ?? props.id;
  const legendId = `${props.id}-legend`;
  const { hintId, errorId } = resolveControlMessageIds({
    id: props.id,
    helpText: props.helpText,
    helpTextId: props.helpTextId,
    error: props.error,
    errorId: props.errorId,
  });
  const inputClass =
    props.inputClass ??
    (props.type === "file"
      ? "file-input w-full max-w-md xl:max-w-lg"
      : "input w-full max-w-md xl:max-w-lg");
  const errorClass = props.error ? " input-error" : "";
  const attrs = buildInputAttributes(props);

  return `
    <fieldset class="${escapeAttr(props.fieldsetClass ?? "fieldset")}">
      ${renderFieldsetLegend({ label: props.label, legendId, required: props.required })}
      <input type="${props.type ?? "text"}" id="${escapeAttr(props.id)}" name="${escapeAttr(name)}" class="${escapeAttr(`${inputClass}${errorClass}`.trim())}"${attrs}${renderLabelledByAttr(legendId, props.ariaLabel)}${renderDescribedByAttr(hintId, errorId)} />
      ${renderFieldMessages({
        helpText: props.helpText,
        hintId,
        error: props.error,
        errorId,
      })}
    </fieldset>`;
}

/** Option entry for a select dropdown. */
export interface FormSelectOption {
  readonly value: string;
  readonly label: string;
  readonly selected?: boolean;
}

/** Props for a select dropdown group. */
export interface FormSelectProps {
  readonly id: string;
  readonly label: string;
  readonly name?: string;
  readonly options: readonly FormSelectOption[];
  readonly required?: boolean;
  readonly helpText?: string;
  readonly error?: string;
  readonly helpTextId?: string;
  readonly errorId?: string;
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
  readonly selectClass?: string;
}

/**
 * Render a labelled select dropdown inside a daisyUI fieldset.
 *
 * @param props - Form select properties.
 * @returns HTML string.
 */
export function renderFormSelect(props: FormSelectProps): string {
  const name = props.name ?? props.id;
  const legendId = `${props.id}-legend`;
  const { hintId, errorId } = resolveControlMessageIds({
    id: props.id,
    helpText: props.helpText,
    helpTextId: props.helpTextId,
    error: props.error,
    errorId: props.errorId,
  });
  const requiredAttr = props.required ? ' required aria-required="true"' : "";
  const disabledAttr = props.disabled ? " disabled" : "";
  const selectClass = props.selectClass ?? "select w-full max-w-xs xl:max-w-sm";
  const errorClass = props.error ? " select-error" : "";
  const optionsHtml = props.options
    .map(
      (option) =>
        `<option value="${escapeAttr(option.value)}"${option.selected ? " selected" : ""}>${escapeHtml(option.label)}</option>`,
    )
    .join("");

  return `
    <fieldset class="fieldset">
      ${renderFieldsetLegend({ label: props.label, legendId, required: props.required })}
      <select id="${escapeAttr(props.id)}" name="${escapeAttr(name)}" class="${escapeAttr(`${selectClass}${errorClass}`.trim())}"${requiredAttr}${disabledAttr}${renderLabelledByAttr(legendId, props.ariaLabel)}${renderDescribedByAttr(hintId, errorId)}>${optionsHtml}</select>
      ${renderFieldMessages({
        helpText: props.helpText,
        hintId,
        error: props.error,
        errorId,
      })}
    </fieldset>`;
}

/** Props for a textarea group. */
export interface FormTextareaProps {
  readonly id: string;
  readonly label: string;
  readonly name?: string;
  readonly value?: string;
  readonly rows?: number;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly helpText?: string;
  readonly error?: string;
  readonly helpTextId?: string;
  readonly errorId?: string;
  readonly ariaLabel?: string;
  readonly textareaClass?: string;
}

/**
 * Render a labelled textarea inside a daisyUI fieldset.
 *
 * @param props - Form textarea properties.
 * @returns HTML string.
 */
export function renderFormTextarea(props: FormTextareaProps): string {
  const name = props.name ?? props.id;
  const legendId = `${props.id}-legend`;
  const { hintId, errorId } = resolveControlMessageIds({
    id: props.id,
    helpText: props.helpText,
    helpTextId: props.helpTextId,
    error: props.error,
    errorId: props.errorId,
  });
  const requiredAttr = props.required ? ' required aria-required="true"' : "";
  const rows = props.rows ?? DEFAULT_TEXTAREA_ROWS;
  const placeholderAttr = props.placeholder
    ? ` placeholder="${escapeAttr(props.placeholder)}"`
    : "";
  const textareaClass = props.textareaClass ?? "textarea w-full";
  const errorClass = props.error ? " textarea-error" : "";

  return `
    <fieldset class="fieldset">
      ${renderFieldsetLegend({ label: props.label, legendId, required: props.required })}
      <textarea id="${escapeAttr(props.id)}" name="${escapeAttr(name)}" class="${escapeAttr(`${textareaClass}${errorClass}`.trim())}" rows="${rows}"${requiredAttr}${placeholderAttr}${renderLabelledByAttr(legendId, props.ariaLabel)}${renderDescribedByAttr(hintId, errorId)}>${escapeHtml(props.value ?? "")}</textarea>
      ${renderFieldMessages({
        helpText: props.helpText,
        hintId,
        error: props.error,
        errorId,
      })}
    </fieldset>`;
}

/** Props for form action buttons (submit + cancel). */
export interface FormActionsProps {
  /** Translator callback. */
  readonly translate: TranslateFn;
  /** Cancel link href. */
  readonly cancelHref: string;
  /** Submit button label override. */
  readonly submitLabel?: string;
  /** Submit i18n key. Defaults to `common.actions.submit`. */
  readonly submitLabelKey?: TemplateActionLabelKey;
  /** Cancel button label override. */
  readonly cancelLabel?: string;
  /** Cancel i18n key. Defaults to `common.actions.cancel`. */
  readonly cancelLabelKey?: TemplateActionLabelKey;
  /** Submit button variant. */
  readonly submitVariant?: "primary" | "error";
}

/**
 * Render form action buttons (submit + cancel).
 *
 * @param props - Form actions properties.
 * @returns HTML string.
 */
export function renderFormActions(props: FormActionsProps): string {
  const submitVariant = props.submitVariant === "error" ? "error" : "primary";
  const submitLabel = resolveTemplateActionLabel({
    label: props.submitLabel,
    labelKey: props.submitLabelKey,
    fallbackLabelKey: "common.actions.submit",
    translate: props.translate,
  });
  const cancelLabel = resolveTemplateActionLabel({
    label: props.cancelLabel,
    labelKey: props.cancelLabelKey,
    fallbackLabelKey: "common.actions.cancel",
    translate: props.translate,
  });

  return `
    <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end md:mt-8 xl:gap-3">
      <a href="${escapeAttr(props.cancelHref)}" ${buildShellHtmxNavigationAttributes(props.cancelHref)} class="${escapeAttr(resolveTemplateButtonClasses({ variant: "ghost" }))}" aria-label="${escapeAttr(cancelLabel)}">${escapeHtml(cancelLabel)}</a>
      <button type="submit" class="${escapeAttr(resolveTemplateButtonClasses({ variant: submitVariant }))}" data-loading-disable data-loading-class="btn-disabled" hx-disabled-elt="this" aria-label="${escapeAttr(submitLabel)}">${renderButtonLoadingIndicator(props.translate)} ${escapeHtml(submitLabel)}</button>
    </div>`;
}
