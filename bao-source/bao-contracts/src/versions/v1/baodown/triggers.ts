/**
 * BaoDown Orchestration Contract v1 — API trigger endpoint.
 *
 * - POST /definitions/:id/trigger/api
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import type { VersionedContractV1 } from "../error-envelope.contract";
import { BAODOWN_CONTRACT_VERSION, BaoDownErrorsV1 } from "./shared";

/** Contract name identifier for the api trigger endpoint. */
export const BAODOWN_API_TRIGGER_CONTRACT_NAME = "baodown-api-trigger";

/** TypeBox request schema for the ApiTrigger endpoint. */
export const BaoDownApiTriggerRequestV1: Type.TObject<
  {
    readonly id: Type.TString;
    readonly payload: Type.TOptional<Type.TUnknown>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "id",
  Type.InferOptionalKeys<{
    readonly id: Type.TString;
    readonly payload: Type.TOptional<Type.TUnknown>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    payload: Type.Optional(Type.Unknown()),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  {},
);

/** TypeBox response schema for the ApiTrigger endpoint. */
export const BaoDownApiTriggerResponseV1: Type.TUnknown = Type.Unknown({
  description: "Triggered BaoDown run via API (202 Accepted).",
});

/** Versioned contract bundle (name, request, response, errors) for the ApiTrigger endpoint. */
export const BaoDownApiTriggerContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_API_TRIGGER_CONTRACT_NAME,
  request: BaoDownApiTriggerRequestV1,
  response: BaoDownApiTriggerResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
