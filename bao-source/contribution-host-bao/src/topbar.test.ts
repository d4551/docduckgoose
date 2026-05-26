import { describe, expect, test } from "bun:test";

import { createTopbarHost } from "./topbar.ts";

describe("createTopbarHost", () => {
  test("returns independent process-local hosts", () => {
    const left = createTopbarHost();
    const right = createTopbarHost();
    left.register({
      id: "runtime-status",
      extensionId: "builtin",
      slot: "end",
      position: 10,
      labelKey: "topbar.runtime.status",
    });
    expect(left.size()).toBe(1);
    expect(right.size()).toBe(0);
  });

  test("orders snapshot by slot.order then position then id", () => {
    const host = createTopbarHost();
    host.register({
      id: "end-b",
      extensionId: "builtin",
      slot: "end",
      position: 20,
      labelKey: "topbar.end.b",
    });
    host.register({
      id: "start",
      extensionId: "builtin",
      slot: "start",
      position: 50,
      labelKey: "topbar.start",
    });
    host.register({
      id: "end-a",
      extensionId: "builtin",
      slot: "end",
      position: 20,
      labelKey: "topbar.end.a",
    });
    host.register({
      id: "center",
      extensionId: "builtin",
      slot: "center",
      position: 0,
      labelKey: "topbar.center",
    });
    expect(host.snapshot().map((entry) => entry.id)).toEqual(["start", "center", "end-a", "end-b"]);
  });

  test("snapshotBySlot partitions to canonical 3-key record", () => {
    const host = createTopbarHost();
    host.register({
      id: "center",
      extensionId: "builtin",
      slot: "center",
      position: 0,
      labelKey: "topbar.center",
    });
    host.register({
      id: "end",
      extensionId: "builtin",
      slot: "end",
      position: 0,
      labelKey: "topbar.end",
    });
    const bySlot = host.snapshotBySlot();
    expect(Object.keys(bySlot)).toEqual(["start", "center", "end"]);
    expect(bySlot.start).toEqual([]);
    expect(bySlot.center.map((entry) => entry.id)).toEqual(["center"]);
    expect(bySlot.end.map((entry) => entry.id)).toEqual(["end"]);
  });

  test("unregisterByOwner removes every registration owned by the owner", () => {
    const host = createTopbarHost();
    host.register({
      id: "one",
      extensionId: "owner",
      slot: "end",
      position: 0,
      labelKey: "topbar.one",
    });
    host.register({
      id: "two",
      extensionId: "owner",
      slot: "end",
      position: 1,
      labelKey: "topbar.two",
    });
    expect(host.unregisterByOwner("owner")).toBe(2);
    expect(host.size()).toBe(0);
  });

  test("duplicate-id by a different owner returns Result.error", () => {
    const host = createTopbarHost();
    host.register({
      id: "shared",
      extensionId: "owner-a",
      slot: "end",
      position: 0,
      labelKey: "topbar.shared",
    });
    const second = host.register({
      id: "shared",
      extensionId: "owner-b",
      slot: "end",
      position: 0,
      labelKey: "topbar.shared",
    });
    expect(second.ok).toBe(false);
  });
});
