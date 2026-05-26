/**
 * Canonical htmx route paths and sidebar configuration.
 *
 * Single source of truth for htmx HTML routes. Used by server-side sidebar,
 * breadcrumbs, and navigation. Aligns with docs/architecture/htmx-canonical-paths.md.
 *
 * @packageDocumentation
 */

/** Canonical path for a sidebar or nav item. */
export interface HtmxRouteItem {
  /** Translation key for display label. */
  labelKey: HtmxSidebarLabelKey;
  /** URL path (canonical per htmx-canonical-paths.md). */
  href: string;
  /** Canonical sidebar icon identifier. */
  iconName: HtmxSidebarIconName;
  /** Optional translation key when tooltip should differ from label text. */
  tooltipKey?: HtmxSidebarLabelKey;
  /**
   * Role required to view the entry. Threaded into the canonical sidebar
   * registration so the access service hides the link for sessions whose
   * role does not match the route's server-side guard.
   */
  requiredRole?: string;
  /** Child items rendered as collapsible sub-menu entries. */
  children?: HtmxRouteItem[];
}

/** Canonical icon identifiers used by the default HTMX sidebar. */
export type HtmxSidebarIconName =
  | "dashboard"
  | "infrastructure"
  | "settings"
  | "cases"
  | "patients"
  | "reports"
  | "ai"
  | "apiExplorer"
  | "automation"
  | "imaging"
  | "xr"
  | "apps"
  | "dashboards"
  | "users"
  | "devices"
  | "storage"
  | "observability"
  | "docs"
  | "fleet"
  | "rpa"
  | "pipelines"
  | "baoComposer"
  | "scanner"
  | "perception"
  | "gaussian"
  | "splatbao"
  | "chat"
  | "mcp"
  | "agentic"
  | "calibration"
  | "hardware"
  | "robotics"
  | "drones"
  | "bunbuddy"
  | "baoArchiveAuthoring"
  | "baoInstall"
  | "commerce"
  | "notifications"
  | "genAi"
  | "training"
  | "mlops"
  | "digitalTwin"
  | "portal"
  | "workOrders"
  | "purchaseOrders"
  | "invoices"
  | "rfqs";

/** Translation keys used by canonical default htmx sidebar items. */
export type HtmxSidebarLabelKey =
  | "nav.dashboard"
  | "nav.infrastructure"
  | "nav.settings"
  | "nav.cases"
  | "nav.patients"
  | "nav.reports"
  | "nav.ai"
  | "nav.aiPlayground"
  | "nav.apiExplorer"
  | "nav.automation"
  | "nav.baodown"
  | "nav.imaging"
  | "nav.xr"
  | "nav.apps"
  | "nav.dashboards"
  | "nav.userDirectory"
  | "nav.devices"
  | "nav.storage"
  | "nav.observability"
  | "nav.docs"
  | "nav.mcp"
  | "nav.systemAi"
  | "nav.fleet"
  | "nav.rpa"
  | "nav.pipelines"
  | "nav.baoComposer"
  | "nav.baoAutomation"
  | "nav.scanner"
  | "nav.perception"
  | "nav.gaussian"
  | "nav.splatbao"
  | "nav.chat"
  | "nav.agentic"
  | "nav.agenticStorage"
  | "nav.baoAgent"
  | "nav.calibration"
  | "nav.hardware"
  | "nav.robotics"
  | "nav.drones"
  | "nav.bunbuddy"
  | "nav.computerUse"
  | "nav.baoArchiveAuthoring"
  | "nav.baoInstall"
  | "nav.commerce"
  | "nav.products"
  | "nav.notifications"
  | "nav.genAi"
  | "nav.training"
  | "nav.mlops"
  | "nav.digitalTwin"
  | "nav.workOrders"
  | "nav.purchaseOrders"
  | "nav.invoices"
  | "nav.portal"
  | "nav.rfqs"
  | "nav.integrations"
  | "nav.operations"
  | "nav.sandbox"
  | "nav.group.operations"
  | "nav.group.automation"
  | "nav.group.imaging"
  | "nav.group.intelligence"
  | "nav.group.hardware"
  | "nav.group.commerce"
  | "nav.group.system"
  | "nav.pathologyWorkflows"
  | "nav.annotations"
  | "nav.medicalWorkflows"
  | "nav.usdWorkflows"
  | "nav.uiWorkflows"
  | "nav.aiWorkflows";

const DASHBOARD_ROUTE_ROOT = "/dashboard";
const DASHBOARD_ROUTE_QUERY_PARAM = "dashboard";

function savedDashboardRoute(id: string): string {
  const params = new URLSearchParams({ [DASHBOARD_ROUTE_QUERY_PARAM]: id });
  return `${DASHBOARD_ROUTE_ROOT}?${params.toString()}`;
}

export const CHAT_HUB_MODES = ["ai", "user", "video", "status", "secure"] as const;
export type ChatHubMode = (typeof CHAT_HUB_MODES)[number];

/** Canonical htmx route paths. Use these for links, redirects, and navigation. */
export const HTMX_ROUTES = {
  root: "/",
  catalog: {
    list: "/catalog",
  },
  dashboard: {
    root: DASHBOARD_ROUTE_ROOT,
    savedQueryParam: DASHBOARD_ROUTE_QUERY_PARAM,
    summary: "/dashboard/summary",
    notifications: "/dashboard/notifications",
    bunbuddyResources: "/dashboard/bunbuddy-resources",
    saved: savedDashboardRoute,
  },
  settings: "/settings",
  settingsLocale: "/settings/locale",
  settingsSystemAiStatus: "/settings/system-ai/status",
  settingsVirtualEnv: {
    provision: "/settings/virtual-env/actions/provision",
    destroy: (id: string) => `/settings/virtual-env/${encodeURIComponent(id)}/actions/destroy`,
    destroyRoute: "/settings/virtual-env/:id/actions/destroy",
  },
  settingsCustomDomain: {
    register: "/settings/custom-domain/actions/register",
    verify: (id: string) => `/settings/custom-domain/${encodeURIComponent(id)}/actions/verify`,
    verifyRoute: "/settings/custom-domain/:id/actions/verify",
    revoke: (id: string) => `/settings/custom-domain/${encodeURIComponent(id)}/actions/revoke`,
    revokeRoute: "/settings/custom-domain/:id/actions/revoke",
  },
  settingsEnvironmentAccess: {
    virtualEnv: "/settings/fragments/virtual-env",
    customDomain: "/settings/fragments/custom-domain",
    combined: "/settings/fragments/environment-access",
  },
  settingsTabPanel: {
    general: "/settings/tabs/general",
    ecosystem: "/settings/tabs/ecosystem",
    apis: "/settings/tabs/apis",
    features: "/settings/tabs/features",
    instructions: "/settings/tabs/instructions",
    agents: "/settings/tabs/agents",
    shortcuts: "/settings/tabs/shortcuts",
    bumblebaoScan: "/settings/tabs/bumblebao-scan",
    bumblebaoScanSave: "/settings/tabs/bumblebao-scan/actions/save",
  },
  infrastructure: {
    root: "/infrastructure",
    baoExtensionStatus: "/infrastructure/bao-extension-status",
    baoExtensionStatusSse: "/infrastructure/bao-extension-status.sse",
    baoExtensionAssetPacksLoad: "/infrastructure/bao-extension-status/asset-packs/load",
    baoExtensionAssetPacksUnload: "/infrastructure/bao-extension-status/asset-packs/unload",
    baoControlPlaneStatus: "/infrastructure/bao-control-plane-status",
    baoControlPlaneStatusSse: "/infrastructure/bao-control-plane-status.sse",
    baoControlPlaneStatusRefresh: "/infrastructure/bao-control-plane-status/refresh",
    baoControlPlaneStatusEnsure: "/infrastructure/bao-control-plane-status/ensure",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    consent: "/auth/consent",
    error: "/auth/error",
    // P2 smoke + /dev/ cutover (plan 019e5f8f-d962-7d63-a397-20f5057a5267 + discovery 019e5ea0); excised .bao-first per AGENTS.md (no legacy dev fixtures). See bao/src/gates/validators/rules/no-direct-route-literals.ts (DIRECT_ROUTE_PATTERN from patterns.ts), no-direct-env-access.ts, no-fallback-shims.ts, accessibility-landmarks.ts, no-debug-markers.ts, ui-status-badge-icon-required.ts.
  },
  cases: {
    list: "/cases",
    new: "/cases/new",
    detail: (id: string) => `/cases/${id}`,
    edit: (id: string) => `/cases/${id}/edit`,
    upload: (id: string) => `/cases/${id}/upload`,
    delete: (id: string) => `/cases/${id}/delete`,
  },
  patients: {
    list: "/patients",
    detail: (id: string) => `/patients/${id}`,
  },
  reports: {
    list: "/reports",
    new: "/reports/new",
    detail: (id: string) => `/reports/${id}`,
    edit: (id: string) => `/reports/${id}/edit`,
  },
  storage: "/storage",
  tasks: {
    list: "/tasks",
    detail: (id: string) => `/tasks/${id}`,
  },
  hub: {
    integrations: "/integrations",
    domainMap: "/integrations/domain-map",
    ownership: "/integrations/ownership",
    deviceAssistant: "/integrations/device-assistant",
    operations: "/operations",
    notifications: "/notifications",
    notificationRead: <I extends string>(id: I) => `/notifications/${id}/read` as const,
  },
  workOrders: {
    list: "/operations/work-orders",
    new: "/operations/work-orders/new",
    detail: (id: string) => `/operations/work-orders/${id}`,
    edit: (id: string) => `/operations/work-orders/${id}/edit`,
  },
  purchaseOrders: {
    list: "/operations/purchase-orders",
    new: "/operations/purchase-orders/new",
    detail: (id: string) => `/operations/purchase-orders/${id}`,
    edit: (id: string) => `/operations/purchase-orders/${id}/edit`,
  },
  invoices: {
    list: "/operations/invoices",
    new: "/operations/invoices/new",
    detail: (id: string) => `/operations/invoices/${id}`,
    edit: (id: string) => `/operations/invoices/${id}/edit`,
  },
  rfqs: {
    list: "/operations/rfqs",
    new: "/operations/rfqs/new",
    detail: (id: string) => `/operations/rfqs/${id}`,
    edit: (id: string) => `/operations/rfqs/${id}/edit`,
    convert: (id: string) => `/operations/rfqs/${id}/convert`,
  },
  mlops: {
    root: "/mlops",
  },
  portal: {
    root: "/portal",
    orders: "/portal/orders",
    workOrders: "/portal/work-orders",
    invoices: "/portal/invoices",
    orderDetail: (id: string) => `/portal/orders/${encodeURIComponent(id)}`,
  },
  admin: {
    root: "/admin",
    help: "/admin/help",
    starter: "/admin/starter",
    splatbao: "/admin/splatbao",
    aiProviders: "/admin/ai-providers",
    users: "/admin/users",
    usersNew: "/admin/users/new",
    userDetail: (id: string) => `/admin/users/${id}`,
    userEdit: (id: string) => `/admin/users/${id}/edit`,
    userDelete: (id: string) => `/admin/users/${id}/delete`,
    devices: "/admin/devices",
    deviceNew: "/admin/devices/new",
    deviceDetail: (deviceId: string) => `/admin/devices/${deviceId}`,
    deviceEdit: (deviceId: string) => `/admin/devices/${deviceId}/edit`,
    deviceDelete: (deviceId: string) => `/admin/devices/${deviceId}/delete`,
    hardwareHealthWidget: "/admin/hardware/health-widget",
  },
  devices: {
    root: "/devices",
    manager: "/devices/manager",
    calibration: "/devices/calibration",
    calibrationDetail: (id: string) => `/devices/calibration/${id}`,
    hardware: "/hardware",
    robotics: "/robotics",
    uav: "/uav",
    vehicles: "/vehicles",
    digitalTwin: "/digital-twin",
  },
  imaging: {
    root: "/imaging",
    workspace: "/imaging/workspace",
    scanner: "/imaging/scanner",
    scannerDetail: <I extends string>(id: I) => `/imaging/scanner/${id}` as const,
    perception: "/imaging/perception",
    gaussian: "/imaging/gaussian",
    gaussianDetail: <I extends string>(id: I) => `/imaging/gaussian/${id}` as const,
  },
  ai: {
    root: "/ai",
    models: "/ai/models",
    playground: "/ai/playground",
    playgroundOnnx: "/ai/playground/onnx",
    playgroundRag: "/ai/playground/rag",
    providers: "/ai/providers",
    providerAzure: "/ai/providers/azure",
    providerAzureEdit: "/ai/providers/azure/edit",
    providerOllama: "/ai/providers/ollama",
    providerOllamaEdit: "/ai/providers/ollama/edit",
    providerHuggingface: "/ai/providers/huggingface",
    providerHuggingfaceEdit: "/ai/providers/huggingface/edit",
    providerHuggingfaceSearch: "/ai/providers/huggingface/search",
    providerHuggingfaceInstall: "/ai/providers/huggingface/install",
    providerHuggingfaceInstalled: "/ai/providers/huggingface/installed",
    genAi: "/apps/gen-ai",
    systemConfig: "/ai/system-config",
    systemConfigTestConnection: "/ai/system-config/test-connection",
  },
  automation: {
    root: "/automation",
    rpa: "/automation/rpa",
    rpaWorkflows: "/automation/rpa/workflows",
    rpaWorkflowNew: "/automation/rpa/workflows/new",
    rpaWorkflowDetail: (id: string) => `/automation/rpa/workflows/${id}`,
    rpaWorkflowEdit: (id: string) => `/automation/rpa/workflows/${id}/edit`,
    rpaExecutions: "/automation/rpa/executions",
    rpaExecutionDetail: (id: string) => `/automation/rpa/executions/${id}`,
    rpaLibraries: "/automation/rpa/libraries",
    rpaLibraryDetail: (name: string) => `/automation/rpa/libraries/${name}`,
    pipelines: "/automation/pipelines",
    nodes: "/automation/nodes",
    nodeDetail: (nodeKey: string) => `/automation/nodes/${nodeKey}`,
    runs: "/automation/runs",
    runTimeline: (runId: string) => `/automation/runs/${runId}/timeline`,
    baoComposer: "/automation/bao-composer",
    baoComposerPreview: "/automation/bao-composer/preview",
    baoComposerImprove: "/automation/bao-composer/improve",
    baoComposerGenerate: "/automation/bao-composer/generate",
    baoComposerInstall: "/automation/bao-composer/install",
    bao: "/automation/bao",
    baoArchiveAuthoring: "/automation/bao-archive-authoring",
    baoArchiveAuthoringNew: "/automation/bao-archive-authoring/new",
    baoArchiveAuthoringJob: (id: string) => `/automation/bao-archive-authoring/jobs/${id}`,
    baoArchiveAuthoringJobStatus: (id: string) =>
      `/automation/bao-archive-authoring/jobs/${id}/status`,
    baoArchiveAuthoringJobResults: (id: string) =>
      `/automation/bao-archive-authoring/jobs/${id}/results`,
    baodown: "/automation/baodown",
    baodownNew: "/automation/baodown/new",
    baodownDefinition: <Id extends string>(id: Id) =>
      `/automation/baodown/definitions/${id}` as const,
    baodownDefinitionEdit: <Id extends string>(id: Id) =>
      `/automation/baodown/definitions/${id}/edit` as const,
    baodownDefinitionEditor: <Id extends string>(id: Id) =>
      `/automation/baodown/definitions/${id}/editor` as const,
    baodownDefinitionDelete: <Id extends string>(id: Id) =>
      `/automation/baodown/definitions/${id}/delete` as const,
    baodownVersionNew: <Id extends string>(definitionId: Id) =>
      `/automation/baodown/definitions/${definitionId}/versions/new` as const,
    baodownDefinitionUnpublish: <Id extends string>(id: Id) =>
      `/automation/baodown/definitions/${id}/unpublish` as const,
    baodownScheduleNew: <Id extends string>(definitionId: Id) =>
      `/automation/baodown/definitions/${definitionId}/schedules/new` as const,
    baodownScheduleEdit: <Id extends string, Sched extends string>(
      definitionId: Id,
      scheduleId: Sched,
    ) => `/automation/baodown/definitions/${definitionId}/schedules/${scheduleId}/edit` as const,
    baodownScheduleToggle: <Id extends string, Sched extends string>(
      definitionId: Id,
      scheduleId: Sched,
    ) => `/automation/baodown/definitions/${definitionId}/schedules/${scheduleId}/toggle` as const,
    baodownScheduleDelete: <Id extends string, Sched extends string>(
      definitionId: Id,
      scheduleId: Sched,
    ) => `/automation/baodown/definitions/${definitionId}/schedules/${scheduleId}/delete` as const,
    baodownWebhookNew: <Id extends string>(definitionId: Id) =>
      `/automation/baodown/definitions/${definitionId}/webhooks/new` as const,
    baodownWebhookToggle: <Id extends string, Hook extends string>(
      definitionId: Id,
      webhookId: Hook,
    ) => `/automation/baodown/definitions/${definitionId}/webhooks/${webhookId}/toggle` as const,
    baodownWebhookRotate: <Id extends string, Hook extends string>(
      definitionId: Id,
      webhookId: Hook,
    ) => `/automation/baodown/definitions/${definitionId}/webhooks/${webhookId}/rotate` as const,
    baodownWebhookDelete: <Id extends string, Hook extends string>(
      definitionId: Id,
      webhookId: Hook,
    ) => `/automation/baodown/definitions/${definitionId}/webhooks/${webhookId}/delete` as const,
    baodownVersion: <Id extends string>(id: Id) => `/automation/baodown/versions/${id}` as const,
    baodownVersionDiff: <Id extends string>(definitionId: Id) =>
      `/automation/baodown/definitions/${definitionId}/versions/diff` as const,
    baodownVersionPublish: <Id extends string, Ver extends string>(
      definitionId: Id,
      versionId: Ver,
    ) => `/automation/baodown/definitions/${definitionId}/versions/${versionId}/publish` as const,
    baodownVersionRollback: <Id extends string, Ver extends string>(
      definitionId: Id,
      versionId: Ver,
    ) => `/automation/baodown/definitions/${definitionId}/versions/${versionId}/rollback` as const,
    baodownVersionRun: <Id extends string, Ver extends string>(definitionId: Id, versionId: Ver) =>
      `/automation/baodown/definitions/${definitionId}/versions/${versionId}/run` as const,
    baodownDefinitionRun: <Id extends string>(id: Id) =>
      `/automation/baodown/definitions/${id}/run` as const,
    baodownRun: <Id extends string>(id: Id) => `/automation/baodown/runs/${id}` as const,
    baodownRunPanel: <Id extends string>(id: Id) => `/automation/baodown/runs/${id}/panel` as const,
    baodownRunCancel: <Id extends string>(id: Id) =>
      `/automation/baodown/runs/${id}/cancel` as const,
    baodownUsdWorkflows: "/usd/workflows",
    baodownUsdEditor: <Id extends string>(workflowId: Id) =>
      `/usd/workflows/${workflowId}/editor` as const,
    baodownPathologyWorkflows: "/pathology/workflows",
    baodownPathologyEditor: <Id extends string>(workflowId: Id) =>
      `/pathology/workflows/${workflowId}/editor` as const,
    baodownAnnotations: "/annotations/assets",
    baodownMedicalWorkflows: "/medical/workflows",
    baodownMedicalEditor: <Id extends string>(workflowId: Id) =>
      `/medical/workflows/${workflowId}/editor` as const,
    baodownUiWorkflows: "/ui/workflows",
    baodownUiEditor: <Id extends string>(workflowId: Id) =>
      `/ui/workflows/${workflowId}/editor` as const,
    baodownAiWorkflows: "/ai/workflows",
    baodownAiEditor: <Id extends string>(workflowId: Id) =>
      `/ai/workflows/${workflowId}/editor` as const,
  },
  baoInstall: {
    root: "/bao-install",
    new: "/bao-install/new",
    detail: (id: string) => `/bao-install/installs/${id}`,
    retry: (id: string) => `/bao-install/installs/${id}/retry`,
    uninstall: (id: string) => `/bao-install/installs/${id}/uninstall`,
    targetHandlers: "/bao-install/target-handlers",
    sessions: "/bao-install/sessions",
    runtimeActivate: (id: string) => `/bao-install/sessions/${id}/activate`,
    runtimeDeactivate: (id: string) => `/bao-install/sessions/${id}/deactivate`,
    runtimeUnmount: (id: string) => `/bao-install/sessions/${id}/unmount`,
  },
  agentic: {
    root: "/agentic",
    storage: "/agentic/storage",
    agent: "/agentic/bao-agent",
    agentMessage: (sessionId: string) => `/agentic/bao-agent/sessions/${sessionId}/messages`,
    agentMessagePattern: "/agentic/bao-agent/sessions/:sessionId/messages",
    agentToolRun: (sessionId: string, toolId: string) =>
      `/agentic/bao-agent/sessions/${sessionId}/tools/${toolId}/runs`,
    agentToolRunPattern: "/agentic/bao-agent/sessions/:sessionId/tools/:toolId/runs",
    mcp: "/agentic/mcp",
    mcpDomain: (domain: string) => `/agentic/mcp/${domain}`,
    mcpInstall: "/agentic/mcp/install",
    mcpInstallApply: "/agentic/mcp/install/apply",
    mcpTestConnection: (providerId: string) => `/agentic/mcp/${providerId}/test-connection`,
  },
  sandbox: {
    grants: "/sandbox/grants",
    grantQueued: (correlationId: string) => `/sandbox/grants/queued/${correlationId}`,
    computerUse: "/sandbox/computer-use",
    computerUseStart: "/sandbox/computer-use/actions/start",
    computerUseSessions: "/sandbox/computer-use/partials/sessions",
    computerUsePeerStatus: (iconKey: string) => `/sandbox/computer-use/peers/${iconKey}/status`,
    computerUsePeerStatusRoute: "/sandbox/computer-use/peers/:iconKey/status",
    computerUseSessionStream: (sessionId: string) =>
      `/sandbox/computer-use/sessions/${sessionId}/stream`,
    computerUseSessionStreamRoute: "/sandbox/computer-use/sessions/:sessionId/stream",
  },
  apiExplorer: {
    root: "/api-explorer",
    tryRoute: "/api-explorer/try",
    openApiSpec: "/api/openapi.json",
  },
  docs: {
    root: "/docs",
    api: "/docs/api",
    ops: "/ops",
    apiRedirect: "/api/docs",
  },
  fleet: {
    root: "/fleet",
    partials: {
      runStatus: "/fleet/partials/run-status",
      incidents: "/fleet/partials/incidents",
      events: "/fleet/partials/events",
    },
    deviceControl: (deviceId: string) => `/fleet/devices/${deviceId}/control`,
    deviceTelemetry: (deviceId: string) => `/fleet/devices/${deviceId}/telemetry`,
    deviceTelemetryStream: (deviceId: string) => `/fleet/devices/${deviceId}/telemetry/stream`,
    missions: "/fleet/missions",
    missionDetail: (missionId: string) => `/fleet/missions/${missionId}`,
    missionEvents: (missionId: string) => `/fleet/missions/${missionId}/events`,
  },
  bunbuddy: {
    root: "/bunbuddy",
    detail: <K extends string>(kind: K) => `/bunbuddy/${kind}` as const,
  },
  fragments: {
    baodownEditor: "/fragments/baodown-editor",
    baodownDefinitionRuns: (definitionId: string) =>
      `/fragments/baodown-definitions/${definitionId}/runs`,
  },
  shell: {
    localeChrome: "/shell/fragments/locale-chrome",
  },
  xr: {
    root: "/xr",
    viewer: "/xr/viewer",
    experiences: "/xr/experiences",
    experienceNew: "/xr/experiences/new",
    experienceDetail: (id: string) => `/xr/experiences/${id}`,
    experienceEdit: (id: string) => `/xr/experiences/${id}/edit`,
    rendering: "/xr/rendering",
    assets: "/xr/assets",
    assetNew: "/xr/assets/new",
    assetDetail: (id: string) => `/xr/assets/${id}`,
    assetEdit: (id: string) => `/xr/assets/${id}/edit`,
  },
  chat: {
    root: "/chat",
    detail: (sessionId: string) => `/chat/${sessionId}`,
    settings: "/chat/settings",
    mode: (mode: ChatHubMode) => `/chat/m/${mode}` as const,
    modePattern: "/chat/m/:mode",
    launchPlanTrigger: "/chat/launch-plan/trigger",
    launchPlanIntent: "/chat/launch-plan/intent",
    secureSend: "/chat/secure/send",
    conversationNew: "/chat/conversation/new",
  },
  apps: {
    root: "/apps",
    chat: "/apps/chat",
    fileManager: "/apps/file-manager",
    fileManagerDetail: (id: string) => `/apps/file-manager/${id}`,
    ecommerce: {
      root: "/apps/ecommerce",
      products: "/apps/ecommerce/products",
      productNew: "/apps/ecommerce/products/new",
      productDetail: (id: string) => `/apps/ecommerce/products/${id}`,
      productEdit: (id: string) => `/apps/ecommerce/products/${id}/edit`,
      orders: "/apps/ecommerce/orders",
      orderDetail: (id: string) => `/apps/ecommerce/orders/${id}`,
      sellers: "/apps/ecommerce/sellers",
      sellerNew: "/apps/ecommerce/sellers/new",
      sellerDetail: (id: string) => `/apps/ecommerce/sellers/${id}`,
      sellerEdit: (id: string) => `/apps/ecommerce/sellers/${id}/edit`,
      shops: "/apps/ecommerce/shops",
      shopNew: "/apps/ecommerce/shops/new",
      shopDetail: (id: string) => `/apps/ecommerce/shops/${id}`,
      shopEdit: (id: string) => `/apps/ecommerce/shops/${id}/edit`,
    },
    genAi: {
      root: "/apps/gen-ai",
      home: "/apps/gen-ai/home",
      library: "/apps/gen-ai/library",
      models: "/apps/gen-ai/models",
      modelNew: "/apps/gen-ai/models/new",
      modelDetail: (id: string) => `/apps/gen-ai/models/${id}`,
      modelEdit: (id: string) => `/apps/gen-ai/models/${id}/edit`,
      training: "/apps/gen-ai/training",
      trainingNew: "/apps/gen-ai/training/new",
      trainingDetail: (id: string) => `/apps/gen-ai/training/${id}`,
      trainingEdit: (id: string) => `/apps/gen-ai/training/${id}/edit`,
      gateway: "/apps/gen-ai/gateway",
      aiSdk: "/apps/gen-ai/ai-sdk",
      huggingface: "/apps/gen-ai/huggingface",
      huggingfaceCache: "/apps/gen-ai/huggingface/cache",
      vision: "/apps/gen-ai/vision",
      image: "/apps/gen-ai/image",
      content: "/apps/gen-ai/content",
    },
  },
  dashboards: {
    root: "/dashboards",
    crm: "/dashboards/crm",
    crmSections: "/dashboards/crm/sections",
    ecommerce: "/dashboards/ecommerce",
    ecommerceSections: "/dashboards/ecommerce/sections",
    genAi: "/dashboards/gen-ai",
    genAiSections: "/dashboards/gen-ai/sections",
  },
  estate: {
    root: "/estate",
    fleet: "/fleet",
    buildings: "/buildings",
    sensors: "/sensors",
    finance: "/finance",
    erp: "/erp",
  },
  observability: {
    root: "/observability",
    metrics: "/observability/metrics",
    traces: "/observability/traces",
    logs: "/observability/logs",
    alerts: "/observability/alerts",
    live: "/observability/live",
  },
  public: {
    landing: "/landing",
    terms: "/terms",
    privacy: "/privacy",
  },
  realtime: {
    fragments: {
      /** Prefix for all contribution-fragment SSE + HTMX routes under `/realtime/fragments/`. */
      pathPrefix: "/realtime/fragments/",
      heartbeat: "/realtime/fragments/heartbeat",
      heartbeatSse: "/realtime/fragments/heartbeat.sse",
      ecosystemEventsSse: "/realtime/fragments/ecosystem-events.sse",
      settingsTabEventsSse: "/realtime/fragments/settings-tab-events.sse",
      tileGroupEventsSse: "/realtime/fragments/tile-group-events.sse",
      topbarEventsSse: "/realtime/fragments/topbar-events.sse",
    },
  },
  uiAssetPackStylesheet: (registrationId: string): string =>
    `/static/ui-asset-pack/${encodeURIComponent(registrationId)}.css`,
} as const;

/**
 * Hierarchical sidebar items organized into 7 enterprise navigation groups.
 * Each top-level item is a collapsible group with children.
 *
 * @returns Array of grouped sidebar items for drawer navigation.
 */
export function buildDefaultHtmxSidebarItems(): HtmxRouteItem[] {
  return [
    {
      labelKey: "nav.group.operations",
      href: HTMX_ROUTES.dashboard.root,
      iconName: "dashboard",
      children: [
        { labelKey: "nav.dashboard", href: HTMX_ROUTES.dashboard.root, iconName: "dashboard" },
        { labelKey: "nav.cases", href: HTMX_ROUTES.cases.list, iconName: "cases" },
        { labelKey: "nav.patients", href: HTMX_ROUTES.patients.list, iconName: "patients" },
        { labelKey: "nav.reports", href: HTMX_ROUTES.reports.list, iconName: "reports" },
        {
          labelKey: "nav.notifications",
          href: HTMX_ROUTES.hub.notifications,
          iconName: "notifications",
        },
        {
          labelKey: "nav.dashboards",
          href: HTMX_ROUTES.dashboards.root,
          iconName: "dashboards",
        },
        {
          labelKey: "nav.integrations",
          href: HTMX_ROUTES.hub.integrations,
          iconName: "apps",
        },
        {
          labelKey: "nav.operations",
          href: HTMX_ROUTES.hub.operations,
          iconName: "workOrders",
        },
        {
          labelKey: "nav.workOrders",
          href: HTMX_ROUTES.workOrders.list,
          iconName: "workOrders",
        },
        {
          labelKey: "nav.purchaseOrders",
          href: HTMX_ROUTES.purchaseOrders.list,
          iconName: "purchaseOrders",
        },
        {
          labelKey: "nav.invoices",
          href: HTMX_ROUTES.invoices.list,
          iconName: "invoices",
        },
        {
          labelKey: "nav.rfqs",
          href: HTMX_ROUTES.rfqs.list,
          iconName: "rfqs",
        },
        {
          labelKey: "nav.portal",
          href: HTMX_ROUTES.portal.root,
          iconName: "portal",
        },
      ],
    },
    {
      labelKey: "nav.group.automation",
      href: HTMX_ROUTES.automation.root,
      iconName: "automation",
      children: [
        {
          labelKey: "nav.baodown",
          href: HTMX_ROUTES.automation.baodown,
          iconName: "automation",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.rpa",
          href: HTMX_ROUTES.automation.rpa,
          iconName: "rpa",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.pipelines",
          href: HTMX_ROUTES.automation.pipelines,
          iconName: "pipelines",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.baoComposer",
          href: HTMX_ROUTES.automation.baoComposer,
          iconName: "baoComposer",
        },
        {
          labelKey: "nav.baoAutomation",
          href: HTMX_ROUTES.automation.bao,
          iconName: "bunbuddy",
        },
        {
          labelKey: "nav.baoArchiveAuthoring",
          href: HTMX_ROUTES.automation.baoArchiveAuthoring,
          iconName: "baoArchiveAuthoring",
        },
        {
          labelKey: "nav.baoInstall",
          href: HTMX_ROUTES.baoInstall.root,
          iconName: "baoInstall",
        },
        { labelKey: "nav.fleet", href: HTMX_ROUTES.fleet.root, iconName: "fleet" },
      ],
    },
    {
      labelKey: "nav.group.imaging",
      href: HTMX_ROUTES.imaging.root,
      iconName: "imaging",
      children: [
        { labelKey: "nav.imaging", href: HTMX_ROUTES.imaging.workspace, iconName: "imaging" },
        { labelKey: "nav.scanner", href: HTMX_ROUTES.imaging.scanner, iconName: "scanner" },
        {
          labelKey: "nav.perception",
          href: HTMX_ROUTES.imaging.perception,
          iconName: "perception",
        },
        { labelKey: "nav.gaussian", href: HTMX_ROUTES.imaging.gaussian, iconName: "gaussian" },
        { labelKey: "nav.xr", href: HTMX_ROUTES.xr.root, iconName: "xr" },
        {
          labelKey: "nav.splatbao",
          href: HTMX_ROUTES.admin.splatbao,
          iconName: "splatbao",
          requiredRole: "admin",
        },
      ],
    },
    {
      labelKey: "nav.group.intelligence",
      href: HTMX_ROUTES.ai.root,
      iconName: "ai",
      children: [
        { labelKey: "nav.ai", href: HTMX_ROUTES.ai.models, iconName: "ai" },
        { labelKey: "nav.aiPlayground", href: HTMX_ROUTES.ai.playground, iconName: "ai" },
        { labelKey: "nav.genAi", href: HTMX_ROUTES.apps.genAi.root, iconName: "genAi" },
        { labelKey: "nav.training", href: HTMX_ROUTES.apps.genAi.training, iconName: "training" },
        { labelKey: "nav.mlops", href: HTMX_ROUTES.mlops.root, iconName: "mlops" },
        { labelKey: "nav.chat", href: HTMX_ROUTES.apps.chat, iconName: "chat" },
        { labelKey: "nav.agentic", href: HTMX_ROUTES.agentic.root, iconName: "agentic" },
        { labelKey: "nav.baoAgent", href: HTMX_ROUTES.agentic.agent, iconName: "agentic" },
        { labelKey: "nav.agenticStorage", href: HTMX_ROUTES.agentic.storage, iconName: "storage" },
        { labelKey: "nav.mcp", href: HTMX_ROUTES.agentic.mcp, iconName: "mcp" },
        {
          labelKey: "nav.apiExplorer",
          href: HTMX_ROUTES.apiExplorer.root,
          iconName: "apiExplorer",
        },
      ],
    },
    {
      labelKey: "nav.group.hardware",
      href: HTMX_ROUTES.devices.root,
      iconName: "devices",
      children: [
        {
          labelKey: "nav.devices",
          href: HTMX_ROUTES.devices.manager,
          iconName: "devices",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.calibration",
          href: HTMX_ROUTES.devices.calibration,
          iconName: "calibration",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.hardware",
          href: HTMX_ROUTES.devices.hardware,
          iconName: "hardware",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.digitalTwin",
          href: HTMX_ROUTES.devices.digitalTwin,
          iconName: "digitalTwin",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.robotics",
          href: HTMX_ROUTES.devices.robotics,
          iconName: "robotics",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.drones",
          href: HTMX_ROUTES.devices.uav,
          iconName: "drones",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.bunbuddy",
          href: HTMX_ROUTES.bunbuddy.root,
          iconName: "bunbuddy",
        },
      ],
    },
    {
      labelKey: "nav.group.commerce",
      href: HTMX_ROUTES.apps.ecommerce.root,
      iconName: "commerce",
      children: [
        {
          labelKey: "nav.products",
          href: HTMX_ROUTES.apps.ecommerce.products,
          iconName: "commerce",
        },
        { labelKey: "nav.apps", href: HTMX_ROUTES.apps.root, iconName: "apps" },
      ],
    },
    {
      labelKey: "nav.group.system",
      href: HTMX_ROUTES.infrastructure.root,
      iconName: "infrastructure",
      children: [
        {
          labelKey: "nav.infrastructure",
          href: HTMX_ROUTES.infrastructure.root,
          iconName: "infrastructure",
        },
        {
          labelKey: "nav.observability",
          href: HTMX_ROUTES.observability.root,
          iconName: "observability",
        },
        {
          labelKey: "nav.sandbox",
          href: HTMX_ROUTES.sandbox.grants,
          iconName: "infrastructure",
          requiredRole: "admin",
        },
        {
          labelKey: "nav.computerUse",
          href: HTMX_ROUTES.sandbox.computerUse,
          iconName: "agentic",
          requiredRole: "admin",
        },
        { labelKey: "nav.storage", href: HTMX_ROUTES.storage, iconName: "storage" },
        {
          labelKey: "nav.userDirectory",
          href: HTMX_ROUTES.admin.users,
          iconName: "users",
          requiredRole: "admin",
        },
        { labelKey: "nav.settings", href: HTMX_ROUTES.settings, iconName: "settings" },
        { labelKey: "nav.docs", href: HTMX_ROUTES.docs.root, iconName: "docs" },
      ],
    },
  ];
}

/**
 * Flatten hierarchical sidebar items into a single-level array.
 * Used by command palette search and flat-list consumers.
 */
/** True when `pathname` targets any canonical realtime contribution-fragment route. */
export function isRealtimeFragmentsPathname(pathname: string): boolean {
  return pathname.startsWith(HTMX_ROUTES.realtime.fragments.pathPrefix);
}

export function flattenHtmxSidebarItems(items: HtmxRouteItem[]): HtmxRouteItem[] {
  const result: HtmxRouteItem[] = [];
  for (const item of items) {
    if (item.children) {
      for (const child of item.children) {
        result.push(child);
      }
    } else {
      result.push(item);
    }
  }
  return result;
}
