import type { Elysia } from "elysia";
import { docEditPath, docListPath, docNewPath, ROUTES, routePaths } from "../../config/routes.ts";
import { docsListOffset, docsListPageClamped, parseDocsListQuery } from "../docs-query.ts";
import { resolveRequestLocale, type LocaleCode } from "../../i18n/runtime.ts";
import { gooseWordContributionSurfaces } from "../../install/contribution-surfaces.ts";
import {
  countDocs,
  createDoc,
  deleteDoc,
  getDoc,
  listDocs,
  updateDoc,
} from "../../services/doc-store.ts";
import { getUserPreferences } from "../../services/user-prefs.ts";
import {
  createUserTemplate,
  deleteUserTemplate,
  getUserTemplate,
  listUserTemplates,
  updateUserTemplate,
} from "../../services/user-templates.ts";
import { selectShellOrPanel } from "../htmx-request.ts";
import { renderDocsListPage, renderDocsListPanel } from "../html/docs-list-view.ts";
import {
  renderEditorPage,
  renderEditorPanel,
  renderEditorPanelAfterSave,
  renderEditorSavedPage,
  renderPreviewFragment,
  renderSaveTemplateFormPanel,
} from "../html/editor-view.ts";
import { renderGlassProofPage } from "../html/glass-proof-view.ts";
import { renderPrintHtml, renderPrintPage } from "../html/print-view.ts";
import {
  renderTemplateEditorPage,
  renderTemplateEditorPanel,
} from "../html/template-editor-view.ts";

type RouteHost = Elysia;

const USER_TEMPLATE_PREFIX = "user:";

const loadDocsListData = (query: ReturnType<typeof parseDocsListQuery>) => {
  const templates = gooseWordContributionSurfaces.documentTemplate.snapshot();
  const userTemplates = listUserTemplates();
  const totalCount = countDocs(query.search);
  const page = docsListPageClamped(query, totalCount);
  const pagedQuery = page === query.page ? query : { ...query, page };
  const docs = listDocs(
    pagedQuery.pageSize,
    docsListOffset(pagedQuery),
    pagedQuery.search,
    pagedQuery.sort,
    pagedQuery.dir,
  );
  return { templates, userTemplates, totalCount, docs, query: pagedQuery };
};

const loadDocsPanel = (
  locale: LocaleCode,
  query: ReturnType<typeof parseDocsListQuery>,
): string => {
  const data = loadDocsListData(query);
  return renderDocsListPanel(
    locale,
    data.docs,
    data.templates,
    data.userTemplates,
    data.query,
    data.totalCount,
  );
};

const loadDocsPage = (locale: LocaleCode, query: ReturnType<typeof parseDocsListQuery>): string => {
  const data = loadDocsListData(query);
  return renderDocsListPage(
    locale,
    data.docs,
    data.templates,
    data.userTemplates,
    data.query,
    data.totalCount,
  );
};

const loadDocsResponse = (
  request: Request,
  locale: LocaleCode,
  query: ReturnType<typeof parseDocsListQuery>,
): string => selectShellOrPanel(request, loadDocsPanel(locale, query), loadDocsPage(locale, query));

const templateIdFromQuery = (value: string): { source: "plugin" | "user"; id: string } => {
  if (value.startsWith(USER_TEMPLATE_PREFIX)) {
    return { source: "user", id: value.slice(USER_TEMPLATE_PREFIX.length) };
  }
  return { source: "plugin", id: value };
};

const readNonEmptyFormValue = (form: FormData, key: string): string | undefined => {
  const value = form.get(key);
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const readDraftStyle = (form: FormData): "" | "letter" | "manuscript" | "notes" => {
  const rawDraftStyle = readNonEmptyFormValue(form, "draftStyle") ?? "";
  return rawDraftStyle === "letter" || rawDraftStyle === "manuscript" || rawDraftStyle === "notes"
    ? rawDraftStyle
    : "";
};

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
  const locale = resolveRequestLocale(request);
  const query = parseDocsListQuery({});
  const html = loadDocsPanel(locale, query);
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
    .get(docListPath, ({ request, query }) => {
      const locale = resolveRequestLocale(request);
      const listQuery = parseDocsListQuery(query);
      const html = loadDocsResponse(request, locale, listQuery);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(ROUTES.glassProof, ({ request }) => {
      const locale = resolveRequestLocale(request);
      const html = renderGlassProofPage(locale);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(docNewPath, ({ request, query }) => {
      const locale = resolveRequestLocale(request);
      const templateId = typeof query.template === "string" ? query.template : undefined;

      let title = translateDefaultTitle(locale);
      let body = "";
      let draftStyle: string | undefined;

      if (templateId) {
        const resolved = templateIdFromQuery(templateId);
        if (resolved.source === "user") {
          const userTemplate = getUserTemplate(resolved.id);
          if (userTemplate !== null) {
            title = userTemplate.title;
            body = userTemplate.body;
            draftStyle = userTemplate.draftStyle;
          }
        } else {
          const templates = gooseWordContributionSurfaces.documentTemplate.snapshot();
          const tpl = templates.find((t) => t.id === resolved.id);
          if (tpl) {
            const content = tpl.getInitialContent(locale);
            if (content.title) title = content.title;
            body = content.body;
            draftStyle = content.draftStyle;
          }
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
      const locale = resolveRequestLocale(request);
      const doc = getDoc(params.id);
      if (doc === null) {
        return new Response("Not Found", { status: 404 });
      }
      const draftStyle = typeof query.draftStyle === "string" ? query.draftStyle : undefined;
      const panel = renderEditorPanel(locale, doc, false, draftStyle);
      const page = renderEditorPage(locale, doc, draftStyle);
      const html = selectShellOrPanel(request, panel, page);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(ROUTES.docs.templateCreatePattern, async ({ request, params }) => {
      const doc = getDoc(params.id);
      if (doc === null) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = resolveRequestLocale(request);
      const form = await request.formData();
      const templateStep = readNonEmptyFormValue(form, "templateStep");
      const draftStyle = readDraftStyle(form);
      if (templateStep === "cancel") {
        const html = renderEditorPanelAfterSave(locale, doc);
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }
      const templateTitle = readNonEmptyFormValue(form, "templateTitle");
      if (templateTitle === undefined) {
        const html = renderSaveTemplateFormPanel(
          locale,
          doc,
          draftStyle,
          readNonEmptyFormValue(form, "title") ?? doc.title,
          readNonEmptyFormValue(form, "body") ?? doc.body,
        );
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }
      const description = readNonEmptyFormValue(form, "templateDescription") ?? "";
      const body = readNonEmptyFormValue(form, "body") ?? doc.body;
      createUserTemplate({
        title: templateTitle,
        description,
        body,
        draftStyle,
      });
      const html = renderEditorPanelAfterSave(locale, doc, translateTemplateSaved(locale));
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .get(ROUTES.docs.userTemplateEditPattern, ({ request, params }) => {
      const template = getUserTemplate(params.id);
      if (template === null) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = resolveRequestLocale(request);
      const panel = renderTemplateEditorPanel(locale, template);
      const page = renderTemplateEditorPage(locale, template);
      const html = selectShellOrPanel(request, panel, page);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(ROUTES.docs.userTemplateEditPattern, async ({ request, params }) => {
      const existing = getUserTemplate(params.id);
      if (existing === null) {
        return new Response("Not Found", { status: 404 });
      }
      const form = await request.formData();
      const updated = updateUserTemplate(params.id, {
        title: readNonEmptyFormValue(form, "templateTitle") ?? existing.title,
        description: readNonEmptyFormValue(form, "templateDescription") ?? "",
        body: readNonEmptyFormValue(form, "body") ?? existing.body,
        draftStyle: readDraftStyle(form),
      });
      if (updated === null) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = resolveRequestLocale(request);
      const html = renderTemplateEditorPanel(locale, updated, true);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(ROUTES.docs.userTemplateDeletePattern, ({ request, params }) => {
      deleteUserTemplate(params.id);
      const locale = resolveRequestLocale(request);
      const query = parseDocsListQuery({});
      const html = loadDocsResponse(request, locale, query);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(ROUTES.docs.savePattern, async ({ request, params }) => {
      const locale = resolveRequestLocale(request);
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
      const locale = resolveRequestLocale(request);
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
    .post(ROUTES.docs.printPattern, async ({ request, query }) => {
      const locale = resolveRequestLocale(request);
      const form = await request.formData();
      const title = form.get("title");
      const body = form.get("body");
      const autoPrint = query.print === "1";
      const html = renderPrintHtml(
        locale,
        typeof title === "string" ? title : "",
        typeof body === "string" ? body : "",
        autoPrint,
      );
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    })
    .post(ROUTES.docs.previewPattern, async ({ request }) => {
      const form = await request.formData();
      const body = form.get("body");
      const html = renderPreviewFragment(typeof body === "string" ? body : "");
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

const translateDefaultTitle = (locale: LocaleCode): string =>
  ({
    en: "Untitled",
    "zh-Hans": "未命名文档",
    ja: "無題",
    ko: "제목 없음",
  })[locale];

const translateTemplateSaved = (locale: LocaleCode): string =>
  ({
    en: "Template saved",
    "zh-Hans": "模板已保存",
    ja: "テンプレートを保存しました",
    ko: "템플릿이 저장되었습니다",
  })[locale];
