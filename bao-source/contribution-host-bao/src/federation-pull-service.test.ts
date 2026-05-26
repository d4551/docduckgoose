import { describe, expect, test } from "bun:test";
import { createEcosystemFederationPullService } from "./federation-pull-service.ts";
import { FEDERATION_SNAPSHOT_ROUTE_PATH } from "./federation-wire.ts";

describe("createEcosystemFederationPullService", () => {
  test("mints bearer and pulls peer snapshot when secret configured", async () => {
    const secret = "test-federation-hmac-secret-32chars-min";
    const peerOrigin = "http://peer.test:3999";
    let authHeader: string | null = null;
    let fetchCalls = 0;
    const service = createEcosystemFederationPullService({
      localPeerId: "forge",
      peerOriginResolvers: [{ peerId: "bao-runtime", resolveOrigin: () => peerOrigin }],
      resolveHmacSecret: () => secret,
    });
    service.configureFetchImplForTests(async (input, init) => {
      fetchCalls += 1;
      authHeader = new Headers(init?.headers).get("authorization");
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      if (url.includes(FEDERATION_SNAPSHOT_ROUTE_PATH)) {
        return new Response(
          JSON.stringify({
            schemaVersion: 1,
            snapshotAt: new Date().toISOString(),
            peer: {
              peerId: "bao-runtime",
              displayName: "Runtime",
              origin: peerOrigin,
              versionTag: "0.0.0",
              capabilityTier: "t2",
            },
            etag: "a".repeat(64),
            surfaces: {
              sidebar: [],
              settingsTab: [],
              paletteEntryGroup: [],
              apiGroup: [],
              tileGroup: [],
              topbar: [],
              uiAssetPack: [],
            },
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("not found", { status: 404 });
    });
    const surfaces = await service.loadFederatedSurfaces();
    expect(fetchCalls).toBeGreaterThan(0);
    expect(authHeader?.startsWith("Bearer ")).toBe(true);
    expect(surfaces.sidebar).toEqual([]);
    service.shutdown();
  });
});
