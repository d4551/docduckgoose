export const packageDescriptor = Object.freeze({
  name: "@baohaus/bao-edge",
  version: "1.0.0",
  packageManager: "bun@1.3.13",
  type: "module",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      bun: "./dist/index.js",
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
    },
  },
  ociRepository: "baohaus/bao-edge",
  baoArtifactPath: "bao-source/bao-edge/dist/bao/bao-edge.bao",
} as const);

export type PackageDescriptor = typeof packageDescriptor;
