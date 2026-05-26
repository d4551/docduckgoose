import type { Elysia } from "elysia";
import {
  dockNavFragmentPath,
  enterpriseContextChipPath,
  enterpriseSwitchPath,
  settingsEnterpriseActivatePath,
  settingsPluginTogglePath,
  settingsPath,
  settingsPluginsPath,
} from "../../config/routes.ts";
import { resolveRequestLocale } from "../../i18n/runtime.ts";
import { listInstalledPlugins, rescanAndMount } from "../../install/bao-mount.service.ts";
import { setActiveEnterpriseContext } from "../../install/contribution-surfaces.ts";
import { isPluginEnabled, setPluginEnabled } from "../../services/user-prefs.ts";
import { selectShellOrPanel } from "../htmx-request.ts";
import { renderDockNav } from "../html/layout.ts";
import { renderEnterpriseContextChip } from "../html/enterprise-context-chip.ts";
import {
  DEFAULT_SETTINGS_TABLE_QUERY,
  parseSettingsTableQuery,
} from "../html/settings-pagination.ts";
import { renderSettingsPage, renderSettingsPanel } from "../html/settings-view.ts";

type RouteHost = Elysia;

const resolveTableQuery = (request: Request): ReturnType<typeof parseSettingsTableQuery> => {
  const url = new URL(request.url);
  return parseSettingsTableQuery(url.searchParams);
};

export const registerSettingsRoutes = (app: RouteHost): void => {
  app
    .get(settingsPath, ({ request }) => {
      const locale = resolveRequestLocale(request);
      const query = resolveTableQuery(request);
      const plugins = listInstalledPlugins();
      const panel = renderSettingsPanel(locale, plugins, query);
      const html = selectShellOrPanel(request, panel, renderSettingsPage(locale, plugins, query));
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(settingsPluginsPath, async ({ request }) => {
      const locale = resolveRequestLocale(request);
      const plugins = await rescanAndMount(app);
      const html = renderSettingsPanel(locale, plugins, DEFAULT_SETTINGS_TABLE_QUERY);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(settingsPluginTogglePath, async ({ params, request }) => {
      const locale = resolveRequestLocale(request);
      const rawId = params.id;
      if (typeof rawId !== "string" || rawId.length === 0) {
        return new Response("Bad Request", { status: 400 });
      }
      setPluginEnabled(rawId, !isPluginEnabled(rawId));
      const plugins = await rescanAndMount(app);
      const html = renderSettingsPanel(locale, plugins, DEFAULT_SETTINGS_TABLE_QUERY);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(settingsEnterpriseActivatePath, ({ params, request }) => {
      const locale = resolveRequestLocale(request);
      const rawId = params.id;
      if (typeof rawId !== "string" || rawId.length === 0) {
        return new Response("Bad Request", { status: 400 });
      }
      setActiveEnterpriseContext(rawId);
      const query = resolveTableQuery(request);
      const plugins = listInstalledPlugins();
      const panelHtml = renderSettingsPanel(locale, plugins, query);
      const chipHtml = renderEnterpriseContextChip(locale);
      const body = `${panelHtml}\n<div id="gw-enterprise-chip" hx-swap-oob="outerHTML">${chipHtml}</div>`;
      return new Response(body, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(dockNavFragmentPath, ({ request }) => {
      const locale = resolveRequestLocale(request);
      const url = new URL(request.url);
      const activeNavRaw = url.searchParams.get("activeNav");
      const activeNav = activeNavRaw === "settings" ? "settings" : "docs";
      const dock = renderDockNav(locale, activeNav);
      return new Response(dock, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(enterpriseContextChipPath, ({ request }) => {
      const locale = resolveRequestLocale(request);
      const chip = renderEnterpriseContextChip(locale);
      return new Response(chip, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(enterpriseSwitchPath, ({ params, request }) => {
      const locale = resolveRequestLocale(request);
      const rawId = params.id;
      if (typeof rawId !== "string" || rawId.length === 0) {
        return new Response("Bad Request", { status: 400 });
      }
      setActiveEnterpriseContext(rawId);
      const chip = renderEnterpriseContextChip(locale);
      return new Response(chip, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    });
};
