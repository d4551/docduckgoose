/**
 * Time conversion constants.
 *
 * Single source of truth for millisecond-to-unit conversion factors
 * used throughout the platform. Eliminates scattered magic numbers
 * like `1000`, `60_000`, and `86_400_000`.
 *
 * @shared/constants/time
 */

/** Milliseconds per second (1 s = 1 000 ms). */
export const MS_PER_SECOND = 1000;

/** Nanoseconds per millisecond (1 ms = 1 000 000 ns). */
export const NANOSECONDS_PER_MILLISECOND = 1_000_000;

/** Milliseconds per minute (1 min = 60 000 ms). */
export const MS_PER_MINUTE = 60_000;

/** Milliseconds per hour (1 h = 3 600 000 ms). */
export const MS_PER_HOUR = 3_600_000;

/** Milliseconds per day (1 d = 86 400 000 ms). */
export const MS_PER_DAY = 86_400_000;

/** Seconds per minute. */
export const SECONDS_PER_MINUTE = 60;

/** Seconds per hour. */
export const SECONDS_PER_HOUR = 3600;

/** Seconds per day. */
export const SECONDS_PER_DAY = 86_400;

/** Percentage multiplier (100). */
export const PERCENTAGE_MULTIPLIER = 100;
