export const packageDescriptor = Object.freeze({
  name: "@baohaus/json-gyoza",
  version: "0.1.0",
  packageManager: "bun@1.3.13",
  type: "module",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
      bun: "./dist/index.js",
    },
  },
  ociRepository: "baohaus/json-gyoza",
  baoArtifactPath: "bao-source/json-gyoza/dist/bao/json-gyoza.bao",
} as const);
