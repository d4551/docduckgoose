import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { EnterpriseContextRegistration } from "../../install/contribution-surfaces.ts";
import { escapeHtml } from "./escape-html.ts";

export const renderEnterpriseTierBadge = (
  type: EnterpriseContextRegistration["type"],
  locale: LocaleCode,
): string => {
  const label = translate(locale, `enterprise.tier.${type}`);
  const color =
    type === "enterprise"
      ? "badge-success"
      : type === "admin"
        ? "badge-warning"
        : type === "workplace"
          ? "badge-secondary"
          : type === "workspace"
            ? "badge-primary"
            : "badge-info";
  return `<span class="badge badge-xs ${color} shrink-0">${escapeHtml(label)}</span>`;
};
