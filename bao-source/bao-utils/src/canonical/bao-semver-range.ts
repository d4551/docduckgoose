/**
 * Minimum semver range evaluator used by the manifest validator Gate 14
 * (runtime-matrix). Supports `^`, `~`, `>=`, `<=`, `>`, `<`, exact,
 * `*`, conjunction (whitespace), and disjunction (`||`).
 */

const SEMVER_TRIPLET_PATTERN = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/u;

interface SemverTriplet {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}

function parseSemverTriplet(value: string): SemverTriplet | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const core = trimmed.split("-")[0]?.split("+")[0] ?? trimmed;
  const match = SEMVER_TRIPLET_PATTERN.exec(core);
  if (!match?.groups) {
    return null;
  }
  return {
    major: Number.parseInt(match.groups.major ?? "0", 10),
    minor: Number.parseInt(match.groups.minor ?? "0", 10),
    patch: Number.parseInt(match.groups.patch ?? "0", 10),
  };
}

function compareSemver(left: SemverTriplet, right: SemverTriplet): number {
  if (left.major !== right.major) {
    return left.major - right.major;
  }
  if (left.minor !== right.minor) {
    return left.minor - right.minor;
  }
  return left.patch - right.patch;
}

function satisfiesCaret(installed: SemverTriplet, bound: SemverTriplet): boolean {
  if (bound.major > 0) {
    return installed.major === bound.major && compareSemver(installed, bound) >= 0;
  }
  if (bound.minor > 0) {
    return (
      installed.major === 0 &&
      installed.minor === bound.minor &&
      compareSemver(installed, bound) >= 0
    );
  }
  return compareSemver(installed, bound) === 0;
}

function satisfiesTilde(installed: SemverTriplet, bound: SemverTriplet): boolean {
  return (
    installed.major === bound.major &&
    installed.minor === bound.minor &&
    compareSemver(installed, bound) >= 0
  );
}

function resolveComparator(trimmed: string): { readonly prefix: string; readonly rest: string } {
  const twoCharPrefixes = [">=", "<="] as const;
  for (const prefix of twoCharPrefixes) {
    if (trimmed.startsWith(prefix)) {
      return { prefix, rest: trimmed.slice(prefix.length) };
    }
  }
  const oneCharPrefixes = ["^", "~", ">", "<"] as const;
  for (const prefix of oneCharPrefixes) {
    if (trimmed.startsWith(prefix)) {
      return { prefix, rest: trimmed.slice(prefix.length) };
    }
  }
  return { prefix: "", rest: trimmed };
}

function satisfiesSingleComparator(installed: SemverTriplet, comparator: string): boolean {
  const trimmed = comparator.trim();
  if (trimmed.length === 0) {
    return true;
  }
  const parsed = resolveComparator(trimmed);
  const bound = parseSemverTriplet(parsed.rest);
  if (!bound) {
    return false;
  }
  switch (parsed.prefix) {
    case "^":
      return satisfiesCaret(installed, bound);
    case "~":
      return satisfiesTilde(installed, bound);
    case ">=":
      return compareSemver(installed, bound) >= 0;
    case "<=":
      return compareSemver(installed, bound) <= 0;
    case ">":
      return compareSemver(installed, bound) > 0;
    case "<":
      return compareSemver(installed, bound) < 0;
    default:
      return compareSemver(installed, bound) === 0;
  }
}

export function satisfiesSemverRange(installed: string, range: string): boolean {
  const installedTriplet = parseSemverTriplet(installed);
  if (!installedTriplet) {
    return false;
  }

  const rangeTrimmed = range.trim();
  if (rangeTrimmed.length === 0 || rangeTrimmed === "*") {
    return true;
  }

  const disjunctions = rangeTrimmed
    .split("||")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  if (disjunctions.length === 0) {
    return true;
  }

  return disjunctions.some((conjunction) =>
    conjunction
      .split(/\s+/u)
      .filter((comparator) => comparator.length > 0)
      .every((comparator) => satisfiesSingleComparator(installedTriplet, comparator)),
  );
}
