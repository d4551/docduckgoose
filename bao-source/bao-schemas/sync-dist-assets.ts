#!/usr/bin/env bun

const PACKAGE_ROOT = new URL("./", import.meta.url);
const DIST_ROOT = new URL("./dist/", PACKAGE_ROOT);

const DIST_ASSET_COPIES = [
  {
    source: new URL("./src/bao-manifest-v1.fbs", PACKAGE_ROOT),
    destination: new URL("./bao-manifest-v1.fbs", DIST_ROOT),
  },
];

function toPlatformPath(url: URL): string {
  const pathname = decodeURIComponent(url.pathname);
  return /^\/[A-Za-z]:\//u.test(pathname) ? pathname.slice(1) : pathname;
}

await $`mkdir -p ${toPlatformPath(new URL("./generated/", DIST_ROOT))}`.quiet();

for (const asset of DIST_ASSET_COPIES) {
  await Bun.write(asset.destination, Bun.file(asset.source));
}

await Bun.write(new URL("./generated/.gitkeep", DIST_ROOT), "");
