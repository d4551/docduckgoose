/**
 * BaoDown Orchestration Contract v1 — Validate, Versions, and Unpublish endpoints.
 *
 * - POST /definitions/:id/validate
 * - GET  /definitions/:id/versions
 * - POST /definitions/:id/versions
 * - GET  /versions/:id
 * - POST /definitions/:id/versions/:versionId/publish
 * - POST /definitions/:id/unpublish
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import type { VersionedContractV1 } from "../error-envelope.contract";
import {
  BAODOWN_CONTRACT_VERSION,
  BaoDownErrorsV1,
  DefinitionVersionParams,
  UuidParam,
} from "./shared";

/** Contract name identifier for the validate endpoint. */
export const BAODOWN_VALIDATE_CONTRACT_NAME = "baodown-validate";

/** TypeBox request schema for the Validate endpoint. */
export const BaoDownValidateRequestV1: Type.TObject<
  { readonly schemaVersion: Type.TInteger; readonly graph: Type.TUnknown },
  "schemaVersion" | "graph",
  never
> = Type.Object(
  {
    schemaVersion: Type.Integer({ minimum: 1 }),
    graph: Type.Unknown({ description: "BaoDown graph JSON." }),
  },
  {},
);

/** TypeBox response schema for the Validate endpoint. */
export const BaoDownValidateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Validation result.",
});

/** Versioned contract bundle (name, request, response, errors) for the Validate endpoint. */
export const BaoDownValidateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_VALIDATE_CONTRACT_NAME,
  request: BaoDownValidateRequestV1,
  response: BaoDownValidateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the versions list endpoint. */
export const BAODOWN_VERSIONS_LIST_CONTRACT_NAME = "baodown-versions-list";

/** TypeBox request schema for the VersionsList endpoint. */
export const BaoDownVersionsListRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = UuidParam;

/** TypeBox response schema for the VersionsList endpoint. */
export const BaoDownVersionsListResponseV1: Type.TUnknown = Type.Unknown({
  description: "List of BaoDown versions for a definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the VersionsList endpoint. */
export const BaoDownVersionsListContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_VERSIONS_LIST_CONTRACT_NAME,
  request: BaoDownVersionsListRequestV1,
  response: BaoDownVersionsListResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the version create endpoint. */
export const BAODOWN_VERSION_CREATE_CONTRACT_NAME = "baodown-version-create";

/** TypeBox request schema for the VersionCreate endpoint. */
export const BaoDownVersionCreateRequestV1: Type.TObject<
  { readonly schemaVersion: Type.TInteger; readonly graph: Type.TUnknown },
  "schemaVersion" | "graph",
  never
> = Type.Object(
  {
    schemaVersion: Type.Integer({ minimum: 1 }),
    graph: Type.Unknown({ description: "BaoDown graph JSON." }),
  },
  {},
);

/** TypeBox response schema for the VersionCreate endpoint. */
export const BaoDownVersionCreateResponseV1: Type.TUnknown = Type.Unknown({
  description: "Created BaoDown version.",
});

/** Versioned contract bundle (name, request, response, errors) for the VersionCreate endpoint. */
export const BaoDownVersionCreateContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_VERSION_CREATE_CONTRACT_NAME,
  request: BaoDownVersionCreateRequestV1,
  response: BaoDownVersionCreateResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the version detail endpoint. */
export const BAODOWN_VERSION_DETAIL_CONTRACT_NAME = "baodown-version-detail";

/** TypeBox request schema for the VersionDetail endpoint. */
export const BaoDownVersionDetailRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = UuidParam;

/** TypeBox response schema for the VersionDetail endpoint. */
export const BaoDownVersionDetailResponseV1: Type.TUnknown = Type.Unknown({
  description: "Single BaoDown version.",
});

/** Versioned contract bundle (name, request, response, errors) for the VersionDetail endpoint. */
export const BaoDownVersionDetailContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_VERSION_DETAIL_CONTRACT_NAME,
  request: BaoDownVersionDetailRequestV1,
  response: BaoDownVersionDetailResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the version publish endpoint. */
export const BAODOWN_VERSION_PUBLISH_CONTRACT_NAME = "baodown-version-publish";

/** TypeBox request schema for the VersionPublish endpoint. */
export const BaoDownVersionPublishRequestV1: Type.TObject<
  { readonly id: Type.TString; readonly versionId: Type.TString },
  "id" | "versionId",
  never
> = DefinitionVersionParams;

/** TypeBox response schema for the VersionPublish endpoint. */
export const BaoDownVersionPublishResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly published: Type.TLiteral<true>;
        readonly definitionId: Type.TString;
        readonly versionId: Type.TString;
      },
      "published" | "definitionId" | "versionId",
      never
    >;
  },
  "ok" | "data",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object({
      published: Type.Literal(true),
      definitionId: Type.String({ format: "uuid" }),
      versionId: Type.String({ format: "uuid" }),
    }),
  },
  {},
);

/** Versioned contract bundle (name, request, response, errors) for the VersionPublish endpoint. */
export const BaoDownVersionPublishContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_VERSION_PUBLISH_CONTRACT_NAME,
  request: BaoDownVersionPublishRequestV1,
  response: BaoDownVersionPublishResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the unpublish endpoint. */
export const BAODOWN_UNPUBLISH_CONTRACT_NAME = "baodown-unpublish";

/** TypeBox request schema for the Unpublish endpoint. */
export const BaoDownUnpublishRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  UuidParam;

/** TypeBox response schema for the Unpublish endpoint. */
export const BaoDownUnpublishResponseV1: Type.TUnknown = Type.Unknown({
  description: "Unpublished definition.",
});

/** Versioned contract bundle (name, request, response, errors) for the Unpublish endpoint. */
export const BaoDownUnpublishContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_UNPUBLISH_CONTRACT_NAME,
  request: BaoDownUnpublishRequestV1,
  response: BaoDownUnpublishResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
