/**
 * Canonical API plugin-group metadata derived from checked-in `.bao` archives.
 *
 * Runtime consumers import generated projection data instead of maintaining a
 * parallel TypeScript registry. This module owns the typed helper surface used
 * by the app and verification layers.
 *
 * @packageDocumentation
 */

import {
  BAO_API_PLUGIN_GROUP_CHAIN,
  BAO_API_PLUGIN_GROUP_DEFINITIONS,
} from "./bao-plugin-groups.generated.ts";

export { BAO_API_PLUGIN_GROUP_CHAIN, BAO_API_PLUGIN_GROUP_DEFINITIONS };

/** Canonical API plugin-group definition derived from checked-in `.bao` archives. */
export type BaoApiPluginGroupDefinition = (typeof BAO_API_PLUGIN_GROUP_DEFINITIONS)[number];
/** Authored archive name for a generated API plugin group. */
export type BaoApiPluginGroupArchiveName = BaoApiPluginGroupDefinition["archiveName"];
/** Runtime plugin group name projected from a `.bao` archive. */
export type BaoApiPluginGroupRuntimeName = BaoApiPluginGroupDefinition["runtimeName"];

const BAO_API_PLUGIN_GROUP_DEFINITION_BY_ARCHIVE_NAME = new Map<
  string,
  BaoApiPluginGroupDefinition
>(BAO_API_PLUGIN_GROUP_DEFINITIONS.map((definition) => [definition.archiveName, definition]));

/**
 * Resolve canonical API plugin-group metadata from an authored archive name.
 *
 * @param archiveName - Checked-in `.bao` archive manifest name.
 * @returns Group metadata when the archive is part of the API plugin graph.
 */
export function resolveBaoApiPluginGroupDefinition(
  archiveName: string,
): BaoApiPluginGroupDefinition | undefined {
  return BAO_API_PLUGIN_GROUP_DEFINITION_BY_ARCHIVE_NAME.get(archiveName);
}
