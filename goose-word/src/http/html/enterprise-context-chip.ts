import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon, renderTierIconForType } from "@baohaus/soy-view-kit/templates/icons";
import { enterpriseSwitch, settingsPath } from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import {
  getActiveEnterpriseContext,
  gooseWordContributionSurfaces,
  type EnterpriseContextRegistration,
} from "../../install/contribution-surfaces.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { renderEnterpriseTierBadge } from "./enterprise-tier.ts";
const sortedContexts = (): readonly EnterpriseContextRegistration[] =>
  [...gooseWordContributionSurfaces.enterpriseContext.snapshot()].sort((left, right) =>
    left.id.localeCompare(right.id),
  );

const currentContext = (
  locale: LocaleCode,
): {
  readonly registration: EnterpriseContextRegistration | undefined;
  readonly label: string;
  readonly type: EnterpriseContextRegistration["type"];
} => {
  const regs = sortedContexts();
  const activeId = getActiveEnterpriseContext();
  const registration = regs.find((row) => row.id === activeId) ?? regs[0];
  if (registration === undefined) {
    return {
      registration: undefined,
      label: translate(locale, "enterprise.context.personal"),
      type: "user",
    };
  }
  return {
    registration,
    label: translate(locale, registration.labelKey),
    type: registration.type,
  };
};

const renderMenuItem = (
  locale: LocaleCode,
  registration: EnterpriseContextRegistration,
  activeId: string | null,
): string => {
  const label = translate(locale, registration.labelKey);
  const isActive = activeId === registration.id;
  const itemClass = resolveTemplateButtonClasses({
    variant: "ghost",
    size: "compact",
    className: "gw-topbar-context__item justify-start gap-2 w-full",
  });
  return `<li role="none">
    <button type="button" role="menuitemradio" class="${itemClass}"
      aria-label="${escapeAttr(label)}"
      ${isActive ? 'aria-checked="true"' : 'aria-checked="false"'}
      hx-post="${enterpriseSwitch(registration.id)}"
      hx-target="#gw-enterprise-chip"
      hx-swap="outerHTML"
      hx-indicator="#global-indicator">
      ${renderTierIconForType(registration.type, { className: "size-4 shrink-0" })}
      <span class="min-w-0 flex-1 truncate text-left">${escapeHtml(label)}</span>
      ${renderEnterpriseTierBadge(registration.type, locale)}
    </button>
  </li>`;
};

export const renderEnterpriseContextChip = (locale: LocaleCode): string => {
  const contexts = sortedContexts();
  const activeId = getActiveEnterpriseContext();
  const { registration, label, type } = currentContext(locale);
  const menuLabel = translate(locale, "layout.enterpriseChip.menuLabel");
  const manageLabel = translate(locale, "layout.enterpriseChip.manage");
  const chipAria = `${translate(locale, "layout.enterpriseChip.ariaPrefix")}: ${label}`;
  const triggerIcon = renderTierIconForType(type, { className: "size-4 shrink-0" });
  const triggerClass = resolveTemplateButtonClasses({
    variant: "ghost",
    size: "compact",
    className: "gw-topbar-context__trigger",
  });

  if (contexts.length === 0) {
    const emptyClass = resolveTemplateButtonClasses({
      variant: "ghost",
      size: "compact",
      className: "gw-topbar-context__trigger",
    });
    return `<div id="gw-enterprise-chip" class="gw-topbar-context" data-context-count="0">
      <a href="${settingsPath}#gw-enterprise-contexts-section" class="${emptyClass}" aria-label="${escapeAttr(chipAria)}">
        ${renderIcon("building", { className: "size-4 shrink-0", ariaHidden: true })}
        <span class="gw-topbar-context__label truncate">${escapeHtml(label)}</span>
      </a>
    </div>`;
  }

  if (contexts.length === 1) {
    return `<div id="gw-enterprise-chip" class="gw-topbar-context" data-context-count="1" data-current-id="${escapeAttr(registration?.id ?? "")}">
      <span class="gw-topbar-context__trigger gw-topbar-context__trigger--static" aria-label="${escapeAttr(chipAria)}">
        ${triggerIcon}
        ${renderEnterpriseTierBadge(type, locale)}
        <span class="gw-topbar-context__label truncate">${escapeHtml(label)}</span>
      </span>
    </div>`;
  }

  const menuItems = contexts.map((row) => renderMenuItem(locale, row, activeId)).join("");
  const manageClass = resolveTemplateButtonClasses({
    variant: "ghost",
    size: "compact",
    className: "gw-topbar-context__manage",
  });

  return `<div id="gw-enterprise-chip" class="gw-topbar-context dropdown dropdown-end" data-context-count="${String(contexts.length)}" data-current-id="${escapeAttr(registration?.id ?? "")}">
    <button type="button" tabindex="0" class="${triggerClass}" aria-haspopup="menu" aria-label="${escapeAttr(chipAria)}" aria-controls="gw-enterprise-context-menu">
      ${triggerIcon}
      ${renderEnterpriseTierBadge(type, locale)}
      <span class="gw-topbar-context__label truncate">${escapeHtml(label)}</span>
      ${renderIcon("list", { className: "gw-topbar-context__chevron size-3 shrink-0 opacity-70", ariaHidden: true })}
    </button>
    <ul id="gw-enterprise-context-menu" role="menu" tabindex="0" class="dropdown-content menu gw-topbar-context__menu z-50 mt-1 w-56 p-1 shadow-lg" aria-label="${escapeAttr(menuLabel)}">
      ${menuItems}
      <li role="none" class="my-1"><hr class="border-base-300" /></li>
      <li role="none">
        <a href="${settingsPath}#gw-enterprise-contexts-section" class="${manageClass}" role="menuitem">
          ${renderIcon("settings", { className: "size-4 shrink-0", ariaHidden: true })}
          <span class="truncate">${escapeHtml(manageLabel)}</span>
        </a>
      </li>
    </ul>
  </div>`;
};
