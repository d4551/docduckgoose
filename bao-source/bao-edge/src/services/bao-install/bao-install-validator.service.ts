/**
 * Full 9-pass validation pipeline for .bao manifests.
 */

import { BAO_INSTALL_TARGET_KIND_VALUES } from "@baohaus/bao-schemas/bao-install/core.schemas";
import {
  type BaoManifest,
  BaoManifestSchema,
  isBaoManifest,
} from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { Value } from "@baohaus/baobox/value";
import type { BaoInstallConfig } from "./bao-install-config.service.ts";
import { validateBaoManifestSource, verifyBaoManifestTrust } from "./bao-manifest-trust.service.ts";
import { getTargetHandler, hasTargetHandler } from "./bao-target-handler-registry.ts";

// Types

export interface BaoValidationIssue {
  readonly pass: number;
  readonly message: string;
  readonly target?: string;
}

export interface BaoValidationResult {
  readonly valid: boolean;
  readonly issues: BaoValidationIssue[];
  readonly resolvedInstallOrder: string[];
  readonly plan: string[];
  readonly targetHandlerWarnings: string[];
  readonly runtimeWarnings: string[];
}

// Allowlist

function matchAllowlistPattern(pattern: string, value: string): boolean {
  if (pattern === "*") {
    return true;
  }
  for (const p of pattern.split(",").map((s) => s.trim())) {
    if (p === "*" || p === value) {
      return true;
    }
    if (p.endsWith("*") && value.startsWith(p.slice(0, -1))) {
      return true;
    }
  }
  return false;
}

export function isTargetAllowed(
  kind: string,
  identifier: string,
  allowlist: Record<string, string | undefined>,
): boolean {
  return matchAllowlistPattern(allowlist[kind] ?? allowlist._default ?? "*", identifier);
}

// Topological Sort (Kahn)

function initGraph(targets: string[]): {
  inDegree: Map<string, number>;
  adjacency: Map<string, Set<string>>;
} {
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, Set<string>>();
  for (const t of targets) {
    inDegree.set(t, 0);
    adjacency.set(t, new Set());
  }
  return { inDegree, adjacency };
}

function populateEdges(
  edges: Map<string, Set<string>>,
  inDegree: Map<string, number>,
  adjacency: Map<string, Set<string>>,
): void {
  for (const [from, tos] of edges) {
    for (const to of tos) {
      adjacency.get(from)?.add(to);
      inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
    }
  }
}

function drainQueue(inDegree: Map<string, number>, adjacency: Map<string, Set<string>>): string[] {
  const queue: string[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  const sorted: string[] = [];
  while (queue.length > 0) {
    queue.sort();
    const node = queue.shift();
    if (node === undefined) {
      break;
    }
    sorted.push(node);
    const neighbors = adjacency.get(node);
    if (neighbors === undefined) {
      continue;
    }
    for (const neighbor of neighbors) {
      const deg = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, deg);
      if (deg === 0) {
        queue.push(neighbor);
      }
    }
  }
  return sorted;
}

function topologicalSort(
  targets: string[],
  edges: Map<string, Set<string>>,
): { sorted: string[]; cycles: string[] } {
  const { inDegree, adjacency } = initGraph(targets);
  populateEdges(edges, inDegree, adjacency);
  const sorted = drainQueue(inDegree, adjacency);
  const cycles = targets.filter((t) => !sorted.includes(t));
  return { sorted, cycles };
}

// Pass 4: Ordering checks (split into sub-functions)

function checkSelfReferences(t: BaoInstallTarget, issues: BaoValidationIssue[]): void {
  if (t.before?.includes(t.target)) {
    issues.push({
      pass: 4,
      message: `Target "${t.target}" references itself in "before"`,
      target: t.target,
    });
  }
  if (t.after?.includes(t.target)) {
    issues.push({
      pass: 4,
      message: `Target "${t.target}" references itself in "after"`,
      target: t.target,
    });
  }
}

function checkDuplicateOrderings(t: BaoInstallTarget, issues: BaoValidationIssue[]): void {
  if (t.before && new Set(t.before).size !== t.before.length) {
    issues.push({
      pass: 4,
      message: `Target "${t.target}" has duplicate entries in "before"`,
      target: t.target,
    });
  }
  if (t.after && new Set(t.after).size !== t.after.length) {
    issues.push({
      pass: 4,
      message: `Target "${t.target}" has duplicate entries in "after"`,
      target: t.target,
    });
  }
}

function checkRefExistence(
  refs: string[],
  direction: string,
  targetId: string,
  targetIds: Set<string>,
  issues: BaoValidationIssue[],
): void {
  for (const ref of refs) {
    if (!targetIds.has(ref)) {
      issues.push({
        pass: 4,
        message: `Target "${targetId}" references non-existent target "${ref}" in "${direction}"`,
        target: targetId,
      });
    }
  }
}

function checkDependencyExistence(
  t: BaoInstallTarget,
  targetIds: Set<string>,
  issues: BaoValidationIssue[],
): void {
  for (const dep of t.dependencies ?? []) {
    if (dep.required !== false && !targetIds.has(dep.target)) {
      issues.push({
        pass: 4,
        message: `Target "${t.target}" has required dependency on non-existent target "${dep.target}"`,
        target: t.target,
      });
    }
  }
}

function checkConflictingOrdering(t: BaoInstallTarget, issues: BaoValidationIssue[]): void {
  if (t.before && t.after) {
    for (const ref of t.before.filter((b) => t.after?.includes(b))) {
      issues.push({
        pass: 4,
        message: `Target "${t.target}" lists "${ref}" in both "before" and "after"`,
        target: t.target,
      });
    }
  }
}

function validateTargetOrdering(
  t: BaoInstallTarget,
  targetIds: Set<string>,
  issues: BaoValidationIssue[],
): void {
  checkSelfReferences(t, issues);
  checkDuplicateOrderings(t, issues);
  checkRefExistence(t.before ?? [], "before", t.target, targetIds, issues);
  checkRefExistence(t.after ?? [], "after", t.target, targetIds, issues);
  checkDependencyExistence(t, targetIds, issues);
  checkConflictingOrdering(t, issues);
}

// Edge building for cycle detection

function addBeforeEdges(
  t: BaoInstallTarget,
  targetIds: Set<string>,
  edges: Map<string, Set<string>>,
): void {
  for (const ref of t.before ?? []) {
    if (targetIds.has(ref)) {
      edges.get(t.target)?.add(ref);
    }
  }
}

function addAfterEdges(
  t: BaoInstallTarget,
  targetIds: Set<string>,
  edges: Map<string, Set<string>>,
): void {
  for (const ref of t.after ?? []) {
    if (targetIds.has(ref)) {
      edges.get(ref)?.add(t.target);
    }
  }
}

function addDepEdges(
  t: BaoInstallTarget,
  targetIds: Set<string>,
  edges: Map<string, Set<string>>,
): void {
  for (const dep of t.dependencies ?? []) {
    if (targetIds.has(dep.target)) {
      edges.get(dep.target)?.add(t.target);
    }
  }
}

function buildEdges(manifest: BaoManifest, targetIds: Set<string>): Map<string, Set<string>> {
  const edges = new Map<string, Set<string>>();
  for (const t of manifest.targets) {
    edges.set(t.target, new Set());
  }
  for (const target of manifest.targets) {
    addBeforeEdges(target, targetIds, edges);
    addAfterEdges(target, targetIds, edges);
    addDepEdges(target, targetIds, edges);
  }
  return edges;
}

// Policy & Trust Passes (7-9)

async function runPolicyAndTrustPasses(
  m: BaoManifest,
  config: BaoInstallConfig,
  issues: BaoValidationIssue[],
): Promise<void> {
  for (const msg of validateBaoManifestSource(m, { sourcePolicy: config.sourcePolicy }).issues) {
    issues.push({ pass: 7, message: msg });
  }
  for (const msg of (await verifyBaoManifestTrust(m, config.trustPolicy)).issues) {
    issues.push({ pass: 8, message: msg });
  }
  for (const target of m.targets) {
    if (!isTargetAllowed(target.kind, target.target, config.targetAllowlist)) {
      issues.push({
        pass: 9,
        message: `Target "${target.target}" of kind "${target.kind}" is not in the allowlist`,
        target: target.target,
      });
    }
  }
}

// Main Validation Pipeline

export async function validateBaoManifest(
  manifest: unknown,
  config: BaoInstallConfig,
): Promise<BaoValidationResult> {
  const issues: BaoValidationIssue[] = [];
  const targetHandlerWarnings: string[] = [];
  const runtimeWarnings: string[] = [];
  const empty = {
    valid: false,
    issues,
    resolvedInstallOrder: [],
    plan: [],
    targetHandlerWarnings,
    runtimeWarnings,
  };

  // Pass 1
  if (!Value.Check(BaoManifestSchema, manifest)) {
    for (const error of Value.Errors(BaoManifestSchema, manifest)) {
      issues.push({
        pass: 1,
        message: `Schema validation error at ${error.path}: ${error.message}`,
      });
    }
    return empty;
  }
  if (!isBaoManifest(manifest)) {
    return empty;
  }
  const m = manifest;

  // Pass 2
  if (m.schemaVersion !== 1) {
    issues.push({ pass: 2, message: `Schema version must be 1, got ${String(m.schemaVersion)}` });
  }
  if (
    m.metadata.minSchemaVersion !== undefined &&
    m.metadata.minSchemaVersion > config.supportedSchemaVersion
  ) {
    issues.push({
      pass: 2,
      message: `Manifest requires schema version ${String(m.metadata.minSchemaVersion)} but server supports ${String(config.supportedSchemaVersion)}`,
    });
  }

  // Pass 3
  const targetIds = new Set<string>();
  for (const target of m.targets) {
    if (targetIds.has(target.target)) {
      issues.push({
        pass: 3,
        message: `Duplicate target ID: "${target.target}"`,
        target: target.target,
      });
    }
    targetIds.add(target.target);
  }

  // Pass 4
  for (const target of m.targets) {
    validateTargetOrdering(target, targetIds, issues);
  }

  // Pass 5
  for (const target of m.targets) {
    runTargetHandlerValidation(target, issues);
  }

  // Pass 6
  const edges = buildEdges(m, targetIds);
  const names = m.targets.map((t) => t.target);
  const { sorted, cycles } = topologicalSort(names, edges);
  if (cycles.length > 0) {
    issues.push({
      pass: 6,
      message: `Dependency cycle detected involving targets: ${cycles.join(", ")}`,
    });
  }

  // Pass 7-9
  await runPolicyAndTrustPasses(m, config, issues);

  const plan = sorted.map((id) => {
    const t = m.targets.find((tgt) => tgt.target === id);
    return t ? `Install ${t.kind} "${id}"` : `Install "${id}"`;
  });

  return {
    valid: issues.length === 0,
    issues,
    resolvedInstallOrder: sorted,
    plan,
    targetHandlerWarnings,
    runtimeWarnings,
  };
}

function runTargetHandlerValidation(target: BaoInstallTarget, issues: BaoValidationIssue[]): void {
  const { kind } = target;
  if (!BAO_INSTALL_TARGET_KIND_VALUES.includes(kind)) {
    issues.push({ pass: 5, message: `Unknown target kind: "${kind}"`, target: target.target });
    return;
  }
  if (!hasTargetHandler(kind)) {
    issues.push({
      pass: 5,
      message: `No target handler registered for kind "${kind}" on target "${target.target}"`,
      target: target.target,
    });
    return;
  }
  const targetHandler = getTargetHandler(kind);
  if (targetHandler?.validate) {
    for (const issue of targetHandler.validate(target)) {
      if (issue.severity === "error") {
        issues.push({
          pass: 5,
          message: issue.path ? `${issue.path}: ${issue.message}` : issue.message,
          target: target.target,
        });
      }
    }
  }
}

// Public Helpers

export function validateDependencyGraph(
  targets: ReadonlyArray<{
    target: string;
    before?: string[];
    after?: string[];
    dependencies?: Array<{ target: string }>;
  }>,
): { valid: boolean; cycles: string[]; sorted: string[] } {
  const names = targets.map((t) => t.target);
  const targetSet = new Set(names);
  const edges = new Map<string, Set<string>>();
  for (const name of names) {
    edges.set(name, new Set());
  }
  for (const target of targets) {
    addEdgesFromTarget(target, targetSet, edges);
  }
  const { sorted, cycles } = topologicalSort(names, edges);
  return { valid: cycles.length === 0, cycles, sorted };
}

function addEdgesFromTarget(
  target: {
    target: string;
    before?: string[];
    after?: string[];
    dependencies?: Array<{ target: string }>;
  },
  targetSet: Set<string>,
  edges: Map<string, Set<string>>,
): void {
  for (const ref of target.before ?? []) {
    if (targetSet.has(ref)) {
      edges.get(target.target)?.add(ref);
    }
  }
  for (const ref of target.after ?? []) {
    if (targetSet.has(ref)) {
      edges.get(ref)?.add(target.target);
    }
  }
  for (const dep of target.dependencies ?? []) {
    if (targetSet.has(dep.target)) {
      edges.get(dep.target)?.add(target.target);
    }
  }
}

export function validateTargetAllowlist(
  targets: ReadonlyArray<{ kind: string; target: string }>,
  allowlist: Record<string, string | undefined>,
): { valid: boolean; denied: string[] } {
  const denied: string[] = [];
  for (const target of targets) {
    if (!isTargetAllowed(target.kind, target.target, allowlist)) {
      denied.push(target.target);
    }
  }
  return { valid: denied.length === 0, denied };
}
