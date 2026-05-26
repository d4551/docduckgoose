/**
 * Integration tests for the contribution-SSE stream factory.
 *
 * Exercises the real stream + filter + bus + encoder pipeline so we
 * don't lose the live-refresh contract to a "looks fine in isolation"
 * regression. The stream is consumed via the Web ReadableStream API
 * directly; no Elysia harness is required.
 *
 * @packageDocumentation
 */

import { afterEach, describe, expect, it } from "bun:test";
import { ecosystemEventBus } from "../src/service.ts";
import { createContributionSseStream } from "../src/sse-sink.ts";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  ECOSYSTEM_CONTRIBUTION_SURFACE,
  type EcosystemContributionEvent,
} from "../src/types.ts";

afterEach(() => {
  ecosystemEventBus.resetForTests();
});

describe("createContributionSseStream", () => {
  it("emits a sidebar-refresh frame when a matching event is published", async () => {
    const controller = new AbortController();
    const request = new Request("http://localhost/ecosystem-events.sse", {
      signal: controller.signal,
    });
    let renderCalls = 0;
    const stream = createContributionSseStream({
      request,
      scope: { userId: "user-1", tenantId: "tenant-A" },
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      eventName: "sidebar-refresh",
      render: (event: EcosystemContributionEvent): string => {
        renderCalls += 1;
        return `<nav data-extension="${event.extensionId}"></nav>`;
      },
      heartbeatIntervalMs: 60_000,
      retryMs: 5_000,
    });

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "fixture-extension",
    });

    const { value, done } = await reader.read();
    expect(done).toBe(false);
    const frame = decoder.decode(value);
    expect(frame).toContain("event: sidebar-refresh");
    expect(frame).toContain("retry: 5000");
    expect(frame).toContain('data: <nav data-extension="fixture-extension"></nav>');
    expect(renderCalls).toBe(1);

    controller.abort();
    const tail = await reader.read();
    expect(tail.done).toBe(true);
  });

  it("skips events targeting a different tenant", async () => {
    const controller = new AbortController();
    const request = new Request("http://localhost/ecosystem-events.sse", {
      signal: controller.signal,
    });
    let renderCalls = 0;
    const stream = createContributionSseStream({
      request,
      scope: { userId: "user-1", tenantId: "tenant-A" },
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      eventName: "sidebar-refresh",
      render: (event: EcosystemContributionEvent): string => {
        renderCalls += 1;
        return `<nav data-extension="${event.extensionId}"></nav>`;
      },
      heartbeatIntervalMs: 60_000,
      retryMs: 5_000,
    });

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "tenant-B-only",
      tenantId: "tenant-B",
    });

    // Fire a matching tenant-A event; the first frame the reader sees must
    // be the tenant-A refresh — proving the tenant-B event was filtered out.
    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "tenant-A-match",
      tenantId: "tenant-A",
    });

    const { value } = await reader.read();
    const frame = decoder.decode(value);
    expect(frame).toContain("event: sidebar-refresh");
    expect(frame).toContain('data-extension="tenant-A-match"');
    expect(frame).not.toContain("tenant-B-only");
    expect(renderCalls).toBe(1);

    controller.abort();
  });

  it("keeps the connection alive when the renderer throws", async () => {
    const controller = new AbortController();
    const request = new Request("http://localhost/ecosystem-events.sse", {
      signal: controller.signal,
    });
    const errors: string[] = [];
    const stream = createContributionSseStream({
      request,
      scope: { userId: "user-1", tenantId: "tenant-A" },
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      eventName: "sidebar-refresh",
      render: (event: EcosystemContributionEvent): string => {
        if (event.extensionId === "broken") {
          throw new Error("renderer-broken");
        }
        return `<nav data-extension="${event.extensionId}"></nav>`;
      },
      heartbeatIntervalMs: 60_000,
      retryMs: 5_000,
    });

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    // First publish triggers a renderer failure — the stream must NOT
    // emit a frame for it, but must stay open.
    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "broken",
    });
    // Second publish renders normally — its frame is what the reader sees.
    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "healthy",
    });

    const { value, done } = await reader.read();
    expect(done).toBe(false);
    const frame = decoder.decode(value);
    expect(frame).toContain('data-extension="healthy"');
    expect(frame).not.toContain('data-extension="broken"');
    expect(errors).toHaveLength(0);

    controller.abort();
  });
});
