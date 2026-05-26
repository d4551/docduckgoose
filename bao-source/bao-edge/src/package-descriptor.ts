export const PACKAGE_DESCRIPTOR = Object.freeze({
  packageName: "@baohaus/bao-edge",
  ociRepository: "baohaus/bao-edge",
  baoArtifactPath: "bao-source/bao-edge/dist/bao/bao-edge.bao",
} as const);

export type PackageDescriptor = typeof PACKAGE_DESCRIPTOR;
export const packageDescriptor = PACKAGE_DESCRIPTOR;
