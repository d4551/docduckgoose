/**
 * Centralized BaoFire defaults for HL7 runtime behavior.
 *
 * All server-side HL7 host/port defaults now route through this file so
 * runtime fallback behavior is SSOT-backed and override-friendly.
 *
 * @shared/config/baofire-defaults
 */

import { BIND_ALL_IPV4, LOOPBACK_FALLBACK_HOST } from "../constants/loopback-hosts";

/**
 * Default bind host for HL7 listeners and control surfaces when no explicit host is configured.
 */
export const BAOFIRE_HL7_DEFAULT_BIND_HOST: "0.0.0.0" = BIND_ALL_IPV4;

/**
 * Default peer host used for HL7 outbound peer fallback when no explicit outbound host is configured.
 */
export const BAOFIRE_HL7_DEFAULT_OUTBOUND_HOST: "127.0.0.1" = LOOPBACK_FALLBACK_HOST;

/**
 * Default HL7 port fallback when runtime/env resolution does not provide an override.
 */
export const BAOFIRE_HL7_DEFAULT_PORT = 2_575;
