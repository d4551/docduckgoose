/**
 * @baohaus/static-bao
 *
 * Bao-native static file serving plugin.
 * Domain: framework
 */

import type { Elysia } from "elysia";
import { getMimeType, resolveAssetPath } from "./http/path";
import { serveStatic } from "./http/server";
import type { StaticOptions } from "./internal/types";

function staticPlugin(options: StaticOptions): (app: Elysia) => Elysia {
  return (app: Elysia): Elysia => {
    app.onRequest(({ request }): Response | null => {
      return serveStatic(request, options);
    });
    return app;
  };
}

export const PACKAGE_NAME = "@baohaus/static-bao" as const;
export { getMimeType, resolveAssetPath, serveStatic, staticPlugin };
