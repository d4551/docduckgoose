/**
 * BaoDown cross-replica wakeup (PG LISTEN/NOTIFY) schemas.
 *
 * Defines a small, operator-safe status payload describing the health of the
 * cross-replica BaoDown wakeup mechanism used by SSE streams in multi-replica
 * deployments.
 *
 * @shared/schemas/baodown/baodown-pg-notify
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

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
export const BaoDownPgNotifyModeSchema: Type.TUnion<
  [
    Type.TLiteral<
      "disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped"
    >,
    ...Type.TLiteral<
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
export const BaoDownPgNotifyStatusSchema: Type.TObject<
  {
    readonly mode: Type.TUnion<
      [
        Type.TLiteral<
          "disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped"
        >,
        ...Type.TLiteral<
          "disabled" | "unsupported" | "connecting" | "listening" | "reconnecting" | "stopped"
        >[],
      ]
    >;
    readonly reconnectAttempt: Type.TInteger;
    readonly lastConnectedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly lastErrorAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly lastErrorMessage: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "lastConnectedAt" | "lastErrorAt" | "lastErrorMessage" | "mode" | "reconnectAttempt",
  never
> = Type.Object(
  {
    mode: BaoDownPgNotifyModeSchema,
    reconnectAttempt: Type.Integer({ minimum: 0 }),
    lastConnectedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastErrorAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastErrorMessage: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Type for {@link BaoDownPgNotifyStatusSchema}.
 */
export type BaoDownPgNotifyStatus = Static<typeof BaoDownPgNotifyStatusSchema>;
