import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TOKENS_CSS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "baohaus-design-tokens-aurora-bao",
  "assets",
  "baohaus-aurora-tokens.css",
);

const APP_CSS_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "bao-source",
  "goose-word-ui-bao",
  "public",
  "styles",
  "goose-app.css",
);

const extractDefinitions = (css: string): Set<string> => {
  const defs = new Set<string>();
  const pattern = /--(bao-glass-[a-z0-9-]+)\s*:/g;
  let match: RegExpExecArray | null = pattern.exec(css);
  while (match !== null) {
    if (match[1]) {
      defs.add(match[1]);
    }
    match = pattern.exec(css);
  }
  return defs;
};

const extractReferences = (css: string): Set<string> => {
  const refs = new Set<string>();
  const pattern = /var\(\s*--(bao-glass-[a-z0-9-]+)/g;
  let match: RegExpExecArray | null = pattern.exec(css);
  while (match !== null) {
    if (match[1]) {
      refs.add(match[1]);
    }
    match = pattern.exec(css);
  }
  return refs;
};

describe("glass token integrity", () => {
  const tokensCss = readFileSync(TOKENS_CSS_PATH, "utf8");
  const appCss = readFileSync(APP_CSS_PATH, "utf8");
  const tokenDefs = extractDefinitions(tokensCss);
  const appRefs = extractReferences(appCss);

  it("tokens CSS defines --bao-glass-blur", () => {
    expect(tokenDefs.has("bao-glass-blur")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-saturate", () => {
    expect(tokenDefs.has("bao-glass-saturate")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-brightness", () => {
    expect(tokenDefs.has("bao-glass-brightness")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-bg", () => {
    expect(tokenDefs.has("bao-glass-bg")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-bg-solid", () => {
    expect(tokenDefs.has("bao-glass-bg-solid")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-border", () => {
    expect(tokenDefs.has("bao-glass-border")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-shadow", () => {
    expect(tokenDefs.has("bao-glass-shadow")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-radius", () => {
    expect(tokenDefs.has("bao-glass-radius")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-spec-x", () => {
    expect(tokenDefs.has("bao-glass-spec-x")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-spec-y", () => {
    expect(tokenDefs.has("bao-glass-spec-y")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-displacement-scale", () => {
    expect(tokenDefs.has("bao-glass-displacement-scale")).toBe(true);
  });

  it("tokens CSS defines --bao-glass-focus-glow", () => {
    expect(tokenDefs.has("bao-glass-focus-glow")).toBe(true);
  });

  it("goose-app.css only references glass tokens that are defined", () => {
    const allDefs = new Set<string>([...tokenDefs, ...extractDefinitions(appCss)]);
    const undefined_refs: string[] = [];
    for (const ref of appRefs) {
      if (!allDefs.has(ref)) {
        undefined_refs.push(ref);
      }
    }
    expect(undefined_refs).toEqual([]);
  });

  it("at least 10 --bao-glass-* tokens are defined", () => {
    expect(tokenDefs.size).toBeGreaterThanOrEqual(10);
  });
});
