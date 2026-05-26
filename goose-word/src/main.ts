import { join } from "node:path";
import {
  GOOSE_WORD_CLIENT_ASSETS,
  GOOSE_WORD_UI_APP_CSS_PATH,
  GOOSE_WORD_UI_CLIENT_DIR,
  GOOSE_WORD_UI_DAISY_CSS_PATH,
  GOOSE_WORD_UI_MANIFEST_PATH,
} from "@baohaus/goose-word-ui-bao/manifest";
import { HTMX_CORE_RELATIVE_PATH } from "@baohaus/htmx-vendor-bao/manifest";
import { Elysia } from "elysia";
import { gooseWordAssetPaths } from "./config/assets.ts";
import { GOOSE_WORD_PORT } from "./config/paths.ts";
import { ROUTES } from "./config/routes.ts";
import { registerDocApiRoutes } from "./http/routes/api.docs.routes.ts";
import { registerPreferencesApiRoutes } from "./http/routes/api.preferences.routes.ts";
import { registerSpeechApiRoutes } from "./http/routes/api.speech.routes.ts";
import { registerDocRoutes } from "./http/routes/docs.routes.ts";
import { registerSettingsRoutes } from "./http/routes/settings.routes.ts";
import { renderFontFaceCss } from "./http/font-faces.ts";
import { logServerError } from "./http/server-error-logger.ts";
import { reloadPlugins } from "./install/bao-mount.service.ts";
import { dispatchPluginRoute } from "./install/plugin-route-registry.ts";
import { closeDocStore } from "./services/doc-store.ts";
import { closeUserTemplateStore } from "./services/user-templates.ts";
import { closeUserPrefsStore } from "./services/user-prefs.ts";

const app = new Elysia();

app
  .onError(({ error, request }) => {
    const message = error instanceof Error ? error.message : String(error);
    logServerError({
      url: request?.url,
      method: request?.method,
      message,
    });
    return new Response("Internal server error", { status: 500 });
  })
  .get(ROUTES.api.health, () => ({ ok: true, app: "goose-word" }))
  .get(ROUTES.static.htmx, () =>
    Bun.file(join(gooseWordAssetPaths.htmxVendorRoot, HTMX_CORE_RELATIVE_PATH)),
  )
  .get(ROUTES.static.daisy, () =>
    Bun.file(join(gooseWordAssetPaths.uiRoot, GOOSE_WORD_UI_DAISY_CSS_PATH)),
  )
  .get(ROUTES.static.appStyles, () =>
    Bun.file(join(gooseWordAssetPaths.uiRoot, GOOSE_WORD_UI_APP_CSS_PATH)),
  )
  .get(ROUTES.static.tokens, () =>
    Bun.file(join(gooseWordAssetPaths.tokensRoot, "baohaus-aurora-tokens.css")),
  )
  .get(ROUTES.static.density, () =>
    Bun.file(join(gooseWordAssetPaths.densityRoot, "baohaus-aurora-density.css")),
  )
  .get(
    ROUTES.static.fontFaces,
    () =>
      new Response(renderFontFaceCss(), {
        headers: { "content-type": "text/css; charset=utf-8" },
      }),
  )
  .get(ROUTES.static.manifest, () =>
    Bun.file(join(gooseWordAssetPaths.uiRoot, GOOSE_WORD_UI_MANIFEST_PATH)),
  )
  .get(ROUTES.static.favicon, () => new Response(null, { status: 204 }))
  .get(ROUTES.static.clientPattern, ({ params }) =>
    Bun.file(join(gooseWordAssetPaths.uiRoot, GOOSE_WORD_UI_CLIENT_DIR, params.file)),
  )
  .get(ROUTES.static.fontPattern, ({ params }) =>
    Bun.file(join(gooseWordAssetPaths.fontRoot, params.family, params.file)),
  )
  .get(ROUTES.static.mermaid, () =>
    Bun.file(join(gooseWordAssetPaths.uiRoot, "public/vendor/mermaid.min.js")),
  );

for (const asset of Object.values(GOOSE_WORD_CLIENT_ASSETS)) {
  if (asset.length === 0) {
    throw new Error("Goose Word client asset manifest contains an empty file name");
  }
}

registerDocRoutes(app);
registerDocApiRoutes(app);
registerSpeechApiRoutes(app);
registerSettingsRoutes(app);
registerPreferencesApiRoutes(app);

app.all(ROUTES.plugins.dispatchPattern, async ({ request }) => {
  const response = await dispatchPluginRoute(request);
  return response ?? new Response("Not Found", { status: 404 });
});

await reloadPlugins(app);

const shutdownStores = (): void => {
  closeDocStore();
  closeUserTemplateStore();
  closeUserPrefsStore();
};

process.on("beforeExit", shutdownStores);

app.listen(GOOSE_WORD_PORT);
