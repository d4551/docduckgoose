/**
 * Deterministic dependency ordering utilities.
 *
 * Centralizes stable Kahn-style dependency ordering so lifecycle orchestration
 * surfaces do not duplicate graph logic with slight drift.
 *
 * @packageDocumentation
 */

/**
 * Options for deterministic dependency ordering.
 *
 * @typeParam TItem - Item shape to order.
 */
export interface DeterministicDependencyOrderOptions<TItem> {
  /** Candidate items to order. */
  items: readonly TItem[];
  /** Resolve a stable identifier for an item. */
  getId: (item: TItem) => string;
  /** Resolve ordered dependency identifiers for an item. */
  getDependencies: (item: TItem) => readonly string[];
  /** Optional comparator for ready items. */
  compareItems?: (left: TItem, right: TItem) => number;
  /** Optional duplicate-id error message factory. */
  duplicateIdErrorMessage?: (id: string) => string;
  /** Optional missing-dependency error message factory. */
  missingDependencyErrorMessage?: (item: TItem, dependencyId: string) => string;
  /** Optional dependency-cycle error message factory. */
  cycleErrorMessage?: (unresolvedIds: readonly string[]) => string;
}

interface DependencyOrderGraph<TItem> {
  byId: Map<string, TItem>;
  indegree: Map<string, number>;
  outgoing: Map<string, Set<string>>;
}

/**
 * Resolve deterministic dependency order using Kahn's algorithm with stable tie-breaking.
 *
 * @typeParam TItem - Item shape to order.
 * @param options - Deterministic ordering options.
 * @returns Ordered items.
 */
export function resolveDeterministicDependencyOrder<TItem>(
  options: DeterministicDependencyOrderOptions<TItem>,
): TItem[] {
  const { items, getId, getDependencies } = options;
  const compareItems =
    options.compareItems ??
    ((left: TItem, right: TItem): number => compareIds(getId(left), getId(right)));
  const graph = initializeGraph(items, getId, options.duplicateIdErrorMessage);
  registerDependencies(graph, items, getId, getDependencies, options.missingDependencyErrorMessage);
  const ready = buildReadyQueue(items, graph.indegree, getId, compareItems);
  const ordered: TItem[] = [];
  const orderedIds = new Set<string>();

  while (ready.length > 0) {
    const item = ready.shift();
    if (!item) {
      break;
    }

    const id = getId(item);
    ordered.push(item);
    orderedIds.add(id);
    ready.push(...resolveNextReadyItems(graph, id));
    ready.sort(compareItems);
  }

  if (ordered.length === items.length) {
    return ordered;
  }

  const unresolvedIds = [...new Set(items.map(getId))]
    .filter((id) => !orderedIds.has(id))
    .sort(compareIds);
  throw new Error(
    options.cycleErrorMessage?.(unresolvedIds) ??
      `Dependency cycle detected: unresolved=[${unresolvedIds.join(", ")}]`,
  );
}

function compareIds(left: string, right: string): number {
  return left.localeCompare(right, "en");
}

function initializeGraph<TItem>(
  items: readonly TItem[],
  getId: (item: TItem) => string,
  duplicateIdErrorMessage?: (id: string) => string,
): DependencyOrderGraph<TItem> {
  const graph: DependencyOrderGraph<TItem> = {
    byId: new Map<string, TItem>(),
    indegree: new Map<string, number>(),
    outgoing: new Map<string, Set<string>>(),
  };

  for (const item of items) {
    const id = getId(item);
    if (graph.byId.has(id)) {
      throw new Error(
        duplicateIdErrorMessage?.(id) ?? `Duplicate dependency item id "${id}" detected.`,
      );
    }
    graph.byId.set(id, item);
    graph.indegree.set(id, 0);
    graph.outgoing.set(id, new Set<string>());
  }

  return graph;
}

function registerDependencies<TItem>(
  graph: DependencyOrderGraph<TItem>,
  items: readonly TItem[],
  getId: (item: TItem) => string,
  getDependencies: (item: TItem) => readonly string[],
  missingDependencyErrorMessage?: (item: TItem, dependencyId: string) => string,
): void {
  for (const item of items) {
    const id = getId(item);
    for (const dependencyId of normalizeDependencyIds(getDependencies(item))) {
      if (!graph.byId.has(dependencyId)) {
        throw new Error(
          missingDependencyErrorMessage?.(item, dependencyId) ??
            `Dependency item "${id}" depends on missing item "${dependencyId}".`,
        );
      }

      const dependents = graph.outgoing.get(dependencyId);
      if (!dependents || dependents.has(id)) {
        continue;
      }

      dependents.add(id);
      graph.indegree.set(id, (graph.indegree.get(id) ?? 0) + 1);
    }
  }
}

function buildReadyQueue<TItem>(
  items: readonly TItem[],
  indegree: ReadonlyMap<string, number>,
  getId: (item: TItem) => string,
  compareItems: (left: TItem, right: TItem) => number,
): TItem[] {
  return [...items].filter((item) => (indegree.get(getId(item)) ?? 0) === 0).sort(compareItems);
}

function resolveNextReadyItems<TItem>(graph: DependencyOrderGraph<TItem>, id: string): TItem[] {
  const dependents = graph.outgoing.get(id);
  if (!dependents) {
    return [];
  }

  const nextReady: TItem[] = [];
  for (const dependentId of dependents) {
    const nextIndegree = (graph.indegree.get(dependentId) ?? 0) - 1;
    graph.indegree.set(dependentId, nextIndegree);
    if (nextIndegree !== 0) {
      continue;
    }
    const dependent = graph.byId.get(dependentId);
    if (dependent) {
      nextReady.push(dependent);
    }
  }

  return nextReady;
}

function normalizeDependencyIds(dependencyIds: readonly string[]): string[] {
  return [...new Set(dependencyIds.map((dependencyId) => dependencyId.trim()))].filter(
    (dependencyId) => dependencyId.length > 0,
  );
}
