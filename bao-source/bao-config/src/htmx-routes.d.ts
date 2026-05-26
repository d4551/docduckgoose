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
declare function savedDashboardRoute(id: string): string;
export declare const CHAT_HUB_MODES: readonly ["ai", "user", "video", "status", "secure"];
export type ChatHubMode = (typeof CHAT_HUB_MODES)[number];
/** Canonical htmx route paths. Use these for links, redirects, and navigation. */
export declare const HTMX_ROUTES: {
  readonly root: "/";
  readonly catalog: {
    readonly list: "/catalog";
  };
  readonly dashboard: {
    readonly root: "/dashboard";
    readonly savedQueryParam: "dashboard";
    readonly summary: "/dashboard/summary";
    readonly notifications: "/dashboard/notifications";
    readonly bunbuddyResources: "/dashboard/bunbuddy-resources";
    readonly saved: typeof savedDashboardRoute;
  };
  readonly settings: "/settings";
  readonly settingsLocale: "/settings/locale";
  readonly settingsSystemAiStatus: "/settings/system-ai/status";
  readonly settingsVirtualEnv: {
    readonly provision: "/settings/virtual-env/actions/provision";
    readonly destroy: (id: string) => string;
    readonly destroyRoute: "/settings/virtual-env/:id/actions/destroy";
  };
  readonly settingsCustomDomain: {
    readonly register: "/settings/custom-domain/actions/register";
    readonly verify: (id: string) => string;
    readonly verifyRoute: "/settings/custom-domain/:id/actions/verify";
    readonly revoke: (id: string) => string;
    readonly revokeRoute: "/settings/custom-domain/:id/actions/revoke";
  };
  readonly settingsEnvironmentAccess: {
    readonly virtualEnv: "/settings/fragments/virtual-env";
    readonly customDomain: "/settings/fragments/custom-domain";
    readonly combined: "/settings/fragments/environment-access";
  };
  readonly settingsTabPanel: {
    readonly general: "/settings/tabs/general";
    readonly ecosystem: "/settings/tabs/ecosystem";
    readonly apis: "/settings/tabs/apis";
    readonly features: "/settings/tabs/features";
    readonly instructions: "/settings/tabs/instructions";
    readonly agents: "/settings/tabs/agents";
    readonly shortcuts: "/settings/tabs/shortcuts";
    readonly bumblebaoScan: "/settings/tabs/bumblebao-scan";
    readonly bumblebaoScanSave: "/settings/tabs/bumblebao-scan/actions/save";
  };
  readonly infrastructure: {
    readonly root: "/infrastructure";
    readonly baoExtensionStatus: "/infrastructure/bao-extension-status";
    readonly baoExtensionStatusSse: "/infrastructure/bao-extension-status.sse";
    readonly baoExtensionAssetPacksLoad: "/infrastructure/bao-extension-status/asset-packs/load";
    readonly baoExtensionAssetPacksUnload: "/infrastructure/bao-extension-status/asset-packs/unload";
    readonly baoControlPlaneStatus: "/infrastructure/bao-control-plane-status";
    readonly baoControlPlaneStatusSse: "/infrastructure/bao-control-plane-status.sse";
    readonly baoControlPlaneStatusRefresh: "/infrastructure/bao-control-plane-status/refresh";
    readonly baoControlPlaneStatusEnsure: "/infrastructure/bao-control-plane-status/ensure";
  };
  readonly auth: {
    readonly login: "/auth/login";
    readonly register: "/auth/register";
    readonly forgotPassword: "/auth/forgot-password";
    readonly resetPassword: "/auth/reset-password";
    readonly consent: "/auth/consent";
    readonly error: "/auth/error";
    // P2 smoke + /dev/ cutover (plan 019e5f8f-d962-7d63-a397-20f5057a5267 + discovery 019e5ea0); excised .bao-first per AGENTS.md (no legacy dev fixtures). See bao/src/gates/validators/rules/no-direct-route-literals.ts (DIRECT_ROUTE_PATTERN from patterns.ts), no-direct-env-access.ts, no-fallback-shims.ts, accessibility-landmarks.ts, no-debug-markers.ts, ui-status-badge-icon-required.ts.
  };
  readonly cases: {
    readonly list: "/cases";
    readonly new: "/cases/new";
    readonly detail: (id: string) => string;
    readonly edit: (id: string) => string;
    readonly upload: (id: string) => string;
    readonly delete: (id: string) => string;
  };
  readonly patients: {
    readonly list: "/patients";
    readonly detail: (id: string) => string;
  };
  readonly reports: {
    readonly list: "/reports";
    readonly new: "/reports/new";
    readonly detail: (id: string) => string;
    readonly edit: (id: string) => string;
  };
  readonly storage: "/storage";
  readonly tasks: {
    readonly list: "/tasks";
    readonly detail: (id: string) => string;
  };
  readonly hub: {
    readonly integrations: "/integrations";
    readonly domainMap: "/integrations/domain-map";
    readonly ownership: "/integrations/ownership";
    readonly deviceAssistant: "/integrations/device-assistant";
    readonly operations: "/operations";
    readonly notifications: "/notifications";
    readonly notificationRead: <I extends string>(id: I) => `/notifications/${I}/read`;
  };
  readonly workOrders: {
    readonly list: "/operations/work-orders";
    readonly new: "/operations/work-orders/new";
    readonly detail: (id: string) => string;
    readonly edit: (id: string) => string;
  };
  readonly purchaseOrders: {
    readonly list: "/operations/purchase-orders";
    readonly new: "/operations/purchase-orders/new";
    readonly detail: (id: string) => string;
    readonly edit: (id: string) => string;
  };
  readonly invoices: {
    readonly list: "/operations/invoices";
    readonly new: "/operations/invoices/new";
    readonly detail: (id: string) => string;
    readonly edit: (id: string) => string;
  };
  readonly rfqs: {
    readonly list: "/operations/rfqs";
    readonly new: "/operations/rfqs/new";
    readonly detail: (id: string) => string;
    readonly edit: (id: string) => string;
    readonly convert: (id: string) => string;
  };
  readonly mlops: {
    readonly root: "/mlops";
  };
  readonly portal: {
    readonly root: "/portal";
    readonly orders: "/portal/orders";
    readonly workOrders: "/portal/work-orders";
    readonly invoices: "/portal/invoices";
    readonly orderDetail: (id: string) => string;
  };
  readonly admin: {
    readonly root: "/admin";
    readonly help: "/admin/help";
    readonly starter: "/admin/starter";
    readonly splatbao: "/admin/splatbao";
    readonly aiProviders: "/admin/ai-providers";
    readonly users: "/admin/users";
    readonly usersNew: "/admin/users/new";
    readonly userDetail: (id: string) => string;
    readonly userEdit: (id: string) => string;
    readonly userDelete: (id: string) => string;
    readonly devices: "/admin/devices";
    readonly deviceNew: "/admin/devices/new";
    readonly deviceDetail: (deviceId: string) => string;
    readonly deviceEdit: (deviceId: string) => string;
    readonly deviceDelete: (deviceId: string) => string;
    readonly hardwareHealthWidget: "/admin/hardware/health-widget";
  };
  readonly devices: {
    readonly root: "/devices";
    readonly manager: "/devices/manager";
    readonly calibration: "/devices/calibration";
    readonly calibrationDetail: (id: string) => string;
    readonly hardware: "/hardware";
    readonly robotics: "/robotics";
    readonly uav: "/uav";
    readonly vehicles: "/vehicles";
    readonly digitalTwin: "/digital-twin";
  };
  readonly imaging: {
    readonly root: "/imaging";
    readonly workspace: "/imaging/workspace";
    readonly scanner: "/imaging/scanner";
    readonly scannerDetail: <I extends string>(id: I) => `/imaging/scanner/${I}`;
    readonly perception: "/imaging/perception";
    readonly gaussian: "/imaging/gaussian";
    readonly gaussianDetail: <I extends string>(id: I) => `/imaging/gaussian/${I}`;
  };
  readonly ai: {
    readonly root: "/ai";
    readonly models: "/ai/models";
    readonly playground: "/ai/playground";
    readonly playgroundOnnx: "/ai/playground/onnx";
    readonly playgroundRag: "/ai/playground/rag";
    readonly providers: "/ai/providers";
    readonly providerAzure: "/ai/providers/azure";
    readonly providerAzureEdit: "/ai/providers/azure/edit";
    readonly providerOllama: "/ai/providers/ollama";
    readonly providerOllamaEdit: "/ai/providers/ollama/edit";
    readonly providerHuggingface: "/ai/providers/huggingface";
    readonly providerHuggingfaceEdit: "/ai/providers/huggingface/edit";
    readonly providerHuggingfaceSearch: "/ai/providers/huggingface/search";
    readonly providerHuggingfaceInstall: "/ai/providers/huggingface/install";
    readonly providerHuggingfaceInstalled: "/ai/providers/huggingface/installed";
    readonly genAi: "/apps/gen-ai";
    readonly systemConfig: "/ai/system-config";
    readonly systemConfigTestConnection: "/ai/system-config/test-connection";
  };
  readonly automation: {
    readonly root: "/automation";
    readonly rpa: "/automation/rpa";
    readonly rpaWorkflows: "/automation/rpa/workflows";
    readonly rpaWorkflowNew: "/automation/rpa/workflows/new";
    readonly rpaWorkflowDetail: (id: string) => string;
    readonly rpaWorkflowEdit: (id: string) => string;
    readonly rpaExecutions: "/automation/rpa/executions";
    readonly rpaExecutionDetail: (id: string) => string;
    readonly rpaLibraries: "/automation/rpa/libraries";
    readonly rpaLibraryDetail: (name: string) => string;
    readonly pipelines: "/automation/pipelines";
    readonly nodes: "/automation/nodes";
    readonly nodeDetail: (nodeKey: string) => string;
    readonly runs: "/automation/runs";
    readonly runTimeline: (runId: string) => string;
    readonly baoComposer: "/automation/bao-composer";
    readonly baoComposerPreview: "/automation/bao-composer/preview";
    readonly baoComposerImprove: "/automation/bao-composer/improve";
    readonly baoComposerGenerate: "/automation/bao-composer/generate";
    readonly baoComposerInstall: "/automation/bao-composer/install";
    readonly bao: "/automation/bao";
    readonly baoArchiveAuthoring: "/automation/bao-archive-authoring";
    readonly baoArchiveAuthoringNew: "/automation/bao-archive-authoring/new";
    readonly baoArchiveAuthoringJob: (id: string) => string;
    readonly baoArchiveAuthoringJobStatus: (id: string) => string;
    readonly baoArchiveAuthoringJobResults: (id: string) => string;
    readonly baodown: "/automation/baodown";
    readonly baodownNew: "/automation/baodown/new";
    readonly baodownDefinition: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/definitions/${Id}`;
    readonly baodownDefinitionEdit: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/definitions/${Id}/edit`;
    readonly baodownDefinitionEditor: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/definitions/${Id}/editor`;
    readonly baodownDefinitionDelete: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/definitions/${Id}/delete`;
    readonly baodownVersionNew: <Id extends string>(
      definitionId: Id,
    ) => `/automation/baodown/definitions/${Id}/versions/new`;
    readonly baodownDefinitionUnpublish: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/definitions/${Id}/unpublish`;
    readonly baodownScheduleNew: <Id extends string>(
      definitionId: Id,
    ) => `/automation/baodown/definitions/${Id}/schedules/new`;
    readonly baodownScheduleEdit: <Id extends string, Sched extends string>(
      definitionId: Id,
      scheduleId: Sched,
    ) => `/automation/baodown/definitions/${Id}/schedules/${Sched}/edit`;
    readonly baodownScheduleToggle: <Id extends string, Sched extends string>(
      definitionId: Id,
      scheduleId: Sched,
    ) => `/automation/baodown/definitions/${Id}/schedules/${Sched}/toggle`;
    readonly baodownScheduleDelete: <Id extends string, Sched extends string>(
      definitionId: Id,
      scheduleId: Sched,
    ) => `/automation/baodown/definitions/${Id}/schedules/${Sched}/delete`;
    readonly baodownWebhookNew: <Id extends string>(
      definitionId: Id,
    ) => `/automation/baodown/definitions/${Id}/webhooks/new`;
    readonly baodownWebhookToggle: <Id extends string, Hook extends string>(
      definitionId: Id,
      webhookId: Hook,
    ) => `/automation/baodown/definitions/${Id}/webhooks/${Hook}/toggle`;
    readonly baodownWebhookRotate: <Id extends string, Hook extends string>(
      definitionId: Id,
      webhookId: Hook,
    ) => `/automation/baodown/definitions/${Id}/webhooks/${Hook}/rotate`;
    readonly baodownWebhookDelete: <Id extends string, Hook extends string>(
      definitionId: Id,
      webhookId: Hook,
    ) => `/automation/baodown/definitions/${Id}/webhooks/${Hook}/delete`;
    readonly baodownVersion: <Id extends string>(id: Id) => `/automation/baodown/versions/${Id}`;
    readonly baodownVersionDiff: <Id extends string>(
      definitionId: Id,
    ) => `/automation/baodown/definitions/${Id}/versions/diff`;
    readonly baodownVersionPublish: <Id extends string, Ver extends string>(
      definitionId: Id,
      versionId: Ver,
    ) => `/automation/baodown/definitions/${Id}/versions/${Ver}/publish`;
    readonly baodownVersionRollback: <Id extends string, Ver extends string>(
      definitionId: Id,
      versionId: Ver,
    ) => `/automation/baodown/definitions/${Id}/versions/${Ver}/rollback`;
    readonly baodownVersionRun: <Id extends string, Ver extends string>(
      definitionId: Id,
      versionId: Ver,
    ) => `/automation/baodown/definitions/${Id}/versions/${Ver}/run`;
    readonly baodownDefinitionRun: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/definitions/${Id}/run`;
    readonly baodownRun: <Id extends string>(id: Id) => `/automation/baodown/runs/${Id}`;
    readonly baodownRunPanel: <Id extends string>(id: Id) => `/automation/baodown/runs/${Id}/panel`;
    readonly baodownRunCancel: <Id extends string>(
      id: Id,
    ) => `/automation/baodown/runs/${Id}/cancel`;
    readonly baodownUsdWorkflows: "/usd/workflows";
    readonly baodownUsdEditor: <Id extends string>(workflowId: Id) => `/usd/workflows/${Id}/editor`;
    readonly baodownPathologyWorkflows: "/pathology/workflows";
    readonly baodownPathologyEditor: <Id extends string>(
      workflowId: Id,
    ) => `/pathology/workflows/${Id}/editor`;
    readonly baodownAnnotations: "/annotations/assets";
    readonly baodownMedicalWorkflows: "/medical/workflows";
    readonly baodownMedicalEditor: <Id extends string>(
      workflowId: Id,
    ) => `/medical/workflows/${Id}/editor`;
    readonly baodownUiWorkflows: "/ui/workflows";
    readonly baodownUiEditor: <Id extends string>(workflowId: Id) => `/ui/workflows/${Id}/editor`;
    readonly baodownAiWorkflows: "/ai/workflows";
    readonly baodownAiEditor: <Id extends string>(workflowId: Id) => `/ai/workflows/${Id}/editor`;
  };
  readonly baoInstall: {
    readonly root: "/bao-install";
    readonly new: "/bao-install/new";
    readonly detail: (id: string) => string;
    readonly retry: (id: string) => string;
    readonly uninstall: (id: string) => string;
    readonly targetHandlers: "/bao-install/target-handlers";
    readonly sessions: "/bao-install/sessions";
    readonly runtimeActivate: (id: string) => string;
    readonly runtimeDeactivate: (id: string) => string;
    readonly runtimeUnmount: (id: string) => string;
  };
  readonly agentic: {
    readonly root: "/agentic";
    readonly storage: "/agentic/storage";
    readonly agent: "/agentic/bao-agent";
    readonly agentMessage: (sessionId: string) => string;
    readonly agentMessagePattern: "/agentic/bao-agent/sessions/:sessionId/messages";
    readonly agentToolRun: (sessionId: string, toolId: string) => string;
    readonly agentToolRunPattern: "/agentic/bao-agent/sessions/:sessionId/tools/:toolId/runs";
    readonly mcp: "/agentic/mcp";
    readonly mcpDomain: (domain: string) => string;
    readonly mcpInstall: "/agentic/mcp/install";
    readonly mcpInstallApply: "/agentic/mcp/install/apply";
    readonly mcpTestConnection: (providerId: string) => string;
  };
  readonly sandbox: {
    readonly grants: "/sandbox/grants";
    readonly grantQueued: (correlationId: string) => string;
    readonly computerUse: "/sandbox/computer-use";
    readonly computerUseStart: "/sandbox/computer-use/actions/start";
    readonly computerUseSessions: "/sandbox/computer-use/partials/sessions";
    readonly computerUsePeerStatus: (iconKey: string) => string;
    readonly computerUsePeerStatusRoute: "/sandbox/computer-use/peers/:iconKey/status";
    readonly computerUseSessionStream: (sessionId: string) => string;
    readonly computerUseSessionStreamRoute: "/sandbox/computer-use/sessions/:sessionId/stream";
  };
  readonly apiExplorer: {
    readonly root: "/api-explorer";
    readonly tryRoute: "/api-explorer/try";
    readonly openApiSpec: "/api/openapi.json";
  };
  readonly docs: {
    readonly root: "/docs";
    readonly api: "/docs/api";
    readonly ops: "/ops";
    readonly apiRedirect: "/api/docs";
  };
  readonly fleet: {
    readonly root: "/fleet";
    readonly partials: {
      readonly runStatus: "/fleet/partials/run-status";
      readonly incidents: "/fleet/partials/incidents";
      readonly events: "/fleet/partials/events";
    };
    readonly deviceControl: (deviceId: string) => string;
    readonly deviceTelemetry: (deviceId: string) => string;
    readonly deviceTelemetryStream: (deviceId: string) => string;
    readonly missions: "/fleet/missions";
    readonly missionDetail: (missionId: string) => string;
    readonly missionEvents: (missionId: string) => string;
  };
  readonly bunbuddy: {
    readonly root: "/bunbuddy";
    readonly detail: <K extends string>(kind: K) => `/bunbuddy/${K}`;
  };
  readonly fragments: {
    readonly baodownEditor: "/fragments/baodown-editor";
    readonly baodownDefinitionRuns: (definitionId: string) => string;
  };
  readonly shell: {
    readonly localeChrome: "/shell/fragments/locale-chrome";
  };
  readonly xr: {
    readonly root: "/xr";
    readonly viewer: "/xr/viewer";
    readonly experiences: "/xr/experiences";
    readonly experienceNew: "/xr/experiences/new";
    readonly experienceDetail: (id: string) => string;
    readonly experienceEdit: (id: string) => string;
    readonly rendering: "/xr/rendering";
    readonly assets: "/xr/assets";
    readonly assetNew: "/xr/assets/new";
    readonly assetDetail: (id: string) => string;
    readonly assetEdit: (id: string) => string;
  };
  readonly chat: {
    readonly root: "/chat";
    readonly detail: (sessionId: string) => string;
    readonly settings: "/chat/settings";
    readonly mode: (
      mode: ChatHubMode,
    ) => "/chat/m/status" | "/chat/m/ai" | "/chat/m/user" | "/chat/m/video" | "/chat/m/secure";
    readonly modePattern: "/chat/m/:mode";
    readonly launchPlanTrigger: "/chat/launch-plan/trigger";
    readonly launchPlanIntent: "/chat/launch-plan/intent";
    readonly secureSend: "/chat/secure/send";
    readonly conversationNew: "/chat/conversation/new";
  };
  readonly apps: {
    readonly root: "/apps";
    readonly chat: "/apps/chat";
    readonly fileManager: "/apps/file-manager";
    readonly fileManagerDetail: (id: string) => string;
    readonly ecommerce: {
      readonly root: "/apps/ecommerce";
      readonly products: "/apps/ecommerce/products";
      readonly productNew: "/apps/ecommerce/products/new";
      readonly productDetail: (id: string) => string;
      readonly productEdit: (id: string) => string;
      readonly orders: "/apps/ecommerce/orders";
      readonly orderDetail: (id: string) => string;
      readonly sellers: "/apps/ecommerce/sellers";
      readonly sellerNew: "/apps/ecommerce/sellers/new";
      readonly sellerDetail: (id: string) => string;
      readonly sellerEdit: (id: string) => string;
      readonly shops: "/apps/ecommerce/shops";
      readonly shopNew: "/apps/ecommerce/shops/new";
      readonly shopDetail: (id: string) => string;
      readonly shopEdit: (id: string) => string;
    };
    readonly genAi: {
      readonly root: "/apps/gen-ai";
      readonly home: "/apps/gen-ai/home";
      readonly library: "/apps/gen-ai/library";
      readonly models: "/apps/gen-ai/models";
      readonly modelNew: "/apps/gen-ai/models/new";
      readonly modelDetail: (id: string) => string;
      readonly modelEdit: (id: string) => string;
      readonly training: "/apps/gen-ai/training";
      readonly trainingNew: "/apps/gen-ai/training/new";
      readonly trainingDetail: (id: string) => string;
      readonly trainingEdit: (id: string) => string;
      readonly gateway: "/apps/gen-ai/gateway";
      readonly aiSdk: "/apps/gen-ai/ai-sdk";
      readonly huggingface: "/apps/gen-ai/huggingface";
      readonly huggingfaceCache: "/apps/gen-ai/huggingface/cache";
      readonly vision: "/apps/gen-ai/vision";
      readonly image: "/apps/gen-ai/image";
      readonly content: "/apps/gen-ai/content";
    };
  };
  readonly dashboards: {
    readonly root: "/dashboards";
    readonly crm: "/dashboards/crm";
    readonly crmSections: "/dashboards/crm/sections";
    readonly ecommerce: "/dashboards/ecommerce";
    readonly ecommerceSections: "/dashboards/ecommerce/sections";
    readonly genAi: "/dashboards/gen-ai";
    readonly genAiSections: "/dashboards/gen-ai/sections";
  };
  readonly estate: {
    readonly root: "/estate";
    readonly fleet: "/fleet";
    readonly buildings: "/buildings";
    readonly sensors: "/sensors";
    readonly finance: "/finance";
    readonly erp: "/erp";
  };
  readonly observability: {
    readonly root: "/observability";
    readonly metrics: "/observability/metrics";
    readonly traces: "/observability/traces";
    readonly logs: "/observability/logs";
    readonly alerts: "/observability/alerts";
    readonly live: "/observability/live";
  };
  readonly public: {
    readonly landing: "/landing";
    readonly terms: "/terms";
    readonly privacy: "/privacy";
  };
  readonly realtime: {
    readonly fragments: {
      /** Prefix for all contribution-fragment SSE + HTMX routes under `/realtime/fragments/`. */
      readonly pathPrefix: "/realtime/fragments/";
      readonly heartbeat: "/realtime/fragments/heartbeat";
      readonly heartbeatSse: "/realtime/fragments/heartbeat.sse";
      readonly ecosystemEventsSse: "/realtime/fragments/ecosystem-events.sse";
      readonly settingsTabEventsSse: "/realtime/fragments/settings-tab-events.sse";
      readonly tileGroupEventsSse: "/realtime/fragments/tile-group-events.sse";
      readonly topbarEventsSse: "/realtime/fragments/topbar-events.sse";
    };
  };
  readonly uiAssetPackStylesheet: (registrationId: string) => string;
};
/**
 * Hierarchical sidebar items organized into 7 enterprise navigation groups.
 * Each top-level item is a collapsible group with children.
 *
 * @returns Array of grouped sidebar items for drawer navigation.
 */
export declare function buildDefaultHtmxSidebarItems(): HtmxRouteItem[];
/**
 * Flatten hierarchical sidebar items into a single-level array.
 * Used by command palette search and flat-list consumers.
 */
/** True when `pathname` targets any canonical realtime contribution-fragment route. */
export declare function isRealtimeFragmentsPathname(pathname: string): boolean;
export declare function flattenHtmxSidebarItems(items: HtmxRouteItem[]): HtmxRouteItem[];
