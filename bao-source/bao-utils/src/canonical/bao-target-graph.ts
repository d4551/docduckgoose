import type { BaoInstallDependency as BaoManifestDependency } from "@baohaus/bao-schemas/bao-install/artifact.schemas";
import {
  BAO_INSTALL_TARGET_KINDS,
  type BaoInstallTargetKind,
} from "@baohaus/bao-schemas/bao-install/core.schemas";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTargetBase } from "@baohaus/bao-schemas/bao-install/targets.schemas";

export interface TargetDependency {
  readonly target: string;
  readonly version?: string;
  readonly required?: boolean;
}

export interface GraphBuildResult {
  readonly cyclicTargets: readonly string[];
  readonly orderedIds: readonly string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function isTargetDependency(value: unknown): value is TargetDependency {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.target !== "string" || value.target.length === 0) {
    return false;
  }
  if (value.version !== undefined && typeof value.version !== "string") {
    return false;
  }
  if (value.required !== undefined && typeof value.required !== "boolean") {
    return false;
  }
  return true;
}

export function getDependencyList(value: unknown): BaoManifestDependency[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((dependency): dependency is BaoManifestDependency =>
    isTargetDependency(dependency),
  );
}

function createGraphState(targetIds: readonly string[]): {
  adjacency: Map<string, Set<string>>;
  inDegree: Map<string, number>;
} {
  const adjacency = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  for (const targetId of targetIds) {
    adjacency.set(targetId, new Set());
    inDegree.set(targetId, 0);
  }

  return { adjacency, inDegree };
}

function appendGraphEdge(
  adjacency: Map<string, Set<string>>,
  inDegree: Map<string, number>,
  from: string,
  to: string,
): void {
  const neighbors = adjacency.get(from);
  if (!neighbors || neighbors.has(to)) {
    return;
  }
  neighbors.add(to);
  inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
}

function enqueueReadyTargets(
  targetIds: readonly string[],
  inDegree: Map<string, number>,
): string[] {
  return [...targetIds].filter((targetId) => (inDegree.get(targetId) ?? 0) === 0).sort();
}

function processGraphQueue(
  initialQueue: readonly string[],
  adjacency: Map<string, Set<string>>,
  inDegree: Map<string, number>,
): string[] {
  const queue: string[] = [...initialQueue];
  const orderedIds: string[] = [];

  while (queue.length > 0) {
    queue.sort();
    const current = queue.shift();
    if (current === undefined) {
      break;
    }
    orderedIds.push(current);

    for (const neighbor of adjacency.get(current) ?? []) {
      const nextDegree = (inDegree.get(neighbor) ?? 0) - 1;
      inDegree.set(neighbor, nextDegree);
      if (nextDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  return orderedIds;
}

function collectCyclicTargets(
  targetIds: readonly string[],
  orderedIds: readonly string[],
): string[] {
  const orderedSet = new Set(orderedIds);
  return targetIds.filter((targetId) => !orderedSet.has(targetId));
}

function appendDependencyEdges(
  target: BaoInstallTargetBase,
  targetIdSet: Set<string>,
  adjacency: Map<string, Set<string>>,
  inDegree: Map<string, number>,
): void {
  for (const dependency of getDependencyList(target.dependencies)) {
    if (targetIdSet.has(dependency.target)) {
      appendGraphEdge(adjacency, inDegree, dependency.target, target.target);
    }
  }
}

function appendBeforeEdges(
  target: BaoInstallTargetBase,
  targetIdSet: Set<string>,
  adjacency: Map<string, Set<string>>,
  inDegree: Map<string, number>,
): void {
  for (const beforeTarget of getStringList(target.before)) {
    if (targetIdSet.has(beforeTarget)) {
      appendGraphEdge(adjacency, inDegree, target.target, beforeTarget);
    }
  }
}

function appendAfterEdges(
  target: BaoInstallTargetBase,
  targetIdSet: Set<string>,
  adjacency: Map<string, Set<string>>,
  inDegree: Map<string, number>,
): void {
  for (const afterTarget of getStringList(target.after)) {
    if (targetIdSet.has(afterTarget)) {
      appendGraphEdge(adjacency, inDegree, afterTarget, target.target);
    }
  }
}

function appendTargetGraphEdges(
  target: BaoInstallTargetBase,
  targetIdSet: Set<string>,
  adjacency: Map<string, Set<string>>,
  inDegree: Map<string, number>,
): void {
  appendDependencyEdges(target, targetIdSet, adjacency, inDegree);
  appendBeforeEdges(target, targetIdSet, adjacency, inDegree);
  appendAfterEdges(target, targetIdSet, adjacency, inDegree);
}

export function buildDependencyGraph(manifest: BaoManifest): GraphBuildResult {
  const targetIds = manifest.targets.map((target) => target.target);
  const targetIdSet = new Set(targetIds);
  const { adjacency, inDegree } = createGraphState(targetIds);

  for (const target of manifest.targets) {
    appendTargetGraphEdges(target, targetIdSet, adjacency, inDegree);
  }

  const orderedIds = processGraphQueue(
    enqueueReadyTargets(targetIds, inDegree),
    adjacency,
    inDegree,
  );

  return {
    orderedIds,
    cyclicTargets: collectCyclicTargets(targetIds, orderedIds),
  };
}

export function isKnownTargetKind(value: string): value is BaoInstallTargetKind {
  return Object.values(BAO_INSTALL_TARGET_KINDS).some((targetKind) => targetKind === value);
}
