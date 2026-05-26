/**
 * `.bao` Install Contract v1
 *
 * Contract definitions for install orchestration and lifecycle querying of
 * unified `.bao` manifests.
 *
 * @shared/contracts/versions/v1/bao-install
 */

import { BaoInstallRequestSchema } from "@baohaus/bao-schemas/bao-install/requests.schemas";
import {
  type BaoInstallStatusPhase,
  BaoInstallStatusSchema,
  type BaoInstallStatusV1,
  BaoRuntimeMountRequestSchema,
  BaoRuntimeSessionListSchema,
  BaoRuntimeSessionSchema,
  BaoRuntimeSessionSelectorSchema,
} from "@baohaus/bao-schemas/bao-install/runtime.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version for `.bao` install endpoints.
 */
export const BAO_INSTALL_CONTRACT_VERSION = "1.0.0";

/**
 * Shared request/response schema for install and lifecycle endpoints.
 */
export const BaoInstallStatusErrorSchema: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Shared error object for `.bao` contract endpoints.
 */
export const BaoInstallErrorsV1 = Type.Object(
  {
    400: BaoInstallStatusErrorSchema,
    401: BaoInstallStatusErrorSchema,
    403: BaoInstallStatusErrorSchema,
    404: BaoInstallStatusErrorSchema,
    409: BaoInstallStatusErrorSchema,
    422: BaoInstallStatusErrorSchema,
    429: BaoInstallStatusErrorSchema,
    500: BaoInstallStatusErrorSchema,
    503: BaoInstallStatusErrorSchema,
  },
  { additionalProperties: false },
);

/**
 * Contract name for the install endpoint.
 */
export const BAO_INSTALL_CONTRACT_NAME = "bao-install";

/**
 * Contract name for install status lookup.
 */
export const BAO_INSTALL_STATUS_CONTRACT_NAME = "bao-install-status";

/**
 * Contract name for install retry.
 */
export const BAO_INSTALL_RETRY_CONTRACT_NAME = "bao-install-retry";

/**
 * Contract name for uninstall endpoint.
 */
export const BAO_UNINSTALL_CONTRACT_NAME = "bao-uninstall";

/**
 * Contract name for runtime session listing.
 */
export const BAO_RUNTIME_SESSIONS_CONTRACT_NAME = "bao-runtime-sessions";

/**
 * Contract name for one runtime session lookup.
 */
export const BAO_RUNTIME_SESSION_CONTRACT_NAME = "bao-runtime-session";

/**
 * Contract name for runtime mount.
 */
export const BAO_RUNTIME_MOUNT_CONTRACT_NAME = "bao-runtime-mount";

/**
 * Contract name for runtime activate.
 */
export const BAO_RUNTIME_ACTIVATE_CONTRACT_NAME = "bao-runtime-activate";

/**
 * Contract name for runtime deactivate.
 */
export const BAO_RUNTIME_DEACTIVATE_CONTRACT_NAME = "bao-runtime-deactivate";

/**
 * Contract name for runtime unmount.
 */
export const BAO_RUNTIME_UNMOUNT_CONTRACT_NAME = "bao-runtime-unmount";

/**
 * Request schema for `/api/v1/bao/install`.
 */
export const BaoInstallRequestV1: typeof BaoInstallRequestSchema = BaoInstallRequestSchema;

/**
 * Request schema for `/api/v1/bao/:id/status`.
 */
export const BaoInstallStatusRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1, description: "`.bao` run identifier." }) }, {});

/**
 * Request schema for `/api/v1/bao/:id/retry`.
 */
export const BaoInstallRetryRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1, description: "`.bao` run identifier." }) }, {});

/**
 * Request schema for `/api/v1/bao/:id/uninstall`.
 */
export const BaoUninstallRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1, description: "`.bao` run identifier." }) }, {});

/**
 * Request schema for `/api/v1/bao/runtime/sessions`.
 */
export const BaoRuntimeSessionsRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

/**
 * Request schema for `/api/v1/bao/runtime/:selector`.
 */
export const BaoRuntimeSessionRequestV1: Type.TObject<
  { readonly selector: Type.TString },
  "selector",
  never
> = BaoRuntimeSessionSelectorSchema;

/**
 * Request schema for `/api/v1/bao/runtime/mount`.
 */
export const BaoRuntimeMountRequestV1: typeof BaoRuntimeMountRequestSchema =
  BaoRuntimeMountRequestSchema;

/**
 * Request schema for runtime session lifecycle actions.
 */
export const BaoRuntimeSessionActionRequestV1: Type.TObject<
  { readonly selector: Type.TString },
  "selector",
  never
> = BaoRuntimeSessionSelectorSchema;

/**
 * Response schema for install/status/retry/uninstall operations.
 */
export const BaoInstallResponseV1: typeof BaoInstallStatusSchema = BaoInstallStatusSchema;

/**
 * Response schema for one runtime session.
 */
export const BaoRuntimeSessionResponseV1: typeof BaoRuntimeSessionSchema = BaoRuntimeSessionSchema;

/**
 * Response schema for runtime session listing.
 */
export const BaoRuntimeSessionsResponseV1: typeof BaoRuntimeSessionListSchema =
  BaoRuntimeSessionListSchema;

/**
 * Complete contract for `/api/v1/bao/install`.
 */
export const BaoInstallContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_INSTALL_CONTRACT_NAME,
  request: BaoInstallRequestV1,
  response: BaoInstallResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/:id/status`.
 */
export const BaoInstallStatusContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_INSTALL_STATUS_CONTRACT_NAME,
  request: BaoInstallStatusRequestV1,
  response: BaoInstallResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/:id/retry`.
 */
export const BaoInstallRetryContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_INSTALL_RETRY_CONTRACT_NAME,
  request: BaoInstallRetryRequestV1,
  response: BaoInstallResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/:id/uninstall`.
 */
export const BaoUninstallContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_UNINSTALL_CONTRACT_NAME,
  request: BaoUninstallRequestV1,
  response: BaoInstallResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/runtime/sessions`.
 */
export const BaoRuntimeSessionsContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_RUNTIME_SESSIONS_CONTRACT_NAME,
  request: BaoRuntimeSessionsRequestV1,
  response: BaoRuntimeSessionsResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/runtime/:selector`.
 */
export const BaoRuntimeSessionContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_RUNTIME_SESSION_CONTRACT_NAME,
  request: BaoRuntimeSessionRequestV1,
  response: BaoRuntimeSessionResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/runtime/mount`.
 */
export const BaoRuntimeMountContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_RUNTIME_MOUNT_CONTRACT_NAME,
  request: BaoRuntimeMountRequestV1,
  response: BaoRuntimeSessionResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/runtime/:selector/activate`.
 */
export const BaoRuntimeActivateContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_RUNTIME_ACTIVATE_CONTRACT_NAME,
  request: BaoRuntimeSessionActionRequestV1,
  response: BaoRuntimeSessionResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/runtime/:selector/deactivate`.
 */
export const BaoRuntimeDeactivateContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_RUNTIME_DEACTIVATE_CONTRACT_NAME,
  request: BaoRuntimeSessionActionRequestV1,
  response: BaoRuntimeSessionResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Complete contract for `/api/v1/bao/runtime/:selector/unmount`.
 */
export const BaoRuntimeUnmountContractV1 = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_RUNTIME_UNMOUNT_CONTRACT_NAME,
  request: BaoRuntimeSessionActionRequestV1,
  response: BaoRuntimeSessionResponseV1,
  errors: BaoInstallErrorsV1,
} as const satisfies VersionedContractV1;

/**
 * Type alias for request path parameter validation.
 */
export type BaoInstallPathParamV1 = Static<typeof BaoInstallStatusRequestV1>;

/**
 * Type alias for `.bao` install response payload.
 */
export type BaoInstallContractResponseV1 = Static<typeof BaoInstallResponseV1>;

/**
 * Alias for response phase union.
 */
export type BaoInstallStatusPhaseV1 = BaoInstallStatusPhase;

/**
 * Alias for install response payload type.
 */
export type BaoInstallStatusDataV1 = BaoInstallStatusV1;

/**
 * Alias for runtime session response payload type.
 */
export type BaoRuntimeSessionDataV1 = Static<typeof BaoRuntimeSessionResponseV1>;

/**
 * Alias for runtime session list response payload type.
 */
export type BaoRuntimeSessionsDataV1 = Static<typeof BaoRuntimeSessionsResponseV1>;

/**
 * Contract name for target handler list discovery.
 */
export const BAO_TARGET_HANDLERS_LIST_CONTRACT_NAME = "bao-target-handlers-list";

/**
 * Response schema for `/api/v1/bao/target-handlers`.
 */
export const BaoTargetHandlersListResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly targetHandlers: Type.TArray<
      Type.TObject<
        {
          readonly kind: Type.TString;
          readonly displayName: Type.TString;
          readonly hotInstallable: Type.TBoolean;
          readonly retryable: Type.TBoolean;
        },
        "kind" | "hotInstallable" | "retryable" | "displayName",
        never
      >
    >;
  },
  "ok" | "targetHandlers",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    targetHandlers: Type.Array(
      Type.Object({
        kind: Type.String({ minLength: 1 }),
        displayName: Type.String({ minLength: 1 }),
        hotInstallable: Type.Boolean(),
        retryable: Type.Boolean(),
      }),
    ),
  },
  {},
);

/**
 * Type alias for target handler list response.
 */
export type BaoTargetHandlersListResponseDataV1 = Static<typeof BaoTargetHandlersListResponseV1>;

/**
 * Complete contract for `/api/v1/bao/target-handlers`.
 */
export const BaoTargetHandlersListContractV1: {
  readonly version: "1.0.0";
  readonly name: "bao-target-handlers-list";
  readonly request: Type.TObject<Record<string, never>, never, never>;
  readonly response: Type.TObject<
    {
      readonly ok: Type.TLiteral<true>;
      readonly targetHandlers: Type.TArray<
        Type.TObject<
          {
            readonly kind: Type.TString;
            readonly displayName: Type.TString;
            readonly hotInstallable: Type.TBoolean;
            readonly retryable: Type.TBoolean;
          },
          "kind" | "hotInstallable" | "retryable" | "displayName",
          never
        >
      >;
    },
    "ok" | "targetHandlers",
    never
  >;
} = {
  version: BAO_INSTALL_CONTRACT_VERSION,
  name: BAO_TARGET_HANDLERS_LIST_CONTRACT_NAME,
  request: Type.Object({}),
  response: BaoTargetHandlersListResponseV1,
} as const;

/**
 * Re-export the error schema under the name expected by the barrel index.
 */
/**
 * Alias for the install response schema expected by the barrel index.
 */
/**
 * Alias for the uninstall contract expected by the barrel index.
 */
export {
  BaoInstallResponseV1 as BaoInstallStatusResponseV1,
  BaoInstallStatusErrorSchema as BaoInstallStatusErrorV1,
  BaoRuntimeSessionResponseV1 as BaoRuntimeStatusResponseV1,
  BaoUninstallContractV1 as BaoInstallUninstallContractV1,
};
