import { describe, expect, it } from "bun:test";
import { dayjs } from "../src/index.ts";

describe("dayjs — parsing and accessors", () => {
  it("creates dayjs from ISO string", () => {
    const d = dayjs("2024-06-15");
    expect(d.year).toBe(2024);
    // month is 0-based
    expect(d.month).toBe(5);
    expect(d.date).toBe(15);
  });

  it("creates dayjs from epoch milliseconds", () => {
    const epoch = Date.UTC(2000, 0, 1); // 2000-01-01T00:00:00Z
    const d = dayjs(epoch);
    expect(d.year).toBe(2000);
  });

  it("creates dayjs from Date object", () => {
    const date = new Date("2023-12-31T23:59:59Z");
    const d = dayjs(date);
    expect(d.year).toBe(2023);
    expect(d.second).toBe(59);
  });

  it("dayjs() without arg creates current time", () => {
    const before = Date.now();
    const d = dayjs();
    const after = Date.now();
    expect(d.valueOf()).toBeGreaterThanOrEqual(before);
    expect(d.valueOf()).toBeLessThanOrEqual(after);
  });

  it("toDate returns a new Date instance", () => {
    const d = dayjs("2024-01-01");
    const date = d.toDate();
    expect(date).toBeInstanceOf(Date);
    expect(date.getFullYear()).toBe(2024);
  });

  it("toDate is a copy — mutating it does not affect dayjs", () => {
    const d = dayjs("2024-01-01");
    const date = d.toDate();
    date.setFullYear(1999);
    expect(d.year).toBe(2024);
  });

  it("valueOf returns epoch ms", () => {
    const epoch = Date.UTC(2024, 0, 1);
    const d = dayjs(epoch);
    expect(d.valueOf()).toBe(epoch);
  });
});
