/**
 * Extension ABI Contract.
 *
 * Defines the shared type contract for `.bao` extension runtime manifests,
 * target handler interfaces, and extension kind registry. All seven target kinds
 * (`bao-package`, `htmx-extension`, `prisma-extension`, `better-auth-extension`,
 * `elysia-plugin`, `bun-plugin`, `flatbuffer-schema`) conform to this contract.
 *
 * @packageDocumentation
 */

/**
 * All supported `.bao` extension kinds.
 */
export type BaoExtensionKind =
  | "bao-package"
  | "htmx-extension"
  | "prisma-extension"
  | "better-auth-extension"
  | "elysia-plugin"
  | "bun-plugin"
  | "flatbuffer-schema";

/**
 * Factory kind describes how an extension is instantiated at runtime.
 */
export type ExtensionFactoryKind =
  | "singleton"
  | "per-request"
  | "per-scope"
  | "static-asset"
  | "codegen";

/**
 * Cold start classification for build/deploy scheduling.
 */
export type ColdStartClass = "fast" | "moderate" | "slow";

/**
 * Runtime manifest emitted when an extension is loaded and validated.
 *
 * Provides enough metadata for cache keying, precedence resolution,
 * health introspection, and dependency graph construction.
 */
export interface ExtensionRuntimeManifest {
  /** Unique module identifier (Bao package name, file path, etc.). */
  moduleId: string;

  /** Runtime scope where this extension is active. */
  scope: string;

  /** ABI version used to validate target handler/runtime contract alignment. */
  abiVersion: number;

  /** Extension kind. */
  kind: BaoExtensionKind;

  /** How the extension is instantiated. */
  factoryKind: ExtensionFactoryKind;

  /** Required scopes this extension depends on. */
  requiredScopes: string[];

  /** Module IDs of extensions this depends on. */
  dependencies: string[];

  /** Health hint URI or diagnostic identifier. */
  healthHint?: string;

  /** Cold start classification for scheduling. */
  coldStartClass: ColdStartClass;

  /** Whether instances can be reused across requests within the same process. */
  supportsReuse: boolean;

  /**
   * Opaque fingerprint for cache invalidation.
   *
   * Computed from module content hash, version, and config hash.
   */
  runtimeFingerprint: string;

  /** ISO-8601 timestamp when the extension was loaded. */
  loadedAt: string;
}

/**
 * Extension target handler interface for the `.bao` install system.
 *
 * Target handlers implement detection, loading, validation, descriptor building,
 * and unloading for a specific extension kind.
 */
export interface ExtensionAdapter {
  /** Extension kind this adapter handles. */
  readonly kind: BaoExtensionKind;

  /**
   * Detect whether a given module path or descriptor matches this adapter.
   *
   * @param moduleId - Module identifier to detect.
   * @returns True if this adapter can handle the module.
   */
  detect(moduleId: string): Promise<boolean>;

  /**
   * Load and initialise the extension, producing a runtime manifest.
   *
   * @param moduleId - Module identifier to load.
   * @param scope - Runtime scope.
   * @returns Runtime manifest, or null if loading fails.
   */
  load(moduleId: string, scope: string): Promise<ExtensionRuntimeManifest | null>;

  /**
   * Validate that the extension conforms to its expected shape.
   *
   * @param moduleId - Module identifier to validate.
   * @returns True if valid, false if not.
   */
  validate(moduleId: string): Promise<boolean>;

  /**
   * Build a descriptor from the extension for persistence.
   *
   * @param manifest - Runtime manifest to build from.
   * @returns Descriptor record for storage.
   */
  buildDescriptor(manifest: ExtensionRuntimeManifest): Record<string, unknown>;

  /**
   * Unload and clean up the extension.
   *
   * @param manifest - Runtime manifest of the extension to unload.
   */
  unload(manifest: ExtensionRuntimeManifest): Promise<void>;
}

/**
 * Composite cache key for extension manifests.
 *
 * Used to look up cached extension instances within the integration boundary.
 */
export interface ExtensionCacheKey {
  /** Module identifier. */
  moduleId: string;

  /** Runtime scope. */
  scope: string;

  /** Runtime fingerprint. */
  runtimeFingerprint: string;
}

/**
 * Build a string cache key from an extension cache key object.
 *
 * @param key - Cache key components.
 * @returns Concatenated cache key string.
 */
export function buildExtensionCacheKey(key: ExtensionCacheKey): string {
  return `${key.moduleId}:${key.scope}:${key.runtimeFingerprint}`;
}

/**
 * Default ABI version for extensions that do not declare one.
 */
export const DEFAULT_ABI_VERSION = 1;
