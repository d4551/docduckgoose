/**
 * HTMX error-boundary fallback templates.
 *
 * Renders the localised daisyUI markup cloned by client-side error-boundary
 * scripts so fallback UX stays server-rendered and translation-safe.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveTemplateButtonClasses } from "./buttons.js";
import type { TranslateFn } from "./types.js";

/** Server-owned fallback template key for the HTMX error boundary contract. */
export type ErrorBoundaryTemplateKey =
  | "auth-401"
  | "auth-403"
  | "rate-limit"
  | "server"
  | "client"
  | "unknown"
  | "network";

interface ErrorBoundaryTemplateDefinition {
  readonly key: ErrorBoundaryTemplateKey;
  readonly alertVariant: "warning" | "error";
  readonly titleKey: string;
  readonly messageKey: string;
  readonly retryEnabled: boolean;
  readonly statusCodeEnabled: boolean;
}

const ERROR_BOUNDARY_TEMPLATE_DEFINITIONS: readonly ErrorBoundaryTemplateDefinition[] = [
  {
    key: "auth-401",
    alertVariant: "warning",
    titleKey: "ui.errorBoundary.auth.title",
    messageKey: "ui.errorBoundary.auth.message401",
    retryEnabled: false,
    statusCodeEnabled: true,
  },
  {
    key: "auth-403",
    alertVariant: "warning",
    titleKey: "ui.errorBoundary.auth.title",
    messageKey: "ui.errorBoundary.auth.message403",
    retryEnabled: false,
    statusCodeEnabled: true,
  },
  {
    key: "rate-limit",
    alertVariant: "warning",
    titleKey: "ui.errorBoundary.rateLimit.title",
    messageKey: "ui.errorBoundary.rateLimit.message",
    retryEnabled: true,
    statusCodeEnabled: true,
  },
  {
    key: "server",
    alertVariant: "error",
    titleKey: "ui.errorBoundary.server.title",
    messageKey: "ui.errorBoundary.server.message",
    retryEnabled: true,
    statusCodeEnabled: true,
  },
  {
    key: "client",
    alertVariant: "error",
    titleKey: "ui.errorBoundary.client.title",
    messageKey: "ui.errorBoundary.client.message",
    retryEnabled: true,
    statusCodeEnabled: true,
  },
  {
    key: "unknown",
    alertVariant: "error",
    titleKey: "ui.errorBoundary.unknown.title",
    messageKey: "ui.errorBoundary.unknown.message",
    retryEnabled: true,
    statusCodeEnabled: true,
  },
  {
    key: "network",
    alertVariant: "warning",
    titleKey: "ui.errorBoundary.network.title",
    messageKey: "ui.errorBoundary.network.message",
    retryEnabled: true,
    statusCodeEnabled: false,
  },
];

function renderErrorBoundaryTemplate(
  definition: ErrorBoundaryTemplateDefinition,
  translate: TranslateFn,
): string {
  const retryLabel = translate("ui.errorBoundary.retry");
  const retryAria = translate("ui.errorBoundary.retryAria");
  const maxRetriesReached = translate("ui.errorBoundary.maxRetriesReached");

  const statusCodeBlock = definition.statusCodeEnabled
    ? '<div class="text-xs font-mono opacity-60" data-error-boundary-code hidden></div>'
    : "";
  const retryBlock = definition.retryEnabled
    ? `<button
        type="button"
        class="${escapeAttr(resolveTemplateButtonClasses({ variant: "outline", size: "compact", className: "w-full sm:w-auto" }))}"
        data-error-boundary-retry
        data-error-boundary-retry-label="${escapeAttr(retryLabel)}"
        data-error-boundary-retry-disabled-label="${escapeAttr(maxRetriesReached)}"
        aria-label="${escapeAttr(retryAria)}"
      >${escapeHtml(retryLabel)}</button>`
    : "";

  return `
  <template data-error-boundary-template="${escapeAttr(definition.key)}">
    <div
      class="alert alert-${definition.alertVariant} alert-soft alert-vertical sm:alert-horizontal"
      role="alert"
      data-error-boundary-rendered
      data-error-boundary-state="${escapeAttr(definition.key)}"
    >
      <div class="min-w-0 flex-1">
        <h3 class="font-bold tracking-tight" data-error-boundary-title>${escapeHtml(translate(definition.titleKey))}</h3>
        <div class="text-sm" data-error-boundary-message>${escapeHtml(translate(definition.messageKey))}</div>
        ${statusCodeBlock}
      </div>
      ${retryBlock}
    </div>
  </template>`;
}

/**
 * Render the hidden fallback-template set for the HTMX error boundary.
 *
 * @param translate - Translator callback.
 * @returns Concatenated template HTML for a boundary-enabled surface.
 */
export function renderErrorBoundaryTemplates(translate: TranslateFn): string {
  return ERROR_BOUNDARY_TEMPLATE_DEFINITIONS.map((definition) =>
    renderErrorBoundaryTemplate(definition, translate),
  ).join("");
}
