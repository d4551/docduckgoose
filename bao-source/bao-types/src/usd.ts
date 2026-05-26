/**
 * Shared OpenUSD asset API types.
 *
 * Defines response payloads for USD asset storage and retrieval.
 *
 * @shared/types/usd.ts
 */

/**
 * USD asset record returned by the backend API.
 */
export interface UsdAssetDto {
  id: string;
  name: string;
  format: string | null;
  fileName: string;
  mimeType: string | null;
  storagePath: string | null;
  storageProvider: string | null;
  storageBucket: string | null;
  storageKey: string | null;
  fileSize: string | null;
  checksum: string | null;
  metadata: unknown;
  createdAt: string;
  updatedAt: string;
  /** Whether this USDZ file has been validated for ARKit compatibility. */
  arCompatible?: boolean | undefined;
  /** GLB/GLTF variant URL for Android Scene Viewer (if converted). */
  glbVariantUrl?: string | undefined;
  /** Presigned URL for AR Quick Look viewing (USDZ). */
  arQuicklookUrl?: string | undefined;
}

/**
 * AR viewing URLs for a USD asset.
 */
export interface UsdArUrls {
  /** USDZ file URL for iOS AR Quick Look. */
  usdz: string;
  /** GLB/GLTF file URL for Android Scene Viewer (optional). */
  glb?: string;
  /** Whether the asset is AR-compatible. */
  arCompatible: boolean;
}

/**
 * USD asset AR capabilities response.
 */
export type UsdAssetArUrlsResponse =
  | {
      ok: true;
      data: UsdArUrls;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };

/**
 * USD asset list response payload.
 */
export type UsdAssetsResponse =
  | {
      ok: true;
      items: UsdAssetDto[];
      total: number;
      limit: number;
      offset: number;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };

/**
 * USD asset detail response payload.
 */
export type UsdAssetResponse =
  | {
      ok: true;
      data: UsdAssetDto;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };

/**
 * Queue response for scan session -> USD asset promotion.
 *
 * When queues are disabled, the server may run inline and return `queued: false` with the created asset.
 */
export type UsdScanSessionQueueResponse =
  | {
      ok: true;
      queued: boolean;
      jobId: string | null;
      asset?: UsdAssetDto;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };

/**
 * Job status response for scan session -> USD queue jobs.
 */
export type UsdScanSessionJobStatusResponse =
  | {
      ok: true;
      job: {
        id: string;
        state: string;
        createdOn: string;
        startedOn: string | null;
        completedOn: string | null;
        output: Record<string, unknown> | null;
      };
    }
  | { ok: false; error: string; code?: string };

// ARKit Validation Types

/**
 * Supported USD validation profiles.
 */
export type UsdValidationProfile = "arkit" | "visionos" | "web";

/**
 * Texture validation summary for USD assets.
 */
export interface UsdValidationTextureMetrics {
  /** Total number of textures discovered. */
  count: number;
  /** Largest texture dimension observed. */
  maxDimension: number;
  /** Estimated total texture memory usage in bytes. */
  totalMemoryBytes: number;
  /** Largest texture entry observed. */
  largestTexture?: {
    name: string;
    width: number;
    height: number;
    memoryBytes: number;
  };
}

/**
 * Validation metrics for USD assets.
 */
export interface UsdValidationMetrics {
  textures: UsdValidationTextureMetrics;
}

/**
 * ARKit validation result for USDZ assets.
 *
 * Contains compatibility status and any warnings/errors from validation.
 */
export interface UsdValidationResult {
  /** Whether the asset passes ARKit compatibility checks. */
  compatible: boolean;
  /** Non-blocking warnings (e.g., high polygon count but within limits). */
  warnings: string[];
  /** Blocking errors that prevent ARKit compatibility. */
  errors: string[];
  /** Validation profile used for the check. */
  profile?: UsdValidationProfile | undefined;
  /** Additional validation metrics. */
  metrics?: UsdValidationMetrics | undefined;
  /** ISO timestamp when validation was performed. */
  checkedAt: string;
}

/**
 * AR viewing URLs for platform-specific viewers.
 *
 * Provides URLs for iOS AR Quick Look (USDZ) and Android Scene Viewer (GLB).
 */
export interface UsdAssetArViewingUrls {
  /** USDZ file URL for iOS AR Quick Look. */
  usdzUrl: string;
  /** GLB/GLTF file URL for Android Scene Viewer (if available). */
  glbUrl?: string | undefined;
  /** Whether ARKit validation passed. */
  arCompatible: boolean;
  /** Recommended platform for viewing. */
  platform: "ios-quicklook" | "android-scene-viewer" | "webxr-ar" | "unsupported";
}

/**
 * USD asset validation response payload.
 */
export type UsdValidationResponse =
  | {
      ok: true;
      data: UsdValidationResult;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };

/**
 * USD asset AR viewing URLs response payload.
 */
export type UsdAssetArViewingUrlsResponse =
  | {
      ok: true;
      data: UsdAssetArViewingUrls;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };
