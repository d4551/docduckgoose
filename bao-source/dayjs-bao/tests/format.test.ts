import { describe, expect, it } from "bun:test";
import { dayjs } from "../src/index.ts";

// Use a fixed UTC-based date to avoid timezone drift in CI
const D = new Date("2024-03-15T09:05:07.000Z");
const DEFAULT_FORMAT_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/u;

describe("dayjs.format", () => {
  it("default format YYYY-MM-DD HH:mm:ss", () => {
    const d = dayjs(D);
    const out = d.format();
    expect(out).toMatch(DEFAULT_FORMAT_PATTERN);
  });

  it("YYYY-MM-DD", () => {
    const d = dayjs(D);
    // year / month / date should be present
    expect(d.format("YYYY")).toBe(String(d.year));
    expect(d.format("MM")).toBe(String(d.month + 1).padStart(2, "0"));
    expect(d.format("DD")).toBe(String(d.date).padStart(2, "0"));
  });

  it("HH:mm:ss", () => {
    const d = dayjs(D);
    expect(d.format("HH:mm:ss")).toBe(
      [
        String(d.hour).padStart(2, "0"),
        String(d.minute).padStart(2, "0"),
        String(d.second).padStart(2, "0"),
      ].join(":"),
    );
  });

  it("custom literal template", () => {
    const d = dayjs(new Date("2024-01-02T03:04:05Z"));
    const out = d.format("YYYY/MM/DD");
    // Contains year and slash-separated components
    expect(out).toContain("/");
    expect(out.split("/")).toHaveLength(3);
  });

  it("preserves non-token characters", () => {
    const d = dayjs(D);
    const out = d.format("Year: YYYY");
    expect(out.startsWith("Year: ")).toBe(true);
  });
});
