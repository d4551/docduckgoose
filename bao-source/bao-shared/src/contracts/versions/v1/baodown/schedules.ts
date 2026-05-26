/**
 * BaoDown Orchestration Contract v1 — Schedules endpoints.
 *
 * - GET    /definitions/:id/schedules
 * - POST   /definitions/:id/schedules
 * - PUT    /definitions/:id/schedules/:scheduleId
 * - DELETE /definitions/:id/schedules/:scheduleId
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import type { VersionedContractV1 } from "../error-envelope.contract";
import {
  BAODOWN_CONTRACT_VERSION,
  BaoDownErrorsV1,
  DefinitionScheduleParams,
  UuidParam,
} from "./shared";

/** Contract name identifier for the schedules list endpoint. */
export const BAODOWN_SCHEDULES_LIST_CONTRACT_NAME = "baodown-schedules-list";

/** TypeBox request schema for the SchedulesList endpoint. */
export const BaoDownSchedulesListRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = UuidParam;

/** TypeBox response schema for the SchedulesList endpoint. */
export const BaoDownSchedulesListResponseV1: Type.TUnknown = Type.Unknown({
  description: "List of BaoDown schedules for a definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the SchedulesList endpoint. */
export const BaoDownSchedulesListContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_SCHEDULES_LIST_CONTRACT_NAME,
  request: BaoDownSchedulesListRequestV1,
  response: BaoDownSchedulesListResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the schedule create endpoint. */
export const BAODOWN_SCHEDULE_CREATE_CONTRACT_NAME = "baodown-schedule-create";

/** TypeBox request schema for the ScheduleCreate endpoint. */
export const BaoDownScheduleCreateRequestV1: Type.TObject<
  {
    readonly cronExpr: Type.TString;
    readonly timezone: Type.TString;
    readonly isActive: Type.TOptional<Type.TBoolean>;
  },
  "cronExpr" | "timezone",
  "isActive"
> = Type.Object(
  {
    cronExpr: Type.String({ minLength: 1, maxLength: 255 }),
    timezone: Type.String({ minLength: 1, maxLength: 64 }),
    isActive: Type.Optional(Type.Boolean()),
  },
  {},
);

/** TypeBox response schema for the ScheduleCreate endpoint. */
export const BaoDownScheduleCreateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Created BaoDown schedule.",
});

/** Versioned contract bundle (name, request, response, errors) for the ScheduleCreate endpoint. */
export const BaoDownScheduleCreateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_SCHEDULE_CREATE_CONTRACT_NAME,
  request: BaoDownScheduleCreateRequestV1,
  response: BaoDownScheduleCreateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the schedule update endpoint. */
export const BAODOWN_SCHEDULE_UPDATE_CONTRACT_NAME = "baodown-schedule-update";

/** TypeBox request schema for the ScheduleUpdate endpoint. */
export const BaoDownScheduleUpdateRequestV1: Type.TObject<
  {
    readonly cronExpr: Type.TOptional<Type.TString>;
    readonly timezone: Type.TOptional<Type.TString>;
    readonly isActive: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly cronExpr: Type.TOptional<Type.TString>;
    readonly timezone: Type.TOptional<Type.TString>;
    readonly isActive: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    cronExpr: Type.Optional(Type.String({ minLength: 1, maxLength: 255 })),
    timezone: Type.Optional(Type.String({ minLength: 1, maxLength: 64 })),
    isActive: Type.Optional(Type.Boolean()),
  },
  {},
);

/** TypeBox response schema for the ScheduleUpdate endpoint. */
export const BaoDownScheduleUpdateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Updated BaoDown schedule.",
});

/** Versioned contract bundle (name, request, response, errors) for the ScheduleUpdate endpoint. */
export const BaoDownScheduleUpdateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_SCHEDULE_UPDATE_CONTRACT_NAME,
  request: BaoDownScheduleUpdateRequestV1,
  response: BaoDownScheduleUpdateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the schedule delete endpoint. */
export const BAODOWN_SCHEDULE_DELETE_CONTRACT_NAME = "baodown-schedule-delete";

/** TypeBox request schema for the ScheduleDelete endpoint. */
export const BaoDownScheduleDeleteRequestV1: Type.TObject<
  { readonly id: Type.TString; readonly scheduleId: Type.TString },
  "id" | "scheduleId",
  never
> = DefinitionScheduleParams;

/** TypeBox response schema for the ScheduleDelete endpoint. */
export const BaoDownScheduleDeleteResponseV1: Type.TObject<
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

/** Versioned contract bundle (name, request, response, errors) for the ScheduleDelete endpoint. */
export const BaoDownScheduleDeleteContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_SCHEDULE_DELETE_CONTRACT_NAME,
  request: BaoDownScheduleDeleteRequestV1,
  response: BaoDownScheduleDeleteResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
