import { parseJsonObjectFromText, readStringField } from "@baohaus/bao-json-safe";
import type { Elysia } from "elysia";
import { docsApiPath, healthApiPath, ROUTES } from "../../config/routes.ts";
import { resolveLocale } from "../../i18n/runtime.ts";
import { createDoc, deleteDoc, listDocs, updateDoc } from "../../services/doc-store.ts";
import { renderDocsListPanel } from "../html/docs-list-view.ts";
import { renderEditorPanelAfterSave } from "../html/editor-view.ts";

type RouteHost = Elysia;

export const registerDocApiRoutes = (app: RouteHost): void => {
  app
    .get(healthApiPath, () => ({ ok: true, mode: "local" }))
    .post(docsApiPath, async ({ request }) => {
      const body = await parseJsonObjectFromText(await request.text());
      const title = body ? (readStringField(body, "title") ?? "Untitled") : "Untitled";
      const markdown = body ? (readStringField(body, "body") ?? "") : "";
      const doc = createDoc(title, markdown);
      return { id: doc.id };
    })
    .post(ROUTES.docs.apiPattern, async ({ request, params }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const form = await request.formData();
      const titleValue = form.get("title");
      const bodyValue = form.get("body");
      const patch: { title?: string; body?: string } = {};
      if (typeof titleValue === "string") {
        patch.title = titleValue;
      }
      if (typeof bodyValue === "string") {
        patch.body = bodyValue;
      }
      const updated = updateDoc(params.id, patch);
      if (updated === null) {
        return new Response("Not Found", { status: 404 });
      }
      const html = renderEditorPanelAfterSave(locale, updated);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .delete(ROUTES.docs.apiPattern, ({ request, params }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const deleted = deleteDoc(params.id);
      if (deleted === null) {
        return new Response("Not Found", { status: 404 });
      }
      const html = renderDocsListPanel(locale, listDocs());
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    });
};
