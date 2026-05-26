/**
 * Default values for BaoControlPlane image/build configuration.
 *
 * Keeps BaoControlPlane defaults centralized so config resolvers and scripts avoid inline magic values.
 *
 * @packageDocumentation
 */

import { BAO_CONTROL_PLANE_DIST_DIR } from "./build-paths";

/** Default in-cluster Kubernetes service-account token path for BaoControlPlane probes. */
export const DEFAULT_BAO_CONTROL_PLANE_KUBERNETES_SERVICE_ACCOUNT_TOKEN_PATH: "/var/run/secrets/kubernetes.io/serviceaccount/token" =
  "/var/run/secrets/kubernetes.io/serviceaccount/token" as const;

/** Default in-cluster Kubernetes service-account CA bundle path for BaoControlPlane probes. */
export const DEFAULT_BAO_CONTROL_PLANE_KUBERNETES_SERVICE_ACCOUNT_CA_PATH: "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt" =
  "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt" as const;

/** Default distributed lock key for .bao Runtime snapshot coordination. */
export const DEFAULT_BAO_RUNTIME_DISTRIBUTED_LOCK_KEY: "bao-runtime:snapshot:lock" =
  "bao-runtime:snapshot:lock" as const;

/** Default cosign binary name used by BaoControlPlane supply-chain policy checks. */
export const DEFAULT_BAO_CONTROL_PLANE_COSIGN_BINARY: "cosign" = "cosign" as const;

/** Default SLSA provenance predicate type enforced by BaoControlPlane policy checks. */
export const DEFAULT_BAO_CONTROL_PLANE_PROVENANCE_PREDICATE_TYPE: "slsaprovenance" =
  "slsaprovenance" as const;

/** Default GPU resource key used to detect GPU workloads in BaoControlPlane promotion policy. */
export const DEFAULT_BAO_CONTROL_PLANE_GPU_RESOURCE_KEY: "nvidia.com/gpu" =
  "nvidia.com/gpu" as const;

/** Default namespace hosting the managed local BaoControlPlane registry service. */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_NAMESPACE: "bao-runtime" =
  "bao-runtime" as const;

/** Default Kubernetes Service name for the managed local Bao control-plane registry. */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_SERVICE_NAME: "bao-control-plane-registry" =
  "bao-control-plane-registry" as const;

/** Default Service port for the managed local BaoControlPlane registry. */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_SERVICE_PORT: "5000" = "5000" as const;

/** Default host used for local registry host-port publishing. */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_HOST: "localhost" = "localhost" as const;

/** Default published host-port for the local BaoControlPlane registry. */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_HOST_PORT: 5555 = 5555 as const;

/** Default Unix socket path for the privileged .bao Runtime host service. */
export const DEFAULT_BAO_RUNTIME_HOST_SOCKET_PATH: "/run/bao-runtime/host-runtime.sock" =
  "/run/bao-runtime/host-runtime.sock" as const;

/** Default system service name for the privileged .bao Runtime host owner. */
export const DEFAULT_BAO_RUNTIME_HOST_SERVICE_NAME: "bao-runtime-host-runtime" =
  "bao-runtime-host-runtime" as const;

/** Environment key overriding the privileged .bao Runtime host socket path. */
export const BAO_RUNTIME_HOST_SOCKET_PATH_ENV_KEY: "BAO_RUNTIME_HOST_SOCKET_PATH" =
  "BAO_RUNTIME_HOST_SOCKET_PATH" as const;

/** Default container image used by the managed local BaoControlPlane registry service (pinned tag). */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_IMAGE: "registry:2.8.3" =
  "registry:2.8.3" as const;

/** Default local registry address fallback when discovery and summary sources are unavailable. */
export const DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_FALLBACK_ADDRESS: "localhost:5555" =
  `${DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_HOST}:${DEFAULT_BAO_CONTROL_PLANE_LOCAL_REGISTRY_HOST_PORT}` as const;

/** Default loopback host used for local BaoControlPlane port-forward readiness checks. */
export const DEFAULT_BAO_CONTROL_PLANE_LOOPBACK_HOST: "127.0.0.1" = "127.0.0.1" as const;

/** Default signal used to terminate BaoControlPlane port-forward subprocesses. */
export const DEFAULT_BAO_CONTROL_PLANE_PORT_FORWARD_SHUTDOWN_SIGNAL: "SIGTERM" = "SIGTERM" as const;

/** Default multi-platform build target list for BaoControlPlane image pipelines. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_PLATFORMS: "linux/amd64,linux/arm64" =
  "linux/amd64,linux/arm64" as const;

/** Default image registry prefix for local/offline development workflows. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_REGISTRY_PREFIX: "localhost/bao-runtime" =
  "localhost/bao-runtime" as const;

/** Default BaoControlPlane Package CRD release name. */
export const DEFAULT_BAO_CONTROL_PLANE_PACKAGE_RELEASE_NAME: "bao-runtime" = "bao-runtime" as const;

/** Default Kubernetes namespace used by BaoControlPlane Package CRD resources. */
export const DEFAULT_BAO_CONTROL_PLANE_PACKAGE_NAMESPACE: "bao-runtime" = "bao-runtime" as const;

/** Default secret name for BaoControlPlane Git repo credentials. */
export const DEFAULT_BAO_CONTROL_PLANE_BOOTSTRAP_GIT_REPO_CREDENTIAL_SECRET_NAME: "repo-creds-fleet-git" =
  "repo-creds-fleet-git" as const;

/** Default secret name for BaoControlPlane OCI repo credentials. */
export const DEFAULT_BAO_CONTROL_PLANE_BOOTSTRAP_OCI_REPO_CREDENTIAL_SECRET_NAME: "repo-creds-oci-registry" =
  "repo-creds-oci-registry" as const;

/** Default output directory for Bao control-plane bootstrap summaries. */
export const DEFAULT_BAO_CONTROL_PLANE_BOOTSTRAP_SUMMARY_DIR: "dist/bao-control-plane" =
  BAO_CONTROL_PLANE_DIST_DIR;

/** Default output filename for BaoControlPlane control-plane bootstrap summary artifacts. */
export const DEFAULT_BAO_CONTROL_PLANE_BOOTSTRAP_SUMMARY_FILE_NAME: "controlplane-summary.json" =
  "controlplane-summary.json" as const;

/** Default in-cluster PostgreSQL Service port (PostgreSQL standard). */
export const DEFAULT_BAO_CONTROL_PLANE_POSTGRES_SERVICE_PORT: 5432 = 5432 as const;

/** Default in-cluster Redis Service port (Redis standard). */
export const DEFAULT_BAO_CONTROL_PLANE_REDIS_SERVICE_PORT: 6379 = 6379 as const;

/** Default Kubernetes Service name for BaoControlPlane Postgres (matches Helm postgresql.fullname). */
export const DEFAULT_BAO_CONTROL_PLANE_POSTGRES_SERVICE_NAME: "postgres" = "postgres" as const;

/** Default Kubernetes Service name for BaoControlPlane Redis (matches Helm redis.fullname). */
export const DEFAULT_BAO_CONTROL_PLANE_REDIS_SERVICE_NAME: "redis" = "redis" as const;

/** Default `app.kubernetes.io/component` label value for BaoControlPlane Postgres pods. */
export const DEFAULT_BAO_CONTROL_PLANE_POSTGRES_APP_COMPONENT: "postgres" = "postgres" as const;

/** Default StatefulSet name for BaoControlPlane Postgres workload pods. */
export const DEFAULT_BAO_CONTROL_PLANE_POSTGRES_STATEFULSET_NAME: "postgres" = "postgres" as const;

/** Default OCI Builder cache reference suffix. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CACHE_REF_SUFFIX: "cache:images" =
  "cache:images" as const;

/** Default OCI Builder registry cache mode. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CACHE_MODE: "max" = "max" as const;

/** Default retry count for OCI image build operations. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_RETRY_MAX: 3 = 3 as const;

/** Default retry backoff for OCI image build operations (ms). */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_RETRY_BACKOFF_MS: 2000 = 2_000 as const;

/** Canonical environment key for concurrent BaoControlPlane image build parallelism. */
export const BAO_CONTROL_PLANE_IMAGE_BUILD_PARALLELISM_ENV_KEY: "BAO_CONTROL_PLANE_IMAGE_BUILD_PARALLELISM" =
  "BAO_CONTROL_PLANE_IMAGE_BUILD_PARALLELISM" as const;

/** Default parallelism for concurrent image builds. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_BUILD_PARALLELISM: 2 = 2 as const;

/** Default image used by the in-cluster remote Linux builder pod. */
export const DEFAULT_BAO_CONTROL_PLANE_REMOTE_LINUX_BUILDER_IMAGE: string = `oven/bun:${Bun.version}`;

/** Default workspace root used by the in-cluster remote Linux builder pod. */
export const DEFAULT_BAO_CONTROL_PLANE_REMOTE_LINUX_BUILDER_WORKSPACE_ROOT: "/workspace" =
  "/workspace" as const;

/** Default maximum parallel stages for OCI Builder. */
export const DEFAULT_BAO_CONTROL_PLANE_OCI_BUILDER_MAX_PARALLEL_STAGES: 4 = 4 as const;

/** Default maximum parallel COPY hash operations for OCI Builder. */
export const DEFAULT_BAO_CONTROL_PLANE_OCI_BUILDER_MAX_PARALLEL_COPY_HASH: 8 = 8 as const;

/** Default registry API base path used for tag/catalog cleanup operations. */
export const DEFAULT_BAO_CONTROL_PLANE_REGISTRY_API_BASE_PATH: "/v2" = "/v2" as const;

/** Default registry scheme for maintenance operations when host:port is provided. */
export const DEFAULT_BAO_CONTROL_PLANE_REGISTRY_SCHEME: "http" = "http" as const;

/** Default number of image tags retained per repository during cleanup. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CLEANUP_KEEP_TAG_COUNT: 5 = 5 as const;

/** Default timeout for registry cleanup HTTP requests (ms). */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CLEANUP_REQUEST_TIMEOUT_MS: 5000 = 5_000 as const;

/** Default token env key used for registry cleanup bearer authentication. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CLEANUP_TOKEN_ENV_KEY: "BAO_CONTROL_PLANE_REGISTRY_TOKEN" =
  "BAO_CONTROL_PLANE_REGISTRY_TOKEN" as const;

/** Default username env key used for registry cleanup basic authentication. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CLEANUP_USERNAME_ENV_KEY: "BAO_CONTROL_PLANE_REGISTRY_USERNAME" =
  "BAO_CONTROL_PLANE_REGISTRY_USERNAME" as const;

/** Default password env key used for registry cleanup basic authentication. */
export const DEFAULT_BAO_CONTROL_PLANE_IMAGE_CLEANUP_PASSWORD_ENV_KEY: "BAO_CONTROL_PLANE_REGISTRY_PASSWORD" =
  "BAO_CONTROL_PLANE_REGISTRY_PASSWORD" as const;

/** Default workspace-relative path to the Package CRD manifest directory. */
export const DEFAULT_BAO_CONTROL_PLANE_PACKAGE_MANIFEST_PATH: "infrastructure/packages/bao-runtime" =
  "infrastructure/packages/bao-runtime" as const;

/** Default workspace-relative path for OCI registry blob storage. */
export const DEFAULT_BAO_CONTROL_PLANE_OCI_REGISTRY_STORAGE_PATH: "run/oci-registry" =
  "run/oci-registry" as const;

/** Environment key for minimal local-dev image set (server + baofire + dimsum-bunbuddy). */
export const BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES_ENV_KEY: "BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES" =
  "BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES" as const;
