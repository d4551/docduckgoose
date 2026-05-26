import type { Validator } from "./validator.ts";

/**
 * @baohaus/http-bao/context
 *
 * Request context types and factory.
 *
 * The Context type is the request-scoped object passed to handlers,
 * middleware, and hook callbacks.
 */

interface RouteContext {
  readonly set: {
    status: number;
    headers: Record<string, string>;
    cookie?: Record<string, { readonly value: string; readonly [key: string]: unknown }>;
  };
}

type Handler<Ctx extends Context = Context> = (ctx: Ctx) => unknown;

interface LifecycleHooks {
  onRequest?: (ctx: Context) => Response | undefined;
  onParse?: (request: Request, contentType: string, ctx: Context) => unknown | Promise<unknown>;
  onTransform?: (ctx: Context) => void | Promise<void>;
  onBeforeHandle?: Handler | readonly Handler[];
  onAfterHandle?: Handler | readonly Handler[];
  onError?: (ctx: Context) => Response | undefined;
  onAfterResponse?: (ctx: Context, response: unknown) => void | Promise<void>;
  onStart?: (app: Context) => void;
  onStop?: (app: Context) => void;
}

interface GuardOptions {
  readonly body?: ValidationSchema;
  readonly params?: ValidationSchema;
  readonly query?: ValidationSchema;
  readonly headers?: ValidationSchema;
  readonly cookie?: ValidationSchema;
  readonly response?: ValidationSchema;
  readonly beforeHandle?: Handler | readonly Handler[];
  readonly afterHandle?: Handler | readonly Handler[];
  readonly error?: Handler | readonly Handler[];
}

interface ValidationSchema {
  readonly [key: string]: Validator<unknown>;
}

interface Context {
  readonly set: {
    status: number;
    headers: Record<string, string>;
    cookie?: Record<string, { readonly value: string; readonly [key: string]: unknown }>;
  };
  readonly request: Request;
  readonly path: string;
  readonly params: Record<string, string>;
  readonly query: URLSearchParams;
  readonly headers: Headers;
  readonly body: unknown;
  readonly store: Record<string, unknown>;
  readonly decorator: Record<string, unknown>;
  readonly cookie: Record<string, { readonly value: string; readonly [key: string]: unknown }>;
  readonly response?: unknown;
  readonly [key: string]: unknown;
}

interface RequestContext {
  readonly request: Request;
  readonly params: Record<string, string>;
  readonly query: URLSearchParams;
  readonly headers: Headers;
}

function createContext(request: Request, params: Record<string, string>): RequestContext {
  const url = new URL(request.url);
  return {
    request,
    params,
    query: url.searchParams,
    headers: request.headers,
  };
}

export type {
  Context,
  GuardOptions,
  Handler,
  LifecycleHooks,
  RequestContext,
  RouteContext,
  ValidationSchema,
};
export { createContext };
