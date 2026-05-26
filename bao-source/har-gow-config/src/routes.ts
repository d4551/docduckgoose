/**
 * API route path constants for the Elysia app (prefix-relative segments and public URLs).
 */

export const API_ROUTE: {
  docsOpenApiPath: string;
  docsOpenApiSpecPath: string;
  prefix: string;
  rel: {
    health: string;
    root: string;
  };
} = Object.freeze({
  prefix: "/api",
  rel: Object.freeze({
    health: "/health",
    root: "/",
  }),
  docsOpenApiPath: "/api/openapi",
  docsOpenApiSpecPath: "/api/openapi/json",
});

export function buildOpenApiUiUrl(host: string, port: number): string {
  return `http://${host}:${port}${API_ROUTE.docsOpenApiPath}`;
}

/**
 * Local vendor asset paths for client-side libraries.
 * These are served from node_modules via the static file server
 * instead of loading from external CDNs.
 */
export const CLIENT_ASSET_PATH = Object.freeze({
  DAISYUI_CSS: "/vendor/daisyui",
  HTMX_JS: "/vendor/htmx.min.js",
  TAILWIND_BROWSER_JS: "/vendor/tailwindcss-browser.js",
} as const);
