import type { Elysia } from "elysia";
import {
  enterpriseContextChipPath,
  enterpriseSwitchPath,
  settingsEnterpriseActivatePath,
  settingsPath,
  settingsPluginsPath,
} from "../../config/routes.ts";
import { resolveLocale } from "../../i18n/runtime.ts";
import { listInstalledPlugins, rescanAndMount } from "../../install/bao-mount.service.ts";
import { setActiveEnterpriseContext } from "../../install/contribution-surfaces.ts";
import { renderEnterpriseChip } from "../html/layout.ts";
import { renderSettingsPage, renderSettingsPanel } from "../html/settings-view.ts";

type RouteHost = Elysia;

export const registerSettingsRoutes = (app: RouteHost): void => {
  app
    .get(settingsPath, ({ request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const html = renderSettingsPage(locale, listInstalledPlugins());
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(settingsPluginsPath, async ({ request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const plugins = await rescanAndMount(app);
      const html = renderSettingsPanel(locale, plugins);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(settingsEnterpriseActivatePath, ({ params, request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const id = params.id as string;
      setActiveEnterpriseContext(id); // real state change for journey
      const plugins = listInstalledPlugins();
      const html = renderSettingsPanel(locale, plugins);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(enterpriseContextChipPath, ({ request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const chip = renderEnterpriseChip(locale);
      return new Response(chip, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(enterpriseSwitchPath, ({ params, request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const id = params.id as string;
      setActiveEnterpriseContext(id);
      const chip = renderEnterpriseChip(locale);
      return new Response(chip, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    });
};
