import type { ParsedRange } from "../internal/types";

function parseRangePart(rangeBoundary: string): number | null {
  const parsed = Number(rangeBoundary);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function parseSuffixRange(endText: string, size: number): ParsedRange {
  const suffixLength = parseRangePart(endText);
  if (suffixLength === null) {
    return { kind: "invalid" };
  }

  const normalizedSuffixLength = Math.min(suffixLength, size);
  return {
    kind: "satisfiable",
    start: size - normalizedSuffixLength,
    end: size - 1,
  };
}

function parseByteRange(startText: string, endText: string, size: number): ParsedRange {
  const start = parseRangePart(startText);
  if (start === null) {
    return { kind: "invalid" };
  }

  const end = endText === "" ? size - 1 : parseRangePart(endText);
  if (end === null) {
    return { kind: "invalid" };
  }

  if (start > end) {
    return { kind: "invalid" };
  }

  if (start >= size) {
    return { kind: "unsatisfiable", size };
  }

  return {
    kind: "satisfiable",
    start,
    end: Math.min(end, size - 1),
  };
}

function parseRangeValue(value: string, size: number): ParsedRange {
  if (value === "" || value.includes(",") || !value.includes("-")) {
    return { kind: "invalid" };
  }

  const [startText, endText] = value.split("-", 2).map((segment) => segment.trim());
  if (startText === "" && endText === "") {
    return { kind: "invalid" };
  }

  if (startText === "") {
    return parseSuffixRange(endText, size);
  }

  return parseByteRange(startText, endText, size);
}

export function parseRangeHeader(rangeHeader: string, size: number): ParsedRange {
  if (!Number.isInteger(size) || size <= 0) {
    return { kind: "unsatisfiable", size: Math.max(0, size) };
  }

  const rangeValue = rangeHeader.startsWith("bytes=") ? rangeHeader.slice(6).trim() : null;
  if (rangeValue === null) {
    return { kind: "none" };
  }

  if (rangeValue === "" || rangeValue.includes(",") || !rangeValue.includes("-")) {
    return { kind: "invalid" };
  }

  return parseRangeValue(rangeValue, size);
}
