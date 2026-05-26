/**
 * @baohaus/http-bao/app
 *
 * Application builder and route registry.
 */

import type { GuardOptions } from "./context.ts";
import { createContext } from "./context.ts";
import type { Validator } from "./validator.ts";
import { object } from "./validator.ts";
import type { WebSocketLike, WsHandler } from "./websocket.ts";
import { ws } from "./websocket.ts";

type HTTPMethod = string;

type Middleware<Context = AppContext> = (
  context: Context,
  next: () => Promise<unknown>,
) => Promise<unknown>;

type Handler<Context = AppContext> = (context: Context) => unknown | Promise<unknown>;

type AsyncOutcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: unknown };

interface AppContext {
  request: Request;
  params: Record<string, string>;
  query: URLSearchParams;
  headers: Headers;
  path: string;
  method: string;
  body: unknown;
  set: ResponseState;
  store: Record<string, unknown>;
  decorator: Record<string, unknown>;
  cookie: Record<string, { readonly value: string }>;
  response: unknown;
  [key: string]: unknown;
}

interface ResponseState {
  status: number;
  headers: Record<string, string>;
}

interface SchemaBag {
  readonly body?: ValidationTarget;
  readonly params?: ValidationTarget;
  readonly query?: ValidationTarget;
  readonly headers?: ValidationTarget;
  readonly cookie?: ValidationTarget;
  readonly response?: ValidationTarget;
}

type ValidationTarget = Validator<unknown> | Record<string, Validator<unknown>>;

interface RouteOptions extends GuardOptions {}

interface RouteDef<Context = AppContext> {
  readonly method: HTTPMethod;
  readonly path: string;
  readonly handler: Handler<Context>;
  readonly middlewares: {
    readonly before: readonly Middleware<Context>[];
    readonly after: readonly Handler<Context>[];
  };
  readonly schema: SchemaBag;
  readonly errorHandlers: readonly Handler<Context>[];
}

interface ValidateResult {
  readonly hasError: boolean;
  readonly messages: readonly string[];
}

interface ParseResult {
  readonly body: unknown;
  readonly parseError: boolean;
  readonly earlyResponse: Response | undefined;
}

function copyArrayBufferView(view: ArrayBufferView): Uint8Array<ArrayBuffer> {
  const source = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  const copy: Uint8Array<ArrayBuffer> = new Uint8Array(source.byteLength);
  copy.set(source);
  return copy;
}

function toBinaryPayload(
  value: ArrayBuffer | ArrayBufferView,
): ArrayBuffer | Uint8Array<ArrayBuffer> {
  return ArrayBuffer.isView(value) ? copyArrayBufferView(value) : value;
}

interface BaoAppConfig {
  readonly port?: number;
  readonly hostname?: string;
}

interface ListenResult {
  readonly port: number;
  readonly hostname: string;
  readonly stop: () => void | Promise<void>;
}

interface WebSocketData {
  readonly path: string;
  readonly params: Record<string, string>;
}

interface FetchArgs {
  request: Request;
  server: {
    upgrade: (request: Request, options: { readonly data: WebSocketData }) => boolean;
  };
}

const JSON_CONTENT_TYPES = ["application/json", "application/ld+json", "text/json", "+json"];

class BaoApp {
  private readonly routes: RouteDef<AppContext>[] = [];
  private readonly globalMiddlewares: Middleware<AppContext>[] = [];
  private readonly wsRoutes: WsHandler[] = [];

  private readonly store: Record<string, unknown> = {};
  private readonly decoration: Record<string, unknown> = {};

  private readonly onRequestHooks: Array<
    (context: AppContext) => Response | undefined | Promise<Response | undefined>
  > = [];
  private readonly onParseHooks: Array<
    (request: Request, contentType: string, context: AppContext) => unknown | Promise<unknown>
  > = [];
  private readonly onTransformHooks: Array<(context: AppContext) => void | Promise<void>> = [];
  private readonly beforeHandleHooks: Middleware<AppContext>[] = [];
  private readonly afterHandleHooks: Handler<AppContext>[] = [];
  private readonly onErrorHooks: Array<
    (context: AppContext) => Response | undefined | Promise<Response | undefined>
  > = [];
  private readonly onAfterResponseHooks: Array<
    (context: AppContext, response: unknown) => void | Promise<void>
  > = [];
  private readonly onStartHooks: Array<(app: BaoApp) => void | Promise<void>> = [];
  private readonly onStopHooks: Array<(app: BaoApp) => void | Promise<void>> = [];
  private readonly deriveHooks: Array<
    (
      context: AppContext,
    ) => Record<string, unknown> | undefined | Promise<Record<string, unknown> | undefined>
  > = [];
  private readonly resolveHooks: Array<
    (
      context: AppContext,
    ) => Record<string, unknown> | undefined | Promise<Record<string, unknown> | undefined>
  > = [];

  get(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("GET", path, handler, options);
    return this;
  }

  post(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("POST", path, handler, options);
    return this;
  }

  put(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("PUT", path, handler, options);
    return this;
  }

  delete(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("DELETE", path, handler, options);
    return this;
  }

  patch(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("PATCH", path, handler, options);
    return this;
  }

  head(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("HEAD", path, handler, options);
    return this;
  }

  options(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("OPTIONS", path, handler, options);
    return this;
  }

  trace(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("TRACE", path, handler, options);
    return this;
  }

  connect(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    this.addRoute("CONNECT", path, handler, options);
    return this;
  }

  all(path: string, handler: Handler<AppContext>, options: RouteOptions = {}): this {
    return this.method("GET", path, handler, options)
      .method("POST", path, handler, options)
      .method("PUT", path, handler, options)
      .method("DELETE", path, handler, options)
      .method("PATCH", path, handler, options)
      .method("HEAD", path, handler, options)
      .method("OPTIONS", path, handler, options)
      .method("TRACE", path, handler, options)
      .method("CONNECT", path, handler, options);
  }

  method(
    method: HTTPMethod,
    path: string,
    handler: Handler<AppContext>,
    options: RouteOptions = {},
  ): this {
    this.addRoute(method, path, handler, options);
    return this;
  }

  route(
    method: HTTPMethod,
    path: string,
    handler: Handler<AppContext>,
    options: RouteOptions = {},
  ): this {
    this.addRoute(method, path, handler, options);
    return this;
  }

  use(input: Middleware<AppContext> | BaoApp): this {
    if (input instanceof BaoApp) {
      return this.usePlugin(input);
    }
    this.globalMiddlewares.push(input);
    return this;
  }

  usePlugin(plugin: BaoApp | ((app: BaoApp) => unknown)): this {
    if (typeof plugin === "function") {
      plugin(this);
      return this;
    }

    for (const [key, value] of Object.entries(plugin.store)) {
      this.store[key] = value;
    }
    for (const [key, value] of Object.entries(plugin.decoration)) {
      this.decoration[key] = value;
    }

    this.routes.push(...plugin.routes);
    this.wsRoutes.push(...plugin.wsRoutes);
    this.globalMiddlewares.push(...plugin.globalMiddlewares);
    this.onRequestHooks.push(...plugin.onRequestHooks);
    this.onParseHooks.push(...plugin.onParseHooks);
    this.onTransformHooks.push(...plugin.onTransformHooks);
    this.beforeHandleHooks.push(...plugin.beforeHandleHooks);
    this.afterHandleHooks.push(...plugin.afterHandleHooks);
    this.onErrorHooks.push(...plugin.onErrorHooks);
    this.onAfterResponseHooks.push(...plugin.onAfterResponseHooks);
    this.onStartHooks.push(...plugin.onStartHooks);
    this.onStopHooks.push(...plugin.onStopHooks);
    this.deriveHooks.push(...plugin.deriveHooks);
    this.resolveHooks.push(...plugin.resolveHooks);

    return this;
  }

  ws(path: string, handler: WsHandler["handler"]): this {
    this.wsRoutes.push(ws(path, handler));
    return this;
  }

  group(
    prefix: string,
    optionsOrBuilder: GuardOptions | ((app: BaoApp) => unknown),
    builder?: (app: BaoApp) => unknown,
  ): this {
    const guard = typeof optionsOrBuilder === "object" ? optionsOrBuilder : undefined;
    const appBuilder = typeof optionsOrBuilder === "function" ? optionsOrBuilder : builder;

    if (appBuilder === undefined) {
      return this;
    }

    const child = this.createScopedChild();
    appBuilder(child);

    this.mergeChildRoutes(child, prefix, guard);
    this.mergeChildWsRoutes(child, prefix);

    return this;
  }

  guard(options: GuardOptions, appBuilder: (app: BaoApp) => unknown): this {
    const child = this.createScopedChild();
    appBuilder(child);

    this.mergeChildRoutes(child, undefined, options);
    return this;
  }

  state(key: string, value: unknown): this;
  state(entries: Record<string, unknown>): this;
  state(keyOrEntries: string | Record<string, unknown>, value?: unknown): this {
    const entries: Record<string, unknown> = {};
    if (typeof keyOrEntries === "string") {
      if (keyOrEntries !== "") {
        entries[keyOrEntries] = value;
      }
    } else {
      for (const [key, nextValue] of Object.entries(keyOrEntries)) {
        entries[key] = nextValue;
      }
    }

    for (const [key, nextValue] of Object.entries(entries)) {
      this.store[key] = nextValue;
    }

    return this;
  }

  decorate(key: string, value: unknown): this;
  decorate(entries: Record<string, unknown>): this;
  decorate(keyOrEntries: string | Record<string, unknown>, value?: unknown): this {
    const entries: Record<string, unknown> = {};
    if (typeof keyOrEntries === "string") {
      if (keyOrEntries !== "") {
        entries[keyOrEntries] = value;
      }
    } else {
      for (const [key, nextValue] of Object.entries(keyOrEntries)) {
        entries[key] = nextValue;
      }
    }

    for (const [key, nextValue] of Object.entries(entries)) {
      this.decoration[key] = nextValue;
    }

    return this;
  }

  derive(
    fn: (
      context: AppContext,
    ) => Record<string, unknown> | undefined | Promise<Record<string, unknown> | undefined>,
  ): this {
    this.deriveHooks.push(fn);
    return this;
  }

  resolve(
    fn: (
      context: AppContext,
    ) => Record<string, unknown> | undefined | Promise<Record<string, unknown> | undefined>,
  ): this {
    this.resolveHooks.push(fn);
    return this;
  }

  onRequest(handler: (context: AppContext) => Response | undefined): this {
    this.onRequestHooks.push(handler);
    return this;
  }

  onParse(
    handler: (
      request: Request,
      contentType: string,
      context: AppContext,
    ) => unknown | Promise<unknown>,
  ): this {
    this.onParseHooks.push(handler);
    return this;
  }

  onTransform(handler: (context: AppContext) => void | Promise<void>): this {
    this.onTransformHooks.push(handler);
    return this;
  }

  onBeforeHandle(handler: Handler | readonly Handler[]): this {
    for (const before of this.toHandlerArray(handler)) {
      this.beforeHandleHooks.push(this.toBeforeMiddleware(before));
    }
    return this;
  }

  onAfterHandle(handler: Handler | readonly Handler[]): this {
    for (const after of this.toHandlerArray(handler)) {
      this.afterHandleHooks.push(after);
    }
    return this;
  }

  onError(handler: (context: AppContext) => Response | undefined): this {
    this.onErrorHooks.push(handler);
    return this;
  }

  onAfterResponse(handler: (context: AppContext, response: unknown) => void | Promise<void>): this {
    this.onAfterResponseHooks.push(handler);
    return this;
  }

  onStart(handler: (app: BaoApp) => void | Promise<void>): this {
    this.onStartHooks.push(handler);
    return this;
  }

  onStop(handler: (app: BaoApp) => void | Promise<void>): this {
    this.onStopHooks.push(handler);
    return this;
  }

  getRoutes(): readonly RouteDef<AppContext>[] {
    return [...this.routes];
  }

  getMiddlewares(): readonly Middleware<AppContext>[] {
    return [...this.globalMiddlewares];
  }

  getWsRoutes(): readonly WsHandler[] {
    return [...this.wsRoutes];
  }

  async listen(
    portOrConfig: number | BaoAppConfig = {},
    callback?: (hostname: string, port: number) => void,
  ): Promise<ListenResult> {
    const config: BaoAppConfig =
      typeof portOrConfig === "number" ? { port: portOrConfig } : portOrConfig;
    const port = config.port ?? 3000;
    const hostname = config.hostname ?? "0.0.0.0";

    const server = Bun.serve<WebSocketData>({
      port,
      hostname,
      websocket: {
        open: (socket) => {
          const ws = this.toWebSocketLike(socket);
          const routeData = socket.data;
          if (routeData.path === "") {
            return;
          }
          const route = this.matchWsRoute(routeData.path);
          const openHandler = route?.route.handler.open;
          if (openHandler === undefined) {
            return;
          }
          openHandler(ws);
        },
        message: (socket, message) => {
          const ws = this.toWebSocketLike(socket);
          const routeData = socket.data;
          if (routeData.path === "") {
            return;
          }
          const route = this.matchWsRoute(routeData.path);
          const messageHandler = route?.route.handler.message;
          if (messageHandler === undefined) {
            return;
          }
          const normalizedMessage = typeof message === "string" ? message : message.toString();
          messageHandler(ws, normalizedMessage);
        },
        close: (socket, code, reason) => {
          const routeData = socket.data;
          if (routeData.path === "") {
            return;
          }
          const route = this.matchWsRoute(routeData.path);
          const closeHandler = route?.route.handler.close;
          if (closeHandler === undefined) {
            return;
          }
          closeHandler(this.toWebSocketLike(socket), code, reason);
        },
        drain: (socket) => {
          const ws = this.toWebSocketLike(socket);
          const routeData = socket.data;
          if (routeData.path === "") {
            return;
          }
          const route = this.matchWsRoute(routeData.path);
          const drainHandler = route?.route.handler.drain;
          if (drainHandler === undefined) {
            return;
          }
          drainHandler(ws);
        },
      },
      fetch: (request, server) =>
        this.handleFetch({ request, server: { upgrade: server.upgrade.bind(server) } }),
    });

    let stopped = false;
    const startOutcome = await this.runAsync(async () => {
      for (const hook of this.onStartHooks) {
        await Promise.resolve(hook(this));
      }
      return undefined;
    });
    if (startOutcome.ok !== true) {
      server.stop();
      throw startOutcome.error;
    }

    const stop = async () => {
      if (stopped) {
        return;
      }
      stopped = true;

      const stopOutcome = await this.runAsync(async () => {
        for (const hook of this.onStopHooks) {
          await Promise.resolve(hook(this));
        }
        return undefined;
      });
      if (stopOutcome.ok !== true) {
        server.stop();
        throw stopOutcome.error;
      }
      server.stop();
    };

    const listenPort = server.port ?? port;
    if (callback !== undefined) {
      callback(hostname, listenPort);
    }
    return Promise.resolve({
      port: listenPort,
      hostname,
      stop,
    });
  }

  private handleFetch(args: FetchArgs): Promise<Response> {
    const url = new URL(args.request.url);
    const method = args.request.method;
    const path = normalizePath(url.pathname);

    const webSocketResponse =
      method === "GET"
        ? this.handleWebSocketUpgrade({
            request: args.request,
            path,
            server: args.server,
          })
        : undefined;

    if (webSocketResponse !== undefined) {
      return Promise.resolve(webSocketResponse);
    }

    const matchedRoute = this.findRoute(method, path);
    if (matchedRoute === undefined) {
      return Promise.resolve(new Response("Not Found", { status: 404 }));
    }

    return this.handleRoute({
      request: args.request,
      method,
      path,
      route: matchedRoute,
    });
  }

  private handleWebSocketUpgrade(args: {
    request: Request;
    path: string;
    server: FetchArgs["server"];
  }): Response | undefined {
    if (args.request.headers.get("upgrade") !== "websocket") {
      return undefined;
    }

    const match = this.findWebSocketMatch(args.path);
    if (match === undefined) {
      return new Response("Not Found", { status: 404 });
    }

    const upgraded = args.server.upgrade(args.request, {
      data: {
        path: match.route.path,
        params: match.params,
      },
    } as { data: WebSocketData });

    if (upgraded === false) {
      return new Response("WebSocket Upgrade Failed", { status: 500 });
    }

    return undefined;
  }

  private async handleRoute(args: {
    request: Request;
    method: HTTPMethod;
    path: string;
    route: RouteDef<AppContext>;
  }): Promise<Response> {
    const context = this.buildContext({
      request: args.request,
      method: args.method,
      path: args.path,
      params: this.matchPath(args.path, args.route.path).params,
      store: { ...this.store },
      decorator: { ...this.decoration },
      response: undefined,
    });

    const onRequestOutcome = await this.runAsync(() => this.runRequestPhase(context));
    if (onRequestOutcome.ok !== true) {
      return this.handleError(context, args.route, onRequestOutcome.error);
    }
    if (onRequestOutcome.value !== undefined) {
      return this.toResponse(onRequestOutcome.value, context.set);
    }

    const parseResult = await this.runAsync(() =>
      this.parseBody({
        request: args.request,
        method: args.method,
        context,
      }),
    );
    if (parseResult.ok !== true) {
      return this.handleError(context, args.route, parseResult.error);
    }

    if (parseResult.value.earlyResponse !== undefined) {
      return parseResult.value.earlyResponse;
    }
    context.body = parseResult.value.body;

    const validation = this.validateRoute({
      context,
      route: args.route,
      parseError: parseResult.value.parseError,
    });
    if (validation.hasError) {
      context.set.status = 400;
      return this.toResponse(
        {
          error: "Bad Request",
          details: validation.messages,
        },
        context.set,
      );
    }

    const transformOutcome = await this.runAsync(() => this.runTransformHooks(context));
    if (transformOutcome.ok !== true) {
      return this.handleError(context, args.route, transformOutcome.error);
    }

    const deriveOutcome = await this.runAsync(() => this.runDeriveHooks(context));
    if (deriveOutcome.ok !== true) {
      return this.handleError(context, args.route, deriveOutcome.error);
    }

    const resolveOutcome = await this.runAsync(() => this.runResolveHooks(context));
    if (resolveOutcome.ok !== true) {
      return this.handleError(context, args.route, resolveOutcome.error);
    }

    const beforeOutcome = await this.runAsync(() =>
      this.runMiddlewareChain(context, this.globalMiddlewares, () =>
        this.runMiddlewareChain(context, this.beforeHandleHooks, () =>
          this.runMiddlewareChain(context, args.route.middlewares.before, () =>
            args.route.handler(context),
          ),
        ),
      ),
    );
    if (beforeOutcome.ok !== true) {
      return this.handleError(context, args.route, beforeOutcome.error);
    }

    const afterOutcome = await this.runAsync(() =>
      this.runAfterHandlers(
        context,
        beforeOutcome.value,
        args.route.middlewares.after,
        this.afterHandleHooks,
      ),
    );
    if (afterOutcome.ok !== true) {
      return this.handleError(context, args.route, afterOutcome.error);
    }

    const afterResponseOutcome = await this.runAsync(() =>
      this.runAfterResponseHooks(context, afterOutcome.value),
    );
    if (afterResponseOutcome.ok !== true) {
      return this.handleError(context, args.route, afterResponseOutcome.error);
    }

    return this.toResponse(afterOutcome.value, context.set);
  }

  private addRoute(
    method: HTTPMethod,
    path: string,
    handler: Handler<AppContext>,
    options: RouteOptions,
  ): void {
    this.routes.push({
      method,
      path: normalizePath(path),
      handler,
      schema: this.extractSchema(options),
      middlewares: {
        before: this.toMiddlewareArray(this.toHandlerArray(options.beforeHandle)),
        after: this.toHandlerArray(options.afterHandle),
      },
      errorHandlers: this.toHandlerArray(options.error),
    });
  }

  private buildContext(args: {
    request: Request;
    path: string;
    method: string;
    params: Record<string, string>;
    store: Record<string, unknown>;
    decorator: Record<string, unknown>;
    response: unknown;
  }): AppContext {
    const base = createContext(args.request, args.params);

    return {
      request: base.request,
      params: base.params,
      query: base.query,
      headers: base.headers,
      path: args.path,
      method: args.method,
      body: undefined,
      set: {
        status: 200,
        headers: {},
      },
      store: args.store,
      decorator: args.decorator,
      cookie: {},
      response: args.response,
    };
  }

  private parseBody(args: {
    request: Request;
    method: string;
    context: AppContext;
  }): Promise<ParseResult> {
    if (args.method === "GET" || args.method === "HEAD") {
      return Promise.resolve({ body: undefined, parseError: false, earlyResponse: undefined });
    }

    const contentType = args.request.headers.get("content-type") ?? "";
    const normalizedContentType = contentType.toLowerCase();
    return this.parseHooksAndThenDefault(args.request, contentType, args.context).then((result) => {
      if (result.body !== undefined || result.earlyResponse !== undefined) {
        return result;
      }
      if (this.isJsonContent(normalizedContentType) === true) {
        return args.request.json().then(
          (body) => ({ body, parseError: false, earlyResponse: undefined }),
          () => ({ body: undefined, parseError: true, earlyResponse: undefined }),
        );
      }

      if (normalizedContentType.includes("text/plain")) {
        return args.request.text().then(
          (body) => ({ body, parseError: false, earlyResponse: undefined }),
          () => ({ body: undefined, parseError: false, earlyResponse: undefined }),
        );
      }

      if (normalizedContentType.includes("application/x-www-form-urlencoded")) {
        return args.request.text().then(
          (bodyText) => ({
            body: Object.fromEntries(new URLSearchParams(bodyText)),
            parseError: false,
            earlyResponse: undefined,
          }),
          () => ({ body: undefined, parseError: false, earlyResponse: undefined }),
        );
      }

      if (normalizedContentType.includes("multipart/form-data")) {
        return args.request.formData().then(
          (formData) => ({ body: formData, parseError: false, earlyResponse: undefined }),
          () => ({ body: undefined, parseError: false, earlyResponse: undefined }),
        );
      }

      return args.request.text().then(
        (body) => ({ body, parseError: false, earlyResponse: undefined }),
        () => ({ body: undefined, parseError: false, earlyResponse: undefined }),
      );
    });
  }

  private parseHooksAndThenDefault(
    request: Request,
    contentType: string,
    context: AppContext,
  ): Promise<ParseResult> {
    if (this.onParseHooks.length === 0) {
      return Promise.resolve({ body: undefined, parseError: false, earlyResponse: undefined });
    }

    return Promise.resolve().then(async () => {
      for (const hook of this.onParseHooks) {
        const hookResult = await Promise.resolve(hook(request, contentType, context));
        if (hookResult instanceof Response) {
          return { body: undefined, parseError: false, earlyResponse: hookResult };
        }
        if (hookResult !== undefined) {
          return { body: hookResult, parseError: false, earlyResponse: undefined };
        }
      }

      return { body: undefined, parseError: false, earlyResponse: undefined };
    });
  }

  private runRequestPhase(context: AppContext): Promise<Response | undefined> {
    return Promise.resolve().then(async () => {
      for (const handler of this.onRequestHooks) {
        const hookResult = await Promise.resolve(handler(context));
        if (hookResult !== undefined) {
          return hookResult;
        }
      }
      return undefined;
    });
  }

  private runTransformHooks(context: AppContext): Promise<void> {
    return Promise.resolve().then(async () => {
      for (const hook of this.onTransformHooks) {
        await Promise.resolve(hook(context));
      }
    });
  }

  private async runDeriveHooks(context: AppContext): Promise<void> {
    for (const derive of this.deriveHooks) {
      const deriveValues = await Promise.resolve(derive(context));
      if (deriveValues !== undefined) {
        Object.assign(context, deriveValues);
      }
    }
  }

  private async runResolveHooks(context: AppContext): Promise<void> {
    for (const resolve of this.resolveHooks) {
      const resolveValues = await Promise.resolve(resolve(context));
      if (resolveValues !== undefined) {
        Object.assign(context, resolveValues);
      }
    }
  }

  private async runAfterHandlers(
    context: AppContext,
    result: unknown,
    routeAfter: readonly Handler<AppContext>[],
    appAfter: readonly Handler<AppContext>[],
  ): Promise<unknown> {
    let responseValue = result;

    for (const handler of routeAfter) {
      context.response = responseValue;
      const afterResult = await Promise.resolve(handler(context));
      if (afterResult !== undefined) {
        responseValue = afterResult;
      }
    }

    for (const handler of appAfter) {
      context.response = responseValue;
      const afterResult = await Promise.resolve(handler(context));
      if (afterResult !== undefined) {
        responseValue = afterResult;
      }
    }

    return responseValue;
  }

  private async runAfterResponseHooks(context: AppContext, response: unknown): Promise<void> {
    for (const handler of this.onAfterResponseHooks) {
      await Promise.resolve(handler(context, response));
    }
  }

  private handleError(
    context: AppContext,
    route: RouteDef<AppContext>,
    error: unknown,
  ): Promise<Response> {
    return Promise.resolve().then(async () => {
      context.response = error;
      context.set.status = 500;

      for (const handler of route.errorHandlers) {
        const handlerResult = await Promise.resolve(handler(context));
        if (handlerResult !== undefined) {
          return this.toResponse(handlerResult, context.set);
        }
      }

      for (const handler of this.onErrorHooks) {
        const hookResult = await Promise.resolve(handler(context));
        if (hookResult !== undefined) {
          return this.toResponse(hookResult, context.set);
        }
      }

      const message = error instanceof Error ? error.message : String(error);
      return new Response(message, {
        status: context.set.status,
        headers: context.set.headers,
      });
    });
  }

  private validateRoute(args: {
    context: AppContext;
    route: RouteDef<AppContext>;
    parseError: boolean;
  }): ValidateResult {
    const messages: string[] = [];
    if (args.parseError) {
      messages.push("Invalid JSON body");
    }

    messages.push(
      ...this.validateAgainstSchema(args.route.schema.body, args.context.body, "Invalid body"),
    );
    messages.push(
      ...this.validateAgainstSchema(
        args.route.schema.params,
        args.context.params,
        "Invalid params",
      ),
    );
    messages.push(
      ...this.validateAgainstSchema(
        args.route.schema.query,
        collectValuesFromPairs(args.context.query.entries()),
        "Invalid query",
      ),
    );
    messages.push(
      ...this.validateAgainstSchema(
        args.route.schema.headers,
        collectValuesFromPairs(args.context.headers.entries()),
        "Invalid headers",
      ),
    );

    return {
      hasError: messages.length > 0,
      messages,
    };
  }

  private validateAgainstSchema(
    schema: ValidationTarget | undefined,
    value: unknown,
    fallback: string,
  ): readonly string[] {
    if (schema === undefined) {
      return [];
    }

    const result = typeof schema === "function" ? schema(value) : object(schema)(value);
    if (result.success) {
      return [];
    }

    return result.errors ?? [fallback];
  }

  private mergeChildRoutes(
    child: BaoApp,
    prefix: string | undefined,
    guard: GuardOptions | undefined,
  ): void {
    for (const route of child.routes) {
      const merged = this.mergeRouteWithGuard(route, guard);
      const mergedPath = prefix === undefined ? route.path : this.joinPaths(prefix, route.path);

      this.routes.push({
        ...merged,
        path: mergedPath,
      });
    }
  }

  private mergeChildWsRoutes(child: BaoApp, prefix: string | undefined): void {
    for (const route of child.wsRoutes) {
      this.wsRoutes.push({
        ...route,
        path: prefix === undefined ? route.path : this.joinPaths(prefix, route.path),
      });
    }
  }

  private mergeRouteWithGuard(
    route: RouteDef<AppContext>,
    guard: GuardOptions | undefined,
  ): RouteDef<AppContext> {
    if (guard === undefined) {
      return route;
    }

    const guardSchema = this.extractSchema(guard);
    const mergedSchema = this.mergeSchemaBags(guardSchema, route.schema);
    const guardBefore = this.toMiddlewareArray(this.toHandlerArray(guard.beforeHandle));
    const guardAfter = this.toHandlerArray(guard.afterHandle);
    const guardErrors = this.toHandlerArray(guard.error);

    return {
      ...route,
      schema: mergedSchema,
      middlewares: {
        before: [...guardBefore, ...route.middlewares.before],
        after: [...route.middlewares.after, ...guardAfter],
      },
      errorHandlers: [...guardErrors, ...route.errorHandlers],
    };
  }

  private mergeSchemaBags(base: SchemaBag, override: SchemaBag): SchemaBag {
    return {
      body: override.body ?? base.body,
      params: override.params ?? base.params,
      query: override.query ?? base.query,
      headers: override.headers ?? base.headers,
      cookie: override.cookie ?? base.cookie,
      response: override.response ?? base.response,
    };
  }

  private extractSchema(options: RouteOptions): SchemaBag {
    return {
      body: options.body,
      params: options.params,
      query: options.query,
      headers: options.headers,
      cookie: options.cookie,
      response: options.response,
    };
  }

  private toMiddlewareArray(handlers: readonly Handler<AppContext>[]): Middleware<AppContext>[] {
    return handlers.map((handler) => this.toBeforeMiddleware(handler));
  }

  private toBeforeMiddleware(handler: Handler<AppContext>): Middleware<AppContext> {
    return async (context, next) => {
      const hookResult = await Promise.resolve(handler(context));
      if (hookResult === undefined) {
        return next();
      }
      return hookResult;
    };
  }

  private toHandlerArray(handlers: Handler | readonly Handler[] | undefined): readonly Handler[] {
    if (handlers === undefined) {
      return [];
    }
    if (typeof handlers === "function") {
      return [handlers];
    }
    if (Array.isArray(handlers)) {
      return handlers;
    }
    return [];
  }

  private runAsync<T>(fn: () => Promise<T> | T): Promise<AsyncOutcome<T>> {
    return Promise.resolve()
      .then(fn)
      .then(
        (value): AsyncOutcome<T> => ({ ok: true, value }),
        (error): AsyncOutcome<T> => ({ ok: false, error }),
      );
  }

  private runMiddlewareChain(
    context: AppContext,
    middlewares: readonly Middleware<AppContext>[],
    leaf: () => unknown | Promise<unknown>,
  ): Promise<unknown> {
    let index = -1;

    const runner = (current: number): Promise<unknown> => {
      if (current >= middlewares.length) {
        return Promise.resolve(leaf());
      }
      if (current <= index) {
        return Promise.reject(new Error("Middleware called next multiple times"));
      }
      index = current;
      const middleware = middlewares[current];
      let nextInvoked = false;
      let nextValue: unknown;
      const next = () => {
        nextInvoked = true;
        return runner(current + 1).then((value) => {
          nextValue = value;
          return value;
        });
      };

      return Promise.resolve(middleware(context, next)).then((middlewareValue) => {
        if (middlewareValue === undefined && nextInvoked) {
          return nextValue;
        }
        return middlewareValue;
      });
    };

    return runner(0);
  }

  private findRoute(method: HTTPMethod, path: string): RouteDef<AppContext> | undefined {
    const route = this.routes.find(
      (entry) => entry.method === method && this.matchPath(path, entry.path).matched,
    );

    return route;
  }

  private findWebSocketMatch(
    path: string,
  ): { route: WsHandler; params: Record<string, string> } | undefined {
    for (const route of this.wsRoutes) {
      const match = this.matchPath(path, route.path);
      if (match.matched) {
        return {
          route,
          params: match.params,
        };
      }
    }

    return undefined;
  }

  private matchWsRoute(
    path: string,
  ): { route: WsHandler; params: Record<string, string> } | undefined {
    const match = this.findWebSocketMatch(path);
    return match;
  }

  private matchPath(
    requestPath: string,
    routePath: string,
  ): {
    readonly matched: boolean;
    readonly params: Record<string, string>;
  } {
    const requestSegments = normalizePath(requestPath).split("/").filter(Boolean);
    const routeSegments = normalizePath(routePath).split("/").filter(Boolean);

    if (requestSegments.length !== routeSegments.length) {
      return { matched: false, params: {} };
    }

    const params: Record<string, string> = {};
    for (const [i, segment] of routeSegments.entries()) {
      const requestSegment = requestSegments[i];
      if (segment.startsWith(":")) {
        const key = segment.slice(1);
        if (requestSegment === undefined) {
          return { matched: false, params: {} };
        }
        params[key] = requestSegment;
        continue;
      }
      if (segment === "*" && requestSegments[i] !== undefined) {
        params["*"] = requestSegment;
        continue;
      }
      if (segment !== requestSegment) {
        return { matched: false, params: {} };
      }
    }

    return { matched: true, params };
  }

  private createScopedChild(): BaoApp {
    const child = new BaoApp();

    Object.assign(child.store, this.store);
    Object.assign(child.decoration, this.decoration);

    return child;
  }

  private toWebSocketLike(socket: Bun.ServerWebSocket<WebSocketData>): WebSocketLike {
    const toPayload = (value: string | ArrayBuffer | ArrayBufferView | null) => {
      if (value === null) {
        return "";
      }
      if (ArrayBuffer.isView(value)) {
        return copyArrayBufferView(value);
      }
      return value;
    };

    const socketWithPublish = socket as Bun.ServerWebSocket<unknown> & {
      publish?: (topic: string, data: unknown, compress?: boolean) => unknown;
      publishText?: (topic: string, data: string, compress?: boolean) => unknown;
      publishBinary?: (
        topic: string,
        data: ArrayBuffer | ArrayBufferView,
        compress?: boolean,
      ) => unknown;
      ping?: (data?: unknown) => unknown;
      pong?: (data?: unknown) => unknown;
    };

    const send = (data: string | ArrayBuffer | ArrayBufferView | null, _compress?: boolean) =>
      socket.send(toPayload(data));

    return {
      send,
      ping: (data?: string | ArrayBuffer | ArrayBufferView) => {
        return socketWithPublish.ping?.(data);
      },
      pong: (data?: string | ArrayBuffer | ArrayBufferView) => {
        return socketWithPublish.pong?.(data);
      },
      publish: (topic, data) => {
        if (typeof socketWithPublish.publish === "function") {
          return socketWithPublish.publish(topic, toPayload(data));
        }

        if (
          typeof socketWithPublish.publishBinary === "function" &&
          (data instanceof ArrayBuffer || ArrayBuffer.isView(data))
        ) {
          return socketWithPublish.publishBinary(topic, toBinaryPayload(data));
        }

        if (typeof socketWithPublish.publishText === "function") {
          return socketWithPublish.publishText(topic, typeof data === "string" ? data : `${data}`);
        }

        return send(data);
      },
      sendText: (data: string) => socket.sendText(data),
      sendBinary: (data: ArrayBuffer | ArrayBufferView) => socket.sendBinary(toBinaryPayload(data)),
      close: (code?: number, reason?: string) => {
        if (typeof code === "number") {
          return socket.close(code, reason);
        }
        return socket.close();
      },
      data: {
        path: socket.data.path,
        params: socket.data.params,
      },
    };
  }

  private isJsonContent(contentType: string): boolean {
    const lower = contentType.toLowerCase();
    return JSON_CONTENT_TYPES.some((item) => lower.includes(item));
  }

  private toResponse(result: unknown, state: ResponseState): Response {
    if (result instanceof Response) {
      for (const [key, value] of Object.entries(state.headers)) {
        result.headers.set(key, value);
      }
      return result;
    }

    if (result === null || result === undefined) {
      return new Response("", {
        status: state.status,
        headers: state.headers,
      });
    }

    if (typeof result === "string" || typeof result === "number" || typeof result === "boolean") {
      return new Response(String(result), {
        status: state.status,
        headers: {
          "content-type": "text/plain",
          ...state.headers,
        },
      });
    }

    if (
      result instanceof Blob ||
      result instanceof ArrayBuffer ||
      result instanceof ReadableStream
    ) {
      return new Response(result, {
        status: state.status,
        headers: state.headers,
      });
    }

    if (ArrayBuffer.isView(result)) {
      return new Response(copyArrayBufferView(result), {
        status: state.status,
        headers: state.headers,
      });
    }

    const body = JSON.stringify(result);
    return new Response(body, {
      status: state.status,
      headers: {
        "content-type": "application/json",
        ...state.headers,
      },
    });
  }

  private joinPaths(base: string, suffix: string): string {
    const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
    const normalizedSuffix = suffix.startsWith("/") ? suffix : `/${suffix}`;

    return `${normalizedBase}${normalizedSuffix}`;
  }
}

function normalizePath(path: string): string {
  if (path === "/") {
    return "/";
  }
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function collectValuesFromPairs(
  entries:
    | IterableIterator<[string, string]>
    | IterableIterator<[string, FormDataEntryValue]>
    | IterableIterator<[string, File]>,
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of entries) {
    values[key] = `${value}`;
  }

  return values;
}

const createApp = (): BaoApp => new BaoApp();

export { BaoApp, createApp };
