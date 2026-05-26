import { describe, expect, it } from "bun:test";
import { getGooseWordInstallHandlerRegistry } from "../src/install/install-handler-registry.ts";

describe("getGooseWordInstallHandlerRegistry", () => {
  it("registers native-mobile-shell handler in canonical factory", () => {
    const registry = getGooseWordInstallHandlerRegistry();
    const kinds = registry.toHandlerListDto().map((entry) => entry.kind);
    expect(kinds).toEqual(["native-mobile-shell"]);
  });
});
