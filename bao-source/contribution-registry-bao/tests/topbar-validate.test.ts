import { describe, expect, it } from "bun:test";
import { isTopbarRegistration } from "../src/topbar-validate.ts";

describe("isTopbarRegistration", () => {
  it("accepts a valid canonical topbar contribution", () => {
    expect(
      isTopbarRegistration({
        id: "hot-load:topbar",
        extensionId: "hot-load",
        slot: "end",
        position: 10,
        labelKey: "nav.settings",
        tooltipKey: "nav.settings",
        href: "/settings",
        iconName: "settings",
        capabilityRef: "bao.topbar.settings.read",
      }),
    ).toBe(true);
  });

  it("rejects invalid slot and nonnumeric position", () => {
    expect(
      isTopbarRegistration({
        id: "hot-load:topbar",
        extensionId: "hot-load",
        slot: "footer",
        position: "last",
        labelKey: "nav.settings",
      }),
    ).toBe(false);
  });
});
