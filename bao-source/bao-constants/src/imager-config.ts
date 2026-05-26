/**
 * Shared imager capture defaults and limits.
 *
 * Centralizes capture configuration so client + server stay aligned.
 *
 * @shared/constants/imager-config
 */

/**
 * Imager preview defaults.
 */
export const IMAGER_PREVIEW_DEFAULTS: { readonly fps: 15; readonly quality: 80 } = {
  fps: 15,
  quality: 80,
} as const;

/**
 * Imager preview bounds.
 */
export const IMAGER_PREVIEW_LIMITS: {
  readonly fps: { readonly min: 1; readonly max: 60 };
  readonly quality: { readonly min: 1; readonly max: 100 };
} = {
  fps: { min: 1, max: 60 },
  quality: { min: 1, max: 100 },
} as const;

/**
 * Imager snapshot defaults.
 */
export const IMAGER_SNAPSHOT_DEFAULTS: { readonly quality: 80 } = {
  quality: 80,
} as const;

/**
 * Imager snapshot bounds.
 */
export const IMAGER_SNAPSHOT_LIMITS: { readonly quality: { readonly min: 1; readonly max: 100 } } =
  {
    quality: { min: 1, max: 100 },
  } as const;

/**
 * Imager capture dimension bounds.
 */
export const IMAGER_DIMENSION_LIMITS: {
  readonly min: 1;
  readonly max: 10000;
  readonly queryMin: 0;
} = {
  min: 1,
  max: 10_000,
  queryMin: 0,
} as const;
