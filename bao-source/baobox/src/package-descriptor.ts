export const PACKAGE_DESCRIPTOR = Object.freeze({
  packageName: "@baohaus/baobox",
  ociRepository: "baohaus/baobox",
  baoArtifactPath: "bao-source/baobox/dist/bao/baobox.bao",
} as const);

export type PackageDescriptor = typeof PACKAGE_DESCRIPTOR;
export const packageDescriptor = PACKAGE_DESCRIPTOR;
