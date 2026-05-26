/**
 * Deep-partial helper type.
 *
 * Used across server/client to represent nested partial updates without falling back to `any`.
 *
 * @shared/types/deep-partial
 */

/**
 * Recursively mark object properties optional.
 *
 * Arrays are preserved as-is; nested object members become optional.
 *
 * Note: This is intended for JSON-like data (config, request payload patches, etc.).
 * It does not attempt to preserve callable signatures for function types.
 *
 * T - Input type.
 */
export type DeepPartial<T> =
  T extends ReadonlyArray<infer U>
    ? DeepPartial<U>[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;
