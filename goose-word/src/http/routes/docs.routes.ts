import type { Elysia } from "elysia";
import {
  docEditPath,
  docListPath,
  docNewPath,
  ROUTES,
  routePaths,
} from "../../config/routes.ts";
import { resolveLocale } from "../../i18n/runtime.ts";
import { gooseWordContributionSurfaces } from "../../install/contribution-surfaces.ts";
import { createDoc, deleteDoc, getDoc, listDocs, updateDoc } from "../../services/doc-store.ts";
import { getUserPreferences } from "../../services/user-prefs.ts";
import { renderDocRowsFragment, renderDocsListPage } from "../html/docs-list-view.ts";
import {
  renderEditorPage,
  renderEditorPanelAfterSave,
  renderEditorSavedPage,
  renderPreviewFragment,
} from "../html/editor-view.ts";
import { renderGlassProofPage } from "../html/glass-proof-view.ts";
import { renderPrintPage } from "../html/print-view.ts";

type RouteHost = Elysia;

const renderDocsAfterDelete = (request: Request, id: string): Response => {
  const deleted = deleteDoc(id);
  if (deleted === null) {
    return new Response("Not Found", { status: 404 });
  }
  const isFragmentRequest = request.headers.get("hx-request") === "true";
  if (!isFragmentRequest) {
    return new Response(null, {
      status: 303,
      headers: { Location: docListPath },
    });
  }
  const locale = resolveLocale(request.headers.get("accept-language"));
  const templates = gooseWordContributionSurfaces.documentTemplate.snapshot();
  const html = renderDocsListPage(locale, listDocs(), templates);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};

export const registerDocRoutes = (app: RouteHost): void => {
  app
    .get(routePaths.home, () => {
      return new Response(null, {
        status: 302,
        headers: { Location: docListPath },
      });
    })
    .get(docListPath, ({ request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const templates = gooseWordContributionSurfaces.documentTemplate.snapshot();
      const html = renderDocsListPage(locale, listDocs(), templates);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(ROUTES.glassProof, ({ request }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const html = renderGlassProofPage(locale);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(ROUTES.docs.rowsFragment, ({ request, query }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const offset = Number(query.offset) || 0;
      const limit = Math.min(Number(query.limit) || 20, 50);
      const docs = listDocs(limit, offset);
      const html = renderDocRowsFragment(locale, docs, offset);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(docNewPath, ({ request, query }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const templateId = typeof query.template === "string" ? query.template : undefined;

      let title = translateDefaultTitle(locale);
      let body = "";
      let draftStyle: string | undefined;

      if (templateId) {
        const templates = gooseWordContributionSurfaces.documentTemplate.snapshot();
        const tpl = templates.find((t) => t.id === templateId);
        if (tpl) {
          const content = tpl.getInitialContent(locale);
          if (content.title) title = content.title;
          body = content.body;
          draftStyle = content.draftStyle;
        }
      }

      const doc = createDoc(title, body);
      const style = draftStyle ?? getUserPreferences().defaultDraftStyle;
      const editUrl = style
        ? `${docEditPath(doc.id)}?draftStyle=${encodeURIComponent(style)}`
        : docEditPath(doc.id);

      return new Response(null, {
        status: 302,
        headers: { Location: editUrl },
      });
    })
    .get(ROUTES.docs.editPattern, ({ request, params, query }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const doc = getDoc(params.id);
      if (doc === null) {
        return new Response("Not Found", { status: 404 });
      }
      const draftStyle = typeof query.draftStyle === "string" ? query.draftStyle : undefined;
      const html = renderEditorPage(locale, doc, draftStyle);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(ROUTES.docs.savePattern, async ({ request, params }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const form = await request.formData();
      const titleValue = form.get("title");
      const bodyValue = form.get("body");
      const updated = updateDoc(params.id, {
        title: typeof titleValue === "string" ? titleValue : undefined,
        body: typeof bodyValue === "string" ? bodyValue : undefined,
      });
      if (updated === null) {
        return new Response("Not Found", { status: 404 });
      }
      const isFragmentRequest = request.headers.get("hx-request") === "true";
      const html = isFragmentRequest
        ? renderEditorPanelAfterSave(locale, updated)
        : renderEditorSavedPage(locale, updated);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(ROUTES.docs.deletePattern, ({ request, params }) =>
      renderDocsAfterDelete(request, params.id),
    )
    .post(ROUTES.docs.deletePattern, ({ request, params }) =>
      renderDocsAfterDelete(request, params.id),
    )
    .get(ROUTES.docs.printPattern, ({ request, params, query }) => {
      const locale = resolveLocale(request.headers.get("accept-language"));
      const doc = getDoc(params.id);
      if (doc === null) {
        return new Response("Not Found", { status: 404 });
      }
      const autoPrint = query.print === "1";
      const html = renderPrintPage(locale, doc, autoPrint);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(ROUTES.docs.previewPattern, ({ params }) => {
      const doc = getDoc(params.id);
      if (doc === null) {
        return new Response("Not Found", { status: 404 });
      }
      const html = renderPreviewFragment(doc.body);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    });
};

const translateDefaultTitle = (locale: ReturnType<typeof resolveLocale>): string =>
  ({
    en: "Untitled",
    "zh-Hans": "未命名文档",
    ja: "無題",
    ko: "제목 없음",
  })[locale];
