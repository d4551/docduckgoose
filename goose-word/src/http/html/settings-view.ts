import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon, renderTierIconForType } from "@baohaus/soy-view-kit/templates/icons";
import { settingsEnterpriseActivate, settingsPluginsPath } from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import {
  getActiveEnterpriseContext,
  gooseWordContributionSurfaces,
} from "../../install/contribution-surfaces.ts";
import { getUserPreferences } from "../../services/user-prefs.ts";
import { escapeHtml } from "./escape-html.ts";
import { renderPageShell } from "./layout.ts";
import { renderTypographySettingsPanel } from "./typography-settings.ts";

export interface InstalledPluginRow {
  readonly id: string;
  readonly version: string;
  readonly targets: readonly string[];
  readonly source: "installed" | "dev";
}

const tierBadge = (
  type: "user" | "workspace" | "workplace" | "admin" | "enterprise",
  locale: LocaleCode,
): string => {
  const label = translate(locale, `enterprise.tier.${type}` as const);
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
  return `<span class="badge badge-xs ${color}">${escapeHtml(label)}</span>`;
};

const renderEnterpriseSection = (locale: LocaleCode): string => {
  const regs = gooseWordContributionSurfaces.enterpriseContext.snapshot();
  const active = getActiveEnterpriseContext();
  const title = translate(locale, "enterprise.contexts.title");
  const summary = translate(locale, "enterprise.contexts.summary");
  const empty = translate(locale, "enterprise.contexts.empty");
  const activate = translate(locale, "enterprise.context.activate");
  const activeLabel = translate(locale, "enterprise.context.active");

  if (regs.length === 0) {
    return `<section class="gw-settings-section" aria-label="${escapeHtml(title)}">
			<h2 class="mb-2 text-sm font-semibold">${escapeHtml(title)}</h2>
			<div class="alert alert-soft py-4 text-sm">${escapeHtml(empty)}</div>
		</section>`;
  }

  const list = regs
    .map((r) => {
      const label = translate(locale, r.labelKey);
      const isActive = active === r.id;
      const activePill = isActive
        ? `<span class="badge badge-success badge-xs ml-1">${escapeHtml(activeLabel)}</span>`
        : "";
      const btnClass = resolveTemplateButtonClasses({
        variant: isActive ? "primary" : "outline",
        size: "icon-compact",
        className: "tooltip tooltip-left",
      });
      return `<li>
			<div class="flex w-full items-center justify-between gap-2 py-1">
				<div class="flex items-center gap-2 min-w-0">
					${renderTierIconForType(r.type, { className: "size-4 shrink-0" })}
					<span class="truncate font-medium">${escapeHtml(label)}</span>
					${tierBadge(r.type, locale)}
					${activePill}
				</div>
				<button type="button" class="${btnClass}" data-tip="${escapeHtml(activate)}" aria-label="${escapeHtml(activate)} ${escapeHtml(label)}"
					hx-post="${settingsEnterpriseActivate(r.id)}"
					hx-target="#gw-main"
					hx-swap="innerHTML">
					${renderIcon("settings", { className: "size-4" })}
				</button>
			</div>
		</li>`;
    })
    .join("");

  return `<section class="gw-settings-section" aria-label="${escapeHtml(title)}">
		<h2 class="mb-2 text-sm font-semibold">${escapeHtml(title)}</h2>
		<p class="mb-2 text-xs text-base-content/70">${escapeHtml(summary)}</p>
		<ul class="gw-settings-list">${list}</ul>
	</section>`;
};

export const renderSettingsPanel = (
  locale: LocaleCode,
  plugins: readonly InstalledPluginRow[],
): string => {
  const pluginsLabel = translate(locale, "settings.plugins.title");
  const pluginList =
    plugins.length === 0
      ? `<div class="alert alert-soft py-4 text-sm">${escapeHtml(translate(locale, "settings.plugins.empty"))}</div>`
      : `<ul class="gw-settings-list">${plugins
          .map(
            (p) => `<li>
          <div class="flex flex-col items-start gap-1 py-2">
            <div class="flex w-full items-center gap-2">
              ${renderIcon("plugins", { className: "size-4 shrink-0" })}
              <strong class="truncate">${escapeHtml(p.id)}</strong>
              <span class="badge badge-ghost badge-sm font-mono">${escapeHtml(p.version)}</span>
            </div>
            <div class="flex flex-wrap gap-1 pl-6">
              <span class="badge badge-outline badge-xs">${escapeHtml(translate(locale, "settings.plugins.source"))}: ${escapeHtml(p.source)}</span>
              <span class="badge badge-outline badge-xs">${escapeHtml(p.targets.join(", "))}</span>
            </div>
          </div>
        </li>`,
          )
          .join("")}</ul>`;

  const reloadLabel = translate(locale, "settings.plugins.reload");

  return `
    <section class="gw-panel">
      <h1 class="gw-handwriting mb-3 text-lg font-bold">${escapeHtml(translate(locale, "settings.title"))}</h1>
      <div class="space-y-4">
        ${renderTypographySettingsPanel(locale, getUserPreferences())}
        ${renderEnterpriseSection(locale)}
        <section class="gw-settings-section">
          <h2 class="mb-2 text-sm font-semibold">${escapeHtml(pluginsLabel)}</h2>
          ${pluginList}
          <form class="mt-3" hx-post="${settingsPluginsPath}" hx-target="#gw-main" hx-swap="innerHTML">
            <button type="submit" class="${resolveTemplateButtonClasses({ variant: "outline", size: "icon-compact", className: "tooltip tooltip-top" })}" data-tip="${escapeHtml(reloadLabel)}" aria-label="${escapeHtml(reloadLabel)}">${renderIcon("reload")}</button>
          </form>
        </section>
      </div>
      <div id="gw-settings-panel" class="mt-4"></div>
    </section>`;
};

export const renderSettingsPage = (
  locale: LocaleCode,
  plugins: readonly InstalledPluginRow[],
): string => {
  const body = renderSettingsPanel(locale, plugins);

  return renderPageShell({
    locale,
    titleKey: "settings.title",
    bodyHtml: body,
    activeNav: "settings",
  });
};
