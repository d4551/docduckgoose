import { describe, expect, it } from "bun:test";
import { BaoApp, createApp } from "../src/app.ts";

describe("BaoApp", () => {
  it("creates app", () => {
    const app = createApp();
    expect(app).toBeInstanceOf(BaoApp);
  });

  it("registers routes", () => {
    const app = createApp();
    app.get("/", () => "hello");
    app.post("/api", () => "posted");
    const routes = app.getRoutes();
    expect(routes).toHaveLength(2);
    expect(routes[0].method).toBe("GET");
    expect(routes[1].method).toBe("POST");
  });

  it("registers middleware", () => {
    const app = createApp();
    const child = createApp();
    child.get("/middleware", () => "handled");
    app.use(child);
    const routes = app.getRoutes();
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe("/middleware");
  });
});
