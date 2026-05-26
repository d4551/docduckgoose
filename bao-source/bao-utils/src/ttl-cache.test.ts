import { describe, expect, test } from "bun:test";
import { createSyncTtlCache, createTtlCache, DEFAULT_TTL_MS } from "./ttl-cache";

describe("createTtlCache", () => {
  test("DEFAULT_TTL_MS is 5_000ms", () => {
    expect(DEFAULT_TTL_MS).toBe(5_000);
  });

  test("stores and retrieves a typed value", () => {
    const cache = createTtlCache<{ count: number }>();
    cache.set("k", { count: 1 });
    expect(cache.get("k")).toEqual({ count: 1 });
  });

  test("getOrSet returns cached value without recomputing", async () => {
    const cache = createTtlCache<number>();
    let calls = 0;
    const compute = async (): Promise<number> => {
      calls += 1;
      return 42;
    };
    const first = await cache.getOrSet("k", compute);
    const second = await cache.getOrSet("k", compute);
    expect(first).toBe(42);
    expect(second).toBe(42);
    expect(calls).toBe(1);
  });

  test("entries expire after their TTL", async () => {
    const cache = createTtlCache<string>(10);
    cache.set("k", "hot");
    expect(cache.get("k")).toBe("hot");
    await Bun.sleep(20);
    expect(cache.get("k")).toBeUndefined();
  });

  test("invalidatePrefix drops only matching keys", () => {
    const cache = createTtlCache<number>();
    cache.set("user:1", 1);
    cache.set("user:2", 2);
    cache.set("post:1", 3);
    cache.invalidatePrefix("user:");
    expect(cache.get("user:1")).toBeUndefined();
    expect(cache.get("user:2")).toBeUndefined();
    expect(cache.get("post:1")).toBe(3);
  });

  test("clear empties the cache", () => {
    const cache = createTtlCache<number>();
    cache.set("a", 1);
    cache.set("b", 2);
    cache.clear();
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
  });
});

describe("createSyncTtlCache", () => {
  test("getOrCompute populates the slot synchronously", () => {
    const cache = createSyncTtlCache<number>();
    let calls = 0;
    const result = cache.getOrCompute("k", () => {
      calls += 1;
      return 7;
    });
    expect(result).toBe(7);
    expect(calls).toBe(1);
    expect(cache.getOrCompute("k", () => 999)).toBe(7);
    expect(calls).toBe(1);
  });
});
