/**
 * Spatial geospatial and tile integration summary types.
 *
 * @shared/types/spatial-geospatial-tile-integration.ts
 */

/** Spatial geospatial/tile integration capability summary for XR API consumers. */
export interface SpatialGeospatialTileIntegrationSummary {
  /** True when viewer tile streaming can be offered without fake success. */
  enabled: boolean;
  /** ISO timestamp for the snapshot. */
  timestamp: string;
  /** Subsystem owner team/domain. */
  owner: string;
  /** Audit tier: stub until persistence/serving ships. */
  auditStatus: "stub" | "partial" | "implemented";
  /** HTTP status tile pipeline APIs should return when unavailable. */
  httpStatus: 501 | 200;
  /** Operator-facing reason code. */
  reason: string;
  /** Canonical capability registry identifiers. */
  capabilityIds: readonly string[];
  /** Healthy harvested capability identifiers from runtime `.bao` mounts. */
  harvestedCapabilityIds: readonly string[];
  /** Geospatial placement contracts available. */
  geospatialAvailable: boolean;
  /** Tile tileset contracts available. */
  tileTilesetAvailable: boolean;
  /** Tile pipeline serving available. */
  tilePipelineAvailable: boolean;
  /** Viewer tile streaming available. */
  viewerTileStreamingAvailable: boolean;
  /** Schema contract references. */
  contracts: {
    geospatial: string;
    tileTileset: string;
  };
  /** Primary runtime implementation reference. */
  runtimeRef: string;
}
