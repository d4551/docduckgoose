/**
 * Client telemetry schemas.
 *
 * Shared TypeBox schemas and inferred types for system telemetry ingestion.
 * This file is the single contract source for `/api/v1/system/client-errors`.
 *
 * @shared/schemas/client-telemetry.schemas
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { CLIENT_ERROR_SEVERITY_VALUES } from "../constants/client-telemetry";
import { stringEnum } from "./baobox-enum";

const CLIENT_ERROR_MESSAGE_MAX_LENGTH = 2000;
const CLIENT_ERROR_STACK_MAX_LENGTH = 20_000;
const CLIENT_ERROR_COMPONENT_NAME_MAX_LENGTH = 200;
const CLIENT_ERROR_CONTEXT_MAX_LENGTH = 500;
const CLIENT_ERROR_USER_AGENT_MAX_LENGTH = 500;
const CLIENT_ERROR_SOURCE_MAX_LENGTH = 100;
const CLIENT_ERROR_TAG_KEY_MAX_LENGTH = 50;
const CLIENT_ERROR_TAG_VALUE_MAX_LENGTH = 200;

/**
 * Severity schema for client error telemetry payloads.
 */
export const ClientErrorSeveritySchema: Type.TUnion<
  [Type.TLiteral<"error" | "warning" | "info">, ...Type.TLiteral<"error" | "warning" | "info">[]]
> = stringEnum(CLIENT_ERROR_SEVERITY_VALUES, {});

/**
 * Client error telemetry payload schema.
 */
export const ClientErrorReportSchema = Type.Object({
  message: Type.String({ minLength: 1, maxLength: CLIENT_ERROR_MESSAGE_MAX_LENGTH }),
  stack: Type.Optional(Type.String({ maxLength: CLIENT_ERROR_STACK_MAX_LENGTH })),
  componentName: Type.Optional(
    Type.String({
      maxLength: CLIENT_ERROR_COMPONENT_NAME_MAX_LENGTH,
    }),
  ),
  context: Type.Optional(Type.String({ maxLength: CLIENT_ERROR_CONTEXT_MAX_LENGTH })),
  timestamp: Type.Optional(Type.String({ format: "date-time" })),
  url: Type.Optional(Type.String()),
  userAgent: Type.Optional(Type.String({ maxLength: CLIENT_ERROR_USER_AGENT_MAX_LENGTH })),
  severity: Type.Optional(ClientErrorSeveritySchema),
  source: Type.Optional(Type.String({ maxLength: CLIENT_ERROR_SOURCE_MAX_LENGTH })),
  tags: Type.Optional(
    Type.Record(
      Type.String({ maxLength: CLIENT_ERROR_TAG_KEY_MAX_LENGTH }),
      Type.String({ maxLength: CLIENT_ERROR_TAG_VALUE_MAX_LENGTH }),
    ),
  ),
  extra: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
});

/**
 * Response schema for client error telemetry ingestion.
 */
export const ClientErrorReportResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly receivedAt: Type.TString;
    readonly eventId: Type.TOptional<Type.TString>;
  },
  "ok" | "receivedAt",
  "eventId"
> = Type.Object({
  ok: Type.Literal(true),
  receivedAt: Type.String(),
  eventId: Type.Optional(Type.String()),
});

/** Inferred type from the ClientErrorSeverity schema. */
export type ClientErrorSeverity = Static<typeof ClientErrorSeveritySchema>;
/** Inferred type from the client error telemetry payload schema. */
export type ClientErrorReportPayload = Static<typeof ClientErrorReportSchema>;
/** Inferred type from the client error telemetry response schema. */
export type ClientErrorReportResponse = Static<typeof ClientErrorReportResponseSchema>;
