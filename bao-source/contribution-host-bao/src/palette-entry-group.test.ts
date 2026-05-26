/**
 * Palette-entry-group contribution host — host-factory tests.
 *
 * @packageDocumentation
 */

import { describe, expect, test } from "bun:test";
import {
  PALETTE_ENTRY_KINDS,
  type PaletteEntryGroupRegistration,
} from "@baohaus/contribution-registry-bao/palette-entry-group";
import { createPaletteEntryGroupHost } from "./palette-entry-group.ts";

function buildRegistration(
  overrides: Partial<PaletteEntryGroupRegistration> & Pick<PaletteEntryGroupRegistration, "id">,
): PaletteEntryGroupRegistration {
  return {
    extensionId: "test:owner",
    headingKey: "palette.groups.actions",
    position: 0,
    entries: [
      {
        id: "open-dashboard",
        kind: PALETTE_ENTRY_KINDS.action,
        labelKey: "palette.actions.openDashboard",
        actionUrl: "/dashboard",
      },
    ],
    ...overrides,
  };
}

describe("createPaletteEntryGroupHost", () => {
  test("returns independent process-local hosts", () => {
    const a = createPaletteEntryGroupHost();
    const b = createPaletteEntryGroupHost();
    a.register(buildRegistration({ id: "a:actions" }));
    expect(a.size()).toBe(1);
    expect(b.size()).toBe(0);
  });

  test("orders snapshot by position then id", () => {
    const host = createPaletteEntryGroupHost();
    host.register(buildRegistration({ id: "z:later", position: 100 }));
    host.register(buildRegistration({ id: "a:earlier", position: 50 }));
    expect(host.snapshot().map((r) => r.id)).toEqual(["a:earlier", "z:later"]);
  });
});
