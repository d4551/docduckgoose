/**
 * BaoDown Orchestration Contract v1 — Webhooks endpoints.
 *
 * - GET    /definitions/:id/webhooks
 * - POST   /definitions/:id/webhooks
 * - PUT    /definitions/:id/webhooks/:webhookId
 * - POST   /definitions/:id/webhooks/:webhookId/rotate
 * - DELETE /definitions/:id/webhooks/:webhookId
 * - POST   /webhooks/:endpointKey (public trigger)
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import type { VersionedContractV1 } from "../error-envelope.contract";
import {
  BAODOWN_CONTRACT_VERSION,
  BaoDownErrorsV1,
  DefinitionWebhookParams,
  UuidParam,
} from "./shared";

/** Contract name identifier for the webhooks list endpoint. */
export const BAODOWN_WEBHOOKS_LIST_CONTRACT_NAME = "baodown-webhooks-list";

/** TypeBox request schema for the WebhooksList endpoint. */
export const BaoDownWebhooksListRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = UuidParam;

/** TypeBox response schema for the WebhooksList endpoint. */
export const BaoDownWebhooksListResponseV1: Type.TUnknown = Type.Unknown({
  description: "List of BaoDown webhooks for a definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the WebhooksList endpoint. */
export const BaoDownWebhooksListContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_WEBHOOKS_LIST_CONTRACT_NAME,
  request: BaoDownWebhooksListRequestV1,
  response: BaoDownWebhooksListResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the webhook create endpoint. */
export const BAODOWN_WEBHOOK_CREATE_CONTRACT_NAME = "baodown-webhook-create";

/** TypeBox request schema for the WebhookCreate endpoint. */
export const BaoDownWebhookCreateRequestV1: Type.TObject<
  { readonly isActive: Type.TOptional<Type.TBoolean> },
  never,
  "isActive"
> = Type.Object(
  {
    isActive: Type.Optional(Type.Boolean()),
  },
  {},
);

/** TypeBox response schema for the WebhookCreate endpoint. */
export const BaoDownWebhookCreateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Created BaoDown webhook with secret (returned once).",
});

/** Versioned contract bundle (name, request, response, errors) for the WebhookCreate endpoint. */
export const BaoDownWebhookCreateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_WEBHOOK_CREATE_CONTRACT_NAME,
  request: BaoDownWebhookCreateRequestV1,
  response: BaoDownWebhookCreateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the webhook update endpoint. */
export const BAODOWN_WEBHOOK_UPDATE_CONTRACT_NAME = "baodown-webhook-update";

/** TypeBox request schema for the WebhookUpdate endpoint. */
export const BaoDownWebhookUpdateRequestV1: Type.TObject<
  { readonly isActive: Type.TOptional<Type.TBoolean> },
  never,
  "isActive"
> = Type.Object(
  {
    isActive: Type.Optional(Type.Boolean()),
  },
  {},
);

/** TypeBox response schema for the WebhookUpdate endpoint. */
export const BaoDownWebhookUpdateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Updated BaoDown webhook.",
});

/** Versioned contract bundle (name, request, response, errors) for the WebhookUpdate endpoint. */
export const BaoDownWebhookUpdateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_WEBHOOK_UPDATE_CONTRACT_NAME,
  request: BaoDownWebhookUpdateRequestV1,
  response: BaoDownWebhookUpdateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the webhook rotate endpoint. */
export const BAODOWN_WEBHOOK_ROTATE_CONTRACT_NAME = "baodown-webhook-rotate";

/** TypeBox request schema for the WebhookRotate endpoint. */
export const BaoDownWebhookRotateRequestV1: Type.TObject<
  { readonly id: Type.TString; readonly webhookId: Type.TString },
  "id" | "webhookId",
  never
> = DefinitionWebhookParams;

/** TypeBox response schema for the WebhookRotate endpoint. */
export const BaoDownWebhookRotateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Rotated BaoDown webhook with new secret (returned once).",
});

/** Versioned contract bundle (name, request, response, errors) for the WebhookRotate endpoint. */
export const BaoDownWebhookRotateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_WEBHOOK_ROTATE_CONTRACT_NAME,
  request: BaoDownWebhookRotateRequestV1,
  response: BaoDownWebhookRotateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the webhook delete endpoint. */
export const BAODOWN_WEBHOOK_DELETE_CONTRACT_NAME = "baodown-webhook-delete";

/** TypeBox request schema for the WebhookDelete endpoint. */
export const BaoDownWebhookDeleteRequestV1: Type.TObject<
  { readonly id: Type.TString; readonly webhookId: Type.TString },
  "id" | "webhookId",
  never
> = DefinitionWebhookParams;

/** TypeBox response schema for the WebhookDelete endpoint. */
export const BaoDownWebhookDeleteResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      { readonly deleted: Type.TLiteral<true>; readonly id: Type.TString },
      "deleted" | "id",
      never
    >;
  },
  "ok" | "data",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object({
      deleted: Type.Literal(true),
      id: Type.String({ format: "uuid" }),
    }),
  },
  {},
);

/** Versioned contract bundle (name, request, response, errors) for the WebhookDelete endpoint. */
export const BaoDownWebhookDeleteContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_WEBHOOK_DELETE_CONTRACT_NAME,
  request: BaoDownWebhookDeleteRequestV1,
  response: BaoDownWebhookDeleteResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the webhook trigger endpoint. */
export const BAODOWN_WEBHOOK_TRIGGER_CONTRACT_NAME = "baodown-webhook-trigger";

/** TypeBox request schema for the WebhookTrigger endpoint. */
export const BaoDownWebhookTriggerRequestV1: Type.TObject<
  {
    readonly endpointKey: Type.TString;
    readonly payload: Type.TOptional<Type.TUnknown>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "endpointKey",
  Type.InferOptionalKeys<{
    readonly endpointKey: Type.TString;
    readonly payload: Type.TOptional<Type.TUnknown>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    endpointKey: Type.String({ minLength: 1 }),
    payload: Type.Optional(Type.Unknown()),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  {},
);

/** TypeBox response schema for the WebhookTrigger endpoint. */
export const BaoDownWebhookTriggerResponseV1: Type.TUnknown = Type.Unknown({
  description: "Triggered BaoDown run (202 Accepted).",
});

/** Versioned contract bundle (name, request, response, errors) for the WebhookTrigger endpoint. */
export const BaoDownWebhookTriggerContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_WEBHOOK_TRIGGER_CONTRACT_NAME,
  request: BaoDownWebhookTriggerRequestV1,
  response: BaoDownWebhookTriggerResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
