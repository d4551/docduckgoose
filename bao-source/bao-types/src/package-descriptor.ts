export const packageDescriptor = Object.freeze({
  name: "@baohaus/bao-types",
  version: "0.1.0",
  packageManager: "bun@1.3.13",
  type: "module",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  ociRepository: "baohaus/bao-types",
  baoArtifactPath: "bao-source/bao-types/dist/bao/bao-types.bao",
} as const);

export type PackageDescriptor = typeof packageDescriptor;
