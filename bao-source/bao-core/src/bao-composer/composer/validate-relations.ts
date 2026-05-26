import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoComposerValidationIssue } from "../bao-composer-fragments-catalog";
import { collectDuplicateValues, normalizeTargetReferenceList } from "./utils";

type ManifestRelationGraph = {
  readonly targetIdSet: Set<string>;
  readonly adjacency: Map<string, string[]>;
  readonly inDegree: Map<string, number>;
};

function createManifestRelationGraph(manifest: BaoManifest): ManifestRelationGraph {
  const targetIdSet = new Set(manifest.targets.map((target) => target.target));
  const adjacency = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  for (const targetId of targetIdSet) {
    adjacency.set(targetId, []);
    inDegree.set(targetId, 0);
  }

  return { targetIdSet, adjacency, inDegree };
}

function appendManifestRelationEdge(graph: ManifestRelationGraph, from: string, to: string): void {
  graph.adjacency.get(from)?.push(to);
  graph.inDegree.set(to, (graph.inDegree.get(to) ?? 0) + 1);
}

function pushManifestDuplicateRelationIssues(
  targetId: string,
  before: readonly string[],
  after: readonly string[],
  dependencyTargets: readonly string[],
  issues: BaoComposerValidationIssue[],
): void {
  for (const duplicate of collectDuplicateValues(before)) {
    issues.push({
      path: `targets[${targetId}].before`,
      message: `Duplicate before ordering target "${duplicate}"`,
      severity: "error",
    });
  }
  for (const duplicate of collectDuplicateValues(after)) {
    issues.push({
      path: `targets[${targetId}].after`,
      message: `Duplicate after ordering target "${duplicate}"`,
      severity: "error",
    });
  }
  for (const duplicate of collectDuplicateValues(dependencyTargets)) {
    issues.push({
      path: `targets[${targetId}].dependencies`,
      message: `Duplicate dependency target "${duplicate}"`,
      severity: "error",
    });
  }
}

function validateManifestBeforeRelations(
  targetId: string,
  before: readonly string[],
  afterSet: ReadonlySet<string>,
  graph: ManifestRelationGraph,
  issues: BaoComposerValidationIssue[],
): void {
  for (const beforeTarget of before) {
    if (beforeTarget === targetId) {
      issues.push({
        path: `targets[${targetId}].before`,
        message: `Target "${targetId}" cannot declare itself in before ordering`,
        severity: "error",
      });
    }
    if (!graph.targetIdSet.has(beforeTarget)) {
      issues.push({
        path: `targets[${targetId}].before`,
        message: `Unknown before ordering target "${beforeTarget}"`,
        severity: "error",
      });
    }
    if (afterSet.has(beforeTarget)) {
      issues.push({
        path: `targets[${targetId}]`,
        message: `Conflicting ordering for "${beforeTarget}" in both before and after`,
        severity: "error",
      });
    }
    if (graph.targetIdSet.has(beforeTarget)) {
      appendManifestRelationEdge(graph, targetId, beforeTarget);
    }
  }
}

function validateManifestAfterRelations(
  targetId: string,
  after: readonly string[],
  graph: ManifestRelationGraph,
  issues: BaoComposerValidationIssue[],
): void {
  for (const afterTarget of after) {
    if (afterTarget === targetId) {
      issues.push({
        path: `targets[${targetId}].after`,
        message: `Target "${targetId}" cannot declare itself in after ordering`,
        severity: "error",
      });
    }
    if (!graph.targetIdSet.has(afterTarget)) {
      issues.push({
        path: `targets[${targetId}].after`,
        message: `Unknown after ordering target "${afterTarget}"`,
        severity: "error",
      });
    }
    if (graph.targetIdSet.has(afterTarget)) {
      appendManifestRelationEdge(graph, afterTarget, targetId);
    }
  }
}

function validateManifestDependencyRelations(
  target: BaoManifest["targets"][number],
  graph: ManifestRelationGraph,
  issues: BaoComposerValidationIssue[],
): void {
  for (const dependency of target.dependencies ?? []) {
    const dependencyTarget = dependency.target.trim();
    if (!dependencyTarget) {
      continue;
    }
    if (dependencyTarget === target.target) {
      issues.push({
        path: `targets[${target.target}].dependencies`,
        message: `Target "${target.target}" cannot depend on itself`,
        severity: "error",
      });
    }
    if (!graph.targetIdSet.has(dependencyTarget) && dependency.required !== false) {
      issues.push({
        path: `targets[${target.target}].dependencies`,
        message: `Required dependency target "${dependencyTarget}" is not declared`,
        severity: "error",
      });
    }
    if (graph.targetIdSet.has(dependencyTarget)) {
      appendManifestRelationEdge(graph, dependencyTarget, target.target);
    }
  }
}

function resolveManifestCycleNodes(graph: ManifestRelationGraph): string[] {
  const queue = [...graph.inDegree.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([targetId]) => targetId);
  let processed = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }
    processed += 1;
    for (const neighbor of graph.adjacency.get(current) ?? []) {
      const nextDegree = (graph.inDegree.get(neighbor) ?? 1) - 1;
      graph.inDegree.set(neighbor, nextDegree);
      if (nextDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  return processed < graph.targetIdSet.size
    ? [...graph.inDegree.entries()]
        .filter(([, degree]) => degree > 0)
        .map(([targetId]) => targetId)
        .sort((left, right) => left.localeCompare(right))
    : [];
}

export function validateManifestRelations(manifest: BaoManifest): BaoComposerValidationIssue[] {
  const issues: BaoComposerValidationIssue[] = [];
  const graph = createManifestRelationGraph(manifest);

  for (const target of manifest.targets) {
    const before = normalizeTargetReferenceList(target.before);
    const after = normalizeTargetReferenceList(target.after);
    const dependencyTargets = normalizeTargetReferenceList(
      (target.dependencies ?? []).map((dependency: { target: string }) => dependency.target),
    );
    pushManifestDuplicateRelationIssues(target.target, before, after, dependencyTargets, issues);
    const afterSet = new Set(after);
    validateManifestBeforeRelations(target.target, before, afterSet, graph, issues);
    validateManifestAfterRelations(target.target, after, graph, issues);
    validateManifestDependencyRelations(target, graph, issues);
  }

  const cyclicNodes = resolveManifestCycleNodes(graph);
  if (cyclicNodes.length > 0) {
    issues.push({
      path: "/targets",
      message: `Dependency cycle detected involving: ${cyclicNodes.join(", ")}`,
      severity: "error",
    });
  }
  return issues;
}
