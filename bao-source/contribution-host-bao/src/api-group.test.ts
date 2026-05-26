/**
 * API-group contribution host — host-factory tests.
 *
 * @packageDocumentation
 */

import { describe, expect, test } from "bun:test";
import type { ApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group";
import { createApiGroupHost } from "./api-group.ts";

function buildRegistration(
  overrides: Partial<ApiGroupRegistration> & Pick<ApiGroupRegistration, "id">,
): ApiGroupRegistration {
  return {
    extensionId: "test:owner",
    serviceId: "bao-runtime",
    labelKey: "apiExplorer.groups.runtime",
    baseUrl: "http://localhost:3010",
    position: 0,
    routes: [],
    ...overrides,
  };
}

describe("createApiGroupHost", () => {
  test("returns independent process-local hosts", () => {
    const a = createApiGroupHost();
    const b = createApiGroupHost();
    a.register(buildRegistration({ id: "a:runtime" }));
    expect(a.size()).toBe(1);
    expect(b.size()).toBe(0);
  });

  test("orders snapshot by position then id", () => {
    const host = createApiGroupHost();
    host.register(
      buildRegistration({
        id: "z:later",
        serviceId: "registry",
        labelKey: "apiExplorer.groups.registry",
        baseUrl: "http://localhost:3000",
        position: 100,
      }),
    );
    host.register(
      buildRegistration({
        id: "a:earlier",
        serviceId: "bao-runtime",
        labelKey: "apiExplorer.groups.runtime",
        baseUrl: "http://localhost:3010",
        position: 50,
      }),
    );
    expect(host.snapshot().map((r) => r.id)).toEqual(["a:earlier", "z:later"]);
  });

  test("snapshotByService groups by serviceId in compare-ordered first-seen order", () => {
    const host = createApiGroupHost();
    host.register(
      buildRegistration({
        id: "runtime:b",
        serviceId: "bao-runtime",
        labelKey: "apiExplorer.groups.runtime",
        baseUrl: "http://localhost:3010",
        position: 100,
      }),
    );
    host.register(
      buildRegistration({
        id: "registry:a",
        serviceId: "registry",
        labelKey: "apiExplorer.groups.registry",
        baseUrl: "http://localhost:3000",
        position: 50,
      }),
    );
    host.register(
      buildRegistration({
        id: "registry:b",
        serviceId: "registry",
        labelKey: "apiExplorer.groups.registry",
        baseUrl: "http://localhost:3000",
        position: 60,
      }),
    );
    const grouped = host.snapshotByService();
    expect([...grouped.keys()]).toEqual(["registry", "bao-runtime"]);
    expect(grouped.get("registry")?.map((r) => r.id)).toEqual(["registry:a", "registry:b"]);
    expect(grouped.get("bao-runtime")?.map((r) => r.id)).toEqual(["runtime:b"]);
  });
});
