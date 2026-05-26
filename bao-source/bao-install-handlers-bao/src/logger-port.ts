/**
 * @baohaus/bao-install-handlers-bao/logger-port (internal)
 *
 * Minimal logger port the canonical handlers consume so they remain
 * runtime-agnostic. Consumer apps inject their concrete logger via the
 * handler constructor; install lifecycle failures must never disappear
 * into a silent default.
 *
 * Internal (no subpath export). Handler modules consume it directly;
 * external apps never reach into this surface.
 */

export interface BaoInstallHandlerLoggerPort {
  readonly info: (message: string, context?: Readonly<Record<string, string>>) => void;
  readonly warn: (message: string, context?: Readonly<Record<string, string>>) => void;
  readonly error: (message: string, context?: Readonly<Record<string, string>>) => void;
}
