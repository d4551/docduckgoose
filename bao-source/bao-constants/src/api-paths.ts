/**
 * Shared API path registry.
 *
 * Centralizes canonical API paths used across server and client modules.
 *
 * @shared/constants/api-paths
 */

/** API root segment. */
export const API_ROOT = "/api";

/** Canonical API version segment. */
export const API_VERSION = "v1";

/** Canonical API base prefix. */
export const API_BASE: string = `${API_ROOT}/${API_VERSION}`;
/** .bao Composer base path. */
export const API_V1_BAO_COMPOSER_BASE: string = `${API_BASE}/bao-composer`;
/** .bao Composer catalog path. */
export const API_V1_BAO_COMPOSER_CATALOG: string = `${API_V1_BAO_COMPOSER_BASE}/catalog`;
/** .bao Composer current context path. */
export const API_V1_BAO_COMPOSER_CONTEXT: string = `${API_V1_BAO_COMPOSER_BASE}/context`;
/** .bao Composer drafts collection path. */
export const API_V1_BAO_COMPOSER_DRAFTS: string = `${API_V1_BAO_COMPOSER_BASE}/drafts`;
/** .bao Composer draft path template. */
export const API_V1_BAO_COMPOSER_DRAFT_BY_ID: string = `${API_V1_BAO_COMPOSER_DRAFTS}/:id`;
/** .bao Composer draft context path template. */
export const API_V1_BAO_COMPOSER_DRAFT_CONTEXT: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/context`;
/** .bao Composer draft context refresh path template. */
export const API_V1_BAO_COMPOSER_DRAFT_CONTEXT_REFRESH: string = `${API_V1_BAO_COMPOSER_DRAFT_CONTEXT}/refresh`;
/** .bao Composer draft research path template. */
export const API_V1_BAO_COMPOSER_DRAFT_RESEARCH: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/research`;
/** .bao Composer draft proposal path template. */
export const API_V1_BAO_COMPOSER_DRAFT_PROPOSAL: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/proposal`;
/** .bao Composer draft improve path template. */
export const API_V1_BAO_COMPOSER_DRAFT_IMPROVE: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/improve`;
/** .bao Composer draft execution-history path template. */
export const API_V1_BAO_COMPOSER_DRAFT_EXECUTIONS: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/executions`;
/** .bao Composer draft preview path template. */
export const API_V1_BAO_COMPOSER_DRAFT_PREVIEW: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/preview`;
/** .bao Composer draft generate path template. */
export const API_V1_BAO_COMPOSER_DRAFT_GENERATE: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/generate`;
/** .bao Composer draft install path template. */
export const API_V1_BAO_COMPOSER_DRAFT_INSTALL: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/install`;
/** .bao Composer draft `.bao` import path template. */
export const API_V1_BAO_COMPOSER_DRAFT_IMPORT_BAO: string = `${API_V1_BAO_COMPOSER_DRAFT_BY_ID}/import-bao`;
/** .bao Composer execution path template. */
export const API_V1_BAO_COMPOSER_EXECUTION_BY_ID: string = `${API_V1_BAO_COMPOSER_BASE}/executions/:id`;
/** .bao Composer artifact path template. */
export const API_V1_BAO_COMPOSER_ARTIFACT_BY_ID: string = `${API_V1_BAO_COMPOSER_BASE}/artifacts/:id`;
/** .bao Composer artifact context path template. */
export const API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT: string = `${API_V1_BAO_COMPOSER_ARTIFACT_BY_ID}/context`;
/** .bao Composer artifact context refresh path template. */
export const API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT_REFRESH: string = `${API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT}/refresh`;
/** .bao Composer artifact diff path template. */
export const API_V1_BAO_COMPOSER_ARTIFACT_DIFF: string = `${API_V1_BAO_COMPOSER_ARTIFACT_BY_ID}/diff`;
/** .bao Composer artifact standalone profile path template. */
export const API_V1_BAO_COMPOSER_ARTIFACT_STANDALONE_PROFILE: string = `${API_V1_BAO_COMPOSER_ARTIFACT_BY_ID}/standalone-profile`;
/** Standalone .bao Composer health endpoint path. */
export const BAO_COMPOSER_STANDALONE_HEALTH_PATH = "/health";
/** Standalone .bao Composer capabilities endpoint path. */
export const BAO_COMPOSER_STANDALONE_CAPABILITIES_PATH = "/capabilities";
/** Standalone .bao Composer documentation endpoint path. */
export const BAO_COMPOSER_STANDALONE_DOCS_PATH = "/docs";
/** Standalone .bao Composer OpenAPI documentation endpoint path. */
export const BAO_COMPOSER_STANDALONE_DOCS_JSON_PATH = "/docs/json";
/** Canonical endpoint paths expected from standalone .bao Composer runtimes. */
export const BAO_COMPOSER_STANDALONE_CONTRACT_ENDPOINTS = [
  BAO_COMPOSER_STANDALONE_HEALTH_PATH,
  BAO_COMPOSER_STANDALONE_CAPABILITIES_PATH,
  BAO_COMPOSER_STANDALONE_DOCS_PATH,
  BAO_COMPOSER_STANDALONE_DOCS_JSON_PATH,
] as const;
/** `.bao` archive authoring base path. */
export const API_V1_BAO_ARCHIVE_AUTHORING_BASE: string = `${API_BASE}/bao-archive-authoring`;
/** `.bao` archive authoring collection path. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOBS: string = `${API_V1_BAO_ARCHIVE_AUTHORING_BASE}/jobs`;
/** `.bao` archive authoring job detail path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOBS}/:id`;
/** `.bao` archive authoring job run path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_RUN: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID}/run`;
/** `.bao` archive authoring job retry path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_RETRY: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID}/retry`;
/** `.bao` archive authoring job analysis path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_ANALYSIS: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID}/analysis`;
/** `.bao` archive authoring job mapping path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_MAPPING: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID}/mapping`;
/** `.bao` archive authoring job verify path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_VERIFY: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID}/verify`;
/** `.bao` archive authoring job install path template. */
export const API_V1_BAO_ARCHIVE_AUTHORING_JOB_INSTALL: string = `${API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID}/install`;
/** Agent artifact protocol base path. */
export const API_V1_AGENT_ARTIFACTS_BASE: string = `${API_BASE}/agent-artifacts`;
/** Agent artifact metadata path template. */
export const API_V1_AGENT_ARTIFACT_BY_ID: string = `${API_V1_AGENT_ARTIFACTS_BASE}/:id`;
/** Agent artifact binary download path template. */
export const API_V1_AGENT_ARTIFACT_FILE: string = `${API_V1_AGENT_ARTIFACT_BY_ID}/file`;
/** Harvest contract validation path, shared by runtime route and tests. */
export const HARVEST_CONTRACT_VALIDATE_PATH: string = `${API_ROOT}/harvest/contracts/validate`;

/** Pipeline API plugin subpaths mounted below {@link API_PATHS.pipelines}. */
export const PIPELINES_API_SUBPATHS = {
  automation: "/automation",
};

export function apiPathById(pathTemplate: string, id: string): string {
  return pathTemplate.replace(":id", encodeURIComponent(id));
}

export function baoComposerDraftContextApiPath(id: string): string {
  return apiPathById(API_V1_BAO_COMPOSER_DRAFT_CONTEXT, id);
}

export function baoComposerDraftContextRefreshApiPath(id: string): string {
  return apiPathById(API_V1_BAO_COMPOSER_DRAFT_CONTEXT_REFRESH, id);
}

export function baoComposerArtifactStandaloneProfileApiPath(id: string): string {
  return apiPathById(API_V1_BAO_COMPOSER_ARTIFACT_STANDALONE_PROFILE, id);
}

export function baoComposerArtifactContextApiPath(id: string): string {
  return apiPathById(API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT, id);
}

export function baoComposerArtifactContextRefreshApiPath(id: string): string {
  return apiPathById(API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT_REFRESH, id);
}

export function baoArchiveAuthoringJobApiPath(id: string): string {
  return apiPathById(API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID, id);
}

export function baoArchiveAuthoringJobRunApiPath(id: string): string {
  return apiPathById(API_V1_BAO_ARCHIVE_AUTHORING_JOB_RUN, id);
}

export function baoArchiveAuthoringJobRetryApiPath(id: string): string {
  return apiPathById(API_V1_BAO_ARCHIVE_AUTHORING_JOB_RETRY, id);
}

export function baoArchiveAuthoringJobInstallApiPath(id: string): string {
  return apiPathById(API_V1_BAO_ARCHIVE_AUTHORING_JOB_INSTALL, id);
}

export function agentArtifactApiPath(id: string): string {
  return apiPathById(API_V1_AGENT_ARTIFACT_BY_ID, id);
}

export function agentArtifactFileApiPath(id: string): string {
  return apiPathById(API_V1_AGENT_ARTIFACT_FILE, id);
}
/** Canonical `.bao` package operation base path. */
export const API_V1_BAO_BASE: string = `${API_BASE}/bao`;
/** Canonical `.bao` archive conversion path. */
export const API_V1_BAO_CONVERT: string = `${API_V1_BAO_BASE}/convert`;
/** Canonical `.bao` publish path. */
export const API_V1_BAO_PUBLISH: string = `${API_V1_BAO_BASE}/publish`;
/** Canonical `.bao` verify path. */
export const API_V1_BAO_VERIFY: string = `${API_V1_BAO_BASE}/verify`;
/** Relative path of the canonical `.bao` service authorization check, mounted under {@link API_V1_BAO_BASE}. */
export const BAO_AUTHZ_CHECK_RELATIVE: string = "/authz/check";
/** Canonical `.bao` service authorization check path. */
export const API_V1_BAO_AUTHZ_CHECK: string = `${API_V1_BAO_BASE}${BAO_AUTHZ_CHECK_RELATIVE}`;
/** Canonical fleet API base path. */
export const API_V1_FLEET_BASE: string = `${API_BASE}/fleet`;
/** Fleet runs collection path. */
export const API_V1_FLEET_RUNS: string = `${API_V1_FLEET_BASE}/runs`;
/** Fleet run path template. */
export const API_V1_FLEET_RUN_BY_ID: string = `${API_V1_FLEET_RUNS}/:runId`;
/** Fleet run cancel path template. */
export const API_V1_FLEET_RUN_CANCEL: string = `${API_V1_FLEET_RUN_BY_ID}/cancel`;
/** Fleet run events path template. */
export const API_V1_FLEET_RUN_EVENTS: string = `${API_V1_FLEET_RUN_BY_ID}/events`;
/** Fleet run events stream path template. */
export const API_V1_FLEET_RUN_EVENTS_STREAM: string = `${API_V1_FLEET_RUN_EVENTS}/stream`;
/** Fleet adapters path. */
export const API_V1_FLEET_ADAPTERS: string = `${API_V1_FLEET_BASE}/adapters`;
/** Fleet assignment preview path. */
export const API_V1_FLEET_ASSIGNMENT_PREVIEW: string = `${API_V1_FLEET_BASE}/assignments/preview`;
/** Fleet alerts path. */
export const API_V1_FLEET_ALERTS: string = `${API_V1_FLEET_BASE}/alerts`;
/** Fleet incident acknowledgement path template. */
export const API_V1_FLEET_ALERT_ACK: string = `${API_V1_FLEET_ALERTS}/:incidentId/ack`;
/** Fleet digital twin overview endpoint. */
export const API_V1_FLEET_DIGITAL_TWIN_OVERVIEW: string = `${API_V1_FLEET_BASE}/digital-twin/overview`;
/** Bumblebao fleet backend base path (registry-hosted). */
export const API_V1_BUMBLEBAO_BASE: string = `${API_BASE}/registry/bumblebao`;
/** Bumblebao scanner ingest endpoint. */
export const API_V1_BUMBLEBAO_INGEST: string = `${API_V1_BUMBLEBAO_BASE}/ingest`;
/** Bumblebao exposure findings query endpoint. */
export const API_V1_BUMBLEBAO_FINDINGS: string = `${API_V1_BUMBLEBAO_BASE}/findings`;
/** Bumblebao promoted inventory query endpoint. */
export const API_V1_BUMBLEBAO_INVENTORY: string = `${API_V1_BUMBLEBAO_BASE}/inventory`;
/** Bumblebao scan runs query endpoint. */
export const API_V1_BUMBLEBAO_RUNS: string = `${API_V1_BUMBLEBAO_BASE}/runs`;
/** Bumblebao exposure catalog releases query endpoint. */
export const API_V1_BUMBLEBAO_CATALOGS: string = `${API_V1_BUMBLEBAO_BASE}/catalogs`;
/** Bao registry endpoint. */
const API_V1_BAO_REGISTRY: string = `${API_V1_BAO_BASE}/registry`;
/** Bao install endpoint. */
const API_V1_BAO_INSTALL: string = `${API_V1_BAO_BASE}/install`;
/** Bao validate endpoint. */
const API_V1_BAO_VALIDATE: string = `${API_V1_BAO_BASE}/validate`;
/** .bao Runtime base path. */
export const API_V1_BAO_RUNTIME: string = `${API_V1_BAO_BASE}/runtime`;
/** .bao Runtime sessions collection path. */
export const API_V1_BAO_RUNTIME_SESSIONS: string = `${API_V1_BAO_RUNTIME}/sessions`;
/** .bao Runtime session detail path template. */
export const API_V1_BAO_RUNTIME_SESSION_BY_SELECTOR: string = `${API_V1_BAO_RUNTIME}/:selector`;
/** .bao Runtime mount path. */
export const API_V1_BAO_RUNTIME_MOUNT: string = `${API_V1_BAO_RUNTIME}/mount`;
/** .bao Runtime activate path template. */
export const API_V1_BAO_RUNTIME_ACTIVATE: string = `${API_V1_BAO_RUNTIME_SESSION_BY_SELECTOR}/activate`;
/** .bao Runtime deactivate path template. */
export const API_V1_BAO_RUNTIME_DEACTIVATE: string = `${API_V1_BAO_RUNTIME_SESSION_BY_SELECTOR}/deactivate`;
/** .bao Runtime unmount path template. */
export const API_V1_BAO_RUNTIME_UNMOUNT: string = `${API_V1_BAO_RUNTIME_SESSION_BY_SELECTOR}/unmount`;
/** Relative checked-in asset-pack inventory path, mounted under {@link API_V1_BAO_BASE}. */
export const BAO_ASSET_PACKS_RELATIVE: string = "/asset-packs";
/** Checked-in asset-pack inventory path. */
export const API_V1_BAO_ASSET_PACKS: string = `${API_V1_BAO_BASE}${BAO_ASSET_PACKS_RELATIVE}`;
/** Relative checked-in asset-pack bulk load path, mounted under {@link API_V1_BAO_BASE}. */
export const BAO_ASSET_PACKS_LOAD_RELATIVE: string = `${BAO_ASSET_PACKS_RELATIVE}/load`;
/** Checked-in asset-pack bulk load path. */
export const API_V1_BAO_ASSET_PACKS_LOAD: string = `${API_V1_BAO_BASE}${BAO_ASSET_PACKS_LOAD_RELATIVE}`;
/** Relative checked-in asset-pack bulk unload path, mounted under {@link API_V1_BAO_BASE}. */
export const BAO_ASSET_PACKS_UNLOAD_RELATIVE: string = `${BAO_ASSET_PACKS_RELATIVE}/unload`;
/** Checked-in asset-pack bulk unload path. */
export const API_V1_BAO_ASSET_PACKS_UNLOAD: string = `${API_V1_BAO_BASE}${BAO_ASSET_PACKS_UNLOAD_RELATIVE}`;

/**
 * Canonical API path registry shared across server routes, clients, and tests.
 */
export const API_PATHS = {
  /** Root API namespace. */
  root: API_ROOT,
  /** Base API path for the Elysia server. */
  base: API_BASE,
  /** .bao Composer base path. */
  baoComposer: API_V1_BAO_COMPOSER_BASE,
  /** .bao Composer catalog endpoint. */
  baoComposerCatalog: API_V1_BAO_COMPOSER_CATALOG,
  /** .bao Composer current context endpoint. */
  baoComposerContext: API_V1_BAO_COMPOSER_CONTEXT,
  /** .bao Composer drafts collection endpoint. */
  baoComposerDrafts: API_V1_BAO_COMPOSER_DRAFTS,
  /** .bao Composer draft detail endpoint (path template). */
  baoComposerDraftById: API_V1_BAO_COMPOSER_DRAFT_BY_ID,
  /** .bao Composer draft context endpoint (path template). */
  baoComposerDraftContext: API_V1_BAO_COMPOSER_DRAFT_CONTEXT,
  /** .bao Composer draft context refresh endpoint (path template). */
  baoComposerDraftContextRefresh: API_V1_BAO_COMPOSER_DRAFT_CONTEXT_REFRESH,
  /** .bao Composer draft research endpoint (path template). */
  baoComposerDraftResearch: API_V1_BAO_COMPOSER_DRAFT_RESEARCH,
  /** .bao Composer draft proposal endpoint (path template). */
  baoComposerDraftProposal: API_V1_BAO_COMPOSER_DRAFT_PROPOSAL,
  /** .bao Composer draft improve endpoint (path template). */
  baoComposerDraftImprove: API_V1_BAO_COMPOSER_DRAFT_IMPROVE,
  /** .bao Composer draft execution-history endpoint (path template). */
  baoComposerDraftExecutions: API_V1_BAO_COMPOSER_DRAFT_EXECUTIONS,
  /** .bao Composer draft preview endpoint (path template). */
  baoComposerDraftPreview: API_V1_BAO_COMPOSER_DRAFT_PREVIEW,
  /** .bao Composer draft generate endpoint (path template). */
  baoComposerDraftGenerate: API_V1_BAO_COMPOSER_DRAFT_GENERATE,
  /** .bao Composer draft install endpoint (path template). */
  baoComposerDraftInstall: API_V1_BAO_COMPOSER_DRAFT_INSTALL,
  /** .bao Composer `.bao` import endpoint (path template). */
  baoComposerDraftImportBao: API_V1_BAO_COMPOSER_DRAFT_IMPORT_BAO,
  /** .bao Composer execution detail endpoint (path template). */
  baoComposerExecutionById: API_V1_BAO_COMPOSER_EXECUTION_BY_ID,
  /** .bao Composer artifact detail endpoint (path template). */
  baoComposerArtifactById: API_V1_BAO_COMPOSER_ARTIFACT_BY_ID,
  /** .bao Composer artifact context endpoint (path template). */
  baoComposerArtifactContext: API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT,
  /** .bao Composer artifact context refresh endpoint (path template). */
  baoComposerArtifactContextRefresh: API_V1_BAO_COMPOSER_ARTIFACT_CONTEXT_REFRESH,
  /** .bao Composer artifact diff endpoint (path template). */
  baoComposerArtifactDiff: API_V1_BAO_COMPOSER_ARTIFACT_DIFF,
  /** .bao Composer artifact standalone profile endpoint (path template). */
  baoComposerArtifactStandaloneProfile: API_V1_BAO_COMPOSER_ARTIFACT_STANDALONE_PROFILE,
  /** `.bao` archive authoring base path. */
  baoArchiveAuthoringBase: API_V1_BAO_ARCHIVE_AUTHORING_BASE,
  /** `.bao` archive authoring collection endpoint. */
  baoArchiveAuthoring: API_V1_BAO_ARCHIVE_AUTHORING_JOBS,
  /** `.bao` archive authoring job detail endpoint (path template). */
  baoArchiveAuthoringById: API_V1_BAO_ARCHIVE_AUTHORING_JOB_BY_ID,
  /** `.bao` archive authoring job run endpoint (path template). */
  baoArchiveAuthoringRun: API_V1_BAO_ARCHIVE_AUTHORING_JOB_RUN,
  /** `.bao` archive authoring job retry endpoint (path template). */
  baoArchiveAuthoringRetry: API_V1_BAO_ARCHIVE_AUTHORING_JOB_RETRY,
  /** `.bao` archive authoring job analysis endpoint (path template). */
  baoArchiveAuthoringAnalysis: API_V1_BAO_ARCHIVE_AUTHORING_JOB_ANALYSIS,
  /** `.bao` archive authoring job mapping endpoint (path template). */
  baoArchiveAuthoringMapping: API_V1_BAO_ARCHIVE_AUTHORING_JOB_MAPPING,
  /** `.bao` archive authoring job verify endpoint (path template). */
  baoArchiveAuthoringVerify: API_V1_BAO_ARCHIVE_AUTHORING_JOB_VERIFY,
  /** `.bao` archive authoring job install endpoint (path template). */
  baoArchiveAuthoringInstall: API_V1_BAO_ARCHIVE_AUTHORING_JOB_INSTALL,
  /** Agent artifact protocol base endpoint. */
  agentArtifacts: API_V1_AGENT_ARTIFACTS_BASE,
  /** Agent artifact metadata endpoint (path template). */
  agentArtifactById: API_V1_AGENT_ARTIFACT_BY_ID,
  /** Agent artifact binary download endpoint (path template). */
  agentArtifactFile: API_V1_AGENT_ARTIFACT_FILE,
  /** Canonical `.bao` convert endpoint. */
  baoConvert: API_V1_BAO_CONVERT,
  /** Canonical `.bao` publish endpoint. */
  baoPublish: API_V1_BAO_PUBLISH,
  /** Canonical `.bao` verify endpoint. */
  baoVerify: API_V1_BAO_VERIFY,
  /** Canonical `.bao` service authorization check endpoint. */
  baoAuthzCheck: API_V1_BAO_AUTHZ_CHECK,
  /** Relative path of the `.bao` authz check endpoint, mounted under {@link API_PATHS.bao}. */
  baoAuthzCheckRelative: BAO_AUTHZ_CHECK_RELATIVE,
  /** .bao Runtime sessions collection endpoint. */
  baoRuntimeSessions: API_V1_BAO_RUNTIME_SESSIONS,
  /** Bao base endpoint. */
  bao: API_V1_BAO_BASE,
  /** Bao registry endpoint. */
  baoRegistry: API_V1_BAO_REGISTRY,
  /** `.bao` package runtime base endpoint. */
  baoPackageRuntime: API_V1_BAO_RUNTIME,
  /** .bao Runtime session detail endpoint (path template). */
  baoRuntimeSessionBySelector: API_V1_BAO_RUNTIME_SESSION_BY_SELECTOR,
  /** .bao Runtime mount endpoint. */
  baoRuntimeMount: API_V1_BAO_RUNTIME_MOUNT,
  /** .bao Runtime activate endpoint (path template). */
  baoRuntimeActivate: API_V1_BAO_RUNTIME_ACTIVATE,
  /** .bao Runtime deactivate endpoint (path template). */
  baoRuntimeDeactivate: API_V1_BAO_RUNTIME_DEACTIVATE,
  /** .bao Runtime unmount endpoint (path template). */
  baoRuntimeUnmount: API_V1_BAO_RUNTIME_UNMOUNT,
  /** Checked-in asset-pack inventory endpoint. */
  baoAssetPacks: API_V1_BAO_ASSET_PACKS,
  /** Checked-in asset-pack bulk load endpoint. */
  baoAssetPacksLoad: API_V1_BAO_ASSET_PACKS_LOAD,
  /** Checked-in asset-pack bulk unload endpoint. */
  baoAssetPacksUnload: API_V1_BAO_ASSET_PACKS_UNLOAD,
  /** Auth base path for Better Auth/OIDC endpoints. */
  authBase: `${API_BASE}/auth`,
  /** Better Auth health endpoint. */
  authOk: `${API_BASE}/auth/ok`,
  /** Better Auth OIDC discovery endpoint. */
  authDiscovery: `${API_BASE}/auth/.well-known/openid-configuration`,
  /** Better Auth JWKS endpoint. */
  authJwks: `${API_BASE}/auth/jwks`,
  /** Better Auth session endpoint. */
  authSession: `${API_BASE}/auth/get-session`,
  /** Better Auth active-organization switch endpoint. */
  authOrganizationSetActive: `${API_BASE}/auth/organization/set-active`,
  /** RPA base path for automation endpoints. */
  rpa: `${API_BASE}/rpa`,
  /** RPA health endpoint. */
  rpaHealth: `${API_BASE}/rpa/health`,
  /** RPA ownership focus endpoint. */
  rpaOwnership: `${API_BASE}/rpa/ownership`,
  /** RPA ownership refresh endpoint. */
  rpaOwnershipRefresh: `${API_BASE}/rpa/ownership/refresh`,
  /** RPA metrics endpoint (OpenMetrics format). */
  rpaMetricsOpenMetrics: `${API_BASE}/rpa/metrics/openmetrics`,
  /** RPA workflows endpoint. */
  rpaWorkflows: `${API_BASE}/rpa/workflows`,
  /** RPA executions endpoint. */
  rpaExecutions: `${API_BASE}/rpa/executions`,
  /** RPA libraries endpoint. */
  rpaLibraries: `${API_BASE}/rpa/libraries`,
  /** RPA insights endpoint. */
  rpaInsights: `${API_BASE}/rpa/insights`,
  /** RPA metrics snapshot endpoint. */
  rpaMetricsSnapshot: `${API_BASE}/rpa/metrics/snapshot`,
  /** Reports base path. */
  reports: `${API_BASE}/reports`,
  /** Commerce base path. */
  commerce: `${API_BASE}/commerce`,
  /** Work orders base path. */
  workOrders: `${API_BASE}/work-orders`,
  /** Purchase orders base path. */
  purchaseOrders: `${API_BASE}/purchase-orders`,
  /** Invoices base path. */
  invoices: `${API_BASE}/invoices`,
  /** RFQs (Request for Quotation) base path. */
  rfqs: `${API_BASE}/rfqs`,
  /** Cases base path. */
  cases: `${API_BASE}/cases`,
  /** Case image upload endpoint. */
  caseImagesUpload: `${API_BASE}/cases/:id/images/upload`,
  /** FHIR interoperability base path. */
  fhir: `${API_BASE}/fhir`,
  /** FHIR readiness/status endpoint. */
  fhirStatus: `${API_BASE}/fhir/status`,
  /** FHIR capability statement endpoint. */
  fhirMetadata: "/fhir/metadata",
  /** FHIR resource search path template. */
  fhirResource: "/fhir/:resourceType",
  /** FHIR resource read path template. */
  fhirResourceById: "/fhir/:resourceType/:id",
  /** AI base path. */
  ai: `${API_BASE}/ai`,
  /** AI provider health snapshot endpoint. */
  aiProvidersHealth: `${API_BASE}/ai/providers/health`,
  /** AI ownership focus endpoint. */
  aiOwnership: `${API_BASE}/ai/ownership`,
  /** AI ownership refresh endpoint. */
  aiOwnershipRefresh: `${API_BASE}/ai/ownership/refresh`,
  /** AI service alignment map endpoint. */
  aiServiceAlignment: `${API_BASE}/ai/services/alignment`,
  /** AI service alignment refresh endpoint. */
  aiServiceAlignmentRefresh: `${API_BASE}/ai/services/alignment/refresh`,
  /** AI chat base path. */
  aiChat: `${API_BASE}/ai/chat`,
  /** AI feedback endpoint. */
  aiFeedback: `${API_BASE}/ai/feedback`,
  /** AI evaluation runs endpoint. */
  aiEvaluationRuns: `${API_BASE}/ai/evaluation/runs`,
  /** AI offline status endpoint (cached models, allowRemoteModels, aiOfflineMode). */
  aiOfflineStatus: `${API_BASE}/ai/offline-status`,
  /** AI text streaming endpoint. */
  aiTextStream: `${API_BASE}/ai/text/stream`,
  /** Ramalama base path. */
  aiRamalama: `${API_BASE}/ai/ramalama`,
  /** Ramalama runtime status endpoint. */
  aiRamalamaStatus: `${API_BASE}/ai/ramalama/status`,
  /** Ramalama model list endpoint. */
  aiRamalamaModels: `${API_BASE}/ai/ramalama/models`,
  /** Ramalama overview endpoint. */
  aiRamalamaOverview: `${API_BASE}/ai/ramalama/overview`,
  /** Ramalama model pull endpoint. */
  aiRamalamaModelsPull: `${API_BASE}/ai/ramalama/models/pull`,
  /** Ramalama serve endpoint. */
  aiRamalamaServe: `${API_BASE}/ai/ramalama/serve`,
  /** Ramalama stop endpoint. */
  aiRamalamaStop: `${API_BASE}/ai/ramalama/stop`,
  /** Ramalama model remove endpoint. */
  aiRamalamaModelsRemove: `${API_BASE}/ai/ramalama/models/remove`,
  /** Notifications base path. */
  notifications: `${API_BASE}/notifications`,
  /** Chat base path. */
  chat: `${API_BASE}/chat`,
  /** Scanner base path. */
  scanner: `${API_BASE}/scanner`,
  /** Imager base path. */
  imager: `${API_BASE}/imager`,
  /** Arducam 200MP converter capability endpoint. */
  imagerArducam200mpCapabilities: `${API_BASE}/imager/arducam200mp/capabilities`,
  /** Arducam 200MP converter endpoint. */
  imagerArducam200mpConvert: `${API_BASE}/imager/arducam200mp/convert`,
  /** Hardware integration base path. */
  hardware: `${API_BASE}/hardware`,
  /** Hardware summary endpoint. */
  hardwareSummary: `${API_BASE}/hardware/summary`,
  /** Hardware Azure DICOM status endpoint. */
  hardwareAzureDicomStatus: `${API_BASE}/hardware/azure/dicom/status`,
  /** Imager health endpoint. */
  hardwareImagerHealth: `${API_BASE}/imager/health`,
  /** Hardware ownership focus endpoint. */
  hardwareOwnership: `${API_BASE}/hardware/ownership`,
  /** Hardware ownership refresh endpoint. */
  hardwareOwnershipRefresh: `${API_BASE}/hardware/ownership/refresh`,
  /** Hardware policy snapshot endpoint. */
  hardwarePolicies: `${API_BASE}/hardware/policies`,
  /** Hardware device lifecycle enrollment endpoint. */
  hardwareLifecycleEnroll: `${API_BASE}/hardware/lifecycle/enroll`,
  /** Hardware device lifecycle provisioning endpoint. */
  hardwareLifecycleProvision: `${API_BASE}/hardware/lifecycle/provision`,
  /** BunBuddy base path for component discovery. */
  bunbuddies: `${API_BASE}/bunbuddies`,
  /** BunBuddy capability graph endpoint. */
  bunbuddiesGraph: `${API_BASE}/bunbuddies/graph`,
  /** BunBuddy capability snapshot endpoint. */
  bunbuddiesCapabilities: `${API_BASE}/bunbuddies/capabilities`,
  /** Library registry base path. */
  libraries: `${API_BASE}/libraries`,
  /** Support base path for help center tickets. */
  support: `${API_BASE}/support`,
  /** Robotics base path. */
  robotics: `${API_BASE}/robotics`,
  /** Robotics ownership focus endpoint. */
  roboticsOwnership: `${API_BASE}/robotics/ownership`,
  /** Robotics ownership refresh endpoint. */
  roboticsOwnershipRefresh: `${API_BASE}/robotics/ownership/refresh`,
  /** Robotics-training integration snapshot endpoint. */
  roboticsTraining: `${API_BASE}/robotics/training`,
  /** Robotics-training model deploy endpoint. */
  roboticsTrainingDeploy: `${API_BASE}/robotics/training/deploy`,
  /** Fleet base path. */
  fleet: API_V1_FLEET_BASE,
  /** Fleet run creation endpoint. */
  fleetRuns: API_V1_FLEET_RUNS,
  /** Fleet run detail endpoint (path template). */
  fleetRunById: API_V1_FLEET_RUN_BY_ID,
  /** Fleet run cancellation endpoint (path template). */
  fleetRunCancel: API_V1_FLEET_RUN_CANCEL,
  /** Fleet run events endpoint (path template). */
  fleetRunEvents: API_V1_FLEET_RUN_EVENTS,
  /** Fleet run events stream endpoint (path template). */
  fleetRunEventsStream: API_V1_FLEET_RUN_EVENTS_STREAM,
  /** Fleet adapter list endpoint. */
  fleetAdapters: API_V1_FLEET_ADAPTERS,
  /** Fleet assignment preview endpoint. */
  fleetAssignmentPreview: API_V1_FLEET_ASSIGNMENT_PREVIEW,
  /** Fleet alert list endpoint. */
  fleetAlerts: API_V1_FLEET_ALERTS,
  /** Fleet incident acknowledgement endpoint (path template). */
  fleetAlertAck: API_V1_FLEET_ALERT_ACK,
  /** Fleet digital twin overview endpoint. */
  fleetDigitalTwinOverview: API_V1_FLEET_DIGITAL_TWIN_OVERVIEW,
  /** Bumblebao fleet backend base path. */
  bumblebao: API_V1_BUMBLEBAO_BASE,
  /** Bumblebao scanner ingest endpoint. */
  bumblebaoIngest: API_V1_BUMBLEBAO_INGEST,
  /** Bumblebao exposure findings query endpoint. */
  bumblebaoFindings: API_V1_BUMBLEBAO_FINDINGS,
  /** Bumblebao promoted inventory query endpoint. */
  bumblebaoInventory: API_V1_BUMBLEBAO_INVENTORY,
  /** Bumblebao scan runs query endpoint. */
  bumblebaoRuns: API_V1_BUMBLEBAO_RUNS,
  /** Bumblebao exposure catalog releases query endpoint. */
  bumblebaoCatalogs: API_V1_BUMBLEBAO_CATALOGS,
  /** ONNX base path. */
  onnx: `${API_BASE}/onnx`,
  /** ONNX inference pipeline base path. */
  onnxInference: `${API_BASE}/onnx/inference`,
  /** ONNX batch inference endpoint. */
  onnxInferenceBatch: `${API_BASE}/onnx/inference/batch`,
  /** ONNX execution provider listing endpoint. */
  onnxInferenceProviders: `${API_BASE}/onnx/inference/providers`,
  /** ONNX warmup endpoint. */
  onnxInferenceWarmup: `${API_BASE}/onnx/inference/warmup`,
  /** ONNX Runtime Web WASM/static asset prefix (browser same-origin fetch). */
  onnxWebAssets: "/assets/onnx",
  /** Bundled browser ONNX client (`scripts/generate.ts`). */
  onnxBrowserClientBase: "/assets/onnx-client",
  onnxBrowserClient: "/assets/onnx-client/browser-onnx-client.js",
  /** Three base path. */
  three: `${API_BASE}/three`,
  /** Three media-asset import/create endpoint. */
  threeMediaAssets: `${API_BASE}/three/media-assets`,
  /** Three ownership focus endpoint. */
  threeOwnership: `${API_BASE}/three/ownership`,
  /** Three ownership refresh endpoint. */
  threeOwnershipRefresh: `${API_BASE}/three/ownership/refresh`,
  /** Pipelines base path. */
  pipelines: `${API_BASE}/pipelines`,
  /** Devices base path. */
  devices: `${API_BASE}/devices`,
  /** Devices diagnostics endpoint. */
  devicesDiagnostics: `${API_BASE}/devices/diagnostics`,
  /** Device inventory refresh endpoint. */
  devicesInventoryRefresh: `${API_BASE}/devices/inventory/refresh`,
  /** Capability registry base path. */
  capabilities: `${API_BASE}/capabilities`,
  /** Capability ownership map endpoint. */
  capabilitiesOwnership: `${API_BASE}/capabilities/ownership`,
  /** Capability ownership focus endpoint. */
  capabilitiesOwnershipFocus: `${API_BASE}/capabilities/ownership/focus`,
  /** Capability ownership coverage endpoint. */
  capabilitiesOwnershipCoverage: `${API_BASE}/capabilities/ownership/coverage`,
  /** Capability ownership refresh endpoint. */
  capabilitiesOwnershipRefresh: `${API_BASE}/capabilities/ownership/refresh`,
  /** Capability impact summary endpoint. */
  capabilitiesImpact: `${API_BASE}/capabilities/impact`,
  /** Capability impact refresh endpoint. */
  capabilitiesImpactRefresh: `${API_BASE}/capabilities/impact/refresh`,
  /** Capability domain map endpoint (cross-domain owner map). */
  capabilitiesDomainMap: `${API_BASE}/capabilities/domain-map`,
  /** Capability domain map refresh endpoint. */
  capabilitiesDomainMapRefresh: `${API_BASE}/capabilities/domain-map/refresh`,
  /** Bao install endpoint. */
  baoInstall: API_V1_BAO_INSTALL,
  /** Bao validate endpoint. */
  baoValidate: API_V1_BAO_VALIDATE,
  /** Bao install status endpoint. */
  baoInstallStatus: `${API_BASE}/bao/:id/status`,
  /** Bao install retry endpoint. */
  baoInstallRetry: `${API_BASE}/bao/:id/retry`,
  /** Bao uninstall endpoint. */
  baoUninstall: `${API_BASE}/bao/:id/uninstall`,
  /** Bao target handlers endpoint. */
  baoTargetHandlers: `${API_BASE}/bao/target-handlers`,
  /** Bao extension runtime snapshot endpoint. */
  baoExtensionsRuntime: `${API_BASE}/bao/extensions/runtime`,
  /** Drivers base path. */
  drivers: `${API_BASE}/drivers`,
  /** Storage base path. */
  storage: `${API_BASE}/storage`,
  /** Annotations base path. */
  annotations: `${API_BASE}/annotations`,
  /** Annotation alignment map endpoint. */
  annotationsAlignment: `${API_BASE}/annotations/alignment`,
  /** Annotation alignment refresh endpoint. */
  annotationsAlignmentRefresh: `${API_BASE}/annotations/alignment/refresh`,
  /** Annotation ownership focus endpoint. */
  annotationsOwnership: `${API_BASE}/annotations/ownership`,
  /** Annotation ownership refresh endpoint. */
  annotationsOwnershipRefresh: `${API_BASE}/annotations/ownership/refresh`,
  /** Annotation auto-ingest status endpoint. */
  annotationsAutoIngestStatus: `${API_BASE}/annotations/auto-ingest/status`,
  /** Annotation auto-ingest enqueue endpoint. */
  annotationsAutoIngestEnqueue: `${API_BASE}/annotations/auto-ingest/enqueue`,
  /** Network discovery base path. */
  network: `${API_BASE}/network`,
  /** Training base path. */
  training: `${API_BASE}/training`,
  /** Training overview endpoint. */
  trainingOverview: `${API_BASE}/training/overview`,
  /** Training stats snapshot endpoint. */
  trainingStats: `${API_BASE}/training/stats`,
  /** User base path. */
  user: `${API_BASE}/user`,
  /** Users base path. */
  users: `${API_BASE}/users`,
  /** Model registry base path. */
  models: `${API_BASE}/models`,
  /** BaoDown orchestration base path (Vault-native flow replacement). */
  baodown: `${API_BASE}/baodown`,
  /** RAG base path. */
  rag: `${API_BASE}/rag`,
  /** RAG ingest endpoint. */
  ragIngest: `${API_BASE}/rag/ingest`,
  /** RAG retrieve endpoint. */
  ragRetrieve: `${API_BASE}/rag/retrieve`,
  /** RAG source listing endpoint. */
  ragSources: `${API_BASE}/rag/sources`,
  /** BaoDown integration snapshot endpoint. */
  baodownIntegration: `${API_BASE}/baodown/integration`,
  /** BaoDown node catalog endpoint. */
  baodownCatalogNodes: `${API_BASE}/baodown/catalog/nodes`,
  /** Bao control-plane base path (Kubernetes-first GitOps control plane). */
  baoControlPlane: `${API_BASE}/bao-control-plane`,
  /** Bao control-plane status snapshot endpoint. */
  baoControlPlaneStatus: `${API_BASE}/bao-control-plane/status`,
  /** Bao control-plane secrets strategy compliance endpoint. */
  baoControlPlaneSecrets: `${API_BASE}/bao-control-plane/secrets`,
  /** .bao Runtime status base path. */
  baoRuntime: `${API_BASE}/bao-runtime`,
  /** .bao Runtime status snapshot endpoint. */
  baoRuntimeStatus: `${API_BASE}/bao-runtime/status`,
  /** .bao Runtime refresh endpoint. */
  baoRuntimeRefresh: `${API_BASE}/bao-runtime/refresh`,
  /** .bao Runtime ensure endpoint. */
  baoRuntimeEnsure: `${API_BASE}/bao-runtime/ensure`,
  /** Control-plane GitOps health endpoint. */
  healthGitops: `${API_BASE}/health/gitops`,
  /** Control-plane Package health endpoint. */
  healthPackage: `${API_BASE}/health/package`,
  /** Control-plane BunBuddy fleet health endpoint. */
  healthBunbuddy: `${API_BASE}/health/bunbuddy`,
  /** Control-plane OCI registry health endpoint. */
  healthRegistry: `${API_BASE}/health/registry`,
  /** Control-plane aggregated resource readiness endpoint. */
  healthResources: `${API_BASE}/health/resources`,
  /** Control-plane runtime snapshot endpoint. */
  runtimeSnapshot: `${API_BASE}/runtime/snapshot`,
  /** Control-plane registry status endpoint. */
  registryStatus: `${API_BASE}/registry/status`,
  /** GitOps webhook/manual sync trigger endpoint. */
  gitopsSync: `${API_BASE}/gitops/sync`,
  /** Infrastructure health endpoint (K8s-backed). */
  infrastructure: `${API_BASE}/infrastructure`,
  /** Infrastructure health status endpoint. */
  infrastructureHealth: `${API_BASE}/infrastructure/health`,
  /** Infrastructure metrics endpoint. */
  infrastructureMetrics: `${API_BASE}/infrastructure/metrics`,
  /** USD base path. */
  usd: `${API_BASE}/usd`,
  /** USD asset upload/list endpoint. */
  usdAssets: `${API_BASE}/usd/assets`,
  /** USD ownership focus endpoint. */
  usdOwnership: `${API_BASE}/usd/ownership`,
  /** USD ownership refresh endpoint. */
  usdOwnershipRefresh: `${API_BASE}/usd/ownership/refresh`,
  /** Gaussian base path. */
  gaussian: `${API_BASE}/gaussian`,
  /** Perception base path. */
  perception: `${API_BASE}/perception`,
  /** Hugging Face base path. */
  huggingface: `${API_BASE}/huggingface`,
  /** Hugging Face Hub snapshot cache endpoint. */
  huggingfaceCacheSnapshot: `${API_BASE}/huggingface/cache/snapshot`,
  /** Hugging Face Hub model search endpoint. */
  huggingfaceModelsSearch: `${API_BASE}/huggingface/models/search`,
  /** Hugging Face Hub recommended models endpoint. */
  huggingfaceModelsRecommended: `${API_BASE}/huggingface/models/recommended`,
  /** Orchestration base path. */
  orchestration: `${API_BASE}/orchestration`,
  /** Vision base path. */
  vision: `${API_BASE}/vision`,
  /** Drone base path. */
  drone: `${API_BASE}/drone`,
  /** Drone ownership focus endpoint. */
  droneOwnership: `${API_BASE}/drone/ownership`,
  /** Drone ownership refresh endpoint. */
  droneOwnershipRefresh: `${API_BASE}/drone/ownership/refresh`,
  /** Drone mission planner compile endpoint. */
  dronePlannerCompile: `${API_BASE}/drone/planner/compile`,
  /** Drone mission planner export endpoint. */
  dronePlannerExport: `${API_BASE}/drone/planner/export`,
  /** Drone-training integration snapshot endpoint. */
  droneTraining: `${API_BASE}/drone/training`,
  /** Drone-training model deploy endpoint. */
  droneTrainingDeploy: `${API_BASE}/drone/training/deploy`,
  /** SplatBao spatial perception base path. */
  splatbao: `${API_BASE}/splatbao`,
  /** SplatBao model library base path. */
  splatbaoModel: `${API_BASE}/splatbao/model`,
  /** SplatBao spatial anchors base path. */
  splatbaoAnchors: `${API_BASE}/splatbao/anchors`,
  /** SplatBao spatial perception training base path. */
  splatbaoTraining: `${API_BASE}/splatbao/training`,
  /** SplatBao steamer (detection/segmentation pipeline) base path. */
  splatbaoSteamer: `${API_BASE}/splatbao/steamer`,
  /** API documentation path. */
  docs: `${API_ROOT}/docs`,
  /** API health check endpoint. */
  health: `${API_BASE}/health`,
  /** AI health check endpoint. */
  aiHealth: `${API_BASE}/ai/health`,
  /** Readiness endpoint. */
  ready: `${API_BASE}/ready`,
  /** Liveness endpoint. */
  live: `${API_BASE}/live`,
  /** Client error reporting endpoint. */
  clientErrors: `${API_BASE}/system/client-errors`,
  /** System integration base path. */
  system: `${API_BASE}/system`,
  /** System dashboard snapshot endpoint. */
  systemDashboard: `${API_BASE}/system/dashboard`,
  /** Integration context snapshot endpoint. */
  systemIntegration: `${API_BASE}/system/integration`,
  /** Autonomy integration snapshot endpoint. */
  systemAutonomyIntegration: `${API_BASE}/system/autonomy`,
  /** Autonomy integration refresh endpoint. */
  systemAutonomyIntegrationRefresh: `${API_BASE}/system/autonomy/refresh`,
  /** Autonomy ownership focus endpoint. */
  systemAutonomyOwnership: `${API_BASE}/system/autonomy/ownership`,
  /** Autonomy ownership refresh endpoint. */
  systemAutonomyOwnershipRefresh: `${API_BASE}/system/autonomy/ownership/refresh`,
  /** Aggregated health snapshot across core services and dependencies. */
  healthAggregate: `${API_BASE}/health/aggregate`,
  /** System setup wizard snapshot endpoint. */
  systemSetupWizard: `${API_BASE}/system/setup-wizard`,
  /** System setup wizard refresh endpoint. */
  systemSetupWizardRefresh: `${API_BASE}/system/setup-wizard/refresh`,
  /** System setup wizard run endpoint. */
  systemSetupWizardRun: `${API_BASE}/system/setup-wizard/run`,
  /** System setup wizard run status endpoint by job id. */
  systemSetupWizardRunByJob: `${API_BASE}/system/setup-wizard/run/:jobId`,
  /** System queue snapshot endpoint. */
  systemQueue: `${API_BASE}/system/queue`,
  /** System queue detail endpoint. */
  systemQueueByName: `${API_BASE}/system/queue/:queueName`,
  /** BunBuddy routing status endpoint. */
  systemBunBuddyRouting: `${API_BASE}/system/bunbuddy-routing`,
  /** BunBuddy routing refresh endpoint. */
  systemBunBuddyRoutingRefresh: `${API_BASE}/system/bunbuddy-routing/refresh`,
  /** Feature flag snapshot endpoint. */
  featureFlags: `${API_BASE}/system/feature-flags`,
  /** System plugin registry snapshot endpoint. */
  systemPlugins: `${API_BASE}/system/plugins`,
  /** Bao ecosystem workbench graph endpoint. */
  baoEcosystemGraph: `${API_BASE}/system/bao-ecosystem/graph`,
  /** Bao ecosystem workbench preference endpoint. */
  baoEcosystemPreferences: `${API_BASE}/system/bao-ecosystem/preferences`,
  /** Deployment command summary endpoint. */
  systemDeployments: `${API_BASE}/system/deployments`,
  /** User + robotics ops snapshot endpoint. */
  systemUserRoboticsOps: `${API_BASE}/system/user-robotics-ops`,
  /** System health snapshot endpoint. */
  systemHealth: `${API_BASE}/system/health`,
  /** System command center snapshot endpoint. */
  systemCommandCenter: `${API_BASE}/system/command-center`,
  /** Web Vitals reporting endpoint. */
  webVitals: `${API_BASE}/system/web-vitals`,
  /** Realtime WebSocket events path. */
  realtimeWs: "/ws/events",
  /** WebSocket root prefix for realtime services. */
  wsRoot: "/ws",
  /** Chat hub fabric SSE endpoint. */
  chatHubFabricStream: `${API_BASE}/chat/hub/fabric-stream`,
  /** Chat hub fabric SSE segment under chatPlugin prefix. */
  chatHubFabricStreamSegment: "/hub/fabric-stream",
  /** Chat hub fabric HTML snapshot endpoint. */
  chatHubFabricSnapshot: `${API_BASE}/chat/hub/fabric-snapshot`,
  /** Chat hub fabric HTML snapshot segment under chatPlugin prefix. */
  chatHubFabricSnapshotSegment: "/hub/fabric-snapshot",
  /** Chat hub tenant-derived SecurePeerIdentity endpoint. */
  chatHubPeerIdentity: `${API_BASE}/chat/hub/peer-identity`,
  /** Chat hub peer-identity segment under chatPlugin prefix. */
  chatHubPeerIdentitySegment: "/hub/peer-identity",
  /** Chat hub agentic launch-plan execution endpoint. */
  chatHubLaunchPlan: `${API_BASE}/chat/hub/launch-plan`,
  /** Chat hub launch-plan segment under chatPlugin prefix. */
  chatHubLaunchPlanSegment: "/hub/launch-plan",
  /** Video signaling WebSocket pattern (Elysia route). */
  wsVideoPattern: "/ws/video/:roomId",
  /** Video signaling WebSocket pattern segment under wsRoot prefix. */
  wsVideoSegment: "/video/:roomId",
  /** Metrics exposition path (OpenMetrics format). */
  metrics: "/metrics",
  /** MCP base path. */
  mcp: `${API_BASE}/mcp`,
  /** MCP tool inventory endpoint. */
  mcpTools: `${API_BASE}/mcp/tools`,
  /** MCP tool invocation endpoint. */
  mcpToolByName: `${API_BASE}/mcp/tools/:name`,
  /** MCP resource inventory endpoint. */
  mcpResources: `${API_BASE}/mcp/resources`,
  /** MCP resource read endpoint. */
  mcpResourceByEncoded: `${API_BASE}/mcp/resources/:encoded`,
  /** MCP resource template inventory endpoint. */
  mcpTemplates: `${API_BASE}/mcp/templates`,
  /** MCP provider-context inventory endpoint. */
  mcpContexts: `${API_BASE}/mcp/contexts`,
  /** MCP provider-context detail endpoint. */
  mcpContextByProvider: `${API_BASE}/mcp/contexts/:providerId`,
  /** MCP ownership focus endpoint. */
  mcpOwnership: `${API_BASE}/mcp/ownership`,
  /** MCP ownership refresh endpoint. */
  mcpOwnershipRefresh: `${API_BASE}/mcp/ownership/refresh`,
  /** MCP JSON-RPC transport endpoint. */
  mcpRpc: `${API_BASE}/mcp/rpc`,
  /** SSO status endpoint. */
  ssoStatus: `${API_BASE}/sso/status`,
  /** XR API base path. */
  xr: `${API_BASE}/xr`,
  /** XR ownership focus endpoint. */
  xrOwnership: `${API_BASE}/xr/ownership`,
  /** XR ownership refresh endpoint. */
  xrOwnershipRefresh: `${API_BASE}/xr/ownership/refresh`,
  /** XR share-link base path. */
  xrShared: `${API_BASE}/xr/shared`,
  /** Bao observability base path (native metrics/traces/logs/alerts). */
  baoObservability: `${API_BASE}/bao-observability`,
  /** Bao observability readiness endpoint. */
  baoObservabilityHealth: `${API_BASE}/bao-observability/health`,
  /** Bao observability metrics query endpoint. */
  baoObservabilityMetrics: `${API_BASE}/bao-observability/metrics`,
  /** Bao observability traces query endpoint. */
  baoObservabilityTraces: `${API_BASE}/bao-observability/traces`,
  /** Bao observability logs query endpoint. */
  baoObservabilityLogs: `${API_BASE}/bao-observability/logs`,
  /** Bao observability alerts base path. */
  baoObservabilityAlerts: `${API_BASE}/bao-observability/alerts`,
  /** Bao observability alert rules endpoint. */
  baoObservabilityAlertRules: `${API_BASE}/bao-observability/alerts/rules`,
  /** Bao observability alert stream (SSE) endpoint. */
  baoObservabilityAlertStream: `${API_BASE}/bao-observability/alerts/stream`,
  /** API Explorer base path. */
  apiExplorer: `${API_BASE}/api-explorer`,
  /** API Explorer route listing endpoint. */
  apiExplorerRoutes: `${API_BASE}/api-explorer/routes`,
  /** API Explorer try-it proxy endpoint. */
  apiExplorerTry: `${API_BASE}/api-explorer/try`,
  /** System AI configuration endpoint. */
  aiSystemConfig: `${API_BASE}/ai/system/config`,
  /** System AI connection test endpoint. */
  aiSystemTestConnection: `${API_BASE}/ai/system/test-connection`,
  /** System AI runtime listing endpoint. */
  aiSystemRuntimes: `${API_BASE}/ai/system/runtimes`,
  /** Bao supervisor process control base path. */
  baoSupervisor: `${API_BASE}/bao/supervisor`,
  /** Bao supervisor aggregate status endpoint. */
  baoSupervisorStatus: `${API_BASE}/bao/supervisor/status`,
  /** Bao supervisor process listing endpoint. */
  baoSupervisorProcesses: `${API_BASE}/bao/supervisor/processes`,
  /** Bao supervisor process restart endpoint. */
  baoSupervisorProcessRestart: `${API_BASE}/bao/supervisor/processes/:id/restart`,
  /** Bao supervisor process stop endpoint. */
  baoSupervisorProcessStop: `${API_BASE}/bao/supervisor/processes/:id/stop`,
  /** Bao supervisor health endpoint. */
  baoSupervisorHealth: `${API_BASE}/bao/supervisor/health`,
} as const;
