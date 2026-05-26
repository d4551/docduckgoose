import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon, renderTierIconForType } from "@baohaus/soy-view-kit/templates/icons";
import { gooseWordBaoPluginsDir, GOOSE_WORD_PORT } from "../../config/paths.ts";
import {
  healthApiPath,
  settingsEnterpriseActivate,
  settingsPluginRemove,
  settingsPluginToggle,
  settingsPluginsPath,
} from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import { nativeMobileShellRegistry } from "@baohaus/contribution-registry-bao/native-mobile-shell-registry";
import {
  getActiveEnterpriseContext,
  gooseWordContributionSurfaces,
  type EnterpriseContextRegistration,
} from "../../install/contribution-surfaces.ts";
import { getUserPreferences } from "../../services/user-prefs.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { renderEnterpriseTierBadge } from "./enterprise-tier.ts";
import { renderPageShell } from "./layout.ts";
import {
  DEFAULT_SETTINGS_TABLE_QUERY,
  paginateSlice,
  renderSettingsPagination,
  renderSettingsSortHeader,
  sortStrings,
  type SettingsTableQuery,
  type SortDirection,
} from "./settings-pagination.ts";
import {
  PAGE_HEADING_CLASS,
  SECTION_HEADING_CLASS,
  TABLE_CELL_MONO_CLASS,
  UI_EMPHASIS_SM_CLASS,
  UI_EMPHASIS_XS_CLASS,
  UI_META_SECONDARY_CLASS,
} from "./surface-typography.ts";
import { renderTypographySettingsPanel } from "./typography-settings.ts";

export interface InstalledPluginRow {
  readonly id: string;
  readonly version: string;
  readonly targets: readonly string[];
  readonly source: "installed" | "dev";
  readonly enabled: boolean;
}

const shellHealthUrl = (host: string, port: number, path: string): string =>
  `http://${host}:${String(port)}${path}`;

const renderDeviceShellSection = (locale: LocaleCode): string => {
  const shells = nativeMobileShellRegistry.snapshot();
  const title = translate(locale, "device.shell.title");
  const colPlatform = translate(locale, "device.shell.col.platform");
  const colHost = translate(locale, "device.shell.col.host");
  const colPort = translate(locale, "device.shell.col.port");
  const colMode = translate(locale, "device.shell.col.mode");
  const colStatus = translate(locale, "device.shell.col.status");
  const localLabel = translate(locale, "device.shell.local");
  const modeBrowser = translate(locale, "device.shell.mode.browser");
  const modeEmbedded = translate(locale, "device.shell.mode.embedded");
  const deviceLabels = JSON.stringify({
    local: localLabel,
    ios: translate(locale, "device.shell.ios"),
    android: translate(locale, "device.shell.android"),
    embedded: translate(locale, "device.shell.embedded"),
    desktop: translate(locale, "device.shell.desktop"),
    checking: translate(locale, "device.shell.status.checking"),
    online: translate(locale, "device.shell.status.online"),
    offline: translate(locale, "device.shell.status.offline"),
  });

  const checkingLabel = translate(locale, "device.shell.status.checking");
  const localRow = `<tr data-gw-shell-row="local" data-gw-health-url="${escapeAttr(healthApiPath)}">
        <td><span class="badge badge-ghost badge-sm" data-gw-shell-platform-label="local">${escapeHtml(localLabel)}</span></td>
        <td class="${TABLE_CELL_MONO_CLASS}" data-gw-shell-host>—</td>
        <td class="${TABLE_CELL_MONO_CLASS}">${String(GOOSE_WORD_PORT)}</td>
        <td><span class="badge badge-outline badge-xs">${escapeHtml(modeBrowser)}</span></td>
        <td><span class="badge badge-warning badge-xs" data-gw-shell-status="local" aria-live="polite">${escapeHtml(checkingLabel)}</span></td>
      </tr>`;

  const shellRows = shells
    .map((shell) => {
      const labelKey = shell.platform === "android" ? "device.shell.android" : "device.shell.ios";
      const label = translate(locale, labelKey);
      const healthUrl = shellHealthUrl(shell.loopbackHost, shell.loopbackPort, shell.healthPath);
      return `<tr data-gw-shell-row="${escapeAttr(shell.platform)}" data-gw-health-url="${escapeAttr(healthUrl)}">
        <td><span class="badge badge-ghost badge-sm">${escapeHtml(label)}</span></td>
        <td class="${TABLE_CELL_MONO_CLASS}">${escapeHtml(shell.loopbackHost)}</td>
        <td class="${TABLE_CELL_MONO_CLASS}">${String(shell.loopbackPort)}</td>
        <td><span class="badge badge-outline badge-xs">${escapeHtml(modeEmbedded)}</span></td>
        <td><span class="badge badge-warning badge-xs" data-gw-shell-status="${escapeAttr(shell.platform)}" aria-live="polite">${escapeHtml(checkingLabel)}</span></td>
      </tr>`;
    })
    .join("");

  return `<section id="gw-device-shell-section" class="gw-settings-section" aria-label="${escapeHtml(title)}" data-gw-device-labels="${escapeAttr(deviceLabels)}">
    <h2 class="mb-2 ${SECTION_HEADING_CLASS}">${escapeHtml(title)}</h2>
    <div class="gw-table-surface overflow-x-auto" role="region" aria-label="${escapeHtml(title)}" tabindex="0">
      <table class="table table-zebra table-sm table-pin-rows" role="table">
        <thead>
          <tr>
            <th scope="col">${escapeHtml(colPlatform)}</th>
            <th scope="col">${escapeHtml(colHost)}</th>
            <th scope="col">${escapeHtml(colPort)}</th>
            <th scope="col">${escapeHtml(colMode)}</th>
            <th scope="col">${escapeHtml(colStatus)}</th>
          </tr>
        </thead>
        <tbody>${localRow}${shellRows}</tbody>
      </table>
    </div>
  </section>`;
};

const sortPlugins = (
  rows: readonly InstalledPluginRow[],
  sortKey: SettingsTableQuery["pluginsSort"],
  direction: SortDirection,
): readonly InstalledPluginRow[] =>
  [...rows].sort((left, right) => {
    if (sortKey === "version") {
      return sortStrings(left.version, right.version, direction);
    }
    if (sortKey === "source") {
      return sortStrings(left.source, right.source, direction);
    }
    return sortStrings(left.id, right.id, direction);
  });

const sortEnterpriseContexts = (
  rows: readonly EnterpriseContextRegistration[],
  locale: LocaleCode,
  sortKey: SettingsTableQuery["enterpriseSort"],
  direction: SortDirection,
): readonly EnterpriseContextRegistration[] =>
  [...rows].sort((left, right) => {
    if (sortKey === "type") {
      return sortStrings(left.type, right.type, direction);
    }
    return sortStrings(
      translate(locale, left.labelKey),
      translate(locale, right.labelKey),
      direction,
    );
  });

const renderEnterpriseSection = (locale: LocaleCode, query: SettingsTableQuery): string => {
  const regs = sortEnterpriseContexts(
    gooseWordContributionSurfaces.enterpriseContext.snapshot(),
    locale,
    query.enterpriseSort,
    query.enterpriseDir,
  );
  const active = getActiveEnterpriseContext();
  const title = translate(locale, "enterprise.contexts.title");
  const summary = translate(locale, "enterprise.contexts.summary");
  const empty = translate(locale, "enterprise.contexts.empty");
  const activate = translate(locale, "enterprise.context.activate");
  const activeLabel = translate(locale, "enterprise.context.active");
  const tableAria = translate(locale, "enterprise.contexts.table.aria");
  const colName = translate(locale, "enterprise.contexts.col.name");
  const colTier = translate(locale, "enterprise.contexts.col.tier");
  const colStatus = translate(locale, "enterprise.contexts.col.status");
  const colActions = translate(locale, "enterprise.contexts.col.actions");
  const page = paginateSlice(regs, query.enterprisePage);

  if (regs.length === 0) {
    return `<section id="gw-enterprise-contexts-section" class="gw-settings-section" aria-label="${escapeHtml(title)}">
      <h2 class="mb-2 ${SECTION_HEADING_CLASS}">${escapeHtml(title)}</h2>
      <div class="alert alert-soft py-4 ${UI_META_SECONDARY_CLASS}" role="status">${escapeHtml(empty)}</div>
    </section>`;
  }

  const rows = page.items
    .map((registration) => {
      const label = translate(locale, registration.labelKey);
      const isActive = active === registration.id;
      const statusCell = isActive
        ? `<span class="badge badge-success badge-xs">${escapeHtml(activeLabel)}</span>`
        : `<span class="${UI_META_SECONDARY_CLASS}">—</span>`;
      const btnClass = resolveTemplateButtonClasses({
        variant: isActive ? "primary" : "outline",
        size: "compact",
        className: "gw-enterprise-activate shrink-0",
      });
      const activateIcon = isActive
        ? renderIcon("alert-success", { className: "size-4 shrink-0", ariaHidden: true })
        : renderIcon("open", { className: "size-4 shrink-0", ariaHidden: true });
      return `<tr class="hover gw-row-enter">
        <th scope="row">
          <div class="flex min-w-0 items-center gap-2">
            ${renderTierIconForType(registration.type, { className: "size-4 shrink-0" })}
            <span class="truncate ${UI_EMPHASIS_SM_CLASS}">${escapeHtml(label)}</span>
          </div>
        </th>
        <td>${renderEnterpriseTierBadge(registration.type, locale)}</td>
        <td>${statusCell}</td>
        <td>
          <button type="button" class="${btnClass}"
            aria-label="${escapeHtml(activate)} ${escapeHtml(label)}"
            ${isActive ? 'aria-pressed="true"' : 'aria-pressed="false"'}
            hx-post="${settingsEnterpriseActivate(registration.id)}"
            hx-target="#gw-main"
            hx-swap="innerHTML"
            hx-indicator="#global-indicator">
            ${activateIcon}
            <span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(activate)}</span>
          </button>
        </td>
      </tr>`;
    })
    .join("");

  const pagination = renderSettingsPagination({
    locale,
    query,
    pageField: "enterprisePage",
    totalPages: page.totalPages,
    total: page.total,
  });

  return `<section id="gw-enterprise-contexts-section" class="gw-settings-section" aria-label="${escapeHtml(title)}">
    <h2 class="mb-2 ${SECTION_HEADING_CLASS}">${escapeHtml(title)}</h2>
    <p class="mb-2 ${UI_META_SECONDARY_CLASS}">${escapeHtml(summary)}</p>
    <div class="gw-table-surface overflow-x-auto" role="region" aria-label="${escapeHtml(tableAria)}" tabindex="0">
      <table class="table table-zebra table-sm table-pin-rows" role="table">
        <thead>
          <tr>
            ${renderSettingsSortHeader({ locale, label: colName, sortKey: "label", activeSort: query.enterpriseSort, activeDir: query.enterpriseDir, query, sortField: "enterpriseSort", dirField: "enterpriseDir" })}
            ${renderSettingsSortHeader({ locale, label: colTier, sortKey: "type", activeSort: query.enterpriseSort, activeDir: query.enterpriseDir, query, sortField: "enterpriseSort", dirField: "enterpriseDir" })}
            <th scope="col">${escapeHtml(colStatus)}</th>
            <th scope="col" class="w-32">${escapeHtml(colActions)}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${pagination}
  </section>`;
};

export const renderPluginsSection = (
  locale: LocaleCode,
  plugins: readonly InstalledPluginRow[],
  query: SettingsTableQuery,
): string => {
  const pluginsLabel = translate(locale, "settings.plugins.title");
  const reloadLabel = translate(locale, "settings.plugins.reload");
  const empty = translate(locale, "settings.plugins.empty");
  const tableAria = translate(locale, "settings.plugins.table.aria");
  const colId = translate(locale, "settings.plugins.col.id");
  const colVersion = translate(locale, "settings.plugins.col.version");
  const colSource = translate(locale, "settings.plugins.col.source");
  const colTargets = translate(locale, "settings.plugins.col.targets");
  const colStatus = translate(locale, "settings.plugins.col.status");
  const colActions = translate(locale, "settings.plugins.col.actions");
  const enabledLabel = translate(locale, "settings.plugins.enabled");
  const disabledLabel = translate(locale, "settings.plugins.disabled");
  const enableLabel = translate(locale, "settings.plugins.enable");
  const disableLabel = translate(locale, "settings.plugins.disable");
  const removeLabel = translate(locale, "settings.plugins.remove");
  const removeConfirm = translate(locale, "settings.plugins.remove.confirm");
  const addHint = translate(locale, "settings.plugins.addHint");
  const dirLabel = translate(locale, "settings.plugins.directory");
  const summaryLabel = translate(locale, "settings.plugins.summary", {
    enabled: String(plugins.filter((p) => p.enabled).length),
    disabled: String(plugins.filter((p) => !p.enabled).length),
  });
  const sorted = sortPlugins(plugins, query.pluginsSort, query.pluginsDir);
  const page = paginateSlice(sorted, query.pluginsPage);

  const renderPluginActions = (plugin: InstalledPluginRow): string => {
    const toggleLabel = plugin.enabled ? disableLabel : enableLabel;
    const toggleIcon = plugin.enabled ? "alert-success" : "open";
    const toggleVariant = plugin.enabled ? "error" : "outline";
    const toggleBtn = `<form class="inline" hx-post="${settingsPluginToggle(plugin.id)}" hx-target="#gw-plugins-section" hx-swap="outerHTML" hx-indicator="#global-indicator">
      <button type="submit" class="${resolveTemplateButtonClasses({ variant: toggleVariant, size: "compact", className: "gw-plugin-toggle" })}" aria-label="${escapeAttr(toggleLabel)} ${escapeAttr(plugin.id)}">${renderIcon(toggleIcon, { className: "size-4 shrink-0", ariaHidden: true })}<span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(toggleLabel)}</span></button>
    </form>`;
    const removeBtn = `<div class="gw-delete-confirm">
      <button type="button" class="${resolveTemplateButtonClasses({ variant: "ghost", size: "compact", className: "gw-plugin-remove-trigger" })}" aria-label="${escapeAttr(removeLabel)} ${escapeAttr(plugin.id)}" onclick="this.parentElement.querySelector('.gw-confirm-popover').hidden=false;this.hidden=true">${renderIcon("delete", { className: "size-4 shrink-0", ariaHidden: true })}<span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(removeLabel)}</span></button>
      <div class="gw-confirm-popover flex items-center gap-2 p-2 border border-base-300 bg-base-100 rounded-lg" hidden>
        <span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(removeConfirm)}</span>
        <form class="inline" hx-post="${settingsPluginRemove(plugin.id)}" hx-target="#gw-plugins-section" hx-swap="outerHTML" hx-indicator="#global-indicator">
          <button type="submit" class="${resolveTemplateButtonClasses({ variant: "error", size: "compact", className: "gw-delete-armed" })}" aria-label="${escapeAttr(removeLabel)} ${escapeAttr(plugin.id)}">${renderIcon("delete", { className: "size-4 shrink-0", ariaHidden: true })}<span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(removeLabel)}</span></button>
        </form>
      </div>
    </div>`;
    return `<div class="flex items-center gap-1">${toggleBtn}${removeBtn}</div>`;
  };

  const tableBody =
    page.total === 0
      ? `<tbody><tr><td colspan="6" class="py-8 text-center ${UI_META_SECONDARY_CLASS}" role="status">${escapeHtml(empty)}</td></tr></tbody>`
      : `<tbody>${page.items
          .map((plugin) => {
            const statusLabel = plugin.enabled ? enabledLabel : disabledLabel;
            return `<tr class="hover gw-row-enter">
          <th scope="row">
            <div class="flex items-center gap-2">
              ${renderIcon("plugins", { className: "size-4 shrink-0" })}
              <span class="gw-plugin-id truncate">${escapeHtml(plugin.id)}</span>
            </div>
          </th>
          <td><span class="badge badge-ghost badge-sm font-mono">${escapeHtml(plugin.version)}</span></td>
          <td><span class="badge badge-outline badge-xs">${escapeHtml(plugin.source)}</span></td>
          <td class="max-w-xs"><span class="truncate ${TABLE_CELL_MONO_CLASS}">${escapeHtml(plugin.targets.join(", "))}</span></td>
          <td><span class="badge ${plugin.enabled ? "badge-success" : "badge-warning"} badge-xs">${escapeHtml(statusLabel)}</span></td>
          <td>${renderPluginActions(plugin)}</td>
        </tr>`;
          })
          .join("")}</tbody>`;

  const pagination = renderSettingsPagination({
    locale,
    query,
    pageField: "pluginsPage",
    totalPages: page.totalPages,
    total: page.total,
  });

  return `<section id="gw-plugins-section" class="gw-settings-section" aria-label="${escapeHtml(pluginsLabel)}">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
      <div>
        <h2 class="${SECTION_HEADING_CLASS}">${escapeHtml(pluginsLabel)}</h2>
        <p class="${UI_META_SECONDARY_CLASS}">${escapeHtml(summaryLabel)}</p>
      </div>
      <form hx-post="${settingsPluginsPath}" hx-target="#gw-plugins-section" hx-swap="outerHTML" hx-indicator="#global-indicator">
        <button type="submit" class="${resolveTemplateButtonClasses({ variant: "outline", size: "compact", className: "gw-plugins-reload" })}" aria-label="${escapeAttr(reloadLabel)}">${renderIcon("reload", { className: "size-4 shrink-0", ariaHidden: true })}<span class="${UI_EMPHASIS_XS_CLASS}">${escapeHtml(reloadLabel)}</span></button>
      </form>
    </div>
    <div class="gw-table-surface overflow-x-auto" role="region" aria-label="${escapeHtml(tableAria)}" tabindex="0">
      <table class="table table-zebra table-sm table-pin-rows" role="table">
        <thead>
          <tr>
            ${renderSettingsSortHeader({ locale, label: colId, sortKey: "id", activeSort: query.pluginsSort, activeDir: query.pluginsDir, query, sortField: "pluginsSort", dirField: "pluginsDir" })}
            ${renderSettingsSortHeader({ locale, label: colVersion, sortKey: "version", activeSort: query.pluginsSort, activeDir: query.pluginsDir, query, sortField: "pluginsSort", dirField: "pluginsDir" })}
            ${renderSettingsSortHeader({ locale, label: colSource, sortKey: "source", activeSort: query.pluginsSort, activeDir: query.pluginsDir, query, sortField: "pluginsSort", dirField: "pluginsDir" })}
            <th scope="col">${escapeHtml(colTargets)}</th>
            <th scope="col">${escapeHtml(colStatus)}</th>
            <th scope="col">${escapeHtml(colActions)}</th>
          </tr>
        </thead>
        ${tableBody}
      </table>
    </div>
    ${pagination}
    <div class="mt-3 flex flex-col gap-1">
      <p class="${UI_META_SECONDARY_CLASS}"><span class="font-semibold">${escapeHtml(dirLabel)}:</span> <code class="font-mono text-xs select-all">${escapeHtml(gooseWordBaoPluginsDir)}</code></p>
      <p class="${UI_META_SECONDARY_CLASS}">${escapeHtml(addHint)}</p>
    </div>
  </section>`;
};

export const renderSettingsPanel = (
  locale: LocaleCode,
  plugins: readonly InstalledPluginRow[],
  query: SettingsTableQuery = DEFAULT_SETTINGS_TABLE_QUERY,
): string => {
  const pageTitle = `${translate(locale, "settings.title")} · ${translate(locale, "app.title")}`;
  return `
    <section class="gw-panel gw-admin-surface">
      <h1 class="mb-3 ${PAGE_HEADING_CLASS}" data-gw-page-title="${escapeAttr(pageTitle)}">${escapeHtml(translate(locale, "settings.title"))}</h1>
      <div class="space-y-4">
        ${renderPluginsSection(locale, plugins, query)}
        ${renderTypographySettingsPanel(locale, getUserPreferences())}
        ${renderDeviceShellSection(locale)}
        ${renderEnterpriseSection(locale, query)}
      </div>
      <div id="gw-settings-panel" class="mt-4"></div>
    </section>`;
};

export const renderSettingsPage = (
  locale: LocaleCode,
  plugins: readonly InstalledPluginRow[],
  query: SettingsTableQuery = DEFAULT_SETTINGS_TABLE_QUERY,
): string => {
  const body = renderSettingsPanel(locale, plugins, query);

  return renderPageShell({
    locale,
    titleKey: "settings.title",
    bodyHtml: body,
    activeNav: "settings",
  });
};
