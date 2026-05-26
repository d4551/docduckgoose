import { describe, expect, it } from "bun:test";
import { asJsonObject, parseJsonValue, renderJsonValue } from "./index.js";

describe("@baohaus/json-gyoza", () => {
  it("parses and renders JSON values", () => {
    const value = parseJsonValue('{"holy":"dumpling","count":2}');
    expect(asJsonObject(value)?.holy).toBe("dumpling");
    expect(renderJsonValue(value)).toContain('"count":2');
  });

  it("rejects invalid JSON values", () => {
    expect(() => parseJsonValue("undefined")).toThrow();
  });
});
