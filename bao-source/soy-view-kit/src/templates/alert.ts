/**
 * Alert primitive — daisyUI alert with role="alert" and icon glyph.
 *
 * @packageDocumentation
 */

import { escapeHtml } from "../html.js";
import { TEXT_XS_DETAIL_CLASS } from "./design-tokens.js";
import { type AlertIconName, renderAlertIcon } from "./icons.js";

/** Alert semantic type. */
export type AlertType = "error" | "warning" | "info" | "success";

/** daisyUI 5 alert style modifier. */
export type AlertStyle = "soft" | "outline" | "dash";

/** Optional configuration for alert rendering. */
export interface AlertOptions {
  /** Additional utility classes appended to the alert container. */
  className?: string;
  /** ARIA role override. Use `"status"` for non-urgent informational banners. */
  role?: "alert" | "status";
  /** daisyUI 5 style modifier. Defaults to `soft` for info/success, none for error/warning. */
  style?: AlertStyle;
  /** Pre-rendered details fragment when callers intentionally render markup. */
  detailsHtml?: string;
}

const ALERT_ICON_NAME: Record<AlertType, AlertIconName> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

const DEFAULT_ALERT_STYLE_BY_TYPE: Record<AlertType, string> = {
  info: " alert-soft",
  success: " alert-soft",
  warning: "",
  error: "",
};

/**
 * Render an alert with role="alert" and aria-live announcements.
 *
 * @param type - Alert semantic type.
 * @param message - Primary message (escaped).
 * @param details - Optional supplementary detail text (escaped unless `detailsHtml` is supplied).
 * @param options - Optional accessibility and styling overrides.
 * @returns HTML string.
 */
export function renderAlert(
  type: AlertType,
  message: string,
  details?: string,
  options?: AlertOptions,
): string {
  const safeMessage = escapeHtml(message);
  const role = options?.role ?? "alert";
  const extraClass = options?.className ? ` ${options.className}` : "";
  const styleClass = options?.style ? ` alert-${options.style}` : DEFAULT_ALERT_STYLE_BY_TYPE[type];
  const icon = renderAlertIcon(ALERT_ICON_NAME[type]);
  const detailsMarkup =
    options?.detailsHtml ??
    (details ? `<div class="${TEXT_XS_DETAIL_CLASS}">${escapeHtml(details)}</div>` : "");
  const bodyMarkup = detailsMarkup
    ? `<div class="min-w-0">
      <h3 class="font-bold">${safeMessage}</h3>
      ${detailsMarkup}
    </div>`
    : `<div class="min-w-0">
      <span class="text-sm">${safeMessage}</span>
    </div>`;
  return `
  <div class="alert alert-${type} sm:alert-horizontal${styleClass}${extraClass}" role="${role}" aria-live="polite">
    ${icon}
    ${bodyMarkup}
  </div>`;
}
