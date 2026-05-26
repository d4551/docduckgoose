import { describe, expect, it } from "bun:test";
import {
  ENTERPRISE_TENANCY_HOTLOAD_MATRIX,
  isEnterpriseTenancyHotLoadAllowed,
} from "../src/enterprise-tenancy.ts";

describe("enterprise-tenancy matrix", () => {
  it("allows mounted for workspace tier", () => {
    expect(isEnterpriseTenancyHotLoadAllowed("workspace", "mounted")).toBe(true);
  });

  it("denies hot-swapping for user tier", () => {
    expect(isEnterpriseTenancyHotLoadAllowed("user", "hot-swapping")).toBe(false);
  });

  it("defines every tenancy tier", () => {
    expect(Object.keys(ENTERPRISE_TENANCY_HOTLOAD_MATRIX).sort()).toEqual([
      "admin",
      "enterprise",
      "user",
      "workplace",
      "workspace",
    ]);
  });
});
