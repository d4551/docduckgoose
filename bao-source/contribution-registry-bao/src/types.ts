/**
 * Contribution types: base lifecycle + ecosystem surface re-exports.
 *
 * @packageDocumentation
 */

export type {
  BaseContributionRegistration,
  ContributionOwnerRef,
} from "./base-contribution.ts";
export {
  BUILTIN_CONTRIBUTION_EXTENSION_ID,
  contributionRegistrationIsHostOwned,
  resolveContributionEcosystemEnvironmentId,
} from "./base-contribution.ts";

export type {
  EcosystemContributionSurface,
  EcosystemContributionSurfaceKey,
} from "@baohaus/ecosystem-events-bao/types";
export { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
