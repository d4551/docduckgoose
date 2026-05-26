import { describe, expect, test } from "bun:test";
import {
  BUNBUDDY_HARDWARE_KINDS,
  BUNBUDDY_KINDS,
  isBunBuddyKind,
  isHardwareBunBuddyKind,
} from "../src/bunbuddy.schemas.ts";

describe("bunbuddy hardware kinds", () => {
  test("hardware kinds exclude scoutdumpling", () => {
    expect(BUNBUDDY_HARDWARE_KINDS).not.toContain("scoutdumpling");
    expect(BUNBUDDY_HARDWARE_KINDS.length).toBe(BUNBUDDY_KINDS.length - 1);
  });

  test("isHardwareBunBuddyKind accepts hardware kinds only", () => {
    for (const kind of BUNBUDDY_HARDWARE_KINDS) {
      expect(isHardwareBunBuddyKind(kind)).toBe(true);
      expect(isBunBuddyKind(kind)).toBe(true);
    }
    expect(isHardwareBunBuddyKind("scoutdumpling")).toBe(false);
    expect(isHardwareBunBuddyKind("not-a-kind")).toBe(false);
    expect(isHardwareBunBuddyKind(null)).toBe(false);
  });
});
