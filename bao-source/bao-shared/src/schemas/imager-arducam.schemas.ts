/**
 * Arducam 200MP imager schemas.
 *
 * Contract-first schemas for Arducam 200MP capability and conversion routes
 * surfaced through the imager API.
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Normalized runtime platform values for Arducam conversion support.
 */
export const ArducamPlatformSchema: Type.TUnion<
  (Type.TLiteral<"windows"> | Type.TLiteral<"linux"> | Type.TLiteral<"macos">)[]
> = Type.Union([Type.Literal("windows"), Type.Literal("linux"), Type.Literal("macos")], {
  additionalProperties: false,
});

/** Inferred type from the ArducamPlatform schema. */
export type ArducamPlatform = Static<typeof ArducamPlatformSchema>;

/**
 * Minimal device summary emitted for Arducam-eligible cameras.
 */
export const Arducam200MpDeviceSummarySchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly label: Type.TString;
    readonly path: Type.TString;
    readonly vendorId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly productId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly manufacturer: Type.TString;
    readonly product: Type.TString;
    readonly serialNumber: Type.TString;
  },
  "vendorId" | "productId" | "id" | "label" | "path" | "manufacturer" | "product" | "serialNumber",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    path: Type.String({ minLength: 1 }),
    vendorId: Type.Union([Type.String(), Type.Null()]),
    productId: Type.Union([Type.String(), Type.Null()]),
    manufacturer: Type.String(),
    product: Type.String(),
    serialNumber: Type.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpDeviceSummary schema. */
export type Arducam200MpDeviceSummary = Static<typeof Arducam200MpDeviceSummarySchema>;

/**
 * Arducam converter runtime configuration snapshot.
 */
export const Arducam200MpCapabilitiesConfigSchema: Type.TObject<
  {
    readonly timeoutMs: Type.TInteger;
    readonly retryAttempts: Type.TInteger;
    readonly retryBackoffMs: Type.TInteger;
    readonly retryBackoffMaxMs: Type.TInteger;
    readonly outputRawFilename: Type.TString;
  },
  "timeoutMs" | "retryAttempts" | "retryBackoffMs" | "retryBackoffMaxMs" | "outputRawFilename",
  never
> = Type.Object(
  {
    timeoutMs: Type.Integer({ minimum: 0 }),
    retryAttempts: Type.Integer({ minimum: 0 }),
    retryBackoffMs: Type.Integer({ minimum: 0 }),
    retryBackoffMaxMs: Type.Integer({ minimum: 0 }),
    outputRawFilename: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpCapabilitiesConfig schema. */
export type Arducam200MpCapabilitiesConfig = Static<typeof Arducam200MpCapabilitiesConfigSchema>;

/**
 * Arducam converter capability payload.
 */
export const Arducam200MpCapabilitiesSchema = Type.Object(
  {
    ok: Type.Optional(Type.Literal(true)),
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
    enabled: Type.Boolean(),
    deviceContextRequired: Type.Boolean(),
    platform: Type.Union([ArducamPlatformSchema, Type.Null()]),
    configuredBinary: Type.Union([Type.String(), Type.Null()]),
    resolvedBinaryPath: Type.Union([Type.String(), Type.Null()]),
    available: Type.Boolean(),
    ready: Type.Boolean(),
    discoveredCameraCount: Type.Integer({ minimum: 0 }),
    eligibleDevices: Type.Array(Arducam200MpDeviceSummarySchema),
    defaultDeviceId: Type.Union([Type.String(), Type.Null()]),
    reason: Type.Optional(Type.String()),
    config: Arducam200MpCapabilitiesConfigSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpCapabilities schema. */
export type Arducam200MpCapabilities = Static<typeof Arducam200MpCapabilitiesSchema>;

/**
 * Arducam 200MP conversion request payload.
 */
export const Arducam200MpConvertRequestSchema = Type.Object(
  {
    deviceId: Type.Optional(Type.String()),
    inputRaw8Path: Type.String({ minLength: 1 }),
    outputRawPath: Type.String({ minLength: 1 }),
    infEepromPath: Type.String({ minLength: 1 }),
    macEepromPath: Type.String({ minLength: 1 }),
    eepromDataLength: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    width: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    height: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    outputWidth: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    outputHeight: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    colorOrder: Type.Optional(Type.Integer({ minimum: 0, maximum: 3 })),
    workingDirectory: Type.Optional(Type.String()),
    raw10Stem: Type.Optional(Type.String()),
    retainIntermediateRaw10: Type.Optional(Type.Boolean()),
    retainConverterOutput: Type.Optional(Type.Boolean()),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertRequest schema. */
export type Arducam200MpConvertRequest = Static<typeof Arducam200MpConvertRequestSchema>;

/**
 * Failure codes emitted by Arducam conversion responses.
 */
export const Arducam200MpConvertFailureCodeSchema: Type.TUnion<
  (
    | Type.TLiteral<"INVALID_REQUEST">
    | Type.TLiteral<"INVALID_CONFIG">
    | Type.TLiteral<"UNSUPPORTED_PLATFORM">
    | Type.TLiteral<"READ_INPUT_FAILED">
    | Type.TLiteral<"CONVERTER_FAILED">
    | Type.TLiteral<"OUTPUT_NOT_FOUND">
    | Type.TLiteral<"BINARY_NOT_FOUND">
    | Type.TLiteral<"CANCELLED">
  )[]
> = Type.Union(
  [
    Type.Literal("INVALID_REQUEST"),
    Type.Literal("INVALID_CONFIG"),
    Type.Literal("UNSUPPORTED_PLATFORM"),
    Type.Literal("READ_INPUT_FAILED"),
    Type.Literal("CONVERTER_FAILED"),
    Type.Literal("OUTPUT_NOT_FOUND"),
    Type.Literal("BINARY_NOT_FOUND"),
    Type.Literal("CANCELLED"),
  ],
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertFailureCode schema. */
export type Arducam200MpConvertFailureCode = Static<typeof Arducam200MpConvertFailureCodeSchema>;

/**
 * Successful Arducam conversion payload.
 */
export const Arducam200MpConvertSuccessSchema = Type.Object(
  {
    ok: Type.Literal(true),
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
    code: Type.Literal("OK"),
    platform: ArducamPlatformSchema,
    correlationId: Type.Optional(Type.String()),
    command: Type.Array(Type.String()),
    attempts: Type.Integer({ minimum: 1 }),
    durationMs: Type.Integer({ minimum: 0 }),
    outputRawPath: Type.String({ minLength: 1 }),
    raw10Path: Type.String({ minLength: 1 }),
    converterOutputPath: Type.String({ minLength: 1 }),
    stdout: Type.String(),
    stderr: Type.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertSuccess schema. */
export type Arducam200MpConvertSuccess = Static<typeof Arducam200MpConvertSuccessSchema>;

/**
 * Failed Arducam conversion payload.
 */
export const Arducam200MpConvertFailureSchema = Type.Object(
  {
    ok: Type.Literal(false),
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
    code: Arducam200MpConvertFailureCodeSchema,
    error: Type.String({ minLength: 1 }),
    correlationId: Type.Optional(Type.String()),
    platform: Type.Optional(ArducamPlatformSchema),
    command: Type.Optional(Type.Array(Type.String())),
    attempts: Type.Integer({ minimum: 0 }),
    durationMs: Type.Integer({ minimum: 0 }),
    exitCode: Type.Optional(Type.Integer()),
    stdout: Type.Optional(Type.String()),
    stderr: Type.Optional(Type.String()),
    timedOut: Type.Optional(Type.Boolean()),
    aborted: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertFailure schema. */
export type Arducam200MpConvertFailure = Static<typeof Arducam200MpConvertFailureSchema>;

/**
 * Union schema for Arducam conversion result envelopes.
 */
export const Arducam200MpConvertResultSchema = Type.Union(
  [Arducam200MpConvertSuccessSchema, Arducam200MpConvertFailureSchema],
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertResult schema. */
export type Arducam200MpConvertResult = Static<typeof Arducam200MpConvertResultSchema>;
