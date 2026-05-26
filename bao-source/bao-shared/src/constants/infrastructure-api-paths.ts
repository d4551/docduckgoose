/**
 * External infrastructure/service endpoint path registry.
 *
 * Centralizes non-Elysia endpoint paths used when calling third-party or
 * bunbuddy-adjacent infrastructure APIs from server services.
 *
 * @shared/constants/infrastructure-api-paths
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";

/**
 * MinIO external endpoint paths.
 */
export const MINIO_ENDPOINT_PATHS: {
  readonly consoleLogin: `${string}/login`;
  readonly ready: "/minio/health/ready";
} = {
  /** MinIO console login strategy endpoint. */
  consoleLogin: `${API_PATHS.base}/login`,
  /** MinIO readiness endpoint. */
  ready: "/minio/health/ready",
} as const;

/**
 * BaoControlPlane GitOps sync health endpoint paths.
 */
export const GITOPS_ENDPOINT_PATHS: {
  readonly health: `${string}/health/gitops`;
  readonly syncWebhook: `${string}/gitops/sync`;
} = {
  /** GitOps sync health endpoint. */
  health: `${API_PATHS.base}/health/gitops`,
  /** GitOps webhook trigger endpoint. */
  syncWebhook: `${API_PATHS.base}/gitops/sync`,
} as const;

/**
 * Kubernetes API endpoint path templates used by BaoControlPlane status surfaces.
 */
export const KUBERNETES_ENDPOINT_PATHS: {
  readonly namespaceSecrets: `${string}/namespaces/:namespace/secrets`;
  readonly namespaceDeployments: "/apis/apps/v1/namespaces/:namespace/deployments";
  readonly namespaceStatefulSets: "/apis/apps/v1/namespaces/:namespace/statefulsets";
  readonly namespaceDaemonSets: "/apis/apps/v1/namespaces/:namespace/daemonsets";
  readonly namespacePackages: "/apis/bao.dev/v1/namespaces/:namespace/packages";
} = {
  /** Core-v1 namespace secrets collection path template. */
  namespaceSecrets: `${API_PATHS.base}/namespaces/:namespace/secrets`,
  /** Apps-v1 namespace deployments collection path template. */
  namespaceDeployments: "/apis/apps/v1/namespaces/:namespace/deployments",
  /** Apps-v1 namespace statefulsets collection path template. */
  namespaceStatefulSets: "/apis/apps/v1/namespaces/:namespace/statefulsets",
  /** Apps-v1 namespace daemonsets collection path template. */
  namespaceDaemonSets: "/apis/apps/v1/namespaces/:namespace/daemonsets",
  /** Package CRD collection path template. */
  namespacePackages: "/apis/bao.dev/v1/namespaces/:namespace/packages",
} as const;

/**
 * Health/probe path registry for infrastructure services.
 */
export const INFRASTRUCTURE_HEALTH_PATHS: {
  readonly seaweedMasterClusterStatus: "/cluster/status";
  readonly seaweedFilerStatus: "/status";
  readonly seaweedS3Root: "/";
  readonly baofireMetadata: "/metadata";
  readonly dimsumSystem: "/system";
  readonly minioReady: "/minio/health/ready";
  readonly weaviateReady: "/v1/.well-known/ready";
} = {
  seaweedMasterClusterStatus: "/cluster/status",
  seaweedFilerStatus: "/status",
  seaweedS3Root: "/",
  baofireMetadata: "/metadata",
  dimsumSystem: "/system",
  minioReady: MINIO_ENDPOINT_PATHS.ready,
  weaviateReady: "/v1/.well-known/ready",
} as const;

/**
 * Build a GitOps sync health check path.
 *
 * @returns GitOps health endpoint path.
 */
export function buildGitOpsHealthPath(): string {
  return GITOPS_ENDPOINT_PATHS.health;
}

/**
 * Build a Kubernetes namespace secrets query path.
 *
 * @param namespace - Kubernetes namespace.
 * @param labelSelector - Label selector expression.
 * @returns Encoded namespace secrets path.
 */
export function buildKubernetesNamespaceSecretsPath(
  namespace: string,
  labelSelector: string,
): string {
  const encodedNamespace = encodeURIComponent(namespace);
  const encodedSelector = encodeURIComponent(labelSelector);
  return `${KUBERNETES_ENDPOINT_PATHS.namespaceSecrets.replace(":namespace", encodedNamespace)}?labelSelector=${encodedSelector}`;
}

/**
 * Build a Kubernetes namespace deployments query path.
 *
 * @param namespace - Kubernetes namespace.
 * @param labelSelector - Label selector expression.
 * @returns Encoded namespace deployments path.
 */
export function buildKubernetesNamespaceDeploymentsPath(
  namespace: string,
  labelSelector?: string,
): string {
  const encodedNamespace = encodeURIComponent(namespace);
  const basePath = KUBERNETES_ENDPOINT_PATHS.namespaceDeployments.replace(
    ":namespace",
    encodedNamespace,
  );
  if (!labelSelector) {
    return basePath;
  }
  const encodedSelector = encodeURIComponent(labelSelector);
  return `${basePath}?labelSelector=${encodedSelector}`;
}

/**
 * Build a Kubernetes namespace statefulsets path.
 *
 * @param namespace - Kubernetes namespace.
 * @returns Encoded namespace statefulsets path.
 */
export function buildKubernetesNamespaceStatefulSetsPath(namespace: string): string {
  const encodedNamespace = encodeURIComponent(namespace);
  return KUBERNETES_ENDPOINT_PATHS.namespaceStatefulSets.replace(":namespace", encodedNamespace);
}

/**
 * Build a Kubernetes namespace daemonsets path.
 *
 * @param namespace - Kubernetes namespace.
 * @returns Encoded namespace daemonsets path.
 */
export function buildKubernetesNamespaceDaemonSetsPath(namespace: string): string {
  const encodedNamespace = encodeURIComponent(namespace);
  return KUBERNETES_ENDPOINT_PATHS.namespaceDaemonSets.replace(":namespace", encodedNamespace);
}

/**
 * Build a Kubernetes namespace Package CRD path.
 *
 * @param namespace - Kubernetes namespace.
 * @returns Encoded namespace Package CRD path.
 */
export function buildKubernetesNamespacePackagesPath(namespace: string): string {
  const encodedNamespace = encodeURIComponent(namespace);
  return KUBERNETES_ENDPOINT_PATHS.namespacePackages.replace(":namespace", encodedNamespace);
}
