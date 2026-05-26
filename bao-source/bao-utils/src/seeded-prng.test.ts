import { describe, expect, test } from "bun:test";
import { createPrng, SeededPrng } from "./seeded-prng";

describe("SeededPrng", () => {
  test("identical seed + worldTimeMs + offset produces identical output", () => {
    const a = createPrng(1234);
    const b = createPrng(1234);
    expect(a.next(1000)).toBe(b.next(1000));
    expect(a.next(2500, 7)).toBe(b.next(2500, 7));
    expect(a.int(9999, 0, 100, 3)).toBe(b.int(9999, 0, 100, 3));
  });

  test("next returns value in [0, 1)", () => {
    const prng = createPrng(42);
    for (let t = 0; t < 1000; t += 17) {
      const value = prng.next(t);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  test("int returns value in [min, max)", () => {
    const prng = createPrng(7);
    for (let t = 0; t < 500; t += 9) {
      const value = prng.int(t, 10, 20);
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThan(20);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  test("pick returns ok branch with element from non-empty array", () => {
    const prng = createPrng(99);
    const colors = ["red", "green", "blue"] as const;
    const result = prng.pick(123, colors);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(colors).toContain(result.value);
    }
  });

  test("pick returns empty-collection error for empty array", () => {
    const prng = createPrng(99);
    const result = prng.pick(123, []);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe("empty-collection");
    }
  });

  test("SeededPrng class constructor accepts seed", () => {
    const prng = new SeededPrng(2026);
    expect(typeof prng.next(0)).toBe("number");
  });

  test("different seeds produce different sequences", () => {
    const a = createPrng(1);
    const b = createPrng(2);
    const samples = [0, 100, 200, 300, 400];
    let differ = 0;
    for (const t of samples) {
      if (a.next(t) !== b.next(t)) {
        differ++;
      }
    }
    expect(differ).toBeGreaterThan(0);
  });
});
