/**
 * Shared types for soy-view-kit template primitives.
 *
 * All primitives accept a translator callback rather than coupling to a
 * specific i18n provider, so consumers (bao-runtime, registry, forge,
 * command-bao, ...) can plug in their own request-scoped translator.
 *
 * @packageDocumentation
 */

/** Translator signature accepted by every template primitive. */
export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

/** A single breadcrumb segment in a navigation trail. */
export interface BreadcrumbItem {
  /** Display label. */
  readonly label: string;
  /** Destination URL. Omit for the active/current page. */
  readonly href?: string;
  /** Marks the segment as the current page when true. */
  readonly active?: boolean;
}

/** Canonical action label keys consumers must register in their dictionaries. */
export type TemplateActionLabelKey =
  | "common.actions.cancel"
  | "common.actions.close"
  | "common.actions.confirm"
  | "common.actions.submit";

/** Resolution contract for action labels with explicit-text or i18n-key fallback. */
export interface TemplateActionLabelInput {
  /** Explicit literal label text. Wins over labelKey/fallbackLabelKey when set. */
  readonly label?: string;
  /** Optional override key. Falls through to fallbackLabelKey when omitted. */
  readonly labelKey?: TemplateActionLabelKey;
  /** Required fallback key used when label and labelKey are absent. */
  readonly fallbackLabelKey: TemplateActionLabelKey;
  /** Translator callback. */
  readonly translate: TranslateFn;
}
