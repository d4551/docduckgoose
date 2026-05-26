/**
 * RPA (Robotic Process Automation) default values.
 *
 * Centralizes RPA config defaults used when environment variables are unset
 * (e.g. local dev launcher spawning API with minimal env).
 *
 * @packageDocumentation
 */

/** Default message shown when an RPA execution lands in the DLQ without error text. */
export const DEFAULT_RPA_DLQ_EXECUTION_FAILURE_MESSAGE =
  "RPA workflow job exhausted retries and moved to dead-letter queue.";
