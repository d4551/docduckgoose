/**
 * Centralized Timeout and Interval Constants.
 *
 * Default timeout and interval values to avoid scattering magic numbers.
 * This module provides:
 *
 * - API request timeout defaults
 * - Pipeline refresh intervals
 * - Toast notification durations
 * - Timeout resolution helper with override support
 *
 * @shared/constants/timeouts
 */
import { MS_PER_HOUR, MS_PER_MINUTE, SECONDS_PER_DAY } from "./time.ts";

/** Build phase can run 10+ min without output; 20 min = 1200000ms ensures container builds complete. */
const FRONTEND_BUILD_DEFAULT_TIMEOUT_MS = 1200000;
const FRONTEND_MANIFEST_WAIT_TIMEOUT_MS = 600000;

/** Centralized map of default timeout and interval values (ms unless noted) used across the platform. */
export const DEFAULT_TIMEOUTS = {
  /** Standard duration for API requests when a specific timeout is not provided. */
  apiRequestMs: 5000,
  /** Server-side fetch timeout (ms) for landing metrics; above apiRequestMs to accommodate parallel fetches. */
  landingMetricsAsyncDataMs: 8000,
  /** Minimum accepted timeout used for clamping user-provided request timeouts. */
  requestTimeoutMinMs: 250,
  /** Default timeout for process startup (e.g. BunBuddy runtime listen). */
  processStartupMs: 30_000,
  /** Default timeout for graceful shutdown cleanup before forcing exit. */
  processShutdownMs: 10_000,
  /** Grace period to drain in-flight requests during shutdown. */
  processShutdownDrainMs: 1_000,
  /** Default timeout for setup wizard run actions (configure/setup:auto) spawned by the server. */
  setupWizardRunMs: 1800000,
  /** Cache TTL for the locally served Happydumpling docs bundle (ms). 1h. */
  happydumplingBundleCacheTtlMs: MS_PER_HOUR,
  /** Cache-Control max-age for static assets (HTMX, islands) in seconds. 24h. */
  staticAssetCacheMaxAgeSeconds: SECONDS_PER_DAY,
  /** Default timeout for Dimsum availability probes. */
  dimsumProbeMs: 1500,
  /** Default timeout for MinIO SSO login strategy checks. */
  minioSsoLoginCheckMs: 5000,
  /** Default timeout for hardware discovery probes. */
  hardwareDiscoveryMs: 5000,
  /** Extended timeout for slower hardware inventory commands. */
  hardwareDiscoverySlowMs: 10000,
  /** Minimum accepted timeout for hardware discovery probes. */
  hardwareDiscoveryMinMs: 250,
  /** Maximum accepted timeout for hardware discovery probes. */
  hardwareDiscoveryMaxMs: 20000,
  /** Minimum timeout for BLE bunbuddy scanning. */
  bleScanMinMs: 250,
  /** Maximum timeout for BLE bunbuddy scanning. */
  bleScanMaxMs: 30000,
  /** Headroom to subtract from request timeout for BLE scanning. */
  bleScanHeadroomMs: 250,
  /** Default timeout for AI provider requests (embeddings/chat/vision). */
  aiProviderMs: 30000,
  /** Minimum accepted timeout for AI provider requests. */
  aiProviderMinMs: 5000,
  /** Maximum accepted timeout for AI provider requests. */
  aiProviderMaxMs: 120000,
  /** Cache TTL for AI provider status snapshots. */
  aiProviderStatusCacheMs: MS_PER_MINUTE,
  /** Cache TTL for NVIDIA NIM endpoint selection. */
  nimEndpointCacheTtlMs: 15000,
  /** Timeout for NVIDIA NIM endpoint health probes. */
  nimEndpointProbeMs: 1500,
  /** Default interval between bunbuddy health check probes. */
  bunbuddyHealthcheckIntervalMs: 30000,
  /** Default timeout for bunbuddy health check probes. */
  bunbuddyHealthcheckTimeoutMs: 5000,
  /** Default timeout for Redis connection attempts (ms). Keep low so unavailable Redis falls back promptly. */
  redisConnectionMs: 1000,
  /** Default timeout for bunbuddy requests when no contract timeout is configured. */
  bunbuddyDefaultMs: 1500,
  /** Default cache TTL for the drone bunbuddy device enumeration snapshot. */
  droneBunBuddyCacheTtlMs: 5000,
  /** Default timeout for global bunbuddy proxy requests. */
  bunbuddyGlobalMs: 3000,
  /** Default timeout for Basler bunbuddy requests. */
  baslerBunBuddyMs: 1500,
  /** Default timeout for USB bunbuddy requests. */
  usbBunBuddyMs: 1500,
  /** Default timeout for BLE bunbuddy requests. */
  bleBunBuddyMs: 2500,
  /** Default timeout for lighting bunbuddy requests. */
  lightingBunBuddyMs: 1500,
  /** Default timeout for perception bunbuddy requests. */
  perceptionBunBuddyMs: 3000,
  /** Default timeout for RPA bunbuddy requests. */
  rpaBunBuddyMs: 5000,
  /** Default timeout for vision bunbuddy requests. */
  visionBunBuddyMs: 5000,
  /** Default timeout for gaussian bunbuddy requests. */
  gaussianBunBuddyMs: 10000,
  /** Default timeout for scanner bunbuddy GET requests. */
  scannerGetMs: 3000,
  /** Default timeout for scanner bunbuddy POST requests. */
  scannerPostMs: 5000,
  /** Default timeout for scanner bunbuddy raw payload requests. */
  scannerRawMs: 15000,
  /** Default timeout for scanner device sync. */
  scannerDeviceSyncMs: 3000,
  /** Default timeout for printer bunbuddy scan operations. */
  printerScanMs: 8000,
  /** Default timeout for industrial bunbuddy connection attempts. */
  industrialConnectMs: 4000,
  /** Default timeout for industrial bunbuddy request operations. */
  industrialRequestMs: 2000,
  /** Default retry delay for bunbuddy device unavailable errors (ms). */
  bunbuddyErrorDeviceUnavailableMs: 5000,
  /** Default retry delay for bunbuddy device busy errors (ms). */
  bunbuddyErrorDeviceBusyMs: 1000,
  /** Default retry delay for bunbuddy connection failed errors (ms). */
  bunbuddyErrorConnectionFailedMs: 3000,
  /** Default retry delay for bunbuddy service unavailable errors (ms). */
  bunbuddyErrorServiceUnavailableMs: 10000,
  /** Default timeout per check in bunbuddy runHealthChecks (ms). */
  bunbuddyHealthCheckPerCheckMs: 5000,
  /** Default request timeout for bunbuddy createHttpHealthCheck (ms). */
  bunbuddyHealthCheckRequestMs: 3000,
  /** Default timeout for post-install health probe during `.bao` install runs. */
  baoInstallHealthProbeMs: 5000,
  /** Default max wait for service health readiness checks. */
  serviceHealthWaitMs: 10000,
  /** Default timeout for service health probe requests. */
  serviceHealthProbeMs: 1500,
  /** Default delay between service health probe attempts. */
  serviceHealthPollMs: 500,
  /** Default max wait for Happydumpling build/watch runtime startup readiness. */
  docsRuntimeStartupMs: 300000,
  /** Default max wait for local API server readiness (health probe) when using dev:local. */
  localApiReadinessMs: 180_000,
  /** Default max wait for deployment rollout gates (readiness/liveness/health). */
  rolloutGateWaitMs: 300000,
  /** Default delay between rollout gate probe attempts. */
  rolloutGatePollMs: 2000,
  /** Default timeout for client prepare during builds. */
  frontendPrepareMs: 300000,
  /** Default timeout for client build during builds. */
  frontendBuildMs: FRONTEND_BUILD_DEFAULT_TIMEOUT_MS,
  /** Idle timeout for client build (build phase can run 10+ min without output). */
  frontendBuildIdleMs: FRONTEND_BUILD_DEFAULT_TIMEOUT_MS,
  /** Default wait for build artifacts/manifest availability (ms). */
  frontendManifestWaitMs: FRONTEND_MANIFEST_WAIT_TIMEOUT_MS,
  /** Poll interval for client manifest discovery and availability checks (ms). */
  frontendManifestPollMs: 250,
  /** Poll interval for command activity monitoring. */
  commandMonitorPollMs: 5000,
  /** Poll interval for the monitoring dashboard browser refresh loop. */
  monitoringDashboardPollMs: 5000,
  /** Idle timeout for generic monitored commands before forced abort. */
  commandMonitorIdleMs: 600000,
  /** Idle timeout for download-heavy monitored commands before forced abort. */
  commandMonitorDownloadIdleMs: 1200000,
  /** Heartbeat cadence for monitored commands. */
  commandMonitorLogIntervalMs: 10000,
  /** Maximum retained characters for command-monitor heartbeat output previews. */
  commandMonitorHeartbeatPreviewChars: 240,
  /** Maximum retained command output characters per stream for monitored commands. */
  commandOutputCaptureChars: 131072,
  /** Maximum tail characters retained for client build command failure diagnostics. */
  frontendCommandErrorTailChars: 16000,
  /** Headroom reserved when clamping client build memory against cgroup limits. */
  frontendBuildMemoryHeadroomMb: 512,
  /** Default timeout for a single BaoControlPlane OCI Builder image build attempt. */
  baoControlPlaneImageBuildMs: 1200000,
  /** Default timeout for backend startup checks. */
  backendStartupMs: MS_PER_MINUTE,
  /** Default timeout for script-level TCP connectivity probes. */
  scriptTcpConnectionMs: 2000,
  /** Default timeout for installer dependency TCP probes. */
  installerConnectivityProbeMs: 5000,
  /** Default timeout for script-level HTTP health probes. */
  scriptHttpHealthMs: 10000,
  /** Default retry delay for script dependency readiness checks. */
  scriptDependencyRetryDelayMs: 2000,
  /** Default poll interval while waiting for script-managed services to report healthy. */
  scriptServerReadyPollMs: 1000,
  /** Default grace period for script-managed service shutdown. */
  scriptGracefulShutdownMs: 5000,
  /** Default startup wait after launching the API process in smoke checks. */
  apiSmokeServerBootMs: 3000,
  /** Default max wait for smoke-check server readiness. */
  apiSmokeReadyWaitMs: 20000,
  /** Default poll cadence for smoke-check readiness loops. */
  apiSmokeReadyPollMs: 500,
  /** Default timeout for smoke-check readiness probe requests. */
  apiSmokeProbeMs: 2000,
  /** Default timeout for smoke-check endpoint requests. */
  apiSmokeEndpointMs: 8000,
  /** Default grace period for shutting down smoke-check server processes. */
  apiSmokeShutdownMs: 1000,
  /** Delay (ms) before auto-opening browser when launcher starts client dev mode. Override via LAUNCHER_BROWSER_OPEN_DELAY_MS. */
  launcherBrowserOpenDelayMs: 2500,
  /** Default timeout for BaoDown automation startup checks. */
  baodownStartupMs: 30000,
  /** Default timeout for frontend startup checks. */
  frontendStartupMs: MS_PER_MINUTE,
  /** Minimum interval for bunbuddy background broadcast loops (e.g., device update pushes). */
  bunbuddyBroadcastMinIntervalMs: 5000,
  /** Minimum accepted timeout for robotics summary aggregation. */
  roboticsSummaryMinMs: 300,
  /** Maximum accepted timeout for robotics summary aggregation. */
  roboticsSummaryMaxMs: 10000,
  /** Minimum accepted timeout for drone summary aggregation. */
  droneSummaryMinMs: 300,
  /** Maximum accepted timeout for drone summary aggregation. */
  droneSummaryMaxMs: 10000,
  /** Default timeout for library registry snapshot aggregation. */
  libraryRegistrySnapshotMs: 5000,
  /** Minimum accepted timeout for library registry snapshot aggregation. */
  libraryRegistrySnapshotMinMs: 250,
  /** Maximum accepted timeout for library registry snapshot aggregation. */
  libraryRegistrySnapshotMaxMs: 10000,
  /** Default refresh cadence for long-running pipeline status polling. */
  pipelineRefreshMs: 5000,
  /** Default duration for error toast notifications. */
  toastErrorMs: 5000,
  /** Default duration for informational toast notifications. */
  toastInfoMs: 3000,
  /** Default fade-out animation duration for toast dismissal. */
  toastFadeMs: 250,
  /** Default timeout for bun test cases and hooks. */
  testDefaultMs: 600000,
  /** Default timeout for GitLab artifact/package uploads from CI. */
  gitlabUploadMs: MS_PER_MINUTE,
  /** Default wait for kubectl port-forward processes to attach before probing. */
  kubePortForwardAttachMs: 3000,
  /** Cache TTL for BaoControlPlane setup wizard status snapshots (ms). */
  baoControlPlaneStatusCacheTtlMs: 3000,
  /** Cache TTL for BaoControlPlane runtime diagnostics snapshots (ms). */
  baoRuntimeCacheTtlMs: 3000,
  /** Idempotency TTL for BaoControlPlane runtime diagnostics actions (ms). */
  baoRuntimeIdempotencyTtlMs: 300000,
  /** Default timeout for scanner scan capture operations. */
  scannerScanCaptureMs: MS_PER_MINUTE,
  /** Default timeout for scanner request operations. */
  scannerRequestMs: 10000,
  /** Default timeout for scanner alignment operations. */
  scannerAlignMs: 30000,
  /** Default timeout for scanner mesh generation operations. */
  scannerMeshMs: MS_PER_MINUTE,
  /** Default timeout for scanner export operations. */
  scannerExportMs: 30000,
  /** Default timeout for capability contract requests (bunbuddy/CAP). */
  capabilityTimeoutDefaultMs: 5000,
  /** Circuit breaker timeout for cache invalidation (open state before retry). */
  cacheCircuitBreakerTimeoutMs: MS_PER_MINUTE,
  /** Default timeout for cache invalidation webhook requests. */
  cacheWebhookTimeoutMs: 5000,
  /** Default reload interval for device identifier database (5 min). */
  deviceIdentifierReloadIntervalMs: 300000,
  /** Maximum backoff delay for cache warming retries. */
  cacheWarmingMaxBackoffMs: 5000,
  /** Base delay (ms) for Hugging Face Hub API retry backoff. */
  hfHubRetryBaseDelayMs: 1000,
  /** Maximum delay (ms) for Hugging Face Hub API retry backoff. */
  hfHubRetryMaxDelayMs: 10000,
  /** SSE retry interval (ms) for EventSource / heartbeat streams. */
  sseRetryMs: 5000,
  /** Default timeout (ms) for control-plane health probes. */
  controlPlaneHealthProbeMs: 3000,
  /** Max wait for bao-control-plane managed service startup readiness. */
  controlPlaneHostStartupMs: 90_000,
  /** Max wait for bao-control-plane managed process graceful stop. */
  controlPlaneManagedProcessStopMs: 10_000,
  /** Readiness delay after launching bao-desktop dev shell before frame probe. */
  controlPlaneDesktopReadinessDelayMs: 4000,
} as const;

type TimeoutKey = keyof typeof DEFAULT_TIMEOUTS;

/**
 * Resolve a timeout key while allowing explicit overrides.
 * @param key - Identifier from DEFAULT_TIMEOUTS.
 * @param [override] - Optional runtime override to prefer when provided.
 * @returns Resolved timeout value in milliseconds.
 */
export function resolveTimeout(key: TimeoutKey, override?: number): number {
  if (typeof override === "number" && Number.isFinite(override) && override > 0) {
    return override;
  }
  return DEFAULT_TIMEOUTS[key];
}
