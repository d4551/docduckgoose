/**
 * Scanner bunbuddy contracts (schemas + types).
 *
 * The scanner bunbuddy (FastAPI) exposes canonical `devices/meta` list responses
 * shared with the server-side bunbuddy list contract.
 *
 * This module captures the best-effort contract used by the platform for validation at the API
 * boundary and before persisting records to the device registry.
 *
 * @shared/schemas/scanner-bunbuddy.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BunBuddyListMetaSchema, BunBuddyListResponseSchema } from "./bunbuddy.schemas.ts";

const ScannerDeviceSyncCountSchema: Type.TObject<
  { readonly upserted: Type.TInteger; readonly matched: Type.TInteger },
  "upserted" | "matched",
  never
> = Type.Object(
  {
    upserted: Type.Integer({ minimum: 0 }),
    matched: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Scanner bunbuddy connection status.
 */
export const ScannerBunBuddyScannerStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"disconnected">
    | Type.TLiteral<"connecting">
    | Type.TLiteral<"connected">
    | Type.TLiteral<"scanning">
    | Type.TLiteral<"error">
  )[]
> = Type.Union(
  [
    Type.Literal("disconnected"),
    Type.Literal("connecting"),
    Type.Literal("connected"),
    Type.Literal("scanning"),
    Type.Literal("error"),
  ],
  {},
);

/**
 * Turntable connection status.
 */
export const ScannerBunBuddyTurntableStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"disconnected">
    | Type.TLiteral<"connecting">
    | Type.TLiteral<"connected">
    | Type.TLiteral<"moving">
    | Type.TLiteral<"idle">
    | Type.TLiteral<"error">
  )[]
> = Type.Union(
  [
    Type.Literal("disconnected"),
    Type.Literal("connecting"),
    Type.Literal("connected"),
    Type.Literal("moving"),
    Type.Literal("idle"),
    Type.Literal("error"),
  ],
  {},
);

/**
 * Scanner bunbuddy `ScannerInfo` (best-effort).
 */
export const ScannerBunBuddyScannerInfoSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    model: Type.String({ minLength: 1 }),
    firmwareVersion: Type.Optional(Type.String({ minLength: 1 })),
    ipAddress: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(ScannerBunBuddyScannerStatusSchema),
    capabilities: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    discoveredAt: Type.Optional(Type.String({ minLength: 1 })),
    simulated: Type.Optional(Type.Boolean()),
    vendor: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * Scanner bunbuddy `TurntableInfo` (best-effort).
 */
export const ScannerBunBuddyTurntableInfoSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    macAddress: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(ScannerBunBuddyTurntableStatusSchema),
    currentRotation: Type.Optional(Type.Number()),
    currentTilt: Type.Optional(Type.Number()),
    capabilities: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    discoveredAt: Type.Optional(Type.String({ minLength: 1 })),
    simulated: Type.Optional(Type.Boolean()),
    vendor: Type.Optional(Type.String({ minLength: 1 })),
    model: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * Scanner bunbuddy list response.
 *
 * @remarks
 * The bunbuddy list contract is canonical `devices/meta` only.
 */
export const ScannerBunBuddyListResponseSchema = Type.Object(
  {
    devices: BunBuddyListResponseSchema.properties.devices,
    meta: BunBuddyListMetaSchema,
  },
  { additionalProperties: true },
);

/**
 * Non-empty scan session id (best-effort).
 */
export const ScannerBunBuddyScanSessionIdSchema: Type.TString = Type.String({
  minLength: 1,
});

/**
 * Nested session envelope for scan-start responses.
 */
const ScannerBunBuddyScanStartSessionSchema = Type.Object(
  {
    id: ScannerBunBuddyScanSessionIdSchema,
  },
  { additionalProperties: true },
);

/**
 * Scan session start response.
 *
 * Canonical scanner-bunbuddy responses must include either `id` or `session.id`.
 */
export const ScannerBunBuddyScanStartResponseSchema = Type.Union(
  [
    Type.Object(
      {
        id: ScannerBunBuddyScanSessionIdSchema,
        success: Type.Optional(Type.Boolean()),
        message: Type.Optional(Type.String()),
        error: Type.Optional(Type.String()),
        session: Type.Optional(ScannerBunBuddyScanStartSessionSchema),
      },
      { additionalProperties: true },
    ),
    Type.Object(
      {
        success: Type.Optional(Type.Boolean()),
        message: Type.Optional(Type.String()),
        error: Type.Optional(Type.String()),
        session: ScannerBunBuddyScanStartSessionSchema,
      },
      { additionalProperties: true },
    ),
  ],
  {},
);

/**
 * Generic JSON-object bunbuddy response (best-effort).
 *
 * Used when we need to ensure the payload is an object (not an array/null) before returning
 * it to clients or persisting derived metadata.
 */
export const ScannerBunBuddyJsonObjectResponseSchema: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: true });

/**
 * Scanner device-sync summary counts grouped by device class.
 */
export const ScannerDeviceSyncSummarySchema: Type.TObject<
  {
    readonly scanners: Type.TObject<
      { readonly upserted: Type.TInteger; readonly matched: Type.TInteger },
      "upserted" | "matched",
      never
    >;
    readonly turntables: Type.TObject<
      { readonly upserted: Type.TInteger; readonly matched: Type.TInteger },
      "upserted" | "matched",
      never
    >;
  },
  "scanners" | "turntables",
  never
> = Type.Object(
  {
    scanners: ScannerDeviceSyncCountSchema,
    turntables: ScannerDeviceSyncCountSchema,
  },
  { additionalProperties: false },
);

/**
 * Scanner device-sync error row.
 */
export const ScannerDeviceSyncErrorSchema: Type.TObject<
  {
    readonly source: Type.TUnion<
      (Type.TLiteral<"scanners"> | Type.TLiteral<"turntables"> | Type.TLiteral<"db">)[]
    >;
    readonly error: Type.TString;
  },
  "source" | "error",
  never
> = Type.Object(
  {
    source: Type.Union([Type.Literal("scanners"), Type.Literal("turntables"), Type.Literal("db")]),
    error: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * Scanner device-sync result payload.
 */
export const ScannerDeviceSyncResultSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly scannedAt: Type.TString;
    readonly baseUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly summary: Type.TObject<
      {
        readonly scanners: Type.TObject<
          { readonly upserted: Type.TInteger; readonly matched: Type.TInteger },
          "upserted" | "matched",
          never
        >;
        readonly turntables: Type.TObject<
          { readonly upserted: Type.TInteger; readonly matched: Type.TInteger },
          "upserted" | "matched",
          never
        >;
      },
      "scanners" | "turntables",
      never
    >;
    readonly errors: Type.TArray<
      Type.TObject<
        {
          readonly source: Type.TUnion<
            (Type.TLiteral<"scanners"> | Type.TLiteral<"turntables"> | Type.TLiteral<"db">)[]
          >;
          readonly error: Type.TString;
        },
        "source" | "error",
        never
      >
    >;
  },
  "baseUrl" | "errors" | "ok" | "scannedAt" | "summary",
  never
> = Type.Object(
  {
    ok: Type.Boolean(),
    scannedAt: Type.String({ format: "date-time" }),
    baseUrl: Type.Union([Type.String(), Type.Null()]),
    summary: ScannerDeviceSyncSummarySchema,
    errors: Type.Array(ScannerDeviceSyncErrorSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ScannerBunBuddyScannerInfo schema. */
export type ScannerBunBuddyScannerInfo = Static<typeof ScannerBunBuddyScannerInfoSchema>;
/** Inferred type from the ScannerBunBuddyTurntableInfo schema. */
export type ScannerBunBuddyTurntableInfo = Static<typeof ScannerBunBuddyTurntableInfoSchema>;
/** Inferred type from the ScannerBunBuddyListResponse schema. */
export type ScannerBunBuddyListResponse = Static<typeof ScannerBunBuddyListResponseSchema>;
/** Inferred type from the ScannerBunBuddyScanStartResponse schema. */
export type ScannerBunBuddyScanStartResponse = Static<
  typeof ScannerBunBuddyScanStartResponseSchema
>;
/** Inferred type from the ScannerDeviceSyncResult schema. */
export type ScannerDeviceSyncResultResponse = Static<typeof ScannerDeviceSyncResultSchema>;
