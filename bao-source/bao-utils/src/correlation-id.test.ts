import { describe, expect, test } from "bun:test";
import { CORRELATION_ID_HEADER, ensureCorrelationIdHeader } from "./correlation-id";

describe("CORRELATION_ID_HEADER", () => {
  test("is the canonical x-correlation-id wire name", () => {
    expect(CORRELATION_ID_HEADER).toBe("x-correlation-id");
  });
});

describe("ensureCorrelationIdHeader", () => {
  test("preserves an inbound correlation ID and writes it to a Headers sink", () => {
    const request = new Request("https://example.test/x", {
      headers: { [CORRELATION_ID_HEADER]: "abc-123" },
    });
    const responseHeaders = new Headers();
    const id = ensureCorrelationIdHeader(request, responseHeaders);
    expect(id).toBe("abc-123");
    expect(responseHeaders.get(CORRELATION_ID_HEADER)).toBe("abc-123");
  });

  test("preserves an inbound correlation ID and writes it to a plain-object sink", () => {
    const request = new Request("https://example.test/x", {
      headers: { [CORRELATION_ID_HEADER]: "request-1" },
    });
    const responseHeaders: Record<string, string> = {};
    const id = ensureCorrelationIdHeader(request, responseHeaders);
    expect(id).toBe("request-1");
    expect(responseHeaders[CORRELATION_ID_HEADER]).toBe("request-1");
  });

  test("trims surrounding whitespace from the inbound header", () => {
    const request = new Request("https://example.test/x", {
      headers: { [CORRELATION_ID_HEADER]: "   spaced-id  " },
    });
    const id = ensureCorrelationIdHeader(request, new Headers());
    expect(id).toBe("spaced-id");
  });

  test("reuses an existing value on the response headers when request omits the header", () => {
    const request = new Request("https://example.test/x");
    const responseHeaders = new Headers({ [CORRELATION_ID_HEADER]: "preset-id" });
    const id = ensureCorrelationIdHeader(request, responseHeaders);
    expect(id).toBe("preset-id");
  });

  test("generates a new UUID when neither side provides one", () => {
    const request = new Request("https://example.test/x");
    const responseHeaders: Record<string, string> = {};
    const id = ensureCorrelationIdHeader(request, responseHeaders);
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    expect(responseHeaders[CORRELATION_ID_HEADER]).toBe(id);
  });
});
