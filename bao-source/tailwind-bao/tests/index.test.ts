import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, TailwindCompiler, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("package identity", () => {
  it("PACKAGE_NAME", () => expect(PACKAGE_NAME).toBe("@baohaus/tailwind-bao"));
  it("UPSTREAM_PACKAGE", () => expect(UPSTREAM_PACKAGE).toBe("tailwindcss@4.2.2"));
});

describe("TailwindCompiler", () => {
  const config = { content: ["./src/**/*.ts"] };

  it("creates compiler from config", () => {
    const c = new TailwindCompiler(config);
    expect(c).toBeInstanceOf(TailwindCompiler);
  });

  it("compile returns non-empty string", () => {
    const c = new TailwindCompiler(config);
    const out = c.compile("<div class='flex grid'>");
    expect(typeof out).toBe("string");
    expect(out.length).toBeGreaterThan(0);
  });

  it("compile output contains .flex selector", () => {
    const c = new TailwindCompiler(config);
    const out = c.compile("flex");
    expect(out).toContain(".flex");
  });

  it("compile output contains .grid selector", () => {
    const c = new TailwindCompiler(config);
    const out = c.compile("grid");
    expect(out).toContain(".grid");
  });

  it("compile output is valid CSS block format", () => {
    const c = new TailwindCompiler(config);
    const out = c.compile("flex");
    expect(out).toContain("{");
    expect(out).toContain("}");
  });

  it("compile output contains display property", () => {
    const c = new TailwindCompiler(config);
    const out = c.compile("flex");
    expect(out).toContain("display:");
  });
});
