/**
 * BaoDown cross-replica wakeup (PG LISTEN/NOTIFY) schemas.
 *
 * Defines a small, operator-safe status payload describing the health of the
 * cross-replica BaoDown wakeup mechanism used by SSE streams in multi-replica
 * deployments.
 *
 * @shared/schemas/baodown/baodown-pg-notify
 */

import type {
  Static,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import { stringEnum } from "../baobox-enum.ts";

/**
 * Supported PG LISTEN/NOTIFY operational modes.
 */
export const BAODOWN_PG_NOTIFY_MODES: readonly [
  "disabled",
  "unsupported",
  "connecting",
  "listening",
  "reconnecting",
  "stopped",
] = ["disabled", "unsupported", "connecting", "listening", "reconnecting", "stopped"] as const;

/**
 * PG LISTEN/NOTIFY operational mode.
 */
export type BaoDownPgNotifyMode = (typeof BAODOWN_PG_NOTIFY_MODES)[number];

/**
 * Schema for {@link BaoDownPgNotifyMode}.
 */
export const BaoDownPgNotifyModeSchema: TUnion<
  [
    TLiteral<"disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped">,
    ...TLiteral<
      "disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped"
    >[],
  ]
> = stringEnum(BAODOWN_PG_NOTIFY_MODES, {
  description: "PG LISTEN/NOTIFY operational mode.",
});

/**
 * Status snapshot describing the health of the BaoDown PG LISTEN/NOTIFY integration.
 *
 * Safe to expose to operator UIs (no secrets) to diagnose BaoDown SSE wakeups.
 */
export const BaoDownPgNotifyStatusSchema: TObject<
  {
    readonly mode: TUnion<
      [
        TLiteral<
          "disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped"
        >,
        ...TLiteral<
          "disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped"
        >[],
      ]
    >;
    readonly reconnectAttempt: TInteger;
    readonly lastConnectedAt: TUnion<(TString | TNull)[]>;
    readonly lastErrorAt: TUnion<(TString | TNull)[]>;
    readonly lastErrorMessage: TUnion<(TString | TNull)[]>;
  },
  "lastConnectedAt" | "lastErrorAt" | "lastErrorMessage" | "mode" | "reconnectAttempt",
  never
> = TypeExports.Object(
  {
    mode: BaoDownPgNotifyModeSchema,
    reconnectAttempt: TypeExports.Integer({ minimum: 0 }),
    lastConnectedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    lastErrorAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    lastErrorMessage: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Type for {@link BaoDownPgNotifyStatusSchema}.
 */
export type BaoDownPgNotifyStatus = Static<typeof BaoDownPgNotifyStatusSchema>;
