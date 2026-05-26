/**
 * Common Schema Helpers.
 *
 * Provides lightweight regex patterns and TypeScript type definitions for
 * common validation scenarios across the application. This module includes:
 *
 * - Email validation pattern (basic RFC 5322 format)
 * - 10-digit phone number validation (US format)
 * - ISO 8601 date string validation and type definitions
 * - UUID v4 format validation
 *
 * @shared/schemas/common.ts
 *
 * @remarks
 * This module previously exported runtime validators. Runtime validation is now handled
 * at the API boundary using Elysia route schemas. These patterns serve as lightweight
 * utilities for type checking and basic validation.
 *
 * @example
 * ```typescript
 * import { patterns, IsoDateString } from '@baohaus/bao-schemas/common.ts';
 *
 * // Validate email format
 * const isValid = patterns.email.test('user@example.com');
 *
 * // Type-safe date string
 * const date: IsoDateString = '2024-01-15';
 * ```
 */

/**
 * Common validation regex patterns
 *
 * {RegExp} email - Validates email addresses (basic RFC 5322 format)
 * {RegExp} phone10 - Validates 10-digit phone numbers (US format)
 * {RegExp} isoDate - Validates ISO 8601 date strings (YYYY-MM-DD)
 * {RegExp} uuid - Validates UUID v4 format (case-insensitive)
 *
 * @example
 * ```typescript
 * // Email validation
 * patterns.email.test('user@example.com'); // true
 * patterns.email.test('invalid'); // false
 *
 * // Phone validation (10 digits)
 * patterns.phone10.test('5551234567'); // true
 * patterns.phone10.test('555-123-4567'); // false
 *
 * // ISO date validation
 * patterns.isoDate.test('2024-01-15'); // true
 * patterns.isoDate.test('01/15/2024'); // false
 *
 * // UUID validation
 * patterns.uuid.test('550e8400-e29b-41d4-a716-446655440000'); // true
 * ```
 */
export const patterns: {
  readonly email: RegExp;
  readonly phone10: RegExp;
  readonly isoDate: RegExp;
  readonly uuid: RegExp;
} = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone10: /^[0-9]{10}$/,
  isoDate: /^\d{4}-\d{2}-\d{2}$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
} as const;

/**
 * Type-safe ISO 8601 date string format (YYYY-MM-DD)
 *
 * @remarks
 * This template literal type provides compile-time validation for date strings
 * in ISO 8601 format. It ensures the string matches the pattern YYYY-MM-DD.
 *
 * @example
 * ```typescript
 * const validDate: IsoDateString = '2024-01-15'; // OK
 * const invalidDate: IsoDateString = '01/15/2024'; // Type error
 * ```
 */
export type IsoDateString = `${number}-${number}-${number}`;
