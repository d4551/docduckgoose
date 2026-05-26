import { describe, expect, it } from "bun:test";
import { createApp } from "../src/app.ts";
import { html, json, redirect, text } from "../src/handler.ts";
import { object, string } from "../src/validator.ts";

function closeQuietly(stop: () => void | Promise<void>): Promise<void> {
  return Promise.resolve(stop()).then(() => undefined);
}

async function withListeningApp<T>(
  app: ReturnType<typeof createApp>,
  run: (port: number) => Promise<T>,
): Promise<T> {
  const { port, stop } = await app.listen({ port: 0 });
  return run(port).then(
    async (value) => {
      await closeQuietly(stop);
      return value;
    },
    async (reason) => {
      await closeQuietly(stop);
      throw reason;
    },
  );
}

describe("routing, middleware, lifecycle, response API", () => {
  it("registers all HTTP method helpers and all()", () => {
    const app = createApp();

    app.all("/all", () => "all");
    app.route("OPTIONS", "/custom", () => "custom");
    app.connect("/connect", () => "connect");

    const methods = app
      .getRoutes()
      .filter((route) => route.path === "/all")
      .map((route) => route.method)
      .sort();

    expect(methods).toEqual([
      "CONNECT",
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT",
      "TRACE",
    ]);

    expect(
      app.getRoutes().some((route) => route.method === "OPTIONS" && route.path === "/custom"),
    ).toBe(true);
    expect(
      app.getRoutes().some((route) => route.method === "CONNECT" && route.path === "/connect"),
    ).toBe(true);
  });

  it("supports params and query validation on route", async () => {
    const app = createApp();

    app.get("/users/:id", (ctx) => `id:${ctx.params.id}`);
    app.post("/users/:id/profile", (ctx) => `name:${(ctx.body as { name: string }).name}`, {
      params: {
        id: string(),
      },
      body: object({
        name: string(),
      }),
    });
    app.get("/search", (ctx) => `q:${ctx.query.get("term")}`, {
      query: {
        term: string(),
      },
    });

    await withListeningApp(app, async (port) => {
      const routeMatch = await fetch(`http://127.0.0.1:${port}/users/abc`);
      expect(await routeMatch.text()).toBe("id:abc");

      const valid = await fetch(`http://127.0.0.1:${port}/users/abc/profile`, {
        method: "POST",
        body: JSON.stringify({ name: "alice" }),
        headers: { "content-type": "application/json" },
      });
      expect(valid.status).toBe(200);
      expect(await valid.text()).toBe("name:alice");

      const invalid = await fetch(`http://127.0.0.1:${port}/users/abc/profile`, {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "content-type": "application/json" },
      });
      expect(invalid.status).toBe(400);
      expect(await invalid.json()).toEqual(
        expect.objectContaining({
          error: "Bad Request",
        }),
      );

      const search = await fetch(`http://127.0.0.1:${port}/search?term=abc`);
      expect(await search.text()).toBe("q:abc");

      const missingSearch = await fetch(`http://127.0.0.1:${port}/search`);
      expect(missingSearch.status).toBe(400);
    });
  });

  it("merges group prefix with guard middleware", async () => {
    const app = createApp();
    const flow: string[] = [];

    app.group(
      "/api",
      {
        beforeHandle: () => {
          flow.push("guard");
          return undefined;
        },
      },
      (scope) => {
        scope.get("/status", () => {
          flow.push("handler");
          return "ok";
        });
      },
    );

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/api/status`);
      expect(await response.text()).toBe("ok");
      expect(flow).toEqual(["guard", "handler"]);
    });
  });

  it("orders app- and route-level beforeHandle middleware", async () => {
    const app = createApp();
    const order: string[] = [];

    app.onBeforeHandle(() => {
      order.push("app");
      return undefined;
    });

    app.get(
      "/pipeline",
      () => {
        order.push("handler");
        return "ok";
      },
      {
        beforeHandle: () => {
          order.push("route");
          return undefined;
        },
      },
    );

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/pipeline`);
      expect(await response.text()).toBe("ok");
      expect(order).toEqual(["app", "route", "handler"]);
    });
  });

  it("supports global middleware using use()", async () => {
    const app = createApp();
    const middleware: string[] = [];

    app.use(async (_context, next) => {
      middleware.push("before");
      await next();
      middleware.push("after");
      return undefined;
    });

    app.get("/", () => "root");

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      expect(await response.text()).toBe("root");
      expect(middleware).toEqual(["before", "after"]);
    });
  });

  it("runs start and stop lifecycle hooks", async () => {
    const app = createApp();
    const hookLog: string[] = [];

    app.onStart(() => {
      hookLog.push("start");
    });
    app.onStop(() => {
      hookLog.push("stop");
    });

    const { stop } = await app.listen({ port: 0 });
    expect(hookLog).toEqual(["start"]);
    await closeQuietly(stop);
    expect(hookLog).toEqual(["start", "stop"]);
  });

  it("runs transform, derive, resolve, and afterHandle", async () => {
    const app = createApp();

    app.onTransform((ctx) => {
      ctx.set.headers["x-trace"] = "transform";
    });

    app.derive(() => ({
      derived: "from-derive",
    }));

    app.resolve(() => ({
      resolved: "from-resolve",
    }));

    app.get(
      "/compose",
      (ctx) => `${(ctx as { derived: string }).derived}:${(ctx as { resolved: string }).resolved}`,
      {
        afterHandle: (ctx) => `${ctx.response}:from-after`,
      },
    );

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/compose`);
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("from-derive:from-resolve:from-after");
      expect(response.headers.get("x-trace")).toBe("transform");
    });
  });

  it("respects onParse hook override", async () => {
    const app = createApp();

    app.onParse(() => ({
      parsed: "ok",
    }));

    app.post("/parse", (ctx) => JSON.stringify(ctx.body));

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/parse`, {
        method: "POST",
        body: "raw-value",
      });

      expect(await response.text()).toBe(JSON.stringify({ parsed: "ok" }));
    });
  });

  it("prioritizes route-specific error handlers", async () => {
    const app = createApp();
    const markers: string[] = [];

    app.onError(() => {
      markers.push("global");
      return "global";
    });

    app.get(
      "/failing-route",
      () => {
        throw new Error("route failed");
      },
      {
        error: () => {
          markers.push("route");
          return "route";
        },
      },
    );

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/failing-route`);
      expect(await response.text()).toBe("route");
      expect(markers).toEqual(["route"]);
    });
  });

  it("executes onAfterResponse for finalized responses", async () => {
    const app = createApp();
    const seen: string[] = [];

    app.onAfterResponse(() => {
      seen.push("after");
    });

    app.get("/done", () => "done");

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/done`);
      expect(await response.text()).toBe("done");
      expect(seen).toEqual(["after"]);
    });
  });

  it("supports response helpers and status semantics", async () => {
    const app = createApp();
    app.get("/text", () => text("plain", 201));
    app.get("/html", () => html("<b>yes</b>"));
    app.get("/redir", () => redirect("/target"));
    app.get("/json", () => json({ okay: true }));

    await withListeningApp(app, async (port) => {
      const textResponse = await fetch(`http://127.0.0.1:${port}/text`);
      expect(textResponse.status).toBe(201);
      expect(textResponse.headers.get("content-type")).toContain("text/plain");
      expect(await textResponse.text()).toBe("plain");

      const htmlResponse = await fetch(`http://127.0.0.1:${port}/html`);
      expect(htmlResponse.status).toBe(200);
      expect(htmlResponse.headers.get("content-type")).toContain("text/html");
      expect(await htmlResponse.text()).toBe("<b>yes</b>");

      const redirectResponse = await fetch(`http://127.0.0.1:${port}/redir`, {
        redirect: "manual",
      });
      expect(redirectResponse.status).toBe(302);
      expect(redirectResponse.headers.get("location")).toBe("/target");

      const jsonResponse = await fetch(`http://127.0.0.1:${port}/json`);
      expect(jsonResponse.status).toBe(200);
      expect(jsonResponse.headers.get("content-type")).toContain("application/json");
      expect(await jsonResponse.json()).toEqual({ okay: true });
    });
  });

  it("supports mutation of response status from context", async () => {
    const app = createApp();
    app.get("/status", (ctx) => {
      ctx.set.status = 201;
      return "created";
    });

    await withListeningApp(app, async (port) => {
      const response = await fetch(`http://127.0.0.1:${port}/status`);
      expect(response.status).toBe(201);
      expect(await response.text()).toBe("created");
    });
  });
});
