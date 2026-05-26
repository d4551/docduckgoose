/**
 * BaoDown Orchestration Contract v1 — Integration & Catalog endpoints.
 *
 * - GET /integration   (integration snapshot)
 * - GET /catalog/nodes (node catalog)
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BAODOWN_INTEGRATION_CONTRACT_NAME,
  BaoDownIntegrationRequestV1,
  BaoDownIntegrationResponseV1,
} from "../baodown-integration.contract";
import type { VersionedContractV1 } from "../error-envelope.contract";
import { BAODOWN_CONTRACT_VERSION, BaoDownErrorsV1 } from "./shared";

/** Versioned contract bundle (name, request, response, errors) for the Integration endpoint. */
export const BaoDownIntegrationContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_INTEGRATION_CONTRACT_NAME,
  request: BaoDownIntegrationRequestV1,
  response: BaoDownIntegrationResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;

/** Contract name identifier for the node catalog endpoint. */
export const BAODOWN_NODE_CATALOG_CONTRACT_NAME = "baodown-node-catalog";

/** TypeBox request schema for the NodeCatalog endpoint. */
export const BaoDownNodeCatalogRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

/** TypeBox response schema for the NodeCatalog endpoint. */
export const BaoDownNodeCatalogResponseV1: Type.TUnknown = Type.Unknown({
  description: "Array of BaoDown node catalog entries.",
});

/** Versioned contract bundle (name, request, response, errors) for the NodeCatalog endpoint. */
export const BaoDownNodeCatalogContractV1 = {
  version: BAODOWN_CONTRACT_VERSION,
  name: BAODOWN_NODE_CATALOG_CONTRACT_NAME,
  request: BaoDownNodeCatalogRequestV1,
  response: BaoDownNodeCatalogResponseV1,
  errors: BaoDownErrorsV1,
} as const satisfies VersionedContractV1;
