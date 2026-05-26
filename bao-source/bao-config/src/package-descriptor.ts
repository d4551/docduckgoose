export const packageDescriptor = Object.freeze({
  name: "@baohaus/bao-config",
  version: "0.1.0",
  packageManager: "bun@1.3.13",
  type: "module",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  ociRepository: "baohaus/bao-config",
  baoArtifactPath: "bao-source/bao-config/dist/bao/bao-config.bao",
} as const);

export type PackageDescriptor = typeof packageDescriptor;
