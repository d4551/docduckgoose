import { describe, expect, test } from "bun:test";
import {
  isAcceptedVersion,
  isFederationSurfaceKey,
  parseSelectedSurfaces,
} from "./federation-snapshot-parsers.ts";
import { FEDERATION_SURFACE_KEY } from "./federation-wire.ts";

describe("federation-snapshot-parsers", () => {
  test("isFederationSurfaceKey accepts canonical surface keys", () => {
    expect(isFederationSurfaceKey(FEDERATION_SURFACE_KEY.sidebar)).toBe(true);
    expect(isFederationSurfaceKey("not-a-surface")).toBe(false);
  });

  test("parseSelectedSurfaces returns undefined for empty or invalid input", () => {
    expect(parseSelectedSurfaces(null)).toBeUndefined();
    expect(parseSelectedSurfaces("")).toBeUndefined();
    expect(parseSelectedSurfaces("sidebar,not-a-surface")).toBeUndefined();
  });

  test("parseSelectedSurfaces parses comma-separated surface keys", () => {
    const selected = parseSelectedSurfaces("sidebar,topbar");
    expect(selected).toEqual(
      new Set([FEDERATION_SURFACE_KEY.sidebar, FEDERATION_SURFACE_KEY.topbar]),
    );
  });

  test("isAcceptedVersion accepts missing header and rejects unknown versions", () => {
    expect(isAcceptedVersion(null)).toBe(true);
    expect(isAcceptedVersion("999")).toBe(false);
  });
});
