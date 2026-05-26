import { afterEach, describe, expect, it } from "bun:test";
import {
  clearPluginRoutes,
  createPluginRouteApp,
  dispatchPluginRoute,
  listPluginRouteApps,
  registerPluginRouteApp,
} from "../src/install/plugin-route-registry.ts";

afterEach(() => {
  clearPluginRoutes();
});

describe("plugin route registry", () => {
  it("registers and dispatches current plugin routes", async () => {
    const app = createPluginRouteApp().get("/settings/tabs/plugin-a", () => "mounted");
    registerPluginRouteApp("plugin-a", app);
    expect(listPluginRouteApps().map((route) => route.ownerId)).toEqual(["plugin-a"]);

    const response = await dispatchPluginRoute(
      new Request("http://localhost/settings/tabs/plugin-a", { method: "GET" }),
    );
    expect(response?.status).toBe(200);
    expect(await response?.text()).toBe("mounted");
  });

  it("unloads routes on clear", async () => {
    const app = createPluginRouteApp().post("/api/plugin-a", () => ({ ok: true }));
    registerPluginRouteApp("plugin-a", app);
    clearPluginRoutes();
    const response = await dispatchPluginRoute(
      new Request("http://localhost/api/plugin-a", { method: "POST" }),
    );
    expect(response).toBeNull();
    expect(listPluginRouteApps()).toEqual([]);
  });

  it("supports dynamic params expanded HTTP methods and plugin hooks", async () => {
    const app = createPluginRouteApp()
      .onBeforeHandle(({ set }) => {
        set.headers["x-plugin-hook"] = "ran";
      })
      .put("/api/plugin-b/:id", ({ params }) => ({ id: params.id ?? "" }))
      .patch("/api/plugin-b/:id", ({ params }) => ({ patch: params.id ?? "" }))
      .delete("/api/plugin-b/:id", ({ params }) => ({ deleted: params.id ?? "" }));
    registerPluginRouteApp("plugin-b", app);

    const putResponse = await dispatchPluginRoute(
      new Request("http://localhost/api/plugin-b/a%20b", { method: "PUT" }),
    );
    expect(await putResponse?.json()).toEqual({ id: "a b" });
    expect(putResponse?.headers.get("x-plugin-hook")).toBe("ran");

    const patchResponse = await dispatchPluginRoute(
      new Request("http://localhost/api/plugin-b/c", { method: "PATCH" }),
    );
    expect(await patchResponse?.json()).toEqual({ patch: "c" });

    const deleteResponse = await dispatchPluginRoute(
      new Request("http://localhost/api/plugin-b/d", { method: "DELETE" }),
    );
    expect(await deleteResponse?.json()).toEqual({ deleted: "d" });
  });
});
