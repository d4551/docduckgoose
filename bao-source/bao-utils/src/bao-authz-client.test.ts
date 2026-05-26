import { afterEach, describe, expect, it } from "bun:test";
import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import type { BaoAuthzCheckResponse } from "@baohaus/bao-schemas/bao-authz.schemas";
import { type BaoAuthzFetch, callBaoAuthzCheck } from "./bao-authz-client.ts";

interface CapturedRequest {
  readonly pathname: string;
  readonly authorization: string | null;
  readonly service: string | null;
  readonly contentType: string | null;
  readonly accept: string | null;
  readonly body: string;
}

interface AuthzFixture {
  readonly origin: string;
  readonly requests: CapturedRequest[];
  readonly fetchImpl: BaoAuthzFetch;
}

const loggedWarnings: string[] = [];

const logger = {
  warn: (message: string) => {
    loggedWarnings.push(message);
  },
};

const startAuthzFixture = (status: number, payload: object): AuthzFixture => {
  const requests: CapturedRequest[] = [];
  return {
    origin: "http://bao-runtime.test",
    requests,
    async fetchImpl(input, init) {
      const request = new Request(input, init);
      const url = new URL(request.url);
      requests.push({
        pathname: url.pathname,
        authorization: request.headers.get("authorization"),
        service: request.headers.get("x-bao-service"),
        contentType: request.headers.get("content-type"),
        accept: request.headers.get("accept"),
        body: await request.text(),
      });
      return Response.json(payload, { status });
    },
  };
};

afterEach(() => {
  loggedWarnings.length = 0;
});

describe("callBaoAuthzCheck", () => {
  it("sends bearer service credentials to the canonical bao-runtime .bao authz route", async () => {
    const payload: BaoAuthzCheckResponse = {
      ok: true,
      allowed: true,
      service: "forge",
      action: "forge.ci.write",
      resource: "repo:baohaus/forge",
      requiredPermissions: ["system:configure"],
      subject: { id: "forge-user", role: "admin", source: "internal-api" },
    };
    const fixture = startAuthzFixture(200, payload);

    const decision = await callBaoAuthzCheck(
      {
        mode: "bearer",
        origin: fixture.origin,
        service: "forge",
        serviceToken: "service-token",
        logger,
        fetchImpl: fixture.fetchImpl,
      },
      {
        action: "forge.ci.write",
        actorId: "forge-user",
        resource: "repo:baohaus/forge",
      },
    );

    expect(decision.allowed).toBe(true);
    expect(fixture.requests).toHaveLength(1);
    const request = fixture.requests[0];
    expect(request?.pathname).toBe(API_PATHS.baoAuthzCheck);
    expect(request?.authorization).toBe("Bearer service-token");
    expect(request?.service).toBe("forge");
    expect(request?.contentType).toBe("application/json");
    expect(request?.body).toContain('"service":"forge"');
    expect(request?.body).toContain('"action":"forge.ci.write"');
  });

  it("forwards caller headers while filling canonical defaults", async () => {
    const payload: BaoAuthzCheckResponse = {
      ok: true,
      allowed: true,
      service: "bao-ai-gateway",
      action: "bao-ai-gateway.gateway",
      requiredPermissions: ["analysis:run"],
      subject: { id: "bao-ai-gateway-user", role: "admin", source: "test-header" },
    };
    const fixture = startAuthzFixture(200, payload);
    const forwarded = new Headers({ cookie: "bao=session" });

    const decision = await callBaoAuthzCheck(
      {
        mode: "forwarded",
        origin: fixture.origin,
        service: "bao-ai-gateway",
        logger,
        buildHeaders: () => forwarded,
        fetchImpl: fixture.fetchImpl,
      },
      { action: "bao-ai-gateway.gateway", actorId: "bao-ai-gateway-user" },
    );

    expect(decision.allowed).toBe(true);
    const request = fixture.requests[0];
    expect(request?.pathname).toBe(API_PATHS.baoAuthzCheck);
    expect(request?.service).toBe("bao-ai-gateway");
    expect(request?.contentType).toBe("application/json");
    expect(request?.accept).toBe("application/json");
  });

  it("fails closed when bao-runtime returns a malformed authz payload", async () => {
    const fixture = startAuthzFixture(200, { ok: true, allowed: true });

    const decision = await callBaoAuthzCheck(
      {
        mode: "bearer",
        origin: fixture.origin,
        service: "bao-registry",
        serviceToken: "service-token",
        logger,
        fetchImpl: fixture.fetchImpl,
      },
      { action: "bao-registry.publish", actorId: "registry-user" },
    );

    expect(decision.allowed).toBe(false);
    expect(decision.status).toBe(502);
    expect(decision.reason).toBe("bao-runtime authz response invalid");
  });
});
