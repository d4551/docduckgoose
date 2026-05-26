/**
 * Bao ecosystem workbench graph contract.
 *
 * BaoRuntime resolves this graph from `.bao` descriptors, runtime route
 * metadata, hot-loaded navigation, session access, and user preferences.
 * Clients use this single contract for settings tabs, command palette
 * providers, sidebar/page visibility, API inventories, and dashboard layout.
 *
 * @shared/schemas/bao-ecosystem
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export const BAO_ECOSYSTEM_UI_PREFERENCE_NAMESPACE = "bao.ecosystem.ui";
export const BAO_ECOSYSTEM_UI_PREFERENCE_KEY = "workbench";

export const BaoEcosystemEnvironmentCategorySchema = TypeExports.Union([
  TypeExports.Literal("local"),
  TypeExports.Literal("remote"),
  TypeExports.Literal("storage"),
  TypeExports.Literal("api"),
  TypeExports.Literal("auth"),
  TypeExports.Literal("ui"),
]);

export type BaoEcosystemEnvironmentCategory = Static<typeof BaoEcosystemEnvironmentCategorySchema>;

export const BaoEcosystemAccessStateSchema = TypeExports.Union([
  TypeExports.Literal("allowed"),
  TypeExports.Literal("denied"),
  TypeExports.Literal("hidden"),
  TypeExports.Literal("unavailable"),
]);

export type BaoEcosystemAccessState = Static<typeof BaoEcosystemAccessStateSchema>;

export const BaoEcosystemAccessDecisionSchema = TypeExports.Object(
  {
    state: BaoEcosystemAccessStateSchema,
    reason: TypeExports.Optional(TypeExports.String()),
    role: TypeExports.Optional(TypeExports.String()),
    capabilityRef: TypeExports.Optional(TypeExports.String()),
    featureFlag: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

export type BaoEcosystemAccessDecision = Static<typeof BaoEcosystemAccessDecisionSchema>;

export const BaoEcosystemEnvironmentControlSchema = TypeExports.Object(
  {
    activatePath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    deactivatePath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    unmountPath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type BaoEcosystemEnvironmentControl = Static<typeof BaoEcosystemEnvironmentControlSchema>;

export const BaoEcosystemEnvironmentSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    category: BaoEcosystemEnvironmentCategorySchema,
    displayName: TypeExports.String({ minLength: 1 }),
    detail: TypeExports.String(),
    source: TypeExports.Union([
      TypeExports.Literal("core"),
      TypeExports.Literal("checked-in-bao"),
      TypeExports.Literal("persisted-bao"),
      TypeExports.Literal("hot-loaded-bao"),
      TypeExports.Literal("session"),
      TypeExports.Literal("user-preference"),
    ]),
    loaded: TypeExports.Boolean(),
    available: TypeExports.Boolean(),
    access: BaoEcosystemAccessDecisionSchema,
    route: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    control: TypeExports.Optional(BaoEcosystemEnvironmentControlSchema),
  },
  { additionalProperties: false },
);

export type BaoEcosystemEnvironment = Static<typeof BaoEcosystemEnvironmentSchema>;

export const BaoEcosystemRouteActionSchema = TypeExports.Object(
  {
    kind: TypeExports.Literal("route"),
    path: TypeExports.String({ minLength: 1 }),
    method: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoEcosystemToggleActionSchema = TypeExports.Object(
  {
    kind: TypeExports.Literal("toggle-environment"),
    environmentId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoEcosystemContextActionSchema = TypeExports.Object(
  {
    kind: TypeExports.Literal("context"),
    contextKey: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoEcosystemCommandActionSchema = TypeExports.Union([
  BaoEcosystemRouteActionSchema,
  BaoEcosystemToggleActionSchema,
  BaoEcosystemContextActionSchema,
]);

export type BaoEcosystemCommandAction = Static<typeof BaoEcosystemCommandActionSchema>;

export const BaoEcosystemCommandProviderSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    kind: TypeExports.Union([
      TypeExports.Literal("page"),
      TypeExports.Literal("api"),
      TypeExports.Literal("package"),
      TypeExports.Literal("huggingface"),
      TypeExports.Literal("session"),
      TypeExports.Literal("storage"),
      TypeExports.Literal("command"),
      TypeExports.Literal("workstream"),
      TypeExports.Literal("setting"),
    ]),
    label: TypeExports.String({ minLength: 1 }),
    detail: TypeExports.Optional(TypeExports.String()),
    environmentId: TypeExports.Optional(TypeExports.String()),
    action: BaoEcosystemCommandActionSchema,
    access: BaoEcosystemAccessDecisionSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemCommandProvider = Static<typeof BaoEcosystemCommandProviderSchema>;

export const BaoEcosystemApiEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    method: TypeExports.String({ minLength: 1 }),
    path: TypeExports.String({ minLength: 1 }),
    summary: TypeExports.String(),
    owner: TypeExports.String({ minLength: 1 }),
    ownerLabel: TypeExports.String({ minLength: 1 }),
    tags: TypeExports.Array(TypeExports.String()),
    environmentId: TypeExports.String({ minLength: 1 }),
    access: BaoEcosystemAccessDecisionSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemApiEntry = Static<typeof BaoEcosystemApiEntrySchema>;

export const BaoEcosystemNavigationEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    href: TypeExports.String({ minLength: 1 }),
    placement: TypeExports.String({ minLength: 1 }),
    environmentId: TypeExports.Optional(TypeExports.String()),
    access: BaoEcosystemAccessDecisionSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemNavigationEntry = Static<typeof BaoEcosystemNavigationEntrySchema>;

export const BaoEcosystemDashboardPanelSizeSchema = TypeExports.Union([
  TypeExports.Literal("narrow"),
  TypeExports.Literal("wide"),
  TypeExports.Literal("full"),
]);

export type BaoEcosystemDashboardPanelSize = Static<typeof BaoEcosystemDashboardPanelSizeSchema>;

export const BAO_ECOSYSTEM_DASHBOARD_LIMITS = {
  name: { min: 1, max: 120 },
  tile: { min: 1, max: 256 },
  gridSpec: { min: 1, max: 256 },
} as const;

export const BaoEcosystemDashboardLayoutSchema = TypeExports.Object(
  {
    tiles: TypeExports.Array(
      TypeExports.String({
        minLength: BAO_ECOSYSTEM_DASHBOARD_LIMITS.tile.min,
        maxLength: BAO_ECOSYSTEM_DASHBOARD_LIMITS.tile.max,
      }),
    ),
    gridSpec: TypeExports.String({
      minLength: BAO_ECOSYSTEM_DASHBOARD_LIMITS.gridSpec.min,
      maxLength: BAO_ECOSYSTEM_DASHBOARD_LIMITS.gridSpec.max,
    }),
    name: TypeExports.Optional(
      TypeExports.String({
        minLength: BAO_ECOSYSTEM_DASHBOARD_LIMITS.name.min,
        maxLength: BAO_ECOSYSTEM_DASHBOARD_LIMITS.name.max,
      }),
    ),
    sidebarRegistered: TypeExports.Optional(TypeExports.Boolean()),
    createdAt: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    updatedAt: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type BaoEcosystemDashboardLayout = Static<typeof BaoEcosystemDashboardLayoutSchema>;

export const BaoEcosystemModelEndpointPreferenceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    provider: TypeExports.String({ minLength: 1 }),
    baseUrl: TypeExports.String({ minLength: 1 }),
    modelId: TypeExports.String({ minLength: 1 }),
    execution: TypeExports.Union([
      TypeExports.Literal("on-device"),
      TypeExports.Literal("cloud"),
      TypeExports.Literal("hybrid"),
    ]),
    available: TypeExports.Boolean(),
    scope: TypeExports.Union([TypeExports.Literal("user"), TypeExports.Literal("workspace")]),
  },
  { additionalProperties: false },
);

export type BaoEcosystemModelEndpointPreference = Static<
  typeof BaoEcosystemModelEndpointPreferenceSchema
>;

export const BaoEcosystemConnectorPreferenceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    kind: TypeExports.Union([
      TypeExports.Literal("mcp"),
      TypeExports.Literal("plugin"),
      TypeExports.Literal("api"),
    ]),
    endpoint: TypeExports.String({ minLength: 1 }),
    loadMode: TypeExports.Union([
      TypeExports.Literal("auto"),
      TypeExports.Literal("on-demand"),
      TypeExports.Literal("off"),
    ]),
    scope: TypeExports.Union([TypeExports.Literal("user"), TypeExports.Literal("workspace")]),
    capabilities: TypeExports.Array(TypeExports.String()),
    enabled: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export type BaoEcosystemConnectorPreference = Static<typeof BaoEcosystemConnectorPreferenceSchema>;

export const BaoEcosystemAgentConfigurationPreferenceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    modes: TypeExports.Array(TypeExports.String()),
    connectorIds: TypeExports.Array(TypeExports.String()),
    modelId: TypeExports.String(),
    instructions: TypeExports.String(),
    scope: TypeExports.Union([TypeExports.Literal("user"), TypeExports.Literal("workspace")]),
    pinned: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export type BaoEcosystemAgentConfigurationPreference = Static<
  typeof BaoEcosystemAgentConfigurationPreferenceSchema
>;

export const BaoEcosystemUiPreferencesSchema = TypeExports.Object(
  {
    density: TypeExports.Union([
      TypeExports.Literal("compact"),
      TypeExports.Literal("comfortable"),
      TypeExports.Literal("spacious"),
    ]),
    fontScale: TypeExports.Number({ minimum: 0.75, maximum: 1.5 }),
    locale: TypeExports.String({ minLength: 2 }),
    motion: TypeExports.Union([TypeExports.Literal("full"), TypeExports.Literal("reduced")]),
    commandPaletteDefault: TypeExports.Boolean(),
    sidebarCollapsed: TypeExports.Boolean(),
    dashboardPanelIds: TypeExports.Array(TypeExports.String()),
    dashboardPanelSizes: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      BaoEcosystemDashboardPanelSizeSchema,
    ),
    dashboardLayouts: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      BaoEcosystemDashboardLayoutSchema,
    ),
    loadedEnvironmentIds: TypeExports.Array(TypeExports.String()),
    activeWorkspaceId: TypeExports.Union([
      TypeExports.String({ minLength: 1 }),
      TypeExports.Null(),
    ]),
    modelEndpoints: TypeExports.Array(BaoEcosystemModelEndpointPreferenceSchema),
    connectors: TypeExports.Array(BaoEcosystemConnectorPreferenceSchema),
    agentConfigurations: TypeExports.Array(BaoEcosystemAgentConfigurationPreferenceSchema),
  },
  { additionalProperties: false },
);

export type BaoEcosystemUiPreferences = Static<typeof BaoEcosystemUiPreferencesSchema>;

export const BaoEcosystemUiPreferencePatchSchema = TypeExports.Partial(
  BaoEcosystemUiPreferencesSchema,
  { additionalProperties: false },
);

export type BaoEcosystemUiPreferencePatch = Partial<BaoEcosystemUiPreferences>;

export const BaoEcosystemAuthCapabilitySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    configured: TypeExports.Boolean(),
    detail: TypeExports.String(),
    route: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

export type BaoEcosystemAuthCapability = Static<typeof BaoEcosystemAuthCapabilitySchema>;

export const BaoEcosystemStorageCapabilitySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    provider: TypeExports.String({ minLength: 1 }),
    scope: TypeExports.Union([TypeExports.Literal("local"), TypeExports.Literal("remote")]),
    configured: TypeExports.Boolean(),
    detail: TypeExports.String(),
    environmentId: TypeExports.String({ minLength: 1 }),
    route: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

export type BaoEcosystemStorageCapability = Static<typeof BaoEcosystemStorageCapabilitySchema>;

export const BaoEcosystemInstalledPluginSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    detail: TypeExports.String(),
    runtimeScope: TypeExports.String({ minLength: 1 }),
    targetKind: TypeExports.String({ minLength: 1 }),
    moduleId: TypeExports.String({ minLength: 1 }),
    environmentId: TypeExports.String({ minLength: 1 }),
    access: BaoEcosystemAccessDecisionSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemInstalledPlugin = Static<typeof BaoEcosystemInstalledPluginSchema>;

export const BaoEcosystemDashboardPanelSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    labelKey: TypeExports.String({ minLength: 1 }),
    defaultSize: BaoEcosystemDashboardPanelSizeSchema,
    visible: TypeExports.Boolean(),
    size: BaoEcosystemDashboardPanelSizeSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemDashboardPanel = Static<typeof BaoEcosystemDashboardPanelSchema>;

export const BaoEcosystemDashboardEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    route: TypeExports.String({ minLength: 1 }),
    environmentId: TypeExports.String({ minLength: 1 }),
    pinned: TypeExports.Boolean(),
    editable: TypeExports.Boolean(),
    panels: TypeExports.Array(BaoEcosystemDashboardPanelSchema),
    access: BaoEcosystemAccessDecisionSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemDashboardEntry = Static<typeof BaoEcosystemDashboardEntrySchema>;

export type {
  TenancyOrganization as BaoEcosystemTenancyOrganization,
  TenancyWorkspace as BaoEcosystemTenancyWorkspace,
} from "./tenancy.schemas";
export {
  TenancyOrganizationSchema as BaoEcosystemTenancyOrganizationSchema,
  TenancyWorkspaceSchema as BaoEcosystemTenancyWorkspaceSchema,
} from "./tenancy.schemas";

import { TenancyOrganizationSchema, TenancyWorkspaceSchema } from "./tenancy.schemas";

export const BaoEcosystemWorkspacePhaseSchema = TypeExports.Union([
  TypeExports.Literal("planned"),
  TypeExports.Literal("available"),
]);

export type BaoEcosystemWorkspacePhase = Static<typeof BaoEcosystemWorkspacePhaseSchema>;

export const BaoEcosystemTenancySchema = TypeExports.Object(
  {
    organizationPluginEnabled: TypeExports.Boolean(),
    activeOrganizationId: TypeExports.Union([
      TypeExports.String({ minLength: 1 }),
      TypeExports.Null(),
    ]),
    preferenceTenantId: TypeExports.String({ minLength: 1 }),
    personalTenantId: TypeExports.String({ minLength: 1 }),
    setActiveOrganizationPath: TypeExports.String({ minLength: 1 }),
    organizations: TypeExports.Array(TenancyOrganizationSchema),
    groupIds: TypeExports.Array(TypeExports.String()),
    workspacePhase: BaoEcosystemWorkspacePhaseSchema,
    activeWorkspaceId: TypeExports.Union([
      TypeExports.String({ minLength: 1 }),
      TypeExports.Null(),
    ]),
    workspaces: TypeExports.Array(TenancyWorkspaceSchema),
  },
  { additionalProperties: false },
);

export type BaoEcosystemTenancy = Static<typeof BaoEcosystemTenancySchema>;

export const BaoEcosystemGraphSchema = TypeExports.Object(
  {
    schemaVersion: TypeExports.Literal(1),
    revision: TypeExports.String({ minLength: 1 }),
    generatedAt: TypeExports.String({ format: "date-time" }),
    tenancy: TypeExports.Optional(BaoEcosystemTenancySchema),
    environments: TypeExports.Array(BaoEcosystemEnvironmentSchema),
    commandProviders: TypeExports.Array(BaoEcosystemCommandProviderSchema),
    apiEntries: TypeExports.Array(BaoEcosystemApiEntrySchema),
    navigationEntries: TypeExports.Array(BaoEcosystemNavigationEntrySchema),
    pageEntries: TypeExports.Array(BaoEcosystemNavigationEntrySchema),
    authCapabilities: TypeExports.Array(BaoEcosystemAuthCapabilitySchema),
    storageCapabilities: TypeExports.Array(BaoEcosystemStorageCapabilitySchema),
    installedPlugins: TypeExports.Array(BaoEcosystemInstalledPluginSchema),
    dashboards: TypeExports.Array(BaoEcosystemDashboardEntrySchema),
    preferences: BaoEcosystemUiPreferencesSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemGraph = Static<typeof BaoEcosystemGraphSchema>;

export const BaoEcosystemGraphResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: BaoEcosystemGraphSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemGraphResponse = Static<typeof BaoEcosystemGraphResponseSchema>;

export const BaoEcosystemPreferenceUpdatePayloadSchema = TypeExports.Object(
  {
    preferences: BaoEcosystemUiPreferencePatchSchema,
  },
  { additionalProperties: false },
);

export interface BaoEcosystemPreferenceUpdatePayload {
  readonly preferences: BaoEcosystemUiPreferencePatch;
}

export const BaoEcosystemPreferenceUpdateResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: BaoEcosystemUiPreferencesSchema,
  },
  { additionalProperties: false },
);

export type BaoEcosystemPreferenceUpdateResponse = Static<
  typeof BaoEcosystemPreferenceUpdateResponseSchema
>;
