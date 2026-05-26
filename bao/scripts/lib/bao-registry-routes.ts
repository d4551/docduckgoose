const BAO_REGISTRY_NAMESPACE = "baohaus";

const registryPath = (parts: readonly string[]): string =>
  `/${parts.map((part) => encodeURIComponent(part)).join("/")}`;

export const buildBaoRegistryManifestUrl = (origin: URL, packageId: string, version: string): URL =>
  new URL(registryPath(["v2", BAO_REGISTRY_NAMESPACE, packageId, "manifests", version]), origin);

export const buildBaoRegistryBlobUrl = (origin: URL, packageId: string, digest: string): URL =>
  new URL(registryPath(["v2", BAO_REGISTRY_NAMESPACE, packageId, "blobs", digest]), origin);
