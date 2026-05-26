/**
 * BaoDown Orchestration Contract v1 — Definitions endpoints.
 *
 * - GET    /definitions
 * - POST   /definitions
 * - GET    /definitions/:id
 * - PUT    /definitions/:id
 * - DELETE /definitions/:id
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import type { VersionedContractV1 } from "../error-envelope.contract";
import { BAODOWN_CONTRACT_VERSION, BaoDownErrorsV1, UuidParam } from "./shared";

/** Contract name identifier for the definitions list endpoint. */
export const BAODOWN_DEFINITIONS_LIST_CONTRACT_NAME = "baodown-definitions-list";

/** TypeBox request schema for the DefinitionsList endpoint. */
export const BaoDownDefinitionsListRequestV1: Type.TObject<
  { readonly offset: Type.TOptional<Type.TInteger>; readonly limit: Type.TOptional<Type.TInteger> },
  never,
  Type.InferOptionalKeys<{
    readonly offset: Type.TOptional<Type.TInteger>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
  },
  {},
);

/** TypeBox response schema for the DefinitionsList endpoint. */
export const BaoDownDefinitionsListResponseV1: Type.TUnknown = Type.Unknown({
  description: "Paginated list of BaoDown definitions.",
});

/** Versioned contract bundle (name, request, response, errors) for the DefinitionsList endpoint. */
export const BaoDownDefinitionsListContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_DEFINITIONS_LIST_CONTRACT_NAME,
  request: BaoDownDefinitionsListRequestV1,
  response: BaoDownDefinitionsListResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the definition create endpoint. */
export const BAODOWN_DEFINITION_CREATE_CONTRACT_NAME = "baodown-definition-create";

/** TypeBox request schema for the DefinitionCreate endpoint. */
export const BaoDownDefinitionCreateRequestV1: Type.TObject<
  {
    readonly name: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly owner: Type.TOptional<
      Type.TUnion<(Type.TNull | Type.TRecord<Type.TString, Type.TUnknown>)[]>
    >;
  },
  "name",
  Type.InferOptionalKeys<{
    readonly name: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly owner: Type.TOptional<
      Type.TUnion<(Type.TNull | Type.TRecord<Type.TString, Type.TUnknown>)[]>
    >;
  }>
> = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 255 }),
    description: Type.Optional(Type.String({ maxLength: 2000 })),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1, maxLength: 50 }))),
    owner: Type.Optional(Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()])),
  },
  {},
);

/** TypeBox response schema for the DefinitionCreate endpoint. */
export const BaoDownDefinitionCreateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Created BaoDown definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the DefinitionCreate endpoint. */
export const BaoDownDefinitionCreateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_DEFINITION_CREATE_CONTRACT_NAME,
  request: BaoDownDefinitionCreateRequestV1,
  response: BaoDownDefinitionCreateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the definition detail endpoint. */
export const BAODOWN_DEFINITION_DETAIL_CONTRACT_NAME = "baodown-definition-detail";

/** TypeBox request schema for the DefinitionDetail endpoint. */
export const BaoDownDefinitionDetailRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = UuidParam;

/** TypeBox response schema for the DefinitionDetail endpoint. */
export const BaoDownDefinitionDetailResponseV1: Type.TUnknown = Type.Unknown({
  description: "Single BaoDown definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the DefinitionDetail endpoint. */
export const BaoDownDefinitionDetailContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_DEFINITION_DETAIL_CONTRACT_NAME,
  request: BaoDownDefinitionDetailRequestV1,
  response: BaoDownDefinitionDetailResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the definition update endpoint. */
export const BAODOWN_DEFINITION_UPDATE_CONTRACT_NAME = "baodown-definition-update";

/** TypeBox request schema for the DefinitionUpdate endpoint. */
export const BaoDownDefinitionUpdateRequestV1: Type.TObject<
  {
    readonly name: Type.TOptional<Type.TString>;
    readonly description: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly owner: Type.TOptional<
      Type.TUnion<(Type.TNull | Type.TRecord<Type.TString, Type.TUnknown>)[]>
    >;
  },
  never,
  Type.InferOptionalKeys<{
    readonly name: Type.TOptional<Type.TString>;
    readonly description: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly owner: Type.TOptional<
      Type.TUnion<(Type.TNull | Type.TRecord<Type.TString, Type.TUnknown>)[]>
    >;
  }>
> = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1, maxLength: 255 })),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1, maxLength: 50 }))),
    owner: Type.Optional(Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()])),
  },
  {},
);

/** TypeBox response schema for the DefinitionUpdate endpoint. */
export const BaoDownDefinitionUpdateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Updated BaoDown definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the DefinitionUpdate endpoint. */
export const BaoDownDefinitionUpdateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_DEFINITION_UPDATE_CONTRACT_NAME,
  request: BaoDownDefinitionUpdateRequestV1,
  response: BaoDownDefinitionUpdateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the definition delete endpoint. */
export const BAODOWN_DEFINITION_DELETE_CONTRACT_NAME = "baodown-definition-delete";

/** TypeBox request schema for the DefinitionDelete endpoint. */
export const BaoDownDefinitionDeleteRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = UuidParam;

/** TypeBox response schema for the DefinitionDelete endpoint. */
export const BaoDownDefinitionDeleteResponseV1: Type.TObject<
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

/** Versioned contract bundle (name, request, response, errors) for the DefinitionDelete endpoint. */
export const BaoDownDefinitionDeleteContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_DEFINITION_DELETE_CONTRACT_NAME,
  request: BaoDownDefinitionDeleteRequestV1,
  response: BaoDownDefinitionDeleteResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
