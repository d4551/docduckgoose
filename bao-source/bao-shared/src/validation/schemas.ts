/**
 * Lightweight Validation Helpers
 *
 * Provides basic validation patterns and type guards for common data formats.
 * These helpers are designed for client-side validation and type narrowing.
 *
 * @shared/validation/schemas
 *
 * @remarks
 * For API-level validation, prefer Elysia route schemas (`t.*`) which provide
 * runtime validation at the API boundary. These helpers are intended for
 * lightweight client-side checks and TypeScript type narrowing.
 *
 * @example
 * ```typescript
 * const log = createLogger('schemas');
 * // Type guard validation
 * if (isEmail(input)) {
 *   // TypeScript now knows input is a string
 *   log.info('Valid email:', input.toLowerCase());
 * }
 *
 * // Pattern-based validation
 * const isValidEmail = patterns.email.test('user@example.com');
 * ```
 */

/**
 * Common validation regex patterns.
 *
 * @example
 * ```typescript
 * // Email validation
 * patterns.email.test('user@example.com'); // true
 * patterns.email.test('invalid-email'); // false
 *
 * // URL validation
 * patterns.url.test('https://example.com'); // true
 * patterns.url.test('ftp://example.com'); // false
 * ```
 */
export const patterns: { readonly email: RegExp; readonly url: RegExp } = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/i,
} as const;

/**
 * Type guard to check if a value is a valid email address
 *
 * @param value - Value to validate
 * @returns True if value is a valid email string
 *
 * @description
 * Validates email format using a basic RFC 5322 compliant regex pattern.
 * This is a type predicate that narrows the type to string when true.
 *
 * @example
 * ```typescript
 * const log = createLogger('schemas');
 * const input: unknown = 'user@example.com';
 *
 * if (isEmail(input)) {
 *   // TypeScript knows input is a string here
 *   log.info(input.toLowerCase());
 * }
 * ```
 */
export function isEmail(value: unknown): value is string {
  return typeof value === "string" && patterns.email.test(value);
}

/**
 * Type guard to check if a value is a valid URL
 *
 * @param value - Value to validate
 * @returns True if value is a valid URL string
 *
 * @description
 * Validates URL format for HTTP and HTTPS protocols only. This is a type
 * predicate that narrows the type to string when true.
 *
 * @example
 * ```typescript
 * const log = createLogger('schemas');
 * const input: unknown = 'https://example.com/path';
 *
 * if (isUrl(input)) {
 *   // TypeScript knows input is a string here
 *   const url = new URL(input);
 *   log.info(url.hostname);
 * }
 * ```
 */
export function isUrl(value: unknown): value is string {
  return typeof value === "string" && patterns.url.test(value);
}
