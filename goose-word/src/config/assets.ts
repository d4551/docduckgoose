import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const moduleDir = fileURLToPath(new URL(".", import.meta.url));
const packageRoot = join(moduleDir, "..", "..");
const bundledAssetsRoot = join(packageRoot, "assets");
const sourceAssetsRoot = join(packageRoot, "..", "bao-source");
const hasBundledAssets = existsSync(bundledAssetsRoot);
const root = hasBundledAssets ? bundledAssetsRoot : sourceAssetsRoot;

export const gooseWordAssetPaths = Object.freeze({
  htmxVendorRoot: join(root, "htmx-vendor-bao", "dist", "vendor"),
  uiRoot: join(root, "goose-word-ui-bao"),
  tokensRoot: join(root, "baohaus-design-tokens-aurora-bao", "assets"),
  densityRoot: join(root, "baohaus-density-preset-aurora-bao", "assets"),
  fontRoot: join(root, "font-bao", "dist", "fonts"),
});
