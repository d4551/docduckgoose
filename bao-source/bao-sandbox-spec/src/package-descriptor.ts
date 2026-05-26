export const packageDescriptor = Object.freeze({
  name: "@baohaus/bao-sandbox-spec",
  version: "0.1.0",
  packageManager: "bun@1.3.13",
  type: "module",
  exports: {
    "./schema": {
      import: "./dist/schema.js",
      types: "./dist/schema.d.ts",
      default: "./dist/schema.js",
      bun: "./dist/schema.js",
    },
    "./validate": {
      import: "./dist/validate.js",
      types: "./dist/validate.d.ts",
      default: "./dist/validate.js",
      bun: "./dist/validate.js",
    },
    "./compile": {
      import: "./dist/compile.js",
      types: "./dist/compile.d.ts",
      default: "./dist/compile.js",
      bun: "./dist/compile.js",
    },
    "./scheduler": {
      import: "./dist/scheduler.js",
      types: "./dist/scheduler.d.ts",
      default: "./dist/scheduler.js",
      bun: "./dist/scheduler.js",
    },
    "./cluster": {
      import: "./dist/cluster.js",
      types: "./dist/cluster.d.ts",
      default: "./dist/cluster.js",
      bun: "./dist/cluster.js",
    },
  },
  ociRepository: "baohaus/bao-sandbox-spec",
  baoArtifactPath: "bao-source/bao-sandbox-spec/dist/bao/bao-sandbox-spec.bao",
} as const);
