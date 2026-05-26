import { mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const packageRoot = resolve(import.meta.dir, "..");
const vendorRoot = resolve(packageRoot, "dist", "vendor");

interface VendorCopySpec {
  readonly packageJsonSpecifier: string;
  readonly relativeSource: string;
  readonly relativeDest: string;
}

const VENDOR_COPY_SPECS: readonly VendorCopySpec[] = [
  {
    packageJsonSpecifier: "htmx.org/package.json",
    relativeSource: "dist/htmx.min.js",
    relativeDest: "htmx/dist/htmx.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-class-tools/package.json",
    relativeSource: "dist/class-tools.min.js",
    relativeDest: "htmx-ext/class-tools.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-head-support/package.json",
    relativeSource: "dist/head-support.min.js",
    relativeDest: "htmx-ext/head-support.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-json-enc/package.json",
    relativeSource: "dist/json-enc.js",
    relativeDest: "htmx-ext/json-enc.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-loading-states/package.json",
    relativeSource: "dist/loading-states.min.js",
    relativeDest: "htmx-ext/loading-states.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-preload/package.json",
    relativeSource: "dist/preload.min.js",
    relativeDest: "htmx-ext/preload.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-remove-me/package.json",
    relativeSource: "dist/remove-me.min.js",
    relativeDest: "htmx-ext/remove-me.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-response-targets/package.json",
    relativeSource: "dist/response-targets.min.js",
    relativeDest: "htmx-ext/response-targets.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-sse/package.json",
    relativeSource: "dist/sse.min.js",
    relativeDest: "htmx-ext/sse.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-ws/package.json",
    relativeSource: "dist/ws.min.js",
    relativeDest: "htmx-ext/ws.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-multi-swap/package.json",
    relativeSource: "dist/multi-swap.min.js",
    relativeDest: "htmx-ext/multi-swap.min.js",
  },
  {
    packageJsonSpecifier: "htmx-ext-include-vals/package.json",
    relativeSource: "dist/include-vals.min.js",
    relativeDest: "htmx-ext/include-vals.min.js",
  },
  {
    packageJsonSpecifier: "idiomorph/package.json",
    relativeSource: "dist/idiomorph-ext.min.js",
    relativeDest: "htmx-ext/idiomorph-ext.min.js",
  },
];

function resolvePackageAssetPath(packageJsonSpecifier: string, relativePath: string): string {
  return Bun.fileURLToPath(
    new URL(relativePath, new URL(".", import.meta.resolve(packageJsonSpecifier))),
  );
}

async function copyVendorAsset(spec: VendorCopySpec): Promise<void> {
  const sourcePath = resolvePackageAssetPath(spec.packageJsonSpecifier, spec.relativeSource);
  const destinationPath = join(vendorRoot, spec.relativeDest);
  const sourceFile = Bun.file(sourcePath);
  if (!(await sourceFile.exists())) {
    throw new Error(`Missing HTMX vendor asset: ${sourcePath}`);
  }
  await mkdir(dirname(destinationPath), { recursive: true });
  await Bun.write(destinationPath, sourceFile);
}

await rm(vendorRoot, { recursive: true, force: true });
for (const spec of VENDOR_COPY_SPECS) {
  await copyVendorAsset(spec);
}
