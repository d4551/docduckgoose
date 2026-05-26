import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import {
  getDependencyList,
  getStringList,
  isKnownTargetKind,
} from "@baohaus/bao-utils/canonical/bao-target-graph";
import type { ValidationIssue } from "./bao-install-validation.types.ts";

function appendMissingTargetIdIssue(issues: ValidationIssue[]): void {
  issues.push({
    pass: 3,
    code: "MISSING_TARGET_ID",
    message: "target.target is required",
    path: "targets[].target",
  });
}

function appendDeclaredTargetIssues(
  issues: ValidationIssue[],
  target: BaoManifest["targets"][number],
  seen: Set<string>,
): void {
  if (seen.has(target.target)) {
    issues.push({
      pass: 3,
      code: "DUPLICATE_TARGET",
      message: `Duplicate target id: ${target.target}`,
      path: `targets.${target.target}`,
    });
  }

  seen.add(target.target);

  if (!isKnownTargetKind(target.kind)) {
    issues.push({
      pass: 5,
      code: "UNKNOWN_TARGET_KIND",
      message: `Unknown target kind: ${target.kind}`,
      path: `targets.${target.target}.kind`,
    });
  }

  if (!target.target || target.target.length === 0) {
    issues.push({
      pass: 3,
      code: "MISSING_TARGET_TARGET",
      message: "target.target is required",
      path: `targets.${target.target}.target`,
    });
  }
}

export function appendTargetsStructureIssues(
  issues: ValidationIssue[],
  manifest: BaoManifest,
): Set<string> {
  if (!Array.isArray(manifest.targets) || manifest.targets.length === 0) {
    issues.push({
      pass: 1,
      code: "NO_TARGETS",
      message: "At least one target is required",
      path: "targets",
    });
    return new Set();
  }

  const seen = new Set<string>();

  for (const target of manifest.targets) {
    if (!target.target || target.target.length === 0) {
      appendMissingTargetIdIssue(issues);
    } else {
      appendDeclaredTargetIssues(issues, target, seen);
    }
  }

  return seen;
}

function appendBeforeReferenceIssues(
  issues: ValidationIssue[],
  targetId: string,
  before: readonly string[],
  declaredIds: Set<string>,
): Set<string> {
  const seenBefore = new Set<string>();

  for (const ref of before) {
    if (ref === targetId) {
      issues.push({
        pass: 4,
        code: "SELF_BEFORE",
        message: `Target ${targetId} cannot reference itself in before`,
        path: `targets.${targetId}.before`,
      });
    } else if (seenBefore.has(ref)) {
      issues.push({
        pass: 4,
        code: "DUPLICATE_BEFORE",
        message: `Target ${targetId} has duplicate before reference: ${ref}`,
        path: `targets.${targetId}.before`,
      });
    } else if (!declaredIds.has(ref)) {
      issues.push({
        pass: 4,
        code: "UNKNOWN_BEFORE_TARGET",
        message: `Unknown before target "${ref}" referenced by ${targetId}`,
        path: `targets.${targetId}.before`,
      });
    }

    seenBefore.add(ref);
  }

  return seenBefore;
}

function appendAfterReferenceIssues(
  issues: ValidationIssue[],
  targetId: string,
  after: readonly string[],
  declaredIds: Set<string>,
  seenBefore: Set<string>,
): void {
  const seenAfter = new Set<string>();

  for (const ref of after) {
    if (ref === targetId) {
      issues.push({
        pass: 4,
        code: "SELF_AFTER",
        message: `Target ${targetId} cannot reference itself in after`,
        path: `targets.${targetId}.after`,
      });
    } else if (seenAfter.has(ref)) {
      issues.push({
        pass: 4,
        code: "DUPLICATE_AFTER",
        message: `Target ${targetId} has duplicate after reference: ${ref}`,
        path: `targets.${targetId}.after`,
      });
    } else if (!declaredIds.has(ref)) {
      issues.push({
        pass: 4,
        code: "UNKNOWN_AFTER_TARGET",
        message: `Unknown after target "${ref}" referenced by ${targetId}`,
        path: `targets.${targetId}.after`,
      });
    } else if (seenBefore.has(ref)) {
      issues.push({
        pass: 4,
        code: "CONFLICTING_ORDERING",
        message: `Target ${targetId} cannot declare "${ref}" in both before and after`,
        path: `targets.${targetId}`,
      });
    }

    seenAfter.add(ref);
  }
}

function appendDependencyReferenceIssues(
  issues: ValidationIssue[],
  targetId: string,
  dependencies: unknown,
): void {
  const seenDependencies = new Set<string>();

  for (const dependency of getDependencyList(dependencies)) {
    if (dependency.target === targetId) {
      issues.push({
        pass: 4,
        code: "SELF_DEPENDENCY",
        message: `Target ${targetId} cannot depend on itself`,
        path: `targets.${targetId}.dependencies`,
      });
    } else if (seenDependencies.has(dependency.target)) {
      issues.push({
        pass: 4,
        code: "DUPLICATE_DEPENDENCY",
        message: `Duplicate dependency "${dependency.target}" on ${targetId}`,
        path: `targets.${targetId}.dependencies`,
      });
    }

    seenDependencies.add(dependency.target);
  }
}

export function appendOrderingIssues(
  issues: ValidationIssue[],
  manifest: BaoManifest,
  declaredIds: Set<string>,
): void {
  for (const target of manifest.targets) {
    const before = getStringList(target.before);
    const after = getStringList(target.after);
    const seenBefore = appendBeforeReferenceIssues(issues, target.target, before, declaredIds);

    appendAfterReferenceIssues(issues, target.target, after, declaredIds, seenBefore);
    appendDependencyReferenceIssues(issues, target.target, target.dependencies);
  }
}
