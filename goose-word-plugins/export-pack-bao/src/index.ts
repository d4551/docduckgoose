import type { Elysia } from "elysia";
import { EXPORT_PACK_ESTIMATE_API_ROUTE, EXPORT_PACK_SETTINGS_TAB_ROUTE } from "./routes.ts";

interface SettingsTabRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly section: string;
  readonly position: number;
  readonly labelKey: string;
  readonly contentUrl: string;
}

const estimateExport = (title: string, body: string) => {
  const bytes = new TextEncoder().encode(`# ${title}\n\n${body}`).byteLength;
  const assets = [...body.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map((match) => match[1] ?? "");
  return {
    markdownBytes: bytes,
    assetReferences: assets.length,
    formats: ["markdown", "print-html", "pdf"],
    ready: title.trim().length > 0 && body.trim().length > 0,
  };
};

const renderPanel = (): string => `<section>
  <h3>Export pack</h3>
  <p>Preview export size, referenced assets, and format readiness.</p>
</section>`;

const plugin = {
  id: "export-pack-bao",
  createSettingsTabRegistrations(): readonly SettingsTabRegistration[] {
    return [
      {
        id: "export-pack-bao:settings",
        extensionId: "export-pack-bao",
        section: "advanced",
        position: 20,
        labelKey: "editor.exportPdf",
        contentUrl: EXPORT_PACK_SETTINGS_TAB_ROUTE,
      },
    ];
  },
  registerElysia(app: Elysia) {
    app
      .get(
        EXPORT_PACK_SETTINGS_TAB_ROUTE,
        () =>
          new Response(renderPanel(), {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      )
      .post(EXPORT_PACK_ESTIMATE_API_ROUTE, async ({ request }) => {
        const form = await request.formData();
        const title = form.get("title");
        const body = form.get("body");
        return estimateExport(
          typeof title === "string" ? title : "",
          typeof body === "string" ? body : "",
        );
      });
  },
};

export default plugin;
