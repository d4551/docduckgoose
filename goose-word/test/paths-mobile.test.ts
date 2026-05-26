import { describe, expect, it } from "bun:test";
import { join } from "node:path";

describe("GOOSE_WORD_DATA_DIR", () => {
  it("uses env override when set", async () => {
    const custom = join("/tmp", `gw-data-${crypto.randomUUID()}`);
    Bun.env.GOOSE_WORD_DATA_DIR = custom;
    const mod = await import(`../src/config/paths.ts?reload=${crypto.randomUUID()}`);
    expect(mod.gooseWordDataDir).toBe(custom);
    delete Bun.env.GOOSE_WORD_DATA_DIR;
  });
});
