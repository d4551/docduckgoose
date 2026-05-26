import { describe, expect, test } from "bun:test";
import { BAODOWN_DEFINITIONS_BASE } from "./core";
import { BAODOWN_ROUTE_DEFINITIONS_V1 } from "./routes-pipelines";

function hasBaoDownRoute(method: string, path: string): boolean {
  return BAODOWN_ROUTE_DEFINITIONS_V1.some(
    (route) => route.method === method && route.path === path,
  );
}

describe("BaoDown capability route contract", () => {
  test("includes visual-builder graph and version maintenance routes", () => {
    expect(hasBaoDownRoute("PUT", `${BAODOWN_DEFINITIONS_BASE}/:id/graph`)).toBe(true);
    expect(hasBaoDownRoute("GET", `${BAODOWN_DEFINITIONS_BASE}/:id/versions/diff`)).toBe(true);
    expect(
      hasBaoDownRoute("POST", `${BAODOWN_DEFINITIONS_BASE}/:id/versions/:versionId/rollback`),
    ).toBe(true);
  });
});
