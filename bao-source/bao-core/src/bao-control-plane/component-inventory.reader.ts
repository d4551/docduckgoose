/**
 * Canonical component inventory reader.
 *
 * Single typed inventory reader consumed by package-pipeline, validation,
 * readiness checks, and validation tests. Uses BAO_CONTROL_PLANE_COMPONENT_INVENTORY_PATH
 * as the default relative path.
 *
 * @shared/bao-control-plane/component-inventory.reader
 */

import { BAO_CONTROL_PLANE_COMPONENT_INVENTORY_PATH } from "@baohaus/bao-constants/bao-control-plane-bootstrap-components";
import { path } from "@baohaus/bao-utils/bun-path";
import { parse as parseYaml } from "@baohaus/yaml-bao";

function normalizeOptionalString(value: unknown): string | null {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized.length > 0 ? normalized : null;
}

/**
 * Resolve the absolute component inventory path.
 *
 * @param repositoryRoot - Repository root directory.
 * @param overridePath - Optional path override (e.g. from BAO_CONTROL_PLANE_COMPONENT_INVENTORY_FILE).
 * @returns Absolute path to the component inventory file.
 */
export function resolveComponentInventoryPath(
  repositoryRoot: string,
  overridePath?: string | null,
): string {
  if (overridePath && overridePath.trim().length > 0) {
    return path.isAbsolute(overridePath) ? overridePath : path.join(repositoryRoot, overridePath);
  }
  return path.join(repositoryRoot, BAO_CONTROL_PLANE_COMPONENT_INVENTORY_PATH);
}

/**
 * Read and parse the component inventory, returning component names.
 *
 * @param repositoryRoot - Repository root directory.
 * @param overridePath - Optional path override (e.g. from BAO_CONTROL_PLANE_COMPONENT_INVENTORY_FILE).
 * @returns Sorted array of component names.
 */
export async function resolveInventoryComponents(
  repositoryRoot: string,
  overridePath?: string | null,
): Promise<string[]> {
  const inventoryPath = resolveComponentInventoryPath(repositoryRoot, overridePath);
  const text = await Bun.file(inventoryPath).text();
  const parsed: unknown = parseYaml(text);
  // Guard: extract components array from parsed YAML without type assertions
  const rawComponents: unknown[] =
    parsed &&
    typeof parsed === "object" &&
    !Array.isArray(parsed) &&
    "components" in parsed &&
    Array.isArray(parsed.components)
      ? parsed.components
      : [];
  return rawComponents
    .map((entry) => {
      if (entry && typeof entry === "object" && "name" in entry) {
        return normalizeOptionalString(entry.name);
      }
      return null;
    })
    .filter((name): name is string => name !== null)
    .sort((left, right) => left.localeCompare(right));
}
