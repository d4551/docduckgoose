/**
 * Lifecycle-only contribution registration base (no ecosystem-events dependency).
 *
 * @packageDocumentation
 */

export interface BaseContributionRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly tenantId?: string | null | undefined;
}

export const BUILTIN_CONTRIBUTION_EXTENSION_ID = "builtin";

export type ContributionOwnerRef = Pick<BaseContributionRegistration, "extensionId">;

export function contributionRegistrationIsHostOwned(registration: ContributionOwnerRef): boolean {
  return registration.extensionId === BUILTIN_CONTRIBUTION_EXTENSION_ID;
}

export function resolveContributionEcosystemEnvironmentId(
  registration: ContributionOwnerRef,
): string | undefined {
  return contributionRegistrationIsHostOwned(registration) ? undefined : registration.extensionId;
}
