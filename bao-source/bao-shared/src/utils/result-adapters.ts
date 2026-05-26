/**
 * Adapter result helpers used by activation/installation adapters that report
 * success or failure plus structured details.
 *
 * Isolated here from existing shared result utilities so neither surface clobbers
 * the other.
 */

/** JSON value contract used to type adapter result `details` payloads. */
export type AdapterJsonValue =
  | string
  | number
  | boolean
  | null
  | readonly AdapterJsonValue[]
  | { readonly [key: string]: AdapterJsonValue };

/** Adapter operation result contract. */
export type AdapterResult =
  | {
      readonly ok: true;
      readonly message: string;
      readonly requiresRestart?: boolean;
      readonly details?: AdapterJsonValue;
    }
  | {
      readonly ok: false;
      readonly message: string;
      readonly retryable: boolean;
      readonly phase: string;
      readonly details?: AdapterJsonValue;
    };

/** Creates a successful adapter result value. */
export const adapterOk = (
  message: string,
  options?: Readonly<{
    requiresRestart?: boolean;
    details?: AdapterJsonValue;
  }>,
): AdapterResult => ({
  ok: true,
  message,
  requiresRestart: options?.requiresRestart,
  details: options?.details,
});

/** Creates a failed adapter result value. */
export const adapterErr = (
  message: string,
  phase: string,
  retryable: boolean,
  details?: AdapterJsonValue,
): AdapterResult => ({
  ok: false,
  message,
  retryable,
  phase,
  details,
});
