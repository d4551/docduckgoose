// AUTO-GENERATED — DO NOT EDIT
// Generated from .bao archives by scripts/codegen/generate-bunbuddy-kinds.ts

/**
 * Canonical bunbuddy kind identifiers derived from `.bao` archives.
 *
 * @remarks
 * This file is auto-generated. To update, run:
 * ```sh
 * bun scripts/codegen/generate-bunbuddy-kinds.ts
 * ```
 */
export const BUNBUDDY_KINDS = [
  "basler",
  "ble",
  "dimsum",
  "drone",
  "gaussian",
  "industrial",
  "iot",
  "lighting",
  "perception",
  "printer",
  "robotics",
  "rpa",
  "scanner",
  "scoutdumpling",
  "usb",
  "vision",
] as const;

/**
 * Type-safe bunbuddy kind enumeration derived from `.bao` archives.
 */
export type BunBuddyKind = (typeof BUNBUDDY_KINDS)[number];
