import { describe, expect, test } from "bun:test";
import type { CatalogBundle } from "./catalog.js";
import { auditParity } from "./parity.js";

describe("auditParity", () => {
  test("reports complete when all locales share the same keys", () => {
    const bundle = {
      "en-GB": { greet: "Hello" },
      "en-US": { greet: "Hello" },
      "fr-FR": { greet: "Bonjour" },
      "de-DE": { greet: "Hallo" },
      "es-ES": { greet: "Hola" },
      "it-IT": { greet: "Ciao" },
      "ja-JP": { greet: "こんにちは" },
      "zh-CN": { greet: "你好" },
    } satisfies CatalogBundle;
    const report = auditParity(bundle);
    expect(report.complete).toHaveLength(8);
  });

  test("reports missing keys per locale", () => {
    const bundle = {
      "en-GB": { greet: "Hello", farewell: "Bye" },
      "en-US": { greet: "Hello", farewell: "Bye" },
      "fr-FR": { greet: "Bonjour" },
      "de-DE": { greet: "Hallo", farewell: "Tschüss" },
      "es-ES": { greet: "Hola", farewell: "Adiós" },
      "it-IT": { greet: "Ciao", farewell: "Ciao" },
      "ja-JP": { greet: "こんにちは", farewell: "さようなら" },
      "zh-CN": { greet: "你好", farewell: "再见" },
    } satisfies CatalogBundle;
    const report = auditParity(bundle);
    expect(report.missing["fr-FR"]).toEqual(["farewell"]);
    expect(report.complete).not.toContain("fr-FR");
  });
});
