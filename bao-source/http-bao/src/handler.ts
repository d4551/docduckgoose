/**
 * @baohaus/http-bao/handler
 *
 * Response helper utilities matching Elysia's handler API.
 */

import type { Context } from "./context.ts";

type Handler = (ctx: Context) => unknown;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function text(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html" },
  });
}

function redirect(url: string, status = 302): Response {
  return new Response(null, {
    status,
    headers: { Location: url },
  });
}

export type { Handler };
export { html, json, redirect, text };
