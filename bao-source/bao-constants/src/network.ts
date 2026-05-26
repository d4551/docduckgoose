/**
 * Shared network port bounds.
 *
 * Centralizes TCP/UDP port constraints used across config/runtime layers so
 * scripts and services enforce identical validation rules.
 *
 * @shared/constants/network
 */

/**
 * Minimum valid TCP/UDP port number.
 */
export const MIN_NETWORK_PORT: 1 = 1 as const;

/**
 * Maximum valid TCP/UDP port number.
 */
export const MAX_NETWORK_PORT: 65535 = 65_535 as const;
