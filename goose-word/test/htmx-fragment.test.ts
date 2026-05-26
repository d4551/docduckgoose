import { describe, expect, it } from "bun:test";
import { isHtmxFragmentRequest, selectShellOrPanel } from "../src/http/htmx-request.ts";

describe("htmx fragment selection", () => {
  it("detects HX-Request header", () => {
    const fragment = new Request("http://127.0.0.1:8080/settings", {
      headers: { "hx-request": "true" },
    });
    const full = new Request("http://127.0.0.1:8080/settings");
    expect(isHtmxFragmentRequest(fragment)).toBe(true);
    expect(isHtmxFragmentRequest(full)).toBe(false);
  });

  it("returns panel HTML for fragment requests", () => {
    const request = new Request("http://127.0.0.1:8080/docs", {
      headers: { "hx-request": "true" },
    });
    expect(
      selectShellOrPanel(request, "<section id='panel'>panel</section>", "<!DOCTYPE html>full"),
    ).toBe("<section id='panel'>panel</section>");
  });
});
