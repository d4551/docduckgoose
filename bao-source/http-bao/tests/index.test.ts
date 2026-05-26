import { describe, expect, it } from "bun:test";
import { BaoApp, createApp } from "../src/app.ts";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("http-bao", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/http-bao");
    expect(UPSTREAM_PACKAGE).toBe("elysia@1.4.28");
  });

  it("creates app", () => {
    const app = createApp();
    expect(app).toBeInstanceOf(BaoApp);
  });

  it("registers routes", () => {
    const app = createApp();
    app.get("/", () => "hello");
    app.post("/users", () => "created");
    const routes = app.getRoutes();
    expect(routes).toHaveLength(2);
    expect(routes[0].method).toBe("GET");
    expect(routes[0].path).toBe("/");
  });

  it("registers plugin via use", () => {
    const app = createApp();
    const plugin = createApp();
    plugin.get("/plugin", () => "plugin route");
    app.use(plugin);
    const routes = app.getRoutes();
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe("/plugin");
  });
});
