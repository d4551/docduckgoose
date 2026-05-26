/**
 * Alignment contract/config constants.
 *
 * Centralized boundaries for annotation and AI service alignment request
 * validation and refresh idempotency behavior.
 *
 * @shared/constants/alignment
 */

/**
 * Maximum idempotency key length accepted by alignment refresh APIs.
 */
export const ALIGNMENT_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH = 128;

/**
 * Minimum idempotency TTL bound for annotation alignment refresh caching.
 */
export const ANNOTATION_ALIGNMENT_IDEMPOTENCY_TTL_MIN_MS = 1_000;

/**
 * Maximum idempotency TTL bound for annotation alignment refresh caching.
 */
export const ANNOTATION_ALIGNMENT_IDEMPOTENCY_TTL_MAX_MS = 600_000;

/**
 * Minimum idempotency TTL bound for AI service alignment refresh caching.
 */
export const AI_SERVICE_ALIGNMENT_IDEMPOTENCY_TTL_MIN_MS = 1_000;

/**
 * Maximum idempotency TTL bound for AI service alignment refresh caching.
 */
export const AI_SERVICE_ALIGNMENT_IDEMPOTENCY_TTL_MAX_MS = 600_000;
