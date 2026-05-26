import { describe, expect, it } from "bun:test";
import { isBaoArchiveDigest } from "./cas-resolver.ts";

describe("isBaoArchiveDigest", () => {
  it("accepts canonical sha256 digest", () => {
    expect(isBaoArchiveDigest(`sha256:${"a".repeat(64)}`)).toBe(true);
  });

  it("rejects wrong prefix", () => {
    expect(isBaoArchiveDigest(`md5:${"a".repeat(64)}`)).toBe(false);
  });

  it("rejects wrong length", () => {
    expect(isBaoArchiveDigest(`sha256:${"a".repeat(63)}`)).toBe(false);
  });

  it("rejects uppercase hex", () => {
    expect(isBaoArchiveDigest(`sha256:${"A".repeat(64)}`)).toBe(false);
  });
});
