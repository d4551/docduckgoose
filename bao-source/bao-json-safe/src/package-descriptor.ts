export const packageDescriptor = Object.freeze({
  name: "@baohaus/bao-json-safe",
  version: "0.1.0",
  packageManager: "bun@1.3.13",
  type: "module",
  exports: {
    "./parse": {
      import: "./dist/parse.js",
      types: "./dist/parse.d.ts",
      default: "./dist/parse.js",
      bun: "./dist/parse.js",
    },
  },
  ociRepository: "baohaus/bao-json-safe",
  baoArtifactPath: "bao-source/bao-json-safe/dist/bao/bao-json-safe.bao",
} as const);
