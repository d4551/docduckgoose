export const packageDescriptor = Object.freeze({
  name: "@baohaus/tangyuan-i18n",
  version: "0.1.0",
  packageManager: "bun@1.3.13",
  type: "module",
  main: "./dist/translator.js",
  types: "./dist/translator.d.ts",
  ociRepository: "baohaus/tangyuan-i18n",
  baoArtifactPath: "bao-source/tangyuan-i18n/dist/bao/tangyuan-i18n.bao",
} as const);

export type PackageDescriptor = typeof packageDescriptor;
