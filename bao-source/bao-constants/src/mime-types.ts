/**
 * MIME type constants for HTTP content negotiation.
 *
 * Centralizes well-known MIME types to avoid magic strings across
 * client and server modules.
 *
 * @packageDocumentation
 */

/** IANA-registered MIME type for JSON (RFC 8259). */
export const MIME_JSON: "application/json" = "application/json" as const;
