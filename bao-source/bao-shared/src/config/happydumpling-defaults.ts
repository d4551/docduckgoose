/**
 * Happydumpling centralized defaults.
 *
 * Keeps "safe defaults" for the static docs compiler in one place while still allowing
 * per-environment overrides via the unified config system.
 *
 * @shared/config/happydumpling-defaults
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";

const HD_HTTP_REQUEST_TIMEOUT = 408;
const HD_HTTP_TOO_EARLY = 425;
const HD_HTTP_TOO_MANY = 429;
const HD_HTTP_INTERNAL = 500;
const HD_HTTP_BAD_GATEWAY = 502;
const HD_HTTP_UNAVAILABLE = 503;
const HD_HTTP_GATEWAY_TIMEOUT = 504;
const PAGE_SIZE_SM = 25;
const PAGE_SIZE_MD = 50;
const PAGE_SIZE_LG = 100;
const PAGE_SIZE_XL = 200;

/**
 * Server/tooling-side defaults used by Happydumpling when config overrides are missing.
 */
export const HAPPYDUMPLING_BUILD_DEFAULTS: {
  readonly tailwindMaxAttempts: 2;
  readonly tailwindRetryDelayMs: 500;
  readonly precompressMinBytes: 1024;
  readonly assetGcKeepLatest: 3;
  readonly buildConcurrency: 0;
} = {
  /** Maximum attempts for Tailwind CLI compilation. */
  tailwindMaxAttempts: 2,
  /** Delay between Tailwind retry attempts (ms). */
  tailwindRetryDelayMs: 500,
  /**
   * Minimum asset size (bytes) to precompress when enabled.
   *
   * Note: Precompression is only applied to generator-owned hashed assets
   * (JS/CSS/search index) so small files typically don't benefit.
   */
  precompressMinBytes: 1024,
  /**
   * Maximum number of stale generator-owned hashed assets to retain when
   * incremental builds are enabled (prevents output bloat during watch mode).
   */
  assetGcKeepLatest: 3,
  /**
   * Maximum concurrent markdown renders/writes during site build.
   *
   * When 0, Happydumpling will auto-select a safe concurrency based on
   * `Bun.hardwareConcurrency` and a conservative cap.
   */
  buildConcurrency: 0,
} as const;

/**
 * Observability defaults used by Happydumpling server/runtime surfaces.
 */
export const HAPPYDUMPLING_OBSERVABILITY_DEFAULTS: { readonly metricsPrefix: "happydumpling" } = {
  /** Default OpenMetrics metric name prefix. */
  metricsPrefix: "happydumpling",
} as const;

/**
 * Integrations defaults shared by build-time and runtime integrations flows.
 */
export const HAPPYDUMPLING_INTEGRATIONS_DEFAULTS: {
  readonly endpointIdPrefix: "happydumpling-integration";
  readonly pluginRegistryEndpointId: "system-plugins";
  readonly snapshotFilename: "integrations-snapshot.json";
} = {
  /** Fallback idempotency key prefix for integrations endpoint probes. */
  endpointIdPrefix: "happydumpling-integration",
  /** Canonical plugin-registry endpoint id for integrations snapshots/UI. */
  pluginRegistryEndpointId: "system-plugins",
  /** Build output asset filename for integrations snapshot payloads. */
  snapshotFilename: "integrations-snapshot.json",
} as const;

/**
 * Shell-level defaults used by the Happydumpling UI.
 */
export const HAPPYDUMPLING_SHELL_DEFAULTS = {
  /** Active locale used when shell i18n locale is not configured. */
  locale: "en",
  /** Fallback locale used when active locale is missing a message key. */
  fallbackLocale: "en",
  /** Baseline shell i18n messages used when overrides are incomplete or absent. */
  i18nMessages: {
    en: {
      "shell.skipToContentLabel": "Skip to content",
      "shell.openSidebarLabel": "Open sidebar",
      "shell.openNavigationMenuLabel": "Open navigation menu",
      "shell.closeNavigationMenuLabel": "Close navigation menu",
      "shell.searchOpenLabel": "Open search",
      "shell.searchCloseLabel": "Close search",
      "shell.searchRegionLabel": "Search documentation",
      "shell.closeSidebarLabel": "Close sidebar",
      "shell.themeToggleLabel": "Theme",
      "shell.markdownTabsLabel": "Tabs",
      "shell.headingAnchorLabel": "Jump to section heading",
      "shell.footnotesLabel": "Footnotes",
      "shell.footnoteBackLabelPrefix": "Back to reference",
      "shell.lightLabel": "Light",
      "shell.darkLabel": "Dark",
      "shell.navApiExplorerLabel": "API Explorer",
      "shell.navSdkLabel": "SDK",
      "apiExplorer.title": "API Route Tester",
      "apiExplorer.subtitle": "Run requests against this endpoint using your current session.",
      "apiExplorer.openTesterLabel": "Test endpoint",
      "apiExplorer.closeTesterLabel": "Close tester",
      "apiExplorer.environmentLabel": "Environment",
      "apiExplorer.pathLabel": "Path",
      "apiExplorer.pathParamsLabel": "Path Parameters",
      "apiExplorer.queryLabel": "Query Parameters",
      "apiExplorer.headersLabel": "Headers",
      "apiExplorer.bodyLabel": "Request Body",
      "apiExplorer.pathParamsPlaceholder": "id=123",
      "apiExplorer.queryPlaceholder": "key=value",
      "apiExplorer.headersPlaceholder": "x-request-id=value",
      "apiExplorer.additionalLabel": "Additional",
      "apiExplorer.additionalPathParamsLabel": "Additional path parameters",
      "apiExplorer.additionalQueryLabel": "Additional query parameters",
      "apiExplorer.additionalHeadersLabel": "Additional headers",
      "apiExplorer.contentTypeLabel": "Content-Type",
      "apiExplorer.sendLabel": "Send Request",
      "apiExplorer.resetLabel": "Reset",
      "apiExplorer.copyLabel": "Copy",
      "apiExplorer.copySuccessLabel": "Copied!",
      "apiExplorer.responseLabel": "Response",
      "apiExplorer.sdkLabel": "SDK Snippets",
      "apiExplorer.curlLabel": "cURL",
      "apiExplorer.edenLabel": "Eden Treaty",
      "apiExplorer.fetchLabel": "TypeScript Fetch",
      "apiExplorer.statusLabel": "Status",
      "apiExplorer.durationLabel": "Duration",
      "apiExplorer.responseBodyTabLabel": "Body",
      "apiExplorer.responseHeadersTabLabel": "Headers",
      "apiExplorer.responseMetaTabLabel": "Meta",
      "apiExplorer.copyResponseLabel": "Copy Response",
      "apiExplorer.downloadResponseLabel": "Download Response",
      "apiExplorer.responseHeadersLabel": "Headers",
      "apiExplorer.responseBodyLabel": "Body",
      "apiExplorer.noResponseLabel": "No response yet.",
      "apiExplorer.emptyLabel": "No content",
      "apiExplorer.loadingLabel": "Loading",
      "apiExplorer.invalidResponseLabel": "Invalid response envelope.",
      "apiExplorer.unauthorizedLabel": "Unauthorized",
      "apiExplorer.retryableLabel": "Retryable",
      "apiExplorer.nonRetryableLabel": "Non-retryable",
      "apiExplorer.errorLabel": "Request failed",
      "apiExplorer.successLabel": "Request succeeded",
      "apiExplorer.mermaidErrorLabel": "Unable to render Mermaid diagram.",
      "apiExplorer.routeCatalogSearchLabel": "Search",
      "apiExplorer.routeCatalogSearchPlaceholder": "GET /api/v1/...",
      "apiExplorer.routeExplorerTitle": "API Route Explorer",
      "apiExplorer.routeExplorerSubtitle":
        "Browse, filter, and open route details. Use / for .bao ecosystem search.",
      "apiExplorer.routeCatalogMethodLabel": "Method",
      "apiExplorer.routeCatalogAllMethodsLabel": "All methods",
      "apiExplorer.routeCatalogTagLabel": "Tag",
      "apiExplorer.routeCatalogAllTagsLabel": "All tags",
      "apiExplorer.routeCatalogSummaryHeaderLabel": "Summary",
      "apiExplorer.routeCatalogDetailsHeaderLabel": "Details",
      "apiExplorer.routeCatalogOpenDetailsLabel": "Open",
      "apiExplorer.routeCatalogOpenDetailsAriaLabel": "Open details for {method} {path}",
      "apiExplorer.routeCatalogMethodCountLabel": "{method} · {count}",
      "apiExplorer.routeCatalogPageSizeLabel": "Page size",
      "apiExplorer.routeCatalogClearFiltersLabel": "Clear filters",
      "apiExplorer.routeCatalogClearFiltersAriaLabel": "Clear route filters",
      "apiExplorer.routeCatalogResultsLabel": "routes",
      "apiExplorer.routeCatalogResultsStatusLabel":
        "Showing {shown} of {filtered} matching routes ({total} total).",
      "apiExplorer.routeCatalogNoResultsLabel": "No routes matched the current filters.",
      "apiExplorer.routeCatalogPageLabel": "Page",
      "apiExplorer.routeCatalogPageStatusLabel": "Page {page} of {totalPages}",
      "apiExplorer.routeCatalogFirstLabel": "First",
      "apiExplorer.routeCatalogPrevLabel": "Previous",
      "apiExplorer.routeCatalogNextLabel": "Next",
      "apiExplorer.routeCatalogLastLabel": "Last",
      "apiExplorer.routeCatalogJumpToPageLabel": "Jump to page",
      "apiExplorer.routeCatalogGoToPageLabel": "Go",
      "apiExplorer.routeCatalogPageButtonAriaLabel": "Go to page {page}",
      "apiExplorer.routeCatalogPaginationLabel": "Route catalog pagination",
      "apiExplorer.routeCatalogTableLabel": "API route catalog",
      "apiExplorer.routeTagGroupRoutesLabel": "{count} routes",
      "apiExplorer.routeTagGroupTableLabel": "{tag} routes",
      "apiExplorer.routeOperationSummaryLabel": "Summary",
      "apiExplorer.routeOperationDeprecatedBadgeLabel": "Deprecated",
      "apiExplorer.routeOperationMetadataOperationIdLabel": "Operation ID",
      "apiExplorer.routeOperationMetadataDeprecatedLabel": "Deprecated",
      "apiExplorer.routeOperationMetadataSecurityTypeLabel": "Security Type",
      "apiExplorer.routeOperationYesLabel": "Yes",
      "apiExplorer.routeOperationNoLabel": "No",
      "apiExplorer.routeOperationSecuritySectionLabel": "Security",
      "apiExplorer.routeOperationParametersSectionLabel": "Parameters",
      "apiExplorer.routeOperationResponsesSectionLabel": "Responses",
      "apiExplorer.routeOperationNoAuthenticationLabel":
        "No authentication required (public endpoint).",
      "apiExplorer.routeOperationUnknownSecurityLabel": "Unknown security scheme",
      "apiExplorer.routeOperationScopesLabel": "scopes",
      "apiExplorer.routeOperationNoParametersLabel":
        "No path, query, header, or cookie parameters.",
      "apiExplorer.routeOperationParametersTableLabel": "API endpoint parameters",
      "apiExplorer.routeOperationParametersNameHeaderLabel": "Name",
      "apiExplorer.routeOperationParametersLocationHeaderLabel": "Location",
      "apiExplorer.routeOperationParametersRequiredHeaderLabel": "Required",
      "apiExplorer.routeOperationParametersTypeHeaderLabel": "Type",
      "apiExplorer.routeOperationParametersDescriptionHeaderLabel": "Description",
      "apiExplorer.routeOperationRequestBodySectionLabel": "Request Body",
      "apiExplorer.routeOperationNoBodyLabel": "No body payload.",
      "apiExplorer.routeOperationRequestBodyRequiredLabel": "Required.",
      "apiExplorer.routeOperationNoResponsesLabel": "No documented responses.",
      "apiExplorer.routeOperationResponsesTableLabel": "API endpoint responses",
      "apiExplorer.routeOperationResponsesStatusHeaderLabel": "Status",
      "apiExplorer.routeOperationResponsesDescriptionHeaderLabel": "Description",
      "apiExplorer.routeOperationResponsesSchemaHeaderLabel": "Schema",
      "apiExplorer.routeOperationNoResponseSchemaLabel": "No documented response schema.",
      "apiExplorer.routeOperationNotAvailableLabel": "—",
      "apiExplorer.generatedDocsTitle": "API Endpoints Reference",
      "apiExplorer.generatedDocsOverviewTitle": "Overview",
      "apiExplorer.generatedDocsOverviewDescription":
        "Complete reference of all Baohaus API endpoints.",
      "apiExplorer.generatedDocsGeneratorNotice":
        "This documentation is **automatically generated** from the OpenAPI specification using an internal TypeScript OpenAPI-to-Markdown generator (no external CLIs).",
      "apiExplorer.generatedDocsGeneratedByLabel": "Generated By",
      "apiExplorer.generatedDocsApiVersionLabel": "API Version",
      "apiExplorer.generatedDocsOpenApiVersionLabel": "OpenAPI Version",
      "apiExplorer.generatedDocsTotalPathsLabel": "Total Paths",
      "apiExplorer.generatedDocsDocumentedOperationsLabel": "Documented Operations",
      "apiExplorer.generatedDocsTagsLabel": "Tags",
      "apiExplorer.generatedDocsInteractiveDocsLabel": "Interactive Documentation",
      "apiExplorer.generatedDocsOpenApiSpecLabel": "OpenAPI Spec",
      "apiExplorer.generatedDocsSdkSummaryTitle": "SDK Matrix Workflows",
      "apiExplorer.generatedDocsSdkSummarySubtitle":
        "Generate and validate SDK artifacts from the same OpenAPI contract used by this route catalog.",
      "apiExplorer.generatedDocsPlatformSdksLabel": "Platform SDKs",
      "apiExplorer.generatedDocsBunBuddySdksLabel": "BunBuddy SDKs",
      "ai.chat.bubble.ariaLabel": ".bao fabric chat",
      "ai.chat.bubble.toggle": "Open chat",
      "ai.chat.bubble.title": ".bao Chat",
      "ai.chat.bubble.modelLabel": "Model",
      "ai.chat.bubble.modelAuto": "Auto",
      "ai.chat.bubble.ttsToggle": "Text-to-speech",
      "ai.chat.bubble.ttsShort": "TTS",
      "ai.chat.bubble.sttToggle": "Speech-to-text",
      "ai.chat.bubble.sttShort": "STT",
      "ai.chat.bubble.placeholder": "Ask with current page and .bao fabric context.",
      "ai.chat.bubble.inputPlaceholder": "Ask .bao...",
      "ai.chat.bubble.send": "Send",
      "ai.chat.bubble.agenticMode": ".bao fabric mode",
      "ai.chat.bubble.agenticModeShort": ".bao",
      "ai.chat.bubble.agenticModeTooltip":
        "Include .bao Runtime, workspace, sandbox, and loaded capability context",
      "ai.chat.bubble.providerLabel": "Provider",
      "ai.chat.bubble.providerAuto": "Auto",
      "ai.chat.bubble.controls": ".bao chat controls",
      "ai.chat.bubble.newChat": "New conversation",
      "ai.chat.bubble.close": "Close chat",
      "ai.chat.bubble.contextPage": "Current page",
      "ai.chat.bubble.emptyTitle": ".bao context ready.",
      "ai.chat.bubble.emptySubtitle":
        "Ask through the active .bao fabric or choose a context action.",
      "ai.chat.bubble.contextPrompt.build": "Use {subject} with .bao fabric context.",
      "ai.chat.bubble.configLabel": ".bao chat routing",
      "ai.chat.bubble.attachFile": "Attach file",
      "ai.chat.bubble.fileInput": "Choose file to attach",
      "ai.chat.bubble.actions.viewCases": "View cases",
      "ai.chat.bubble.actions.listWorkflows": "List workflows",
      "ai.chat.bubble.actions.openImaging": "Open imaging",
      "ai.chat.bubble.actions.manageDevices": "Manage devices",
    },
  },
  /** Accessibility-label keys used by shell components. */
  a11yLabelFallbackKeys: {
    skipToContentLabel: "shell.skipToContentLabel",
    openSidebarLabel: "shell.openSidebarLabel",
    openNavigationMenuLabel: "shell.openNavigationMenuLabel",
    closeNavigationMenuLabel: "shell.closeNavigationMenuLabel",
    searchOpenLabel: "shell.searchOpenLabel",
    searchCloseLabel: "shell.searchCloseLabel",
    searchRegionLabel: "shell.searchRegionLabel",
    closeSidebarLabel: "shell.closeSidebarLabel",
    themeToggleLabel: "shell.themeToggleLabel",
    markdownTabsLabel: "shell.markdownTabsLabel",
    headingAnchorLabel: "shell.headingAnchorLabel",
    footnotesLabel: "shell.footnotesLabel",
    footnoteBackLabelPrefix: "shell.footnoteBackLabelPrefix",
  },
  /** Theme behavior and label fallbacks for shell rendering. */
  theme: {
    defaultTheme: "light",
    lightTheme: "light",
    darkTheme: "dark",
    lightLabel: "Light",
    darkLabel: "Dark",
    lightLabelFallbackKey: "shell.lightLabel",
    darkLabelFallbackKey: "shell.darkLabel",
    storageKey: "hd-theme",
  },
} as const;

/**
 * API explorer defaults shared by Happydumpling build/runtime.
 */
export const HAPPYDUMPLING_API_EXPLORER_DEFAULTS = {
  /** Canonical API Explorer route used for interactive route tests. */
  testerPath: API_PATHS.apiExplorerTry,
  /** Per-request timeout (ms) for interactive tester calls. */
  requestTimeoutMs: 10000,
  /** Maximum request-body payload accepted by the interactive tester. */
  maxBodyBytes: 262144,
  /** Maximum upstream retry attempts for retryable tester requests. */
  retryMaxAttempts: 2,
  /** Base retry delay in milliseconds for retryable tester requests. */
  retryBaseDelayMs: 200,
  /** Maximum retry delay in milliseconds for retryable tester requests. */
  retryMaxDelayMs: 1500,
  /** Retryable upstream HTTP statuses for tester requests. */
  retryableStatusCodes: [
    HD_HTTP_REQUEST_TIMEOUT,
    HD_HTTP_TOO_EARLY,
    HD_HTTP_TOO_MANY,
    HD_HTTP_INTERNAL,
    HD_HTTP_BAD_GATEWAY,
    HD_HTTP_UNAVAILABLE,
    HD_HTTP_GATEWAY_TIMEOUT,
  ],
  /** Route catalog page size options used by generated API docs UI. */
  routeCatalogPageSizeOptions: [PAGE_SIZE_SM, PAGE_SIZE_MD, PAGE_SIZE_LG, PAGE_SIZE_XL],
  /** Default route catalog page size option. */
  defaultRouteCatalogPageSize: PAGE_SIZE_SM,
  /** Debounce delay (ms) for route catalog search input to reduce re-renders. */
  routeCatalogSearchDebounceMs: 150,
  /** Duration (ms) to show copy-success feedback on SDK snippet buttons. */
  copyFeedbackMs: 2000,
  /** Number of pagination buttons shown around the active page in route catalog UI. */
  routeCatalogPaginationWindowSize: 7,
  /** Fallback environment id when no explicit environment is configured. */
  defaultEnvironmentId: "local",
  /** Fallback environment label when no explicit environment is configured. */
  defaultEnvironmentLabel: "Local",
  /** i18n fallback keys for API explorer labels. */
  labelFallbackKeys: {
    title: "apiExplorer.title",
    subtitle: "apiExplorer.subtitle",
    openTesterLabel: "apiExplorer.openTesterLabel",
    closeTesterLabel: "apiExplorer.closeTesterLabel",
    environmentLabel: "apiExplorer.environmentLabel",
    pathLabel: "apiExplorer.pathLabel",
    pathParamsLabel: "apiExplorer.pathParamsLabel",
    queryLabel: "apiExplorer.queryLabel",
    headersLabel: "apiExplorer.headersLabel",
    bodyLabel: "apiExplorer.bodyLabel",
    pathParamsPlaceholder: "apiExplorer.pathParamsPlaceholder",
    queryPlaceholder: "apiExplorer.queryPlaceholder",
    headersPlaceholder: "apiExplorer.headersPlaceholder",
    additionalLabel: "apiExplorer.additionalLabel",
    additionalPathParamsLabel: "apiExplorer.additionalPathParamsLabel",
    additionalQueryLabel: "apiExplorer.additionalQueryLabel",
    additionalHeadersLabel: "apiExplorer.additionalHeadersLabel",
    contentTypeLabel: "apiExplorer.contentTypeLabel",
    sendLabel: "apiExplorer.sendLabel",
    resetLabel: "apiExplorer.resetLabel",
    copyLabel: "apiExplorer.copyLabel",
    copySuccessLabel: "apiExplorer.copySuccessLabel",
    responseLabel: "apiExplorer.responseLabel",
    sdkLabel: "apiExplorer.sdkLabel",
    curlLabel: "apiExplorer.curlLabel",
    edenLabel: "apiExplorer.edenLabel",
    fetchLabel: "apiExplorer.fetchLabel",
    statusLabel: "apiExplorer.statusLabel",
    durationLabel: "apiExplorer.durationLabel",
    responseBodyTabLabel: "apiExplorer.responseBodyTabLabel",
    responseHeadersTabLabel: "apiExplorer.responseHeadersTabLabel",
    responseMetaTabLabel: "apiExplorer.responseMetaTabLabel",
    copyResponseLabel: "apiExplorer.copyResponseLabel",
    downloadResponseLabel: "apiExplorer.downloadResponseLabel",
    responseHeadersLabel: "apiExplorer.responseHeadersLabel",
    responseBodyLabel: "apiExplorer.responseBodyLabel",
    noResponseLabel: "apiExplorer.noResponseLabel",
    emptyLabel: "apiExplorer.emptyLabel",
    loadingLabel: "apiExplorer.loadingLabel",
    invalidResponseLabel: "apiExplorer.invalidResponseLabel",
    unauthorizedLabel: "apiExplorer.unauthorizedLabel",
    retryableLabel: "apiExplorer.retryableLabel",
    nonRetryableLabel: "apiExplorer.nonRetryableLabel",
    errorLabel: "apiExplorer.errorLabel",
    successLabel: "apiExplorer.successLabel",
    mermaidErrorLabel: "apiExplorer.mermaidErrorLabel",
    routeCatalogSearchLabel: "apiExplorer.routeCatalogSearchLabel",
    routeCatalogSearchPlaceholder: "apiExplorer.routeCatalogSearchPlaceholder",
    routeExplorerTitle: "apiExplorer.routeExplorerTitle",
    routeExplorerSubtitle: "apiExplorer.routeExplorerSubtitle",
    routeCatalogMethodLabel: "apiExplorer.routeCatalogMethodLabel",
    routeCatalogAllMethodsLabel: "apiExplorer.routeCatalogAllMethodsLabel",
    routeCatalogTagLabel: "apiExplorer.routeCatalogTagLabel",
    routeCatalogAllTagsLabel: "apiExplorer.routeCatalogAllTagsLabel",
    routeCatalogSummaryHeaderLabel: "apiExplorer.routeCatalogSummaryHeaderLabel",
    routeCatalogDetailsHeaderLabel: "apiExplorer.routeCatalogDetailsHeaderLabel",
    routeCatalogOpenDetailsLabel: "apiExplorer.routeCatalogOpenDetailsLabel",
    routeCatalogOpenDetailsAriaLabel: "apiExplorer.routeCatalogOpenDetailsAriaLabel",
    routeCatalogMethodCountLabel: "apiExplorer.routeCatalogMethodCountLabel",
    routeCatalogPageSizeLabel: "apiExplorer.routeCatalogPageSizeLabel",
    routeCatalogClearFiltersLabel: "apiExplorer.routeCatalogClearFiltersLabel",
    routeCatalogClearFiltersAriaLabel: "apiExplorer.routeCatalogClearFiltersAriaLabel",
    routeCatalogResultsLabel: "apiExplorer.routeCatalogResultsLabel",
    routeCatalogResultsStatusLabel: "apiExplorer.routeCatalogResultsStatusLabel",
    routeCatalogNoResultsLabel: "apiExplorer.routeCatalogNoResultsLabel",
    routeCatalogPageLabel: "apiExplorer.routeCatalogPageLabel",
    routeCatalogPageStatusLabel: "apiExplorer.routeCatalogPageStatusLabel",
    routeCatalogFirstLabel: "apiExplorer.routeCatalogFirstLabel",
    routeCatalogPrevLabel: "apiExplorer.routeCatalogPrevLabel",
    routeCatalogNextLabel: "apiExplorer.routeCatalogNextLabel",
    routeCatalogLastLabel: "apiExplorer.routeCatalogLastLabel",
    routeCatalogJumpToPageLabel: "apiExplorer.routeCatalogJumpToPageLabel",
    routeCatalogGoToPageLabel: "apiExplorer.routeCatalogGoToPageLabel",
    routeCatalogPageButtonAriaLabel: "apiExplorer.routeCatalogPageButtonAriaLabel",
    routeCatalogPaginationLabel: "apiExplorer.routeCatalogPaginationLabel",
    routeCatalogTableLabel: "apiExplorer.routeCatalogTableLabel",
    routeTagGroupRoutesLabel: "apiExplorer.routeTagGroupRoutesLabel",
    routeTagGroupTableLabel: "apiExplorer.routeTagGroupTableLabel",
    routeOperationSummaryLabel: "apiExplorer.routeOperationSummaryLabel",
    routeOperationDeprecatedBadgeLabel: "apiExplorer.routeOperationDeprecatedBadgeLabel",
    routeOperationMetadataOperationIdLabel: "apiExplorer.routeOperationMetadataOperationIdLabel",
    routeOperationMetadataDeprecatedLabel: "apiExplorer.routeOperationMetadataDeprecatedLabel",
    routeOperationMetadataSecurityTypeLabel: "apiExplorer.routeOperationMetadataSecurityTypeLabel",
    routeOperationYesLabel: "apiExplorer.routeOperationYesLabel",
    routeOperationNoLabel: "apiExplorer.routeOperationNoLabel",
    routeOperationSecuritySectionLabel: "apiExplorer.routeOperationSecuritySectionLabel",
    routeOperationParametersSectionLabel: "apiExplorer.routeOperationParametersSectionLabel",
    routeOperationResponsesSectionLabel: "apiExplorer.routeOperationResponsesSectionLabel",
    routeOperationNoAuthenticationLabel: "apiExplorer.routeOperationNoAuthenticationLabel",
    routeOperationUnknownSecurityLabel: "apiExplorer.routeOperationUnknownSecurityLabel",
    routeOperationScopesLabel: "apiExplorer.routeOperationScopesLabel",
    routeOperationNoParametersLabel: "apiExplorer.routeOperationNoParametersLabel",
    routeOperationParametersTableLabel: "apiExplorer.routeOperationParametersTableLabel",
    routeOperationParametersNameHeaderLabel: "apiExplorer.routeOperationParametersNameHeaderLabel",
    routeOperationParametersLocationHeaderLabel:
      "apiExplorer.routeOperationParametersLocationHeaderLabel",
    routeOperationParametersRequiredHeaderLabel:
      "apiExplorer.routeOperationParametersRequiredHeaderLabel",
    routeOperationParametersTypeHeaderLabel: "apiExplorer.routeOperationParametersTypeHeaderLabel",
    routeOperationParametersDescriptionHeaderLabel:
      "apiExplorer.routeOperationParametersDescriptionHeaderLabel",
    routeOperationRequestBodySectionLabel: "apiExplorer.routeOperationRequestBodySectionLabel",
    routeOperationNoBodyLabel: "apiExplorer.routeOperationNoBodyLabel",
    routeOperationRequestBodyRequiredLabel: "apiExplorer.routeOperationRequestBodyRequiredLabel",
    routeOperationNoResponsesLabel: "apiExplorer.routeOperationNoResponsesLabel",
    routeOperationResponsesTableLabel: "apiExplorer.routeOperationResponsesTableLabel",
    routeOperationResponsesStatusHeaderLabel:
      "apiExplorer.routeOperationResponsesStatusHeaderLabel",
    routeOperationResponsesDescriptionHeaderLabel:
      "apiExplorer.routeOperationResponsesDescriptionHeaderLabel",
    routeOperationResponsesSchemaHeaderLabel:
      "apiExplorer.routeOperationResponsesSchemaHeaderLabel",
    routeOperationNoResponseSchemaLabel: "apiExplorer.routeOperationNoResponseSchemaLabel",
    routeOperationNotAvailableLabel: "apiExplorer.routeOperationNotAvailableLabel",
    generatedDocsTitle: "apiExplorer.generatedDocsTitle",
    generatedDocsOverviewTitle: "apiExplorer.generatedDocsOverviewTitle",
    generatedDocsOverviewDescription: "apiExplorer.generatedDocsOverviewDescription",
    generatedDocsGeneratorNotice: "apiExplorer.generatedDocsGeneratorNotice",
    generatedDocsGeneratedByLabel: "apiExplorer.generatedDocsGeneratedByLabel",
    generatedDocsApiVersionLabel: "apiExplorer.generatedDocsApiVersionLabel",
    generatedDocsOpenApiVersionLabel: "apiExplorer.generatedDocsOpenApiVersionLabel",
    generatedDocsTotalPathsLabel: "apiExplorer.generatedDocsTotalPathsLabel",
    generatedDocsDocumentedOperationsLabel: "apiExplorer.generatedDocsDocumentedOperationsLabel",
    generatedDocsTagsLabel: "apiExplorer.generatedDocsTagsLabel",
    generatedDocsInteractiveDocsLabel: "apiExplorer.generatedDocsInteractiveDocsLabel",
    generatedDocsOpenApiSpecLabel: "apiExplorer.generatedDocsOpenApiSpecLabel",
    generatedDocsSdkSummaryTitle: "apiExplorer.generatedDocsSdkSummaryTitle",
    generatedDocsSdkSummarySubtitle: "apiExplorer.generatedDocsSdkSummarySubtitle",
    generatedDocsPlatformSdksLabel: "apiExplorer.generatedDocsPlatformSdksLabel",
    generatedDocsBunBuddySdksLabel: "apiExplorer.generatedDocsBunBuddySdksLabel",
  },
} as const;
