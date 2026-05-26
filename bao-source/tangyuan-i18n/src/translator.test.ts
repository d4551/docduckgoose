import { describe, expect, test } from "bun:test";
import { SEED_CATALOGS } from "./catalog.js";
import { createT } from "./translator.js";

describe("createT", () => {
  test("returns primary translation when present", () => {
    const translator = createT({ locale: "fr-FR", catalogs: SEED_CATALOGS });
    expect(translator.t("validation.required")).toBe("Ce champ est obligatoire.");
  });

  test("falls back across locale then returns key", () => {
    const translator = createT({ locale: "ja-JP", catalogs: SEED_CATALOGS });
    expect(translator.t("missing.key")).toBe("missing.key");
  });

  test("interpolates parameters with plurals", () => {
    const translator = createT({ locale: "en-GB", catalogs: SEED_CATALOGS });
    expect(translator.t("pagination.summary", { count: 1, total: 1 })).toBe("1 result of 1.");
    expect(translator.t("pagination.summary", { count: 3, total: 3 })).toBe("3 results of 3.");
    expect(translator.t("pagination.summary", { count: 0, total: 0 })).toBe("No results of 0.");
  });

  test("format helpers honour locale", () => {
    const translator = createT({ locale: "de-DE", catalogs: SEED_CATALOGS });
    expect(translator.format.number(1234.5)).toBe("1.234,5");
  });
});
