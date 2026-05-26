/** Enterprise tenancy + hot-load matrix SSOT for contribution registry consumers. */

export const TENANCY_TIERS = ["user", "workspace", "workplace", "admin", "enterprise"] as const;
export const HOT_LOAD_STATES = [
  "idle",
  "mounting",
  "mounted",
  "hot-swapping",
  "unmounted",
  "error",
] as const;

export type TenancyTier = (typeof TENANCY_TIERS)[number];
export type HotLoadState = (typeof HOT_LOAD_STATES)[number];

export interface EnterpriseTenancyHotLoadState {
  readonly tier: TenancyTier;
  readonly tenantId: string | null;
  readonly hotLoadState: HotLoadState;
  readonly extensionId?: string;
}

export const ENTERPRISE_TENANCY_HOTLOAD_MATRIX: Readonly<
  Record<TenancyTier, readonly HotLoadState[]>
> = {
  user: ["idle", "mounted", "error"],
  workspace: ["idle", "mounting", "mounted", "hot-swapping", "unmounted", "error"],
  workplace: ["idle", "mounting", "mounted", "hot-swapping", "unmounted", "error"],
  admin: ["idle", "mounting", "mounted", "hot-swapping", "unmounted", "error"],
  enterprise: ["idle", "mounting", "mounted", "hot-swapping", "unmounted", "error"],
};

export const isTenancyTier = (value: string): value is TenancyTier =>
  (TENANCY_TIERS as readonly string[]).includes(value);

export const isHotLoadState = (value: string): value is HotLoadState =>
  (HOT_LOAD_STATES as readonly string[]).includes(value);

export const isEnterpriseTenancyHotLoadAllowed = (
  tier: TenancyTier,
  hotLoadState: HotLoadState,
): boolean => {
  const allowed = ENTERPRISE_TENANCY_HOTLOAD_MATRIX[tier] ?? [];
  return allowed.includes(hotLoadState);
};
