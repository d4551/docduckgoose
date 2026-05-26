/**
 * BaoDown Orchestration Contract v1 — Runs endpoints.
 *
 * - GET  /definitions/:id/runs
 * - POST /definitions/:id/runs
 * - GET  /runs/:id
 * - POST /runs/:id/cancel
 * - GET  /runs/:id/events (SSE stream)
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BaoDownRunEventSchema,
  BaoDownRunStreamEventSchema,
} from "../../../../schemas/baodown/baodown-flow.schemas";
import type { VersionedContractV1 } from "../error-envelope.contract";
import { BAODOWN_CONTRACT_VERSION, BaoDownErrorsV1, UuidParam } from "./shared";

/** Contract name identifier for the runs list endpoint. */
export const BAODOWN_RUNS_LIST_CONTRACT_NAME = "baodown-runs-list";

/** TypeBox request schema for the RunsList endpoint. */
export const BaoDownRunsListRequestV1: Type.TObject<
  {
    readonly id: Type.TString;
    readonly offset: Type.TOptional<Type.TInteger>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  "id",
  Type.InferOptionalKeys<{
    readonly id: Type.TString;
    readonly offset: Type.TOptional<Type.TInteger>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
  },
  {},
);

/** TypeBox response schema for the RunsList endpoint. */
export const BaoDownRunsListResponseV1: Type.TUnknown = Type.Unknown({
  description: "Paginated list of BaoDown runs.",
});

/** Versioned contract bundle (name, request, response, errors) for the RunsList endpoint. */
export const BaoDownRunsListContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_RUNS_LIST_CONTRACT_NAME,
  request: BaoDownRunsListRequestV1,
  response: BaoDownRunsListResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the run start endpoint. */
export const BAODOWN_RUN_START_CONTRACT_NAME = "baodown-run-start";

/** TypeBox request schema for the RunStart endpoint. */
export const BaoDownRunStartRequestV1: Type.TObject<
  {
    readonly versionId: Type.TOptional<Type.TString>;
    readonly trigger: Type.TUnknown;
    readonly context: Type.TUnknown;
  },
  "trigger" | "context",
  "versionId"
> = Type.Object(
  {
    versionId: Type.Optional(Type.String({ format: "uuid" })),
    trigger: Type.Unknown({ description: "BaoDown trigger descriptor." }),
    context: Type.Unknown({ description: "BaoDown run context." }),
  },
  {},
);

/** TypeBox response schema for the RunStart endpoint. */
export const BaoDownRunStartResponseV1: Type.TUnknown = Type.Unknown({
  description: "Started BaoDown run.",
});

/** Versioned contract bundle (name, request, response, errors) for the RunStart endpoint. */
export const BaoDownRunStartContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_RUN_START_CONTRACT_NAME,
  request: BaoDownRunStartRequestV1,
  response: BaoDownRunStartResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the run detail endpoint. */
export const BAODOWN_RUN_DETAIL_CONTRACT_NAME = "baodown-run-detail";

/** TypeBox request schema for the RunDetail endpoint. */
export const BaoDownRunDetailRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  UuidParam;

/** TypeBox response schema for the RunDetail endpoint. */
export const BaoDownRunDetailResponseV1: Type.TUnknown = Type.Unknown({
  description: "Single BaoDown run.",
});

/** Versioned contract bundle (name, request, response, errors) for the RunDetail endpoint. */
export const BaoDownRunDetailContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_RUN_DETAIL_CONTRACT_NAME,
  request: BaoDownRunDetailRequestV1,
  response: BaoDownRunDetailResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the run cancel endpoint. */
export const BAODOWN_RUN_CANCEL_CONTRACT_NAME = "baodown-run-cancel";

/** TypeBox request schema for the RunCancel endpoint. */
export const BaoDownRunCancelRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  UuidParam;

/** TypeBox response schema for the RunCancel endpoint. */
export const BaoDownRunCancelResponseV1: Type.TUnknown = Type.Unknown({
  description: "Canceled BaoDown run.",
});

/** Versioned contract bundle (name, request, response, errors) for the RunCancel endpoint. */
export const BaoDownRunCancelContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_RUN_CANCEL_CONTRACT_NAME,
  request: BaoDownRunCancelRequestV1,
  response: BaoDownRunCancelResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the run events endpoint. */
export const BAODOWN_RUN_EVENTS_CONTRACT_NAME = "baodown-run-events";

/** Request params for the run events endpoint. */
export const BaoDownRunEventsRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  UuidParam;

/** Paged JSON payload used when `offset`/`limit`/`afterSeq` query params are supplied. */
export const BaoDownRunEventsListResponseV1 = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        events: Type.Array(BaoDownRunEventSchema),
      },
      { additionalProperties: false },
    ),
  },
  {
    additionalProperties: true,
    description: "Paged BaoDown run events list response wrapped in success envelope.",
  },
);

/** Union response for run events endpoint: paged JSON response or SSE event payload. */
export const BaoDownRunEventsResponseV1 = Type.Union(
  [BaoDownRunEventsListResponseV1, BaoDownRunStreamEventSchema],
  {
    description: "Paged BaoDown run events or streamed SSE event payload.",
  },
);

/** Versioned contract bundle (name, request, response, errors) for the RunEvents endpoint. */
export const BaoDownRunEventsContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_RUN_EVENTS_CONTRACT_NAME,
  request: BaoDownRunEventsRequestV1,
  response: BaoDownRunEventsResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
