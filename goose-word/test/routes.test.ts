import { describe, expect, it } from "bun:test";
import {
  docApiPath,
  docDeletePath,
  docEditPath,
  docListPath,
  docNewPath,
  docPreviewPath,
  docPrintPath,
  docSavePath,
  docTemplateCreatePath,
  docsApiPath,
  healthApiPath,
  preferencesApiPath,
  ROUTES,
  routePaths,
  settingsPath,
  settingsPluginToggle,
  settingsPluginsPath,
  userTemplateDeletePath,
  userTemplateEditPath,
} from "../src/config/routes.ts";

describe("routePaths path helpers", () => {
  it("docEdit produces /docs/<id>", () => {
    expect(routePaths.docEdit("abc-123")).toBe("/docs/abc-123");
  });

  it("docPrint produces /docs/<id>/print", () => {
    expect(routePaths.docPrint("x")).toBe("/docs/x/print");
  });

  it("docPreview produces /docs/<id>/preview", () => {
    expect(routePaths.docPreview("x")).toBe("/docs/x/preview");
  });

  it("docSave produces /docs/<id>/save", () => {
    expect(routePaths.docSave("x")).toBe("/docs/x/save");
  });

  it("docDelete produces /docs/<id>/delete", () => {
    expect(routePaths.docDelete("x")).toBe("/docs/x/delete");
  });

  it("docTemplateCreate produces /docs/<id>/templates", () => {
    expect(routePaths.docTemplateCreate("x")).toBe("/docs/x/templates");
  });

  it("user template routes produce edit and delete URLs", () => {
    expect(routePaths.userTemplateEdit("x")).toBe("/templates/x/edit");
    expect(routePaths.userTemplateDelete("x")).toBe("/templates/x/delete");
  });

  it("docApi produces /api/docs/<id>", () => {
    expect(routePaths.docApi("x")).toBe("/api/docs/x");
  });

  it("settingsEnterpriseActivate URL-encodes the id", () => {
    const path = routePaths.settingsEnterpriseActivate("foo bar");
    expect(path).toBe("/settings/enterprise/activate/foo%20bar");
  });

  it("settingsPluginToggle URL-encodes the id", () => {
    expect(routePaths.settingsPluginToggle("a b")).toBe("/settings/plugins/a%20b/toggle");
  });

  it("enterpriseSwitch URL-encodes the id", () => {
    const path = routePaths.enterpriseSwitch("a/b");
    expect(path).toBe("/fragments/enterprise-context/switch/a%2Fb");
  });

  it("staticFont produces /assets/fonts/<family>/<file>", () => {
    expect(routePaths.staticFont("inter", "inter.woff2")).toBe("/assets/fonts/inter/inter.woff2");
  });

  it("staticClientFile produces /assets/client/<file>", () => {
    expect(routePaths.staticClientFile("glass-specular.js")).toBe(
      "/assets/client/glass-specular.js",
    );
  });
});

describe("named path exports match routePaths", () => {
  it("docListPath matches routePaths.docList", () => {
    expect(docListPath).toBe(routePaths.docList);
  });

  it("docNewPath matches routePaths.docNew", () => {
    expect(docNewPath).toBe(routePaths.docNew);
  });

  it("docEditPath matches routePaths.docEdit", () => {
    expect(docEditPath("z")).toBe(routePaths.docEdit("z"));
  });

  it("docPrintPath matches routePaths.docPrint", () => {
    expect(docPrintPath("z")).toBe(routePaths.docPrint("z"));
  });

  it("docPreviewPath matches routePaths.docPreview", () => {
    expect(docPreviewPath("z")).toBe(routePaths.docPreview("z"));
  });

  it("docSavePath matches routePaths.docSave", () => {
    expect(docSavePath("z")).toBe(routePaths.docSave("z"));
  });

  it("docDeletePath matches routePaths.docDelete", () => {
    expect(docDeletePath("z")).toBe(routePaths.docDelete("z"));
  });

  it("template path exports match routePaths", () => {
    expect(docTemplateCreatePath("z")).toBe(routePaths.docTemplateCreate("z"));
    expect(userTemplateEditPath("z")).toBe(routePaths.userTemplateEdit("z"));
    expect(userTemplateDeletePath("z")).toBe(routePaths.userTemplateDelete("z"));
  });

  it("docApiPath matches routePaths.docApi", () => {
    expect(docApiPath("z")).toBe(routePaths.docApi("z"));
  });

  it("docsApiPath matches routePaths.docsApi", () => {
    expect(docsApiPath).toBe(routePaths.docsApi);
  });

  it("settingsPath matches routePaths.settings", () => {
    expect(settingsPath).toBe(routePaths.settings);
  });

  it("settingsPluginsPath matches routePaths.settingsPlugins", () => {
    expect(settingsPluginsPath).toBe(routePaths.settingsPlugins);
  });

  it("settingsPluginToggle matches routePaths.settingsPluginToggle", () => {
    expect(settingsPluginToggle("z")).toBe(routePaths.settingsPluginToggle("z"));
  });

  it("healthApiPath matches routePaths.healthApi", () => {
    expect(healthApiPath).toBe(routePaths.healthApi);
  });

  it("preferencesApiPath matches routePaths.preferencesApi", () => {
    expect(preferencesApiPath).toBe(routePaths.preferencesApi);
  });
});

describe("ROUTES object mirrors routePaths", () => {
  it("ROUTES.home equals routePaths.home", () => {
    expect(ROUTES.home).toBe(routePaths.home);
  });

  it("ROUTES.docs.list equals routePaths.docList", () => {
    expect(ROUTES.docs.list).toBe(routePaths.docList);
  });

  it("ROUTES.docs.new equals routePaths.docNew", () => {
    expect(ROUTES.docs.new).toBe(routePaths.docNew);
  });

  it("ROUTES.docs.editPattern equals routePaths.docEditPattern", () => {
    expect(ROUTES.docs.editPattern).toBe(routePaths.docEditPattern);
  });

  it("ROUTES.docs.deletePattern equals routePaths.docDeletePattern", () => {
    expect(ROUTES.docs.deletePattern).toBe(routePaths.docDeletePattern);
  });

  it("ROUTES.docs user template edit pattern equals routePaths", () => {
    expect(ROUTES.docs.userTemplateEditPattern).toBe(routePaths.userTemplateEditPattern);
  });

  it("ROUTES.settings.home equals routePaths.settings", () => {
    expect(ROUTES.settings.home).toBe(routePaths.settings);
  });

  it("ROUTES.settings.pluginTogglePattern equals routePaths", () => {
    expect(ROUTES.settings.pluginTogglePattern).toBe(routePaths.settingsPluginTogglePattern);
  });

  it("ROUTES.api.health equals routePaths.healthApi", () => {
    expect(ROUTES.api.health).toBe(routePaths.healthApi);
  });

  it("ROUTES.api.preferences equals routePaths.preferencesApi", () => {
    expect(ROUTES.api.preferences).toBe(routePaths.preferencesApi);
  });

  it("ROUTES.plugins.dispatchPattern equals routePaths.pluginDispatchPattern", () => {
    expect(ROUTES.plugins.dispatchPattern).toBe(routePaths.pluginDispatchPattern);
  });

  it("ROUTES.glassProof equals routePaths.glassProof", () => {
    expect(ROUTES.glassProof).toBe(routePaths.glassProof);
  });

  it("ROUTES.static.htmx equals routePaths.staticHtmx", () => {
    expect(ROUTES.static.htmx).toBe(routePaths.staticHtmx);
  });

  it("ROUTES.static.appStyles equals routePaths.staticAppStyles", () => {
    expect(ROUTES.static.appStyles).toBe(routePaths.staticAppStyles);
  });
});
