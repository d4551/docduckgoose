import { describe, expect, it } from "bun:test";
import { createContext } from "../src/context.ts";

describe("./context", () => {
  it("creates context with request, params, query, headers", () => {
    const request = new Request("http://example.com/path?foo=bar");
    const params = { id: "123" };
    const context = createContext(request, params);

    expect(context.request).toBe(request);
    expect(context.params).toEqual(params);
    expect(context.query.get("foo")).toBe("bar");
    expect(context.headers).toBe(request.headers);
  });

  it("creates context with empty params", () => {
    const request = new Request("http://example.com/");
    const context = createContext(request, {});

    expect(context.params).toEqual({});
    expect(context.query.toString()).toBe("");
  });

  it("extracts query parameters from URL", () => {
    const request = new Request("http://example.com/search?q=test&page=1&limit=10");
    const context = createContext(request, {});

    expect(context.query.get("q")).toBe("test");
    expect(context.query.get("page")).toBe("1");
    expect(context.query.get("limit")).toBe("10");
  });
});
