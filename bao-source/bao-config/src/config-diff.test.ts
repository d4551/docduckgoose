import { describe, expect, test } from "bun:test";
import { computeConfigHash, createConfigVersionDraft, diffConfigVersions } from "./config-diff";

describe("config diff", () => {
  test("computes stable hashes independent of key order", () => {
    expect(computeConfigHash({ A: "1", B: { C: true } })).toBe(
      computeConfigHash({ B: { C: true }, A: "1" }),
    );
  });

  test("creates the next draft version", () => {
    expect(
      createConfigVersionDraft({
        environment: "test",
        configPayload: { PORT: "3010" },
        latestVersion: 4,
        notes: "promote test config",
      }),
    ).toMatchObject({
      environment: "test",
      version: 5,
      status: "DRAFT",
      notes: "promote test config",
    });
  });

  test("diffs added, removed, and changed keys", () => {
    expect(
      diffConfigVersions(
        { A: "1", B: "2", NESTED: { enabled: false } },
        { B: "3", C: "4", NESTED: { enabled: true } },
      ),
    ).toEqual([
      { key: "A", action: "removed", oldValue: "1" },
      { key: "B", action: "changed", oldValue: "2", newValue: "3" },
      { key: "C", action: "added", newValue: "4" },
      {
        key: "NESTED",
        action: "changed",
        oldValue: { enabled: false },
        newValue: { enabled: true },
      },
    ]);
  });
});
