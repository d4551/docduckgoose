import { describe, expect, it } from "bun:test";
import { dayjs } from "../src/index.ts";

describe("dayjs.add / subtract", () => {
  const base = dayjs("2024-01-15T12:00:00Z");

  it("adds years", () => {
    expect(base.add(2, "year").year).toBe(2026);
  });

  it("adds months", () => {
    expect(base.add(1, "month").month).toBe(1); // 0-based → Feb
  });

  it("adds days", () => {
    expect(base.add(10, "day").date).toBe(25);
  });

  it("adds hours", () => {
    expect(base.add(3, "hour").hour).toBe(base.hour + 3);
  });

  it("adds minutes", () => {
    expect(base.add(30, "minute").minute).toBe(30);
  });

  it("adds seconds", () => {
    expect(base.add(45, "second").second).toBe(45);
  });

  it("adds milliseconds", () => {
    const ms = base.add(500, "millisecond");
    expect(ms.millisecond).toBe(500);
  });

  it("subtract delegates to add with negative", () => {
    expect(base.subtract(1, "day").date).toBe(14);
  });

  it("subtract months", () => {
    expect(base.subtract(1, "month").month).toBe(11); // Dec (0-based)
  });

  it("add is immutable — original unchanged", () => {
    const d2 = base.add(1, "year");
    expect(base.year).toBe(2024);
    expect(d2.year).toBe(2025);
  });
});

describe("dayjs.diff", () => {
  it("diff in milliseconds", () => {
    const a = dayjs(0);
    const b = dayjs(5000);
    expect(b.diff(a, "millisecond")).toBe(5000);
  });

  it("diff in seconds", () => {
    const a = dayjs(0);
    const b = dayjs(10_000);
    expect(b.diff(a, "second")).toBe(10);
  });

  it("diff in minutes", () => {
    const a = dayjs(0);
    const b = dayjs(120_000);
    expect(b.diff(a, "minute")).toBe(2);
  });

  it("diff in hours", () => {
    const a = dayjs(0);
    const b = dayjs(7_200_000);
    expect(b.diff(a, "hour")).toBe(2);
  });

  it("diff in days", () => {
    const a = dayjs("2024-01-01");
    const b = dayjs("2024-01-11");
    expect(b.diff(a, "day")).toBe(10);
  });

  it("negative diff when other is later", () => {
    const a = dayjs(5000);
    const b = dayjs(0);
    expect(b.diff(a, "second")).toBe(-5);
  });

  it("default unit is millisecond", () => {
    const a = dayjs(0);
    const b = dayjs(1000);
    expect(b.diff(a)).toBe(1000);
  });
});
