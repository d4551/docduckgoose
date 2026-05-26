/**
 * Unit tests for the SSE wire-format encoder.
 *
 * @packageDocumentation
 */

import { describe, expect, it } from "bun:test";
import { encodeHeartbeatComment, encodeSseFragment } from "../src/encoder.ts";

describe("encodeSseFragment", () => {
  it("frames a single-line HTML payload as a complete SSE event", () => {
    const encoder = new TextEncoder();
    const bytes = encodeSseFragment("sidebar-refresh", "<nav></nav>", 5_000, encoder);
    const text = new TextDecoder().decode(bytes);

    expect(text).toBe("event: sidebar-refresh\nretry: 5000\ndata: <nav></nav>\n\n");
  });

  it("splits a multi-line HTML payload into one `data:` line per source line", () => {
    const encoder = new TextEncoder();
    const html = "<nav>\n  <ul></ul>\n</nav>";
    const bytes = encodeSseFragment("sidebar-refresh", html, 1_500, encoder);
    const text = new TextDecoder().decode(bytes);

    expect(text).toContain("event: sidebar-refresh\n");
    expect(text).toContain("retry: 1500\n");
    expect(text).toContain("data: <nav>\n");
    expect(text).toContain("data:   <ul></ul>\n");
    expect(text).toContain("data: </nav>\n\n");
  });

  it("emits the canonical heartbeat comment that SSE consumers ignore", () => {
    const encoder = new TextEncoder();
    const bytes = encodeHeartbeatComment(encoder);
    const text = new TextDecoder().decode(bytes);

    expect(text).toBe(": heartbeat\n\n");
  });
});
