/**
 * MCP normalization helpers.
 *
 * Centralizes stable sorting/deduplication for MCP resources, tools, and
 * templates so list responses and context bundles stay deterministic.
 *
 * @shared/utils/mcp
 */

type KeySelector<T> = (item: T) => string;

type WithName = { name: string };
type WithUri = { uri: string };
type WithUriTemplate = { uriTemplate: string };

function dedupeByKey<T>(items: T[], keySelector: KeySelector<T>): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of items) {
    const key = keySelector(item);
    if (!key) {
      result.push(item);
      continue;
    }
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(item);
  }

  return result;
}

function compareOptional(a?: string, b?: string): number {
  return (a ?? "").localeCompare(b ?? "");
}

/**
 * Normalize MCP tool definitions with deterministic ordering.
 *
 * @param tools - Tool list to normalize.
 * @returns Sorted + deduped tool list.
 */
export function normalizeMcpToolDefinitions<T extends WithName>(tools: T[]): T[] {
  const deduped = dedupeByKey(tools, (tool) => tool.name);
  return [...deduped].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Normalize MCP resource definitions with deterministic ordering.
 *
 * @param resources - Resource list to normalize.
 * @returns Sorted + deduped resource list.
 */
export function normalizeMcpResourceDefinitions<T extends WithUri & Partial<WithName>>(
  resources: T[],
): T[] {
  const deduped = dedupeByKey(resources, (resource) => resource.uri);
  return [...deduped].sort((a, b) => {
    const uriCompare = a.uri.localeCompare(b.uri);
    if (uriCompare !== 0) {
      return uriCompare;
    }
    return compareOptional(a.name, b.name);
  });
}

/**
 * Normalize MCP resource template definitions with deterministic ordering.
 *
 * @param templates - Template list to normalize.
 * @returns Sorted + deduped template list.
 */
export function normalizeMcpResourceTemplateDefinitions<
  T extends WithUriTemplate & Partial<WithName>,
>(templates: T[]): T[] {
  const deduped = dedupeByKey(templates, (template) => template.uriTemplate);
  return [...deduped].sort((a, b) => {
    const templateCompare = a.uriTemplate.localeCompare(b.uriTemplate);
    if (templateCompare !== 0) {
      return templateCompare;
    }
    return compareOptional(a.name, b.name);
  });
}

/**
 * Normalize MCP context bundles to keep tools/resources deterministic.
 *
 * @param context - MCP context payload.
 * @returns Normalized context payload.
 */
export function normalizeMcpContextBundle<
  T extends { tools: WithName[]; resources: WithUri[]; templates?: WithUriTemplate[] },
>(context: T): T {
  return {
    ...context,
    tools: normalizeMcpToolDefinitions(context.tools),
    resources: normalizeMcpResourceDefinitions(context.resources),
    ...(context.templates
      ? { templates: normalizeMcpResourceTemplateDefinitions(context.templates) }
      : {}),
  };
}
